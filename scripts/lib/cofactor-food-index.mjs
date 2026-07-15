/**
 * Canonical substance ← food mappings for PM §4.1.2 Cofactors and Supporting Inputs.
 * @see system/substance-food-mapping-format.md
 */
import fs from "node:fs";
import path from "node:path";
import {
  SUBSTANCE_FOOD_ARROW,
  MAX_FOOD_EXAMPLES,
  collectSubstanceFoodMap,
  isSubstanceFoodBullet,
} from "./substance-food-mapping.mjs";

/** Normalized lookup key → canonical display label */
export const COFACTOR_CANONICAL_LABELS = {
  magnesium: "Magnesium",
  folate: "Folate (B9)",
  "folate (b9)": "Folate (B9)",
  "vitamin b12": "Vitamin B12",
  b12: "Vitamin B12",
  riboflavin: "Riboflavin (B2)",
  "riboflavin (b2)": "Riboflavin (B2)",
  b2: "Riboflavin (B2)",
  "vitamin b6": "Vitamin B6",
  b6: "Vitamin B6",
  "b6 (plp)": "B6 (PLP)",
};

/** Default foods when no corpus or same-page mapping exists */
export const CANONICAL_COFACTOR_FOODS = {
  Magnesium: ["leafy greens", "nuts", "seeds"],
  "Folate (B9)": ["leafy greens", "legumes", "liver"],
  "Vitamin B12": ["shellfish", "sardines", "eggs"],
  "Riboflavin (B2)": ["dairy", "eggs", "lean meat"],
  "Vitamin B6": ["poultry", "fish", "chickpeas"],
  "B6 (PLP)": ["poultry", "fish", "chickpeas"],
};

export const MIGRATABLE_COFACTOR_KEYS = new Set(Object.keys(COFACTOR_CANONICAL_LABELS));

function normalizeCofactorKey(raw) {
  return raw
    .replace(/\*\([^)]*\)\*/g, "")
    .trim()
    .toLowerCase();
}

function canonicalLabelFor(raw) {
  const key = normalizeCofactorKey(raw);
  if (key === "b6 (plp)" || /\(plp\)/i.test(raw)) {
    return raw.replace(/\s*\*\([^)]*\)\*/g, "").trim();
  }
  return COFACTOR_CANONICAL_LABELS[key] || null;
}

function substanceKeysForLookup(label) {
  const keys = new Set();
  const norm = normalizeCofactorKey(label);
  const canonical = COFACTOR_CANONICAL_LABELS[norm];
  if (canonical) keys.add(canonical);
  keys.add(label.replace(/\s*\*\([^)]*\)\*/g, "").trim());
  keys.add(label.trim());
  if (/^b12$/i.test(norm)) keys.add("B12");
  if (/^b6$/i.test(norm)) keys.add("B6");
  if (/^b2$/i.test(norm)) keys.add("B2");
  if (/magnesium/i.test(norm)) keys.add("Magnesium");
  if (/folate/i.test(norm)) keys.add("Folate");
  return [...keys];
}

function pickFoods(map, label) {
  for (const key of substanceKeysForLookup(label)) {
    const foods = map.get(key);
    if (foods?.size) return [...foods].slice(0, MAX_FOOD_EXAMPLES);
  }
  const canonical = canonicalLabelFor(label);
  if (canonical && CANONICAL_COFACTOR_FOODS[canonical]) {
    return CANONICAL_COFACTOR_FOODS[canonical];
  }
  return null;
}

function walkMdxFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMdxFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

function extractBulletBlock(content, headingPattern) {
  const re = new RegExp(
    `${headingPattern}[\\s\\S]*?(?:<div class="brs-fm-hub-panel" hidden>|</summary>)\\s*\\n([\\s\\S]*?)(?=\\n</div>|\\n</details>)`,
    "m",
  );
  return content.match(re)?.[1] || "";
}

