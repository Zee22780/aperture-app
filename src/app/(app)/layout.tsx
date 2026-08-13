import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/config";
import { signOutEverywhere } from "@/lib/auth/actions";

/**
 * Everything inside this route group requires a signed-in user.
 *
 * The check runs here, in a server component, rather than in `proxy.ts`.
 * Sessions are stored in Postgres, so verifying one is a database read — and
 * Next's own guidance is that proxy is for optimistic checks, not for
 * authorization. Doing it in the layout means the session is read once per
 * navigation, on the server, against the real session row.
 *
 * Note that a layout check protects pages, not data. Route handlers and
 * server actions under this group must call `auth()` themselves; they do not
 * inherit this.
 */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { name, email } = session.user;

  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b-2 border-outline-variant px-[var(--space-margin-page)] py-4">
        <span className="font-display text-headline-sm text-on-surface">Aperture</span>
        <div className="flex items-center gap-4">
          <span className="hidden font-label text-label-caps text-on-surface-variant uppercase sm:inline">
            {name ?? email}
          </span>
          <form action={signOutEverywhere}>
            <button
              type="submit"
              className="rounded-[var(--radius-full)] border-2 border-primary/60 px-4 py-1.5 font-body text-body-md font-semibold text-primary transition-colors hover:bg-surface-container-high"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </>
  );
}
