#!/usr/bin/env node
/**
 * Replace cited keys that point to aliases with canonical keys already in BRAIN-diet.bib.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, "docs");

/** Cited key → canonical bib key (both must not be duplicates of same DOI in UI). */
const ALIASES = {
  collaboration_homocysteine_1998: "collaboration_lowering_1998",
  huang_effect_2015: "tao_huang_effect_2015",
  derbyshire_choline_2023: "derbyshire_role_2023",
  yang_coenzyme_2009: "yang_combination_2009",
  packer_antioxidant_1997: "packer_vitamin_1997",
  ganzle_sourdough_2008: "ganzle_proteolysis_2008",
  wojcik_taurine_2009: "wojcik_potential_2010",
  fanet_tetrahydrobiopterin_2021: "fanet_tetrahydrobioterin_2021",
  fielding_nutritional_2005: "fielding_increases_2005",
  hensel_tyrosine_2019: "hensel_influence_2019",
  reimherr_tyrosine_1987: "f_w_reimherr_open_1987",
  aquili_tryptophan_2020: "aquili_role_2020",
  dinu_tryptophan_2023: "dinu_effects_2023",
  lyons_effect_1988: "lyons_serotonin_1988",
  briones_specialized_2025: "briones_role_2025",
  "ferguson_high-dose_2014": "ferguson_omega3_2014",
  martel_phospholipid_2011: "martel_dopamine_2011",
  wilson_phospholipid_2012: "wilson_gamma-frequency_2012", // value key quoted below if needed
  "pei-chen_chang_effects_2021": "chang_cortisol_2021",
  wilson_vitamin_2019: "wilson_disorders_2019",
  lukovac_homocysteine_2024: "lukovac_serum_2024",
  razavinia_effect_2024: "razavinia_vitamins_2024",
  dhir_thiamine_2019: "dhir_neurological_2019",
  hallberg_role_1989: "hallberg_iron_1989",
  taylor_phytate_2009: "taylor_dash-style_2009", // eslint-disable-line
  agh_zinc_2022: "agh_effect_2022",
  mocchegiani_zinc_2019: "mocchegiani_role_2019",
  zhai_metallothionein_2015: "zhai_dietary_2015",
  "huss_omega-3_2010": "huss_supplementation_2010",
  mohammad_lipopolysaccharide_2021: "mohammad_role_2021",
  li_butyrate_2024: "li_sodium_2024",
  macdonald_dopaminergic_2024: "macdonald_dopamine_2024",
  perreault_dopamine_2014: "perreault_heteromeric_2014",
  santos_effects_2019: "santos_como_2019",
  maltezos_glutamate_2014: "maltezos_glutamateglutamine_2014",
  banerjee_serotonin_2015: "banerjee_does_2015",
  oades_serotonin_2010: "oades_role_2010",
  losso_tart_2018: "losso_pilot_2018",
  kaplan_duckweed_2019: "kaplan_protein_2019",
  pawlak_vitamin_2013: "pawlak_how_2013",
  kramer_chamomile_2024: "kramer_apigenin_2024",
  hackett_symptomatic_benefits_testosterone_treatment_2023:
    "hudson_symptomatic_benefits_testosterone_treatment_2023",
};

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (/\.(md|mdx)$/.test(name)) files.push(p);
  }
  return files;
}

let total = 0;
for (const file of walk(DOCS_DIR)) {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const [from, to] of Object.entries(ALIASES)) {
    const pattern = `BRAIN-Diet-References#${from}`;
    if (text.includes(pattern)) {
      text = text.split(pattern).join(`BRAIN-Diet-References#${to}`);
      changed = true;
      total += 1;
    }
  }
  if (changed) fs.writeFileSync(file, text);
}

console.log(`Updated ${total} alias reference(s) across docs.`);
