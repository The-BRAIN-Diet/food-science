# BRS3 — analytical source strength and biological coverage

16 November 2026. Local, provisional peer-review analysis. These are source-concentration and documented-connectivity summaries, not food quality, dietary adequacy, safety or demonstrated efficacy scores.

## Pinned inputs and boundaries

Checkout: `/Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science`. Branch: `review/pm8-caffeine-neuroeshot-2026-11-16`. Commit: `d67c181ff6ebec80873e4da581af759e8e98199c`. The inherited uncommitted state is captured in intake.json; source hashes and final extraction state are in analysis.json. Input hash: `6fd8983b57a7191fd6fe726f062081b7d7d6d1725adfa1ba23db13bf7a9ed0f1`. Frozen site snapshot: `682e4da0617af57788a83135d36947f31658dbe3d5b8c1ae6cc60245d66056c7` (unchanged).

Source pools were obtained in memory from the existing canonical builder and scorer before display caps. No site mappings, snapshots or pages were regenerated. Prior BRS1/BRS2 corrected records are used with their publication-pending status; no new BRS3 source corrections were necessary. The approved source manifest is unchanged. `strict_pin_matched_row_sensitivity` in analysis.json omits pending rows at unchanged reference powers; it is an omission sensitivity, not a recomputed alternative reference pool.

## Equations and selection

- Existing RSP = 100 × comparable food concentration / highest eligible comparable concentration. Implementation: `src/data/relatedSubstanceRelationships.mjs`, selected through `src/data/rankedFoodSources.mjs`.
- Retain unrounded RSP ≥20, inclusive; no numerical food cap. Existing ≥10 intermediate scorer filtering cannot remove a ≥20 row.
- Score = Σ over distinct non-overlapping inputs [input RSP /100]. Repeated PM or ownership references do not multiply an input.
- PM-owned uses A; upstream/shared uses eligible B/C/D; combined deduplicates across both. Combined is not the sum of the separate scores.
- The existing provisional EAA/tryptophan/tyrosine/phenylalanine max-once group is unchanged and has no eligible BRS3 component. EPA and DHA remain distinct; no new equivalences were invented.
- Sodium remains excluded from analytical points only; it has no eligible BRS3 row here.
- Full stored precision is used; tables round only for display. Exact ties use canonical food ID.
- Ordinary edible preparations may compete under the existing pool rule; chemical forms and incompatible denominators remain separate. Duplicate observations cannot occupy multiple food/form slots. Unresolved multiple comparison pools are held, not silently maximised.

Source strength and single-system coverage coincide in BRS3. PM counts are shown separately. All scoring forms are retained in the component export; multi-material food-ID profiles would be marked composite, never described as one interchangeable serving. None of the current positive BRS3 food summaries spans multiple recorded material labels. This does not establish equivalent preparation effects or bioavailability.

## Counts

| Measure | Count |
|---|---|
| PMs examined | 8 |
| Structured relationships examined | 25 |
| Eligible relationships | 20 |
| Distinct resolved inputs | 14 |
| Unresolved eligible input identities | 0 |
| Food/input/form candidates ≥10 before analytical cutoff | 145 |
| Food/input/form candidates ≥20 | 84 |
| Component relationship rows ≥20 before sodium exclusion | 118 |
| After sodium exclusion | 118 |
| Inputs with positive scored sources | 11 |

| Ownership view | Foods | Food/material contexts | Food–PM pairs | Distinct PMs reached |
|---|---|---|---|---|
| PM-owned | 48 | 48 | 68 | 5 |
| upstream-shared | 19 | 19 | 38 | 2 |
| combined | 57 | 57 | 106 | 7 |

## Per-input pools and filter effects

| Input | Source contexts | Observations | RSP ≥10 uncapped | RSP ≥20 | Leader(s) at 100 |
|---|---|---|---|---|---|
| copper | 136 | 135 | 21 | 6 | liver |
| cysteine | 8 | 0 | 0 | 0 | no rankable pool |
| dha-docosahexaenoic-acid | 24 | 21 | 8 | 7 | salmon-roe |
| epa-eicosapentaenoic-acid | 22 | 19 | 9 | 6 | salmon-roe |
| glycine | 19 | 19 | 19 | 19 | pumpkin-seeds |
| iron | 153 | 146 | 9 | 5 | thyme |
| manganese | 132 | 131 | 5 | 4 | cloves |
| oligofructose | 0 | 0 | 0 | 0 | no rankable pool |
| selenium | 130 | 125 | 1 | 1 | brazil-nuts |
| sulforaphane | 2 | 0 | 0 | 0 | no rankable pool |
| vitamin-b2 | 131 | 131 | 16 | 7 | spirulina |
| vitamin-c | 91 | 90 | 28 | 21 | parsley |
| vitamin-e | 123 | 121 | 10 | 6 | sunflower-seeds |
| zinc | 149 | 145 | 19 | 2 | oysters |

Two independent foods are required in a comparison pool, not necessarily two above the analytical threshold. For selenium, the existing Brazil-nut reference maximum leaves one food above ≥20; no threshold or reference rule was changed. Concentrated spices and exceptional maxima remain a deferred global interpretation issue, not a reason to tune this ranking.

## Full ownership rankings

### PM-owned

