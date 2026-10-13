# Stage 2B Targeted B/D Rerun — Four Dietary Requirement Demonstrations

Date: 2026-10-13

Scope: targeted Stage 2B rerun using the updated B/D dependency-supply model,
single-primary-entry presentation rule and canonical six-atom dietary structure.

Reference branch: `preview-dietary-requirements-demos`

Pages reviewed:

- `docs/biological-targets/brs
-
-
- 2/fm1/brs2-fm1-pm3-same-synt.mdx`
- `docs/bihesisological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx`
- `docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx`
- `docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx`

This rerun does not modify canonical PM admissions, food records, ontology, KC
applicability, SOP decisions, shared renderers or validators. It records the
updated Stage 2B decisions and the canonical page deltas that should be applied
in the next migration pass.

## Governing Model Applied

For nutritional capacity relationships:

`Capacity Dietary Requirement = B AND D`

- **B — Biological dependency:** the PM requires the defined biochemical
  participant or dependency pathway.
- **D — Dietary supply:** diet supplies or maintains that same supported
  dependency pathway.
- B and D are adjudication propositions supported by existing evidence records,
  not additional disclosure atoms.
- `dietary_input` remains the authoritative sixth atom: `true`, `false` or
  `null`.
- One primary reader-facing explanation is allocated per substance or supply
  relationship. A biochemical participant can appear in a reaction diagram
  without becoming a second Dietary Requirement entry.

## BRS2-FM1-PM3 — SAMe Synthesis

Reaction context: methionine + ATP -> SAMe + phosphate + pyrophosphate,
catalysed by MAT with Mg2+ and K+ participating.

| Candidate | B | D | dietary_input | Primary public placement | Rerun decision |
|---|---|---|---|---|---|
| Methionine | Established | Established | `true` | §3.1.1 | Keep as the single primary capacity entry. Explain dietary protein as the supply route inside this entry, not as a second primary requirement. |
| Dietary protein | Not an independent biochemical dependency | Established as a methionine delivery route | `true` as supply-route record, but consolidated for presentation | Consolidated under Methionine | Do not show as a second primary §3.1.1 requirement unless a separate protein-level PM-specific relationship is adjudicated. |
| ATP | Established | Not established | `false` | §3.1.2 | Keep as biochemical co-substrate only. |
| Magnesium ions | Established | Not established on current PM-specific evidence | `false` | §3.1.2 | Keep as catalytic-ion context only; do not imply magnesium intake controls MAT flux. |
| Potassium ions | Established | Not established on current PM-specific evidence | `false` | §3.1.2 | Keep as catalytic-ion context only; do not imply potassium intake controls MAT flux. |
| Folate / betaine / choline upstream supply | Established upstream supply to methionine regeneration | Established as upstream dietary supply | `true` | §3.1.3 | Preserve as supported upstream KC supply, not §3.1.1 Dietary Requirements. |

Required page delta:

- Remove the current second `Methionine` primary presentation from §3.1.2.
- Consolidate `Dietary protein` presentation into the Methionine entry as a
  delivery route unless a separate protein-level relationship is adjudicated.
- Keep ATP, Mg2+ and K+ in §3.1.2.
- Keep folate, betaine and choline in §3.1.3 as upstream KC supply.
- Preserve PM3-DIT identifiers, evidence sources, limitations and history.

## BRS1-FM1-PM3 — Dopaminergic Signalling Regulation

Synthesis context: tyrosine -> L-DOPA -> dopamine. Tyrosine hydroxylase uses iron
and BH4; AADC uses PLP.

| Candidate | B | D | dietary_input | Primary public placement | Rerun decision |
|---|---|---|---|---|---|
| Tyrosine | Established | Established via dietary amino-acid supply/upstream PM1 | `true` | §3.1.1 | Keep. Do not duplicate in §3.1.2. |
| Iron | Established | Established as dietary mineral supply with PM-specific cofactor relevance | `true` | §3.1.1 | Keep with limitation that intake-to-dopamine responsiveness is not established. |
| PLP | Established | Direct dietary PLP provision not established | `null` currently, conflict flagged | No primary entry | Preserve record/flag, but remove as a primary §3.1.1 entry once presentation is migrated. The B6 entry explains the PLP function. |
| Vitamin B6 | Established via PLP dependency | Established as dietary B6 -> PLP supply route | `true` | §3.1.1 | Keep as the single primary dietary supply-to-function entry for PLP. |
| BH4 | Established | Not established as dietary BH4 provision | `false` | §3.1.2 | Keep as endogenous cofactor context. |
| L-DOPA | Established intermediate where authored | Not a dietary requirement here | No separate atom currently | Reaction diagram/context only | Do not create a new dietary entry solely to inventory intermediates. |
| Phenylalanine | Upstream tyrosine supply | Established upstream route | `true` | §3.1.3 / upstream supply | Preserve upstream provenance; do not make it a second dopamine Dietary Requirement. |
| Folate / betaine / choline for COMT methyl-resource supply | Established upstream methyl-resource supply | Established upstream dietary supply | `true` | §3.1.3 | Preserve as upstream KC supply, not dopamine-synthesis §3.1.1 entries. |

Required page delta:

- Keep §3.1.1 as Tyrosine, Iron and Vitamin B6.
- Remove PLP as a primary §3.1.1 public entry; retain the PLP atom and
  `section-supply-contradiction` for adjudication history.
- Keep BH4 in §3.1.2.
- Do not create public §3.1.2 reprints for Tyrosine, Iron or PLP.
- Preserve upstream KC supply disclosures separately in §3.1.3.

## BRS4-FM1-PM2 — NAD+ Metabolism

Supply context: nicotinamide salvage, nicotinic-acid Preiss-Handler route and
tryptophan-derived de novo synthesis.

