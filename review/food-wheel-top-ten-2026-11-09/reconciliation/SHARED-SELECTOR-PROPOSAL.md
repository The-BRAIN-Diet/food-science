# Shared ranked-food selector — proposal only

9 November 2026. No implementation, contract amendment, new approval or canonical record import is made by this document.

## One source snapshot

1. Adjudicate the exact 41 food-file differences in `RECONCILIATION.md` / `records.json`, retaining source-specific observations and existing pending holds. Approval of local backfill is not automatically approval of exact canonical-file publication.
2. Generate from a single approved canonical checkout: `docs/foods` structured records, `registry/substances.json`, PM dietary input/admission/traceability records and existing food identity/composition parsers. Retain source-record IDs, source hashes, original quantities, analytical form, food preparation, provenance and limitations.
3. Do not use the frozen wheel JSON as scientific authority for PM pages. It is a historical reproduction artifact. Neither consumer may substitute research proposals, independent quantities or stale generated data for the approved snapshot.
4. The same run writes a source manifest, target-level ranked selections, diagnostic/unranked selections, PM mapping outputs and the wheel projection. Consumer outputs include the same snapshot ID and selector version. A hash mismatch fails validation; modification time must not choose scientific authority.

## Shared decision and selection sequence

- Start with the **existing** PM–substance relationship and admission identity. Keep direct/derived and contextual/candidate states distinct. Do not admit a target because a quantity exists.
- Resolve target-specific material/form constraints before food ranking. Ordinary preparation differences do not prevent comparable composition rankings, but a defined intervention formulation is not automatically equivalent to a generic food constituent. The glucose/citrus-pectin disagreement identified by the audit must be resolved before this stage is activated for those targets.
- Use canonical observations for that substance, preserving existing scientific holds, public visibility restrictions, analytical comparability and source qualification.
- Compare compatible chemical forms, units and denominators. Ordinary raw/cooked/salted edible foods can compete. Preserve preparation/species as metadata. Do not mix dry and edible weight, incompatible analytical forms, unsupported volume-to-mass conversions, or incomparable ranges. Reuse existing permitted conversions; do not add new scientific assumptions.
- Require at least two distinct comparable food identities. Retain single-source observations separately, without invented power or a forced ranked listing.
- Call the existing `relativeSourcePower` calculation: **concentration / highest verified comparable concentration × 100**. Keep the **provisional ≥10% threshold**. No serving adjustment, additional bands, nutritional-benefit score or new threshold.
- Reuse deterministic food/observation deduplication and tie-breaking. Select at most **ten distinct qualifying foods for the target before plant/animal grouping**. Do not independently award ten plants and ten animals. Never pad.
- Keep within-pool rank and comparison basis explicit. All currently represented ranked substances have one qualifying pool. If a future target has multiple genuinely incompatible pools, do not manufacture an across-pool concentration ranking; flag that policy case rather than silently alter existing comparisons or treat separate 100% maxima as equivalent quantities.
- Preserve input ordering independence and explicit identifiers. Multiple PM relationships referencing the same target must not duplicate a food–substance–PM connection.

Suggested shared module location: `src/data/rankedFoodSources.mjs`, usable by Node generation and PM rendering without filesystem dependencies. The wheel's existing selector can become a thin compatibility wrapper. Retain `src/data/relatedSubstanceRelationships.mjs::relativeSourcePower` as the single arithmetic implementation. Exact module placement is an implementation detail, not a new scientific rule.

## Outputs and consumers

Each target result should contain its PM/substance/admission IDs, snapshot ID, selector version, policy, comparison-pool definitions, selected observation/source IDs, ranks, powers, original quantities, qualifications, and structured exclusion reasons. Store generated selections once; both views consume those records.

**PM dropdowns:** partition the already selected ranked foods into existing Plant-based and Animal-based displays without reranking or increasing the cap. Reuse existing typography, links and disclosures. Preserve original source qualifications on the exact observation. Do not manually edit PM prose or frontmatter to maintain lists.

