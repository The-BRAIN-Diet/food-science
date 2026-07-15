#!/usr/bin/env node
/**
 * Remove FM entries from PM §6.3 Connected Primary Mechanisms (PMs only).
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { listMechanismMdxFiles, readMechanismPage } from "./lib/mechanism-page-validation.mjs";
import {
  extractSection,
  isFmConnectedPrimaryBullet,
  stripFmBulletsFromConnectedPrimary,
} from "./lib/connected-mechanisms-populate.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function replaceSection(content, sectionRe, newBody, nextRe) {
  const fullRe = new RegExp(
    `(${sectionRe.source}\\s*\\n)([\\s\\S]*?)(?=\\n${nextRe.source}|$)`,
  );
  if (!fullRe.test(content)) return null;
  return content.replace(fullRe, `$1${newBody}\n`);
}

let changed = 0;

for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const { data, content } = readMechanismPage(filePath);
  const existing = extractSection(content, /### 6\.3 (?:Local BRS Mechanism Relationships|Connected Primary Mechanisms)/);
  if (!existing) continue;

  const hasFm = existing.split("\n").some((line) => isFmConnectedPrimaryBullet(line));
  if (!hasFm) continue;

  const newBody = stripFmBulletsFromConnectedPrimary(existing);
  const updated = replaceSection(
    content,
    /### 6\.3 (?:Local BRS Mechanism Relationships|Connected Primary Mechanisms)/,
    newBody,
    /## 7\. /,
  );
  if (!updated || updated === content) continue;

  fs.writeFileSync(filePath, matter.stringify(updated, data, { lineWidth: 9999 }));
  console.log(path.relative(root, filePath));
  changed++;
}

console.log(`Done. ${changed} PM file(s) updated.`);
