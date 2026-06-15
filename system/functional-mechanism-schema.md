# Functional Mechanism (FM) Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract for Functional Mechanism pages.
It is derived from the FM specification and is intended to be strict enough for
validation while remaining readable for authors.

## Related: Phenome roll-ups

FM **§2 Functional Outcome Context** holds a concise integrative snapshot (`functional_outcome_context` in front matter) — normally 2–3 outcomes, max 4. It does **not** roll up all child PM phenome mappings (that belongs on future phenome graph pages). See `system/phenome-relationship-schema.md`. Do not embed phenome outcome claims in §1 Definition.

When `mechanisms_covered` has **exactly one** PM, apply the **Single-PM FM (1:1) rule**: FM §2 phenome labels and confidence must align with that PM’s `phenome_relationships` (see `system/phenome-relationship-schema.md`).

## Spreadsheet Interpretation Authority

- Use `system/brs-spreadsheet-schema.md` as the authoritative field-by-field
  interpretation for spreadsheet ingestion.
- When schema structure and spreadsheet interpretation need coordination, do not
  infer; resolve using the spreadsheet schema and generation rules.

## Definition (ontology)

Functional Mechanisms (FMs) represent integrated biological states that emerge from the coordinated activity of related Primary Mechanisms (PMs). They describe the functional capacities, desired states or regulatory conditions that arise from underlying biological processes and serve as the **principal navigational and teaching layer** of the framework.

Architecture: **BRS → FM → PM**. FM pages live at `docs/biological-targets/brs{N}/fm{M}/`; child PMs share the same folder. PM identifiers use **BRS-wide incremental numbering** (`BRS{N}-FM{M}-PM{k}` where `k` is unique within the BRS, assigned in FM order — e.g. `BRS1-FM1-PM1`, `BRS1-FM1-PM2`, `BRS1-FM2-PM3`, … `BRS1-FM5-PM9`).

See also `system/brain-diet-ontology-rules.md` §1.2 and §1.4.

## Scope

- FM pages are **synthesis pages**, not implementation pages.
- Represents an integrated biological state at FM breadth (not a single PM process).
- Must synthesise constituent PMs into an emergent functional state; must not repeat PM page content (mechanistic detail, dietary levers, lifestyle levers, or scoreable inputs).
- **Interventions act on PMs.** Dietary levers, lifestyle levers, and scoreable inputs belong on **PM pages** only.
- FM pages describe the integrated state that emerges, identify contributing PMs and KCs in §4, and roll up cross-BRS placement in §5.
- Must not contain scoring formulas.

## FM Authoring — Integration Without Repetition

Functional Mechanism pages must **synthesise** their PMs rather than **repeat** them.

**Role split:** PMs own mechanisms and interventions. FMs own emergent integration.

### FM Definition Rule

An FM definition must:

- name the integrated regulatory state
- explicitly reflect the core contribution of each included PM
- describe the emergent functional consequence
- avoid repeating PM definitions in full

**Preferred pattern:**

`Integrated regulation of [PM1 contribution], [PM2 contribution], and [PM3 contribution], influencing [emergent functional state / outcome].`

**BRS6(FM1) — PM contributions to reflect in the definition:**

- PM1: glucose appearance kinetics
- PM2: glycaemic variability regulation
- PM3: insulin sensitivity and glucose disposal

**Example (canonical for BRS6(FM1)):**

Integrated regulation of glucose appearance, glycaemic stability, and insulin-supported glucose disposal across the post-prandial period, influencing metabolic continuity, reactive neuroendocrine demand, and cognitive energy availability.

### Single-PM FM (1:1) definition and narrative

When `mechanisms_covered` contains **exactly one** PM:

- **§1 Definition** names that PM’s integrated contribution directly (no plural “PMs” framing required).
- **§2 Functional Outcome Context** follows the **Single-PM FM (1:1) rule** in `system/phenome-relationship-schema.md` (matching phenome labels and confidence to the child PM).
- **§4.2 Integrated Functional Narrative** may state explicitly that the FM state maps onto the sole child PM without additional parallel PM integration.

**Canonical example:** `docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation.mdx` → `BRS4-FM4-PM9`.

### FM Mechanistic Basis Rule

