#!/usr/bin/env node
/**
 * Migrate hybrid legacy PM pages to Profile A extended schema:
 * §4 Levers → §5 Mechanistic Basis → §6 BRS Pathways and Connections → §7 Scoreable → §8 References
 *
 * Targets PMs that still use:
 * - ## 4. Mechanistic Basis (instead of ## 4. Levers)
 * - ## 5. Underlying Mechanisms and Requirements
 * - standalone ## N. Dietary Levers / Lifestyle Levers
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import {
  listMechanismMdxFiles,
  readMechanismPage,
  parseNumberedSections,
} from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function isLegacyHybridProfile(content) {
  return (
    /^##\s+5\.\s+Underlying Mechanisms and Requirements\s*$/m.test(content) &&
    !/^##\s+4\.\s+Levers\s*$/m.test(content)
  );
}

function findSectionBody(content, sections, index) {
  const section = sections[index];
  if (!section) return "";
  const start = content.indexOf(section.line);
  const next = sections[index + 1];
  const end = next ? content.indexOf(next.line, start + 1) : content.length;
  return content.slice(start, end).trimEnd();
}

function stripMajorHeading(block) {
  return block.replace(/^##\s+\d+\.\s+[^\n]+\n+/, "").trimEnd();
}

function extractUnderlyingSub(underBlock, subNum) {
  const m = underBlock.match(
    new RegExp(`### 5\\.${subNum}\\s+[^\\n]+\\s*\\n([\\s\\S]*?)(?=\\n### |$)`),
  );
  return m ? m[1].trim() : "";
}

function extractDetailsInner(block, summaryLabel) {
  const re = new RegExp(
    `<details>\\s*\\n<summary><strong>${summaryLabel}<\\/strong><\\/summary>\\s*\\n([\\s\\S]*?)\\n<\\/details>`,
  );
  const m = block.match(re);
  return m ? m[1].trim() : stripMajorHeading(block);
}

function buildFmIndex() {
  const idx = new Map();
  for (const filePath of listMechanismMdxFiles(root, "fm")) {
    const { data } = readMechanismPage(filePath);
    if (!data.fm_id) continue;
    const rel = path.relative(path.join(root, "docs"), filePath).replace(/\.mdx?$/, "");
    idx.set(String(data.fm_id).trim(), {
      title: data.title || data.fm_id,
      href: `/docs/${rel.replace(/\\/g, "/")}`,
      mechanisms: data.mechanisms_covered || [],
    });
  }
  return idx;
}

function buildConnectedPrimary(data, fmIndex) {
  const lines = [];
  const parentId = data.parent_fm ? String(data.parent_fm).trim() : "";
  const fm = parentId ? fmIndex.get(parentId) : null;
  if (fm) {
    lines.push(`- [${parentId} - ${fm.title}](${fm.href})`);
    lines.push("");
  }
  const selfPmId = data.pm_id ? String(data.pm_id).trim() : "";
  for (const pm of fm?.mechanisms || []) {
    if (pm.id === selfPmId) continue;
    const label = pm.name ? `${pm.id} - ${pm.name}` : pm.id;
    lines.push(`- [${label}](${pm.href})`);
  }
  return lines.length ? lines.join("\n") : "- None listed";
}

function migratePm(filePath, fmIndex) {
  const { data, content } = readMechanismPage(filePath);
  if (!isLegacyHybridProfile(content)) return null;

  const sections = parseNumberedSections(content);
  const findIdx = (pred) => sections.findIndex((s) => pred(s.title));

  const preambleEnd = content.search(/^##\s+1\.\s+Definition\s*$/m);
  if (preambleEnd === -1) throw new Error("Missing ## 1. Definition");
  const preamble = content.slice(0, preambleEnd).trimEnd();

  const defIdx = findIdx((t) => t === "Definition");
  const pbeIdx = findIdx((t) => t.startsWith("Primary Biological Effects"));
  const phenomeIdx = findIdx((t) => t.startsWith("Phenome"));
  const mbIdx = findIdx((t) => t.startsWith("Mechanistic Basis"));
  const underIdx = findIdx((t) => t.startsWith("Underlying Mechanisms"));
  const dietIdx = findIdx((t) => t.startsWith("Dietary Levers"));
  const lifeIdx = findIdx((t) => t.startsWith("Lifestyle Levers"));
  const scoreIdx = findIdx((t) => /Scoreable Inputs/i.test(t));
  const refIdx = findIdx((t) => t.startsWith("References"));

  if ([defIdx, pbeIdx, phenomeIdx, mbIdx, underIdx, dietIdx, lifeIdx, refIdx].some((i) => i === -1)) {
    throw new Error("Missing required legacy sections");
  }

  const definition = findSectionBody(content, sections, defIdx);
  const pbe = findSectionBody(content, sections, pbeIdx);
  const phenome = findSectionBody(content, sections, phenomeIdx);
  const mechanistic = findSectionBody(content, sections, mbIdx);
  const underBlock = findSectionBody(content, sections, underIdx);
  const dietaryBlock = findSectionBody(content, sections, dietIdx);
  const lifestyleBlock = findSectionBody(content, sections, lifeIdx);
  const scoreable = scoreIdx === -1 ? null : findSectionBody(content, sections, scoreIdx);
  const references = findSectionBody(content, sections, refIdx);

  const cofactors = extractUnderlyingSub(underBlock, 1);
  const kcs = extractUnderlyingSub(underBlock, 2);
  const connectedBrs = extractUnderlyingSub(underBlock, 3) || "- None listed";
  const directDietary = extractDetailsInner(dietaryBlock, "Diet");
  const lifestyle = extractDetailsInner(lifestyleBlock, "Lifestyle");
  const dominance = data.intervention_dominance ? String(data.intervention_dominance).trim() : "";

  const leversParts = [
    "## 4. Levers",
    "",
    "### Intervention Profile",
    "",
    `**Intervention Dominance:** ${dominance}`,
    "",
    "<details>",
    "<summary><strong>4.1 Dietary Levers</strong></summary>",
    "",
    "<details>",
    "<summary><strong>4.1.1 Direct Dietary Levers</strong></summary>",
    "",
    directDietary,
    "",
    "</details>",
    "",
    "<details>",
    "<summary><strong>4.1.2 Cofactors and Supporting Inputs</strong></summary>",
    "",
    cofactors || "- None listed",
    "",
    "</details>",
    "",
    "<details>",
    "<summary><strong>4.1.3 KCs (Key Constraints)</strong></summary>",
    "",
    kcs || "- None listed",
    "",
    "</details>",
    "",
    "</details>",
    "",
    "<details>",
    "<summary><strong>4.2 Lifestyle Levers</strong></summary>",
    "",
    lifestyle,
    "",
    "</details>",
  ];

  const mbRenumbered = mechanistic.replace(/^##\s+\d+\.\s+Mechanistic Basis/, "## 5. Mechanistic Basis");

  const brsSection = [
    "## 6. BRS Pathways and Connections",
    "",
    "### 6.1 BRS Pathways",
    "",
    "- None listed",
    "",
    "### 6.2 Connected BRS Mechanisms",
    "",
    connectedBrs,
    "",
    "### 6.3 Connected Primary Mechanisms",
    "",
    buildConnectedPrimary(data, fmIndex),
  ].join("\n");

  let scoreableRenumbered = scoreable
    ? scoreable.replace(/^##\s+\d+\.\s+Scoreable Inputs & Modulation Signals/, "## 7. Scoreable Inputs & Modulation Signals")
    : null;
  if (scoreableRenumbered) {
    scoreableRenumbered = scoreableRenumbered.replace(/\bsection 3\b/gi, "section 4");
    scoreableRenumbered = scoreableRenumbered.replace(/\b§3\b/g, "§4");
  }

  const refsRenumbered = references.replace(/^##\s+\d+\.\s+References/, "## 8. References");

  const parts = [
    preamble,
    "",
    definition,
    "",
    pbe,
    "",
    phenome,
    "",
    leversParts.join("\n"),
    "",
    mbRenumbered,
    "",
    brsSection,
  ];
  if (scoreableRenumbered) parts.push("", scoreableRenumbered);
  parts.push("", refsRenumbered);

  return matter.stringify(`${parts.join("\n").trimEnd()}\n`, data, { lineWidth: 9999 });
}

const fmIndex = buildFmIndex();
let changed = 0;
const errors = [];

for (const filePath of listMechanismMdxFiles(root, "pm")) {
  try {
    const original = fs.readFileSync(filePath, "utf8");
    const updated = migratePm(filePath, fmIndex);
    if (updated && updated !== original) {
      fs.writeFileSync(filePath, updated);
      console.log("migrated:", path.relative(root, filePath));
      changed++;
    }
  } catch (err) {
    errors.push({ file: path.relative(root, filePath), error: err.message });
  }
}

console.log(`\nDone. ${changed} PM(s) migrated.`);
if (errors.length) {
  console.log("\nErrors:");
  for (const e of errors) console.log(`  - ${e.file}: ${e.error}`);
  process.exit(1);
}
