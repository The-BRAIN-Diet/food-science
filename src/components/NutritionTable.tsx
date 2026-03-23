import React from "react"
import {
  BIOACTIVE_LIPID_KEYS,
  CORE_NUTRIENT_KEYS,
  MICRONUTRIENT_KEYS,
  NUTRIENT_LABELS,
} from "@site/src/data/nutritionTableMapping"

type FrontMatter = Record<string, unknown>

type NutritionValues = Record<string, number | null | undefined>

/** Supplementary compound from literature / specialist DB; rendered in Bioactive Compounds table */
interface SupplementarySource {
  key: string
  label: string
  /** Per 100 g numeric amount (primary database style) */
  value?: number
  unit?: string
  /** When set (e.g. “Varies by product”), overrides value + unit in the Amount column */
  amount_display?: string
  source_note: string
  /** Short note for the Bioactive Compounds “Notes” column (optional) */
  notes?: string
}

/** Optional fourth sub-table: total polyphenols, antioxidant proxies, etc. */
interface FunctionalMetric {
  key: string
  label: string
  value?: number
  unit?: string
  amount_display?: string
  notes?: string
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
  vitamin_e_mg: 15,
  vitamin_k_ug: 120,
  copper_mg: 0.9,
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "2px solid #ccc",
}
const tdStyle: React.CSSProperties = {
  padding: "8px",
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
}

function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round((value + Number.EPSILON) * factor) / factor
}

function isValidSupplementary(s: unknown): s is SupplementarySource {
  if (!s || typeof s !== "object") return false
  const o = s as SupplementarySource
  const hasNumeric =
    typeof o.value === "number" && typeof o.unit === "string" && !Number.isNaN(o.value)
  const hasDisplay = typeof o.amount_display === "string" && o.amount_display.trim().length > 0
  return (
    typeof o.key === "string" &&
    typeof o.label === "string" &&
    typeof o.source_note === "string" &&
    (hasNumeric || hasDisplay)
  )
}

function isValidFunctionalMetric(s: unknown): s is FunctionalMetric {
  if (!s || typeof s !== "object") return false
  const o = s as FunctionalMetric
  const hasNumeric =
    typeof o.value === "number" && typeof o.unit === "string" && !Number.isNaN(o.value)
  const hasDisplay = typeof o.amount_display === "string" && o.amount_display.trim().length > 0
  return (
    typeof o.key === "string" &&
    typeof o.label === "string" &&
    (hasNumeric || hasDisplay)
  )
}

