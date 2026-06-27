#!/usr/bin/env node
/**
 * Generate BRS hub dietary/lifestyle lever rollups from PM pages and patch hub .md files.
 * @see system/brs-hub-levers-schema.md
 */
import fs from "node:fs";
import path from "node:path";
import {
  HUB_PAGES,
  buildBrsHubLeversRegistry,
  patchHubPage,
  renderHubLeversHtml,
} from "./lib/brs-hub-levers.mjs";

const ROOT = process.cwd();
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
