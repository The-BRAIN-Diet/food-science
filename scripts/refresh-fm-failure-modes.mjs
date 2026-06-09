#!/usr/bin/env node
/** Refresh FM §4.4 Functional Failure Modes from KC stressor archive. */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  buildFailureModesSection,
  extractEvidenceHighlightsBlock,
  insertFailureModesInSection4,
  loadKcStressorMap,
} from "./lib/fm-failure-modes.mjs";

const rootDir = process.cwd();
const kcStressorMap = loadKcStressorMap(rootDir);

function listFm(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listFm(p, acc);
    else if (ent.name.endsWith(".mdx") && p.includes(`${path.sep}fm${path.sep}`)) acc.push(p);
  }
  return acc;
}

let updated = 0;
for (const filePath of listFm(path.join(rootDir, "docs/biological-targets"))) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const section4Match = content.match(/## 4\. Mechanistic Basis[^\n]*\n([\s\S]*?)(?=\n## 5\. Connected Mechanisms)/);
  if (!section4Match) continue;

  const section4 = section4Match[0];
  const evidence = extractEvidenceHighlightsBlock(section4);
  const failureModes = buildFailureModesSection(data, kcStressorMap);
  const newSection4 = insertFailureModesInSection4(section4, failureModes, evidence);
  if (newSection4 === section4) continue;

  const newContent = content.replace(
    /## 4\. Mechanistic Basis[^\n]*\n[\s\S]*?(?=\n## 5\. Connected Mechanisms)/,
    `${newSection4.trim()}\n\n`,
  );
  fs.writeFileSync(filePath, matter.stringify(newContent, data, { lineWidth: 9999 }));
  updated++;
}

console.log(`Refreshed FM §4.4 on ${updated} pages`);
