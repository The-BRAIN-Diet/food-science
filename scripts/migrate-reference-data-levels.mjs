#!/usr/bin/env node
/**
 * Backfill data_level on phenome_relationships and functional_outcome_context references,
 * then sync §3 rendered bodies.
 *
 * Usage:
 *   node scripts/migrate-reference-data-levels.mjs
 *   node scripts/migrate-reference-data-levels.mjs --dry-run
 *   node scripts/migrate-reference-data-levels.mjs --audit
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { execSync } from "node:child_process";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  CURATED_REFERENCE_DATA_LEVELS,
  enrichReferenceWithDataLevel,
} from "./lib/reference-data-levels.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes("--dry-run"),
    audit: args.includes("--audit"),
    noSync: args.includes("--no-sync"),
  };
}

function enrichReferenceList(refs) {
  if (!Array.isArray(refs)) return refs;
  return refs.map(enrichReferenceWithDataLevel);
}

function enrichPhenomeRelationships(rows) {
  if (!Array.isArray(rows)) return rows;
  return rows.map((row) => ({
    ...row,
    references: enrichReferenceList(row.references),
  }));
}

function enrichFunctionalOutcomeContext(rows) {
  if (!Array.isArray(rows)) return rows;
  return rows.map((row) => ({
    ...row,
    references: enrichReferenceList(row.references),
  }));
}

function collectPhenomeFiles() {
  return ["pm", "fm", "sm"].flatMap((kind) => listMechanismMdxFiles(root, kind));
}

function runAudit(files) {
  const gaps = [];
  let missingDataLevel = 0;
  for (const filePath of files) {
    const { data } = readMechanismPage(filePath);
    const rel = path.relative(root, filePath);
    const lists = [
      ...(data.phenome_relationships || []).map((r) => r.references || []),
      ...(data.functional_outcome_context || []).map((r) => r.references || []),
    ];
    let fileMissing = 0;
    for (const refs of lists) {
      for (const ref of refs) {
        if (!ref?.citation_key) continue;
        if (!ref.data_level) {
          fileMissing++;
          missingDataLevel++;
        }
      }
    }
    if (fileMissing) gaps.push({ rel, missing: fileMissing });
  }
  console.log(`References missing data_level in front matter: ${missingDataLevel}`);
  console.log(`Files needing enrichment: ${gaps.length}`);
  for (const g of gaps) console.log(`  ${g.rel}: ${g.missing} ref(s)`);
  console.log(`Curated map size: ${Object.keys(CURATED_REFERENCE_DATA_LEVELS).length}`);
}

function main() {
  const { dryRun, audit, noSync } = parseArgs();
  const files = collectPhenomeFiles().filter((f) => {
    const { data } = readMechanismPage(f);
    return (
      Array.isArray(data.phenome_relationships) ||
      Array.isArray(data.functional_outcome_context)
    );
  });

  if (audit) {
    runAudit(files);
    return;
  }

  let updated = 0;
  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const next = { ...data };

    if (Array.isArray(next.phenome_relationships)) {
      next.phenome_relationships = enrichPhenomeRelationships(next.phenome_relationships);
    }
    if (Array.isArray(next.functional_outcome_context)) {
      next.functional_outcome_context = enrichFunctionalOutcomeContext(next.functional_outcome_context);
    }

    const rebuilt = matter.stringify(content, next, { lineWidth: 9999 });
    if (rebuilt === raw) continue;

    if (!dryRun) fs.writeFileSync(filePath, rebuilt, "utf8");
    updated++;
    console.log(`${dryRun ? "would update" : "updated"}: ${path.relative(root, filePath)}`);
  }

  console.log(`\nFront matter enriched: ${updated} file(s)`);

  if (!dryRun && !noSync && updated > 0) {
    console.log("Running phenome:sync…");
    execSync("npm run phenome:sync -- --sync", { cwd: root, stdio: "inherit" });
  }
}

main();
