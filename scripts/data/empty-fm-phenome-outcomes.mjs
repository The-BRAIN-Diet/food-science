/**
 * FM functional_outcome_context for previously empty FMs:
 * BRS3(FM2), BRS5(FM1–FM3), BRS6(FM1–FM4).
 *
 * Hand-authored integrative outcomes from child PM phenome convergence.
 * @see system/phenome-relationship-schema.md
 */

function fmRef(label, citation_key, data_level) {
  const ref = {
    label,
    citation_key,
    href: `/docs/papers/BRAIN-Diet-References#${citation_key}`,
  };
  if (data_level) ref.data_level = data_level;
  return ref;
}

/**
 * @typedef {{ phenome: string, confidence: string, evidence_confidence: string }} FmScore
 * @typedef {{ synthesis: string, references: Array<{ label: string, citation_key: string, href: string, data_level?: string }> }} FmSynthesis
 */

/** @type {Record<string, FmScore[]>} */
export const EMPTY_FM_PHASE3_SCORES = {
  "BRS3(FM2)": [
    { phenome: "Cognitive Clarity", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
  "BRS5(FM1)": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Motivation / Drive", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Emotional Regulation", confidence: "low", evidence_confidence: "low" },
  ],
  "BRS5(FM2)": [
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Cognitive Clarity", confidence: "low", evidence_confidence: "low" },
    { phenome: "Emotional Regulation", confidence: "low", evidence_confidence: "low" },
  ],
  "BRS5(FM3)": [
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Emotional Regulation", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low" },
  ],
  "BRS6(FM1)": [
    { phenome: "Cognitive Energy Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Focus / Attention Stability", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Metabolic Resilience", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
  "BRS6(FM2)": [
    { phenome: "Stress Reactivity", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Emotional Regulation", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low" },
  ],
  "BRS6(FM3)": [
    { phenome: "Stress Reactivity", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Recovery Capacity", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Stress Resilience", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
  "BRS6(FM4)": [
    { phenome: "Metabolic Resilience", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Reward Regulation", confidence: "low-medium", evidence_confidence: "low-medium" },
    { phenome: "Motivation / Drive", confidence: "low-medium", evidence_confidence: "low-medium" },
  ],
};

/** @type {Record<string, Record<string, FmSynthesis>>} */
export const EMPTY_FM_OUTCOME_SYNTHESIS = {
  "BRS3(FM2)": {
    "Cognitive Clarity": {
      synthesis:
        "Integrated antioxidant defence — NRF2 activation, ROS clearance balance, lipid-peroxidation control, and network recycling — supports redox conditions that help preserve cognitive clarity under oxidative load. Convergent human and mechanistic oxidative-stress evidence in ADHD-relevant cohorts supports biological relevance within BRAIN; this is not a claim that antioxidants treat cognitive symptoms.",
      references: [
        fmRef("Verlaet et al. (2018)", "verlaet_rationale_2018", "Human Study"),
        fmRef("Verlaet et al. (2019)", "verlaet_oxidative_2019", "Human Mechanistic"),
        fmRef("Houghton et al. (2016)", "houghton_sulforaphane_2016", "Human Outcome"),
        fmRef("Kurhan and Alp (2021)", "kurhan_dynamic_2021", "Human Mechanistic"),
      ],
    },
    "Focus / Attention Stability": {
      synthesis:
        "Coordinated ROS generation–clearance balance, lipid peroxidation control, and NRF2-linked antioxidant capacity help limit oxidative interference with attention-relevant signalling chemistry. Paediatric oxidative-stress markers and nutrient–redox framing support modifiable biological context for focus stability without single-nutrient treatment claims.",
      references: [
        fmRef("Bulut et al. (2007)", "bulut_malondialdehyde_2007", "Human Mechanistic"),
        fmRef("Verlaet et al. (2018)", "verlaet_rationale_2018", "Human Study"),
        fmRef("Miniksar et al. (2023)", "miniksar_effect_2023", "Human Mechanistic"),
      ],
    },
    "Stress Resilience": {
      synthesis:
        "NRF2-linked antioxidant activation and sustained antioxidant-network recycling jointly support redox recovery capacity under physiological stress load. Human redox and plant-bioactive evidence supports stress-resilience framing at the integrated FM level, while ADHD-specific stress-outcome trials on this FM remain limited.",
      references: [
        fmRef("Verlaet et al. (2019)", "verlaet_oxidative_2019", "Human Mechanistic"),
        fmRef("Zelicha et al. (2022)", "zelicha_effect_2022", "Human Outcome"),
        fmRef("Mocchegiani and Malavolta (2019)", "mocchegiani_role_2019", "Mechanistic"),
      ],
    },
  },

  "BRS5(FM1)": {
    "Focus / Attention Stability": {
      synthesis:
        "Integrated gut-barrier integrity, endotoxin containment, and keystone ecological support reduce gut-derived inflammatory spillover that can destabilise attention-relevant signalling. Human microbiome–ADHD and gut-barrier association evidence supports convergent biological relevance; this scores framework biology, not probiotic or fibre treatment efficacy.",
      references: [
        fmRef("Jiang et al. (2018)", "jiang_gut_2018", "Human Study"),
        fmRef("Prehn-Kristensen et al. (2018)", "prehn-kristensen_reduced_2018", "Human Study"),
        fmRef("Wang et al. (2022)", "wang_effect_2022"),
      ],
    },
    "Motivation / Drive": {
      synthesis:
        "Keystone taxa support within a stable barrier–immune interface helps preserve microbial ecological conditions linked to dopamine-relevant signalling context and motivational tone. Early microbiome–ADHD association evidence supports low–medium biological relevance; direct motivation-outcome trials on this integrated FM remain limited.",
      references: [
        fmRef("Aarts et al. (2017)", "aarts_gut_2017"),
        fmRef("Jiang et al. (2018)", "jiang_gut_2018", "Human Study"),
      ],
    },
    "Emotional Regulation": {
      synthesis:
        "Barrier integrity and selective permeability help limit gut-derived inflammatory and immune signals that can bias emotional reactivity. Current attached evidence is associative and low-strength for emotional regulation at FM level, so both Biology → Phenome and Evidence Confidence remain low.",
      references: [
        fmRef("Jiang et al. (2018)", "jiang_gut_2018", "Human Study"),
      ],
    },
  },

  "BRS5(FM2)": {
    "Focus / Attention Stability": {
      synthesis:
        "Microbial ecological turnover and SCFA production jointly generate metabolite signals that can support attention-relevant gut–brain communication when fermentable substrate patterns are adequate. Human microbiome disruption and SCFA-signalling reviews support low–medium biological relevance without claiming fibre or metabolite interventions treat ADHD.",
      references: [
        fmRef("Steckler et al. (2024)", "steckler_disrupted_2024"),
        fmRef("Prehn-Kristensen et al. (2018)", "prehn-kristensen_reduced_2018", "Human Study"),
      ],
    },
    "Cognitive Clarity": {
      synthesis:
        "Ecological substrate processing and polyphenol biotransformation generate microbial metabolites that can support mitochondrial-relevant signalling context for cognitive clarity. Current ADHD-linked evidence remains largely associative, so confidence stays low pending stronger mechanism–phenome bridging.",
      references: [
        fmRef("Schleupner and Carmichael (2022)", "schleupner_attention-deficithyperactivity_2022"),
      ],
    },
    "Emotional Regulation": {
      synthesis:
        "SCFA signalling contributes to gut–brain metabolite tone that may indirectly influence emotional regulation pathways. Attached evidence is limited and translational, so Biology → Phenome and Evidence Confidence remain low at this integrated FM level.",
      references: [
        fmRef("Steckler et al. (2024)", "steckler_disrupted_2024"),
      ],
    },
  },

  "BRS5(FM3)": {
    "Stress Resilience": {
      synthesis:
        "Vagal–ENS signalling modulation supports autonomic recovery pathways that help maintain stress resilience when gut–brain communication remains intact. Human vagal and probiotic–stress literature provides convergent low–medium framing without equating to vagal stimulation or probiotic treatment claims.",
      references: [
        fmRef("Wang et al. (2022)", "wang_effect_2022"),
        fmRef("Pärtty et al. (2015)", "partty_possible_2015"),
      ],
    },
    "Emotional Regulation": {
      synthesis:
        "Integrated vagal–enteric signalling helps shape autonomic and gut–brain tone relevant to emotional regulation under daily stress load. Early human and translational evidence supports low–medium biological relevance; ADHD-specific emotional-outcome trials on this FM remain limited.",
      references: [
        fmRef("Wang et al. (2022)", "wang_effect_2022"),
        fmRef("Pärtty et al. (2015)", "partty_possible_2015"),
      ],
    },
    "Focus / Attention Stability": {
      synthesis:
        "Neurotransmitter-precursor biotransformation and ENS signalling together influence precursor and signalling availability that can support attention stability via gut–brain routes. Human microbiome–ADHD associations support biological plausibility, while Evidence Confidence stays lower because bridging to attention outcomes remains incomplete on this integrated FM.",
      references: [
        fmRef("Jiang et al. (2018)", "jiang_gut_2018", "Human Study"),
        fmRef("Steckler et al. (2024)", "steckler_disrupted_2024"),
      ],
    },
  },

  "BRS6(FM1)": {
    "Cognitive Energy Stability": {
      synthesis:
        "Glucose appearance kinetics, glycaemic variability control, and insulin-mediated glucose disposal jointly shape the metabolic fuel context required for steadier cognitive energy availability. Human cerebral glucose and dietary glycaemic evidence supports low–medium biological relevance within BRAIN without claiming glycaemic diets treat ADHD.",
      references: [
        fmRef("Zametkin et al. (1990)", "zametkin_cerebral_1990"),
        fmRef("Wang et al. (2019)", "wang_dietary_2019", "Human Study"),
        fmRef("Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
      ],
    },
    "Focus / Attention Stability": {
      synthesis:
        "Steadier post-meal glucose appearance and reduced glycaemic volatility help limit metabolic swings that can destabilise attention under cognitive demand. Dietary-pattern and cerebral metabolic association evidence supports low–medium framing for focus stability as an integrated FM outcome.",
      references: [
        fmRef("Wang et al. (2019)", "wang_dietary_2019", "Human Study"),
        fmRef("Zametkin et al. (1990)", "zametkin_cerebral_1990"),
      ],
    },
    "Metabolic Resilience": {
      synthesis:
        "Insulin sensitivity and glucose disposal capacity support longer-term metabolic resilience that keeps energy allocation adaptable under repeated demand. Metabolic comorbidity and bridging reviews support low–medium biological relevance; ADHD-specific metabolic-resilience trials on this FM remain limited.",
      references: [
        fmRef("Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
        fmRef("Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    },
  },

  "BRS6(FM2)": {
    "Stress Reactivity": {
      synthesis:
        "Cortisol rhythm regulation shapes HPA reactivity patterns that gate how strongly stress signals propagate into cognitive and emotional systems. Human cortisol–ADHD association evidence supports low–medium biological relevance for stress reactivity at the integrated FM level.",
      references: [
        fmRef("Chang et al. (2021)", "chang_cortisol_2021"),
        fmRef("Isaksson et al. (2012)", "isaksson_cortisol_2012"),
        fmRef("Lane et al. (2010)", "lane_sensory_2010"),
      ],
    },
    "Emotional Regulation": {
      synthesis:
        "Stable cortisol rhythmicity helps maintain emotional regulation capacity by limiting stress-hormone spillover into affective control systems. Human cortisol mechanistic and association evidence supports low–medium framing without claiming circadian or cortisol interventions treat emotional dysregulation.",
      references: [
        fmRef("Chang et al. (2020)", "chang_cortisol_2020", "Human Mechanistic"),
        fmRef("Chang et al. (2021)", "chang_cortisol_2021"),
      ],
    },
    "Stress Resilience": {
      synthesis:
        "Circadian feeding and light–dark entrainment support HPA timing that can strengthen longer-term stress resilience when daily rhythms remain coherent. Current attached evidence is thinner for resilience than for acute reactivity, so Evidence Confidence remains low relative to biological plausibility.",
      references: [
        fmRef("Chang et al. (2021)", "chang_cortisol_2021"),
      ],
    },
  },

  "BRS6(FM3)": {
    "Stress Reactivity": {
      synthesis:
        "Sympathetic–parasympathetic recovery balance helps determine how quickly stress activation resolves after challenge. Sensory–autonomic and cortisol-context evidence supports low–medium biological relevance for stress reactivity as an integrated autonomic FM outcome.",
      references: [
        fmRef("Lane et al. (2010)", "lane_sensory_2010"),
        fmRef("Chang et al. (2020)", "chang_cortisol_2020", "Human Mechanistic"),
      ],
    },
    "Recovery Capacity": {
      synthesis:
        "Flexible transitions between sympathetic activation and parasympathetic recovery support restoration of physiological and cognitive capacity after sustained demand. Autonomic recovery framing from sensory–stress literature supports low–medium biological relevance without HRV-treatment claims.",
      references: [
        fmRef("Lane et al. (2010)", "lane_sensory_2010"),
      ],
    },
    "Stress Resilience": {
      synthesis:
        "Vagal tone and HRV-related recovery capacity help maintain stress resilience by supporting adaptive autonomic flexibility over repeated challenges. Human autonomic–stress association evidence supports low–medium framing at FM level.",
      references: [
        fmRef("Lane et al. (2010)", "lane_sensory_2010"),
      ],
    },
  },

  "BRS6(FM4)": {
    "Metabolic Resilience": {
      synthesis:
        "Metabolic inflammation and adipose stress signalling influence how metabolic load is allocated under chronic physiological pressure, shaping longer-term metabolic resilience. Metabolic comorbidity evidence in ADHD-relevant populations supports low–medium biological relevance without anti-inflammatory treatment claims.",
      references: [
        fmRef("Di Girolamo et al. (2022)", "di_girolamo_prevalence_2022"),
        fmRef("Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    },
    "Reward Regulation": {
      synthesis:
        "Stress-induced appetite and reward-drive modulation couple metabolic–inflammatory load to reward regulation under stress. Dietary-pattern and cortisol-context evidence supports low–medium biological relevance for reward regulation as an integrated FM outcome.",
      references: [
        fmRef("Wang et al. (2019)", "wang_dietary_2019", "Human Study"),
        fmRef("Chang et al. (2021)", "chang_cortisol_2021"),
      ],
    },
    "Motivation / Drive": {
      synthesis:
        "Stress–reward coupling under metabolic load can bias motivational drive when inflammatory and appetite-reward signalling remain elevated. Human dietary and metabolic bridging evidence supports low–medium framing; this is not a claim that metabolic interventions restore motivation.",
      references: [
        fmRef("Wang et al. (2019)", "wang_dietary_2019", "Human Study"),
        fmRef("Marcelli et al. (2025)", "marcelli_bridging_2025"),
      ],
    },
  },
};
