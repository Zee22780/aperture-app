"use server";

import { signIn, signOut } from "./config";

/** Where a user lands after signing in, when nothing else was requested. */
const DEFAULT_LANDING = "/trips";

/**
 * Only same-site paths are honoured as a post-sign-in destination. Auth.js's
 * own `redirect` callback already refuses cross-origin targets, but the value
 * arrives from a form field, so it gets narrowed to a relative path here too
 * rather than relying on a single layer to hold.
 *
 * `//evil.example` is rejected as well — browsers read a leading double slash
 * as a protocol-relative absolute URL, so it is not the local path it looks
 * like.
 */
function safeRedirect(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return DEFAULT_LANDING;
  if (!value.startsWith("/") || value.startsWith("//")) return DEFAULT_LANDING;
  return value;
}

export async function signInWithGoogle(formData: FormData) {
  await signIn("google", { redirectTo: safeRedirect(formData.get("callbackUrl")) });
}

export async function signOutEverywhere() {
  await signOut({ redirectTo: "/sign-in" });
}
