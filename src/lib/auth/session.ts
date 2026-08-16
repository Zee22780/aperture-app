import { redirect } from "next/navigation";

import { auth } from "./config";

/**
 * The signed-in user's id, or a redirect to sign-in.
 *
 * The `(app)` layout guard protects *pages*. Server actions and route
 * handlers are separate POST endpoints that never render through that layout,
 * so they are reachable by anyone who knows the URL and must check for
 * themselves. Every mutation and every query in this app starts here.
 *
 * `redirect` throws, so callers can treat the return as a plain string.
 */
export async function requireUserId(): Promise<string> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");
  return userId;
}