| Rank | Food | Score | Inputs | PM count | Input arithmetic (RSP ÷100) |
|---|---|---|---|---|---|
| 1 | salmon-roe | 2.2587 | 3 | 4 | dha-docosahexaenoic-acid 100.0000% /100; epa-eicosapentaenoic-acid 100.0000% /100; vitamin-e 25.8743% /100 |
| 2 | spirulina | 1.8559 | 3 | 2 | copper 62.5320% /100; iron 23.0583% /100; vitamin-b2 100.0000% /100 |
| 3 | liver | 1.7507 | 2 | 2 | copper 100.0000% /100; vitamin-b2 75.0681% /100 |
| 4 | thyme | 1.5886 | 3 | 3 | iron 100.0000% /100; vitamin-c 37.5940% /100; vitamin-e 21.2681% /100 |
| 5 | oysters | 1.2930 | 2 | 1 | copper 29.2978% /100; zinc 100.0000% /100 |
| 6 | mackerel | 1.2618 | 2 | 2 | dha-docosahexaenoic-acid 70.0500% /100; epa-eicosapentaenoic-acid 56.1250% /100 |
| 7 | cloves | 1.2508 | 2 | 3 | manganese 100.0000% /100; vitamin-e 25.0782% /100 |
| 8 | anchovies | 1.1229 | 2 | 2 | dha-docosahexaenoic-acid 64.6000% /100; epa-eicosapentaenoic-acid 47.6875% /100 |
| 9 | salmon | 1.0907 | 2 | 2 | dha-docosahexaenoic-acid 55.2000% /100; epa-eicosapentaenoic-acid 53.8750% /100 |
| 10 | almonds | 1.0388 | 2 | 2 | vitamin-b2 31.0082% /100; vitamin-e 72.8746% /100 |
| 11 | brazil-nuts | 1.0000 | 1 | 3 | selenium 100.0000% /100 |
| 12 | parsley | 1.0000 | 1 | 1 | vitamin-c 100.0000% /100 |
| 13 | sunflower-seeds | 1.0000 | 1 | 2 | vitamin-e 100.0000% /100 |
| 14 | bell-peppers | 0.9602 | 1 | 1 | vitamin-c 96.0150% /100 |
| 15 | herring | 0.8741 | 2 | 2 | dha-docosahexaenoic-acid 43.1000% /100; epa-eicosapentaenoic-acid 44.3125% /100 |
| 16 | turmeric | 0.7743 | 2 | 1 | iron 44.4984% /100; manganese 32.9287% /100 |
| 17 | kidney | 0.7738 | 1 | 1 | vitamin-b2 77.3842% /100 |
| 18 | kale | 0.7023 | 1 | 1 | vitamin-c 70.2256% /100 |
| 19 | broccoli | 0.6707 | 1 | 1 | vitamin-c 67.0677% /100 |
| 20 | brussels-sprouts | 0.6391 | 1 | 1 | vitamin-c 63.9098% /100 |
| 21 | sardines | 0.5501 | 2 | 2 | dha-docosahexaenoic-acid 25.4500% /100; epa-eicosapentaenoic-acid 29.5625% /100 |
| 22 | wheat-germ | 0.5339 | 2 | 1 | manganese 22.1204% /100; zinc 31.2723% /100 |
| 23 | chicken-liver | 0.4845 | 1 | 1 | vitamin-b2 48.4469% /100 |
| 24 | tuna | 0.4450 | 1 | 2 | dha-docosahexaenoic-acid 44.5000% /100 |
| 25 | strawberries | 0.4421 | 1 | 1 | vitamin-c 44.2105% /100 |
| 26 | sesame-seeds | 0.4185 | 1 | 1 | copper 41.8452% /100 |
| 27 | oranges | 0.4000 | 1 | 1 | vitamin-c 40.0000% /100 |
| 28 | lemon | 0.3985 | 1 | 1 | vitamin-c 39.8496% /100 |
| 29 | cocoa | 0.3883 | 1 | 1 | copper 38.8314% /100 |
| 30 | cauliflower | 0.3624 | 1 | 1 | vitamin-c 36.2406% /100 |
| 31 | broccoli-sprouts | 0.3233 | 1 | 1 | vitamin-c 32.3308% /100 |
| 32 | watercress | 0.3233 | 1 | 1 | vitamin-c 32.3308% /100 |
| 33 | wasabi | 0.3150 | 1 | 1 | vitamin-c 31.5038% /100 |
| 34 | peas | 0.3008 | 1 | 1 | vitamin-c 30.0752% /100 |
| 35 | oregano | 0.2977 | 1 | 1 | iron 29.7735% /100 |
| 36 | cinnamon | 0.2905 | 1 | 1 | manganese 29.0471% /100 |
| 37 | cabbage | 0.2752 | 1 | 1 | vitamin-c 27.5188% /100 |
| 38 | dandelion-greens | 0.2632 | 1 | 1 | vitamin-c 26.3158% /100 |
| 39 | heart | 0.2469 | 1 | 1 | vitamin-b2 24.6866% /100 |
| 40 | peppermint | 0.2391 | 1 | 1 | vitamin-c 23.9098% /100 |
| 41 | soy | 0.2371 | 1 | 1 | vitamin-b2 23.7057% /100 |
| 42 | peanuts | 0.2368 | 1 | 2 | vitamin-e 23.6850% /100 |
| 43 | garlic | 0.2346 | 1 | 1 | vitamin-c 23.4586% /100 |
| 44 | sage | 0.2275 | 1 | 1 | iron 22.7508% /100 |
| 45 | swiss-chard | 0.2256 | 1 | 1 | vitamin-c 22.5564% /100 |
| 46 | cashews | 0.2250 | 1 | 1 | copper 22.5013% /100 |
| 47 | spinach | 0.2113 | 1 | 1 | vitamin-c 21.1278% /100 |
| 48 | cilantro | 0.2030 | 1 | 1 | vitamin-c 20.3008% /100 |

### upstream-shared

| Rank | Food | Score | Inputs | PM count | Input arithmetic (RSP ÷100) |
|---|---|---|---|---|---|
| 1 | pumpkin-seeds | 1.0000 | 1 | 2 | glycine 100.0000% /100 |
| 2 | sunflower-seeds | 0.7927 | 1 | 2 | glycine 79.2729% /100 |
| 3 | almonds | 0.7754 | 1 | 2 | glycine 77.5366% /100 |
| 4 | anchovies | 0.7526 | 1 | 2 | glycine 75.2577% /100 |
| 5 | beef | 0.6848 | 1 | 2 | glycine 68.4753% /100 |
| 6 | chicken | 0.6636 | 1 | 2 | glycine 66.3592% /100 |
| 7 | sardines | 0.6408 | 1 | 2 | glycine 64.0803% /100 |
| 8 | liver | 0.6316 | 1 | 2 | glycine 63.1579% /100 |
| 9 | tuna | 0.6077 | 1 | 2 | glycine 60.7705% /100 |
| 10 | pork | 0.5529 | 1 | 2 | glycine 55.2903% /100 |
| 11 | turkey | 0.5241 | 1 | 2 | glycine 52.4145% /100 |
| 12 | salmon | 0.5209 | 1 | 2 | glycine 52.0890% /100 |
| 13 | mackerel | 0.4845 | 1 | 2 | glycine 48.4536% /100 |
| 14 | herring | 0.4677 | 1 | 2 | glycine 46.7716% /100 |
| 15 | cod | 0.4639 | 1 | 2 | glycine 46.3918% /100 |
| 16 | chicken-liver | 0.4607 | 1 | 2 | glycine 46.0662% /100 |
| 17 | lamb | 0.4390 | 1 | 2 | glycine 43.8958% /100 |
| 18 | egg-yolks | 0.2648 | 1 | 2 | glycine 26.4786% /100 |
| 19 | eggs | 0.2344 | 1 | 2 | glycine 23.4400% /100 |

### combined

