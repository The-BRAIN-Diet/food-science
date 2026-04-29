# Primary Mechanism (PM) Schema

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
biological_role: string
dependencies:                        # from spreadsheet Column C
  kcs:
    - id: string
      name: string
      type: "substrate" | "precursor"
  cross_brs_links:
    - id: string
      name: string
cofactors:                           # from Column D; cofactors only
  - id: string
    name: string
inputs:                              # from Column F using evidence from key studies
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
intervention_dominance:              # from Column O
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

## Section Order (Page Rendering Contract)

1. Name and Overview
2. Biological Role
3. Dependencies (System Requirements)
4. Cofactors (Chemical Enablement)
5. Inputs (Dietary and Environmental)
6. Outputs / Biological Effects
7. Functional Mechanism Ownership
8. Intervention Dominance
9. Constraints and Failure Modes
10. Notes (Optional)
11. References
12. Missing Entities (only when needed)

## Validation Rules

- `overview` must be <=120 words.
- `functional_mechanism_ownership` must contain exactly one FM (never multiple).
- `dependencies` must not include PM-to-PM dependencies.
- `dependencies.kcs[].type` must be only `substrate` or `precursor`.
- `cofactors` must not include KCs, PMs, foods, or unrelated substances.
- Inputs must be mechanistically justified; no generic food advice entries.
- Foods/substances must exist in system; unresolved entities go to `missing_entities`.
- No scoring formulas or numeric scoring logic allowed.
- No Secondary Mechanisms (SMs) introduced during initial rollout.
- References must resolve to existing citation keys in `static/bibtex/BRAIN-diet.bib`.

## Column Integrity Mapping

- Column C -> `dependencies` (KCs + cross-BRS links only)
- Column D -> `cofactors` (cofactors only)
- Column O -> `intervention_dominance.mode`
- Column P -> `functional_mechanism_ownership`

An entity must not appear in more than one of these roles with conflicting meaning.

