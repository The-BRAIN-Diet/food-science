# BRS1 analytical source strength and coverage — peer-review working report

**Local provisional analysis, 16 November 2026.** These scores describe relative source concentration and documented biological connectivity, not overall food quality, adequacy, safety, recommended consumption or efficacy. No final presentation cutoff is adopted.

## Pinned inputs and reproducibility

- Checkout: `/Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science`.
- Branch: `review/pm8-caffeine-neuroeshot-2026-11-16`; source commit: `d67c181ff6ebec80873e4da581af759e8e98199c`.
- Intake working tree: only the pre-existing untracked meat/fish holding-page directory. Current working state and all input hashes: [analysis.json](analysis.json), `snapshot`.
- Analytical input hash: `334482caea4bbc7b4ac4f373bb070af52d804a4cbdaf0b2f07e8fbc21d2ed937`.
- Frozen site snapshot identifier: `682e4da0617af57788a83135d36947f31658dbe3d5b8c1ae6cc60245d66056c7` — not changed or used as capped analytical input.
- Exact USDA SR Legacy archive SHA-256: `b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0`. [Source archive](https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip); targeted extracted rows, exact descriptions, units and nutrient-row IDs: [usda-exact-source-extract.json](usda-exact-source-extract.json).
- Run from checkout: `node review/brs1-analytical-rollup-2026-11-16/run.mjs`, then `node review/brs1-analytical-rollup-2026-11-16/validate.mjs`, then `node review/brs1-analytical-rollup-2026-11-16/report.mjs`. These write only this review directory. `--before` uses the preserved pre-correction map for comparison, not current scoring. No site generation/build is invoked.

## Rules and interpretation

The live `buildInputSubstanceFood` builder extracts BRS1 canonical composition and relationships. `selectRankedFoodSources` supplies existing qualification/comparability and RSP calculation; the analysis requests `Number.MAX_SAFE_INTEGER` and `retainFoodForms:true`, **not** `targets[].selected`. The core formula in `src/data/relatedSubstanceRelationships.mjs::relativeSourcePower` remains **100 × observation concentration / highest eligible concentration within its comparable pool**. The scorer's two-distinct-food requirement, reference-product restrictions, conflicting-observation exclusions and incompatible-pool holds remain enabled. All qualifying RSPs at least 20 enter without a food-count cap. The scorer's below-10 records are excluded before the stricter 20 test; their quantities and reasons remain in the source export.

[config.v1.json](config.v1.json) specifies the provisional convention. For each food and view, **score = sum over distinct scoring inputs of (eligible RSP / 100)**. The protein/amino-acid group uses the highest qualifying EAA aggregate, tyrosine, tryptophan or phenylalanine RSP once. All components remain in the export, including non-winning components. This grouping is not biochemical equivalence. Repeated PM references add coverage, not supply points. Combined deduplicates across ownership before scoring; it does not add the other scores. Source-strength and system-coverage scores are identical in this BRS1-only analysis; only a future multi-system aggregation could distinguish them.

Explicit assessment and valid historical fingerprints are recorded per relationship. Two PM2 supply references follow their admitted PM1 owners; PM6 folate follows its established KC relationship/admitted constituent. Neither becomes a new PM-owned admission. There are 11 current BRS1 PMs, 46 eligible relationship records and 19 resolved dietary inputs before sodium/rankability exclusions. Full excluded relationships and reasons are in `admissions`.

Sodium remains scientifically admitted and compositionally intact but contributes no analytical points. Other active forms are not silently merged: PLP, FAD, BH4 and acetyl-CoA are endogenous/unset dependencies, outside the eligible score. Phosphatidylcholine-to-choline is a documented supply relationship, but phosphatidylcholine has no qualifying RSP, so it adds no independent points. No new equivalence rule was installed. Uridine also remains unscored. Same-input incompatible qualifying pools would be unresolved rather than maximised; none survives qualification here. Different EAA/precursor pool scales are compared only under the expressly provisional amino-acid grouping.

Existing ranking rules permit compatible ordinary edible-weight preparations to compete; they do not make raw, cooked, dried or drained materials interchangeable servings. Exact observations remain separate. A food-ID result spanning different materials is labelled **composite**; identical material with canned/canned-drained label variants is one material, with both labels retained in detail. No serving analysis is performed.

**Publication:** owner approved including local corrections in this unpublished analysis with publication pins pending. Fourteen listed food files now differ from their approved pins; the manifest and site snapshot remain untouched. Unlisted foods remain excluded. `strict_pin_matched_row_sensitivity` removes pending rows but retains the same reference denominators—it is explicitly a row-removal sensitivity, not a newly approved publication ranking. This report itself is not publication approval.

## Coverage and extraction counts

| View | Positive-score foods | Distinct PMs reached | Distinct scoring inputs |
|---|---:|---:|---:|
| PM-owned | 93 | 10 | 11 |
| upstream-shared | 43 | 6 | 4 |
| combined | 95 | 11 | 13 |

| Target input | Candidate source records | Observations before scoring | Scored food/forms ≥10 | Food/forms ≥20, uncapped |
|---|---:|---:|---:|---:|
| betaine | 10 | 10 | 5 | 3 |
| choline | 123 | 117 | 8 | 4 |
| copper | 136 | 135 | 21 | 6 |
| dha-docosahexaenoic-acid | 24 | 21 | 8 | 7 |
| indispensable-amino-acids | 34 | 34 | 33 | 31 |
| iron | 153 | 146 | 9 | 5 |
| magnesium | 147 | 142 | 47 | 33 |
| phenylalanine | 34 | 34 | 32 | 31 |
| phosphatidylcholine | 6 | 0 | 0 | 0 |
| potassium | 147 | 145 | 95 | 47 |
| sodium | 136 | 135 | 15 | 7 |
| tryptophan | 37 | 37 | 32 | 27 |
| tyrosine | 30 | 30 | 27 | 24 |
| uridine | 1 | 0 | 0 | 0 |
| vitamin-b2 | 131 | 131 | 16 | 7 |
| vitamin-b5 | 127 | 127 | 40 | 16 |
| vitamin-b6 | 140 | 138 | 45 | 16 |
| vitamin-b9 | 138 | 136 | 40 | 20 |
| vitamin-c | 91 | 90 | 28 | 21 |

703 qualifying food/form–relationship rows before sodium removal; 682 after. Repeated relationship references are retained as evidence, not additional supply points. Full source pools, exclusion reasons, unscored observations and admission provenance are in [analysis.json](analysis.json). Zero-score food IDs have no positive rank and are listed separately in [comparisons.json](comparisons.json); zero score is not zero nutrient content.

## Composition completeness and corrections

The audit covers the 20 meat/finfish/offal/roe identities already inventoried plus egg yolks, against all 19 BRS1 inputs: 399 food/input checks. [completeness.json](completeness.json) distinguishes existing mapped values, exact-source recoveries and unresolved quantities, with form-specific source pointers. It also explicitly lists supported profiles not available through default site projections.

- Added **14 exact-material nine-EAA profiles / 126 source values**, without changing prior profiles. The supplied protein values, FDC identity, nutrient-row provenance and source derivation codes are retained. No category estimates or amino-acid values inferred from protein.
- Added **chicken-liver tyrosine 0.653 g/100 g**, matching its raw panel FDC 171060.
- Added eight missing exact-panel betaine observations: beef 8.1, chicken 7.8, raw chicken liver 16.9, lamb 10.2, beef liver 4.4, pork 3.2, salmon 3.0 and egg yolk 0.9 mg/100 g. Pan-fried chicken-liver betaine **21 mg/100 g remains separate and unchanged**. These additions do not meet the current ≥20 threshold and create no new scored connections.
- Herring FDC 175116: tryptophan **0.201**, phenylalanine **0.701 g/100 g**, complete exact nine-EAA profile; existing tyrosine **0.606** retained. These are database values, not asserted independent assays.
- Beef: raw FDC 171796 and cooked FDC 174032 both contain **0.094 g tryptophan/100 g in the retrieved archive**. Existing cooked record preserved; raw profile recovered with the discrepancy explicit. This is not an authoritative correction to 0.200 or 0.250. Its RSP remains below 20; no substitute cut or protein denominator was used.
- Heart/kidney exact cited USDA records lack the required amino-acid rows. Roe and grouped poultry have unresolved or non-USDA identities; no proxy or species transfer added. Salmon-roe MEXT amino-acid recovery remains unverified in this bounded pass.
- Existing profile validation requires household-portion metadata for public projection. To respect this task's no-portions boundary, new profiles carry no portion. An explicit **analysisCompositionOnly** option validates their per-100-g identity/provenance and omits portion calculations; default site requirements remain unchanged. This is not a public schema migration.

