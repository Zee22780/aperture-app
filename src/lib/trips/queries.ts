import "server-only";

import { and, desc, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { trips } from "@/lib/db/schema";

export type Trip = typeof trips.$inferSelect;

/**
 * Route params arrive as arbitrary strings. Postgres raises a type error
 * rather than returning no rows when a non-UUID is compared against a `uuid`
 * column, so ids are shape-checked here and a bad one is treated as "not
 * found" instead of becoming a 500.
 */
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

/**
 * Every read in this module takes `userId` as a required argument and filters
 * on it. That is deliberate: with a single account, an unscoped query returns
 * exactly the right rows and looks perfectly correct in manual testing, so
 * the scoping has to be structural rather than something to remember.
 */
export async function listTrips(userId: string): Promise<Trip[]> {
  return db
    .select()
    .from(trips)
    .where(eq(trips.userId, userId))
    // Most recent trip first. `start_date` is nullable and Postgres sorts
    // NULLs first under DESC, which would float undated trips above real
    // ones — NULLS LAST puts them at the bottom where they belong.
    .orderBy(sql`${trips.startDate} desc nulls last`, desc(trips.createdAt));
}

/** A trip, but only if it belongs to this user. `null` covers both "no such
 *  trip" and "someone else's trip" — the caller should not tell them apart,
 *  since distinguishing the two leaks which ids exist. */
export async function getTripForUser(tripId: string, userId: string): Promise<Trip | null> {
  if (!isUuid(tripId)) return null;

  const [trip] = await db
    .select()
    .from(trips)
    .where(and(eq(trips.id, tripId), eq(trips.userId, userId)))
    .limit(1);

  return trip ?? null;
}