Section **4. Mechanistic Basis (Integrated FM Narrative)** (`## 4.`) is the training and navigation layer: it links constituent PMs and KCs with explicit contribution lines, then synthesises how they combine into the emergent FM state. Do **not** open by repeating the §1 Definition verbatim. See `system/mechanism-page-section-prose.md`.

Section **4.** must include:

- **`### 4.1 Core Primary Mechanisms`** — linked PM bullets with one contribution line each
- **`### 4.2 Supporting Biological Pools (Key Constraints)`** — linked KC bullets with one contribution line each, or `- None listed` when no KCs apply
- **`### 4.3 Integrated Functional Narrative`** — synthesis paragraph(s) explaining how PMs and KCs combine into the FM state
- **`### 4.4 Functional Failure Modes`** — required when `key_constraints` is non-empty; KC-linked stressor narrative explaining functional failure (omit when §4.2 is `- None listed`)
- **`### 4.5 Evidence Highlights`** *(optional)* — FM-level evidence for why the integrated state matters; not PM delivery/intervention dumps

Within §4:

- briefly identify the role of each PM and KC
- explain how the PMs interact and how shared pools constrain them
- describe the higher-order functional state that emerges
- avoid copying detailed PM mechanistic paragraphs

**Use this structure:**

1. Opening line (optional) introducing the integrated narrative
2. **`### 4.1 Core Primary Mechanisms`** — linked PM list with contribution lines
3. **`### 4.2 Supporting Biological Pools (Key Constraints)`** — linked KC list with contribution lines, or `- None listed`
4. **`### 4.3 Integrated Functional Narrative`** — synthesis paragraph(s)
5. **`### 4.4 Functional Failure Modes`** — when `key_constraints` is non-empty (see **BRS5(FM1)**)
6. Optional **`### 4.5 Evidence Highlights`** — when FM-level evidence framing is needed (see **BRS1(FM4)**)

**Canonical examples:**

| Pattern | Reference |
|---|---|
| §4.1–4.3 + optional §4.5 (no KCs) | `docs/biological-targets/brs1/fm4/brs1-fm4-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` |
| §4.1–4.4 with KC-linked failure modes | `docs/biological-targets/brs5/fm1/brs5-fm1-gut-barrier-integrity-and-immune-interface.mdx` |

**Good pattern:**

FM1 integrates glucose entry kinetics, variability regulation, and disposal capacity to stabilise post-prandial energy availability and reduce reactive metabolic volatility.

**Bad pattern (PM summary dump):**

“PM1 does X with fibre, resistant starch, vinegar… PM2 does Y with Monnier… PM3 does Z with magnesium…” — do not list PM-level interventions, citations, or `<details>` content on the FM page.

### Deduplication Rule

If detailed mechanism content exists on a PM page, do not repeat it on the FM page.

| PM | Detail stays on PM page only |
|---|---|
| PM1 | fibre, resistant starch, gastric emptying, meal sequencing |
| PM2 | oscillatory glucose exposure and variability |
| PM3 | insulin responsiveness and disposal |

The FM page should only describe **how these combine**, not re-teach each PM.

### FM Functional Role Rule

**Functional Role** (§3) is a short directional line describing emergent outcomes (↑ / ↓), not a mechanism dump. It complements the definition; it does not substitute for §4 Mechanistic Basis.

## Intervention Breakdown (required)

Published FM pages must include **## 2. Intervention Breakdown** immediately after **## 1. Definition** and before **## 3. Functional Role**.

Choose **one** value only (no percentages, weighted estimates, or prose unless necessary):

| Value | Meaning |
|---|---|
| Food-State Dominant | Primarily modulated through food composition, structure, preparation state, digestion kinetics, or meal architecture. |
| Food-State Leaning | Strongly food-responsive but meaningfully influenced by behavioural, physiological, or environmental context. |
| Mixed Modulation | Food-state and behavioural/lifestyle regulation contribute comparably. |
| Behavioural/Lifestyle Leaning | Primarily influenced through behavioural, circadian, environmental, autonomic, or adaptive regulation, with meaningful nutritional contribution. |
| Behavioural/Lifestyle Dominant | Primarily governed through behavioural, environmental, circadian, autonomic, or adaptive regulation rather than meal-level modulation. |

