#!/usr/bin/env node
/**
 * Insert BRS1-FM1-PM4 (Serotonergic) and renumber BRS1 PM4+ → PM5+.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BRS1 = path.join(ROOT, "docs/biological-targets/brs1");

const RENAMES = [
  ["fm5/brs1-fm4-pm9-excitotoxicity-modulation.mdx", "fm5/brs1-fm4-pm10-excitotoxicity-modulation.mdx"],
  ["fm5/brs1-fm4-pm8-glutamate-clearance-and-recycling.mdx", "fm5/brs1-fm4-pm9-glutamate-clearance-and-recycling.mdx"],
  ["fm5/brs1-fm4-pm7-gaba-synthesis-capacity.mdx", "fm5/brs1-fm4-pm8-gaba-synthesis-capacity.mdx"],
  ["fm5/brs1-fm4-pm6-gaba-glutamate-neurotransmission-balance.mdx", "fm5/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance.mdx"],
  ["fm4/brs1-fm3-pm5-neuronal-membrane-dha-incorporation.mdx", "fm4/brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx"],
  ["fm3/brs1-fm2-pm4-acetylcholine-synthesis-support.mdx", "fm3/brs1-fm2-pm5-acetylcholine-synthesis-support.mdx"],
];

const ID_MAP = [
  ["BRS1-FM4-PM9", "BRS1-FM4-PM10"],
  ["BRS1-FM4-PM8", "BRS1-FM4-PM9"],
  ["BRS1-FM4-PM7", "BRS1-FM4-PM8"],
  ["BRS1-FM4-PM6", "BRS1-FM4-PM7"],
  ["BRS1-FM3-PM5", "BRS1-FM3-PM6"],
  ["BRS1-FM2-PM4", "BRS1-FM2-PM5"],
];

function slugMap() {
  const pairs = [];
  for (const [from, to] of RENAMES) {
    pairs.push([from.replace(/\.mdx$/, ""), to.replace(/\.mdx$/, "")]);
    pairs.push([
      `/docs/biological-targets/brs1/${from.replace(/\.mdx$/, "")}`,
      `/docs/biological-targets/brs1/${to.replace(/\.mdx$/, "")}`,
    ]);
  }
  return pairs;
}

function applyMap(text) {
  let out = text;
  const all = [...ID_MAP, ...slugMap()].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of all) {
    out = out.split(from).join(to);
  }
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
  const fromPath = path.join(BRS1, from);
  const toPath = path.join(BRS1, to);
  if (!fs.existsSync(fromPath)) throw new Error(`Missing ${fromPath}`);
  fs.renameSync(fromPath, toPath);
}

for (const file of walk(path.join(ROOT, "docs"))) {
  if (file.includes("migrate-brs1-insert-pm4")) continue;
  const raw = fs.readFileSync(file, "utf8");
  const updated = applyMap(raw);
  if (updated !== raw) fs.writeFileSync(file, updated);
}

for (const file of walk(path.join(ROOT, "system"))) {
  const raw = fs.readFileSync(file, "utf8");
  const updated = applyMap(raw);
  if (updated !== raw) fs.writeFileSync(file, updated);
}

const configPath = path.join(ROOT, "docusaurus.config.ts");
let config = fs.readFileSync(configPath, "utf8");
const redirects = [
  ["brs1-fm2-pm4-acetylcholine-synthesis-support", "brs1-fm2-pm5-acetylcholine-synthesis-support"],
  ["brs1-fm3-pm5-neuronal-membrane-dha-incorporation", "brs1-fm3-pm6-neuronal-membrane-dha-incorporation"],
  ["brs1-fm4-pm6-gaba-glutamate-neurotransmission-balance", "brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance"],
  ["brs1-fm4-pm7-gaba-synthesis-capacity", "brs1-fm4-pm8-gaba-synthesis-capacity"],
  ["brs1-fm4-pm8-glutamate-clearance-and-recycling", "brs1-fm4-pm9-glutamate-clearance-and-recycling"],
  ["brs1-fm4-pm9-excitotoxicity-modulation", "brs1-fm4-pm10-excitotoxicity-modulation"],
];
const marker = "// BRS1 insert PM4 serotonin renumber";
if (!config.includes(marker)) {
  const properLines = redirects.map(
    ([from, to]) =>
      `          { to: '/docs/biological-targets/brs1/fm${to.match(/fm(\d+)/)[1]}/${to}', from: '/docs/biological-targets/brs1/fm${from.match(/fm(\d+)/)[1]}/${from}' },`,
  );
  config = config.replace(
    "        redirects: [",
    `        redirects: [\n          ${marker}\n${properLines.join("\n")}`,
  );
  fs.writeFileSync(configPath, config);
}

console.log("BRS1 PM4+ renumber complete.");
