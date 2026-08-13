/**
 * Decorative hand-inked border overlay. Rendered as a sibling positioned
 * over its parent rather than a real `border`, so the sketchy wobble
 * (`.sketchy-edge`, see globals.css) distorts only the outline — never the
 * text/images inside the parent.
 *
 * Usage: give the parent `relative`, drop this in first, then wrap real
 * content in a `relative z-10` element so it paints above the border.
 */
export function SketchyBorder({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`sketchy-edge pointer-events-none absolute inset-0 rounded-[inherit] border-2 ${className}`}
    />
  );
}
