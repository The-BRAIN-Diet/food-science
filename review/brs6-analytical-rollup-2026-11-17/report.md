# BRS6 analytical source strength and biological coverage

17 November 2026. Local provisional peer-review analysis, not food quality, nutritional adequacy, safety, recommended intake or demonstrated efficacy.

## Pinned inputs

Checkout: `/Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science`

Branch: `review/pm8-caffeine-neuroeshot-2026-11-16`; commit: `d67c181ff6ebec80873e4da581af759e8e98199c`. Intake state/hashes: intake.json. Source hash: `01453108eba66b914765fed1f2f1f0b5c7f9892bb4682e8e2a9fbbe94088ad8d`. Frozen site snapshot: `682e4da0617af57788a83135d36947f31658dbe3d5b8c1ae6cc60245d66056c7` (unchanged). BRS1–5 uncommitted work is preserved.

## Equations and selection

The existing canonical builder and scorer extract comparable pools in memory, before display caps. RSP = 100 × concentration / highest eligible comparable concentration (`src/data/relatedSubstanceRelationships.mjs` via `src/data/rankedFoodSources.mjs`). Existing admissions, historical pins, ownership, source eligibility, chemical identity, reference-pool, publication and preparation/measurement-basis restrictions apply. No broad ontology qualification or new food equivalence is introduced.

- Retain stored unrounded RSP ≥20 inclusively, with no numerical food cap. The existing ≥10 intermediate floor cannot remove a ≥20 connection.
- Score = sum of distinct non-overlapping input contributions RSP/100. PM counts do not multiply supply points. Source strength and single-system coverage coincide.
- The approved EAA/tryptophan/tyrosine/phenylalanine max-once group is unchanged and dormant here. No new conversion equivalence is invented.
- PM-owned A, upstream/shared B/C/D and combined are distinct views. Combined deduplicates across ownership, rather than adding scores.
- Sodium remains excluded from analytical points only; it has no BRS6 eligible row.
- Full precision is used; table rounding is display-only. Equal scores use canonical food ID.
- At least two distinct comparable foods are required before cutoff. Incompatible pools/ranges remain held; no midpoint, unit assumption or source-form merger.

No composition-only amino-acid option is needed for BRS6. The only shared-code change in this pass is allowing BRS6 in the local analytical scorer’s scope guard; its equations are unchanged.

## Counts and interpretive limit

| Measure | Count |
|---|---|
| PMs examined | 8 |
| Structured dietary relationships | 5 |
| Eligible resolved relationships | 5 |
| Distinct input identities | 5 |
| Unresolved structured identities | 0 |
| Uncapped food/input/form candidates ≥10 | 55 |
| Candidates ≥20 | 40 |
| Component rows before / after sodium exclusion | 40 / 40 |

| View | Eligible relationships | Scored foods | Food/material contexts | Food–PM pairs | PMs reached numerically |
|---|---|---|---|---|---|
| PM-owned | 5 | 40 | 40 | 40 | 2 |
| upstream-shared | 0 | 0 | 0 | 0 | 0 |
| combined | 5 | 40 | 40 | 40 | 2 |

Only magnesium and DHA supply numerical points. Resistant starch, ellagitannins and urolithin A retain their admissions and qualifications without points. All five structured relationships are PM-owned; upstream/shared is genuinely empty in this extraction. Six other PMs have no structured accepted dietary inputs in the current builder inventory; narrative mentions are not converted into admissions. This is not proof that those mechanisms cannot be influenced by diet, SOPs or lifestyle.

| PM lacking structured dietary admissions | Recorded gap |
|---|---|
| BRS6-FM1-PM1 | No structured accepted dietary inputs; narrative mentions are not admissions. |
| BRS6-FM1-PM2 | No structured accepted dietary inputs; narrative mentions are not admissions. |
| BRS6-FM2-PM4 | No structured accepted dietary inputs; narrative mentions are not admissions. |
| BRS6-FM3-PM6 | No structured accepted dietary inputs; narrative mentions are not admissions. |
| BRS6-FM3-PM7 | No structured accepted dietary inputs; narrative mentions are not admissions. |
| BRS6-FM4-PM9 | No structured accepted dietary inputs; narrative mentions are not admissions. |

