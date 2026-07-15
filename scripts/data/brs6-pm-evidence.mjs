/**
 * Curated PM §5.1 Evidence Highlights for BRS6 (Metabolic & Neuroendocrine Regulation) — mechanism-qualifying only.
 * Keys: file basename. Values: { intro, blocks: [{ heading, body }], referenceNoteKeys?: [] }
 */

export const BRS6_PM_EVIDENCE = {
  "brs6-fm1-pm1-glucose-appearance-kinetics": {
    intro:
      "Gastric emptying, intestinal absorption, and post-prandial glucose appearance kinetics are well established. The studies below do not restate digestion biochemistry; they highlight meal-structure and sequencing findings that refine how the rate and timing of glucose entry is interpreted in practice.",
    blocks: [
      {
        heading: "Fibre intake and post-prandial glucose absorption",
        body: "Higher dietary fibre intake reduces post-prandial glucose responses through delayed gastric emptying and attenuated intestinal glucose absorption — supporting food-matrix buffering as a lever for glucose appearance kinetics rather than carbohydrate quantity alone [Reynolds et al., 2019].",
      },
      {
        heading: "Meal sequencing and preload effects",
        body: "Preloading protein, fat, or fibre before carbohydrate intake can increase GLP-1 secretion, delay gastric emptying, and attenuate the rate of post-prandial glucose appearance through coordinated incretin and absorption-kinetics effects [Kubota et al., 2020].",
      },
      {
        heading: "Acetic acid and acute glucose-entry modulation",
        body: "Acetic acid exposure at meals reduces post-prandial glycaemia and improves insulin sensitivity in high-carbohydrate meal contexts, supporting acidic meal components as acute modifiers of glucose appearance dynamics [Johnston et al., 2004].",
      },
      {
        heading: "Meal-level regulation of glucose entry",
        body: "Together, fibre density, intact food matrices, macronutrient buffering, and meal sequencing modify the temporal profile of glucose appearance after feeding — shaping the meal-level temporal profile of post-prandial glucose appearance [Reynolds et al., 2019]; [Kubota et al., 2020].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "reynolds_2019_30638909", label: "Reynolds et al. (2019)" },
      { citation_key: "kubota_2020_meal_sequence", label: "Kubota et al. (2020)" },
      { citation_key: "johnston_2004_14694010", label: "Johnston et al. (2004)" },
    ],
  },
  "brs6-fm1-pm2-glycaemic-variability-regulation": {
    intro:
      "Glycaemic variability as a distinct physiological construct is well established. The studies below highlight oscillatory glucose exposure and dynamic regulation findings that refine how post-prandial stability is interpreted — not average glucose or functional outcome claims.",
    blocks: [
      {
        heading: "Oscillatory glucose exposure and oxidative stress",
        body: "Acute glucose fluctuations activate oxidative stress more strongly than sustained hyperglycaemia, supporting glycaemic variability — not mean glucose alone — as a biologically meaningful regulatory target within BRS6(FM1) [Monnier et al., 2006].",
      },
      {
        heading: "Glycaemic variability as a dynamic regulatory construct",
        body: "The frequency, magnitude, and duration of glucose excursions across feeding cycles contribute to metabolic stability and reactive physiological stress demand independently of average glucose exposure [Monnier et al., 2006].",
      },
      {
        heading: "Exercise and excursion dynamics",
        body: "Short-term aerobic exercise training reduced the frequency, magnitude, and duration of glycaemic excursions despite relatively limited changes in traditional average-response measurements — illustrating variability as a modifiable dynamic target downstream of appearance and disposal [Mikus et al., 2012].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "monnier_2006_16638903", label: "Monnier et al. (2006)" },
      { citation_key: "mikus_2012_22311420", label: "Mikus et al. (2012)" },
    ],
  },
  "brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal": {
    intro:
      "Insulin-responsive glucose clearance biology is well established. The studies below highlight dietary-pattern and activity-context findings that refine how post-prandial disposal capacity is interpreted — not phenome or treatment-outcome claims.",
    blocks: [
      {
        heading: "Fibre-rich patterns and post-prandial glucose handling",
        body: "Higher fibre intake reduces post-prandial glucose responses and lowers the metabolic demand placed on glucose disposal systems after feeding — linking meal structure to insulin-responsive clearance context [Reynolds et al., 2019].",
      },
      {
        heading: "Physical activity and glucose disposal",
        body: "Post-meal walking and regular aerobic activity increase skeletal muscle glucose uptake and improve post-prandial glucose profiles — a primary lifestyle lever for insulin sensitivity and disposal efficiency represented by this PM [Colberg et al., 2016].",
      },
      {
        heading: "Dynamic glycaemic control beyond average glucose",
        body: "Short-term aerobic conditioning improved glycaemic excursion dynamics, supporting disposal capacity as a modifiable regulatory layer interacting with meal-level appearance and variability regulation [Mikus et al., 2012].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "reynolds_2019_30638909", label: "Reynolds et al. (2019)" },
      { citation_key: "colberg_2016_27926890", label: "Colberg et al. (2016)" },
      { citation_key: "mikus_2012_22311420", label: "Mikus et al. (2012)" },
    ],
  },
  "brs6-fm2-pm4-cortisol-rhythm-regulation": {
    intro:
      "Diurnal HPA-axis cortisol biology is well established. The studies below highlight circadian timing and gut–neuroendocrine modulation findings that refine how cortisol phase and amplitude are interpreted — not condition-specific phenome claims.",
    blocks: [
      {
        heading: "Circadian misalignment and cortisol disruption",
        body: "Circadian misalignment alters cortisol phase and amplitude with downstream metabolic and cardiovascular consequences, supporting timing coherence across light, sleep, and feeding as a mechanistic lever for HPA-axis regulation [Scheer et al., 2009].",
      },
      {
        heading: "Diurnal cortisol as a timing mechanism",
        body: "The characteristic morning cortisol peak and evening downshift coordinate stress responsiveness and metabolic signalling across the day — and stability of this rhythm shapes daily stress responsiveness and metabolic signalling [Scheer et al., 2009].",
      },
      {
        heading: "Gut-related modulation of waking cortisol",
        body: "Prebiotic intake reduced the waking cortisol response in healthy volunteers, illustrating how nutritional and gut–brain context can influence morning HPA-axis output without replacing core lifestyle timing levers [Schmidt et al., 2015].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "scheer_2009_19255424", label: "Scheer et al. (2009)" },
      { citation_key: "schmidt_prebiotic_2015", label: "Schmidt et al. (2015)" },
    ],
  },
  "brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment": {
    intro:
      "Feeding time as a peripheral circadian zeitgeber is well established. The studies below highlight chrononutrition and misalignment findings that refine how feeding-window structure entrains metabolic and neuroendocrine rhythms.",
    blocks: [
      {
        heading: "Time-restricted feeding and peripheral clock entrainment",
        body: "Time-restricted feeding without caloric reduction prevented metabolic disease in mice on a high-fat diet, supporting feeding-window structure as a mechanistic lever for circadian metabolic regulation [Hatori et al., 2012].",
      },
      {
        heading: "Chrononutrition and meal-timing biology",
        body: "The timing of food intake associates with metabolic outcomes independent of total calories alone; late eating and misaligned meal patterns are plausible contributors to peripheral clock dysregulation [Garaulet & Gómez-Abellán, 2014].",
      },
      {
        heading: "Circadian misalignment across timing cues",
        body: "When light, sleep, and feeding cues conflict, circadian misalignment propagates through metabolic and neuroendocrine systems — reinforcing timing coherence as a cross-cutting regulatory target within BRS6(FM2) [Scheer et al., 2009].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "hatori_2012_22608008", label: "Hatori et al. (2012)" },
      { citation_key: "garaulet_2014_24467926", label: "Garaulet & Gómez-Abellán (2014)" },
      { citation_key: "scheer_2009_19255424", label: "Scheer et al. (2009)" },
    ],
  },
  "brs6-fm3-pm6-sympathetic-activation-and-parasympathetic-recovery": {
    intro:
      "Sympathetic–parasympathetic balance biology is well established. The studies below highlight autonomic coupling and gut–vagal pathway findings that refine how activation–recovery cycles are interpreted — not functional outcome or condition claims.",
    blocks: [
      {
        heading: "HRV and autonomic stress-regulation biology",
        body: "Heart rate variability reflects the dynamic interplay between sympathetic and parasympathetic control and indexes stress-regulation physiology relevant to recovery capacity after demand [Thayer et al., 2012].",
      },
      {
        heading: "SAM and HPA co-activation under acute stress",
        body: "Acute stress engages coordinated sympatho-adreno-medullary and HPA-axis responses, with autonomic–endocrine coupling shaping the activation context from which parasympathetic recovery must follow [Wadsworth et al., 2019].",
      },
      {
        heading: "Gut–vagal pathways to autonomic signalling",
        body: "Ingestion of a Lactobacillus strain modulated central GABA receptor expression via the vagus nerve in mice, illustrating diet–microbiome routes to autonomic-relevant gut–brain signalling that may support downshifting after stress [Bravo et al., 2011].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "thayer_2012_22178086", label: "Thayer et al. (2012)" },
      { citation_key: "wadsworth_coactivation_2019", label: "Wadsworth et al. (2019)" },
      { citation_key: "bravo_ingestion_2011", label: "Bravo et al. (2011)" },
    ],
  },
  "brs6-fm3-pm7-vagal-tone-hrv-regulation": {
    intro:
      "Vagal tone and HRV-related autonomic biology is well established. The studies below highlight dietary and vagal-axis findings that refine how parasympathetic recovery signalling is interpreted — not depression treatment or phenome outcome claims.",
    blocks: [
      {
        heading: "Omega-3 context and HRV autonomic function",
        body: "Omega-3 fatty acid supplementation affected heart rate variability at rest and during acute stress, supporting dietary lipid context as a modulator of HRV-related autonomic function [Sauder et al., 2013].",
      },
      {
        heading: "Vagus nerve as a regulatory signalling axis",
        body: "Vagal pathways link brain, autonomic, and inflammatory signalling; vagal modulation influences stress-related neurocircuitry — establishing vagal tone as a mechanistic recovery axis rather than a behavioural proxy alone [Austelle et al., 2022].",
      },
      {
        heading: "Omega-3, inflammation, and stress-recovery physiology",
        body: "Omega-3 supplementation lowered inflammatory markers in a stressed cohort, illustrating nutrient context that may support broader stress-recovery physiology relevant to vagal and HRV signalling [Kiecolt-Glaser et al., 2011].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "sauder_effects_2013", label: "Sauder et al. (2013)" },
      { citation_key: "austelle_comprehensive_2022", label: "Austelle et al. (2022)" },
      { citation_key: "kiecolt-glaser_omega-3_2011", label: "Kiecolt-Glaser et al. (2011)" },
    ],
  },
  "brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling": {
    intro:
      "Metabolic-inflammatory and adipose stress-signalling biology is well established. The studies below highlight endotoxemia, adipose inflammatory tone, and dietary-pattern findings that refine how chronic metabolic load is interpreted — not phenome or treatment-outcome claims.",
    blocks: [
      {
        heading: "Metabolic endotoxemia and systemic inflammation",
        body: "Diet-induced gut barrier changes can increase bacterial lipopolysaccharide translocation into circulation, sustaining low-grade systemic inflammation through gut–immune–metabolic coupling — illustrating gut-derived endotoxin translocation and its inflammatory consequences [Mohammad & Thiemermann, 2021].",
      },
      {
        heading: "Adipose tissue as an inflammatory signalling organ",
        body: "In obesity and insulin-resistant states, adipose tissue releases cytokines and alters endocrine signalling; magnesium deficiency may potentiate oxidative stress and inflammatory processes within adipose tissue [Cazzola et al., 2024].",
      },
      {
        heading: "Omega-3 context and inflammatory resolution",
        body: "Omega-3 supplementation reduced inflammatory markers in a stressed cohort, supporting dietary fatty-acid context as a modifiable layer within metabolic-inflammatory signalling rather than isolated nutrient dosing [Kiecolt-Glaser et al., 2011].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "mohammad_role_2021", label: "Mohammad & Thiemermann (2021)" },
      { citation_key: "cazzola_magnesium_2024", label: "Cazzola et al. (2024)" },
      { citation_key: "kiecolt-glaser_omega-3_2011", label: "Kiecolt-Glaser et al. (2011)" },
    ],
  },
  "brs6-fm4-pm9-stress-induced-appetite-reward-drive-modulation": {
    intro:
      "Stress-related modulation of appetite and reward circuitry is well established. The studies below highlight neural reward-pathway and gut–cortisol findings that refine how stress-linked intake drive is interpreted — not phenome or mindfulness treatment-outcome claims.",
    blocks: [
      {
        heading: "Stress-eating and neural reward circuitry",
        body: "Stress-related overeating associates with altered functional connectivity between hypothalamic, reward, and default-mode networks — the neural substrate through which stress modulates appetite and reward drive [Torske et al., 2024].",
      },
      {
        heading: "Cortisol and stress-linked motivational signalling",
        body: "Cortisol and broader HPA-axis activity influence appetite and motivational drive under stress load; waking cortisol responses are modifiable through nutritional context that intersects this neuroendocrine substrate [Schmidt et al., 2015].",
      },
      {
        heading: "Gut–brain modulation of stress physiology",
        body: "Prebiotic intake reduced the waking cortisol response, illustrating a gut–brain pathway through which dietary context may indirectly influence stress-linked appetite and reward signalling without replacing meal-structure and stress-recovery levers [Schmidt et al., 2015].",
      },
    ],
    referenceNoteKeys: [
      { citation_key: "torske_mindfulness_2024", label: "Torske et al. (2024)" },
      { citation_key: "schmidt_prebiotic_2015", label: "Schmidt et al. (2015)" },
    ],
  },
};
