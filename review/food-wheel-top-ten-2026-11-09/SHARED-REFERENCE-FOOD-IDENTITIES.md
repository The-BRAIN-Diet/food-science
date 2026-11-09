# Distinct food identities and shared reference observations

Author clarification: 9 November 2026. Local reconciliation only; no publication approval inferred.

## Decision

Retain `extra-virgin-olive-oil`, `early-harvest-olive-oil`, `cocoa`, and `cacao-powder` as separate canonical food identities. None of their pages, quantities, references or limitations was changed by this inspection. This differs from the explicitly approved FDC 172423 lupin identity consolidation.

A shared reference panel is not an independent measurement of each preparation. The local candidate selector currently holds the reused panel observations pending attribution to an appropriate representative; it does not delete the panel or merge the food identities. This conservative hold is not a scientific finding that either food lacks those nutrients. Choosing the representative remains unresolved. Independently eligible supplementary observations are not held merely because a food reuses a reference panel.

## Evidence in the existing records

| Food pair | Shared panel | Distinct preparation rationale | Independent numerical ranking assessment |
|---|---|---|---|
| EVOO / early-harvest olive oil | FDC 171413, Oil, olive, salad or cooking; per 100 g edible portion | Harvest maturity is a documented preparation attribute; existing pages retain cultivar, harvest and storage qualifications | Early-harvest hydroxytyrosol, tyrosol, oleocanthal and oleacein are presence-only. Intact oleuropein remains unresolved/internal. CoQ10 has no early-harvest-specific quantity. None supplies a verified separate numerical rank in this snapshot. |
| Cocoa / cacao powder | FDC 169593, Cocoa, dry powder, unsweetened; per 100 g edible portion | Existing pages distinguish minimally processed cacao from processed cocoa and cite processing-related flavanol evidence | Epicatechin, catechin and procyanidin estimates retain `quantity_citation_pending`; they are not promoted to verified ranks. Names alone do not establish the exact processing of a measured sample. |

Existing EVOO phenolic estimates and derivative/form qualifications remain untouched. Total-phenolics values are not substituted for individual phenolics. The separate scientific worktree retains the olive-oil CoQ10 reconciliation (Žmitek 2014): 56 ± 4 mg/L for seven commercial blends and 52 ± 17 mg/L for 79 monocultivar samples. These are sample-group observations, not early-harvest concentrations or per-100-g values. They were not overwritten, imported into this publication snapshot, or converted using an assumed density.

Primary-source reappraisal was not repeated. This is an audit of current canonical records and saved source qualifications, not a claim of new full-text verification.

## Affected rankings

Diagnostic comparison: allowing both reused panels versus the current local conservative hold. This is not a live-site before/after claim.

- Vitamin E: BRS3-FM2-PM5, BRS3-FM2-PM6 and BRS4-FM2-PM5. The shared olive-oil panel would occupy ranks 2 and 3 under two food labels. Those two positions do not represent independent observations.
- Linoleic acid: BRS5-FM3-PM7. Early-harvest olive oil would occupy rank 10 using the shared panel. With that attribution held, cashews enter at rank 10.
- Cocoa/cacao: no current top-ten positions affected by holding the duplicated generic panel; this does not establish absence of composition evidence.

Exact target lists, selected observation paths and replacement ranks are in `shared-reference-ranking-impact.json`.

## Validation and outstanding decision

The focused ten-test suite passes, including distinct-identity retention, shared-panel exclusion, canonical-source hashes, PM/Wheel consistency, lupin consolidation, chemical-form/basis exclusions and source-power rules. All four food files remain unchanged against the branch baseline.

Before publication, reconcile a single representative for a generic panel where its food definition supports one, or retain the observation-level hold. Do not choose a preparation arbitrarily, count copied panels as independent comparison foods, or invent preparation-specific concentrations. Full build and browser release validation remain outstanding for the broader shared-selector PR.

## Attribution reconciliation — 9 November 2026 (supersedes unresolved attribution above)

Local branch `experiment/food-wheel-top-ten-2026-11-09`, base `2efc9c82b42128d81e1039d7244651b591c3e11d`; uncommitted implementation, not published.

