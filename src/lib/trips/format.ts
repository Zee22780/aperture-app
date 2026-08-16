/**
 * Trip dates are calendar dates, not instants — a trip that starts on the
 * 12th starts on the 12th wherever you happen to read about it. Drizzle's
 * `date` columns come back as `YYYY-MM-DD` strings, and `new Date("2026-08-12")`
 * parses as UTC midnight, which formats as the 11th for anyone west of
 * Greenwich. Every formatter here pins the timezone to UTC so the date that
 * comes out is the date that went in.
 */
const UTC_DATE = { timeZone: "UTC" } as const;

const dayMonthYear = new Intl.DateTimeFormat("en-GB", {
  ...UTC_DATE,
  day: "numeric",
  month: "short",
  year: "numeric",
});

const dayMonth = new Intl.DateTimeFormat("en-GB", {
  ...UTC_DATE,
  day: "numeric",
  month: "short",
});

const day = new Intl.DateTimeFormat("en-GB", { ...UTC_DATE, day: "numeric" });

function parse(value: string): Date | null {
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * A trip's dates as one readable line, collapsing the parts both ends share:
 *
 *   12–18 Aug 2026     (same month)
 *   28 Jul – 3 Aug 2026 (same year)
 *   28 Dec 2026 – 3 Jan 2027
 *   From 12 Aug 2026   (no end date yet)
 *
 * Returns `null` when there are no dates at all, so callers can leave the
 * line out entirely rather than printing an empty one.
 */
export function formatTripDates(
  startDate: string | null,
  endDate: string | null,
): string | null {
  const start = startDate ? parse(startDate) : null;
  const end = endDate ? parse(endDate) : null;

  if (!start && !end) return null;
  if (start && !end) return `From ${dayMonthYear.format(start)}`;
  if (!start && end) return `Until ${dayMonthYear.format(end)}`;
  if (!start || !end) return null;

  if (startDate === endDate) return dayMonthYear.format(start);

  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const sameMonth = sameYear && start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) return `${day.format(start)}–${dayMonthYear.format(end)}`;
  if (sameYear) return `${dayMonth.format(start)} – ${dayMonthYear.format(end)}`;
  return `${dayMonthYear.format(start)} – ${dayMonthYear.format(end)}`;
}
