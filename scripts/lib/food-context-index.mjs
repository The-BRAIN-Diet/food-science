/**
 * Food page Food Context index — Preparation and Synergies for PM §4.2 linking.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { FOODS_DIR_DEFAULT, SKIP_SLUGS } from "./food-page-validation.mjs";

/** Common dietary tokens → food slugs (first match wins for single-food bullets). */
export const FOOD_ALIAS_GROUPS = {
  "oily fish": ["salmon", "sardines", "mackerel", "herring"],
  "marine-fat": ["salmon", "sardines", "mackerel"],
  "shellfish": ["mussels", "oysters", "clams"],
  "cruciferous": ["broccoli", "broccoli-sprouts", "cauliflower", "brussels-sprouts"],
  "sulphur vegetables": ["broccoli", "broccoli-sprouts", "cauliflower", "garlic"],
  "leafy greens": ["spinach", "kale", "swiss-chard"],
  legumes: ["lentils", "chickpeas", "black-beans", "kidney-beans"],
  berries: ["blueberries", "strawberries", "blackberries"],
  grains: ["oats", "barley", "quinoa", "brown-rice"],
  "whole grains": ["oats", "barley", "quinoa", "brown-rice"],
  nuts: ["almonds", "walnuts", "pistachios"],
  seeds: ["pumpkin-seeds", "chia-seeds", "flax-seeds", "sunflower-seeds"],
  "fermented foods": ["sauerkraut", "kimchi", "kefir", "greek-yogurt"],
  poultry: ["chicken", "turkey"],
  dairy: ["greek-yogurt", "cheddar-cheese", "milk"],
  soy: ["tofu", "tempeh", "edamame", "soy"],
};

function slugifyToken(token) {
  return token
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractFoodContextSubsection(body, subsection) {
  const fcMatch = body.match(/## Food Context\s*([\s\S]*?)(?=\r?\n## )/);
  if (!fcMatch) return [];
  const subRe = new RegExp(
    `### ${subsection}\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n### |\\r?\\n## )`,
  );
  const m = fcMatch[1].match(subRe);
  if (!m) return [];
  return m[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function registerAlias(map, alias, slug) {
  const key = alias.toLowerCase().trim();
  if (!key || key === "food") return;
  if (!map.has(key)) map.set(key, slug);
}

/**
 * @param {string} [rootDir]
 */
export function buildFoodContextIndex(rootDir = process.cwd()) {
  const foodsDir = path.join(rootDir, FOODS_DIR_DEFAULT);
  /** @type {Map<string, { slug: string, title: string, preparation: string[], synergies: string[], hasPreparation: boolean, hasSynergies: boolean }>} */
  const bySlug = new Map();
  /** @type {Map<string, string>} */
  const byName = new Map();

  if (!fs.existsSync(foodsDir)) {
    return { bySlug, byName, aliasGroups: FOOD_ALIAS_GROUPS };
  }

  for (const file of fs.readdirSync(foodsDir)) {
    if (!file.endsWith(".md")) continue;
    const slug = path.basename(file, ".md");
    if (SKIP_SLUGS.has(slug)) continue;

    const raw = fs.readFileSync(path.join(foodsDir, file), "utf8");
    const { data, content } = matter(raw);
    const title = String(data.title || slug).trim();
    const preparation = extractFoodContextSubsection(content, "Preparation");
    const synergies = extractFoodContextSubsection(content, "Synergies");

    const entry = {
      slug,
      title,
      preparation,
      synergies,
      hasPreparation: preparation.length > 0,
      hasSynergies: synergies.length > 0,
    };
    bySlug.set(slug, entry);

    registerAlias(byName, slug, slug);
    registerAlias(byName, title, slug);
    registerAlias(byName, slug.replace(/-/g, " "), slug);

    if (Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        registerAlias(byName, String(tag), slug);
      }
    }
  }

  for (const [alias, slugs] of Object.entries(FOOD_ALIAS_GROUPS)) {
    registerAlias(byName, alias, slugs[0]);
  }

  return { bySlug, byName, aliasGroups: FOOD_ALIAS_GROUPS };
}

/**
 * @param {string} token
 * @param {{ bySlug: Map, byName: Map, aliasGroups: Record<string, string[]> }} index
 * @returns {string[]}
 */
export function resolveFoodSlugs(token, index) {
  const norm = token.toLowerCase().trim();
  if (!norm) return [];

  const direct = index.byName.get(norm);
  if (direct && index.bySlug.has(direct)) return [direct];

  const slugGuess = slugifyToken(norm);
  if (index.bySlug.has(slugGuess)) return [slugGuess];

  for (const [alias, slugs] of Object.entries(index.aliasGroups)) {
    if (norm.includes(alias) || alias.includes(norm)) {
      return slugs.filter((s) => index.bySlug.has(s));
    }
  }

  const fuzzy = [];
  for (const [slug] of index.bySlug) {
    const words = norm.split(/[\s,/+-]+/).filter(Boolean);
    if (words.some((w) => w.length > 3 && slug.includes(w))) fuzzy.push(slug);
  }
  return [...new Set(fuzzy)].slice(0, 3);
}

export function foodContextLink(entry, section) {
  const anchor = section === "synergies" ? "synergies" : "preparation";
  const label = section === "synergies" ? "Synergies" : "Preparation";
  return `[${entry.title} — ${label}](/docs/foods/${entry.slug}#${anchor})`;
}
