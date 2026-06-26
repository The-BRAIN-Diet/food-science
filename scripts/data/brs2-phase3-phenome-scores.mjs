/**
 * BRS2 Phase 3 phenome scores (2026-06-25).
 * @see system/phenome-relationship-schema.md#functional-dependency-heuristic-assign-before-reviewing-references
 *
 * Review stack per row:
 *   mechanism validation → phenome validation → confidence (functional dependency, refs ignored)
 *   → evidence_confidence (refs reviewed) → evidence_level (audit)
 */

/** @type {Record<string, Array<{ phenome: string, confidence: string, evidence_confidence: string, evidence_level: string }>>} */
export const BRS2_PM_PHASE3_SCORES = {
  "BRS2-FM1-PM1": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "observational" },
    { phenome: "Cognitive Clarity", confidence: "low-medium", evidence_confidence: "low", evidence_level: "observational" },
  ],
  "BRS2-FM1-PM2": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "observational" },
    { phenome: "Cognitive Clarity", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS2-FM1-PM3": [
    { phenome: "Cognitive Clarity", confidence: "medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Emotional Regulation", confidence: "low-medium", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS2-FM1-PM4": [
    { phenome: "Cognitive Clarity", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "observational" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "observational" },
  ],
  "BRS2-FM2-PM5": [
    { phenome: "Stress Reactivity", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Recovery Capacity", confidence: "low", evidence_confidence: "low", evidence_level: "mechanistic" },
  ],
  "BRS2-FM2-PM6": [
    { phenome: "Recovery Capacity", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "mechanistic" },
  ],
  "BRS2-FM3-PM7": [
    { phenome: "Cognitive Clarity", confidence: "medium", evidence_confidence: "low-medium", evidence_level: "observational" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium", evidence_level: "observational" },
  ],
};

/** Multi-PM FM convergence scores. */
export const BRS2_FM_PHASE3_SCORES = {
  "BRS2(FM1)": [
    { phenome: "Cognitive Clarity", confidence: "medium", evidence_confidence: "low-medium" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
  "BRS2(FM2)": [
    { phenome: "Recovery Capacity", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
  "BRS2(FM3)": [
    { phenome: "Cognitive Clarity", confidence: "medium", evidence_confidence: "low-medium" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
};

function fmRef(label, citation_key) {
  return {
    label,
    citation_key,
    href: `/docs/papers/BRAIN-Diet-References#${citation_key}`,
  };
}

/**
 * FM functional_outcome_context synthesis + references keyed by fm_id → phenome.
 * @type {Record<string, Record<string, { synthesis: string, references: Array<{ label: string, citation_key: string, href: string }> }>>}
 */
export const BRS2_FM_OUTCOME_SYNTHESIS = {
  "BRS2(FM1)": {
    "Cognitive Clarity": {
      synthesis:
        "Integrated methylation cycle efficiency — folate/B12 remethylation, betaine/BHMT parallel routing, SAMe synthesis, and cycle flux — sustains methyl-donor pools required for phospholipid, neurotransmitter, and broader methylation chemistry relevant to cognitive clarity. Homocysteine as a cycle-throughput marker and B-vitamin × omega-3 nutrient-network interactions (VITACOG) support convergent translational framing; this scores biological relevance within BRAIN, not dietary treatment efficacy. Evidence Confidence is low-medium because attached refs establish one-carbon biochemistry and cognitive-decline interaction more than direct ADHD cognitive-clarity outcomes on this integrated FM.",
      references: [
        fmRef("Luzzi et al. (2022)", "luzzi_homocysteine_2022"),
        fmRef("Oulhaj et al. (2016)", "oulhaj_omega-3_2016"),
        fmRef("Chiang et al. (1996)", "chiang_s-adenosylmethionine_1996"),
        fmRef("Collaboration (1998)", "collaboration_lowering_1998"),
      ],
    },
    "Focus / Attention Stability": {
      synthesis:
        "Coordinated one-carbon cycling — homocysteine remethylation cofactor sufficiency, methyl-donor pattern coverage, and cycle flux — intersects ADHD-relevant disturbances in folate, B12, and homocysteine reported across paediatric cohorts and dietary-pattern analyses. MTHFR variation and unhealthy dietary patterns linked to lower B vitamins reinforce modifiable nutritional context for attention-relevant methylation biology without single-nutrient treatment claims.",
      references: [
        fmRef("Razavinia et al. (2024)", "razavinia_vitamins_2024"),
        fmRef("Lukovac et al. (2024)", "lukovac_serum_2024"),
        fmRef("Wang et al. (2019)", "wang_dietary_2019"),
        fmRef("Millichap and Yee (2012)", "millichap_diet_2012"),
      ],
    },
  },
  "BRS2(FM2)": {
    "Recovery Capacity": {
      synthesis:
        "Transsulfuration and glutathione synthesis couple homocysteine handling to cysteine supply and endogenous antioxidant defence — positioning GSH production as a downstream redox recovery node when sulfur amino acid substrate and cofactor coverage are adequate. Human intervention and review evidence support modifiable glutathione pathway support; ADHD-specific recovery-outcome trials on this integrated FM remain limited.",
      references: [
        fmRef("Sekhar et al. (2011)", "sekhar_glutathione_2011"),
        fmRef("Minich et al. (2019)", "minich_glutathione_2019"),
        fmRef("Gregory et al. (2016)", "gregory_homocysteine_2016"),
      ],
    },
    "Stress Resilience": {
      synthesis:
        "Integrated transsulfuration–redox coupling diverts homocysteine toward cysteine and glutathione when remethylation capacity is saturated, supporting stress-buffering redox resilience through pattern-based dietary sulfur amino acid and cofactor coverage. Elevated homocysteine in paediatric ADHD intersects oxidative-stress framing — mechanism boundary is transsulfuration-derived redox support, not pharmacological homocysteine lowering.",
      references: [
        fmRef("Gregory et al. (2016)", "gregory_homocysteine_2016"),
        fmRef("Sekhar et al. (2011)", "sekhar_glutathione_2011"),
        fmRef("Lukovac et al. (2024)", "lukovac_serum_2024"),
      ],
    },
  },
  "BRS2(FM3)": {
    "Cognitive Clarity": {
      synthesis:
        "SAMe-dependent phosphatidylcholine formation couples one-carbon methylation to membrane phospholipid chemistry — the methylation-dependent bridge between B-vitamin status and omega-3-enriched PC delivery toward the brain. VITACOG reanalysis, PEMT pathway biology, and phospholipid-bound DHA accretion evidence support cognitive-clarity framework translation; ADHD-specific cognitive-clarity trials on this FM remain limited.",
      references: [
        fmRef("Oulhaj et al. (2016)", "oulhaj_omega-3_2016"),
        fmRef("Vance (2014)", "vance_phospholipid_2014"),
        fmRef("Liu et al. (2014)", "liu_higher_2014"),
      ],
    },
    "Focus / Attention Stability": {
      synthesis:
        "Methylation–membrane coupling links dietary methyl-donor and omega-3 patterns associated with reduced ADHD symptoms to phosphatidylcholine formation as the carrier chemistry supporting long-chain PUFA presentation. Choline implicated across neurodevelopmental disorders reinforces attention-relevant nutrient-pattern context — scope is PC formation biology, not isolated choline supplementation efficacy.",
      references: [
        fmRef("Millichap and Yee (2012)", "millichap_diet_2012"),
        fmRef("Derbyshire and Maes (2023)", "derbyshire_role_2023"),
        fmRef("Oulhaj et al. (2016)", "oulhaj_omega-3_2016"),
      ],
    },
  },
};
