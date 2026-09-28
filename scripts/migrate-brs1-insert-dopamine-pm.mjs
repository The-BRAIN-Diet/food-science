#!/usr/bin/env node
/**
 * Insert BRS1-FM1-PM3 (Dopaminergic Signalling Regulation) into the BRS-wide
 * PM sequence and shift the existing downstream BRS1 PM identifiers by one.
 *
 * Exact qualified IDs and complete route slugs are migrated. Bare PM numbers
 * are deliberately not replaced because they are ambiguous across BRSs.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const baselineReferenceRoots = process.argv
  .filter((argument) => argument.startsWith("--baseline-reference-root="))
  .map((argument) => path.resolve(ROOT, argument.slice("--baseline-reference-root=".length)));
const referenceOnly = baselineReferenceRoots.length > 0;
const rebuildBrs1Baseline = process.argv.includes("--rebuild-brs1-baseline");
const dopaminePage = path.join(
  ROOT,
  "docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx",
);

if (!referenceOnly && !rebuildBrs1Baseline && fs.existsSync(dopaminePage)) {
  console.log("BRS1 dopamine insertion already applied; no files changed.");
  process.exit(0);
}

const renames = [
  [
    "docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation.mdx",
    "docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation.mdx",
    "docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support.mdx",
    "docs/biological-targets/brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx",
    "docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance.mdx",
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-glutamate-neurotransmission-balance.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx",
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling.mdx",
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm10-glutamate-clearance-and-recycling.mdx",
  ],
  [
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation.mdx",
    "docs/biological-targets/brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation.mdx",
  ],
  [
    "system/pm8-dietary-addressability-adjudication.md",
    "system/pm9-dietary-addressability-adjudication.md",
  ],
  [
    "scripts/migrate-pm8-finding-scope.mjs",
    "scripts/migrate-pm9-finding-scope.mjs",
  ],
];

const shifts = [
  ["BRS1-FM1-PM3", "BRS1-FM1-PM4"],
  ["BRS1-FM1-PM4", "BRS1-FM1-PM5"],
  ["BRS1-FM2-PM5", "BRS1-FM2-PM6"],
  ["BRS1-FM3-PM6", "BRS1-FM3-PM7"],
  ["BRS1-FM4-PM7", "BRS1-FM4-PM8"],
  ["BRS1-FM4-PM8", "BRS1-FM4-PM9"],
  ["BRS1-FM4-PM9", "BRS1-FM4-PM10"],
  ["BRS1-FM4-PM10", "BRS1-FM4-PM11"],
  [
    "brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation",
    "brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation",
  ],
  [
    "brs1-fm1-pm4-serotonergic-signalling-regulation",
    "brs1-fm1-pm5-serotonergic-signalling-regulation",
  ],
  [
    "brs1-fm2-pm5-acetylcholine-synthesis-support",
    "brs1-fm2-pm6-acetylcholine-synthesis-support",
  ],
  [
    "brs1-fm3-pm6-neuronal-membrane-dha-incorporation",
    "brs1-fm3-pm7-neuronal-membrane-dha-incorporation",
  ],
  [
    "brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance",
    "brs1-fm4-pm8-gaba-glutamate-neurotransmission-balance",
  ],
  [
    "brs1-fm4-pm8-gaba-synthesis-capacity",
    "brs1-fm4-pm9-gaba-synthesis-capacity",
  ],
  [
    "brs1-fm4-pm9-glutamate-clearance-and-recycling",
    "brs1-fm4-pm10-glutamate-clearance-and-recycling",
  ],
  [
    "brs1-fm4-pm10-excitotoxicity-modulation",
    "brs1-fm4-pm11-excitotoxicity-modulation",
  ],
];

const textExtensions = new Set([
  ".md",
  ".mdx",
  ".mjs",
  ".js",
  ".ts",
  ".tsx",
  ".json",
  ".py",
  ".yml",
  ".yaml",
]);

const excludedDirectories = new Set([
  ".git",
  ".docusaurus",
  ".docusaurus-build",
  "build",
  "node_modules",
]);

const excludedFiles = new Set([
  "docusaurus.config.ts",
  "scripts/migrate-brs1-fm-shift-after-fm2-removal.mjs",
  "scripts/migrate-brs1-insert-pm4-serotonin.mjs",
  "scripts/migrate-brs1-fm1-pm-renumber.mjs",
  "scripts/migrate-brs1-pm3-pm4-swap.mjs",
  "scripts/migrate-brs1-insert-dopamine-pm.mjs",
  "src/data/phenome-relationships.generated.json",
  "src/data/brs-hub-levers.generated.json",
  "src/data/pm-sop-derived-interventions.generated.json",
  "system/fm-centric-pm-migration-report.md",
  "system/brs-incremental-pm-renumber-report.md",
]);

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, files);
    else files.push(absolute);
  }
  return files;
}

function replaceWithoutCollisions(content, replacements) {
  let next = content;
  const placeholders = replacements.map((_, index) => `__BRS1_PM_SHIFT_${index}__`);
  replacements.forEach(([from], index) => {
    next = next.split(from).join(placeholders[index]);
  });
  replacements.forEach(([, to], index) => {
    next = next.split(placeholders[index]).join(to);
  });
  return next;
}

if (!referenceOnly) {
  for (const [from, to] of renames) {
    const oldPath = path.join(ROOT, from);
    const newPath = path.join(ROOT, to);
    if (fs.existsSync(oldPath) && !fs.existsSync(newPath)) {
      fs.renameSync(oldPath, `${oldPath}.dopamine-shift`);
    }
  }

  for (const [from, to] of renames) {
    const temporaryPath = `${path.join(ROOT, from)}.dopamine-shift`;
    const newPath = path.join(ROOT, to);
    if (fs.existsSync(temporaryPath)) fs.renameSync(temporaryPath, newPath);
  }
}

let changed = 0;
const rebuiltBrs1PmFiles = [
  "docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx",
  "docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx",
  ...renames.slice(0, 8).map(([, destination]) => destination),
].map((relative) => path.join(ROOT, relative));
const filesToScan = referenceOnly
  ? baselineReferenceRoots.flatMap((entry) =>
      fs.statSync(entry).isDirectory() ? walk(entry) : [entry],
    )
  : rebuildBrs1Baseline
    ? rebuiltBrs1PmFiles
  : walk(ROOT);
for (const absolute of filesToScan) {
  const relative = path.relative(ROOT, absolute);
  if (excludedFiles.has(relative) || !textExtensions.has(path.extname(relative))) continue;

  const before = fs.readFileSync(absolute, "utf8");
  let after = replaceWithoutCollisions(before, shifts);

  // GABA-synthesis evidence atoms are PM-qualified and move with that PM.
  after = after
    .replaceAll("PM8-DIT-", "PM9-DIT-")
    .replaceAll("PM8-F", "PM9-F")
    .replaceAll("PM8-IC", "PM9-IC")
    .replaceAll("pm8-dietary-addressability-adjudication", "pm9-dietary-addressability-adjudication")
    .replaceAll("migrate-pm8-finding-scope", "migrate-pm9-finding-scope")
    .replaceAll("levers:audit-pm8", "levers:audit-pm9");

  if (after !== before) {
    fs.writeFileSync(absolute, after);
    changed++;
  }
}

console.log(`BRS1 dopamine insertion migration updated ${changed} text files.`);
