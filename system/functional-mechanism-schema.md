# Functional Mechanism (FM) Schema

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract for Functional Mechanism pages.
It is derived from the FM specification and is intended to be strict enough for
validation while remaining readable for authors.

## Spreadsheet Interpretation Authority

- Use `system/brs-spreadsheet-schema.md` as the authoritative field-by-field
  interpretation for spreadsheet ingestion.
- When schema structure and spreadsheet interpretation need coordination, do not
  infer; resolve using the spreadsheet schema and generation rules.

## Scope

- Represents a controllable system-level biological function.
- Must aggregate associated PMs and KCs without redefining PM biology.
- Must synthesise PMs into an emergent functional state; must not repeat PM page content.
- Must not contain scoring formulas.

## FM Authoring — Integration Without Repetition

Functional Mechanism pages must **synthesise** their PMs rather than **repeat** them.

**Role split:** PMs own mechanisms. FMs own emergent integration.

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

### FM Mechanistic Basis Rule

Section **4. Mechanistic Basis (Implementation of PMs)** (`## 4.`) must:

- briefly identify the role of each PM
- explain how the PMs interact
- describe the higher-order functional state that emerges
- avoid copying detailed PM mechanistic paragraphs

**Use this structure:**

1. Opening synthesis paragraph
2. One short sentence or clause per PM (use “PM1 governs…”, “PM2 governs…”, etc.)
3. Integration sentence explaining the combined effect
4. Functional consequence sentence

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
  cross_brs_links:                   # render: ### 5.4 Cross-BRS Links
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

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the FM title: `## <FM_ID> - <FM name>` (same heading level as `## 1. Definition`; use a hyphen/spaces as on live pages; do not use `#` or `###` for this line).

### Canonical public body (BRS6 FM1)

Numbered sections must stay contiguous (renumber if §8 Scoreable is omitted — then References becomes `## 8. References`).

1. **Definition** — `## 1. Definition` — integrated regulatory state per **FM Definition Rule**; `summary` in front matter must match this intent
2. **Intervention Breakdown** — `## 2. Intervention Breakdown` — single allowed value per **Intervention Breakdown** (required); must match `intervention_breakdown` in front matter
3. **Functional Role** — `## 3. Functional Role` — short directional arrow line per **FM Functional Role Rule**
4. **Mechanistic Basis (Implementation of PMs)** — `## 4. Mechanistic Basis (Implementation of PMs)` — synthesis per **FM Mechanistic Basis Rule** and **Deduplication Rule** (no PM-style Summary + `<details>`; no PM citation dumps); weave timing context here when `timing_specific: "Yes"`
5. **Underlying Mechanisms and Requirements** — `## 5. Underlying Mechanisms and Requirements`
   - `### 5.1 Cofactors and Substrates` — when an FM spans multiple PMs, use a per-PM table with columns **PM | Cofactors | KC substrates** (no separate direct-inputs column; pathway inputs live in §6 Dietary Levers). **Cofactors** from each PM §5.1 (enzyme cofactors only). **KC substrates** from §3 Supporting Inputs/Substrates on every KC in that PM’s §5.2; multiple KCs in one cell separated by `;`, with KC page link in parentheses after each group.
   - `### 5.2 PMs (Primary Mechanisms)` — linked list to PM pages
   - `### 5.3 KCs (Key Constraints)` — linked list to KC pages
   - `### 5.4 Cross-BRS Links`
   - Optional extra subsection (e.g. optional BRSX modifiers) only when used; keep numbering contiguous after 5.4
6. **Dietary Levers** — `## 6. Dietary Levers` — body inside `<details><summary><strong>Diet</strong></summary>…` — substrate-to-food bullets use **substance ← food** format per `system/substance-food-mapping-format.md` (2–3 foods per substance; duplicate foods across substances when applicable); narrative meal-pattern levers may remain prose
7. **Lifestyle Levers** — `## 7. Lifestyle Levers` — body inside `<details><summary><strong>Lifestyle</strong></summary>…`; primary place for chrononutrition / circadian timing narrative when `timing_specific: "Yes"`
8. **Scoreable Inputs & Modulation Signals** — `## 8. Scoreable Inputs & Modulation Signals` — short intro framing ontology use; table (or list) inside `<details><summary><strong>Scoreable Input Categories</strong></summary>…` — **omit the entire section** when this FM does not carry scoreable rows (then **References** becomes `## 8. References`)
9. **References** — numbered list with bibliography links

`timing_specific` (`Yes` | `No`) lives in **front matter only** for ontology traversal, filtering, and scoring — not as a public `## N. Timing Specific` section.

### Excluded from the public FM body (current contract)

Do not add body sections after **References** (`## 9.`, or `## 8.` when Scoreable is omitted). The following are **not** part of the trimmed FM narrative on BRS6(FM1): Recipe Translation & Scoring Logic, standalone Functional Consequences / Outputs, standalone Cross-System Links (cross-BRS belongs under `### 5.3`), Mechanism Summary Table, Scoring Interpretation, Interpretation Boundary, Evidence Base, Missing Entities. Those may exist in YAML, spreadsheets, or other artefacts.

