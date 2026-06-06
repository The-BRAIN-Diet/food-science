/**
 * Build FM §4.4 Functional Failure Modes from linked KC stressors and PM context.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractKcStressors } from "./kc-stressor-extract.mjs";

export const FM_FAILURE_OVERRIDES = {
  "BRS5(FM1)": `### 4.4 Functional Failure Modes

Gut barrier integrity may weaken when fermentable substrate availability declines, barrier-supportive nutrient sufficiency is inadequate, keystone taxa support is reduced, or endotoxin containment becomes compromised.

Low-fibre and low-plant-diversity dietary patterns may reduce [BRS5(KC1) — Fermentable Fibre Availability](/docs/biological-targets/brs5/kc/brs5-kc1-fermentable-fibre-availability), limiting microbial fermentation and short-chain fatty acid generation. Ultra-processed diets may further displace fermentable whole-food substrates, while repeated low intake of resistant starch and soluble fibre classes may reduce the consistency of microbial substrate delivery.

Low zinc, omega-3, and vitamin-A-supportive dietary patterns may strain [BRS5(KC3) — Barrier-Supportive Nutrient Sufficiency](/docs/biological-targets/brs5/kc/brs5-kc3-barrier-supportive-nutrient-sufficiency), while chronic alcohol, emulsifier-heavy, or ultra-processed exposures and inflammatory burden may increase barrier vulnerability.

These pressures may impair [BRS5(PM3) — Gut Barrier / Tight Junction Integrity](/docs/biological-targets/brs5/pm/brs5-pm3-gut-barrier-tight-junction-integrity), weaken [BRS5(PM4) — LPS / Endotoxin Containment](/docs/biological-targets/brs5/pm/brs5-pm4-lps-endotoxin-containment), and reduce the ecological support described by [BRS5(PM7) — Keystone Taxa Support](/docs/biological-targets/brs5/pm/brs5-pm7-keystone-taxa-support). At the FM level, this may shift the system toward weaker epithelial containment, increased immune activation, and greater gut-derived inflammatory signalling.`,
};

/** Archived KC stressors (migrated off KC pages into FM §4.4). */
export const KC_STRESSOR_ARCHIVE = {
  "BRS1(KC2)": [
    "Reliance on incomplete protein sources without complementary pairing",
    "Chronically low indispensable amino-acid coverage across meals",
    "LNAA imbalance favouring transport competition away from key precursors",
    "Ultra-processed low-protein dietary patterns",
    "Inconsistent protein distribution across the day",
  ],
  "BRS2(KC1)": [
    "Low intake of methyl-donor-rich foods",
    "Poor dietary choline availability",
    "Low folate availability",
    "Increased methylation demand",
    "Impaired remethylation efficiency",
    "Dietary patterns with chronically low donor-pool support",
  ],
  "BRS2(KC2)": [
    "Low protein quality or insufficient sulfur-amino-acid intake",
    "Chronic methionine substrate insufficiency",
    "Increased glutathione demand",
    "Increased oxidative burden driving sulfur-amino-acid utilisation",
    "Restrictive dietary patterns reducing substrate diversity",
  ],
  "BRS3(KC1)": [
    "Low fruit and vegetable intake",
    "Low polyphenol density",
    "Poor sulfur-amino-acid and glutathione-building substrate availability",
    "Chronic oxidative burden",
    "Ultra-processed dietary patterns displacing antioxidant-rich foods",
  ],
  "BRS3(KC3)": [
    "Low omega-3 intake",
    "Excessive omega-6 dominance",
    "Low oily fish consumption",
    "Poor dietary fatty-acid diversity",
    "Chronic inflammatory load",
  ],
  "BRS4(KC1)": [
    "chronic energy deficit or under-fuelling",
    "erratic meal patterns reducing substrate continuity",
    "ultra-processed food patterns with poor fuel quality",
    "low protein intake where amino-acid support is needed",
    "metabolic or inflammatory burden increasing energetic demand",
  ],
  "BRS4(KC2)": [
    "low micronutrient density across the diet",
    "restrictive or low-variety dietary patterns",
    "chronic oxidative or inflammatory burden increasing cofactor demand",
    "impaired absorption or depletion states",
    "high energy intake with poor micronutrient quality",
  ],
  "BRS5(KC1)": [
    "low fibre and low plant-diversity dietary patterns",
    "ultra-processed diets displacing fermentable whole-food substrates",
    "repeated low-intake of resistant starch and soluble fibre classes",
    "erratic meal patterns reducing consistent microbial substrate delivery",
    "inflammatory or metabolic burden increasing ecological instability",
  ],
  "BRS5(KC2)": [
    "low plant diversity over time",
    "low polyphenol density in the diet",
    "repetitive ultra-processed food patterns with narrow botanical exposure",
    "lack of herbs, spices, legumes, and whole grains",
    "ecological monotony reducing microbial redundancy",
  ],
  "BRS5(KC3)": [
    "low zinc, omega-3, and vitamin-A-supportive dietary patterns",
    "inadequate protein quality or quantity where barrier repair is under strain",
    "chronic alcohol, emulsifier-heavy, or ultra-processed exposures",
    "inflammatory burden increasing barrier vulnerability",
    "persistent low-fibre intake reducing synergy with microbial barrier support",
  ],
  "BRS6(KC1)": [
    "refined high-glycaemic carbohydrate loads without buffering macronutrients",
    "acute glucose fluctuations that amplify oxidative and metabolic stress relative to sustained hyperglycaemia alone",
    "erratic meal timing and skipped meals",
    "ultra-processed low-fibre meal patterns",
    "chronic energy deficit or prolonged underfeeding",
    "inflammatory and oxidative load increasing metabolic demand",
  ],
  "BRS6(KC2)": [
    "chronically low micronutrient density in the diet",
    "inadequate long-chain omega-3 intake relative to brain structural requirements",
    "suboptimal B-vitamin status affecting brain energy and neurochemical pathways",
    "chronic stress exposure increasing nutrient turnover demand",
    "erratic eating patterns reducing consistent micronutrient coverage",
    "inflammatory burden increasing oxidative and metabolic demand",
  ],
};

