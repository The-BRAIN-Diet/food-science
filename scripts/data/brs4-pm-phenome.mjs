/**
 * Curated BRS4 PM §3 phenome_relationships from mitochondrial hub ADHD evidence.
 * @see docs/biological-targets/mitochondrial-function-bioenergetics.md
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

export const BRS4_PM_PHENOME = {
  "brs4-fm1-pm1-electron-transport-chain-function": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "ADHD cybrid models show reduced mitochondrial respiration, lower complex V activity, and membrane-potential loss in platelet-derived cells — positioning electron-transport throughput as a biological node intersecting attention-relevant bioenergetic strain rather than a single-complex pharmacology claim.",
      references: [
        ref(1, "Verma et al. (2016)", "verma_attention_2016"),
        ref(2, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023"),
      ],
    }),
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Reduced cellular and mitochondrial respiration in ADHD cybrids supports impaired ATP-generating capacity under fluctuating cognitive demand — this PM governs ETC flux only, not substrate routing (PM6–PM8) or redox protection (FM2).",
      references: [ref(1, "Verma et al. (2016)", "verma_attention_2016")],
    }),
  ],
  "brs4-fm1-pm2-nad-metabolism": [
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "NAD⁺-linked redox carrier availability couples to mitochondrial respiration deficits reported in ADHD cybrids and narrative reviews of ADHD mitochondrial biomarker literature — mechanism boundary is redox-carrier turnover supporting ETC coupling, not dietary NAD⁺ supplementation efficacy.",
      references: [
        ref(1, "Verma et al. (2016)", "verma_attention_2016"),
        ref(2, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023"),
      ],
    }),
    row({
      target_phenome: "Recovery Capacity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "NAD⁺ salvage and turnover intersect mitochondrial resilience framing in ADHD mitochondrial reviews — an indirect framework translation through redox-carrier restoration capacity rather than measured ADHD recovery outcomes.",
      references: [ref(1, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023")],
    }),
  ],
  "brs4-fm1-pm3-creatine-phosphocreatine-buffer": [
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "ADHD cybrid respiration deficits and hub reviews of mitochondrial dysfunction imply high-demand tissues may rely on phosphocreatine buffering when oxidative phosphorylation is strained — direct ADHD creatine-outcome trials are not in the hub evidence set (biology > evidence gap).",
      references: [
        ref(1, "Verma et al. (2016)", "verma_attention_2016"),
        ref(2, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023"),
      ],
    }),
    row({
      target_phenome: "Recovery Capacity",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Rapid ATP buffering may support restoration after acute cognitive energy draw when mitochondrial output is compromised — indirect translational framing from ADHD bioenergetic strain literature without ADHD phosphocreatine intervention outcomes.",
      references: [ref(1, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023")],
    }),
  ],
  "brs4-fm2-pm4-ros-production-and-control": [
    row({
      target_phenome: "Recovery Capacity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Elevated glutathione and oxidative-stress markers in paediatric ADHD case–control work link mitochondrial ROS handling to redox recovery context; GSH is required for mitochondrial lactate metabolism and ROS neutralisation — this PM governs ROS production/control balance, not GSH synthesis (BRS2/BRS3).",
      references: [ref(1, "Verlaet et al. (2019)", "verlaet_oxidative_2019")],
    }),
    row({
      target_phenome: "Stress Reactivity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Oxidative-stress elevation in ADHD cohorts intersects stress-relevant redox tone — impaired ROS control may modulate allostatic load under repeated challenge without claiming oxidative stress causes ADHD.",
      references: [
        ref(1, "Verlaet et al. (2019)", "verlaet_oxidative_2019"),
        ref(2, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023"),
      ],
    }),
  ],
  "brs4-fm2-pm5-mitochondrial-protection-redox-integrity": [
    row({
      target_phenome: "Recovery Capacity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "observational",
      rationale:
        "Integrated mitochondrial membrane protection and redox integrity preserve energetic output when oxidative stress is elevated in paediatric ADHD — convergent with Verlaet glutathione/oxidative-stress findings and ADHD mitophagy reviews.",
      references: [
        ref(1, "Verlaet et al. (2019)", "verlaet_oxidative_2019"),
        ref(2, "Almutairi et al. (2024)", "almutairi_mitophagy_adhd_2024"),
      ],
    }),
    row({
      target_phenome: "Stress Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "Mitophagy and mitochondrial quality-control biology reviewed in ADHD contexts support redox-resilience framing when oxidative insult is recurrent — mechanism boundary is organelle integrity, not pharmacological antioxidant treatment claims.",
      references: [ref(1, "Almutairi et al. (2024)", "almutairi_mitophagy_adhd_2024")],
    }),
  ],
  "brs4-fm3-pm6-carnitine-mediated-fat-transport": [
    row({
      target_phenome: "Focus / Attention Stability",
      confidence: "medium",
      evidence_confidence: "medium",
      evidence_level: "intervention",
      rationale:
        "Controlled carnitine supplementation improved behavioural and functional outcomes in children with ADHD — the strongest direct ADHD intervention anchor in BRS4, mapping fatty-acid transport into mitochondria to attention-relevant outcomes without generalising beyond trial context.",
      references: [ref(1, "van Oudheusden & Scholte (2002)", "van_oudheusden_efficacy_2002")],
    }),
    row({
      target_phenome: "Cognitive Energy Stability",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "intervention",
      rationale:
        "Carnitine-dependent fat oxidation supports mitochondrial substrate delivery for ATP production — trial evidence in ADHD children links this transport node to functional improvement alongside behavioural endpoints.",
      references: [ref(1, "van Oudheusden & Scholte (2002)", "van_oudheusden_efficacy_2002")],
    }),
  ],
  "brs4-fm3-pm7-ketone-utilisation-capacity": [
    row({
      target_phenome: "Cognitive Energy Stability",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "ADHD mitochondrial dysfunction reviews describe substrate-flexibility strain when oxidative phosphorylation is impaired — ketone utilisation is an indirect alternative-fuel pathway node without ADHD ketone-intervention outcomes in the hub set.",
      references: [ref(1, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023")],
    }),
    row({
      target_phenome: "Metabolic Resilience",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Capacity to oxidise ketone bodies may contribute to metabolic adaptability when glucose/fat routing is constrained — framework translation from ADHD bioenergetic reviews rather than direct resilience-outcome measurement.",
      references: [ref(1, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023")],
    }),
  ],
  "brs4-fm3-pm8-metabolic-fuel-switching": [
    row({
      target_phenome: "Cognitive Energy Stability",
      relationship_type: "indirect",
      confidence: "low-medium",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Narrative synthesis of ADHD mitochondrial biomarker and oxidative-stress literature supports fuel-switching flexibility as a modifiable bioenergetic context when respiration is compromised — direct ADHD fuel-switching outcome trials remain limited.",
      references: [ref(1, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023")],
    }),
    row({
      target_phenome: "Energy Stability Under Variable Fuel Conditions",
      relationship_type: "indirect",
      confidence: "low",
      evidence_confidence: "low",
      evidence_level: "mechanistic",
      rationale:
        "Metabolic fuel switching governs steadiness of ATP supply across changing macronutrient availability — indirect phenome mapping from ADHD mitochondrial dysfunction framing without measured variable-fuel outcome studies.",
      references: [ref(1, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023")],
    }),
  ],
  "brs4-fm4-pm9-mitochondrial-biogenesis": [
    row({
      target_phenome: "Recovery Capacity",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "ADHD mitophagy and mitochondrial quality-control reviews link biogenesis/adaptation biology to long-term energetic restoration after repeated metabolic demand — diet and training provide permissive substrate context; direct ADHD biogenesis-outcome trials remain sparse.",
      references: [
        ref(1, "Almutairi et al. (2024)", "almutairi_mitophagy_adhd_2024"),
        ref(2, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023"),
      ],
    }),
    row({
      target_phenome: "Metabolic Resilience",
      confidence: "low-medium",
      evidence_confidence: "low-medium",
      evidence_level: "mechanistic",
      rationale:
        "Expanded mitochondrial density and adaptive remodelling may support metabolic resilience when baseline ADHD mitochondrial function is strained — synthesised from ADHD-specific mitochondrial biomarker and mitophagy literature.",
      references: [
        ref(1, "Almutairi et al. (2024)", "almutairi_mitophagy_adhd_2024"),
        ref(2, "Öğütlü et al. (2022)", "ogutlu_mitochondrial_2023"),
      ],
    }),
  ],
};
