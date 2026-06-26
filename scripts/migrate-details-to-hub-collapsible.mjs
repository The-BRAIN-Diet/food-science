#!/usr/bin/env node
/**
 * Convert remaining <details> dropdowns to hub collapsible markup on mechanism + hub pages.
 *
 * Usage: node scripts/migrate-details-to-hub-collapsible.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { migrateDetailsToHubCollapsible } from "./lib/hub-collapsible.mjs";

const root = path.join(process.cwd(), "docs/biological-targets");

function walkFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, acc);
    else if (/\.mdx?$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

let updated = 0;

for (const filePath of walkFiles(root)) {
  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.includes("<details>")) continue;
  const next = migrateDetailsToHubCollapsible(raw);
  if (next === raw) continue;
  fs.writeFileSync(filePath, next);
  updated++;
  console.log(`  ${path.relative(process.cwd(), filePath)}`);
}

console.log(`\nHub collapsible migration: ${updated} file(s) updated`);
