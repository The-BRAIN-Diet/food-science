#!/usr/bin/env node
/**
 * Insert ### N.4 Implemented Functional Mechanisms on all PM pages (from parent_fm).
 * Usage: node scripts/add-pm-implemented-fm-section.mjs [--dry-run]
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";
import { buildFmLinkIndex, formatImplementedFmBullet } from "./lib/fm-link-index.mjs";

const dryRun = process.argv.includes("--dry-run");
const rootDir = process.cwd();
const fmIndex = buildFmLinkIndex(rootDir);

function normalizeParentFm(v) {
  if (!v) return null;
  return String(v).trim().replace(/^["']|["']$/g, "");
}

function insertSection(content, parentFm) {
  if (/Implemented Functional Mechanisms/i.test(content)) {
    return { content, changed: false, reason: "already present" };
  }

  const underlying = content.match(/^## (\d+)\. Underlying Mechanisms/m);
  if (!underlying) {
    return { content, changed: false, reason: "no underlying section" };
  }
  const n = underlying[1];
  const crossRe = new RegExp(
    `(### ${n}\\.3 Connected Mechanisms[\\s\\S]*?)(\\n## ${parseInt(n, 10) + 1}\\. )`,
    "m",
  );
  const m = content.match(crossRe);
  if (!m) {
    return { content, changed: false, reason: "Cross-BRS block not found" };
  }

  const bullet = formatImplementedFmBullet(parentFm, fmIndex);
  const block = `\n### ${n}.4 Implemented Functional Mechanisms\n\n\n${bullet}\n`;
  const next = content.replace(crossRe, `$1${block}$2`);
  return { content: next, changed: next !== content, reason: "inserted" };
}

let updated = 0;
let skipped = 0;

for (const filePath of listMechanismMdxFiles(rootDir, "pm")) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const parentFm = normalizeParentFm(data.parent_fm);
  if (!parentFm) {
    console.warn(`skip ${filePath}: missing parent_fm`);
    skipped++;
    continue;
  }
  const { content: next, changed, reason } = insertSection(content, parentFm);
  if (!changed) {
    console.log(`${path.basename(filePath)}: ${reason}`);
    skipped++;
    continue;
  }
  if (!dryRun) {
    fs.writeFileSync(filePath, matter.stringify(next, data, { lineWidth: 9999 }));
  }
  console.log(`${dryRun ? "[dry-run] " : ""}updated ${path.basename(filePath)} → ${parentFm}`);
  updated++;
}

console.log(`Done. updated=${updated} skipped=${skipped}`);