| Rank | Food | Score | Inputs | PM count | Input arithmetic (RSP ÷100) |
|---|---|---|---|---|---|
| 1 | liver | 2.3823 | 3 | 4 | copper 100.0000% /100; glycine 63.1579% /100; vitamin-b2 75.0681% /100 |
| 2 | salmon-roe | 2.2587 | 3 | 4 | dha-docosahexaenoic-acid 100.0000% /100; epa-eicosapentaenoic-acid 100.0000% /100; vitamin-e 25.8743% /100 |
| 3 | anchovies | 1.8755 | 3 | 4 | dha-docosahexaenoic-acid 64.6000% /100; epa-eicosapentaenoic-acid 47.6875% /100; glycine 75.2577% /100 |
| 4 | spirulina | 1.8559 | 3 | 2 | copper 62.5320% /100; iron 23.0583% /100; vitamin-b2 100.0000% /100 |
| 5 | almonds | 1.8142 | 3 | 4 | glycine 77.5366% /100; vitamin-b2 31.0082% /100; vitamin-e 72.8746% /100 |
| 6 | sunflower-seeds | 1.7927 | 2 | 4 | glycine 79.2729% /100; vitamin-e 100.0000% /100 |
| 7 | mackerel | 1.7463 | 3 | 4 | dha-docosahexaenoic-acid 70.0500% /100; epa-eicosapentaenoic-acid 56.1250% /100; glycine 48.4536% /100 |
| 8 | salmon | 1.6116 | 3 | 4 | dha-docosahexaenoic-acid 55.2000% /100; epa-eicosapentaenoic-acid 53.8750% /100; glycine 52.0890% /100 |
| 9 | thyme | 1.5886 | 3 | 3 | iron 100.0000% /100; vitamin-c 37.5940% /100; vitamin-e 21.2681% /100 |
| 10 | herring | 1.3418 | 3 | 4 | dha-docosahexaenoic-acid 43.1000% /100; epa-eicosapentaenoic-acid 44.3125% /100; glycine 46.7716% /100 |
| 11 | oysters | 1.2930 | 2 | 1 | copper 29.2978% /100; zinc 100.0000% /100 |
| 12 | cloves | 1.2508 | 2 | 3 | manganese 100.0000% /100; vitamin-e 25.0782% /100 |
| 13 | sardines | 1.1909 | 3 | 4 | dha-docosahexaenoic-acid 25.4500% /100; epa-eicosapentaenoic-acid 29.5625% /100; glycine 64.0803% /100 |
| 14 | tuna | 1.0527 | 2 | 4 | dha-docosahexaenoic-acid 44.5000% /100; glycine 60.7705% /100 |
| 15 | brazil-nuts | 1.0000 | 1 | 3 | selenium 100.0000% /100 |
| 16 | parsley | 1.0000 | 1 | 1 | vitamin-c 100.0000% /100 |
| 17 | pumpkin-seeds | 1.0000 | 1 | 2 | glycine 100.0000% /100 |
| 18 | bell-peppers | 0.9602 | 1 | 1 | vitamin-c 96.0150% /100 |
| 19 | chicken-liver | 0.9451 | 2 | 3 | glycine 46.0662% /100; vitamin-b2 48.4469% /100 |
| 20 | turmeric | 0.7743 | 2 | 1 | iron 44.4984% /100; manganese 32.9287% /100 |
| 21 | kidney | 0.7738 | 1 | 1 | vitamin-b2 77.3842% /100 |
| 22 | kale | 0.7023 | 1 | 1 | vitamin-c 70.2256% /100 |
| 23 | beef | 0.6848 | 1 | 2 | glycine 68.4753% /100 |
| 24 | broccoli | 0.6707 | 1 | 1 | vitamin-c 67.0677% /100 |
| 25 | chicken | 0.6636 | 1 | 2 | glycine 66.3592% /100 |
| 26 | brussels-sprouts | 0.6391 | 1 | 1 | vitamin-c 63.9098% /100 |
| 27 | pork | 0.5529 | 1 | 2 | glycine 55.2903% /100 |
| 28 | wheat-germ | 0.5339 | 2 | 1 | manganese 22.1204% /100; zinc 31.2723% /100 |
| 29 | turkey | 0.5241 | 1 | 2 | glycine 52.4145% /100 |
| 30 | cod | 0.4639 | 1 | 2 | glycine 46.3918% /100 |
| 31 | strawberries | 0.4421 | 1 | 1 | vitamin-c 44.2105% /100 |
| 32 | lamb | 0.4390 | 1 | 2 | glycine 43.8958% /100 |
| 33 | sesame-seeds | 0.4185 | 1 | 1 | copper 41.8452% /100 |
| 34 | oranges | 0.4000 | 1 | 1 | vitamin-c 40.0000% /100 |
| 35 | lemon | 0.3985 | 1 | 1 | vitamin-c 39.8496% /100 |
| 36 | cocoa | 0.3883 | 1 | 1 | copper 38.8314% /100 |
| 37 | cauliflower | 0.3624 | 1 | 1 | vitamin-c 36.2406% /100 |
| 38 | broccoli-sprouts | 0.3233 | 1 | 1 | vitamin-c 32.3308% /100 |
| 39 | watercress | 0.3233 | 1 | 1 | vitamin-c 32.3308% /100 |
| 40 | wasabi | 0.3150 | 1 | 1 | vitamin-c 31.5038% /100 |
| 41 | peas | 0.3008 | 1 | 1 | vitamin-c 30.0752% /100 |
| 42 | oregano | 0.2977 | 1 | 1 | iron 29.7735% /100 |
| 43 | cinnamon | 0.2905 | 1 | 1 | manganese 29.0471% /100 |
| 44 | cabbage | 0.2752 | 1 | 1 | vitamin-c 27.5188% /100 |
| 45 | egg-yolks | 0.2648 | 1 | 2 | glycine 26.4786% /100 |
| 46 | dandelion-greens | 0.2632 | 1 | 1 | vitamin-c 26.3158% /100 |
| 47 | heart | 0.2469 | 1 | 1 | vitamin-b2 24.6866% /100 |
| 48 | peppermint | 0.2391 | 1 | 1 | vitamin-c 23.9098% /100 |
| 49 | soy | 0.2371 | 1 | 1 | vitamin-b2 23.7057% /100 |
| 50 | peanuts | 0.2368 | 1 | 2 | vitamin-e 23.6850% /100 |
| 51 | garlic | 0.2346 | 1 | 1 | vitamin-c 23.4586% /100 |
| 52 | eggs | 0.2344 | 1 | 2 | glycine 23.4400% /100 |
| 53 | sage | 0.2275 | 1 | 1 | iron 22.7508% /100 |
| 54 | swiss-chard | 0.2256 | 1 | 1 | vitamin-c 22.5564% /100 |
| 55 | cashews | 0.2250 | 1 | 1 | copper 22.5013% /100 |
| 56 | spinach | 0.2113 | 1 | 1 | vitamin-c 21.1278% /100 |
| 57 | cilantro | 0.2030 | 1 | 1 | vitamin-c 20.3008% /100 |

## All retained component connections

★ marks the winning observation for its input in the combined view. Repeated ★ entries for a single input across PMs are the same supply contribution, not additional points. Per-view winner flags, quantities, evidence, limitations, exact source pointers and full precision are in components.json and analysis.json.

