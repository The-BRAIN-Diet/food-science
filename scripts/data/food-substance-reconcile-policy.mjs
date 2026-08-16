/**
 * Policy for reconciling editorial food tags with nutritional tables.
 *
 * Do not delete a valid food→contains relationship because it is omitted from
 * the public table. Category, trace, and amino-acid tags stay in the ontology
 * (substance-only / not substance cards as appropriate).
 *
 * Only incorrectly scoped relationships are dropped (e.g. Watermelon → Nitric
 * Oxide). Vitamin K2 on leafy greens is re-scoped to Vitamin K, not deleted.
 */
import {
  QUALITATIVE_PRESENT,
  SUBSTANCE_ONLY_BY_SLUG,
} from "../lib/food-truth-levels.mjs"

export { QUALITATIVE_PRESENT, SUBSTANCE_ONLY_BY_SLUG }

/** Delete only incorrectly scoped "contains" claims. */
export const DROP_TAGS_ALWAYS = new Set(["Nitric Oxide"])

/** Complete EAA inventories belong in the EAA section, not substance cards. */
export const EAA_LAUNDRY_TAGS = new Set([
  "Phenylalanine",
  "Threonine",
  "Valine",
  "Isoleucine",
  "Histidine",
  "Lysine",
  "Methionine",
  "Leucine",
  "Tryptophan",
  "Tyrosine",
  "Arginine",
  "Glycine",
])

/** Mechanistically notable amino acids kept as tagged substances (when USDA-quantified). */
export const EAA_KEEP_BY_SLUG = {
  turkey: ["Tryptophan"],
  soy: ["Tryptophan", "Tyrosine"],
  "pumpkin-seeds": ["Tryptophan", "Tyrosine"],
  "whey-protein": ["Leucine"],
  watermelon: ["Arginine"],
  "lupin-beans": ["Arginine"],
  tempeh: ["Tyrosine"],
  tofu: ["Tyrosine"],
  "cheddar-cheese": ["Tyrosine"],
  "parmesan-cheese": ["Tyrosine"],
}

export const AMINO_ACID_KEYS = {
  Tryptophan: "tryptophan_g",
  Tyrosine: "tyrosine_g",
  Leucine: "leucine_g",
  Lysine: "lysine_g",
  Arginine: "arginine_g",
  Glycine: "glycine_g",
  Methionine: "methionine_g",
}

export const K2_FOOD_SLUGS = new Set([
  "natto",
  "kimchi",
  "sauerkraut",
  "cheddar-cheese",
  "parmesan-cheese",
  "egg-yolks",
  "eggs",
  "butter",
  "ghee",
  "grass-fed-butter",
  "liver",
])

/** @deprecated Use SUBSTANCE_ONLY_BY_SLUG — these remain tagged, not dropped. */
export const TRACE_DROP_BY_SLUG = SUBSTANCE_ONLY_BY_SLUG

