/**
 * Display rounding.
 *
 * Recipe totals carry the full precision of the arithmetic, and that precision
 * is what validation and any daily aggregation must use. It is not the precision
 * the underlying records support: a food-composition table and a kitchen scale
 * do not jointly establish a meal to the nearest kilocalorie. These rules round
 * for the reader only, by unit and magnitude, so the same quantity is presented
 * the same way on every page.
 *
 * Rounding happens once, at the point of display. Never round before summing.
 */

/**
 * Step to round to, by unit and magnitude. A null step means "use decimals".
 * @type {Record<string, (abs: number) => {step?: number, decimals?: number}>}
 */
const RULES = {
  kcal: (abs) => (abs >= 100 ? {step: 10} : {decimals: 0}),
  g: (abs) => (abs >= 10 ? {decimals: 0} : abs >= 1 ? {decimals: 1} : {decimals: 2}),
  mg: (abs) =>
    abs >= 100 ? {step: 10} : abs >= 10 ? {decimals: 0} : abs >= 1 ? {decimals: 1} : {decimals: 2},
  µg: (abs) => (abs >= 100 ? {step: 10} : abs >= 10 ? {decimals: 0} : {decimals: 1}),
}

RULES.ug = RULES["µg"]
RULES.mcg = RULES["µg"]

/**
 * Human-readable statement of the rules, for documentation and the test suite.
 */
export const ROUNDING_RULES = [
  {unit: "kcal", rule: "nearest 10 at or above 100 kcal, otherwise nearest 1"},
  {unit: "g", rule: "nearest 1 at or above 10 g, 1 decimal from 1–10 g, 2 decimals below 1 g"},
  {
    unit: "mg",
    rule:
      "nearest 10 at or above 100 mg, nearest 1 from 10–100 mg, 1 decimal from 1–10 mg, " +
      "2 decimals below 1 mg",
  },
  {unit: "µg", rule: "nearest 10 at or above 100 µg, nearest 1 from 10–100 µg, 1 decimal below 10 µg"},
  {unit: "%", rule: "nearest 1, shown as <1% below 1"},
]

/** Rounded number for display. Returns null when the input is not a finite number. */
export function roundForDisplay(amount, unit) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return null
  const rule = RULES[String(unit || "").trim()]
  if (!rule) return amount
  const {step, decimals} = rule(Math.abs(amount))
  if (step) return Math.round(amount / step) * step
  return Number(amount.toFixed(decimals ?? 1))
}

/** Rounded value with its unit, e.g. `430 kcal`, `24 g`, `6.5 mg`. */
export function formatAmount(amount, unit) {
  const rounded = roundForDisplay(amount, unit)
  if (rounded == null) return "—"
  const abs = Math.abs(rounded)
  const decimals = Number.isInteger(rounded)
    ? 0
    : abs >= 10
      ? 1
      : abs >= 1
        ? 1
        : 2
  return `${rounded.toFixed(decimals)}${unit ? ` ${unit}` : ""}`
}

/**
 * The whole-number percentage a reader actually sees. Anything deciding what to
 * show a reader should ask this rather than rounding independently, so a value
 * cannot be admitted on one rounding and printed on another.
 */
export function displayPercent(pct) {
  if (typeof pct !== "number" || !Number.isFinite(pct)) return null
  return Math.round(pct)
}

/** Percentages read as coverage, so a sub-1% figure is stated as such rather than as 0%. */
export function formatPercent(pct) {
  const rounded = displayPercent(pct)
  if (rounded == null) return "—"
  if (pct > 0 && pct < 1) return "<1%"
  return `${rounded}%`
}

/**
 * Turn a stored `composition_basis` into a short record name for the public
 * table, plus the explanatory remainder for the assumptions list.
 *
 * `named food-page record (Blueberries, raw; FDC 171711)`
 *   → `USDA FDC 171711 — Blueberries, raw`
 * `USDA SR Legacy FDC 168917 (Quinoa, cooked). The Quinoa food page records…`
 *   → `USDA FDC 168917 — Quinoa, cooked` plus the trailing sentence as a note
 */
export function conciseCompositionRecord(basis) {
  const text = String(basis || "").replace(/\s+/g, " ").trim()
  if (!text) return {record: "—", note: null}

  const foodPage = text.match(/^named food-page record \(([^;]+); FDC (\d+)\)\s*(.*)$/i)
  if (foodPage) {
    return {record: `USDA FDC ${foodPage[2]} — ${foodPage[1].trim()}`, note: foodPage[3] || null}
  }

  const usda = text.match(/^USDA[^(]*?FDC (\d+)\s*\(([^)]+)\)\.?\s*(.*)$/i)
  if (usda) {
    return {record: `USDA FDC ${usda[1]} — ${usda[2].trim()}`, note: usda[3] || null}
  }

  // e.g. "USDA SR Legacy Honey FDC 169640 (no Honey food page on this site)"
  const bare = text.match(/FDC (\d+)/i)
  if (bare) return {record: `USDA FDC ${bare[1]}`, note: text}

  return {record: text, note: null}
}
