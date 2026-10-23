# PM1 Stage 2A -> Stage 2B -> SEC reassessment

Assessment date: 2026-10-18. Process: Codex bounded mission-wide reassessment, version 1. No qualified human scientific review is implied. This is a review draft, not a canonical admission or rollout.

## Baseline and scope

Checkout: `work/sec-pm1-reassessment`, branch `codex/pm1-stage2ab-sec-reassessment`. Copied the complete uncommitted three-PM integration state, including approved local changes and assessment history, into a separate Git checkout; no commits were created and the source checkout was not switched or reset. `baseline.mdx` and `baseline-manifest.json` preserve PM1 source bytes. Reference PMs, food mappings, ontology and global contracts remain byte-identical to the integration source.

Authoritative instructions examined: `system/scientific-finding-schema.md` (bounded discovery, recovery, limitations, status gate and all-category screening); `system/dietary-input-traceability-contract.md` (specificity, B/D, Direct/Derived, SOP/lifestyle, six atoms, KC and intervention-dominance/placement); `system/primary-mechanism-schema.md`; `system/brs-hub-levers-schema.md`; SEC calibration rubric/status contract; `system/sec-assessments/README.md` and implementation. Existing PM1 Stage 2A, overview and Stage 2B reports were compared with the current PM, FM1 and BRS1 hub, including every SOP category and lifestyle priorities. The three integrated reference PMs and their current SEC pins were inspected as presentation/evidence-boundary precedents, not as scientific evidence for PM1.

Mission retained: meal-level dietary protein delivers the circulating amino-acid foundation for subsequent monoamine pathways. No expansion into LAT1 transport (PM2), catecholamine/serotonin synthesis (PM3-PM5), general muscle optimisation, malabsorption treatment or ADHD efficacy. Endogenous protein turnover and phenylalanine-to-tyrosine conversion contribute to pools; diet is not the sole instantaneous source.

## Stage 2A search and recovery account

Repositories/discovery: web search, publisher/PubMed records, Maastricht and Massey institutional manuscripts, Cambridge full text, Scite literature metadata, full-text recovery and citation contexts. Search date 2026-10-18; no starting date restriction; targeted newer-evidence searches included 2024-2026. This was not a systematic database export or a complete literature census.

Queries actually run included:

- `dietary protein` with `amino acid availability` / `phenylalanine appearance` (Scite).
- Gorissen 2020 / 602 / 18 trials / circulating phenylalanine.
- Protein preparation/cooking/mastication/mincing and human amino-acid availability; exact Pennings title and DOI recovery; newer exact-protocol replication search.
- Plant-protein blends, milk and plasma amino-acid availability, randomised humans, 2024-2026.
- Protein distribution/timing/sleep/exercise and circulating dietary amino acids; even versus skewed distribution; presleep protein.
- Carbohydrate and fat coingestion with protein digestion/absorption.
- Fermentation, soaking/cooking, legumes and human amino-acid bioavailability.
- Sleep restriction/deprivation and plasma amino acids; stress-management/breathwork/meditation and delivery endpoints; circadian/light terms with amino-acid availability.
- Hydration, exercise dehydration and protein digestion/serum amino acids.
- Newer protein-quality, requirement and processing systematic reviews; relevant supporting/null evidence.

Scite recovered full Methods/Results for the independent 2024 six-source crossover, 2019 five-source blend study and 2024 extrusion study, plus sections of Mariotti and Moughan reviews. Its source fields were checked: Matthews, Marsh, Aquili and Pennings did not return full text. The Pennings institutional thesis recovered the complete experiment, with final publication direction/quantity cross-check; it is the same dataset, not independent replication. Gorissen's published open PDF was appraised directly. Scite citation classifications/counts were not used as replication scores. Retrieved citation contexts pointed to relevant source comparisons and methodological dependence, not a verified independent exact beef-texture replication. No purchases or access-barrier bypasses.

