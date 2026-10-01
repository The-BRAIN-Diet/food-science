# BRS1-FM1-PM4 Noradrenergic Signalling — Stage 2B Report

Stage 2B used the amended Dietary Input Traceability contract, including
authorised question-bounded retrieval and the focused Stage 2A follow-up
path. Existing Iron, PLP and vitamin B6 atoms were retained. The requested
candidates were copper and vitamin C (ascorbate) in the dopamine
β-hydroxylase reaction.

## Missing foundational claim

PM4-F2 had recorded dopamine β-hydroxylase and vitamin C as **unresolved**
because they were not in the attached corpus. That gap blocked dietary
adjudication.

Focused Stage 2A follow-up authored **PM4-F4**. Unrelated Findings (PM4-F1,
PM4-F3, PM4-IC1) were not rerun.

## Questions and stopping rationale

Questions:

1. Does dopamine β-hydroxylase convert dopamine to noradrenaline?
2. Are copper and ascorbate reaction participants?
3. Does ordinary dietary copper or vitamin C change human brain
   noradrenaline, attention or ADHD?

Retrieved: Goldstein and Eisenhofer (2026); Vendelboe et al. (2016);
Scheiber et al. (2014); Lutsenko et al. (2019); Harrison and May (2009).
Already on the page: Beard, Kennedy, Spector.

Stopped after those sources established biochemical necessity and showed
that ordinary-diet modulation and functional benefit were not supported.
Did not expand into every historical enzyme paper. High-dose intravenous
vitamin C in septic shock was excluded as the wrong construct (illness,
parenteral dose, plasma noradrenaline / vasopressor use).

Coverage is sufficient for the requested candidates. Schema validation is
not scientific completion.

## Claim thresholds

| Claim | Copper | Vitamin C (ascorbate) |
|---|---|---|
| Biochemical necessity | Supported (PM4-F4) | Supported (PM4-F4) |
| Dietary provision | Diet can supply copper; not shown to supply vesicular DBH copper as a controllable lever | Humans require dietary vitamin C; not shown to raise vesicular ascorbate for DBH as a controllable lever |
| Demonstrated dietary modulation | Not established in copper-replete humans | Not established in vitamin-C-replete humans |
| Functional or clinical benefit | Not established | Not established |

Menkes copper-trafficking disease and animal copper deficiency support
necessity under failure of copper delivery. They are not ordinary-diet
modulation. They are not evidence-supported rejections of the cofactor
role.

## Adjudication

| Atom | Decision | Addressability | Claim ceiling |
|---|---|---|---|
| PM4-DIT-4 Copper | Direct Dietary Requirement; capacity-requirement | `not-established` | `biological-dependency` |
| PM4-DIT-5 Vitamin C (ascorbate) | Direct Dietary Requirement; capacity-requirement | `not-established` | `biological-dependency` |

Neither is admitted as a noradrenaline lever. Page-level
`dietary_addressability` remains `not-established`; `claim_ceiling`
remains `biological-dependency`.

Same-role reprint in §3.1.2 was not used. Iron, PLP and B6 were unchanged.

## §3.1.3 PM↔iKC adjudication (KC1 two arms)

Relationship-first test of **PM4 ↔ BRS1(KC1)** against the KC-membership
contract. Requirement admission (tyrosine is not a PM4 Dietary Requirement)
is a separate assessment and is not the KC decision. Upstream ownership
neither automatically excludes membership nor establishes it.

KC1 is one iKC with two arms. They are adjudicated separately.

### Arms

| Arm | KC role | PM4-specific role | Evidence on this PM | Decision |
|-----|---------|-------------------|---------------------|----------|
| Amino-acid quality / precursor availability | Shared indispensable / protein-quality precursor pool | Tyrosine is the catecholamine starting material (PM4-F2). Pool quality and circulating supply are assessed on PM1 | PM4-F2; no FAO/DIAAS or Mariotti-type protein-quality evidence as a PM4 constraint | **Upstream dependency through PM1.** Not a qualifying PM4 constraint relationship. |
| Competitive balance at LAT1 | Relative LNAA presentation at the blood–brain barrier | Tyrosine must enter the brain before this PM acts. Competitive transport is assessed on PM2 | PM4-IC1; Fernstrom 2013 on PM2; PM4-F2 treats transport as an earlier step | **Upstream dependency through PM2.** Not a qualifying PM4 constraint relationship. |

Neither arm is published as a PM4↔iKC mapping. Biological relevance of
the shared pool and of LAT1 competition is retained as PM-connection
explanations, not as membership.

### Schema-field decisions

| Field | Decision |
|-------|----------|
| `key_constraints` | **None.** Listing BRS1(KC1) would publish a mapping. |
| `pm_kc_relationships` | **None.** |
| `constituent_relationships` | **None.** |
| `kc_change_control_flags` | **None.** No PM4 quality-arm candidate. Residual quality-arm review remains on PM1 (`KC-CC-BRS1-FM1-PM1-01`). |

### Exact resulting public §3.1.3 copy

```
No mapping established.
```

No KC title, no relevance paragraph, no constituent bullets.

Unresolved distinction: none on the PM↔iKC test. The KC page may still
list PM4 as a connected mechanism; that is KC-owned navigation, not
published PM membership.

## Review & Corrections

`FW018` records the copper and vitamin C admissions.
`FW019` records the earlier §3.1.3 two-arm adjudication.
`FW025` / `FW034` record the completed Type D assessment: quality
`unresolved`; competitive `evidence-supported-non-application` for ordinary
meal LNAA balance; public copy stays `No mapping established.` See
`system/brs1-fm1-pm3-pm5-type-d-kc-reassessment.md`. Findings and Dietary
Requirements were not reopened. Applied corrections are not independent
source or expert validation.

BRS3-FM2-PM3 (“assumes antioxidant-substrate sufficiency”) fails Type D (2)
and was not used as an exemplar. BRS5-FM1-PM1 (Peng/Silva; butyrate →
tight-junction assembly) is a closer structural form-match; it was not
reassessed and was not used as a template for this signalling PM.

## Validation

- `npm run findings:sync -- --pm BRS1-FM1-PM4`
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx --pm-only`
- `npm run findings:check`
- `npm run test:scientific-findings`
- `npm run bib:validate` (cited keys)
