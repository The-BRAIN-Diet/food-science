# BRS5-FM2-PM5 bounded reconciliation and controlled retest

**Verdict: PASS WITH LIMITATIONS.** The approved corrections support dietary abstraction without transferring an extracted-starch intervention effect to ordinary foods. FOS/GOS remains explicitly held for scientific review; it is not an admitted manuscript lever.

Branch: `codex/brs5-scfa-controlled-test`. Base and HEAD: `96b08913b917fffb8c96862ac4aab50a46a8d4fe`. Changes remain uncommitted in the isolated test checkout. No merge, push, ontology repair or rapid catch-up was performed. The approved integration checkout remains clean at the same baseline; no original checkout was edited.

## Implemented scientific corrections

- **PM5-DIT-1:** renamed to **Resistant starch**, resolved to existing `resistant-starch`, with Type A Capacity and Direct retained relative to microbial substrate utilisation. The role now describes conditional fermentation capacity. Preparation, starch structure, degraders and cross-feeding limitations are explicit. Baxter's extracted potato RS2 result remains formulation-specific in its original source assessment. Existing Ze evidence and bounded Fässler corroboration support class-level interpretation independently of Baxter; Fässler's retrieval is explicitly limited to its abstract.
- **van Trijp:** all duplicated source-level design/result/limitation/retrieval fields now distinguish distal ileal observations, limited colonic sampling, measured concentrations, indirect/modelled production and separately infused product tracers. Human Study classification remains. Neither a colonic null nor directly traced FOS/GOS-to-SCFA conversion is asserted.
- **Pascale:** explicitly secondary systematic-review synthesis. Cellular/Molecular remains an underlying data-level designation, not a claim of primary publication status. **Bang** is added as bounded primary evidence, preserving purified citrus pectin, three donor communities and enriched medium including rumen fluid. Whole apples are not equated with this experiment.
- **Identity history:** PM5-IDENTITY-1 and -3 are resolved against existing resistant-starch and pectin identities. Prior atom records are retained exactly in reconciliation history. No duplicate substances were created.
- Scientific Finding source records and generated presentation are synchronised. New references have bibliography records and numbered page anchors. PM5's §3.1.1 now uses the already-approved heading, **Dietary Inputs & Regulatory Modulators**.

## FOS/GOS assessment

The studied mixture cannot be treated as separate FOS and GOS effects. The attached exploratory observations and inferred production measures do not sufficiently establish the existing mixture-specific Capacity admission at its previous claim ceiling, particularly a butyrate-specific interpretation.

PM5-DIT-2 and its original provenance remain. The versioned assessment is `status: unresolved`, `review_required: true`, with a precise review reason. Type A/Direct records the relationship under review, not an approved readmission. Historical `Dietary input: Yes` remains traceable and is explicitly explained as historical applicability. The qualified mixture label's exact identity binding remains unresolved despite an existing combined registry record. No splitting, generic substitution or replacement admission was performed.

The record remains visibly marked **scientific admission requires review**. It produces no admitted food-target or manuscript row. Requiring review is a documented disposition, not a successful scientific gate.

## Before/after classification

| Input | Before | After |
|---|---|---|
| Resistant potato starch | Historical Type A/Direct; prospective class identity mismatch; stale missing-substance flag | Resistant starch; Type A/Direct admitted against class evidence; existing identity resolved |
| Studied FOS/GOS mixture | Historical Type A/Direct admission; overbroad source interpretation | Historical record retained; Type A/Direct claim requiring review; excluded from admitted export |
| Pectin | Historical Type A/Direct; review source misrepresented as primary; stale identity flag | Type A/Direct admitted; existing identity resolved; primary/secondary evidence separated |
| Inulin | Research candidate | Remains unadmitted; no automatic food or manuscript admission |
| Acetate, propionate, butyrate | Downstream biochemical/product records | Unchanged; not promoted to oral dietary requirements |

## Food-target and repair output

| Dietary input | Food target | Mapping | Qualifications |
|---|---|---|---|
| Resistant starch | Bananas | Verified | Green/unripe; cultivar and ripening state matter |
| Resistant starch | Black beans | Verified | Cooking duration and cooling protocol remain source-specific |
| Resistant starch | Chickpeas | Verified | Cooking duration and cooling protocol remain source-specific |
| Resistant starch | Potatoes | Verified | Baked/boiled then chilled; distinguish reheated material and tested cultivars |
| Pectin | Apples, studied cultivars | Research-supported provisional | Analytical pectic fractions; qualitative supply only; no quantity inferred from total fibre or equivalence to purified citrus pectin |

These are delivery sources, not demonstrations that consuming the food increases butyrate or improves brain/ADHD outcomes. No quantities or intake targets were invented. Direct classification here refers to the supplied substrate at the microbial operation; these foods are not labelled as directly containing the downstream SCFAs.