`evidence.mjs` records each source's population/design, exposure, comparator, endpoint, uncertainty, access status and independence; `assessments-v1.json` records proposition-specific evidence roles and retrieval effects. The 2026 hydration lead is retained with fixed-condition-order and concentration-versus-absorption limitations; it is not silently promoted to a clinical hydration rule. The 2026 processing meta-analysis is an accessible-abstract null challenge with inaccessible methods, not a new replication or a claim that the exact mincing experiment was refuted.

### Material retrieval gaps

| Source | Recovery outcome | Effect on decision |
| --- | --- | --- |
| Pennings 2013, 10.3945/ajcn.112.051201 | Scite abstract; institutional thesis chapter 6 recovered, publication result cross-checked | Residual masking/order and paired-interval limits remain; no second dataset credited. |
| Matthews 2007, 10.1093/jn/137.6.1549S | Scite abstract; PMC blocked; UniProt/Rhea reaction independently verified | Keep biochemical provenance without numerical SEC; no unexamined physiological quantitative claim. |
| Marsh 2013 / Aquili 2020 | Abstract plus existing canonical assessments; no complete new full-method appraisal | Retained adequacy/identity context, not newly scored supplement efficacy. |
| Burstad 2025, 10.1016/j.ajcnut.2025.04.017 | Publisher abstract and AHRQ/NCBI report leads; full retrieval unsuccessful | Quantitative requirement uncertainty retained; no new intake dose or precision score. |
| Carbohydrate/fat/pre-sleep/distribution studies | Published abstracts and selected open repository material; not every method table reappraised | Contextual candidacy decisions only; no formal SEC assigned to an alleged optimal regimen. |
| Xin 2026, 10.3390/nu18193267 | Publisher-indexed design and results excerpts; direct HTML/PDF unavailable | Possible early concentration effect, fixed-order confounding; no selected lifestyle protocol. |
| Processing meta-analysis 2026, 10.1016/j.tifs.2026.105725 | Publisher abstract lead, Scite metadata; pooled methods unavailable | No general processing-benefit claim; exact protocol replication remains assessment-bounded. |

### Coverage challenge and stopping rationale

The first sweep exposed omitted preparation/source evidence, a broad age interpretation, and the possibility of dietary tyrosine contribution. The second targeted recovery inspected matched texture protocols, independent source-response experiments, integrated-null endpoints and newer processing/requirement reviews. The revised decisions are below. Remaining uncertainties concern exact clinical generalisation, a general optimal timing rule, specific lifestyle delivery interventions and proposed tyrosine admission. They are explicitly unresolved after targeted retrieval, not evidence-supported claims of non-existence. Further open-ended discovery was stopped because it would not justify broader V1 claims without additional proposition-specific appraisal.

## Stage 2B decisions and specificity

**Capacity Dietary Requirement = B AND D**, for the same dependency pathway. Neither a plasma response nor a food tag alone establishes a dietary recommendation.

| Existing/candidate input | Specificity and B/D decision | Proposed destination |
| --- | --- | --- |
| Defined indispensable amino-acid coverage, PM1-DIT-1 | Retained defined pool: mission concerns diet-wide coverage, not a generic protein supplier. B established nutritional dependency; D established dietary provision. | Direct capacity relationship, unchanged. |
| Tryptophan, PM1-DIT-5 | Retain accepted independently explained precursor relationship. B indispensable serotonergic precursor; D dietary supply. No serotonin-dose inference. | Direct, unchanged; not repeated in biochemical inventory. |
| Dietary protein, historical PM1-DIT-2 | Delivery-only category for the admitted pool, not a second primary requirement. | Remains consolidated, history preserved; not resurrected. |
| Tyrosine, PM1-DIT-4 | Specific biochemical precursor with endogenous and dietary contributions. Non-essential status alone cannot exclude D. New source-response evidence supports dietary contribution but does not by itself settle the independently admitted PM relationship. | Existing biochemical atom and Unset dietary decision preserved. Explicit scientific approval requested before any Direct/Derived change. |
| Phenylalanine as an additional atom | Included within existing coverage identity; no separate deficiency or supplement proposition requiring a new primary entry adjudicated. | No new atom; conversion evidence retained. |
| PAH cofactors, iron and tetrahydrobiopterin | Reaction annotation establishes participation, not an independently adjudicated PM1 dietary supply chain. Conversion chemistry is context, not permission for every upstream cofactor. | Curated context, no new dietary atoms or KC mapping. |
| Same-meal complementary pairing | Diet-wide adequacy does not require conscious pairing in every meal; specific low-variety diets remain distinct. | Historical non-admission retained; no compulsory pairing SOP. |