export const QUALITATIVE_COMPOUNDS = [
  {
    label: "Cyanidin",
    key: "cyanidin_qual",
    slugs: [
      "blueberries", "black-goji", "cherries", "cranberries", "grapes",
      "pomegranates", "raspberries", "strawberries", "tart-cherry",
    ],
    source: (title) =>
      `USDA Database for the Flavonoid Content of Selected Foods (Release 3.3) lists cyanidin glycosides in ${title}; individual cyanidin mass is not reported in the selected USDA SR Legacy composition record.`,
  },
  {
    label: "Delphinidin",
    key: "delphinidin_qual",
    slugs: ["aubergine", "blueberries", "grapes", "pomegranates"],
    source: (title) =>
      `USDA flavonoid database / Phenol-Explorer list delphinidin glycosides in ${title}; per-100 g of the isolated anthocyanidin is not in the selected USDA SR Legacy record.`,
  },
  {
    label: "Malvidin",
    key: "malvidin_qual",
    slugs: ["blueberries", "grapes"],
    source: (title) =>
      `USDA flavonoid database lists malvidin glycosides in ${title}; individual malvidin quantity is not in the selected USDA SR Legacy record.`,
  },
  {
    label: "Peonidin",
    key: "peonidin_qual",
    slugs: ["blueberries", "cherries", "cranberries", "grapes", "tart-cherry"],
    source: (title) =>
      `USDA flavonoid database lists peonidin glycosides in ${title}; individual peonidin quantity is not in the selected USDA SR Legacy record.`,
  },
  {
    label: "Petunidin",
    key: "petunidin_qual",
    slugs: ["blueberries", "grapes"],
    source: (title) =>
      `USDA flavonoid database lists petunidin glycosides in ${title}; individual petunidin quantity is not in the selected USDA SR Legacy record.`,
  },
  {
    label: "Pelargonidin",
    key: "pelargonidin_qual",
    slugs: ["pomegranates", "raspberries", "strawberries"],
    source: (title) =>
      `USDA flavonoid database / Phenol-Explorer list pelargonidin glycosides in ${title}; individual pelargonidin quantity is not in the selected USDA SR Legacy record.`,
  },
  {
    label: "Quercetin",
    key: "quercetin_qual",
    slugs: ["apples", "capers", "onions", "kale", "soy"],
    source: (title) =>
      `USDA Database for the Flavonoid Content of Selected Foods (Release 3.3) reports quercetin glycosides in ${title}; a single defensible per-100 g value is not taken from the abbreviated USDA nutrient panel.`,
  },
  {
    label: "Sulforaphane",
    key: "sulforaphane_qual",
    slugs: ["broccoli", "broccoli-sprouts"],
    source: (title) =>
      `Sulforaphane is formed from glucoraphanin in ${title} after myrosinase action; USDA SR Legacy does not report sulforaphane. Quantity depends on cultivar and preparation (Houghton 2016).`,
  },
  {
    label: "Glucoraphanin",
    key: "glucoraphanin_qual",
    slugs: ["broccoli-sprouts"],
    source: (title) =>
      `${title} are a concentrated dietary source of glucoraphanin, the precursor of sulforaphane. USDA SR Legacy has no broccoli-sprout record, so quantity is not established here.`,
  },
  {
    label: "CoQ10",
    key: "coq10_qual",
    slugs: ["beef", "heart", "liver", "mackerel", "pistachios", "sardines", "early-harvest-olive-oil"],
    source: (title) =>
      `Food-composition surveys report coenzyme Q10 in ${title} (e.g. Mattila & Kumpulainen 2001); USDA SR Legacy does not include a CoQ10 field.`,
  },
  {
    label: "Allicin",
    key: "allicin_qual",
    slugs: ["garlic"],
    source: (title) =>
      `Allicin is generated from alliin when ${title} is crushed; it is not a stable USDA composition analyte. Presence is preparation-dependent (Borlinghaus et al. 2014).`,
  },
  {
    label: "Nitrate",
    key: "nitrate_qual",
    slugs: ["beetroot"],
    source: (title) =>
      `${title} is a recognised dietary nitrate vegetable; USDA SR Legacy does not report nitrate. Quantity varies with cultivar, season and storage.`,
  },
  {
    label: "Cinnamaldehyde",
    key: "cinnamaldehyde_qual",
    slugs: ["cinnamon"],
    source: (title) =>
      `Cinnamaldehyde is the defining volatile of ${title} bark oil; it is not reported in USDA SR Legacy nutrient panels.`,
  },
  {
    label: "L-DOPA",
    key: "ldopa_qual",
    slugs: ["mucuna-beans"],
    source: (title) =>
      `${title} (Mucuna pruriens) are a documented food source of L-DOPA. USDA SR Legacy has no mucuna record, so quantity is not established here.`,
  },
  {
    label: "Citrulline",
    key: "citrulline_qual",
    slugs: ["watermelon"],
    source: (title) =>
      `${title} flesh and rind are documented dietary sources of L-citrulline; USDA SR Legacy does not report citrulline.`,
  },
  {
    label: "Genistein",
    key: "genistein_qual",
    slugs: ["edamame", "soy", "tempeh", "tofu"],
    source: (title) =>
      `USDA Database for the Isoflavone Content of Selected Foods lists genistein in ${title}; the selected SR Legacy proximate panel does not include isoflavones.`,
  },
  {
    label: "Epicatechin",
    key: "epicatechin_qual",
    slugs: ["cacao-nibs-raw"],
    source: (title) =>
      `Cocoa flavanol analyses report epicatechin in ${title}; USDA SR Legacy has no cacao-nibs record.`,
  },
  {
    label: "Catechin",
    key: "catechin_qual",
    slugs: ["cacao-nibs-raw"],
    source: (title) =>
      `Cocoa flavanol analyses report catechin in ${title}; USDA SR Legacy has no cacao-nibs record.`,
  },
  {
    label: "Oligomeric Procyanidins",
    key: "opc_qual",
    slugs: ["cacao-nibs-raw"],
    source: (title) =>
      `${title} contain oligomeric procyanidins typical of cacao; USDA SR Legacy does not quantify OPCs for this food.`,
  },
  {
    label: "Hydroxytyrosol",
    key: "hydroxytyrosol_qual",
    slugs: ["early-harvest-olive-oil", "extra-virgin-olive-oil"],
    source: (title) =>
      `Olive-oil phenol composition includes hydroxytyrosol in ${title}; USDA SR Legacy olive-oil records do not report individual phenols.`,
  },
  {
    label: "Tyrosol",
    key: "tyrosol_qual",
    slugs: ["early-harvest-olive-oil", "extra-virgin-olive-oil"],
    source: (title) =>
      `Olive-oil phenol composition includes tyrosol in ${title}; USDA SR Legacy does not report individual phenols.`,
  },
  {
    label: "Oleuropein",
    key: "oleuropein_qual",
    slugs: ["early-harvest-olive-oil"],
    source: (title) =>
      `${title} retains oleuropein-related secoiridoids typical of early-harvest fruit; USDA SR Legacy does not report oleuropein.`,
  },
  {
    label: "Oleocanthal",
    key: "oleocanthal_qual",
    slugs: ["early-harvest-olive-oil"],
    source: (title) =>
      `${title} is a documented source of oleocanthal; USDA SR Legacy does not report this phenol.`,
  },
  {
    label: "Oleacein",
    key: "oleacein_qual",
    slugs: ["early-harvest-olive-oil"],
    source: (title) =>
      `${title} is a documented source of oleacein; USDA SR Legacy does not report this phenol.`,
  },
  {
    label: "Phosphatidylcholine",
    key: "phosphatidylcholine_qual",
    slugs: [
      "mussels", "oysters", "salmon-roe", "trout-roe", "soy-lecithin",
      "sunflower-lecithin", "egg-yolks",
    ],
    source: (title) =>
      `${title} is a phospholipid-rich food in which phosphatidylcholine is a major choline form; USDA SR Legacy reports choline, not phosphatidylcholine specifically.`,
  },
  {
    label: "Taurine",
    key: "taurine_qual",
    slugs: ["clams", "cockles", "dark-meat-poultry", "mackerel", "scallops"],
    source: (title) =>
      `Taurine is a characteristic free amino sulfonic acid in ${title}; USDA SR Legacy does not include a taurine field.`,
  },
  {
    label: "Creatine",
    key: "creatine_qual",
    slugs: ["lamb", "liver", "pork", "scallops", "tuna", "turkey", "beef", "chicken"],
    source: (title) =>
      `Creatine occurs in ${title} muscle/organ tissue; USDA SR Legacy does not report creatine.`,
  },
  {
    label: "Polyphenols",
    key: "polyphenols_qual",
    slugs: ["coffee"],
    source: (title) =>
      `${title} is a dietary source of chlorogenic acids and related polyphenols; USDA SR Legacy does not report total polyphenols for brewed coffee.`,
  },
  {
    label: "Beta-Glucans",
    key: "beta_glucans_qual",
    slugs: ["maitake-mushroom", "oyster-mushroom", "shiitake-mushroom", "turkey-tail-mushroom"],
    source: (title) =>
      `${title} cell walls contain β-glucans; USDA SR Legacy mushroom records do not quantify β-glucans.`,
  },
  {
    label: "Polysaccharides",
    key: "polysaccharides_qual",
    slugs: ["cordyceps-mushroom", "lions-mane-mushroom", "reishi-mushroom", "turkey-tail-mushroom"],
    source: (title) =>
      `${title} is characterised by fungal polysaccharides; USDA SR Legacy has no record for this mushroom, so quantity is not established.`,
  },
  {
    label: "Vitamin K2",
    key: "vitamin_k2_qual",
    slugs: [...K2_FOOD_SLUGS],
    source: (title) =>
      `${title} is a documented dietary source of menaquinones (vitamin K2). USDA SR Legacy reports phylloquinone (vitamin K1), not K2, so K2 quantity is not established here.`,
  },
  {
    label: "Iodine",
    key: "iodine_qual",
    slugs: ["nori", "seaweed", "fortified-plant-milks"],
    source: (title) =>
      `${title} is used as a dietary iodine source; iodine is often absent from USDA SR Legacy nutrient panels, so quantity is not established for this page.`,
  },
  {
    label: "MCT",
    key: "mct_qual",
    slugs: ["mct-oil", "coconut-oil"],
    source: (title) =>
      `${title} is a medium-chain triglyceride source. Individual 6:0/8:0/10:0 acids are used when USDA reports them; otherwise presence of the MCT class is recorded without a single summed value.`,
  },
  {
    label: "Carotenoids",
    key: "carotenoids_qual",
    slugs: ["nori"],
    source: (title) =>
      `${title} contains mixed carotenoids; USDA laver records may list individual carotenoids, but the class total is not a USDA field.`,
  },
  {
    label: "Vitamin D",
    key: "vitamin_d_qual",
    slugs: ["mushrooms"],
    source: (title) =>
      `Vitamin D2 in ${title} depends on UV exposure and is not assumed from a generic raw white-mushroom USDA record when that record reports none.`,
  },
  {
    label: "Lycopene",
    key: "lycopene_qual",
    slugs: ["tomatoes", "watermelon"],
    source: (title) =>
      `${title} is a lycopene-containing food; used only when the selected USDA record omits lycopene.`,
  },
  {
    label: "Vitamin B3",
    key: "vitamin_b3_qual",
    slugs: ["cordyceps-mushroom", "lions-mane-mushroom", "reishi-mushroom", "turkey-tail-mushroom", "maitake-mushroom"],
    source: (title) =>
      `${title} is grouped with culinary mushrooms as a niacin-containing fungus; USDA SR Legacy has no record for this specialty mushroom, so quantity is not established.`,
  },
  {
    label: "Iron",
    key: "iron_qual",
    slugs: ["mankai"],
    source: (title) =>
      `${title} (Wolffia) is reported as an iron-containing duckweed in food-specific composition studies; USDA SR Legacy has no mankai record.`,
  },
  {
    label: "ALA",
    key: "ala_qual",
    slugs: ["mankai"],
    source: (title) =>
      `${title} contains alpha-linolenic acid in published duckweed analyses; USDA SR Legacy has no mankai record.`,
  },
  {
    label: "Vitamin B12",
    key: "vitamin_b12_qual",
    slugs: ["fortified-plant-milks", "nori", "nutritional-yeast", "cockles"],
    source: (title) =>
      `${title} is tagged for vitamin B12. Fortified products vary by brand; seaweed B12 may include analogues; abbreviated USDA panels may omit cobalamin. True cobalamin quantity is not established here.`,
  },
  {
    label: "Vitamin D",
    key: "vitamin_d_fortified_qual",
    slugs: ["fortified-plant-milks"],
    source: (title) =>
      `${title} supply vitamin D only when fortified; quantity varies by product and is not taken from a single USDA commodity record.`,
  },
  {
    label: "Vitamin E",
    key: "vitamin_e_qual",
    slugs: ["avocado-oil", "wheat-germ"],
    source: (title) =>
      `${title} is a recognised α-tocopherol food; the selected USDA SR Legacy record omits vitamin E, so quantity is not established from that panel.`,
  },
  {
    label: "Eriocitrin",
    key: "eriocitrin_qual",
    slugs: ["lemon"],
    source: (title) =>
      `${title} flavanones include eriocitrin; USDA SR Legacy does not report individual flavanones.`,
  },
  {
    label: "Hesperidin",
    key: "hesperidin_qual",
    slugs: ["lemon", "oranges"],
    source: (title) =>
      `${title} flavanones include hesperidin; USDA SR Legacy does not report individual flavanones.`,
  },
  {
    label: "Choline",
    key: "choline_qual",
    slugs: ["sunflower-lecithin", "tempeh", "tofu", "wheat-germ"],
    source: (title) =>
      `${title} is a choline-containing food; the selected USDA SR Legacy record omits choline, so quantity is not established from that panel.`,
  },
  {
    label: "Leucine",
    key: "leucine_qual",
    slugs: ["whey-protein"],
    source: (title) =>
      `${title} is defined by a high leucine fraction of whey protein; the selected USDA protein-powder record reports protein but not individual amino acids.`,
  },
  {
    label: "Zinc",
    key: "zinc_qual",
    slugs: ["cockles"],
    source: (title) =>
      `The USDA SR Legacy ${title} record is an abbreviated Alaska Native panel and omits zinc; quantity is not established from this record.`,
  },
  {
    label: "Selenium",
    key: "selenium_qual",
    slugs: ["cockles"],
    source: (title) =>
      `The USDA SR Legacy ${title} record is abbreviated and omits selenium; quantity is not established from this panel.`,
  },
  {
    label: "EPA",
    key: "epa_qual",
    slugs: ["cockles"],
    source: (title) =>
      `The USDA SR Legacy ${title} record is abbreviated and omits EPA; quantity is not established from this panel.`,
  },
  {
    label: "DHA",
    key: "dha_qual",
    slugs: ["cockles"],
    source: (title) =>
      `The USDA SR Legacy ${title} record is abbreviated and omits DHA; quantity is not established from this panel.`,
  },
  {
    label: "Vitamin B6",
    key: "vitamin_b6_qual",
    slugs: ["nutritional-yeast"],
    source: (title) =>
      `${title} B-vitamin content is typically from fortification and varies by product; USDA SR Legacy has no nutritional-yeast record.`,
  },
  {
    label: "Vitamin C",
    key: "vitamin_c_qual",
    slugs: ["black-goji", "broccoli-sprouts"],
    source: (title) =>
      `${title} contain ascorbate in food-specific analyses; USDA SR Legacy has no record for this food.`,
  },
]

export function qualitativeEntry(compound, title) {
  return {
    key: compound.key,
    label: compound.label,
    status: QUALITATIVE_PRESENT,
    amount_display: QUALITATIVE_PRESENT,
    source_note: compound.source(title),
  }
}

export const PAGES_TO_CREATE = [
  {
    slug: "sulforaphane",
    path: "docs/substances/bioactive-compounds/organosulfur/sulforaphane.md",
  },
  {
    slug: "glucoraphanin",
    path: "docs/substances/bioactive-compounds/organosulfur/glucoraphanin.md",
  },
]