## Comparable pools

| Input | Source contexts | Observations | Uncapped ≥10 | Retained ≥20 | Reference foods |
|---|---|---|---|---|---|
| dha-docosahexaenoic-acid | 24 | 21 | 8 | 7 | salmon-roe |
| ellagitannins | 2 | 1 | 0 | 0 | no rankable pool |
| magnesium | 147 | 142 | 47 | 33 | pumpkin-seeds |
| resistant-starch | 4 | 4 | 0 | 0 | no rankable pool |
| urolithin-a | 0 | 0 | 0 | 0 | no rankable pool |

## PM-owned — full ranking

| Rank | Food ID | Score | Inputs | PM count | Profile | Arithmetic |
|---|---|---|---|---|---|---|
| 1 | pumpkin-seeds | 1.0000 | 1 | 1 | single recorded material | magnesium 100.0000% /100 |
| 2 | salmon-roe | 1.0000 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 100.0000% /100 |
| 3 | cocoa | 0.8429 | 1 | 1 | single recorded material | magnesium 84.2905% /100 |
| 4 | sage | 0.7230 | 1 | 1 | single recorded material | magnesium 72.2973% /100 |
| 5 | mackerel | 0.7005 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 70.0500% /100 |
| 6 | flax-seeds | 0.6622 | 1 | 1 | single recorded material | magnesium 66.2162% /100 |
| 7 | anchovies | 0.6460 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 64.6000% /100 |
| 8 | brazil-nuts | 0.6351 | 1 | 1 | single recorded material | magnesium 63.5135% /100 |
| 9 | sesame-seeds | 0.5929 | 1 | 1 | single recorded material | magnesium 59.2905% /100 |
| 10 | chia-seeds | 0.5659 | 1 | 1 | single recorded material | magnesium 56.5878% /100 |
| 11 | salmon | 0.5520 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 55.2000% /100 |
| 12 | sunflower-seeds | 0.5490 | 1 | 1 | single recorded material | magnesium 54.8986% /100 |
| 13 | cashews | 0.4932 | 1 | 1 | single recorded material | magnesium 49.3243% /100 |
| 14 | soy | 0.4730 | 1 | 1 | single recorded material | magnesium 47.2973% /100 |
| 15 | almonds | 0.4561 | 1 | 1 | single recorded material | magnesium 45.6081% /100 |
| 16 | oregano | 0.4561 | 1 | 1 | single recorded material | magnesium 45.6081% /100 |
| 17 | saffron | 0.4459 | 1 | 1 | single recorded material | magnesium 44.5946% /100 |
| 18 | tuna | 0.4450 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 44.5000% /100 |
| 19 | cloves | 0.4375 | 1 | 1 | single recorded material | magnesium 43.7500% /100 |
| 20 | herring | 0.4310 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 43.1000% /100 |
| 21 | amaranth | 0.4189 | 1 | 1 | single recorded material | magnesium 41.8919% /100 |
| 22 | wheat-germ | 0.4037 | 1 | 1 | single recorded material | magnesium 40.3716% /100 |
| 23 | buckwheat | 0.3902 | 1 | 1 | single recorded material | magnesium 39.0203% /100 |
| 24 | dark-chocolate | 0.3851 | 1 | 1 | single recorded material | magnesium 38.5135% /100 |
| 25 | thyme | 0.3716 | 1 | 1 | single recorded material | magnesium 37.1622% /100 |
| 26 | turmeric | 0.3514 | 1 | 1 | single recorded material | magnesium 35.1351% /100 |
| 27 | lupins | 0.3345 | 1 | 1 | single recorded material | magnesium 33.4459% /100 |
| 28 | quinoa | 0.3328 | 1 | 1 | single recorded material | magnesium 33.2770% /100 |
| 29 | spirulina | 0.3294 | 1 | 1 | single recorded material | magnesium 32.9392% /100 |
| 30 | oats | 0.2990 | 1 | 1 | single recorded material | magnesium 29.8986% /100 |
| 31 | black-beans | 0.2889 | 1 | 1 | single recorded material | magnesium 28.8851% /100 |
| 32 | black-pepper | 0.2889 | 1 | 1 | single recorded material | magnesium 28.8851% /100 |
| 33 | peanuts | 0.2838 | 1 | 1 | single recorded material | magnesium 28.3784% /100 |
| 34 | walnuts | 0.2669 | 1 | 1 | single recorded material | magnesium 26.6892% /100 |
| 35 | sardines | 0.2545 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 25.4500% /100 |
| 36 | kidney-beans | 0.2365 | 1 | 1 | single recorded material | magnesium 23.6486% /100 |
| 37 | spelt | 0.2297 | 1 | 1 | single recorded material | magnesium 22.9730% /100 |
| 38 | barley | 0.2247 | 1 | 1 | single recorded material | magnesium 22.4662% /100 |
| 39 | wheat | 0.2128 | 1 | 1 | single recorded material | magnesium 21.2838% /100 |
| 40 | pistachios | 0.2044 | 1 | 1 | single recorded material | magnesium 20.4392% /100 |

