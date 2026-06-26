#!/usr/bin/env node
/**
 * Convert BRS hub ADHD <details> blocks to shared brs-fm-hub collapsible style.
 *
 * Usage: node scripts/migrate-brs-hub-adhd-collapsible.mjs [--brs=1]
 */
import fs from "node:fs";
import path from "node:path";
import { buildHubCollapsibleBlock } from "./lib/hub-collapsible.mjs";

const BRS_BASE = path.join(process.cwd(), "docs/biological-targets");

const HUB_FILES = {
  1: "neurotransmitter-regulation.md",
  2: "methylation-one-carbon-metabolism.md",
  3: "inflammation-oxidative-stress.md",
  4: "mitochondrial-function-bioenergetics.md",
  5: "gut-brain-axis-enteric-nervous-system.md",
  6: "metabolic-neuroendocrine-stress.md",
};

const ADHD_DETAILS_RE =
  /<details>\s*<summary><strong>(ADHD:[^<]+)<\/strong><\/summary>\s*([\s\S]*?)<\/details>/g;

const brsFilter = process.argv.find((a) => a.startsWith("--brs="))?.split("=")[1];

let updated = 0;

for (const [brsNum, file] of Object.entries(HUB_FILES)) {
  if (brsFilter && brsNum !== brsFilter) continue;

  const hubPath = path.join(BRS_BASE, file);
  const content = fs.readFileSync(hubPath, "utf8");
  const next = content.replace(ADHD_DETAILS_RE, (_, title, body) =>
    buildHubCollapsibleBlock(title.trim(), body),
  );

  if (next === content) {
    console.warn(`No ADHD <details> change: ${file}`);
    continue;
  }

  fs.writeFileSync(hubPath, next);
  updated++;
  console.log(`Updated ADHD collapsible: ${file}`);
}

console.log(`\nDone: ${updated} hub file(s)`);
