#!/usr/bin/env node
/**
 * Apply BRS2(FM1) canonical structure to all FM MDX pages (except FM1 itself).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";
import {
  applyCanonicalMechanisticBasis,
  applyCanonicalScoreableIntro,
  applyCanonicalSection5,
  buildCofactorsSubstratesTable,
} from "./lib/fm-canonical-template.mjs";

const SKIP = new Set(["brs2-fm1-methylation-cycle-efficiency.mdx"]);
const rootDir = process.cwd();

const MECH = {
  "brs1-fm1-monoaminergic-function.mdx": {
    opening:
      "Diet-actionable control of monoamine precursor supply, LNAA transport bias, and noradrenergic signalling context.",
    clauses:
      "PM1 governs Amino-Acid Availability & Prioritisation. PM2 governs LAT1 Competitive Transport Modulation. PM5 governs Noradrenergic Signalling (Attention & Executive Modulation).",
    together:
      "Together, these PMs operationalise BRS1(FM1) as coordinated meal-level control of monoaminergic and related neurotransmitter signalling.",
  },
  "brs1-fm2-cholinergic-function.mdx": {
    opening: "Dietary choline and phospholipid context for acetylcholine synthesis support.",
    clauses: "PM3 governs Acetylcholine Synthesis Support.",
    together:
      "Together, these PMs operationalise BRS1(FM2) as coordinated cholinergic substrate support.",
  },
  "brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx": {
    opening: "DHA-rich phospholipid delivery and neuronal membrane incorporation.",
    clauses: "PM4 governs Neuronal Membrane DHA Incorporation.",
    together:
      "Together, these PMs operationalise BRS1(FM3) as coordinated phospholipid-mediated DHA delivery.",
  },
  "brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx": {
    opening:
      "Integrated control of excitatory–inhibitory tone through GABA–glutamate balance and excitotoxicity modulation.",
    clauses:
      "PM6 governs GABA–Glutamate Neurotransmission Balance. PM7 governs GABA Synthesis Capacity. PM8 governs Glutamate Clearance & Recycling. PM9 governs Excitotoxicity Modulation.",
    together:
      "Together, these PMs operationalise BRS1(FM4) as coordinated excitatory–inhibitory balance regulation.",
  },
  "brs2-fm2-transsulfuration-redox-coupling.mdx": {
    lifestyle: `- Regular meal timing may support sulfur amino-acid and glutathione precursor patterns across the day.
- Sleep and stress recovery may influence oxidative and redox demand indirectly; dietary substrate remains primary for this FM.`,
  },
  "brs2-fm3-methylation-membrane-coupling.mdx": {
    lifestyle: `- Regular meal timing and sleep regularity may support SAMe and phospholipid methylation rhythm context.
- Stress and recovery patterns may influence membrane and methylation demand indirectly; dietary substrate remains primary for this FM.`,
  },
  "brs6-fm1-glycaemic-insulin-stability-and-cognitive-energy-availability.mdx": {
    opening:
      "Integrated control of glucose appearance, glycaemic variability, and insulin-supported disposal across the post-prandial period.",
    clauses:
      "PM1 governs Glucose Appearance Kinetics. PM2 governs Glycaemic Variability Regulation. PM3 governs Insulin Sensitivity & Glucose Disposal.",
    together:
      "Together, these PMs operationalise BRS6(FM1) as coordinated glycaemic–insulin stability and cognitive energy availability.",
  },
  "brs6-fm2-hpa-axis-rhythm-and-cortisol-regulation.mdx": {
    opening:
      "Integrated cortisol rhythm and circadian entrainment through feeding, light, and sleep timing.",
    clauses:
      "PM4 governs Cortisol Rhythm Regulation. PM5 governs Circadian Feeding & Light–Dark Entrainment.",
    together:
      "Together, these PMs operationalise BRS6(FM2) as coordinated HPA-axis rhythm and cortisol regulation.",
  },
  "brs6-fm3-autonomic-balance-and-vagal-recovery-capacity.mdx": {
    opening:
      "Integrated sympathetic–parasympathetic balance and vagal recovery after stress or cognitive demand.",
    clauses:
      "PM6 governs Sympathetic Activation & Parasympathetic Recovery. PM7 governs Vagal Tone / HRV Regulation.",
    together:
      "Together, these PMs operationalise BRS6(FM3) as coordinated autonomic balance and vagal recovery capacity.",
  },
  "brs6-fm4-stress-inflammation-metabolic-load-allocation.mdx": {
    opening:
      "Integrated metabolic-inflammatory load and stress-linked appetite–reward signalling.",
    clauses:
      "PM8 governs Metabolic Inflammation & Adipose Stress Signalling. PM9 governs Stress-Induced Appetite / Reward Drive Modulation.",
    together:
      "Together, these PMs operationalise BRS6(FM4) as coordinated stress–inflammation and metabolic load allocation.",
  },
};

for (const filePath of listMechanismMdxFiles(rootDir, "fm")) {
  const base = path.basename(filePath);
  if (SKIP.has(base)) {
    console.log(`skip (canonical): ${base}`);
    continue;
  }
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const brs = data.fm_id?.match(/BRS(\d+)/)?.[1] || "1";
  const table = buildCofactorsSubstratesTable(data, rootDir);
  let next = applyCanonicalSection5(content, table);
  next = applyCanonicalScoreableIntro(next, brs);

  const extra = MECH[base];
  if (extra?.opening) {
    next = applyCanonicalMechanisticBasis(
      next,
      data.fm_id,
      extra.clauses,
      extra.opening,
      extra.together,
    );
  }
  if (extra?.lifestyle) {
    next = next.replace(
      /<summary><strong>Lifestyle<\/strong><\/summary>\s*\n[\s\S]*?(?=\n<\/details>\s*\n\n## 8\.)/,
      `<summary><strong>Lifestyle</strong></summary>\n\n${extra.lifestyle}\n`,
    );
  }

  if (base === "brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx") {
    next = next.replace(
      /- fermented foods → GABA-active context\./,
      "- Fermented foods ← yogurt, kefir (GABA-active context)",
    );
  }

  fs.writeFileSync(filePath, matter.stringify(next, data, { lineWidth: 9999 }));
  console.log(`updated: ${base}`);
}
