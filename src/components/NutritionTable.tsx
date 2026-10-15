import React, {useMemo} from "react"
import {useLocation} from "@docusaurus/router"
import AdvancedNutrition from "@site/src/components/AdvancedNutrition"
import substanceRegistry from "../../registry/substances.json"
import substanceInputPages from "../data/substance-input-pages.json"
import {foodFormReferenceHref, projectFoodNutrientForms} from "../data/foodNutrientForms.mjs"
import {ADULT_REFERENCE_INTAKE} from "@site/src/utils/nutrientReference.mjs"
import {
  BIOACTIVE_LIPID_KEYS,
  CORE_NUTRIENT_KEYS,
  MICRONUTRIENT_KEYS,
  NUTRIENT_LABELS,
  isKeyFoodMicronutrient,
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
  public_note?: string
  source_group?: string
  source_url?: string
  source_reference?: string
  nutrition_panel_eligible?: boolean
  basis?: string
  /** Override public visibility; default qualitative rows are substance-only. */
  public_display?: "table" | "substance-only" | "internal-only" | "excluded-error"
  /** Short note for the Bioactive Compounds “Notes” column (optional) */
  notes?: string
  /**
   * Where a literature range belongs. Omitted rows stay in Bioactive compounds.
   * Core and mineral ranges are not single assays, so % reference intake stays blank.
   */
  section?: "core" | "mineral" | "bioactive"
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
  view?: "highlights" | "advanced"
}

/** Caption under “Key vitamins and minerals”. */
export const KEY_VITAMIN_TABLE_CAPTION =
  "Vitamins and minerals supplying at least 10% of an adult reference intake per 100 g, derived from the composition panel."

export const ADVANCED_NUTRITION_CAPTION =
  "Other vitamins and minerals reported for the same food and preparation."

export const BIOACTIVE_TABLE_CAPTION =
  "Content applies to the food and preparation identified in the source notes."

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

