import type { ButtonHTMLAttributes } from "react";
import { SketchyBorder } from "./SketchyBorder";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-secondary text-on-secondary",
  secondary: "bg-surface-container-low text-primary",
};

const variantBorderClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "border-primary",
  secondary: "border-primary/60",
};

/**
 * "Large, tactile sticker" button per DESIGN.md: solid fill, sketchy
 * hand-inked border, jiggles on hover, presses into the page on click.
 */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-xl)] px-6 py-3 font-body text-body-md font-semibold shadow-cardstock transition-transform duration-150 ease-out hover:animate-jiggle active:translate-x-1 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <SketchyBorder className={variantBorderClasses[variant]} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
