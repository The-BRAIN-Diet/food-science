#!/usr/bin/env node
/**
 * PM §6 Connected Mechanisms (6.1 Overarching FM, 6.2 Connected Primary Mechanisms).
 * Removes standalone §5; Dietary remains §7, Lifestyle §8, Scoreable §9, References §10.
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

function migratePm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  if (!/^##\s+2\.\s+Intervention Breakdown\s*$/m.test(content)) return null;

  const connectedBlock = extractSectionBody(content, /## 6\. Connected Mechanisms/);
  const fmBody =
    extractSubsection(connectedBlock, "Overarching Functional Mechanism") ||
    extractSectionBody(content, /## 5\. Overarching Functional Mechanism/) ||
    "- None listed";
  const pmBody =
    extractSubsection(connectedBlock, "Connected Primary Mechanisms") ||
    extractSectionBody(content, /## 6\. Cross BRS Links/) ||
    "- None listed";

  const dietaryBlock = extractSectionBody(content, /## 7\. Dietary Levers/) ||
    extractSectionBody(content, /## 6\. Dietary Levers/);
  const directDietary =
    extractSubsection(dietaryBlock, "Direct Dietary Levers") ||
    dietaryBlock.match(/<summary><strong>Diet<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/)?.[1]?.trim() ||
    dietaryBlock;
  const cofactors =
    extractSubsection(dietaryBlock, "Cofactors and Supporting Inputs") || "- None listed";
  const kcs = extractSubsection(dietaryBlock, "KCs \\(Key Constraints\\)") || "- None listed";

  const lifestyleBody =
    extractSectionBody(content, /## 8\. Lifestyle Levers/) ||
    extractSectionBody(content, /## 7\. Lifestyle Levers/);
  const scoreableBody =
    extractSectionBody(content, /## 9\. Scoreable Inputs & Modulation Signals/) ||
    extractSectionBody(content, /## 8\. Scoreable Inputs & Modulation Signals/);
  const refsBody =
    extractSectionBody(content, /## 10\. References/) ||
    extractSectionBody(content, /## 9\. References/);

  let body = content.replace(
    /\n## 5\. (?:Overarching Functional Mechanism|Connected Mechanisms)[\s\S]*?(?=\n## \d+\. References|\n## 9\. References|\n## 10\. References|$)/,
    "",
  );
  body = body.replace(/\n## 10\. References[\s\S]*$/m, "");
  body = body.replace(/\n## 9\. References[\s\S]*$/m, "");

  const tail = `

## 6. Connected Mechanisms

### 6.1 Overarching Functional Mechanism

${fmBody}

### 6.2 Connected Primary Mechanisms

${pmBody}

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

  return matter.stringify(body.trimEnd() + tail, data, { lineWidth: 9999 });
}

let changed = 0;
for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migratePm(filePath);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("updated", path.relative(root, filePath));
    changed++;
  }
}
console.log(`Done. ${changed} PM file(s) updated.`);
