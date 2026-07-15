#!/usr/bin/env node
/**
 * Insert or replace functional descriptors under mechanism page titles.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MECHANISM_FUNCTIONAL_DESCRIPTORS } from "./data/mechanism-functional-descriptors.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

function normalizeFunctionalDescriptor(descriptor) {
  const trimmed = descriptor.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("(") ? trimmed : `(${trimmed})`;
}

function applyFunctionalDescriptor(body, descriptor) {
  const line = normalizeFunctionalDescriptor(descriptor);
  const titleRe = /^(#{2,3} [^\n]+)\n\n/m;
  const withExisting = /^(#{2,3} [^\n]+)\n\n\([^)]+\)\n/m;
  if (withExisting.test(body)) {
    return body.replace(withExisting, `$1\n\n${line}\n`);
  }
  if (titleRe.test(body)) {
    return body.replace(titleRe, `$1\n\n${line}\n\n`);
  }
  return null;
}

let updated = 0;
let skipped = 0;
let errors = 0;

for (const [relPath, descriptor] of Object.entries(MECHANISM_FUNCTIONAL_DESCRIPTORS)) {
  const filePath = path.join(docs, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`missing: ${relPath}`);
    errors++;
    continue;
  }
  const body = fs.readFileSync(filePath, "utf8");
  const next = applyFunctionalDescriptor(body, descriptor);
  if (!next) {
    console.error(`no title block: ${relPath}`);
    errors++;
    continue;
  }
  if (next === body) {
    skipped++;
    continue;
  }
  fs.writeFileSync(filePath, next);
  updated++;
  console.log(`updated: ${relPath}`);
}

console.log(
  `\nFunctional descriptors: ${updated} updated, ${skipped} unchanged, ${errors} errors`,
);