Every correction is listed in [source-corrections.json](source-corrections.json). No existing values, page prose, PM admissions or scientific ratings were rewritten. The [holding page](../meat-fish-amino-acid-reference-2026-11-16/holding-page.md) retains the original inventory and a dated update.

## Requested food explanations

| Food | Combined rank | Score | PMs reached | Explanation |
|---|---:|---:|---:|---|
| beef | 58 | 0.5711 | 4 | Only the amino-acid group qualifies. EAA wins; tyrosine and phenylalanine remain visible. Both raw and cooked source forms retained; tryptophan fails ≥20. Composite, not one serving. |
| herring | 36 | 1.0228 | 7 | Recovered exact raw profile now contributes EAA/precursors; DHA is a separate scored input. No invented missing data. |
| turkey | 40 | 0.9653 | 6 | Amino-acid group plus B6. Raw and cooked profiles remain distinct; PM repetition no longer multiplies B6. Composite. |
| sardines | 33 | 1.0655 | 7 | EAA/precursor group plus DHA. Canned, oil-drained, bone-in material; preparation-label variants are not separate foods. |
| egg-yolks | 10 | 2.1914 | 8 | Choline, amino-acid group, B5 and folate contribute independently. B5 remains visible; whole eggs are not substituted. |
| sage | 5 | 2.9309 | 8 | Ground sage retains high per-100-g B6, magnesium, potassium, iron and folate. No serving inference; spice treatment deferred. |
| liver | 1 | 4.7627 | 9 | Raw beef liver supplies seven qualifying groups. Repeated B2/B6 PM links count once. It is separate from chicken liver. |
| bell-peppers | 41 | 0.9602 | 1 | Raw red peppers qualify through vitamin C only. PM count does not multiply this contribution. |
| miso | — | 0.0000 | 0 | Sodium is its only ≥20 input in these source pools, so excluded here; potassium is below 20. No amino-acid profile borrowed from soybeans. |

## Differences from superseded calculations

The former capped PM-max score rewarded repeated PM connections and omitted beyond-cap sources. It is superseded, not numerically interchangeable with this distinct-input score. [comparisons.json](comparisons.json) contains every food's old score/rank where available, the uncapped pre-correction baseline under the **new** rule, and the final corrected result. 621 → 703 qualifying rows; 600 → 682 after sodium exclusion. There are no changed RSPs among matching original component rows; corrections add source observations rather than tune existing scores. Source correction deltas should not be confused with the larger change of scoring convention.

## Distribution and candidate presentation cutoffs — not adopted

Combined positive-score range: 0.2019–4.7627; total 100.4781 descriptive source-strength points. Full adjacent drops, percentage of leader, cumulative score share and cumulative distinct PM/input coverage are exported in [comparisons.json](comparisons.json). These are connectivity descriptors, not fractions of biological benefit.

| Candidate display choice only | Foods | Cumulative score share | PMs represented | Inputs represented |
|---|---:|---:|---:|---:|
| First 10 by provisional score | 10 | 30.1320% | 11 | 12 |
| First 20 by provisional score | 20 | 49.0223% | 11 | 13 |
| First 30 by provisional score | 30 | 64.1156% | 11 | 13 |
| First 95 by provisional score | 95 | 100.0000% | 11 | 13 |
| Score ≥1 | 39 | 73.5499% | 11 | 13 |
| Score ≥2 | 11 | 32.2725% | 11 | 12 |

## Full rankings and component arithmetic

All positive-score foods are shown; none is removed by a final cutoff. Scores here are rounded to four decimals only; JSON retains full precision. Each term is one group contribution. **Composite** flags multiple material descriptions. Every winning source row and non-winning component RSP is retained in `rankings.*.groups` and `rows` in the data export.

### PM-owned

