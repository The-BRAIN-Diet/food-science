/**
 * Curated PM §3 phenome_relationships from BRS hub ADHD evidence.
 * Keys: file basename (e.g. brs3-fm1-pm1-nf-kb-signalling-regulation).
 * @see docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm2-omega-3-derived-endocannabinoidome-signalling.mdx
 */

import { enrichReferenceWithDataLevel } from "./reference-data-levels.mjs";
import { BRS2_PM_PHENOME } from "../data/brs2-pm-phenome.mjs";
import { BRS4_PM_PHENOME } from "../data/brs4-pm-phenome.mjs";
import { BRS5_PM_PHENOME } from "../data/brs5-pm-phenome.mjs";
import { BRS6_PM_PHENOME } from "../data/brs6-pm-phenome.mjs";

function ref(index, label, citation_key) {
  return enrichReferenceWithDataLevel({
    index,
    label,
    citation_key,
    href: `/docs/papers/BRAIN-Diet-References#${citation_key}`,
  });
}

function row({ target_phenome, relationship_type = "modulates", confidence, evidence_level = "mechanistic", rationale, references }) {
  return {
    target_phenome,
    relationship_type,
    confidence,
    evidence_level,
    rationale,
    references,
  };
}

export const BRS3_PM_PHENOME = {
  "brs3-fm1-pm1-nf-kb-signalling-regulation": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Polyphenol-rich dietary patterns and lower pro-inflammatory signalling pressure may support cognitive clarity context in ADHD-relevant populations without single-nutrient outcome claims.",
      references: [
        ref(1, "Zelicha et al. (2022)", "zelicha_effect_2022"),
        ref(2, "Marsland et al. (2017)", "marsland_systemic_2017"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      rationale:
        "Postprandial and LPS-linked inflammatory signalling intersects ADHD metabolic overlap — pattern-based anti-inflammatory meals may modulate attention-relevant inflammatory tone rather than acute NF-κB pharmacology.",
      references: [
        ref(1, "Batey et al. (2024)", "batey_lipopolysaccharide_2024"),
        ref(2, "Brown et al. (2025)", "brown_associations_2025"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low",
      rationale:
        "Systemic inflammatory signalling may intersect affective regulation framing in neurodevelopmental contexts; this PM governs transcriptional inflammatory tone only—not downstream cytokine phenotypes.",
      references: [ref(1, "Marsland et al. (2017)", "marsland_systemic_2017")],
    }),
    row({
      target_phenome: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      rationale:
        "Systemic inflammation associates with default-mode network connectivity patterns linked to perseverative thought in translational anxiety/depression framing; NF-κB transcriptional tone is the mechanism boundary.",
      references: [
        ref(1, "Marsland et al. (2017)", "marsland_systemic_2017"),
        ref(2, "Batey et al. (2024)", "batey_lipopolysaccharide_2024"),
      ],
    }),
    row({
      target_phenome: "Pleasure & Interest Capacity",
      confidence: "low",
      rationale:
        "LPS-linked neurotransmission disruption intersects depressive mood biology in translational reviews; pro-inflammatory transcriptional tone may modulate this context without direct anhedonia-outcome claims.",
      references: [ref(1, "Batey et al. (2024)", "batey_lipopolysaccharide_2024")],
    }),
  ],
  "brs3-fm1-pm2-gut-derived-inflammatory-signalling": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      rationale:
        "Propionate may stimulate norepinephrine secretion with possible relevance to attention; gut-derived inflammatory load and microbiome shifts correlate with ADHD-relevant gut–brain readouts.",
      references: [
        ref(1, "Hoyles et al. (2018)", "hoyles_microbiome-host_2018"),
        ref(2, "Jiang et al. (2018)", "jiang_gut_2018"),
      ],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Butyrate and gut-barrier context may reduce neuroinflammation and support brain energy metabolism — translational links to cognitive clarity without direct ADHD treatment-efficacy claims.",
      references: [
        ref(1, "Yunting Li et al. (2024)", "li_sodium_2024"),
        ref(2, "Grüter et al. (2023)", "gruter_propionate_2023"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low",
      rationale:
        "Low-grade endotoxemia and sustained systemic inflammation correlate with mood instability in translational framing; gut-derived load remains the mechanism boundary for this PM.",
      references: [ref(1, "Mohammad & Thiemermann (2021)", "mohammad_role_2021")],
    }),
    row({
      target_phenome: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      rationale:
        "Gut–brain microbiota signalling modulates central GABA receptor expression and anxiety-related behaviour in animal models; gut-derived inflammatory load may intersect apprehensive-worry biology in anxiety/depression comorbidity framing.",
      references: [
        ref(1, "Bravo et al. (2011)", "bravo_ingestion_2011"),
        ref(2, "Mohammad & Thiemermann (2021)", "mohammad_role_2021"),
      ],
    }),
    row({
      target_phenome: "Social Engagement Capacity",
      relationship_type: "indirect",
      confidence: "low",
      rationale:
        "Gut–brain GABAergic modulation has been linked to reduced anxiety- and depression-related behaviour in preclinical models; social-engagement outcomes remain indirect translational inference for this gut-inflammatory PM.",
      references: [ref(1, "Bravo et al. (2011)", "bravo_ingestion_2011")],
    }),
  ],
  "brs3-fm2-pm3-nrf2-are-antioxidant-activation": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Dietary antioxidant treatment in ADHD has been linked to oxidative-stress and immune readout shifts — Nrf2-linked endogenous induction may support cognitive clarity context when cofactors are sufficient.",
      references: [
        ref(1, "Verlaet et al. (2018)", "verlaet_rationale_2018"),
        ref(2, "Houghton et al. (2016)", "houghton_sulforaphane_2016"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      rationale:
        "Endogenous antioxidant induction and mineral cofactor sufficiency may modulate attention-relevant oxidative burden in ADHD contexts; repeated dietary pattern matters more than bolus sulforaphane dosing.",
      references: [ref(1, "Verlaet et al. (2018)", "verlaet_rationale_2018")],
    }),
    row({
      target_phenome: "Stress Resilience",
      confidence: "low",
      rationale:
        "Nrf2-dependent detoxification and antioxidant gene programmes may intersect stress-buffering redox context; direct ADHD stress-outcome evidence remains limited.",
      references: [ref(1, "Mocchegiani & Malavolta (2019)", "mocchegiani_role_2019")],
    }),
  ],
  "brs3-fm2-pm4-ros-generation-vs-clearance-balance": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      rationale:
        "Elevated oxidative stress indices and lipid-peroxidation markers in adult ADHD cohorts may modulate attention-relevant redox burden when generation exceeds clearance.",
      references: [
        ref(1, "Bulut et al. (2007)", "bulut_malondialdehyde_2007"),
        ref(2, "Miniksar et al. (2023)", "miniksar_effect_2023"),
      ],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Thiol/disulfide shifts and DNA oxidation markers in ADHD adults support state-sensitive redox interpretation relevant to cognitive clarity without diagnostic claims.",
      references: [
        ref(1, "Kurhan & Alp (2021)", "kurhan_dynamic_2021"),
        ref(2, "Verlaet et al. (2019)", "verlaet_oxidative_2019"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low",
      rationale:
        "Oxidative stress intersects neuroinflammatory cascades relevant to affective dysregulation framing; net redox balance is the mechanism boundary for this PM.",
      references: [ref(1, "Verlaet et al. (2019)", "verlaet_oxidative_2019")],
    }),
  ],
  "brs3-fm2-pm5-lipid-peroxidation-control": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Elevated malondialdehyde in adult ADHD and carotenoid-linked neural membrane protection may support cognitive clarity context through modifiable lipid-phase oxidative damage.",
      references: [
        ref(1, "Bulut et al. (2007)", "bulut_malondialdehyde_2007"),
        ref(2, "Johnson (2014)", "johnson_role_2014"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      rationale:
        "Lipid-peroxidation burden tracks oxidative load in ADHD cohorts; food-state antioxidant coverage may modulate membrane protection relevant to sustained attention contexts.",
      references: [ref(1, "Bulut et al. (2007)", "bulut_malondialdehyde_2007")],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low",
      rationale:
        "Oxidative membrane damage and mitochondrial overlap may intersect affective regulation in neurodevelopmental framing; scope remains lipid-peroxidation control only.",
      references: [ref(1, "Solleiro-Villavicencio & Rivas-Arancibia (2018)", "solleiro-villavicencio_effect_2018")],
    }),
  ],
  "brs3-fm2-pm6-antioxidant-network-recycling": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Synergistic antioxidant network regeneration may support cognitive clarity context in ADHD oxidative-load framing better than isolated megadose antioxidants.",
      references: [
        ref(1, "Packer et al. (1997)", "packer_vitamin_1997"),
        ref(2, "Verlaet et al. (2019)", "verlaet_oxidative_2019"),
      ],
    }),
    row({
      target_phenome: "Stress Resilience",
      confidence: "low-medium",
      rationale:
        "Compensatory glutathione elevation in ADHD may reflect network activity under oxidative burden; polyphenol–fibre patterns supporting urolithin A context may modulate stress-buffering redox resilience.",
      references: [
        ref(1, "Verlaet et al. (2019)", "verlaet_oxidative_2019"),
        ref(2, "Zelicha et al. (2022)", "zelicha_effect_2022"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low",
      rationale:
        "Network antioxidant sufficiency may indirectly modulate affective context under chronic oxidative stress; high-dose single-nutrient supplementation shows inconsistent benefit.",
      references: [ref(1, "Klein et al. (2011)", "klein_vitamin_2011")],
    }),
  ],
  "brs3-fm3-pm7-cytokine-network-modulation": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      rationale:
        "ROS-driven glial activation and pro-inflammatory cytokine release may intersect ADHD pathogenesis framing; omega-3 interventions reshape resolution-phase cytokine responses.",
      references: [
        ref(1, "Chang et al. (2020)", "chang_cortisol_2020"),
        ref(2, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low-medium",
      rationale:
        "Immune dysfunction, elevated IgE, and allergy patterns represent overlapping clinical links in ADHD populations relevant to cytokine-network tone.",
      references: [ref(1, "Wesselink et al. (2019)", "wesselink_feeding_2019")],
    }),
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low",
      rationale:
        "Postprandial inflammatory patterns in ADHD metabolic overlap may modulate cognitive clarity through cytokine-network context rather than single-mechanism claims.",
      references: [ref(1, "Brown et al. (2025)", "brown_associations_2025")],
    }),
    row({
      target_phenome: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      evidence_level: "intervention",
      rationale:
        "Omega-3 supplementation lowered anxiety symptoms in stressed medical students alongside inflammatory markers — cytokine-network modulation is the mechanism boundary, not omega-3 as a PM treatment.",
      references: [
        ref(1, "Kiecolt-Glaser et al. (2011)", "kiecolt-glaser_omega-3_2011"),
        ref(2, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
      ],
    }),
    row({
      target_phenome: "Pleasure & Interest Capacity",
      confidence: "low",
      rationale:
        "Mitochondrial dysfunction is a recurrent theme in depression pathophysiology reviews; cytokine-network inflammatory tone may intersect reward-related mitochondrial biology without direct anhedonia measurement on this PM.",
      references: [ref(1, "Song et al. (2023)", "song_mitochondrial_2023")],
    }),
  ],
  "brs3-fm3-pm8-eicosanoid-spm-balance": [
    row({
      target_phenome: "Cognitive Clarity",
      confidence: "low-medium",
      rationale:
        "Specialized pro-resolving mediators actively terminate inflammation without suppressing immune surveillance — supporting cognitive clarity context through resolution-oriented lipid signalling.",
      references: [
        ref(1, "Serhan & Petasis (2011)", "serhan_resolvins_2011"),
        ref(2, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
      ],
    }),
    row({
      target_phenome: "Emotional Regulation",
      confidence: "low-medium",
      rationale:
        "Omega-3-derived resolution biology may modulate affective inflammatory context when EPA/DHA substrate and omega-6:omega-3 balance are adequate over habitual intake.",
      references: [
        ref(1, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
        ref(2, "Simopoulos (2011)", "simopoulos_evolutionary_2011"),
      ],
    }),
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low",
      rationale:
        "Resolution-phase lipid mediator balance may intersect attention-relevant inflammatory tone; direct ADHD SPM outcome evidence remains limited.",
      references: [ref(1, "Serhan & Petasis (2011)", "serhan_resolvins_2011")],
    }),
    row({
      target_phenome: "Apprehensive Worry / Perseverative Thought",
      confidence: "low-medium",
      evidence_level: "intervention",
      rationale:
        "Omega-3-derived resolution biology and human RCT evidence for anxiety reduction in stressed adults provide translational support for cytokine-resolution context relevant to apprehensive-worry phenotypes.",
      references: [
        ref(1, "Kiecolt-Glaser et al. (2011)", "kiecolt-glaser_omega-3_2011"),
        ref(2, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
      ],
    }),
    row({
      target_phenome: "Pleasure & Interest Capacity",
      confidence: "low",
      rationale:
        "Resolution-phase eicosanoid balance may modulate inflammatory tone intersecting reward-processing and depressive biology in translational framing; Gruber et al. (2023) reviews insulin–dopamine reward disruption in depression as adjacent context.",
      references: [
        ref(1, "Ferguson et al. (2014)", "ferguson_omega3_2014"),
        ref(2, "Gruber et al. (2023)", "gruber_impact_2023"),
      ],
    }),
  ],
};

export function getPmPhenomeMap(brs) {
  if (brs === "BRS2") return BRS2_PM_PHENOME;
  if (brs === "BRS3") return BRS3_PM_PHENOME;
  if (brs === "BRS4") return BRS4_PM_PHENOME;
  if (brs === "BRS5") return BRS5_PM_PHENOME;
  if (brs === "BRS6") return BRS6_PM_PHENOME;
  return {};
}

export function resolvePmPhenomeConfig(map, { pmId, filePath }) {
  const base = filePath.split("/").pop().replace(/\.mdx?$/, "");
  return map[base] || null;
}
