# BRS1-FM1-PM5 Serotonergic Signalling — Stage 2B Report

Stage 2B used the amended Dietary Input Traceability contract, including
authorised question-bounded retrieval. Stage 2A Findings on this page were
authored in the same requested run (PM5-F1 to F4, PM5-IC1).

## Questions and stopping rationale

Questions:

1. Is tryptophan a PM5 substrate, not only an upstream pool item?
2. Are iron and BH4 TPH participants that need dietary classification?
3. Are PLP and vitamin B6 still the decarboxylase pair?
4. Is dietary protein a separate PM5 Dietary Requirement?
5. Does either KC1 arm establish PM5 membership?

Stopped after PM5-F2 / F4 and Fernstrom / Fanet / Kennedy / Spector
adjudicated those questions. Ordinary-diet modulation and functional benefit
were not supported. Did not admit SERT, MAO or saffron.

Coverage is sufficient for the synthesis-path candidates. Later-stage dietary
routes remain deferred. Schema validation is not scientific completion.

## Claim thresholds

| Claim | Tryptophan | Iron | PLP / B6 | BH4 |
|---|---|---|---|---|
| Biochemical necessity | Supported (PM5-F2) | Supported (PM5-F2) | Supported (PM5-F2) | Supported (PM5-F2) |
| Dietary provision | Diet can supply tryptophan; not shown as a controllable serotonin lever | Diet can supply iron; not shown to supply TPH iron as a controllable lever | B6 can supply PLP precursors; PLP itself is not shown as a dietary provision lever | Endogenous synthesis/recycling; not a dietary BH4 recommendation |
| Demonstrated dietary modulation | Not established | Not established | Not established | Not established |
| Functional or clinical benefit | Not established | Not established | Not established | Not established |

## Adjudication

| Atom | Decision | Addressability | Claim ceiling |
|---|---|---|---|
| PM5-DIT-1 Tryptophan | Direct Dietary Requirement; capacity-requirement; Supply: PM1 | `not-established` | `biological-dependency` |
| PM5-DIT-5 Iron | Direct Dietary Requirement; capacity-requirement | `not-established` | `biological-dependency` |
| PM5-DIT-3 PLP | Direct Dietary Requirement; capacity-requirement | `not-established` | `biological-dependency` |
| PM5-DIT-4 Vitamin B6 | Derived Dietary Requirement → PLP | `precursor-mediated` | `dietary-provision` |
| PM5-DIT-6 BH4 | Biochemical requirement in §3.1.2 | n/a | `biological-dependency` |
| PM5-DIT-2 Dietary protein | **Removed.** Protein provision of the circulating pool is assessed on PM1. It is not a second serotonin Dietary Requirement. | | |

None is admitted as a serotonin lever. Page-level `dietary_addressability`
remains `not-established`; `claim_ceiling` remains `biological-dependency`.

Same-role reprint of tryptophan and PLP in §3.1.2 was not used.

## §3.1.3 PM↔iKC adjudication (KC1 two arms)

Requirement admission (tryptophan is a PM5 Dietary Requirement; protein is
not) is a separate assessment and is not the KC decision. Upstream ownership
neither automatically excludes membership nor establishes it.

| Arm | KC role | PM5-specific role | Evidence on this PM | Decision |
|-----|---------|-------------------|---------------------|----------|
| Amino-acid quality / precursor availability | Shared indispensable / protein-quality precursor pool | Tryptophan is the serotonin starting material (PM5-F2). Pool quality is assessed on PM1 | PM5-F2; no FAO/DIAAS evidence as a PM5 constraint | **Upstream dependency through PM1.** Not a qualifying PM5 constraint relationship. |
| Competitive balance at LAT1 | Relative LNAA presentation at the blood–brain barrier | Tryptophan must enter the brain before this PM acts. Competitive transport is assessed on PM2 | PM5-IC1; Fernstrom 2013 | **Upstream dependency through PM2.** Not a qualifying PM5 constraint relationship. |

### Schema-field decisions

| Field | Decision |
|-------|----------|
| `key_constraints` | **None.** |
| `pm_kc_relationships` | **None.** |
| `kc_change_control_flags` | **None.** Residual quality-arm review remains on PM1. |

Public §3.1.3 copy:

```
No mapping established.
```

Unresolved distinction on the PM↔iKC test: none. The KC page may still list
PM5 as a connected mechanism; that is KC-owned navigation, not published PM
membership.

## Review & Corrections

`FW020` records Finding authorship.
`FW021` records Dietary Requirement reclassification.
`FW022` records the empty KC mapping.
`FW023` / `CC-BRS1-FM1-PM5-01` parks later-stage dietary candidates as
unresolved.

Applied corrections are not independent source or expert validation.

## Type D reassessment

Completed Type D assessment is in
`system/brs1-fm1-pm3-pm5-type-d-kc-reassessment.md`. Quality remains
`unresolved` after DIAAS/Mariotti review. Competitive LAT1 imbalance is
`established` / `constrained-by` for serotonin-formation capacity
(Fernstrom 2013). Public §3.1.3 publishes the KC title and one formation
sentence. `FW026` / `FW034` record the result. Dietary Requirements and
Findings were not reopened.

BRS3-FM2-PM3 fails Type D (assumption-only) and was not used as an exemplar.
BRS5-FM1-PM1 was not reassessed and was not used as a template here.

## Validation

- `npm run findings:sync -- --pm BRS1-FM1-PM5`
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation.mdx --pm-only`
- `npm run findings:check`
- `npm run bib:validate` (cited keys)
