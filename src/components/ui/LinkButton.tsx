import Link from "next/link";
import type { ComponentProps } from "react";

import { SketchyBorder } from "./SketchyBorder";

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary";
};

const variantClasses: Record<NonNullable<LinkButtonProps["variant"]>, string> = {
  primary: "bg-secondary text-on-secondary",
  secondary: "bg-surface-container-low text-primary",
};

const variantBorderClasses: Record<NonNullable<LinkButtonProps["variant"]>, string> = {
  primary: "border-primary",
  secondary: "border-primary/60",
};

/**
 * A `Button`-looking navigation control. Deliberately a real `<Link>` rather
 * than a button with an onClick: "go to the new-trip page" is a navigation,
 * so it should be middle-clickable, openable in a new tab, and announced as
 * a link. Keep the visual treatment in step with `Button`.
 */
export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={`relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-xl)] px-6 py-3 font-body text-body-md font-semibold shadow-cardstock transition-transform duration-150 ease-out hover:animate-jiggle active:translate-x-1 active:translate-y-1 active:shadow-none ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <SketchyBorder className={variantBorderClasses[variant]} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}
