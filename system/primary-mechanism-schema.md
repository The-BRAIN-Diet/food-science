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

## Related: Specific Mechanisms (SM)

SM pages reuse this schema’s **Profile A extended** rendering contract (section order, collapsibles, scoreable table, timing front matter). See `system/specific-mechanism-schema.md`. SMs are interpretation layers (`SM-SNP`, `SM-PHEN`, `SM-CROSS`) — not additional PM ontology.

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

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the mechanism title: `## <PM_ID> - <PM name>` (same heading level as numbered sections; do not use `#` or `###` for this line).

Three **profiles** are allowed; pick one per PM and keep numbering contiguous (no gaps in `## N.` sequence).

### Profile A — Extended narrative PM (e.g. BRS1 PMs, BRS6 PM1–PM4 with Intervention Breakdown)

1. Definition — `## 1. Definition`
2. Intervention Breakdown — `## 2. Intervention Breakdown` — must match `intervention_breakdown` in front matter
3. Functional Role — `## 3. Functional Role` (directional arrow summary)
4. Mechanistic Basis — `## 4. Mechanistic Basis`
   - **Canonical structure (Profile A):** see **PM §4 — Canonical four-part narrative** below. **Reference page:** [BRS1(PM1)](/docs/biological-targets/brs1/pm/brs1-pm1-amino-acid-availability-and-prioritisation).
   - **`### Summary` (required):** why this mechanism matters — the integrative implication in plain language, not a restated Definition or repeated mechanism name.
   - **Body (required):** three or more `#### (…)` blocks after Summary, in order: **primary mechanism** (one or more thematic blocks) → **boundaries** → **integration** (KCs, parent FM, cross-links). Explain how the mechanism works; do not re-define the entity.
   - **`<details>` (optional):** use only when the full narrative is long and collapsible UX helps; do not bury the primary implication inside `<details>`. Do not open `<details>` with scope-boundary or review-paper boilerplate.
   - **Citations (required where evidence-backed):** keep inline citations in §4 when rewriting or shortening prose — see **PM §4 — Citations** below. Do not drop references to make the narrative “cleaner.”
   - **Excluded from §4:** dietary levers, substance ← food bullets, lifestyle levers, scoreable inputs (those belong in §6–§8).
5. Underlying Mechanisms and Requirements — `## 5. Underlying Mechanisms and Requirements`
   - **Full subsection set:** `### 5.1` Cofactors and Supporting Inputs, `### 5.2` KCs, `### 5.3` Optional BRSX Modifiers, `### 5.4` Cross-BRS Links
   - **PM1-style (no Optional BRSX subsection):** `### 5.1` Cofactors and Supporting Inputs, `### 5.2` KCs (Key Constraints), `### 5.3` Cross-BRS Links (canonical: BRS6 PM1)
6. Dietary Levers — `## 6.` body inside `<details><summary><strong>Diet</strong></summary>…` (match FM pages) — substance ← food bullets per `system/substance-food-mapping-format.md`; no nested “Food sources (examples)” block
7. Lifestyle Levers — `## 7.` same pattern with `<strong>Lifestyle</strong>`; primary place for timing narrative when `timing_specific: "Yes"`
8. Scoreable Inputs & Modulation Signals — `## 8.` **only when this PM is scoreable in the ontology**; optional intro paragraph; table (or list) may sit inside `<details><summary><strong>Scoreable Input Categories</strong></summary>…` Use three rows only: **Functional Property Potentials**, **Realised Functional States**, **Preparation Transformations** (do not repeat §6 substances in a Substance / Nutrient Signals row).
9. References — `## 9. References`

### Profile A′ — Full narrative PM without Intervention Breakdown body (e.g. BRS6 PM1 legacy outline, BRS6 PM5)

Same as **Profile A** but omit §2 Intervention Breakdown when the PM does not use `intervention_breakdown` in front matter; renumber so Definition → Functional Role → Mechanistic Basis remains contiguous (see **Profile B** numbering for compact pages).

### Profile B — Compact PM (e.g. BRS6 PM2–PM8, BRS6 PM5)

