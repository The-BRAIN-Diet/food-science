#!/usr/bin/env node
/**
 * Insert or sync Phenome Connections from front matter (PM/SM) or functional_outcome_context (FM).
 * @see system/phenome-relationship-schema.md
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  listMechanismMdxFiles,
  readMechanismPage,
} from "./lib/mechanism-page-validation.mjs";
import {
  PM_PHENOME_SECTION_TITLE,
  mergePageReferencesWithPhenome,
  renderFmOutcomeContextSectionBody,
  renderPmPhenomeSectionBody,
} from "./lib/phenome-relationships.mjs";
import { assertAllFmsHaveEvidenceHighlights } from "./lib/fm-schema-gate.mjs";

const rootDir = process.cwd();

function bumpSubsections(content) {
  return content.replace(/^### (\d+)\.(\d+)/gm, (_, major, minor) => {
    const m = parseInt(major, 10);
    if (m >= 2) return `### ${m + 1}.${minor}`;
    return `### ${major}.${minor}`;
  });
}

function bumpMajorSections(content) {
  const majors = [...content.matchAll(/^## (\d+)\. /gm)]
    .map((m) => parseInt(m[1], 10))
    .filter((n) => n >= 2);
  const unique = [...new Set(majors)].sort((a, b) => b - a);
  let out = content;
  for (const n of unique) {
    const re = new RegExp(`^## ${n}\\. `, "gm");
    out = out.replace(re, `## ${n + 1}. `);
  }
  return out;
}

function insertPhenomeSection(content, phenomeBlock) {
  const defMatch = content.match(/^## 1\. Definition\s*$/m);
  if (!defMatch || defMatch.index === undefined) {
    throw new Error("Missing ## 1. Definition");
  }
  const afterDef = content.slice(defMatch.index);
  const nextSection = afterDef.slice(1).search(/^## \d+\. /m);
  const defEnd = nextSection === -1 ? content.length : defMatch.index + 1 + nextSection;
  const before = content.slice(0, defEnd).trimEnd();
  const after = content.slice(defEnd).trimStart();
  return `${before}\n\n${phenomeBlock}\n\n${after}`;
}

const LEGACY_PHENOME_SECTION_HEADING =
  /^## 2\. (Target Functional Outcome \/ Phenome|Connected Phenomes \/ Functional Outcomes|Functional Outcome Context)\s*$/m;

const CURRENT_PHENOME_SECTION_HEADING = new RegExp(
  `^## (\\d+)\\. ${PM_PHENOME_SECTION_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
  "m",
);

function findPhenomeSection(content) {
  const current = content.match(CURRENT_PHENOME_SECTION_HEADING);
  if (current?.index !== undefined) {
    return { index: current.index, level: parseInt(current[1], 10), legacy: false };
  }
  const legacy = content.match(LEGACY_PHENOME_SECTION_HEADING);
  if (legacy?.index !== undefined) {
    return { index: legacy.index, level: 2, legacy: true };
  }
  return null;
}

function alreadyHasPhenomeSection(content) {
  return Boolean(findPhenomeSection(content));
}

function replacePhenomeSection(content, phenomeBlock, section) {
  const start = section.index;
  const after = content.slice(start);
  const nextSection = after.slice(1).search(/^## \d+\. /m);
  const end = nextSection === -1 ? content.length : start + 1 + nextSection;
  return `${content.slice(0, start).trimEnd()}\n\n${phenomeBlock}\n\n${content.slice(end).trimStart()}`;
}

function buildPhenomeBlock(kind, data, sectionNum) {
  if (kind === "fm") {
    return renderFmOutcomeContextSectionBody(data.functional_outcome_context || [], { sectionNum });
  }
  return renderPmPhenomeSectionBody(data.phenome_relationships || [], { sectionNum });
}

function shouldSkipSmPhenomeSync(data) {
  return Boolean(data.interpreted_phenome);
}

function inferKindFromArgv(fileArg) {
  if (process.argv.includes("--fm-only")) return "fm";
  if (process.argv.includes("--sm-only")) return "sm";
  if (process.argv.includes("--pm-only")) return "pm";
  if (/\/sm\//.test(fileArg)) return "sm";
  const base = path.basename(fileArg);
  if (/-fm\d+-/.test(base) && !/-pm\d+-/.test(base)) return "fm";
  return "pm";
}

function syncPhenomeSection(filePath, kind) {
  const { data, content } = readMechanismPage(filePath);
  const section = findPhenomeSection(content);
  if (!section) return { skipped: true, reason: "no-section" };
  if (kind === "sm" && shouldSkipSmPhenomeSync(data)) {
    return { skipped: true, reason: "sm-phen-hand-authored" };
  }
  if (
    kind === "fm" &&
    (!Array.isArray(data.functional_outcome_context) || data.functional_outcome_context.length === 0)
  ) {
    return { skipped: true, reason: "fm-hand-authored" };
  }

  const phenomeBlock = buildPhenomeBlock(kind, data, section.level);
  let body = replacePhenomeSection(content, phenomeBlock, section);
  const merged = mergePageReferencesWithPhenome(data, body, kind);
  body = merged.content;
  const outData = merged.data;
  if (body === content && !merged.changed) return { skipped: true, reason: "unchanged" };

  fs.writeFileSync(filePath, matter.stringify(body, outData, { lineWidth: 9999 }), "utf8");
  return { skipped: false, file: path.relative(rootDir, filePath) };
}

function migrateFile(filePath, kind) {
  const { data, content } = readMechanismPage(filePath);
  if (alreadyHasPhenomeSection(content)) return { skipped: true };

  let body = content;
  body = bumpMajorSections(body);
  body = bumpSubsections(body);

  const phenomeBlock = buildPhenomeBlock(kind, data, 3);
  body = insertPhenomeSection(body, phenomeBlock);
  const merged = mergePageReferencesWithPhenome(data, body, kind);
  body = merged.content;
  const outData = merged.data;
  const next = matter.stringify(body, outData, { lineWidth: 9999 });
  fs.writeFileSync(filePath, next, "utf8");
  return { skipped: false, file: path.relative(rootDir, filePath) };
}

function main() {
  const syncOnly = process.argv.includes("--sync");
  const forcePhenome = process.argv.includes("--force");
  const fileArg = process.argv.find((a, i) => process.argv[i - 1] === "--file");

  const kinds = process.argv.includes("--fm-only")
    ? ["fm"]
    : process.argv.includes("--pm-only")
      ? ["pm"]
      : process.argv.includes("--sm-only")
        ? ["sm"]
        : ["fm", "pm", "sm"];

  const fmGate = assertAllFmsHaveEvidenceHighlights(rootDir);
  const touchesFm =
    kinds.includes("fm") &&
    (!fileArg || /-fm\d+-/.test(path.basename(fileArg)) && !/-pm\d+-/.test(path.basename(fileArg)));
  if (touchesFm && !fmGate.ok && !forcePhenome) {
    console.error(
      "Phenome sync blocked: not all FM pages have §4.4 Evidence Highlights yet.",
    );
    console.error("Run: npm run mechanisms:migrate-fm-schema");
    console.error("Missing:");
    for (const f of fmGate.missing) console.error(`  - ${f}`);
    console.error("Override with --force only for explicit exceptions.");
    process.exit(1);
  }

  const files = fileArg
    ? [{ filePath: path.resolve(rootDir, fileArg), kind: inferKindFromArgv(fileArg) }]
    : kinds.flatMap((kind) =>
        listMechanismMdxFiles(rootDir, kind).map((filePath) => ({ filePath, kind })),
      );

  let migrated = 0;
  let skipped = 0;
  const updated = [];

  for (const { filePath, kind } of files) {
    const result = syncOnly ? syncPhenomeSection(filePath, kind) : migrateFile(filePath, kind);
    if (result.skipped) skipped += 1;
    else {
      migrated += 1;
      if (result.file) updated.push(result.file);
    }
  }

  const label = syncOnly ? "Phenome section sync" : "Phenome section migration";
  console.log(`${label}: ${migrated} updated, ${skipped} skipped`);
  for (const file of updated) console.log(`  updated ${file}`);
}

main();
