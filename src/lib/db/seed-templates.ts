// Run via `pnpm db:seed`, which passes `--env-file=.env.local` to tsx so
// DATABASE_URL is set before `./client` reads it — ESM imports are
// hoisted, so a dotenv.config() call here would run too late.
import { db } from "./client";
import { layoutTemplates } from "./schema";
import { layoutTemplateSeeds } from "./templates";

async function seed() {
  for (const template of layoutTemplateSeeds) {
    await db
      .insert(layoutTemplates)
      .values(template)
      .onConflictDoUpdate({
        target: layoutTemplates.id,
        set: {
          family: template.family,
          name: template.name,
          slotMap: template.slotMap,
          bestFor: template.bestFor,
        },
      });
  }

  console.log(`Seeded ${layoutTemplateSeeds.length} layout templates.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
