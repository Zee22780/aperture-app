import type { ReactNode } from "react";
import { SketchyBorder } from "./SketchyBorder";

type CardProps = {
  children: ReactNode;
  caption?: string;
  rotateDeg?: number;
  className?: string;
};

/**
 * "Polaroid / scrap of paper" card per DESIGN.md: white card stock, a
 * sketchy ink border, a cardstock shadow, and an optional label-caps
 * caption underneath — meant to be scattered and slightly rotated in a
 * collage layout rather than sitting in a rigid grid.
 */
export function Card({ children, caption, rotateDeg = 0, className = "" }: CardProps) {
  return (
    <div
      className={`relative inline-block rounded-[var(--radius-lg)] bg-surface-container-lowest p-3 shadow-cardstock ${className}`}
      style={rotateDeg ? { transform: `rotate(${rotateDeg}deg)` } : undefined}
    >
      <SketchyBorder className="border-on-surface/70" />
      <div className="relative z-10">
        {children}
        {caption ? (
          <p className="mt-2 font-label text-label-caps text-on-surface-variant uppercase">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}
