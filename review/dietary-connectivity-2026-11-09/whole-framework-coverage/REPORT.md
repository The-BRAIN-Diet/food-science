# Whole-framework dietary connectivity coverage

Read-only audit, 9 November 2026. Branch `audit/dietary-connectivity-2026-11-09`, HEAD `af13bec172b5938098a46f85c06523b8a20e90dc`, including existing locally approved uncommitted work. Ranked snapshot `5ca08ea52696e966bbf61463278c614582f49a36a218a86092ef9f692c75aedc`. This is not a report of deployed coverage.

## Executive result

| Layer | Food–substance–PM triples | Distinct substances /68 | Dietary-input targets /151 | Foods | PMs |
|---|---:|---:|---:|---:|---:|
| Ranked quantitative, before restored disclosures |960|28|112|70|38|
| Documented unranked, restored disclosures alone |200|26|72|33|35|
| Either food layer, deduplicated |1160|40|128|88|40|
| Either food layer plus completed food-supported Derived routes |Not additive to food triples|44|128|88|See endpoint inventory|

Restoring 200 documented connections adds **12 substances, 16 dietary-input targets and 18 foods** beyond the ranked view. The two food layers overlap on 14 substances, 56 targets and 15 foods; no food–substance–PM triple is counted twice.

Completed Derived routes add **FAD, SAMe, CoQ10 and NAD+** beyond the 40 food-covered substances. There are 19 distinct completed source-to-endpoint routes, of which 18 have publicly eligible food-connected admitted precursors. These reach 17 distinct endpoint PM–substance pairs: two already belong to the 151 input-target set and are already food-covered; **15 are outside that set**. Therefore no numerator is inflated to 143/151. The separate endpoint inventory is in derived-routes.json and summary.json.

**23/151 dietary-input targets remain uncovered. 24/68 network substances remain outside the three counted admitted-route layers.** These are not 24 missing-food claims: acetic acid and phytate already have contextual SOP food provenance; some others are biochemical inventory, defined supplemental protocols, or unresolved conversions. Caprylic triglyceride→acetoacetate is a completed protocol route, not an eligible ordinary-food route.

## Definition and scientific boundary

A target is one canonical PM ID plus one canonical substance ID in the current ranked-input snapshot. A connection is one distinct food–substance–PM triple. A Derived endpoint is counted only for its receiving PM with an existing completed admitted pathway and eligible food-connected admitted upstream input. Duplicate equivalent paths are collapsed. A source’s amount is never converted into a downstream product amount. Coverage means traceability, not adequate dose, synthesis efficiency or biological/clinical benefit.

The NR→NAD+ route retains a particularly important qualification: qualitative milk occurrence does not reproduce the 100–1000 mg supplemental NR chloride exposure. Blood response does not establish neuronal or mitochondrial delivery. Similarly, CoQ10’s upstream synthesis route does not establish food-induced mitochondrial pool expansion.

## Remaining actionable gaps, in efficient execution order

1. **Review two narrow visibility/mapping defects:** normalize the existing apple-pectin status and structured bibliography link, and inspect the exclusion of preparation-dependent sulforaphane occurrences. Preserve citrus-pectin and precursor-versus-product restrictions. No correction made by this audit.
2. **Agree the measured-but-unrankable presentation treatment.** Existing 5-MTHF, ellagic-acid, inulin and resistant-starch measurements are excluded by both ranking and the qualitative helper. They are not “quantity not established.” Across eight uncovered target pairs, seven lack an explicit protocol hold; BRS6 resistant starch retains one. Any display must preserve measured ranges, incompatible denominators and sample/preparation limitations without inventing ranks or a new admission.
3. **Continue the existing conversion adjudication queue**, particularly source identities for dietary protein→methionine and generic fermentable fibre→butyrate, plus the pending folate, ellagitannin, NAC and vitamin-A routes. Do not count proposed assessments as completed. This audit does not resolve the remaining classification queue by assumption.
4. **Review form-specific canonical source gaps** for carnitine, nicotinamide, nicotinic acid and serine using saved evidence. Total niacin and generic amino-acid claims cannot fill form-specific gaps automatically.
5. **Retain legitimate exclusions:** glucose stimulus targeting, defined oligofructose/FOS–GOS/NAC/MCT protocols, inventory SCFAs and contextual SOP targets. No extra food admissions or scores are needed to make a percentage larger.

These are execution priorities, not a ranking of scientific importance. Full per-substance PM scope and reasons are in REMAINING-GAPS.md; all 23 uncovered targets are identified in TARGET-MATRIX.md/targets.json.

## Presentation-contract validation

- All 960 ranked selections satisfy the existing maximum ten and provisional ≥10% RSP boundaries. The selector and canonical quantities were not changed.
- All 200 unranked triples retain evidence-qualified presence without rank, RSP or invented quantity. Fresh in-memory mapping and existing generated mapping return identical unranked selections.
- Checked 244 returned evidence records against their original canonical fields: all resolve; none is itself internal-only, excluded, substance-only, held, pending or unsupported. An independently supported public occurrence may remain when a separate quantitative observation is held; the held observation is not rendered or ranked through that occurrence.
- **Known limitation:** measured-but-unrankable records are currently omitted, rather than incorrectly relabelled qualitative. The two-layer contract is therefore not a complete visibility solution for every documented quantitative record. Pectin and preparation-dependent sulforaphane also warrant the targeted review above.
- Direct/Derived values and unclassified/resource-supply/inventory rows are preserved in the audit. No classification was inferred from the existence of a food.
- Path index reports no structural errors. 16 focused documented-source and Review01 regression tests passed; no failures in these checks.
- No build, browser deployment, PR update, source implementation, new appraisal, admission change, SEC change, commit or push was performed. No claim is made that unrelated repository-wide tests pass.

## Evidence and reproducibility

Read inputs: rankedFoodSources.generated.json; seven BRS input mapping snapshots; canonical PM records through the existing dietary-pathway index; canonical food source records; existing 68-substance connectivity audit. No new literature retrieval. The fixed 68/151 denominators intentionally preserve the existing network and dietary-input universe.

- [All 68 substances](SUBSTANCE-MATRIX.md), with full source records in [substances.json](substances.json).
- [All 151 targets](TARGET-MATRIX.md), with exclusions and holds in [targets.json](targets.json).
- [Remaining reasons and scope](REMAINING-GAPS.md).
- [Exact counts and endpoint identities](summary.json).
- [Completed Derived routes and limitations](derived-routes.json).
- [200 documented connection records](documented-connections.json).
- [Validation](validation.json).

Only reports in this directory were produced for the current task. Existing uncommitted implementation remains untouched.
