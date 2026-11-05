# PM1 reference completion — local implementation, 3 November 2026

Branch `review/brs5-pm4-sec-assessment`, base HEAD `f1607fe5`. Not committed or published. Owner authorised this targeted completion, PM8 tabs and existing six-atom presentation. This is a reference candidate for author review, not a declaration that a Gold Standard or Stage 2C has been activated.

## Scientific disposition

| Canonical record | Current disposition | D/B/P/R | SEC |
|---|---|---|---|
| PM1-F1 | Existing appraisal preserved | 2/1/1/1 | Provisional 5/8 |
| PM1-F2 | Qualified diet-wide adequacy; new v3 | 1/1/1/1 | Provisional 4/8 |
| PM1-F3 | Physiological phenylalanine-to-tyrosine supply, distinct from reaction identity; new v3 | 2/1/1/1 | Provisional 5/8 |
| PM1-F4 | Historical reclassification to SP2 preserved; not an active scored Finding | — | Not applicable |
| PM1-F5 | Existing texture/appearance appraisal preserved | 2/1/1/0 | Provisional 4/8 |
| PM1-F6 | Existing extrusion appraisal preserved | 2/1/1/0 | Provisional 4/8 |
| PM1-F7 | Access-limited appraisal outcome, new v1; public SF6 | 2/unassessable/unassessable/0 | Evidence Un-assessable |
| Minced-beef SOP | Independent exact intervention–appearance appraisal | 2/1/1/0 | Provisional 4/8 |
| Boiled-egg SOP | Independent exact intervention–peak-EAA appraisal | 2/1/1/0 | Provisional 4/8 |

Public active Finding numbers remain consecutive; immutable IDs are not reused. SP1 PAH reaction and SP2 precursor identities are unchanged and unscored. All provisional scores require the existing human scientific review process; a validator's “scientificallyAppraised” status does not mean editorial approval.

### Sources and boundaries

