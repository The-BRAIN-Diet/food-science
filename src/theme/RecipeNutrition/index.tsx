import React from "react"
import {usePluginData} from "@docusaurus/useGlobalData"
import {NUTRIENT_LABELS} from "@site/src/data/nutritionTableMapping"
import {
  ADULT_REFERENCE_INTAKE,
  PENDING_NUTRITION_MESSAGE,
  calculateRecipeNutrition,
  materialContributors,
  percentReferenceIntake,
  selectPublicRows,
} from "@site/src/utils/recipeNutritionCalculate.mjs"

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

const TABLE: React.CSSProperties = {width: "100%", borderCollapse: "collapse"}
const TH_LEFT: React.CSSProperties = {textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}
const TH_RIGHT: React.CSSProperties = {textAlign: "right", padding: "8px", borderBottom: "2px solid #ccc"}
const TD_LEFT: React.CSSProperties = {padding: "8px", borderBottom: "1px solid #eee"}
const TD_RIGHT: React.CSSProperties = {padding: "8px", borderBottom: "1px solid #eee", textAlign: "right"}
const DETAILS: React.CSSProperties = {marginTop: "0.75rem"}
const SUMMARY: React.CSSProperties = {cursor: "pointer", color: "var(--ifm-color-primary)"}
const NOTE: React.CSSProperties = {fontSize: "0.85em", color: "var(--ifm-color-content-secondary)"}

/**
 * RecipeNutrition component
 *
 * The single published source of per-serving figures for a recipe. Recipe prose
 * must not restate these numbers: a hand-typed second copy drifts from the
 * calculation, which is how a page came to show two different carbohydrate and
 * fat totals at once.
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

  const nutrition = calculateRecipeNutrition(details, foods)

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

  const publicRows = selectPublicRows(nutrition)
  const summaryRows = publicRows.filter((row) => row.group === "core")
  const micronutrientRows = publicRows.filter((row) => row.group === "micronutrient")
  const bioactiveRows = publicRows.filter((row) => row.group === "brain")
  const unresolvedNotes = summaryRows
    .filter((row) => row.amount == null && row.unresolvedReason)
    .map((row) => ({key: row.key, reason: row.unresolvedReason as string}))
  const exclusions = nutrition.exclusions || []
  const assumptions = nutrition.assumptions || []
  const provenanceRows = summaryRows
    .filter((row) => row.amount != null)
    .map((row) => ({
      key: row.key,
      contributors: materialContributors(row.key, nutrition.byFood, row.amount as number),
    }))
    .filter((row) => row.contributors.length > 0)

  const formatAmount = (key: string, amount: number) => {
    const unit = NUTRIENT_LABELS[key]?.unit || NUTRIENT_UNIT[key] || (key.endsWith("_mg") ? "mg" : "")
    const decimals = key === "kcal" ? 0 : amount >= 10 ? 1 : 2
    return `${amount.toFixed(decimals)} ${unit}`.trim()
  }

  const formatPct = (key: string, amount: number) => {
    if (!(key in ADULT_REFERENCE_INTAKE)) return "—"
    const pct = percentReferenceIntake(key, amount)
    if (pct == null) return "—"
    return `${pct.toFixed(0)}%`
  }

  return (
    <div>
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
            <th style={TH_RIGHT}>Reference intake</th>
          </tr>
        </thead>
        <tbody>
          {summaryRows.map((row) => (
            <tr key={row.key}>
              <td style={TD_LEFT}>{row.label || NUTRIENT_LABELS[row.key]?.label || row.key}</td>
              <td style={TD_RIGHT}>
                {row.amount == null ? "Not established" : formatAmount(row.key, row.amount)}
              </td>
              <td style={TD_RIGHT}>{row.amount == null ? "—" : formatPct(row.key, row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {unresolvedNotes.length > 0 && (
        <p style={{fontSize: "0.8em", color: "var(--ifm-color-content-secondary)", marginTop: "0.4rem"}}>
          {unresolvedNotes.map((note) => (
            <span key={note.key} style={{display: "block"}}>
              {NUTRIENT_LABELS[note.key]?.label || note.key}: {note.reason}
            </span>
          ))}
        </p>
      )}

      <details style={DETAILS}>
        <summary style={SUMMARY}>Key vitamins and minerals</summary>
        {micronutrientRows.length === 0 ? (
          <p style={NOTE}>
            No micronutrient reaches 5% of the adult reference intake in one serving from the records
            used here.
          </p>
        ) : (
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
                <tr key={row.key}>
                  <td style={TD_LEFT}>{NUTRIENT_LABELS[row.key]?.label || row.key}</td>
                  <td style={TD_RIGHT}>{formatAmount(row.key, row.amount)}</td>
                  <td style={TD_RIGHT}>{formatPct(row.key, row.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
          <table style={{...TABLE, marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={TH_LEFT}>Compound</th>
                <th style={TH_RIGHT}>Per serving</th>
              </tr>
            </thead>
            <tbody>
              {bioactiveRows.map((row) => (
                <tr key={row.key}>
                  <td style={TD_LEFT}>{row.label || NUTRIENT_LABELS[row.key]?.label || row.key}</td>
                  <td style={TD_RIGHT}>{formatAmount(row.key, row.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </details>

      <details style={DETAILS}>
        <summary style={SUMMARY}>Calculation details</summary>
        <table style={{...TABLE, marginTop: "0.5rem", fontSize: "0.85em"}}>
          <thead>
            <tr>
              <th style={TH_LEFT}>Ingredient</th>
              <th style={TH_RIGHT}>Calculation weight</th>
              <th style={TH_LEFT}>Composition source</th>
            </tr>
          </thead>
          <tbody>
            {nutrition.audit.map((row) => (
              <tr key={`${row.food}-${row.weight_g}`}>
                <td style={TD_LEFT}>{row.display || row.food}</td>
                <td style={TD_RIGHT}>{row.weight_g.toFixed(1)} g</td>
                <td style={TD_LEFT}>
                  {row.composition_basis}
                  {row.conversion_source ? (
                    <span style={{display: "block", color: "var(--ifm-color-content-secondary)"}}>
                      {row.conversion_source}
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {provenanceRows.length > 0 && (
          <>
            <p style={{...NOTE, marginTop: "0.75rem", marginBottom: "0.25rem"}}>
              Where each summary value comes from (foods supplying at least 10% of that row):
            </p>
            <ul style={{fontSize: "0.85em", marginBottom: 0}}>
              {provenanceRows.map((row) => (
                <li key={row.key}>
                  <strong>{NUTRIENT_LABELS[row.key]?.label || row.key}</strong>:{" "}
                  {row.contributors.join(", ")}
                </li>
              ))}
            </ul>
          </>
        )}

        {(exclusions.length > 0 || assumptions.length > 0) && (
          <>
            <p style={{...NOTE, marginTop: "0.75rem", marginBottom: "0.25rem"}}>
              Exclusions and assumptions:
            </p>
            <ul style={{fontSize: "0.85em", marginBottom: 0}}>
              {exclusions.map((item) => (
                <li key={item.display}>
                  {item.display} — {item.reason}
                </li>
              ))}
              {assumptions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </details>
    </div>
  )
}
