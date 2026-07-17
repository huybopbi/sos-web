import { CookieJar } from "tough-cookie";
import { HOTSOS } from "./constants.js";

export class CookieSession {
  readonly jar = new CookieJar();

  async cookieHeader(url: string): Promise<string> {
    return (await this.jar.getCookieString(url)) || "";
  }

  async storeFromResponse(url: string, response: Response): Promise<void> {
    const headers = response.headers as Headers & {
      getSetCookie?: () => string[];
    };
    const setCookies =
      typeof headers.getSetCookie === "function"
        ? headers.getSetCookie()
        : [];

    if (setCookies.length === 0) {
      const single = response.headers.get("set-cookie");
      if (single) setCookies.push(single);
    }

    for (const cookie of setCookies) {
      await this.jar.setCookie(cookie, url);
    }
  }

  async fetch(
    url: string,
    init: RequestInit & { redirect?: "follow" | "error" | "manual" } = {},
  ): Promise<Response> {
    const headers = new Headers(init.headers);
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", HOTSOS.USER_AGENT);
    }
    const cookie = await this.cookieHeader(url);
    if (cookie) headers.set("Cookie", cookie);

    const response = await fetch(url, {
      ...init,
      headers,
      redirect: init.redirect ?? "manual",
    });
    await this.storeFromResponse(url, response);
    return response;
  }
}

export function extractIdToken(url: string): string | null {
  const hashIdx = url.indexOf("#");
  const queryIdx = url.indexOf("?");
  let fragment = "";
  let query = "";

  if (hashIdx >= 0) fragment = url.slice(hashIdx + 1);
  if (queryIdx >= 0) {
    const end = hashIdx >= 0 && hashIdx > queryIdx ? hashIdx : url.length;
    query = url.slice(queryIdx + 1, end);
  }

  for (const part of [fragment, query]) {
    if (!part) continue;
    const params = new URLSearchParams(part);
    const token = params.get("id_token");
    if (token) return token;
  }

  const match = url.match(/id_token=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10)),
    );
}

export function parseHiddenInputs(html: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const inputRe = /<input\b[^>]*>/gi;
  const nameRe = /\bname=["']([^"']+)["']/i;
  const valueRe = /\bvalue=["']([^"']*)["']/i;

  for (const match of html.matchAll(inputRe)) {
    const tag = match[0];
    const nameMatch = tag.match(nameRe);
    if (!nameMatch) continue;
    const valueMatch = tag.match(valueRe);
    fields[nameMatch[1]] = valueMatch
      ? decodeHtmlEntities(valueMatch[1])
      : "";
  }
  return fields;
}

export function getLocation(response: Response, currentUrl: string): string | null {
  const location = response.headers.get("location");
  if (!location) return null;
  try {
    return new URL(location, currentUrl).toString();
  } catch {
    return location;
  }
}