| Rank | Food ID | Source strength = system coverage | PMs | Inputs | Arithmetic (RSP ÷100 per group) | Form status |
|---:|---|---:|---:|---:|---|---|
| 1 | liver | 4.2695 | 7 | 6 | choline: 0.4064 + copper: 1.0000 + protein-amino-acid-supply: 0.7098 + vitamin-b2: 0.7507 + vitamin-b5: 1.0000 + vitamin-b6: 0.4026 | Single recorded material |
| 2 | spirulina | 3.3257 | 6 | 6 | copper: 0.6253 + iron: 0.2306 + magnesium: 0.3294 + potassium: 0.6553 + vitamin-b2: 1.0000 + vitamin-b5: 0.4852 | Single recorded material |
| 3 | soy | 2.5740 | 6 | 4 | magnesium: 0.4730 + potassium: 0.8639 + protein-amino-acid-supply: 1.0000 + vitamin-b2: 0.2371 | Single recorded material |
| 4 | chicken-liver | 2.4764 | 7 | 5 | choline: 0.2370 + protein-amino-acid-supply: 0.5689 + vitamin-b2: 0.4845 + vitamin-b5: 0.8690 + vitamin-b6: 0.3171 | Single recorded material |
| 5 | sage | 2.4649 | 6 | 4 | iron: 0.2275 + magnesium: 0.7230 + potassium: 0.5144 + vitamin-b6: 1.0000 | Single recorded material |
| 6 | pumpkin-seeds | 2.3636 | 5 | 3 | magnesium: 1.0000 + potassium: 0.3889 + protein-amino-acid-supply: 0.9746 | Single recorded material |
| 7 | thyme | 2.3434 | 6 | 5 | iron: 1.0000 + magnesium: 0.3716 + potassium: 0.3913 + vitamin-b6: 0.2045 + vitamin-c: 0.3759 | Single recorded material |
| 8 | sunflower-seeds | 2.0292 | 7 | 4 | magnesium: 0.5490 + potassium: 0.3101 + protein-amino-acid-supply: 0.6701 + vitamin-b6: 0.5000 | Single recorded material |
| 9 | cocoa | 1.9639 | 4 | 3 | copper: 0.3883 + magnesium: 0.8429 + potassium: 0.7327 | Single recorded material |
| 10 | egg-yolks | 1.9431 | 3 | 3 | choline: 1.0000 + protein-amino-acid-supply: 0.5262 + vitamin-b5: 0.4168 | Single recorded material |
| 11 | anchovies | 1.8592 | 4 | 3 | dha-docosahexaenoic-acid: 0.6460 + potassium: 0.2615 + protein-amino-acid-supply: 0.9517 | Single recorded material |
| 12 | turmeric | 1.7963 | 5 | 3 | iron: 0.4450 + magnesium: 0.3514 + potassium: 1.0000 | Single recorded material |
| 13 | oregano | 1.7477 | 6 | 4 | iron: 0.2977 + magnesium: 0.4561 + potassium: 0.6058 + vitamin-b6: 0.3881 | Single recorded material |
| 14 | salmon | 1.7323 | 8 | 4 | dha-docosahexaenoic-acid: 0.5520 + protein-amino-acid-supply: 0.7282 + vitamin-b5: 0.2157 + vitamin-b6: 0.2364 | Composite |
| 15 | saffron | 1.6503 | 6 | 3 | magnesium: 0.4459 + potassium: 0.8288 + vitamin-b6: 0.3755 | Single recorded material |
| 16 | wheat-germ | 1.6305 | 7 | 4 | magnesium: 0.4037 + potassium: 0.4288 + vitamin-b5: 0.3147 + vitamin-b6: 0.4833 | Single recorded material |
| 17 | almonds | 1.6073 | 6 | 4 | magnesium: 0.4561 + potassium: 0.3524 + protein-amino-acid-supply: 0.4887 + vitamin-b2: 0.3101 | Single recorded material |
| 18 | kidney | 1.5745 | 5 | 3 | vitamin-b2: 0.7738 + vitamin-b5: 0.5535 + vitamin-b6: 0.2472 | Single recorded material |
| 19 | sesame-seeds | 1.5300 | 6 | 4 | copper: 0.4185 + magnesium: 0.5929 + potassium: 0.2250 + vitamin-b6: 0.2937 | Single recorded material |
| 20 | peanuts | 1.4419 | 6 | 4 | magnesium: 0.2838 + potassium: 0.3389 + protein-amino-acid-supply: 0.5728 + vitamin-b5: 0.2463 | Composite |
| 21 | pistachios | 1.3292 | 6 | 3 | magnesium: 0.2044 + potassium: 0.4928 + vitamin-b6: 0.6320 | Single recorded material |
| 22 | salmon-roe | 1.3290 | 3 | 2 | dha-docosahexaenoic-acid: 1.0000 + vitamin-b5: 0.3290 | Single recorded material |
| 23 | mackerel | 1.3132 | 3 | 2 | dha-docosahexaenoic-acid: 0.7005 + protein-amino-acid-supply: 0.6127 | Single recorded material |
| 24 | parsley | 1.2663 | 2 | 2 | potassium: 0.2663 + vitamin-c: 1.0000 | Single recorded material |
| 25 | tuna | 1.2135 | 3 | 2 | dha-docosahexaenoic-acid: 0.4450 + protein-amino-acid-supply: 0.7685 | Composite |
| 26 | kidney-beans | 1.1794 | 5 | 3 | magnesium: 0.2365 + potassium: 0.6760 + protein-amino-acid-supply: 0.2669 | Composite |
| 27 | amaranth | 1.0860 | 7 | 4 | magnesium: 0.4189 + potassium: 0.2442 + vitamin-b5: 0.2031 + vitamin-b6: 0.2197 | Single recorded material |
| 28 | lentils | 1.0812 | 7 | 4 | potassium: 0.3255 + protein-amino-acid-supply: 0.2567 + vitamin-b5: 0.2983 + vitamin-b6: 0.2007 | Composite |
| 29 | sardines | 1.0655 | 3 | 2 | dha-docosahexaenoic-acid: 0.2545 + protein-amino-acid-supply: 0.8110 | Single recorded material |
| 30 | flax-seeds | 1.0530 | 4 | 2 | magnesium: 0.6622 + potassium: 0.3909 | Single recorded material |
| 31 | cashews | 1.0356 | 4 | 3 | copper: 0.2250 + magnesium: 0.4932 + potassium: 0.3173 | Single recorded material |
| 32 | herring | 1.0228 | 3 | 2 | dha-docosahexaenoic-acid: 0.4310 + protein-amino-acid-supply: 0.5918 | Single recorded material |
| 33 | eggs | 1.0031 | 3 | 3 | choline: 0.3582 + protein-amino-acid-supply: 0.4312 + vitamin-b5: 0.2137 | Composite |
| 34 | black-beans | 1.0018 | 4 | 2 | magnesium: 0.2889 + potassium: 0.7130 | Single recorded material |
| 35 | chicken | 1.0000 | 1 | 1 | protein-amino-acid-supply: 1.0000 | Composite |
| 36 | parmesan-cheese | 1.0000 | 1 | 1 | protein-amino-acid-supply: 1.0000 | Single recorded material |
| 37 | turkey | 0.9653 | 5 | 2 | protein-amino-acid-supply: 0.7229 + vitamin-b6: 0.2424 | Composite |
| 38 | bell-peppers | 0.9602 | 1 | 1 | vitamin-c: 0.9602 | Single recorded material |
| 39 | brazil-nuts | 0.9520 | 4 | 2 | magnesium: 0.6351 + potassium: 0.3168 | Single recorded material |
| 40 | cloves | 0.9279 | 4 | 2 | magnesium: 0.4375 + potassium: 0.4904 | Single recorded material |
| 41 | black-pepper | 0.9278 | 4 | 2 | magnesium: 0.2889 + potassium: 0.6389 | Single recorded material |
| 42 | cheddar-cheese | 0.9255 | 1 | 1 | protein-amino-acid-supply: 0.9255 | Single recorded material |
| 43 | lupins | 0.8215 | 4 | 2 | magnesium: 0.3345 + potassium: 0.4870 | Single recorded material |
| 44 | chickpeas | 0.8173 | 3 | 3 | potassium: 0.3452 + protein-amino-acid-supply: 0.2507 + vitamin-b5: 0.2214 | Composite |
| 45 | dark-chocolate | 0.7289 | 4 | 2 | magnesium: 0.3851 + potassium: 0.3438 | Single recorded material |
| 46 | kale | 0.7023 | 1 | 1 | vitamin-c: 0.7023 | Single recorded material |
| 47 | garlic | 0.6937 | 4 | 2 | vitamin-b6: 0.4591 + vitamin-c: 0.2346 | Single recorded material |
| 48 | mussels | 0.6739 | 1 | 1 | protein-amino-acid-supply: 0.6739 | Single recorded material |
| 49 | broccoli | 0.6707 | 1 | 1 | vitamin-c: 0.6707 | Single recorded material |
| 50 | pork | 0.6620 | 1 | 1 | protein-amino-acid-supply: 0.6620 | Single recorded material |
| 51 | brussels-sprouts | 0.6391 | 1 | 1 | vitamin-c: 0.6391 | Single recorded material |
| 52 | buckwheat | 0.6114 | 4 | 2 | magnesium: 0.3902 + potassium: 0.2212 | Single recorded material |
| 53 | quinoa | 0.6034 | 4 | 2 | magnesium: 0.3328 + potassium: 0.2707 | Single recorded material |
| 54 | wasabi | 0.5881 | 2 | 2 | potassium: 0.2731 + vitamin-c: 0.3150 | Single recorded material |
| 55 | cod | 0.5866 | 1 | 1 | protein-amino-acid-supply: 0.5866 | Single recorded material |
| 56 | beef | 0.5711 | 1 | 1 | protein-amino-acid-supply: 0.5711 | Composite |
| 57 | chia-seeds | 0.5659 | 3 | 1 | magnesium: 0.5659 | Single recorded material |
| 58 | lamb | 0.5415 | 1 | 1 | protein-amino-acid-supply: 0.5415 | Single recorded material |
| 59 | peppermint | 0.5127 | 2 | 2 | potassium: 0.2736 + vitamin-c: 0.2391 | Single recorded material |
| 60 | oats | 0.5052 | 4 | 2 | magnesium: 0.2990 + potassium: 0.2062 | Single recorded material |
| 61 | tofu | 0.5045 | 1 | 1 | protein-amino-acid-supply: 0.5045 | Single recorded material |
| 62 | heart | 0.4964 | 4 | 2 | vitamin-b2: 0.2469 + vitamin-b5: 0.2495 | Single recorded material |
| 63 | spinach | 0.4795 | 2 | 2 | potassium: 0.2683 + vitamin-c: 0.2113 | Single recorded material |
| 64 | walnuts | 0.4789 | 4 | 2 | magnesium: 0.2669 + potassium: 0.2120 | Single recorded material |
| 65 | cilantro | 0.4535 | 2 | 2 | potassium: 0.2505 + vitamin-c: 0.2030 | Single recorded material |
| 66 | strawberries | 0.4421 | 1 | 1 | vitamin-c: 0.4421 | Single recorded material |
| 67 | barley | 0.4420 | 4 | 2 | magnesium: 0.2247 + potassium: 0.2173 | Single recorded material |
| 68 | oranges | 0.4000 | 1 | 1 | vitamin-c: 0.4000 | Single recorded material |
| 69 | lemon | 0.3985 | 1 | 1 | vitamin-c: 0.3985 | Single recorded material |
| 70 | cauliflower | 0.3624 | 1 | 1 | vitamin-c: 0.3624 | Single recorded material |
| 71 | natto | 0.3505 | 1 | 1 | potassium: 0.3505 | Single recorded material |
| 72 | tempeh | 0.3328 | 1 | 1 | protein-amino-acid-supply: 0.3328 | Single recorded material |
| 73 | broccoli-sprouts | 0.3233 | 1 | 1 | vitamin-c: 0.3233 | Single recorded material |
| 74 | watercress | 0.3233 | 1 | 1 | vitamin-c: 0.3233 | Single recorded material |
| 75 | rosemary | 0.3212 | 1 | 1 | potassium: 0.3212 | Single recorded material |
| 76 | peas | 0.3008 | 1 | 1 | vitamin-c: 0.3008 | Single recorded material |
| 77 | clams | 0.2992 | 1 | 1 | protein-amino-acid-supply: 0.2992 | Single recorded material |
| 78 | oysters | 0.2930 | 1 | 1 | copper: 0.2930 | Single recorded material |
| 79 | cabbage | 0.2752 | 1 | 1 | vitamin-c: 0.2752 | Single recorded material |
| 80 | dandelion-greens | 0.2632 | 1 | 1 | vitamin-c: 0.2632 | Single recorded material |
| 81 | shrimp | 0.2581 | 1 | 1 | protein-amino-acid-supply: 0.2581 | Single recorded material |
| 82 | avocado | 0.2332 | 1 | 1 | potassium: 0.2332 | Single recorded material |
| 83 | edamame | 0.2317 | 1 | 1 | potassium: 0.2317 | Single recorded material |
| 84 | spelt | 0.2297 | 3 | 1 | magnesium: 0.2297 | Single recorded material |
| 85 | swiss-chard | 0.2256 | 1 | 1 | vitamin-c: 0.2256 | Single recorded material |
| 86 | lions-mane-mushroom | 0.2131 | 1 | 1 | potassium: 0.2131 | Single recorded material |
| 87 | wheat | 0.2128 | 3 | 1 | magnesium: 0.2128 | Single recorded material |
| 88 | shiitake-mushroom | 0.2091 | 1 | 1 | vitamin-b5: 0.2091 | Single recorded material |
| 89 | mushrooms | 0.2087 | 1 | 1 | vitamin-b5: 0.2087 | Single recorded material |
| 90 | cinnamon | 0.2072 | 1 | 1 | potassium: 0.2072 | Single recorded material |
| 91 | jerusalem-artichokes | 0.2062 | 1 | 1 | potassium: 0.2062 | Single recorded material |
| 92 | potatoes | 0.2043 | 1 | 1 | potassium: 0.2043 | Single recorded material |
| 93 | oyster-mushroom | 0.2019 | 1 | 1 | potassium: 0.2019 | Single recorded material |