**Unranked PM evidence:** retain separately labelled documented sources where scientifically relevant: presence-only, single-source, incomparable analytical measurements, estimates, and protocol/form-specific observations. Clearly distinguish these from ranked qualifying foods. Preserve rejected/internal-only exclusions. Unranked evidence does not enter the wheel's ranked food ring or count. Existing related/precursor displays remain indirect, not direct-food content. Reuse existing disclosure structures; any genuinely new public block/label arrangement requires the presentation-contract proposal and explicit approval before rollout.

**Food Wheel:** consume exactly the ranked output for eligible PM–substance targets. Preserve biological/contextual substance–system edges and their qualifications separately. No PM-specific hand-coded food exceptions. Maintain the existing visual design; deep-linking, focus-width trials and new PM integration panels stay outside this scope.

**Review index:** the independent `selectQuantified` helper must not silently masquerade as the shared ranked list. Either consume the common ranked result when presenting a ranking, or retain it explicitly as a non-ranked source inventory. Do not erase source evidence simply to make displays match.

## Proposed implementation scope after review

- Approved source-record changes only, separated clearly from selector changes; no unrelated scientific checkout changes.
- Shared selector + canonical target/source adapter; both consumers and relevant generators.
- Regenerate affected input mapping assets and wheel assets in one deterministic pass; no manual PM-file changes.
- Update the authoritative food mapping/presentation instructions (`system/input-substance-food-mapping.md`, relevant Stage 2B food-list instruction, `system/food-wheel-presentation-contract.md`) and record the exact approved scope. Do not infer approval from this proposal or regenerate presentation baselines.
- Separate code/data statuses in the handoff. No changes to missions, Findings, Principles, SEC, admissions, KCs, evidence classifications or source values solely to increase coverage.

## Required checks before a combined preview

1. Every canonical source value, form, unit, preparation and provenance survives extraction; source hashes match for both outputs.
2. For each ranked PM–substance target, the union of PM plant/animal ranked sources equals the wheel set by food ID **and selected observation ID**, rank, power, quantity and evidence qualification.
3. Generated relationships resolve to the same admitted PM IDs; candidate/contextual sources never become admissions.
4. Tests for 10% inclusion boundary, below-threshold exclusion, top-ten cap, no padding, minimum-two-food rule, identical duplicate rows, conflicting observations, deterministic ties and input-order independence.
5. Compatible raw/cooked/salted measurements remain comparable; incompatible forms, bases and ranges remain excluded. Salmon roe DHA 2,000/EPA 1,600 mg per 100 g remain unchanged; trout roe presence remains unranked.
6. Distinct tests for unranked source retention, multiple preparations, provenance disclosures, estimates and PM-specific formulation restrictions. Resolve pectin/glucose policy conflicts explicitly, without editing admissions to satisfy tests.
7. Canonical scientific hashes/immutable SEC unchanged except individually authorised composition-file additions. Bibliography/source-anchor and presentation checks pass. Existing legacy failures are reported separately.
8. Production build with generated mapping assets, supported 4 GiB Node heap, separate output preserving localhost; desktop/mobile PM and wheel checks, especially all-relations readability.
9. Draft PR/Netlify preview only after source and presentation decisions are reviewed. No merge or production deployment.

The previous 78-food/985-edge/119-target top-ten result is a reproducible experiment on the preserved wheel snapshot, **not a promise of final reconciled counts**. Target-specific eligibility and any approved source-identity resolution may legitimately change those totals; report changes rather than force counts.

## Discovered integration dependencies

Include only the exact missing `bailoni_pectins_2005` and `furusho_carnitine_food_2026` bibliography entries if their source records are approved; do not copy the concurrently edited whole bibliography. The 41-food audit verifies 189 local source anchors. Preserve existing main food/reference text, append approved source-specific records, and maintain review holds rather than treating all local files as an undifferentiated merge.
