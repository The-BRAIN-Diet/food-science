#!/usr/bin/env node
/**
 * Migrate KC §3 and Dietary Levers to substance ← food format.
 * Usage: node scripts/migrate-substance-food-mapping.mjs [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";
import { migrateSubstanceFoodSections } from "./lib/substance-food-mapping.mjs";

const dryRun = process.argv.includes("--dry-run");
const rootDir = process.cwd();

let updated = 0;

for (const kind of ["kc", "fm", "pm", "sm"]) {
  for (const filePath of listMechanismMdxFiles(rootDir, kind)) {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const mode = kind === "kc" ? "kc" : "diet";
    const { content: next, changed } = migrateSubstanceFoodSections(content, mode);
    if (!changed) continue;
    if (!dryRun) {
      fs.writeFileSync(filePath, matter.stringify(next, data, { lineWidth: 9999 }));
    }
    console.log(`${dryRun ? "[dry-run] " : ""}${path.basename(filePath)}`);
    updated++;
  }
}

console.log(`Done. ${updated} file(s) ${dryRun ? "would be " : ""}updated.`);
