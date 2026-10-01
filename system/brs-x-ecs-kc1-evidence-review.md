# BRS-X(ECS-KC1) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs-x/ecs/kc/brs-x-ecs-kc1-phospholipid-nape-precursor-availability.mdx`  
**Corpus (existing page only):** Garani et al. 2021 (`garani_endocannabinoid_2021`); Davies 2018 (`sean_davies_oatmeal_2018`).  
**PM evidence:** not modified. PM ↔ iKC applicability is out of scope.

## Verdict

**Invalid as a KC on the available evidence.** The corpus does not establish an
identifiable nutritionally constrained phospholipid/NAPE resource pool shared by
multiple biologically distinct mechanisms. It supports neither the proposed
constituent memberships nor the claimed multi-mechanism scope.

The review is complete, but `kc_evidence_review_status` remains
`legacy-unreviewed`: the canonical schema requires at least one admitted
constraint-bearing constituent, and none earned admission. Promoting the page to
`canonical` would therefore be scientifically false and fail
`kc_canonical_no_admitted_constituents`. Retirement or replacement requires
shared-registry and dependent-page changes outside this task.

## Bounded corpus assessment

### Garani et al. 2021

This is a review of human postmortem, peripheral, cerebrospinal-fluid and imaging
evidence for endocannabinoid-system alterations in psychotic and mood disorders.
Its abstract does not test dietary phospholipid provision, phosphatidylethanolamine
availability, choline provision, NAPE synthesis, omega-3-derived ethanolamide
synthesis, or nutritional limitation. It cannot support the proposed KC
definition, constituent membership, or shared scope.

### Davies 2018

The bibliography record is a clinical-trial registration. It states that oatmeal
contains NAPEs and proposes an acute feeding experiment testing a hypothesised
increase in circulating NAPE/NAE and satiety-related endpoints. It reports no
completed results. Even if the food-content statement is accepted at face value,
it concerns direct dietary NAPE exposure and one NAPE/NAE context; it does not
establish endogenous phospholipid precursor limitation, choline limitation, or a
resource shared by multiple distinct mechanisms.

## Page coherence

**Candidate proposition:** dietary phosphatidylethanolamine-rich inputs,
phospholipid-rich whole-food matrices and choline-linked precursors form one
limiting pool that sustains NAPE/NAE biosynthesis and omega-3-derived
endocannabinoidome signalling.

**Adjudication:** **rejected / invalid KC.**

- No source demonstrates that availability of the named pool is limiting.
- No source establishes all three proposed constituent classes.
- No source establishes that several biologically distinct mechanisms draw on
  the same constrained pool.
- The only diet-specific record is a protocol about oatmeal-derived NAPE, not
  evidence for a generic phospholipid or choline precursor pool.
- The borderline ECS rule is not satisfied: the page spans candidate ECS-FM1
  mechanisms in name only, without evidence that they genuinely share the pool.

The title and inherited ambition therefore overstate the evidence. The page now
states the negative boundary and carries an `invalid-kc` flag rather than
preserving the resource-pool claim.

## iKC definition

The undeclared default iKC would be `BRS-X(ECS-KC1)`.

| Question | Assessment |
|---|---|
| What is constrained? | Not established. The corpus does not demonstrate constrained dietary phospholipid, phosphatidylethanolamine, NAPE or choline availability. |
| What resource constitutes the constraint? | Not established. Dietary NAPE exposure in the Davies protocol is not evidence for a broader endogenous precursor pool. |
| Why is this a constraint rather than a relevant pathway or input? | No evidence in the corpus meets that threshold. |
| How is it shared? | Not established across two or more distinct mechanisms. |

No additional iKC was declared; splitting unsupported constituent classes would
invent constraints.

## Constituent adjudication

No candidate earns `ikc_membership: admitted`. Consequently the page has no
`kc_input_traceability` or `kc_constituent_presentations`: canonical status would
require an admitted constraint-bearing atom, while excluded-only atoms cannot
make an invalid KC canonical.

### Phosphatidylethanolamine-rich inputs

| Atom | Assessment |
|---|---|
| Input | Phosphatidylethanolamine-rich inputs |
| Input Type | `nutrient/compound class` |
| Biological Role proposed | Dietary precursor input for endogenous NAPE formation |
| Evidence Source | `sean_davies_oatmeal_2018` |
| Limitation | The record concerns NAPE content in oatmeal and a proposed acute NAPE/NAE experiment. It does not report results, test phosphatidylethanolamine provision, establish nutritional limitation, or show shared use across mechanisms. |
| Status | `unsupported`; not admitted |
| Claim ceiling | None beyond a protocol-level hypothesis |

