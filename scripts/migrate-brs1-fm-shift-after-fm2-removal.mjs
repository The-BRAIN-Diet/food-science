#!/usr/bin/env node
/**
 * After BRS1(FM2) removal, renumber FMs down: FM3→FM2, FM4→FM3, FM5→FM4.
 * PM numbers stay BRS-wide incremental (PM5, PM6, PM7…).
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BRS1 = path.join(ROOT, "docs/biological-targets/brs1");

const FM_RENAMES = [
  ["fm3", "_renum_tmp_fm2"],
  ["fm4", "_renum_tmp_fm3"],
  ["fm5", "_renum_tmp_fm4"],
  ["_renum_tmp_fm2", "fm2"],
  ["_renum_tmp_fm3", "fm3"],
  ["_renum_tmp_fm4", "fm4"],
];

const FILE_RENAMES = [
  ["fm2/brs1-fm3-cholinergic-function.mdx", "fm2/brs1-fm2-cholinergic-function.mdx"],
  ["fm2/brs1-fm3-pm5-acetylcholine-synthesis-support.mdx", "fm2/brs1-fm2-pm5-acetylcholine-synthesis-support.mdx"],
  [
    "fm3/brs1-fm4-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx",
    "fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx",
  ],
  [
    "fm3/brs1-fm4-pm6-neuronal-membrane-dha-incorporation.mdx",
    "fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx",
  ],
  [
    "fm4/brs1-fm5-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx",
    "fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx",
  ],
  [
    "fm4/brs1-fm5-pm7-gaba-glutamate-neurotransmission-balance.mdx",
    "fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance.mdx",
  ],
  ["fm4/brs1-fm5-pm8-gaba-synthesis-capacity.mdx", "fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx"],
  [
    "fm4/brs1-fm5-pm9-glutamate-clearance-and-recycling.mdx",
    "fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling.mdx",
  ],
  ["fm4/brs1-fm5-pm10-excitotoxicity-modulation.mdx", "fm4/brs1-fm4-pm10-excitotoxicity-modulation.mdx"],
];

const ID_REPLACEMENTS = [
  ["BRS1(FM5)", "__BRS1_TMP_FM4__"],
  ["BRS1(FM4)", "__BRS1_TMP_FM3__"],
  ["BRS1(FM3)", "BRS1(FM2)"],
  ["BRS1-FM5", "__BRS1_TMP_FM4__"],
  ["BRS1-FM4", "__BRS1_TMP_FM3__"],
  ["BRS1-FM3", "BRS1-FM2"],
  ["brs1-fm5", "__brs1_tmp_fm4__"],
  ["brs1-fm4", "__brs1_tmp_fm3__"],
  ["brs1-fm3", "brs1-fm2"],
  ["/brs1/fm5/", "/__brs1_tmp_fm4__/"],
  ["/brs1/fm4/", "/__brs1_tmp_fm3__/"],
  ["/brs1/fm3/", "/brs1/fm2/"],
  ["__BRS1_TMP_FM3__", "BRS1(FM3)"],
  ["__BRS1_TMP_FM4__", "BRS1(FM4)"],
  ["__BRS1_TMP_FM3__", "BRS1-FM3"],
  ["__BRS1_TMP_FM4__", "BRS1-FM4"],
  ["__brs1_tmp_fm3__", "brs1-fm3"],
  ["__brs1_tmp_fm4__", "brs1-fm4"],
  ["/__brs1_tmp_fm3__/", "/brs1/fm3/"],
  ["/__brs1_tmp_fm4__/", "/brs1/fm4/"],
];

const LEGACY_REDIRECTS = [
  {
    to: "/docs/biological-targets/brs1/fm2/brs1-fm2-cholinergic-function",
    from: "/docs/biological-targets/brs1/fm3/brs1-fm3-cholinergic-function",
  },
  {
    to: "/docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support",
    from: "/docs/biological-targets/brs1/fm3/brs1-fm3-pm5-acetylcholine-synthesis-support",
  },
  {
    to: "/docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration",
    from: "/docs/biological-targets/brs1/fm4/brs1-fm4-phospholipid-mediated-dha-delivery-and-membrane-integration",
  },
  {
    to: "/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation",
    from: "/docs/biological-targets/brs1/fm4/brs1-fm4-pm6-neuronal-membrane-dha-incorporation",
  },
  {
    to: "/docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation",
    from: "/docs/biological-targets/brs1/fm5/brs1-fm5-excitatory-inhibitory-balance-gaba-glutamate-regulation",
  },
  {
    to: "/docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance",
    from: "/docs/biological-targets/brs1/fm5/brs1-fm5-pm7-gaba-glutamate-neurotransmission-balance",
  },
  {
    to: "/docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity",
    from: "/docs/biological-targets/brs1/fm5/brs1-fm5-pm8-gaba-synthesis-capacity",
  },
  {
    to: "/docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling",
    from: "/docs/biological-targets/brs1/fm5/brs1-fm5-pm9-glutamate-clearance-and-recycling",
  },
  {
    to: "/docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation",
    from: "/docs/biological-targets/brs1/fm5/brs1-fm5-pm10-excitotoxicity-modulation",
  },
];

const CATEGORY_UPDATES = {
  "fm2/_category_.json": { position: 2, label: "BRS1(FM2) - Cholinergic Function", id: "biological-targets/brs1/fm2/brs1-fm2-cholinergic-function" },
  "fm3/_category_.json": { position: 3, label: "BRS1(FM3) - Membrane Composition, Fluidity & Structural Lipid Integrity", id: "biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration" },
  "fm4/_category_.json": { position: 4, label: "BRS1(FM4) - GABA–Glutamate Regulation", id: "biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation" },
};

function applyReplacements(text) {
  let out = text;
  for (const [from, to] of ID_REPLACEMENTS) out = out.split(from).join(to);
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

for (const [from, to] of FM_RENAMES) {
  fs.renameSync(path.join(BRS1, from), path.join(BRS1, to));
}

for (const [from, to] of FILE_RENAMES) {
  fs.renameSync(path.join(BRS1, from), path.join(BRS1, to));
}

for (const [rel, meta] of Object.entries(CATEGORY_UPDATES)) {
  const catPath = path.join(BRS1, rel);
  const cat = JSON.parse(fs.readFileSync(catPath, "utf8"));
  cat.label = meta.label;
  cat.position = meta.position;
  cat.link.id = meta.id;
  fs.writeFileSync(catPath, `${JSON.stringify(cat, null, 2)}\n`);
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
  if (file.includes("migrate-brs1-fm-shift-after-fm2-removal")) continue;
  const raw = fs.readFileSync(file, "utf8");
  const updated = applyReplacements(raw);
  if (updated !== raw) fs.writeFileSync(file, updated);
}

const configPath = path.join(ROOT, "docusaurus.config.ts");
let config = fs.readFileSync(configPath, "utf8");
const marker = "// BRS1 FM3–FM5 → FM2–FM4 after FM2 removal";
if (!config.includes(marker)) {
  const lines = LEGACY_REDIRECTS.map((r) => `          { to: '${r.to}', from: '${r.from}' },`);
  config = config.replace(
    "        redirects: [",
    `        redirects: [\n          ${marker}\n${lines.join("\n")}`,
  );
  fs.writeFileSync(configPath, config);
}

console.log("BRS1 FM3–FM5 → FM2–FM4 renumber complete.");
