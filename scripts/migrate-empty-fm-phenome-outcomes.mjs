#!/usr/bin/env node
/**
 * Apply functional_outcome_context to previously empty FMs (BRS3 FM2, BRS5, BRS6)
 * and sync Phenome Connections §3.
 *
 * Usage: node scripts/migrate-empty-fm-phenome-outcomes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import {
  EMPTY_FM_PHASE3_SCORES,
  EMPTY_FM_OUTCOME_SYNTHESIS,
} from "./data/empty-fm-phenome-outcomes.mjs";

const rootDir = process.cwd();

const FM_FILES = {
  "BRS3(FM2)":
    "docs/biological-targets/brs3/fm2/brs3-fm2-antioxidant-defense-capacity.mdx",
  "BRS5(FM1)":
    "docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface.mdx",
  "BRS5(FM2)":
    "docs/biological-targets/brs5/fm2/brs5-fm2-microbial-metabolite-signalling-capacity.mdx",
  "BRS5(FM3)":
    "docs/biological-targets/brs5/fm3/brs5-fm3-gut-vagal-neuromodulation-and-ens-signalling.mdx",
  "BRS6(FM1)":
    "docs/biological-targets/brs6/fm1/brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability.mdx",
  "BRS6(FM2)":
    "docs/biological-targets/brs6/fm2/brs6-fm2-hpa-axis-rhythm-and-cortisol-regulation.mdx",
  "BRS6(FM3)":
    "docs/biological-targets/brs6/fm3/brs6-fm3-autonomic-balance-and-vagal-recovery-capacity.mdx",
  "BRS6(FM4)":
    "docs/biological-targets/brs6/fm4/brs6-fm4-stress-inflammation-metabolic-load-allocation.mdx",
};

function buildFmOutcomeRow(score, synthesisEntry) {
  return {
    outcome_name: score.phenome,
    confidence: score.confidence,
    evidence_confidence: score.evidence_confidence,
    synthesis: synthesisEntry.synthesis,
    references: synthesisEntry.references.map((ref) => ({ ...ref })),
  };
}

function applyFmOutcomeContext(filePath, fmId) {
  const scores = EMPTY_FM_PHASE3_SCORES[fmId];
  const synthesisMap = EMPTY_FM_OUTCOME_SYNTHESIS[fmId];
  if (!scores?.length || !synthesisMap) {
    throw new Error(`Missing scores/synthesis for ${fmId}`);
  }

  const full = path.join(rootDir, filePath);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const nextOutcomes = scores.map((score) => {
    const synthesisEntry = synthesisMap[score.phenome];
    if (!synthesisEntry) {
      throw new Error(`${fmId}: missing synthesis for "${score.phenome}"`);
    }
    return buildFmOutcomeRow(score, synthesisEntry);
  });

  data.functional_outcome_context = nextOutcomes;
  fs.writeFileSync(full, matter.stringify(content, data, { lineWidth: 9999 }));
  return true;
}

let updated = 0;
for (const [fmId, filePath] of Object.entries(FM_FILES)) {
  applyFmOutcomeContext(filePath, fmId);
  updated++;
  console.log(`  FM ${fmId}`);
}

console.log(`\nUpdated ${updated} FM(s)`);
console.log("\nRunning phenome:sync …");
execSync("node scripts/migrate-phenome-section.mjs --sync", {
  cwd: rootDir,
  stdio: "inherit",
});
console.log("Running phenome:index …");
execSync("node scripts/generate-phenome-relationship-index.mjs", {
  cwd: rootDir,
  stdio: "inherit",
});
console.log("Running phenome:sync-references …");
execSync("node scripts/sync-phenome-references.mjs", {
  cwd: rootDir,
  stdio: "inherit",
});
