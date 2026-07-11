#!/usr/bin/env node
/**
 * Patch BRS hub pages with condensed Key Constraints (Dietary Bottlenecks) sections.
 * @see scripts/lib/brs-hub-key-constraints.mjs
 */
import {
  HUB_PAGES,
  buildHubKeyConstraintsData,
  patchHubKeyConstraints,
  renderHubKeyConstraintsHtml,
} from "./lib/brs-hub-key-constraints.mjs";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const brsFilter = args.includes("--brs") ? args[args.indexOf("--brs") + 1] : null;

let patched = 0;
for (const [brsId, hubPath] of Object.entries(HUB_PAGES)) {
  if (brsFilter && brsId !== brsFilter) continue;

  const data = buildHubKeyConstraintsData(brsId, ROOT);
  if (!data.kcs.length) {
    console.warn(`Skip ${brsId}: no KC pages`);
    continue;
  }

  const html = renderHubKeyConstraintsHtml(brsId, data);
  patchHubKeyConstraints(hubPath, html, ROOT);
  patched++;
  console.log(
    `${brsId}: ${data.kcs.length} KC(s), ${data.foods.length} target foods → ${hubPath}`,
  );
}

console.log(`\nPatched ${patched} hub page(s)`);
