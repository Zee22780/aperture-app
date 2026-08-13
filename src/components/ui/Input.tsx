import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

/**
 * Notebook-line input per DESIGN.md: no box, just an underline in
 * "charcoal ink" that highlights in primary teal on focus.
 */
export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      {label ? (
        <span className="font-label text-label-caps text-on-surface-variant uppercase">
          {label}
        </span>
      ) : null}
      <input
        id={inputId}
        className={`border-0 border-b-2 border-on-surface bg-transparent px-1 py-2 font-body text-body-md text-on-surface outline-none placeholder:text-on-surface-variant/60 focus:border-primary ${className}`}
        {...props}
      />
    </label>
  );
}
