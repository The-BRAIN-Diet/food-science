#!/usr/bin/env node
/**
 * Remove redundant FM §5 Primary Mechanisms and §7 KCs (covered by §4.1/§4.2).
 * Renumber Connected Mechanisms → §5, References → §6.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const rootDir = process.cwd();

function listFmFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listFmFiles(p, acc);
    else if (ent.name.endsWith(".mdx") && p.includes(`${path.sep}fm${path.sep}`)) acc.push(p);
  }
  return acc;
}

export function removeFmIndexSections(content) {
  let body = content
    .replace(/\n## 5\. Primary Mechanisms \(PMs\)\n[\s\S]*?(?=\n## 6\. Connected Mechanisms)/, "")
    .replace(/\n## 7\. KCs\n[\s\S]*?(?=\n## 8\. References)/, "")
    .replace(/\n## 6\. Connected Mechanisms/g, "\n## 5. Connected Mechanisms")
    .replace(/\n## 8\. References/g, "\n## 6. References");
  body = body.replace(/(\n- \[[^\n]+\]\([^)]+\))\n## 6\. References/g, "$1\n\n## 6. References");
  body = body.replace(/(## 6\. References)\n(?!\n)/g, "$1\n\n");
  return body;
}

let updated = 0;
for (const filePath of listFmFiles(path.join(rootDir, "docs/biological-targets"))) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const body = removeFmIndexSections(content);
  if (body !== content) {
    fs.writeFileSync(filePath, matter.stringify(body, data, { lineWidth: 9999 }));
    updated++;
  }
}

console.log(`Removed §5/§7 index sections from ${updated} FM pages`);
