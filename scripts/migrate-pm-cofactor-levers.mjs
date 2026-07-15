#!/usr/bin/env node
/**
 * Refresh PM §4.1.2 Cofactors with substance ← food lines for known micronutrient cofactors.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  buildCofactorFoodIndex,
  buildLocalCofactorMap,
  renderPmCofactorLeverBlock,
  transformCofactorSection,
} from "./lib/cofactor-food-index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const BIO = path.join(DOCS, "biological-targets");

const COFACTOR_HUB_PANEL_RE =
  /(<strong>4\.1\.2 Cofactors and Supporting Inputs<\/strong>[\s\S]*?<div class="brs-fm-hub-panel" hidden>\s*\n)([\s\S]*?)(\n<\/div>)/;

const COFACTOR_DETAILS_RE =
  /<details>\s*\n<summary><strong>4\.1\.2 Cofactors and Supporting Inputs<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/;

function walkPmFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkPmFiles(full));
    else if (entry.isFile() && /-pm.*\.mdx$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function migrateFile(filePath, globalMap) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const hubMatch = content.match(COFACTOR_HUB_PANEL_RE);
  const detailsMatch = content.match(COFACTOR_DETAILS_RE);
  if (!hubMatch && !detailsMatch) {
    return { filePath, status: "skipped", reason: "no 4.1.2 cofactor section" };
  }

  const existingInner = hubMatch ? hubMatch[2] : detailsMatch[1];
  const localMap = buildLocalCofactorMap(content);
  const { section: newInner, changed } = transformCofactorSection(existingInner, {
    localMap,
    globalMap,
  });

  if (!changed) {
    return { filePath, status: "skipped", reason: "no changes" };
  }

  let migrated = content;
  const rendered = renderPmCofactorLeverBlock(newInner, { localMap, globalMap });

  if (hubMatch) {
    migrated = migrated.replace(COFACTOR_HUB_PANEL_RE, `$1${rendered}$3`);
  } else {
    const replacement = `<details>\n<summary><strong>4.1.2 Cofactors and Supporting Inputs</strong></summary>\n\n${rendered}\n</details>`;
    migrated = migrated.replace(COFACTOR_DETAILS_RE, replacement);
  }

  fs.writeFileSync(filePath, matter.stringify(migrated, data), "utf8");
  return { filePath, status: "migrated" };
}

const globalMap = buildCofactorFoodIndex(DOCS);
const files = walkPmFiles(BIO).sort();
const results = { migrated: [], skipped: [], errors: [] };

for (const filePath of files) {
  try {
    const result = migrateFile(filePath, globalMap);
    const rel = path.relative(ROOT, filePath);
    if (result.status === "migrated") results.migrated.push(rel);
    else results.skipped.push({ file: rel, reason: result.reason });
  } catch (err) {
    results.errors.push({ file: path.relative(ROOT, filePath), error: err.message });
  }
}

console.log("PM §4.1.2 cofactor food migration");
console.log(`  global substance keys: ${globalMap.size}`);
console.log(`  migrated: ${results.migrated.length}`);
console.log(`  skipped:  ${results.skipped.length}`);
console.log(`  errors:   ${results.errors.length}`);

if (results.migrated.length) {
  for (const f of results.migrated) console.log(`  + ${f}`);
}

if (results.errors.length) {
  for (const e of results.errors) console.log(`  - ${e.file}: ${e.error}`);
  process.exit(1);
}
