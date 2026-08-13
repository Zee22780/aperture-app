import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db/client";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

/**
 * Auth.js (NextAuth v5) configuration.
 *
 * Google is the only provider in the MVP. The magic-link Email provider is
 * deferred, not removed — `verificationTokens` is still wired into the
 * adapter below so re-adding it later needs no migration.
 *
 * Provider credentials are read from the environment by convention:
 * AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET, plus AUTH_SECRET for cookie signing.
 * Auth.js picks these up automatically, so they are never named here.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
  // Sessions live in the `session` table rather than in a JWT. This is the
  // default when an adapter is present; stated explicitly because it is the
  // reason auth cannot be checked in `proxy.ts` — a database lookup needs the
  // Node runtime. Route protection happens in server components instead.
  session: { strategy: "database" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
});
