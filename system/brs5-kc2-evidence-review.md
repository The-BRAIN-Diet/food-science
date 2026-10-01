# BRS5(KC2) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs5/kc/brs5-kc2-polyphenol-and-plant-diversity-input-availability.mdx`  
**Corpus (attached only):** Wastyk et al. 2021 (`wastyk_gut-microbiota-targeted_2021`); Singh et al. 2022 (`singh_direct_2022`).  
**PM evidence:** not reviewed or modified. PM ↔ iKC applicability remains outside this pass.

## Verdict

**Rejected as a coherent Key Constraint.**

The attached corpus does not establish “microbiome-active polyphenols” and
“plant-diversity inputs” as one identifiable nutritionally constrained resource
pool or bottleneck shared across several biologically distinct mechanisms.
They are an outcome-oriented grouping of different exposures and processes:

- Wastyk compared high-fibre and high-fermented-food dietary interventions. It
  supports diet-associated microbial and immune responses, but it did not
  isolate polyphenol exposure, manipulate plant-food variety as the tested
  variable, or measure a combined polyphenol-and-diversity resource pool.
- Singh examined urolithin A exposure, including variable microbial conversion
  of food-derived ellagitannin precursors and direct urolithin A
  supplementation. It supports conversion-dependent exposure to one microbial
  polyphenol metabolite, not a broad polyphenol requirement, plant-diversity
  requirement, or shared resource spanning the listed mechanisms.

No coherent narrower KC survives this corpus. Polyphenol precursor exposure and
microbial conversion may remain relevant to the polyphenol-biotransformation PM,
but that is not evidence of a shared KC and was not migrated into PM evidence.

## Page coherence

**Candidate proposition:** microbiome-active polyphenol exposure and
plant-input diversity jointly maintain ecological selection, keystone-taxa
support, and microbial biotransformation as one shared constraint across FM1
and FM2.

**Adjudication:** **rejected**.

The proposed members are not alternate inputs to one defined substrate,
precursor, structural, or cofactor pool. “Plant diversity” is an exposure
property of a dietary pattern; “polyphenols” are a broad compound class; and
microbial biotransformation capacity is a biological process with
compound-specific and host-microbiome-dependent outputs. Their possible
convergence on microbial outcomes does not make them one constrained resource.

`kc_evidence_review_status` therefore remains `legacy-unreviewed`: the allowed
schema has no rejected/retired review status, and setting `canonical` would
falsely require at least one admitted constraint-bearing constituent. The
completed rejection is recorded through local change-control flags and this
report.

## iKC definition

No iKC is admitted.

| Proposed iKC | What would have to be constrained | Verdict |
|---|---|---|
| Combined polyphenol-and-plant-diversity input sufficiency | One shared dietary resource whose inadequate availability constrains multiple distinct BRS5 mechanisms | **Rejected.** No such common pool or bottleneck is defined or measured by the attached evidence. |
| Microbiome-active polyphenols | A broad dietary polyphenol precursor pool shared across several distinct mechanisms | **Rejected as an iKC.** Singh supports a narrower, conversion-dependent ellagitannin/urolithin A exposure relationship, not the proposed broad pool or shared scope. |
| Plant-diversity inputs | Dietary variety itself as a shared limiting biological resource | **Rejected as an iKC.** Wastyk did not test plant variety as the isolated exposure, and dietary-pattern diversity is not shown to be one substrate or resource pool. |

No `individual_key_constraints` declaration was added because doing so would
invent constraints not supported by the evidence.

## Constituent adjudication

### Microbiome-active polyphenols — rejected from iKC membership

| Atom | Assessment record |
|---|---|
| Input | Microbiome-active polyphenols |
| Input Type | `nutrient/compound class` |
| Biological Role tested | Proposed broad precursor class for microbial biotransformation and ecological effects |
| Evidence Source | `singh_direct_2022` |
| Limitation | The source concerns ellagitannin-derived urolithin A exposure and direct urolithin A supplementation. It does not establish all microbiome-active polyphenols as one pool, ordinary dietary insufficiency, a shared constraint across the listed mechanisms, or benefit from greater polyphenol intake. |
| Constraint status / membership | `unsupported` / rejected |
| Claim ceiling | No KC-level claim established |

