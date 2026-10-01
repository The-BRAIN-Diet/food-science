# BRS1-FM3-PM7 Neuronal Membrane DHA Incorporation — Stage 2B Report

Stage 2B used `system/dietary-input-traceability-contract.md`, including Type D.
Stage 2A Findings on this page were authored in the same requested run
(PM7-F1 to PM7-F4).

## Questions and stopping rationale

Questions:

1. Is DHA a Direct dietary provision of the incorporated fatty acid?
2. Is phospholipid-DHA a second independent Dietary Requirement?
3. Does Patrick or Liu show that choline intake constrains DHA incorporation?
4. Does BRS2(KC1) one-carbon inadequacy constrain incorporation via PEMT/PC
   (Type D)?

Stopped after PM7-F1–F3 adjudicated DHA provision and carrier form. No extra
papers were added beyond the Stage 2A corpus. Schema validation is not
scientific completion.

## Claim thresholds

| Claim | DHA | Phospholipid-DHA | Choline |
|---|---|---|---|
| Biochemical necessity | Structural membrane PUFA (PM7-F1) | Carrier form (PM7-F2, PM7-F3) | PC chemistry context only |
| Dietary provision | Supported as provision of the incorporated fatty acid | Form/context, not a second DR | Not shown as intake constraint |
| Demonstrated dietary modulation | Not established in humans from this corpus | Animal accretion contrast only | Not established |
| Functional or clinical benefit | Not established (Huss cannot isolate DHA) | Not established | Not established |

## Adjudication

| Atom / candidate | Decision | Addressability | Claim ceiling |
|---|---|---|---|
| PM7-DIT-1 DHA | Direct Dietary Requirement; capacity-requirement | `direct` | `dietary-provision` |
| Phospholipid-DHA | **Not admitted** as a second independent clinical lever. Form/context of DHA. | | |
| PM7-DIT-2 Choline | Biochemical requirement in §3.1.2 only. **Not** a Direct DR. | n/a | `biological-dependency` |

Page-level `dietary_addressability` is `not-established`; `claim_ceiling` is
`biological-dependency`. `evidence_status` is
`stage-2b-dietary-addressability`. `mechanistic_authoring_required` is false.

Choline atoms from acetylcholine synthesis were not copied.

## §3.1.3 Type D — BRS2(KC1) one-carbon / methyl-donor pool

| Field | Decision |
|---|---|
| Disposition | `unassessed` (`arm_id: one-carbon-methyl-donor-pool`) |
| Established links | Phospholipid-DHA is a carrier form (PM7-F2, PM7-F3). |
| Inferred links | One-carbon → PEMT → PC would constrain incorporation if inadequate. |
| `key_constraints` | **None.** Removed inherited index and constituent list. |
| `pm_kc_relationships` | **None.** |
| Public §3.1.3 | `No mapping established.` |

## SOP and lifestyle

No evidence-qualified System Optimisation Practice or Lifestyle Priority.
Generic food-preparation lines were removed. Public copy uses PM5 wording.
§3.3 was added (the prior page omitted Lifestyle Levers).

## Review & Corrections

Parent will add FW records. This report does not edit
`system/framework-issues-register.json`.

## Validation

- `npm run findings:sync -- --pm BRS1-FM3-PM7`
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation.mdx --pm-only`
