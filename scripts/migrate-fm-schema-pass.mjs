#!/usr/bin/env node
/**
 * FM schema pass: ensure §4.4 Evidence Highlights on all FM pages.
 * Does NOT run phenome methodology — see system/fm-schema-rollout-sequence.md.
 *
 *   npm run mechanisms:migrate-fm-schema
 *   npm run mechanisms:migrate-fm-schema -- --dry-run
 *   npm run mechanisms:migrate-fm-schema -- --file path/to/fm.mdx
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";
import {
  assertAllFmsHaveEvidenceHighlights,
  fmHasEvidenceHighlights,
} from "./lib/fm-schema-gate.mjs";
import {
  buildFmEvidenceHighlightsBlock,
  insertEvidenceHighlightsInContent,
} from "./lib/fm-evidence-highlights.mjs";

const rootDir = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const fileArg = process.argv.find((a, i) => process.argv[i - 1] === "--file");

const files = fileArg
  ? [path.resolve(rootDir, fileArg)]
  : listMechanismMdxFiles(rootDir, "fm");

let updated = 0;
let skipped = 0;

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  if (fmHasEvidenceHighlights(content)) {
    skipped += 1;
    continue;
  }

  const evidenceBlock = buildFmEvidenceHighlightsBlock(data, content, rootDir);
  const nextBody = insertEvidenceHighlightsInContent(content, evidenceBlock);
  if (nextBody === content) {
    skipped += 1;
    continue;
  }

  const rel = path.relative(rootDir, filePath);
  if (dryRun) {
    console.log(`would update ${rel}`);
    updated += 1;
    continue;
  }

  fs.writeFileSync(filePath, matter.stringify(nextBody, data, { lineWidth: 9999 }), "utf8");
  console.log(`updated ${rel}`);
  updated += 1;
}

const gate = assertAllFmsHaveEvidenceHighlights(rootDir);
console.log(
  `FM schema pass: ${updated} ${dryRun ? "would update" : "updated"}, ${skipped} skipped (already have §4.4)`,
);
if (!gate.ok) {
  console.log(`§4.4 still missing on ${gate.missing.length} FM page(s):`);
  for (const f of gate.missing) console.log(`  - ${f}`);
  process.exitCode = 1;
} else {
  console.log("All FM pages have §4.4 Evidence Highlights — phenome methodology may proceed.");
}
