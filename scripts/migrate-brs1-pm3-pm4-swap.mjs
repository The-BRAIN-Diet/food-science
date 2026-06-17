#!/usr/bin/env node
/** Renumber BRS1-FM1-PM4 → PM3 (serotonin) and BRS1-FM2-PM3 → PM4 (LAT1). */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BRS1 = path.join(ROOT, "docs/biological-targets/brs1");

const RENAMES = [
  [
    "fm1/brs1-fm1-pm4-serotonergic-signalling-regulation.mdx",
    "fm1/brs1-fm1-pm4-serotonergic-signalling-regulation.mdx",
  ],
  [
    "fm2/brs1-fm2-pm3-lat1-competitive-transport-modulation.mdx",
    "fm2/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx",
  ],
];

const REPLACEMENTS = [
  ["BRS1-FM1-PM4", "BRS1-FM1-PM4"],
  ["BRS1-FM2-PM3", "BRS1-FM1-PM2"],
  [
    "brs1-fm1-pm4-serotonergic-signalling-regulation",
    "brs1-fm1-pm4-serotonergic-signalling-regulation",
  ],
  [
    "brs1-fm2-pm3-lat1-competitive-transport-modulation",
    "brs1-fm1-pm2-lat1-competitive-transport-modulation",
  ],
];

function apply(text) {
  let out = text;
  const sorted = [...REPLACEMENTS].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) out = out.split(from).join(to);
  return out;
}

function walk(dir, skip = new Set(["node_modules", ".docusaurus", "build", ".git"])) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (skip.has(name)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files.push(...walk(full, skip));
    else if (/\.(mdx?|mjs|ts|json|mdc)$/.test(name)) files.push(full);
  }
  return files;
}

for (const [from, to] of RENAMES) {
  fs.renameSync(path.join(BRS1, from), path.join(BRS1, to));
}

for (const file of [
  ...walk(path.join(ROOT, "docs")),
  ...walk(path.join(ROOT, "system")),
  ...walk(path.join(ROOT, "scripts")),
  path.join(ROOT, "src/data/phenome-relationships.generated.json"),
  path.join(ROOT, "docusaurus.config.ts"),
]) {
  if (!fs.existsSync(file)) continue;
  if (file.includes("migrate-brs1-pm3-pm4-swap")) continue;
  const raw = fs.readFileSync(file, "utf8");
  const updated = apply(raw);
  if (updated !== raw) fs.writeFileSync(file, updated);
}

const configPath = path.join(ROOT, "docusaurus.config.ts");
let config = fs.readFileSync(configPath, "utf8");
const marker = "// BRS1 FM1-PM3 / FM2-PM4 serotonin-LAT1 swap";
if (!config.includes(marker)) {
  const lines = [
    `          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation', from: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation' },`,
    `          { to: '/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation', from: '/docs/biological-targets/brs1/fm2/brs1-fm2-pm3-lat1-competitive-transport-modulation' },`,
  ];
  config = config.replace(
    "        redirects: [",
    `        redirects: [\n          ${marker}\n${lines.join("\n")}`,
  );
  fs.writeFileSync(configPath, config);
}

console.log("BRS1 PM3/PM4 swap complete.");
