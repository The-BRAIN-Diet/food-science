/**
 * Curated integrated Lifestyle Priorities for BRS hub pages.
 * PM provenance is attached at generation time via match_lifestyle / match_pm_ids.
 * @see system/brs-hub-levers-schema.md
 */

/** @typedef {{ action: string, explanation: string, match_lifestyle?: RegExp[], match_pm_ids?: string[], match_pm_patterns?: RegExp[], require_pm_match?: boolean }} LifestylePriorityDef */

/** @type {Record<string, LifestylePriorityDef[]>} */
export const HUB_LIFESTYLE_PRIORITIES = {
  BRS1: [
    {
      action: "Prioritise sufficient, consistent sleep",
      explanation:
        "to support balanced neurotransmitter regulation, cognitive performance, and physiological recovery.",
      match_lifestyle: [/sleep adequacy/i, /sleep regularity/i, /sleep timing/i, /sleep continuity/i],
    },
    {
      action: "Practise regular stress-management techniques",
      explanation:
        "to help maintain healthy stress recovery, balanced autonomic activity, and adaptive neurochemical signalling.",
      match_lifestyle: [
        /stress-management/i,
        /stress recovery/i,
        /stress regulation/i,
        /stress-load management/i,
        /mindfulness/i,
      ],
    },
    {
      action: "Engage in regular physical activity",
      explanation:
        "to support healthy neurotransmitter function, metabolic regulation, and long-term brain resilience.",
      match_lifestyle: [
        /regular physical activity/i,
        /physical activity and stress recovery/i,
        /post-meal physical activity/i,
        /aerobic activity/i,
      ],
    },
  ],

  BRS2: [
    {
      action: "Maintain regular daily meal timing",
      explanation:
        "to support steady methyl-donor and one-carbon nutrient availability across the day.",
      match_lifestyle: [/consistent daily meal timing/i, /meal timing/i, /one-carbon/i, /methyl-donor/i],
    },
    {
      action: "Prioritise sleep and stress recovery",
      explanation:
        "to help manage methylation demand and support broader one-carbon metabolism, alongside dietary substrate supply.",
      match_lifestyle: [/sleep and stress/i, /stress context/i, /methylation demand/i],
    },
  ],

  BRS3: [
    {
      action: "Maintain consistent daily meal timing",
      explanation:
        "to support lower inflammatory load and more stable antioxidant and resolution capacity over time.",
      match_lifestyle: [
        /consistent daily meal timing/i,
        /regular meal timing/i,
        /meal timing/i,
      ],
    },
    {
      action: "Prioritise sleep and manage stress load",
      explanation:
        "to help reduce systemic inflammatory pressure and support healthier immune and gut-related signalling.",
      match_lifestyle: [
        /sleep disruption/i,
        /stress overload/i,
        /stable sleep/i,
        /stress load/i,
      ],
    },
    {
      action: "Reduce exposure to smoke, pollution, and excess alcohol",
      explanation:
        "to lower avoidable oxidative and inflammatory burden on the body's defence and repair systems.",
      match_lifestyle: [/smoke, pollution, alcohol/i, /exposure reduction/i, /toxic and oxidative burden/i],
    },
  ],

  BRS4: [
    {
      action: "Engage in regular aerobic and resistance training",
      explanation:
        "to raise energy demand, support mitochondrial adaptation, and improve metabolic fuel flexibility over time.",
      match_lifestyle: [
        /aerobic and resistance/i,
        /aerobic and mixed-intensity/i,
        /regular aerobic/i,
        /exercise and metabolic conditioning/i,
        /training sessions/i,
      ],
    },
    {
      action: "Prioritise adequate sleep and recovery between activity",
      explanation:
        "to support cellular energy metabolism, mitochondrial repair, and adaptive remodelling rather than chronic under-recovery.",
      match_lifestyle: [
        /adequate sleep/i,
        /recovery between training/i,
        /recovery and sleep/i,
        /sleep loss/i,
        /sleep–wake timing/i,
        /sleep quality/i,
      ],
    },
    {
      action: "Maintain consistent daily meal timing",
      explanation:
        "to help keep energy substrates available and support steady mitochondrial throughput across the day.",
      match_lifestyle: [/consistent daily meal timing/i, /stable daily meal/i, /meal timing/i],
    },
    {
      action: "Reduce oxidant exposure from smoke, pollution, and excess alcohol",
      explanation:
        "to lower mitochondrial oxidative pressure and help preserve redox balance and protective capacity.",
      match_lifestyle: [/smoke, pollution/i, /lower oxidant exposure/i, /oxidative pressure/i, /oxidative burden/i],
    },
    {
      action: "Maintain consistent sleep–wake rhythms",
      explanation:
        "to support biological pathways involved in cellular energy production and NAD-related metabolism.",
      match_lifestyle: [/daily rhythms/i, /sleep–wake timing/i, /consistent daily rhythms/i],
    },
  ],

  BRS5: [
    {
      action: "Maintain consistent daily meal timing",
      explanation:
        "to support microbial rhythm stability, fermentation continuity, and steadier gut–brain signalling.",
      match_lifestyle: [/consistent meal timing/i, /meal regularity/i, /meal timing/i, /daily meal timing/i],
      match_pm_ids: [
        "BRS5-FM1-PM1",
        "BRS5-FM2-PM4",
        "BRS5-FM2-PM5",
        "BRS5-FM3-PM7",
      ],
    },
    {
      action: "Prioritise sleep and manage stress",
      explanation:
        "to reduce indirect strain on gut barrier integrity, endotoxin load, and enteric signalling stability.",
      match_lifestyle: [/sleep and manage stress/i, /sleep, stress/i, /stress recovery/i],
      match_pm_ids: ["BRS5-FM1-PM2", "BRS5-FM3-PM7", "BRS5-FM3-PM8"],
    },
    {
      action: "Limit alcohol exposure",
      explanation:
        "to reduce lifestyle-related barrier strain and support a more stable gut immune and microbial environment.",
      match_lifestyle: [/limit alcohol/i, /lower alcohol/i, /alcohol exposure/i],
      match_pm_ids: ["BRS5-FM1-PM1", "BRS5-FM1-PM2"],
    },
  ],

  BRS6: [
    {
      action: "Take regular physical activity and, where practical, a short walk after meals",
      explanation:
        "to help reduce blood sugar spikes after eating and support steadier metabolic regulation throughout the day.",
      match_lifestyle: [
        /post-meal walk/i,
        /post-meal walking/i,
        /aerobic activity/i,
        /regular aerobic/i,
        /resistance training/i,
        /lean mass/i,
        /glucose disposal/i,
        /glycaemic variability/i,
        /attenuate excursion/i,
        /physical activity with appropriate recovery/i,
      ],
    },
    {
      action: "Maintain consistent sleep and wake times",
      explanation:
        "to support healthy cortisol rhythm, lower stress-driven eating pressure, and more stable metabolic recovery.",
      match_lifestyle: [
        /sleep timing/i,
        /sleep regularity/i,
        /sleep continuity/i,
        /stable bed and wake/i,
        /sleep–wake timing/i,
        /duration stability/i,
      ],
    },
    {
      action: "Practise stress-management and recovery techniques",
      explanation:
        "to help maintain balanced autonomic activity, healthier appetite regulation, and adaptive stress responses.",
      match_lifestyle: [
        /stress regulation/i,
        /stress-load management/i,
        /mindfulness/i,
        /stress downshifting/i,
        /emotional and stress-eating/i,
        /evening cortisol spillover/i,
      ],
    },
    {
      action: "Get morning daylight and limit evening artificial light",
      explanation:
        "to strengthen circadian timing, support healthy sleep transitions, and align feeding with the daily light–dark cycle.",
      match_lifestyle: [
        /morning daylight/i,
        /morning and daytime light/i,
        /evening light/i,
        /evening artificial light/i,
        /melatonin/i,
        /circadian phase/i,
      ],
    },
    {
      action: "Use slow breathing and recovery routines after stress or exertion",
      explanation:
        "to support healthy transitions between activation and recovery and improve long-term autonomic flexibility.",
      match_lifestyle: [
        /slow breathing/i,
        /breathwork/i,
        /vagal-training/i,
        /recovery walks/i,
        /downshifting routines/i,
        /parasympathetic tone/i,
        /hrv/i,
      ],
    },
    {
      action: "Support healthy body composition through sustainable movement, sleep, and recovery",
      explanation:
        "to improve insulin sensitivity and reduce adipose-related inflammatory signalling over time.",
      match_lifestyle: [/visceral adiposity/i, /body composition/i, /insulin sensitivity and inflammatory/i],
    },
  ],

  "BRS-X(ECS)": [
    {
      action: "Prioritise sleep regularity and stress recovery",
      explanation:
        "to support endocannabinoid tone, stress buffering, and healthier dopamine-related motivation context.",
      match_lifestyle: [/sleep regularity/i, /stress recovery/i, /chronic stress/i, /chronic psychosocial stress/i],
    },
    {
      action: "Maintain regular meal timing",
      explanation:
        "to support steady dietary entry into endocannabinoid precursor pools across the day.",
      match_lifestyle: [/regular meal timing/i, /regular meal patterns/i, /meal timing/i],
    },
  ],

  "BRS-X(Hormones)": [
    {
      action: "Maintain regular physical activity, including post-meal movement",
      explanation:
        "to support insulin sensitivity, metabolic stability, and healthier hormone signalling context.",
      match_lifestyle: [/physical activity/i, /post-meal walking/i, /resistance training/i],
    },
    {
      action: "Prioritise sleep and stress recovery",
      explanation:
        "to help stabilise neuroendocrine context relevant to reproductive hormone balance and luteal-phase recovery.",
      match_lifestyle: [/sleep and stress/i, /stress recovery/i],
    },
    {
      action: "Limit unnecessary antibiotic exposure where clinically appropriate",
      explanation:
        "to help preserve microbial ecology that supports healthy steroid and androgen-related metabolism.",
      match_lifestyle: [/antibiotic/i, /estrobolome/i, /microbial steroid/i],
    },
  ],
};
