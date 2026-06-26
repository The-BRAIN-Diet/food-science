/**
 * Curated BRS2 PM §3 phenome_relationships from methylation hub ADHD evidence.
 * Keys: file basename (e.g. brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation).
 * @see docs/biological-targets/methylation-one-carbon-metabolism.md
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
    evidence_confidence,
    rationale,
    references,
  };
}

export const BRS2_PM_PHENOME = {
  "brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Lower folate and B12 and elevated homocysteine in paediatric ADHD cohorts support remethylation strain as a translational context for attention-relevant one-carbon biology; unhealthy dietary patterns linked to lower B vitamins and ADHD burden reinforce pattern-based interpretation. Biology → Phenome Confidence reflects pathway centrality to methylation-dependent neurodevelopment — not dietary treatment efficacy. Direct ADHD attention-outcome trials on folate/B12 remethylation remain limited (biology > evidence gap).",
      references: [
        ref(1, "Razavinia et al. (2024)", "razavinia_vitamins_2024"),
        ref(2, "Lukovac et al. (2024)", "lukovac_serum_2024"),
        ref(3, "Wang et al. (2019)", "wang_dietary_2019"),
        ref(4, "Meng et al. (2022)", "meng_association_2022"),
      ],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "observational",
      rationale:
        "Homocysteine lowering with folate and B12 cofactor combinations and B-vitamin cognitive effects contingent on omega-3 status (VITACOG reanalysis) support a nutrient-network read linking remethylation to cognitive clarity context. Framework translation from one-carbon biochemistry — attached refs establish homocysteine modulation and cognitive-decline interaction more than direct ADHD cognitive-clarity outcomes (biology > evidence gap).",
      references: [
        ref(1, "Collaboration (1998)", "collaboration_lowering_1998"),
        ref(2, "Oulhaj et al. (2016)", "oulhaj_omega-3_2016"),
        ref(3, "Lukovac et al. (2024)", "lukovac_serum_2024"),
      ],
    }),
  ],
  "brs2-fm1-pm2-betaine-bhmt-remethylation": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Dietary patterns rich in folate, fibre, and methyl-donor nutrients associated with reduced ADHD symptoms intersect betaine/choline remethylation routes; choline implicated across neurodevelopmental disorders including ADHD. BHMT-mediated homocysteine clearance is established biochemistry — ADHD attention-outcome evidence for betaine supplementation specifically remains sparse (biology > evidence gap).",
      references: [
        ref(1, "Millichap and Yee (2012)", "millichap_diet_2012"),
        ref(2, "Olthof et al. (2003)", "olthof_low_2003"),
        ref(3, "Derbyshire and Maes (2023)", "derbyshire_role_2023"),
      ],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Betaine lowers homocysteine acutely and choline supports parallel remethylation and downstream membrane chemistry — an indirect framework translation to cognitive clarity through methyl-donor sufficiency rather than measured cognitive outcomes in ADHD cohorts.",
      references: [
        ref(1, "Olthof et al. (2003)", "olthof_low_2003"),
        ref(2, "Derbyshire and Maes (2023)", "derbyshire_role_2023"),
      ],
    }),
  ],
  "brs2-fm1-pm3-same-synthesis": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "SAMe is the principal methyl donor linking methionine metabolism to phospholipid, neurotransmitter, and broader methylation chemistry — making methionine→SAMe flux a system-level bottleneck for cognitive-relevant methylation-dependent processes. Clinical framing of combined SAMe, folate, and B12 reinforces upstream cofactor dependency. Direct ADHD cognitive-clarity outcome trials on SAMe synthesis support remain limited (biology > evidence gap).",
      references: [
        ref(1, "Chiang et al. (1996)", "chiang_s-adenosylmethionine_1996"),
        ref(2, "Cicero and Minervino (2022)", "cicero_combined_2022"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      relationship_type: "indirect",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "SAMe-dependent methylation intersects neurotransmitter and broader methylation chemistry relevant to affective regulation framing — an indirect framework translation from methyl-donor pool availability rather than direct emotional-regulation outcome measurement in ADHD populations.",
      references: [ref(1, "Cicero and Minervino (2022)", "cicero_combined_2022")],
    }),
  ],
  "brs2-fm1-pm4-methionine-cycle-flux": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Elevated homocysteine linked to cognitive decline and degenerative dementias supports homocysteine as a readout of impaired one-carbon cycle throughput relevant to cognitive clarity context; cofactor combination effects on homocysteine illustrate pattern-based cycle flux rather than single-nutrient leverage. ADHD-specific cognitive-clarity outcomes on cycle flux remain indirect (biology > evidence gap).",
      references: [
        ref(1, "Luzzi et al. (2022)", "luzzi_homocysteine_2022"),
        ref(2, "Yu et al. (2020)", "yu_evidence-based_2020"),
        ref(3, "Collaboration (1998)", "collaboration_lowering_1998"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Elevated homocysteine reported in paediatric ADHD cohorts and unhealthy dietary patterns linked to lower B vitamins and ADHD burden support cycle throughput strain as translational context for attention-relevant one-carbon metabolism — homocysteine signals multi-step cycle strain, not isolated enzyme failure.",
      references: [
        ref(1, "Lukovac et al. (2024)", "lukovac_serum_2024"),
        ref(2, "Wang et al. (2019)", "wang_dietary_2019"),
        ref(3, "Tao Huang et al. (2015)", "tao_huang_effect_2015"),
      ],
    }),
  ],
  "brs2-fm2-pm5-transsulfuration-pathway": [
    row({
      target_phenome: "Stress Reactivity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "B6 status associates with methionine–homocysteine cycle markers supporting transsulfuration as a practical dietary lever; elevated homocysteine in paediatric ADHD intersects oxidative-stress framing where transsulfuration-derived cysteine may modulate stress-relevant redox tone. Direct ADHD stress-reactivity outcome evidence for transsulfuration flux remains limited (biology > evidence gap).",
      references: [
        ref(1, "Gregory et al. (2016)", "gregory_homocysteine_2016"),
        ref(2, "Lukovac et al. (2024)", "lukovac_serum_2024"),
      ],
    }),
    row({
      target_phenome: "Recovery Capacity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Transsulfuration supplies cysteine for downstream glutathione synthesis — an indirect framework translation to recovery capacity through redox substrate availability rather than measured recovery outcomes in ADHD cohorts.",
      references: [ref(1, "Gregory et al. (2016)", "gregory_homocysteine_2016")],
    }),
  ],
  "brs2-fm2-pm6-glutathione-synthesis": [
    row({
      target_phenome: "Recovery Capacity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "Deficient glutathione synthesis underlies oxidative stress in aging and can be corrected with dietary precursor support; review evidence maps sulfur amino acids and cofactors to glutathione pathway support. Elevated homocysteine in paediatric ADHD intersects oxidative-stress framing — GSH synthesis is a modifiable downstream redox node without established ADHD recovery-outcome trials (biology > evidence gap).",
      references: [
        ref(1, "Sekhar et al. (2011)", "sekhar_glutathione_2011"),
        ref(2, "Minich et al. (2019)", "minich_glutathione_2019"),
        ref(3, "Lukovac et al. (2024)", "lukovac_serum_2024"),
      ],
    }),
    row({
      target_phenome: "Stress Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "Endogenous glutathione production positions GSH synthesis as a pattern-based dietary outcome supporting stress-buffering redox resilience when transsulfuration substrate and cofactor coverage are adequate. Direct ADHD stress-resilience outcome evidence remains limited.",
      references: [
        ref(1, "Sekhar et al. (2011)", "sekhar_glutathione_2011"),
        ref(2, "Minich et al. (2019)", "minich_glutathione_2019"),
      ],
    }),
  ],
  "brs2-fm3-pm7-phosphatidylcholine-formation": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "B-vitamin cognitive effects depend on omega-3 status (VITACOG reanalysis); phospholipid methylation couples homocysteine regulation to omega-3-enriched PC delivery toward the brain. PEMT pathway biology and phospholipid-bound DHA accretion evidence support cognitive-clarity framework translation — ADHD-specific cognitive-clarity trials on PC formation remain limited (biology > evidence gap).",
      references: [
        ref(1, "Oulhaj et al. (2016)", "oulhaj_omega-3_2016"),
        ref(2, "Vance (2014)", "vance_phospholipid_2014"),
        ref(3, "Liu et al. (2014)", "liu_higher_2014"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Dietary patterns rich in folate and omega-3 associated with reduced ADHD symptoms and choline implicated across neurodevelopmental disorders link methylation–membrane coupling to attention-relevant nutrient patterns. PC formation is the methylation-dependent bridge — direct ADHD attention-outcome trials on PEMT/PC biology remain sparse.",
      references: [
        ref(1, "Oulhaj et al. (2016)", "oulhaj_omega-3_2016"),
        ref(2, "Millichap and Yee (2012)", "millichap_diet_2012"),
        ref(3, "Derbyshire and Maes (2023)", "derbyshire_role_2023"),
      ],
    }),
  ],
};
