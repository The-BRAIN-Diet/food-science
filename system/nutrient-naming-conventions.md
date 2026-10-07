# Nutrient naming conventions

**Status:** Canonical authoring guidance for PM, FM, KC and substance pages, including Stage 2A and Stage 2B. Initial scope: vitamins. No separate public guidance page is required.

## Vitamin names and evidence specificity

For numbered vitamins, use “Vitamin B[number] (name)” on first mention and in structured input labels. Use “vitamin B[number]” subsequently when discussing the vitamin generally. When evidence or a mechanism concerns a specific form, name that form explicitly and identify its vitamin family. Never broaden form-specific evidence to the whole vitamin family.

Vitamin B6 is a family: use “Vitamin B6” for an unspecified family-level exposure rather than inventing one chemical name. Vitamins outside the B family retain their recognised designation and, where relevant, their specific form. Do not assign vitamin numbers to NAD⁺ or FAD; identify a supported precursor relationship separately.

| Meaning | Preferred label |
|---|---|
| B1 generally | Vitamin B1 (thiamine) |
| B2 generally | Vitamin B2 (riboflavin) |
| B3 family generally | Vitamin B3 (niacin) |
| Nicotinamide specifically | Nicotinamide (a form of vitamin B3) |
| Nicotinic acid specifically | Nicotinic acid (a form of vitamin B3) |
| B5 generally | Vitamin B5 (pantothenic acid) |
| B6 family generally | Vitamin B6 |
| Active B6 cofactor | Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor) |
| B7 generally | Vitamin B7 (biotin) |
| B9 generally | Vitamin B9 (folate) |
| Folic acid specifically | Folic acid (a form of vitamin B9) |
| 5-Methyltetrahydrofolate specifically | 5-Methyltetrahydrofolate (a form of vitamin B9) |
| B12 generally | Vitamin B12 (cobalamin) |

The NAD mechanism's nicotinamide salvage relationship uses **Nicotinamide (a form of vitamin B3)**; the nicotinic-acid route uses **Nicotinic acid (a form of vitamin B3)**. A genuinely family-level statement may use **Vitamin B3 (niacin)**. Naming does not authorise replacing route-specific atoms by a broad B3 requirement or creating an additional duplicate family atom.

When the assessed molecule is 5-methyltetrahydrofolate, use **5-Methyltetrahydrofolate (a form of vitamin B9)**. **Folic acid (a form of vitamin B9)** remains a separate form. A genuinely family-level statement may use **Vitamin B9 (folate)**. Naming does not authorise treating 5-methyltetrahydrofolate evidence as a folic acid result, or replacing a form-specific atom with a broad vitamin B9 requirement.

## Identity, form and display are separate

Record these separately in the authoring assessment or identity record:

```yaml
vitamin_family: B3
specific_form: nicotinamide
preferred_display_label: Nicotinamide (a form of vitamin B3)
aliases:
  - nicotinamide
  - niacinamide
```

For a family-level target, record `specific_form: null`; do not imply a studied form. Aliases aid lookup; they do not merge distinct molecules or transfer evidence. This is identity metadata, not a sixth dietary atom. Reuse the existing accepted `input` and presentation `label` fields for the preferred display label; preserve canonical record IDs, substance IDs, anchors and ontology links. Where the current page schema does not accept the identity metadata fields above, keep them in the assessment/identity record and project the label into accepted page fields. Do not add unsupported front-matter fields or build a new renderer to apply this naming rule.

## Stage 2A / Stage 2B and final review

Stage 2A records the exposure or biological form actually assessed and passes its family/form distinction to Stage 2B. Stage 2B preserves that distinction in candidate adjudication, five-atom input and presentation labels. PM, FM and KC summaries must preserve the same claim boundary when aggregating evidence. Substance authors distinguish chemical identity from vitamin-family membership.

Before completion, verify: first public mention and structured input labels identify the vitamin and relevant form; general subsequent mentions may be shorter; input and presentation labels agree; form-specific claims remain form-specific. A naming-only change does not change admission, applicability, Direct/Derived classification, confidence or intervention dominance. Preserve verbatim source titles, bibliography, citation keys and historical decision quotations. Do not rename stable URLs or canonical identifiers by text replacement.

This convention supersedes the earlier `B3 - Nicotinamide (B3)` / `B[number] - name (B[number])` presentation rule. Structured PM and KC input, presentation, derived-target, cofactor and dietary-bullet labels use the preferred forms above. `scripts/lib/nutrient-naming.mjs` rejects that superseded pattern and those exact non-preferred aliases. Extend this document with evidence-appropriate conventions for other nutrients when needed.
