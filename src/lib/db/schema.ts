import {
  date,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/* ------------------------------------------------------------------ */
/* Auth.js tables — shape matches what @auth/drizzle-adapter expects  */
/* (wired up in milestone 4). Table/column names follow the adapter's */
/* own convention so it can be dropped in without a schema rewrite.   */
/* ------------------------------------------------------------------ */

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [primaryKey({ columns: [account.provider, account.providerAccountId] })],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

/* ------------------------------------------------------------------ */
/* App data                                                           */
/* ------------------------------------------------------------------ */

export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  location: text("location"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const memories = pgTable("memories", {
  id: uuid("id").primaryKey().defaultRandom(),
  tripId: uuid("trip_id")
    .notNull()
    .references(() => trips.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  dateTime: timestamp("date_time"),
  location: text("location"),
  caption: text("caption"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const memoryPhotos = pgTable("memory_photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  memoryId: uuid("memory_id")
    .notNull()
    .references(() => memories.id, { onDelete: "cascade" }),
  blobUrl: text("blob_url").notNull(),
  width: integer("width"),
  height: integer("height"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/**
 * A single named region within a layout (e.g. "hero photo here," "title
 * here") — the loose, non-pixel-precise composition unit the design doc
 * calls for. `kind` is a hint for how the renderer draws the placeholder
 * box, not a pixel-precise spec.
 */
export type TemplateSlot = {
  id: string;
  label: string;
  kind: "image" | "text" | "label";
};

export const layoutTemplates = pgTable("layout_templates", {
  /** Stable slug, e.g. "editorial-feature" — this is the `template_id`
   *  the model output and the validation gate both reference. */
  id: text("id").primaryKey(),
  family: text("family").notNull(), // "editorial" | "cinematic"
  name: text("name").notNull(),
  slotMap: jsonb("slot_map").$type<TemplateSlot[]>().notNull(),
  bestFor: text("best_for").array().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const suggestions = pgTable("suggestions", {
  id: uuid("id").primaryKey().defaultRandom(),
  memoryId: uuid("memory_id")
    .notNull()
    .references(() => memories.id, { onDelete: "cascade" }),
  templateId: text("template_id")
    .notNull()
    .references(() => layoutTemplates.id),
  rank: integer("rank").notNull(),
  fitLabel: text("fit_label").notNull(), // "strong" | "good" | "loose"
  fitReasoning: text("fit_reasoning").notNull(),
  /** slot id -> loose description of what goes there, e.g.
   *  { hero_image: "the wide piazza shot with warm evening light" } */
  regionAssignment: jsonb("region_assignment").$type<Record<string, string>>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