Use this field to guide recipe-scoreability expectations. Do **not** create temporal or timing-based intervention categories (for example, “Temporal Leaning”).

Legacy `intervention_dominance` spreadsheet values map approximately as: Diet-Dominant → Food-State Dominant; Diet-Supported → Food-State Leaning; Lifestyle-Dominant → Behavioural/Lifestyle Dominant; mixed → Mixed Modulation.

## Timing Specific (required ontology metadata; not a default public body section)

`timing_specific` is **required in front matter** (and in CUE / extractors / scoring / traversal when wired). It must **not** be rendered as a standalone numbered body section (`## N. Timing Specific` with only `Yes` or `No`).

Allowed values only:

- **Yes** — timing materially alters interpretation, effectiveness, or biological meaning (chrononutrition, temporal state).
- **No** — timing is not a material modifier for interpreting this FM.

Timing is a **separate modifier flag**, not an intervention modulation class. Where timing materially alters interpretation, discuss it naturally within **Functional Role**, **Mechanistic Basis**, **Lifestyle Levers**, or **Scoreable Inputs & Modulation Signals** rather than as an isolated Yes/No section.

## Required Top-Level Fields

```yaml
title: string                      # e.g. "Glycaemic–Insulin Stability & Cognitive Energy Availability"
fm_id: string                      # e.g. "BRS6(FM1)"
parent_brs: string                 # e.g. "BRS6"
summary: string                    # canonical one-line definition
mechanisms_covered:
  - id: string
    name: string
    href: string                   # required PM page link
key_constraints:
  - id: string
    name: string
    type: "substrate" | "precursor"
    href: string                   # required KC page link
intervention_breakdown: string     # required; one allowed value only (see Intervention Breakdown)
timing_specific: string            # required; "Yes" | "No" only
intervention_dominance: string     # legacy spreadsheet alias; map to intervention_breakdown at ingest
coverage_timing: string            # legacy; does not replace timing_specific on the page
references:
  - string                         # numeric citation links to bibliography anchors
functional_outcome_context:        # optional; concise FM integrative outcomes (max 4)
  - outcome_name: string
    confidence: string             # low | low-medium | medium | high
    synthesis: string              # 1–2 sentences; do not list child PMs
    references:
      - label: string
        citation_key: string
        href: string
hide_title: boolean
```

## Canonical Body Sections (Authoring / Ingestion Superset)

The YAML shape below supports spreadsheets, tooling, and future sections. **Published FM MDX** follows **Section Order (Page Rendering Contract)**; many keys below are not rendered as body sections on the current BRS6 FM pages (see **MDX body vs YAML**).

```yaml
definition: string
functional_role: string
mechanistic_basis_implementation_of_pms: string
underlying_mechanisms_and_requirements:
  pms:                               # render: ### 5.2 PMs (Primary Mechanisms)
    - id: string
      name: string
      href: string
  kcs:                               # render: ### 5.3 KCs (Key Constraints)
    - id: string
      name: string
      type: "substrate" | "precursor"
      href: string
  optional_brsx_modifiers:           # optional; render as ### 5.4 only if used
    - string
  connected_mechanisms:                   # render: ### 5.4 Connected Mechanisms
    - id: string
      name: string
dietary_levers:
  - string
lifestyle_levers:
  - string
scoreable_food_state_inputs:           # ingestion YAML key unchanged; public heading: ## N. Scoreable Inputs & Modulation Signals
  input_rows:
    - input_category: string       # Functional Property Potentials | Realised Functional States | Substance / Nutrient Signals | Preparation Transformations
      example_inputs: [string]
      functional_relevance: string
  interpretation_note: string
recipe_translation_scoring_logic:    # tooling / narrative artefacts; not a public body section in current contract
  intro: string
  recipe_characteristics:
    - characteristic: string
      interpretation: string
  prioritisation_rule: string
functional_consequences:
  - string
cross_system_links:
  - id: string
    name: string
mechanism_summary:
  fm_id: string
  parent_brs: string
  intervention_dominance: string
  coverage_timing: string
  response_type: string
  functional_latency: string
scoring_interpretation:
  low_support: string
  high_support: string
interpretation_boundary: string
evidence_base:
  evidence_type: string
  evidence_notes: string
references:
  - index: number
    label: string
    href: string                   # /docs/papers/BRAIN-Diet-References#citation_key
missing_entities:
  - string
```

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the FM title: `## <FM_ID> - <FM name>` (same heading level as `## 1. Definition`; use a hyphen/spaces as on live pages; do not use `#` or `###` for this line).

