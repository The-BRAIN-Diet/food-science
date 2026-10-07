# KC1 upstream-chain reassessment — 2026-10-02

This addendum supersedes the earlier stopping rationale and `unassessed` report row below. Current decision: **unresolved, not rejected**. KC1 remains intact; only the unconditional FM dependency presentation is removed. PM7 §3.1.3 remains `No mapping established.` This is admission status, not evidence of biological absence.

## Governing threshold

`system/dietary-input-traceability-contract.md`, Type D: “Evidence connects inadequacy or imbalance of that named pool or state to a constraint on this PM’s governed capacity.” It permits an “explicitly supported upstream chain” but requires the capacity-constraint link to be established rather than inferred. It does not mandate one human trial or one direct bottleneck assay. The distinctness gate separately requires a job beyond existing provision relationships. No contract change is justified.

## Evidence chain and appraisal

| Link | Evidence and boundary |
|---|---|
| Donor inadequacy → hepatic PEMT-derived PC | Reuse BRS2-FM3-PM7-F5 and its conditional KC1 adjudication: Chew (2011), PMID 21697299, folate restriction with choline maintained reduced hepatic methyl-derived PC enrichment in female mice. Enrichment is not absolute flux; this does not directly establish downstream brain limitation. |
| PEMT-derived PC → circulating LPC-DHA | [Klatt feeding analysis](https://doi.org/10.1017/S0007114519002009): 480 versus 930 mg/day choline; all received 200 mg/day DHA. Figure 6 shows higher d3-LPC-DHA enrichment, without a d9 effect; Figure 5 shows no total LPC-DHA effect. Figure 7 supports PEMT attribution. Tracer attribution is not absolute flux; absolute LPC concentrations were unavailable, and recycling cannot be excluded. |
| LPC-DHA → brain uptake | [Nguyen (2014)](https://pubmed.ncbi.nlm.nih.gov/24828044/): transporter experiments and knockout mice establish MFSD2A-mediated LPC-DHA uptake. This tests transport, not methyl-donor depletion. |
| PEMT loss → brain lipid consequence | [da Costa (2010)](https://pubmed.ncbi.nlm.nih.gov/19889625/): PEMT-deficient fetal mice had lower brain phospholipid DHA; maternal DHA restored it. Genetic loss, developmental context and DHA rescue do not isolate hepatic donor insufficiency or demonstrate adult donor limitation. |

The chain is credible and partly experimentally connected. Its unresolved edge is **donor inadequacy → insufficient net brain-available carrier supply → constrained governed incorporation**, accounting for compensatory synthesis/remodelling and clearance. Extra intake changing labelling does not prove inadequacy lowers total delivery. The fetal genetic study merits further context-specific review; it is not discarded because it is non-human.

## Remaining work

Retrieve the feeding paper’s linked corrigendum (publisher link failed during this run), and fully appraise the fetal primary study’s methods, maternal/fetal genotype and lipid endpoints before any developmental admission. Seek depletion/rescue or supported mechanistic evidence closing the named-donor-to-brain-capacity edge. A human endpoint is not compulsory. If established, assess distinctness against existing carrier/provision atoms before publishing individual KC inputs.

## Changes and history

Removed FM §4’s unconditional KC1 “Relied upon by” block; updated PM7 audit links and rationale; retained the prior report below as history. Existing public dietary atoms, Findings, bibliography, phenomes, dominance and KC definitions are unchanged. The previous report’s stopping after carrier evidence was an incomplete execution of candidate review, not an evidence-based rejection.

---

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