### upstream-shared

| Rank | Food ID | Source strength = system coverage | PMs | Inputs | Arithmetic (RSP ÷100 per group) | Form status |
|---:|---|---:|---:|---:|---|---|
| 1 | chicken-liver | 1.7125 | 6 | 3 | choline: 0.2370 + protein-amino-acid-supply: 0.4755 + vitamin-b9: 1.0000 | Single recorded material |
| 2 | egg-yolks | 1.6413 | 6 | 3 | choline: 1.0000 + protein-amino-acid-supply: 0.3930 + vitamin-b9: 0.2483 | Single recorded material |
| 3 | soy | 1.6378 | 6 | 2 | protein-amino-acid-supply: 1.0000 + vitamin-b9: 0.6378 | Single recorded material |
| 4 | liver | 1.5251 | 6 | 3 | choline: 0.4064 + protein-amino-acid-supply: 0.6255 + vitamin-b9: 0.4932 | Single recorded material |
| 5 | quinoa | 1.3129 | 4 | 2 | betaine: 1.0000 + vitamin-b9: 0.3129 | Composite |
| 6 | chickpeas | 1.2214 | 4 | 2 | protein-amino-acid-supply: 0.2741 + vitamin-b9: 0.9473 | Composite |
| 7 | wheat-germ | 1.1287 | 4 | 2 | betaine: 0.6508 + vitamin-b9: 0.4779 | Composite |
| 8 | peanuts | 1.1162 | 6 | 2 | protein-amino-acid-supply: 0.7080 + vitamin-b9: 0.4082 | Composite |
| 9 | lentils | 1.0714 | 4 | 2 | protein-amino-acid-supply: 0.2568 + vitamin-b9: 0.8146 | Composite |
| 10 | sunflower-seeds | 1.0606 | 6 | 2 | protein-amino-acid-supply: 0.6746 + vitamin-b9: 0.3861 | Single recorded material |
| 11 | parmesan-cheese | 1.0000 | 3 | 1 | protein-amino-acid-supply: 1.0000 | Single recorded material |
| 12 | pumpkin-seeds | 1.0000 | 4 | 1 | protein-amino-acid-supply: 1.0000 | Single recorded material |
| 13 | kidney-beans | 0.9407 | 4 | 2 | protein-amino-acid-supply: 0.2706 + vitamin-b9: 0.6701 | Composite |
| 14 | cheddar-cheese | 0.9255 | 4 | 1 | protein-amino-acid-supply: 0.9255 | Single recorded material |
| 15 | black-beans | 0.7551 | 4 | 1 | vitamin-b9: 0.7551 | Single recorded material |
| 16 | eggs | 0.7437 | 5 | 2 | choline: 0.3582 + protein-amino-acid-supply: 0.3855 | Composite |
| 17 | chicken | 0.7103 | 4 | 1 | protein-amino-acid-supply: 0.7103 | Composite |
| 18 | almonds | 0.6532 | 4 | 1 | protein-amino-acid-supply: 0.6532 | Single recorded material |
| 19 | anchovies | 0.6509 | 4 | 1 | protein-amino-acid-supply: 0.6509 | Single recorded material |
| 20 | lupins | 0.6037 | 4 | 1 | vitamin-b9: 0.6037 | Single recorded material |
| 21 | sardines | 0.5545 | 4 | 1 | protein-amino-acid-supply: 0.5545 | Single recorded material |
| 22 | tuna | 0.5257 | 4 | 1 | protein-amino-acid-supply: 0.5257 | Composite |
| 23 | edamame | 0.5153 | 4 | 1 | vitamin-b9: 0.5153 | Single recorded material |
| 24 | turkey | 0.5014 | 4 | 1 | protein-amino-acid-supply: 0.5014 | Composite |
| 25 | salmon | 0.4980 | 4 | 1 | protein-amino-acid-supply: 0.4980 | Composite |
| 26 | mussels | 0.4922 | 4 | 1 | protein-amino-acid-supply: 0.4922 | Single recorded material |
| 27 | tofu | 0.4818 | 4 | 1 | protein-amino-acid-supply: 0.4818 | Single recorded material |
| 28 | sage | 0.4660 | 4 | 1 | vitamin-b9: 0.4660 | Single recorded material |
| 29 | thyme | 0.4660 | 4 | 1 | vitamin-b9: 0.4660 | Single recorded material |
| 30 | pork | 0.4530 | 4 | 1 | protein-amino-acid-supply: 0.4530 | Single recorded material |
| 31 | mackerel | 0.4189 | 4 | 1 | protein-amino-acid-supply: 0.4189 | Single recorded material |
| 32 | beef | 0.4183 | 3 | 1 | protein-amino-acid-supply: 0.4183 | Composite |
| 33 | herring | 0.4045 | 4 | 1 | protein-amino-acid-supply: 0.4045 | Single recorded material |
| 34 | oregano | 0.4031 | 4 | 1 | vitamin-b9: 0.4031 | Single recorded material |
| 35 | cod | 0.4010 | 4 | 1 | protein-amino-acid-supply: 0.4010 | Single recorded material |
| 36 | lamb | 0.3889 | 4 | 1 | protein-amino-acid-supply: 0.3889 | Single recorded material |
| 37 | tempeh | 0.3328 | 3 | 1 | protein-amino-acid-supply: 0.3328 | Single recorded material |
| 38 | spinach | 0.3299 | 4 | 1 | vitamin-b9: 0.3299 | Single recorded material |
| 39 | clams | 0.2992 | 3 | 1 | protein-amino-acid-supply: 0.2992 | Single recorded material |
| 40 | parsley | 0.2585 | 4 | 1 | vitamin-b9: 0.2585 | Single recorded material |
| 41 | shrimp | 0.2581 | 3 | 1 | protein-amino-acid-supply: 0.2581 | Single recorded material |
| 42 | romaine-lettuce | 0.2313 | 4 | 1 | vitamin-b9: 0.2313 | Single recorded material |
| 43 | beetroot | 0.2063 | 3 | 1 | betaine: 0.2063 | Single recorded material |

### combined