1. Definition — `## 1. Definition`
2. Mechanistic Basis — `## 2. Mechanistic Basis` (optional `### Summary` + `<details>` as in Profile A when the narrative grows)
3. Underlying Mechanisms and Requirements — `## 3. Underlying Mechanisms and Requirements` with `### 3.1` Cofactors and Supporting Inputs, `### 3.2` KCs, `### 3.3` Optional BRSX Modifiers, `### 3.4` Cross-BRS Links
4. Dietary Levers — `## 4.` (`<details>` / **Diet**)
5. Lifestyle Levers — `## 5.` (`<details>` / **Lifestyle**)
6. Functional Outputs (Directional Effects) — `## 6.` short arrow-line or paragraph (distinct from §2 Functional Role on Profile A)
7. References — `## 7. References`

### PM §4 — Canonical four-part narrative

Teachable PM Mechanistic Basis follows this flow (all visible by default on the reference page):

| Step | Heading level | Role |
|------|---------------|------|
| 1 | `### Summary` | **Why it matters** — lead with the most important implication (e.g. neurotransmitter biology depends first on an adequate amino-acid pool). |
| 2 | `#### (…)` primary block(s) | **How it works** — meal-level biology, substrates, cofactor context where mechanistically necessary; citations inline. |
| 3 | `#### (Boundaries of the mechanism)` (or equivalent) | **What this PM does not cover** — downstream PMs, transport, conversion, other BRS domains; brief, after the mechanism is explained. |
| 4 | `#### (Integration within BRS…)` (or equivalent) | **Where it sits** — KCs, FM, cross-BRS links; one short placement paragraph. |

**Anti-patterns:** opening with the mechanism name or entity ID; leading with scope boundaries; review-paper tone; closing “together, these relationships…” synthesis paragraphs; `Dietary levers include…` or food-example lists in §4; stripping citations during editorial passes.

Authoring detail: `system/mechanism-page-section-prose.md` (**PM Mechanistic Basis — canonical structure**).

### PM §4 — Citations

Mechanistic Basis must remain **evidence-anchored**, not assertion-only. The four-part structure is a teaching layout, not permission to remove sources.

| Where | Citation expectation |
|-------|-------------------|
| **`### Summary`** | Usually implication-only; add a citation only when a single study directly supports the central claim. |
| **Primary mechanism `####` blocks** | **Required** for evidence-backed statements (pathway biology, meal effects, substrate relationships). Inline link + numeric ref: `[Author (Year)](/docs/papers/BRAIN-Diet-References#citation_key) [n]`. |
| **Boundaries** | Cite when the boundary claim depends on literature (e.g. LNAA competition → Fernstrom on [BRS1(PM2)](/docs/biological-targets/brs1/pm/brs1-pm2-lat1-competitive-transport-modulation)); PM cross-links alone need no duplicate citation if §9 already lists the source. |
| **Integration** | Typically placement prose + entity links; citations optional unless integration asserts an evidence-backed dependency. |

**Format**

- Use numeric in-text refs `[1]`, `[2]` that match the numbered list in **§9 References** (Profile A) or **§7 References** (Profile B).
- Prefer linked author–year labels in prose, not bare “see References.”
- Pull keys from `key_studies` / spreadsheet `references` front matter when ingesting; verify each `citation_key` exists in `static/bibtex/BRAIN-diet.bib`.

**When rewriting §4:** preserve existing citations unless the claim is removed; add citations for new evidence-backed claims. **Reference:** [BRS1(PM1)](/docs/biological-targets/brs1/pm/brs1-pm1-amino-acid-availability-and-prioritisation) (Mariotti in primary mechanism; Fernstrom in boundaries).

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
- Every numeric citation `[n]` used in **Mechanistic Basis** must appear in the page’s **References** section with a resolvable `citation_key` (orphan in-text refs fail authoring review).
- PM pages with `key_studies` or non-empty `references` front matter should cite at least one source in §4 primary mechanism blocks when those studies support the mechanism narrative (waived only when `mechanistic_authoring_required: true`).

## Field Integrity Mapping

- Dependencies -> `dependencies` (KCs + cross-BRS links only)
- Cofactors -> `cofactors` (cofactors only)
- Intervention dominance -> `intervention_dominance.mode`
- Column P -> `functional_mechanism_ownership`

An entity must not appear in more than one of these roles with conflicting meaning.

