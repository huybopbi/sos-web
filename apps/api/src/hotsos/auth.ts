import { HOTSOS } from "./constants.js";
import {
  CookieSession,
  extractIdToken,
  getLocation,
  parseHiddenInputs,
} from "./http.js";

export interface CsrfToken {
  tokenHeaderName: string;
  token: string;
}

export interface HotSosSession {
  cookies: CookieSession;
  csrf: CsrfToken;
  user: unknown;
  loggedInAt: number;
}

export class HotSosAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HotSosAuthError";
  }
}

export async function login(
  username: string,
  password: string,
): Promise<HotSosSession> {
  const session = new CookieSession();

  const authorizeUrl =
    `${HOTSOS.BASE_URL}/v2/authservice/connect/authorize` +
    `?response_type=id_token` +
    `&client_id=${HOTSOS.CLIENT_ID}` +
    `&redirect_uri=${HOTSOS.REDIRECT_URI}` +
    `&scope=openid%20permissions` +
    `&nonce=hotsospy` +
    `&state=hotsospy`;

  const authorizeRes = await session.fetch(authorizeUrl, { method: "GET" });
  const loginUrl = getLocation(authorizeRes, authorizeUrl);
  if (!loginUrl) {
    throw new HotSosAuthError(
      `Authorize missing Location (HTTP ${authorizeRes.status})`,
    );
  }

  // Critical: Referer + do NOT follow redirects (without Referer HotSOS 302 → SPA Index)
  const loginPageRes = await session.fetch(loginUrl, {
    method: "GET",
    headers: {
      Referer: authorizeUrl,
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (loginPageRes.status >= 300 && loginPageRes.status < 400) {
    throw new HotSosAuthError(
      `Login page redirected unexpectedly (HTTP ${loginPageRes.status}) → ${getLocation(loginPageRes, loginUrl)}`,
    );
  }

  const loginHtml = await loginPageRes.text();
  if (!loginHtml) {
    throw new HotSosAuthError("Không tải được trang login HotSOS");
  }

  const fields = parseHiddenInputs(loginHtml);
  const body = {
    ...fields,
    Username: username,
    Password: password,
  };

  const postRes = await session.fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: loginUrl,
    },
    body: JSON.stringify(body),
  });

  let currentUrl = getLocation(postRes, loginUrl);
  if (!currentUrl) {
    const text = await postRes.text().catch(() => "");
    throw new HotSosAuthError(
      `Login POST missing Location (HTTP ${postRes.status}): ${text.slice(0, 200)}`,
    );
  }

  let idToken: string | null = extractIdToken(currentUrl);

  for (let i = 0; i < 8 && !idToken; i++) {
    if (currentUrl.includes("ChangePassword")) {
      throw new HotSosAuthError(
        "HotSOS yêu cầu đổi mật khẩu trước khi tiếp tục",
      );
    }

    idToken = extractIdToken(currentUrl);
    if (idToken) break;

    const stepRes = await session.fetch(currentUrl, { method: "GET" });
    const next = getLocation(stepRes, currentUrl);
    if (
      next?.includes("ChangePassword") ||
      currentUrl.includes("ChangePassword")
    ) {
      throw new HotSosAuthError(
        "HotSOS yêu cầu đổi mật khẩu trước khi tiếp tục",
      );
    }

    if (!next) {
      const finalUrl = stepRes.url || currentUrl;
      idToken = extractIdToken(finalUrl);
      if (idToken) break;
      throw new HotSosAuthError(
        `Redirect chain ended without id_token (HTTP ${stepRes.status})`,
      );
    }

    idToken = extractIdToken(next);
    if (idToken) break;
    currentUrl = next;
  }

  if (!idToken) {
    throw new HotSosAuthError("Không lấy được id_token sau login");
  }

  const externalRes = await session.fetch(
    `${HOTSOS.APP_BASE}/rpc/Auth/ExternalLogin`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!externalRes.ok) {
    throw new HotSosAuthError(
      `ExternalLogin failed (HTTP ${externalRes.status})`,
    );
  }

  const externalJson = (await externalRes.json()) as { user?: unknown };
  const user = externalJson.user ?? externalJson;

  const csrf = await fetchCsrf(session);
  return {
    cookies: session,
    csrf,
    user,
    loggedInAt: Date.now(),
  };
}

export async function fetchCsrf(session: CookieSession): Promise<CsrfToken> {
  const res = await session.fetch(
    `${HOTSOS.APP_BASE}/rpc/Auth/GetVerificationToken`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  );

  if (!res.ok) {
    throw new HotSosAuthError(
      `GetVerificationToken failed (HTTP ${res.status})`,
    );
  }

  const json = (await res.json()) as {
    tokenHeaderName?: string;
    token?: string;
  };

  if (!json.tokenHeaderName || !json.token) {
    throw new HotSosAuthError("CSRF token response incomplete");
  }

  return {
    tokenHeaderName: json.tokenHeaderName,
    token: json.token,
  };
}
