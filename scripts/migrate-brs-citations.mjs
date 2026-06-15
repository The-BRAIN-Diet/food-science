#!/usr/bin/env node
/**
 * Batch-migrate BRS pages from legacy linked [Author (Year)](...) [n] citations
 * to system/brs-citation-reference-standard.md (author–year inline + descriptive refs).
 *
 * Usage:
 *   node scripts/migrate-brs-citations.mjs --prefix brs1
 *   node scripts/migrate-brs-citations.mjs --dry-run --prefix brs1
 *   node scripts/migrate-brs-citations.mjs --file docs/biological-targets/brs1/fm1/...
 */
import path from "node:path";
import {
  listLegacyCitationFiles,
  migrateBrsCitationFile,
} from "./lib/brs-citation-migration.mjs";

const ROOT = process.cwd();
const TARGETS = path.join(ROOT, "docs/biological-targets");

function parseArgs(argv) {
  const opts = { dryRun: false, prefix: null, files: [] };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--prefix") opts.prefix = argv[++i];
    else if (arg === "--file") opts.files.push(argv[++i]);
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv);
  let files = opts.files.length
    ? opts.files.map((f) => path.resolve(ROOT, f))
    : listLegacyCitationFiles(TARGETS);

  if (opts.prefix) {
    const needle = `${path.sep}${opts.prefix}${path.sep}`;
    files = files.filter((f) => f.includes(needle));
  }

  if (!files.length) {
    console.log("No legacy citation files matched.");
    process.exit(0);
  }

  let changed = 0;
  let citations = 0;
  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const result = migrateBrsCitationFile(file, { dryRun: opts.dryRun });
    if (result.changed) {
      changed++;
      citations += result.citations;
      console.log(`${opts.dryRun ? "[dry-run] " : ""}migrated ${rel} (${result.citations} refs)`);
    } else {
      console.log(`skipped ${rel} (no changes)`);
    }
  }

  console.log(
    `\n${opts.dryRun ? "Would migrate" : "Migrated"} ${changed}/${files.length} files (${citations} unique citations).`,
  );
}

main();
