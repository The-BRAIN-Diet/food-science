#!/usr/bin/env node
/**
 * Renumber BRS1(FM1) PMs to sequential teaching order PM1–PM4:
 *   PM1 Amino-Acid (unchanged)
 *   PM2 LAT1 (was BRS1-FM2-PM4)
 *   PM3 Noradrenergic (was BRS1-FM1-PM2)
 *   PM4 Serotonergic (was BRS1-FM1-PM3)
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FM1 = path.join(ROOT, "docs/biological-targets/brs1/fm1");

const RENAMES = [
  [
    "brs1-fm1-pm3-serotonergic-signalling-regulation.mdx",
    "brs1-fm1-pm4-serotonergic-signalling-regulation.mdx",
  ],
  [
    "brs1-fm1-pm2-noradrenergic-signalling-attention-executive-modulation.mdx",
    "brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation.mdx",
  ],
  [
    "brs1-fm2-pm4-lat1-competitive-transport-modulation.mdx",
    "brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx",
  ],
];

const ID_MAP = [
  ["BRS1-FM1-PM3", "__BRS1_FM1_PM4__"],
  ["BRS1-FM1-PM2", "__BRS1_FM1_PM3__"],
  ["BRS1-FM2-PM4", "BRS1-FM1-PM2"],
  ["__BRS1_FM1_PM3__", "BRS1-FM1-PM3"],
  ["__BRS1_FM1_PM4__", "BRS1-FM1-PM4"],
];

const SLUG_MAP = [
  [
    "brs1-fm1-pm3-serotonergic-signalling-regulation",
    "__brs1_fm1_pm4_serotonergic_signalling_regulation__",
  ],
  [
    "brs1-fm1-pm2-noradrenergic-signalling-attention-executive-modulation",
    "__brs1_fm1_pm3_noradrenergic_signalling_attention_executive_modulation__",
  ],
  [
    "brs1-fm2-pm4-lat1-competitive-transport-modulation",
    "brs1-fm1-pm2-lat1-competitive-transport-modulation",
  ],
  [
    "__brs1_fm1_pm3_noradrenergic_signalling_attention_executive_modulation__",
    "brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation",
  ],
  [
    "__brs1_fm1_pm4_serotonergic_signalling_regulation__",
    "brs1-fm1-pm4-serotonergic-signalling-regulation",
  ],
];

const REDIRECTS = [
  {
    to: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation",
    from: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-serotonergic-signalling-regulation",
  },
  {
    to: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation",
    from: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-noradrenergic-signalling-attention-executive-modulation",
  },
  {
    to: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation",
    from: "/docs/biological-targets/brs1/fm1/brs1-fm2-pm4-lat1-competitive-transport-modulation",
  },
  {
    to: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation",
    from: "/docs/biological-targets/brs1/fm2/brs1-fm2-pm4-lat1-competitive-transport-modulation",
  },
];

function applyMap(text, pairs) {
  let out = text;
  for (const [from, to] of pairs) out = out.split(from).join(to);
  return out;
}

function walk(dir, skip = new Set(["node_modules", ".docusaurus", "build", ".git"])) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (skip.has(name)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files.push(...walk(full, skip));
    else if (/\.(mdx?|mjs|ts|json|mdc|cue)$/.test(name)) files.push(full);
  }
  return files;
}

for (const [from, to] of RENAMES) {
  const fromPath = path.join(FM1, from);
  const toPath = path.join(FM1, to);
  if (!fs.existsSync(fromPath)) {
    console.error(`Missing ${fromPath}`);
    process.exit(1);
  }
  fs.renameSync(fromPath, toPath);
}

const targets = [
  ...walk(path.join(ROOT, "docs")),
  ...walk(path.join(ROOT, "system")),
  ...walk(path.join(ROOT, "scripts")),
  path.join(ROOT, "src/data/phenome-relationships.generated.json"),
  path.join(ROOT, "docusaurus.config.ts"),
];

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  if (file.includes("migrate-brs1-fm1-pm-renumber")) continue;
  if (file.endsWith("docusaurus.config.ts")) continue;
  const raw = fs.readFileSync(file, "utf8");
  let updated = applyMap(raw, SLUG_MAP);
  updated = applyMap(updated, ID_MAP);
  if (updated !== raw) fs.writeFileSync(file, updated);
}

const configPath = path.join(ROOT, "docusaurus.config.ts");
let config = fs.readFileSync(configPath, "utf8");
const marker = "// BRS1(FM1) PM1–PM4 teaching-order renumber";
if (!config.includes(marker)) {
  const lines = REDIRECTS.map(
    (r) => `          { to: '${r.to}', from: '${r.from}' },`,
  );
  config = config.replace(
    "        redirects: [",
    `        redirects: [\n          ${marker}\n${lines.join("\n")}`,
  );
  fs.writeFileSync(configPath, config);
}

console.log("BRS1(FM1) PM1–PM4 renumber complete.");
