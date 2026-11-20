# BRS5 analytical source strength and biological coverage

17 November 2026. Local provisional analysis, not food quality, dietary adequacy, safety or demonstrated efficacy.

## Pinned inputs

Checkout: `/Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science`

Branch: `review/pm8-caffeine-neuroeshot-2026-11-16`; commit: `d67c181ff6ebec80873e4da581af759e8e98199c`. Intake working-tree state and hashes: intake.json. Extraction source hash: `92c4976b28f069dbf983cacf1e8dbdd04ed3de4fa37a2f8f7c4799ba69f7b92c`. Frozen site snapshot: `682e4da0617af57788a83135d36947f31658dbe3d5b8c1ae6cc60245d66056c7` (unchanged). Prior uncommitted BRS1–4 records and analyses are preserved.

## Equations and scope

Existing builder/scorer, analysis-only, pre-display-cap pools. RSP = 100 × comparable concentration / highest eligible comparable concentration (`src/data/relatedSubstanceRelationships.mjs`, via `src/data/rankedFoodSources.mjs`). Existing identity, source, publication, chemical-form, preparation and measurement-basis restrictions apply. At least two independent foods are needed in the comparison pool, not necessarily above the cutoff.

Retain unrounded RSP ≥20 inclusively, with no food cap. Score = sum of distinct non-overlapping input contributions RSP/100; PM counts do not multiply points. The approved EAA/tyrosine/tryptophan/phenylalanine group contributes its maximum once; only tryptophan qualifies in BRS5. Sodium remains excluded from this analysis only and has no retained row. Full precision is used; display is rounded and equal scores use canonical food ID.

PM-owned A and upstream/shared B/C/D remain separate; combined deduplicates inputs across ownership, rather than adding separate scores. Source strength and single-system coverage coincide. Unsupported multiple comparison pools are held rather than silently maximised. No conversion yield, ordinary-food equivalence, strain inheritance or parent-to-experimental-child transfer is inferred.

## Counts and coverage limitation

| Measure | Count |
|---|---|
| PMs examined | 8 |
| Structured records examined | 42 |
| Eligible resolved relationships before food-ranking restrictions | 20 |
| Resolved input identities | 15 |
| Unresolved Yes input identities | 3 |
| Pre-cap candidate food/input/form rows ≥10 | 76 |
| Candidate food/input/form rows ≥20 | 42 |
| Component rows before / after sodium exclusion | 42 / 42 |
| Inputs supplying numerical points | 4 |

| View | Eligible relationships | Scored foods | Food/material contexts | Food–PM pairs | PMs reached numerically |
|---|---|---|---|---|---|
| PM-owned | 17 | 31 | 36 | 38 | 3 |
| upstream-shared | 3 | 0 | 0 | 0 | 0 |
| combined | 20 | 31 | 36 | 38 | 3 |

**The zero upstream score is not an absence of upstream relationships.** Three eligible upstream records remain: FOS/GOS preparation, pectin and resistant starch. They lack admissible comparable numerical food scores under the existing restrictions. Most BRS5 food biology is consequently not represented by this quantitative score. Four inputs—tryptophan, linoleic acid, vitamin A and zinc—supply all points. This is a limited source-strength summary, not a complete ranking of gut-health foods.

## Candidate pools

| Input | Source contexts | Observations | Uncapped ≥10 | Retained ≥20 | Reference food(s) |
|---|---|---|---|---|---|
| arabinan | 1 | 0 | 0 | 0 | no rankable pool |
| ellagic-acid | 1 | 1 | 0 | 0 | no rankable pool |
| ellagitannins | 2 | 1 | 0 | 0 | no rankable pool |
| epicatechin | 7 | 3 | 0 | 0 | no rankable pool |
| fructo-galacto-oligosaccharides | 0 | 0 | 0 | 0 | no rankable pool |
| glucose | 2 | 2 | 0 | 0 | no rankable pool |
| glutamine | 3 | 1 | 0 | 0 | no rankable pool |
| inulin | 1 | 1 | 0 | 0 | no rankable pool |
| linoleic-acid | 129 | 129 | 17 | 11 | walnuts |
| oligofructose | 0 | 0 | 0 | 0 | no rankable pool |
| pectin | 5 | 0 | 0 | 0 | no rankable pool |
| resistant-starch | 4 | 4 | 0 | 0 | no rankable pool |
| tryptophan | 37 | 37 | 32 | 27 | soy |
| vitamin-a | 93 | 92 | 8 | 2 | liver |
| zinc | 149 | 145 | 19 | 2 | oysters |

## PM-owned — full ranking

