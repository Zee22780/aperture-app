import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/config";

/**
 * No landing page yet — the root just sends you where you can actually go.
 * Replace this with a real marketing/intro page if one is ever wanted.
 */
export default async function Home() {
  const session = await auth();
  redirect(session?.user ? "/trips" : "/sign-in");
}
