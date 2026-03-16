import React from "react"
import {NUTRIENT_ORDER, NUTRIENT_LABELS} from "@site/src/data/nutritionTableMapping"

type FrontMatter = Record<string, unknown>

type NutritionValues = Record<string, number | null | undefined>

/** Supplementary (asterisked) compound from literature/specialist DB; see food-page-model.md */
interface SupplementarySource {
  key: string
  label: string
  value: number
  unit: string
  source_note: string
}

interface NutritionTableProps {
  details: FrontMatter
}

// Reference daily intakes — see `system/nutrient-reference-values.md`
const RDA_VALUES: Record<string, number> = {
  iron_mg: 18,
  zinc_mg: 11,
  magnesium_mg: 420,
  selenium_ug: 55,
  calcium_mg: 1000,
  potassium_mg: 3400,
  choline_mg: 550,
  folate_ug: 400,
  vitamin_b12_ug: 2.4,
  vitamin_b6_mg: 1.7,
}

function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export default function NutritionTable({details}: NutritionTableProps): React.ReactElement {
  const nutrition = (details.nutrition_per_100g || {}) as NutritionValues
  const source = (details.nutrition_source || {}) as Record<string, unknown>

  const hasAnyNutrition =
    nutrition && Object.entries(nutrition).some(([_, v]) => typeof v === "number" || v === null)

  if (!hasAnyNutrition) {
    return null
  }

  const rows = NUTRIENT_ORDER.filter((key) => Object.prototype.hasOwnProperty.call(nutrition, key))

  const rawSupplementary = (details.nutrition_supplementary_sources || []) as SupplementarySource[]
  const supplementary = Array.isArray(rawSupplementary)
    ? rawSupplementary.filter(
        (s) =>
          typeof s?.key === "string" &&
          typeof s?.label === "string" &&
          typeof s?.value === "number" &&
          typeof s?.unit === "string" &&
          typeof s?.source_note === "string"
      )
    : []
  const hasSupplementary = supplementary.length > 0

  return (
    <section>
      <h2>Nutritional Table (per 100 g)</h2>
      <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
        <thead>
          <tr>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>
              Nutrient
            </th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>
              Amount per 100 g
            </th>
            <th style={{textAlign: "left", padding: "8px", borderBottom: "2px solid #ccc"}}>
              % RDA per 100 g
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((key) => {
            // Hide total omega-3 row when it cannot be fully reconciled
            // from visible component rows. For now, we omit the
            // "Total omega-3" display entirely to avoid showing a total
            // that cannot be explained from the table breakdown.
            if (key === "omega3_mg") {
              return null
            }

            const meta = NUTRIENT_LABELS[key] || {label: key, unit: ""}
            const raw = nutrition[key]

            if (raw === undefined) {
              return null
            }

            const isNull = raw === null
            const value = typeof raw === "number" ? raw : null
            const displayAmount =
              value === null ? (isNull ? "—" : "") : `${roundTo(value, 1)} ${meta.unit}`.trim()

            let percentDisplay = "—"
            const rda = RDA_VALUES[key]
            if (value !== null && rda && rda > 0) {
              const pct = roundTo((value / rda) * 100, 1)
              percentDisplay = `${pct}%`
            }

            return (
              <tr key={key}>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {meta.label}
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {displayAmount || "—"}
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {percentDisplay}
                </td>
              </tr>
            )
          })}
          {hasSupplementary &&
            supplementary.map((sup) => (
              <tr key={sup.key}>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {sup.label}
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  {roundTo(sup.value, 1)} {sup.unit} *
                </td>
                <td style={{padding: "8px", borderBottom: "1px solid #eee", verticalAlign: "top"}}>
                  —
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {hasSupplementary && (
        <div style={{marginTop: "0.5rem", fontSize: "0.9em", color: "#555"}}>
          <strong>Source notes:</strong>
          <ul style={{marginTop: "0.25rem", marginBottom: 0, paddingLeft: "1.25rem"}}>
            {supplementary.map((sup) => (
              <li key={sup.key}>
                * <strong>{sup.label}:</strong> {sup.source_note}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{marginTop: "0.75rem", fontSize: "0.9em", color: "#555"}}>
        <div style={{marginBottom: "0.25rem"}}>
          <strong>Reference intakes:</strong> US Dietary Reference Intakes for adults (19–50 years;
          using the higher of male/female values where they differ).
        </div>
        {source && (source.database || source.food_name || source.fdc_id) && (
          <div>
            <strong>Data provenance:</strong>{" "}
            {source.database && <span>{String(source.database)}</span>}
            {source.food_name && (
              <span>
                {", "}
                {String(source.food_name)}
              </span>
            )}
            {source.fdc_id && (
              <span>
                {", FDC ID "}
                {String(source.fdc_id)}
              </span>
            )}
            {source.retrieval_method && (
              <span>
                {", "}
                {String(source.retrieval_method)}
              </span>
            )}
            {source.basis && (
              <span>
                {", "}
                {String(source.basis)}
              </span>
            )}
            {source.last_checked && (
              <span>
                {", last checked "}
                {String(source.last_checked)}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

