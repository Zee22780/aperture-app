import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireUserId } from "@/lib/auth/session";
import { formatTripDates } from "@/lib/trips/format";
import { getTripForUser } from "@/lib/trips/queries";

export async function generateMetadata({
  params,
}: PageProps<"/trips/[tripId]">): Promise<Metadata> {
  const userId = await requireUserId();
  const { tripId } = await params;
  const trip = await getTripForUser(tripId, userId);

  return { title: trip ? `${trip.name} — Aperture` : "Trip — Aperture" };
}

export default async function TripDetailPage({ params }: PageProps<"/trips/[tripId]">) {
  const userId = await requireUserId();
  const { tripId } = await params;

  // `getTripForUser` filters on the session's user id, so someone else's trip
  // comes back as `null` and 404s here — the same response as a trip that
  // doesn't exist. That's deliberate: a distinct "not yours" would confirm
  // which trip ids are real.
  const trip = await getTripForUser(tripId, userId);
  if (!trip) notFound();

  const dates = formatTripDates(trip.startDate, trip.endDate);

  return (
    <main className="flex-1 px-[var(--space-margin-page)] py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/trips"
          className="font-label text-label-caps text-on-surface-variant uppercase underline-offset-4 hover:underline"
        >
          ← All trips
        </Link>

        <header className="mt-6 border-b-2 border-outline-variant pb-8">
          <h1 className="font-display text-display-lg text-on-surface">{trip.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
            {trip.location ? (
              <p className="font-body text-body-lg text-on-surface-variant">
                {trip.location}
              </p>
            ) : null}
            {dates ? (
              <p className="font-label text-label-caps text-on-surface-variant uppercase">
                {dates}
              </p>
            ) : null}
          </div>
        </header>

        <section className="mt-10">
          <h2 className="font-display text-headline-sm text-on-surface">Memories</h2>
          <p className="mt-3 max-w-prose font-body text-body-lg text-on-surface-variant">
            Nothing here yet. Adding memories — a title, a caption, the photos
            you took — is the next thing being built.
          </p>
        </section>
      </div>
    </main>
  );
}