### Canonical public body (synthesis contract)

Numbered sections must stay contiguous. Optional `### 5.5 Evidence Highlights` nests under §5 when used (FM-level “why this matters” — not PM intervention evidence).

1. **Definition** — `## 1. Definition` — integrated regulatory state per **FM Definition Rule**; `summary` in front matter must match this intent
2. **Functional Outcome Context** — `## 2. Functional Outcome Context` — concise integrative outcomes from `functional_outcome_context` as `<details>` dropdowns; FM disclaimer required; no PM roll-up tables
3. **Intervention Breakdown** — `## 3. Intervention Breakdown` — single allowed value per **Intervention Breakdown** (required); must match `intervention_breakdown` in front matter
4. **Functional Role** — `## 4. Functional Role` — short directional arrow line describing **emergent FM outcomes** per **FM Functional Role Rule**
5. **Mechanistic Basis (Integrated FM Narrative)** — `## 5. Mechanistic Basis (Integrated FM Narrative)` — per **FM Mechanistic Basis Rule** and **Deduplication Rule**; weave timing context in §5.3 when `timing_specific: "Yes"`
   - **`### 5.1 Core Primary Mechanisms`** — linked PM bullets with contribution lines
   - **`### 5.2 Supporting Biological Pools (Key Constraints)`** — linked KC bullets with contribution lines, or `- None listed`
   - **`### 5.3 Integrated Functional Narrative`** — synthesis paragraph(s)
   - **`### 5.4 Functional Failure Modes`** — required when `key_constraints` is non-empty
   - **`### 5.5 Evidence Highlights`** *(optional)* — FM-level evidence for why the integrated state matters; not PM delivery/intervention dumps
6. **Connected Mechanisms** — `## 6. Connected Mechanisms` — roll up from constituent PM `§7 Connected Mechanisms` with linked PM pages where they exist
7. **References** — `## 7. References` — `Author et al. (Year) — Topic` with bibliography links per **`system/brs-citation-reference-standard.md`**

**Not on FM pages:** standalone `Primary Mechanisms (PMs)` or `KCs` index sections (PM/KC links live in §4.1/§4.2), `Dietary Levers`, `Lifestyle Levers`, `Scoreable Inputs & Modulation Signals`, `Underlying Mechanisms and Requirements`, legacy `BRS Links` heading, or PM-level cofactor/dietary lever rollups — those belong on **PM pages** (§7–§9).

`mechanisms_covered` and `key_constraints` remain in **front matter** for ontology traversal and tooling; §4.1/§4.2 render those links in the integrated narrative.

`timing_specific` (`Yes` | `No`) lives in **front matter only** for ontology traversal, filtering, and scoring — not as a public `## N. Timing Specific` section.

### Excluded from the public FM body (current contract)

Do not add body sections after **References** (`## 6.`). The following are **not** part of the FM narrative: **Dietary Levers**, **Lifestyle Levers**, **Scoreable Inputs & Modulation Signals**, **Underlying Mechanisms and Requirements** (and legacy §5.1–§5.4 rollups), Recipe Translation & Scoring Logic, standalone Functional Consequences / Outputs, Mechanism Summary Table, Scoring Interpretation, Interpretation Boundary, Evidence Base, Missing Entities. Those may exist in YAML, spreadsheets, PM pages, or other artefacts.

### Legacy note

Older FM pages used Diet/Lifestyle/Scoreable sections and `Underlying Mechanisms and Requirements` with PM/KC rollups. New edits must follow the **synthesis contract** above (§4 integrated narrative + §5 Connected Mechanisms).

## Automated validation

Run against all FM and PM MDX pages under `docs/biological-targets/**/{fm,pm}/`:

```bash
npm run mechanisms:validate
```

