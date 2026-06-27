/**
 * BRS hub dietary & lifestyle lever rollup — extract from PM pages, normalize, categorize.
 * @see system/brs-hub-levers-schema.md
 */

import fs from "node:fs";
import path from "node:path";
import { HUB_SIGNATURE_FOODS } from "../data/brs-hub-signature-foods.mjs";

export const DIETARY_CATEGORIES = [
  { id: "nutrient_dense_stars", label: "Target Foods" },
  { id: "healthy_fats_oils", label: "Healthy fats & oils" },
  { id: "protein_rich_foods", label: "Protein-rich foods" },
  { id: "legumes_pulses", label: "Legumes & pulses" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "whole_grains_carbohydrates", label: "Whole grains & carbohydrates" },
  { id: "fermented_foods", label: "Fermented foods" },
  { id: "herbs_spices_polyphenols", label: "Herbs, spices & polyphenol-rich foods" },
];

/** Hub pages currently expose only nutrient-dense stars (for now). */
export const HUB_DIETARY_CATEGORIES = DIETARY_CATEGORIES.filter((c) => c.id === "nutrient_dense_stars");

/** Signature whole foods — prefer nutrient-dense stars category when matched. */
export const SIGNATURE_FOODS = new Set([
  "salmon",
  "sardines",
  "mackerel",
  "eggs",
  "spinach",
  "broccoli",
  "lentils",
  "berries",
  "extra-virgin olive oil",
  "walnuts",
  "pumpkin seeds",
  "kefir",
  "fermented vegetables",
  "yogurt",
  "roe",
  "fish roe",
  "oats",
  "barley",
]);

/** Expand grouped labels into canonical food tokens. */
export const FOOD_EXPANSIONS = {
  "oily fish": ["salmon", "sardines", "mackerel"],
  "omega-3-rich fish": ["salmon", "sardines", "mackerel"],
  "omega-3–containing seafoods": ["salmon", "sardines", "mackerel", "shellfish"],
  "omega-3-rich foods": ["salmon", "sardines", "mackerel"],
  "epa/dha": ["salmon", "sardines", "mackerel"],
  "shellfish": ["mussels", "oysters", "clams", "mussels"],
  "crucifers": ["broccoli", "cauliflower", "brussels sprouts"],
  "sulphur vegetables": ["garlic", "onions", "leeks"],
  "alliums": ["garlic", "onions", "leeks"],
  "colourful vegetables": ["peppers", "carrots", "tomatoes", "leafy greens"],
  "leafy greens": ["spinach", "kale", "chard"],
  "fermented foods": ["yogurt", "kefir", "fermented vegetables", "miso", "tempeh"],
  "nuts": ["walnuts", "almonds", "brazil nuts"],
  "seeds": ["pumpkin seeds", "flaxseed", "chia seeds"],
  "seafood": ["salmon", "sardines", "mackerel", "shellfish"],
  "whole grains": ["oats", "barley", "brown rice", "quinoa"],
  "grains": ["oats", "barley", "brown rice"],
  "intact grains": ["oats", "barley", "brown rice"],
  "fruit": ["berries", "apples", "citrus"],
  "citrus": ["oranges", "lemons", "grapefruit"],
  "herbs": ["parsley", "basil", "oregano"],
  "spices": ["turmeric", "ginger", "cinnamon"],
  "polyphenol-rich foods": ["berries", "green tea", "extra-virgin olive oil", "cocoa"],
  "iron-rich foods": ["lean meat", "shellfish", "legumes", "spinach"],
  "magnesium-rich foods": ["leafy greens", "pumpkin seeds", "almonds"],
  "selenium-rich foods": ["brazil nuts", "seafood", "eggs"],
  "animal foods": ["eggs", "poultry", "fish", "lean meat"],
  "protein-rich foods": ["eggs", "poultry", "fish", "legumes", "dairy"],
  "meat-based foods": ["lean meat", "poultry"],
  "diverse plant foods": ["vegetables", "legumes", "whole grains", "fruit"],
  "varied vegetables": ["broccoli", "peppers", "carrots", "leafy greens"],
  "cooked-and-cooled potatoes": ["potatoes"],
  "minimally processed grains": ["oats", "barley", "brown rice"],
};

export const FOOD_ALIASES = {
  evoo: "extra-virgin olive oil",
  "extra virgin olive oil": "extra-virgin olive oil",
  "extra-virgin olive oil": "extra-virgin olive oil",
  oatmeal: "oats",
  "fish roe": "roe",
  roe: "roe",
  soybean: "soy",
  soybeans: "soy",
  yoghurt: "yogurt",
  vinegar: "vinegar",
  "fermented veggies": "fermented vegetables",
  sauerkraut: "fermented vegetables",
  kimchi: "fermented vegetables",
};

const DENYLIST = new Set([
  "",
  "2014]",
  "may slow gastric emptying",
  "may reduce rapid digestibility",
  "slow glucose entry",
  "intestinal glucose absorption",
  "direct human brain tissue accretion cannot be measured comparably)*",
  "krill oil *(in neonatal piglets",
  "pc-dha was ~1.9-fold more efficacious than triglyceride-dha for cerebral cortex dha accretion [liu et.",
  "ens rhythm support",
  "absorptive and ecological support",
  "amino-acid substrate support within varied fuel patterns",
  "broader metabolic-flexibility context",
  "broader substrate-flexibility context",
  "butyrate-supportive pattern",
  "diverse whole-food dietary pattern",
  "diverse whole-plant patterns",
  "ecological support inputs",
  "fermented foods plus diverse plant intake",
  "glycine/cysteine-supportive protein patterns",
  "improved precursor-handling environment",
  "lower endotoxin pressure",
  "niacin-rich foods and protein-rich whole foods",
  "precursor supply context",
  "protein-containing meals across the day",
  "reduced ecological destabilisation",
  "reduced exposure to heavily degraded fats and repeated high-heat cooking",
  "reduced fried and degraded oil exposure",
  "supportive ecological context",
  "supportive protein context",
  "varied whole plant foods supporting lower lps burden",
  "varied whole-plant dietary patterns",
  "whole foods supporting lower lps signalling",
  "whole-food meals supporting permissive reserve context",
  "broad plant diversity",
  "balanced protein",
  "carbohydrate",
  "and healthy fat combinations",
  "protein paired with fibre-rich whole foods",
  "protein-rich meals",
  "leafy greens with fat",
  "fat-soluble vitamins with avocado or olive oil",
  "pair plant-based iron with citrus",
  "vinegar or fermented acidic foods",
  "may blunt early post-prandial glucose appearance",
  "manganese food sources",
  "varied plant foods",
  "or pasta",
  "cooled starches",
  "resistant starch sources",
  "minimally processed staples",
  "minimally processed fat sources",
  "oily fish handled gently",
  "nuts and seeds protected from rancidity",
  "omega-3-rich fish eaten alongside antioxidant-rich plant foods",
  "legumes when metabolic context supports ketone production",
  "blackened foods",
  "boiling",
  "gentle roasting",
  "limiting deep frying",
  "lower-temperature cooking",
  "poaching",
  "repeatedly heated oils",
  "steaming",
  "stewing",
  "zinc",
  "copper",
  "selenium",
  "betaine",
  "choline",
  "folate",
  "b12",
  "omega-3",
  "omega-3 eggs",
  "algal oil",
  "krill oil",
  "soy lecithin",
]);

