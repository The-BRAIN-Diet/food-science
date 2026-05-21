# Primary Mechanism (PM) Schema

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract for Primary Mechanism pages.
It is derived from the PM specification and enforces one-to-one FM ownership.

## Spreadsheet Interpretation Authority

- Use `system/brs-spreadsheet-schema.md` as the authoritative column-by-column
  interpretation for spreadsheet ingestion.
- When schema structure and spreadsheet interpretation need coordination, do not
  infer; resolve using the spreadsheet schema and generation rules.

## Scope

- Represents a specific intervention-influenceable biological mechanism.
- Contributes to exactly one FM.
- Must remain mechanistic (not FM/system interpretation).

## Required Top-Level Fields

```yaml
id: string                           # e.g. "BRS2-PM3"
name: string
brs: string
overview: string                     # <=120 words
functional_outputs_directional_effects: string
dependencies:                        # from spreadsheet dependencies field
  kcs:
    - id: string
      name: string
      type: "substrate" | "precursor"
  cross_brs_links:
    - id: string
      name: string
cofactors:                           # from cofactors field; cofactors only
  - id: string
    name: string
inputs:                              # from inputs field using evidence from key studies
  dietary:
    kc_inputs:
      - kc_id: string
        rationale: string
    substances:
      - substance: string            # must exist in system
        efficacy_note: string
    foods:
      - food: string                 # must exist in system
        linked_substances: [string]
        rationale: string
  environmental:
    - factor: string
      effect: string
outputs_biological_effects:
  - string                           # metabolites/signaling/neurotransmitter/pathway effects
functional_mechanism_ownership:      # from Column P
  fm_id: string
  fm_name: string
intervention_dominance:              # from intervention dominance
  mode: "diet-dominant" | "lifestyle-dominant" | "mixed"
  inherit_from_fm: boolean
  override_justification: string     # required if inherit_from_fm=false
constraints_failure_modes:
  - type: string                     # e.g. substrate deficiency, cofactor deficiency, bottleneck
    description: string
notes:
  - string                           # optional
references:
  - index: number
    label: string
    citation_key: string
    href: string                     # /docs/papers/BRAIN-Diet-References#citation_key
missing_entities:                    # optional
  foods: [string]
  substances: [string]
```

## Timing Specific (required ontology metadata; not a default public body section)

`timing_specific` is **required in front matter** on all PM pages (`Yes` | `No`). It must **not** appear as a standalone numbered body section (`## N. Timing Specific` with only `Yes` or `No`). Where timing materially alters interpretation, discuss it within **Functional Role**, **Mechanistic Basis**, **Lifestyle Levers**, or **Scoreable Inputs & Modulation Signals**.

## Intervention Breakdown (extended-profile front matter + body)

When a PM carries `intervention_breakdown` in front matter, the published body includes **## 2. Intervention Breakdown** (single allowed semantic value matching front matter) immediately after Definition. This is distinct from legacy `intervention_dominance` in YAML.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the mechanism title: `## <PM_ID> - <PM name>` (same heading level as numbered sections; do not use `#` or `###` for this line).

Three **profiles** are allowed; pick one per PM and keep numbering contiguous (no gaps in `## N.` sequence).

### Profile A — Extended narrative PM (e.g. BRS1 PMs, BRS6 PM1–PM4 with Intervention Breakdown)

1. Definition — `## 1. Definition`
2. Intervention Breakdown — `## 2. Intervention Breakdown` — must match `intervention_breakdown` in front matter
3. Functional Role — `## 3. Functional Role` (directional arrow summary)
4. Mechanistic Basis — `## 4. Mechanistic Basis`
   - **UX (recommended):** start with `### Summary` (short paragraph always visible), then a `<details>` block whose `<summary>` labels the extended mechanistic narrative (e.g. glucose appearance, structure, sequencing). Inside the block, use `####` subheads for thematic blocks and link citations to `/docs/papers/BRAIN-Diet-References#…` plus numeric refs as needed.
   - Long-form PMs may instead use a single `## 4.` body without Summary/details if the narrative stays short.
5. Underlying Mechanisms and Requirements — `## 5. Underlying Mechanisms and Requirements`
   - **Full subsection set:** `### 5.1` KCs, `### 5.2` Optional BRSX Modifiers, `### 5.3` Cross-BRS Links, `### 5.4` Co-factors
   - **PM1-style (no Optional BRSX subsection):** `### 5.1` KCs, `### 5.2` Co-factors, `### 5.3` Cross-BRS Links (omit Optional BRSX when not used; do not renumber KC out of order)