function capitalizeFirst(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function stripInlineCitations(s) {
  return s.replace(/\s*\[\d+(?:\]\[\d+)*\]/g, "").trim();
}

function fmTheme(fmData) {
  return (fmData.title || "integrated function").replace(/\([^)]*\)/g, "").trim();
}

function weaveKcStressors(kc, stressors) {
  const items = stressors.map(stripInlineCitations).filter(Boolean);
  if (!items.length) {
    return `Chronic depletion of [${kc.id} — ${kc.name}](${kc.href}) may constrain the PMs that depend on this shared pool.`;
  }

  const link = `[${kc.id} — ${kc.name}](${kc.href})`;
  let para = `${capitalizeFirst(items[0])} may reduce ${link}.`;

  if (items.length === 1) return para;

  const rest = items.slice(1).map((s) => s.charAt(0).toLowerCase() + s.slice(1));
  if (rest.length === 1) {
    return `${para} ${capitalizeFirst(rest[0])} may further strain pool availability.`;
  }

  const last = rest.at(-1);
  const middle = rest.slice(0, -1);
  return `${para} ${capitalizeFirst(middle[0])} may further strain pool availability${middle.length > 1 ? `, ${middle.slice(1).join(", ")}` : ""}, while ${last}.`;
}

function buildOpening(fmData, kcs, kcStressorMap) {
  const theme = fmTheme(fmData).toLowerCase();
  const poolNames = kcs.map((k) => k.name.toLowerCase());
  const sampleStressors = kcs
    .flatMap((k) => (kcStressorMap[k.id] || []).slice(0, 2))
    .map(stripInlineCitations)
    .filter(Boolean)
    .slice(0, 4);

  if (poolNames.length === 1) {
    return `${capitalizeFirst(theme)} may weaken when ${poolNames[0]} declines or when ${sampleStressors[0]?.toLowerCase() || "supporting pool availability becomes chronically constrained"}.`;
  }

  return `${capitalizeFirst(theme)} may weaken when ${poolNames.slice(0, -1).join(", ")}, or ${poolNames.at(-1)} become inadequate, or when supporting biological pools are chronically strained.`;
}

function buildClosing(fmData, pms) {
  if (!pms.length) return "";
  const verbs = ["impair", "weaken", "reduce the effectiveness of", "compromise"];
  const parts = pms.map(
    (p, i) => `${verbs[Math.min(i, verbs.length - 1)]} [${p.id} — ${p.name}](${p.href})`,
  );
  const list =
    parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(", ")}, and ${parts.at(-1)}`;
  return `These pressures may ${list}. At the FM level, this may shift ${fmData.fm_id} toward reduced ${fmTheme(fmData).toLowerCase()} performance.`;
}

export function buildFailureModesSection(fmData, kcStressorMap) {
  if (FM_FAILURE_OVERRIDES[fmData.fm_id]) {
    return FM_FAILURE_OVERRIDES[fmData.fm_id];
  }

  const pms = fmData.mechanisms_covered || [];
  const kcs = fmData.key_constraints || [];
  if (!kcs.length) return null;

  const opening = buildOpening(fmData, kcs, kcStressorMap);
  const kcParas = kcs.map((kc) => weaveKcStressors(kc, kcStressorMap[kc.id] || [])).join("\n\n");
  const closing = buildClosing(fmData, pms);

  return `### 4.4 Functional Failure Modes

${opening}

${kcParas}

${closing}`.trim();
}

export function loadKcStressorMap(rootDir) {
  const map = new Map(Object.entries(KC_STRESSOR_ARCHIVE));
  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith(".mdx") && p.includes(`${path.sep}kc${path.sep}`)) {
        const { data, content } = matter(fs.readFileSync(p, "utf8"));
        const live = extractKcStressors(content);
        if (data.kc_id && live.length) map.set(data.kc_id, live);
      }
    }
  }
  walk(path.join(rootDir, "docs/biological-targets"));
  return Object.fromEntries(map);
}

export function insertFailureModesInSection4(section4, failureModes, evidenceBlock) {
  let body = section4.replace(/\n### 4\.4 Evidence Highlights[\s\S]*?(?=\n## 5\.|$)/, "");
  body = body.replace(/\n### 4\.4 Functional Failure Modes[\s\S]*?(?=\n### 4\.5|\n## 5\.|$)/, "");
  body = body.replace(/\n### 4\.5 Evidence Highlights[\s\S]*?(?=\n## 5\.|$)/, "");

  const failure = failureModes ? `\n\n${failureModes}` : "";
  const evidence = evidenceBlock
    ? `\n\n${evidenceBlock.replace("### 4.4 Evidence Highlights", "### 4.5 Evidence Highlights")}`
    : "";

  if (body.match(/### 4\.3 Integrated Functional Narrative/)) {
    return body.replace(
      /(### 4\.3 Integrated Functional Narrative[\s\S]*?)(?=\n## 5\.|$)/,
      `$1${failure}${evidence}`,
    );
  }
  return `${body.trim()}${failure}${evidence}`;
}

export function extractEvidenceHighlightsBlock(section4) {
  const m = section4.match(/(### 4\.(?:4|5) Evidence Highlights[\s\S]*?)(?=\n## 5\.|$)/);
  return m ? m[1].trim() : "";
}