| Rank | Food | Score | Scoring inputs | PMs | Profile | Arithmetic (RSP /100) |
|---|---|---|---|---|---|---|
| 1 | pumpkin-seeds | 1.5172 | 2 | 2 | single recorded material | linoleic-acid 54.2541% /100; protein-amino-acid-supply 97.4619% /100 |
| 2 | liver | 1.4450 | 2 | 2 | single recorded material | protein-amino-acid-supply 44.5008% /100; vitamin-a 100.0000% /100 |
| 3 | soy | 1.2605 | 2 | 2 | single recorded material | linoleic-acid 26.0547% /100; protein-amino-acid-supply 100.0000% /100 |
| 4 | sunflower-seeds | 1.1939 | 2 | 2 | single recorded material | linoleic-acid 60.5098% /100; protein-amino-acid-supply 58.8832% /100 |
| 5 | oysters | 1.0000 | 1 | 1 | single recorded material | zinc 100.0000% /100 |
| 6 | walnuts | 1.0000 | 1 | 1 | single recorded material | linoleic-acid 100.0000% /100 |
| 7 | chicken-liver | 0.9612 | 2 | 2 | single recorded material | protein-amino-acid-supply 29.7800% /100; vitamin-a 66.3446% /100 |
| 8 | cheddar-cheese | 0.9255 | 1 | 1 | single recorded material | protein-amino-acid-supply 92.5550% /100 |
| 9 | peanuts | 0.7975 | 2 | 2 | COMPOSITE | linoleic-acid 40.8343% /100; protein-amino-acid-supply 38.9171% /100 |
| 10 | almonds | 0.6804 | 2 | 2 | single recorded material | linoleic-acid 32.3419% /100; protein-amino-acid-supply 35.7022% /100 |
| 11 | chicken | 0.6125 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 61.2521% /100 |
| 12 | tahini | 0.6073 | 1 | 1 | single recorded material | linoleic-acid 60.7277% /100 |
| 13 | sesame-seeds | 0.5611 | 1 | 1 | single recorded material | linoleic-acid 56.1127% /100 |
| 14 | anchovies | 0.5482 | 1 | 1 | single recorded material | protein-amino-acid-supply 54.8223% /100 |
| 15 | turkey | 0.4856 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 48.5618% /100 |
| 16 | sardines | 0.4670 | 1 | 1 | single recorded material | protein-amino-acid-supply 46.7005% /100 |
| 17 | mussels | 0.4518 | 1 | 1 | single recorded material | protein-amino-acid-supply 45.1777% /100 |
| 18 | tuna | 0.4416 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 44.1624% /100 |
| 19 | salmon | 0.4196 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 41.9628% /100 |
| 20 | pork | 0.4129 | 1 | 1 | single recorded material | protein-amino-acid-supply 41.2860% /100 |
| 21 | tofu | 0.3976 | 1 | 1 | single recorded material | protein-amino-acid-supply 39.7631% /100 |
| 22 | pistachios | 0.3699 | 1 | 1 | single recorded material | linoleic-acid 36.9910% /100 |
| 23 | mackerel | 0.3519 | 1 | 1 | single recorded material | protein-amino-acid-supply 35.1946% /100 |
| 24 | herring | 0.3401 | 1 | 1 | single recorded material | protein-amino-acid-supply 34.0102% /100 |
| 25 | cod | 0.3367 | 1 | 1 | single recorded material | protein-amino-acid-supply 33.6717% /100 |
| 26 | avocado-oil | 0.3289 | 1 | 1 | single recorded material | linoleic-acid 32.8932% /100 |
| 27 | lamb | 0.3266 | 1 | 1 | single recorded material | protein-amino-acid-supply 32.6565% /100 |
| 28 | wheat-germ | 0.3127 | 1 | 1 | single recorded material | zinc 31.2723% /100 |
| 29 | egg-yolks | 0.2995 | 1 | 1 | single recorded material | protein-amino-acid-supply 29.9492% /100 |
| 30 | eggs | 0.2589 | 1 | 1 | single recorded material | protein-amino-acid-supply 25.8883% /100 |
| 31 | cashews | 0.2043 | 1 | 1 | single recorded material | linoleic-acid 20.4290% /100 |

## upstream-shared — full ranking

No numerical score; the three qualified upstream relationships remain documented below.

## combined — full ranking

| Rank | Food | Score | Scoring inputs | PMs | Profile | Arithmetic (RSP /100) |
|---|---|---|---|---|---|---|
| 1 | pumpkin-seeds | 1.5172 | 2 | 2 | single recorded material | linoleic-acid 54.2541% /100; protein-amino-acid-supply 97.4619% /100 |
| 2 | liver | 1.4450 | 2 | 2 | single recorded material | protein-amino-acid-supply 44.5008% /100; vitamin-a 100.0000% /100 |
| 3 | soy | 1.2605 | 2 | 2 | single recorded material | linoleic-acid 26.0547% /100; protein-amino-acid-supply 100.0000% /100 |
| 4 | sunflower-seeds | 1.1939 | 2 | 2 | single recorded material | linoleic-acid 60.5098% /100; protein-amino-acid-supply 58.8832% /100 |
| 5 | oysters | 1.0000 | 1 | 1 | single recorded material | zinc 100.0000% /100 |
| 6 | walnuts | 1.0000 | 1 | 1 | single recorded material | linoleic-acid 100.0000% /100 |
| 7 | chicken-liver | 0.9612 | 2 | 2 | single recorded material | protein-amino-acid-supply 29.7800% /100; vitamin-a 66.3446% /100 |
| 8 | cheddar-cheese | 0.9255 | 1 | 1 | single recorded material | protein-amino-acid-supply 92.5550% /100 |
| 9 | peanuts | 0.7975 | 2 | 2 | COMPOSITE | linoleic-acid 40.8343% /100; protein-amino-acid-supply 38.9171% /100 |
| 10 | almonds | 0.6804 | 2 | 2 | single recorded material | linoleic-acid 32.3419% /100; protein-amino-acid-supply 35.7022% /100 |
| 11 | chicken | 0.6125 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 61.2521% /100 |
| 12 | tahini | 0.6073 | 1 | 1 | single recorded material | linoleic-acid 60.7277% /100 |
| 13 | sesame-seeds | 0.5611 | 1 | 1 | single recorded material | linoleic-acid 56.1127% /100 |
| 14 | anchovies | 0.5482 | 1 | 1 | single recorded material | protein-amino-acid-supply 54.8223% /100 |
| 15 | turkey | 0.4856 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 48.5618% /100 |
| 16 | sardines | 0.4670 | 1 | 1 | single recorded material | protein-amino-acid-supply 46.7005% /100 |
| 17 | mussels | 0.4518 | 1 | 1 | single recorded material | protein-amino-acid-supply 45.1777% /100 |
| 18 | tuna | 0.4416 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 44.1624% /100 |
| 19 | salmon | 0.4196 | 1 | 1 | COMPOSITE | protein-amino-acid-supply 41.9628% /100 |
| 20 | pork | 0.4129 | 1 | 1 | single recorded material | protein-amino-acid-supply 41.2860% /100 |
| 21 | tofu | 0.3976 | 1 | 1 | single recorded material | protein-amino-acid-supply 39.7631% /100 |
| 22 | pistachios | 0.3699 | 1 | 1 | single recorded material | linoleic-acid 36.9910% /100 |
| 23 | mackerel | 0.3519 | 1 | 1 | single recorded material | protein-amino-acid-supply 35.1946% /100 |
| 24 | herring | 0.3401 | 1 | 1 | single recorded material | protein-amino-acid-supply 34.0102% /100 |
| 25 | cod | 0.3367 | 1 | 1 | single recorded material | protein-amino-acid-supply 33.6717% /100 |
| 26 | avocado-oil | 0.3289 | 1 | 1 | single recorded material | linoleic-acid 32.8932% /100 |
| 27 | lamb | 0.3266 | 1 | 1 | single recorded material | protein-amino-acid-supply 32.6565% /100 |
| 28 | wheat-germ | 0.3127 | 1 | 1 | single recorded material | zinc 31.2723% /100 |
| 29 | egg-yolks | 0.2995 | 1 | 1 | single recorded material | protein-amino-acid-supply 29.9492% /100 |
| 30 | eggs | 0.2589 | 1 | 1 | single recorded material | protein-amino-acid-supply 25.8883% /100 |
| 31 | cashews | 0.2043 | 1 | 1 | single recorded material | linoleic-acid 20.4290% /100 |