Implementation: `scripts/validate-mechanism-pages.mjs` (shared rules in `scripts/lib/mechanism-page-validation.mjs` and `scripts/lib/phenome-relationships.mjs`). Checks front matter for `intervention_breakdown` and `timing_specific`, forbids visible `## N. Timing Specific` body sections, validates FM section order, phenome/outcome front matter, and **Single-PM FM (1:1)** alignment when `mechanisms_covered` has exactly one child PM.

## Validation Rules

- When `mechanisms_covered` has **exactly one** PM, `functional_outcome_context` must follow the **Single-PM FM (1:1) rule** in `system/phenome-relationship-schema.md` (matching phenome labels and confidence to the child PM; enforced by `validateSinglePmFmOutcomeAlignment`).
- `title`, `fm_id`, `parent_brs`, `summary`, `intervention_breakdown`, and `timing_specific` are required and non-empty.
- `intervention_breakdown` must be exactly one of the five allowed values in **Intervention Breakdown**; no combined or percentage labels.
- `timing_specific` must be exactly `Yes` or `No`.
- `summary` must match the Definition section intent, remain concise, and follow **FM Definition Rule** (integrated PM contributions + emergent outcome; no full PM definition repeats).
- Definition and **Mechanistic Basis** must follow **FM Authoring — Integration Without Repetition** (no PM summary dumps; no duplicated PM `<details>` content).
- **Mechanistic Basis** should use the four-part structure: opening synthesis → one clause per PM → integration sentence → functional consequence sentence.
- `mechanisms_covered` and `key_constraints` must use ID+name+href.
- FM body section headings must be explicitly numbered: Definition → Intervention Breakdown → Functional Role → Mechanistic Basis (Integrated FM Narrative) → Connected Mechanisms → References.
- Published body must **not** include `## N. Timing Specific`; `timing_specific` is validated in front matter only (`Yes` | `No`).
- Published body must **not** include `Dietary Levers`, `Lifestyle Levers`, `Scoreable Inputs & Modulation Signals`, or `Underlying Mechanisms and Requirements`.
- Published body must **not** use legacy `## N. BRS Links` or standalone `## N. Connected Mechanisms`; use `## 6. Connected Mechanisms`.
- `## 5. Connected Mechanisms` is required; roll up from constituent PM §6 connected mechanisms.
- `## 6. References` is required when references exist in front matter.
- §4 must include `### 4.1 Core Primary Mechanisms`, `### 4.2 Supporting Biological Pools (Key Constraints)`, and `### 4.3 Integrated Functional Narrative`.
- When `key_constraints` is non-empty, §4 must include `### 4.4 Functional Failure Modes`.
- FM pages must **not** include standalone `## N. Primary Mechanisms (PMs)` or `## N. KCs` sections — PM/KC links belong in §4.1/§4.2.
- Optional `### 4.5 Evidence Highlights` must nest under §4 Mechanistic Basis when present.
- Published body must render `## 2. Intervention Breakdown` between Definition and Functional Role; body value must match front matter `intervention_breakdown`.
- Claims in Mechanistic Basis and §4.1 must stay mechanistic / interpretive (`may`, `supports`, `associated with`) unless evidence supports stronger wording.
- Where `scoring_interpretation` or similar content exists in YAML or tooling, it must not include formulas, equations, or numeric scoring logic.
- Do not expose raw scoring code or internal scoring implementation details in FM pages.
- Do not display PM/FM code references in recipe-facing examples beyond mechanism-page context.
- References must all resolve to `static/bibtex/BRAIN-diet.bib` citation keys per **`system/brs-citation-reference-standard.md`**.
- Inline body citations use `[Author et al., Year]`; References entries include descriptive study topics.
- When an **Evidence Base** (or equivalent) block exists in non-page artefacts, avoid uncited research claims there; the public FM MDX body does not require a separate Evidence Base section under the current contract.

## Dose Rules (when summary or dose metadata exists)

- Dose ranges are functional anchors, not prescriptions.
- Prefer diet-first physiological ranges.
- Avoid supplement-level dose framing unless explicitly justified in evidence.
- Always contextualize dose with bioavailability where relevant.
- The trimmed FM page body does not include a Mechanism Summary Table; keep dose-adjacent fields in front matter or ingestion metadata unless the contract is extended.

