import type { Metadata } from "next";
import Link from "next/link";

import { Card, LinkButton } from "@/components/ui";
import { requireUserId } from "@/lib/auth/session";
import { formatTripDates } from "@/lib/trips/format";
import { listTrips } from "@/lib/trips/queries";

export const metadata: Metadata = {
  title: "Trips — Aperture",
};

/** Scattered-collage feel per DESIGN.md — a repeating cycle of small tilts,
 *  so the cards look pinned to a page by hand rather than laid out on a grid.
 *  Indexed by position, so a given card doesn't jump when the list changes. */
const TILTS = [-1.2, 0.8, -0.5, 1.1, 0.4, -0.9];

export default async function TripsPage() {
  const userId = await requireUserId();
  const trips = await listTrips(userId);

  return (
    <main className="flex-1 px-[var(--space-margin-page)] py-12">
      <div className="mx-auto max-w-3xl">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-label text-label-caps text-on-surface-variant uppercase">
              Your journal
            </p>
            <h1 className="mt-2 font-display text-display-lg text-on-surface">Trips</h1>
          </div>
          <LinkButton href="/trips/new">New trip</LinkButton>
        </header>

        {trips.length === 0 ? (
          <p className="mt-12 max-w-prose font-body text-body-lg text-on-surface-variant">
            No trips yet. Start one, and the memories you collect — photos,
            captions, the places they happened — will live inside it.
          </p>
        ) : (
          <ul className="mt-12 flex flex-col gap-[var(--space-gutter-collage)]">
            {trips.map((trip, index) => {
              const dates = formatTripDates(trip.startDate, trip.endDate);

              return (
                <li key={trip.id}>
                  {/* `align-top` because Card is inline-block: without it the
                      card sits on the text baseline and leaves a gap below. */}
                  <Card className="w-full align-top" rotateDeg={TILTS[index % TILTS.length]}>
                    {/* The whole card is the target — a link big enough to
                        hit without aiming, per DESIGN.md's tactile feel. */}
                    <Link
                      href={`/trips/${trip.id}`}
                      className="block rounded-[var(--radius-md)] p-4 outline-none focus-visible:bg-surface-container-low"
                    >
                      <h2 className="font-display text-headline-sm text-on-surface">
                        {trip.name}
                      </h2>
                      {trip.location ? (
                        <p className="mt-1 font-body text-body-md text-on-surface-variant">
                          {trip.location}
                        </p>
                      ) : null}
                      {dates ? (
                        <p className="mt-3 font-label text-label-caps text-on-surface-variant uppercase">
                          {dates}
                        </p>
                      ) : null}
                    </Link>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
