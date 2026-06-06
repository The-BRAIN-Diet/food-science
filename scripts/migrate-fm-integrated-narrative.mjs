#!/usr/bin/env node
/**
 * Migrate FM §4 to Integrated FM Narrative (4.1 PMs, 4.2 KCs, 4.3 synthesis).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  replaceFmSection4,
  fixFmTailFormatting,
} from "./lib/fm-integrated-narrative.mjs";

const rootDir = process.cwd();

function listFmFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listFmFiles(p, acc);
    else if (ent.name.endsWith(".mdx") && p.includes(`${path.sep}fm${path.sep}`)) acc.push(p);
  }
  return acc;
}

let updated = 0;
for (const filePath of listFmFiles(path.join(rootDir, "docs/biological-targets"))) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  let body = replaceFmSection4(content, data, rootDir);
  body = fixFmTailFormatting(body);
  if (body !== content) {
    fs.writeFileSync(filePath, matter.stringify(body, data, { lineWidth: 9999 }));
    updated++;
  }
}

console.log(`Updated ${updated} FM pages with integrated §4 narrative`);
