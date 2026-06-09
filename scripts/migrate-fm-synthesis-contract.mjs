#!/usr/bin/env node
/**
 * Migrate FM pages to synthesis contract:
 * - §4 Mechanistic Basis (Synthesis of PMs)
 * - §5 Connected Mechanisms only (rollup from former §5.4)
 * - Remove Dietary / Lifestyle / Scoreable sections
 * - §6 References
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function listFmFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFmFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx") && dir.endsWith(`${path.sep}fm`)) out.push(full);
  }
  return out;
}

const files = listFmFiles(path.join(root, "docs/biological-targets")).sort();

function extractCrossBrs(content) {
  const m54 = content.match(/### 5\.4 Connected Mechanisms\s*\n([\s\S]*?)(?=\n## \d+\.)/);
  if (m54) {
    const body = m54[1].trim();
    return body || "- None listed";
  }
  const m5 = content.match(/## 5\. Connected Mechanisms\s*\n([\s\S]*?)(?=\n## \d+\.)/);
  if (m5) {
    return m5[1].trim() || "- None listed";
  }
  return "- None listed";
}

function migrateFm(content) {
  let next = content;

  next = next.replace(
    /## 4\. Mechanistic Basis \(Implementation of PMs\)/g,
    "## 4. Mechanistic Basis (Synthesis of PMs)",
  );

  const crossBrs = extractCrossBrs(next);

  next = next.replace(
    /\n## 5\. Underlying Mechanisms and Requirements[\s\S]*?(?=\n## [6789]\.)/,
    `\n\n## 5. Connected Mechanisms\n\n${crossBrs}\n`,
  );

  next = next.replace(/\n## 6\. Dietary Levers[\s\S]*?(?=\n## \d+\. References)/, "\n");
  next = next.replace(/\n## 7\. Lifestyle Levers[\s\S]*?(?=\n## \d+\. References)/, "\n");
  next = next.replace(
    /\n## 8\. Scoreable Inputs & Modulation Signals[\s\S]*?(?=\n## \d+\. References)/,
    "\n",
  );

  next = next.replace(/^## 9\. References/m, "## 6. References");
  next = next.replace(/^## 8\. References/m, "## 6. References");
  next = next.replace(/^## 7\. References/m, "## 6. References");

  return next;
}

let changed = 0;
for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migrateFm(original);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("updated", path.relative(root, filePath));
    changed++;
  }
}
console.log(`Done. ${changed} FM file(s) updated.`);
