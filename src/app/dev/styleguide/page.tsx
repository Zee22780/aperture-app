import { notFound } from "next/navigation";

import { Button, Card, Chip, Input } from "@/components/ui";

const colorGroups: { title: string; swatches: { name: string; className: string; hex: string }[] }[] = [
  {
    title: "Surface",
    swatches: [
      { name: "surface", className: "bg-surface", hex: "#fcf9ee" },
      { name: "surface-dim", className: "bg-surface-dim", hex: "#dddacf" },
      { name: "surface-container-lowest", className: "bg-surface-container-lowest", hex: "#ffffff" },
      { name: "surface-container-low", className: "bg-surface-container-low", hex: "#f7f4e9" },
      { name: "surface-container", className: "bg-surface-container", hex: "#f1eee3" },
      { name: "surface-container-high", className: "bg-surface-container-high", hex: "#ebe8dd" },
      { name: "surface-container-highest", className: "bg-surface-container-highest", hex: "#e5e2d8" },
      { name: "on-surface", className: "bg-on-surface", hex: "#1c1c15" },
    ],
  },
  {
    title: "Primary (teal ink)",
    swatches: [
      { name: "primary", className: "bg-primary", hex: "#00626e" },
      { name: "primary-container", className: "bg-primary-container", hex: "#2a7b88" },
      { name: "inverse-primary", className: "bg-inverse-primary", hex: "#87d2e0" },
    ],
  },
  {
    title: "Secondary (terracotta)",
    swatches: [
      { name: "secondary", className: "bg-secondary", hex: "#994618" },
      { name: "secondary-container", className: "bg-secondary-container", hex: "#ff9560" },
    ],
  },
  {
    title: "Tertiary (ochre)",
    swatches: [
      { name: "tertiary", className: "bg-tertiary", hex: "#755200" },
      { name: "tertiary-container", className: "bg-tertiary-container", hex: "#946900" },
    ],
  },
];

export default function StyleguidePage() {
  // Local-only. This page exists to check the design system by eye, and
  // there's no reason to serve it publicly. `notFound()` gives a real 404
  // rather than a redirect, so the route doesn't advertise that it exists.
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-16 px-[var(--space-margin-page)] py-16">
      <header>
        <p className="font-label text-label-caps text-on-surface-variant uppercase">
          Dev only — not linked from the app
        </p>
        <h1 className="mt-2 -rotate-1 font-display text-display-lg">Field Notes &amp; Wanderlust</h1>
        <p className="mt-3 max-w-xl font-body text-body-lg text-on-surface-variant">
          Every design-system primitive in one place, for checking against DESIGN.md by eye.
        </p>
      </header>

      {/* Typography */}
      <section className="flex flex-col gap-4">
        <h2 className="font-label text-label-caps text-on-surface-variant uppercase">Typography</h2>
        <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-outline-variant bg-surface-container-low p-6">
          <p className="rotate-1 font-display text-display-lg">Santo Spirito</p>
          <p className="-rotate-1 font-display text-headline-md">Firenze · Gennaio 2025</p>
          <p className="font-display text-headline-sm">Things I noticed</p>
          <p className="font-body text-body-lg">
            Church bells, voices in the piazza, chairs scraping across the pavement.
          </p>
          <p className="font-body text-body-md text-on-surface-variant">
            body-md — the default reading size for journal text and captions.
          </p>
          <p className="font-label text-label-caps text-on-surface-variant uppercase">
            label-caps · jan06 / 2025 · 43.7696°N
          </p>
        </div>
      </section>

      {/* Colors */}
      <section className="flex flex-col gap-4">
        <h2 className="font-label text-label-caps text-on-surface-variant uppercase">Colors</h2>
        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <p className="font-body text-body-md text-on-surface-variant">{group.title}</p>
            <div className="flex flex-wrap gap-3">
              {group.swatches.map((swatch) => (
                <div key={swatch.name} className="flex w-32 flex-col gap-1.5">
                  <div
                    className={`h-16 rounded-[var(--radius-default)] border border-outline-variant ${swatch.className}`}
                  />
                  <p className="font-label text-[10px] text-on-surface-variant">{swatch.name}</p>
                  <p className="font-label text-[10px] text-on-surface-variant">{swatch.hex}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Buttons */}
      <section className="flex flex-col gap-4">
        <h2 className="font-label text-label-caps text-on-surface-variant uppercase">Buttons</h2>
        <div className="flex flex-wrap items-center gap-6 rounded-[var(--radius-lg)] border border-outline-variant bg-surface-container-low p-6">
          <Button variant="primary">Create memory</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* Chips */}
      <section className="flex flex-col gap-4">
        <h2 className="font-label text-label-caps text-on-surface-variant uppercase">Chips</h2>
        <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-lg)] border border-outline-variant bg-surface-container-low p-6">
          <Chip tone="teal" rotateDeg={-2}>
            Editorial
          </Chip>
          <Chip tone="ochre" rotateDeg={1.5}>
            Cinematic
          </Chip>
          <Chip tone="teal">Field recording</Chip>
        </div>
      </section>

      {/* Inputs */}
      <section className="flex flex-col gap-4">
        <h2 className="font-label text-label-caps text-on-surface-variant uppercase">Inputs</h2>
        <div className="flex max-w-sm flex-col gap-6 rounded-[var(--radius-lg)] border border-outline-variant bg-surface-container-low p-6">
          <Input label="Title" name="title" placeholder="Santo Spirito" />
          <Input label="Location" name="location" placeholder="Firenze, Italia" hint="Optional" />
          <Input label="Start date" name="startDate" type="date" />
          <Input
            label="Trip name"
            name="tripName"
            defaultValue=""
            error="Give your trip a name."
          />
        </div>
      </section>

      {/* Cards */}
      <section className="flex flex-col gap-4">
        <h2 className="font-label text-label-caps text-on-surface-variant uppercase">Cards</h2>
        <div className="flex flex-wrap items-start gap-8 rounded-[var(--radius-lg)] border border-outline-variant bg-surface-container-low p-10">
          <Card rotateDeg={-2} caption="Santo Spirito · Jan 06 / 2025">
            <div className="flex h-40 w-40 items-center justify-center rounded-[var(--radius-sm)] bg-surface-container-highest font-label text-[10px] text-on-surface-variant">
              photo
            </div>
          </Card>
          <Card rotateDeg={1.5} caption="Field recording · 00:47" className="-ml-6">
            <div className="flex h-40 w-40 items-center justify-center rounded-[var(--radius-sm)] bg-surface-container-highest font-label text-[10px] text-on-surface-variant">
              waveform
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
