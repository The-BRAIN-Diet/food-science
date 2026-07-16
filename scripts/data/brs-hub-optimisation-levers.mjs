/**
 * Curated System Optimisation Practices for BRS hub pages.
 * Five standard categories; empty arrays render as "Coming soon".
 * Practices are targeted interventions beyond foundational diet/lifestyle.
 * @see system/brs-hub-levers-schema.md
 */

/** @typedef {{ action: string, explanation: string, match_optimisation?: RegExp[], match_pm_ids?: string[], fm_note?: string }} OptimisationLeverDef */

/** @typedef {'food_prep' | 'dietary_protocols' | 'conditional_supplementation' | 'light_circadian' | 'stress_autonomic'} SopCategoryId */

/**
 * @type {Array<{ id: SopCategoryId, title: string, description: string }>}
 */
export const SOP_CATEGORIES = [
  {
    id: "food_prep",
    title: "Food Preparation & Delivery",
    description:
      "Optimising food structure, cooking, bioavailability and nutrient delivery.",
  },
  {
    id: "dietary_protocols",
    title: "Dietary & Fasting Protocols",
    description:
      "Targeted dietary approaches that modify physiology beyond routine healthy eating.",
  },
  {
    id: "conditional_supplementation",
    title: "Conditional Supplementation",
    description:
      "Evidence-informed supplements used under selected physiological or clinical conditions.",
  },
  {
    id: "light_circadian",
    title: "Light & Circadian Optimisation",
    description: "Practices that support circadian entrainment and biological timing.",
  },
  {
    id: "stress_autonomic",
    title: "Stress & Autonomic Regulation",
    description:
      "Practices that deliberately influence autonomic function, adaptive stress responses and physiological resilience.",
  },
];

/**
 * @type {Record<string, Record<SopCategoryId, OptimisationLeverDef[]>>}
 */