## All components and source forms

★ indicates a winning observation within its scoring input. All components and their per-view markers are exported in components.json; precise source evidence remains in analysis.json. A repeated PM link is not an extra quantity. Food-ID composite profiles, if present, are not interchangeable servings.

| Food | Substance | RSP | PM / ownership | Winner | Quantity / basis | Material / preparation | Source | Publication |
|---|---|---|---|---|---|---|---|---|
| walnuts | linoleic-acid | 100.0000 | BRS5-FM3-PM7 / A | ★ | 38.093 g; per 100 g edible portion | Nuts, walnuts, english / not recorded | docs/foods/walnuts.md#nutrition_per_100g/linoleic_g | pin-matched |
| tahini | linoleic-acid | 60.7277 | BRS5-FM3-PM7 / A | ★ | 23.133 g; per 100 g edible portion | Seeds, sesame butter, tahini, from roasted and toasted kernels (most common type) / roasted | docs/foods/tahini.md#nutrition_per_100g/linoleic_g | pin-matched |
| sunflower-seeds | linoleic-acid | 60.5098 | BRS5-FM3-PM7 / A | ★ | 23.05 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/linoleic_g | pin-matched |
| sesame-seeds | linoleic-acid | 56.1127 | BRS5-FM3-PM7 / A | ★ | 21.375 g; per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/linoleic_g | pin-matched |
| pumpkin-seeds | linoleic-acid | 54.2541 | BRS5-FM3-PM7 / A | ★ | 20.667 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/linoleic_g | pin-matched |
| peanuts | linoleic-acid | 40.8343 | BRS5-FM3-PM7 / A | ★ | 15.555 g; per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/linoleic_g | pin-matched |
| pistachios | linoleic-acid | 36.9910 | BRS5-FM3-PM7 / A | ★ | 14.091 g; per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/linoleic_g | pin-matched |
| avocado-oil | linoleic-acid | 32.8932 | BRS5-FM3-PM7 / A | ★ | 12.53 g; per 100 g edible portion | Oil, avocado / Oil | docs/foods/avocado-oil.md#nutrition_per_100g/linoleic_g | pin-matched |
| almonds | linoleic-acid | 32.3419 | BRS5-FM3-PM7 / A | ★ | 12.32 g; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/linoleic_g | pin-matched |
| soy | linoleic-acid | 26.0547 | BRS5-FM3-PM7 / A | ★ | 9.925 g; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/linoleic_g | pin-matched |
| cashews | linoleic-acid | 20.4290 | BRS5-FM3-PM7 / A | ★ | 7.782 g; per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/linoleic_g | pin-matched |
| soy | tryptophan | 100.0000 | BRS5-FM3-PM8 / A | ★ | 0.591 g; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/tryptophan_g | pin-matched |
| pumpkin-seeds | tryptophan | 97.4619 | BRS5-FM3-PM8 / A | ★ | 0.576 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/tryptophan_g | pin-matched |
| cheddar-cheese | tryptophan | 92.5550 | BRS5-FM3-PM8 / A | ★ | 0.547 g; per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/tryptophan | pin-matched |
| chicken | tryptophan | 61.2521 | BRS5-FM3-PM8 / A | ★ | 0.362 g; per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/tryptophan | listed-publication-pin-pending |
| sunflower-seeds | tryptophan | 58.8832 | BRS5-FM3-PM8 / A | ★ | 0.348 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/tryptophan | pin-matched |
| anchovies | tryptophan | 54.8223 | BRS5-FM3-PM8 / A | ★ | 0.324 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/tryptophan | listed-publication-pin-pending |
| turkey | tryptophan | 48.5618 | BRS5-FM3-PM8 / A | ★ | 0.287 g; per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/tryptophan | listed-publication-pin-pending |
| sardines | tryptophan | 46.7005 | BRS5-FM3-PM8 / A | ★ | 0.276 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/tryptophan | listed-publication-pin-pending |
| mussels | tryptophan | 45.1777 | BRS5-FM3-PM8 / A | ★ | 0.267 g; per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/tryptophan | pin-matched |
| liver | tryptophan | 44.5008 | BRS5-FM3-PM8 / A | ★ | 0.263 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/tryptophan | listed-publication-pin-pending |
| tuna | tryptophan | 44.1624 | BRS5-FM3-PM8 / A | ★ | 0.261 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173706/amino_acids/tryptophan | listed-publication-pin-pending |
| salmon | tryptophan | 41.9628 | BRS5-FM3-PM8 / A | ★ | 0.248 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/tryptophan | listed-publication-pin-pending |
| pork | tryptophan | 41.2860 | BRS5-FM3-PM8 / A | ★ | 0.244 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/tryptophan | listed-publication-pin-pending |
| turkey | tryptophan | 40.7783 | BRS5-FM3-PM8 / A |  | 0.241 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_per_100g/tryptophan_g | listed-publication-pin-pending |
| tofu | tryptophan | 39.7631 | BRS5-FM3-PM8 / A | ★ | 0.235 g; per 100 g edible portion | Tofu, raw, firm, prepared with calcium sulfate / firm, calcium-set | docs/foods/tofu.md#nutrition_amino_acid_profiles/usda-sr-172475/amino_acids/tryptophan | pin-matched |
| peanuts | tryptophan | 38.9171 | BRS5-FM3-PM8 / A | ★ | 0.23 g; per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/tryptophan | pin-matched |
| almonds | tryptophan | 35.7022 | BRS5-FM3-PM8 / A | ★ | 0.211 g; per 100 g edible portion | Nuts, almonds / raw | docs/foods/almonds.md#nutrition_amino_acid_profiles/usda-sr-170567/amino_acids/tryptophan | pin-matched |
| salmon | tryptophan | 35.3638 | BRS5-FM3-PM8 / A |  | 0.209 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175167/amino_acids/tryptophan | listed-publication-pin-pending |
| tuna | tryptophan | 35.3638 | BRS5-FM3-PM8 / A |  | 0.209 g; per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/tryptophan | listed-publication-pin-pending |
| mackerel | tryptophan | 35.1946 | BRS5-FM3-PM8 / A | ★ | 0.208 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/tryptophan | listed-publication-pin-pending |
| chicken | tryptophan | 35.0254 | BRS5-FM3-PM8 / A |  | 0.207 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171447/amino_acids/tryptophan | listed-publication-pin-pending |
| herring | tryptophan | 34.0102 | BRS5-FM3-PM8 / A | ★ | 0.201 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/tryptophan | listed-publication-pin-pending |
| cod | tryptophan | 33.6717 | BRS5-FM3-PM8 / A | ★ | 0.199 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/tryptophan | listed-publication-pin-pending |
| lamb | tryptophan | 32.6565 | BRS5-FM3-PM8 / A | ★ | 0.193 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/tryptophan | listed-publication-pin-pending |
| egg-yolks | tryptophan | 29.9492 | BRS5-FM3-PM8 / A | ★ | 0.177 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/tryptophan | listed-publication-pin-pending |
| chicken-liver | tryptophan | 29.7800 | BRS5-FM3-PM8 / A | ★ | 0.176 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/tryptophan | listed-publication-pin-pending |
| eggs | tryptophan | 25.8883 | BRS5-FM3-PM8 / A | ★ | 0.153 g; per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/tryptophan | pin-matched |
| liver | vitamin-a | 100.0000 | BRS5-FM1-PM1 / A | ★ | 4968 µg; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_a_rae_ug | listed-publication-pin-pending |
| chicken-liver | vitamin-a | 66.3446 | BRS5-FM1-PM1 / A | ★ | 3296 µg; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_a_rae_ug | listed-publication-pin-pending |
| oysters | zinc | 100.0000 | BRS5-FM1-PM1 / A | ★ | 39.3 mg; per 100 g edible portion | Mollusks, oyster, eastern, wild, raw / raw | docs/foods/oysters.md#nutrition_per_100g/zinc_mg | pin-matched |
| wheat-germ | zinc | 31.2723 | BRS5-FM1-PM1 / A | ★ | 12.29 mg; per 100 g edible portion | Wheat germ, crude / not recorded | docs/foods/wheat-germ.md#nutrition_per_100g/zinc_mg | pin-matched |

