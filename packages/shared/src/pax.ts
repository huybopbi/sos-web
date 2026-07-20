import type { HotSosGuest, PaxCounts } from "./types.js";

export function paxPairFromRecords(records: HotSosGuest[]): PaxCounts {
  if (records.length === 0) return { adults: 0, children: 0 };

  const counts = records.map((guest) => ({
    adults: Math.max(0, guest.adultsCount ?? 0),
    children: Math.max(0, guest.childrenCount ?? 0),
  }));

  if (counts.length === 1) return counts[0];

  const first = counts[0];
  const allSame = counts.every(
    (c) => c.adults === first.adults && c.children === first.children,
  );
  if (allSame && (first.adults > 1 || first.children > 0)) return first;

  if (counts.every((c) => c.adults === 1 && c.children === 0)) {
    return { adults: counts.length, children: 0 };
  }

  return {
    adults: counts.reduce((sum, c) => sum + c.adults, 0),
    children: counts.reduce((sum, c) => sum + c.children, 0),
  };
}

/** Lọc guest records theo reservationStatus của phòng (spec §4.6). */
export function activeGuestRecords(
  guests: HotSosGuest[],
  roomReservationStatus: string,
): HotSosGuest[] {
  const status = roomReservationStatus.trim();

  if (status === "Due In\\Checked Out") {
    return guests.filter((g) => (g.reservationStatus ?? "").trim() === "Due In");
  }
  if (status === "Checked Out") {
    return guests.filter(
      (g) => (g.reservationStatus ?? "").trim() === "Checked Out",
    );
  }
  if (status === "Due Out") {
    return guests.filter((g) => {
      const s = (g.reservationStatus ?? "").trim();
      return s === "Due Out" || s === "Checked Out";
    });
  }
  return guests.filter(
    (g) => (g.reservationStatus ?? "").trim() !== "Checked Out",
  );
}

export function assignmentGuestCounts(
  guests: HotSosGuest[],
  roomReservationStatus: string,
): PaxCounts {
  return paxPairFromRecords(activeGuestRecords(guests, roomReservationStatus));
}

/** Format hiển thị: `2👤 1👶` — chỉ hiện phần > 0. */
export function formatPax(pax: PaxCounts): string {
  const parts: string[] = [];
  if (pax.adults > 0) parts.push(`${pax.adults}👤`);
  if (pax.children > 0) parts.push(`${pax.children}👶`);
  return parts.join(" ");
}
