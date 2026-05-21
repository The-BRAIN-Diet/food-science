#!/usr/bin/env node
/**
 * Generate BRS ontology pages from the six-systems spreadsheet.
 *
 * Usage:
 *   node scripts/generate-brs-from-spreadsheet.mjs --brs BRS2
 *   node scripts/generate-brs-from-spreadsheet.mjs --brs BRS2 --xlsx "/path/to/the six systems.xlsx"
 *   node scripts/generate-brs-from-spreadsheet.mjs --brs BRS2 --dry-run
 */

import {
  generateBrsFromSpreadsheet,
  writeBrsHubPage,
} from "./lib/brs-spreadsheet-generate.mjs";

const args = process.argv.slice(2);
const brsIdx = args.indexOf("--brs");
const xlsxIdx = args.indexOf("--xlsx");
const brs = brsIdx >= 0 ? args[brsIdx + 1] : "BRS2";
const xlsxPath =
  xlsxIdx >= 0
    ? args[xlsxIdx + 1]
    : "/Users/paulhouston/Downloads/the six systems.xlsx";
const dryRun = args.includes("--dry-run");

const HUB_BY_BRS = {
  BRS2: {
    hubDocId: "methylation-one-carbon-metabolism",
    hubTitle: "BRS2 - Methylation & One-Carbon Metabolism",
  },
};

function main() {
  const hub = HUB_BY_BRS[brs];
  if (!hub) {
    console.error(`No hub mapping for ${brs}. Add to HUB_BY_BRS in generate script.`);
    process.exit(1);
  }

  const result = generateBrsFromSpreadsheet({ brs, xlsxPath, dryRun });
  const hubPath = writeBrsHubPage({
    brs,
    ...hub,
    slugById: result.slugById,
    byKind: result.byKind,
    dryRun,
  });

  console.log(dryRun ? "Dry run — no files written" : "BRS generation complete");
  console.log(`  BRS: ${brs}`);
  console.log(`  Files: ${result.written.length}`);
  console.log(`  Hub: ${hubPath}`);
  console.log(`  FM: ${result.byKind.FM.length}, PM: ${result.byKind.PM.length}, KC: ${result.byKind.KC.length}`);
}

main();
