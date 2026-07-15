#!/usr/bin/env node
/**
 * Rename PM §6.2 / §6.3 relationship sections and add scope intros.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  PM_SECTION_6_2_INTRO,
  PM_SECTION_6_2_TITLE,
  PM_SECTION_6_2_TITLE_LEGACY,
  PM_SECTION_6_3_INTRO,
  PM_SECTION_6_3_TITLE,
  PM_SECTION_6_3_TITLE_LEGACY,
} from "./lib/pm-relationship-sections.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function ensureIntroAfterHeading(content, headingRe, intro) {
  const escapedIntro = intro.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`${headingRe.source}\\s*\\n\\n${escapedIntro}`).test(content)) {
    return content;
  }
  return content.replace(
    new RegExp(`(${headingRe.source})\\s*\\n`),
    `$1\n\n${intro}\n\n`,
  );
}

function migratePm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  let next = content;

  next = next.replace(
    new RegExp(`### 6\\.2 ${PM_SECTION_6_2_TITLE_LEGACY.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
    `### 6.2 ${PM_SECTION_6_2_TITLE}`,
  );
  next = next.replace(
    new RegExp(`### 6\\.3 ${PM_SECTION_6_3_TITLE_LEGACY.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
    `### 6.3 ${PM_SECTION_6_3_TITLE}`,
  );

  next = ensureIntroAfterHeading(
    next,
    new RegExp(`### 6\\.2 ${PM_SECTION_6_2_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    PM_SECTION_6_2_INTRO,
  );
  next = ensureIntroAfterHeading(
    next,
    new RegExp(`### 6\\.3 ${PM_SECTION_6_3_TITLE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
    PM_SECTION_6_3_INTRO,
  );

  if (next === content) return null;
  return matter.stringify(next, data, { lineWidth: 9999 });
}

let changed = 0;
for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migratePm(filePath);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log(path.relative(root, filePath));
    changed++;
  }
}

console.log(`Done. ${changed} PM file(s) updated.`);
