# BRS1-FM4-PM11 Excitotoxicity Modulation — Stage 2B Report

Re-run against the **2B — Dietary Input Traceability & Visibility Contract**,
Type D shared-constraint applicability included. No new literature search.
Evidence is the Stage 2A Findings and the assigned bibliography already on
this PM (Clerc 2013; Mamiya 2021; Maltezos 2014).

**PM-governed objective/state:** last-line buffering of injury-level
excitotoxic / bioenergetic pressure when glutamatergic drive is excessive.
Not glutamate clearance (PM10), not integrative excitation–inhibition
matching (PM8), not GABA synthesis (PM9), not a Phenome or ADHD outcome.

Page `dietary_addressability: not-established`. Page `claim_ceiling:
biological-dependency`. `evidence_status: stage-2b-dietary-addressability`.
`mechanistic_authoring_required: false`.

## Biological classification (before atoms)

| Claimed input | Type | Decision |
|---------------|------|----------|
| Magnesium (ordinary diet or food magnesium) | **B / C, not admitted** | Clerc shows magnesium sulfate protection in a chronic receptor-stimulation model (PM11-F2). That is isolated-model exposure, not ordinary dietary magnesium as a Direct Dietary Requirement, biochemical inventory atom, or demonstrated state-regulation of this governed buffering. **Parked unresolved.** |
| Omega-3 | **B / C, not admitted** | No assigned-corpus finding establishes omega-3 as a capacity, state-regulation, or biochemical requirement of this buffering. Legacy page name only. **Parked unresolved.** |
| Antioxidants | **B / C, not admitted** | No assigned-corpus finding establishes an antioxidant class as a requirement or regulator of this buffering. Legacy page name only. **Parked unresolved.** |
| BRS1(KC1) amino-acid-quality arm | **D, unassessed** | Receptor-overload stress (PM11-F1) does not show that inadequacy of the quality pool constrains this governed buffering. |
| BRS1(KC1) competitive-LAT1 arm | **D, unassessed** | Precursor-transport inference does not meet the Type D capacity-constraint threshold. |
| Food-preparation / protein-pairing lines | **SOP, not admitted** | Legacy preparation and pairing bullets are not Stage 2A Finding objects and are not evidence-qualified interventions. |
| Meal timing, activity, stress-recovery lines | **Lifestyle, not admitted** | Not projected. |

## Type B high-bar (dietary magnesium — not admitted)

| Check | Result |
|-------|--------|
| Exposure actually tested | Magnesium sulfate in a chronic glutamate-receptor model |
| Population / model | Preclinical experimental preparation |
| Human vs animal | Not a human dietary sample |
| Endpoint | Bioenergetic consequences of receptor stimulation |
| Endpoint = this PM state? | Adjacent — model-level energy stress, not ordinary-diet buffering |
| Direction | Magnesium sulfate reduced measured bioenergetic harm |
| Exposure context | Isolated magnesium sulfate, not food magnesium |
| Attribution | Cannot attribute ordinary dietary magnesium |
| Claim ceiling | Not admitted; page remains `biological-dependency` without a dietary atom |
| Limitation | Not a human dietary magnesium Direct Dietary Requirement |

Omega-3 and antioxidants have no assigned-corpus exposure, endpoint, or
attribution against this governed state. They fail admission before a Type B
high-bar table can be completed. That is unresolved, not an
evidence-supported negative.

## Unresolved (parked in this report)

1. **Magnesium** — Does ordinary dietary magnesium provide, maintain or
   regulate this buffering capacity at the level claimed? Clerc cannot
   answer that. Focused Stage 2A follow-up was not required: the
   mechanism-level protection claim is already PM11-F2. The missing claim
   is dietary, not foundational biology.
2. **Omega-3** — Any capacity or state-regulation relationship to this
   buffering remains unestablished in the assigned corpus.
3. **Antioxidants** — Same. A class name on the legacy page is not a
   biochemical inventory.

These remain **not admitted**. Unresolved is not treated as a negative
finding. No `dietary_input_traceability` atoms were created so those names
cannot publish as inventory without atoms.

Conditional Optimisation Strategy follow-up: Clerc’s magnesium-sulfate
exposure is not a food-preparation, pairing, or supplementation protocol
for this PM. No SOP candidate was admitted. Lifestyle relationships are not
projected.

## Type D — BRS1(KC1)

Both arms recorded in `kc_applicability_adjudications` as `unassessed`.
No `key_constraints` index. No `pm_kc_relationships`. Public §3.1.3 is
`No mapping established.`

KC lists were not inherited.

## Schema-field decisions

| Field | Decision |
|-------|----------|
| `key_constraints` | Removed. |
| `cofactors` | Removed. |
| `dietary_input_traceability` | None. |
| `dietary_lever_atoms` | None. |
| `pm_kc_relationships` | None. |
| `system_optimisation_practices` | None. |
| `lifestyle_priorities` | None. |
| Public §3.1.1 | No Direct or Derived Dietary Requirement is currently established for excitotoxicity modulation. |
| Public §3.1.2 | No evidence-supported cofactors or substrates are currently established for this mechanism. |
| Public §3.1.3 | No mapping established. |
| Public §3.2 | Only categories with a substantive evidence-qualified intervention are shown. |
| Public §3.3 | No evidence-qualified lifestyle relationship is projected. |

## Review & Corrections

The issues register was not edited.

## Validation

Ran:

- `npm run findings:sync -- --pm BRS1-FM4-PM11` — updated this page. Repo-wide
  check still reports stale PM8 and PM10; those pages were not edited.
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation.mdx --pm-only` — updated this page.

PM11-targeted checks: **0 issues**. No commit.
