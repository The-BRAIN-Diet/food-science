#!/usr/bin/env node
/**
 * Apply BRS1 Phase 3 phenome scores and sync §3.
 *
 * Usage: node scripts/migrate-brs1-phase3-phenome.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import {
  BRS1_PM_PHASE3_SCORES,
  BRS1_FM_PHASE3_SCORES,
  BRS1_SINGLE_PM_FM,
} from "./data/brs1-phase3-phenome-scores.mjs";

const rootDir = process.cwd();
const brs1Dir = path.join(rootDir, "docs/biological-targets/brs1");

function walkMdx(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkMdx(p, acc);
    else if (ent.name.endsWith(".mdx")) acc.push(p);
  }
  return acc;
}

function applyPmScores(filePath, pmId) {
  const scores = BRS1_PM_PHASE3_SCORES[pmId];
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

function applyFmScores(filePath, fmId) {
  const scores = BRS1_FM_PHASE3_SCORES[fmId] || BRS1_SINGLE_PM_FM[fmId];
  if (!scores) return false;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const outcomes = data.functional_outcome_context;
  if (!Array.isArray(outcomes)) return false;

  const byPhenome = new Map(scores.map((s) => [s.phenome, s]));
  let changed = false;

  const nextOutcomes = outcomes.map((row) => {
    const target = String(row.outcome_name || "").trim();
    const score = byPhenome.get(target);
    if (!score) return row;
    const next = { ...row };
    for (const key of ["confidence", "evidence_confidence"]) {
      if (score[key] != null && next[key] !== score[key]) {
        next[key] = score[key];
        changed = true;
      }
    }
    return next;
  });

  if (!changed) return false;
  data.functional_outcome_context = nextOutcomes;
  fs.writeFileSync(filePath, matter.stringify(content, data, { lineWidth: 9999 }));
  return true;
}

let pmUpdated = 0;
let fmUpdated = 0;

for (const filePath of walkMdx(brs1Dir)) {
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  if (data.pm_id && BRS1_PM_PHASE3_SCORES[data.pm_id]) {
    if (applyPmScores(filePath, data.pm_id)) {
      pmUpdated++;
      console.log(`  PM ${data.pm_id}`);
    }
  }
  if (data.fm_id && (BRS1_FM_PHASE3_SCORES[data.fm_id] || BRS1_SINGLE_PM_FM[data.fm_id])) {
    if (applyFmScores(filePath, data.fm_id)) {
      fmUpdated++;
      console.log(`  FM ${data.fm_id}`);
    }
  }
}

console.log(`\nBRS1 Phase 3 scores: ${pmUpdated} PM(s), ${fmUpdated} FM(s) updated`);

if (pmUpdated + fmUpdated > 0) {
  console.log("\nRunning phenome:sync …");
  execSync("node scripts/migrate-phenome-section.mjs --sync", { cwd: rootDir, stdio: "inherit" });
  console.log("Running phenome:index …");
  execSync("node scripts/generate-phenome-relationship-index.mjs", { cwd: rootDir, stdio: "inherit" });
}
