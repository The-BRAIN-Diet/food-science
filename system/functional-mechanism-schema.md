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
id: string                         # e.g. "BRS2-FM1"
name: string                       # e.g. "Methylation Capacity"
brs: string                        # e.g. "BRS2"
overview: string                   # <=120 words
functional_role: string
underlying_requirements:
  pms:                             # derived from spreadsheet underlying requirements field
    - id: string
      name: string
      href: string                 # required PM page link
      brs?: string
  kcs:                             # substrates/precursors only
    - id: string
      name: string
      type: "substrate" | "precursor"
      href: string                 # required KC page link
  cross_brs_links:
    - id: string
      name: string
interventions:                     # derived from spreadsheet interventions and intervention dominance fields
  diet:
    principles:
      - string
    foods:
      - food: string               # must exist in system
        mechanism_link:
          pm_ids: [string]         # PMs this food supports
          kc_ids: [string]         # KCs supplied by this food
          substances: [string]     # must exist in system
        rationale: string
    constraints:
      - string
  lifestyle:
    dominance: "diet-dominant" | "lifestyle-dominant" | "mixed"   # from intervention dominance
    factors:
      - factor: string
        effect: string
outputs_functional_effects:
  - string
practical_interpretation:
  meal_design_implications:
    - string
cross_system_links:
  - id: string
    name: string
mechanism_summary:
  mechanism_type: string
  key_substrates: [string]
  cofactors: [string]
  primary_substances: [string]
  effective_dose_range:
    low: string
    effective: string
    high: string
  dose_sensitivity: "low" | "moderate" | "high" | "context-dependent"
  bioavailability_notes: string
  limiting_factors:
    - string
scoring_interpretation:
  low_support: string
  high_support: string
evidence_base: string
references:
  - index: number
    label: string
    citation_key: string
    href: string                   # /docs/papers/BRAIN-Diet-References#citation_key
missing_entities:                  # optional; for unresolved required food/substance entities
  foods: [string]
  substances: [string]
```

## Section Order (Page Rendering Contract)

1. Name and Overview
2. Functional Role
3. Underlying Mechanisms and Requirements (PMs, KCs, Cross-BRS links)
4. Interventions (Diet, Lifestyle)
5. Outputs / Functional Effects
6. Practical Interpretation
7. Cross-System Links
8. Mechanism Summary Table
9. Scoring Interpretation
10. Evidence Base
11. References
12. Missing Entities (only when needed)

## Validation Rules

- `id`, `name`, `brs` are required and non-empty.
- `overview` must be <=120 words.
- `underlying_requirements.pms` and `underlying_requirements.kcs` must use ID+name.
- FM page body must render PM and KC entries as hyperlinks to their corresponding PM/KC pages.
- KC entries must be only `substrate` or `precursor` (never active mechanism labels).
- Every entry in `interventions.diet.foods` must include `mechanism_link`.
- Every food/substance listed must already exist in system; otherwise place in `missing_entities`.
- Every modulator or lifestyle factor claim in `interventions.lifestyle` must be evidence-backed with inline numeric citations (for example, `[1]`, `[2]`).
- `scoring_interpretation` must not include formulas, equations, or numeric scoring logic.
- References must all resolve to `static/bibtex/BRAIN-diet.bib` citation keys.
- Every referenced bibliography entry must include a DOI or source URL so the citation can resolve through the bibliography page to the original source.
- No uncited research claims in `evidence_base` or intervention rationale text.

## Dose Rules (Mechanism Summary)

- Dose ranges are functional anchors, not prescriptions.
- Prefer diet-first physiological ranges.
- Avoid supplement-level dose framing unless explicitly justified in evidence.
- Always contextualize dose with bioavailability where relevant.