const CATEGORY_RULES = [
  {
    id: "healthy_fats_oils",
    re: /\b(extra-virgin olive oil|olive oil|avocado|walnuts?|almonds?|flaxseed|chia|pumpkin seeds?|brazil nuts?|peanuts?|salmon|sardines?|mackerel|roe|oily fish|omega-3|nuts|seeds|fish|clams?|mussels?|oysters?)\b/i,
  },
  {
    id: "protein_rich_foods",
    re: /\b(eggs?|poultry|turkey|chicken|fish|dairy|lean meat|red meat|beef|meat|shellfish|seafood|soy|tofu|complete protein|liver)\b/i,
  },
  {
    id: "legumes_pulses",
    re: /\b(legumes?|lentils?|beans?|chickpeas?|pulses?)\b/i,
  },
  {
    id: "vegetables",
    re: /\b(spinach|broccoli|kale|chard|leafy greens?|carrots?|peppers?|tomatoes?|garlic|onions?|leeks?|crucifers?|beetroot|mushrooms?|vegetables?|broccoli sprouts?|inulin|cauliflower|brussels sprouts?)\b/i,
  },
  {
    id: "fruits",
    re: /\b(berries|apples?|citrus|oranges?|lemons?|grapefruit|pomegranate|fruit)\b/i,
  },
  {
    id: "whole_grains_carbohydrates",
    re: /\b(oats?|barley|brown rice|rice|quinoa|whole grains?|grains?|potatoes?|pasta|pectin)\b/i,
  },
  {
    id: "fermented_foods",
    re: /\b(kefir|yogurt|yoghurt|fermented vegetables?|miso|tempeh|sauerkraut|kimchi|fermented)\b/i,
  },
  {
    id: "herbs_spices_polyphenols",
    re: /\b(green tea|tea|cocoa|herbs?|spices?|turmeric|ginger|saffron|polyphenol|basil|oregano|parsley|cinnamon|vinegar)\b/i,
  },
];

export const HUB_PAGES = {
  BRS1: "docs/biological-targets/neurotransmitter-regulation.md",
  BRS2: "docs/biological-targets/methylation-one-carbon-metabolism.md",
  BRS3: "docs/biological-targets/inflammation-oxidative-stress.md",
  BRS4: "docs/biological-targets/mitochondrial-function-bioenergetics.md",
  BRS5: "docs/biological-targets/gut-brain-axis-enteric-nervous-system.md",
  BRS6: "docs/biological-targets/metabolic-neuroendocrine-stress.md",
  "BRS-X(ECS)": "docs/biological-targets/brs-x/ecs/endocannabinoid-system.md",
  "BRS-X(Hormones)": "docs/biological-targets/brs-x/hormones/hormone-signalling-regulation.md",
};

/** Core BRS1–BRS6 hub rollups (primary rollout scope). */
export const CORE_BRS_HUBS = ["BRS1", "BRS2", "BRS3", "BRS4", "BRS5", "BRS6"];

/** BRS-specific first sentence for hub Key constraints commentary. */
export const KEY_CONSTRAINTS_INTRO = {
  BRS1:
    "Key dietary constraints include complete amino-acid availability through protein-inclusive meals, complementary food pairings where plant proteins are used, and steady supply of membrane and cofactor nutrients that support neurotransmitter synthesis and signalling.",
  BRS2:
    "Key dietary constraints include adequate methyl-donor intake from folate-, B12-, choline-, and betaine-rich whole foods, protein spread across the day, and dietary patterns that prevent chronic shortfall in methyl-donor availability.",
  BRS3:
    "Key dietary constraints include antioxidant substrate availability from diverse plant foods, balanced omega-3 and omega-6 fatty-acid intake, and dietary patterns that limit chronic inflammatory and oxidative load.",
  BRS4:
    "Key dietary constraints include steady energy from balanced meals across the day, sufficient B-vitamin, iron, and magnesium for mitochondrial function, and dietary patterns that avoid chronic energetic instability.",
  BRS5:
    "Key dietary constraints include adequate fermentable fibre, resistant starch, and diverse plant-food intake to support microbial diversity, microbial metabolism, and intestinal function.",
  BRS6:
    "Key dietary constraints include stable energy availability, dietary patterns that minimise blood sugar swings, consistent meal timing, and sufficient micronutrient and healthy fat intake to support metabolic adaptation and recovery.",
  "BRS-X(ECS)":
    "Key dietary constraints include phospholipid-rich whole foods, choline and NAPE precursor availability, and omega-3-supportive patterns that sustain endogenous lipid mediator formation.",
  "BRS-X(Hormones)":
    "Key dietary constraints include fermentable fibre and prebiotic substrate, diverse plant-polyphenol intake, and protein and micronutrient sufficiency supporting microbial hormone metabolism.",
};