| Food | Input | RSP | PM / ownership | Winner | Amount and basis | Material / preparation | Source pointer | Publication |
|---|---|---|---|---|---|---|---|---|
| liver | copper | 100.0000 | BRS3-FM2-PM4 / A | ★ | 9.755 mg; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/copper_mg | listed-publication-pin-pending |
| spirulina | copper | 62.5320 | BRS3-FM2-PM4 / A | ★ | 6.1 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/copper_mg | pin-matched |
| sesame-seeds | copper | 41.8452 | BRS3-FM2-PM4 / A | ★ | 4.082 mg; per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/copper_mg | pin-matched |
| cocoa | copper | 38.8314 | BRS3-FM2-PM4 / A | ★ | 3.788 mg; per 100 g edible portion | Cocoa, dry powder, unsweetened / dry powder | docs/foods/cocoa.md#nutrition_per_100g/copper_mg | pin-matched |
| oysters | copper | 29.2978 | BRS3-FM2-PM4 / A | ★ | 2.858 mg; per 100 g edible portion | Mollusks, oyster, eastern, wild, raw / raw | docs/foods/oysters.md#nutrition_per_100g/copper_mg | pin-matched |
| cashews | copper | 22.5013 | BRS3-FM2-PM4 / A | ★ | 2.195 mg; per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/copper_mg | pin-matched |
| salmon-roe | dha-docosahexaenoic-acid | 100.0000 | BRS3-FM3-PM7 / A | ★ | 2000 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/dha_mg | pin-matched |
| salmon-roe | dha-docosahexaenoic-acid | 100.0000 | BRS3-FM3-PM8 / A | ★ | 2000 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/dha_mg | pin-matched |
| mackerel | dha-docosahexaenoic-acid | 70.0500 | BRS3-FM3-PM7 / A | ★ | 1401 mg; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| mackerel | dha-docosahexaenoic-acid | 70.0500 | BRS3-FM3-PM8 / A | ★ | 1401 mg; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| anchovies | dha-docosahexaenoic-acid | 64.6000 | BRS3-FM3-PM7 / A | ★ | 1292 mg; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned | docs/foods/anchovies.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| anchovies | dha-docosahexaenoic-acid | 64.6000 | BRS3-FM3-PM8 / A | ★ | 1292 mg; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned | docs/foods/anchovies.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| salmon | dha-docosahexaenoic-acid | 55.2000 | BRS3-FM3-PM7 / A | ★ | 1104 mg; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| salmon | dha-docosahexaenoic-acid | 55.2000 | BRS3-FM3-PM8 / A | ★ | 1104 mg; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| tuna | dha-docosahexaenoic-acid | 44.5000 | BRS3-FM3-PM7 / A | ★ | 890 mg; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| tuna | dha-docosahexaenoic-acid | 44.5000 | BRS3-FM3-PM8 / A | ★ | 890 mg; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| herring | dha-docosahexaenoic-acid | 43.1000 | BRS3-FM3-PM7 / A | ★ | 862 mg; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| herring | dha-docosahexaenoic-acid | 43.1000 | BRS3-FM3-PM8 / A | ★ | 862 mg; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| sardines | dha-docosahexaenoic-acid | 25.4500 | BRS3-FM3-PM7 / A | ★ | 509 mg; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| sardines | dha-docosahexaenoic-acid | 25.4500 | BRS3-FM3-PM8 / A | ★ | 509 mg; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| salmon-roe | epa-eicosapentaenoic-acid | 100.0000 | BRS3-FM3-PM8 / A | ★ | 1600 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/epa_mg | pin-matched |
| mackerel | epa-eicosapentaenoic-acid | 56.1250 | BRS3-FM3-PM8 / A | ★ | 898 mg; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_per_100g/epa_mg | listed-publication-pin-pending |
| salmon | epa-eicosapentaenoic-acid | 53.8750 | BRS3-FM3-PM8 / A | ★ | 862 mg; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/epa_mg | listed-publication-pin-pending |
| anchovies | epa-eicosapentaenoic-acid | 47.6875 | BRS3-FM3-PM8 / A | ★ | 763 mg; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned | docs/foods/anchovies.md#nutrition_per_100g/epa_mg | listed-publication-pin-pending |
| herring | epa-eicosapentaenoic-acid | 44.3125 | BRS3-FM3-PM8 / A | ★ | 709 mg; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/epa_mg | listed-publication-pin-pending |
| sardines | epa-eicosapentaenoic-acid | 29.5625 | BRS3-FM3-PM8 / A | ★ | 473 mg; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/epa_mg | listed-publication-pin-pending |
| pumpkin-seeds | glycine | 100.0000 | BRS3-FM1-PM1 / C | ★ | 1.843 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / Seeds, pumpkin and squash seed kernels, dried | docs/foods/pumpkin-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170556 | pin-matched |
| pumpkin-seeds | glycine | 100.0000 | BRS3-FM1-PM2 / C | ★ | 1.843 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / Seeds, pumpkin and squash seed kernels, dried | docs/foods/pumpkin-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170556 | pin-matched |
| sunflower-seeds | glycine | 79.2729 | BRS3-FM1-PM1 / C | ★ | 1.461 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / Seeds, sunflower seed kernels, dried | docs/foods/sunflower-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170562 | pin-matched |
| sunflower-seeds | glycine | 79.2729 | BRS3-FM1-PM2 / C | ★ | 1.461 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / Seeds, sunflower seed kernels, dried | docs/foods/sunflower-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170562 | pin-matched |
| almonds | glycine | 77.5366 | BRS3-FM1-PM1 / C | ★ | 1.429 g; per 100 g edible portion | Nuts, almonds / Nuts, almonds | docs/foods/almonds.md#nutrition_supplementary_sources/glycine_usda_review01_170567 | pin-matched |
| almonds | glycine | 77.5366 | BRS3-FM1-PM2 / C | ★ | 1.429 g; per 100 g edible portion | Nuts, almonds / Nuts, almonds | docs/foods/almonds.md#nutrition_supplementary_sources/glycine_usda_review01_170567 | pin-matched |
| anchovies | glycine | 75.2577 | BRS3-FM1-PM1 / C | ★ | 1.387 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/glycine_usda_brs2_174183 | listed-publication-pin-pending |
| anchovies | glycine | 75.2577 | BRS3-FM1-PM2 / C | ★ | 1.387 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/glycine_usda_brs2_174183 | listed-publication-pin-pending |
| beef | glycine | 68.4753 | BRS3-FM1-PM1 / C | ★ | 1.262 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) | docs/foods/beef.md#nutrition_supplementary_sources/glycine_usda_review01_171796 | listed-publication-pin-pending |
| beef | glycine | 68.4753 | BRS3-FM1-PM2 / C | ★ | 1.262 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) | docs/foods/beef.md#nutrition_supplementary_sources/glycine_usda_review01_171796 | listed-publication-pin-pending |
| chicken | glycine | 66.3592 | BRS3-FM1-PM1 / C | ★ | 1.223 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / Chicken, broilers or fryers, meat and skin, raw | docs/foods/chicken.md#nutrition_supplementary_sources/glycine_usda_review01_171447 | listed-publication-pin-pending |
| chicken | glycine | 66.3592 | BRS3-FM1-PM2 / C | ★ | 1.223 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / Chicken, broilers or fryers, meat and skin, raw | docs/foods/chicken.md#nutrition_supplementary_sources/glycine_usda_review01_171447 | listed-publication-pin-pending |
| sardines | glycine | 64.0803 | BRS3-FM1-PM1 / C | ★ | 1.181 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/glycine_usda_brs2_175139 | listed-publication-pin-pending |
| sardines | glycine | 64.0803 | BRS3-FM1-PM2 / C | ★ | 1.181 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/glycine_usda_brs2_175139 | listed-publication-pin-pending |
| liver | glycine | 63.1579 | BRS3-FM1-PM1 / C | ★ | 1.164 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/glycine_usda_brs2_169451 | listed-publication-pin-pending |
| liver | glycine | 63.1579 | BRS3-FM1-PM2 / C | ★ | 1.164 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/glycine_usda_brs2_169451 | listed-publication-pin-pending |
| tuna | glycine | 60.7705 | BRS3-FM1-PM1 / C | ★ | 1.12 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/glycine_usda_brs2_173706 | listed-publication-pin-pending |
| tuna | glycine | 60.7705 | BRS3-FM1-PM2 / C | ★ | 1.12 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/glycine_usda_brs2_173706 | listed-publication-pin-pending |
| pork | glycine | 55.2903 | BRS3-FM1-PM1 / C | ★ | 1.019 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/glycine_usda_brs2_167818 | listed-publication-pin-pending |
| pork | glycine | 55.2903 | BRS3-FM1-PM2 / C | ★ | 1.019 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/glycine_usda_brs2_167818 | listed-publication-pin-pending |
| turkey | glycine | 52.4145 | BRS3-FM1-PM1 / C | ★ | 0.966 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/glycine_usda_brs2_171480 | listed-publication-pin-pending |
| turkey | glycine | 52.4145 | BRS3-FM1-PM2 / C | ★ | 0.966 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/glycine_usda_brs2_171480 | listed-publication-pin-pending |
| salmon | glycine | 52.0890 | BRS3-FM1-PM1 / C | ★ | 0.96 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / Fish, salmon, Atlantic, farmed, raw | docs/foods/salmon.md#nutrition_supplementary_sources/glycine_usda_review01_175167 | listed-publication-pin-pending |
| salmon | glycine | 52.0890 | BRS3-FM1-PM2 / C | ★ | 0.96 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / Fish, salmon, Atlantic, farmed, raw | docs/foods/salmon.md#nutrition_supplementary_sources/glycine_usda_review01_175167 | listed-publication-pin-pending |
| mackerel | glycine | 48.4536 | BRS3-FM1-PM1 / C | ★ | 0.893 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/glycine_usda_brs2_175119 | listed-publication-pin-pending |
| mackerel | glycine | 48.4536 | BRS3-FM1-PM2 / C | ★ | 0.893 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/glycine_usda_brs2_175119 | listed-publication-pin-pending |
| herring | glycine | 46.7716 | BRS3-FM1-PM1 / C | ★ | 0.862 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/glycine_usda_brs2_175116 | listed-publication-pin-pending |
| herring | glycine | 46.7716 | BRS3-FM1-PM2 / C | ★ | 0.862 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/glycine_usda_brs2_175116 | listed-publication-pin-pending |
| cod | glycine | 46.3918 | BRS3-FM1-PM1 / C | ★ | 0.855 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/glycine_usda_brs2_171955 | listed-publication-pin-pending |
| cod | glycine | 46.3918 | BRS3-FM1-PM2 / C | ★ | 0.855 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/glycine_usda_brs2_171955 | listed-publication-pin-pending |
| chicken-liver | glycine | 46.0662 | BRS3-FM1-PM1 / C | ★ | 0.849 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/glycine_usda_brs2_171060 | listed-publication-pin-pending |
| chicken-liver | glycine | 46.0662 | BRS3-FM1-PM2 / C | ★ | 0.849 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/glycine_usda_brs2_171060 | listed-publication-pin-pending |
| lamb | glycine | 43.8958 | BRS3-FM1-PM1 / C | ★ | 0.809 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/glycine_usda_brs2_174370 | listed-publication-pin-pending |
| lamb | glycine | 43.8958 | BRS3-FM1-PM2 / C | ★ | 0.809 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/glycine_usda_brs2_174370 | listed-publication-pin-pending |
| egg-yolks | glycine | 26.4786 | BRS3-FM1-PM1 / C | ★ | 0.488 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/glycine_usda_brs2_172184 | listed-publication-pin-pending |
| egg-yolks | glycine | 26.4786 | BRS3-FM1-PM2 / C | ★ | 0.488 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/glycine_usda_brs2_172184 | listed-publication-pin-pending |
| eggs | glycine | 23.4400 | BRS3-FM1-PM1 / C | ★ | 0.432 g; per 100 g edible portion | Egg, whole, raw, fresh / Egg, whole, raw, fresh | docs/foods/eggs.md#nutrition_supplementary_sources/glycine_usda_review01_171287 | pin-matched |
| eggs | glycine | 23.4400 | BRS3-FM1-PM2 / C | ★ | 0.432 g; per 100 g edible portion | Egg, whole, raw, fresh / Egg, whole, raw, fresh | docs/foods/eggs.md#nutrition_supplementary_sources/glycine_usda_review01_171287 | pin-matched |
| thyme | iron | 100.0000 | BRS3-FM2-PM4 / A | ★ | 123.6 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/iron_mg | pin-matched |
| turmeric | iron | 44.4984 | BRS3-FM2-PM4 / A | ★ | 55 mg; per 100 g edible portion | Spices, turmeric, ground / not recorded | docs/foods/turmeric.md#nutrition_per_100g/iron_mg | pin-matched |
| oregano | iron | 29.7735 | BRS3-FM2-PM4 / A | ★ | 36.8 mg; per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/iron_mg | pin-matched |
| spirulina | iron | 23.0583 | BRS3-FM2-PM4 / A | ★ | 28.5 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/iron_mg | pin-matched |
| sage | iron | 22.7508 | BRS3-FM2-PM4 / A | ★ | 28.12 mg; per 100 g edible portion | Spices, sage, ground / not recorded | docs/foods/sage.md#nutrition_per_100g/iron_mg | pin-matched |
| cloves | manganese | 100.0000 | BRS3-FM2-PM4 / A | ★ | 60.13 mg; per 100 g edible portion | Spices, cloves, ground / not recorded | docs/foods/cloves.md#nutrition_per_100g/manganese_mg | pin-matched |
| turmeric | manganese | 32.9287 | BRS3-FM2-PM4 / A | ★ | 19.8 mg; per 100 g edible portion | Spices, turmeric, ground / not recorded | docs/foods/turmeric.md#nutrition_per_100g/manganese_mg | pin-matched |
| cinnamon | manganese | 29.0471 | BRS3-FM2-PM4 / A | ★ | 17.466 mg; per 100 g edible portion | Spices, cinnamon, ground / not recorded | docs/foods/cinnamon.md#nutrition_per_100g/manganese_mg | pin-matched |
| wheat-germ | manganese | 22.1204 | BRS3-FM2-PM4 / A | ★ | 13.301 mg; per 100 g edible portion | Wheat germ, crude / not recorded | docs/foods/wheat-germ.md#nutrition_per_100g/manganese_mg | pin-matched |
| brazil-nuts | selenium | 100.0000 | BRS3-FM2-PM4 / A | ★ | 1917 µg; per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/selenium_ug | pin-matched |
| brazil-nuts | selenium | 100.0000 | BRS3-FM2-PM5 / A | ★ | 1917 µg; per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/selenium_ug | pin-matched |
| brazil-nuts | selenium | 100.0000 | BRS3-FM2-PM6 / A | ★ | 1917 µg; per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/selenium_ug | pin-matched |
| spirulina | vitamin-b2 | 100.0000 | BRS3-FM2-PM6 / A | ★ | 3.67 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| kidney | vitamin-b2 | 77.3842 | BRS3-FM2-PM6 / A | ★ | 2.84 mg; per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| liver | vitamin-b2 | 75.0681 | BRS3-FM2-PM6 / A | ★ | 2.755 mg; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| chicken-liver | vitamin-b2 | 48.4469 | BRS3-FM2-PM6 / A | ★ | 1.778 mg; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| almonds | vitamin-b2 | 31.0082 | BRS3-FM2-PM6 / A | ★ | 1.138 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| heart | vitamin-b2 | 24.6866 | BRS3-FM2-PM6 / A | ★ | 0.906 mg; per 100 g edible portion | Beef, variety meats and by-products, heart, raw / raw | docs/foods/heart.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| soy | vitamin-b2 | 23.7057 | BRS3-FM2-PM6 / A | ★ | 0.87 mg; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| parsley | vitamin-c | 100.0000 | BRS3-FM2-PM6 / A | ★ | 133 mg; per 100 g edible portion | Parsley, fresh / not recorded | docs/foods/parsley.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| bell-peppers | vitamin-c | 96.0150 | BRS3-FM2-PM6 / A | ★ | 127.7 mg; per 100 g edible portion | Peppers, sweet, red, raw / raw | docs/foods/bell-peppers.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| kale | vitamin-c | 70.2256 | BRS3-FM2-PM6 / A | ★ | 93.4 mg; per 100 g edible portion | Kale, raw / raw | docs/foods/kale.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| broccoli | vitamin-c | 67.0677 | BRS3-FM2-PM6 / A | ★ | 89.2 mg; per 100 g edible portion | Broccoli, raw / raw | docs/foods/broccoli.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| brussels-sprouts | vitamin-c | 63.9098 | BRS3-FM2-PM6 / A | ★ | 85 mg; per 100 g edible portion | Brussels sprouts, raw / raw | docs/foods/brussels-sprouts.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| strawberries | vitamin-c | 44.2105 | BRS3-FM2-PM6 / A | ★ | 58.8 mg; per 100 g edible portion | Strawberries, raw / raw | docs/foods/strawberries.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| oranges | vitamin-c | 40.0000 | BRS3-FM2-PM6 / A | ★ | 53.2 mg; per 100 g edible portion | Oranges, raw, all commercial varieties / raw | docs/foods/oranges.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| lemon | vitamin-c | 39.8496 | BRS3-FM2-PM6 / A | ★ | 53 mg; per 100 g edible portion | Lemons, raw, without peel / raw | docs/foods/lemon.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| thyme | vitamin-c | 37.5940 | BRS3-FM2-PM6 / A | ★ | 50 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| cauliflower | vitamin-c | 36.2406 | BRS3-FM2-PM6 / A | ★ | 48.2 mg; per 100 g edible portion | Cauliflower, raw / raw | docs/foods/cauliflower.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| broccoli-sprouts | vitamin-c | 32.3308 | BRS3-FM2-PM6 / A | ★ | 43 mg; per 100 g edible portion | Broccoli sprouts, raw / raw | docs/foods/broccoli-sprouts.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| watercress | vitamin-c | 32.3308 | BRS3-FM2-PM6 / A | ★ | 43 mg; per 100 g edible portion | Watercress, raw / raw | docs/foods/watercress.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| wasabi | vitamin-c | 31.5038 | BRS3-FM2-PM6 / A | ★ | 41.9 mg; per 100 g edible portion | Wasabi, root, raw / raw | docs/foods/wasabi.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| peas | vitamin-c | 30.0752 | BRS3-FM2-PM6 / A | ★ | 40 mg; per 100 g edible portion | Peas, green, raw / raw | docs/foods/peas.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| cabbage | vitamin-c | 27.5188 | BRS3-FM2-PM6 / A | ★ | 36.6 mg; per 100 g edible portion | Cabbage, raw / raw | docs/foods/cabbage.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| dandelion-greens | vitamin-c | 26.3158 | BRS3-FM2-PM6 / A | ★ | 35 mg; per 100 g edible portion | Dandelion greens, raw / raw | docs/foods/dandelion-greens.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| peppermint | vitamin-c | 23.9098 | BRS3-FM2-PM6 / A | ★ | 31.8 mg; per 100 g edible portion | Peppermint, fresh / not recorded | docs/foods/peppermint.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| garlic | vitamin-c | 23.4586 | BRS3-FM2-PM6 / A | ★ | 31.2 mg; per 100 g edible portion | Garlic, raw / raw | docs/foods/garlic.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| swiss-chard | vitamin-c | 22.5564 | BRS3-FM2-PM6 / A | ★ | 30 mg; per 100 g edible portion | Chard, swiss, raw / raw | docs/foods/swiss-chard.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| spinach | vitamin-c | 21.1278 | BRS3-FM2-PM6 / A | ★ | 28.1 mg; per 100 g edible portion | Spinach, raw / raw | docs/foods/spinach.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| cilantro | vitamin-c | 20.3008 | BRS3-FM2-PM6 / A | ★ | 27 mg; per 100 g edible portion | Coriander (cilantro) leaves, raw / raw | docs/foods/cilantro.md#nutrition_per_100g/vitamin_c_mg | pin-matched |
| sunflower-seeds | vitamin-e | 100.0000 | BRS3-FM2-PM5 / A | ★ | 35.17 mg; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| sunflower-seeds | vitamin-e | 100.0000 | BRS3-FM2-PM6 / A | ★ | 35.17 mg; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| almonds | vitamin-e | 72.8746 | BRS3-FM2-PM5 / A | ★ | 25.63 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| almonds | vitamin-e | 72.8746 | BRS3-FM2-PM6 / A | ★ | 25.63 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| salmon-roe | vitamin-e | 25.8743 | BRS3-FM2-PM5 / A | ★ | 9.1 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| salmon-roe | vitamin-e | 25.8743 | BRS3-FM2-PM6 / A | ★ | 9.1 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| cloves | vitamin-e | 25.0782 | BRS3-FM2-PM5 / A | ★ | 8.82 mg; per 100 g edible portion | Spices, cloves, ground / not recorded | docs/foods/cloves.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| cloves | vitamin-e | 25.0782 | BRS3-FM2-PM6 / A | ★ | 8.82 mg; per 100 g edible portion | Spices, cloves, ground / not recorded | docs/foods/cloves.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| peanuts | vitamin-e | 23.6850 | BRS3-FM2-PM5 / A | ★ | 8.33 mg; per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| peanuts | vitamin-e | 23.6850 | BRS3-FM2-PM6 / A | ★ | 8.33 mg; per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| thyme | vitamin-e | 21.2681 | BRS3-FM2-PM5 / A | ★ | 7.48 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| thyme | vitamin-e | 21.2681 | BRS3-FM2-PM6 / A | ★ | 7.48 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| oysters | zinc | 100.0000 | BRS3-FM2-PM4 / A | ★ | 39.3 mg; per 100 g edible portion | Mollusks, oyster, eastern, wild, raw / raw | docs/foods/oysters.md#nutrition_per_100g/zinc_mg | pin-matched |
| wheat-germ | zinc | 31.2723 | BRS3-FM2-PM4 / A | ★ | 12.29 mg; per 100 g edible portion | Wheat germ, crude / not recorded | docs/foods/wheat-germ.md#nutrition_per_100g/zinc_mg | pin-matched |

