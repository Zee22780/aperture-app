import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  /** Validation message for this field. Its presence also reddens the
   *  underline, so the error is not carried by text colour alone. */
  error?: string;
  /** Rendered under the input when there's no error — format hints and the
   *  like, e.g. "Optional". */
  hint?: string;
};

/**
 * Notebook-line input per DESIGN.md: no box, just an underline in
 * "charcoal ink" that highlights in primary teal on focus.
 */
export function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  // Points the input at whichever line is actually rendered below it, so a
  // screen reader announces the error (or the hint) along with the field
  // instead of leaving it as unattached text.
  const messageId = inputId ? `${inputId}-message` : undefined;
  const message = error ?? hint;

  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label ? (
        <span className="font-label text-label-caps text-on-surface-variant uppercase">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={`border-0 border-b-2 bg-transparent px-1 py-2 font-body text-body-md text-on-surface outline-none placeholder:text-on-surface-variant/60 focus:border-primary ${
          error ? "border-error" : "border-on-surface"
        } ${className}`}
        {...props}
      />
      {message ? (
        // Errors take body type so they're plainly legible; hints take the
        // quieter label treatment (DESIGN.md's "Space Mono for labels/data")
        // so they sit under the field without competing with what's typed
        // in it.
        <span
          id={messageId}
          className={
            error
              ? "font-body text-body-md text-error"
              : "font-label text-label-caps text-on-surface-variant uppercase"
          }
        >
          {message}
        </span>
      ) : null}
    </label>
  );
}