| Composite food ID | Recorded materials |
|---|---|
| peanuts | Peanuts, all types, dry-roasted, without salt; Peanuts, all types, raw |
| chicken | Chicken, broilers or fryers, breast, meat only, cooked, roasted; Chicken, broilers or fryers, meat and skin, raw |
| turkey | Turkey, whole, breast, meat only, cooked, roasted; Turkey, whole, meat only, raw |
| tuna | Fish, tuna, fresh, bluefin, raw; Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) |
| salmon | Fish, salmon, Atlantic, farmed, cooked, dry heat; Fish, salmon, Atlantic, farmed, raw |

## Admission and exclusion inventory

| Relationship | Input | Ownership | Disposition | Source |
|---|---|---|---|---|
| BRS5-FM1-PM1::PM1-KC1-SUPPLY | Fermentable fibre resource pool | D | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#pm_kc_relationships/PM1-KC1-SUPPLY |
| BRS5-FM1-PM1::PM1-DIT-1 | Butyrate | A | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-1 |
| BRS5-FM1-PM1::PM1-DIT-2 | Fermentable dietary fibre | A | excluded: unresolved dietary identity | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-2 |
| BRS5-FM1-PM1::PM1-DIT-3 | Retinoic acid | A | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-3 |
| BRS5-FM1-PM1::PM1-DIT-4 | Vitamin A | A | eligible: explicit assessment | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-4 |
| BRS5-FM1-PM1::PM1-DIT-5 | Zinc | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-5 |
| BRS5-FM1-PM1::PM1-DIT-6 | Glutamine | A | eligible: explicit assessment | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-DIT-6 |
| BRS5-FM1-PM1::PM1-KC1-UPSTREAM-1 | FOS/GOS | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-1 |
| BRS5-FM1-PM1::PM1-KC1-UPSTREAM-2 | Pectin | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-2 |
| BRS5-FM1-PM1::PM1-KC1-UPSTREAM-3 | Resistant starch | C | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx#dietary_input_traceability/PM1-KC1-UPSTREAM-3 |
| BRS5-FM1-PM2::PM2-DIT-1 | Oligofructose | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-1 |
| BRS5-FM1-PM2::PM2-DIT-2 | Type 2 resistant starch (tested aged-mouse exposure) | A | excluded: publication hold | docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-2 |
| BRS5-FM1-PM2::PM2-DIT-3 | Fish-oil-containing meal (tested comparison) | A | excluded: unresolved dietary identity | docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-3 |
| BRS5-FM1-PM2::PM2-DIT-4 | Milk-fat physical structure (tested comparison) | A | excluded: unresolved dietary identity | docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-4 |
| BRS5-FM1-PM2::PM2-DIT-5 | Zinc | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-5 |
| BRS5-FM1-PM2::PM2-DIT-6 | Magnesium | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm1/brs5-fm1-pm2-lps-endotoxin-containment.mdx#dietary_input_traceability/PM2-DIT-6 |
| BRS5-FM1-PM3::PM3-DIT-1 | Oligofructose-enriched inulin | A | excluded: publication hold | docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support.mdx#dietary_input_traceability/PM3-DIT-1 |
| BRS5-FM1-PM3::PM3-DIT-2 | Bifidobacterium longum NCC2705 | A | excluded: publication hold | docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support.mdx#dietary_input_traceability/PM3-DIT-2 |
| BRS5-FM2-PM4::PM4-KC1-SUPPLY | Fermentable fibre resource pool | D | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#pm_kc_relationships/PM4-KC1-SUPPLY |
| BRS5-FM2-PM4::PM4-DIT-1 | Pea-fibre arabinan | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-1 |
| BRS5-FM2-PM4::PM4-DIT-2 | Citrus pectin | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-2 |
| BRS5-FM2-PM4::PM4-DIT-3 | Resistant starch (RS2/RS3) | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-3 |
| BRS5-FM2-PM4::PM4-DIT-DEFERRED-1 | Inulin | A | eligible: explicit assessment | docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx#dietary_input_traceability/PM4-DIT-DEFERRED-1 |
| BRS5-FM2-PM5::PM5-KC1-SUPPLY | Fermentable fibre resource pool | D | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#pm_kc_relationships/PM5-KC1-SUPPLY |
| BRS5-FM2-PM5::PM5-DIT-1 | Resistant starch | A | eligible: explicit assessment | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-1 |
| BRS5-FM2-PM5::PM5-DIT-2 | Fructo-oligosaccharides / galacto-oligosaccharides (studied preparation) | A | excluded: explicit unresolved | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-2 |
| BRS5-FM2-PM5::PM5-DIT-3 | Pectin | A | eligible: explicit assessment | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-3 |
| BRS5-FM2-PM5::PM5-DIT-4 | Acetate | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-4 |
| BRS5-FM2-PM5::PM5-DIT-5 | Propionate | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-5 |
| BRS5-FM2-PM5::PM5-DIT-6 | Butyrate | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-6 |
| BRS5-FM2-PM5::PM5-DIT-RECOVERY-INULIN | Inulin | A | eligible: explicit assessment | docs/biological-targets/brs5/fm2/brs5-fm2-pm5-scfa-production-and-signalling.mdx#dietary_input_traceability/PM5-DIT-RECOVERY-INULIN |
| BRS5-FM2-PM6::PM6-DIT-1 | Ellagic acid | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx#dietary_input_traceability/PM6-DIT-1 |
| BRS5-FM2-PM6::PM6-DIT-2 | Ellagitannins | A | eligible: explicit assessment | docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx#dietary_input_traceability/PM6-DIT-2 |
| BRS5-FM2-PM6::PM6-DIT-RECOVERY-EPICATECHIN | Epicatechin | A | eligible: explicit assessment | docs/biological-targets/brs5/fm2/brs5-fm2-pm6-polyphenol-biotransformation-and-mitochondrial-relevant-metabolite-generation.mdx#dietary_input_traceability/PM6-DIT-RECOVERY-EPICATECHIN |
| BRS5-FM3-PM7::PM7-DIT-1 | Lactobacillus rhamnosus JB-1 | A | excluded: publication hold | docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx#dietary_input_traceability/PM7-DIT-1 |
| BRS5-FM3-PM7::PM7-DIT-2 | Glucose | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx#dietary_input_traceability/PM7-DIT-2 |
| BRS5-FM3-PM7::PM7-DIT-3 | Glutamate | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx#dietary_input_traceability/PM7-DIT-3 |
| BRS5-FM3-PM7::PM7-DIT-DEFERRED-1 | Linoleic acid | A | eligible: explicit assessment | docs/biological-targets/brs5/fm3/brs5-fm3-pm7-vagal-ens-signalling-modulation.mdx#dietary_input_traceability/PM7-DIT-DEFERRED-1 |
| BRS5-FM3-PM8::PM8-KC1-SUPPLY | Fermentable fibre resource pool | D | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability.mdx#pm_kc_relationships/PM8-KC1-SUPPLY |
| BRS5-FM3-PM8::PM8-DIT-1 | Tryptophan | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability.mdx#dietary_input_traceability/PM8-DIT-1 |
| BRS5-FM3-PM8::PM8-DIT-2 | Apple pectin (studied preparation) | A | excluded: publication hold | docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability.mdx#dietary_input_traceability/PM8-DIT-2 |
| BRS5-FM3-PM8::PM8-DIT-3 | Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor) | E | excluded: dietary input is not Yes | docs/biological-targets/brs5/fm3/brs5-fm3-pm8-neurotransmitter-precursor-biotransformation-and-availability.mdx#dietary_input_traceability/PM8-DIT-3 |