/** BRS-specific strategy targets merged with PM pattern prose on hub pages. */
export const KEY_DIETARY_STRATEGY_TARGETS = {
  BRS1: [
    "Protein-inclusive meals",
    "B-vitamin-rich foods",
    "omega-3-rich foods",
    "glycaemic stabilisation",
    "food choices that support membrane fluidity and receptor function",
  ],
  BRS2: [
    "Methyl-donor-rich meals",
    "folate- and B12-containing foods",
    "choline and betaine sources",
    "distributed protein supporting one-carbon throughput",
  ],
  BRS3: [
    "Anti-inflammatory whole-food patterns",
    "antioxidant-rich vegetables and fruits",
    "omega-3 and omega-6 balance",
    "polyphenol-diverse intake",
  ],
  BRS4: [
    "Balanced macronutrient fuel delivery",
    "mitochondrial cofactor-rich foods",
    "sustained energy-substrate meals",
  ],
  BRS5: [
    "Fermentable-fibre intake",
    "plant-diversity patterns",
    "polyphenol-rich foods",
  ],
  BRS6: [
    "Glycaemic stabilisation",
    "mixed macronutrient meal matrices",
    "consistent meal timing",
    "lower ultra-processed load",
  ],
  "BRS-X(ECS)": [
    "Phospholipid-rich meals",
    "choline-containing foods",
    "polyphenol diversity",
    "omega-3-supportive patterns",
  ],
  "BRS-X(Hormones)": [
    "Fermentable fibre",
    "phytoestrogen-aware whole foods",
    "protein and micronutrient sufficiency",
    "plant-diversity patterns",
  ],
};

/** Optional hub prose override — when set, replaces merged bullet strategy on hub pages. */
export const KEY_DIETARY_STRATEGY_PROSE = {
  BRS1:
    "Prioritise protein at each meal so the brain has a steady supply of amino-acid precursors for neurotransmitter synthesis. Include B-vitamin-rich foods, omega-3-containing seafoods, and healthy fats from olive oil, nuts, and eggs that support cell membranes and receptor function. Build meals that combine protein, fibre-rich carbohydrates, and healthy fats to keep energy steady and support attention-relevant signalling.",
  BRS2:
    "Include folate-rich leafy greens, eggs, legumes, and liver where appropriate; choline from eggs, fish, and soy; and betaine from beets and spinach. Spread protein across the day rather than concentrating it in one meal. Choose whole foods that retain their B vitamins and methyl donors instead of highly processed alternatives that strip them away.",
  BRS3:
    "Centre meals on colourful vegetables, berries, herbs, and spices that provide natural antioxidants. Include oily fish, walnuts, flaxseed, and olive oil for omega-3 balance, and reduce reliance on ultra-processed foods and heavily fried or oxidised fats that add unnecessary inflammatory load. Eat a wide variety of plant foods rather than relying on high-dose isolated antioxidant supplements.",
  BRS4:
    "Build meals around dependable energy from protein, whole grains, legumes, and starchy vegetables. Include B-vitamin-rich foods, iron from lean meats and legumes, and magnesium from nuts, seeds, and greens to support how cells produce and use energy. Avoid long gaps without nourishment and favour minimally processed foods over options that leave energy pathways undersupported.",
  BRS5:
    "Eat a wide variety of plant foods daily — vegetables, fruits, legumes, whole grains, nuts, and seeds — to feed beneficial gut microbes. Include fermented foods where tolerated, and fermentable fibre from oats, barley, beans, and cooled potatoes. Prioritise minimally processed meals that support the gut lining rather than ultra-processed foods that disrupt microbial balance and barrier function.",
  BRS6:
    "Prioritise stable meal composition, consistent meal timing, and minimally processed foods that support sustained energy availability and metabolic flexibility. Build meals that combine protein, fibre-rich carbohydrates, and healthy fats; include protein-rich breakfasts where appropriate, polyphenol-rich plant foods, and omega-3-containing seafoods. Favour dietary patterns that minimise blood sugar swings and unnecessary inflammatory burden.",
  "BRS-X(ECS)":
    "Prioritise phospholipid-rich whole foods — eggs, oily fish, soy, and nuts — alongside choline-containing foods that support endocannabinoid precursor biology. Include omega-3-rich seafoods and a diverse range of polyphenol-rich plants to support endogenous lipid mediator formation through food rather than pharmacological receptor targeting.",
  "BRS-X(Hormones)":
    "Include fermentable fibre from vegetables, legumes, and whole grains to support microbial hormone metabolism. Eat a diverse range of plant foods across the week, phytoestrogen-containing whole foods where relevant to life stage, and adequate protein and micronutrients to support hormonal milieu through food-first patterns.",
};

const STRATEGY_OVERLAP_GROUPS = [
  ["protein", "amino acid", "amino-acid"],
  ["glycaemic", "glycemic", "glucose", "insulin", "post-prandial", "postprandial", "spike", "volatility"],
  ["methyl", "one-carbon", "folate", "choline", "betaine", "b12", "methionine"],
  ["omega-3", "omega 3", "omega-6", "omega 6", "fatty acid", "dha", "epa", "oily fish"],
  ["fibre", "fiber", "fermentable", "resistant starch", "prebiotic"],
  ["polyphenol", "plant diversity", "plant-diversity", "herb", "spice"],
  ["membrane", "phospholipid", "receptor"],
  ["antioxidant", "anti-inflammatory", "anti inflammatory"],
  ["macronutrient", "meal matrix", "meal timing", "timing", "ultra-processed", "ultra processed"],
  ["b-vitamin", "b vitamin", "cofactor", "mitochondrial"],
  ["barrier", "zinc", "vitamin a", "glutamine"],
];

