#!/usr/bin/env node
/**
 * Merge phenome_relationships / functional_outcome_context references into
 * page front matter and the ## N. References section.
 *
 * Run after phenome populate or Phase 3 migration when new Key References were added.
 *
 * Usage:
 *   node scripts/sync-phenome-references.mjs --brs BRS1
 *   node scripts/sync-phenome-references.mjs --brs BRS2
 *   node scripts/sync-phenome-references.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import { mergePageReferencesWithPhenome } from "./lib/phenome-relationships.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const brsIdx = args.indexOf("--brs");
  return {
    brs: brsIdx === -1 ? null : args[brsIdx + 1]?.toUpperCase(),
    dryRun: args.includes("--dry-run"),
  };
}

function matchesBrs(data, brs) {
  const id = String(data.fm_id || data.pm_id || data.parent_brs || "");
  return id.startsWith(brs) || String(data.parent_brs || "").startsWith(brs);
}

function hasPhenomeRefs(data, kind) {
  if (kind === "fm") {
    return (data.functional_outcome_context || []).some((row) => row.references?.length);
  }
  if (kind === "sm" && data.interpreted_phenome?.references?.length) return true;
  return (data.phenome_relationships || []).some((row) => row.references?.length);
}

function main() {
  const { brs, dryRun } = parseArgs();
  const kinds = ["fm", "pm"];

  let updated = 0;
  let skipped = 0;

  for (const kind of kinds) {
    for (const filePath of listMechanismMdxFiles(root, kind)) {
      const { data, content } = readMechanismPage(filePath);
      if (brs && !matchesBrs(data, brs)) continue;
      if (!hasPhenomeRefs(data, kind)) {
        skipped++;
        continue;
      }

      const merged = mergePageReferencesWithPhenome(data, content, kind);
      if (!merged.changed) {
        skipped++;
        continue;
      }

      const id = data.fm_id || data.pm_id;
      if (dryRun) {
        console.log(`would update: ${id}`);
      } else {
        fs.writeFileSync(
          filePath,
          matter.stringify(merged.content, merged.data, { lineWidth: 9999 }),
          "utf8",
        );
        console.log(`updated: ${id}`);
      }
      updated++;
    }
  }

  console.log(`\nPhenome reference sync: ${updated} updated, ${skipped} skipped`);
}

main();
