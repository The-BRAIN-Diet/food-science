import React from "react"
import {ADULT_REFERENCE_INTAKE} from "@site/src/utils/nutrientReference.mjs"
import {
  BIOACTIVE_LIPID_KEYS,
  CORE_NUTRIENT_KEYS,
  MICRONUTRIENT_KEYS,
  NUTRIENT_LABELS,
  isPublicSupplementaryRow,
  isPublicTableKey,
  readAuthorisedSpecifications,
} from "@site/src/data/nutritionTableMapping"
import {foodPageNote, fcirHref} from "@site/src/data/fcirRegister"

type FrontMatter = Record<string, unknown>

type NutritionValues = Record<string, number | null | undefined>

/** Supplementary compound from literature / specialist DB; rendered in Bioactive Compounds table */
interface SupplementarySource {
  key: string
  label: string
  /** Per 100 g numeric amount (primary database style) */
  value?: number
  unit?: string
  /** When set (e.g. “Present — quantity not established”), overrides value + unit in the Amount column */
  amount_display?: string
  /** Explicit qualitative status; rendered when amount_display is absent */
  status?: string
  source_note: string
  /** Override public visibility; default qualitative rows are substance-only. */
  public_display?: "table" | "substance-only" | "internal-only" | "excluded-error"
  /** Short note for the Bioactive Compounds “Notes” column (optional) */
  notes?: string
}

/** Optional fourth sub-table: total polyphenols, antioxidant proxies, etc. */
interface FunctionalMetric {
  key: string
  label: string
  /**
   * Qualitative scoring (canonical).
   * Use for cross-food “functional” summaries where numeric assay values vary heavily.
   */
  score?: "Low" | "Medium" | "High"
  /**
   * Legacy support: some pages store functional metrics as a free-text amount display.
   * If present and `score` is absent, we render it in the Score column.
   */
  amount_display?: string
  /** Legacy support: numeric value + unit. Prefer `score` moving forward. */
  value?: number
  unit?: string
  notes?: string
}

interface NutritionTableProps {
  details: FrontMatter
}

/** Caption under “Bioactive compounds”. */
export const BIOACTIVE_TABLE_CAPTION =
  "Explicitly identified compounds, including individual fatty acids, with a defensible quantity or an explicit qualitative status. Asterisks (*) identify supplementary sources below. Unquantified or trace constituents are not automatically admitted to the Substances list."

/**
 * Reference daily intakes come from the canonical set in
 * `src/utils/nutrientReference.mjs`, documented in
 * `system/nutrient-reference-values.md`. Food pages and recipe pages must not
 * keep separate copies: a second table drifts, and the two then disagree about
 * the same nutrient for the same reader.
 */
const RDA_VALUES: Record<string, number> = ADULT_REFERENCE_INTAKE

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

const FCIR_ID_RE = /(FCIR-\d{3})/g

function linkifyFcirIds(text: string): React.ReactNode {
  const parts = String(text || "").split(FCIR_ID_RE)
  return parts.map((part, index) => {
    if (/^FCIR-\d{3}$/.test(part)) {
      return (
        <a key={`${part}-${index}`} href={fcirHref(part)}>
          {part}
        </a>
      )
    }
    return part
  })
}

function listedFcirCases(details: FrontMatter): string[] {
  const raw = details.fcir_cases
  if (!Array.isArray(raw)) return []
  return raw.map((value) => String(value || "").trim()).filter((value) => /^FCIR-\d{3}$/.test(value))
}

function isValidSupplementary(s: unknown): s is SupplementarySource {
  if (!s || typeof s !== "object") return false
  const o = s as SupplementarySource
  const hasNumeric =
    typeof o.value === "number" && typeof o.unit === "string" && !Number.isNaN(o.value)
  const hasDisplay = typeof o.amount_display === "string" && o.amount_display.trim().length > 0
  const hasStatus = typeof o.status === "string" && o.status.trim().length > 0
  return (
    typeof o.key === "string" &&
    typeof o.label === "string" &&
    typeof o.source_note === "string" &&
    (hasNumeric || hasDisplay || hasStatus)
  )
}

function isValidFunctionalMetric(s: unknown): s is FunctionalMetric {
  if (!s || typeof s !== "object") return false
  const o = s as FunctionalMetric
  const hasScore =
    typeof o.score === "string" && ["Low", "Medium", "High"].includes(o.score)
  const hasNumeric =
    typeof o.value === "number" && typeof o.unit === "string" && !Number.isNaN(o.value)
  const hasDisplay = typeof o.amount_display === "string" && o.amount_display.trim().length > 0
  return (
    typeof o.key === "string" &&
    typeof o.label === "string" &&
    (hasScore || hasNumeric || hasDisplay)
  )
}