function normalizeStrategyText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s*→.*$/, "")
    .replace(/[^a-z0-9\s/+.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function strategyGroupHits(text) {
  const normalized = normalizeStrategyText(text);
  const hits = new Set();
  for (let i = 0; i < STRATEGY_OVERLAP_GROUPS.length; i++) {
    if (STRATEGY_OVERLAP_GROUPS[i].some((term) => normalized.includes(term))) hits.add(i);
  }
  return hits;
}

function strategyItemsOverlap(a, b) {
  const ka = normalizeStrategyText(a);
  const kb = normalizeStrategyText(b);
  if (!ka || !kb) return false;
  if (ka === kb) return true;
  if (ka.includes(kb) || kb.includes(ka)) return true;

  const groupsA = strategyGroupHits(a);
  const groupsB = strategyGroupHits(b);
  for (const group of groupsA) {
    if (groupsB.has(group)) return true;
  }

  const tokensA = new Set(ka.split(" ").filter((token) => token.length > 4));
  const overlap = kb.split(" ").filter((token) => token.length > 4 && tokensA.has(token)).length;
  return overlap >= 2;
}

export function mergeDietaryStrategyTargets(brsId, extractedPatterns = []) {
  const seeds = KEY_DIETARY_STRATEGY_TARGETS[brsId] || [];
  const merged = [...seeds];

  for (const pattern of extractedPatterns) {
    const cleaned = String(pattern || "").trim();
    if (!cleaned) continue;
    if (merged.some((item) => strategyItemsOverlap(item, cleaned))) continue;
    merged.push(cleaned);
  }

  return merged;
}

const HUB_MARKERS = {
  start: "<!-- brs-hub-levers:start -->",
  end: "<!-- brs-hub-levers:end -->",
};

/** Food categories with no single page — expand to linked examples on hub rollups. */
export const FOOD_CATEGORY_EXPANSIONS = {
  berries: [
    { label: "Blueberries", food_slug: "blueberries" },
    { label: "Raspberries", food_slug: "raspberries" },
    { label: "Strawberries", food_slug: "strawberries" },
  ],
};

/** Explicit food-page slug overrides; null means no dedicated page (flag on hub). */
export const FOOD_PAGE_SLUG_OVERRIDES = {
  oats: "oats",
  barley: "barley",
  lentils: "lentils",
  chickpeas: "chickpeas",
  salmon: "salmon",
  sardines: "sardines",
  mackerel: "mackerel",
  eggs: "eggs",
  broccoli: "broccoli",
  spinach: "spinach",
  walnuts: "walnuts",
  kefir: "kefir",
  yogurt: "greek-yogurt",
  "greek yogurt": "greek-yogurt",
  "greek yogurt (plain, unsweetened)": "greek-yogurt",
  blueberries: "blueberries",
  raspberries: "raspberries",
  strawberries: "strawberries",
  "extra-virgin olive oil": "extra-virgin-olive-oil",
  "extra virgin olive oil": "extra-virgin-olive-oil",
  "fish roe": "salmon-roe",
  roe: "salmon-roe",
  "pumpkin seeds": "pumpkin-seeds",
  "fermented vegetables": "fermented-vegetables",
};

function normalizeFoodKey(label) {
  let key = String(label || "").trim().toLowerCase();
  key = FOOD_ALIASES[key] || key;
  return key;
}

export function resolveFoodPageSlug(label, explicitSlug) {
  if (explicitSlug === null) return null;
  if (explicitSlug) return explicitSlug;
  const key = normalizeFoodKey(label);
  if (Object.prototype.hasOwnProperty.call(FOOD_PAGE_SLUG_OVERRIDES, key)) {
    return FOOD_PAGE_SLUG_OVERRIDES[key];
  }
  return key.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function resolveFoodPageHref(label, explicitSlug, rootDir = process.cwd()) {
  const slug = resolveFoodPageSlug(label, explicitSlug);
  if (!slug) return { slug: null, href: null, missing_food_page: true };
  const file = path.join(rootDir, "docs/foods", `${slug}.md`);
  if (!fs.existsSync(file)) return { slug, href: null, missing_food_page: true };
  return { slug, href: `/docs/foods/${slug}`, missing_food_page: false };
}

function escapeHtml(text) {
  return String(text || "").replace(/</g, "&lt;");
}

function indexStarFoodPms(stars) {
  /** @type {Map<string, Array<{ id: string, href: string }>>} */
  const map = new Map();
  for (const item of stars || []) {
    const keys = [item.label, normalizeFoodKey(item.label)];
    for (const key of keys) {
      if (!map.has(key)) map.set(key, item.source_pms || []);
    }
  }
  return map;
}

function mergeStarFoodPms(entry, pmIndex) {
  const keys = [entry.label, ...(entry.match_foods || [])].map((value) => normalizeFoodKey(value));
  const merged = new Map();
  for (const key of keys) {
    for (const pm of pmIndex.get(key) || []) merged.set(pm.id, pm);
  }
  return [...merged.values()].sort((a, b) => a.id.localeCompare(b.id));
}

function mergeStarFoodSourcePms(a, b) {
  const map = new Map();
  for (const pm of [...(a || []), ...(b || [])]) map.set(pm.id, pm);
  return [...map.values()].sort((x, y) => x.id.localeCompare(y.id));
}

function dedupeStarFoodItems(items) {
  const byKey = new Map();
  for (const item of items) {
    const key = normalizeFoodKey(item.label);
    const existing = byKey.get(key);
    if (existing) {
      existing.source_pms = mergeStarFoodSourcePms(existing.source_pms, item.source_pms);
      existing.explanation = existing.explanation || item.explanation;
    } else {
      byKey.set(key, { ...item });
    }
  }
  return [...byKey.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function expandCategoryStarFoods(items, rootDir = process.cwd()) {
  const expanded = [];
  for (const item of items) {
    const options = FOOD_CATEGORY_EXPANSIONS[normalizeFoodKey(item.label)];
    if (options?.length) {
      for (const option of options) {
        const page = resolveFoodPageHref(option.label, option.food_slug, rootDir);
        expanded.push({
          label: option.label,
          food_slug: page.slug,
          food_href: page.href,
          missing_food_page: page.missing_food_page,
          explanation: item.explanation,
          source_pms: item.source_pms || [],
        });
      }
    } else {
      expanded.push(item);
    }
  }
  return dedupeStarFoodItems(expanded);
}

function expandCategoryFoodLabels(foods) {
  const out = new Set();
  for (const food of foods) {
    const options = FOOD_CATEGORY_EXPANSIONS[normalizeFoodKey(food)];
    if (options?.length) {
      for (const option of options) out.add(option.label);
    } else {
      out.add(food);
    }
  }
  return [...out].sort((a, b) => a.localeCompare(b));
}

export function enrichStarFoodItem(item, rootDir = process.cwd()) {
  const page = resolveFoodPageHref(item.label, item.food_slug, rootDir);
  return {
    ...item,
    food_slug: page.slug,
    food_href: page.href,
    missing_food_page: page.missing_food_page,
  };
}

export function applySignatureFoodRollup(brsId, rollup, rootDir = process.cwd()) {
  const curated = HUB_SIGNATURE_FOODS[brsId];
  const pmIndex = indexStarFoodPms(rollup.dietary?.nutrient_dense_stars || []);

  if (curated?.length) {
    rollup.dietary.nutrient_dense_stars = expandCategoryStarFoods(
      curated.map((entry) => {
        const page = resolveFoodPageHref(entry.label, entry.food_slug, rootDir);
        return {
          label: entry.label,
          food_slug: page.slug,
          food_href: page.href,
          missing_food_page: page.missing_food_page,
          explanation: entry.explanation,
          source_pms: mergeStarFoodPms(entry, pmIndex),
        };
      }),
      rootDir,
    );
    rollup.stats.nutrient_dense_stars = rollup.dietary.nutrient_dense_stars.length;
    return;
  }

  rollup.dietary.nutrient_dense_stars = expandCategoryStarFoods(
    (rollup.dietary.nutrient_dense_stars || []).map((item) => enrichStarFoodItem(item, rootDir)),
    rootDir,
  );
}

export function listPmMdxFiles(rootDir = process.cwd()) {
  const base = path.join(rootDir, "docs/biological-targets");
  const out = [];
  if (!fs.existsSync(base)) return out;

  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith(".mdx") && /-pm\d+-/.test(ent.name)) out.push(p);
    }
  }
  walk(base);
  return out.sort();
}

export function brsFromPath(filePath) {
  const norm = filePath.replace(/\\/g, "/");
  if (norm.includes("/brs-x/ecs/")) return "BRS-X(ECS)";
  if (norm.includes("/brs-x/hormones/")) return "BRS-X(Hormones)";
  const m = norm.match(/\/brs(\d+)\//);
  return m ? `BRS${m[1]}` : null;
}

export function parsePmMeta(content, filePath) {
  const fm = content.match(/^pm_id:\s*(.+)$/m)?.[1]?.trim();
  const rel = filePath.replace(/\\/g, "/").replace(/^.*?docs\/biological-targets\//, "");
  const href = `/docs/biological-targets/${rel.replace(/\.mdx$/, "")}`;
  const id =
    fm ||
    path
      .basename(filePath, ".mdx")
      .replace(/^brs-x-ecs-/i, "BRS-X(ECS-")
      .replace(/^brs-x-hormones-/i, "BRS-X(Hormones-")
      .replace(/^brs(\d+)-fm(\d+)-pm(\d+)/i, "BRS$1-FM$2-PM$3")
      .toUpperCase();
  return { id, href };
}

export function extractHubPanel(content, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<strong>${escaped}</strong>[\\s\\S]*?<div class="brs-fm-hub-panel" hidden>\\s*\\n([\\s\\S]*?)\\n</div>`,
  );
  return (content.match(re)?.[1] || "").trim();
}

function titleCaseFood(label) {
  const lower = label.toLowerCase();
  const special = {
    "extra-virgin olive oil": "Extra-virgin olive oil",
    soy: "Soy",
    roe: "Fish roe",
    epa: "EPA",
    dha: "DHA",
  };
  if (special[lower]) return special[lower];
  return lower
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function normalizeFoodToken(raw) {
  let token = String(raw || "")
    .replace(/\*\*/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/\[.*?\]/g, "")
    .trim()
    .toLowerCase();
  token = FOOD_ALIASES[token] || token;
  token = token.replace(/\s+/g, " ").trim();
  if (!token || DENYLIST.has(token)) return [];
  if (FOOD_EXPANSIONS[token]) return FOOD_EXPANSIONS[token].map((f) => normalizeFoodToken(f)).flat();
  if (token.length > 48) return [];
  if (/pattern|context|support|meal|intake|burden|exposure|processing|buffering|distribution|flexibility|moderate|paired|dominant|rich pattern/i.test(token)) {
    return [];
  }
  return [token];
}

function parseDietaryBullet(line) {
  const body = line.replace(/^-\s*/, "").trim();
  if (!body) return { foods: [], pattern: null };

  if (body.includes("←")) {
    const [lhs, rhs] = body.split("←").map((s) => s.trim());
    const foods = [];
    for (const segment of rhs.split(/;/)) {
      for (const plusPart of segment.split("+")) {
        for (const commaPart of plusPart.split(",")) {
          foods.push(...normalizeFoodToken(commaPart));
        }
      }
    }
    return { foods, pattern: null, substance: lhs };
  }

  const suchAs = [...body.matchAll(/\bsuch as ([^.;\n]+)/gi)].flatMap((m) =>
    m[1]
      .split(/\bmay\b/i)[0]
      .split(/,| and /)
      .flatMap((t) => normalizeFoodToken(t)),
  );
  const including = [...body.matchAll(/\bincluding ([^.;\n]+)/gi)].flatMap((m) =>
    m[1]
      .split(/\bmay\b/i)[0]
      .split(/,| and /)
      .flatMap((t) => normalizeFoodToken(t)),
  );
  const foods = [...suchAs, ...including];

  const isPattern =
    foods.length === 0 &&
    /meal|pattern|timing|intake|distribution|buffering|matrices|volatility|burden|exposure|preparation|co-ingestion/i.test(body);
  return { foods, pattern: isPattern ? body.replace(/\.$/, "") : null };
}

export function categorizeFood(food) {
  if (SIGNATURE_FOODS.has(food)) return "nutrient_dense_stars";
  for (const rule of CATEGORY_RULES) {
    if (rule.re.test(food)) return rule.id;
  }
  return null;
}

function normalizeLifestyleLine(line) {
  return line
    .replace(/^-\s*/, "")
    .replace(/\s*\(Evidence:[^)]+\)/gi, "")
    .replace(/\s*\[[^\]]+\]\s*$/g, "")
    .replace(/\s*→.*$/, "")
    .trim();
}

export function parseKcPanel(raw) {
  /** @type {Array<{ label: string, href: string }>} */
  const kcs = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    const linkMatch = trimmed.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (!linkMatch) continue;
    if (/^none listed$/i.test(linkMatch[1].trim())) continue;
    kcs.push({
      label: linkMatch[1].trim(),
      href: linkMatch[2].trim(),
    });
  }
  return kcs;
}

function parseFrontmatterSummary(content) {
  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return "";
  const block = fm[1];
  const quoted = block.match(/^summary:\s*['"](.+?)['"]\s*$/m);
  if (quoted) return quoted[1].trim();
  const folded = block.match(/^summary:\s*>-\s*\n([\s\S]*?)(?=\n[A-Za-z0-9_]+:|\n*$)/m);
  if (folded) {
    return folded[1]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ");
  }
  return "";
}

export function parseKcPageFoods(content) {
  const sec3 = content.match(/### 3\.[^\n]*\n([\s\S]*?)(?=\n### 4\.)/);
  if (!sec3) return [];
  const foods = new Set();
  for (const line of sec3[1].split("\n")) {
    if (!line.trim().startsWith("- ") || !line.includes("←")) continue;
    for (const food of parseDietaryBullet(line).foods) foods.add(food);
  }
  return [...foods];
}

export function parseKcPagePoolItems(content) {
  const sec3 = content.match(/### 3\.[^\n]*\n([\s\S]*?)(?=\n### 4\.)/);
  if (!sec3) return [];
  const items = [];
  for (const line of sec3[1].split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("- ")) continue;
    const body = trimmed.slice(2).trim();
    if (body.includes("←")) items.push(body.split("←")[0].trim());
    else items.push(body);
  }
  return items;
}

function normalizePoolToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/+.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function substanceMatchesKcPool(substance, poolItems) {
  const s = normalizePoolToken(substance);
  if (!s || !poolItems.length) return false;

  for (const pool of poolItems) {
    const p = normalizePoolToken(pool);
    if (!p) continue;
    if (s.includes(p) || p.includes(s)) return true;
    const sTokens = s.split(" ").filter((token) => token.length > 2);
    const pTokens = p.split(" ").filter((token) => token.length > 2);
    if (sTokens.some((st) => pTokens.some((pt) => st.includes(pt) || pt.includes(st)))) return true;
  }

  const poolText = poolItems.map(normalizePoolToken).join(" ");
  if (/amino acid|tryptophan|tyrosine|eaa|lnaa|protein/.test(poolText)) {
    return /tyrosine|tryptophan|protein|amino acid|glutamate|gaba|complete protein|complementary|indispensable/.test(s);
  }
  if (/fatty acid|epa|dha|omega|arachidonic/.test(poolText)) {
    return /dha|epa|omega|phospholipid|fatty acid|roe|krill|oily fish|fish oil/.test(s);
  }
  if (/choline|folate|betaine|b12|methyl|one-carbon|remethylation/.test(poolText)) {
    return /choline|folate|betaine|b12|methyl|liver|phosphatidylcholine|one-carbon/.test(s);
  }
  if (/fibre|fiber|resistant starch|inulin|pectin|gos/.test(poolText)) {
    return /fibre|fiber|starch|inulin|pectin|gos|fermentable/.test(s);
  }
  if (/polyphenol|plant diversity/.test(poolText)) {
    return /polyphenol|plant diversity|herb|spice|berry|tea|cocoa/.test(s);
  }
  if (/zinc|vitamin a|glutamine|omega-3|barrier/.test(poolText)) {
    return /zinc|vitamin a|glutamine|omega|seafood|protein|egg|liver|vegetable|seed|legume/.test(s);
  }
  if (/glucose|carbohydrate|macronutrient|fatty acid|amino acid/.test(poolText)) {
    return /glucose|carbohydrate|protein|fatty acid|amino acid|meal matrix|fibre|fiber|fat|protein-rich/.test(s);
  }
  if (/b vitamin|coq10|iron|magnesium|riboflavin|niacin|cofactor/.test(poolText)) {
    return /b vitamin|coq10|iron|magnesium|riboflavin|niacin|cofactor|vitamin/.test(s);
  }
  if (/phospholipid|nape|phosphatidyl|kennedy|choline/.test(poolText)) {
    return /phospholipid|nape|phosphatidyl|choline|kennedy|roe|liver|egg|soy|oat|legume|fish/.test(s);
  }
  if (/glucose|carbohydrate|macronutrient|meal matrix|energy substrate|dietary fat|dietary protein|slow-release|viscous|soluble fibre|soluble fiber/.test(poolText)) {
    return /fibre|fiber|protein|fat|carbohydrate|glucose|oat|barley|legume|grain|potato|rice|vinegar|ferment|macronutrient|meal|starch/.test(s);
  }
  if (/magnesium|vitamin c|b vitamin|micronutrient|omega-3|zinc|iron|lipid sufficiency|recovery/.test(poolText)) {
    return /magnesium|vitamin|omega|zinc|iron|seafood|fish|nut|seed|leafy|polyphenol|ferment|algae/.test(s);
  }
  return false;
}

function kcHrefToFilePath(rootDir, href) {
  const rel = href.replace(/^\/docs\/biological-targets\//, "").replace(/\/$/, "");
  return path.join(rootDir, "docs/biological-targets", `${rel}.mdx`);
}

export function enrichKeyConstraints(keyConstraints, pmRows, rootDir) {
  const pmById = new Map(pmRows.map((row) => [row.pmId, row]));

  return keyConstraints.map((kc) => {
    const filePath = kcHrefToFilePath(rootDir, kc.href);
    let summary = "";
    const foods = new Set();
    let kcPageFoods = [];
    let poolItems = [];

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      summary = parseFrontmatterSummary(content);
      kcPageFoods = parseKcPageFoods(content);
      poolItems = parseKcPagePoolItems(content);
      for (const food of kcPageFoods) foods.add(food);
    }

    if (foods.size === 0) {
      for (const pm of kc.source_pms) {
        const row = pmById.get(pm.id);
        if (!row) continue;
        for (const { substance, foods: substanceFoods } of row.substance_foods || []) {
          if (!substanceMatchesKcPool(substance, poolItems)) continue;
          for (const food of substanceFoods) foods.add(food);
        }
      }
    }

    if (foods.size === 0) {
      for (const pm of kc.source_pms) {
        const row = pmById.get(pm.id);
        if (!row) continue;
        for (const { food } of row.foods) foods.add(food);
      }
    }

    return {
      label: kc.label,
      href: kc.href,
      summary,
      foods: [...foods]
        .sort((a, b) => a.localeCompare(b))
        .map((food) => titleCaseFood(food)),
    };
  });
}

export function buildKeyConstraintsCommentary(foods, brsId) {
  if (!foods.length) return { commentary: "", showFoodList: false };
  const intro =
    KEY_CONSTRAINTS_INTRO[brsId] ||
    `Key constraints across this system are shared substrate and precursor pools that multiple ${brsId} mechanisms depend on.`;
  return {
    commentary: intro,
    showFoodList: true,
  };
}

export function collapseKeyConstraintsRollup(enrichedKcs, brsId) {
  const foods = new Set();
  for (const kc of enrichedKcs) {
    for (const food of kc.foods || []) foods.add(food);
  }
  const foodList = expandCategoryFoodLabels([...foods].sort((a, b) => a.localeCompare(b)));
  if (!foodList.length) return null;
  const { commentary, showFoodList } = buildKeyConstraintsCommentary(foodList, brsId);
  return {
    foods: foodList,
    commentary,
    show_food_list: showFoodList,
    kc_count: enrichedKcs.length,
  };
}

export function extractPmLevers(content, filePath) {
  const { id, href } = parsePmMeta(content, filePath);
  const dietaryRaw = extractHubPanel(content, "4.1.1 Direct Dietary Levers");
  const kcRaw = extractHubPanel(content, "4.1.3 KCs (Key Constraints)");
  const lifestyleRaw = extractHubPanel(content, "4.2 Lifestyle Levers");

  const foods = [];
  const patterns = [];
  const substance_foods = [];
  const key_constraints = parseKcPanel(kcRaw);

  for (const line of dietaryRaw.split("\n")) {
    if (!line.startsWith("- ")) continue;
    const parsed = parseDietaryBullet(line);
    if (parsed.pattern) patterns.push(parsed.pattern);
    if (parsed.substance && parsed.foods.length) {
      substance_foods.push({ substance: parsed.substance, foods: parsed.foods });
    }
    for (const food of parsed.foods) {
      foods.push({ food, pmId: id, pmHref: href });
    }
  }

  const lifestyle = [];
  for (const line of lifestyleRaw.split("\n")) {
    if (!line.startsWith("- ")) continue;
    const text = normalizeLifestyleLine(line);
    if (text) lifestyle.push({ text, pmId: id, pmHref: href });
  }

  return { pmId: id, pmHref: href, foods, patterns, lifestyle, key_constraints, substance_foods };
}

function mergeLifestyleLevers(items) {
  /** @type {Array<{ keys: Set<string>, label: string }>} */
  const blendGroups = [
    {
      keys: new Set(["circadian alignment", "consistent meal timing"]),
      label: "Consistent meal timing and circadian alignment",
    },
  ];

  const consumed = new Set();
  const merged = [];

  for (const group of blendGroups) {
    const matches = items.filter((item) => group.keys.has(item.label.toLowerCase()));
    if (matches.length < 2) continue;
    const source_pms = new Map();
    for (const match of matches) {
      consumed.add(match.label.toLowerCase());
      for (const pm of match.source_pms) source_pms.set(pm.id, pm);
    }
    merged.push({
      label: group.label,
      source_pms: [...source_pms.values()].sort((a, b) => a.id.localeCompare(b.id)),
    });
  }

  const rest = items.filter((item) => !consumed.has(item.label.toLowerCase()));
  return [...merged, ...rest].sort((a, b) => a.label.localeCompare(b.label));
}

export function rollupBrsLevers(pmRows) {
  /** @type {Map<string, { label: string, source_pms: Map<string, string> }>} */
  const foodMap = new Map();
  /** @type {Map<string, { label: string, source_pms: Map<string, string> }>} */
  const lifestyleMap = new Map();
  /** @type {Map<string, { label: string, href: string, source_pms: Map<string, string> }>} */
  const kcMap = new Map();
  const patterns = new Set();

  for (const row of pmRows) {
    for (const p of row.patterns) patterns.add(p);
    for (const kc of row.key_constraints || []) {
      if (!kcMap.has(kc.href)) {
        kcMap.set(kc.href, {
          label: kc.label,
          href: kc.href,
          source_pms: new Map(),
        });
      }
      kcMap.get(kc.href).source_pms.set(row.pmId, row.pmHref);
    }
    for (const { food, pmId, pmHref } of row.foods) {
      const key = food.toLowerCase();
      if (!foodMap.has(key)) {
        foodMap.set(key, { label: titleCaseFood(food), source_pms: new Map() });
      }
      foodMap.get(key).source_pms.set(pmId, pmHref);
    }
    for (const { text, pmId, pmHref } of row.lifestyle) {
      const key = text.toLowerCase();
      if (!lifestyleMap.has(key)) {
        lifestyleMap.set(key, { label: text, source_pms: new Map() });
      }
      lifestyleMap.get(key).source_pms.set(pmId, pmHref);
    }
  }

  /** @type {{ nutrient_dense_stars: Array<{ label: string, source_pms: Array<{ id: string, href: string }> }> }} */
  const dietary = { nutrient_dense_stars: [] };

  for (const [key, entry] of [...foodMap.entries()].sort((a, b) => a[1].label.localeCompare(b[1].label))) {
    if (categorizeFood(key) !== "nutrient_dense_stars") continue;
    dietary.nutrient_dense_stars.push({
      label: entry.label,
      source_pms: [...entry.source_pms.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([id, href]) => ({ id, href })),
    });
  }

  dietary.nutrient_dense_stars.sort((a, b) => a.label.localeCompare(b.label));

  const lifestyle = mergeLifestyleLevers(
    [...lifestyleMap.values()].map((entry) => ({
      label: entry.label,
      source_pms: [...entry.source_pms.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([id, href]) => ({ id, href })),
    })),
  );

  const key_constraints = [...kcMap.values()]
    .map((entry) => ({
      label: entry.label,
      href: entry.href,
      source_pms: [...entry.source_pms.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([id, href]) => ({ id, href })),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return {
    dietary,
    lifestyle,
    key_constraints,
    dietary_patterns: [...patterns].sort(),
    stats: {
      pm_count: pmRows.length,
      unique_foods: foodMap.size,
      unique_lifestyle: lifestyle.length,
      unique_key_constraints: key_constraints.length,
      nutrient_dense_stars: dietary.nutrient_dense_stars.length,
    },
  };
}

function renderPmTags(sourcePms) {
  if (!sourcePms.length) return "";
  const tags = sourcePms
    .map((pm) => `<a href="${pm.href}" class="brs-hub-lever-pm">${pm.id}</a>`)
    .join(" ");
  return ` <span class="brs-hub-lever-pms">${tags}</span>`;
}

function renderStarFoodItem(item) {
  const titleHtml = item.food_href
    ? `<a href="${item.food_href}" class="brs-hub-star-food-link"><strong>${escapeHtml(item.label)}</strong></a>`
    : `<strong class="brs-hub-star-food-link">${escapeHtml(item.label)}</strong>`;
  const missingFlag = item.missing_food_page
    ? ` <span class="brs-hub-star-food-missing">No food page yet</span>`
    : "";
  const why = item.explanation
    ? `<p class="brs-hub-star-food-why">${escapeHtml(item.explanation)}</p>`
    : "";
  return `<li class="brs-hub-star-food">${titleHtml}${missingFlag}${why}${renderPmTags(item.source_pms || [])}</li>`;
}

function renderCategoryBlock(category, items) {
  if (!items.length) return "";
  const cat = DIETARY_CATEGORIES.find((c) => c.id === category);
  const isStars = category === "nutrient_dense_stars";
  const listItems = isStars
    ? items.map((item) => renderStarFoodItem(item)).join("\n")
    : items.map((item) => `<li>${item.label}${renderPmTags(item.source_pms)}</li>`).join("\n");
  return `<div class="brs-fm-hub-item brs-hub-lever-category" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${cat?.label || category}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

<ul class="brs-hub-lever-list${isStars ? " brs-hub-star-food-list" : ""}">
${listItems}
</ul>

</div>
</div>
</div>`;
}

export function renderHubLeversHtml(rollup, brsId) {
  const dietaryBlocks = HUB_DIETARY_CATEGORIES.map((c) =>
    renderCategoryBlock(c.id, rollup.dietary[c.id] || []),
  )
    .filter(Boolean)
    .join("\n\n");

  const kcBlock =
    rollup.key_constraints?.foods?.length ?
      `<div class="brs-hub-levers-key-constraints">
<p class="brs-hub-levers-key-constraints-heading"><strong>Key constraints:</strong></p>
<p class="brs-hub-lever-kc-commentary">${rollup.key_constraints.commentary.replace(/</g, "&lt;")}</p>
${rollup.key_constraints.show_food_list ? `<p class="brs-hub-lever-kc-foods">${rollup.key_constraints.foods.map((food) => food.replace(/</g, "&lt;")).join(", ")}</p>` : ""}
</div>`
    : "";

  const strategyBlock =
    rollup.dietary_strategy_prose ?
      `<p class="brs-hub-levers-patterns"><strong>Key Dietary Strategy &amp; Targets:</strong> ${rollup.dietary_strategy_prose.replace(/</g, "&lt;")}</p>`
    : rollup.dietary_strategy_targets?.length ?
      `<p class="brs-hub-levers-patterns"><strong>Key Dietary Strategy &amp; Targets:</strong> ${rollup.dietary_strategy_targets
        .map((item) => item.replace(/</g, "&lt;"))
        .join(" · ")}</p>`
    : "";

  const lifestyleList =
    rollup.lifestyle?.length ?
      `<ul class="brs-hub-lever-list">
${rollup.lifestyle.map((item) => `<li>${item.label}${renderPmTags(item.source_pms)}</li>`).join("\n")}
</ul>`
    : "<p><em>No lifestyle priorities extracted from connected PM pages yet.</em></p>";

  return `${HUB_MARKERS.start}
<div class="brs-hub-levers">

<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>Dietary Strategy</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

${kcBlock}

${strategyBlock}

${dietaryBlocks || "<p><em>No dietary strategy items extracted from connected PM pages yet.</em></p>"}

</div>
</div>
</div>

<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>Lifestyle Priorities</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

<p class="brs-hub-levers-intro">Deduplicated lifestyle and behavioural priorities referenced across ${brsId} PM pages — educational context, not clinical prescription.</p>

${lifestyleList}

</div>
</div>
</div>

</div>
${HUB_MARKERS.end}`;
}

export function buildBrsHubLeversRegistry(rootDir = process.cwd()) {
  const byBrs = {};
  for (const file of listPmMdxFiles(rootDir)) {
    const brs = brsFromPath(file);
    if (!brs || !HUB_PAGES[brs]) continue;
    const content = fs.readFileSync(file, "utf8");
    if (!byBrs[brs]) byBrs[brs] = [];
    byBrs[brs].push(extractPmLevers(content, file));
  }

  const registry = {
    meta: {
      version: 2,
      description:
        "BRS hub dietary and lifestyle lever rollups — PM §4.1.1, §4.1.3 KCs, §4.2; BRS-specific Key constraints and Key Dietary Strategy & Targets copy.",
      generatedAt: new Date().toISOString(),
    },
    brs: {},
  };

  for (const [brsId, rows] of Object.entries(byBrs).sort()) {
    const rollup = rollupBrsLevers(rows);
    const enrichedKcs = enrichKeyConstraints(rollup.key_constraints, rows, rootDir);
    rollup.key_constraints = collapseKeyConstraintsRollup(enrichedKcs, brsId);
    rollup.dietary_strategy_prose = KEY_DIETARY_STRATEGY_PROSE[brsId] || null;
    rollup.dietary_strategy_targets = rollup.dietary_strategy_prose
      ? null
      : mergeDietaryStrategyTargets(brsId, rollup.dietary_patterns);
    delete rollup.dietary_patterns;
    rollup.stats.unique_key_constraints = enrichedKcs.length;
    applySignatureFoodRollup(brsId, rollup, rootDir);
    registry.brs[brsId] = rollup;
  }
  return registry;
}

export function patchHubPage(hubPath, html, rootDir = process.cwd()) {
  const full = path.join(rootDir, hubPath);
  let content = fs.readFileSync(full, "utf8");
  const block = html.trimEnd();

  const leversBlockRe = new RegExp(
    `\\n*${HUB_MARKERS.start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${HUB_MARKERS.end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n*`,
  );
  content = content.replace(leversBlockRe, "\n");

  // Hub pages often use a single newline before the next ## heading (not blank line).
  const insertAfterAmbition = /(## Ambition\n\n[^\n#][\s\S]*?)(\n## )/;
  if (!insertAfterAmbition.test(content)) {
    throw new Error(`${hubPath}: could not find insertion point after Ambition`);
  }
  content = content.replace(insertAfterAmbition, `$1\n\n${block}\n$2`);

  fs.writeFileSync(full, content);
}

export { HUB_MARKERS };
