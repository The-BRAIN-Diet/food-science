#!/usr/bin/env node
/**
 * Render PM §4.1 Scientific Findings from `scientific_findings` front matter.
 *
 * Front matter is the durable source; the body subsection is generated. Run
 * after editing Findings, and before `npm run phenome:sync` (which regenerates
 * Phenome Connections and its compact references to these Findings).
 *
 * Usage:
 *   node scripts/sync-pm-scientific-findings.mjs
 *   node scripts/sync-pm-scientific-findings.mjs --pm BRS1-FM4-PM8
 *   node scripts/sync-pm-scientific-findings.mjs --check
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";
import { hasScientificFindings } from "./lib/scientific-findings.mjs";
import {
  FINDINGS_SUBSECTION_HEADING,
  checkScientificFindings,
  expectedFindingsSection,
} from "./lib/scientific-findings-gate.mjs";

const root = process.cwd();

function parseArgs() {
  const args = process.argv.slice(2);
  const pmIdx = args.indexOf("--pm");
  return {
    pm: pmIdx === -1 ? null : args[pmIdx + 1]?.toUpperCase(),
    check: args.includes("--check"),
    dryRun: args.includes("--dry-run"),
  };
}

function replaceSubsection(content, block) {
  const match = content.match(FINDINGS_SUBSECTION_HEADING);
  if (!match) return null;
  const start = content.indexOf(match[0]);
  const after = content.slice(start + match[0].length);
  const nextMajor = after.search(/^## \d+\. /m);
  const end = nextMajor === -1 ? content.length : start + match[0].length + nextMajor;
  return `${content.slice(0, start)}${block}\n\n${content.slice(end)}`;
}

function main() {
  const { pm, check, dryRun } = parseArgs();

  if (check) {
    const result = checkScientificFindings(root);
    if (!result.ok) {
      console.error("Scientific Findings problems:");
      for (const issue of result.issues) console.error(`  - [${issue.code}] ${issue.message}`);
    }
    console.log(
      `\nScientific Findings check: ${result.checked} PM page(s) checked, ${result.issues.length} problem(s)`,
    );
    process.exit(result.ok ? 0 : 1);
  }

  let updated = 0;
  let skipped = 0;

  for (const filePath of listMechanismMdxFiles(root, "pm")) {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    if (!hasScientificFindings(data)) continue;
    const pmId = String(data.pm_id || "").toUpperCase();
    if (pm && pmId !== pm) continue;

    const expected = expectedFindingsSection(data, content);
    if (expected?.missingHeading) {
      console.error(
        `${pmId}: has scientific_findings but no "### N.1 Scientific Findings" subsection to render into`,
      );
      process.exitCode = 1;
      continue;
    }

    const nextContent = replaceSubsection(content, expected.block);
    if (nextContent === null || nextContent === content) {
      skipped++;
      continue;
    }

    const rel = path.relative(root, filePath);
    if (dryRun) {
      console.log(`would update ${rel}`);
    } else {
      fs.writeFileSync(filePath, matter.stringify(nextContent, data, { lineWidth: 9999 }), "utf8");
      console.log(`updated ${rel}`);
    }
    updated++;
  }

  const result = checkScientificFindings(root);
  if (!result.ok) {
    console.error("\nScientific Findings problems:");
    for (const issue of result.issues) console.error(`  - [${issue.code}] ${issue.message}`);
    process.exitCode = 1;
  }

  console.log(
    `\nScientific Findings sync: ${updated} ${dryRun ? "would update" : "updated"}, ${skipped} unchanged`,
  );
}

main();