- F3: [Møller et al. 2000](https://doi.org/10.1073/pnas.97.3.1242), complete Scite article retrieved in three segments, methods/results examined. Separate renal and splanchnic cohorts of 12 healthy adults each; tracers and regional balance show endogenous conversion. Intracellular enrichment limits accurate comparison of organ contributions. [Tessari et al. 1999](https://doi.org/10.1038/sj.ki.4491156), abstract-only independent regional corroboration; not credited as fully appraised methods. Matthews 2007 retained as context, not claimed newly full-text verified. Two primary bibliography records added and author metadata checked against Crossref.
- F2: [Mariotti and Gardner 2019](https://doi.org/10.3390/nu11112661), full-text intake/adequacy sections examined through Scite. Narrative synthesis supports a qualified diet-wide adequacy proposition, not proof that every vegetarian diet is adequate or a meal-combination trial. Underlying cohorts and nitrogen-balance studies were not all independently full-text appraised. Conservative review-level Directness and explicit bias/precision limits retained.
- F7: [Melamed et al. 1980](https://doi.org/10.1007/BF01247323), Scite, PubMed, publisher preview/PDF attempt and institutional discovery yielded abstract-level information, not complete controls or uncertainty. Two separately actionable Assessment gaps record missing B and P information. No total is calculated. The one identified experiment gives R=0; this is not a claim that no relevant literature exists.
- Beef: [Pennings et al. 2013](https://doi.org/10.3945/ajcn.112.051201), retained documented full experimental appraisal in `review/pm1-reassessment/evidence.mjs`, not a claim of fresh full-text retrieval. Ten older men, 135 g, crossover, six-hour dietary phenylalanine appearance. No detectable total-EAA or muscle-protein-synthesis advantage preserved.
- Eggs: [Fuchs et al. 2022](https://doi.org/10.1093/jn/nxac174), full text recovered through NCBI BioC, PMC9644172, methods/statistics/results examined. Forty-five trained young men across three arms; five eggs after exercise. Higher EAA peak is a concentration outcome, not labelled dietary tracer flux. The study was powered for muscle protein synthesis, not this secondary peak endpoint; no MPS advantage demonstrated. Evenepoel's separate ileal study is digestibility context, not independent replication of the peak response.

No brain uptake, neurotransmitter synthesis, ADHD improvement or universal dietary prescription inferred. Evidence Gap PM1-EG-TRANSLATION-1 separately tracks the substantive circulating-to-brain/functional-outcome proposition; it was not generated merely from an incomplete score.

## Presentation and contracts

Enabled existing Evidence Gaps, Open Issues and Evidence & Audit tabs. Findings remain individual disclosures in Section 4. Principles remain in Evidence & Audit. Open Issues accurately reports no recorded open questions. Two SOPs retain their existing admissions, summaries, separately qualified MoA and measured effect, multiple typed limitations and original references. SEC links now resolve to independently owned Section 4 assessments. No Lifestyle Lever was invented.

Existing EvidenceAudit gained an optional heading and intervention-owned backlink support; default Finding output remains unchanged. The existing SEC ownership allowlist now supports PM1 as well as PM3. No new scoring formula or automatic cross-PM projection. Removed the dated Stage 2 execution block; preserved original source in before.mdx and Git history. Corrected invalid paragraph/list nesting in the existing SOP markup.

Bounded instruction updates: scientific-finding-schema.md (Stage 2A), dietary-input-traceability-contract.md (Stage 2B), primary-mechanism-schema.md, pm-evidence-tabs-contract.md, sop-lifestyle-six-atom-presentation.md, sec-assessments/README.md. They specify physiological Finding versus reaction Principle, independent intervention assessment ownership, explicit access limits and PM1-only reference scope. Approval ledger retains 24 previous records and adds two records citing this actual owner instruction; baseline not regenerated.

## Validation

- Targeted PM1, intervention ownership, completeness and MoA tests: **35/35 pass**. PM1-specific tests re-run after formatting cleanup: **5/5 pass**.
- Additional broader selection: **47/52 pass**. The five failures reproduce with baseline source/registry restored in a temporary test overlay: obsolete PM8 unrelated-page hash, stale Evidence Gaps component mock, legacy Finding HTML snapshot, audit test dependency, publication-gate expectation. No unrelated fixture changes made.
- SEC registry/history: **118 valid snapshots; all 113 prior records exactly preserved**.
- PM1 completeness: before 3 completed/3 pending, 12 unexplained dimensions; after 5 provisional numerical/1 unassessable, 22 numerical dimensions/2 documented unassessable, zero unexplained dimensions or missing statuses.
- Findings generation consistency: **64 PMs, zero problems**. PM1 MDX compiles.
- `npm run presentation:check`: **691 protected files, no unapproved structural changes**.
- Dietary governance: PM1 has no issues; repository check retains three LAT1 PM2-DIT-3 issues. Not changed here.
- Bibliography validator: PM1 new keys resolve; global check fails on existing `zeisel_choline_betaine_2003` and `_erratum` references in unrelated food/substance pages.
- Existing localhost server recovered without another server. Client compiled successfully. Browser verified three tabs, principles, six active Findings, explicit unassessable label, independent SOP expansion, mechanism summaries, null-outcome limitations and Section 4 anchor opening. Screenshot: pm1-six-atoms.png.
- Full production build not run; global prebuild dietary gate remains blocked by the unrelated LAT1 issues. No production readiness claim.

## Remaining decisions/work

1. Obtain Melamed original methods/results to revisit B/P; preserve the current unassessable outcome until then.
2. Human review of provisional F2/F3 and intervention appraisals under existing governance.
3. Author review of PM1 as the reference example before shortening or restructuring Stage 2A/2B. The current task did not authorise that refactor.
4. Resolve unrelated LAT1, bibliography and legacy test failures separately before a clean repository-wide release claim.
