#!/usr/bin/env node
/**
 * PM §5 Connected BRSX Mechanisms (5.1 FM, 5.2 same-BRS sibling PMs)
 * + §6 Connected Mechanisms (cross-domain PM/FM links).
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { readMechanismPage, listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function extractSectionBody(content, headingRe) {
  const m = content.match(new RegExp(`${headingRe.source}\\s*\\n([\\s\\S]*?)(?=\\n## \\d+\\. |$)`));
  return m ? m[1].trim() : "";
}

function extractSubsection(block, pattern) {
  const m = block.match(new RegExp(`### \\d+\\.\\d+\\s+${pattern}\\s*\\n([\\s\\S]*?)(?=\\n### |\\n## |$)`));
  return m ? m[1].trim() : "";
}

function brsNumber(entityRef) {
  const m = String(entityRef).match(/BRS(\d+)/i);
  return m ? m[1] : null;
}

function buildFmIndex() {
  const idx = new Map();
  for (const filePath of listMechanismMdxFiles(root, "fm")) {
    const { data } = readMechanismPage(filePath);
    if (!data.fm_id) continue;
    const rel = path.relative(path.join(root, "docs"), filePath).replace(/\.mdx?$/, "");
    const href = `/docs/${rel.replace(/\\/g, "/")}`;
    idx.set(String(data.fm_id).trim(), {
      title: data.title || data.fm_id,
      href,
      pms: Array.isArray(data.mechanisms_covered) ? data.mechanisms_covered : [],
    });
  }
  return idx;
}

function fmLinkLine(data, fmIndex) {
  const id = data.parent_fm;
  if (!id) return "- None listed";
  const fm = fmIndex.get(String(id).trim());
  if (fm) return `- [${id} - ${fm.title}](${fm.href})`;
  return `- ${id}`;
}

function siblingPmBullets(data, fmIndex) {
  const fm = fmIndex.get(String(data.parent_fm || "").trim());
  if (!fm?.pms?.length) return "- None listed";
  const siblings = fm.pms.filter((p) => p.id && p.id !== data.pm_id);
  if (!siblings.length) return "- None listed";
  return siblings
    .map((p) => {
      const name = p.name || p.id;
      const href = p.href || "";
      return href ? `- [${p.id} - ${name}](${href})` : `- ${p.id} - ${name}`;
    })
    .join("\n");
}

function crossBrsFromBody(body, parentBrs) {
  if (!body || body === "- None listed") return "- None listed";
  const parentNum = brsNumber(parentBrs);
  const lines = body.split("\n").filter((l) => l.trim().startsWith("-"));
  const cross = lines.filter((line) => {
    if (/\(KC\d+\)/i.test(line)) return false;
    const entityBrs = brsNumber(line);
    if (!entityBrs) return false;
    return entityBrs !== parentNum;
  });
  return cross.length ? cross.join("\n") : "- None listed";
}

function connectedHeading(parentBrs) {
  const brs = String(parentBrs || "").trim();
  return brs ? `Connected ${brs} Mechanisms` : "Connected BRS Mechanisms";
}

function firstTailIndex(content) {
  const patterns = [
    /\n## 5\. Connected BRS\d+ Mechanisms/,
    /\n## 5\. Connected Mechanisms/,
    /\n## 5\. Overarching Functional Mechanism/,
    /\n## 6\. Connected Mechanisms/,
    /\n## 6\. Connected Mechanisms/,
    /\n## 7\. Dietary Levers/,
  ];
  let idx = -1;
  for (const re of patterns) {
    const m = content.search(re);
    if (m !== -1 && (idx === -1 || m < idx)) idx = m;
  }
  return idx;
}

function migratePm(filePath, fmIndex) {
  const { data, content } = readMechanismPage(filePath);
  if (!/^##\s+2\.\s+Intervention Breakdown\s*$/m.test(content)) return null;

  const tailStart = firstTailIndex(content);
  if (tailStart === -1) return null;
  const tailRegion = content.slice(tailStart);

  const connectedBlock =
    extractSectionBody(tailRegion, /## 5\. Connected BRS\d+ Mechanisms/) ||
    extractSectionBody(tailRegion, /## 5\. Connected Mechanisms/) ||
    extractSectionBody(tailRegion, /## 6\. Connected Mechanisms/);
  const fmBody =
    extractSubsection(connectedBlock, "Overarching Functional Mechanism") ||
    extractSectionBody(tailRegion, /## 5\. Overarching Functional Mechanism/) ||
    fmLinkLine(data, fmIndex);
  const legacyConnectedPm = extractSubsection(connectedBlock, "Connected Primary Mechanisms") || "";
  const crossBrsBody =
    extractSectionBody(tailRegion, /## 6\. Connected Mechanisms/) ||
    crossBrsFromBody(legacyConnectedPm, data.parent_brs);

  const dietaryBlock = extractSectionBody(tailRegion, /## 7\. Dietary Levers/);
  const directDietary = extractSubsection(dietaryBlock, "Direct Dietary Levers") || "- None listed";
  const cofactors = extractSubsection(dietaryBlock, "Cofactors and Supporting Inputs") || "- None listed";
  const kcs = extractSubsection(dietaryBlock, "KCs \\(Key Constraints\\)") || "- None listed";

  const lifestyleBody = extractSectionBody(tailRegion, /## 8\. Lifestyle Levers/);
  const scoreableBody = extractSectionBody(tailRegion, /## 9\. Scoreable Inputs & Modulation Signals/);
  const refsBody = extractSectionBody(tailRegion, /## 10\. References/) ||
    extractSectionBody(tailRegion, /## 9\. References/);

  const body = content.slice(0, tailStart).trimEnd();
  const connectedTitle = connectedHeading(data.parent_brs);
  const tail = `

## 5. ${connectedTitle}

### 5.1 Overarching Functional Mechanism

${fmBody}

### 5.2 Connected Primary Mechanisms

${siblingPmBullets(data, fmIndex)}

## 6. Connected Mechanisms

${crossBrsBody}

## 7. Dietary Levers

### 7.1 Direct Dietary Levers

${directDietary}

### 7.2 Cofactors and Supporting Inputs

${cofactors}

### 7.3 KCs (Key Constraints)

${kcs}

## 8. Lifestyle Levers

${lifestyleBody}

## 9. Scoreable Inputs & Modulation Signals

${scoreableBody}

## 10. References

${refsBody}
`;

  return matter.stringify(body + tail, data, { lineWidth: 9999 });
}

const fmIndex = buildFmIndex();
let changed = 0;
for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migratePm(filePath, fmIndex);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("updated", path.relative(root, filePath));
    changed++;
  }
}
console.log(`Done. ${changed} PM file(s) updated.`);