The three unresolved identities are retained explicitly, not converted into nutrient or food equivalents. The PM5 FOS/GOS assessment is explicitly unresolved while a separately preserved PM1 upstream record has its own historical status; the latter still has a food-ranking hold. No adjudication was performed.

Five exact experimental child identities remain excluded from ranked ordinary-food projection. Their separate written-evidence publication permissions are not revoked or treated as food-composition admissions. Hypotheses do not enter accepted food points. The existing ellagitannin conversion restrictions and preparation/strain boundaries remain intact.

## Documented but unscored sources

These are source-context inventories, not a blanket claim that every food qualifies for every PM using the parent substance. PM-specific material restrictions still apply.

| Input | Recorded food contexts | Reasons |
|---|---|---|
| arabinan | peas | Presence-only: no quantitative observation |
| ellagic-acid | pomegranates | No authorised compatible comparison pool for this measurement basis |
| ellagitannins | pomegranates, walnuts | No authorised compatible comparison pool for this measurement basis; Presence-only: no quantitative observation |
| epicatechin | cacao-nibs-raw, cacao-powder, cocoa, dark-chocolate | Presence-only: no quantitative observation; Unverified or held canonical quantity |
| fructo-galacto-oligosaccharides | none | No eligible numerical source; retain applicable target hold |
| glucose | bananas, grapes | No authorised compatible comparison pool for this measurement basis |
| glutamine | beef, eggs, tofu | Presence-only: no quantitative observation; No authorised compatible comparison pool for this measurement basis |
| inulin | asparagus | No authorised compatible comparison pool for this measurement basis |
| oligofructose | none | No eligible numerical source; retain applicable target hold |
| pectin | apples, lemon, oranges, pears | Presence-only: no quantitative observation |
| resistant-starch | bananas, black-beans, chickpeas, potatoes | Measurement range; no point ranking or midpoint substitution |

