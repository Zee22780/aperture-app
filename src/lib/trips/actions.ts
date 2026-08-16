"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUserId } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { trips } from "@/lib/db/schema";

import {
  readTripFormValues,
  toFieldErrors,
  tripInputSchema,
  type TripFormState,
} from "./validation";

/**
 * Create a trip owned by the signed-in user.
 *
 * Shaped for `useActionState`, so it returns a state object on failure rather
 * than throwing — a rejected form should re-render with the messages and the
 * user's own input intact, not blow up into an error boundary.
 *
 * `requireUserId()` is not redundant with the `(app)` layout guard. Server
 * actions are POST endpoints reachable directly, and they never render through
 * that layout, so the check has to happen here too.
 */
export async function createTrip(
  _prevState: TripFormState,
  formData: FormData,
): Promise<TripFormState> {
  const userId = await requireUserId();
  const values = readTripFormValues(formData);

  const parsed = tripInputSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: toFieldErrors(parsed.error), values };
  }

  let tripId: string;
  try {
    // `userId` comes from the session, never from the form — the client has
    // no say in who owns the row it just created.
    const [created] = await db
      .insert(trips)
      .values({ ...parsed.data, userId })
      .returning({ id: trips.id });

    tripId = created.id;
  } catch {
    return {
      formError: "Couldn't save that trip. Please try again.",
      values,
    };
  }

  revalidatePath("/trips");
  // Outside the try — `redirect` works by throwing a control-flow exception,
  // so a catch around it would swallow the navigation and report a fake
  // save failure instead.
  redirect(`/trips/${tripId}`);
}
