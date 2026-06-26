/**
 * Per-reference data-level labels for phenome and evidence layers.
 * @see system/phenome-relationship-schema.md — Reference data levels
 * @see system/phenome-relationship-review-methodology.md
 */

export const REFERENCE_DATA_LEVELS = new Set([
  "Human Outcome",
  "Human Study",
  "Human Mechanistic",
  "Animal Data",
  "Preclinical",
  "Mechanistic",
  "Theoretical",
  "Cellular / Molecular",
  "Mixed",
]);

/** Curated citation_key → data_level for phenome and evidence reference notes. */
export const CURATED_REFERENCE_DATA_LEVELS = {
  // BRS1 — membrane / amino acid / serotonin
  huss_supplementation_2010: "Human Study",
  mcnamara_role_2006: "Animal Data",
  "pei-chen_chang_personalised_2021": "Mechanistic",
  patrick_role_2019: "Mechanistic",
  liu_higher_2014: "Animal Data",
  colletti_advances_2021: "Mixed",
  "patted_omega-3_2024": "Mechanistic",
  fernstrom_lnna_2013: "Mechanistic",
  wang_dietary_2019: "Human Study",
  aquili_role_2020: "Mechanistic",
  f_w_reimherr_open_1987: "Human Outcome",
  oades_role_2010: "Mechanistic",
  briguglio_dietary_2018: "Human Study",
  shaw_emotion_2014: "Human Mechanistic",
  banerjee_does_2015: "Mechanistic",
  mariotti_dietary_2019: "Mechanistic",
  walrand_optimizing_2005: "Human Mechanistic",
  trommelen_anabolic_2023: "Human Mechanistic",
  moughan_diaas_2024: "Mechanistic",
  ashley_breakfast_1985: "Human Mechanistic",
  wurtman_effects_2003: "Human Mechanistic",
  macdonald_dopamine_2024: "Mechanistic",
  santos_como_2019: "Mechanistic",
  odonnell_norepinephrine_2012: "Mechanistic",
  beard_iron_2003: "Animal Data",
  derbyshire_role_2023: "Human Mechanistic",
  johansson_decreased_2013: "Human Mechanistic",
  maltezos_glutamateglutamine_2014: "Human Mechanistic",
  edden_reduced_2012: "Human Mechanistic",
  puts_reduced_2020: "Human Mechanistic",
  "m_mousain-bosc_1_improvement_2006": "Human Outcome",
  cataldo_comprehensive_2024: "Mechanistic",
  zhou_glutamate_2014: "Mechanistic",
  chai_pleiotropic_2025: "Mechanistic",
  clerc_magnesium_2013: "Preclinical",
  mamiya_precision_2021: "Mechanistic",
  "blasco-fontecilla_is_2023": "Human Study",
  mohammad_role_2021: "Mechanistic",

  // BRS4 — mitochondrial / bioenergetics
  tardy_vitamins_2020: "Human Study",
  crane_coq10_2001: "Mechanistic",
  pirinen_niacin_2020: "Human Outcome",
  avgerinos_creatine_2018: "Human Outcome",
  verlaet_oxidative_2019: "Human Mechanistic",
  packer_vitamin_1997: "Mechanistic",
  kyriazis_impact_2022: "Mechanistic",
  goodpaster_metabolic_flexibility_2017: "Mechanistic",
  de_guia_nad_2019: "Human Mechanistic",
  smith_metabolic_flexibility_2018: "Mechanistic",
  van_oudheusden_efficacy_2002: "Human Outcome",
  ramezani_ketone_2023: "Mechanistic",
  lopez_ojeda_ketone_2023: "Mechanistic",
  rose_butyrate_2018: "Mechanistic",
  singh_direct_2022: "Mixed",
  andreux_mitophagy_2019: "Human Outcome",
  hou_urolithin_2024: "Human Outcome",

  // BRS-X — hormones
  sarkar_microbiome_social_behaviour_2020: "Mechanistic",
  rusch_signalling_cognition_gut_microbiota_2023: "Mechanistic",
  maeng_estrogen_gut_microbiome_fear_extinction_2023: "Preclinical",
  jacobs_estrogen_dopamine_cognitive_processes_2011: "Mechanistic",
  dejong_female_specific_adhd_treatment_2024: "Mechanistic",
  proano_estradiol_glutamatergic_striatal_synapses_2024: "Preclinical",
  celec_testosterone_brain_behavioral_functions_2015: "Mechanistic",
  hudson_symptomatic_benefits_testosterone_treatment_2023: "Human Outcome",
  li_function_2023: "Mechanistic",
  depaoli_estrogen_insulin_resistance_2021: "Mechanistic",
  dafflitto_sex_hormone_gut_microbiota_2022: "Mechanistic",
  hu_gut_microbial_beta_glucuronidase_estrogen_2023: "Mechanistic",
  sui_gut_microbial_beta_glucuronidase_estrogen_reactivation_2021: "Mechanistic",
  ervin_estrobolome_beta_glucuronidase_2019: "Mechanistic",
  leao_in_vitro_female_gut_microbiome_sex_hormones_2025: "Preclinical",

  // BRS-X — ECS
  garani_endocannabinoid_2021: "Mechanistic",
  covey_endocannabinoid_2017: "Mechanistic",
  rodriguez_bambico_endocannabinoids_2009: "Preclinical",
  micale_endocannabinoid_mood_2013: "Preclinical",
  laksmidewi_endocannabinoid_2021: "Mechanistic",
  solinas_anandamide_2006: "Preclinical",
  thors_inhibition_2007: "Preclinical",
  watson_emerging_2019: "Mechanistic",
  "saleh-ghadimi_endocannabinoid_2020": "Mechanistic",
  meijerink_docosahexaenoylethanolamine_2011: "Preclinical",
  sean_davies_oatmeal_2018: "Human Study",

  // BRS3 — inflammation & oxidative stress
  batey_lipopolysaccharide_2024: "Human Mechanistic",
  zelicha_effect_2022: "Human Outcome",
  mohammad_role_2021: "Mechanistic",
  chang_cortisol_2020: "Human Mechanistic",
  "prehn-kristensen_reduced_2018": "Human Study",
  li_sodium_2024: "Mechanistic",
  cavaliere_butyrate_2022: "Mechanistic",
  gruter_propionate_2023: "Mechanistic",
  "hoyles_microbiome-host_2018": "Mechanistic",
  ferguson_omega3_2014: "Human Study",
  brown_associations_2025: "Human Mechanistic",
  serhan_resolvins_2011: "Mechanistic",
  wesselink_feeding_2019: "Human Study",
  tongjaroenbuangam_neuroprotective_2011: "Preclinical",
  camuesco_intestinal_2006: "Animal Data",
  fuloria_genistein_2022: "Preclinical",
  johnson_role_2014: "Mechanistic",
  bulut_malondialdehyde_2007: "Human Mechanistic",
  kurhan_dynamic_2021: "Human Mechanistic",
  miniksar_effect_2023: "Human Mechanistic",
  verlaet_rationale_2018: "Human Study",
  mocchegiani_role_2019: "Mechanistic",
  vertuani_antioxidants_2004: "Mechanistic",
  houghton_sulforaphane_2016: "Human Outcome",
  "shi_anti-oxidation_2021": "Mechanistic",
  klein_vitamin_2011: "Human Outcome",
  pachter_glycemic_2024: "Human Study",
  dufault_nutritional_2024: "Human Study",
  zhang_exploring_2025: "Mechanistic",
  jiang_dietary_2021: "Human Study",
  jiang_gut_2018: "Human Study",
  fielding_increases_2005: "Human Study",
  simopoulos_evolutionary_2011: "Mechanistic",
  marsland_systemic_2017: "Human Mechanistic",
  "solleiro-villavicencio_effect_2018": "Mechanistic",
  song_mitochondrial_2023: "Mechanistic",
  "kiecolt-glaser_omega-3_2011": "Human Outcome",
  gruber_impact_2023: "Mechanistic",
  bravo_ingestion_2011: "Animal Data",
  jackson_effects_2021: "Human Outcome",
  lopresti_saffron_2014: "Human Study",
  hollis_mitochondrial_2015: "Animal Data",
};