export default function NutritionTable({details, view = "highlights"}: NutritionTableProps): React.ReactElement {
  const location = useLocation()
  const advancedContent = useMemo(() => <NutritionTable details={details} view="advanced" />, [details])
  const formProjection = useMemo(() => projectFoodNutrientForms(details, substanceRegistry, substanceInputPages), [details])
  const formObservations = formProjection.observations
  const advancedObservationKeys = new Set(formObservations.map((row) => row.supplementary_key).filter(Boolean))
  const nutritionUnavailable = details.nutrition_unavailable || details.composition_status === "withdrawn"
  const nutrition = (nutritionUnavailable ? {} : (details.nutrition_per_100g || {})) as NutritionValues
  const source = (details.nutrition_source || {}) as Record<string, unknown>
  const tableMapsTo =
    typeof source.table_maps_to === "string" ? source.table_maps_to.trim() : ""

  const rawSupplementary = (details.nutrition_supplementary_sources || []) as unknown[]
  const supplementary = rawSupplementary
    .filter(isValidSupplementary)
    // Omit numeric zeros from the bioactive table; keep qualitative entries (amount_display).
    .filter((sup) => (typeof sup.value === "number" ? sup.value > 0 : true))
    .filter((sup) => isPublicSupplementaryRow(details, sup))
    // Only suppress the exact observation that will be presented in Advanced.
    .filter((sup) => !advancedObservationKeys.has(sup.key))

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
    hasAuthorisedSpecs || formObservations.length > 0

  if (!hasAnyNutrition) {
    return nutritionUnavailable ? <section id="nutritional-highlights"><h2>Nutrition</h2><p>Reliable composition data for this preparation are not yet available.</p></section> : null
  }

  const noteGroups = new Map<string, {number: number; rows: SupplementarySource[]}>()
  for (const sup of supplementary) {
    const group = sup.source_group || sup.source_note
    if (!noteGroups.has(group)) noteGroups.set(group, {number: noteGroups.size + 1, rows: []})
    noteGroups.get(group)!.rows.push(sup)
  }
  const citationSuffix = (sup: SupplementarySource) => {
    const number = sup.source_reference?.match(/food-source-(\d+)$/)?.[1]
    return number ? ` [${number}]` : ""
  }
  let hasReferencePercent = false


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
      hasReferencePercent = true
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
  const microRows = renderKeyRows(MICRONUTRIENT_KEYS.filter((key) => isKeyFoodMicronutrient(details, key)))
  const advancedMicroRows = renderKeyRows(
    MICRONUTRIENT_KEYS.filter(
      (key) => isPublicTableKey(details, key) && !isKeyFoodMicronutrient(details, key),
    ),
  )

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

  const coreRangeRows = supplementary.filter((sup) => sup.section === "core")
  const mineralRangeRows = supplementary.filter((sup) => sup.section === "mineral")
  const bioactiveSupplementary = supplementary.filter(
    (sup) => sup.section !== "core" && sup.section !== "mineral",
  )

  function renderRangeRow(sup: SupplementarySource): React.ReactElement {
    const amountCell =
      typeof sup.amount_display === "string" && sup.amount_display.trim().length > 0
        ? `${sup.amount_display.trim()}${citationSuffix(sup)}`
        : typeof sup.status === "string" && sup.status.trim().length > 0
          ? `${sup.status.trim()}${citationSuffix(sup)}`
          : typeof sup.value === "number" && sup.unit
            ? `${roundTo(sup.value, 1)} ${sup.unit}${citationSuffix(sup)}`
            : "—"
    return (
      <tr key={sup.key} id={`nutrition-row-${sup.key}`} className="nutrition-row-target">
        <td style={tdStyle}>{sup.label}</td>
        <td style={tdStyle}>{amountCell}</td>
        <td style={tdStyle}>—</td>
      </tr>
    )
  }

  const supplementaryRows = bioactiveSupplementary.map((sup) => {
    const amountCell =
      typeof sup.amount_display === "string" && sup.amount_display.trim().length > 0
        ? `${sup.amount_display.trim()}${citationSuffix(sup)}`
        : typeof sup.status === "string" && sup.status.trim().length > 0
          ? `${sup.status.trim()}${citationSuffix(sup)}`
          : typeof sup.value === "number" && sup.unit
            ? `${roundTo(sup.value, 1)} ${sup.unit}${citationSuffix(sup)}`
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
    coreRows.length > 0 ||
    coreRangeRows.length > 0 ||
    microRows.length > 0 ||
    mineralRangeRows.length > 0 ||
    advancedMicroRows.length > 0 ||
    hasBioactiveSection ||
    hasFunctionalSection

  const authorisedProvenance = authorised
    ? [
        authorised.source_name,
        authorised.source_url,
        authorised.accessed ? `accessed ${authorised.accessed}` : "",
      ]
        .filter((part) => typeof part === "string" && part.trim().length > 0)
        .join(" · ")
    : ""

  if (view === "advanced") {
    return <section className="nutrition-table-block">
      {advancedMicroRows.length > 0 && <>
      <h2>Vitamins and minerals (per 100 g)</h2>
      <p>{ADVANCED_NUTRITION_CAPTION}</p>
      {typeof source.food_name === "string" && <p><strong>Selected food and preparation:</strong> {String(source.food_name)}. {String(source.basis || "per 100 g of the named food")}.</p>}
      <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
        <thead><tr><th style={thStyle}>Nutrient</th><th style={thStyle}>Amount per 100 g</th><th style={thStyle}>% reference intake per 100 g</th></tr></thead>
        <tbody>{advancedMicroRows}</tbody>
      </table>
      {MICRONUTRIENT_KEYS.some(key => isPublicTableKey(details, key) && !isKeyFoodMicronutrient(details, key) && typeof nutrition[key] === "number" && RDA_VALUES[key] > 0) && <p>Reference intakes: US Dietary Reference Intakes for adults (19–50 years; using the higher of male/female values where they differ).</p>}
      {source.database && <p>Composition source: {source.source_reference ? <a href={String(source.source_reference)}>{String(source.database)}</a> : String(source.database)}{source.food_name ? `, ${String(source.food_name)}` : ""}{source.fdc_id ? `, FDC ID ${String(source.fdc_id)}` : ""}.</p>}
      </>}
      {formObservations.length > 0 && <details id="vitamin-b3-individual-forms" open>
        <summary><strong>Vitamin B3 — Individual Forms</strong></summary>
        <div style={{overflowX: "auto"}}>
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead><tr><th style={thStyle}>Form</th><th style={thStyle}>Reported content</th><th style={thStyle}>Basis and preparation</th><th style={thStyle}>Evidence and limitations</th></tr></thead>
            <tbody>{formObservations.map((row) => <tr key={row.id} id={row.supplementary_key ? `nutrition-row-${row.supplementary_key}` : undefined}>
              <td style={tdStyle}>{row.href ? <a href={row.href}>{row.title}</a> : row.title}</td>
              <td style={tdStyle}>{row.quantity_status === "supported"
                ? `${row.range ? row.range.join("–") : row.value} ${row.unit}`
                : "Present — quantity not established"}</td>
              <td style={tdStyle}>{row.basis || "Measurement basis not established"}<br />{row.preparation || "Preparation not established"}{row.material ? <><br />{row.material}</> : null}</td>
              <td style={tdStyle}>
                <a href={foodFormReferenceHref(row.source_reference, location)}>[{row.source_reference.match(/food-source-(\d+)$/)?.[1]}]</a>
                {row.limitation && <p>{row.limitation}</p>}
                {row.provenance && <details><summary>Measurement details</summary><p>{row.provenance}</p></details>}
              </td>
            </tr>)}</tbody>
          </table>
        </div>
      </details>}
    </section>
  }

  return (
    <section className="nutrition-table-block" id="nutritional-highlights">
      {nutritionUnavailable ? <><h2>Nutrition</h2><p>Reliable composition data for this preparation are not yet available.</p></> : null}
      {hasUsdaCompositionTables && (
        <h2 id="nutrition-tables">{nutritionUnavailable ? "Recorded constituents" : "Nutrient Tables (per 100 g)"}</h2>
      )}
      {Object.keys(nutrition).length > 0 && typeof source.food_name === "string" && (
        <p className="nutrition-preparation"><strong>Selected food and preparation:</strong> {String(source.food_name)}. {String(source.basis || "per 100 g of the named food")}.</p>
      )}
      {tableMapsTo && hasUsdaCompositionTables && (
        <p style={{fontSize: "0.95em", color: "var(--ifm-font-color-base)", marginTop: "0.25rem", marginBottom: "0.75rem"}}>
          <strong>Maps to:</strong> {tableMapsTo}
        </p>
      )}

      {(coreRows.length > 0 || coreRangeRows.length > 0) && (
        <>
          <h3>Core nutrients</h3>
          {coreRangeRows.length > 0 && (
            <p style={{fontSize: "0.9em", color: "var(--ifm-font-color-base)", marginTop: "0.5rem"}}>
              The food form and measurement basis are specified in the source notes.
              Reference-intake percentages are not calculated from ranges.
            </p>
          )}
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={thStyle}>Nutrient</th>
                <th style={thStyle}>Amount per 100 g</th>
                <th style={thStyle}>% reference intake per 100 g</th>
              </tr>
            </thead>
            <tbody>
              {coreRows}
              {coreRangeRows.map(renderRangeRow)}
            </tbody>
          </table>
        </>
      )}

      {(microRows.length > 0 || mineralRangeRows.length > 0) && (
        <>
          <h3>Key vitamins and minerals</h3>
          <p style={{fontSize: "0.9em", color: "var(--ifm-font-color-base)", marginTop: "0.5rem"}}>
            {KEY_VITAMIN_TABLE_CAPTION}
          </p>
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={thStyle}>Nutrient</th>
                <th style={thStyle}>Amount per 100 g</th>
                <th style={thStyle}>% reference intake per 100 g</th>
              </tr>
            </thead>
            <tbody>{microRows}{mineralRangeRows.map(renderRangeRow)}</tbody>
          </table>
        </>
      )}

      {(advancedMicroRows.length > 0 || formObservations.length > 0) && view === "highlights" && (
        <AdvancedNutrition tabOnly>{advancedContent}</AdvancedNutrition>
      )}

      {hasBioactiveSection && (
        <>
          <h3>Bioactive compounds</h3>
          {bioactiveLipidRows.length > 0 && <p style={{fontSize: "0.9em", color: "var(--ifm-font-color-base)", marginTop: "0.5rem"}}>
            {BIOACTIVE_TABLE_CAPTION}
          </p>}
          <table style={{width: "100%", borderCollapse: "collapse", marginTop: "0.5rem"}}>
            <thead>
              <tr>
                <th style={thStyle}>Compound / class</th>
                <th style={thStyle}>{nutritionUnavailable ? "Content" : "Amount per 100 g"}</th>
                <th style={thStyle}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {bioactiveLipidRows}
              {supplementaryRows}
            </tbody>
          </table>

        </>
      )}

      {hasSupplementary && (
        <div style={{marginTop: "0.75rem", fontSize: "0.9em"}}>
          <strong>Sources and limitations</strong>
          <ul>
            {Array.from(noteGroups.values()).map(({number, rows}) => (
              <li key={number} id={`nutrition-source-${number}`}>
                <strong>{rows.map((row) => row.label).join(", ")}:</strong>{" "}{rows[0].public_note || "Supporting evidence and original measurement details are available in technical provenance below."}
                {rows[0].source_reference ? <> <a href={rows[0].source_reference}>[{rows[0].source_reference.match(/food-source-(\d+)$/)?.[1] || "Reference"}]</a></> : null}
              </li>
            ))}
          </ul>
          <details><summary>Technical provenance</summary>
            {Array.from(noteGroups.values()).map(({number, rows}) => (
              <div key={number}><strong>Source note {number}</strong>
                {rows.map((sup) => <p key={sup.key} id={`nutrition-note-${sup.key}`}><strong>{sup.label}:</strong> {linkifyFcirIds(sup.source_note)}{sup.source_reference ? <> <a href={sup.source_reference}>[{sup.source_reference.match(/food-source-(\d+)$/)?.[1] || "Reference"}]</a></> : null}</p>)}
              </div>
            ))}
          </details>
        </div>
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

            <p style={{marginTop: "1rem", fontSize: "0.9em", color: "var(--ifm-font-color-base)"}}>
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
            <p style={{marginTop: "0.75rem", fontSize: "0.9em", color: "var(--ifm-font-color-base)"}}>
              {authorised.caption}
            </p>
          )}
          {authorisedProvenance && (
            <p style={{marginTop: "0.5rem", fontSize: "0.9em", color: "var(--ifm-font-color-base)"}}>
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
      <div style={{marginTop: "0.75rem", fontSize: "0.9em", color: "var(--ifm-font-color-base)"}}>
        {hasReferencePercent && <div style={{marginBottom: "0.25rem"}}>
          <strong>Reference intakes:</strong> US Dietary Reference Intakes for adults (19–50 years;
          using the higher of male/female values where they differ).
        </div>}
        {source && (source.database || source.food_name || source.fdc_id) && (
          <div>
            <strong>Composition source:</strong>{" "}
            {source.database && <span>{source.source_reference ? <a href={String(source.source_reference)}>{String(source.database)}</a> : String(source.database)}</span>}
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
            {source.basis && (
              <span>
                {", "}
                {String(source.basis)}
              </span>
            )}
          </div>
        )}
      </div>
      )}
      {fcirFooterIds.length > 0 && (
        <div className="fcir-food-notes" style={{marginTop: "0.75rem", fontSize: "0.9em", color: "var(--ifm-font-color-base)"}}>
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
