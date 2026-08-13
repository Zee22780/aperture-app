import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/config";
import { signInWithGoogle } from "@/lib/auth/actions";
import { Card } from "@/components/ui";

import { GoogleMark } from "./GoogleMark";

export const metadata: Metadata = {
  title: "Sign in — Aperture",
};

/**
 * Auth.js sends people back here with `?error=` when a sign-in attempt fails
 * (see `pages.error` in the auth config). Anything unrecognised falls through
 * to the default: the raw codes are not useful to a reader, and echoing an
 * unknown one back onto the page would put attacker-chosen text in the UI.
 */
const errorMessages: Record<string, string> = {
  Configuration:
    "Sign-in isn't set up correctly on this end. That's a problem with the app, not with you.",
  AccessDenied: "Google didn't let that sign-in through.",
  Verification: "That sign-in link has expired or was already used.",
  OAuthAccountNotLinked:
    "There's already an account with this email address that was created a different way.",
};

const DEFAULT_ERROR = "Something went wrong signing in. Please try again.";

export default async function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  const session = await auth();
  if (session?.user) redirect("/trips");

  const { callbackUrl, error } = await searchParams;
  const errorCode = typeof error === "string" ? error : undefined;
  const errorMessage = errorCode ? (errorMessages[errorCode] ?? DEFAULT_ERROR) : undefined;

  return (
    <main className="flex flex-1 items-center justify-center px-[var(--space-margin-page)] py-16">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <p className="font-label text-label-caps text-on-surface-variant uppercase">
            Travel journal
          </p>
          <h1 className="mt-2 font-display text-display-lg text-on-surface">Aperture</h1>
          <p className="mt-3 font-body text-body-lg text-on-surface-variant">
            Sign in to start collecting your memories.
          </p>
        </header>

        <Card className="w-full" rotateDeg={-0.8}>
          <div className="flex w-full flex-col gap-4 p-4 sm:p-6">
            {errorMessage ? (
              <p
                role="alert"
                className="rounded-[var(--radius-md)] bg-error-container px-4 py-3 font-body text-body-md text-on-error-container"
              >
                {errorMessage}
              </p>
            ) : null}

            {/* Providers. Laid out as a stack so more buttons — and, if the
                magic-link deferral is reversed, an email field above a
                divider — drop in without rearranging the page. */}
            <form action={signInWithGoogle}>
              {typeof callbackUrl === "string" ? (
                <input type="hidden" name="callbackUrl" value={callbackUrl} />
              ) : null}
              <button
                type="submit"
                className="relative inline-flex w-full items-center justify-center gap-3 rounded-[var(--radius-xl)] border-2 border-on-surface/70 bg-surface-container-lowest px-6 py-3 font-body text-body-md font-semibold text-on-surface shadow-cardstock transition-transform duration-150 ease-out hover:animate-jiggle active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <GoogleMark />
                Continue with Google
              </button>
            </form>

            <p className="text-center font-body text-body-md text-on-surface-variant">
              We only ask Google for your name, email address, and profile
              picture.
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
