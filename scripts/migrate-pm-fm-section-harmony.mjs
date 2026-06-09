#!/usr/bin/env node
/**
 * Harmonise PM/FM section structure:
 * PM §5 Overarching Functional Mechanism, §6 Connected Mechanisms, §7 Dietary Levers (7.1–7.3), §8–§10 …
 * FM §6 Connected Mechanisms (rename from BRS Links)
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { readMechanismPage, listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function buildFmIndex() {
  const idx = new Map();
  for (const filePath of listMechanismMdxFiles(root, "fm")) {
    const { data } = readMechanismPage(filePath);
    if (!data.fm_id) continue;
    const rel = path.relative(path.join(root, "docs"), filePath).replace(/\.mdx?$/, "");
    idx.set(String(data.fm_id).trim(), {
      title: data.title || data.fm_id,
      href: `/docs/${rel.replace(/\\/g, "/")}`,
    });
  }
  return idx;
}

function extractSectionBody(content, headingRe) {
  const m = content.match(new RegExp(`${headingRe.source}\\s*\\n([\\s\\S]*?)(?=\\n## \\d+\\. |$)`));
  return m ? m[1].trim() : "";
}

function extractUnderlyingSub(underBlock, subNum) {
  const m = underBlock.match(
    new RegExp(`### 5\\.${subNum}\\s+[^\\n]+\\s*\\n([\\s\\S]*?)(?=\\n### |$)`),
  );
  return m ? m[1].trim() : "";
}

function extractCrossBrsFromUnderlying(underBlock) {
  for (const n of [3, 4]) {
    const m = underBlock.match(
      new RegExp(`### 5\\.${n}\\s+Connected Mechanisms\\s*\\n([\\s\\S]*?)(?=\\n### |$)`),
    );
    if (m) return m[1].trim();
  }
  return "- None listed";
}

function extractDirectDietary(dietaryBlock) {
  const sub = dietaryBlock.match(/### \d+\.1 Direct Dietary Levers\s*\n([\s\S]*?)(?=\n### |$)/);
  if (sub) return sub[1].trim();
  const details = dietaryBlock.match(
    /<details>\s*\n<summary><strong>Diet<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/,
  );
  if (details) return details[1].trim();
  return dietaryBlock.trim() || "- None listed";
}

function fmLinkLine(data, fmIndex) {
  const id = data.parent_fm;
  if (!id) return "- None listed";
  const fm = fmIndex.get(String(id).trim());
  if (fm) return `- [${id} - ${fm.title}](${fm.href})`;
  return `- ${id}`;
}

function migratePm(filePath, fmIndex) {
  const { data, content } = readMechanismPage(filePath);
  if (!/^##\s+2\.\s+Intervention Breakdown\s*$/m.test(content)) return null;

  const underBlock = extractSectionBody(content, /## 5\. (?:Underlying Mechanisms and Requirements|Overarching Functional Mechanism)/);
  const crossFromSection = extractSectionBody(content, /## 6\. Connected Mechanisms/);
  const dietaryBlock = extractSectionBody(content, /## 7\. Dietary Levers/);
  const legacyDietaryBlock = extractSectionBody(content, /## 6\. Dietary Levers/);

  const cofactors =
    extractUnderlyingSub(underBlock, 1) ||
    (dietaryBlock.match(/### 7\.2 Cofactors[\s\S]*?\n([\s\S]*?)(?=\n### |$)/)?.[1]?.trim() ?? "");
  const kcs =
    extractUnderlyingSub(underBlock, 2) ||
    (dietaryBlock.match(/### 7\.3 KCs[\s\S]*?\n([\s\S]*?)(?=\n### |$)/)?.[1]?.trim() ?? "");
  const crossBrs = crossFromSection || extractCrossBrsFromUnderlying(underBlock) || "- None listed";
  const directDietary = extractDirectDietary(dietaryBlock || legacyDietaryBlock);

  const lifestyleBody = extractSectionBody(content, /## 8\. Lifestyle Levers/) ||
    extractSectionBody(content, /## 7\. Lifestyle Levers/);
  const scoreableBody = extractSectionBody(content, /## 9\. Scoreable Inputs & Modulation Signals/) ||
    extractSectionBody(content, /## 8\. Scoreable Inputs & Modulation Signals/);
  const refsBody = extractSectionBody(content, /## 10\. References/) ||
    extractSectionBody(content, /## 9\. References/);

  let body = content.replace(
    /\n## 5\. (?:Underlying Mechanisms and Requirements|Overarching Functional Mechanism)[\s\S]*?(?=\n## \d+\. References|\n## 10\. References|$)/,
    "",
  );
  body = body.replace(/\n## [6789]\. (?:Connected Mechanisms|Dietary Levers|Lifestyle Levers|Scoreable Inputs)[\s\S]*?(?=\n## \d+\. References|\n## 10\. References|$)/g, "");
  body = body.replace(/\n## 10\. References[\s\S]*$/m, "");
  body = body.replace(/\n## 9\. References[\s\S]*$/m, "");

  body = body.replace(/\bsection 5\.1\b/gi, "section 7.2");
  body = body.replace(/\b§5\.1\b/g, "§7.2");

  const tail = `

## 5. Overarching Functional Mechanism

${fmLinkLine(data, fmIndex)}

## 6. Connected Mechanisms

${crossBrs}

## 7. Dietary Levers

### 7.1 Direct Dietary Levers

${directDietary}

### 7.2 Cofactors and Supporting Inputs

${cofactors || "- None listed"}

### 7.3 KCs (Key Constraints)

${kcs || "- None listed"}

## 8. Lifestyle Levers

${lifestyleBody}

## 9. Scoreable Inputs & Modulation Signals

${scoreableBody}

## 10. References

${refsBody}
`;

  return matter.stringify(body.trimEnd() + tail, data, { lineWidth: 9999 });
}

function migrateFm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  let body = content.replace(/^## 6\. BRS Links/m, "## 6. Connected Mechanisms");
  if (body === content) return null;
  return matter.stringify(body, data, { lineWidth: 9999 });
}

const fmIndex = buildFmIndex();
let pmChanged = 0;
let fmChanged = 0;

for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migratePm(filePath, fmIndex);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("pm", path.relative(root, filePath));
    pmChanged++;
  }
}

for (const filePath of listMechanismMdxFiles(root, "fm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migrateFm(filePath);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("fm", path.relative(root, filePath));
    fmChanged++;
  }
}

console.log(`Done. ${pmChanged} PM(s), ${fmChanged} FM(s) updated.`);