### FDC 171413: hold retained

`system/food-nutrition-schema.md`, “Exact-food source matching”, requires “the same food” on food/product, species, edible material, preparation and formulation axes and states “A related food is never a source.” `system/input-substance-food-mapping.md` likewise specifies exact-food observations. No qualified-proxy exception was found for generic olive oil → extra-virgin olive oil. The source does not verify extra-virgin or early-harvest preparation. Neither copy enters ranking. This does not alter the existing canonical panel or declare its numerical values false.

Required author decision before changing this hold: explicitly approve a narrowly scoped exception permitting the existing FDC 171413 standard nutrient panel to represent `extra-virgin-olive-oil` as a **generic-olive-oil proxy**, with that qualification retained wherever the selected observation travels. It must be counted once, must not represent early-harvest measurements, and must not extend to phenolics, CoQ10, other foods or intervention efficacy. The authoritative exact-food contract would need that scoped exception recorded before implementation. Current instruction explicitly requires holding when the existing contract does not permit a proxy; no exception is inferred.

### FDC 169593: cocoa attribution implemented

The source explicitly names unsweetened dry cocoa powder, fitting the powder form within the existing `cocoa` identity. Attribute its standard panel once to `cocoa`. Retain the qualification that it does not identify a specifically Dutch-processed product and does not establish minimally processed cacao composition. The copied `cacao-powder` standard panel remains excluded from independent rankings. No canonical values, page identities or supplementary observations were edited.

A technical extraction omission was also corrected: the mapper now recognises the explicit source preparation **dry powder**. The denominator is the source's **per 100 g edible portion**, not a laboratory dry-weight conversion. This permits the existing verified cocoa observations to enter the existing comparison rules; no threshold or scientific eligibility rule was relaxed.

### Recalculated ranking impact

| Measure | Before attribution reconciliation | After |
|---|---:|---:|
| Selected foods | 63 | 64 |
| Food–substance–PM connections | 794 | 800 |
| Covered targets | 98/151 | 98/151 |

Cocoa enters 24 targets: 5 zinc, 6 iron, 6 magnesium, 3 copper, 2 potassium and 2 manganese. Its selected per-100-g quantities/ranks/powers are:

| Substance | Quantity | Rank | Relative Source Power |
|---|---:|---:|---:|
| Zinc | 6.81 mg | 4 | 17.33% |
| Iron | 13.86 mg | 7 | 11.21% |
| Magnesium | 499 mg | 2 | 84.29% |
| Copper | 3.788 mg | 4 | 38.83% |
| Potassium | 1524 mg | 2 | 84.81% |
| Manganese | 3.837 mg | 4 | 48.77% |

Eighteen selected connections are displaced at the ten-food cap: chia seeds (5), lupins (8), pistachios (3), chickpeas (2). All four foods remain represented elsewhere. Vitamin E and linoleic-acid selections are unchanged; the oil proxy remains held. Phenolics, CoQ10, admissions and supplementary evidence remain unchanged. Exact target-level before/after selections are in `shared-reference-attribution-impact.json`.

### Implementation and validation

- Data-driven attribution decisions: `system/ranked-food-source-policy.json`.
- Shared observation handling: `scripts/lib/shared-reference-attribution.mjs`, consumed by `scripts/generate-ranked-food-sources.mjs`.
- `scripts/lib/input-substance-food.mjs`: extract explicit dry-powder preparation.
- Shared snapshot and wheel regenerated; generator/attribution/selector implementation hashes now participate in snapshot identity.
- `node --test scripts/food-wheel-publication.test.mjs`: **11/11 passed**. Includes supplementary-evidence preservation, no second shared-panel ranking, retained oil hold, unchanged four canonical files, and exact equality of all PM helper/Wheel selected observations, ranks, powers and target limitations.
- Snapshot: `67990f6bcae595fe0ef00460f559308735f978bc8b0e7926cc9b4eb6ea60e1b6`.
- This is data-consumer consistency validation, not a claim that the combined production build/browser preview has passed. Those release gates remain pending. No commit, push, merge or deployment.
