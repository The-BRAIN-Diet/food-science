/**
 * Registry provenance + foundational evidence enrichment — PH001–PH015.
 * Applied by scripts/apply-ph001-ph015-registry-enrichment.mjs
 * @see src/data/phenome-registry.json (PH016–PH018 reference shape)
 */

/** @param {string} label @param {string} citation_key @param {string} note */
function paper(label, citation_key, note) {
  return {
    label,
    citation_key,
    href: `/docs/papers/BRAIN-Diet-References#${citation_key}`,
    note,
  };
}

/** @type {Record<string, object>} */
export const PH001_PH015_REGISTRY_ENRICHMENT = {
  PH001: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "ADHD-focused construct and precursor-transport biology are well represented; human dietary attention-outcome evidence on the registry stack is indirect (omega-3 cognition trials) — not dietary ADHD treatment efficacy.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 ADHD registry phenome (pre-v3). Benchmarked against RDoC Cognitive Systems (attention, cognitive control) and distinguished from Cognitive Clarity (PH011) as sustained/shifted attention versus processing clarity.",
      relatedPhenomeIds: ["PH002", "PH011"],
    },
    crossReferences: {
      rdoc_domains: [
        "Cognitive Systems — attention",
        "Cognitive Systems — cognitive control",
      ],
      dsm_icd_context: ["Attention-deficit/hyperactivity disorder"],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Millichap & Yee (2012)",
          "millichap_diet_2012",
          "Reviews diet and nutritional factors in ADHD — foundational construct framing for attention phenotypes.",
        ),
        paper(
          "Aquili (2020)",
          "aquili_role_2020",
          "Reviews catecholaminergic neurotransmission and attentional function relevant to ADHD biology.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Fernstrom (2013)",
          "fernstrom_lnna_2013",
          "Large neutral amino acid transport and precursor availability intersect monoaminergic attention pathways.",
        ),
        paper(
          "Derbyshire & Maes (2023)",
          "derbyshire_role_2023",
          "Links oxidative stress and neuroinflammation biology to ADHD symptom domains including attention.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Wang et al. (2019)",
          "wang_dietary_2019",
          "Dietary patterns and amino-acid context modulate neurotransmitter precursor biology upstream of attention.",
        ),
        paper(
          "Oulhaj et al. (2016)",
          "oulhaj_omega-3_2016",
          "Omega-3 supplementation associated with cognitive performance improvements in ageing — adjacent human nutrition→cognition support.",
        ),
      ],
    },
  },
  PH002: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Dopaminergic and endocannabinoid motivation biology are review-supported; open-label tyrosine and dietary precursor evidence is mechanistic or adjunct — not definitive motivation-intervention efficacy.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 ADHD registry phenome. Benchmarked against RDoC Positive Valence Systems (motivation, reward learning) and kept distinct from Behavioural Activation (PH010) and Reward Regulation (PH009).",
      relatedPhenomeIds: ["PH009", "PH010"],
    },
    crossReferences: {
      rdoc_domains: [
        "Positive Valence Systems — reward learning",
        "Positive Valence Systems — motivation / effort",
      ],
      dsm_icd_context: [
        "Attention-deficit/hyperactivity disorder",
        "Major depressive disorder — motivational symptoms",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "MacDonald et al. (2024)",
          "macdonald_dopamine_2024",
          "Reviews dopamine signalling in motivation and goal-directed behaviour.",
        ),
        paper(
          "Aquili (2020)",
          "aquili_role_2020",
          "Catecholaminergic neurotransmission framing for effort and drive biology.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Fernstrom (2013)",
          "fernstrom_lnna_2013",
          "Precursor transport and tyrosine availability upstream of catecholaminergic drive circuits.",
        ),
        paper(
          "Garani et al. (2021)",
          "garani_endocannabinoid_2021",
          "Endocannabinoid system modulation of motivation and stress-related behavioural states.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Wurtman et al. (2003)",
          "wurtman_effects_2003",
          "Dietary tyrosine and precursor manipulation affects catecholamine synthesis biology.",
        ),
        paper(
          "Reimherr et al. (1987)",
          "f_w_reimherr_open_1987",
          "Open-label tyrosine supplementation in ADHD — early human adjunct evidence for drive/activation biology.",
        ),
      ],
    },
  },
  PH003: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Construct and inhibitory-balance biology are strong; registry nutrition layer draws on mood/anxiety intervention reviews — not direct emotional-regulation phenome trials.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 ADHD registry phenome. Benchmarked against RDoC Negative Valence and Arousal/Regulatory Systems; distinct from Apprehensive Worry (PH016), Stress Reactivity (PH015), and Social Engagement (PH018).",
      relatedPhenomeIds: ["PH015", "PH016", "PH018"],
    },
    crossReferences: {
      rdoc_domains: [
        "Negative Valence Systems — sustained affect / affective regulation",
        "Arousal and Regulatory Systems — affective regulation",
      ],
      dsm_icd_context: [
        "Attention-deficit/hyperactivity disorder — emotional dysregulation",
        "Major depressive disorder",
        "Generalised anxiety disorder",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Oades et al. (2010)",
          "oades_role_2010",
          "Reviews dopamine and serotonin roles in motivation, affect, and ADHD-related emotional function.",
        ),
        paper(
          "Edden et al. (2012)",
          "edden_reduced_2012",
          "GABA deficits in ADHD cohorts — construct validation for excitation–inhibition and affective control.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Fernstrom (2013)",
          "fernstrom_lnna_2013",
          "Serotonergic precursor biology intersects affective modulation pathways.",
        ),
        paper(
          "Briguglio et al. (2018)",
          "briguglio_dietary_2018",
          "Dietary neurotransmitter biology review spanning mood and anxiety-relevant serotonergic context.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Kiecolt-Glaser et al. (2011)",
          "kiecolt-glaser_omega-3_2011",
          "Omega-3 lowered anxiety and inflammatory markers in stressed adults — upstream affective biology.",
        ),
        paper(
          "Jackson et al. (2021)",
          "jackson_effects_2021",
          "Saffron RCT reported mood improvements — adjacent human nutrition→affective biology support.",
        ),
      ],
    },
  },
  PH004: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Mitochondrial and metabolic-flexibility reviews anchor the construct; micronutrient and sex-hormone links are mechanistic — limited direct cognitive-fatigue outcome demonstration on the registry stack.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for mental energy stability across the day. Distinguished from Energy Stability Under Variable Conditions (PH012) and fuel-substrate phenome (PH013) as cognitive energy tone rather than metabolic supply mechanics.",
      relatedPhenomeIds: ["PH011", "PH012", "PH013"],
    },
    crossReferences: {
      rdoc_domains: [
        "Arousal and Regulatory Systems — fatigue / energy regulation",
        "Cognitive Systems — cognitive effort",
      ],
      dsm_icd_context: [
        "Major depressive disorder — fatigue",
        "Long COVID — cognitive fatigue",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Li et al. (2023)",
          "li_function_2023",
          "Mitochondrial function and brain energy metabolism in neuropsychiatric contexts.",
        ),
        paper(
          "Goodpaster & Sparks (2017)",
          "goodpaster_metabolic_flexibility_2017",
          "Metabolic flexibility review — substrate switching and energetic resilience framing.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Depaoli et al. (2021)",
          "depaoli_estrogen_insulin_resistance_2021",
          "Estrogen–insulin resistance biology intersects brain energy and mood regulation.",
        ),
        paper(
          "Pirinen et al. (2020)",
          "pirinen_niacin_2020",
          "NAD⁺/mitochondrial biology and human energy metabolism — bioenergetic phenome context.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Tardy et al. (2020)",
          "tardy_vitamins_2020",
          "B-vitamin supplementation and fatigue/energy outcomes — micronutrient→bioenergetic biology.",
        ),
        paper(
          "Pirinen et al. (2020)",
          "pirinen_niacin_2020",
          "Niacin/NAD precursor intervention modulates mitochondrial energetic capacity in humans.",
        ),
      ],
    },
  },
  PH005: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Recovery biology spans redox, NAD⁺, and metabolic-flexibility reviews; human nutrition evidence is supportive but not recovery-phenome-specific RCTs.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for post-load functional restoration. Related to Stress Resilience (PH006) and Metabolic Resilience (PH007) but targets recovery trajectory rather than buffering or substrate flexibility alone.",
      relatedPhenomeIds: ["PH006", "PH007"],
    },
    crossReferences: {
      rdoc_domains: ["Arousal and Regulatory Systems — recovery / homeostatic regulation"],
      dsm_icd_context: ["Long COVID — post-exertional recovery", "Chronic fatigue contexts"],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Goodpaster & Sparks (2017)",
          "goodpaster_metabolic_flexibility_2017",
          "Metabolic flexibility as capacity to restore and adapt energetic state after demand.",
        ),
        paper(
          "de Guia et al. (2019)",
          "de_guia_nad_2019",
          "NAD⁺ biology and cellular resilience — recovery-oriented bioenergetic framing.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Verlaet et al. (2019)",
          "verlaet_oxidative_2019",
          "Oxidative stress biology in ADHD — load-and-recovery redox context.",
        ),
        paper(
          "Sekhar et al. (2011)",
          "sekhar_glutathione_2011",
          "Glutathione synthesis and redox recovery capacity in humans.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Minich & Brown (2019)",
          "minich_glutathione_2019",
          "Dietary and supplemental strategies supporting glutathione biology.",
        ),
        paper(
          "Clerc et al. (2013)",
          "clerc_magnesium_2013",
          "Magnesium and stress-recovery physiology — nutritional modulator of restorative biology.",
        ),
      ],
    },
  },
  PH006: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Endocannabinoid and stress-adaptation reviews are strong; human dietary stress-resilience outcomes are indirect (omega-3 anxiety, oatmeal preclinical adjunct).",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for adaptive stress buffering. Benchmarked against RDoC Negative Valence and Arousal systems; distinct from Stress Reactivity (PH015) per RF002.",
      relatedPhenomeIds: ["PH015"],
    },
    crossReferences: {
      rdoc_domains: [
        "Negative Valence Systems — sustained threat / stress adaptation",
        "Arousal and Regulatory Systems — stress regulation",
      ],
      dsm_icd_context: [
        "Generalised anxiety disorder",
        "Post-traumatic stress disorder — resilience contexts",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Garani et al. (2021)",
          "garani_endocannabinoid_2021",
          "Endocannabinoid system in stress modulation and behavioural adaptation.",
        ),
        paper(
          "Oades et al. (2010)",
          "oades_role_2010",
          "Monoaminergic systems in stress-related motivation and affect — ADHD-adjacent framing.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Watson et al. (2019)",
          "watson_emerging_2019",
          "Emerging gut–brain signalling and stress-related neuroimmune biology.",
        ),
        paper(
          "Mamiya et al. (2021)",
          "mamiya_precision_2021",
          "Precision psychiatry framing for excitation–inhibition balance in stress-related phenotypes.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Kiecolt-Glaser et al. (2011)",
          "kiecolt-glaser_omega-3_2011",
          "Omega-3 reduced anxiety and inflammatory markers under stress — human resilience biology.",
        ),
        paper(
          "Sean Davies et al. (2018)",
          "sean_davies_oatmeal_2018",
          "Oatmeal bioactive context for gut–brain and stress-related signalling (preclinical/adjunct).",
        ),
      ],
    },
  },
  PH007: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Metabolic-flexibility and ketone-body reviews anchor the construct; ketone intervention human evidence supports substrate biology more than broad metabolic-resilience phenome endpoints.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for maintaining function under changing metabolic demand. Overlaps conceptually with PH012/PH013 but emphasises systemic adaptive capacity rather than condition-specific energy stability labels.",
      relatedPhenomeIds: ["PH012", "PH013"],
    },
    crossReferences: {
      rdoc_domains: ["Arousal and Regulatory Systems — metabolic / physiological regulation"],
      icf_domains: ["Body functions — metabolic and energy production functions"],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Goodpaster & Sparks (2017)",
          "goodpaster_metabolic_flexibility_2017",
          "Canonical metabolic flexibility construct and measurement framing.",
        ),
        paper(
          "Smith et al. (2018)",
          "smith_metabolic_flexibility_2018",
          "Metabolic flexibility in health and disease — resilience under variable demand.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Kyriazis et al. (2022)",
          "kyriazis_impact_2022",
          "Ketone bodies and brain energy metabolism — adaptive substrate biology.",
        ),
        paper(
          "Packer et al. (1997)",
          "packer_vitamin_1997",
          "CoQ10 and mitochondrial antioxidant biology supporting metabolic resilience.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Lopez-Ojeda et al. (2023)",
          "lopez_ojeda_ketone_2023",
          "Ketogenic and ketone-body dietary contexts modulate brain energy substrate biology.",
        ),
        paper(
          "Ramezani et al. (2023)",
          "ramezani_ketone_2023",
          "Ketone ester supplementation and metabolic substrate flexibility in humans.",
        ),
      ],
    },
  },
  PH008: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "GABAergic sleep biochemistry is mechanistically strong (Cataldo); human dietary sleep-outcome evidence on the registry stack is limited — not sleep-disorder treatment efficacy.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for arousal downshift and sleep-compatible regulation. Benchmarked against RDoC Arousal/Regulatory Systems (sleep–wake, circadian).",
      relatedPhenomeIds: ["PH003", "PH015"],
    },
    crossReferences: {
      rdoc_domains: [
        "Arousal and Regulatory Systems — sleep–wake regulation",
        "Arousal and Regulatory Systems — circadian rhythms",
      ],
      dsm_icd_context: ["Insomnia disorder", "ADHD — sleep disturbance"],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Cataldo et al. (2024)",
          "cataldo_comprehensive_2024",
          "Comprehensive review of PLP-dependent GABA synthesis and sleep-relevant inhibitory neurochemistry.",
        ),
        paper(
          "Fernstrom (2013)",
          "fernstrom_lnna_2013",
          "Precursor biology intersecting serotonergic sleep–wake and calming tone pathways.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Cataldo et al. (2024)",
          "cataldo_comprehensive_2024",
          "Glutamate decarboxylase and GABA synthesis as principal calming neurophysiology.",
        ),
        paper(
          "D'Afflitto et al. (2022)",
          "dafflitto_sex_hormone_gut_microbiota_2022",
          "Sex-hormone and gut–microbiota signalling intersect sleep and arousal regulation.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Bravo et al. (2011)",
          "bravo_ingestion_2011",
          "Gut–brain GABAergic modulation via microbiota — dietary probiotic context for calming biology.",
        ),
        paper(
          "Clerc et al. (2013)",
          "clerc_magnesium_2013",
          "Magnesium and neuromuscular/sleep-related physiology — nutritional calming-tone modulator.",
        ),
      ],
    },
  },
  PH009: {
    evidence_confidence: "low",
    evidence_confidence_note:
      "Endocannabinoid reward biology is review-supported but sparse on mechanism pages; registry stack lacks direct human reward-regulation outcome trials.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for reward sensitivity and reinforcement learning. Distinct from Pleasure & Interest Capacity (PH017) and Motivation/Drive (PH002) per RF005.",
      relatedPhenomeIds: ["PH002", "PH017"],
    },
    crossReferences: {
      rdoc_domains: [
        "Positive Valence Systems — reward valuation",
        "Positive Valence Systems — reward learning",
      ],
      dsm_icd_context: [
        "Attention-deficit/hyperactivity disorder",
        "Substance use disorder — reward dysregulation contexts",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Covey et al. (2017)",
          "covey_endocannabinoid_2017",
          "Endocannabinoid modulation of reward processing and reinforcement.",
        ),
        paper(
          "Gruber et al. (2023)",
          "gruber_impact_2023",
          "Insulin–dopamine reward-processing disruption in depression — reward regulation construct.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Solinas et al. (2006)",
          "solinas_anandamide_2006",
          "Anandamide and endocannabinoid signalling in reward-related behaviour.",
        ),
        paper(
          "Oades et al. (2010)",
          "oades_role_2010",
          "Dopaminergic reward and reinforcement biology in ADHD-related contexts.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Ferguson et al. (2014)",
          "ferguson_omega3_2014",
          "Omega-3 PUFA modulates inflammatory biology intersecting mood/reward pathways.",
        ),
        paper(
          "Jackson et al. (2021)",
          "jackson_effects_2021",
          "Saffron RCT mood outcomes — adjacent human nutrition→reward-affect biology.",
        ),
      ],
    },
  },
  PH010: {
    evidence_confidence: "low",
    evidence_confidence_note:
      "Mechanism coverage is thin at registry level; endocannabinoid and dopaminergic reviews provide construct context only — not behavioural-activation intervention evidence.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for translating motivation into action. Related to Motivation/Drive (PH002) per RF003; distinct as behavioural initiation/engagement rather than intrinsic drive tone.",
      relatedPhenomeIds: ["PH002"],
    },
    crossReferences: {
      rdoc_domains: ["Positive Valence Systems — initial response to reward / action initiation"],
      dsm_icd_context: [
        "Attention-deficit/hyperactivity disorder — hyperactivity/impulsivity",
        "Major depressive disorder — behavioural activation contexts",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Covey et al. (2017)",
          "covey_endocannabinoid_2017",
          "Endocannabinoid system and motivated behaviour / action initiation biology.",
        ),
        paper(
          "Aquili (2020)",
          "aquili_role_2020",
          "Catecholaminergic signalling and goal-directed behavioural engagement.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "MacDonald et al. (2024)",
          "macdonald_dopamine_2024",
          "Dopamine and initiation of goal-directed action — core activation biology.",
        ),
        paper(
          "Wurtman et al. (2003)",
          "wurtman_effects_2003",
          "Dietary precursor effects on catecholamine synthesis upstream of behavioural activation.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Reimherr et al. (1987)",
          "f_w_reimherr_open_1987",
          "Tyrosine supplementation in ADHD — early human evidence for activation-related biology.",
        ),
        paper(
          "Wang et al. (2019)",
          "wang_dietary_2019",
          "Dietary amino-acid context modulates neurotransmitter biology relevant to task engagement.",
        ),
      ],
    },
  },
  PH011: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Oxidative-stress and omega-3 cognition reviews support biology→phenome; homocysteine and gut–estrogen links are mechanistic — clarity outcomes not isolated as primary endpoints on the stack.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for mental processing clarity (distinct from Focus/Attention Stability PH001 and Cognitive Energy PH004). Enriched with cross-system oxidative and micronutrient biology.",
      relatedPhenomeIds: ["PH001", "PH004"],
    },
    crossReferences: {
      rdoc_domains: ["Cognitive Systems — cognitive control / processing efficiency"],
      dsm_icd_context: [
        "Attention-deficit/hyperactivity disorder — cognitive symptoms",
        "Mild cognitive impairment",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Derbyshire & Maes (2023)",
          "derbyshire_role_2023",
          "Neuroinflammation and oxidative stress in ADHD — cognitive symptom construct context.",
        ),
        paper(
          "Liu et al. (2014)",
          "liu_higher_2014",
          "Homocysteine and cognitive function — clarity/processing efficiency framing.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Verlaet et al. (2019)",
          "verlaet_oxidative_2019",
          "Oxidative stress biology linked to ADHD cognitive symptom domains.",
        ),
        paper(
          "Collaboration (1998)",
          "collaboration_lowering_1998",
          "Homocysteine lowering and cognitive outcomes — biology→clarity linkage.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Oulhaj et al. (2016)",
          "oulhaj_omega-3_2016",
          "Omega-3 supplementation and cognitive performance — human nutrition→cognition support.",
        ),
        paper(
          "Watson et al. (2019)",
          "watson_emerging_2019",
          "Gut–brain signalling and cognitive health — microbiome nutrition context.",
        ),
      ],
    },
  },
  PH012: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Metabolic-flexibility reviews strongly anchor the construct; single-FM mechanism linkage in BRAIN v1 — nutrition layer is micronutrient/bioenergetic context rather than condition-variable energy trials.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for energy stability when environmental and physiological conditions change. Near-duplicate review flag with PH013 (RF001) — fuel-substrate specificity reserved for PH013.",
      relatedPhenomeIds: ["PH013", "PH007"],
    },
    crossReferences: {
      rdoc_domains: ["Arousal and Regulatory Systems — metabolic regulation"],
      icf_domains: ["Body functions — energy and drive functions"],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Goodpaster & Sparks (2017)",
          "goodpaster_metabolic_flexibility_2017",
          "Metabolic flexibility under changing physiological demand — canonical construct.",
        ),
        paper(
          "Smith et al. (2018)",
          "smith_metabolic_flexibility_2018",
          "Adaptive substrate utilisation and energetic stability in variable conditions.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Kyriazis et al. (2022)",
          "kyriazis_impact_2022",
          "Brain ketone metabolism and energetic adaptation under variable supply.",
        ),
        paper(
          "Goodpaster & Sparks (2017)",
          "goodpaster_metabolic_flexibility_2017",
          "Physiological flexibility as biology→energy-stability linkage.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Pirinen et al. (2020)",
          "pirinen_niacin_2020",
          "NAD⁺/mitochondrial support for energetic stability under metabolic stress.",
        ),
        paper(
          "Tardy et al. (2020)",
          "tardy_vitamins_2020",
          "B-vitamin supplementation and energy/fatigue-related outcomes.",
        ),
      ],
    },
  },
  PH013: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Ketone and glucose-efficiency human studies support fuel-switching biology; registry stack does not demonstrate dietary fuel-manipulation trials as energy-phenome primary endpoints.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for ATP-linked supply when macronutrient/fuel context changes. Paired with PH012 under RF001 near-duplicate review — PH013 retains substrate-specific framing.",
      relatedPhenomeIds: ["PH012", "PH007"],
    },
    crossReferences: {
      rdoc_domains: ["Arousal and Regulatory Systems — metabolic / substrate regulation"],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "van Oudheusden et al. (2002)",
          "van_oudheusden_efficacy_2002",
          "Efficacy of glucose and fuel interventions on cognitive performance — fuel-availability construct.",
        ),
        paper(
          "Lopez-Ojeda et al. (2023)",
          "lopez_ojeda_ketone_2023",
          "Ketone bodies as alternative fuel — variable substrate framing.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Ramezani et al. (2023)",
          "ramezani_ketone_2023",
          "Ketone ester effects on substrate utilisation and brain energy biology.",
        ),
        paper(
          "Kyriazis et al. (2022)",
          "kyriazis_impact_2022",
          "Ketone metabolism and brain energetic adaptation under fuel change.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Lopez-Ojeda et al. (2023)",
          "lopez_ojeda_ketone_2023",
          "Dietary ketogenic context modulates ketone-body fuel biology.",
        ),
        paper(
          "van Oudheusden et al. (2002)",
          "van_oudheusden_efficacy_2002",
          "Glucose administration and cognitive fuel-supply intervention evidence.",
        ),
      ],
    },
  },
  PH014: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "Estrobolome and sex-hormone signalling reviews are mechanistically strong; human dietary hormone-stability trials are not represented on the foundational stack.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for hormone-linked signalling stability affecting mood and cognition. Cross-referenced to gut–estrobolome and insulin–estrogen biology from BRS-X Hormones workstream.",
      relatedPhenomeIds: ["PH003", "PH004"],
    },
    crossReferences: {
      rdoc_domains: ["Arousal and Regulatory Systems — endocrine / hormonal regulation"],
      dsm_icd_context: [
        "Premenstrual dysphoric disorder",
        "Perimenopause — mood and cognitive volatility",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Hu et al. (2023)",
          "hu_gut_microbial_beta_glucuronidase_estrogen_2023",
          "Gut microbial beta-glucuronidase and estrogen recirculation — hormonal volatility biology.",
        ),
        paper(
          "Li et al. (2023)",
          "li_function_2023",
          "Mitochondrial and neuroendocrine function intersecting mood and cognitive regulation.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Depaoli et al. (2021)",
          "depaoli_estrogen_insulin_resistance_2021",
          "Estrogen–insulin resistance coupling and neuropsychiatric endocrine volatility.",
        ),
        paper(
          "Ervin et al. (2019)",
          "ervin_estrobolome_beta_glucuronidase_2019",
          "Estrobolome beta-glucuronidase activity and estrogen signalling stability.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Sui et al. (2021)",
          "sui_gut_microbial_beta_glucuronidase_estrogen_reactivation_2021",
          "Dietary modulation of gut beta-glucuronidase and estrogen reactivation.",
        ),
        paper(
          "D'Afflitto et al. (2022)",
          "dafflitto_sex_hormone_gut_microbiota_2022",
          "Sex hormones, gut microbiota, and dietary signalling intersecting endocrine stability.",
        ),
      ],
    },
  },
  PH015: {
    evidence_confidence: "low-medium",
    evidence_confidence_note:
      "E/I balance and redox biology are review-supported; magnesium and homocysteine nutrition links are mechanistic — not stress-reactivity disorder intervention trials.",
    provenance: {
      frameworkOrigin: "BRAIN",
      developmentNote:
        "Core Version 1 registry phenome for stress-response intensity. Distinct from Stress Resilience (PH006) per RF002 — reactivity (acute response) versus adaptive buffering.",
      relatedPhenomeIds: ["PH006", "PH003"],
    },
    crossReferences: {
      rdoc_domains: [
        "Negative Valence Systems — acute threat / fear",
        "Arousal and Regulatory Systems — stress response",
      ],
      dsm_icd_context: [
        "Generalised anxiety disorder",
        "Attention-deficit/hyperactivity disorder — emotional reactivity",
      ],
    },
    evidence: {
      construct_landmark_papers: [
        paper(
          "Mamiya et al. (2021)",
          "mamiya_precision_2021",
          "Excitation–inhibition balance framing for stress-related psychiatric phenotypes.",
        ),
        paper(
          "Clerc et al. (2013)",
          "clerc_magnesium_2013",
          "Magnesium and stress-axis physiology — construct validation for reactivity biology.",
        ),
      ],
      biology_to_phenome_landmark_papers: [
        paper(
          "Lukovac et al. (2024)",
          "lukovac_serum_2024",
          "Serum oxidative stress markers in ADHD — load and reactivity biology.",
        ),
        paper(
          "Gregory et al. (2016)",
          "gregory_homocysteine_2016",
          "Homocysteine, B-vitamins, and stress-related neurochemistry.",
        ),
      ],
      nutrition_to_biology_landmark_papers: [
        paper(
          "Kiecolt-Glaser et al. (2011)",
          "kiecolt-glaser_omega-3_2011",
          "Omega-3 reduced stress-related anxiety and inflammation in humans.",
        ),
        paper(
          "Marsland et al. (2017)",
          "marsland_systemic_2017",
          "Systemic inflammation and stress-related neural network biology.",
        ),
      ],
    },
  },
};
