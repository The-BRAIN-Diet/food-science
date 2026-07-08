/**
 * Curated BRS5 PM §3 phenome_relationships from gut–brain hub ADHD evidence.
 * @see docs/biological-targets/gut-brain-axis-enteric-nervous-system.md
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

export const BRS5_PM_PHENOME = {
  "brs5-fm1-pm1-gut-barrier-tight-junction-integrity": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Compositional gut microbiota differences in treatment-naïve children with ADHD — including beneficial taxa guild shifts — intersect gut-barrier integrity as a upstream determinant of gut–brain immune signalling relevant to attention biology.",
      references: [ref(1, "Jiang et al. (2018)", "jiang_gut_2018")],
    }),
    row({
      target_phenome: "Emotional Regulation",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "Gut-barrier compromise may modulate gut–brain signalling tone intersecting affective regulation in neurodevelopmental contexts — indirect framing from ADHD microbiota compositional work without direct emotional-outcome trials on barrier biology.",
      references: [ref(1, "Jiang et al. (2018)", "jiang_gut_2018")],
    }),
  ],
  "brs5-fm1-pm2-lps-endotoxin-containment": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "ADHD gut microbiota compositional differences implicate altered gut–immune interface function — LPS/endotoxin containment is the mechanism boundary for limiting gut-derived inflammatory load reaching systemic circulation, not cytokine phenotypes (BRS3).",
      references: [ref(1, "Jiang et al. (2018)", "jiang_gut_2018")],
    }),
    row({
      target_phenome: "Stress Reactivity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Gut-derived endotoxin spillover may intersect stress-relevant inflammatory tone in ADHD translational framing — indirect mapping without ADHD LPS-intervention outcomes.",
      references: [ref(1, "Jiang et al. (2018)", "jiang_gut_2018")],
    }),
  ],
  "brs5-fm1-pm3-keystone-taxa-support": [
    row({
      target_phenome: "Motivation / Drive",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Gut microbiome composition linked to neural reward anticipation in ADHD positions keystone taxa support as a biological node intersecting motivation-relevant gut–brain signalling — not a direct reward-intervention claim.",
      references: [ref(1, "Aarts et al. (2017)", "aarts_gut_2017")],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Reduced microbial alpha diversity in paediatric ADHD, compositional shifts in treatment-naïve cohorts, and open-label Bifidobacterium supplementation with symptom change converge on ecological keystone support as attention-relevant gut–brain context.",
      references: [
        ref(1, "Prehn-Kristensen et al. (2018)", "prehn-kristensen_reduced_2018"),
        ref(2, "Jiang et al. (2018)", "jiang_gut_2018"),
        ref(3, "Wang et al. (2022)", "wang_effect_2022"),
      ],
    }),
  ],
  "brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Reduced microbial alpha diversity in paediatric ADHD and lower faecal SCFA levels versus controls support ecological turnover and competitive selection as modifiable gut-community processes intersecting attention-relevant microbiome structure.",
      references: [
        ref(1, "Prehn-Kristensen et al. (2018)", "prehn-kristensen_reduced_2018"),
        ref(2, "Steckler et al. (2024)", "steckler_disrupted_2024"),
      ],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "ADHD-focused gut–brain axis review literature synthesises microbiome ecology research gaps — indirect cognitive-clarity framing through microbial community resilience rather than measured clarity outcomes.",
      references: [ref(1, "Schleupner & Carmichael (2022)", "schleupner_attention-deficithyperactivity_2022")],
    }),
  ],
  "brs5-fm2-pm5-scfa-production-and-signalling": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "ADHD cohorts showed lower faecal SCFA levels including acetic, propionic, isobutyric, isovaleric, and valeric acids versus controls — positioning microbial SCFA production and signalling as a direct observational anchor for attention-relevant gut metabolite biology.",
      references: [ref(1, "Steckler et al. (2024)", "steckler_disrupted_2024")],
    }),
    row({
      target_phenome: "Emotional Regulation",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "SCFA gut–brain signalling may intersect affective regulation through vagal and immune pathways — indirect translational framing from ADHD SCFA deficit observation without emotional-outcome intervention trials.",
      references: [ref(1, "Steckler et al. (2024)", "steckler_disrupted_2024")],
    }),
  ],
  "brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation": [
    row({
      target_phenome: "Recovery Capacity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Microbial polyphenol biotransformation generates mitophagy-relevant metabolites bridging BRS5 to BRS4 — ADHD hub evidence for this PM is indirect via gut–brain axis review context; direct ADHD urolithin-outcome trials are not in the curated set (biology > evidence gap).",
      references: [ref(1, "Schleupner & Carmichael (2022)", "schleupner_attention-deficithyperactivity_2022")],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Gut-derived polyphenol metabolites may influence mitochondrial and inflammatory resilience with downstream cognitive implications — framework translation from ADHD gut–brain research gaps rather than direct clarity-outcome measurement.",
      references: [ref(1, "Schleupner & Carmichael (2022)", "schleupner_attention-deficithyperactivity_2022")],
    }),
  ],
  "brs5-fm3-pm7-vagal-ens-signalling-modulation": [
    row({
      target_phenome: "Stress Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "intervention",
      rationale:
        "Open-label Bifidobacterium bifidum supplementation associated with symptom change and altered gut microbiota in children with ADHD — vagal/ENS signalling is the proposed gut–brain conduit; early-life Lactobacillus exposure adds developmental modulation context.",
      references: [
        ref(1, "Wang et al. (2022)", "wang_effect_2022"),
        ref(2, "Pärtty et al. (2015)", "partty_possible_2015"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "intervention",
      rationale:
        "Probiotic-associated symptom change in ADHD children and hypothesis-generating early-life microbial modulation windows support gut–vagal pathways intersecting affective regulation biology without definitive prevention claims.",
      references: [
        ref(1, "Wang et al. (2022)", "wang_effect_2022"),
        ref(2, "Pärtty et al. (2015)", "partty_possible_2015"),
      ],
    }),
  ],
  "brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "ADHD microbiota compositional differences and lower SCFA levels imply altered microbial biotransformation of dietary precursors relevant to gut–brain neurotransmitter availability — mechanism boundary is microbial precursor processing, not BRS1 monoamine synthesis.",
      references: [
        ref(1, "Jiang et al. (2018)", "jiang_gut_2018"),
        ref(2, "Steckler et al. (2024)", "steckler_disrupted_2024"),
      ],
    }),
    row({
      target_phenome: "Motivation / Drive",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "Microbial metabolite handling intersects reward-anticipation biology linked to gut composition in ADHD — indirect motivation framing through precursor/metabolite availability rather than direct drive-outcome trials.",
      references: [ref(1, "Aarts et al. (2017)", "aarts_gut_2017")],
    }),
  ],
};
