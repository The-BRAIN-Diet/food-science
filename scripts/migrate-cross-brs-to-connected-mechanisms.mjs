#!/usr/bin/env node
/**
 * Rename Connected Mechanisms → Connected Mechanisms across FM/PM/SM pages, schemas, and scripts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const REPLACEMENTS = [
  [/## 5\. Connected Mechanisms/g, "## 5. Connected Mechanisms"],
  [/## 6\. Connected Mechanisms/g, "## 6. Connected Mechanisms"],
  [/## 5\. Connected Mechanisms/g, "## 5. Connected Mechanisms"],
  [/## 6\. Connected Mechanisms/g, "## 6. Connected Mechanisms"],
  [/### 5\.5 Connected Mechanisms/g, "### 5.5 Connected Mechanisms"],
  [/### 3\.4 Connected Mechanisms/g, "### 3.4 Connected Mechanisms"],
  [/Connected Mechanisms/g, "Connected Mechanisms"],
  [/Connected Mechanisms/g, "Connected Mechanisms"],
  [/connected_mechanisms/g, "connected_mechanisms"],
  [/connected mechanisms/gi, "connected mechanisms"],
  [/connected mechanisms/gi, "connected mechanisms"],
];

const SCAN_DIRS = [
  path.join(root, "docs/biological-targets"),
  path.join(root, "system"),
  path.join(root, "scripts"),
];

const EXT = new Set([".md", ".mdx", ".mdc", ".mjs"]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXT.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function migrateFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const original = text;
  for (const [from, to] of REPLACEMENTS) {
    text = text.replace(from, to);
  }
  if (text !== original) {
    fs.writeFileSync(filePath, text);
    return true;
  }
  return false;
}

let changed = 0;
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    if (migrateFile(file)) {
      changed++;
      console.log("updated", path.relative(root, file));
    }
  }
}
console.log(`\nDone. ${changed} files updated.`);
