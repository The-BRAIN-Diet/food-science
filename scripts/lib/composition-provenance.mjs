/**
 * Exact-food source matching and omega-3 identity, enforced at build time.
 *
 * Rules are defined in `system/food-nutrition-schema.md`. This module is the
 * single executable copy of them: the validator, the repair script and the
 * regression tests all read the same list rather than keeping three that drift.
 */
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import {FOODS_DIR_DEFAULT, getFoodSlugs} from "./food-page-validation.mjs"

/**
 * Records proven to describe a different food than the page that cited them.
 *
 * These are not near-misses. Retrieval succeeded every time, so the values are
 * real measurements — of canola, of sunflower oil, of a beech mushroom. A page
 * leaves this list only by finding a source for its own food, so re-citing one
 * of these ids would reinstate the substitution behind a repaired-looking page.
 */
export const SUBSTITUTED_RECORDS = {
  "mct-oil": {fdc_id: 748278, describes: "Oil, canola", identity_failure: "food"},
  "sunflower-lecithin": {
    fdc_id: 1750349,
    describes: "Oil, sunflower",
    identity_failure: "edible material and processing state",
  },
  "cordyceps-mushroom": {fdc_id: 2003603, describes: "Mushroom, beech", identity_failure: "species"},
  "reishi-mushroom": {fdc_id: 2003603, describes: "Mushroom, beech", identity_failure: "species"},
  "turkey-tail-mushroom": {
    fdc_id: 2003603,
    describes: "Mushroom, beech",
    identity_failure: "species",
  },
}

/** An 18:3 whose isomer the source never stated. Never ALA, never in a total. */
export const UNRESOLVED_FATTY_ACID_KEYS = ["pufa_18_3_unresolved_mg"]

/** Tolerance in mg when checking a published total against its components. */
const SUM_TOLERANCE_MG = 0.5

function nutritionOf(fm) {
  const values = fm?.nutrition_per_100g
  return values && typeof values === "object" ? values : {}
}

/**
 * A page whose cited record describes a different food fails as a whole panel.
 *
 * The nutrient that exposed the mismatch is not the extent of the damage: if
 * the record is the wrong food then its energy, its minerals and its protein
 * are the wrong food's too. Withdrawal therefore takes everything derived from
 * the record, and what remains must be qualitative and separately sourced.
 */
export function checkExactFoodMatch(fm, slug) {
  const issues = []
  const banned = SUBSTITUTED_RECORDS[slug]
  const cited = fm?.nutrition_source?.fdc_id

  if (banned && cited !== undefined && Number(cited) === banned.fdc_id) {
    issues.push(
      `cites FDC ${banned.fdc_id} (${banned.describes}), withdrawn from this page as a substituted record`,
    )
  }

  if (fm?.composition_status !== "withdrawn") return issues

  const record = fm.composition_withdrawn
  if (!record?.withdrawn_record) issues.push("withdrawn panel does not name the record it withdrew")
  if (!record?.reason) issues.push("withdrawn panel does not say why")
  if (!record?.queue) issues.push("withdrawn panel is not pointed at a review queue")

  if (Object.keys(nutritionOf(fm)).length) {
    issues.push("withdrawn panel still publishes quantitative values derived from another food")
  }
  if (fm.nutrition_source) {
    issues.push("withdrawn panel still cites the record its values came from")
  }
  if (fm.omega3_components) {
    issues.push("withdrawn panel still publishes omega-3 components")
  }

  for (const row of fm.nutrition_supplementary_sources || []) {
    if (typeof row?.value === "number") {
      issues.push(`withdrawn panel: ${row.key} carries a quantity with no established source`)
    }
  }

  return issues
}

/**
 * A published omega-3 total must be able to name its parts and equal their sum.
 *
 * The three quantities stay distinct: an individual acid, the EPA + DHA pair,
 * and a total of everything the source explicitly identified. A total that
 * cannot list what went into it is not a measurement, and an EPA + DHA sum is
 * not a total omega-3 — it omits ALA, DPA and any other n-3 in the record.
 */
export function checkOmega3Identity(fm) {
  const issues = []
  const values = nutritionOf(fm)
  const total = values.omega3_mg
  const components = fm?.omega3_components

  if (typeof total !== "number") {
    if (components !== undefined) issues.push("lists omega-3 components with no total")
    return issues
  }

  if (total === 0) {
    issues.push("stores a zero omega-3 total; an unmeasured nutrient is unknown, not absent")
  }
  if (!Array.isArray(components) || !components.length) {
    issues.push("publishes an omega-3 total that names no components")
    return issues
  }

  const sum = components.reduce((acc, c) => acc + (Number(c?.amount_mg) || 0), 0)
  if (Math.abs(sum - total) >= SUM_TOLERANCE_MG) {
    issues.push(`omega-3 total ${total} mg is not the sum of its components (${sum} mg)`)
  }

  for (const component of components) {
    if (!/n-3/.test(String(component?.identity))) {
      issues.push(`omega-3 component ${component?.nutrient} names no n-3 isomer`)
    }
    if (UNRESOLVED_FATTY_ACID_KEYS.includes(component?.nutrient)) {
      issues.push(`omega-3 total includes ${component.nutrient}, whose isomer was never stated`)
    }
  }

  if (typeof values.ala_mg === "number" && !components.some((c) => c?.nutrient === "ala_mg")) {
    issues.push("publishes ALA outside its own omega-3 total")
  }

  return issues
}

/** Every provenance and identity issue for one page. */
export function checkCompositionProvenance(fm, slug) {
  return [...checkExactFoodMatch(fm, slug), ...checkOmega3Identity(fm)]
}

export function runProvenanceValidation(foodsDir = FOODS_DIR_DEFAULT, onlySlug = null) {
  const failures = []
  for (const slug of getFoodSlugs(foodsDir)) {
    if (onlySlug && slug !== onlySlug) continue
    const file = path.resolve(process.cwd(), foodsDir, `${slug}.md`)
    const {data} = matter(fs.readFileSync(file, "utf8"))
    const issues = checkCompositionProvenance(data, slug)
    if (issues.length) failures.push({slug, issues})
  }
  return failures
}

export function printProvenanceReport(failures) {
  if (!failures.length) {
    console.log("OK: composition records match their own food and omega-3 totals name their parts\n")
    return
  }
  console.log(`FAIL: ${failures.length} page(s) with a composition provenance or identity fault:`)
  for (const {slug, issues} of failures) {
    console.log(`  ${slug}.md:`)
    for (const issue of issues) console.log(`    - ${issue}`)
  }
  console.log("")
}
