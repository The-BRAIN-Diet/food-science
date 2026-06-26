#!/usr/bin/env node
/**
 * Migrate FM §4 to Integrated FM Narrative (4.1 PMs, 4.2 narrative, 4.3 failure modes).
 *
 * Usage:
 *   node scripts/migrate-fm-integrated-narrative.mjs           # all FMs
 *   node scripts/migrate-fm-integrated-narrative.mjs --brs=1,2,3
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  replaceFmSection4,
  fixFmTailFormatting,
} from "./lib/fm-integrated-narrative.mjs";
import { loadKcStressorMap } from "./lib/fm-failure-modes.mjs";

const rootDir = process.cwd();

const brsArg = process.argv.find((a) => a.startsWith("--brs="));
const brsFilter = brsArg
  ? new Set(
      brsArg
        .slice("--brs=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    )
  : null;

function isFmOverviewPage(filePath, fileName) {
  return /[/\\]fm\d+[/\\]/.test(filePath) && !/-pm\d+-/.test(fileName);
}

function listFmFiles(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) listFmFiles(p, acc);
    else if (ent.name.endsWith(".mdx") && isFmOverviewPage(p, ent.name)) acc.push(p);
  }
  return acc;
}

function matchesBrsFilter(filePath) {
  if (!brsFilter) return true;
  const m = filePath.match(/brs(\d+)[/\\]fm\d+/i);
  return m ? brsFilter.has(m[1]) : false;
}

let updated = 0;
const kcStressorMap = loadKcStressorMap(rootDir);
if (brsFilter) {
  console.log(`BRS filter: ${[...brsFilter].sort().join(", ")}`);
}
for (const filePath of listFmFiles(path.join(rootDir, "docs/biological-targets"))) {
  if (!matchesBrsFilter(filePath)) continue;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  let body = replaceFmSection4(content, data, rootDir, kcStressorMap);
  body = fixFmTailFormatting(body);
  if (body !== content) {
    fs.writeFileSync(filePath, matter.stringify(body, data, { lineWidth: 9999 }));
    updated++;
  }
}

console.log(`Updated ${updated} FM pages with integrated §4 narrative`);
