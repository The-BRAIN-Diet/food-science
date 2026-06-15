#!/usr/bin/env node
/**
 * Replace generic "— Supporting Study" reference labels with descriptive topics from bibtex.
 */
import path from "node:path";
import fs from "node:fs";
import { fixGenericReferenceLabelsFile } from "./lib/brs-citation-migration.mjs";

const ROOT = process.cwd();
const TARGETS = path.join(ROOT, "docs");

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (/\.mdx?$/.test(name) && fs.readFileSync(full, "utf8").includes("Supporting Study")) {
      files.push(full);
    }
  }
  return files;
}

const prefix = process.argv.includes("--prefix")
  ? process.argv[process.argv.indexOf("--prefix") + 1]
  : null;
let files = walk(TARGETS);
if (prefix) {
  const needle = `${path.sep}${prefix}${path.sep}`;
  files = files.filter((f) => f.includes(needle));
}

let changed = 0;
for (const file of files) {
  const result = fixGenericReferenceLabelsFile(file);
  if (result.changed) {
    changed++;
    console.log(`fixed ${path.relative(ROOT, file)}`);
  }
}
console.log(`\nUpdated ${changed}/${files.length} files.`);
