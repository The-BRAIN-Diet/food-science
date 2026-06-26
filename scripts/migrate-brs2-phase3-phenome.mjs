#!/usr/bin/env node
/**
 * Apply BRS2 Phase 3 phenome scores, FM outcome synthesis, and sync §3.
 *
 * Usage: node scripts/migrate-brs2-phase3-phenome.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import {
  BRS2_PM_PHASE3_SCORES,
  BRS2_FM_PHASE3_SCORES,
  BRS2_FM_OUTCOME_SYNTHESIS,
} from "./data/brs2-phase3-phenome-scores.mjs";

const rootDir = process.cwd();
const brs2Dir = path.join(rootDir, "docs/biological-targets/brs2");

function walkMdx(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMdx(p, acc);
    else if (ent.name.endsWith(".mdx")) acc.push(p);
  }
  return acc;
}

function applyPmScores(filePath, pmId) {
  const scores = BRS2_PM_PHASE3_SCORES[pmId];
  if (!scores) return false;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rels = data.phenome_relationships;
  if (!Array.isArray(rels)) return false;

  const byPhenome = new Map(scores.map((s) => [s.phenome, s]));
  let changed = false;

  const nextRels = rels.map((row) => {
    const target = String(row.target_phenome || "").trim();
    const score = byPhenome.get(target);
    if (!score) return row;
    const next = { ...row };
    for (const key of ["confidence", "evidence_confidence", "evidence_level"]) {
      if (next[key] !== score[key]) {
        next[key] = score[key];
        changed = true;
      }
    }
    return next;
  });

  if (!changed) return false;
  data.phenome_relationships = nextRels;
  fs.writeFileSync(filePath, matter.stringify(content, data, { lineWidth: 9999 }));
  return true;
}

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
  const scores = BRS2_FM_PHASE3_SCORES[fmId];
  const synthesisMap = BRS2_FM_OUTCOME_SYNTHESIS[fmId];
  if (!scores?.length || !synthesisMap) return false;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const existing = Array.isArray(data.functional_outcome_context)
    ? data.functional_outcome_context
    : null;

  const nextOutcomes = scores.map((score) => {
    const synthesisEntry = synthesisMap[score.phenome];
    if (!synthesisEntry) {
      throw new Error(`${fmId}: missing BRS2_FM_OUTCOME_SYNTHESIS for "${score.phenome}"`);
    }
    return buildFmOutcomeRow(score, synthesisEntry);
  });

  let changed = false;

  if (!existing) {
    changed = true;
  } else {
    const byOutcome = new Map(existing.map((row) => [String(row.outcome_name || "").trim(), row]));
    for (const nextRow of nextOutcomes) {
      const prev = byOutcome.get(nextRow.outcome_name);
      if (!prev) {
        changed = true;
        break;
      }
      for (const key of ["confidence", "evidence_confidence", "synthesis"]) {
        if (prev[key] !== nextRow[key]) {
          changed = true;
          break;
        }
      }
      if (changed) break;
      if (JSON.stringify(prev.references || []) !== JSON.stringify(nextRow.references)) {
        changed = true;
        break;
      }
    }
    if (!changed && existing.length !== nextOutcomes.length) changed = true;
  }

  if (!changed) return false;

  data.functional_outcome_context = nextOutcomes;
  fs.writeFileSync(filePath, matter.stringify(content, data, { lineWidth: 9999 }));
  return true;
}

let pmUpdated = 0;
let fmUpdated = 0;

for (const filePath of walkMdx(brs2Dir)) {
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  if (data.pm_id && BRS2_PM_PHASE3_SCORES[data.pm_id]) {
    if (applyPmScores(filePath, data.pm_id)) {
      pmUpdated++;
      console.log(`  PM ${data.pm_id}`);
    }
  }
  if (data.fm_id && BRS2_FM_PHASE3_SCORES[data.fm_id]) {
    if (applyFmOutcomeContext(filePath, data.fm_id)) {
      fmUpdated++;
      console.log(`  FM ${data.fm_id}`);
    }
  }
}

console.log(`\nBRS2 Phase 3 scores: ${pmUpdated} PM(s), ${fmUpdated} FM(s) updated`);

if (pmUpdated + fmUpdated > 0) {
  console.log("\nRunning phenome:sync …");
  execSync("node scripts/migrate-phenome-section.mjs --sync", { cwd: rootDir, stdio: "inherit" });
  console.log("Running phenome:index …");
  execSync("node scripts/generate-phenome-relationship-index.mjs", { cwd: rootDir, stdio: "inherit" });
}