Resistant-starch observations retain their ranges and exact preparation; no midpoint or fresh/dry-weight equivalence is invented. Pectin parent occurrence does not make the tested apple/citrus preparations interchangeable. Glutamine retains estimated/qualitative distinctions; glutamate is not a substitute. Inulin’s dry-matter measurement is not compared with edible-weight concentrations. Glucose remains non-rankable for its sensory-stimulus PM. Epicatechin and ellagitannin quantities/occurrences retain their source-specific restrictions. These cases are unscored, not biological zeros.

| BRS5 target hold | Canonical rationale |
|---|---|
| BRS5-FM1-PM1 / fructo-galacto-oligosaccharides | The record owns the tested combined preparation, not individual native FOS/GOS. Ordinary-food ranking would substitute constituents for the mixture. The pre-existing admission-review flag remains unchanged. |
| BRS5-FM1-PM2 / oligofructose | Both PM records own a defined experimental oligofructose exposure and explicitly disclaim ordinary-food equivalence. Do not rank food fructans as equivalent to that exposure. |
| BRS5-FM2-PM4 / arabinan | Canonical input is pea-fibre arabinan in the tested preparation. Apple cell-wall arabinan cannot stand in for this material. |
| BRS5-FM2-PM4 / pectin | Canonical input is specifically citrus pectin. Four general-food total-pectic measurements do not establish the admitted citrus material. |
| BRS5-FM2-PM5 / fructo-galacto-oligosaccharides | The record owns the tested combined preparation, not individual native FOS/GOS. Ordinary-food ranking would substitute constituents for the mixture. The pre-existing admission-review flag remains unchanged. |
| BRS5-FM3-PM7 / glucose | PM owns a luminal glucose sensory stimulus in a mouse circuit, not a nutritional requirement. Highest-glucose foods are not an evidence-based optimisation ranking. |

| Numerical exclusion reason | Records |
|---|---|
| Below the provisional one-tenth threshold inside this basis. | 315 |
| Below inclusive analytical RSP 20 | 34 |
| Presence-only: no quantitative observation | 18 |
| No authorised compatible comparison pool for this measurement basis | 6 |
| Measurement range; no point ranking or midpoint substitution | 4 |
| Unverified or held canonical quantity | 3 |
| Single-source comparison set: fewer than two distinct comparable foods | 3 |
| Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder | 2 |
| Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. | 2 |
| Whey-based beverage mix; undiluted formulation, separate product pool. | 2 |
| Isolated soybean lecithin emulsifier; separate ingredient-fraction pool. | 1 |