export default function NutritionTable({details}: NutritionTableProps): React.ReactElement {
  const nutrition = (details.nutrition_per_100g || {}) as NutritionValues
  const source = (details.nutrition_source || {}) as Record<string, unknown>

  const rawSupplementary = (details.nutrition_supplementary_sources || []) as unknown[]
  const supplementary = rawSupplementary.filter(isValidSupplementary)

  const rawFunctional = (details.nutrition_functional_metrics || []) as unknown[]
  const functionalMetrics = rawFunctional.filter(isValidFunctionalMetric)

  const hasAnyNutrition =
    (nutrition && Object.entries(nutrition).some(([_, v]) => typeof v === "number" || v === null)) ||
    supplementary.length > 0 ||
    functionalMetrics.length > 0

  if (!hasAnyNutrition) {
    return null
  }

  function renderRdaCells(key: string, raw: number | null | undefined): React.ReactNode {
    const meta = NUTRIENT_LABELS[key] || {label: key, unit: ""}
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
      <>
        <td style={tdStyle}>{displayAmount || "—"}</td>
        <td style={tdStyle}>{percentDisplay}</td>
      </>
    )
  }

  function renderKeyRows(keys: readonly string[]): React.ReactNode[] {
    const out: React.ReactNode[] = []
    for (const key of keys) {
      if (key === "omega3_mg") {
        continue
      }
      if (!Object.prototype.hasOwnProperty.call(nutrition, key)) {
        continue
      }
      const raw = nutrition[key]
      const meta = NUTRIENT_LABELS[key] || {label: key, unit: ""}
      const cells = renderRdaCells(key, raw)
      if (cells === null) {
        continue
      }
      out.push(
        <tr key={key}>
          <td style={tdStyle}>{meta.label}</td>
          {cells}
        </tr>
      )
    }
    return out
  }

  const coreRows = renderKeyRows(CORE_NUTRIENT_KEYS)
  const microRows = renderKeyRows(MICRONUTRIENT_KEYS)

  const bioactiveLipidRows: React.ReactNode[] = []
  for (const key of BIOACTIVE_LIPID_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(nutrition, key)) {
      continue
    }
    const raw = nutrition[key]
    const meta = NUTRIENT_LABELS[key] || {label: key, unit: ""}
    if (raw === undefined) {
      continue
    }
    const isNull = raw === null
    const value = typeof raw === "number" ? raw : null
    const displayAmount =
      value === null ? (isNull ? "—" : "") : `${roundTo(value, 1)} ${meta.unit}`.trim()
    bioactiveLipidRows.push(
      <tr key={key}>
        <td style={tdStyle}>{meta.label}</td>
        <td style={tdStyle}>{displayAmount || "—"}</td>
        <td style={tdStyle}>—</td>
      </tr>
    )
  }

  const supplementaryRows = supplementary.map((sup) => {
    const amountCell =
      typeof sup.amount_display === "string" && sup.amount_display.trim().length > 0
        ? `${sup.amount_display.trim()} *`
        : typeof sup.value === "number" && sup.unit
          ? `${roundTo(sup.value, 1)} ${sup.unit} *`
          : "—"
    const notesCell =
      typeof sup.notes === "string" && sup.notes.trim().length > 0 ? sup.notes.trim() : "—"
    return (
      <tr key={sup.key}>
        <td style={tdStyle}>{sup.label}</td>
        <td style={tdStyle}>{amountCell}</td>
        <td style={tdStyle}>{notesCell}</td>
      </tr>
    )
  })

  const functionalRows = functionalMetrics.map((m) => {
    const amountCell =
      typeof m.amount_display === "string" && m.amount_display.trim().length > 0
        ? m.amount_display.trim()
        : typeof m.value === "number" && m.unit
          ? `${roundTo(m.value, 1)} ${m.unit}`
          : "—"
    const notesCell =
      typeof m.notes === "string" && m.notes.trim().length > 0 ? m.notes.trim() : "—"
    return (
      <tr key={m.key}>
        <td style={tdStyle}>{m.label}</td>
        <td style={tdStyle}>{amountCell}</td>
        <td style={tdStyle}>{notesCell}</td>
      </tr>
    )
  })

  const hasSupplementary = supplementary.length > 0
  const hasBioactiveSection =
    bioactiveLipidRows.length > 0 || supplementaryRows.length > 0
  const hasFunctionalSection = functionalRows.length > 0

  const showBioactiveDisclaimer =
    hasBioactiveSection || hasFunctionalSection

  return (
    <section className="nutrition-table-block">
      <h2>Nutritional Table (per 100 g)</h2>

      {coreRows.length > 0 && (
        <>
          <h3>Core nutrition</h3>
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={thStyle}>Nutrient</th>
                <th style={thStyle}>Amount per 100 g</th>
                <th style={thStyle}>% RDA per 100 g</th>
              </tr>
            </thead>
            <tbody>{coreRows}</tbody>
          </table>
        </>
      )}

      {microRows.length > 0 && (
        <>
          <h3>Key micronutrients</h3>
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={thStyle}>Nutrient</th>
                <th style={thStyle}>Amount per 100 g</th>
                <th style={thStyle}>% RDA per 100 g</th>
              </tr>
            </thead>
            <tbody>{microRows}</tbody>
          </table>
        </>
      )}

      {hasBioactiveSection && (
        <details style={{marginTop: "1rem"}}>
          <summary style={{cursor: "pointer", color: "var(--ifm-color-primary)"}}>
            <h3 style={{display: "inline", margin: 0}}>Bioactive compounds</h3>
          </summary>
          <div style={{marginTop: "0.5rem"}}>
            <p style={{fontSize: "0.9em", color: "#555", marginTop: 0}}>
              Values below are often from specialist compositional databases or literature, not the
              standard USDA panel. Asterisks (*) refer to source notes at the bottom of this section.
            </p>
            <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
              <thead>
                <tr>
                  <th style={thStyle}>Compound / class</th>
                  <th style={thStyle}>Amount per 100 g</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {bioactiveLipidRows}
                {supplementaryRows}
              </tbody>
            </table>

            <p style={{marginTop: "1rem", fontSize: "0.9em", color: "#555"}}>
              <strong>Note:</strong> Bioactive-compound values vary substantially by cultivar, species,
              cocoa or oil percentage, processing, and brand formulation. Show quantitative values only
              where a defensible source exists; otherwise prefer qualitative presence statements or
              ranges in source notes.
            </p>

            {hasSupplementary && (
              <div style={{marginTop: "0.75rem", fontSize: "0.9em", color: "#555"}}>
                <strong>Source notes (bioactive / supplementary):</strong>
                <ul style={{marginTop: "0.25rem", marginBottom: 0, paddingLeft: "1.25rem"}}>
                  {supplementary.map((sup) => (
                    <li key={sup.key}>
                      * <strong>{sup.label}:</strong> {sup.source_note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>
      )}

      {hasFunctionalSection && (
        <details style={{marginTop: "1rem"}}>
          <summary style={{cursor: "pointer", color: "var(--ifm-color-primary)"}}>
            <h3 style={{display: "inline", margin: 0}}>Functional Metrics</h3>
          </summary>
          <div style={{marginTop: "0.5rem"}}>
            <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
              <thead>
                <tr>
                  <th style={thStyle}>Metric</th>
                  <th style={thStyle}>Amount per 100 g</th>
                  <th style={thStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>{functionalRows}</tbody>
            </table>

            <p style={{marginTop: "1rem", fontSize: "0.9em", color: "#555"}}>
              <strong>Note:</strong> Functional-metric values depend strongly on assay method,
              processing, and product formulation. Use these as contextual metrics, not strict
              like-for-like nutrient equivalents.
            </p>
          </div>
        </details>
      )}

      <div style={{marginTop: "0.75rem", fontSize: "0.9em", color: "#555"}}>
        <div style={{marginBottom: "0.25rem"}}>
          <strong>Reference intakes:</strong> US Dietary Reference Intakes for adults (19–50 years;
          using the higher of male/female values where they differ).
        </div>
        {source && (source.database || source.food_name || source.fdc_id) && (
          <div>
            <strong>Data provenance (core / micronutrient panel):</strong>{" "}
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