### MDX body vs YAML

Keys such as `recipe_translation_scoring_logic`, `mechanism_summary`, `interpretation_boundary`, and `evidence_base` remain valid for ingestion and downstream tools; they do **not** imply corresponding headings in the published MDX unless you explicitly extend this contract again.

### Legacy note

Some BRS6 FM pages (e.g. FM2–FM4) may still use an older outline (`Interventions`, `Outputs / Functional Effects`, separate `Cross-System Links`). New edits should converge **toward the FM1 pattern** above for consistency with PM pages and Diet/Lifestyle `<details>` usage.

## Automated validation

Run against all FM and PM MDX pages under `docs/biological-targets/**/{fm,pm}/`:

```bash
npm run mechanisms:validate
```

Implementation: `scripts/validate-mechanism-pages.mjs` (shared rules in `scripts/lib/mechanism-page-validation.mjs`). Checks front matter for `intervention_breakdown` and `timing_specific`, forbids visible `## N. Timing Specific` body sections, validates FM section order, and forbidden timing-as-modulation labels in §2.

## Validation Rules

- `title`, `fm_id`, `parent_brs`, `summary`, `intervention_breakdown`, and `timing_specific` are required and non-empty.
- `intervention_breakdown` must be exactly one of the five allowed values in **Intervention Breakdown**; no combined or percentage labels.
- `timing_specific` must be exactly `Yes` or `No`.
- `summary` must match the Definition section intent, remain concise, and follow **FM Definition Rule** (integrated PM contributions + emergent outcome; no full PM definition repeats).
- Definition and **Mechanistic Basis** must follow **FM Authoring — Integration Without Repetition** (no PM summary dumps; no duplicated PM `<details>` content).
- **Mechanistic Basis** should use the four-part structure: opening synthesis → one clause per PM → integration sentence → functional consequence sentence.
- `mechanisms_covered` and `key_constraints` must use ID+name+href.
- FM body section headings must be explicitly numbered to match PM-style rendering consistency.
- `Dietary Levers` and `Lifestyle Levers` must be separate top-level sections (must not be merged).
- Published body must **not** include `## N. Timing Specific`; `timing_specific` is validated in front matter only (`Yes` | `No`).
- Published body must render `## 2. Intervention Breakdown` between Definition and Functional Role; body value must match front matter `intervention_breakdown`.
- `Dietary Levers` must appear immediately after `## 5. Underlying Mechanisms and Requirements`.
- `Dietary Levers` and `Lifestyle Levers` content blocks should be wrapped in collapsible `<details>` menus for readability.
- FM page body must render PM and KC entries as hyperlinks to their corresponding PM/KC pages.
- Under `## 5. Underlying Mechanisms and Requirements`, subsection labels must be:
  - `5.1 Cofactors and Substrates` (per-PM table when used)
  - `5.2 PMs (Primary Mechanisms)`
  - `5.3 KCs (Key Constraints)`
  - `5.4 Cross-BRS Links`
- PM1 naming for BRS6(FM1) must be `Glucose Appearance Kinetics` (not legacy `Glycaemic Excursion Control` or `Glycaemic Variability & Absorption Kinetics`).
- KC entries must be only `substrate` or `precursor` (never active mechanism labels).
- When `## 8. Scoreable Inputs & Modulation Signals` is present, its table must include all four category groups: Functional Property Potentials, Realised Functional States, Preparation Transformations, and either Substance / Nutrient Signals or Antagonistic Signals (burden/modulation row); **References** must then be `## 9. References`.
- Claims in Dietary Levers, Lifestyle Levers, Scoreable intro text, and Mechanistic Basis must stay mechanistic / interpretive (`may`, `supports`, `associated with`) unless evidence supports stronger wording.
- Where `scoring_interpretation` or similar content exists in YAML or tooling, it must not include formulas, equations, or numeric scoring logic.
- Do not expose raw scoring code or internal scoring implementation details in FM pages.
- Do not display PM/FM code references in recipe-facing examples beyond mechanism-page context.
- References must all resolve to `static/bibtex/BRAIN-diet.bib` citation keys.
- Every referenced bibliography entry must include a DOI or source URL so the citation can resolve through the bibliography page to the original source.
- When an **Evidence Base** (or equivalent) block exists in non-page artefacts, avoid uncited research claims there; the public FM MDX body does not require a separate Evidence Base section under the current contract.

## Dose Rules (when summary or dose metadata exists)

- Dose ranges are functional anchors, not prescriptions.
- Prefer diet-first physiological ranges.
- Avoid supplement-level dose framing unless explicitly justified in evidence.
- Always contextualize dose with bioavailability where relevant.
- The trimmed FM page body does not include a Mechanism Summary Table; keep dose-adjacent fields in front matter or ingestion metadata unless the contract is extended.