All existing six-atom records, IDs, Direct classifications, dietary-input values, KC applicability/change-control/history, phenome mappings and source records are preserved exactly in the draft. Food composition remains independent of dietary admission. Food rankings and mappings are not regenerated. The proposed SOP uses the same six scientific fields with dietary involvement Yes; its temporary review ID is not registered or counted in dietary roll-up.

Full category-by-category candidate matrix is in `evidence.mjs` (`candidates`). All five SOP hub categories and recurrent lifestyle families were screened, including empty hub categories. One selected SOP, no selected lifestyle levers; three is a ceiling, not a quota. Nonselected studies remain traceable and are not declared scientifically uninteresting or automatically moved to another PM.

## Dominance and section placement

Retain **Diet-Dominant**, separately adjudicating **Dietary Requirements** as the principal route. Feeding experiments measure mission-specific dietary delivery; this is not inferred merely from biochemical necessity or lack of competing levers. Texture optimisation is a narrower old-age/food-specific modifier. No direct comparison of all categories or clinical superiority is claimed. The proposed `intervention_dominance_assessment` supplies source/Finding links and separate relevance, directness and extent rationale.

Canonical-shaped source authors all three groups once; the existing layout transform promotes Dietary Requirements to 1.1 and its children to 1.1.1-1.1.3. Nonprincipal SOP and lifestyle sections remain in section 3. The isolated body mirrors this numbering without declaring a PM ID in page front matter; it cannot register as a canonical PM. No global placement code changed.

## Scientific changes and SEC

| Finding | Before -> proposed | D / B / P / R | Raw / adjusted | Status |
| --- | --- | --- | --- | --- |
| PM1-F1 | Broad protein/dose/age statement -> dietary delivery with context-dependent kinetics; pooled age comparison not universal impairment | 2 / 1 / 1 / 1 | 5 / 5 | Provisionally assessed |
| PM1-F2 | Adequacy/complete-meal wording -> retain diet-wide adequacy, qualify acute source equivalence and quantitative uncertainty | Unresolved complete factor appraisal | Not calculated | Not scored |
| PM1-F3 | Scored-Finding candidate for basic conversion -> curated PAH/Rhea provenance; retain ID, source and physiological context | Not required for reaction identity | Not calculated | Not scored |
| PM1-F4 | Precursor identity -> retain as unscored biochemical/ownership context, not a clinical efficacy synthesis | Not required for elementary identity | Not calculated | Not scored |
| PM1-F5 | New exact older-men mincing proposition, including total-concentration and muscle nulls | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed |
| PM1-F6 | New exact extruded-blend kinetic proposition, including integrated null | 2 / 1 / 1 / 0 | 4 / 4 | Provisionally assessed |

All numerical factors are defensible **anchor judgements**, not measured quantities. Bias Protection 1 reflects appraised residual design concerns, not automatic downgrading for unavailable papers. Precision 1 preserves uncertain magnitude/boundary; nulls are not equivalence. Replication 0 in F5/F6 refers to one examined exact-protocol empirical line after bounded recovery, not an assertion about the entire literature. **Independent replication was not established in this assessment.** No D1/B0/P0 cap applies to these scoped propositions; R0 has no extra decrement. No conditional score is promoted by arithmetic, and no qualified human review is recorded.

The original F1-F4 records remain in baseline history; no ID is deleted. No score is transferred to a dietary lever, SOP category, phenome or entire PM. SEC confidence, assessment maturity, evidence-review status and correction status remain independent.

