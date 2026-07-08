/**
 * Curated BRS6 PM §3 phenome_relationships from metabolic–neuroendocrine hub ADHD evidence.
 * @see docs/biological-targets/metabolic-neuroendocrine-stress.md
 */

import { enrichReferenceWithDataLevel } from "../lib/reference-data-levels.mjs";

function ref(index, label, citation_key) {
  return enrichReferenceWithDataLevel({
    index,
    label,
    citation_key,
    href: `/docs/papers/BRAIN-Diet-References#${citation_key}`,
  });
}

function row({
  target_phenome,
  relationship_type = "modulates",
  confidence,
  evidence_level = "mechanistic",
  evidence_confidence,
  rationale,
  references,
}) {
  return {
    target_phenome,
    relationship_type,
    confidence,
    evidence_level,
    evidence_confidence: evidence_confidence ?? confidence,
    rationale,
    references,
  };
}

export const BRS6_PM_PHENOME = {
  "brs6-fm1-pm1-glucose-appearance-kinetics": [
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "PET evidence of altered cerebral glucose metabolism in adults with hyperactivity of childhood onset and unhealthy dietary pattern associations with ADHD in case–control path analysis converge on meal-level glucose appearance kinetics as a cognitive-energy node.",
      references: [
        ref(1, "Zametkin et al. (1990)", "zametkin_cerebral_1990"),
        ref(2, "Wang et al. (2019)", "wang_dietary_2019"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Dietary pattern linked to ADHD burden implicates postprandial glucose dynamics intersecting prefrontal and striatal fuel supply relevant to attention biology — this PM governs glucose appearance rate, not insulin disposal (PM3) or variability amplitude (PM2).",
      references: [ref(1, "Wang et al. (2019)", "wang_dietary_2019")],
    }),
  ],
  "brs6-fm1-pm2-glycaemic-variability-regulation": [
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Altered cerebral glucose metabolism in ADHD and metabolic syndrome/insulin-resistance overlap in adult ADHD outpatients support glycaemic variability as a modifiable context for steadier cognitive fuel supply.",
      references: [
        ref(1, "Zametkin et al. (1990)", "zametkin_cerebral_1990"),
        ref(2, "Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Prefrontal glucose utilisation patterns in ADHD and metabolic comorbidity prevalence link glycaemic fluctuation control to attention-relevant cognitive energy availability.",
      references: [ref(1, "Zametkin et al. (1990)", "zametkin_cerebral_1990")],
    }),
  ],
  "brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal": [
    row({
      target_phenome: "Metabolic Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Prevalence of metabolic syndrome and insulin resistance in adult ADHD outpatients positions insulin sensitivity and glucose disposal as metabolic-resilience nodes intersecting ADHD metabolic comorbidity.",
      references: [
        ref(1, "Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
        ref(2, "Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    }),
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Insulin resistance and ADHD metabolic overlap reviewed in narrative synthesis support efficient glucose disposal as a contributor to cognitive fuel stability — mechanism boundary is peripheral/metabolic insulin action, not CNS glucose transport pharmacology.",
      references: [
        ref(1, "Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
        ref(2, "Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    }),
  ],
  "brs6-fm2-pm4-cortisol-rhythm-regulation": [
    row({
      target_phenome: "Stress Reactivity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Meta-analysis reports altered basal and morning cortisol patterns in youths with ADHD; cortisol levels in children with ADHD and sensory-over-responsivity differentiation work using cortisol markers converge on HPA rhythm as a stress-reactivity node.",
      references: [
        ref(1, "Chang et al. (2021)", "chang_cortisol_2021"),
        ref(2, "Isaksson et al. (2012)", "isaksson_cortisol_2012"),
        ref(3, "Lane et al. (2010)", "lane_sensory_2010"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Cortisol, inflammatory biomarkers, and neurotrophins measured in children and adolescents with ADHD intersect affective regulation biology through HPA-axis tone — this PM governs cortisol rhythm, not autonomic recovery (FM3).",
      references: [
        ref(1, "Chang et al. (2020)", "chang_cortisol_2020"),
        ref(2, "Chang et al. (2021)", "chang_cortisol_2021"),
      ],
    }),
  ],
  "brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment": [
    row({
      target_phenome: "Sleep / Calming Tone",
      relationship_type: "indirect",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "Altered morning cortisol patterns in youths with ADHD implicate circadian entrainment of HPA rhythm — indirect sleep/calming framing through feeding–light timing as modifiable entrainment levers without ADHD sleep-outcome trials in the hub set.",
      references: [ref(1, "Chang et al. (2021)", "chang_cortisol_2021")],
    }),
    row({
      target_phenome: "Stress Resilience",
      relationship_type: "indirect",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "Circadian-aligned feeding and light–dark cues may stabilise cortisol rhythm dysregulation reported in ADHD youth — indirect stress-resilience translation from HPA meta-analytic patterns.",
      references: [ref(1, "Chang et al. (2021)", "chang_cortisol_2021")],
    }),
  ],
  "brs6-fm3-pm6-sympathetic-activation-and-parasympathetic-recovery": [
    row({
      target_phenome: "Stress Reactivity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Sensory over-responsivity differentiated from ADHD using electrodermal responses, cortisol, and anxiety markers; cortisol and inflammatory biomarkers in ADHD youth support autonomic activation/recovery balance as a stress-reactivity node.",
      references: [
        ref(1, "Lane et al. (2010)", "lane_sensory_2010"),
        ref(2, "Chang et al. (2020)", "chang_cortisol_2020"),
      ],
    }),
    row({
      target_phenome: "Recovery Capacity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Parasympathetic recovery after sympathetic activation is the mechanism boundary for restoring autonomic balance following challenge — Lane autonomic differentiation work provides ADHD-relevant context.",
      references: [ref(1, "Lane et al. (2010)", "lane_sensory_2010")],
    }),
  ],
  "brs6-fm3-pm7-vagal-tone-hrv-regulation": [
    row({
      target_phenome: "Stress Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Electrodermal and autonomic markers differentiate sensory over-responsivity from ADHD — vagal tone/HRV regulation is the parasympathetic arm supporting stress-buffering capacity in neurodevelopmental autonomic profiling.",
      references: [ref(1, "Lane et al. (2010)", "lane_sensory_2010")],
    }),
    row({
      target_phenome: "Sleep / Calming Tone",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "Vagal tone intersects calming and sleep-relevant autonomic tone — indirect framing from ADHD autonomic differentiation literature without direct sleep-intervention outcomes.",
      references: [ref(1, "Lane et al. (2010)", "lane_sensory_2010")],
    }),
  ],
  "brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling": [
    row({
      target_phenome: "Metabolic Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Metabolic syndrome and insulin resistance in adult ADHD outpatients and narrative review bridging ADHD with metabolic disorders position adipose-stress and metabolic-inflammation signalling as resilience-relevant nodes.",
      references: [
        ref(1, "Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
        ref(2, "Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    }),
    row({
      target_phenome: "Recovery Capacity",
      relationship_type: "indirect",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Metabolic-inflammatory load allocation may constrain recovery after sustained metabolic or stress challenge — indirect translation from ADHD–metabolic disorder synthesis rather than measured recovery outcomes.",
      references: [ref(1, "Marcelli et al. (2025)", "marcelli_bridging_2025")],
    }),
  ],
  "brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation": [
    row({
      target_phenome: "Reward Regulation",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Unhealthy dietary pattern linked to ADHD in case–control path analysis and altered cortisol patterns in ADHD youth intersect stress-driven appetite and reward regulation biology.",
      references: [
        ref(1, "Wang et al. (2019)", "wang_dietary_2019"),
        ref(2, "Chang et al. (2021)", "chang_cortisol_2021"),
      ],
    }),
    row({
      target_phenome: "Motivation / Drive",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Dietary pattern associations with ADHD burden and HPA dysregulation support stress-modulated reward/motivation pathways — mechanism boundary is appetite–reward drive under stress, not BRS1 catecholamine synthesis.",
      references: [
        ref(1, "Wang et al. (2019)", "wang_dietary_2019"),
        ref(2, "Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    }),
  ],
};