## Admission and scientific limits

| Relationship | Input | Ownership | Eligibility / authority | Canonical source |
|---|---|---|---|---|
| BRS3-FM1-PM1::PM1-KC1-UPSTREAM-POOL | Glutathione precursor pool (cysteine and glycine) | D | excluded: dietary input is not Yes | docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx#pm_kc_relationships/PM1-KC1-UPSTREAM-POOL |
| BRS3-FM1-PM1::PM1-DIT-1 | Magnesium ions (Mg²⁺) | E | excluded: dietary input is not Yes | docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx#dietary_input_traceability/PM1-DIT-1 |
| BRS3-FM1-PM1::PM1-KC1-UPSTREAM-1 | Cysteine | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-1 |
| BRS3-FM1-PM1::PM1-KC1-UPSTREAM-2 | Glycine | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-2 |
| BRS3-FM1-PM2::PM2-KC1-UPSTREAM-POOL | Glutathione precursor pool (cysteine and glycine) | D | excluded: dietary input is not Yes | docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#pm_kc_relationships/PM2-KC1-UPSTREAM-POOL |
| BRS3-FM1-PM2::PM2-KC1-UPSTREAM-1 | Cysteine | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#dietary_input_traceability/PM2-KC1-UPSTREAM-1 |
| BRS3-FM1-PM2::PM2-KC1-UPSTREAM-2 | Glycine | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#dietary_input_traceability/PM2-KC1-UPSTREAM-2 |
| BRS3-FM1-PM2::PM2-DIT-RECOVERY-OLIGOFRUCTOSE | Oligofructose | A | eligible: explicit assessment | docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx#dietary_input_traceability/PM2-DIT-RECOVERY-OLIGOFRUCTOSE |
| BRS3-FM2-PM3::PM3-DIT-1 | Sulforaphane | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx#dietary_input_traceability/PM3-DIT-1 |
| BRS3-FM2-PM4::PM4-DIT-1 | Selenium | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx#dietary_input_traceability/PM4-DIT-1 |
| BRS3-FM2-PM4::PM4-DIT-2 | Zinc | A | eligible: explicit assessment | docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx#dietary_input_traceability/PM4-DIT-2 |
| BRS3-FM2-PM4::PM4-DIT-3 | Copper | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx#dietary_input_traceability/PM4-DIT-3 |
| BRS3-FM2-PM4::PM4-DIT-4 | Manganese | A | eligible: explicit assessment | docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx#dietary_input_traceability/PM4-DIT-4 |
| BRS3-FM2-PM4::PM4-DIT-5 | Glutathione | E | excluded: dietary input is not Yes | docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx#dietary_input_traceability/PM4-DIT-5 |
| BRS3-FM2-PM4::PM4-DIT-RECOVERY-IRON | Iron | A | eligible: explicit assessment | docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx#dietary_input_traceability/PM4-DIT-RECOVERY-IRON |
| BRS3-FM2-PM5::PM5-DIT-1 | Vitamin E | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx#dietary_input_traceability/PM5-DIT-1 |
| BRS3-FM2-PM5::PM5-DIT-RECOVERY-SELENIUM | Selenium | A | eligible: explicit assessment | docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx#dietary_input_traceability/PM5-DIT-RECOVERY-SELENIUM |
| BRS3-FM2-PM6::PM6-DIT-1 | Vitamin C | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx#dietary_input_traceability/PM6-DIT-1 |
| BRS3-FM2-PM6::PM6-DIT-2 | Vitamin E | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx#dietary_input_traceability/PM6-DIT-2 |
| BRS3-FM2-PM6::PM6-DIT-3 | Vitamin B2 | A | eligible: explicit assessment | docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx#dietary_input_traceability/PM6-DIT-3 |
| BRS3-FM2-PM6::PM6-DIT-4 | Flavin adenine dinucleotide | E | excluded: dietary input is not Yes | docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx#dietary_input_traceability/PM6-DIT-4 |
| BRS3-FM2-PM6::PM6-DIT-RECOVERY-SELENIUM | Selenium | A | eligible: explicit assessment | docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx#dietary_input_traceability/PM6-DIT-RECOVERY-SELENIUM |
| BRS3-FM3-PM7::PM7-DIT-RECOVERY-DHA-DOCOSAHEXAENOIC-ACID | DHA (Docosahexaenoic Acid) | A | eligible: explicit assessment | docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation.mdx#dietary_input_traceability/PM7-DIT-RECOVERY-DHA-DOCOSAHEXAENOIC-ACID |
| BRS3-FM3-PM8::PM8-DIT-1 | EPA | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance.mdx#dietary_input_traceability/PM8-DIT-1 |
| BRS3-FM3-PM8::PM8-DIT-2 | DHA | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance.mdx#dietary_input_traceability/PM8-DIT-2 |

