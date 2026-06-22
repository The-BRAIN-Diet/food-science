#!/usr/bin/env node
/**
 * Remove adjacent duplicate inline citation brackets across mechanism MDX files.
 *
 * Usage:
 *   node scripts/dedupe-adjacent-citations.mjs [--dry-run] [--dir docs/biological-targets]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dedupeAdjacentCitationBrackets } from "./lib/dedupe-citations.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const dirIdx = args.indexOf("--dir");
  return {
    dryRun: args.includes("--dry-run"),
    dir: dirIdx === -1 ? path.join(root, "docs/biological-targets") : path.resolve(root, args[dirIdx + 1]),
  };
}

function main() {
  const { dryRun, dir } = parseArgs();
  const files = walk(dir);
  let updated = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const next = dedupeAdjacentCitationBrackets(raw);
    if (next === raw) continue;
    if (!dryRun) fs.writeFileSync(filePath, next, "utf8");
    updated++;
    console.log(`${dryRun ? "would update" : "updated"}: ${path.relative(root, filePath)}`);
  }

  console.log(`\nDone. updated=${updated} scanned=${files.length}`);
}

main();