### Plant-diversity inputs — rejected from iKC membership

| Atom | Assessment record |
|---|---|
| Input | Plant-diversity inputs |
| Input Type | `dietary pattern` |
| Biological Role tested | Proposed exposure breadth sustaining microbial ecological turnover and keystone-taxa resilience |
| Evidence Source | `wastyk_gut-microbiota-targeted_2021` |
| Limitation | The trial compared high-fibre and high-fermented-food diets; it did not isolate plant-food variety or establish a diversity threshold, an indispensable shared resource, or constraint across the listed mechanisms. |
| Constraint status / membership | `unsupported` / rejected |
| Claim ceiling | No KC-level claim established |

These rejected assessment records remain in this review report and local
change-control flags. They were not written to `kc_input_traceability`, because
that field requires `kc_evidence_review_status: canonical`, and canonical
validation correctly rejects a KC with no admitted constituent. No
`kc_constituent_presentations` were created, and §2 contains no projected
constituents or food arrows.

## Emerging Biological Supports

No candidate is prioritised.

The inherited prose mentioned direct urolithin A, ellagitannin concentrates,
and other polyphenol-metabolite supplements without candidate-specific
adjudication. It was removed rather than converted into support atoms. Singh
supports direct urolithin A exposure as a way to bypass variable dietary
exposure and microbial conversion, but the proposed KC itself is invalid; the
source does not establish support for a coherent shared constraint. Therefore
no `kc_emerging_support_traceability` or
`kc_emerging_support_presentations` records were added.

## Public Summary check

The replacement `#### Summary` has:

1. one concise paragraph explaining why the two exposures do not form one
   shared constraint, with claim-local citations to both attached sources;
2. exactly three distinct bullets covering membership, evidence/measurement,
   and biological-relevance/provision boundaries;
3. no canonical-status, iKC, Stage 2B, proposed-scope, or maintenance language;
   and
4. no adequacy, supplementation, mechanism-wide, or clinical claim beyond the
   attached evidence.

Every citation resolves to an existing page bibliography entry and to
`static/bibtex/BRAIN-diet.bib`.

## FM/PM scope

The inherited FM1/FM2 and PM3/PM4/PM6 list is **not carried forward as proposed
scope**, because no coherent iKC survived. The attached sources may be relevant
to individual PM propositions, but they do not establish that all listed
mechanisms share the rejected combined constraint.

The page now states that no FM or PM connection is established through this
shared grouping. This is not a negative adjudication of any PM-specific dietary
relationship. No PM page or PM evidence record was reviewed or changed.

## Food relationships

The inherited food arrows were removed. Neither attached source independently
adjudicates the listed food-to-input composition claims at the displayed
granularity, and food examples cannot establish KC membership.

## Change-control flags

Four local flags are recorded:

- `KC-CC-BRS5-KC2-01` — `invalid-kc`, pending architecture review: the combined
  grouping fails the KC inclusion test.
- `KC-CC-BRS5-KC2-02` — `constituent-challenge`, resolved: broad
  microbiome-active polyphenols are not admitted.
- `KC-CC-BRS5-KC2-03` — `constituent-challenge`, resolved: plant-diversity inputs
  are not admitted.
- `KC-CC-BRS5-KC2-04` — `ikc-scope-conflict`, pending architecture review: the
  listed FM/PM scope cannot be supported through an invalid shared constraint.

No shared queue or registry file was edited, as required by the task boundary.

## Governing limitations and stopping rationale

- Review was limited to the two citations already attached to this KC page and
  their existing bibliography records.
- No external literature was added and no bibliography entry was changed.
- Wastyk cannot attribute effects to polyphenols or plant diversity, and Singh
  cannot generalise one ellagitannin-to-urolithin pathway to a broad shared
  polyphenol pool.
- Absence of KC-level support is not evidence that polyphenols, plant-food
  variety, fermented foods, fibre, or urolithin biology are unimportant.
- The bounded question is resolved: the existing corpus cannot support the
  proposed shared pool, either at its original breadth or as a narrower
  multi-mechanism KC. Further PM-level dietary adjudication would exceed this
  review and was not performed.