| Rank | Food ID | Source strength = system coverage | PMs | Inputs | Arithmetic (RSP ÷100 per group) | Form status |
|---:|---|---:|---:|---:|---|---|
| 1 | liver | 4.7627 | 9 | 7 | choline: 0.4064 + copper: 1.0000 + protein-amino-acid-supply: 0.7098 + vitamin-b2: 0.7507 + vitamin-b5: 1.0000 + vitamin-b6: 0.4026 + vitamin-b9: 0.4932 | Single recorded material |
| 2 | chicken-liver | 3.4764 | 9 | 6 | choline: 0.2370 + protein-amino-acid-supply: 0.5689 + vitamin-b2: 0.4845 + vitamin-b5: 0.8690 + vitamin-b6: 0.3171 + vitamin-b9: 1.0000 | Single recorded material |
| 3 | spirulina | 3.3257 | 6 | 6 | copper: 0.6253 + iron: 0.2306 + magnesium: 0.3294 + potassium: 0.6553 + vitamin-b2: 1.0000 + vitamin-b5: 0.4852 | Single recorded material |
| 4 | soy | 3.2117 | 9 | 5 | magnesium: 0.4730 + potassium: 0.8639 + protein-amino-acid-supply: 1.0000 + vitamin-b2: 0.2371 + vitamin-b9: 0.6378 | Single recorded material |
| 5 | sage | 2.9309 | 8 | 5 | iron: 0.2275 + magnesium: 0.7230 + potassium: 0.5144 + vitamin-b6: 1.0000 + vitamin-b9: 0.4660 | Single recorded material |
| 6 | thyme | 2.8094 | 8 | 6 | iron: 1.0000 + magnesium: 0.3716 + potassium: 0.3913 + vitamin-b6: 0.2045 + vitamin-b9: 0.4660 + vitamin-c: 0.3759 | Single recorded material |
| 7 | wheat-germ | 2.7592 | 8 | 6 | betaine: 0.6508 + magnesium: 0.4037 + potassium: 0.4288 + vitamin-b5: 0.3147 + vitamin-b6: 0.4833 + vitamin-b9: 0.4779 | Composite |
| 8 | sunflower-seeds | 2.4197 | 10 | 5 | magnesium: 0.5490 + potassium: 0.3101 + protein-amino-acid-supply: 0.6746 + vitamin-b6: 0.5000 + vitamin-b9: 0.3861 | Single recorded material |
| 9 | pumpkin-seeds | 2.3889 | 7 | 3 | magnesium: 1.0000 + potassium: 0.3889 + protein-amino-acid-supply: 1.0000 | Single recorded material |
| 10 | egg-yolks | 2.1914 | 8 | 4 | choline: 1.0000 + protein-amino-acid-supply: 0.5262 + vitamin-b5: 0.4168 + vitamin-b9: 0.2483 | Single recorded material |
| 11 | oregano | 2.1508 | 8 | 5 | iron: 0.2977 + magnesium: 0.4561 + potassium: 0.6058 + vitamin-b6: 0.3881 + vitamin-b9: 0.4031 | Single recorded material |
| 12 | peanuts | 1.9853 | 9 | 5 | magnesium: 0.2838 + potassium: 0.3389 + protein-amino-acid-supply: 0.7080 + vitamin-b5: 0.2463 + vitamin-b9: 0.4082 | Composite |
| 13 | cocoa | 1.9639 | 4 | 3 | copper: 0.3883 + magnesium: 0.8429 + potassium: 0.7327 | Single recorded material |
| 14 | quinoa | 1.9164 | 6 | 4 | betaine: 1.0000 + magnesium: 0.3328 + potassium: 0.2707 + vitamin-b9: 0.3129 | Composite |
| 15 | lentils | 1.8960 | 8 | 5 | potassium: 0.3255 + protein-amino-acid-supply: 0.2568 + vitamin-b5: 0.2983 + vitamin-b6: 0.2007 + vitamin-b9: 0.8146 | Composite |
| 16 | anchovies | 1.8592 | 8 | 3 | dha-docosahexaenoic-acid: 0.6460 + potassium: 0.2615 + protein-amino-acid-supply: 0.9517 | Single recorded material |
| 17 | kidney-beans | 1.8531 | 7 | 4 | magnesium: 0.2365 + potassium: 0.6760 + protein-amino-acid-supply: 0.2706 + vitamin-b9: 0.6701 | Composite |
| 18 | turmeric | 1.7963 | 5 | 3 | iron: 0.4450 + magnesium: 0.3514 + potassium: 1.0000 | Single recorded material |
| 19 | chickpeas | 1.7879 | 6 | 4 | potassium: 0.3452 + protein-amino-acid-supply: 0.2741 + vitamin-b5: 0.2214 + vitamin-b9: 0.9473 | Composite |
| 20 | almonds | 1.7718 | 7 | 4 | magnesium: 0.4561 + potassium: 0.3524 + protein-amino-acid-supply: 0.6532 + vitamin-b2: 0.3101 | Single recorded material |
| 21 | black-beans | 1.7569 | 6 | 3 | magnesium: 0.2889 + potassium: 0.7130 + vitamin-b9: 0.7551 | Single recorded material |
| 22 | salmon | 1.7323 | 9 | 4 | dha-docosahexaenoic-acid: 0.5520 + protein-amino-acid-supply: 0.7282 + vitamin-b5: 0.2157 + vitamin-b6: 0.2364 | Composite |
| 23 | saffron | 1.6503 | 6 | 3 | magnesium: 0.4459 + potassium: 0.8288 + vitamin-b6: 0.3755 | Single recorded material |
| 24 | kidney | 1.5745 | 5 | 3 | vitamin-b2: 0.7738 + vitamin-b5: 0.5535 + vitamin-b6: 0.2472 | Single recorded material |
| 25 | sesame-seeds | 1.5300 | 6 | 4 | copper: 0.4185 + magnesium: 0.5929 + potassium: 0.2250 + vitamin-b6: 0.2937 | Single recorded material |
| 26 | parsley | 1.5248 | 5 | 3 | potassium: 0.2663 + vitamin-b9: 0.2585 + vitamin-c: 1.0000 | Single recorded material |
| 27 | lupins | 1.4252 | 6 | 3 | magnesium: 0.3345 + potassium: 0.4870 + vitamin-b9: 0.6037 | Single recorded material |
| 28 | pistachios | 1.3292 | 6 | 3 | magnesium: 0.2044 + potassium: 0.4928 + vitamin-b6: 0.6320 | Single recorded material |
| 29 | salmon-roe | 1.3290 | 3 | 2 | dha-docosahexaenoic-acid: 1.0000 + vitamin-b5: 0.3290 | Single recorded material |
| 30 | mackerel | 1.3132 | 7 | 2 | dha-docosahexaenoic-acid: 0.7005 + protein-amino-acid-supply: 0.6127 | Single recorded material |
| 31 | tuna | 1.2135 | 7 | 2 | dha-docosahexaenoic-acid: 0.4450 + protein-amino-acid-supply: 0.7685 | Composite |
| 32 | amaranth | 1.0860 | 7 | 4 | magnesium: 0.4189 + potassium: 0.2442 + vitamin-b5: 0.2031 + vitamin-b6: 0.2197 | Single recorded material |
| 33 | sardines | 1.0655 | 7 | 2 | dha-docosahexaenoic-acid: 0.2545 + protein-amino-acid-supply: 0.8110 | Single recorded material |
| 34 | flax-seeds | 1.0530 | 4 | 2 | magnesium: 0.6622 + potassium: 0.3909 | Single recorded material |
| 35 | cashews | 1.0356 | 4 | 3 | copper: 0.2250 + magnesium: 0.4932 + potassium: 0.3173 | Single recorded material |
| 36 | herring | 1.0228 | 7 | 2 | dha-docosahexaenoic-acid: 0.4310 + protein-amino-acid-supply: 0.5918 | Single recorded material |
| 37 | eggs | 1.0031 | 8 | 3 | choline: 0.3582 + protein-amino-acid-supply: 0.4312 + vitamin-b5: 0.2137 | Composite |
| 38 | chicken | 1.0000 | 5 | 1 | protein-amino-acid-supply: 1.0000 | Composite |
| 39 | parmesan-cheese | 1.0000 | 4 | 1 | protein-amino-acid-supply: 1.0000 | Single recorded material |
| 40 | turkey | 0.9653 | 6 | 2 | protein-amino-acid-supply: 0.7229 + vitamin-b6: 0.2424 | Composite |
| 41 | bell-peppers | 0.9602 | 1 | 1 | vitamin-c: 0.9602 | Single recorded material |
| 42 | brazil-nuts | 0.9520 | 4 | 2 | magnesium: 0.6351 + potassium: 0.3168 | Single recorded material |
| 43 | cloves | 0.9279 | 4 | 2 | magnesium: 0.4375 + potassium: 0.4904 | Single recorded material |
| 44 | black-pepper | 0.9278 | 4 | 2 | magnesium: 0.2889 + potassium: 0.6389 | Single recorded material |
| 45 | cheddar-cheese | 0.9255 | 5 | 1 | protein-amino-acid-supply: 0.9255 | Single recorded material |
| 46 | spinach | 0.8095 | 5 | 3 | potassium: 0.2683 + vitamin-b9: 0.3299 + vitamin-c: 0.2113 | Single recorded material |
| 47 | edamame | 0.7470 | 5 | 2 | potassium: 0.2317 + vitamin-b9: 0.5153 | Single recorded material |
| 48 | dark-chocolate | 0.7289 | 4 | 2 | magnesium: 0.3851 + potassium: 0.3438 | Single recorded material |
| 49 | kale | 0.7023 | 1 | 1 | vitamin-c: 0.7023 | Single recorded material |
| 50 | garlic | 0.6937 | 4 | 2 | vitamin-b6: 0.4591 + vitamin-c: 0.2346 | Single recorded material |
| 51 | mussels | 0.6739 | 5 | 1 | protein-amino-acid-supply: 0.6739 | Single recorded material |
| 52 | broccoli | 0.6707 | 1 | 1 | vitamin-c: 0.6707 | Single recorded material |
| 53 | pork | 0.6620 | 5 | 1 | protein-amino-acid-supply: 0.6620 | Single recorded material |
| 54 | brussels-sprouts | 0.6391 | 1 | 1 | vitamin-c: 0.6391 | Single recorded material |
| 55 | buckwheat | 0.6114 | 4 | 2 | magnesium: 0.3902 + potassium: 0.2212 | Single recorded material |
| 56 | wasabi | 0.5881 | 2 | 2 | potassium: 0.2731 + vitamin-c: 0.3150 | Single recorded material |
| 57 | cod | 0.5866 | 5 | 1 | protein-amino-acid-supply: 0.5866 | Single recorded material |
| 58 | beef | 0.5711 | 4 | 1 | protein-amino-acid-supply: 0.5711 | Composite |
| 59 | chia-seeds | 0.5659 | 3 | 1 | magnesium: 0.5659 | Single recorded material |
| 60 | lamb | 0.5415 | 5 | 1 | protein-amino-acid-supply: 0.5415 | Single recorded material |
| 61 | peppermint | 0.5127 | 2 | 2 | potassium: 0.2736 + vitamin-c: 0.2391 | Single recorded material |
| 62 | oats | 0.5052 | 4 | 2 | magnesium: 0.2990 + potassium: 0.2062 | Single recorded material |
| 63 | tofu | 0.5045 | 5 | 1 | protein-amino-acid-supply: 0.5045 | Single recorded material |
| 64 | heart | 0.4964 | 4 | 2 | vitamin-b2: 0.2469 + vitamin-b5: 0.2495 | Single recorded material |
| 65 | walnuts | 0.4789 | 4 | 2 | magnesium: 0.2669 + potassium: 0.2120 | Single recorded material |
| 66 | cilantro | 0.4535 | 2 | 2 | potassium: 0.2505 + vitamin-c: 0.2030 | Single recorded material |
| 67 | strawberries | 0.4421 | 1 | 1 | vitamin-c: 0.4421 | Single recorded material |
| 68 | barley | 0.4420 | 4 | 2 | magnesium: 0.2247 + potassium: 0.2173 | Single recorded material |
| 69 | oranges | 0.4000 | 1 | 1 | vitamin-c: 0.4000 | Single recorded material |
| 70 | lemon | 0.3985 | 1 | 1 | vitamin-c: 0.3985 | Single recorded material |
| 71 | cauliflower | 0.3624 | 1 | 1 | vitamin-c: 0.3624 | Single recorded material |
| 72 | natto | 0.3505 | 1 | 1 | potassium: 0.3505 | Single recorded material |
| 73 | tempeh | 0.3328 | 4 | 1 | protein-amino-acid-supply: 0.3328 | Single recorded material |
| 74 | broccoli-sprouts | 0.3233 | 1 | 1 | vitamin-c: 0.3233 | Single recorded material |
| 75 | watercress | 0.3233 | 1 | 1 | vitamin-c: 0.3233 | Single recorded material |
| 76 | rosemary | 0.3212 | 1 | 1 | potassium: 0.3212 | Single recorded material |
| 77 | peas | 0.3008 | 1 | 1 | vitamin-c: 0.3008 | Single recorded material |
| 78 | clams | 0.2992 | 4 | 1 | protein-amino-acid-supply: 0.2992 | Single recorded material |
| 79 | oysters | 0.2930 | 1 | 1 | copper: 0.2930 | Single recorded material |
| 80 | cabbage | 0.2752 | 1 | 1 | vitamin-c: 0.2752 | Single recorded material |
| 81 | dandelion-greens | 0.2632 | 1 | 1 | vitamin-c: 0.2632 | Single recorded material |
| 82 | shrimp | 0.2581 | 4 | 1 | protein-amino-acid-supply: 0.2581 | Single recorded material |
| 83 | avocado | 0.2332 | 1 | 1 | potassium: 0.2332 | Single recorded material |
| 84 | romaine-lettuce | 0.2313 | 4 | 1 | vitamin-b9: 0.2313 | Single recorded material |
| 85 | spelt | 0.2297 | 3 | 1 | magnesium: 0.2297 | Single recorded material |
| 86 | swiss-chard | 0.2256 | 1 | 1 | vitamin-c: 0.2256 | Single recorded material |
| 87 | lions-mane-mushroom | 0.2131 | 1 | 1 | potassium: 0.2131 | Single recorded material |
| 88 | wheat | 0.2128 | 3 | 1 | magnesium: 0.2128 | Single recorded material |
| 89 | shiitake-mushroom | 0.2091 | 1 | 1 | vitamin-b5: 0.2091 | Single recorded material |
| 90 | mushrooms | 0.2087 | 1 | 1 | vitamin-b5: 0.2087 | Single recorded material |
| 91 | cinnamon | 0.2072 | 1 | 1 | potassium: 0.2072 | Single recorded material |
| 92 | beetroot | 0.2063 | 3 | 1 | betaine: 0.2063 | Single recorded material |
| 93 | jerusalem-artichokes | 0.2062 | 1 | 1 | potassium: 0.2062 | Single recorded material |
| 94 | potatoes | 0.2043 | 1 | 1 | potassium: 0.2043 | Single recorded material |
| 95 | oyster-mushroom | 0.2019 | 1 | 1 | potassium: 0.2019 | Single recorded material |

