#!/usr/bin/env node
/**
 * Remove FM §3 Intervention Breakdown and §5.2 Supporting Biological Pools (Key Constraints).
 * Renumber: Functional Role → §3, Mechanistic Basis → §4 (4.1–4.4), Connected → §5, References → §6.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";

const rootDir = process.cwd();

export function stripFmInterventionAndKcSections(content) {
  let body = content;

  body = body.replace(
    /\n## 3\. Intervention Breakdown\n[\s\S]*?(?=\n## 4\. )/,
    "\n",
  );

  body = body.replace(
    /\n### 5\.2 Supporting Biological Pools \(Key Constraints\)\n[\s\S]*?(?=\n### 5\.3 )/,
    "\n",
  );

  body = body
    .replace(/\n### 5\.5 Evidence Highlights/g, "\n### __TMP_FM_EVIDENCE__")
    .replace(/\n### 5\.4 Suboptimal Function & Its Effects/g, "\n### 4.3 Suboptimal Function & Its Effects")
    .replace(/\n### 5\.3 Integrated Functional Narrative/g, "\n### 4.2 Integrated Functional Narrative")
    .replace(/\n### 5\.1 Core Primary Mechanisms/g, "\n### 4.1 Core Primary Mechanisms")
    .replace(/\n### __TMP_FM_EVIDENCE__/g, "\n### 4.4 Evidence Highlights");

  body = body
    .replace(/\n## 7\. References/g, "\n## __TMP_FM_REF__")
    .replace(/\n## 6\. Connected Mechanisms/g, "\n## 5. Connected Mechanisms")
    .replace(/\n## 5\. Mechanistic Basis/g, "\n## 4. Mechanistic Basis")
    .replace(/\n## 4\. Functional Role/g, "\n## 3. Functional Role")
    .replace(/\n## __TMP_FM_REF__/g, "\n## 6. References");

  return body;
}

let updated = 0;
for (const filePath of listMechanismMdxFiles(rootDir, "fm")) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const body = stripFmInterventionAndKcSections(content);
  if (body !== content) {
    fs.writeFileSync(filePath, matter.stringify(body, data, { lineWidth: 9999 }));
    updated++;
    console.log("updated", path.relative(rootDir, filePath));
  }
}

console.log(`Stripped Intervention Breakdown and §5.2 KC sections from ${updated} FM page(s).`);
