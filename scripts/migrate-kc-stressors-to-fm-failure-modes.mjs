#!/usr/bin/env node
/**
 * Migrate KC Constraint Stressors → FM §4.4 Functional Failure Modes.
 * Remove KC §6 stressors; renumber References to §6.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { stripKcStressorSection } from "./lib/kc-stressor-extract.mjs";
import {
  buildFailureModesSection,
  extractEvidenceHighlightsBlock,
  insertFailureModesInSection4,
  loadKcStressorMap,
} from "./lib/fm-failure-modes.mjs";

const rootDir = process.cwd();

function listMdx(dir, kind, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listMdx(p, kind, acc);
    else if (ent.name.endsWith(".mdx") && p.includes(`${path.sep}${kind}${path.sep}`)) acc.push(p);
  }
  return acc;
}

const kcStressorMap = loadKcStressorMap(rootDir);
let kcUpdated = 0;
let fmUpdated = 0;

for (const filePath of listMdx(path.join(rootDir, "docs/biological-targets"), "kc")) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const body = stripKcStressorSection(content);
  if (body !== content) {
    fs.writeFileSync(filePath, matter.stringify(body, data, { lineWidth: 9999 }));
    kcUpdated++;
  }
}

for (const filePath of listMdx(path.join(rootDir, "docs/biological-targets"), "fm")) {
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
  fmUpdated++;
}

console.log(`Stripped KC stressors from ${kcUpdated} pages; added FM §4.4 to ${fmUpdated} pages`);