### All qualifying components — combined view

★ marks a winning component of its scoring group; all other qualifying components remain visible. Repeated PM references are collapsed only in this display. Different RSPs for one substance reflect distinct retained observations; exact forms and pointers are in the data export. Sodium is listed separately and contributes no points.

| Food | Qualifying non-sodium substance RSPs |
|---|---|
| liver | ★ choline 40.6364%; ★ copper 100.0000%; ★ indispensable-amino-acids 70.9833%; phenylalanine 62.5505%; tryptophan 44.5008%; tyrosine 40.4511%; ★ vitamin-b2 75.0681%; ★ vitamin-b5 100.0000%; ★ vitamin-b6 40.2602%; ★ vitamin-b9 49.3197% |
| chicken-liver | ★ choline 23.7015%; ★ indispensable-amino-acids 56.8908%; phenylalanine 47.5476%; tryptophan 29.7800%; tyrosine 32.7318%; ★ vitamin-b2 48.4469%; ★ vitamin-b5 86.8953%; ★ vitamin-b6 31.7100%; ★ vitamin-b9 100.0000% |
| spirulina | ★ copper 62.5320%; ★ iron 23.0583%; ★ magnesium 32.9392%; ★ potassium 65.5288%; ★ vitamin-b2 100.0000%; ★ vitamin-b5 48.5153% |
| soy | ★ magnesium 47.2973%; ★ potassium 86.3942%; ★ tryptophan 100.0000%; tyrosine 77.1429%; ★ vitamin-b2 23.7057%; ★ vitamin-b9 63.7755% |
| sage | ★ iron 22.7508%; ★ magnesium 72.2973%; ★ potassium 51.4423%; ★ vitamin-b6 100.0000%; ★ vitamin-b9 46.5986% |
| thyme | ★ iron 100.0000%; ★ magnesium 37.1622%; ★ potassium 39.1346%; ★ vitamin-b6 20.4461%; ★ vitamin-b9 46.5986%; ★ vitamin-c 37.5940% |
| wheat-germ | ★ betaine 65.0794%; ★ magnesium 40.3716%; ★ potassium 42.8846%; ★ vitamin-b5 31.4652%; ★ vitamin-b6 48.3271%; ★ vitamin-b9 47.7891% |
| sunflower-seeds | indispensable-amino-acids 67.0113%; ★ magnesium 54.8986%; ★ phenylalanine 67.4553%; ★ potassium 31.0096%; tryptophan 58.8832%; ★ vitamin-b6 50.0000%; ★ vitamin-b9 38.6054% |
| pumpkin-seeds | indispensable-amino-acids 87.0968%; ★ magnesium 100.0000%; ★ phenylalanine 100.0000%; ★ potassium 38.8942%; tryptophan 97.4619%; tyrosine 54.7870% |
| egg-yolks | ★ choline 100.0000%; ★ indispensable-amino-acids 52.6234%; phenylalanine 39.2960%; tryptophan 29.9492%; tyrosine 33.9850%; ★ vitamin-b5 41.6841%; ★ vitamin-b9 24.8299% |
| oregano | ★ iron 29.7735%; ★ magnesium 45.6081%; ★ potassium 60.5769%; ★ vitamin-b6 38.8104%; ★ vitamin-b9 40.3061% |
| peanuts | indispensable-amino-acids 57.2794%; ★ magnesium 28.3784%; ★ phenylalanine 70.8021%; ★ potassium 33.8942%; tryptophan 38.9171%; ★ vitamin-b5 24.6340%; ★ vitamin-b9 40.8163% |
| cocoa | ★ copper 38.8314%; ★ magnesium 84.2905%; ★ potassium 73.2692% |
| quinoa | ★ betaine 100.0000%; ★ magnesium 33.2770%; ★ potassium 27.0673%; ★ vitamin-b9 31.2925% |
| lentils | indispensable-amino-acids 25.6665%; ★ phenylalanine 25.6780%; ★ potassium 32.5481%; ★ vitamin-b5 29.8341%; ★ vitamin-b6 20.0743%; ★ vitamin-b9 81.4626% |
| anchovies | ★ dha-docosahexaenoic-acid 64.6000%; ★ indispensable-amino-acids 95.1652%; phenylalanine 65.0894%; ★ potassium 26.1538%; tryptophan 54.8223%; tyrosine 48.8722% |
| kidney-beans | indispensable-amino-acids 26.6926%; ★ magnesium 23.6486%; ★ phenylalanine 27.0629%; ★ potassium 67.5962%; ★ vitamin-b9 67.0068% |
| turmeric | ★ iron 44.4984%; ★ magnesium 35.1351%; ★ potassium 100.0000% |
| chickpeas | indispensable-amino-acids 25.0680%; ★ phenylalanine 27.4091%; ★ potassium 34.5192%; ★ vitamin-b5 22.1386%; ★ vitamin-b9 94.7279% |
| almonds | indispensable-amino-acids 48.8690%; ★ magnesium 45.6081%; ★ phenylalanine 65.3203%; ★ potassium 35.2404%; tryptophan 35.7022%; ★ vitamin-b2 31.0082% |
| black-beans | ★ magnesium 28.8851%; ★ potassium 71.2981%; ★ vitamin-b9 75.5102% |
| salmon | ★ dha-docosahexaenoic-acid 55.2000%; ★ indispensable-amino-acids 72.8177%; indispensable-amino-acids 67.2289%; phenylalanine 49.7980%; phenylalanine 48.7594%; tryptophan 41.9628%; tryptophan 35.3638%; tyrosine 38.0451%; ★ vitamin-b5 21.5670%; ★ vitamin-b6 23.6431% |
| saffron | ★ magnesium 44.5946%; ★ potassium 82.8846%; ★ vitamin-b6 37.5465% |
| kidney | ★ vitamin-b2 77.3842%; ★ vitamin-b5 55.3464%; ★ vitamin-b6 24.7212% |
| sesame-seeds | ★ copper 41.8452%; ★ magnesium 59.2905%; ★ potassium 22.5000%; ★ vitamin-b6 29.3680% |
| parsley | ★ potassium 26.6346%; ★ vitamin-b9 25.8503%; ★ vitamin-c 100.0000% |
| lupins | ★ magnesium 33.4459%; ★ potassium 48.7019%; ★ vitamin-b9 60.3741% |
| pistachios | ★ magnesium 20.4392%; ★ potassium 49.2788%; ★ vitamin-b6 63.1970% |
| salmon-roe | ★ dha-docosahexaenoic-acid 100.0000%; ★ vitamin-b5 32.9012% |
| mackerel | ★ dha-docosahexaenoic-acid 70.0500%; ★ indispensable-amino-acids 61.2748%; phenylalanine 41.8927%; tryptophan 35.1946%; tyrosine 31.4787% |
| tuna | ★ dha-docosahexaenoic-acid 44.5000%; ★ indispensable-amino-acids 76.8519%; indispensable-amino-acids 61.3603%; phenylalanine 52.5678%; phenylalanine 41.9504%; tryptophan 44.1624%; tryptophan 35.3638%; tyrosine 39.4486% |
| amaranth | ★ magnesium 41.8919%; ★ potassium 24.4231%; ★ vitamin-b5 20.3123%; ★ vitamin-b6 21.9703% |
| sardines | ★ dha-docosahexaenoic-acid 25.4500%; ★ indispensable-amino-acids 81.0960%; phenylalanine 55.4530%; tryptophan 46.7005%; tyrosine 41.6541% |
| flax-seeds | ★ magnesium 66.2162%; ★ potassium 39.0865% |
| cashews | ★ copper 22.5013%; ★ magnesium 49.3243%; ★ potassium 31.7308% |
| herring | ★ dha-docosahexaenoic-acid 43.1000%; ★ indispensable-amino-acids 59.1761%; phenylalanine 40.4501%; tryptophan 34.0102%; tyrosine 30.3759% |
| eggs | ★ choline 35.8205%; ★ indispensable-amino-acids 43.1170%; phenylalanine 38.5459%; tryptophan 25.8883%; tyrosine 25.0125%; ★ vitamin-b5 21.3718% |
| chicken | ★ indispensable-amino-acids 100.0000%; indispensable-amino-acids 57.6525%; phenylalanine 71.0329%; phenylalanine 41.6042%; tryptophan 61.2521%; tryptophan 35.0254%; tyrosine 29.9248% |
| parmesan-cheese | ★ tyrosine 100.0000% |
| turkey | ★ indispensable-amino-acids 72.2892%; indispensable-amino-acids 60.6996%; phenylalanine 50.1443%; phenylalanine 42.1235%; tryptophan 48.5618%; tryptophan 40.7783%; tyrosine 33.6842%; ★ vitamin-b6 24.2379% |
| bell-peppers | ★ vitamin-c 96.0150% |
| brazil-nuts | ★ magnesium 63.5135%; ★ potassium 31.6827% |
| cloves | ★ magnesium 43.7500%; ★ potassium 49.0385% |
| black-pepper | ★ magnesium 28.8851%; ★ potassium 63.8942% |
| cheddar-cheese | indispensable-amino-acids 72.5457%; phenylalanine 61.9735%; ★ tryptophan 92.5550%; tyrosine 55.5388% |
| spinach | ★ potassium 26.8269%; ★ vitamin-b9 32.9932%; ★ vitamin-c 21.1278% |
| edamame | ★ potassium 23.1731%; ★ vitamin-b9 51.5306% |
| dark-chocolate | ★ magnesium 38.5135%; ★ potassium 34.3750% |
| kale | ★ vitamin-c 70.2256% |
| garlic | ★ vitamin-b6 45.9108%; ★ vitamin-c 23.4586% |
| mussels | ★ indispensable-amino-acids 67.3921%; phenylalanine 49.2210%; tryptophan 45.1777% |
| broccoli | ★ vitamin-c 67.0677% |
| pork | ★ indispensable-amino-acids 66.1951%; phenylalanine 45.2972%; tryptophan 41.2860%; tyrosine 33.8847% |
| brussels-sprouts | ★ vitamin-c 63.9098% |
| buckwheat | ★ magnesium 39.0203%; ★ potassium 22.1154% |
| wasabi | ★ potassium 27.3077%; ★ vitamin-c 31.5038% |
| cod | ★ indispensable-amino-acids 58.6553%; phenylalanine 40.1039%; tryptophan 33.6717%; tyrosine 30.1253% |
| beef | ★ indispensable-amino-acids 57.1084%; phenylalanine 41.8350%; tyrosine 28.6717% |
| chia-seeds | ★ magnesium 56.5878% |
| lamb | ★ indispensable-amino-acids 54.1547%; phenylalanine 38.8921%; tryptophan 32.6565%; tyrosine 27.8697% |
| peppermint | ★ potassium 27.3558%; ★ vitamin-c 23.9098% |
| oats | ★ magnesium 29.8986%; ★ potassium 20.6250% |
| tofu | ★ indispensable-amino-acids 50.4547%; phenylalanine 48.1823%; tryptophan 39.7631%; tyrosine 35.1378% |
| heart | ★ vitamin-b2 24.6866%; ★ vitamin-b5 24.9547% |
| walnuts | ★ magnesium 26.6892%; ★ potassium 21.2019% |
| cilantro | ★ potassium 25.0481%; ★ vitamin-c 20.3008% |
| strawberries | ★ vitamin-c 44.2105% |
| barley | ★ magnesium 22.4662%; ★ potassium 21.7308% |
| oranges | ★ vitamin-c 40.0000% |
| lemon | ★ vitamin-c 39.8496% |
| cauliflower | ★ vitamin-c 36.2406% |
| natto | ★ potassium 35.0481% |
| tempeh | ★ tyrosine 33.2832% |
| broccoli-sprouts | ★ vitamin-c 32.3308% |
| watercress | ★ vitamin-c 32.3308% |
| rosemary | ★ potassium 32.1154% |
| peas | ★ vitamin-c 30.0752% |
| clams | ★ tyrosine 29.9248% |
| oysters | ★ copper 29.2978% |
| cabbage | ★ vitamin-c 27.5188% |
| dandelion-greens | ★ vitamin-c 26.3158% |
| shrimp | ★ tyrosine 25.8145% |
| avocado | ★ potassium 23.3173% |
| romaine-lettuce | ★ vitamin-b9 23.1293% |
| spelt | ★ magnesium 22.9730% |
| swiss-chard | ★ vitamin-c 22.5564% |
| lions-mane-mushroom | ★ potassium 21.3125% |
| wheat | ★ magnesium 21.2838% |
| shiitake-mushroom | ★ vitamin-b5 20.9118% |
| mushrooms | ★ vitamin-b5 20.8699% |
| cinnamon | ★ potassium 20.7212% |
| beetroot | ★ betaine 20.6349% |
| jerusalem-artichokes | ★ potassium 20.6250% |
| potatoes | ★ potassium 20.4327% |
| oyster-mushroom | ★ potassium 20.1923% |

