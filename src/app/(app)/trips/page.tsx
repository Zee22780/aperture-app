import type { Metadata } from "next";

import { auth } from "@/lib/auth/config";

export const metadata: Metadata = {
  title: "Trips — Aperture",
};

/**
 * Placeholder. Milestone 5 replaces this with the real trips list, create
 * form, and detail pages. It exists now so milestone 4 has a protected route
 * to actually test the redirect against.
 */
export default async function TripsPage() {
  const session = await auth();

  return (
    <main className="flex-1 px-[var(--space-margin-page)] py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-display-lg text-on-surface">Your trips</h1>
        <p className="mt-4 font-body text-body-lg text-on-surface-variant">
          Signed in as{" "}
          <span className="font-label text-body-md text-on-surface">
            {session?.user?.email}
          </span>
          .
        </p>
        <p className="mt-6 font-body text-body-md text-on-surface-variant">
          Nothing here yet — creating trips and memories comes next.
        </p>
      </div>
    </main>
  );
}