| Candidate | B | D | dietary_input | Primary public placement | Rerun decision |
|---|---|---|---|---|---|
| Nicotinamide | Established as salvage substrate | Established dietary vitamin B3 form | `true` | §3.1.1 | Keep. |
| Nicotinic acid | Established as Preiss-Handler substrate | Established dietary vitamin B3 form | `true` | §3.1.1 | Keep; preserve pharmacological-dose limitation. |
| Tryptophan | Established as hepatic precursor route | Established dietary amino-acid precursor route | `true` | §3.1.1 | Keep as Derived precursor route to nicotinamide/NAD+ supply. |
| NAD+/NADH redox interconversion | Established biochemical context | Not a dietary input itself | No separate dietary atom | §3.1.2 narrative/context only if needed | Do not reprint precursor entries as biochemical inventory. |
| NAD+ replenishment after signalling-enzyme consumption | Established biochemical context | Supplied through accepted precursor pathways | No separate dietary atom | §3.1.2 narrative/context only if needed | Explain as context, not another precursor list. |
| Aerobic or resistance training | Lifestyle intervention | Non-dietary | should be `false` when six-atom SOP/lifestyle migration is applied | §3.3 Lifestyle | Preserve as lifestyle, not dietary roll-up. |

Required page delta:

- Current public presentation already matches the single-primary-entry rule:
  §3.1.1 contains nicotinamide, nicotinic acid and tryptophan; §3.1.2 has no
  separate cofactor/substrate entries.
- Add `dietary_input: false` to the lifestyle record during the future
  SOP/lifestyle six-atom migration, not in this instruction-only pass.
- Do not create an exhaustive NAD intermediate inventory.

## BRS1-FM4-PM9 — GABA Synthesis Capacity

Reaction context: glutamate -> GABA + CO2, catalysed by GAD, requiring PLP.
Supply pathway: dietary vitamin B6 -> PLP -> GAD activity.

| Candidate | B | D | dietary_input | Primary public placement | Rerun decision |
|---|---|---|---|---|---|
| Vitamin B6 | Established via PLP dependency | Established as dietary B6 -> PLP supply route | `true` | §3.1.1 | Keep as the single primary dietary supply-to-function entry. |
| PLP | Established as GAD cofactor | Direct dietary PLP provision not established | `null` currently, conflict flagged | No primary entry | Preserve record/flag, but remove from primary public §3.1.1 and §3.1.2 presentation once migrated. The B6 entry explains PLP. |
| Glutamate | Established as GAD substrate | Not established as dietary glutamate -> neuronal GABA supply | `false` | §3.1.2 | Keep as biochemical substrate only. |
| Dietary glutamate / protein | Not established for neuronal GABA supply | Not established for this PM pathway | No admitted public entry | Audit only if candidate arises | Do not admit or imply dietary glutamate/protein controls human brain GABA synthesis. |

Required page delta:

- §3.1.1 should show Vitamin B6 only.
- §3.1.2 should show Glutamate only.
- Remove PLP as a primary public entry in both §3.1.1 and §3.1.2, while
  preserving the PLP atom, evidence and conflict flag.
- Do not create a dietary glutamate/protein entry.

## Cross-Pilot Validator / Renderer Follow-Up

These rerun decisions require later tooling updates before canonical rollout:

- Validator: allow a Derived supply-to-function entry such as Vitamin B6 -> PLP
  without forcing the active target to remain a primary Direct Dietary
  Requirement presentation.
- Validator: add presentation-level checks so a changed biological-role sentence
  cannot reprint the same relationship in §3.1.1 and §3.1.2.
- Renderer: ensure one underlying atom can remain available for reaction diagrams,
  disclosures and audit while not being counted as multiple public requirements.
- SOP/lifestyle: require and render the sixth atom for SOP/lifestyle records
  without moving `dietary_input: true` SOPs into Dietary Requirements.

## Migration Summary

| PM | Current state | B/D rerun result | Migration action |
|---|---|---|---|
| BRS2-FM1-PM3 SAMe | Methionine appears in §3.1.1 and §3.1.2; dietary protein is separate §3.1.1 | Methionine is the single primary entry; ATP/Mg/K stay biochemical | Remove public methionine §3.1.2 reprint; consolidate dietary protein under Methionine presentation |
| BRS1-FM1-PM3 dopamine | PLP appears as §3.1.1 Direct despite conflict flag | Vitamin B6 is the dietary supply entry; PLP is retained as underlying cofactor record | Remove PLP primary §3.1.1 presentation; keep BH4 §3.1.2 |
| BRS4-FM1-PM2 NAD+ | Already largely aligned | Three precursor routes once in §3.1.1; no §3.1.2 reprint | No Dietary Requirements presentation change; later add lifestyle `dietary_input: false` |
| BRS1-FM4-PM9 GABA | PLP appears in §3.1.1 and §3.1.2 | Vitamin B6 is the dietary supply entry; Glutamate is biochemical-only | Remove PLP public primary presentations; keep Glutamate §3.1.2 |

## Current Scientific Classification Questions

- SAMe: whether any protein-level intervention deserves an independent
  protein-level PM3 relationship remains unresolved; current evidence supports
  dietary protein as methionine delivery, not a second requirement.
- SAMe: Mg2+ and K+ are catalytic ions, but PM-specific dietary limitation of MAT
  flux remains not established on the current corpus.
- Dopamine/GABA: PLP is a biological cofactor target, but the public dietary
  supply explanation should be carried by vitamin B6 unless direct dietary PLP
  provision is separately admitted.
- NAD+: precursor pathways are accepted; therapeutic or cognitive benefit from
  raising NAD+ above adequacy remains outside the capacity claim.