Full row-level exclusions, publication exclusions and unscored source contexts are in analysis.json. Its unscored_sources field includes below-threshold/restricted observations as well as missing quantities; those categories must not be conflated.

## Composition completeness

The same 21 meat/fish/poultry/offal/roe/egg-yolk identities were checked across the 15 eligible input identities (315 cells). No new food corrections were needed. Previously recovered tryptophan profiles are consumed through the existing analysis-only opt-in; the low beef value and its discrepancy remain unchanged. Heart/kidney and unmatched roe gaps remain unresolved, not zero or substituted from another food.

USDA archive: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip ; SHA-256 `b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0`. Original nutrient definitions and source rows are exported. Vitamin A RAE is retained as recorded. USDA nutrient 1269 is PUFA 18:2: existing canonical linoleic mappings are preserved, but this generic label is not used to create any new isomer-specific observation. This is a provenance limitation, not a new chemical adjudication. Glutamine cannot be recovered from standard glutamic-acid data.

| Food | Quantitative mapped input cells | Qualitative input cells | Unresolved/unavailable |
|---|---|---|---|
| anchovies | 4 | 0 | 11 |
| beef | 4 | 1 | 10 |
| chicken | 4 | 0 | 11 |
| chicken-liver | 4 | 0 | 11 |
| cod | 4 | 0 | 11 |
| dark-meat-poultry | 0 | 0 | 15 |
| heart | 2 | 0 | 12 |
| herring | 4 | 0 | 11 |
| kidney | 3 | 0 | 12 |
| lamb | 3 | 0 | 11 |
| liver | 4 | 0 | 11 |
| lumpfish-roe | 0 | 0 | 15 |
| mackerel | 4 | 0 | 11 |
| pork | 4 | 0 | 11 |
| salmon | 4 | 0 | 11 |
| salmon-roe | 3 | 0 | 12 |
| sardines | 4 | 0 | 11 |
| trout-roe | 0 | 0 | 15 |
| tuna | 4 | 0 | 11 |
| turkey | 4 | 0 | 11 |
| egg-yolks | 4 | 0 | 11 |

## Differences from intake and display snapshot

The saved default intake has 30 retained rows and 24 scored foods; analysis-only recovery gives 42 rows and 31 foods. The difference is existing per-100-g tryptophan profile activation, not new BRS5 composition records or admissions. No earlier BRS5 analytical score is presented as an approved baseline.

| Food | Intake/default rank | Intake/default score | Current rank | Current score | Difference |
|---|---|---|---|---|---|
| pumpkin-seeds | 1 | 1.5172 | 1 | 1.5172 | 0.0000 |
| liver | 4 | 1.0000 | 2 | 1.4450 | 0.4450 |
| soy | 2 | 1.2605 | 3 | 1.2605 | 0.0000 |
| sunflower-seeds | 3 | 1.1939 | 4 | 1.1939 | 0.0000 |
| oysters | 5 | 1.0000 | 5 | 1.0000 | 0.0000 |
| walnuts | 6 | 1.0000 | 6 | 1.0000 | 0.0000 |
| chicken-liver | 10 | 0.6634 | 7 | 0.9612 | 0.2978 |
| cheddar-cheese | 7 | 0.9255 | 8 | 0.9255 | 0.0000 |
| peanuts | 8 | 0.7975 | 9 | 0.7975 | 0.0000 |
| almonds | 9 | 0.6804 | 10 | 0.6804 | 0.0000 |
| chicken | 11 | 0.6125 | 11 | 0.6125 | 0.0000 |
| tahini | 12 | 0.6073 | 12 | 0.6073 | 0.0000 |
| sesame-seeds | 13 | 0.5611 | 13 | 0.5611 | 0.0000 |
| anchovies | not recorded | — | 14 | 0.5482 | 0.5482 |
| turkey | 14 | 0.4856 | 15 | 0.4856 | 0.0000 |
| sardines | 15 | 0.4670 | 16 | 0.4670 | 0.0000 |
| mussels | 16 | 0.4518 | 17 | 0.4518 | 0.0000 |
| tuna | 20 | 0.3536 | 18 | 0.4416 | 0.0880 |
| salmon | 17 | 0.4196 | 19 | 0.4196 | 0.0000 |
| pork | not recorded | — | 20 | 0.4129 | 0.4129 |
| tofu | 18 | 0.3976 | 21 | 0.3976 | 0.0000 |
| pistachios | 19 | 0.3699 | 22 | 0.3699 | 0.0000 |
| mackerel | not recorded | — | 23 | 0.3519 | 0.3519 |
| herring | not recorded | — | 24 | 0.3401 | 0.3401 |
| cod | not recorded | — | 25 | 0.3367 | 0.3367 |
| avocado-oil | 21 | 0.3289 | 26 | 0.3289 | 0.0000 |
| lamb | not recorded | — | 27 | 0.3266 | 0.3266 |
| wheat-germ | 22 | 0.3127 | 28 | 0.3127 | 0.0000 |
| egg-yolks | not recorded | — | 29 | 0.2995 | 0.2995 |
| eggs | 23 | 0.2589 | 30 | 0.2589 | 0.0000 |
| cashews | 24 | 0.2043 | 31 | 0.2043 | 0.0000 |

