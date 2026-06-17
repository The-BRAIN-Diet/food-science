#!/usr/bin/env node
/**
 * Align FM §1–3 with PM flow and rename public sections:
 * §2 Primary Biological Effects (was Functional Role)
 * §3 Phenome Connections (was Target Functional Outcome / Phenome or Functional Outcome Context)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseNumberedSections } from "./lib/mechanism-page-validation.mjs";
import {
  FM_PHENOME_CONNECTIONS_SECTION_TITLE,
  PHENOME_CONNECTIONS_SECTION_TITLE,
  PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE,
} from "./lib/phenome-relationships.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs/biological-targets");

const OLD_PHENOME_TITLES = new Set([
  "Target Functional Outcome / Phenome",
  "Connected Phenomes / Functional Outcomes",
  "Functional Outcome Context",
  PHENOME_CONNECTIONS_SECTION_TITLE,
]);

const OLD_EFFECTS_TITLES = new Set(["Functional Role", PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE]);

function walkMdx(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMdx(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

function isFmPage(filePath) {
  const base = path.basename(filePath);
  return /-fm\d*-/.test(base) && !/-pm\d*/.test(base);
}

function isPmPage(filePath) {
  return /-pm\d*/.test(path.basename(filePath));
}

function majorSections(content) {
  return parseNumberedSections(content).filter((s) => s.type === "major");
}

function sectionBlock(content, sections, index) {
  const section = sections[index];
  if (!section) return null;
  const start = content.indexOf(section.line);
  const next = sections[index + 1];
  const end = next ? content.indexOf(next.line, start + 1) : content.length;
  return content.slice(start, end).trimEnd();
}

function withMajorHeading(num, title, inner) {
  return `## ${num}. ${title}\n\n${inner.trimStart()}`.trimEnd();
}

function stripMajorHeading(block) {
  return block.replace(/^##\s+\d+\.\s+[^\n]+\n+/, "").trimEnd();
}

function findMajorIndex(majors, predicate) {
  return majors.findIndex((s) => predicate(s.title));
}

function migrateFm(content) {
  const sections = parseNumberedSections(content);
  const majors = sections.filter((s) => s.type === "major");
  if (!majors.length || majors[0].title !== "Definition") return null;

  const defIdx = findMajorIndex(majors, (t) => t === "Definition");
  const effectsIdx = findMajorIndex(majors, (t) => OLD_EFFECTS_TITLES.has(t));
  const phenomeIdx = findMajorIndex(majors, (t) => OLD_PHENOME_TITLES.has(t));
  if (defIdx === -1 || effectsIdx === -1 || phenomeIdx === -1) return null;

  const alreadyAligned =
    majors[1]?.title === PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE &&
    majors[2]?.title === PHENOME_CONNECTIONS_SECTION_TITLE;

  if (alreadyAligned) return null;

  const preambleMatch = content.match(/^[\s\S]*?(?=^##\s+1\.\s+Definition\s*$)/m);
  const preamble = preambleMatch ? preambleMatch[0].trimEnd() : "";

  const defBlock = sectionBlock(content, majors, defIdx);
  const effectsBlock = sectionBlock(content, majors, effectsIdx);
  const phenomeBlock = sectionBlock(content, majors, phenomeIdx);

  const skipTitles = new Set([
    "Definition",
    ...OLD_EFFECTS_TITLES,
    ...OLD_PHENOME_TITLES,
  ]);
  const rest = majors.filter((s) => !skipTitles.has(s.title));

  let num = 4;
  const restBlocks = rest.map((s) => {
    const idx = majors.findIndex((m) => m.line === s.line);
    const block = sectionBlock(content, majors, idx);
    const blockInner = stripMajorHeading(block);
    return withMajorHeading(num++, s.title, blockInner);
  });

  const rebuilt = [
    preamble,
    withMajorHeading(1, "Definition", stripMajorHeading(defBlock)),
    withMajorHeading(2, PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE, stripMajorHeading(effectsBlock)),
    withMajorHeading(3, PHENOME_CONNECTIONS_SECTION_TITLE, stripMajorHeading(phenomeBlock)),
    ...restBlocks,
  ]
    .filter(Boolean)
    .join("\n\n");

  return `${rebuilt}\n`;
}

function migratePm(content) {
  const updated = content
    .replace(/^## 2\. Functional Role\s*$/gm, `## 2. ${PRIMARY_BIOLOGICAL_EFFECTS_SECTION_TITLE}`)
    .replace(
      /^## 3\. (?:Target Functional Outcome \/ Phenome|Connected Phenomes \/ Functional Outcomes)\s*$/gm,
      `## 3. ${PHENOME_CONNECTIONS_SECTION_TITLE}`,
    );
  return updated === content ? null : updated;
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  let changed = 0;

  for (const filePath of walkMdx(DOCS)) {
    const original = fs.readFileSync(filePath, "utf8");
    let updated = null;

    if (isFmPage(filePath)) updated = migrateFm(original);
    else if (isPmPage(filePath)) updated = migratePm(original);

    if (!updated || updated === original) continue;

    changed += 1;
    const rel = path.relative(ROOT, filePath);
    if (dryRun) console.log(`[dry-run] ${rel}`);
    else {
      fs.writeFileSync(filePath, updated);
      console.log(`Updated ${rel}`);
    }
  }

  console.log(`${dryRun ? "Would update" : "Updated"} ${changed} file(s).`);
}

main();