export function buildCofactorFoodIndex(docsRoot) {
  const biologicalTargets = path.join(docsRoot, "biological-targets");
  /** @type {Map<string, Set<string>>} */
  const global = new Map();

  for (const filePath of walkMdxFiles(biologicalTargets)) {
    const content = fs.readFileSync(filePath, "utf8");
    const blocks = [
      extractBulletBlock(content, "<strong>4\\.1\\.1 Direct Dietary Levers</strong>"),
      extractBulletBlock(content, "<strong>4\\.1\\.2 Cofactors and Supporting Inputs</strong>"),
      extractBulletBlock(content, "<strong>4\\.1\\.3 KCs \\(Key Constraints\\)</strong>"),
      extractBulletBlock(content, "<summary><strong>4\\.1\\.1 Direct Dietary Levers</strong></summary>"),
      extractBulletBlock(content, "<summary><strong>4\\.1\\.3 KCs \\(Key Constraints\\)</strong></summary>"),
    ];
    for (const block of blocks) {
      if (!block) continue;
      const { map } = collectSubstanceFoodMap(block.split("\n"));
      for (const [sub, foods] of map) {
        if (!foods.size) continue;
        if (!global.has(sub)) global.set(sub, new Set());
        for (const f of foods) global.get(sub).add(f);
      }
    }
  }

  return global;
}

export function buildLocalCofactorMap(content) {
  const blocks = [
    extractBulletBlock(content, "<strong>4\\.1\\.1 Direct Dietary Levers</strong>"),
    extractBulletBlock(content, "<strong>4\\.1\\.3 KCs \\(Key Constraints\\)</strong>"),
    extractBulletBlock(content, "<summary><strong>4\\.1\\.1 Direct Dietary Levers</strong></summary>"),
    extractBulletBlock(content, "<summary><strong>4\\.1\\.3 KCs \\(Key Constraints\\)</strong></summary>"),
  ];
  /** @type {Map<string, Set<string>>} */
  const local = new Map();
  for (const block of blocks) {
    if (!block) continue;
    const { map } = collectSubstanceFoodMap(block.split("\n"));
    for (const [sub, foods] of map) {
      if (!foods.size) continue;
      if (!local.has(sub)) local.set(sub, new Set());
      for (const f of foods) local.get(sub).add(f);
    }
  }
  return local;
}

function parseCofactorBullet(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith("-")) return null;
  if (isSubstanceFoodBullet(trimmed)) return { kind: "mapped", line: trimmed };

  const annotationMatch = trimmed.match(/^-\s*(.+?)(\s*\*\([^)]+\)\*)\s*$/);
  if (annotationMatch) {
    return {
      kind: "bare",
      substance: annotationMatch[1].trim(),
      annotation: annotationMatch[2],
    };
  }

  const bare = trimmed.match(/^-\s*(.+?)\s*$/);
  if (!bare) return { kind: "other", line: trimmed };
  const substance = bare[1].trim();
  if (substance.includes("→") || substance.includes("←")) {
    return { kind: "other", line: trimmed };
  }
  return { kind: "bare", substance, annotation: "" };
}

export function renderCofactorBullet(substance, foods, annotation = "") {
  const display = canonicalLabelFor(substance) || substance;
  const foodList = foods.slice(0, MAX_FOOD_EXAMPLES).join(", ");
  return `- ${display} ${SUBSTANCE_FOOD_ARROW} ${foodList}${annotation}`;
}

export function transformCofactorSection(sectionText, { localMap, globalMap }) {
  const lines = sectionText.split("\n");
  let changed = false;
  const out = [];

  for (const line of lines) {
    const parsed = parseCofactorBullet(line);
    if (!parsed) {
      out.push(line);
      continue;
    }
    if (parsed.kind === "mapped" || parsed.kind === "other") {
      out.push(parsed.line);
      continue;
    }

    const key = normalizeCofactorKey(parsed.substance);
    if (!MIGRATABLE_COFACTOR_KEYS.has(key)) {
      out.push(line);
      continue;
    }

    const foods = pickFoods(localMap, parsed.substance) || pickFoods(globalMap, parsed.substance);
    if (!foods?.length) {
      out.push(line);
      continue;
    }

    const rendered = renderCofactorBullet(parsed.substance, foods, parsed.annotation || "");
    if (rendered !== line.trim()) changed = true;
    out.push(rendered);
  }

  return { section: out.join("\n"), changed };
}

export function renderPmCofactorLeverBlock(sectionText, context) {
  const { section } = transformCofactorSection(sectionText, context);
  const trimmed = section.trimEnd();
  return trimmed ? `${trimmed}\n` : "";
}
