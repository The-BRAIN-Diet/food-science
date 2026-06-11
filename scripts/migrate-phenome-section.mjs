#!/usr/bin/env node
/**
 * Insert §2 Phenome layer and renumber subsequent integer sections on FM/PM/SM pages.
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
  renderFmPhenomeSectionBody,
  renderPmPhenomeSectionBody,
} from "./lib/phenome-relationships.mjs";

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

function alreadyHasPhenomeSection(content) {
  return /^## 2\. (Target Functional Outcome \/ Phenome|Connected Phenomes \/ Functional Outcomes)\s*$/m.test(
    content,
  );
}

const PHENOME_SECTION_HEADING =
  /^## 2\. (Target Functional Outcome \/ Phenome|Connected Phenomes \/ Functional Outcomes)\s*$/m;

function replacePhenomeSection(content, phenomeBlock) {
  const match = content.match(PHENOME_SECTION_HEADING);
  if (!match || match.index === undefined) {
    throw new Error("Missing §2 phenome section");
  }
  const start = match.index;
  const after = content.slice(start);
  const nextSection = after.slice(1).search(/^## \d+\. /m);
  const end = nextSection === -1 ? content.length : start + 1 + nextSection;
  return `${content.slice(0, start).trimEnd()}\n\n${phenomeBlock}\n\n${content.slice(end).trimStart()}`;
}

function syncPhenomeSection(filePath, kind) {
  const { data, content } = readMechanismPage(filePath);
  if (!alreadyHasPhenomeSection(content)) return { skipped: true, reason: "no-section" };

  const phenomeBlock =
    kind === "fm"
      ? renderFmPhenomeSectionBody(data.connected_phenomes || [])
      : renderPmPhenomeSectionBody(data.phenome_relationships || []);

  const body = replacePhenomeSection(content, phenomeBlock);
  fs.writeFileSync(filePath, matter.stringify(body, data), "utf8");
  return { skipped: false };
}

function migrateFile(filePath, kind) {
  const { data, content } = readMechanismPage(filePath);
  if (alreadyHasPhenomeSection(content)) return { skipped: true };

  let body = content;
  body = bumpMajorSections(body);
  body = bumpSubsections(body);

  const phenomeBlock =
    kind === "fm"
      ? renderFmPhenomeSectionBody(data.connected_phenomes || [])
      : renderPmPhenomeSectionBody(data.phenome_relationships || []); // pm + sm

  body = insertPhenomeSection(body, phenomeBlock);
  const next = matter.stringify(body, data);
  fs.writeFileSync(filePath, next, "utf8");
  return { skipped: false };
}

function main() {
  const syncOnly = process.argv.includes("--sync");
  const kinds = process.argv.includes("--fm-only")
    ? ["fm"]
    : process.argv.includes("--pm-only")
      ? ["pm"]
      : process.argv.includes("--sm-only")
        ? ["sm"]
        : ["fm", "pm", "sm"];

  let migrated = 0;
  let skipped = 0;
  for (const kind of kinds) {
    for (const file of listMechanismMdxFiles(rootDir, kind)) {
      const result = syncOnly ? syncPhenomeSection(file, kind) : migrateFile(file, kind);
      if (result.skipped) skipped += 1;
      else migrated += 1;
    }
  }
  const label = syncOnly ? "Phenome section sync" : "Phenome section migration";
  console.log(`${label}: ${migrated} updated, ${skipped} skipped`);
}

main();
