#!/usr/bin/env node
/**
 * Generate BRS hub dietary/lifestyle lever rollups from PM pages and patch hub .md files.
 *
 * DISABLED for migrated BRS1–BRS6 hubs — use `npm run brs:patch-hub-levers-section` instead.
 * @see system/brs-hub-levers-schema.md
 */
import fs from "node:fs";
import path from "node:path";
import { assertLegacyHubLeversGeneratorAllowed } from "./lib/brs-hub-migrated-guard.mjs";
import {
  HUB_PAGES,
  buildBrsHubLeversRegistry,
  patchHubPage,
  renderHubLeversHtml,
} from "./lib/brs-hub-levers.mjs";

const ROOT = process.cwd();

try {
  assertLegacyHubLeversGeneratorAllowed(ROOT);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const OUT_JSON = path.join(ROOT, "src/data/brs-hub-levers.generated.json");

const registry = buildBrsHubLeversRegistry(ROOT);
fs.writeFileSync(OUT_JSON, `${JSON.stringify(registry, null, 2)}\n`);

let patched = 0;
for (const [brsId, hubPath] of Object.entries(HUB_PAGES)) {
  const rollup = registry.brs[brsId];
  if (!rollup) {
    console.warn(`Skip ${brsId}: no PM extractions`);
    continue;
  }
  const html = renderHubLeversHtml(rollup, brsId);
  patchHubPage(hubPath, html, ROOT);
  patched++;
  console.log(
    `${brsId}: ${rollup.stats.pm_count} PMs → ${rollup.stats.unique_foods} foods, ${rollup.stats.unique_lifestyle} lifestyle priorities`,
  );
}

console.log(`\nWrote ${OUT_JSON}`);
console.log(`Patched ${patched} hub pages`);
