#!/usr/bin/env node
/**
 * Generate or audit PM §5 Mechanistic Basis from spreadsheet rows or flag placeholders.
 *
 * Usage:
 *   node scripts/generate-pm-mechanistic-basis.mjs --audit
 *   node scripts/generate-pm-mechanistic-basis.mjs --spreadsheet path/to/pm-rows.json
 *   node scripts/generate-pm-mechanistic-basis.mjs --spreadsheet path/to/pm-rows.json --dry-run
 *
 * Spreadsheet JSON: array of PM rows (see scripts/lib/pm-mechanistic-basis.mjs header).
 * Hook: call from BRS spreadsheet conversion after PM MDX shell is written.
 */

import {
  applyFromSpreadsheetRows,
  auditAllPmPages,
} from "./lib/pm-mechanistic-basis.mjs";

const args = process.argv.slice(2);
const audit = args.includes("--audit");
const dryRun = args.includes("--dry-run");
const spreadsheetIdx = args.indexOf("--spreadsheet");
const spreadsheetPath =
  spreadsheetIdx >= 0 ? args[spreadsheetIdx + 1] : null;

async function main() {
  if (spreadsheetPath) {
    const fs = await import("node:fs");
    const rows = JSON.parse(fs.readFileSync(spreadsheetPath, "utf8"));
    const results = applyFromSpreadsheetRows(rows, { dryRun });
    const applied = results.filter((r) => r.applied);
    const skipped = results.filter((r) => !r.applied);
    console.log(
      `PM mechanistic basis: ${applied.length} applied, ${skipped.length} skipped (no mechanistic_detail.blocks).`,
    );
    if (skipped.length) {
      for (const s of skipped) {
        console.log(`  SKIP ${s.pm_id}: ${s.reason}`);
      }
    }
    if (dryRun) console.log("(dry-run: no files written)");
    process.exit(skipped.length && !applied.length ? 1 : 0);
  }

  const audits = auditAllPmPages();
  const bad = audits.filter((a) => !a.ok);

  if (audit || !spreadsheetPath) {
    console.log(`PM §5 audit: ${audits.length} pages, ${bad.length} need mechanistic detail.`);
    for (const a of bad) {
      console.log(`  FAIL ${a.pm_id || a.filePath}: ${a.reason}`);
    }
  }

  process.exit(bad.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