| Relationship | Frozen display-selected rows | Current analytical rows |
|---|---|---|
| BRS5-FM1-PM1::PM1-DIT-4 | 8 | 2 |
| BRS5-FM1-PM1::PM1-DIT-5 | 10 | 2 |
| BRS5-FM1-PM1::PM1-DIT-6 | 0 | 0 |
| BRS5-FM1-PM1::PM1-KC1-UPSTREAM-1 | 0 | 0 |
| BRS5-FM1-PM1::PM1-KC1-UPSTREAM-2 | 0 | 0 |
| BRS5-FM1-PM1::PM1-KC1-UPSTREAM-3 | 0 | 0 |
| BRS5-FM1-PM2::PM2-DIT-1 | 0 | 0 |
| BRS5-FM2-PM4::PM4-DIT-1 | 0 | 0 |
| BRS5-FM2-PM4::PM4-DIT-2 | 0 | 0 |
| BRS5-FM2-PM4::PM4-DIT-3 | 0 | 0 |
| BRS5-FM2-PM4::PM4-DIT-DEFERRED-1 | 0 | 0 |
| BRS5-FM2-PM5::PM5-DIT-1 | 0 | 0 |
| BRS5-FM2-PM5::PM5-DIT-3 | 0 | 0 |
| BRS5-FM2-PM5::PM5-DIT-RECOVERY-INULIN | 0 | 0 |
| BRS5-FM2-PM6::PM6-DIT-1 | 0 | 0 |
| BRS5-FM2-PM6::PM6-DIT-2 | 0 | 0 |
| BRS5-FM2-PM6::PM6-DIT-RECOVERY-EPICATECHIN | 0 | 0 |
| BRS5-FM3-PM7::PM7-DIT-2 | 0 | 0 |
| BRS5-FM3-PM7::PM7-DIT-DEFERRED-1 | 10 | 11 |
| BRS5-FM3-PM8::PM8-DIT-1 | 10 | 27 |

Frozen display rules are top-ten ≥10; this analysis is uncapped ≥20 and includes previously authorised publication-pending corrections. No frozen output was replaced. The strict-pin-matched sensitivity only omits pending rows at current powers; it is not an alternative reranked reference pool.

## Requested food examples

| Food | Rank / score | Scoring inputs |
|---|---|---|
| beef | no retained score | none ≥20 |
| herring | 24 / 0.3401 | protein-amino-acid-supply 34.0102% |
| turkey | 15 / 0.4856 | protein-amino-acid-supply 48.5618% |
| sardines | 16 / 0.4670 | protein-amino-acid-supply 46.7005% |
| egg-yolks | 29 / 0.2995 | protein-amino-acid-supply 29.9492% |
| sage | no retained score | none ≥20 |
| liver | 2 / 1.4450 | protein-amino-acid-supply 44.5008%; vitamin-a 100.0000% |
| bell-peppers | no retained score | none ≥20 |
| miso | no retained score | none ≥20 |

## Distribution — no final cutoff adopted

| Candidate presentation criterion | Foods |
|---|---|
| all positive | 31 |
| score ≥0.5 | 14 |
| score ≥1 | 6 |
| score ≥1.5 | 1 |
| 25% of leader | 21 |
| 50% of leader | 9 |
| 75% of leader | 4 |

Portion-aware relevance, intake targets, frequency/safety recommendations, exposure optimisation, recipe/abacus work and additional systems remain deferred. Unrankable fermentable substrates cannot be treated as unimportant simply because they earn no numerical points.

## Verification

| Check | Status | Evidence |
|---|---|---|
| Independent direct aggregation of EVERY score and rank | PASS | 62 food/view scores and ranks reconstructed without scoreFoods() |
| Independent pre-cap qualification and RSP reconstruction | PASS | 42 >=20 food/form candidates; includes pools larger than ten |
| Observed quantities/preparations/protein match canonical records | PASS | 42 component rows checked against live canonical fields; no missing value is numeric zero |
| Bounded completeness audit and no source edits | PASS | 315 food/input cells; no exact-source positive omission requiring correction; 18:2 identity limitation retained |
| Deduplication, overlap, sodium, inclusive threshold, ties | PASS | Synthetic boundary/tie/duplicate/ownership tests plus every real group |
| Incompatible pools never silently maximised | PASS | Conflicting input pools produce unresolved subtotal, not maximum |
| Shared selector default unchanged | PASS | Exact equality with HEAD implementation for all current BRS5 source pools |
| Frozen manifest, site data, PM records and scientific gates unchanged | PASS | Inherited tracked source/helper edits only; no PM, gate, manifest or generated-site changes. Intake preservation separately verifies no new source edits in BRS5. |
| Source hashes fresh | PASS | 354 source hashes match current candidate |
| BRS1–4 analyses preserved and scoring unchanged | PASS | 626 prior food/view results identical; 71 prior artifacts byte-identical |
| All intake scientific/source records and publication pins preserved | PASS | 407 pinned intake files unchanged; only analytical scope guards extended |
| BRS5 holds, upstream zero scores, hypotheses and experimental identities | PASS | Three eligible upstream records retained without points; five experimental identities remain outside ranked food graph; no glucose, conversion or hypothesis points |

Publication contract tests: see publication-tests.txt. Whole-site/historical suites were not run or claimed passing. Source corrections in this pass: none. Changed-file inventory: changed-files.json. BRS1–4 artifacts, canonical food records, PM admissions, SEC/ratings, approved source manifest, frozen snapshots and QC suspension are preserved. Only analysis scope guards and local report artifacts changed; no site regeneration/build, commit, push, merge or deployment.