export function getReferenceDataLevel(citationKey) {
  return CURATED_REFERENCE_DATA_LEVELS[String(citationKey || "").trim()] ?? null;
}

export function normalizeReferenceDataLevel(value) {
  const v = String(value || "").trim();
  if (!v) return null;
  if (REFERENCE_DATA_LEVELS.has(v)) return v;
  return null;
}

export function enrichReferenceWithDataLevel(ref) {
  if (!ref || typeof ref !== "object") return ref;
  const existing = normalizeReferenceDataLevel(ref.data_level);
  if (existing) return { ...ref, data_level: existing };
  const fromKey = getReferenceDataLevel(ref.citation_key);
  if (fromKey) return { ...ref, data_level: fromKey };
  return ref;
}

export function referenceNoteFromKey(citationKey, label) {
  if (!citationKey) return null;
  const data_level = getReferenceDataLevel(citationKey);
  const note = {
    label: label || citationKey,
    citation_key: citationKey,
    href: `/docs/papers/BRAIN-Diet-References#${citationKey}`,
  };
  if (data_level) note.data_level = data_level;
  return note;
}

/** Build deduplicated reference notes from citation keys (optional label overrides). */
export function referenceNotesFromKeys(entries) {
  const seen = new Set();
  const out = [];
  for (const entry of entries) {
    const key = typeof entry === "string" ? entry : entry.citation_key;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const label = typeof entry === "string" ? undefined : entry.label;
    const note = referenceNoteFromKey(key, label);
    if (note) out.push(note);
  }
  return out;
}