## upstream-shared — full ranking

No eligible upstream/shared records or numerical scores. No ownership inference was made from biochemical dependencies.

## combined — full ranking

| Rank | Food ID | Score | Inputs | PM count | Profile | Arithmetic |
|---|---|---|---|---|---|---|
| 1 | pumpkin-seeds | 1.0000 | 1 | 1 | single recorded material | magnesium 100.0000% /100 |
| 2 | salmon-roe | 1.0000 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 100.0000% /100 |
| 3 | cocoa | 0.8429 | 1 | 1 | single recorded material | magnesium 84.2905% /100 |
| 4 | sage | 0.7230 | 1 | 1 | single recorded material | magnesium 72.2973% /100 |
| 5 | mackerel | 0.7005 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 70.0500% /100 |
| 6 | flax-seeds | 0.6622 | 1 | 1 | single recorded material | magnesium 66.2162% /100 |
| 7 | anchovies | 0.6460 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 64.6000% /100 |
| 8 | brazil-nuts | 0.6351 | 1 | 1 | single recorded material | magnesium 63.5135% /100 |
| 9 | sesame-seeds | 0.5929 | 1 | 1 | single recorded material | magnesium 59.2905% /100 |
| 10 | chia-seeds | 0.5659 | 1 | 1 | single recorded material | magnesium 56.5878% /100 |
| 11 | salmon | 0.5520 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 55.2000% /100 |
| 12 | sunflower-seeds | 0.5490 | 1 | 1 | single recorded material | magnesium 54.8986% /100 |
| 13 | cashews | 0.4932 | 1 | 1 | single recorded material | magnesium 49.3243% /100 |
| 14 | soy | 0.4730 | 1 | 1 | single recorded material | magnesium 47.2973% /100 |
| 15 | almonds | 0.4561 | 1 | 1 | single recorded material | magnesium 45.6081% /100 |
| 16 | oregano | 0.4561 | 1 | 1 | single recorded material | magnesium 45.6081% /100 |
| 17 | saffron | 0.4459 | 1 | 1 | single recorded material | magnesium 44.5946% /100 |
| 18 | tuna | 0.4450 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 44.5000% /100 |
| 19 | cloves | 0.4375 | 1 | 1 | single recorded material | magnesium 43.7500% /100 |
| 20 | herring | 0.4310 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 43.1000% /100 |
| 21 | amaranth | 0.4189 | 1 | 1 | single recorded material | magnesium 41.8919% /100 |
| 22 | wheat-germ | 0.4037 | 1 | 1 | single recorded material | magnesium 40.3716% /100 |
| 23 | buckwheat | 0.3902 | 1 | 1 | single recorded material | magnesium 39.0203% /100 |
| 24 | dark-chocolate | 0.3851 | 1 | 1 | single recorded material | magnesium 38.5135% /100 |
| 25 | thyme | 0.3716 | 1 | 1 | single recorded material | magnesium 37.1622% /100 |
| 26 | turmeric | 0.3514 | 1 | 1 | single recorded material | magnesium 35.1351% /100 |
| 27 | lupins | 0.3345 | 1 | 1 | single recorded material | magnesium 33.4459% /100 |
| 28 | quinoa | 0.3328 | 1 | 1 | single recorded material | magnesium 33.2770% /100 |
| 29 | spirulina | 0.3294 | 1 | 1 | single recorded material | magnesium 32.9392% /100 |
| 30 | oats | 0.2990 | 1 | 1 | single recorded material | magnesium 29.8986% /100 |
| 31 | black-beans | 0.2889 | 1 | 1 | single recorded material | magnesium 28.8851% /100 |
| 32 | black-pepper | 0.2889 | 1 | 1 | single recorded material | magnesium 28.8851% /100 |
| 33 | peanuts | 0.2838 | 1 | 1 | single recorded material | magnesium 28.3784% /100 |
| 34 | walnuts | 0.2669 | 1 | 1 | single recorded material | magnesium 26.6892% /100 |
| 35 | sardines | 0.2545 | 1 | 1 | single recorded material | dha-docosahexaenoic-acid 25.4500% /100 |
| 36 | kidney-beans | 0.2365 | 1 | 1 | single recorded material | magnesium 23.6486% /100 |
| 37 | spelt | 0.2297 | 1 | 1 | single recorded material | magnesium 22.9730% /100 |
| 38 | barley | 0.2247 | 1 | 1 | single recorded material | magnesium 22.4662% /100 |
| 39 | wheat | 0.2128 | 1 | 1 | single recorded material | magnesium 21.2838% /100 |
| 40 | pistachios | 0.2044 | 1 | 1 | single recorded material | magnesium 20.4392% /100 |

