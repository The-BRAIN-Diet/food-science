# BRS4 L-carnitine admission and candidate assessments

**PASS WITH LIMITATIONS.** L-carnitine is admitted to BRS4-FM3-PM6 as **Type A Capacity / Direct**. The new canonical identity `l-carnitine` resolves the L/(R) stereoisomer (PubChem 10917; InChIKey PHIQHXFUZVPYII-ZCFIWIBFSA-N), with aliases including Carnitine and levocarnitine. No competing existing identity was found. D-carnitine, acetyl-L-carnitine and L-carnitine-L-tartrate remain distinct.

Versioned UniProt P50416 (entry 222) / P23786 (entry 230), Rhea 12661 and primary human-CPT1A functional evidence support the shuttle dependency. Independent food analysis supports supply of that same substrate. This establishes neither dietary indispensability nor a benefit from increased intake. Existing carnitine/carbohydrate intervention evidence remains formulation-specific.

A new unscored Finding and six-atom dietary record were added. The existing biochemical participant's missing identity and stale administrative wording were explicitly reconciled, with its original record retained in the immutable snapshot. Its reaction-participant status remains separate from the new supply admission. Original missions, Findings, source assessments, Phenome/KC records and scores are preserved.

**Food output:** beef and lamb are research-supported provisional sources with precise pending-edge warnings. No canonical food edges, quantities, cut/preparation assumptions or kefir associations were created. The refreshed historical catalogue has **847 rows: 794 verified, 29 provisional, 24 unresolved**. This is not a newly clinically validated diet. The pipeline repair queue has **51 items**; the complete report queue has **53**, adding the two remaining ketone-identity tasks. The previous missing-carnitine identity task is resolved; the two new food edges remain independently reviewable.

## Candidate decisions — not admitted

- **Fatty-acid meal comparison, PM8:** relevant positive randomized acute evidence (14 men, equal-energy meals) for oleate/ALA versus palmitate on time-based RQ dynamics. Hold reproducible SOP implementation because exact recipes/materials were not retrieved (publisher full text returned 403). No generic healthy-fat or whole-food effect is inferred.
- **Nicotinic acid, PM9:** human high-dose niacin study reports muscle biogenesis in a small open-label myopathy/control study. Hold general admission: exposure, population, complete Derived pathway and food translation remain bounded and unresolved. Nicotinic acid is not total B3, nicotinamide or protein.
- **Nicotinamide riboside, PM9:** five-month twin study reports mitochondrial structural changes, but relevant imaging was in the open-label treated cohort, not a powered placebo comparison. A 12-week placebo-controlled trial found no mitochondrial content/morphology/respiration effect; a shorter older-men trial found biochemical exposure without improved bioenergetics. Preserve all results. Local NR identity, conversion tracing and a precise population/formulation claim need review. No admission or food mapping was forced.

PM8 and PM9 canonical pages are byte-identical to the starting snapshot. Candidate source details and decisions are in `candidate-assessments.json`.

## Validation and integration limits

- **211/211** focused admission, preservation, governance, extraction, rendering and PM5 tests pass.
- Updated PM6 and the new substance page compile with the actual Docusaurus MDX processor; the new substance page also passes the explicit canonical-page contract.
- Scientific Findings: **62 pages, zero problems**. SEC: **69 valid snapshots**.
- All four previously blocked BRS4 pages have no mechanism-validation issues.
- Unrelated repository-wide mechanism issues and four pre-existing missing bibliography keys remain; no new citation key is missing.
- No full production build attempted. The previously reported Scientific Findings title/order test failures remain outside this change.
- Original checkout's **2,589 fingerprints and working-tree status unchanged**. No food ontology, mission, governance gate or score changes.

## Commit packaging

The working branch includes the earlier reviewed rapid/preservation/deferred enrichment, four-page BRS4 presentation repair, the L-carnitine follow-up, and the earlier approved phenylalanine component build fix. Large immutable review JSON/text fixtures are committed losslessly as gzip archives; raw originals remain local, with exact-path ignore entries. Test readers support those archives so the audit is portable. The already oversized canonical bibliography remains in its existing format; no hooks or checks are disabled.

No merge into main or further PM assessment is authorised by this report. Push status is recorded separately after completion.
