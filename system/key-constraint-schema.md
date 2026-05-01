# Key Constraint (KC) Schema

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract for Key Constraint pages.

## Scope

- Represents substrate/precursor requirements used by FM and PM layers.
- Must remain mechanistic and requirement-focused.
- Must not include scoring formulas.

## Required Top-Level Fields

```yaml
id: string
name: string
brs: string
overview: string
requirement_type: "Dietary Substrates/Precursors"
biological_role: string
supports:
  fms:
    - id: string
      name: string
      href: string
  pms:
    - id: string
      name: string
      href: string
food_sources:
  - title: string
    href: string
constraints:
  - string
references:
  - index: number
    label: string
    citation_key: string
    href: string
missing_entities:
  foods: [string]
```

## Section Order (Page Rendering Contract)

1. Name
2. Overview
3. Biological Role
4. Supports (Related FMs, Related PMs)
5. Dietary Substrates/Precursors
6. Constraints
7. References

## Display Mapping

- `food_sources` must be rendered under the label `Dietary Substrates/Precursors` directly after `Supports`.
- Do not create a dedicated "Food Sources" section heading.
- `requirement_type` remains metadata in front matter and should not be rendered as a standalone section heading.

## Validation Rules

- KC pages must not define PM->PM or FM->FM dependencies.
- `supports.fms` and `supports.pms` must link to existing FM/PM pages when available.
- Food sources must be listed as plain bullets and must reference existing food pages only when links are used.
- If a required food entity is unresolved, flag:
  - `Missing system entity: [name]`
- References are required only when claims are made.