Sodium-only positive candidate removed from points: **miso**. Other retained sodium candidates are anchovies, capers, parmesan cheese, spirulina, salmon roe and vinegar pickles; their non-sodium inputs determine their score. Sodium records/admissions remain unchanged.

## Validation and remaining limitations

| Check | Status | Evidence |
|---|---|---|
| Independent direct aggregation of EVERY score and rank | PASS | 231 food/view scores and ranks reconstructed without scoreFoods() |
| Independent pre-cap qualification and RSP reconstruction | PASS | 305 >=20 food/form candidates; includes pools larger than ten |
| Observed quantities/preparations/protein match canonical records | PASS | 703 component rows checked against live canonical fields; no missing value is numeric zero |
| New profiles verified against exact downloaded USDA rows | PASS | 126 added amino-acid values; exact FDC descriptions, protein and row IDs; no portions added |
| Deduplication, overlap, sodium, inclusive threshold, ties | PASS | Synthetic boundary/tie/duplicate/ownership tests plus every real group |
| Incompatible pools never silently maximised | PASS | Conflicting input pools produce unresolved subtotal, not maximum |
| Shared selector default unchanged | PASS | Exact equality with HEAD implementation for all 19 current source pools |
| Frozen manifest, site data, PM records and scientific gates unchanged | PASS | Tracked changes limited to source-food additions and four opt-in helper paths; no PM, gate, manifest or generated-site changes |
| Source hashes fresh | PASS | 363 source hashes match current candidate |
| Prior source values, food prose and pan-fried liver preserved | PASS | All old composition fields/profiles and page bodies identical; raw and pan-fried liver observations separate |
| Existing regression suites | FAIL — reproduced baseline limitations | 12/17 pass; one missing dietary-connectivity fixture and four historical foodless-target expectations fail identically with pre-change food records. See logs. No assertions or scientific records changed to pass. |
| Independent analytical validation | PASS | Separate direct aggregation plus independent pre-cap qualification; all food/view scores and ranks reconciled. |
| Publication of corrections | NOT VERIFIED / pending | Fourteen food publication pins deliberately unchanged; no release approval inferred. |
| Serving relevance, safety and efficacy | NOT VERIFIED / outside scope | No serving quantities, intake targets, optimisation, safety engine or clinical conclusions. |

