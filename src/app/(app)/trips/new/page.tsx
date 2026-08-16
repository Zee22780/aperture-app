import type { Metadata } from "next";
import Link from "next/link";

import { TripForm } from "@/components/trips/TripForm";
import { Card } from "@/components/ui";
import { requireUserId } from "@/lib/auth/session";
import { createTrip } from "@/lib/trips/actions";

export const metadata: Metadata = {
  title: "New trip — Aperture",
};

export default async function NewTripPage() {
  // The `(app)` layout has already redirected anyone signed out. Calling it
  // again here costs one cached session read and keeps the page honest on its
  // own terms rather than depending on a parent it can't see.
  await requireUserId();

  return (
    <main className="flex-1 px-[var(--space-margin-page)] py-12">
      <div className="mx-auto max-w-xl">
        <Link
          href="/trips"
          className="font-label text-label-caps text-on-surface-variant uppercase underline-offset-4 hover:underline"
        >
          ← All trips
        </Link>

        <h1 className="mt-6 font-display text-display-lg text-on-surface">New trip</h1>
        <p className="mt-3 font-body text-body-lg text-on-surface-variant">
          Just a name is enough to start. Dates and places can come later.
        </p>

        <Card className="mt-10 w-full align-top" rotateDeg={-0.5}>
          <div className="p-4 sm:p-6">
            <TripForm action={createTrip} submitLabel="Create trip" />
          </div>
        </Card>
      </div>
    </main>
  );
}
