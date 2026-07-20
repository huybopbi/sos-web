import type { HotSosGuest, HotSosRoom } from "@hotsos/shared";
import { HOTSOS } from "./constants.js";
import {
  fetchCsrf,
  login,
  type HotSosSession,
} from "./auth.js";

export interface HotSosConfig {
  username: string;
  password: string;
  shift: number;
}

export class HotSosClient {
  private session: HotSosSession | null = null;
  private loginPromise: Promise<HotSosSession> | null = null;

  constructor(private readonly config: HotSosConfig) {}

  get hasSession(): boolean {
    return this.session !== null;
  }

  get loggedInAt(): number | null {
    return this.session?.loggedInAt ?? null;
  }

  get shift(): number {
    return this.config.shift;
  }

  async forceRelogin(): Promise<void> {
    if (!this.config.username || !this.config.password) {
      throw new Error(
        "Thiếu HOTSOS_USERNAME / HOTSOS_PASSWORD — copy .env.example thành .env và điền credential",
      );
    }
    this.session = null;
    this.session = await this.ensureSession(true);
  }

  private async ensureSession(force = false): Promise<HotSosSession> {
    if (!force && this.session) return this.session;

    if (!this.loginPromise) {
      this.loginPromise = login(this.config.username, this.config.password)
        .then((s) => {
          this.session = s;
          return s;
        })
        .finally(() => {
          this.loginPromise = null;
        });
    }

    return this.loginPromise;
  }

  private async withAuth<T>(
    fn: (session: HotSosSession) => Promise<T>,
  ): Promise<T> {
    let session = await this.ensureSession();

    try {
      return await fn(session);
    } catch (err) {
      // refresh CSRF then retry once
      try {
        session.csrf = await fetchCsrf(session.cookies);
        return await fn(session);
      } catch {
        await this.forceRelogin();
        session = await this.ensureSession();
        return await fn(session);
      }
    }
  }

  private async putJson(
    session: HotSosSession,
    path: string,
    body: unknown,
  ): Promise<Response> {
    const url = `${HOTSOS.HOUSEKEEPING_BASE}/${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      [session.csrf.tokenHeaderName]: session.csrf.token,
    };

    return session.cookies.fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  }

  private async getJson(
    session: HotSosSession,
    path: string,
    query: Record<string, string | number>,
  ): Promise<Response> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      params.set(key, String(value));
    }
    const url = `${HOTSOS.HOUSEKEEPING_BASE}/${path}?${params.toString()}`;
    const headers: Record<string, string> = {
      Accept: "application/json",
      [session.csrf.tokenHeaderName]: session.csrf.token,
    };

    return session.cookies.fetch(url, {
      method: "GET",
      headers,
    });
  }

  async getTotals(): Promise<unknown> {
    return this.withAuth(async (session) => {
      const res = await this.putJson(
        session,
        "HousekeepingSupervisor/GetTotals",
        {
          myRoomsFilter: { shift: this.config.shift },
          shift: this.config.shift,
        },
      );

      if (!res.ok) {
        throw new Error(`GetTotals failed (HTTP ${res.status})`);
      }
      return res.json();
    });
  }

  async listRooms(): Promise<HotSosRoom[]> {
    if (!this.config.username || !this.config.password) {
      throw new Error(
        "Thiếu HOTSOS_USERNAME / HOTSOS_PASSWORD — copy .env.example thành .env và điền credential",
      );
    }

    return this.withAuth(async (session) => {
      // warm session
      const totalsRes = await this.putJson(
        session,
        "HousekeepingSupervisor/GetTotals",
        {
          myRoomsFilter: { shift: this.config.shift },
          shift: this.config.shift,
        },
      );
      if (!totalsRes.ok) {
        throw new Error(`GetTotals failed (HTTP ${totalsRes.status})`);
      }

      const listRes = await this.putJson(
        session,
        "HousekeepingSupervisor/List",
        {
          myRoomsFilter: null,
          listFilter: {
            shift: this.config.shift,
            orderByRoomNumber: 1,
          },
          search: null,
        },
      );

      if (!listRes.ok) {
        const text = await listRes.text().catch(() => "");
        throw new Error(
          `List failed (HTTP ${listRes.status}): ${text.slice(0, 200)}`,
        );
      }

      const data = await listRes.json();
      if (!Array.isArray(data)) {
        throw new Error("List response is not an array");
      }
      return data as HotSosRoom[];
    });
  }

  async getGuests(assignmentId: number): Promise<HotSosGuest[]> {
    if (!this.config.username || !this.config.password) {
      throw new Error(
        "Thiếu HOTSOS_USERNAME / HOTSOS_PASSWORD — copy .env.example thành .env và điền credential",
      );
    }

    return this.withAuth(async (session) => {
      const res = await this.getJson(
        session,
        "RoomAssignments/GetGuestsWithPreferences",
        {
          assignmentId,
          shift: this.config.shift,
        },
      );

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `GetGuestsWithPreferences failed (HTTP ${res.status}): ${text.slice(0, 200)}`,
        );
      }

      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("GetGuestsWithPreferences response is not an array");
      }
      return data as HotSosGuest[];
    });
  }
}