export default function NutritionTable({details}: NutritionTableProps): React.ReactElement {
  const nutrition = (details.nutrition_per_100g || {}) as NutritionValues
  const source = (details.nutrition_source || {}) as Record<string, unknown>
  const tableMapsTo =
    typeof source.table_maps_to === "string" ? source.table_maps_to.trim() : ""

  const rawSupplementary = (details.nutrition_supplementary_sources || []) as unknown[]
  const supplementary = rawSupplementary
    .filter(isValidSupplementary)
    // Omit numeric zeros from the bioactive table; keep qualitative entries (amount_display).
    .filter((sup) => (typeof sup.value === "number" ? sup.value > 0 : true))
    .filter((sup) => isPublicSupplementaryRow(details, sup))

  const rawFunctional = (details.nutrition_functional_metrics || []) as unknown[]
  const functionalMetrics = rawFunctional
    .filter(isValidFunctionalMetric)
    // Omit numeric zeros from the functional table; keep qualitative entries (amount_display).
    .filter((m) => (typeof m.value === "number" ? m.value > 0 : true))

  const authorised = readAuthorisedSpecifications(details)
  const hasAuthorisedSpecs = Boolean(authorised?.rows?.length)

  const hasAnyNutrition =
    (nutrition && Object.entries(nutrition).some(([_, v]) => typeof v === "number" || v === null)) ||
    supplementary.length > 0 ||
    functionalMetrics.length > 0 ||
    hasAuthorisedSpecs

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
      if (!isPublicTableKey(details, key)) {
        continue
      }
      const raw = nutrition[key]
      const meta = NUTRIENT_LABELS[key] || {label: key, unit: ""}
      const cells = renderRdaCells(key, raw)
      if (cells === null) {
        continue
      }
      out.push(
        <tr key={key} id={`nutrition-row-${key}`} className="nutrition-row-target">
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
    if (!isPublicTableKey(details, key)) {
      continue
    }
    const raw = nutrition[key]
    if (raw === undefined || raw === null) continue
    if (typeof raw !== "number") continue
    // Skip zero values (e.g. DHA/EPA = 0) so we don't show "random" 0 omega-3 rows.
    if (raw <= 0) continue
    const meta = NUTRIENT_LABELS[key] || {label: key, unit: ""}
    bioactiveLipidRows.push(
      <tr key={key} id={`nutrition-row-${key}`} className="nutrition-row-target">
        <td style={tdStyle}>{meta.label}</td>
        <td style={tdStyle}>{`${roundTo(raw, 1)} ${meta.unit}`.trim()}</td>
        <td style={tdStyle}>—</td>
      </tr>
    )
  }

  const supplementaryRows = supplementary.map((sup) => {
    const amountCell =
      typeof sup.amount_display === "string" && sup.amount_display.trim().length > 0
        ? `${sup.amount_display.trim()} *`
        : typeof sup.status === "string" && sup.status.trim().length > 0
          ? `${sup.status.trim()} *`
          : typeof sup.value === "number" && sup.unit
            ? `${roundTo(sup.value, 1)} ${sup.unit} *`
            : "—"
    const notesCell =
      typeof sup.notes === "string" && sup.notes.trim().length > 0 ? sup.notes.trim() : "—"
    return (
      <tr key={sup.key} id={`nutrition-row-${sup.key}`} className="nutrition-row-target">
        <td style={tdStyle}>{sup.label}</td>
        <td style={tdStyle}>{amountCell}</td>
        <td style={tdStyle}>{notesCell}</td>
      </tr>
    )
  })

  const functionalRows = functionalMetrics.map((m) => {
    const scoreCell =
      typeof m.score === "string" && m.score.trim().length > 0
        ? m.score.trim()
        : typeof m.amount_display === "string" && m.amount_display.trim().length > 0
          ? m.amount_display.trim()
          : typeof m.value === "number" && m.unit
            ? `${roundTo(m.value, 1)} ${m.unit}`
            : "—"
    const notesCell =
      typeof m.notes === "string" && m.notes.trim().length > 0 ? m.notes.trim() : "—"
    return (
      <tr key={m.key} id={`nutrition-row-${m.key}`} className="nutrition-row-target">
        <td style={tdStyle}>{m.label}</td>
        <td style={tdStyle}>{scoreCell}</td>
        <td style={tdStyle}>{notesCell}</td>
      </tr>
    )
  })

  const fcirIds = listedFcirCases(details)
  const fcirIdsInSourceNotes = new Set<string>()
  for (const sup of supplementary) {
    for (const match of String(sup.source_note || "").matchAll(/FCIR-\d{3}/g)) {
      fcirIdsInSourceNotes.add(match[0])
    }
  }
  const fcirFooterIds = fcirIds.filter((id) => !fcirIdsInSourceNotes.has(id))
  const hasSupplementary = supplementary.length > 0
  const hasBioactiveSection =
    bioactiveLipidRows.length > 0 || supplementaryRows.length > 0
  const hasFunctionalSection = functionalRows.length > 0
  const hasUsdaCompositionTables =
    coreRows.length > 0 || microRows.length > 0 || hasBioactiveSection || hasFunctionalSection

  const authorisedProvenance = authorised
    ? [
        authorised.source_name,
        authorised.source_url,
        authorised.accessed ? `accessed ${authorised.accessed}` : "",
      ]
        .filter((part) => typeof part === "string" && part.trim().length > 0)
        .join(" · ")
    : ""

  return (
    <section className="nutrition-table-block">
      {hasUsdaCompositionTables && (
        <h2 id="nutrition-tables">Nutrient Tables (per 100 g)</h2>
      )}
      {tableMapsTo && hasUsdaCompositionTables && (
        <p style={{fontSize: "0.95em", color: "#555", marginTop: "0.25rem", marginBottom: "0.75rem"}}>
          <strong>Maps to:</strong> {tableMapsTo}
        </p>
      )}

      {coreRows.length > 0 && (
        <>
          <h3>Core nutrients</h3>
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
          <h3>Key vitamins and minerals</h3>
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
        <>
          <h3>Bioactive compounds</h3>
          <p style={{fontSize: "0.9em", color: "#555", marginTop: "0.5rem"}}>
            {BIOACTIVE_TABLE_CAPTION}
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

          {hasSupplementary && (
            <div style={{marginTop: "0.75rem", fontSize: "0.9em", color: "#555"}}>
              <strong>Source notes (supplementary):</strong>
              <ul style={{marginTop: "0.25rem", marginBottom: 0, paddingLeft: "1.25rem"}}>
                {supplementary.map((sup) => (
                  <li key={sup.key} id={`nutrition-note-${sup.key}`} className="nutrition-row-target">
                    * <strong>{sup.label}:</strong> {linkifyFcirIds(sup.source_note)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {hasFunctionalSection && (
        <details style={{marginTop: "1rem"}}>
          <summary style={{cursor: "pointer", color: "var(--ifm-color-primary)"}}>
            <h3 style={{display: "inline", margin: 0}}>Functional metrics</h3>
          </summary>
          <div style={{marginTop: "0.5rem"}}>
            <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
              <thead>
                <tr>
                  <th style={thStyle}>Metric</th>
                  <th style={thStyle}>Score</th>
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

      {hasAuthorisedSpecs && authorised && (
        <div style={{marginTop: hasUsdaCompositionTables ? "1.25rem" : 0}}>
          <h2 id="nutrition-authorised-specifications">
            {authorised.title || "Representative authorised specifications"}
          </h2>
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={thStyle}>Formulation</th>
                <th style={thStyle}>DHA</th>
                <th style={thStyle}>EPA</th>
                <th style={thStyle}>Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {authorised.rows.map((row) => (
                <tr
                  key={row.formulation}
                  id={`nutrition-row-authorised-${row.formulation
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")}`}
                  className="nutrition-row-target"
                >
                  <td style={tdStyle}>{row.formulation}</td>
                  <td style={tdStyle}>{row.dha}</td>
                  <td style={tdStyle}>{row.epa}</td>
                  <td style={tdStyle}>{row.interpretation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {authorised.caption && (
            <p style={{marginTop: "0.75rem", fontSize: "0.9em", color: "#555"}}>
              {authorised.caption}
            </p>
          )}
          {authorisedProvenance && (
            <p style={{marginTop: "0.5rem", fontSize: "0.9em", color: "#555"}}>
              <strong>
                Data provenance (regulatory product specifications, not USDA
                food-composition measurements):
              </strong>{" "}
              {authorisedProvenance}
            </p>
          )}
        </div>
      )}

      {hasUsdaCompositionTables && (
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
      )}
      {fcirFooterIds.length > 0 && (
        <div className="fcir-food-notes" style={{marginTop: "0.75rem", fontSize: "0.9em", color: "#555"}}>
          {fcirFooterIds.map((id) => (
            <p key={id} style={{margin: "0.25rem 0"}}>
              {linkifyFcirIds(foodPageNote(id))}
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
