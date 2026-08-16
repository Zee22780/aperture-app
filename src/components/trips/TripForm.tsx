"use client";

import { useActionState } from "react";

import { Button, Input } from "@/components/ui";
import {
  emptyTripFormState,
  type TripFormState,
  type TripFormValues,
} from "@/lib/trips/validation";

type TripFormProps = {
  action: (state: TripFormState, formData: FormData) => Promise<TripFormState>;
  submitLabel: string;
  defaultValues?: Partial<TripFormValues>;
};

export function TripForm({ action, submitLabel, defaultValues }: TripFormProps) {
  const [state, formAction, pending] = useActionState(action, emptyTripFormState);

  // After a rejected submit the server echoes back what was typed; on first
  // render there is nothing to echo, so fall back to the caller's defaults.
  const values = { ...defaultValues, ...state.values };
  const fieldErrors = state.fieldErrors ?? {};

  return (
    // `noValidate` suppresses the browser's own validation bubbles so the
    // server's messages are the only ones shown — the server has to validate
    // regardless, and two competing error styles for one field reads as a bug.
    // `required` stays on the inputs, where it still marks the field for
    // assistive tech.
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {state.formError ? (
        <p
          role="alert"
          className="rounded-[var(--radius-md)] bg-error-container px-4 py-3 font-body text-body-md text-on-error-container"
        >
          {state.formError}
        </p>
      ) : null}

      <Input
        label="Trip name"
        name="name"
        defaultValue={values.name ?? ""}
        placeholder="Two weeks in Lisbon"
        error={fieldErrors.name}
        required
      />

      <Input
        label="Location"
        name="location"
        defaultValue={values.location ?? ""}
        placeholder="Lisbon, Portugal"
        error={fieldErrors.location}
        hint="Optional"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Start date"
          name="startDate"
          type="date"
          defaultValue={values.startDate ?? ""}
          error={fieldErrors.startDate}
          hint="Optional"
        />
        <Input
          label="End date"
          name="endDate"
          type="date"
          defaultValue={values.endDate ?? ""}
          error={fieldErrors.endDate}
          hint="Optional"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
