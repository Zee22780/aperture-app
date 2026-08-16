import { z } from "zod";

/**
 * A trip as the form submits it. Everything but the name is optional — a trip
 * you're still planning may have no dates, and "somewhere in Portugal" is a
 * legitimate non-answer for location.
 *
 * Empty strings are normalised to `null` rather than stored: an empty text
 * input and a deliberately blank field are the same thing to a reader, and
 * keeping both `""` and `null` in the column means every read site has to
 * handle two flavours of "nothing".
 */
const optionalText = z
  .string()
  .trim()
  .max(200, { error: "Keep this under 200 characters." })
  .transform((value) => (value === "" ? null : value));

/** `<input type="date">` submits `YYYY-MM-DD`, or `""` when left blank. */
const optionalDate = z
  .string()
  .trim()
  .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    error: "Use a real date.",
  })
  .transform((value) => (value === "" ? null : value));

export const tripInputSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { error: "Give your trip a name." })
      .max(120, { error: "Keep the name under 120 characters." }),
    location: optionalText,
    startDate: optionalDate,
    endDate: optionalDate,
  })
  .refine((trip) => !trip.startDate || !trip.endDate || trip.endDate >= trip.startDate, {
    error: "The end date can't be before the start date.",
    path: ["endDate"],
  });

export type TripInput = z.infer<typeof tripInputSchema>;

/** The raw strings as typed, echoed back so a rejected form re-renders with
 *  the user's own input still in it rather than blanking their work. */
export type TripFormValues = {
  name: string;
  location: string;
  startDate: string;
  endDate: string;
};

export type TripFormState = {
  /** Whole-form problems: a failed write, an expired session. */
  formError?: string;
  /** Per-field messages, keyed by input name. */
  fieldErrors?: Partial<Record<keyof TripFormValues, string>>;
  values?: TripFormValues;
};

export const emptyTripFormState: TripFormState = {};

export function readTripFormValues(formData: FormData): TripFormValues {
  const read = (key: keyof TripFormValues) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    name: read("name"),
    location: read("location"),
    startDate: read("startDate"),
    endDate: read("endDate"),
  };
}

/**
 * Collapses Zod's per-field arrays into one message each — the form shows a
 * single line under an input, so the extra messages have nowhere to go.
 */
export function toFieldErrors(error: z.ZodError<TripInput>): TripFormState["fieldErrors"] {
  const { fieldErrors } = z.flattenError(error);
  const collapsed: TripFormState["fieldErrors"] = {};

  for (const [field, messages] of Object.entries(fieldErrors)) {
    const [first] = messages as string[];
    if (first) collapsed[field as keyof TripFormValues] = first;
  }

  return collapsed;
}
