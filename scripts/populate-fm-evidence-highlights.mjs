#!/usr/bin/env node
/**
 * Rebuild FM §4.4 Evidence Highlights from child PM §5.1 phenome-style entries.
 *
 * Usage:
 *   node scripts/populate-fm-evidence-highlights.mjs
 *   node scripts/populate-fm-evidence-highlights.mjs --brs BRS3
 *   node scripts/populate-fm-evidence-highlights.mjs --force --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  buildFmEvidenceHighlightsBlock,
  fmHasEvidenceHighlights,
  replaceEvidenceHighlightsInContent,
} from "./lib/fm-evidence-highlights.mjs";

const root = process.cwd();

function parseArgs() {
  const args = process.argv.slice(2);
  const brsIdx = args.indexOf("--brs");
  return {
    brs: brsIdx === -1 ? null : args[brsIdx + 1]?.toUpperCase(),
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
  };
}

function fmMatchesBrs(data, brs) {
  const target = brs.toUpperCase();
  const parent = String(data.parent_brs || "").toUpperCase();
  const fmId = String(data.fm_id || "").toUpperCase();
  return parent === target || fmId.startsWith(target);
}

function main() {
  const { brs, dryRun, force } = parseArgs();
  let files = listMechanismMdxFiles(root, "fm");
  if (brs) {
    files = files.filter((f) => {
      const { data } = readMechanismPage(f);
      return fmMatchesBrs(data, brs);
    });
  }

  let updated = 0;
  let skipped = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    if (fmHasEvidenceHighlights(content) && !force) {
      skipped++;
      continue;
    }

    const block = buildFmEvidenceHighlightsBlock(data, content, root);
    const nextBody = replaceEvidenceHighlightsInContent(content, block);
    if (nextBody === content) {
      skipped++;
      continue;
    }

    const rel = path.relative(root, filePath);
    if (dryRun) {
      console.log(`would update ${rel}`);
    } else {
      fs.writeFileSync(filePath, matter.stringify(nextBody, data, { lineWidth: 9999 }), "utf8");
      console.log(`updated ${rel}`);
    }
    updated++;
  }

  console.log(`\nFM evidence populate: ${updated} ${dryRun ? "would update" : "updated"}, ${skipped} skipped`);
}

main();
