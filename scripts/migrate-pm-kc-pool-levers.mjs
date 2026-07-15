#!/usr/bin/env node
/**
 * Refresh PM §4.1.3 KCs with substance ← food lines from linked KC Shared Biological Pools.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  buildKcPoolIndex,
  renderPmKcLeverBlock,
  resolveKcRefs,
} from "./lib/kc-pool-index.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const BIO = path.join(DOCS, "biological-targets");

const KC_HUB_PANEL_RE =
  /(<strong>4\.1\.3 KCs \(Key Constraints\)<\/strong>[\s\S]*?<div class="brs-fm-hub-panel" hidden>\s*\n)([\s\S]*?)(\n<\/div>)/;

const KC_DETAILS_RE =
  /<details>\s*\n<summary><strong>4\.1\.3 KCs \(Key Constraints\)<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/;

function walkPmFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkPmFiles(full));
    else if (entry.isFile() && /-pm.*\.mdx$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function extractKcLinksFromSection(sectionHtml) {
  const links = [];
  const re = /^\s*-\s+\[([^\]]+)\]\(([^)]+)\)\s*$/gm;
  let m;
  while ((m = re.exec(sectionHtml)) !== null) {
    links.push(`[${m[1]}](${m[2]})`);
  }
  return links;
}

function migrateFile(filePath, index) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const hubMatch = content.match(KC_HUB_PANEL_RE);
  const detailsMatch = content.match(KC_DETAILS_RE);
  if (!hubMatch && !detailsMatch) {
    return { filePath, status: "skipped", reason: "no 4.1.3 KC section" };
  }

  const existingInner = hubMatch ? hubMatch[2] : detailsMatch[1];
  const existingLinks = extractKcLinksFromSection(existingInner);
  const kcRefs = resolveKcRefs(existingLinks.length ? existingLinks : data.key_constraints, index);
  if (!kcRefs.length) {
    return { filePath, status: "skipped", reason: "no resolvable KC refs" };
  }

  const newInner = renderPmKcLeverBlock(kcRefs);
  let migrated = content;

  if (hubMatch) {
    migrated = migrated.replace(KC_HUB_PANEL_RE, `$1${newInner}$3`);
  } else {
    const replacement = `<details>\n<summary><strong>4.1.3 KCs (Key Constraints)</strong></summary>\n\n${newInner}\n\n</details>`;
    migrated = migrated.replace(KC_DETAILS_RE, replacement);
  }

  if (migrated === content) {
    return { filePath, status: "skipped", reason: "no changes" };
  }

  fs.writeFileSync(filePath, matter.stringify(migrated, data), "utf8");
  return { filePath, status: "migrated", kcCount: kcRefs.length };
}

const index = buildKcPoolIndex(DOCS);
const files = walkPmFiles(BIO).sort();
const results = { migrated: [], skipped: [], errors: [] };

for (const filePath of files) {
  try {
    const result = migrateFile(filePath, index);
    const rel = path.relative(ROOT, filePath);
    if (result.status === "migrated") results.migrated.push(rel);
    else results.skipped.push({ file: rel, reason: result.reason });
  } catch (err) {
    results.errors.push({ file: path.relative(ROOT, filePath), error: err.message });
  }
}

console.log("PM §4.1.3 KC pool migration");
console.log(`  KC pages indexed: ${index.byId.size}`);
console.log(`  migrated: ${results.migrated.length}`);
console.log(`  skipped:  ${results.skipped.length}`);
console.log(`  errors:   ${results.errors.length}`);

if (results.errors.length) {
  for (const e of results.errors) console.log(`  - ${e.file}: ${e.error}`);
  process.exit(1);
}
