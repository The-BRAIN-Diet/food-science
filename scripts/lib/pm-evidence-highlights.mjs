/**
 * Curated PM §5.1 Evidence Highlights — mechanism-qualifying findings only.
 * Do NOT include phenome/outcome science (ADHD, attention, emotional dysregulation, etc.);
 * that belongs in §3 Phenome Connections. Hub ADHD tables feed phenome review, not this map.
 * Keys: file basename. Values: { intro, blocks: [{ heading, body }], extraRefs?: [] }
 */

export const BRS1_PM_EVIDENCE = {
  "brs1-fm1-pm1-amino-acid-availability-and-prioritisation": {
    intro:
      "The core biology of amino-acid availability is well established. The studies below do not redefine this mechanism; they highlight practical protein-adequacy findings that refine how meal-level substrate sufficiency is interpreted.",
    blocks: [
      {
        heading: "Protein distribution and utilisation",
        body: "The pattern of protein intake across the day may influence how effectively dietary amino acids are utilised; meal-level distribution and source quality can affect tissue retention and amino-acid availability [Walrand & Boirie, 2005].",
      },
      {
        heading: "Physiological flexibility in protein handling",
        body: "Larger protein boluses can sustain positive whole-body protein balance for several hours, indicating that amino-acid sufficiency depends on quantity, quality, and dietary pattern rather than rigid per-meal distribution rules [Trommelen et al., 2023].",
      },
      {
        heading: "Protein quality and DIAAS",
        body: "Digestible Indispensable Amino Acid Score (DIAAS) evaluates protein quality by digestible indispensable amino-acid content, supporting interpretation of sufficiency as a function of quality and coverage rather than grams alone [Moughan & Lim, 2024].",
      },
      {
        heading: "Complementary protein design",
        body: "Complementary plant-protein combinations can improve indispensable amino-acid coverage across the diet, reinforcing amino-acid adequacy as a dietary-pattern property [Moughan & Lim, 2024]; [Mariotti et al., 2019].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "walrand_optimizing_2005", label: "Walrand & Boirie (2005)" },
      { citation_key: "trommelen_anabolic_2023", label: "Trommelen et al. (2023)" },
      { citation_key: "moughan_diaas_2024", label: "Moughan & Lim (2024)" },
      { citation_key: "mariotti_dietary_2019", label: "Mariotti et al. (2019)" },
    ],
  },
  "brs1-fm1-pm2-lat1-competitive-transport-modulation": {
    intro:
      "The LAT1 competition model is well established. The studies below do not restate barrier biology; they show that single meals and dietary patterns measurably shift the LNAA ratios on which this PM depends.",
    blocks: [
      {
        heading: "Breakfast composition and tryptophan:LNAA ratios",
        body: "Single-meal manipulation studies demonstrate that carbohydrate–protein composition alters plasma tryptophan:LNAA ratios in healthy adults [Ashley et al., 1985].",
      },
      {
        heading: "Carbohydrate–protein meals and plasma tryptophan",
        body: "Normal meals rich in carbohydrates or proteins shift plasma tryptophan relative to competing LNAAs through insulin-mediated partitioning [Wurtman et al., 2003].",
      },
      {
        heading: "Diet-induced LNAA shifts and brain neurochemistry",
        body: "Human review evidence supports the principle that diet-induced LNAA shifts can alter brain precursor availability and neurochemistry [Fernstrom, 2013].",
      },
      {
        heading: "Meal-level competition rather than total protein alone",
        body: "These effects arise from relative amino-acid competition at meals rather than total daily protein intake alone [Ashley et al., 1985]; [Fernstrom, 2013].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "ashley_breakfast_1985", label: "Ashley et al. (1985)" },
      { citation_key: "wurtman_effects_2003", label: "Wurtman et al. (2003)" },
      { citation_key: "fernstrom_lnna_2013", label: "Fernstrom (2013)" },
    ],
  },
  "brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation": {
    intro:
      "Noradrenergic synthesis and signalling biology is well established. The studies below highlight cofactor and enzymatic dependencies that refine how noradrenergic substrate context is interpreted — not functional outcome claims.",
    blocks: [
      {
        heading: "Iron-dependent catecholamine synthesis",
        body: "Iron is an essential cofactor for tyrosine hydroxylase, the rate-limiting step in catecholamine synthesis — linking dietary cofactor sufficiency to noradrenergic substrate context [Beard et al., 2003].",
      },
      {
        heading: "Precursor transport context",
        body: "Meal-level LNAA transport and tyrosine presentation at the blood–brain barrier shape catecholamine precursor availability upstream of noradrenergic signalling [Fernstrom, 2013].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "beard_iron_2003", label: "Beard et al. (2003)" },
      { citation_key: "fernstrom_lnna_2013", label: "Fernstrom (2013)" },
    ],
  },
  "brs1-fm1-pm4-serotonergic-signalling-regulation": {
    intro:
      "Serotonergic synthesis and signalling biology is well established. The studies below highlight transport and precursor-presentation findings that refine how serotonergic substrate context is interpreted.",
    blocks: [
      {
        heading: "LAT1 transport and tryptophan presentation",
        body: "Brain tryptophan access depends on LAT1 competitive transport with other large neutral amino acids — meal composition shapes serotonergic precursor presentation upstream of this PM [Fernstrom, 2013].",
      },
    ],
    referenceNoteKeys: [{ citation_key: "fernstrom_lnna_2013", label: "Fernstrom (2013)" }],
  },
  "brs1-fm2-pm5-acetylcholine-synthesis-support": {
    intro:
      "The choline–acetylcholine substrate pathway is well established. The studies below highlight intake and food-matrix findings that refine how cholinergic substrate support is interpreted in practice.",
    blocks: [
      {
        heading: "Population choline intake adequacy",
        body: "Suboptimal choline intakes are reported in population surveys, reinforcing dietary choline as a substrate requiring deliberate food-pattern coverage rather than assumed adequacy [Derbyshire et al., 2023].",
      },
      {
        heading: "Dietary choline in food-matrix neurobiology",
        body: "Dietary neurotransmitter reviews identify choline and acetylcholine among food-matrix compounds with nervous-system relevance, though bioavailability requires context-specific interpretation [Briguglio et al., 2018].",
      },
      {
        heading: "Dietary choline as pattern-based substrate support",
        body: "Findings support dietary choline adequacy and meal-level exposure as modifiable substrate context rather than isolated precursor boluses [Derbyshire et al., 2023].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "derbyshire_role_2023", label: "Derbyshire et al. (2023)" },
      { citation_key: "briguglio_dietary_2018", label: "Briguglio et al. (2018)" },
    ],
  },
  "brs1-fm3-pm6-neuronal-membrane-dha-incorporation": {
    intro:
      "The role of DHA in neuronal membrane biology is well established. The studies below do not restate membrane biochemistry; they highlight **PC/LPC transport**, delivery-form efficacy, membrane structural context, and sourcing considerations that refine how incorporation is interpreted in practice.",
    blocks: [
      {
        heading: "LPC-DHA and MFSD2A transport",
        body: "LPC-DHA crosses the blood–brain barrier more efficiently than free or triglyceride-bound DHA via MFSD2A; PC–DHA chemistry is central to this transport frame [Patrick, 2019].",
      },
      {
        heading: "Phospholipid versus triglyceride delivery",
        body: "Dietary DHA provided as phospholipid shows higher efficacy for brain gray-matter DHA accretion than triglyceride form in porcine models (approximately 1.9-fold in one comparison) [Liu et al., 2014].",
      },
      {
        heading: "Phospholipid-bound omega-3 sources",
        body: "Phospholipid-bound omega-3 sources such as krill oil and fish roe supply EPA/DHA in forms readily converted toward LPC carriers [Colletti et al., 2021]; [Liu et al., 2014].",
      },
      {
        heading: "Neuronal membrane structural role of omega-3",
        body: "Long-chain omega-3 fatty acids are structural components of neuronal membranes with established roles in membrane fluidity and signalling architecture [McNamara & Carlson, 2006].",
      },
      {
        heading: "Sourcing and heavy-metal context",
        body: "Krill sits low in the food chain and typically carries a lower heavy-metal burden than oils from higher-trophic fish — a sourcing consideration for habitual phospholipid omega-3 intake [Colletti et al., 2021]; [Patted et al., 2024].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "patrick_role_2019", label: "Patrick (2019)" },
      { citation_key: "liu_higher_2014", label: "Liu et al. (2014)" },
      { citation_key: "colletti_advances_2021", label: "Colletti et al. (2021)" },
      { citation_key: "patted_omega-3_2024", label: "Patted et al. (2024)" },
      { citation_key: "mcnamara_role_2006", label: "McNamara & Carlson (2006)" },
    ],
  },
  "brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance": {
    intro:
      "Excitatory–inhibitory balance biology is well established. The studies below highlight network-level E/I framing that refines how this integrative PM is interpreted — not condition-specific biomarker claims.",
    blocks: [
      {
        heading: "Excitation–inhibition balance as a network property",
        body: "Neural excitation and inhibition balance operates as a coordinated network property across inhibitory and excitatory signalling systems rather than as isolated transmitter effects [Mamiya et al., 2021].",
      },
    ],
    referenceNoteKeys: [{ citation_key: "mamiya_precision_2021", label: "Mamiya et al. (2021)" }],
  },
  "brs1-fm4-pm8-gaba-synthesis-capacity": {
    intro:
      "GABA synthesis from glutamate is well established. The studies below highlight enzymatic and cofactor dependencies that refine how synthesis capacity is interpreted in practice.",
    blocks: [
      {
        heading: "Magnesium and neuronal excitability",
        body: "Magnesium modulates NMDA receptor activity and broader excitability context within which GABA synthesis capacity matters [Cataldo et al., 2024].",
      },
      {
        heading: "PLP-dependent glutamate decarboxylase context",
        body: "GABA synthesis from glutamate depends on glutamate decarboxylase and pyridoxal-5′-phosphate (active B6) as a coenzyme — linking repeated B6 coverage and protein-derived glutamate substrate to inhibitory synthesis capacity [Cataldo et al., 2024].",
      },
    ],
    referenceNoteKeys: [{ citation_key: "cataldo_comprehensive_2024", label: "Cataldo et al. (2024)" }],
  },
  "brs1-fm4-pm9-glutamate-clearance-and-recycling": {
    intro:
      "Glutamate clearance and recycling biology is well established. The studies below highlight uptake, recycling, and excitability context that refine how excitatory control is interpreted within BRS1(FM4).",
    blocks: [
      {
        heading: "Glutamate as principal excitatory transmitter",
        body: "Glutamate is the principal excitatory neurotransmitter of the CNS; efficient uptake and recycling are required to terminate synaptic signalling and prevent accumulation [Zhou and Danbolt, 2014].",
      },
      {
        heading: "Magnesium and excitatory signalling context",
        body: "Magnesium modulates NMDA receptor-mediated excitability; membrane and inflammatory dietary context indirectly stabilise the excitatory signalling environments in which clearance operates [Chai, 2025].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "zhou_glutamate_2014", label: "Zhou and Danbolt (2014)" },
      { citation_key: "chai_pleiotropic_2025", label: "Chai (2025)" },
    ],
  },
  "brs1-fm4-pm10-excitotoxicity-modulation": {
    intro:
      "Excitotoxic stress biology is well established. The studies below highlight neural E/I balance framing and magnesium-related excitotoxic protection that refine how excitatory overload modulation is interpreted in practice.",
    blocks: [
      {
        heading: "Neural excitation and inhibition balance",
        body: "Precision in neural excitation and inhibition balance framing supports interpreting excitotoxic modulation as part of the wider E/I cluster rather than an isolated nutrient effect [Mamiya et al., 2021].",
      },
      {
        heading: "Magnesium and glutamate receptor bioenergetics",
        body: "Magnesium sulfate protects against bioenergetic consequences of chronic glutamate receptor stimulation — linking dietary magnesium context to excitotoxic burden modulation [Clerc et al., 2013].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "mamiya_precision_2021", label: "Mamiya et al. (2021)" },
      { citation_key: "clerc_magnesium_2013", label: "Clerc et al. (2013)" },
    ],
  },
};

export const BRS4_PM_EVIDENCE = {
  "BRS4-FM1-PM1": {
    intro:
      "Electron transport and oxidative phosphorylation are foundational mitochondrial biochemistry. The studies below highlight why cofactor sufficiency and micronutrient context matter for sustaining respiratory-chain output.",
    theme: "ETC cofactors and brain energy context",
    blocks: [
      {
        heading: "Micronutrients as mitochondrial enzymatic cofactors",
        body: "Vitamins and minerals function as indispensable enzymatic cofactors across neurotransmitter synthesis, mitochondrial energy production, antioxidant defence, methylation, and neuroplasticity — their availability can determine whether downstream nutrient effects are realised [Tardy et al., 2020]. For this PM, the implication is that ETC throughput depends on daily cofactor sufficiency, not fuel alone.",
      },
      {
        heading: "CoQ10 and electron transport",
        body: "Coenzyme Q10 supports mitochondrial electron transport and provides antioxidant protection for neurons — a direct link between dietary CoQ10 context and the respiratory-chain machinery this PM represents [Crane, 2001].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "tardy_vitamins_2020", label: "Tardy et al. (2020)" },
      { citation_key: "crane_coq10_2001", label: "Crane (2001)" },
    ],
  },
  "BRS4-FM1-PM2": {
    intro:
      "NAD⁺-linked redox metabolism is well established in mitochondrial biochemistry. The evidence below emphasises cofactor dependence and lifestyle context rather than re-explaining NAD⁺ chemistry.",
    theme: "NAD⁺ cofactor sufficiency",
    blocks: [
      {
        heading: "B-vitamin context for energy metabolism",
        body: "Micronutrient review evidence positions B vitamins among the cofactors required for mitochondrial energy metabolism and broader brain-relevant enzymatic pathways [Tardy et al., 2020]. Niacin precursor availability is one practical dietary entry point for NAD⁺-dependent redox reactions represented by this PM.",
      },
      {
        heading: "Clinical relevance of NAD⁺ precursor insufficiency",
        body: "In mitochondrial myopathy, niacin supplementation restored blood NAD⁺, improved mitochondrial markers, and reduced fatigability — illustrating that NAD⁺ availability can be limiting for mitochondrial oxidative capacity in human tissue [Pirinen et al., 2020]. This supports interpreting NAD⁺ metabolism as a modifiable cofactor-dependent layer within BRS4(FM1).",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "tardy_vitamins_2020", label: "Tardy et al. (2020)" },
      { citation_key: "pirinen_niacin_2020", label: "Pirinen et al. (2020)" },
    ],
  },
  "BRS4-FM1-PM3": {
    intro:
      "Phosphocreatine buffering is textbook energetics. The findings below focus on dietary creatine availability rather than restating creatine biochemistry.",
    theme: "creatine buffering and cognition",
    blocks: [{
        heading: "Dietary creatine context",
        body: "Creatine supports ATP recycling in neurons and is obtained primarily from meat and fish; vegan dietary patterns lack meaningful dietary creatine unless supplemented. This reinforces creatine availability as a food-state lever for this PM rather than a universal baseline assumption across all eating patterns.",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "avgerinos_creatine_2018", label: "Avgerinos et al. (2018)" },
    ],
  },
  "BRS4-FM2-PM4": {
    intro:
      "Mitochondrial ROS generation and buffering are mechanistically established. The evidence below refines how elevated antioxidant markers and network regeneration should be interpreted.",
        blocks: [{
        heading: "GSH and mitochondrial lactate metabolism",
        body: "Mitochondrial metabolism of lactate depends on GSH for ROS neutralisation, linking antioxidant buffering directly to mitochondrial energy use efficiency [Verlaet et al., 2019]. This supports dietary and cofactor patterns that sustain antioxidant networks represented in sibling PM5.",
      },
      {
        heading: "Antioxidant network integration",
        body: "Vitamin E and related network antioxidants interact within a broader metabolic antioxidant system rather than acting as isolated micronutrient fixes [Packer et al., 1997]. Pattern-based dietary support is more aligned with this PM than single-compound supplementation alone.",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "verlaet_oxidative_2019", label: "Verlaet et al. (2019)" },
      { citation_key: "packer_vitamin_1997", label: "Packer et al. (1997)" },
      { citation_key: "kyriazis_impact_2022", label: "Kyriazis et al. (2022)" },
    ],
  },
  "BRS4-FM2-PM5": {
    intro:
      "Mitochondrial membrane protection is mechanistically established. The evidence below highlights polyphenol-linked mitophagy pathways and organelle resilience.",
    theme: "mitochondrial protection and mitophagy",
    blocks: [{
        heading: "Polyphenols, urolithin A, and mitophagy",
        body: "Higher polyphenol intake and microbial diversity can increase urolithin A and related metabolites that support mitochondrial resilience and mitophagy [Singh et al., 2022]. Urolithin A has been associated with improved mitophagy and cognitive endurance in intervention contexts [Andreux et al., 2019; Hou et al., 2024]. These findings support polyphenol-rich dietary patterns as complementary levers for mitochondrial protection — not replacements for core cofactor sufficiency.",
      },
      {
        heading: "CoQ10 and neuronal protection",
        body: "Coenzyme Q10 supports mitochondrial electron transport and neuronal antioxidant protection, overlapping with membrane-protective logic represented by this PM [Crane, 2001].",
      },
    ],
    extraRefs: [
      "[Singh et al. (2022) — Direct Supplementation with Urolithin A Overcomes Limitations of Dietary Exposure](/docs/papers/BRAIN-Diet-References#singh_direct_2022)",
      "[Andreux et al. (2019) — The Mitophagy Activator Urolithin A Is Safe and Induces a Molecular Signature of Improved Mitochondrial Health](/docs/papers/BRAIN-Diet-References#andreux_mitophagy_2019)",
      "[Hou et al. (2024) — Urolithin A Improves Cognitive Endurance](/docs/papers/BRAIN-Diet-References#hou_urolithin_2024)",
    ],
    referenceNoteKeys: [
      { citation_key: "verlaet_oxidative_2019", label: "Verlaet et al. (2019)" },
      { citation_key: "singh_direct_2022", label: "Singh et al. (2022)" },
      { citation_key: "andreux_mitophagy_2019", label: "Andreux et al. (2019)" },
      { citation_key: "hou_urolithin_2024", label: "Hou et al. (2024)" },
      { citation_key: "crane_coq10_2001", label: "Crane (2001)" },
    ],
  },
  "BRS4-FM3-PM6": {
    intro:
      "Carnitine-mediated fatty-acid transport is mechanistically established. The evidence below highlights substrate-import biology relevant to mitochondrial β-oxidation.",
        blocks: [{
        heading: "Carnitine and long-chain fatty-acid import",
        body: "Carnitine enables long-chain fatty-acid import for β-oxidation when glucose availability or metabolic demand shifts — the substrate-transport biology this PM represents [Kyriazis et al., 2022].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "kyriazis_impact_2022", label: "Kyriazis et al. (2022)" },
    ],
  },
  "BRS4-FM3-PM7": {
    intro:
      "Ketone utilisation as an alternative brain fuel is mechanistically established. The findings below emphasise brain energetic substrate biology.",
    theme: "ketone utilisation and brain energetics",
    blocks: [
      {
        heading: "Ketones and brain energy metabolism",
        body: "Ketone bodies can be transported to the brain and oxidised within mitochondria to support ATP production during reduced glucose availability [Ramezani et al., 2023; López-Ojeda et al., 2023]. This establishes ketone utilisation as a legitimate alternative fuel pathway within substrate flexibility — not a universal dietary prescription.",
      },
    ],referenceNoteKeys: [
      { citation_key: "ramezani_ketone_2023", label: "Ramezani et al. (2023)" },
      { citation_key: "lopez_ojeda_ketone_2023", label: "López-Ojeda et al. (2023)" },
      ],
  },
  "BRS4-FM3-PM8": {
    intro:
      "Metabolic fuel switching integrates multiple substrate pathways. The evidence below highlights mitochondrial energetics and microbial metabolite support for brain energy metabolism.",
        blocks: [
      {
        heading: "Butyrate and brain mitochondrial function",
        body: "Butyrate supports mitochondrial function and brain energy metabolism, while also contributing to lower neuroinflammatory load [Rose et al., 2018]. This links gut-derived SCFA biology to the integrated fuel-switching capacity represented by this PM — primarily via permissive metabolic context rather than direct PM intervention claims.",
      },
      {
        heading: "Metabolic flexibility framing",
        body: "Metabolic flexibility describes the capacity to transition between glucose, fatty acids, and ketones according to physiological demand [Goodpaster & Sparks, 2017; Smith et al., 2018]. Within BRS4(FM3), fuel switching sits above carnitine transport and ketone utilisation as the integrative adaptive capability.",
      },
    ],
    extraRefs: [
      "[Rose et al. (2018) — Butyrate and Brain Energy Metabolism](/docs/papers/BRAIN-Diet-References#rose_butyrate_2018)",
    ],
    referenceNoteKeys: [
      { citation_key: "rose_butyrate_2018", label: "Rose et al. (2018)" },
      { citation_key: "goodpaster_metabolic_flexibility_2017", label: "Goodpaster & Sparks (2017)" },
      { citation_key: "smith_metabolic_flexibility_2018", label: "Smith et al. (2018)" },
    ],
  },
  "BRS4-FM4-PM9": {
    intro:
      "Mitochondrial biogenesis is primarily training-driven. The evidence below highlights polyphenol-linked mitophagy support and why adaptive capacity matters as a longer-horizon energetic reserve.",
    theme: "mitochondrial biogenesis and mitophagy support",
    blocks: [
      {
        heading: "Polyphenols, urolithin A, and mitophagy",
        body: "Higher polyphenol intake and microbial diversity increase urolithin A and related metabolites supporting mitochondrial resilience and mitophagy [Singh et al., 2022]. Urolithin A intervention has been associated with improved mitophagy markers and cognitive endurance [Andreux et al., 2019; Hou et al., 2024]. For this PM, these represent secondary dietary signals complementing primary exercise-driven biogenesis.",
      },
      {
        heading: "Exercise as the primary biogenesis driver",
        body: "Mitochondrial biogenesis depends on repeated exercise and recovery signalling rather than single-meal interventions [Goodpaster & Sparks, 2017; de Guia et al., 2019]. Diet provides permissive cofactor and substrate context; lifestyle remains the dominant lever.",
      },
    ],
    extraRefs: [
      "[Singh et al. (2022) — Direct Supplementation with Urolithin A Overcomes Limitations of Dietary Exposure](/docs/papers/BRAIN-Diet-References#singh_direct_2022)",
      "[Andreux et al. (2019) — The Mitophagy Activator Urolithin A Is Safe and Induces a Molecular Signature of Improved Mitochondrial Health](/docs/papers/BRAIN-Diet-References#andreux_mitophagy_2019)",
      "[Hou et al. (2024) — Urolithin A Improves Cognitive Endurance](/docs/papers/BRAIN-Diet-References#hou_urolithin_2024)",
    ],
    referenceNoteKeys: [
      { citation_key: "singh_direct_2022", label: "Singh et al. (2022)" },
      { citation_key: "andreux_mitophagy_2019", label: "Andreux et al. (2019)" },
      { citation_key: "hou_urolithin_2024", label: "Hou et al. (2024)" },
      { citation_key: "goodpaster_metabolic_flexibility_2017", label: "Goodpaster & Sparks (2017)" },
      { citation_key: "de_guia_nad_2019", label: "de Guia et al. (2019)" },
    ],
  },
};

export const BRS3_PM_EVIDENCE = {
  "brs3-fm1-pm1-nf-kb-signalling-regulation": {
    intro:
      "NF-κB transcriptional biology is well established. The studies below do not restate pathway mechanics; they highlight dietary-pattern findings that refine how inflammatory signalling pressure is interpreted in practice.",
    theme: "NF-κB and dietary inflammatory tone",
    blocks: [
      {
        heading: "Polyphenol-rich dietary patterns and inflammatory biomarkers",
        body: "Polyphenol-rich dietary-pattern interventions such as the Green Mediterranean Diet report shifts in inflammatory biomarkers consistent with lower pro-inflammatory signalling pressure — supporting pattern-based anti-inflammatory levers rather than single-nutrient dosing for this PM [Zelicha et al., 2022].",
      },
      {
        heading: "Postprandial and LPS-linked inflammatory context",
        body: "Lipopolysaccharide-linked inflammatory signalling is modulated by dietary and postprandial context, linking meal patterns to systemic inflammatory load [Batey et al., 2024].",
      },
      {
        heading: "Quercetin and polyphenol synergy",
        body: "Quercetin carries antioxidant and anti-neuroinflammatory properties; quercitrin effects may be augmented by co-ingestion of omega-3s and olive oil — reinforcing combined polyphenol–marine-fat meal construction for this PM [Tongjaroenbuangam et al., 2011; Camuesco et al., 2006].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "zelicha_effect_2022", label: "Zelicha et al. (2022)" },
      { citation_key: "batey_lipopolysaccharide_2024", label: "Batey et al. (2024)" },
      { citation_key: "tongjaroenbuangam_neuroprotective_2011", label: "Tongjaroenbuangam et al. (2011)" },
      { citation_key: "camuesco_intestinal_2006", label: "Camuesco et al. (2006)" },
    ],
    extraRefs: [
      "[Tongjaroenbuangam et al. (2011) — Neuroprotective Effects of Quercetin](/docs/papers/BRAIN-Diet-References#tongjaroenbuangam_neuroprotective_2011)",
      "[Camuesco et al. (2006) — Intestinal Anti-Inflammatory Activity of Quercitrin](/docs/papers/BRAIN-Diet-References#camuesco_intestinal_2006)",
    ],
  },
  "brs3-fm1-pm2-gut-derived-inflammatory-signalling": {
    intro:
      "The gut–inflammation axis is well established. The studies below highlight endotoxin, microbiome, and SCFA findings that refine how gut-derived inflammatory load is interpreted in practice.",
        blocks: [
      {
        heading: "Metabolic endotoxemia and systemic inflammation",
        body: "When the gut barrier weakens, bacterial fragments such as lipopolysaccharide enter circulation and sustain chronic low-grade inflammation — the core translocation biology this PM represents [Mohammad & Thiemermann, 2021]. Dietary and postprandial context modulates LPS-linked inflammatory responses [Batey et al., 2024].",
      },
      {
        heading: "Butyrate and neuroinflammation",
        body: "Butyrate has anti-inflammatory effects and supports mitochondrial brain energy metabolism — linking gut-derived SCFA biology to this PM's inflammatory load frame [Yunting Li et al., 2024; Cavaliere et al., 2022].",
      },
      {
        heading: "Propionate and blood–brain barrier context",
        body: "Propionate may protect the blood–brain barrier and reduce neuroinflammation in preclinical and mechanistic framing [Grüter et al., 2023; Hoyles et al., 2018].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "mohammad_role_2021", label: "Mohammad & Thiemermann (2021)" },
      { citation_key: "batey_lipopolysaccharide_2024", label: "Batey et al. (2024)" },
      { citation_key: "li_sodium_2024", label: "Yunting Li et al. (2024)" },
      { citation_key: "cavaliere_butyrate_2022", label: "Cavaliere et al. (2022)" },
      { citation_key: "gruter_propionate_2023", label: "Grüter et al. (2023)" },
      { citation_key: "hoyles_microbiome-host_2018", label: "Hoyles et al. (2018)" },
    ],
    extraRefs: [
      "[Yunting Li et al. (2024) — Sodium Butyrate and Neuroinflammation](/docs/papers/BRAIN-Diet-References#li_sodium_2024)",
      "[Cavaliere et al. (2022) — Butyrate and Neuroinflammation](/docs/papers/BRAIN-Diet-References#cavaliere_butyrate_2022)",
      "[Grüter et al. (2023) — Propionate and the Blood–Brain Barrier](/docs/papers/BRAIN-Diet-References#gruter_propionate_2023)",
      "[Hoyles et al. (2018) — Microbiome-Host Cometabolism and Propionate](/docs/papers/BRAIN-Diet-References#hoyles_microbiome-host_2018)",
    ],
  },
  "brs3-fm2-pm3-nrf2-are-antioxidant-activation": {
    intro:
      "Nrf2-ARE induction biology is well established. The evidence below emphasises endogenous defence activation, cofactor dependence, and why food-based induction patterns matter more than isolated megadosing.",
        blocks: [
      {
        heading: "Sulforaphane bioavailability and Nrf2 activation",
        body: "Sulforaphane shows higher bioavailability than many polyphenol-based Nrf2 activators and engages antioxidant and detoxification gene programmes in human intervention work — a direct lever for this PM [Houghton et al., 2016]. Repeated crucifer exposure matters more than one-off intake.",
      },
      {
        heading: "Mineral cofactors for antioxidant enzymes",
        body: "Selenium, zinc, and manganese are required for proper functioning of endogenous antioxidant enzyme systems that Nrf2 programmes depend on — reinforcing cofactor-rich dietary patterns alongside induction signals [Mocchegiani & Malavolta, 2019].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "houghton_sulforaphane_2016", label: "Houghton et al. (2016)" },
      { citation_key: "mocchegiani_role_2019", label: "Mocchegiani & Malavolta (2019)" },
    ],
    extraRefs: [
      "[Mocchegiani & Malavolta (2019) — Role of Zinc and Selenium in Antioxidant Systems](/docs/papers/BRAIN-Diet-References#mocchegiani_role_2019)",
    ],
  },
  "brs3-fm2-pm4-ros-generation-vs-clearance-balance": {
    intro:
      "The generation-versus-clearance model of oxidative stress is well established. The evidence below refines how net redox burden and antioxidant network logic should be read.",
    blocks: [
      {
        heading: "Antioxidant network integration",
        body: "Vitamin E and related network antioxidants interact within a broader metabolic antioxidant system rather than acting as isolated micronutrient fixes [Packer et al., 1997]. Pattern-based dietary support is more aligned with this PM than single-compound supplementation alone.",
      },
      {
        heading: "Dietary antioxidant protection under oxidative load",
        body: "Antioxidant interventions can increase resistance to exercise-induced lipid peroxidation, supporting modifiable redox protection through food-state antioxidant coverage rather than isolated compounds [Fielding et al., 2005].",
      },
      {
        heading: "Megadose supplement caution",
        body: "High-dose isolated antioxidant supplements have shown inconsistent or harmful effects in some trials — reinforcing food-based network coverage as the practical frame aligned with this PM [Klein et al., 2011].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "packer_vitamin_1997", label: "Packer et al. (1997)" },
      { citation_key: "fielding_increases_2005", label: "Fielding et al. (2005)" },
      { citation_key: "klein_vitamin_2011", label: "Klein et al. (2011)" },
    ],
    extraRefs: [
      "[Klein et al. (2011) — Vitamin E and Prostate Cancer](/docs/papers/BRAIN-Diet-References#klein_vitamin_2011)",
    ],
  },
  "brs3-fm2-pm5-lipid-peroxidation-control": {
    intro:
      "Membrane lipid peroxidation biology is well established. The studies below highlight food-based protection patterns that refine how lipid-phase oxidative damage is interpreted.",
    blocks: [{
        heading: "Dietary antioxidant protection of lipids",
        body: "Antioxidant interventions can increase resistance to exercise-induced lipid peroxidation, supporting modifiable lipid-phase protection through food-state antioxidant coverage rather than isolated compounds [Fielding et al., 2005].",
      },
      {
        heading: "Carotenoids and neural membrane protection",
        body: "Carotenoids accumulate in neural tissues, scavenge reactive oxygen species, and play a neuroprotective role through antioxidant and anti-inflammatory properties — supporting paired antioxidant–PUFA meal construction for this PM [Johnson, 2014].",
      },
      {
        heading: "Oxidative damage and mitochondrial overlap",
        body: "Increased oxidative stress links to cellular damage, DNA repair dysfunction, and mitochondrial impairment — placing lipid peroxidation control within wider energetic and inflammatory biology [Solleiro-Villavicencio & Rivas-Arancibia, 2018].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "fielding_increases_2005", label: "Fielding et al. (2005)" },
      { citation_key: "johnson_role_2014", label: "Johnson (2014)" },
      { citation_key: "solleiro-villavicencio_effect_2018", label: "Solleiro-Villavicencio & Rivas-Arancibia (2018)" },
    ],
    extraRefs: [
      "[Solleiro-Villavicencio & Rivas-Arancibia (2018) — Oxidative Stress and Mitochondrial Dysfunction](/docs/papers/BRAIN-Diet-References#solleiro-villavicencio_effect_2018)",
    ],
  },
  "brs3-fm2-pm6-antioxidant-network-recycling": {
    intro:
      "The antioxidant-network concept is well established. The evidence below anchors regeneration logic and cautions against single-nutrient megadosing without clinical justification.",
    blocks: [
      {
        heading: "Synergistic antioxidant network regeneration",
        body: "Vitamins E and C, glutathione, lipoic acid, and CoQ10 function as an interacting regeneration network in vivo rather than independent antioxidants — the core biology this PM represents [Packer et al., 1997; Vertuani et al., 2004].",
      },
      {
        heading: "Megadose supplement caution",
        body: "High-dose isolated antioxidant supplements have shown inconsistent or harmful effects in some trials — reinforcing food-based network coverage as the practical frame aligned with this PM [Klein et al., 2011].",
      },
      {
        heading: "Green Mediterranean Diet and urolithin A context",
        body: "Green Mediterranean Diet interventions report neuroprotective metabolic shifts accompanied by increases in microbiome-derived urolithin A — illustrating polyphenol–fibre–gut synergy as a network-supportive dietary pattern [Zelicha et al., 2022; Pachter et al., 2024].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "packer_vitamin_1997", label: "Packer et al. (1997)" },
      { citation_key: "vertuani_antioxidants_2004", label: "Vertuani et al. (2004)" },
      { citation_key: "klein_vitamin_2011", label: "Klein et al. (2011)" },
      { citation_key: "zelicha_effect_2022", label: "Zelicha et al. (2022)" },
      { citation_key: "pachter_glycemic_2024", label: "Pachter et al. (2024)" },
    ],
    extraRefs: [
      "[Klein et al. (2011) — Vitamin E and Prostate Cancer](/docs/papers/BRAIN-Diet-References#klein_vitamin_2011)",
      "[Pachter et al. (2024) — Glycemic and Microbiome Effects of Green Mediterranean Diet](/docs/papers/BRAIN-Diet-References#pachter_glycemic_2024)",
    ],
  },
  "brs3-fm3-pm7-cytokine-network-modulation": {
    intro:
      "Cytokine networks are standard inflammatory readouts. The evidence below highlights omega-3 effects on resolution-phase inflammation.",
    blocks: [
      {
        heading: "Omega-3 effects on cytokine pathways",
        body: "In controlled endotoxemia models, high-dose EPA+DHA attenuated fever and downstream cytokines (IL-6, IL-10) while TNF-α remained unchanged — suggesting omega-3s reshape resolution-phase inflammation rather than block initiation [Ferguson et al., 2014].",
      },
    ],
    referenceNoteKeys: [{ citation_key: "ferguson_omega3_2014", label: "Ferguson et al. (2014)" }],
  },
  "brs3-fm3-pm8-eicosanoid-spm-balance": {
    intro:
      "The SPM resolution framework is well established. The evidence below highlights active inflammation termination, omega-3 substrate dependence, and dietary fatty-acid balance.",
    theme: "SPM resolution and omega-3 substrate balance",
    blocks: [
      {
        heading: "SPMs as active inflammation terminators",
        body: "Specialized pro-resolving mediators derived from DHA and EPA actively terminate inflammation without suppressing immune surveillance — resolvins, protectins, and maresins inhibit neutrophil infiltration and support macrophage clearance [Serhan & Petasis, 2011].",
      },
      {
        heading: "Controlled endotoxemia and resolution-phase remodelling",
        body: "High-dose EPA+DHA attenuated fever and downstream cytokines in controlled endotoxemia while TNF-α remained unchanged — consistent with omega-3s reshaping the resolution phase rather than blocking inflammatory initiation [Ferguson et al., 2014].",
      },
      {
        heading: "Evolutionary omega-6:omega-3 imbalance",
        body: "Evolutionary and dietary omega-6:omega-3 imbalance shifts lipid-mediator output toward pro-inflammatory eicosanoid dominance — the substrate-balance frame this PM operationalises [Simopoulos, 2011].",
      },
      {
        heading: "Quercetin–omega-3 synergy for inflammatory resolution",
        body: "Quercitrin anti-inflammatory effects may be augmented by co-ingestion of omega-3s and olive oil — supporting combined polyphenol–marine-fat patterns for resolution-oriented lipid signalling [Camuesco et al., 2006].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "serhan_resolvins_2011", label: "Serhan & Petasis (2011)" },
      { citation_key: "ferguson_omega3_2014", label: "Ferguson et al. (2014)" },
      { citation_key: "simopoulos_evolutionary_2011", label: "Simopoulos (2011)" },
      { citation_key: "camuesco_intestinal_2006", label: "Camuesco et al. (2006)" },
    ],
    extraRefs: [
      "[Camuesco et al. (2006) — Intestinal Anti-Inflammatory Activity of Quercitrin](/docs/papers/BRAIN-Diet-References#camuesco_intestinal_2006)",
    ],
  },
};

/** Map BRS number to hub markdown filename (under docs/biological-targets/) */
export const BRS_HUB_FILES = {
  BRS1: "neurotransmitter-regulation.md",
  BRS2: "methylation-one-carbon-metabolism.md",
  BRS3: "inflammation-oxidative-stress.md",
  BRS4: "mitochondrial-function-bioenergetics.md",
  BRS5: "gut-brain-axis-enteric-nervous-system.md",
  BRS6: "metabolic-neuroendocrine-stress.md",
};

export function getPmEvidenceMap(brs) {
  if (brs === "BRS1") return BRS1_PM_EVIDENCE;
  if (brs === "BRS3") return BRS3_PM_EVIDENCE;
  if (brs === "BRS4") return BRS4_PM_EVIDENCE;
  return {};
}