## Approval and compatibility

Requires scientific approval: proposed wording and F5/F6 additions; whether to select the exact texture-adaptation SOP; whether dietary tyrosine's relationship should be explicitly admitted and where its single primary explanation belongs. No admissions changed now.

Requires technical approval before canonical rollout: the current SEC record validator intentionally allowlists only the three approved reference PMs. PM1 sidecars remain local version-1 audit records with the same factor/status contract; the global registry and confidence field are untouched. Immutable SOP and food-strategy IDs must be assigned through existing registries after approval, not invented during preview.

Governance issue found but untouched: `system/templates/primary-mechanism-template.mdx` still includes an old foods-only-for-Yes instruction and older section-based dietary admission language. The updated governing contracts control this assessment; no shared template or instruction was silently repaired.

Not rollout blockers by themselves: every historical paper not fully retrieved; unscored basic chemistry; unscored adequacy context; no three-slot intervention quota. Approval and identity-registration decisions are real blockers to canonical adoption.

## Review artefacts

- `proposed-pm1.mdx`: complete canonical-shaped draft, not the production PM.
- `baseline.mdx` and `baseline-manifest.json`: byte-identical source and preservation decisions.
- `evidence.mjs`: source-level appraisals and all-category intervention dispositions.
- `draft-data.json`: projected proposed page metadata; original dietary/KC records intact.
- `assessments-v1.json`: individual versioned SEC records and source/retrieval history.
- `/docs/system/sec-calibration/pm1-reassessment`: isolated full-page preview using existing disclosures/indicator/legend and correction infrastructure.

## Verification results

- Focused combined run: `node --test scripts/pm1-reassessment.test.mjs scripts/sec-assessment-integration.test.mjs scripts/dietary-lever-traceability.test.mjs` passed 62/62. The PM1-specific 13 tests were rerun after final presentation/citation projection changes.
- Existing Scientific Finding, six-atom/SOP and dominance validators pass on the proposed data, without editing validators. The canonical SEC validator correctly continues to reject PM1 as outside the approved three-PM production scope; the local assessment-status and arithmetic checks pass.
- Complete canonical-shaped draft and isolated preview compile as MDX. Focused React static-render tests verify matching Finding/audit propositions, scores, direct assessment links, standard collapsed disclosure markup and honest missing-review/correction fallbacks. They do not replace interactive browser verification.
- Docusaurus development compilation succeeded in 1.31 minutes using the checkout-local `.cache/sec-v1-webpack`. Port 3005 serves this checkout; its generated route contains the preview and HTTP responds 200. A 200 response alone is not treated as rendered-page proof.
- After compilation, Watchpack reported `EMFILE: too many open files`. Browser navigation and subsequent accessibility inspection timed out. No limits, permissions, caches or unrelated servers were changed. Hot-reload freshness and interactive dietary/audit navigation remain unverified; the local draft and focused compiled/static-render checks are the reliable review artefacts.
- `git diff --check` passes. Canonical PM1, the three reference PMs, global scientific contracts, bibliography, SEC registry and existing food mappings are unchanged by this execution.

New PM1-specific files only (in addition to copied, preserved integration work):

- `review/pm1-reassessment/baseline.mdx`
- `review/pm1-reassessment/baseline-manifest.json`
- `review/pm1-reassessment/evidence.mjs`
- `review/pm1-reassessment/draft-data.json`
- `review/pm1-reassessment/proposed-pm1.mdx`
- `review/pm1-reassessment/assessments-v1.json`
- `review/pm1-reassessment/report.md`
- `scripts/prepare-pm1-reassessment.mjs`
- `scripts/pm1-reassessment.test.mjs`
- `src/components/SecCalibrationPreview/PM1Preview.tsx`
- `docs/system/sec-calibration/pm1-reassessment.mdx`

No commit, push, PR, merge or deployment. Scientific approval and interactive browser verification remain separate gates.
