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
- Must not contain scoring formulas.

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
intervention_dominance: string     # e.g. "Diet-Dominant"
coverage_timing: string            # e.g. "Meal–Daily"
references:
  - string                         # numeric citation links to bibliography anchors
hide_title: boolean
```

## Canonical Body Sections (Structured Content Contract)

```yaml
definition: string
functional_role: string
underlying_mechanisms_and_requirements:
  pms:                               # render heading: "PMs (Primary Mechanisms)"
    - id: string
      name: string
      href: string
  kcs:                               # render heading: "KCs (Key Constraints)"
    - id: string
      name: string
      type: "substrate" | "precursor"
      href: string
  optional_brsx_modifiers:
    - string
  cross_brs_links:
    - id: string
      name: string
dietary_levers:
  - string
lifestyle_levers:
  - string
scoreable_food_state_inputs:
  input_rows:
    - input_category: string       # Functional Property Potentials | Realised Functional States | Substance / Nutrient Signals | Preparation Transformations
      example_inputs: [string]
      functional_relevance: string
  interpretation_note: string
recipe_translation_scoring_logic:
  intro: string
  recipe_characteristics:
    - characteristic: string
      interpretation: string
  prioritisation_rule: string
functional_consequences:
  - string
practical_interpretation: string
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

1. Title
2. `## 1. Definition`
3. `## 2. Functional Role`
4. `## 3. Underlying Mechanisms and Requirements`
5. `## 4. Dietary Levers`
6. `## 5. Lifestyle Levers`
7. `## 6. Scoreable Food-State Inputs`
8. `## 7. Recipe Translation & Scoring Logic`
9. `## 8. Functional Consequences`
10. `## 9. Practical Interpretation`
11. `## 10. Cross-System Links`
12. `## 11. Mechanism Summary Table`
13. `## 12. Scoring Interpretation`
14. `## 13. Interpretation Boundary`
15. `## 14. Evidence Base`
16. `## 15. References`
17. `## 16. Missing Entities` (only when needed)

## Validation Rules

- `title`, `fm_id`, `parent_brs`, and `summary` are required and non-empty.
- `summary` must match the Definition section intent and remain concise.
- `mechanisms_covered` and `key_constraints` must use ID+name+href.
- FM body section headings must be explicitly numbered to match PM-style rendering consistency.
- `Dietary Levers` and `Lifestyle Levers` must be separate top-level sections (must not be merged).
- `Dietary Levers` must appear immediately after `3. Underlying Mechanisms and Requirements`.
- `Dietary Levers` and `Lifestyle Levers` content blocks should be wrapped in collapsible `<details>` menus for readability.
- FM page body must render PM and KC entries as hyperlinks to their corresponding PM/KC pages.
- Under `## 3. Underlying Mechanisms and Requirements`, subsection labels must be:
  - `PMs (Primary Mechanisms)`
  - `KCs (Key Constraints)`
- PM1 naming for BRS6(FM1) must be `Glycaemic Variability & Absorption Kinetics` (not legacy `Glycaemic Excursion Control`).
- KC entries must be only `substrate` or `precursor` (never active mechanism labels).
- `Scoreable Food-State Inputs` must include all four categories: Functional Property Potentials, Realised Functional States, Substance / Nutrient Signals, Preparation Transformations.
- Every claim in Dietary/Lifestyle, Recipe Translation, Functional Consequences, and Practical Interpretation must be framed as mechanistic interpretation language (`may`, `supports`, `associated with`) unless evidence supports stronger wording.
- `scoring_interpretation` must not include formulas, equations, or numeric scoring logic.
- Do not expose raw scoring code or internal scoring implementation details in FM pages.
- Do not display PM/FM code references in recipe-facing examples beyond mechanism-page context.
- `interpretation_boundary` section is mandatory and must clarify educational/mechanistic scope vs clinical prediction.
- References must all resolve to `static/bibtex/BRAIN-diet.bib` citation keys.
- Every referenced bibliography entry must include a DOI or source URL so the citation can resolve through the bibliography page to the original source.
- No uncited research claims in `evidence_base` or intervention rationale text.

## Dose Rules (Mechanism Summary)

- Dose ranges are functional anchors, not prescriptions.
- Prefer diet-first physiological ranges.
- Avoid supplement-level dose framing unless explicitly justified in evidence.
- Always contextualize dose with bioavailability where relevant.

