import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import {NUTRIENT_LABELS} from "@site/src/data/nutritionTableMapping"
import {
  PENDING_NUTRITION_MESSAGE,
  calculateRecipeNutrition,
  materialContributors,
  selectPublicRows,
} from "@site/src/utils/recipeNutritionCalculate.mjs"
import {exceedsUpperLimit, referenceFor} from "@site/src/utils/nutrientReference.mjs"
import {
  conciseCompositionRecord,
  formatAmount,
  formatPercent,
} from "@site/src/utils/nutrientDisplay.mjs"

interface Tag {
  label: string
  permalink?: string
}

interface Document {
  title: string
  permalink: string
  description?: string
  order: number
  tags: Tag[]
  frontMatter: Record<string, unknown>
}

type TagToDocMap = Record<string, Document[]>

interface RecipeNutritionProps {
  details: Record<string, unknown>
}

/**
 * Shape of a `calculateRecipeNutrition` result. The calculator is plain
 * JavaScript so that Node test scripts and the site can share one
 * implementation; this declares the contract the component relies on.
 */
interface CalculatedNutrition {
  status: "pending" | "calculated"
  pendingReason?: string
  servings: number
  perServing: Record<string, number>
  byFood: Record<string, Record<string, number>>
  audit: {food: string; food_slug?: string | null; display?: string; weight_g: number; composition_basis?: string; conversion_source?: string}[]
  exclusions?: {display: string; reason: string}[]
  assumptions?: string[]
}

interface PublicRow {
  key: string
  group: "core" | "micronutrient" | "brain"
  amount: number | null
  label?: string
  unresolvedReason?: string
  pct?: number
  basis?: string
}

const NUTRIENT_UNIT: Record<string, string> = {
  kcal: "kcal",
  protein_g: "g",
  fat_g: "g",
  sat_fat_g: "g",
  carbs_g: "g",
  sugar_g: "g",
  fibre_g: "g",
  sodium_mg: "mg",
}

const BASIS_SUFFIX: Record<string, string> = {rda: "RDA", ai: "AI"}

const TABLE: React.CSSProperties = {width: "100%", borderCollapse: "collapse"}
const TH_LEFT: React.CSSProperties = {textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}
const TH_RIGHT: React.CSSProperties = {textAlign: "right", padding: "8px", borderBottom: "2px solid #ccc"}
const TD_LEFT: React.CSSProperties = {padding: "8px", borderBottom: "1px solid #eee"}
const TD_RIGHT: React.CSSProperties = {padding: "8px", borderBottom: "1px solid #eee", textAlign: "right"}
const DETAILS: React.CSSProperties = {marginTop: "0.75rem"}
const SUMMARY: React.CSSProperties = {cursor: "pointer", color: "var(--ifm-color-primary)"}
const NOTE: React.CSSProperties = {fontSize: "0.85em", color: "var(--ifm-color-content-secondary)"}

function unitFor(key: string): string {
  return NUTRIENT_LABELS[key]?.unit || NUTRIENT_UNIT[key] || (key.endsWith("_ug") ? "µg" : "mg")
}

function labelFor(key: string, fallback?: string): string {
  return fallback || NUTRIENT_LABELS[key]?.label || key
}

/** Conversions worth stating. "Recipe-stated grams" tells the reader nothing. */
function isInformativeConversion(source: string | null | undefined): boolean {
  if (!source) return false
  return !/^recipe[- ]stated/i.test(source.trim()) && source.trim() !== "recipe_nutrition.grams"
}

/**
 * RecipeNutrition component
 *
 * The single published source of per-serving figures for a recipe. Recipe prose
 * must not restate these numbers: a hand-typed second copy drifts from the
 * calculation, which is how a page came to show two different carbohydrate and
 * fat totals at once.
 *
 * Values are rounded for display only. `perServing` keeps full precision for
 * validation and for aggregation across a day.
 */