## Components, winning inputs and exact forms

★ marks an input’s winning observation, not an extra PM award. Full precision, source evidence, quantities, material/preparation and per-view flags are in components.json and analysis.json.

| Food | Substance | RSP | PM / ownership | Winner | Amount / basis | Material / preparation | Source | Publication |
|---|---|---|---|---|---|---|---|---|
| salmon-roe | dha-docosahexaenoic-acid | 100.0000 | BRS6-FM4-PM8 / A | ★ | 2000 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/dha_mg | pin-matched |
| mackerel | dha-docosahexaenoic-acid | 70.0500 | BRS6-FM4-PM8 / A | ★ | 1401 mg; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| anchovies | dha-docosahexaenoic-acid | 64.6000 | BRS6-FM4-PM8 / A | ★ | 1292 mg; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned | docs/foods/anchovies.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| salmon | dha-docosahexaenoic-acid | 55.2000 | BRS6-FM4-PM8 / A | ★ | 1104 mg; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| tuna | dha-docosahexaenoic-acid | 44.5000 | BRS6-FM4-PM8 / A | ★ | 890 mg; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| herring | dha-docosahexaenoic-acid | 43.1000 | BRS6-FM4-PM8 / A | ★ | 862 mg; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| sardines | dha-docosahexaenoic-acid | 25.4500 | BRS6-FM4-PM8 / A | ★ | 509 mg; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/dha_mg | listed-publication-pin-pending |
| pumpkin-seeds | magnesium | 100.0000 | BRS6-FM1-PM3 / A | ★ | 592 mg; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cocoa | magnesium | 84.2905 | BRS6-FM1-PM3 / A | ★ | 499 mg; per 100 g edible portion | Cocoa, dry powder, unsweetened / dry powder | docs/foods/cocoa.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sage | magnesium | 72.2973 | BRS6-FM1-PM3 / A | ★ | 428 mg; per 100 g edible portion | Spices, sage, ground / not recorded | docs/foods/sage.md#nutrition_per_100g/magnesium_mg | pin-matched |
| flax-seeds | magnesium | 66.2162 | BRS6-FM1-PM3 / A | ★ | 392 mg; per 100 g edible portion | Seeds, flaxseed / not recorded | docs/foods/flax-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| brazil-nuts | magnesium | 63.5135 | BRS6-FM1-PM3 / A | ★ | 376 mg; per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sesame-seeds | magnesium | 59.2905 | BRS6-FM1-PM3 / A | ★ | 351 mg; per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| chia-seeds | magnesium | 56.5878 | BRS6-FM1-PM3 / A | ★ | 335 mg; per 100 g edible portion | Seeds, chia seeds, dried / dried | docs/foods/chia-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sunflower-seeds | magnesium | 54.8986 | BRS6-FM1-PM3 / A | ★ | 325 mg; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cashews | magnesium | 49.3243 | BRS6-FM1-PM3 / A | ★ | 292 mg; per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/magnesium_mg | pin-matched |
| soy | magnesium | 47.2973 | BRS6-FM1-PM3 / A | ★ | 280 mg; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/magnesium_mg | pin-matched |
| almonds | magnesium | 45.6081 | BRS6-FM1-PM3 / A | ★ | 270 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| oregano | magnesium | 45.6081 | BRS6-FM1-PM3 / A | ★ | 270 mg; per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/magnesium_mg | pin-matched |
| saffron | magnesium | 44.5946 | BRS6-FM1-PM3 / A | ★ | 264 mg; per 100 g edible portion | Spices, saffron / not recorded | docs/foods/saffron.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cloves | magnesium | 43.7500 | BRS6-FM1-PM3 / A | ★ | 259 mg; per 100 g edible portion | Spices, cloves, ground / not recorded | docs/foods/cloves.md#nutrition_per_100g/magnesium_mg | pin-matched |
| amaranth | magnesium | 41.8919 | BRS6-FM1-PM3 / A | ★ | 248 mg; per 100 g edible portion | Amaranth grain, uncooked / uncooked | docs/foods/amaranth.md#nutrition_per_100g/magnesium_mg | pin-matched |
| wheat-germ | magnesium | 40.3716 | BRS6-FM1-PM3 / A | ★ | 239 mg; per 100 g edible portion | Wheat germ, crude / not recorded | docs/foods/wheat-germ.md#nutrition_per_100g/magnesium_mg | pin-matched |
| buckwheat | magnesium | 39.0203 | BRS6-FM1-PM3 / A | ★ | 231 mg; per 100 g edible portion | Buckwheat / not recorded | docs/foods/buckwheat.md#nutrition_per_100g/magnesium_mg | pin-matched |
| dark-chocolate | magnesium | 38.5135 | BRS6-FM1-PM3 / A | ★ | 228 mg; per 100 g edible portion | Chocolate, dark, 70-85% cacao solids / not recorded | docs/foods/dark-chocolate.md#nutrition_per_100g/magnesium_mg | pin-matched |
| thyme | magnesium | 37.1622 | BRS6-FM1-PM3 / A | ★ | 220 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/magnesium_mg | pin-matched |
| turmeric | magnesium | 35.1351 | BRS6-FM1-PM3 / A | ★ | 208 mg; per 100 g edible portion | Spices, turmeric, ground / not recorded | docs/foods/turmeric.md#nutrition_per_100g/magnesium_mg | pin-matched |
| lupins | magnesium | 33.4459 | BRS6-FM1-PM3 / A | ★ | 198 mg; per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/magnesium_mg | pin-matched |
| quinoa | magnesium | 33.2770 | BRS6-FM1-PM3 / A | ★ | 197 mg; per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/magnesium_mg | pin-matched |
| spirulina | magnesium | 32.9392 | BRS6-FM1-PM3 / A | ★ | 195 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/magnesium_mg | pin-matched |
| oats | magnesium | 29.8986 | BRS6-FM1-PM3 / A | ★ | 177 mg; per 100 g edible portion | Oats (Includes foods for USDA's Food Distribution Program) / not recorded | docs/foods/oats.md#nutrition_per_100g/magnesium_mg | pin-matched |
| black-beans | magnesium | 28.8851 | BRS6-FM1-PM3 / A | ★ | 171 mg; per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/magnesium_mg | pin-matched |
| black-pepper | magnesium | 28.8851 | BRS6-FM1-PM3 / A | ★ | 171 mg; per 100 g edible portion | Spices, pepper, black / not recorded | docs/foods/black-pepper.md#nutrition_per_100g/magnesium_mg | pin-matched |
| peanuts | magnesium | 28.3784 | BRS6-FM1-PM3 / A | ★ | 168 mg; per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| walnuts | magnesium | 26.6892 | BRS6-FM1-PM3 / A | ★ | 158 mg; per 100 g edible portion | Nuts, walnuts, english / not recorded | docs/foods/walnuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| kidney-beans | magnesium | 23.6486 | BRS6-FM1-PM3 / A | ★ | 140 mg; per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/magnesium_mg | pin-matched |
| spelt | magnesium | 22.9730 | BRS6-FM1-PM3 / A | ★ | 136 mg; per 100 g edible portion | Spelt, uncooked / uncooked | docs/foods/spelt.md#nutrition_per_100g/magnesium_mg | pin-matched |
| barley | magnesium | 22.4662 | BRS6-FM1-PM3 / A | ★ | 133 mg; per 100 g edible portion | Barley, hulled / not recorded | docs/foods/barley.md#nutrition_per_100g/magnesium_mg | pin-matched |
| wheat | magnesium | 21.2838 | BRS6-FM1-PM3 / A | ★ | 126 mg; per 100 g edible portion | Wheat, hard red winter / not recorded | docs/foods/wheat.md#nutrition_per_100g/magnesium_mg | pin-matched |
| pistachios | magnesium | 20.4392 | BRS6-FM1-PM3 / A | ★ | 121 mg; per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/magnesium_mg | pin-matched |

No scored food-ID profile combines different recorded material labels. All exact preparation metadata remains in the components; this does not establish identical bioavailability or serving equivalence.

## Scientific admission and limitations

| Relationship | Input | Ownership | Admission basis | Canonical source | Limitation |
|---|---|---|---|---|---|
| BRS6-FM1-PM3::PM3-DIT-1 | Magnesium | A | valid preserved historical fingerprint | docs/biological-targets/brs6/fm1/brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal.mdx#dietary_input_traceability/PM3-DIT-1 | Dietary-depletion evidence is preclinical; extra intake in magnesium-replete humans is not shown here. |
| BRS6-FM1-PM3::PM3-DIT-RECOVERY-RESISTANT-STARCH | Resistant starch | A | explicit assessment | docs/biological-targets/brs6/fm1/brs6-fm1-pm3-insulin-sensitivity-and-glucose-disposal.mdx#dietary_input_traceability/PM3-DIT-RECOVERY-RESISTANT-STARCH | Preparation-, dose- and population-specific. The positive study used 30 g/day for four weeks in ten healthy participants; this is not an effective whole-food dose. Preserve the later 40 g/day type-2-diabetes null. SCFA mediation and universal benefit are unestablished; no brain or ADHD inference. |
| BRS6-FM4-PM8::PM8-DIT-12 | DHA (Docosahexaenoic Acid) | A | explicit assessment | docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx#dietary_input_traceability/PM8-DIT-12 | Admission concerns a circulating hormone response in studied supplement/enriched-oil contexts. It does not establish adipose secretion, receptor sensitivity, universal benefit, ordinary-food efficacy or a food-effective dose. Mixture and carrier effects are not attributed to DHA alone; DHA-specific attribution uses the separate DHA-versus-EPA trial. |
| BRS6-FM4-PM8::PM8-DIT-13 | Urolithin A | A | explicit assessment | docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx#dietary_input_traceability/PM8-DIT-13 | Endocrine engagement is demonstrated in animal studies only, using administered urolithin A. In humans, a rise in urinary urolithin A tracked visceral-fat loss but was not randomised, and four-month supplementation did not change fat mass. Production depends on gut microbiota and varies between people; no food-effective dose or human adipokine effect is established. |
| BRS6-FM4-PM8::PM8-DIT-14 | Ellagitannins | A | explicit assessment | docs/biological-targets/brs6/fm4/brs6-fm4-pm8-metabolic-inflammation-and-adipose-stress-signalling.mdx#dietary_input_traceability/PM8-DIT-14 | Food ellagitannin content is not a urolithin A amount. Conversion depends on hydrolysis and producer microbiota; some people produce little or none. Walnuts were the studied DIRECT-PLUS food; pomegranate is included from the ellagitannin ontology, not from an adipose endocrine trial. |

Magnesium supply does not demonstrate benefit from additional intake in magnesium-replete humans. DHA’s admitted circulating response is bounded to studied supplement/enriched-oil contexts; a food’s DHA concentration does not demonstrate the same response. Resistant-starch dose/preparation and positive/null study distinctions remain. The urolithin A admission does not create a direct food concentration or human adipokine claim. Ellagitannin content is not a urolithin amount; microbiome-dependent conversion is not given a yield or a numerical food point.

## Unscored source contexts

These source-context records remain evidence-qualified; they are not automatic food-effect claims or transfers from experimental preparations.

| Input | Food contexts | Exclusion reasons |
|---|---|---|
| ellagitannins | pomegranates, walnuts | No authorised compatible comparison pool for this measurement basis; Presence-only: no quantitative observation |
| resistant-starch | bananas, black-beans, chickpeas, potatoes | Measurement range; no point ranking or midpoint substitution |
| urolithin-a | no direct source established | No supported canonical direct food-source record |

Bananas, black beans, chickpeas and potatoes retain resistant-starch range/preparation evidence without an invented midpoint. Pomegranate and walnut ellagitannin observations remain distinct from microbial urolithin production and from efficacy of administered urolithin A. No parent-to-child, food-to-metabolite amount or hypothesis edge is introduced.

| Numerical exclusion reason | Records |
|---|---|
| Below the provisional one-tenth threshold inside this basis. | 103 |
| Below inclusive analytical RSP 20 | 15 |
| Presence-only: no quantitative observation | 10 |
| Measurement range; no point ranking or midpoint substitution | 4 |
| No authorised compatible comparison pool for this measurement basis | 2 |
| Single-source comparison set: fewer than two distinct comparable foods | 2 |
| Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder | 1 |
| Whey-based beverage mix; undiluted formulation, separate product pool. | 1 |

All row-level exclusions, source restrictions and publication exclusions are exported. unscored_sources includes below-threshold and restricted records, not only missing measurements.

## Composition completeness

The same 21 scoped meat/fish/poultry/offal/roe/egg-yolk identities were checked across five inputs (105 cells). No source corrections were necessary. Exact USDA magnesium and DHA descriptions/units were checked against the previously retrieved SR Legacy archive: SHA-256 `b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0`, original URL https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip. Database-listed values are not asserted independently measured. Missing local DHA observations were not invented from other cuts, roe species or total omega-3. Exact-source zeros are recorded separately from unavailable values; no missing value was assigned zero.

| Food | Quantitative mapped cells | Qualitative cells | Exact-source zero cells | Unresolved/unavailable |
|---|---|---|---|---|
| anchovies | 2 | 0 | 0 | 3 |
| beef | 2 | 0 | 0 | 3 |
| chicken | 2 | 0 | 0 | 3 |
| chicken-liver | 1 | 0 | 1 | 3 |
| cod | 2 | 0 | 0 | 3 |
| dark-meat-poultry | 0 | 0 | 0 | 5 |
| heart | 1 | 0 | 1 | 3 |
| herring | 2 | 0 | 0 | 3 |
| kidney | 1 | 0 | 1 | 3 |
| lamb | 1 | 0 | 1 | 3 |
| liver | 1 | 0 | 1 | 3 |
| lumpfish-roe | 0 | 1 | 0 | 4 |
| mackerel | 2 | 0 | 0 | 3 |
| pork | 1 | 0 | 1 | 3 |
| salmon | 2 | 0 | 0 | 3 |
| salmon-roe | 2 | 0 | 0 | 3 |
| sardines | 2 | 0 | 0 | 3 |
| trout-roe | 0 | 1 | 0 | 4 |
| tuna | 2 | 0 | 0 | 3 |
| turkey | 2 | 0 | 0 | 3 |
| egg-yolks | 2 | 0 | 0 | 3 |

## Comparison with intake and frozen display

The saved intake and current analytical extraction have identical scores, ranks and retained components; no new source values or profiles were needed. Frozen public display uses top-ten ≥10, whereas this analysis is uncapped ≥20. Neither display snapshot nor publication manifest was replaced.

| Relationship | Frozen display-selected rows | Current analytical rows |
|---|---|---|
| BRS6-FM1-PM3::PM3-DIT-1 | 10 | 33 |
| BRS6-FM1-PM3::PM3-DIT-RECOVERY-RESISTANT-STARCH | 0 | 0 |
| BRS6-FM4-PM8::PM8-DIT-12 | 8 | 7 |
| BRS6-FM4-PM8::PM8-DIT-13 | 0 | 0 |
| BRS6-FM4-PM8::PM8-DIT-14 | 0 | 0 |

Previously corrected food files retain publication-pending status even when a particular magnesium/DHA observation itself is unchanged. strict_pin_matched_row_sensitivity is an omission sensitivity using current powers, not an independently reranked pool.

## Requested examples

| Food | Combined rank / score | Qualifying inputs |
|---|---|---|
| beef | no retained score | none ≥20 |
| herring | 20 / 0.4310 | dha-docosahexaenoic-acid 43.1000% |
| turkey | no retained score | none ≥20 |
| sardines | 35 / 0.2545 | dha-docosahexaenoic-acid 25.4500% |
| egg-yolks | no retained score | none ≥20 |
| sage | 4 / 0.7230 | magnesium 72.2973% |
| liver | no retained score | none ≥20 |
| bell-peppers | no retained score | none ≥20 |
| miso | no retained score | none ≥20 |

A food without a retained BRS6 score is not nutritionally empty. The separate BRS1–5 results are not imported or added here. Beef tryptophan and other amino-acid completeness questions do not supply a BRS6 dietary relationship by inference.

## Distribution — no cutoff adopted

| Candidate presentation cutoff | Foods |
|---|---|
| all positive | 40 |
| score ≥0.25 | 35 |
| score ≥0.5 | 12 |
| score ≥0.75 | 3 |
| score ≥1 | 2 |

These descriptive cutoffs are not intake targets, food recommendations or efficacy thresholds. Portion awareness, dietary averages, exposure optimisation, safety/frequency, recipe/abacus changes and cross-system aggregation remain deferred.

## Validation

| Check | Result | Evidence |
|---|---|---|
| Independent direct aggregation of EVERY score and rank | PASS | 80 food/view scores and ranks reconstructed without scoreFoods() |
| Independent pre-cap qualification and RSP reconstruction | PASS | 40 >=20 food/form candidates; includes pools larger than ten |
| Observed quantities/preparations/protein match canonical records | PASS | 40 component rows checked against live canonical fields; no missing value is numeric zero |
| Bounded completeness audit and no source edits | PASS | 105 food/input cells; no exact-source positive omission requiring correction; no generic amino-acid or precursor substitution |
| Deduplication, overlap, sodium, inclusive threshold, ties | PASS | Synthetic boundary/tie/duplicate/ownership tests plus every real group |
| Incompatible pools never silently maximised | PASS | Conflicting input pools produce unresolved subtotal, not maximum |
| Shared selector default unchanged | PASS | Exact equality with HEAD implementation for all current BRS6 source pools |
| Frozen manifest, site data, PM records and scientific gates unchanged | PASS | Inherited tracked source/helper edits only; no PM, gate, manifest or generated-site changes. Intake preservation separately verifies no new source edits in BRS6. |
| Source hashes fresh | PASS | 356 source hashes match current candidate |
| BRS1–5 analyses preserved and scoring unchanged | PASS | 688 prior food/view results identical; 90 prior artifacts byte-identical |
| All intake scientific/source records and publication pins preserved | PASS | 428 pinned intake files unchanged; only analytical scope guards extended |
| BRS6 ownership and unranked precursor isolation | PASS | Five admissions preserved; six PMs without structured admissions flagged; resistant starch/ellagitannins unscored and no inferred Urolithin A food concentration |

Publication contract tests are recorded in publication-tests.txt. This is not a whole-site or release-readiness pass. Full changed-file inventory: changed-files.json. No canonical source correction, admission/rating/SEC change, QC reactivation, site generation/build, commit, push, merge or deployment. BRS1–5 artifacts, source records and frozen publication data remain preserved.