export const HUB_OPTIMISATION_LEVERS = {
  BRS1: {
    food_prep: [
      {
        action: "Prepare omega-3-rich foods gently and include them regularly",
        explanation:
          "to protect delicate marine fats during cooking and support ongoing brain membrane health over time.",
        match_pm_ids: [
          "BRS1-FM3-PM6",
          "BRS1-FM4-PM7",
          "BRS1-FM4-PM10",
          "BRS1-FM1-PM3",
        ],
      },
      {
        action: "Prefer gentler cooking and stable fat handling",
        explanation:
          "to limit avoidable AGE/ALE and oxidised-lipid load that can degrade amino-acid usability and add exogenous oxidative pressure on signalling biology.",
        match_pm_ids: ["BRS1-FM1-PM2", "BRS1-FM4-PM9"],
      },
      {
        action: "Soak or sprout phytate-rich seeds and legumes when mineral density matters",
        explanation:
          "to improve plant zinc and mineral bioavailability that supports neurotransmission cofactor chemistry.",
        match_pm_ids: ["BRS1-FM4-PM7", "BRS1-FM4-PM8", "BRS1-FM2-PM5"],
      },
      {
        action: "Pair iron-containing foods with vitamin C and meal-context enhancers",
        explanation:
          "to improve iron absorption for catecholamine-related cofactor biology.",
        match_pm_ids: ["BRS1-FM1-PM3"],
      },
    ],
    dietary_protocols: [],
    conditional_supplementation: [],
    light_circadian: [],
    stress_autonomic: [],
  },

  BRS2: {
    food_prep: [
      {
        action: "Soak or sprout phytate-rich seeds, legumes and grains when mineral density matters",
        explanation:
          "to improve plant mineral bioavailability that supports one-carbon cofactor chemistry and methyl-cycle throughput.",
        match_pm_ids: [
          "BRS2-FM1-PM1",
          "BRS2-FM1-PM2",
          "BRS2-FM1-PM3",
          "BRS2-FM1-PM4",
          "BRS2-FM3-PM7",
        ],
      },
      {
        action: "Pair fat-soluble compounds with dietary fat",
        explanation:
          "to support absorption of choline-related and membrane lipids that feed phosphatidylcholine formation and one-carbon lipid delivery.",
        match_pm_ids: [
          "BRS2-FM3-PM7",
          "BRS2-FM1-PM1",
          "BRS2-FM1-PM2",
          "BRS2-FM1-PM4",
        ],
      },
      {
        action: "Prefer gentler cooking and stable fat handling",
        explanation:
          "to limit AGE/ALE and oxidised-lipid load that can add avoidable pressure on glutathione and transsulfuration capacity.",
        match_pm_ids: ["BRS2-FM2-PM5", "BRS2-FM2-PM6"],
      },
      {
        action: "Prepare cruciferous vegetables to retain myrosinase-linked activity",
        explanation:
          "to support sulforaphane yield relevant to glutathione-network resilience under one-carbon demand.",
        match_pm_ids: ["BRS2-FM2-PM6"],
      },
    ],
    dietary_protocols: [],
    conditional_supplementation: [],
    light_circadian: [],
    stress_autonomic: [],
  },

  BRS3: {
    food_prep: [
      {
        action: "Choose gentler cooking methods and avoid repeatedly heating unstable oils",
        explanation:
          "to limit lipid oxidation and dietary ROS that can overwhelm antioxidant clearance and lipid peroxidation control.",
        match_pm_ids: ["BRS3-FM2-PM4", "BRS3-FM2-PM5", "BRS3-FM1-PM1"],
      },
      {
        action: "Prepare antioxidant-rich vegetables to preserve heat-sensitive compounds",
        explanation:
          "to retain vitamin C and polyphenols that support NRF2 activation and sustained ROS clearance rather than losing them to overcooking.",
        match_pm_ids: ["BRS3-FM2-PM3", "BRS3-FM2-PM6"],
      },
      {
        action: "Prepare cruciferous vegetables to retain myrosinase-linked activity",
        explanation:
          "to support sulforaphane yield that feeds NRF2-linked antioxidant defence chemistry.",
        match_pm_ids: ["BRS3-FM2-PM3", "BRS3-FM2-PM5", "BRS3-FM2-PM6"],
      },
      {
        action: "Soak or sprout phytate-rich seeds and legumes when mineral density matters",
        explanation:
          "to improve plant mineral bioavailability that supports antioxidant-enzyme and inflammatory-resolution cofactor chemistry.",
        match_pm_ids: ["BRS3-FM1-PM1", "BRS3-FM2-PM4", "BRS3-FM3-PM8"],
      },
    ],
    dietary_protocols: [],
    conditional_supplementation: [],
    light_circadian: [],
    stress_autonomic: [],
  },

  BRS4: {
    food_prep: [
      {
        action: "Choose gentler cooking methods",
        explanation:
          "to reduce avoidable oxidative stress placed on mitochondrial protection and membrane integrity.",
        match_pm_ids: ["BRS4-FM2-PM5", "BRS4-FM2-PM4"],
      },
      {
        action: "Prepare omega-3-rich foods gently",
        explanation:
          "to limit oxidative degradation of PUFA-rich meal matrices that burden mitochondrial redox protection.",
        match_pm_ids: [
          "BRS4-FM2-PM5",
          "BRS4-FM2-PM4",
          "BRS4-FM1-PM1",
          "BRS4-FM1-PM2",
        ],
      },
      {
        action: "Pair iron-containing foods with vitamin C and meal-context enhancers",
        explanation:
          "to support iron bioavailability for electron-transport and mitochondrial cofactor networks.",
        match_pm_ids: [
          "BRS4-FM1-PM1",
          "BRS4-FM1-PM2",
          "BRS4-FM2-PM4",
          "BRS4-FM2-PM5",
          "BRS4-FM4-PM9",
        ],
      },
      {
        action: "Boil high-oxalate leafy greens when oxalate load matters",
        explanation:
          "to reduce soluble oxalate, improve mineral bioavailability from iron- and magnesium-rich greens, and limit avoidable pressure on mitochondrial cofactor and redox networks.",
        match_pm_ids: ["BRS4-FM2-PM4", "BRS4-FM2-PM5"],
      },
    ],
    dietary_protocols: [
      {
        action: "Consider structured time-restricted eating windows where appropriate",
        explanation:
          "to provide periodic exposure to alternative fuel-utilisation pathways that support metabolic fuel switching.",
        match_pm_ids: ["BRS4-FM3-PM8"],
      },
      {
        action: "Consider structured ketogenic approaches only in specific clinical contexts",
        explanation:
          "to increase reliance on ketone metabolism and fuel-adaptation pathways where clinically indicated; not a general population recommendation.",
        match_pm_ids: ["BRS4-FM3-PM8", "BRS4-FM3-PM7"],
      },
    ],
    conditional_supplementation: [
      {
        action:
          "Consider creatine monohydrate under selected high-demand or low-intake conditions",
        explanation:
          "to support phosphocreatine buffering when sleep deprivation, hypoxia, ageing, low dietary creatine intake, or sustained cognitive/physical demand make exogenous creatine more consequential; cerebral responses remain variable and smaller than typical muscle responses.",
        match_pm_ids: ["BRS4-FM1-PM3"],
      },
    ],
    light_circadian: [],
    stress_autonomic: [],
  },

  BRS5: {
    food_prep: [
      {
        action: "Prepare fermentable staples and include traditionally fermented foods where tolerated",
        explanation:
          "to improve digestibility of fermentable substrates and preserve living or minimally heat-killed matrices that support SCFA production, keystone ecology and barrier signalling.",
        match_pm_ids: [
          "BRS5-FM1-PM1",
          "BRS5-FM1-PM2",
          "BRS5-FM1-PM3",
          "BRS5-FM2-PM4",
          "BRS5-FM2-PM5",
          "BRS5-FM3-PM7",
        ],
      },
      {
        action: "Soak legumes and phytate-rich plant foods thoroughly before cooking",
        explanation:
          "to improve digestibility and mineral bioavailability while keeping fermentable fibre available for microbial metabolism.",
        match_pm_ids: ["BRS5-FM1-PM3", "BRS5-FM2-PM5", "BRS5-FM3-PM7"],
      },
      {
        action: "Pair fat-soluble compounds with dietary fat",
        explanation:
          "to support absorption of barrier- and signalling-relevant lipids within mixed meals.",
        match_pm_ids: ["BRS5-FM1-PM1", "BRS5-FM1-PM2", "BRS5-FM3-PM8"],
      },
    ],
    dietary_protocols: [],
    conditional_supplementation: [],
    light_circadian: [],
    stress_autonomic: [],
  },

  BRS6: {
    food_prep: [
      {
        action: "Soak or sprout phytate-rich seeds, legumes and grains when mineral density matters",
        explanation:
          "to improve plant magnesium, zinc and related mineral bioavailability that supports stress-recovery and metabolic cofactor chemistry.",
        match_pm_ids: [
          "BRS6-FM1-PM3",
          "BRS6-FM2-PM4",
          "BRS6-FM3-PM6",
          "BRS6-FM3-PM7",
          "BRS6-FM4-PM8",
        ],
      },
      {
        action: "Pair iron-containing foods with vitamin C and meal-context enhancers",
        explanation:
          "to improve iron absorption that supports metabolic and neuroendocrine cofactor networks under physiological load.",
        match_pm_ids: ["BRS6-FM1-PM1", "BRS6-FM1-PM2", "BRS6-FM2-PM4"],
      },
      {
        action: "Prepare omega-3-rich foods gently",
        explanation:
          "to protect PUFA-rich meal matrices that support membrane and inflammatory-resolution context for metabolic–stress regulation.",
        match_pm_ids: [
          "BRS6-FM1-PM3",
          "BRS6-FM2-PM4",
          "BRS6-FM3-PM7",
          "BRS6-FM4-PM8",
        ],
      },
      {
        action: "Prepare fermentable staples carefully when building fibre load",
        explanation:
          "to improve digestibility of fermentable substrates that can support vagal and metabolic recovery signalling without abrupt gut strain.",
        match_pm_ids: ["BRS6-FM3-PM6", "BRS6-FM3-PM7"],
      },
    ],
    dietary_protocols: [],
    conditional_supplementation: [],
    light_circadian: [
      {
        action: "Get morning daylight and limit evening artificial light",
        explanation:
          "to strengthen circadian timing, support healthy sleep transitions, and align feeding with the daily light–dark cycle.",
        match_pm_ids: ["BRS6-FM2-PM4", "BRS6-FM2-PM5"],
      },
    ],
    stress_autonomic: [
      {
        action: "Use slow breathing and recovery routines after stress or exertion",
        explanation:
          "to support healthy transitions between activation and recovery and improve long-term autonomic flexibility.",
        match_pm_ids: ["BRS6-FM3-PM6", "BRS6-FM3-PM7"],
      },
    ],
  },
};
