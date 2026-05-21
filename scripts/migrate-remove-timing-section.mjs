#!/usr/bin/env node
/**
 * One-time migration: remove visible "## N. Timing Specific" sections and renumber body headings.
 *
 * Usage:
 *   node scripts/migrate-remove-timing-section.mjs
 *   node scripts/migrate-remove-timing-section.mjs --dry-run
 */

import { migrateAllTimingSections } from "./lib/mechanism-page-validation.mjs";

const dryRun = process.argv.includes("--dry-run");
const results = migrateAllTimingSections(process.cwd(), { dryRun });

const changed = results.filter((r) => r.changed);
console.log(dryRun ? "Dry run — no files written" : "Migration complete");
console.log(`  Files updated: ${changed.length}`);
for (const r of changed) {
  console.log(`    - ${r.filePath}`);
}
