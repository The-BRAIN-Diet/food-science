#!/usr/bin/env node
/**
 * FM synthesis pages: §5 Primary Mechanisms (PMs), §6 BRS Links, §7 References.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { readMechanismPage } from "./lib/mechanism-page-validation.mjs";

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

function extractBrsLinksBody(content) {
  for (const heading of [
    /^## 6\. Connected Mechanisms\s*\n([\s\S]*?)(?=\n## \d+\.)/m,
    /^## 6\. BRS Links\s*\n([\s\S]*?)(?=\n## \d+\.)/m,
    /^## 5\. Connected Mechanisms\s*\n([\s\S]*?)(?=\n## \d+\.)/m,
    /^## 5\. Connected Mechanisms\s*\n([\s\S]*?)(?=\n## \d+\.)/m,
    /^## 6\. Connected Mechanisms\s*\n([\s\S]*?)(?=\n## \d+\.)/m,
  ]) {
    const m = content.match(heading);
    if (m) return m[1].trim() || "- None listed";
  }
  return "- None listed";
}

function pmSectionBullets(mechanismsCovered) {
  if (!Array.isArray(mechanismsCovered) || mechanismsCovered.length === 0) {
    return "- None listed";
  }
  return mechanismsCovered
    .map((pm) => {
      const id = pm.id || "";
      const name = pm.name || id;
      const href = pm.href || "";
      if (!href) return `- ${id} — ${name}`;
      return `- [${id} — ${name}](${href})`;
    })
    .join("\n");
}

function migrateFm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  const brsLinks = extractBrsLinksBody(content);
  const pmBullets = pmSectionBullets(data.mechanisms_covered);

  let body = content.replace(
    /\n## 5\. (?:Connected Mechanisms|Primary Mechanisms \(PMs\))[\s\S]*?(?=\n## \d+\. References)/,
    "",
  );
  body = body.replace(
    /\n## 6\. (?:BRS Links|Connected Mechanisms|Primary Mechanisms \(PMs\))[\s\S]*?(?=\n## \d+\. References)/,
    "",
  );
  body = body.replace(/^## [567]\. References/m, "## 7. References");

  const tail = `\n\n## 5. Primary Mechanisms (PMs)\n\n${pmBullets}\n\n## 6. Connected Mechanisms\n\n${brsLinks}\n\n## 7. References`;
  body = body.replace(/^## 7\. References/m, tail.trimStart());

  return matter.stringify(body, data, { lineWidth: 9999 });
}

const files = listFmFiles(path.join(root, "docs/biological-targets")).sort();
let changed = 0;
for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migrateFm(filePath);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("updated", path.relative(root, filePath));
    changed++;
  }
}
console.log(`Done. ${changed} FM file(s) updated.`);
