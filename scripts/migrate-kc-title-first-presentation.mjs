#!/usr/bin/env node
/**
 * Move PM KC identity/navigation out of bullets and into nested titled rows.
 *
 * Usage:
 *   node scripts/migrate-kc-title-first-presentation.mjs
 *   node scripts/migrate-kc-title-first-presentation.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { transformPmKcPresentation } from "./lib/kc-presentation.mjs";

const rootDir = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const base = path.join(rootDir, "docs/biological-targets");
const reports = [];

function isPmFile(name) {
  return /-fm\d+-pm\d+-/.test(name) || /brs-x-[a-z]+-pm\d+-/.test(name);
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx") && isPmFile(entry.name)) files.push(full);
  }
  return files;
}

for (const filePath of walk(base).sort()) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const result = transformPmKcPresentation(parsed.content);
  const hasMappedKcs =
    Array.isArray(parsed.data.key_constraints) && parsed.data.key_constraints.length > 0;
  const issue =
    result.issue === "kc-links-unresolved" && !hasMappedKcs
      ? null
      : result.issue || null;
  if (result.changed && !dryRun) {
    fs.writeFileSync(filePath, matter.stringify(result.content, parsed.data));
  }
  reports.push({
    pmId: parsed.data.pm_id || path.basename(filePath, ".mdx"),
    filePath,
    changed: result.changed,
    issue,
    kcIds: result.groups.map((group) => group.id),
  });
}

const changed = reports.filter((report) => report.changed);
const unresolved = reports.filter(
  (report) => report.issue && report.issue !== "kc-panel-missing",
);
console.log(`PM pages scanned: ${reports.length}`);
console.log(`PM KC panels ${dryRun ? "eligible" : "migrated"}: ${changed.length}`);
console.log(`KC panels unresolved: ${unresolved.length}`);
for (const report of unresolved) {
  console.log(`- ${report.pmId}: ${report.issue}`);
}