Existing-test failures: missing `review/dietary-connectivity-2026-11-09/substance-matrix.json`; obsolete glutamine zero-observation expectation; 51-versus-58 identity count; mitochondrial hub historical hash; PM1 historical exception expected-error mismatch. [Current log](existing-suite-results.txt) and [pre-change-food baseline log](baseline-suite-results.txt). Baseline check substitutes HEAD food bytes in memory; modified helper defaults were independently compared with HEAD. No source reset occurred. No new guidance/hub claims were assessed or rewritten.

### Changed files

**Canonical structured composition only:**

- `docs/foods/anchovies.md`: nutrition_amino_acid_profiles/usda-sr-174183
- `docs/foods/beef.md`: nutrition_amino_acid_profiles/usda-sr-171796; nutrition_per_100g.betaine_mg
- `docs/foods/chicken.md`: nutrition_amino_acid_profiles/usda-sr-171447; nutrition_per_100g.betaine_mg
- `docs/foods/chicken-liver.md`: nutrition_per_100g.tyrosine_g; nutrition_amino_acid_profiles/usda-sr-171060; nutrition_per_100g.betaine_mg
- `docs/foods/cod.md`: nutrition_amino_acid_profiles/usda-sr-171955
- `docs/foods/herring.md`: nutrition_amino_acid_profiles/usda-sr-175116
- `docs/foods/lamb.md`: nutrition_amino_acid_profiles/usda-sr-174370; nutrition_per_100g.betaine_mg
- `docs/foods/liver.md`: nutrition_amino_acid_profiles/usda-sr-169451; nutrition_per_100g.betaine_mg
- `docs/foods/mackerel.md`: nutrition_amino_acid_profiles/usda-sr-175119
- `docs/foods/pork.md`: nutrition_amino_acid_profiles/usda-sr-167818; nutrition_per_100g.betaine_mg
- `docs/foods/salmon.md`: nutrition_amino_acid_profiles/usda-sr-175167; nutrition_per_100g.betaine_mg
- `docs/foods/tuna.md`: nutrition_amino_acid_profiles/usda-sr-173706
- `docs/foods/turkey.md`: nutrition_amino_acid_profiles/usda-sr-171480
- `docs/foods/egg-yolks.md`: nutrition_amino_acid_profiles/usda-sr-172184; nutrition_per_100g.betaine_mg

**Opt-in extraction helpers; defaults preserved:** `scripts/lib/input-substance-food.mjs`, `src/data/rankedFoodSources.mjs`, `src/lib/aggregateFoodComposition.mjs`, `src/lib/aminoAcidProfileSources.mjs`.

**Analysis-only configuration/code/evidence:** this review directory (config, reusable scorer, extraction/report/validation programs, source extract, before/after exports, completeness, comparisons, test logs and this report); dated update to the meat/fish holding page. Exact inventory is exported in `changed-files.json`.

No scientific admissions, SEC, QC suspension, publication manifest, frozen ranked snapshot, site-generated files or Cursor hub guidance changed. No build, regeneration of site data, commit, push, merge, Netlify work or deployment. Portion-aware/abacus work and other BRSs/modulators remain deferred.