6. Dietary Levers — `## 6.` body inside `<details><summary><strong>Diet</strong></summary>…` (match FM pages)
7. Lifestyle Levers — `## 7.` same pattern with `<strong>Lifestyle</strong>`; primary place for timing narrative when `timing_specific: "Yes"`
8. Scoreable Inputs & Modulation Signals — `## 8.` **only when this PM is scoreable in the ontology**; optional intro paragraph; table (or list) may sit inside `<details><summary><strong>Scoreable Input Categories</strong></summary>…`
9. References — `## 9. References`

### Profile A′ — Full narrative PM without Intervention Breakdown body (e.g. BRS6 PM1 legacy outline, BRS6 PM5)

Same as **Profile A** but omit §2 Intervention Breakdown when the PM does not use `intervention_breakdown` in front matter; renumber so Definition → Functional Role → Mechanistic Basis remains contiguous (see **Profile B** numbering for compact pages).

### Profile B — Compact PM (e.g. BRS6 PM2–PM8, BRS6 PM5)

1. Definition — `## 1. Definition`
2. Mechanistic Basis — `## 2. Mechanistic Basis` (optional `### Summary` + `<details>` as in Profile A when the narrative grows)
3. Underlying Mechanisms and Requirements — `## 3. Underlying Mechanisms and Requirements` with `### 3.1` KCs, `### 3.2` Optional BRSX Modifiers, `### 3.3` Cross-BRS Links, `### 3.4` Co-factors
4. Dietary Levers — `## 4.` (`<details>` / **Diet**)
5. Lifestyle Levers — `## 5.` (`<details>` / **Lifestyle**)
6. Functional Outputs (Directional Effects) — `## 6.` short arrow-line or paragraph (distinct from §2 Functional Role on Profile A)
7. References — `## 7. References`

### Excluded from the public PM body

Body sections **do not** include Missing Entities, System Integration, Key Insight, Functional Mechanism Ownership, Intervention Dominance, Constraints and Failure Modes, Scoring Interpretation, Notes, or Mechanism Summary Table. Those belong in front matter, FM pages, authoring metadata, or other artefacts. Intervention dominance and FM ownership stay in YAML/front matter where present.

### MDX body vs YAML

The **Required Top-Level Fields** block is the ingestion and authoring data contract (and may appear in front matter). It is not a one-to-one list of rendered body sections: the published MDX follows **Profile A** or **Profile B** above. Keys such as `outputs_biological_effects`, `inputs`, `constraints_failure_modes`, and `notes` support tooling and related pages; they do not imply extra sections after **References** unless the schema is explicitly extended.

## Automated validation

```bash
npm run mechanisms:validate
```

Implementation: `scripts/validate-mechanism-pages.mjs` and `scripts/lib/mechanism-page-validation.mjs` (front matter `timing_specific`, no visible Timing Specific section, extended-profile section order) plus `scripts/lib/pm-mechanistic-basis.mjs` (Mechanistic Basis missing/placeholder checks).

**Mechanistic Basis validation:** if the Mechanistic Basis section (typically `## 4.` on extended PMs, `## 2.`–`## 3.` on compact PMs) is missing or placeholder, validation fails unless the page has `mechanistic_authoring_required: true` in front matter.

## Validation Rules

- `timing_specific` is required in front matter (`Yes` | `No`); visible `## N. Timing Specific` body sections are forbidden.
- Mechanistic Basis must be present and non-placeholder unless `mechanistic_authoring_required: true` is set in front matter.
- When `intervention_breakdown` is present, body must include `## 2. Intervention Breakdown` matching front matter.
- `overview` must be <=120 words.
- `functional_mechanism_ownership` must contain exactly one FM (never multiple).
- `dependencies` must not include PM-to-PM dependencies.
- `dependencies.kcs[].type` must be only `substrate` or `precursor`.
- `cofactors` must not include KCs, PMs, foods, or unrelated substances.
- Inputs must be mechanistically justified; no generic food advice entries.
- Foods/substances must exist in system; unresolved entities may be recorded in optional `missing_entities` authoring metadata but must not be rendered as a PM page section.
- No scoring formulas or numeric scoring logic allowed.
- No Secondary Mechanisms (SMs) introduced during initial rollout.
- References must resolve to existing citation keys in `static/bibtex/BRAIN-diet.bib`.

## Field Integrity Mapping

- Dependencies -> `dependencies` (KCs + cross-BRS links only)
- Cofactors -> `cofactors` (cofactors only)
- Intervention dominance -> `intervention_dominance.mode`
- Column P -> `functional_mechanism_ownership`

An entity must not appear in more than one of these roles with conflicting meaning.