export default function RecipeNutrition({details}: RecipeNutritionProps): React.ReactElement {
  const allTags = usePluginData("category-listing") as TagToDocMap

  if (!details) {
    return <div>Error: Recipe details (frontMatter) is required</div>
  }

  const allDocs = Object.values(allTags).flat()
  const foods = Array.from(
    new Map(
      allDocs
        .filter((doc: Document) => doc.permalink.includes("/foods/"))
        .map((doc: Document) => [doc.permalink, doc]),
    ).values(),
  )

  const nutrition = calculateRecipeNutrition(details, foods) as unknown as CalculatedNutrition

  if (nutrition.status !== "calculated") {
    return (
      <div>
        <p style={{marginBottom: nutrition.pendingReason ? "0.25rem" : undefined}}>
          {PENDING_NUTRITION_MESSAGE}
        </p>
        {nutrition.pendingReason ? <p style={NOTE}>{nutrition.pendingReason}</p> : null}
      </div>
    )
  }

  const publicRows = selectPublicRows(nutrition, details) as PublicRow[]
  const summaryRows = publicRows.filter((row) => row.group === "core")
  const micronutrientRows = publicRows.filter((row) => row.group === "micronutrient")
  const bioactiveRows = publicRows.filter((row) => row.group === "brain")
  const unresolvedNotes = summaryRows
    .filter((row) => row.amount == null && row.unresolvedReason)
    .map((row) => ({key: row.key, reason: row.unresolvedReason as string}))
  const exclusions = nutrition.exclusions || []
  const assumptions = nutrition.assumptions || []

  /** Material qualifications on a headline number belong beside it, not three clicks away. */
  const summaryCaveats = assumptions.filter((item) => /^sodium\b/i.test(item))
  const deferredAssumptions = assumptions.filter((item) => !summaryCaveats.includes(item))

  const cautions = micronutrientRows
    .filter((row) => exceedsUpperLimit(row.key, row.amount))
    .map((row) => ({
      key: row.key,
      ul: referenceFor(row.key)?.ul as number,
    }))

  const provenanceRows = summaryRows
    .filter((row) => row.amount != null)
    .map((row) => ({
      key: row.key,
      contributors: materialContributors(row.key, nutrition.byFood, row.amount as number),
    }))
    .filter((row) => row.contributors.length > 0)

  const conversions = (nutrition.audit || [])
    .filter((row) => isInformativeConversion(row.conversion_source))
    .map((row) => `${row.display || row.food}: ${row.conversion_source}`)

  const recordNotes = (nutrition.audit || [])
    .map((row) => ({
      display: row.display || row.food,
      note: conciseCompositionRecord(row.composition_basis).note,
    }))
    .filter((row) => row.note)
    .map((row) => `${row.display}: ${row.note}`)

  return (
    <div className="recipe-nutrition-block" id="recipe-nutrition">
      <p style={{fontSize: "0.9em", color: "var(--ifm-color-content-secondary)", marginTop: 0}}>
        Per serving{nutrition.servings > 1 ? `, recipe serves ${nutrition.servings}` : ""}. Each
        included ingredient is scaled from a named per-100 g composition record by edible grams.
        Optional ingredients are excluded. Missing analytical values are not treated as zero.
      </p>

      <table style={TABLE}>
        <thead>
          <tr>
            <th style={TH_LEFT}>Nutrient</th>
            <th style={TH_RIGHT}>Per serving</th>
          </tr>
        </thead>
        <tbody>
          {summaryRows.map((row) => (
            <tr key={row.key} id={`nutrition-row-${row.key}`} className="nutrition-row-target">
              <td style={TD_LEFT}>{labelFor(row.key, row.label)}</td>
              <td style={TD_RIGHT}>
                {row.amount == null ? "Not established" : formatAmount(row.amount, unitFor(row.key))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {summaryCaveats.length > 0 && (
        <p style={{...NOTE, marginTop: "0.4rem", marginBottom: 0}}>
          {summaryCaveats.map((item) => (
            <span key={item} style={{display: "block"}}>
              {item}
            </span>
          ))}
        </p>
      )}

      {unresolvedNotes.length > 0 && (
        <p style={{fontSize: "0.8em", color: "var(--ifm-color-content-secondary)", marginTop: "0.4rem"}}>
          {unresolvedNotes.map((note) => (
            <span key={note.key} style={{display: "block"}}>
              {labelFor(note.key)}: {note.reason}
            </span>
          ))}
        </p>
      )}

      <details style={DETAILS}>
        <summary style={SUMMARY}>Key vitamins and minerals</summary>
        {micronutrientRows.length === 0 ? (
          <p style={NOTE}>
            No vitamin or mineral reaches 15% of its adult reference intake in one serving. Smaller
            amounts are still calculated and still count towards a daily total.
          </p>
        ) : (
          <>
            <table style={{...TABLE, marginTop: "0.5rem"}}>
              <thead>
                <tr>
                  <th style={TH_LEFT}>Nutrient</th>
                  <th style={TH_RIGHT}>Per serving</th>
                  <th style={TH_RIGHT}>Reference intake</th>
                </tr>
              </thead>
              <tbody>
                {micronutrientRows.map((row) => (
                  <tr key={row.key} id={`nutrition-row-${row.key}`} className="nutrition-row-target">
                    <td style={TD_LEFT}>{labelFor(row.key)}</td>
                    <td style={TD_RIGHT}>{formatAmount(row.amount, unitFor(row.key))}</td>
                    <td style={TD_RIGHT}>
                      {formatPercent(row.pct)}
                      {BASIS_SUFFIX[row.basis] ? ` ${BASIS_SUFFIX[row.basis]}` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{...NOTE, marginTop: "0.5rem", marginBottom: 0}}>
              Vitamins and minerals supplying at least 15% of an adult reference intake, up to eight.
              RDA is a recommended dietary allowance; AI is an adequate intake, used where the
              evidence does not support an RDA. Nutrients below the threshold are still calculated
              and still count towards a daily total.
            </p>
            {cautions.map((caution) => (
              <p key={caution.key} style={{...NOTE, marginTop: "0.4rem", marginBottom: 0}}>
                {labelFor(caution.key)} in one serving is above the tolerable upper intake level of{" "}
                {formatAmount(caution.ul, unitFor(caution.key))}, which is a safety boundary rather
                than a target.
              </p>
            ))}
          </>
        )}
      </details>

      <details style={DETAILS}>
        <summary style={SUMMARY}>Bioactive compounds</summary>
        {bioactiveRows.length === 0 ? (
          <p style={NOTE}>
            No bioactive compound has a defensible quantitative value for this serving. Values
            reported only as presence, traces or ranges are not summed into a number.
          </p>
        ) : (
          <>
            <table style={{...TABLE, marginTop: "0.5rem"}}>
              <thead>
                <tr>
                  <th style={TH_LEFT}>Compound</th>
                  <th style={TH_RIGHT}>Per serving</th>
                </tr>
              </thead>
              <tbody>
                {bioactiveRows.map((row) => (
                  <tr key={row.key} id={`nutrition-row-${row.key}`} className="nutrition-row-target">
                    <td style={TD_LEFT}>{labelFor(row.key, row.label)}</td>
                    <td style={TD_RIGHT}>{formatAmount(row.amount, unitFor(row.key))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{...NOTE, marginTop: "0.5rem", marginBottom: 0}}>
              These compounds have no recognised intake target, so an amount is given without a
              percentage.
            </p>
          </>
        )}
      </details>

      <details style={DETAILS}>
        <summary style={SUMMARY}>Calculation details</summary>
        <table style={{...TABLE, marginTop: "0.5rem", fontSize: "0.85em"}}>
          <thead>
            <tr>
              <th style={TH_LEFT}>Ingredient</th>
              <th style={TH_RIGHT}>Weight used</th>
              <th style={TH_LEFT}>Composition record</th>
            </tr>
          </thead>
          <tbody>
            {nutrition.audit.map((row) => (
              <tr
                key={`${row.food}-${row.weight_g}`}
                id={`nutrition-ingredient-${String(row.food_slug || row.food)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")}`}
                className="nutrition-row-target"
              >
                <td style={TD_LEFT}>{row.display || row.food}</td>
                <td style={TD_RIGHT}>{formatAmount(row.weight_g, "g")}</td>
                <td style={TD_LEFT}>{conciseCompositionRecord(row.composition_basis).record}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {provenanceRows.length > 0 && (
          <>
            <p style={{...NOTE, marginTop: "0.75rem", marginBottom: "0.25rem"}}>
              Mainly from:
            </p>
            <ul style={{fontSize: "0.85em", marginBottom: 0}}>
              {provenanceRows.map((row) => (
                <li key={row.key} id={`nutrition-note-${row.key}`} className="nutrition-row-target">
                  <strong>{labelFor(row.key)}</strong>: {row.contributors.join(", ")}
                </li>
              ))}
            </ul>
          </>
        )}

        {(conversions.length > 0 ||
          recordNotes.length > 0 ||
          exclusions.length > 0 ||
          deferredAssumptions.length > 0) && (
          <>
            <p style={{...NOTE, marginTop: "0.75rem", marginBottom: "0.25rem"}}>
              Assumptions and exclusions:
            </p>
            <ul style={{fontSize: "0.85em", marginBottom: 0}}>
              {conversions.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {recordNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
              {exclusions.map((item) => (
                <li key={item.display}>
                  {item.display} — {item.reason}
                </li>
              ))}
              {deferredAssumptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </details>
    </div>
  )
}
