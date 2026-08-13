import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  tone?: "teal" | "ochre";
  rotateDeg?: number;
  className?: string;
};

const toneClasses: Record<NonNullable<ChipProps["tone"]>, string> = {
  teal: "bg-primary/25",
  ochre: "bg-tertiary/25",
};

/**
 * "Washi tape" chip per DESIGN.md: a semi-transparent tinted strip with
 * torn/jagged ends, used for tags and category labels.
 */
export function Chip({ children, tone = "ochre", rotateDeg = 0, className = "" }: ChipProps) {
  return (
    <span
      className={`washi-tape inline-flex items-center px-4 py-1.5 font-label text-label-caps text-on-surface uppercase ${toneClasses[tone]} ${className}`}
      style={rotateDeg ? { transform: `rotate(${rotateDeg}deg)` } : undefined}
    >
      {children}
    </span>
  );
}
