#!/usr/bin/env node
/**
 * Patch BRS hub pages: Dietary and Lifestyle Levers section title + intro;
 * refresh System Optimisation Practices panels from curated data.
 * @see scripts/data/brs-hub-levers-intro.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { patchHubLeversSectionContent } from "./lib/brs-hub-levers-section-patch.mjs";
import { HUB_PAGES } from "./lib/brs-hub-levers.mjs";

const ROOT = process.cwd();

let patched = 0;
for (const [brsId, hubPath] of Object.entries(HUB_PAGES)) {
  const full = path.join(ROOT, hubPath);
  let content = fs.readFileSync(full, "utf8");
  const before = content;
  content = patchHubLeversSectionContent(content, brsId, ROOT);
  if (content === before) {
    console.warn(`No change: ${hubPath}`);
    continue;
  }
  fs.writeFileSync(full, content);
  patched++;
  console.log(`${brsId}: patched ${hubPath}`);
}

console.log(`\nPatched ${patched} hub page(s)`);