Glycine and cysteine are accepted upstream resource relationships for PM1/PM2, not demonstrated individual dietary constraints or food-level NF-κB/endotoxin effects. Only glycine has rankable quantities here; its two upstream PM connections contribute once per food. Magnesium, endogenous glutathione and FAD entries designated No remain outside accepted dietary scoring.

Oligofructose remains subject to the existing experimental-exposure hold: ordinary food fructans are not substituted. Sulforaphane retains broccoli and broccoli-sprout occurrence/preparation evidence without a defensible comparable point RSP. Cysteine remains qualitative; USDA cystine is not silently converted or relabelled. These unscored relationships remain biologically documented, not zero-value biology.

### Unscored occurrence / missing-source cases

| Input | Food | Material | Reason |
|---|---|---|---|
| cysteine | chicken | Chicken, broilers or fryers, meat and skin, raw | No eligible comparable point score; original evidence retained |
| cysteine | eggs | Egg, whole, raw, fresh | No eligible comparable point score; original evidence retained |
| cysteine | lentils | Lentils, raw | No eligible comparable point score; original evidence retained |
| cysteine | lentils | Cooked Canadian whole green and split red lentils; separate dry-matter assay | No eligible comparable point score; original evidence retained |
| cysteine | liver | Beef, variety meats and by-products, liver, raw | No eligible comparable point score; original evidence retained |
| cysteine | oats | Oats (Includes foods for USDA's Food Distribution Program) | No eligible comparable point score; original evidence retained |
| cysteine | pork | Pork, fresh, loin, whole, separable lean and fat, raw | No eligible comparable point score; original evidence retained |
| cysteine | tuna | Fish, tuna, fresh, bluefin, raw | No eligible comparable point score; original evidence retained |
| oligofructose | none established | — | No qualifying source; existing target hold retained |
| sulforaphane | broccoli-sprouts | broccoli sprouts after tissue disruption | No eligible comparable point score; original evidence retained |
| sulforaphane | broccoli | UK mature broccoli, sous vide at 100 °C for 20 minutes, with and without 1 g brown mustard powder | No eligible comparable point score; original evidence retained |

### Quantitative exclusions

| Reason | Records |
|---|---|
| Below the provisional one-tenth threshold inside this basis. | 900 |
| Below inclusive analytical RSP 20 | 61 |
| Presence-only: no quantitative observation | 39 |
| Single-source comparison set: fewer than two distinct comparable foods | 16 |
| Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder | 7 |
| Whey-based beverage mix; undiluted formulation, separate product pool. | 5 |
| No authorised compatible comparison pool for this measurement basis | 4 |
| Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. | 4 |
| Branded broken-cell-wall chlorella powder; manufacturer serving declaration, separate product pool. | 1 |
| Isolated soybean lecithin emulsifier; separate ingredient-fraction pool. | 1 |

Every excluded record and publication exclusion is exported with its source pointer or food identity in analysis.json. `unscored_sources` includes below-threshold or restricted sources as well as qualitative/missing quantities; it must not be interpreted as all lacking measurements.

## Composition completeness

The bounded audit covered 21 existing meat/finfish/poultry/offal/roe/egg-yolk identities across 14 inputs (294 cells). Exact USDA descriptions and nutrient IDs were checked against the already retrieved SR Legacy archive, SHA-256 `b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0`. The archive originally came from https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip. This pass used 185 matching source rows; database-listed values are not asserted independently measured.

| Food | Mapped quantitative input cells | Qualitative input cells | Exact-source zero cells not recovered as positive | Unavailable / no supported record |
|---|---|---|---|---|
| anchovies | 10 | 0 | 1 | 3 |
| beef | 10 | 0 | 1 | 3 |
| chicken | 11 | 1 | 0 | 2 |
| chicken-liver | 9 | 0 | 2 | 3 |
| cod | 11 | 0 | 0 | 3 |
| dark-meat-poultry | 0 | 1 | 0 | 13 |
| heart | 8 | 0 | 2 | 4 |
| herring | 11 | 0 | 0 | 3 |
| kidney | 8 | 0 | 2 | 4 |
| lamb | 8 | 0 | 3 | 3 |
| liver | 9 | 1 | 2 | 2 |
| lumpfish-roe | 0 | 2 | 0 | 12 |
| mackerel | 11 | 0 | 0 | 3 |
| pork | 9 | 1 | 2 | 2 |
| salmon | 11 | 0 | 0 | 3 |
| salmon-roe | 9 | 0 | 0 | 5 |
| sardines | 10 | 0 | 1 | 3 |
| trout-roe | 0 | 2 | 0 | 12 |
| tuna | 10 | 1 | 1 | 2 |
| turkey | 9 | 0 | 2 | 3 |
| egg-yolks | 10 | 0 | 1 | 3 |

No positive missing value or discrepant existing panel value was found in the exact-source comparison. No food record changed. Missing local values were not replaced by zero: exact-source zeros are separately identified, and unavailable values remain unknown. Heart/kidney amino-acid gaps and roe identities without a matching USDA panel remain unresolved; no substitute food form was used. The inherited glycine recovery is not a complete assay inventory of all foods.

## Named food outcomes

| Food | PM-owned rank / score | Upstream rank / score | Combined rank / score | Combined inputs |
|---|---|---|---|---|
| beef | no retained score | 5 / 0.6848 | 23 / 0.6848 | glycine 68.4753% |
| herring | 15 / 0.8741 | 14 / 0.4677 | 10 / 1.3418 | dha-docosahexaenoic-acid 43.1000%; epa-eicosapentaenoic-acid 44.3125%; glycine 46.7716% |
| turkey | no retained score | 11 / 0.5241 | 29 / 0.5241 | glycine 52.4145% |
| sardines | 21 / 0.5501 | 7 / 0.6408 | 13 / 1.1909 | dha-docosahexaenoic-acid 25.4500%; epa-eicosapentaenoic-acid 29.5625%; glycine 64.0803% |
| egg-yolks | no retained score | 18 / 0.2648 | 45 / 0.2648 | glycine 26.4786% |
| sage | 44 / 0.2275 | no retained score | 53 / 0.2275 | iron 22.7508% |
| liver | 3 / 1.7507 | 8 / 0.6316 | 1 / 2.3823 | copper 100.0000%; glycine 63.1579%; vitamin-b2 75.0681% |
| bell-peppers | 14 / 0.9602 | no retained score | 18 / 0.9602 | vitamin-c 96.0150% |
| miso | no retained score | no retained score | no retained score | none ≥20 |

These orders follow the unchanged equation. BRS1 neurotransmitter precursor scores and BRS2 methylation scores are not imported into BRS3. Beef’s unresolved source-specific tryptophan discrepancy is preserved and is not a BRS3 scoring input. Egg-yolk amino-acid and choline relationships remain in the ontology even where not eligible BRS3 inputs.

## Comparison with frozen display snapshot

| Relationship | Input | Ownership | Frozen top-ten ≥10 rows | Current uncapped ≥10 | Current ≥20 component rows |
|---|---|---|---|---|---|
| BRS3-FM1-PM1::PM1-KC1-UPSTREAM-1 | cysteine | C | 0 | 0 | 0 |
| BRS3-FM1-PM1::PM1-KC1-UPSTREAM-2 | glycine | C | 7 | 19 | 19 |
| BRS3-FM1-PM2::PM2-KC1-UPSTREAM-1 | cysteine | C | 0 | 0 | 0 |
| BRS3-FM1-PM2::PM2-KC1-UPSTREAM-2 | glycine | C | 7 | 19 | 19 |
| BRS3-FM1-PM2::PM2-DIT-RECOVERY-OLIGOFRUCTOSE | oligofructose | A | 0 | 0 | 0 |
| BRS3-FM2-PM3::PM3-DIT-1 | sulforaphane | A | 0 | 0 | 0 |
| BRS3-FM2-PM4::PM4-DIT-1 | selenium | A | 1 | 1 | 1 |
| BRS3-FM2-PM4::PM4-DIT-2 | zinc | A | 10 | 19 | 2 |
| BRS3-FM2-PM4::PM4-DIT-3 | copper | A | 10 | 21 | 6 |
| BRS3-FM2-PM4::PM4-DIT-4 | manganese | A | 5 | 5 | 4 |
| BRS3-FM2-PM4::PM4-DIT-RECOVERY-IRON | iron | A | 9 | 9 | 5 |
| BRS3-FM2-PM5::PM5-DIT-1 | vitamin-e | A | 10 | 10 | 6 |
| BRS3-FM2-PM5::PM5-DIT-RECOVERY-SELENIUM | selenium | A | 1 | 1 | 1 |
| BRS3-FM2-PM6::PM6-DIT-1 | vitamin-c | A | 10 | 28 | 21 |
| BRS3-FM2-PM6::PM6-DIT-2 | vitamin-e | A | 10 | 10 | 6 |
| BRS3-FM2-PM6::PM6-DIT-3 | vitamin-b2 | A | 10 | 16 | 7 |
| BRS3-FM2-PM6::PM6-DIT-RECOVERY-SELENIUM | selenium | A | 1 | 1 | 1 |
| BRS3-FM3-PM7::PM7-DIT-RECOVERY-DHA-DOCOSAHEXAENOIC-ACID | dha-docosahexaenoic-acid | A | 8 | 8 | 7 |
| BRS3-FM3-PM8::PM8-DIT-1 | epa-eicosapentaenoic-acid | A | 9 | 9 | 6 |
| BRS3-FM3-PM8::PM8-DIT-2 | dha-docosahexaenoic-acid | A | 8 | 8 | 7 |

This is a change in analytical scope/threshold and inclusion of previously authorised local composition recovery, not a replacement of the published ranking. There was no previous BRS3 score under this equation to supersede. The pinned intake and current food/scientific records are identical.

## Distribution — presentation options only

| Candidate display criterion | Food count |
|---|---|
| all positive | 57 |
| 25% of leader | 26 |
| 50% of leader | 12 |
| 75% of leader | 6 |
| score ≥1 | 17 |
| score ≥1.5 | 9 |
| score ≥2 | 2 |

No final display cutoff adopted. Per-serving adequacy, safety limits, food-frequency advice, exposure optimisation, abacus/recipe changes and application to additional systems remain deferred.

## Validation

| Check | Result | Evidence |
|---|---|---|
| Independent direct aggregation of EVERY score and rank | PASS | 124 food/view scores and ranks reconstructed without scoreFoods() |
| Independent pre-cap qualification and RSP reconstruction | PASS | 84 >=20 food/form candidates; includes pools larger than ten |
| Observed quantities/preparations/protein match canonical records | PASS | 118 component rows checked against live canonical fields; no missing value is numeric zero |
| Exact-source completeness audit, without new source edits | PASS | 294 food/input cells; 185 exact USDA rows checked; no positive missing value or conflicting panel value recovered |
| Deduplication, overlap, sodium, inclusive threshold, ties | PASS | Synthetic boundary/tie/duplicate/ownership tests plus every real group |
| Incompatible pools never silently maximised | PASS | Conflicting input pools produce unresolved subtotal, not maximum |
| Shared selector default unchanged | PASS | Exact equality with HEAD implementation for all current BRS3 source pools |
| Frozen manifest, site data, PM records and scientific gates unchanged | PASS | Inherited tracked source/helper edits only; no PM, gate, manifest or generated-site changes. Intake preservation separately verifies no new source edits in BRS3. |
| Source hashes fresh | PASS | 353 source hashes match current candidate |
| BRS1 and BRS2 analyses preserved and scoring unchanged | PASS | 414 prior food/view results identical; 33 prior artifacts byte-identical |
| All intake scientific/source records and publication pins preserved | PASS | 369 pinned intake files unchanged; only common scorer scope guard extended |
| BRS3 ownership, held material and nonoverlapping input protection | PASS | Glycine counted once despite two upstream PMs; held/unrankable inputs have no points; no numerical cap exclusion or incompatible-pool maximum |

Existing focused regressions: publication-source contract 3/3 PASS (publication-tests.txt); Nrf2 compound/SOP separation 1/1 PASS, with 40 unrelated tests explicitly skipped (nrf2-test.txt).

## Changed files and delivery

Only the analysis guard in `review/analytical-rollup/score.mjs` was extended to accept BRS3; equations are unchanged. New artifacts are confined to `review/brs3-analytical-rollup-2026-11-16/`, with a bounded holding-page/handoff note. BRS1/BRS2 reports, scripts, configurations and exports remain byte-identical. Source corrections: none in this pass. Full inventory: changed-files.json.

No site build, regeneration, admission/rating/SEC change, publication-pin replacement, QC reactivation, commit, push, merge or deployment. Full-site/historical suites were not rerun or represented as passing. Local analytical checks are not a release-readiness declaration.