### Phospholipid-rich whole-food matrix

| Atom | Assessment |
|---|---|
| Input | Phospholipid-rich whole-food matrix |
| Input Type | `dietary matrix` |
| Biological Role proposed | Broad dietary matrix maintaining a shared ECS phospholipid precursor pool |
| Evidence Source | `sean_davies_oatmeal_2018` |
| Limitation | Evidence for one oatmeal exposure cannot establish oats, legumes and fish as an interchangeable class, and food composition cannot establish a shared biological constraint. |
| Status | `unsupported`; not admitted |
| Claim ceiling | None |

### Choline-linked precursor pool

| Atom | Assessment |
|---|---|
| Input | Choline-linked precursor pool |
| Input Type | `precursor` |
| Biological Role proposed | Supports phosphatidylcholine/phosphatidylethanolamine interconversion feeding shared NAPE and omega-3 signalling capacity |
| Evidence Source | `garani_endocannabinoid_2021`; `sean_davies_oatmeal_2018` |
| Limitation | Neither source tests choline provision, phospholipid interconversion, choline limitation, or a shared ECS precursor constraint. |
| Status | `unsupported`; not admitted |
| Claim ceiling | None |

Exclusion here is not a finding that these inputs are biologically irrelevant.
PM-specific substrate, dietary-input or modulation propositions require
independent PM evidence review.

## Public Summary check

- Opening paragraph: 76 words; one cited paragraph within the required 65–90
  word range.
- Exactly three cited bullets: constraint/membership boundary;
  evidence/measurement boundary; biological relevance/provision limitation.
- Claims match the corpus and do not imply dietary limitation, supplementation
  benefit, clinical benefit, or completed Davies results.
- Both citation keys resolve in `static/bibtex/BRAIN-diet.bib`.
- No unresolved positive claim remains in the Summary.
- Local rendered-page inspection confirmed one Summary paragraph, exactly three
  list items, the canonical §2 collapsed button, and no unearned §3 resource
  disclosure.

## Emerging Biological Supports

No candidate was assessed from §4 because the inherited section named speculative
future examples without source-led evidence. The public section now states that
none are prioritised and contains no unsupported candidate dropdown or support
atom.

## Proposed FM/PM scope

| Connection | Adjudication |
|---|---|
| BRS-X(ECS-FM1) | Not established as sharing one constrained nutritional resource. |
| BRS-X(ECS-PM1) — NAPE → NAE biosynthesis | Biologically adjacent to the Davies protocol, but one candidate mechanism cannot establish a KC; precursor limitation is not demonstrated. |
| BRS-X(ECS-PM2) — omega-3-derived endocannabinoidome signalling | Not established by either attached source as drawing on the candidate shared pool. |
| BRS1-FM2-PM6 — acetylcholine synthesis support | Materially inconsistent with the ECS phospholipid/NAPE candidate definition and unsupported by the corpus; removed from the page. |

Because no coherent iKC survives, the page does not publish these as established
connected mechanisms. Existing PM-side references remain untouched and require
independent correction outside this task.

## Change-control flags

- `KC-CC-BRS-X-ECS-KC1-01` — `invalid-kc`, pending: the shared constrained pool
  is not established.
- `KC-CC-BRS-X-ECS-KC1-02` — `constituent-challenge`, resolved by this review:
  all three inherited constituent classes failed strict membership.
- `KC-CC-BRS-X-ECS-KC1-03` — `ikc-scope-conflict`, pending: inherited FM/PM scope
  is not evidence-supported and includes a materially inconsistent cross-BRS PM.

The shared change-control queue was not edited, as required by task scope.

## Governing limitations and stopping rationale

- Existing KC-page corpus only; no external retrieval and no PM evidence reuse.
- The Garani abstract is wrong-construct evidence for this KC proposition.
- The Davies record is a registration/protocol, not a completed-results report.
- Missing support was not treated as proof that phospholipid or NAPE availability
  can never be limiting; it establishes that this page cannot claim the KC on
  the reviewed corpus.
- Assessment stopped after every title, ambition, constituent, Summary,
  emerging-support and scope proposition was adjudicated. Additional research
  would exceed the explicit existing-corpus boundary.