The apple composition entry is retained in the research ledger, explicitly scoped to PM5. Mapping and repair generation respect that scope, leaving other PM roll-up records unchanged. It is not a canonical food edge.

Canonical-pipeline PM5 output changed from **4 verified / 0 provisional / 2 unresolved rows** to **4 verified / 1 provisional / 0 unresolved admitted rows**. The FOS/GOS unresolved scientific record remains outside that admitted-row count. The previous controlled diagnostic already included scoped apple research; its separate extra formulation-reconciliation task is superseded by the approved class decision.

PM5's current Cursor queue contains **one food-edge task: apples → pectin**, with material, preparation, composition DOI, canonical IDs and independent-verification instructions. There are no stale resistant-starch food-edge requests. Global queue: **24 → 25**, reflecting the newly exposed apple task. Global roll-up: **822 → 821 rows**, because FOS/GOS is withheld while pectin gains its provisional source. Counts do not measure evidence strength.

`manuscript-rollup.json` and `cursor-repair-queue.json` in this deliverable are PM5-scoped. The corresponding full repository exports and six shards were also regenerated; shards reconstruct the combined export exactly. Other PM roll-up records are unchanged.

## Narrow governance and infrastructure changes

The Stage 2B contract now explicitly separates biological class identity, experimental formulation and food delivery. It does not require a food-specific efficacy trial for a class-level capacity relationship, and it prohibits transferring formulation-specific effects to a class. Direct/Derived remains relative to the receiving operation.

Stage 2A now explicitly separates publication role from experimental data level and measured endpoints from anatomical, tracer and model-based inference.

The validator accepts a documented unresolved review disposition without admitting it. Undocumented unresolved entries still fail; the admission engine remains unresolved, and the manuscript exporter excludes them. The food-target renderer exposes the review reason above the six atoms. The existing ledger regression now checks closure specifically for walnut/resistant-starch tasks and requires the new provisional apple task, instead of assuming the entire ledger must remain empty. Provisional research scope is respected in projection and repair attribution. No scoring anchor, six-atom definition, Type A/B definition or canonical food edge changed.

## Validation

- Controlled retest: **16/16 checks pass**, verdict PASS WITH LIMITATIONS.
- New focused regression suite: **13/13 pass**, including class-capacity admission, negative formulation binding, food composition/effect boundaries, anatomy/tracer distinctions, publication role, FOS/GOS review exclusion, scoped apple mapping, provenance preservation, six-atom warning placement and actual PM MDX/Finding compilation.
- Existing related suites: **193/195 pass**. Two Scientific Findings section-title expectations fail identically on the untouched baseline: they expect “Mechanistic Basis” where approved source says “Mechanistic Basis + Scientific Findings.” These tests were not rewritten in this bounded task.
- Governance: **64 PMs checked, zero issues**. Generated Findings: **58 PMs checked, zero issues**. PM5 mechanism-page validation passes.
- Canonical substance validation and food–substance inverse safeguards pass. SEC registry/immutable history check passes against the explicit baseline, retaining **69 existing snapshots**.
- Bibliography-format tests: **2/2 pass**. All PM5 evidence keys resolve uniquely, including new Bang/Fässler and reused Ze. Repository-wide citation validation still reports four pre-existing unrelated missing keys: `baker_pea_adhd_1991`, `bergwerff_aaa_adhd_2016`, `kusaga_pea_methylphenidate_2002`, `scassellati_biomarkers_adhd_2012`; the untouched baseline reports the same four.
- Browser: exercised the real compiled food-disclosure client against the regenerated BRS5 snapshot in a standalone integration preview. Verified RS sources have no pending-link icons; provisional apples have the small red icon and precise warning immediately above the six atoms. Preparation and composition provenance remain visible. The real PM MDX and ScientificFinding component also compile/render successfully. This is not a full Docusaurus production deployment.
- Git/exports: no other canonical PM, food, substance, registry or score file changed; mission, downstream Finding and phenome relationships preserved. `git diff --check` passes. Other PM roll-up records remain byte-for-byte equal as parsed JSON; all six shards reconstruct the consolidated records.

An overlapping validation attempt terminated with exit 7 without diagnostics; completed serial reruns supplied the results above. A full production build was not run; targeted PM compilation and real client-render verification were used. The existing unrelated bibliography and section-expectation failures remain limitations, not new PM5 regressions.

## Remaining work

FOS/GOS needs a separate bounded evidence/identity decision before readmission. Apples → pectin needs independent Cursor verification and canonical edge repair. Inulin remains a candidate. Community-dependent fermentation, food formulation and incomplete food-to-human-production translation remain explicit limitations. No new brain-effect or SEC/CC conclusion has been introduced.

The complete changed-file manifest, SHA-256 fingerprints, integrity results, classification matrix, PM5 roll-up, queue, rendered examples, browser screenshot and validation logs accompany this report.
