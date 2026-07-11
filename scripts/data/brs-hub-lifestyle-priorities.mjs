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
      action: "Maintain regular meal timing and circadian alignment",
      explanation:
        "to support a steady supply of neurotransmitter building blocks, metabolic regulation, and balanced brain signalling throughout the day.",
      match_lifestyle: [
        /meal timing/i,
        /circadian/i,
        /amino-acid availability across/i,
        /lnaa/i,
        /precursor (transport|bias)/i,
        /neurotransmitter bias/i,
      ],
    },
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
      action: "Maintain consistent daily eating patterns",
      explanation:
        "to support lower inflammatory load and more stable antioxidant and resolution capacity over time.",
      match_lifestyle: [
        /consistent daily pattern/i,
        /regular meal timing/i,
        /daily pattern quality/i,
        /daily patterning/i,
        /repeated weekly/i,
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
        /glycaemic routine/i,
        /erratic eating/i,
      ],
    },
    {
      action: "Reduce exposure to smoke, pollution, and excess alcohol",
      explanation:
        "to lower avoidable oxidative and inflammatory burden on the body's defence and repair systems.",
      match_lifestyle: [/smoke, pollution, alcohol/i, /exposure reduction/i, /toxic and oxidative burden/i],
    },
    {
      action: "Include cruciferous vegetables and marine fats regularly",
      explanation:
        "to support repeated dietary activation of antioxidant and resolution pathways rather than one-off intake.",
      match_lifestyle: [/crucifer/i, /marine-fat exposure/i, /marine-fat/i, /antioxidant coverage/i],
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
      action: "Maintain stable daily meal structure",
      explanation:
        "to help keep energy substrates available and support steady mitochondrial throughput across the day.",
      match_lifestyle: [/stable daily meal/i, /varied whole-food meals/i, /substrate continuity/i],
    },
    {
      action: "Reduce oxidant exposure from smoke, pollution, and excess alcohol",
      explanation:
        "to lower mitochondrial oxidative pressure and help preserve redox balance and protective capacity.",
      match_lifestyle: [/smoke, pollution/i, /lower oxidant exposure/i, /oxidative pressure/i, /oxidative burden/i],
    },
    {
      action: "Choose gentler cooking methods",
      explanation:
        "to reduce avoidable oxidative stress placed on mitochondrial protection and membrane integrity.",
      match_lifestyle: [/gentler cooking/i, /gentle cooking/i],
    },
    {
      action: "Boil high-oxalate leafy greens when oxalate load matters",
      explanation:
        "to reduce soluble oxalate, improve mineral bioavailability from iron- and magnesium-rich greens, and limit avoidable pressure on mitochondrial cofactor and redox networks.",
      match_pm_ids: ["BRS4-FM2-PM4", "BRS4-FM2-PM5"],
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
      action: "Maintain consistent daily meal patterns",
      explanation:
        "to support microbial rhythm stability, fermentation continuity, and steadier gut–brain signalling.",
      match_lifestyle: [/consistent meal timing/i, /meal regularity/i, /daily pattern consistency/i, /repeated daily/i],
    },
    {
      action: "Prioritise sleep and manage stress",
      explanation:
        "to help reduce indirect strain on gut barrier integrity, endotoxin load, and enteric signalling stability.",
      match_lifestyle: [/sleep, stress/i, /highly erratic eating/i, /meal irregularity/i],
    },
    {
      action: "Limit alcohol and ultra-processed food exposure",
      explanation:
        "to reduce barrier strain and support a healthier gut environment for microbial and immune balance.",
      match_lifestyle: [/lower alcohol/i, /ultra-processed food exposure/i, /barrier strain/i],
    },
    {
      action: "Emphasise repeated dietary pattern quality over short-term fixes",
      explanation:
        "to support keystone microbes, SCFA production, and durable gut ecological turnover rather than isolated bursts.",
      match_lifestyle: [
        /repeated pattern quality/i,
        /repeated dietary pattern/i,
        /repeated daily substrate/i,
        /repeated exposure matters/i,
        /short probiotic/i,
        /short-term/i,
        /gut reset/i,
        /detox/i,
      ],
    },
    {
      action: "Maintain dietary variety rather than overly restrictive eating",
      explanation:
        "to support microbial diversity, competitive ecological selection, and long-term gut resilience.",
      match_lifestyle: [/highly restrictive/i, /low-variety/i, /responder variability/i],
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
      action: "Maintain regular meal timing aligned with your daily rhythm",
      explanation:
        "to support glucose tolerance, insulin sensitivity, and more predictable energy regulation across the day.",
      match_lifestyle: [/meal timing and circadian/i, /feeding–sleep coherence/i, /circadian-aligned meal/i],
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
      action: "Support healthy body composition through sustainable nutrition, movement, sleep, and recovery",
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
      action: "Maintain regular meal patterns with phospholipid- and omega-3-rich foods",
      explanation:
        "to support dietary entry into endocannabinoid precursor pools and related signalling context.",
      match_lifestyle: [/regular meal patterns/i, /oily-fish/i, /omega-3 patterns/i, /phospholipid-rich/i, /ultra-processed low-phospholipid/i],
    },
    {
      action: "Limit ultra-processed, low-omega-3 dietary patterns",
      explanation:
        "to help preserve endocannabinoid-related signalling context supported by whole-food fat quality.",
      match_lifestyle: [/ultra-processed low-omega-3/i, /endocannabinoid degradation/i],
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
      action: "Emphasise repeated fermentable-fibre patterns over short probiotic bursts",
      explanation:
        "to support microbial steroid metabolism, estrobolome stability, and durable gut–hormone integration.",
      match_lifestyle: [/repeated daily fermentable/i, /repeated dietary fibre/i, /fermentable substrate/i],
    },
    {
      action: "Limit antibiotic overuse and ultra-processed low-fibre eating",
      explanation:
        "to help preserve microbial ecology that supports healthy steroid and androgen-related metabolism.",
      match_lifestyle: [/antibiotic/i, /ultra-processed low-fibre/i, /estrobolome/i, /microbial steroid/i],
    },
  ],
};