export function phenomeRefToBibItem(ref) {
  const href =
    ref.href ||
    (ref.citation_key
      ? `/docs/papers/BRAIN-Diet-References#${ref.citation_key}`
      : "");
  const label = ref.label || ref.citation_key || href;
  const dataLevel =
    normalizeReferenceDataLevel(ref.data_level) ||
    getReferenceDataLevel(ref.citation_key);
  const item = { href, label };
  if (dataLevel) item.dataLevel = dataLevel;
  return item;
}

export function renderReferenceNotesBlock(references, { heading = "Reference data levels" } = {}) {
  if (!Array.isArray(references) || references.length === 0) return [];
  const items = references.map(phenomeRefToBibItem).filter((i) => i.href && i.label);
  if (!items.length) return [];
  const serialized = JSON.stringify(items).replace(/</g, "\\u003c");
  return [
    "",
    `#### (${heading})`,
    "",
    `<PhenomeBibLinks items={${serialized}} />`,
  ];
}

const REF_NOTES_HEADING = /^#### \(Reference data levels\)\s*\n\n<PhenomeBibLinks items=\{[\s\S]*?\} \/>\s*/m;

export function patchEvidenceReferenceNotes(content, referenceNotes) {
  const notesLines = renderReferenceNotesBlock(referenceNotes);
  if (!notesLines.length) return content;

  const notesBlock = notesLines.join("\n");

  const sectionMatch =
    content.match(
      /^### 5\.1 Evidence Highlights[\s\S]*?data-brs-fm-hub[\s\S]*?<strong>Evidence highlights — [^<]+<\/strong>[\s\S]*?<div class="brs-fm-hub-panel" hidden>\s*\n\n([\s\S]*?)<\/div>/m,
    ) ||
    content.match(
      /^### 5\.1 Evidence Highlights[\s\S]*?<details>\s*\n<summary><strong>Evidence highlights — [^<]+<\/strong><\/summary>\s*\n([\s\S]*?)<\/details>/m,
    );
  if (!sectionMatch) return content;

  let inner = sectionMatch[1];
  inner = inner.replace(REF_NOTES_HEADING, "");
  inner = `${inner.trimEnd()}\n${notesBlock}\n`;

  return content.replace(sectionMatch[0], sectionMatch[0].replace(sectionMatch[1], `\n${inner}`));
}
