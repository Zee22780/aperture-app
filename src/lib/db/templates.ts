import type { TemplateSlot } from "./schema";

/**
 * The 11 layout templates, transcribed from the physical journal's own
 * design system (see "Travel Journal Companion App — Product Brief.md").
 * This is the source of truth `seed.ts` writes into `layout_templates` —
 * edit here, then re-run `pnpm db:seed`, rather than editing rows by hand.
 */
export type TemplateSeed = {
  id: string;
  family: "editorial" | "cinematic";
  name: string;
  slotMap: TemplateSlot[];
  bestFor: string[];
};

export const layoutTemplateSeeds: TemplateSeed[] = [
  {
    id: "editorial-feature",
    family: "editorial",
    name: "Editorial Feature",
    slotMap: [
      { id: "section_label", label: "Section label", kind: "label" },
      { id: "location_header", label: "Location header", kind: "label" },
      { id: "title", label: "Large editorial title", kind: "text" },
      { id: "hero_image", label: "Hero image", kind: "image" },
      { id: "journal_text", label: "Journal text", kind: "text" },
      { id: "detail_image", label: "Small detail image", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "caption", label: "Caption", kind: "text" },
    ],
    bestFor: ["mixed imagery with meaningful writing", "the workhorse, general-purpose spread"],
  },
  {
    id: "giant-type",
    family: "editorial",
    name: "Giant Type",
    slotMap: [
      { id: "giant_title", label: "Giant typographic title", kind: "text" },
      { id: "journal_text", label: "Journal text", kind: "text" },
      { id: "small_sketch", label: "Small sketch", kind: "image" },
      { id: "image", label: "Image", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "caption", label: "Caption", kind: "text" },
    ],
    bestFor: [
      "a location, phrase, or neighborhood with strong personality",
      "a single word or short phrase as the illustration",
    ],
  },
  {
    id: "giant-date",
    family: "editorial",
    name: "Giant Date",
    slotMap: [
      { id: "location_label", label: "Location label", kind: "label" },
      { id: "day_label", label: "Day label (e.g. Day Six)", kind: "label" },
      { id: "giant_date", label: "Giant date", kind: "text" },
      { id: "hero_image", label: "Hero image", kind: "image" },
      { id: "journal_text", label: "Journal text", kind: "text" },
      { id: "small_image_1", label: "Small image", kind: "image" },
      { id: "small_image_2", label: "Small image", kind: "image" },
    ],
    bestFor: ["opening or emphasizing a particular day", "a strong date-driven framing"],
  },
  {
    id: "image-essay",
    family: "editorial",
    name: "Image + Essay",
    slotMap: [
      { id: "title", label: "Title", kind: "text" },
      { id: "journal_text", label: "Journal text (long-form)", kind: "text" },
      { id: "pull_quote", label: "Pull quote", kind: "text" },
      { id: "illustration", label: "Illustration", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "caption", label: "Caption", kind: "text" },
    ],
    bestFor: [
      "memories where reflection and writing deserve substantial space",
      "text-heavy, essay-like entries",
    ],
  },
  {
    id: "visual-archive",
    family: "editorial",
    name: "Visual Archive",
    slotMap: [
      { id: "section_title", label: "Section title (e.g. Things I Noticed)", kind: "label" },
      { id: "location_header", label: "Location header", kind: "label" },
      { id: "grid_image_1", label: "Grid image 1", kind: "image" },
      { id: "grid_image_2", label: "Grid image 2", kind: "image" },
      { id: "grid_image_3", label: "Grid image 3", kind: "image" },
      { id: "grid_image_4", label: "Grid image 4", kind: "image" },
      { id: "grid_image_5", label: "Grid image 5", kind: "image" },
      { id: "grid_image_6", label: "Grid image 6", kind: "image" },
      { id: "captions", label: "Numbered captions", kind: "text" },
      { id: "date", label: "Date", kind: "label" },
    ],
    bestFor: [
      "food, signs, storefronts, tickets, objects, purchases",
      "architectural details and street observations",
      "small discoveries — particularly compatible with audio/video entries as numbered items",
    ],
  },
  {
    id: "illustrated-broadsheet",
    family: "editorial",
    name: "Illustrated Broadsheet",
    slotMap: [
      { id: "headline", label: "Large headline across the spread", kind: "text" },
      { id: "text_column_left", label: "Left text column", kind: "text" },
      { id: "text_column_right", label: "Right text column", kind: "text" },
      { id: "large_drawing", label: "Large central drawing", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "caption_notes", label: "Caption / notes", kind: "text" },
    ],
    bestFor: [
      "one detailed subject with a strong silhouette",
      "flowers, sculpture, architecture, food, people, or objects",
    ],
  },
  {
    id: "editorial-poster",
    family: "editorial",
    name: "Editorial Poster",
    slotMap: [
      { id: "eyebrow_label", label: "Eyebrow label (e.g. Travel Notes)", kind: "label" },
      { id: "location_label", label: "Location label", kind: "label" },
      { id: "big_title", label: "Big title", kind: "text" },
      { id: "hero_image", label: "Hero image", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "large_phrase", label: "Large phrase / location", kind: "text" },
      { id: "tiny_notes", label: "Tiny notes / caption", kind: "text" },
    ],
    bestFor: ["one visually strong moment", "relatively little writing"],
  },
  {
    id: "cinematic-sequence",
    family: "editorial",
    name: "Cinematic Sequence",
    slotMap: [
      { id: "date_label", label: "Date label", kind: "label" },
      { id: "location_label", label: "Location label", kind: "label" },
      { id: "sequence_image_1", label: "Sequence image 1", kind: "image" },
      { id: "sequence_image_2", label: "Sequence image 2", kind: "image" },
      { id: "sequence_image_3", label: "Sequence image 3", kind: "image" },
      { id: "huge_word", label: "Huge number / word", kind: "text" },
      { id: "journal_text", label: "Journal text", kind: "text" },
      { id: "sequence_image_4", label: "Sequence image 4", kind: "image" },
      { id: "year_label", label: "Year", kind: "label" },
    ],
    bestFor: [
      "chronological experiences (morning → lunch → wandering → evening)",
      "several short recordings or videos across different moments",
    ],
  },
  {
    id: "movie-poster",
    family: "cinematic",
    name: "Movie Poster",
    slotMap: [
      { id: "large_portrait", label: "Large portrait / background architecture", kind: "image" },
      { id: "presents_header", label: "\"Presents\" header (e.g. Firenze Presents)", kind: "label" },
      { id: "hero_illustration", label: "Hero illustration", kind: "image" },
      { id: "journal_text", label: "Journal text", kind: "text" },
      { id: "small_drawing", label: "Small drawing", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "movie_title", label: "Expressive movie title", kind: "text" },
      { id: "tiny_credits", label: "Tiny credits", kind: "text" },
    ],
    bestFor: [
      "dramatic, romantic, funny, glamorous, mysterious, or cinematic memories",
      "a QR code worked into the fake credits as a \"soundtrack\" or \"scene\"",
    ],
  },
  {
    id: "cinematic-montage",
    family: "cinematic",
    name: "Cinematic Montage",
    slotMap: [
      { id: "architecture_skyline", label: "Architecture / skyline", kind: "image" },
      { id: "large_scene", label: "Large scene", kind: "image" },
      { id: "huge_diagonal_title", label: "Huge diagonal title", kind: "text" },
      { id: "giant_object", label: "Giant object", kind: "image" },
      { id: "large_portrait", label: "Large portrait", kind: "image" },
      { id: "tiny_secondary_scene", label: "Tiny secondary scene", kind: "image" },
      { id: "date", label: "Date", kind: "label" },
      { id: "tiny_credits", label: "Tiny credits", kind: "text" },
    ],
    bestFor: [
      "several memories that collectively communicate the feeling of an experience",
      "abandoning realistic scale on purpose",
      "audio/video framed as part of the fictional cinematic language",
    ],
  },
  {
    id: "illustrated-title-card",
    family: "cinematic",
    name: "Illustrated Title Card",
    slotMap: [
      { id: "moon_motif", label: "Moon / small motif", kind: "image" },
      { id: "large_figure", label: "Large figure / object", kind: "image" },
      { id: "simplified_skyline", label: "Simplified skyline illustration", kind: "image" },
      { id: "atmospheric_phrase", label: "Atmospheric phrase (e.g. una sera a Firenze...)", kind: "text" },
      { id: "enormous_title", label: "Enormous display title", kind: "text" },
      { id: "date", label: "Date", kind: "label" },
      { id: "tiny_credits", label: "Tiny credits", kind: "text" },
    ],
    bestFor: [
      "pure atmosphere — night, rain, lights, dusk, arriving or leaving, quiet walks",
      "emotionally resonant moments",
      "one of the strongest formats for ambient field recordings",
    ],
  },
];
