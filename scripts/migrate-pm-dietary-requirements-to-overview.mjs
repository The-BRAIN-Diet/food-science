#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(root, "docs/biological-targets");

function listPmFiles(dir = docsRoot) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPmFiles(fullPath);
    return entry.isFile() && /-pm\d+-.*\.mdx$/i.test(entry.name) ? [fullPath] : [];
  });
}

function findBalancedBlock(content, start, tagName) {
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>|<\\/${tagName}>`, "gi");
  tagPattern.lastIndex = start;
  let depth = 0;
  let match;

  while ((match = tagPattern.exec(content))) {
    depth += match[0].startsWith(`</`) ? -1 : 1;
    if (depth === 0) return tagPattern.lastIndex;
  }

  throw new Error(`Could not find the closing </${tagName}> tag`);
}

function migrate(content, filePath) {
  if (content.includes("## 1. Mission & Overview + Dietary Levers")) {
    return content;
  }

  const section3Start = Math.max(
    content.indexOf("## 3. Intervention Levers"),
    content.indexOf("## 3. Levers"),
  );
  const section4Start = content.indexOf("## 4.", section3Start);
  if (section3Start < 0 || section4Start < 0) {
    throw new Error(`${filePath}: missing §3 or §4`);
  }

  const section3 = content.slice(section3Start, section4Start);
  const profileHeading = "### Intervention Profile";
  const profileStart = section3.indexOf(profileHeading);
  const dietaryTitle = section3.indexOf("3.1 Dietary Requirements");
  if (profileStart < 0 || dietaryTitle < 0) {
    throw new Error(`${filePath}: missing intervention profile or dietary requirements`);
  }

  const divStart = section3.lastIndexOf("<div", dietaryTitle);
  const detailsStart = section3.lastIndexOf("<details", dietaryTitle);
  const blockStart = Math.max(divStart, detailsStart);
  if (blockStart < 0) {
    throw new Error(`${filePath}: missing dietary requirements disclosure wrapper`);
  }

  const tagName = blockStart === divStart ? "div" : "details";
  const blockEnd = findBalancedBlock(section3, blockStart, tagName);
  const dietaryBlock = section3.slice(blockStart, blockEnd).trim();
  const profilePrelude = section3
    .slice(profileStart + profileHeading.length, blockStart)
    .trim();
  const dominanceMatch = profilePrelude.match(
    /^\*\*Intervention Dominance:\*\*[^\n]*$/m,
  );
  if (!dominanceMatch) {
    throw new Error(`${filePath}: missing intervention dominance`);
  }

  const profileNote = profilePrelude
    .replace(dominanceMatch[0], "")
    .trim();
  const movedParts = [
    profileNote,
    dominanceMatch[0],
    dietaryBlock,
  ].filter(Boolean);
  const insertion = movedParts.join("\n\n");

  const remainingSection3 =
    section3.slice(0, profileStart).trimEnd() +
    "\n\n" +
    section3.slice(blockEnd).trimStart();
  let updated =
    content.slice(0, section3Start) +
    remainingSection3 +
    content.slice(section4Start);

  updated = updated.replace(
    "## 1. Mission & Overview",
    "## 1. Mission & Overview + Dietary Levers",
  );
  const overviewHeading = "\n### Overview\n";
  const overviewIndex = updated.indexOf(overviewHeading);
  if (overviewIndex < 0 || overviewIndex > updated.indexOf("## 2.")) {
    throw new Error(`${filePath}: missing §1 Overview heading`);
  }

  return (
    updated.slice(0, overviewIndex) +
    `\n\n${insertion}\n` +
    updated.slice(overviewIndex)
  );
}

const results = [];
for (const filePath of listPmFiles().sort()) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migrate(original, filePath);
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    results.push(path.relative(root, filePath));
  }
}

console.log(`Updated ${results.length} PM pages.`);
