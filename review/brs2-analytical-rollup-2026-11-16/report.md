# BRS2 analytical source strength and coverage — 16 November 2026

Provisional peer-review analysis, not food quality, dietary adequacy, recommendation or demonstrated efficacy. Publication pending; no site generation.

Checkout: `/Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science`

Branch: `review/pm8-caffeine-neuroeshot-2026-11-16`; commit: `d67c181ff6ebec80873e4da581af759e8e98199c`. Working tree is uncommitted; exact intake and final state are preserved in intake.json and analysis.json. Input hash: `3908ab8336bb432220e0671d63378c443dcf34f48389b8c44ae3a14578f48522`. Source-file hashes accompany every extraction.

## Rules and interpretation

Existing builder/scorer provides uncapped comparable pools (analysisCompositionOnly and retainFoodForms opt-ins). RSP = 100 × concentration / highest eligible comparable concentration, with the existing two-food, unit, identity and reference-pool restrictions. Every unrounded RSP ≥20 is retained; no analytical food-count cap. Food score = sum of distinct non-overlapping input RSP/100. PM counts describe coverage and never multiply points. Combined ownership is deduplicated, not the sum of separate scores. Ties use canonical food ID. Source strength and single-system coverage coincide.

The configured EAA/tryptophan/tyrosine/phenylalanine overlap group is unchanged and dormant in BRS2. Methionine, glycine and serine are not silently added to it. Folate/5-MTHF, B6/PLP and phosphatidylcholine/choline routes retain identity distinctions; active-form sources remain unranked where the existing rules require it. No food coqualifies for choline and betaine at ≥20, so that potential precursor overlap adds no duplicate points. Sodium has no retained BRS2 rows and contributes zero. Compatible source forms follow the existing scorer; composite food-ID profiles are explicitly marked and are not interchangeable servings.

## Counts

| Measure | Intake/default mapping | Current analysis |
|---|---|---|
| PMs | 7 | 7 |
| Eligible relationship records | 37 | 37 |
| Resolved input identities | 19 | 19 |
| Retained component rows | 380 | 474 |
| PM-owned foods | 68 | 72 |
| upstream-shared foods | 31 | 37 |
| combined foods | 70 | 74 |
The intake comparison uses the saved default builder output: it lacks both the opt-in methionine profiles recovered during BRS1 and the new BRS2 glycine/serine observations. Its difference therefore combines mapping activation and new composition recovery, not just new measurements. No earlier BRS2 analytical ranking is represented as an approved baseline.

| Input | Source contexts | Observations | RSP ≥10 pre-cap | RSP ≥20 | Change ≥20 vs intake |
|---|---|---|---|---|---|
| 5-methyltetrahydrofolate | 7 | 7 | 0 | 0 | 0 |
| betaine | 10 | 10 | 5 | 3 | 0 |
| choline | 123 | 117 | 8 | 4 | 0 |
| cysteine | 8 | 0 | 0 | 0 | 0 |
| glutamate | 3 | 0 | 0 | 0 | 0 |
| glycine | 19 | 19 | 19 | 19 | 12 |
| magnesium | 147 | 142 | 47 | 33 | 0 |
| methionine | 39 | 39 | 32 | 28 | 11 |
| n-acetylcysteine | 0 | 0 | 0 | 0 | 0 |
| phosphatidylcholine | 6 | 0 | 0 | 0 | 0 |
| potassium | 147 | 145 | 95 | 47 | 0 |
| pyridoxal-5-phosphate | 1 | 0 | 0 | 0 | 0 |
| serine | 15 | 15 | 15 | 15 | 15 |
| uridine | 1 | 0 | 0 | 0 | 0 |
| vitamin-b12 | 45 | 39 | 12 | 6 | 0 |
| vitamin-b2 | 131 | 131 | 16 | 7 | 0 |
| vitamin-b6 | 140 | 138 | 45 | 16 | 0 |
| vitamin-b9 | 138 | 136 | 40 | 20 | 0 |
| zinc | 149 | 145 | 19 | 2 | 0 |
## Full rankings

### PM-owned

| Rank | Food ID | Score | Inputs | PMs | Profile | Component arithmetic |
|---|---|---|---|---|---|---|
| 1 | liver | 4.3737 | 7 | 6 | single recorded material | choline: 40.6364% /100; glycine: 63.1579% /100; methionine: 50.0000% /100; serine: 68.2504% /100; vitamin-b12: 100.0000% /100; vitamin-b2: 75.0681% /100; vitamin-b6: 40.2602% /100 |
| 2 | pumpkin-seeds | 2.9442 | 4 | 4 | single recorded material | glycine: 100.0000% /100; magnesium: 100.0000% /100; methionine: 55.5249% /100; potassium: 38.8942% /100 |
| 3 | chicken-liver | 2.7309 | 7 | 6 | single recorded material | choline: 23.7015% /100; glycine: 46.0662% /100; methionine: 39.7790% /100; serine: 55.4299% /100; vitamin-b12: 27.9595% /100; vitamin-b2: 48.4469% /100; vitamin-b6: 31.7100% /100 |
| 4 | anchovies | 2.6905 | 4 | 5 | single recorded material | glycine: 75.2577% /100; methionine: 78.7293% /100; potassium: 26.1538% /100; serine: 88.9140% /100 |
| 5 | egg-yolks | 2.6129 | 4 | 5 | single recorded material | choline: 100.0000% /100; glycine: 26.4786% /100; methionine: 34.8066% /100; serine: 100.0000% /100 |
| 6 | sunflower-seeds | 2.6067 | 5 | 5 | single recorded material | glycine: 79.2729% /100; magnesium: 54.8986% /100; methionine: 45.4880% /100; potassium: 31.0096% /100; vitamin-b6: 50.0000% /100 |
| 7 | sardines | 2.3980 | 3 | 5 | single recorded material | glycine: 64.0803% /100; methionine: 100.0000% /100; serine: 75.7164% /100 |
| 8 | sage | 2.2374 | 3 | 4 | single recorded material | magnesium: 72.2973% /100; potassium: 51.4423% /100; vitamin-b6: 100.0000% /100 |
| 9 | turkey | 2.0922 | 4 | 5 | composite | glycine: 52.4145% /100; methionine: 64.9171% /100; serine: 67.6471% /100; vitamin-b6: 24.2379% /100 |
| 10 | salmon | 2.0352 | 4 | 5 | composite | glycine: 52.0890% /100; methionine: 60.2210% /100; serine: 67.5716% /100; vitamin-b6: 23.6431% /100 |
| 11 | spirulina | 1.9847 | 3 | 4 | single recorded material | magnesium: 32.9392% /100; potassium: 65.5288% /100; vitamin-b2: 100.0000% /100 |
| 12 | tuna | 1.9610 | 3 | 5 | composite | glycine: 60.7705% /100; methionine: 63.5359% /100; serine: 71.7949% /100 |
| 13 | chicken | 1.9500 | 3 | 5 | composite | glycine: 66.3592% /100; methionine: 79.0976% /100; serine: 49.5475% /100 |
| 14 | almonds | 1.8939 | 4 | 4 | single recorded material | glycine: 77.5366% /100; magnesium: 45.6081% /100; potassium: 35.2404% /100; vitamin-b2: 31.0082% /100 |
| 15 | herring | 1.7409 | 4 | 6 | single recorded material | glycine: 46.7716% /100; methionine: 48.9871% /100; serine: 55.2790% /100; vitamin-b12: 23.0523% /100 |
| 16 | beef | 1.6860 | 3 | 5 | composite | glycine: 68.4753% /100; methionine: 44.0147% /100; serine: 56.1086% /100 |
| 17 | saffron | 1.6503 | 3 | 4 | single recorded material | magnesium: 44.5946% /100; potassium: 82.8846% /100; vitamin-b6: 37.5465% /100 |
| 18 | pork | 1.6408 | 3 | 5 | single recorded material | glycine: 55.2903% /100; methionine: 47.3297% /100; serine: 61.4630% /100 |
| 19 | wheat-germ | 1.6286 | 4 | 5 | single recorded material | magnesium: 40.3716% /100; potassium: 42.8846% /100; vitamin-b6: 48.3271% /100; zinc: 31.2723% /100 |
| 20 | cocoa | 1.5756 | 2 | 2 | single recorded material | magnesium: 84.2905% /100; potassium: 73.2692% /100 |
| 21 | soy | 1.5740 | 3 | 4 | single recorded material | magnesium: 47.2973% /100; potassium: 86.3942% /100; vitamin-b2: 23.7057% /100 |
| 22 | mackerel | 1.5643 | 3 | 5 | single recorded material | glycine: 48.4536% /100; methionine: 50.7366% /100; serine: 57.2398% /100 |
| 23 | cod | 1.4967 | 3 | 5 | single recorded material | glycine: 46.3918% /100; methionine: 48.5267% /100; serine: 54.7511% /100 |
| 24 | kidney | 1.4848 | 3 | 3 | single recorded material | vitamin-b12: 46.3744% /100; vitamin-b2: 77.3842% /100; vitamin-b6: 24.7212% /100 |
| 25 | oregano | 1.4500 | 3 | 4 | single recorded material | magnesium: 45.6081% /100; potassium: 60.5769% /100; vitamin-b6: 38.8104% /100 |
| 26 | turmeric | 1.3514 | 2 | 2 | single recorded material | magnesium: 35.1351% /100; potassium: 100.0000% /100 |
| 27 | pistachios | 1.3292 | 3 | 4 | single recorded material | magnesium: 20.4392% /100; potassium: 49.2788% /100; vitamin-b6: 63.1970% /100 |
| 28 | lamb | 1.2941 | 3 | 5 | single recorded material | glycine: 43.8958% /100; methionine: 39.1344% /100; serine: 46.3801% /100 |
| 29 | sesame-seeds | 1.1116 | 3 | 4 | single recorded material | magnesium: 59.2905% /100; potassium: 22.5000% /100; vitamin-b6: 29.3680% /100 |
| 30 | flax-seeds | 1.0530 | 2 | 2 | single recorded material | magnesium: 66.2162% /100; potassium: 39.0865% /100 |
| 31 | black-beans | 1.0018 | 2 | 2 | single recorded material | magnesium: 28.8851% /100; potassium: 71.2981% /100 |
| 32 | oysters | 1.0000 | 1 | 1 | single recorded material | zinc: 100.0000% /100 |
| 33 | thyme | 0.9674 | 3 | 4 | single recorded material | magnesium: 37.1622% /100; potassium: 39.1346% /100; vitamin-b6: 20.4461% /100 |
| 34 | eggs | 0.9536 | 3 | 4 | composite | choline: 35.8205% /100; glycine: 23.4400% /100; methionine: 36.0958% /100 |
| 35 | brazil-nuts | 0.9520 | 2 | 2 | single recorded material | magnesium: 63.5135% /100; potassium: 31.6827% /100 |
| 36 | cloves | 0.9279 | 2 | 2 | single recorded material | magnesium: 43.7500% /100; potassium: 49.0385% /100 |
| 37 | black-pepper | 0.9278 | 2 | 2 | single recorded material | magnesium: 28.8851% /100; potassium: 63.8942% /100 |
| 38 | kidney-beans | 0.9124 | 2 | 2 | single recorded material | magnesium: 23.6486% /100; potassium: 67.5962% /100 |
| 39 | peanuts | 0.8907 | 3 | 4 | composite | magnesium: 28.3784% /100; methionine: 26.7956% /100; potassium: 33.8942% /100 |
| 40 | amaranth | 0.8829 | 3 | 4 | single recorded material | magnesium: 41.8919% /100; potassium: 24.4231% /100; vitamin-b6: 21.9703% /100 |
| 41 | lupins | 0.8215 | 2 | 2 | single recorded material | magnesium: 33.4459% /100; potassium: 48.7019% /100 |
| 42 | cashews | 0.8106 | 2 | 2 | single recorded material | magnesium: 49.3243% /100; potassium: 31.7308% /100 |
| 43 | salmon-roe | 0.7926 | 1 | 2 | single recorded material | vitamin-b12: 79.2580% /100 |
| 44 | dark-chocolate | 0.7289 | 2 | 2 | single recorded material | magnesium: 38.5135% /100; potassium: 34.3750% /100 |
| 45 | mussels | 0.6968 | 2 | 4 | composite | methionine: 49.4475% /100; vitamin-b12: 20.2361% /100 |
| 46 | buckwheat | 0.6114 | 2 | 2 | single recorded material | magnesium: 39.0203% /100; potassium: 22.1154% /100 |
| 47 | quinoa | 0.6034 | 2 | 2 | single recorded material | magnesium: 33.2770% /100; potassium: 27.0673% /100 |
| 48 | chia-seeds | 0.5659 | 1 | 2 | single recorded material | magnesium: 56.5878% /100 |
| 49 | lentils | 0.5262 | 2 | 3 | single recorded material | potassium: 32.5481% /100; vitamin-b6: 20.0743% /100 |
| 50 | oats | 0.5052 | 2 | 2 | single recorded material | magnesium: 29.8986% /100; potassium: 20.6250% /100 |
| 51 | cheddar-cheese | 0.5037 | 1 | 3 | single recorded material | methionine: 50.3683% /100 |
| 52 | walnuts | 0.4789 | 2 | 2 | single recorded material | magnesium: 26.6892% /100; potassium: 21.2019% /100 |
| 53 | garlic | 0.4591 | 1 | 2 | single recorded material | vitamin-b6: 45.9108% /100 |
| 54 | barley | 0.4420 | 2 | 2 | single recorded material | magnesium: 22.4662% /100; potassium: 21.7308% /100 |
| 55 | natto | 0.3505 | 1 | 1 | single recorded material | potassium: 35.0481% /100 |
| 56 | chickpeas | 0.3452 | 1 | 1 | single recorded material | potassium: 34.5192% /100 |
| 57 | rosemary | 0.3212 | 1 | 1 | single recorded material | potassium: 32.1154% /100 |
| 58 | peppermint | 0.2736 | 1 | 1 | single recorded material | potassium: 27.3558% /100 |
| 59 | wasabi | 0.2731 | 1 | 1 | single recorded material | potassium: 27.3077% /100 |
| 60 | spinach | 0.2683 | 1 | 1 | single recorded material | potassium: 26.8269% /100 |
| 61 | parsley | 0.2663 | 1 | 1 | single recorded material | potassium: 26.6346% /100 |
| 62 | cilantro | 0.2505 | 1 | 1 | single recorded material | potassium: 25.0481% /100 |
| 63 | heart | 0.2469 | 1 | 2 | single recorded material | vitamin-b2: 24.6866% /100 |
| 64 | avocado | 0.2332 | 1 | 1 | single recorded material | potassium: 23.3173% /100 |
| 65 | edamame | 0.2317 | 1 | 1 | single recorded material | potassium: 23.1731% /100 |
| 66 | spelt | 0.2297 | 1 | 2 | single recorded material | magnesium: 22.9730% /100 |
| 67 | lions-mane-mushroom | 0.2131 | 1 | 1 | single recorded material | potassium: 21.3125% /100 |
| 68 | wheat | 0.2128 | 1 | 2 | single recorded material | magnesium: 21.2838% /100 |
| 69 | cinnamon | 0.2072 | 1 | 1 | single recorded material | potassium: 20.7212% /100 |
| 70 | jerusalem-artichokes | 0.2062 | 1 | 1 | single recorded material | potassium: 20.6250% /100 |
| 71 | potatoes | 0.2043 | 1 | 1 | single recorded material | potassium: 20.4327% /100 |
| 72 | oyster-mushroom | 0.2019 | 1 | 1 | single recorded material | potassium: 20.1923% /100 |
### upstream-shared

| Rank | Food ID | Score | Inputs | PMs | Profile | Component arithmetic |
|---|---|---|---|---|---|---|
| 1 | chicken-liver | 1.6348 | 3 | 7 | single recorded material | choline: 23.7015% /100; methionine: 39.7790% /100; vitamin-b9: 100.0000% /100 |
| 2 | egg-yolks | 1.5964 | 3 | 7 | single recorded material | choline: 100.0000% /100; methionine: 34.8066% /100; vitamin-b9: 24.8299% /100 |
| 3 | liver | 1.3996 | 3 | 7 | single recorded material | choline: 40.6364% /100; methionine: 50.0000% /100; vitamin-b9: 49.3197% /100 |
| 4 | quinoa | 1.3129 | 2 | 5 | composite | betaine: 100.0000% /100; vitamin-b9: 31.2925% /100 |
| 5 | wheat-germ | 1.1287 | 2 | 5 | composite | betaine: 65.0794% /100; vitamin-b9: 47.7891% /100 |
| 6 | sardines | 1.0000 | 1 | 2 | single recorded material | methionine: 100.0000% /100 |
| 7 | chickpeas | 0.9473 | 1 | 4 | single recorded material | vitamin-b9: 94.7279% /100 |
| 8 | sunflower-seeds | 0.8409 | 2 | 6 | single recorded material | methionine: 45.4880% /100; vitamin-b9: 38.6054% /100 |
| 9 | lentils | 0.8146 | 1 | 4 | single recorded material | vitamin-b9: 81.4626% /100 |
| 10 | chicken | 0.7910 | 1 | 2 | composite | methionine: 79.0976% /100 |
| 11 | anchovies | 0.7873 | 1 | 2 | single recorded material | methionine: 78.7293% /100 |
| 12 | black-beans | 0.7551 | 1 | 4 | single recorded material | vitamin-b9: 75.5102% /100 |
| 13 | eggs | 0.7192 | 2 | 5 | composite | choline: 35.8205% /100; methionine: 36.0958% /100 |
| 14 | peanuts | 0.6761 | 2 | 6 | composite | methionine: 26.7956% /100; vitamin-b9: 40.8163% /100 |
| 15 | kidney-beans | 0.6701 | 1 | 4 | single recorded material | vitamin-b9: 67.0068% /100 |
| 16 | turkey | 0.6492 | 1 | 2 | composite | methionine: 64.9171% /100 |
| 17 | soy | 0.6378 | 1 | 4 | single recorded material | vitamin-b9: 63.7755% /100 |
| 18 | tuna | 0.6354 | 1 | 2 | composite | methionine: 63.5359% /100 |
| 19 | lupins | 0.6037 | 1 | 4 | single recorded material | vitamin-b9: 60.3741% /100 |
| 20 | salmon | 0.6022 | 1 | 2 | composite | methionine: 60.2210% /100 |
| 21 | pumpkin-seeds | 0.5552 | 1 | 2 | single recorded material | methionine: 55.5249% /100 |
| 22 | edamame | 0.5153 | 1 | 4 | single recorded material | vitamin-b9: 51.5306% /100 |
| 23 | mackerel | 0.5074 | 1 | 2 | single recorded material | methionine: 50.7366% /100 |
| 24 | cheddar-cheese | 0.5037 | 1 | 2 | single recorded material | methionine: 50.3683% /100 |
| 25 | mussels | 0.4945 | 1 | 2 | single recorded material | methionine: 49.4475% /100 |
| 26 | herring | 0.4899 | 1 | 2 | single recorded material | methionine: 48.9871% /100 |
| 27 | cod | 0.4853 | 1 | 2 | single recorded material | methionine: 48.5267% /100 |
| 28 | pork | 0.4733 | 1 | 2 | single recorded material | methionine: 47.3297% /100 |
| 29 | sage | 0.4660 | 1 | 4 | single recorded material | vitamin-b9: 46.5986% /100 |
| 30 | thyme | 0.4660 | 1 | 4 | single recorded material | vitamin-b9: 46.5986% /100 |
| 31 | beef | 0.4401 | 1 | 2 | composite | methionine: 44.0147% /100 |
| 32 | oregano | 0.4031 | 1 | 4 | single recorded material | vitamin-b9: 40.3061% /100 |
| 33 | lamb | 0.3913 | 1 | 2 | single recorded material | methionine: 39.1344% /100 |
| 34 | spinach | 0.3299 | 1 | 4 | single recorded material | vitamin-b9: 32.9932% /100 |
| 35 | parsley | 0.2585 | 1 | 4 | single recorded material | vitamin-b9: 25.8503% /100 |
| 36 | romaine-lettuce | 0.2313 | 1 | 4 | single recorded material | vitamin-b9: 23.1293% /100 |
| 37 | beetroot | 0.2063 | 1 | 4 | single recorded material | betaine: 20.6349% /100 |
### combined

| Rank | Food ID | Score | Inputs | PMs | Profile | Component arithmetic |
|---|---|---|---|---|---|---|
| 1 | liver | 4.8669 | 8 | 7 | single recorded material | choline: 40.6364% /100; glycine: 63.1579% /100; methionine: 50.0000% /100; serine: 68.2504% /100; vitamin-b12: 100.0000% /100; vitamin-b2: 75.0681% /100; vitamin-b6: 40.2602% /100; vitamin-b9: 49.3197% /100 |
| 2 | chicken-liver | 3.7309 | 8 | 7 | single recorded material | choline: 23.7015% /100; glycine: 46.0662% /100; methionine: 39.7790% /100; serine: 55.4299% /100; vitamin-b12: 27.9595% /100; vitamin-b2: 48.4469% /100; vitamin-b6: 31.7100% /100; vitamin-b9: 100.0000% /100 |
| 3 | sunflower-seeds | 2.9927 | 6 | 6 | single recorded material | glycine: 79.2729% /100; magnesium: 54.8986% /100; methionine: 45.4880% /100; potassium: 31.0096% /100; vitamin-b6: 50.0000% /100; vitamin-b9: 38.6054% /100 |
| 4 | pumpkin-seeds | 2.9442 | 4 | 5 | single recorded material | glycine: 100.0000% /100; magnesium: 100.0000% /100; methionine: 55.5249% /100; potassium: 38.8942% /100 |
| 5 | egg-yolks | 2.8612 | 5 | 7 | single recorded material | choline: 100.0000% /100; glycine: 26.4786% /100; methionine: 34.8066% /100; serine: 100.0000% /100; vitamin-b9: 24.8299% /100 |
| 6 | wheat-germ | 2.7572 | 6 | 7 | composite | betaine: 65.0794% /100; magnesium: 40.3716% /100; potassium: 42.8846% /100; vitamin-b6: 48.3271% /100; vitamin-b9: 47.7891% /100; zinc: 31.2723% /100 |
| 7 | sage | 2.7034 | 4 | 6 | single recorded material | magnesium: 72.2973% /100; potassium: 51.4423% /100; vitamin-b6: 100.0000% /100; vitamin-b9: 46.5986% /100 |
| 8 | anchovies | 2.6905 | 4 | 5 | single recorded material | glycine: 75.2577% /100; methionine: 78.7293% /100; potassium: 26.1538% /100; serine: 88.9140% /100 |
| 9 | sardines | 2.3980 | 3 | 5 | single recorded material | glycine: 64.0803% /100; methionine: 100.0000% /100; serine: 75.7164% /100 |
| 10 | soy | 2.2117 | 4 | 5 | single recorded material | magnesium: 47.2973% /100; potassium: 86.3942% /100; vitamin-b2: 23.7057% /100; vitamin-b9: 63.7755% /100 |
| 11 | turkey | 2.0922 | 4 | 5 | composite | glycine: 52.4145% /100; methionine: 64.9171% /100; serine: 67.6471% /100; vitamin-b6: 24.2379% /100 |
| 12 | salmon | 2.0352 | 4 | 5 | composite | glycine: 52.0890% /100; methionine: 60.2210% /100; serine: 67.5716% /100; vitamin-b6: 23.6431% /100 |
| 13 | spirulina | 1.9847 | 3 | 4 | single recorded material | magnesium: 32.9392% /100; potassium: 65.5288% /100; vitamin-b2: 100.0000% /100 |
| 14 | tuna | 1.9610 | 3 | 5 | composite | glycine: 60.7705% /100; methionine: 63.5359% /100; serine: 71.7949% /100 |
| 15 | chicken | 1.9500 | 3 | 5 | composite | glycine: 66.3592% /100; methionine: 79.0976% /100; serine: 49.5475% /100 |
| 16 | quinoa | 1.9164 | 4 | 6 | composite | betaine: 100.0000% /100; magnesium: 33.2770% /100; potassium: 27.0673% /100; vitamin-b9: 31.2925% /100 |
| 17 | almonds | 1.8939 | 4 | 4 | single recorded material | glycine: 77.5366% /100; magnesium: 45.6081% /100; potassium: 35.2404% /100; vitamin-b2: 31.0082% /100 |
| 18 | oregano | 1.8530 | 4 | 6 | single recorded material | magnesium: 45.6081% /100; potassium: 60.5769% /100; vitamin-b6: 38.8104% /100; vitamin-b9: 40.3061% /100 |
| 19 | black-beans | 1.7569 | 3 | 5 | single recorded material | magnesium: 28.8851% /100; potassium: 71.2981% /100; vitamin-b9: 75.5102% /100 |
| 20 | herring | 1.7409 | 4 | 6 | single recorded material | glycine: 46.7716% /100; methionine: 48.9871% /100; serine: 55.2790% /100; vitamin-b12: 23.0523% /100 |
| 21 | beef | 1.6860 | 3 | 5 | composite | glycine: 68.4753% /100; methionine: 44.0147% /100; serine: 56.1086% /100 |
| 22 | saffron | 1.6503 | 3 | 4 | single recorded material | magnesium: 44.5946% /100; potassium: 82.8846% /100; vitamin-b6: 37.5465% /100 |
| 23 | pork | 1.6408 | 3 | 5 | single recorded material | glycine: 55.2903% /100; methionine: 47.3297% /100; serine: 61.4630% /100 |
| 24 | kidney-beans | 1.5825 | 3 | 5 | single recorded material | magnesium: 23.6486% /100; potassium: 67.5962% /100; vitamin-b9: 67.0068% /100 |
| 25 | cocoa | 1.5756 | 2 | 2 | single recorded material | magnesium: 84.2905% /100; potassium: 73.2692% /100 |
| 26 | mackerel | 1.5643 | 3 | 5 | single recorded material | glycine: 48.4536% /100; methionine: 50.7366% /100; serine: 57.2398% /100 |
| 27 | cod | 1.4967 | 3 | 5 | single recorded material | glycine: 46.3918% /100; methionine: 48.5267% /100; serine: 54.7511% /100 |
| 28 | kidney | 1.4848 | 3 | 3 | single recorded material | vitamin-b12: 46.3744% /100; vitamin-b2: 77.3842% /100; vitamin-b6: 24.7212% /100 |
| 29 | thyme | 1.4334 | 4 | 6 | single recorded material | magnesium: 37.1622% /100; potassium: 39.1346% /100; vitamin-b6: 20.4461% /100; vitamin-b9: 46.5986% /100 |
| 30 | lupins | 1.4252 | 3 | 5 | single recorded material | magnesium: 33.4459% /100; potassium: 48.7019% /100; vitamin-b9: 60.3741% /100 |
| 31 | turmeric | 1.3514 | 2 | 2 | single recorded material | magnesium: 35.1351% /100; potassium: 100.0000% /100 |
| 32 | lentils | 1.3409 | 3 | 5 | single recorded material | potassium: 32.5481% /100; vitamin-b6: 20.0743% /100; vitamin-b9: 81.4626% /100 |
| 33 | pistachios | 1.3292 | 3 | 4 | single recorded material | magnesium: 20.4392% /100; potassium: 49.2788% /100; vitamin-b6: 63.1970% /100 |
| 34 | peanuts | 1.2988 | 4 | 6 | composite | magnesium: 28.3784% /100; methionine: 26.7956% /100; potassium: 33.8942% /100; vitamin-b9: 40.8163% /100 |
| 35 | lamb | 1.2941 | 3 | 5 | single recorded material | glycine: 43.8958% /100; methionine: 39.1344% /100; serine: 46.3801% /100 |
| 36 | chickpeas | 1.2925 | 2 | 4 | single recorded material | potassium: 34.5192% /100; vitamin-b9: 94.7279% /100 |
| 37 | sesame-seeds | 1.1116 | 3 | 4 | single recorded material | magnesium: 59.2905% /100; potassium: 22.5000% /100; vitamin-b6: 29.3680% /100 |
| 38 | flax-seeds | 1.0530 | 2 | 2 | single recorded material | magnesium: 66.2162% /100; potassium: 39.0865% /100 |
| 39 | oysters | 1.0000 | 1 | 1 | single recorded material | zinc: 100.0000% /100 |
| 40 | eggs | 0.9536 | 3 | 6 | composite | choline: 35.8205% /100; glycine: 23.4400% /100; methionine: 36.0958% /100 |
| 41 | brazil-nuts | 0.9520 | 2 | 2 | single recorded material | magnesium: 63.5135% /100; potassium: 31.6827% /100 |
| 42 | cloves | 0.9279 | 2 | 2 | single recorded material | magnesium: 43.7500% /100; potassium: 49.0385% /100 |
| 43 | black-pepper | 0.9278 | 2 | 2 | single recorded material | magnesium: 28.8851% /100; potassium: 63.8942% /100 |
| 44 | amaranth | 0.8829 | 3 | 4 | single recorded material | magnesium: 41.8919% /100; potassium: 24.4231% /100; vitamin-b6: 21.9703% /100 |
| 45 | cashews | 0.8106 | 2 | 2 | single recorded material | magnesium: 49.3243% /100; potassium: 31.7308% /100 |
| 46 | salmon-roe | 0.7926 | 1 | 2 | single recorded material | vitamin-b12: 79.2580% /100 |
| 47 | edamame | 0.7470 | 2 | 4 | single recorded material | potassium: 23.1731% /100; vitamin-b9: 51.5306% /100 |
| 48 | dark-chocolate | 0.7289 | 2 | 2 | single recorded material | magnesium: 38.5135% /100; potassium: 34.3750% /100 |
| 49 | mussels | 0.6968 | 2 | 6 | composite | methionine: 49.4475% /100; vitamin-b12: 20.2361% /100 |
| 50 | buckwheat | 0.6114 | 2 | 2 | single recorded material | magnesium: 39.0203% /100; potassium: 22.1154% /100 |
| 51 | spinach | 0.5982 | 2 | 4 | single recorded material | potassium: 26.8269% /100; vitamin-b9: 32.9932% /100 |
| 52 | chia-seeds | 0.5659 | 1 | 2 | single recorded material | magnesium: 56.5878% /100 |
| 53 | parsley | 0.5248 | 2 | 4 | single recorded material | potassium: 26.6346% /100; vitamin-b9: 25.8503% /100 |
| 54 | oats | 0.5052 | 2 | 2 | single recorded material | magnesium: 29.8986% /100; potassium: 20.6250% /100 |
| 55 | cheddar-cheese | 0.5037 | 1 | 5 | single recorded material | methionine: 50.3683% /100 |
| 56 | walnuts | 0.4789 | 2 | 2 | single recorded material | magnesium: 26.6892% /100; potassium: 21.2019% /100 |
| 57 | garlic | 0.4591 | 1 | 2 | single recorded material | vitamin-b6: 45.9108% /100 |
| 58 | barley | 0.4420 | 2 | 2 | single recorded material | magnesium: 22.4662% /100; potassium: 21.7308% /100 |
| 59 | natto | 0.3505 | 1 | 1 | single recorded material | potassium: 35.0481% /100 |
| 60 | rosemary | 0.3212 | 1 | 1 | single recorded material | potassium: 32.1154% /100 |
| 61 | peppermint | 0.2736 | 1 | 1 | single recorded material | potassium: 27.3558% /100 |
| 62 | wasabi | 0.2731 | 1 | 1 | single recorded material | potassium: 27.3077% /100 |
| 63 | cilantro | 0.2505 | 1 | 1 | single recorded material | potassium: 25.0481% /100 |
| 64 | heart | 0.2469 | 1 | 2 | single recorded material | vitamin-b2: 24.6866% /100 |
| 65 | avocado | 0.2332 | 1 | 1 | single recorded material | potassium: 23.3173% /100 |
| 66 | romaine-lettuce | 0.2313 | 1 | 4 | single recorded material | vitamin-b9: 23.1293% /100 |
| 67 | spelt | 0.2297 | 1 | 2 | single recorded material | magnesium: 22.9730% /100 |
| 68 | lions-mane-mushroom | 0.2131 | 1 | 1 | single recorded material | potassium: 21.3125% /100 |
| 69 | wheat | 0.2128 | 1 | 2 | single recorded material | magnesium: 21.2838% /100 |
| 70 | cinnamon | 0.2072 | 1 | 1 | single recorded material | potassium: 20.7212% /100 |
| 71 | beetroot | 0.2063 | 1 | 4 | single recorded material | betaine: 20.6349% /100 |
| 72 | jerusalem-artichokes | 0.2062 | 1 | 1 | single recorded material | potassium: 20.6250% /100 |
| 73 | potatoes | 0.2043 | 1 | 1 | single recorded material | potassium: 20.4327% /100 |
| 74 | oyster-mushroom | 0.2019 | 1 | 1 | single recorded material | potassium: 20.1923% /100 |
## Detailed components and source pointers

Every retained substance remains visible. ★ denotes a combined-view winning observation for its scoring input, not an extra PM-weighted award. Repeated PM rows explain coverage, not extra points.

| Food | Substance | RSP | PM / ownership | Winner | Amount / basis | Exact material / preparation | Source | Publication |
|---|---|---|---|---|---|---|---|---|
| quinoa | betaine | 100.0000 | BRS2-FM1-PM2 / C | ★ | 630 mg / per 100 g edible portion | Quinoa / uncooked (NDB crosswalk; not stated in the 2008 table) | docs/foods/quinoa.md#nutrition_supplementary_sources/betaine_usda_review01_20035 | pin-matched |
| quinoa | betaine | 100.0000 | BRS2-FM1-PM3 / C | ★ | 630 mg / per 100 g edible portion | Quinoa / uncooked (NDB crosswalk; not stated in the 2008 table) | docs/foods/quinoa.md#nutrition_supplementary_sources/betaine_usda_review01_20035 | pin-matched |
| quinoa | betaine | 100.0000 | BRS2-FM1-PM4 / C | ★ | 630 mg / per 100 g edible portion | Quinoa / uncooked (NDB crosswalk; not stated in the 2008 table) | docs/foods/quinoa.md#nutrition_supplementary_sources/betaine_usda_review01_20035 | pin-matched |
| quinoa | betaine | 100.0000 | BRS2-FM3-PM7 / C | ★ | 630 mg / per 100 g edible portion | Quinoa / uncooked (NDB crosswalk; not stated in the 2008 table) | docs/foods/quinoa.md#nutrition_supplementary_sources/betaine_usda_review01_20035 | pin-matched |
| wheat-germ | betaine | 65.0794 | BRS2-FM1-PM2 / C | ★ | 410 mg / per 100 g edible portion | Cereals ready-to-eat, wheat germ, toasted, plain / toasted | docs/foods/wheat-germ.md#nutrition_supplementary_sources/betaine_usda_review01_08084 | pin-matched |
| wheat-germ | betaine | 65.0794 | BRS2-FM1-PM3 / C | ★ | 410 mg / per 100 g edible portion | Cereals ready-to-eat, wheat germ, toasted, plain / toasted | docs/foods/wheat-germ.md#nutrition_supplementary_sources/betaine_usda_review01_08084 | pin-matched |
| wheat-germ | betaine | 65.0794 | BRS2-FM1-PM4 / C | ★ | 410 mg / per 100 g edible portion | Cereals ready-to-eat, wheat germ, toasted, plain / toasted | docs/foods/wheat-germ.md#nutrition_supplementary_sources/betaine_usda_review01_08084 | pin-matched |
| wheat-germ | betaine | 65.0794 | BRS2-FM3-PM7 / C | ★ | 410 mg / per 100 g edible portion | Cereals ready-to-eat, wheat germ, toasted, plain / toasted | docs/foods/wheat-germ.md#nutrition_supplementary_sources/betaine_usda_review01_08084 | pin-matched |
| beetroot | betaine | 20.6349 | BRS2-FM1-PM2 / C | ★ | 130 mg / per 100 g edible portion | Beets, raw / raw | docs/foods/beetroot.md#nutrition_supplementary_sources/betaine_usda_review01_11080 | pin-matched |
| beetroot | betaine | 20.6349 | BRS2-FM1-PM3 / C | ★ | 130 mg / per 100 g edible portion | Beets, raw / raw | docs/foods/beetroot.md#nutrition_supplementary_sources/betaine_usda_review01_11080 | pin-matched |
| beetroot | betaine | 20.6349 | BRS2-FM1-PM4 / C | ★ | 130 mg / per 100 g edible portion | Beets, raw / raw | docs/foods/beetroot.md#nutrition_supplementary_sources/betaine_usda_review01_11080 | pin-matched |
| beetroot | betaine | 20.6349 | BRS2-FM3-PM7 / C | ★ | 130 mg / per 100 g edible portion | Beets, raw / raw | docs/foods/beetroot.md#nutrition_supplementary_sources/betaine_usda_review01_11080 | pin-matched |
| egg-yolks | choline | 100.0000 | BRS2-FM1-PM2 / C | ★ | 820.2 mg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| egg-yolks | choline | 100.0000 | BRS2-FM1-PM3 / C | ★ | 820.2 mg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| egg-yolks | choline | 100.0000 | BRS2-FM1-PM4 / C | ★ | 820.2 mg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| egg-yolks | choline | 100.0000 | BRS2-FM3-PM7 / A | ★ | 820.2 mg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| liver | choline | 40.6364 | BRS2-FM1-PM2 / C | ★ | 333.3 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| liver | choline | 40.6364 | BRS2-FM1-PM3 / C | ★ | 333.3 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| liver | choline | 40.6364 | BRS2-FM1-PM4 / C | ★ | 333.3 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| liver | choline | 40.6364 | BRS2-FM3-PM7 / A | ★ | 333.3 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| eggs | choline | 35.8205 | BRS2-FM1-PM2 / C | ★ | 293.8 mg / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/choline_mg | pin-matched |
| eggs | choline | 35.8205 | BRS2-FM1-PM3 / C | ★ | 293.8 mg / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/choline_mg | pin-matched |
| eggs | choline | 35.8205 | BRS2-FM1-PM4 / C | ★ | 293.8 mg / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/choline_mg | pin-matched |
| eggs | choline | 35.8205 | BRS2-FM3-PM7 / A | ★ | 293.8 mg / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/choline_mg | pin-matched |
| chicken-liver | choline | 23.7015 | BRS2-FM1-PM2 / C | ★ | 194.4 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| chicken-liver | choline | 23.7015 | BRS2-FM1-PM3 / C | ★ | 194.4 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| chicken-liver | choline | 23.7015 | BRS2-FM1-PM4 / C | ★ | 194.4 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| chicken-liver | choline | 23.7015 | BRS2-FM3-PM7 / A | ★ | 194.4 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/choline_mg | listed-publication-pin-pending |
| pumpkin-seeds | glycine | 100.0000 | BRS2-FM1-PM4 / A | ★ | 1.843 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / Seeds, pumpkin and squash seed kernels, dried | docs/foods/pumpkin-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170556 | pin-matched |
| pumpkin-seeds | glycine | 100.0000 | BRS2-FM2-PM6 / A | ★ | 1.843 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / Seeds, pumpkin and squash seed kernels, dried | docs/foods/pumpkin-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170556 | pin-matched |
| sunflower-seeds | glycine | 79.2729 | BRS2-FM1-PM4 / A | ★ | 1.461 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / Seeds, sunflower seed kernels, dried | docs/foods/sunflower-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170562 | pin-matched |
| sunflower-seeds | glycine | 79.2729 | BRS2-FM2-PM6 / A | ★ | 1.461 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / Seeds, sunflower seed kernels, dried | docs/foods/sunflower-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170562 | pin-matched |
| almonds | glycine | 77.5366 | BRS2-FM1-PM4 / A | ★ | 1.429 g / per 100 g edible portion | Nuts, almonds / Nuts, almonds | docs/foods/almonds.md#nutrition_supplementary_sources/glycine_usda_review01_170567 | pin-matched |
| almonds | glycine | 77.5366 | BRS2-FM2-PM6 / A | ★ | 1.429 g / per 100 g edible portion | Nuts, almonds / Nuts, almonds | docs/foods/almonds.md#nutrition_supplementary_sources/glycine_usda_review01_170567 | pin-matched |
| anchovies | glycine | 75.2577 | BRS2-FM1-PM4 / A | ★ | 1.387 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/glycine_usda_brs2_174183 | listed-publication-pin-pending |
| anchovies | glycine | 75.2577 | BRS2-FM2-PM6 / A | ★ | 1.387 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/glycine_usda_brs2_174183 | listed-publication-pin-pending |
| beef | glycine | 68.4753 | BRS2-FM1-PM4 / A | ★ | 1.262 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) | docs/foods/beef.md#nutrition_supplementary_sources/glycine_usda_review01_171796 | listed-publication-pin-pending |
| beef | glycine | 68.4753 | BRS2-FM2-PM6 / A | ★ | 1.262 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) | docs/foods/beef.md#nutrition_supplementary_sources/glycine_usda_review01_171796 | listed-publication-pin-pending |
| chicken | glycine | 66.3592 | BRS2-FM1-PM4 / A | ★ | 1.223 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / Chicken, broilers or fryers, meat and skin, raw | docs/foods/chicken.md#nutrition_supplementary_sources/glycine_usda_review01_171447 | listed-publication-pin-pending |
| chicken | glycine | 66.3592 | BRS2-FM2-PM6 / A | ★ | 1.223 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / Chicken, broilers or fryers, meat and skin, raw | docs/foods/chicken.md#nutrition_supplementary_sources/glycine_usda_review01_171447 | listed-publication-pin-pending |
| sardines | glycine | 64.0803 | BRS2-FM1-PM4 / A | ★ | 1.181 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/glycine_usda_brs2_175139 | listed-publication-pin-pending |
| sardines | glycine | 64.0803 | BRS2-FM2-PM6 / A | ★ | 1.181 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/glycine_usda_brs2_175139 | listed-publication-pin-pending |
| liver | glycine | 63.1579 | BRS2-FM1-PM4 / A | ★ | 1.164 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/glycine_usda_brs2_169451 | listed-publication-pin-pending |
| liver | glycine | 63.1579 | BRS2-FM2-PM6 / A | ★ | 1.164 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/glycine_usda_brs2_169451 | listed-publication-pin-pending |
| tuna | glycine | 60.7705 | BRS2-FM1-PM4 / A | ★ | 1.12 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/glycine_usda_brs2_173706 | listed-publication-pin-pending |
| tuna | glycine | 60.7705 | BRS2-FM2-PM6 / A | ★ | 1.12 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/glycine_usda_brs2_173706 | listed-publication-pin-pending |
| pork | glycine | 55.2903 | BRS2-FM1-PM4 / A | ★ | 1.019 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/glycine_usda_brs2_167818 | listed-publication-pin-pending |
| pork | glycine | 55.2903 | BRS2-FM2-PM6 / A | ★ | 1.019 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/glycine_usda_brs2_167818 | listed-publication-pin-pending |
| turkey | glycine | 52.4145 | BRS2-FM1-PM4 / A | ★ | 0.966 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/glycine_usda_brs2_171480 | listed-publication-pin-pending |
| turkey | glycine | 52.4145 | BRS2-FM2-PM6 / A | ★ | 0.966 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/glycine_usda_brs2_171480 | listed-publication-pin-pending |
| salmon | glycine | 52.0890 | BRS2-FM1-PM4 / A | ★ | 0.96 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / Fish, salmon, Atlantic, farmed, raw | docs/foods/salmon.md#nutrition_supplementary_sources/glycine_usda_review01_175167 | listed-publication-pin-pending |
| salmon | glycine | 52.0890 | BRS2-FM2-PM6 / A | ★ | 0.96 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / Fish, salmon, Atlantic, farmed, raw | docs/foods/salmon.md#nutrition_supplementary_sources/glycine_usda_review01_175167 | listed-publication-pin-pending |
| mackerel | glycine | 48.4536 | BRS2-FM1-PM4 / A | ★ | 0.893 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/glycine_usda_brs2_175119 | listed-publication-pin-pending |
| mackerel | glycine | 48.4536 | BRS2-FM2-PM6 / A | ★ | 0.893 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/glycine_usda_brs2_175119 | listed-publication-pin-pending |
| herring | glycine | 46.7716 | BRS2-FM1-PM4 / A | ★ | 0.862 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/glycine_usda_brs2_175116 | listed-publication-pin-pending |
| herring | glycine | 46.7716 | BRS2-FM2-PM6 / A | ★ | 0.862 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/glycine_usda_brs2_175116 | listed-publication-pin-pending |
| cod | glycine | 46.3918 | BRS2-FM1-PM4 / A | ★ | 0.855 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/glycine_usda_brs2_171955 | listed-publication-pin-pending |
| cod | glycine | 46.3918 | BRS2-FM2-PM6 / A | ★ | 0.855 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/glycine_usda_brs2_171955 | listed-publication-pin-pending |
| chicken-liver | glycine | 46.0662 | BRS2-FM1-PM4 / A | ★ | 0.849 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/glycine_usda_brs2_171060 | listed-publication-pin-pending |
| chicken-liver | glycine | 46.0662 | BRS2-FM2-PM6 / A | ★ | 0.849 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/glycine_usda_brs2_171060 | listed-publication-pin-pending |
| lamb | glycine | 43.8958 | BRS2-FM1-PM4 / A | ★ | 0.809 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/glycine_usda_brs2_174370 | listed-publication-pin-pending |
| lamb | glycine | 43.8958 | BRS2-FM2-PM6 / A | ★ | 0.809 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/glycine_usda_brs2_174370 | listed-publication-pin-pending |
| egg-yolks | glycine | 26.4786 | BRS2-FM1-PM4 / A | ★ | 0.488 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/glycine_usda_brs2_172184 | listed-publication-pin-pending |
| egg-yolks | glycine | 26.4786 | BRS2-FM2-PM6 / A | ★ | 0.488 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/glycine_usda_brs2_172184 | listed-publication-pin-pending |
| eggs | glycine | 23.4400 | BRS2-FM1-PM4 / A | ★ | 0.432 g / per 100 g edible portion | Egg, whole, raw, fresh / Egg, whole, raw, fresh | docs/foods/eggs.md#nutrition_supplementary_sources/glycine_usda_review01_171287 | pin-matched |
| eggs | glycine | 23.4400 | BRS2-FM2-PM6 / A | ★ | 0.432 g / per 100 g edible portion | Egg, whole, raw, fresh / Egg, whole, raw, fresh | docs/foods/eggs.md#nutrition_supplementary_sources/glycine_usda_review01_171287 | pin-matched |
| pumpkin-seeds | magnesium | 100.0000 | BRS2-FM1-PM3 / A | ★ | 592 mg / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| pumpkin-seeds | magnesium | 100.0000 | BRS2-FM2-PM6 / A | ★ | 592 mg / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cocoa | magnesium | 84.2905 | BRS2-FM1-PM3 / A | ★ | 499 mg / per 100 g edible portion | Cocoa, dry powder, unsweetened / dry powder | docs/foods/cocoa.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cocoa | magnesium | 84.2905 | BRS2-FM2-PM6 / A | ★ | 499 mg / per 100 g edible portion | Cocoa, dry powder, unsweetened / dry powder | docs/foods/cocoa.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sage | magnesium | 72.2973 | BRS2-FM1-PM3 / A | ★ | 428 mg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sage | magnesium | 72.2973 | BRS2-FM2-PM6 / A | ★ | 428 mg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/magnesium_mg | pin-matched |
| flax-seeds | magnesium | 66.2162 | BRS2-FM1-PM3 / A | ★ | 392 mg / per 100 g edible portion | Seeds, flaxseed / null | docs/foods/flax-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| flax-seeds | magnesium | 66.2162 | BRS2-FM2-PM6 / A | ★ | 392 mg / per 100 g edible portion | Seeds, flaxseed / null | docs/foods/flax-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| brazil-nuts | magnesium | 63.5135 | BRS2-FM1-PM3 / A | ★ | 376 mg / per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| brazil-nuts | magnesium | 63.5135 | BRS2-FM2-PM6 / A | ★ | 376 mg / per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sesame-seeds | magnesium | 59.2905 | BRS2-FM1-PM3 / A | ★ | 351 mg / per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sesame-seeds | magnesium | 59.2905 | BRS2-FM2-PM6 / A | ★ | 351 mg / per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| chia-seeds | magnesium | 56.5878 | BRS2-FM1-PM3 / A | ★ | 335 mg / per 100 g edible portion | Seeds, chia seeds, dried / dried | docs/foods/chia-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| chia-seeds | magnesium | 56.5878 | BRS2-FM2-PM6 / A | ★ | 335 mg / per 100 g edible portion | Seeds, chia seeds, dried / dried | docs/foods/chia-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sunflower-seeds | magnesium | 54.8986 | BRS2-FM1-PM3 / A | ★ | 325 mg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sunflower-seeds | magnesium | 54.8986 | BRS2-FM2-PM6 / A | ★ | 325 mg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cashews | magnesium | 49.3243 | BRS2-FM1-PM3 / A | ★ | 292 mg / per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cashews | magnesium | 49.3243 | BRS2-FM2-PM6 / A | ★ | 292 mg / per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/magnesium_mg | pin-matched |
| soy | magnesium | 47.2973 | BRS2-FM1-PM3 / A | ★ | 280 mg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/magnesium_mg | pin-matched |
| soy | magnesium | 47.2973 | BRS2-FM2-PM6 / A | ★ | 280 mg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/magnesium_mg | pin-matched |
| almonds | magnesium | 45.6081 | BRS2-FM1-PM3 / A | ★ | 270 mg / per 100 g edible portion | Nuts, almonds / null | docs/foods/almonds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| almonds | magnesium | 45.6081 | BRS2-FM2-PM6 / A | ★ | 270 mg / per 100 g edible portion | Nuts, almonds / null | docs/foods/almonds.md#nutrition_per_100g/magnesium_mg | pin-matched |
| oregano | magnesium | 45.6081 | BRS2-FM1-PM3 / A | ★ | 270 mg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/magnesium_mg | pin-matched |
| oregano | magnesium | 45.6081 | BRS2-FM2-PM6 / A | ★ | 270 mg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/magnesium_mg | pin-matched |
| saffron | magnesium | 44.5946 | BRS2-FM1-PM3 / A | ★ | 264 mg / per 100 g edible portion | Spices, saffron / null | docs/foods/saffron.md#nutrition_per_100g/magnesium_mg | pin-matched |
| saffron | magnesium | 44.5946 | BRS2-FM2-PM6 / A | ★ | 264 mg / per 100 g edible portion | Spices, saffron / null | docs/foods/saffron.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cloves | magnesium | 43.7500 | BRS2-FM1-PM3 / A | ★ | 259 mg / per 100 g edible portion | Spices, cloves, ground / null | docs/foods/cloves.md#nutrition_per_100g/magnesium_mg | pin-matched |
| cloves | magnesium | 43.7500 | BRS2-FM2-PM6 / A | ★ | 259 mg / per 100 g edible portion | Spices, cloves, ground / null | docs/foods/cloves.md#nutrition_per_100g/magnesium_mg | pin-matched |
| amaranth | magnesium | 41.8919 | BRS2-FM1-PM3 / A | ★ | 248 mg / per 100 g edible portion | Amaranth grain, uncooked / uncooked | docs/foods/amaranth.md#nutrition_per_100g/magnesium_mg | pin-matched |
| amaranth | magnesium | 41.8919 | BRS2-FM2-PM6 / A | ★ | 248 mg / per 100 g edible portion | Amaranth grain, uncooked / uncooked | docs/foods/amaranth.md#nutrition_per_100g/magnesium_mg | pin-matched |
| wheat-germ | magnesium | 40.3716 | BRS2-FM1-PM3 / A | ★ | 239 mg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/magnesium_mg | pin-matched |
| wheat-germ | magnesium | 40.3716 | BRS2-FM2-PM6 / A | ★ | 239 mg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/magnesium_mg | pin-matched |
| buckwheat | magnesium | 39.0203 | BRS2-FM1-PM3 / A | ★ | 231 mg / per 100 g edible portion | Buckwheat / null | docs/foods/buckwheat.md#nutrition_per_100g/magnesium_mg | pin-matched |
| buckwheat | magnesium | 39.0203 | BRS2-FM2-PM6 / A | ★ | 231 mg / per 100 g edible portion | Buckwheat / null | docs/foods/buckwheat.md#nutrition_per_100g/magnesium_mg | pin-matched |
| dark-chocolate | magnesium | 38.5135 | BRS2-FM1-PM3 / A | ★ | 228 mg / per 100 g edible portion | Chocolate, dark, 70-85% cacao solids / null | docs/foods/dark-chocolate.md#nutrition_per_100g/magnesium_mg | pin-matched |
| dark-chocolate | magnesium | 38.5135 | BRS2-FM2-PM6 / A | ★ | 228 mg / per 100 g edible portion | Chocolate, dark, 70-85% cacao solids / null | docs/foods/dark-chocolate.md#nutrition_per_100g/magnesium_mg | pin-matched |
| thyme | magnesium | 37.1622 | BRS2-FM1-PM3 / A | ★ | 220 mg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/magnesium_mg | pin-matched |
| thyme | magnesium | 37.1622 | BRS2-FM2-PM6 / A | ★ | 220 mg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/magnesium_mg | pin-matched |
| turmeric | magnesium | 35.1351 | BRS2-FM1-PM3 / A | ★ | 208 mg / per 100 g edible portion | Spices, turmeric, ground / null | docs/foods/turmeric.md#nutrition_per_100g/magnesium_mg | pin-matched |
| turmeric | magnesium | 35.1351 | BRS2-FM2-PM6 / A | ★ | 208 mg / per 100 g edible portion | Spices, turmeric, ground / null | docs/foods/turmeric.md#nutrition_per_100g/magnesium_mg | pin-matched |
| lupins | magnesium | 33.4459 | BRS2-FM1-PM3 / A | ★ | 198 mg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/magnesium_mg | pin-matched |
| lupins | magnesium | 33.4459 | BRS2-FM2-PM6 / A | ★ | 198 mg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/magnesium_mg | pin-matched |
| quinoa | magnesium | 33.2770 | BRS2-FM1-PM3 / A | ★ | 197 mg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/magnesium_mg | pin-matched |
| quinoa | magnesium | 33.2770 | BRS2-FM2-PM6 / A | ★ | 197 mg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/magnesium_mg | pin-matched |
| spirulina | magnesium | 32.9392 | BRS2-FM1-PM3 / A | ★ | 195 mg / per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/magnesium_mg | pin-matched |
| spirulina | magnesium | 32.9392 | BRS2-FM2-PM6 / A | ★ | 195 mg / per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/magnesium_mg | pin-matched |
| oats | magnesium | 29.8986 | BRS2-FM1-PM3 / A | ★ | 177 mg / per 100 g edible portion | Oats (Includes foods for USDA's Food Distribution Program) / null | docs/foods/oats.md#nutrition_per_100g/magnesium_mg | pin-matched |
| oats | magnesium | 29.8986 | BRS2-FM2-PM6 / A | ★ | 177 mg / per 100 g edible portion | Oats (Includes foods for USDA's Food Distribution Program) / null | docs/foods/oats.md#nutrition_per_100g/magnesium_mg | pin-matched |
| black-beans | magnesium | 28.8851 | BRS2-FM1-PM3 / A | ★ | 171 mg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/magnesium_mg | pin-matched |
| black-beans | magnesium | 28.8851 | BRS2-FM2-PM6 / A | ★ | 171 mg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/magnesium_mg | pin-matched |
| black-pepper | magnesium | 28.8851 | BRS2-FM1-PM3 / A | ★ | 171 mg / per 100 g edible portion | Spices, pepper, black / null | docs/foods/black-pepper.md#nutrition_per_100g/magnesium_mg | pin-matched |
| black-pepper | magnesium | 28.8851 | BRS2-FM2-PM6 / A | ★ | 171 mg / per 100 g edible portion | Spices, pepper, black / null | docs/foods/black-pepper.md#nutrition_per_100g/magnesium_mg | pin-matched |
| peanuts | magnesium | 28.3784 | BRS2-FM1-PM3 / A | ★ | 168 mg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| peanuts | magnesium | 28.3784 | BRS2-FM2-PM6 / A | ★ | 168 mg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| walnuts | magnesium | 26.6892 | BRS2-FM1-PM3 / A | ★ | 158 mg / per 100 g edible portion | Nuts, walnuts, english / null | docs/foods/walnuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| walnuts | magnesium | 26.6892 | BRS2-FM2-PM6 / A | ★ | 158 mg / per 100 g edible portion | Nuts, walnuts, english / null | docs/foods/walnuts.md#nutrition_per_100g/magnesium_mg | pin-matched |
| kidney-beans | magnesium | 23.6486 | BRS2-FM1-PM3 / A | ★ | 140 mg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/magnesium_mg | pin-matched |
| kidney-beans | magnesium | 23.6486 | BRS2-FM2-PM6 / A | ★ | 140 mg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/magnesium_mg | pin-matched |
| spelt | magnesium | 22.9730 | BRS2-FM1-PM3 / A | ★ | 136 mg / per 100 g edible portion | Spelt, uncooked / uncooked | docs/foods/spelt.md#nutrition_per_100g/magnesium_mg | pin-matched |
| spelt | magnesium | 22.9730 | BRS2-FM2-PM6 / A | ★ | 136 mg / per 100 g edible portion | Spelt, uncooked / uncooked | docs/foods/spelt.md#nutrition_per_100g/magnesium_mg | pin-matched |
| barley | magnesium | 22.4662 | BRS2-FM1-PM3 / A | ★ | 133 mg / per 100 g edible portion | Barley, hulled / null | docs/foods/barley.md#nutrition_per_100g/magnesium_mg | pin-matched |
| barley | magnesium | 22.4662 | BRS2-FM2-PM6 / A | ★ | 133 mg / per 100 g edible portion | Barley, hulled / null | docs/foods/barley.md#nutrition_per_100g/magnesium_mg | pin-matched |
| wheat | magnesium | 21.2838 | BRS2-FM1-PM3 / A | ★ | 126 mg / per 100 g edible portion | Wheat, hard red winter / null | docs/foods/wheat.md#nutrition_per_100g/magnesium_mg | pin-matched |
| wheat | magnesium | 21.2838 | BRS2-FM2-PM6 / A | ★ | 126 mg / per 100 g edible portion | Wheat, hard red winter / null | docs/foods/wheat.md#nutrition_per_100g/magnesium_mg | pin-matched |
| pistachios | magnesium | 20.4392 | BRS2-FM1-PM3 / A | ★ | 121 mg / per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/magnesium_mg | pin-matched |
| pistachios | magnesium | 20.4392 | BRS2-FM2-PM6 / A | ★ | 121 mg / per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/magnesium_mg | pin-matched |
| sardines | methionine | 100.0000 | BRS2-FM1-PM3 / A | ★ | 1.086 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| sardines | methionine | 100.0000 | BRS2-FM1-PM4 / A | ★ | 1.086 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| sardines | methionine | 100.0000 | BRS2-FM2-PM5 / C | ★ | 1.086 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| sardines | methionine | 100.0000 | BRS2-FM2-PM6 / B | ★ | 1.086 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| sardines | methionine | 100.0000 | BRS2-FM3-PM7 / A | ★ | 1.086 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS2-FM1-PM3 / A | ★ | 0.859 g / per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS2-FM1-PM4 / A | ★ | 0.859 g / per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS2-FM2-PM5 / C | ★ | 0.859 g / per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS2-FM2-PM6 / B | ★ | 0.859 g / per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS2-FM3-PM7 / A | ★ | 0.859 g / per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS2-FM1-PM3 / A | ★ | 0.855 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS2-FM1-PM4 / A | ★ | 0.855 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS2-FM2-PM5 / C | ★ | 0.855 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS2-FM2-PM6 / B | ★ | 0.855 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS2-FM3-PM7 / A | ★ | 0.855 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS2-FM1-PM3 / A |  | 0.729 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS2-FM1-PM4 / A |  | 0.729 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS2-FM2-PM5 / C |  | 0.729 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS2-FM2-PM6 / B |  | 0.729 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS2-FM3-PM7 / A |  | 0.729 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS2-FM1-PM3 / A | ★ | 0.705 g / per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS2-FM1-PM4 / A | ★ | 0.705 g / per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS2-FM2-PM5 / C | ★ | 0.705 g / per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS2-FM2-PM6 / B | ★ | 0.705 g / per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS2-FM3-PM7 / A | ★ | 0.705 g / per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS2-FM1-PM3 / A | ★ | 0.69 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS2-FM1-PM4 / A | ★ | 0.69 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS2-FM2-PM5 / C | ★ | 0.69 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS2-FM2-PM6 / B | ★ | 0.69 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS2-FM3-PM7 / A | ★ | 0.69 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS2-FM1-PM3 / A | ★ | 0.654 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS2-FM1-PM4 / A | ★ | 0.654 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS2-FM2-PM5 / C | ★ | 0.654 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS2-FM2-PM6 / B | ★ | 0.654 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS2-FM3-PM7 / A | ★ | 0.654 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS2-FM1-PM3 / A |  | 0.626 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS2-FM1-PM4 / A |  | 0.626 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS2-FM2-PM5 / C |  | 0.626 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS2-FM2-PM6 / B |  | 0.626 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS2-FM3-PM7 / A |  | 0.626 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| pumpkin-seeds | methionine | 55.5249 | BRS2-FM1-PM3 / A | ★ | 0.603 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| pumpkin-seeds | methionine | 55.5249 | BRS2-FM1-PM4 / A | ★ | 0.603 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| pumpkin-seeds | methionine | 55.5249 | BRS2-FM2-PM5 / C | ★ | 0.603 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| pumpkin-seeds | methionine | 55.5249 | BRS2-FM2-PM6 / B | ★ | 0.603 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| pumpkin-seeds | methionine | 55.5249 | BRS2-FM3-PM7 / A | ★ | 0.603 g / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| turkey | methionine | 54.5120 | BRS2-FM1-PM3 / A |  | 0.592 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 54.5120 | BRS2-FM1-PM4 / A |  | 0.592 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 54.5120 | BRS2-FM2-PM5 / C |  | 0.592 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 54.5120 | BRS2-FM2-PM6 / B |  | 0.592 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 54.5120 | BRS2-FM3-PM7 / A |  | 0.592 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS2-FM1-PM3 / A | ★ | 0.551 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS2-FM1-PM4 / A | ★ | 0.551 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS2-FM2-PM5 / C | ★ | 0.551 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS2-FM2-PM6 / B | ★ | 0.551 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS2-FM3-PM7 / A | ★ | 0.551 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS2-FM1-PM3 / A |  | 0.551 g / per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS2-FM1-PM4 / A |  | 0.551 g / per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS2-FM2-PM5 / C |  | 0.551 g / per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS2-FM2-PM6 / B |  | 0.551 g / per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS2-FM3-PM7 / A |  | 0.551 g / per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| cheddar-cheese | methionine | 50.3683 | BRS2-FM1-PM3 / A | ★ | 0.547 g / per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| cheddar-cheese | methionine | 50.3683 | BRS2-FM1-PM4 / A | ★ | 0.547 g / per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| cheddar-cheese | methionine | 50.3683 | BRS2-FM2-PM5 / C | ★ | 0.547 g / per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| cheddar-cheese | methionine | 50.3683 | BRS2-FM2-PM6 / B | ★ | 0.547 g / per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| cheddar-cheese | methionine | 50.3683 | BRS2-FM3-PM7 / A | ★ | 0.547 g / per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| liver | methionine | 50.0000 | BRS2-FM1-PM3 / A | ★ | 0.543 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| liver | methionine | 50.0000 | BRS2-FM1-PM4 / A | ★ | 0.543 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| liver | methionine | 50.0000 | BRS2-FM2-PM5 / C | ★ | 0.543 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| liver | methionine | 50.0000 | BRS2-FM2-PM6 / B | ★ | 0.543 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| liver | methionine | 50.0000 | BRS2-FM3-PM7 / A | ★ | 0.543 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| mussels | methionine | 49.4475 | BRS2-FM1-PM3 / A | ★ | 0.537 g / per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| mussels | methionine | 49.4475 | BRS2-FM1-PM4 / A | ★ | 0.537 g / per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| mussels | methionine | 49.4475 | BRS2-FM2-PM5 / C | ★ | 0.537 g / per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| mussels | methionine | 49.4475 | BRS2-FM2-PM6 / B | ★ | 0.537 g / per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| mussels | methionine | 49.4475 | BRS2-FM3-PM7 / A | ★ | 0.537 g / per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| herring | methionine | 48.9871 | BRS2-FM1-PM3 / A | ★ | 0.532 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| herring | methionine | 48.9871 | BRS2-FM1-PM4 / A | ★ | 0.532 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| herring | methionine | 48.9871 | BRS2-FM2-PM5 / C | ★ | 0.532 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| herring | methionine | 48.9871 | BRS2-FM2-PM6 / B | ★ | 0.532 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| herring | methionine | 48.9871 | BRS2-FM3-PM7 / A | ★ | 0.532 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS2-FM1-PM3 / A | ★ | 0.527 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS2-FM1-PM4 / A | ★ | 0.527 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS2-FM2-PM5 / C | ★ | 0.527 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS2-FM2-PM6 / B | ★ | 0.527 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS2-FM3-PM7 / A | ★ | 0.527 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS2-FM1-PM3 / A | ★ | 0.514 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS2-FM1-PM4 / A | ★ | 0.514 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS2-FM2-PM5 / C | ★ | 0.514 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS2-FM2-PM6 / B | ★ | 0.514 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS2-FM3-PM7 / A | ★ | 0.514 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| sunflower-seeds | methionine | 45.4880 | BRS2-FM1-PM3 / A | ★ | 0.494 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| sunflower-seeds | methionine | 45.4880 | BRS2-FM1-PM4 / A | ★ | 0.494 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| sunflower-seeds | methionine | 45.4880 | BRS2-FM2-PM5 / C | ★ | 0.494 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| sunflower-seeds | methionine | 45.4880 | BRS2-FM2-PM6 / B | ★ | 0.494 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| sunflower-seeds | methionine | 45.4880 | BRS2-FM3-PM7 / A | ★ | 0.494 g / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| chicken | methionine | 45.3959 | BRS2-FM1-PM3 / A |  | 0.493 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 45.3959 | BRS2-FM1-PM4 / A |  | 0.493 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 45.3959 | BRS2-FM2-PM5 / C |  | 0.493 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 45.3959 | BRS2-FM2-PM6 / B |  | 0.493 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 45.3959 | BRS2-FM3-PM7 / A |  | 0.493 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM1-PM3 / A | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM1-PM4 / A | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM2-PM5 / C | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM2-PM6 / B | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM3-PM7 / A | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM1-PM3 / A | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM1-PM4 / A | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM2-PM5 / C | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM2-PM6 / B | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS2-FM3-PM7 / A | ★ | 0.478 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS2-FM1-PM3 / A | ★ | 0.432 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS2-FM1-PM4 / A | ★ | 0.432 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS2-FM2-PM5 / C | ★ | 0.432 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS2-FM2-PM6 / B | ★ | 0.432 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS2-FM3-PM7 / A | ★ | 0.432 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS2-FM1-PM3 / A | ★ | 0.425 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS2-FM1-PM4 / A | ★ | 0.425 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS2-FM2-PM5 / C | ★ | 0.425 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS2-FM2-PM6 / B | ★ | 0.425 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS2-FM3-PM7 / A | ★ | 0.425 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| eggs | methionine | 36.0958 | BRS2-FM1-PM3 / A | ★ | 0.392 g / per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 36.0958 | BRS2-FM1-PM4 / A | ★ | 0.392 g / per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 36.0958 | BRS2-FM2-PM5 / C | ★ | 0.392 g / per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 36.0958 | BRS2-FM2-PM6 / B | ★ | 0.392 g / per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 36.0958 | BRS2-FM3-PM7 / A | ★ | 0.392 g / per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 34.9908 | BRS2-FM1-PM3 / A |  | 0.38 g / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| eggs | methionine | 34.9908 | BRS2-FM1-PM4 / A |  | 0.38 g / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| eggs | methionine | 34.9908 | BRS2-FM2-PM5 / C |  | 0.38 g / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| eggs | methionine | 34.9908 | BRS2-FM2-PM6 / B |  | 0.38 g / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| eggs | methionine | 34.9908 | BRS2-FM3-PM7 / A |  | 0.38 g / per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| egg-yolks | methionine | 34.8066 | BRS2-FM1-PM3 / A | ★ | 0.378 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| egg-yolks | methionine | 34.8066 | BRS2-FM1-PM4 / A | ★ | 0.378 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| egg-yolks | methionine | 34.8066 | BRS2-FM2-PM5 / C | ★ | 0.378 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| egg-yolks | methionine | 34.8066 | BRS2-FM2-PM6 / B | ★ | 0.378 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| egg-yolks | methionine | 34.8066 | BRS2-FM3-PM7 / A | ★ | 0.378 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| peanuts | methionine | 26.7956 | BRS2-FM1-PM3 / A | ★ | 0.291 g / per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| peanuts | methionine | 26.7956 | BRS2-FM1-PM4 / A | ★ | 0.291 g / per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| peanuts | methionine | 26.7956 | BRS2-FM2-PM5 / C | ★ | 0.291 g / per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| peanuts | methionine | 26.7956 | BRS2-FM2-PM6 / B | ★ | 0.291 g / per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| peanuts | methionine | 26.7956 | BRS2-FM3-PM7 / A | ★ | 0.291 g / per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| turmeric | potassium | 100.0000 | BRS2-FM1-PM3 / A | ★ | 2080 mg / per 100 g edible portion | Spices, turmeric, ground / null | docs/foods/turmeric.md#nutrition_per_100g/potassium_mg | pin-matched |
| soy | potassium | 86.3942 | BRS2-FM1-PM3 / A | ★ | 1797 mg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/potassium_mg | pin-matched |
| saffron | potassium | 82.8846 | BRS2-FM1-PM3 / A | ★ | 1724 mg / per 100 g edible portion | Spices, saffron / null | docs/foods/saffron.md#nutrition_per_100g/potassium_mg | pin-matched |
| cocoa | potassium | 73.2692 | BRS2-FM1-PM3 / A | ★ | 1524 mg / per 100 g edible portion | Cocoa, dry powder, unsweetened / dry powder | docs/foods/cocoa.md#nutrition_per_100g/potassium_mg | pin-matched |
| black-beans | potassium | 71.2981 | BRS2-FM1-PM3 / A | ★ | 1483 mg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/potassium_mg | pin-matched |
| kidney-beans | potassium | 67.5962 | BRS2-FM1-PM3 / A | ★ | 1406 mg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/potassium_mg | pin-matched |
| spirulina | potassium | 65.5288 | BRS2-FM1-PM3 / A | ★ | 1363 mg / per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/potassium_mg | pin-matched |
| black-pepper | potassium | 63.8942 | BRS2-FM1-PM3 / A | ★ | 1329 mg / per 100 g edible portion | Spices, pepper, black / null | docs/foods/black-pepper.md#nutrition_per_100g/potassium_mg | pin-matched |
| oregano | potassium | 60.5769 | BRS2-FM1-PM3 / A | ★ | 1260 mg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/potassium_mg | pin-matched |
| sage | potassium | 51.4423 | BRS2-FM1-PM3 / A | ★ | 1070 mg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/potassium_mg | pin-matched |
| pistachios | potassium | 49.2788 | BRS2-FM1-PM3 / A | ★ | 1025 mg / per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/potassium_mg | pin-matched |
| cloves | potassium | 49.0385 | BRS2-FM1-PM3 / A | ★ | 1020 mg / per 100 g edible portion | Spices, cloves, ground / null | docs/foods/cloves.md#nutrition_per_100g/potassium_mg | pin-matched |
| lupins | potassium | 48.7019 | BRS2-FM1-PM3 / A | ★ | 1013 mg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/potassium_mg | pin-matched |
| wheat-germ | potassium | 42.8846 | BRS2-FM1-PM3 / A | ★ | 892 mg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/potassium_mg | pin-matched |
| thyme | potassium | 39.1346 | BRS2-FM1-PM3 / A | ★ | 814 mg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/potassium_mg | pin-matched |
| flax-seeds | potassium | 39.0865 | BRS2-FM1-PM3 / A | ★ | 813 mg / per 100 g edible portion | Seeds, flaxseed / null | docs/foods/flax-seeds.md#nutrition_per_100g/potassium_mg | pin-matched |
| pumpkin-seeds | potassium | 38.8942 | BRS2-FM1-PM3 / A | ★ | 809 mg / per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/potassium_mg | pin-matched |
| almonds | potassium | 35.2404 | BRS2-FM1-PM3 / A | ★ | 733 mg / per 100 g edible portion | Nuts, almonds / null | docs/foods/almonds.md#nutrition_per_100g/potassium_mg | pin-matched |
| natto | potassium | 35.0481 | BRS2-FM1-PM3 / A | ★ | 729 mg / per 100 g edible portion | Natto / null | docs/foods/natto.md#nutrition_per_100g/potassium_mg | pin-matched |
| chickpeas | potassium | 34.5192 | BRS2-FM1-PM3 / A | ★ | 718 mg / per 100 g edible portion | Chickpeas (garbanzo beans, bengal gram), mature seeds, raw / raw | docs/foods/chickpeas.md#nutrition_per_100g/potassium_mg | pin-matched |
| dark-chocolate | potassium | 34.3750 | BRS2-FM1-PM3 / A | ★ | 715 mg / per 100 g edible portion | Chocolate, dark, 70-85% cacao solids / null | docs/foods/dark-chocolate.md#nutrition_per_100g/potassium_mg | pin-matched |
| peanuts | potassium | 33.8942 | BRS2-FM1-PM3 / A | ★ | 705 mg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/potassium_mg | pin-matched |
| lentils | potassium | 32.5481 | BRS2-FM1-PM3 / A | ★ | 677 mg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/potassium_mg | pin-matched |
| rosemary | potassium | 32.1154 | BRS2-FM1-PM3 / A | ★ | 668 mg / per 100 g edible portion | Rosemary, fresh / null | docs/foods/rosemary.md#nutrition_per_100g/potassium_mg | pin-matched |
| cashews | potassium | 31.7308 | BRS2-FM1-PM3 / A | ★ | 660 mg / per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/potassium_mg | pin-matched |
| brazil-nuts | potassium | 31.6827 | BRS2-FM1-PM3 / A | ★ | 659 mg / per 100 g edible portion | Nuts, brazilnuts, dried, unblanched / dried | docs/foods/brazil-nuts.md#nutrition_per_100g/potassium_mg | pin-matched |
| sunflower-seeds | potassium | 31.0096 | BRS2-FM1-PM3 / A | ★ | 645 mg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/potassium_mg | pin-matched |
| peppermint | potassium | 27.3558 | BRS2-FM1-PM3 / A | ★ | 569 mg / per 100 g edible portion | Peppermint, fresh / null | docs/foods/peppermint.md#nutrition_per_100g/potassium_mg | pin-matched |
| wasabi | potassium | 27.3077 | BRS2-FM1-PM3 / A | ★ | 568 mg / per 100 g edible portion | Wasabi, root, raw / raw | docs/foods/wasabi.md#nutrition_per_100g/potassium_mg | pin-matched |
| quinoa | potassium | 27.0673 | BRS2-FM1-PM3 / A | ★ | 563 mg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/potassium_mg | pin-matched |
| spinach | potassium | 26.8269 | BRS2-FM1-PM3 / A | ★ | 558 mg / per 100 g edible portion | Spinach, raw / raw | docs/foods/spinach.md#nutrition_per_100g/potassium_mg | pin-matched |
| parsley | potassium | 26.6346 | BRS2-FM1-PM3 / A | ★ | 554 mg / per 100 g edible portion | Parsley, fresh / null | docs/foods/parsley.md#nutrition_per_100g/potassium_mg | pin-matched |
| anchovies | potassium | 26.1538 | BRS2-FM1-PM3 / A | ★ | 544 mg / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned | docs/foods/anchovies.md#nutrition_per_100g/potassium_mg | listed-publication-pin-pending |
| cilantro | potassium | 25.0481 | BRS2-FM1-PM3 / A | ★ | 521 mg / per 100 g edible portion | Coriander (cilantro) leaves, raw / raw | docs/foods/cilantro.md#nutrition_per_100g/potassium_mg | pin-matched |
| amaranth | potassium | 24.4231 | BRS2-FM1-PM3 / A | ★ | 508 mg / per 100 g edible portion | Amaranth grain, uncooked / uncooked | docs/foods/amaranth.md#nutrition_per_100g/potassium_mg | pin-matched |
| avocado | potassium | 23.3173 | BRS2-FM1-PM3 / A | ★ | 485 mg / per 100 g edible portion | Avocados, raw, all commercial varieties / raw | docs/foods/avocado.md#nutrition_per_100g/potassium_mg | pin-matched |
| edamame | potassium | 23.1731 | BRS2-FM1-PM3 / A | ★ | 482 mg / per 100 g edible portion | Edamame, frozen, unprepared / frozen | docs/foods/edamame.md#nutrition_per_100g/potassium_mg | pin-matched |
| sesame-seeds | potassium | 22.5000 | BRS2-FM1-PM3 / A | ★ | 468 mg / per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/potassium_mg | pin-matched |
| buckwheat | potassium | 22.1154 | BRS2-FM1-PM3 / A | ★ | 460 mg / per 100 g edible portion | Buckwheat / null | docs/foods/buckwheat.md#nutrition_per_100g/potassium_mg | pin-matched |
| barley | potassium | 21.7308 | BRS2-FM1-PM3 / A | ★ | 452 mg / per 100 g edible portion | Barley, hulled / null | docs/foods/barley.md#nutrition_per_100g/potassium_mg | pin-matched |
| lions-mane-mushroom | potassium | 21.3125 | BRS2-FM1-PM3 / A | ★ | 443.3 mg / per 100 g edible portion | Mushroom, lion's mane / null | docs/foods/lions-mane-mushroom.md#nutrition_per_100g/potassium_mg | pin-matched |
| walnuts | potassium | 21.2019 | BRS2-FM1-PM3 / A | ★ | 441 mg / per 100 g edible portion | Nuts, walnuts, english / null | docs/foods/walnuts.md#nutrition_per_100g/potassium_mg | pin-matched |
| cinnamon | potassium | 20.7212 | BRS2-FM1-PM3 / A | ★ | 431 mg / per 100 g edible portion | Spices, cinnamon, ground / null | docs/foods/cinnamon.md#nutrition_per_100g/potassium_mg | pin-matched |
| jerusalem-artichokes | potassium | 20.6250 | BRS2-FM1-PM3 / A | ★ | 429 mg / per 100 g edible portion | Jerusalem-artichokes, raw / raw | docs/foods/jerusalem-artichokes.md#nutrition_per_100g/potassium_mg | pin-matched |
| oats | potassium | 20.6250 | BRS2-FM1-PM3 / A | ★ | 429 mg / per 100 g edible portion | Oats (Includes foods for USDA's Food Distribution Program) / null | docs/foods/oats.md#nutrition_per_100g/potassium_mg | pin-matched |
| potatoes | potassium | 20.4327 | BRS2-FM1-PM3 / A | ★ | 425 mg / per 100 g edible portion | Potatoes, flesh and skin, raw / raw | docs/foods/potatoes.md#nutrition_per_100g/potassium_mg | pin-matched |
| oyster-mushroom | potassium | 20.1923 | BRS2-FM1-PM3 / A | ★ | 420 mg / per 100 g edible portion | Mushrooms, oyster, raw / raw | docs/foods/oyster-mushroom.md#nutrition_per_100g/potassium_mg | pin-matched |
| egg-yolks | serine | 100.0000 | BRS2-FM2-PM5 / A | ★ | 1.326 g / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/serine_usda_brs2_172184 | listed-publication-pin-pending |
| anchovies | serine | 88.9140 | BRS2-FM2-PM5 / A | ★ | 1.179 g / per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/serine_usda_brs2_174183 | listed-publication-pin-pending |
| sardines | serine | 75.7164 | BRS2-FM2-PM5 / A | ★ | 1.004 g / per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/serine_usda_brs2_175139 | listed-publication-pin-pending |
| tuna | serine | 71.7949 | BRS2-FM2-PM5 / A | ★ | 0.952 g / per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/serine_usda_brs2_173706 | listed-publication-pin-pending |
| liver | serine | 68.2504 | BRS2-FM2-PM5 / A | ★ | 0.905 g / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/serine_usda_brs2_169451 | listed-publication-pin-pending |
| turkey | serine | 67.6471 | BRS2-FM2-PM5 / A | ★ | 0.897 g / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/serine_usda_brs2_171480 | listed-publication-pin-pending |
| salmon | serine | 67.5716 | BRS2-FM2-PM5 / A | ★ | 0.896 g / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_supplementary_sources/serine_usda_brs2_175167 | listed-publication-pin-pending |
| pork | serine | 61.4630 | BRS2-FM2-PM5 / A | ★ | 0.815 g / per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/serine_usda_brs2_167818 | listed-publication-pin-pending |
| mackerel | serine | 57.2398 | BRS2-FM2-PM5 / A | ★ | 0.759 g / per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/serine_usda_brs2_175119 | listed-publication-pin-pending |
| beef | serine | 56.1086 | BRS2-FM2-PM5 / A | ★ | 0.744 g / per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_supplementary_sources/serine_usda_brs2_171796 | listed-publication-pin-pending |
| chicken-liver | serine | 55.4299 | BRS2-FM2-PM5 / A | ★ | 0.735 g / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/serine_usda_brs2_171060 | listed-publication-pin-pending |
| herring | serine | 55.2790 | BRS2-FM2-PM5 / A | ★ | 0.733 g / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/serine_usda_brs2_175116 | listed-publication-pin-pending |
| cod | serine | 54.7511 | BRS2-FM2-PM5 / A | ★ | 0.726 g / per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/serine_usda_brs2_171955 | listed-publication-pin-pending |
| chicken | serine | 49.5475 | BRS2-FM2-PM5 / A | ★ | 0.657 g / per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_supplementary_sources/serine_usda_brs2_171447 | listed-publication-pin-pending |
| lamb | serine | 46.3801 | BRS2-FM2-PM5 / A | ★ | 0.615 g / per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/serine_usda_brs2_174370 | listed-publication-pin-pending |
| liver | vitamin-b12 | 100.0000 | BRS2-FM1-PM1 / A | ★ | 59.3 µg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b12_ug | listed-publication-pin-pending |
| liver | vitamin-b12 | 100.0000 | BRS2-FM1-PM4 / A | ★ | 59.3 µg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b12_ug | listed-publication-pin-pending |
| salmon-roe | vitamin-b12 | 79.2580 | BRS2-FM1-PM1 / A | ★ | 47 µg / per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/vitamin_b12_ug | pin-matched |
| salmon-roe | vitamin-b12 | 79.2580 | BRS2-FM1-PM4 / A | ★ | 47 µg / per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/vitamin_b12_ug | pin-matched |
| kidney | vitamin-b12 | 46.3744 | BRS2-FM1-PM1 / A | ★ | 27.5 µg / per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b12_ug | pin-matched |
| kidney | vitamin-b12 | 46.3744 | BRS2-FM1-PM4 / A | ★ | 27.5 µg / per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b12_ug | pin-matched |
| chicken-liver | vitamin-b12 | 27.9595 | BRS2-FM1-PM1 / A | ★ | 16.58 µg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b12_ug | listed-publication-pin-pending |
| chicken-liver | vitamin-b12 | 27.9595 | BRS2-FM1-PM4 / A | ★ | 16.58 µg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b12_ug | listed-publication-pin-pending |
| herring | vitamin-b12 | 23.0523 | BRS2-FM1-PM1 / A | ★ | 13.67 µg / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/vitamin_b12_ug | listed-publication-pin-pending |
| herring | vitamin-b12 | 23.0523 | BRS2-FM1-PM4 / A | ★ | 13.67 µg / per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/vitamin_b12_ug | listed-publication-pin-pending |
| mussels | vitamin-b12 | 20.2361 | BRS2-FM1-PM1 / A | ★ | 12 µg / per 100 g edible portion | Mollusks, mussel, blue, raw / raw | docs/foods/mussels.md#nutrition_per_100g/vitamin_b12_ug | pin-matched |
| mussels | vitamin-b12 | 20.2361 | BRS2-FM1-PM4 / A | ★ | 12 µg / per 100 g edible portion | Mollusks, mussel, blue, raw / raw | docs/foods/mussels.md#nutrition_per_100g/vitamin_b12_ug | pin-matched |
| spirulina | vitamin-b2 | 100.0000 | BRS2-FM1-PM1 / A | ★ | 3.67 mg / per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| spirulina | vitamin-b2 | 100.0000 | BRS2-FM1-PM4 / A | ★ | 3.67 mg / per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| kidney | vitamin-b2 | 77.3842 | BRS2-FM1-PM1 / A | ★ | 2.84 mg / per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| kidney | vitamin-b2 | 77.3842 | BRS2-FM1-PM4 / A | ★ | 2.84 mg / per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| liver | vitamin-b2 | 75.0681 | BRS2-FM1-PM1 / A | ★ | 2.755 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| liver | vitamin-b2 | 75.0681 | BRS2-FM1-PM4 / A | ★ | 2.755 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| chicken-liver | vitamin-b2 | 48.4469 | BRS2-FM1-PM1 / A | ★ | 1.778 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| chicken-liver | vitamin-b2 | 48.4469 | BRS2-FM1-PM4 / A | ★ | 1.778 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| almonds | vitamin-b2 | 31.0082 | BRS2-FM1-PM1 / A | ★ | 1.138 mg / per 100 g edible portion | Nuts, almonds / null | docs/foods/almonds.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| almonds | vitamin-b2 | 31.0082 | BRS2-FM1-PM4 / A | ★ | 1.138 mg / per 100 g edible portion | Nuts, almonds / null | docs/foods/almonds.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| heart | vitamin-b2 | 24.6866 | BRS2-FM1-PM1 / A | ★ | 0.906 mg / per 100 g edible portion | Beef, variety meats and by-products, heart, raw / raw | docs/foods/heart.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| heart | vitamin-b2 | 24.6866 | BRS2-FM1-PM4 / A | ★ | 0.906 mg / per 100 g edible portion | Beef, variety meats and by-products, heart, raw / raw | docs/foods/heart.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| soy | vitamin-b2 | 23.7057 | BRS2-FM1-PM1 / A | ★ | 0.87 mg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| soy | vitamin-b2 | 23.7057 | BRS2-FM1-PM4 / A | ★ | 0.87 mg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| sage | vitamin-b6 | 100.0000 | BRS2-FM1-PM4 / A | ★ | 2.69 mg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| sage | vitamin-b6 | 100.0000 | BRS2-FM2-PM5 / A | ★ | 2.69 mg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| pistachios | vitamin-b6 | 63.1970 | BRS2-FM1-PM4 / A | ★ | 1.7 mg / per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| pistachios | vitamin-b6 | 63.1970 | BRS2-FM2-PM5 / A | ★ | 1.7 mg / per 100 g edible portion | Nuts, pistachio nuts, raw / raw | docs/foods/pistachios.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| sunflower-seeds | vitamin-b6 | 50.0000 | BRS2-FM1-PM4 / A | ★ | 1.345 mg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| sunflower-seeds | vitamin-b6 | 50.0000 | BRS2-FM2-PM5 / A | ★ | 1.345 mg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| wheat-germ | vitamin-b6 | 48.3271 | BRS2-FM1-PM4 / A | ★ | 1.3 mg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| wheat-germ | vitamin-b6 | 48.3271 | BRS2-FM2-PM5 / A | ★ | 1.3 mg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| garlic | vitamin-b6 | 45.9108 | BRS2-FM1-PM4 / A | ★ | 1.235 mg / per 100 g edible portion | Garlic, raw / raw | docs/foods/garlic.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| garlic | vitamin-b6 | 45.9108 | BRS2-FM2-PM5 / A | ★ | 1.235 mg / per 100 g edible portion | Garlic, raw / raw | docs/foods/garlic.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| liver | vitamin-b6 | 40.2602 | BRS2-FM1-PM4 / A | ★ | 1.083 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| liver | vitamin-b6 | 40.2602 | BRS2-FM2-PM5 / A | ★ | 1.083 mg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| oregano | vitamin-b6 | 38.8104 | BRS2-FM1-PM4 / A | ★ | 1.044 mg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| oregano | vitamin-b6 | 38.8104 | BRS2-FM2-PM5 / A | ★ | 1.044 mg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| saffron | vitamin-b6 | 37.5465 | BRS2-FM1-PM4 / A | ★ | 1.01 mg / per 100 g edible portion | Spices, saffron / null | docs/foods/saffron.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| saffron | vitamin-b6 | 37.5465 | BRS2-FM2-PM5 / A | ★ | 1.01 mg / per 100 g edible portion | Spices, saffron / null | docs/foods/saffron.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| chicken-liver | vitamin-b6 | 31.7100 | BRS2-FM1-PM4 / A | ★ | 0.853 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| chicken-liver | vitamin-b6 | 31.7100 | BRS2-FM2-PM5 / A | ★ | 0.853 mg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| sesame-seeds | vitamin-b6 | 29.3680 | BRS2-FM1-PM4 / A | ★ | 0.79 mg / per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| sesame-seeds | vitamin-b6 | 29.3680 | BRS2-FM2-PM5 / A | ★ | 0.79 mg / per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| kidney | vitamin-b6 | 24.7212 | BRS2-FM1-PM4 / A | ★ | 0.665 mg / per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| kidney | vitamin-b6 | 24.7212 | BRS2-FM2-PM5 / A | ★ | 0.665 mg / per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| turkey | vitamin-b6 | 24.2379 | BRS2-FM1-PM4 / A | ★ | 0.652 mg / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| turkey | vitamin-b6 | 24.2379 | BRS2-FM2-PM5 / A | ★ | 0.652 mg / per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| salmon | vitamin-b6 | 23.6431 | BRS2-FM1-PM4 / A | ★ | 0.636 mg / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| salmon | vitamin-b6 | 23.6431 | BRS2-FM2-PM5 / A | ★ | 0.636 mg / per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/vitamin_b6_mg | listed-publication-pin-pending |
| amaranth | vitamin-b6 | 21.9703 | BRS2-FM1-PM4 / A | ★ | 0.591 mg / per 100 g edible portion | Amaranth grain, uncooked / uncooked | docs/foods/amaranth.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| amaranth | vitamin-b6 | 21.9703 | BRS2-FM2-PM5 / A | ★ | 0.591 mg / per 100 g edible portion | Amaranth grain, uncooked / uncooked | docs/foods/amaranth.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| thyme | vitamin-b6 | 20.4461 | BRS2-FM1-PM4 / A | ★ | 0.55 mg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| thyme | vitamin-b6 | 20.4461 | BRS2-FM2-PM5 / A | ★ | 0.55 mg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| lentils | vitamin-b6 | 20.0743 | BRS2-FM1-PM4 / A | ★ | 0.54 mg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| lentils | vitamin-b6 | 20.0743 | BRS2-FM2-PM5 / A | ★ | 0.54 mg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/vitamin_b6_mg | pin-matched |
| chicken-liver | vitamin-b9 | 100.0000 | BRS2-FM1-PM1 / C | ★ | 588 µg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| chicken-liver | vitamin-b9 | 100.0000 | BRS2-FM1-PM3 / C | ★ | 588 µg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| chicken-liver | vitamin-b9 | 100.0000 | BRS2-FM1-PM4 / C | ★ | 588 µg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| chicken-liver | vitamin-b9 | 100.0000 | BRS2-FM3-PM7 / C | ★ | 588 µg / per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| chickpeas | vitamin-b9 | 94.7279 | BRS2-FM1-PM1 / C | ★ | 557 µg / per 100 g edible portion | Chickpeas (garbanzo beans, bengal gram), mature seeds, raw / raw | docs/foods/chickpeas.md#nutrition_per_100g/folate_ug | pin-matched |
| chickpeas | vitamin-b9 | 94.7279 | BRS2-FM1-PM3 / C | ★ | 557 µg / per 100 g edible portion | Chickpeas (garbanzo beans, bengal gram), mature seeds, raw / raw | docs/foods/chickpeas.md#nutrition_per_100g/folate_ug | pin-matched |
| chickpeas | vitamin-b9 | 94.7279 | BRS2-FM1-PM4 / C | ★ | 557 µg / per 100 g edible portion | Chickpeas (garbanzo beans, bengal gram), mature seeds, raw / raw | docs/foods/chickpeas.md#nutrition_per_100g/folate_ug | pin-matched |
| chickpeas | vitamin-b9 | 94.7279 | BRS2-FM3-PM7 / C | ★ | 557 µg / per 100 g edible portion | Chickpeas (garbanzo beans, bengal gram), mature seeds, raw / raw | docs/foods/chickpeas.md#nutrition_per_100g/folate_ug | pin-matched |
| lentils | vitamin-b9 | 81.4626 | BRS2-FM1-PM1 / C | ★ | 479 µg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/folate_ug | pin-matched |
| lentils | vitamin-b9 | 81.4626 | BRS2-FM1-PM3 / C | ★ | 479 µg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/folate_ug | pin-matched |
| lentils | vitamin-b9 | 81.4626 | BRS2-FM1-PM4 / C | ★ | 479 µg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/folate_ug | pin-matched |
| lentils | vitamin-b9 | 81.4626 | BRS2-FM3-PM7 / C | ★ | 479 µg / per 100 g edible portion | Lentils, raw / raw | docs/foods/lentils.md#nutrition_per_100g/folate_ug | pin-matched |
| black-beans | vitamin-b9 | 75.5102 | BRS2-FM1-PM1 / C | ★ | 444 µg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| black-beans | vitamin-b9 | 75.5102 | BRS2-FM1-PM3 / C | ★ | 444 µg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| black-beans | vitamin-b9 | 75.5102 | BRS2-FM1-PM4 / C | ★ | 444 µg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| black-beans | vitamin-b9 | 75.5102 | BRS2-FM3-PM7 / C | ★ | 444 µg / per 100 g edible portion | Beans, black, mature seeds, raw / raw | docs/foods/black-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| kidney-beans | vitamin-b9 | 67.0068 | BRS2-FM1-PM1 / C | ★ | 394 µg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| kidney-beans | vitamin-b9 | 67.0068 | BRS2-FM1-PM3 / C | ★ | 394 µg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| kidney-beans | vitamin-b9 | 67.0068 | BRS2-FM1-PM4 / C | ★ | 394 µg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| kidney-beans | vitamin-b9 | 67.0068 | BRS2-FM3-PM7 / C | ★ | 394 µg / per 100 g edible portion | Beans, kidney, all types, mature seeds, raw / raw | docs/foods/kidney-beans.md#nutrition_per_100g/folate_ug | pin-matched |
| soy | vitamin-b9 | 63.7755 | BRS2-FM1-PM1 / C | ★ | 375 µg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/folate_ug | pin-matched |
| soy | vitamin-b9 | 63.7755 | BRS2-FM1-PM3 / C | ★ | 375 µg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/folate_ug | pin-matched |
| soy | vitamin-b9 | 63.7755 | BRS2-FM1-PM4 / C | ★ | 375 µg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/folate_ug | pin-matched |
| soy | vitamin-b9 | 63.7755 | BRS2-FM3-PM7 / C | ★ | 375 µg / per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/folate_ug | pin-matched |
| lupins | vitamin-b9 | 60.3741 | BRS2-FM1-PM1 / C | ★ | 355 µg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/folate_ug | pin-matched |
| lupins | vitamin-b9 | 60.3741 | BRS2-FM1-PM3 / C | ★ | 355 µg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/folate_ug | pin-matched |
| lupins | vitamin-b9 | 60.3741 | BRS2-FM1-PM4 / C | ★ | 355 µg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/folate_ug | pin-matched |
| lupins | vitamin-b9 | 60.3741 | BRS2-FM3-PM7 / C | ★ | 355 µg / per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/folate_ug | pin-matched |
| edamame | vitamin-b9 | 51.5306 | BRS2-FM1-PM1 / C | ★ | 303 µg / per 100 g edible portion | Edamame, frozen, unprepared / frozen | docs/foods/edamame.md#nutrition_per_100g/folate_ug | pin-matched |
| edamame | vitamin-b9 | 51.5306 | BRS2-FM1-PM3 / C | ★ | 303 µg / per 100 g edible portion | Edamame, frozen, unprepared / frozen | docs/foods/edamame.md#nutrition_per_100g/folate_ug | pin-matched |
| edamame | vitamin-b9 | 51.5306 | BRS2-FM1-PM4 / C | ★ | 303 µg / per 100 g edible portion | Edamame, frozen, unprepared / frozen | docs/foods/edamame.md#nutrition_per_100g/folate_ug | pin-matched |
| edamame | vitamin-b9 | 51.5306 | BRS2-FM3-PM7 / C | ★ | 303 µg / per 100 g edible portion | Edamame, frozen, unprepared / frozen | docs/foods/edamame.md#nutrition_per_100g/folate_ug | pin-matched |
| liver | vitamin-b9 | 49.3197 | BRS2-FM1-PM1 / C | ★ | 290 µg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| liver | vitamin-b9 | 49.3197 | BRS2-FM1-PM3 / C | ★ | 290 µg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| liver | vitamin-b9 | 49.3197 | BRS2-FM1-PM4 / C | ★ | 290 µg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| liver | vitamin-b9 | 49.3197 | BRS2-FM3-PM7 / C | ★ | 290 µg / per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| wheat-germ | vitamin-b9 | 47.7891 | BRS2-FM1-PM1 / C | ★ | 281 µg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/folate_ug | pin-matched |
| wheat-germ | vitamin-b9 | 47.7891 | BRS2-FM1-PM3 / C | ★ | 281 µg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/folate_ug | pin-matched |
| wheat-germ | vitamin-b9 | 47.7891 | BRS2-FM1-PM4 / C | ★ | 281 µg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/folate_ug | pin-matched |
| wheat-germ | vitamin-b9 | 47.7891 | BRS2-FM3-PM7 / C | ★ | 281 µg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/folate_ug | pin-matched |
| sage | vitamin-b9 | 46.5986 | BRS2-FM1-PM1 / C | ★ | 274 µg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/folate_ug | pin-matched |
| sage | vitamin-b9 | 46.5986 | BRS2-FM1-PM3 / C | ★ | 274 µg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/folate_ug | pin-matched |
| sage | vitamin-b9 | 46.5986 | BRS2-FM1-PM4 / C | ★ | 274 µg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/folate_ug | pin-matched |
| sage | vitamin-b9 | 46.5986 | BRS2-FM3-PM7 / C | ★ | 274 µg / per 100 g edible portion | Spices, sage, ground / null | docs/foods/sage.md#nutrition_per_100g/folate_ug | pin-matched |
| thyme | vitamin-b9 | 46.5986 | BRS2-FM1-PM1 / C | ★ | 274 µg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/folate_ug | pin-matched |
| thyme | vitamin-b9 | 46.5986 | BRS2-FM1-PM3 / C | ★ | 274 µg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/folate_ug | pin-matched |
| thyme | vitamin-b9 | 46.5986 | BRS2-FM1-PM4 / C | ★ | 274 µg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/folate_ug | pin-matched |
| thyme | vitamin-b9 | 46.5986 | BRS2-FM3-PM7 / C | ★ | 274 µg / per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/folate_ug | pin-matched |
| peanuts | vitamin-b9 | 40.8163 | BRS2-FM1-PM1 / C | ★ | 240 µg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/folate_ug | pin-matched |
| peanuts | vitamin-b9 | 40.8163 | BRS2-FM1-PM3 / C | ★ | 240 µg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/folate_ug | pin-matched |
| peanuts | vitamin-b9 | 40.8163 | BRS2-FM1-PM4 / C | ★ | 240 µg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/folate_ug | pin-matched |
| peanuts | vitamin-b9 | 40.8163 | BRS2-FM3-PM7 / C | ★ | 240 µg / per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/folate_ug | pin-matched |
| oregano | vitamin-b9 | 40.3061 | BRS2-FM1-PM1 / C | ★ | 237 µg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/folate_ug | pin-matched |
| oregano | vitamin-b9 | 40.3061 | BRS2-FM1-PM3 / C | ★ | 237 µg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/folate_ug | pin-matched |
| oregano | vitamin-b9 | 40.3061 | BRS2-FM1-PM4 / C | ★ | 237 µg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/folate_ug | pin-matched |
| oregano | vitamin-b9 | 40.3061 | BRS2-FM3-PM7 / C | ★ | 237 µg / per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/folate_ug | pin-matched |
| sunflower-seeds | vitamin-b9 | 38.6054 | BRS2-FM1-PM1 / C | ★ | 227 µg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/folate_ug | pin-matched |
| sunflower-seeds | vitamin-b9 | 38.6054 | BRS2-FM1-PM3 / C | ★ | 227 µg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/folate_ug | pin-matched |
| sunflower-seeds | vitamin-b9 | 38.6054 | BRS2-FM1-PM4 / C | ★ | 227 µg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/folate_ug | pin-matched |
| sunflower-seeds | vitamin-b9 | 38.6054 | BRS2-FM3-PM7 / C | ★ | 227 µg / per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/folate_ug | pin-matched |
| spinach | vitamin-b9 | 32.9932 | BRS2-FM1-PM1 / C | ★ | 194 µg / per 100 g edible portion | Spinach, raw / raw | docs/foods/spinach.md#nutrition_per_100g/folate_ug | pin-matched |
| spinach | vitamin-b9 | 32.9932 | BRS2-FM1-PM3 / C | ★ | 194 µg / per 100 g edible portion | Spinach, raw / raw | docs/foods/spinach.md#nutrition_per_100g/folate_ug | pin-matched |
| spinach | vitamin-b9 | 32.9932 | BRS2-FM1-PM4 / C | ★ | 194 µg / per 100 g edible portion | Spinach, raw / raw | docs/foods/spinach.md#nutrition_per_100g/folate_ug | pin-matched |
| spinach | vitamin-b9 | 32.9932 | BRS2-FM3-PM7 / C | ★ | 194 µg / per 100 g edible portion | Spinach, raw / raw | docs/foods/spinach.md#nutrition_per_100g/folate_ug | pin-matched |
| quinoa | vitamin-b9 | 31.2925 | BRS2-FM1-PM1 / C | ★ | 184 µg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/folate_ug | pin-matched |
| quinoa | vitamin-b9 | 31.2925 | BRS2-FM1-PM3 / C | ★ | 184 µg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/folate_ug | pin-matched |
| quinoa | vitamin-b9 | 31.2925 | BRS2-FM1-PM4 / C | ★ | 184 µg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/folate_ug | pin-matched |
| quinoa | vitamin-b9 | 31.2925 | BRS2-FM3-PM7 / C | ★ | 184 µg / per 100 g edible portion | Quinoa, uncooked / uncooked | docs/foods/quinoa.md#nutrition_per_100g/folate_ug | pin-matched |
| parsley | vitamin-b9 | 25.8503 | BRS2-FM1-PM1 / C | ★ | 152 µg / per 100 g edible portion | Parsley, fresh / null | docs/foods/parsley.md#nutrition_per_100g/folate_ug | pin-matched |
| parsley | vitamin-b9 | 25.8503 | BRS2-FM1-PM3 / C | ★ | 152 µg / per 100 g edible portion | Parsley, fresh / null | docs/foods/parsley.md#nutrition_per_100g/folate_ug | pin-matched |
| parsley | vitamin-b9 | 25.8503 | BRS2-FM1-PM4 / C | ★ | 152 µg / per 100 g edible portion | Parsley, fresh / null | docs/foods/parsley.md#nutrition_per_100g/folate_ug | pin-matched |
| parsley | vitamin-b9 | 25.8503 | BRS2-FM3-PM7 / C | ★ | 152 µg / per 100 g edible portion | Parsley, fresh / null | docs/foods/parsley.md#nutrition_per_100g/folate_ug | pin-matched |
| egg-yolks | vitamin-b9 | 24.8299 | BRS2-FM1-PM1 / C | ★ | 146 µg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| egg-yolks | vitamin-b9 | 24.8299 | BRS2-FM1-PM3 / C | ★ | 146 µg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| egg-yolks | vitamin-b9 | 24.8299 | BRS2-FM1-PM4 / C | ★ | 146 µg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| egg-yolks | vitamin-b9 | 24.8299 | BRS2-FM3-PM7 / C | ★ | 146 µg / per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/folate_ug | listed-publication-pin-pending |
| romaine-lettuce | vitamin-b9 | 23.1293 | BRS2-FM1-PM1 / C | ★ | 136 µg / per 100 g edible portion | Lettuce, cos or romaine, raw / raw | docs/foods/romaine-lettuce.md#nutrition_per_100g/folate_ug | pin-matched |
| romaine-lettuce | vitamin-b9 | 23.1293 | BRS2-FM1-PM3 / C | ★ | 136 µg / per 100 g edible portion | Lettuce, cos or romaine, raw / raw | docs/foods/romaine-lettuce.md#nutrition_per_100g/folate_ug | pin-matched |
| romaine-lettuce | vitamin-b9 | 23.1293 | BRS2-FM1-PM4 / C | ★ | 136 µg / per 100 g edible portion | Lettuce, cos or romaine, raw / raw | docs/foods/romaine-lettuce.md#nutrition_per_100g/folate_ug | pin-matched |
| romaine-lettuce | vitamin-b9 | 23.1293 | BRS2-FM3-PM7 / C | ★ | 136 µg / per 100 g edible portion | Lettuce, cos or romaine, raw / raw | docs/foods/romaine-lettuce.md#nutrition_per_100g/folate_ug | pin-matched |
| oysters | zinc | 100.0000 | BRS2-FM1-PM2 / A | ★ | 39.3 mg / per 100 g edible portion | Mollusks, oyster, eastern, wild, raw / raw | docs/foods/oysters.md#nutrition_per_100g/zinc_mg | pin-matched |
| wheat-germ | zinc | 31.2723 | BRS2-FM1-PM2 / A | ★ | 12.29 mg / per 100 g edible portion | Wheat germ, crude / null | docs/foods/wheat-germ.md#nutrition_per_100g/zinc_mg | pin-matched |
## Completeness and source corrections

27 exact USDA glycine/serine observations added in 15 food records. Source descriptions, nutrient IDs, row IDs and archive hash are recorded in source-corrections.json. Database-listed is not asserted independently measured. All prior quantities, prose and profiles are preserved. No new admissions. Publication pins remain pending.

| Food | Added exact-source observations | Mapped inputs / 19 |
|---|---|---|
| anchovies | glycine 1.387 g/100 g; serine 1.179 g/100 g | 11 |
| beef | serine 0.744 g/100 g | 11 |
| chicken | serine 0.657 g/100 g | 11 |
| chicken-liver | glycine 0.849 g/100 g; serine 0.735 g/100 g | 12 |
| cod | glycine 0.855 g/100 g; serine 0.726 g/100 g | 11 |
| dark-meat-poultry | none | 0 |
| heart | none | 7 |
| herring | glycine 0.862 g/100 g; serine 0.733 g/100 g | 11 |
| kidney | none | 7 |
| lamb | glycine 0.809 g/100 g; serine 0.615 g/100 g | 11 |
| liver | glycine 1.164 g/100 g; serine 0.905 g/100 g | 11 |
| lumpfish-roe | none | 0 |
| mackerel | glycine 0.893 g/100 g; serine 0.759 g/100 g | 11 |
| pork | glycine 1.019 g/100 g; serine 0.815 g/100 g | 11 |
| salmon | serine 0.896 g/100 g | 11 |
| salmon-roe | none | 7 |
| sardines | glycine 1.181 g/100 g; serine 1.004 g/100 g | 11 |
| trout-roe | none | 0 |
| tuna | glycine 1.12 g/100 g; serine 0.952 g/100 g | 11 |
| turkey | glycine 0.966 g/100 g; serine 0.897 g/100 g | 11 |
| egg-yolks | glycine 0.488 g/100 g; serine 1.326 g/100 g | 11 |
Serine’s newly recovered quantitative pool is restricted by this bounded source recovery; absence of plant values is not absence of plant serine. These completeness differences can change food order. Heart, kidney and roe records without exact matching amino-acid evidence were not filled by proxy. USDA cystine is not relabelled cysteine; glutamic-acid measurements are not equated with free glutamate or glutamine. Beef’s source-specific low tryptophan remains unchanged and flagged in the holding page; tryptophan does not score in BRS2. Egg-yolk methionine/glycine/serine remain exact raw-yolk observations.

## Named food outcomes

| Food | Combined rank / score | Change vs intake | Inputs |
|---|---|---|---|
| beef | 21 / 1.6860 | 0.5611 | glycine, methionine, serine |
| herring | 20 / 1.7409 | 1.5104 | glycine, methionine, serine, vitamin-b12 |
| turkey | 11 / 2.0922 | 1.2006 | glycine, methionine, serine, vitamin-b6 |
| sardines | 9 / 2.3980 | 1.3980 | glycine, methionine, serine |
| egg-yolks | 5 / 2.8612 | 1.6129 | choline, glycine, methionine, serine, vitamin-b9 |
| sage | 7 / 2.7034 | 0.0000 | magnesium, potassium, vitamin-b6, vitamin-b9 |
| liver | 1 / 4.8669 | 1.8141 | choline, glycine, methionine, serine, vitamin-b12, vitamin-b2, vitamin-b6, vitamin-b9 |
| bell-peppers | unscored | — | none |
| miso | unscored | — | none |
## Exclusions and unresolved identities

| Relationship | Input | Reason |
|---|---|---|
| BRS2-FM1-PM1::PM1-DIT-3 | Methylcobalamin | dietary input is not Yes |
| BRS2-FM1-PM1::PM1-DIT-5 | Homocysteine | dietary input is not Yes |
| BRS2-FM1-PM1::PM1-DIT-RECOVERY-FAD | Flavin adenine dinucleotide | dietary input is not Yes |
| BRS2-FM1-PM2::PM2-DIT-3 | Homocysteine | dietary input is not Yes |
| BRS2-FM1-PM3::PM3-KC1-UPSTREAM-POOL | One-carbon methyl-donor pool (folate, betaine, choline) | dietary input is not Yes |
| BRS2-FM1-PM3::PM3-DIT-2 | ATP | dietary input is not Yes |
| BRS2-FM1-PM3::PM3-DIT-5 | Dietary protein | unresolved dietary identity |
| BRS2-FM1-PM4::PM4-KC1-REMETHYLATION-SUPPLY | One-carbon methyl-donor pool (folate, betaine, choline) | dietary input is not Yes |
| BRS2-FM1-PM4::PM4-DIT-2 | Dietary protein | unresolved dietary identity |
| BRS2-FM2-PM5::PM5-KC2-METHIONINE-SUPPLY | Methionine-cycle sulfur supply | dietary input is not Yes |
| BRS2-FM2-PM5::PM5-KC1-COMBINED-DEPRIVATION | Combined folate/choline donor availability | dietary input is not Yes |
| BRS2-FM2-PM5::PM5-DIT-3 | Homocysteine | dietary input is not Yes |
| BRS2-FM2-PM5::PM5-DIT-5 | Cystathionine | dietary input is not Yes |
| BRS2-FM2-PM6::PM6-DIT-4 | ATP | dietary input is not Yes |
| BRS2-FM3-PM7::BRS2-FM3-PM7-KCR-1 | One-carbon methyl-donor availability | dietary input is not Yes |
| BRS2-FM3-PM7::PM7-DIT-1 | Phosphatidylethanolamine | dietary input is not Yes |
| BRS2-FM3-PM7::PM7-DIT-2 | S-adenosylmethionine (SAMe) | dietary input is not Yes |
| BRS2-FM3-PM7::PM7-DIT-8 | Cytidine triphosphate (CTP) | dietary input is not Yes |
| BRS2-FM3-PM7::PM7-DIT-9 | Diacylglycerol (DAG) | dietary input is not Yes |
| BRS2-FM3-PM7::PM7-DIT-10 | Choline | dietary input is not Yes |
| Substance | Food / record | Reason |
|---|---|---|
| 5-methyltetrahydrofolate | broccoli | No authorised compatible comparison pool for this measurement basis |
| 5-methyltetrahydrofolate | cauliflower | No authorised compatible comparison pool for this measurement basis |
| 5-methyltetrahydrofolate | kale | No authorised compatible comparison pool for this measurement basis |
| 5-methyltetrahydrofolate | kale | No authorised compatible comparison pool for this measurement basis |
| 5-methyltetrahydrofolate | spinach | No authorised compatible comparison pool for this measurement basis |
| 5-methyltetrahydrofolate | spinach | No authorised compatible comparison pool for this measurement basis |
| 5-methyltetrahydrofolate | swiss-chard | No authorised compatible comparison pool for this measurement basis |
| betaine | beetroot | No authorised compatible comparison pool for this measurement basis |
| betaine | quinoa | Unverified or held canonical quantity |
| betaine | shrimp | No authorised compatible comparison pool for this measurement basis |
| betaine | spinach | No authorised compatible comparison pool for this measurement basis |
| betaine | wheat-germ | Presence-only: no quantitative observation |
| betaine | chicken-liver | Below the provisional one-tenth threshold inside this basis. |
| betaine | spinach | Below inclusive analytical RSP 20 |
| betaine | amaranth | Below inclusive analytical RSP 20 |
| choline | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| choline | duck-fat | No authorised compatible comparison pool for this measurement basis |
| choline | early-harvest-olive-oil | Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. |
| choline | extra-virgin-olive-oil | Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. |
| choline | salmon-roe | Presence-only: no quantitative observation |
| choline | soy-lecithin | Isolated soybean lecithin emulsifier; separate ingredient-fraction pool. |
| choline | sunflower-lecithin | Presence-only: no quantitative observation |
| choline | tempeh | Presence-only: no quantitative observation |
| choline | tofu | Presence-only: no quantitative observation |
| choline | trout-roe | Presence-only: no quantitative observation |
| choline | wheat-germ | Presence-only: no quantitative observation |
| choline | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| choline | almonds | Below the provisional one-tenth threshold inside this basis. |
| choline | amaranth | Below the provisional one-tenth threshold inside this basis. |
| choline | apples | Below the provisional one-tenth threshold inside this basis. |
| choline | asparagus | Below the provisional one-tenth threshold inside this basis. |
| choline | aubergine | Below the provisional one-tenth threshold inside this basis. |
| choline | avocado | Below the provisional one-tenth threshold inside this basis. |
| choline | bananas | Below the provisional one-tenth threshold inside this basis. |
| choline | beef | Below the provisional one-tenth threshold inside this basis. |
| choline | beetroot | Below the provisional one-tenth threshold inside this basis. |
| choline | bell-peppers | Below the provisional one-tenth threshold inside this basis. |
| choline | black-beans | Below the provisional one-tenth threshold inside this basis. |
| choline | black-pepper | Below the provisional one-tenth threshold inside this basis. |
| choline | black-tea | Below the provisional one-tenth threshold inside this basis. |
| choline | blueberries | Below the provisional one-tenth threshold inside this basis. |
| choline | brazil-nuts | Below the provisional one-tenth threshold inside this basis. |
| choline | broccoli | Below the provisional one-tenth threshold inside this basis. |
| choline | brussels-sprouts | Below the provisional one-tenth threshold inside this basis. |
| choline | butter | Below the provisional one-tenth threshold inside this basis. |
| choline | cabbage | Below the provisional one-tenth threshold inside this basis. |
| choline | capers | Below the provisional one-tenth threshold inside this basis. |
| choline | carrots | Below the provisional one-tenth threshold inside this basis. |
| choline | cauliflower | Below the provisional one-tenth threshold inside this basis. |
| choline | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| choline | cherries | Below the provisional one-tenth threshold inside this basis. |
| choline | chicken | Below the provisional one-tenth threshold inside this basis. |
| choline | cilantro | Below the provisional one-tenth threshold inside this basis. |
| choline | cinnamon | Below the provisional one-tenth threshold inside this basis. |
| choline | clams | Below the provisional one-tenth threshold inside this basis. |
| choline | cloves | Below the provisional one-tenth threshold inside this basis. |
| choline | cocoa | Below the provisional one-tenth threshold inside this basis. |
| choline | coconut-oil | Below the provisional one-tenth threshold inside this basis. |
| choline | cod | Below the provisional one-tenth threshold inside this basis. |
| choline | corn | Below the provisional one-tenth threshold inside this basis. |
| choline | cranberries | Below the provisional one-tenth threshold inside this basis. |
| choline | cucumber | Below the provisional one-tenth threshold inside this basis. |
| choline | dandelion-greens | Below the provisional one-tenth threshold inside this basis. |
| choline | edamame | Below the provisional one-tenth threshold inside this basis. |
| choline | flax-seeds | Below the provisional one-tenth threshold inside this basis. |
| choline | garlic | Below the provisional one-tenth threshold inside this basis. |
| choline | ghee | Below the provisional one-tenth threshold inside this basis. |
| choline | ginger | Below the provisional one-tenth threshold inside this basis. |
| choline | grapes | Below the provisional one-tenth threshold inside this basis. |
| choline | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| choline | herring | Below the provisional one-tenth threshold inside this basis. |
| choline | jerusalem-artichokes | Below the provisional one-tenth threshold inside this basis. |
| choline | kale | Below the provisional one-tenth threshold inside this basis. |
| choline | kefir | Below the provisional one-tenth threshold inside this basis. |
| choline | kimchi | Below the provisional one-tenth threshold inside this basis. |
| choline | lamb | Below the provisional one-tenth threshold inside this basis. |
| choline | leeks | Below the provisional one-tenth threshold inside this basis. |
| choline | lemon | Below the provisional one-tenth threshold inside this basis. |
| choline | mackerel | Below the provisional one-tenth threshold inside this basis. |
| choline | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| choline | milk | Below the provisional one-tenth threshold inside this basis. |
| choline | miso | Below the provisional one-tenth threshold inside this basis. |
| choline | mushrooms | Below the provisional one-tenth threshold inside this basis. |
| choline | mussels | Below the provisional one-tenth threshold inside this basis. |
| choline | natto | Below the provisional one-tenth threshold inside this basis. |
| choline | olives | Below the provisional one-tenth threshold inside this basis. |
| choline | onions | Below the provisional one-tenth threshold inside this basis. |
| choline | oranges | Below the provisional one-tenth threshold inside this basis. |
| choline | oregano | Below the provisional one-tenth threshold inside this basis. |
| choline | oyster-mushroom | Below the provisional one-tenth threshold inside this basis. |
| choline | oysters | Below the provisional one-tenth threshold inside this basis. |
| choline | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| choline | parsley | Below the provisional one-tenth threshold inside this basis. |
| choline | peanuts | Below the provisional one-tenth threshold inside this basis. |
| choline | pears | Below the provisional one-tenth threshold inside this basis. |
| choline | peas | Below the provisional one-tenth threshold inside this basis. |
| choline | pomegranates | Below the provisional one-tenth threshold inside this basis. |
| choline | pork | Below the provisional one-tenth threshold inside this basis. |
| choline | potatoes | Below the provisional one-tenth threshold inside this basis. |
| choline | pumpkin-seeds | Below the provisional one-tenth threshold inside this basis. |
| choline | quinoa | Below the provisional one-tenth threshold inside this basis. |
| choline | radicchio | Below the provisional one-tenth threshold inside this basis. |
| choline | raspberries | Below the provisional one-tenth threshold inside this basis. |
| choline | rice | Below the provisional one-tenth threshold inside this basis. |
| choline | romaine-lettuce | Below the provisional one-tenth threshold inside this basis. |
| choline | sage | Below the provisional one-tenth threshold inside this basis. |
| choline | salmon | Below the provisional one-tenth threshold inside this basis. |
| choline | sardines | Below the provisional one-tenth threshold inside this basis. |
| choline | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| choline | scallops | Below the provisional one-tenth threshold inside this basis. |
| choline | sesame-seeds | Below the provisional one-tenth threshold inside this basis. |
| choline | shrimp | Below the provisional one-tenth threshold inside this basis. |
| choline | spinach | Below the provisional one-tenth threshold inside this basis. |
| choline | spirulina | Below the provisional one-tenth threshold inside this basis. |
| choline | strawberries | Below the provisional one-tenth threshold inside this basis. |
| choline | sunflower-seeds | Below the provisional one-tenth threshold inside this basis. |
| choline | sweet-potatoes | Below the provisional one-tenth threshold inside this basis. |
| choline | swiss-chard | Below the provisional one-tenth threshold inside this basis. |
| choline | tahini | Below the provisional one-tenth threshold inside this basis. |
| choline | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| choline | thyme | Below the provisional one-tenth threshold inside this basis. |
| choline | tomatoes | Below the provisional one-tenth threshold inside this basis. |
| choline | tuna | Below the provisional one-tenth threshold inside this basis. |
| choline | turkey | Below the provisional one-tenth threshold inside this basis. |
| choline | turmeric | Below the provisional one-tenth threshold inside this basis. |
| choline | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| choline | walnuts | Below the provisional one-tenth threshold inside this basis. |
| choline | watercress | Below the provisional one-tenth threshold inside this basis. |
| choline | watermelon | Below the provisional one-tenth threshold inside this basis. |
| choline | wheat | Below the provisional one-tenth threshold inside this basis. |
| choline | soy | Below inclusive analytical RSP 20 |
| choline | chickpeas | Below inclusive analytical RSP 20 |
| choline | lentils | Below inclusive analytical RSP 20 |
| choline | anchovies | Below inclusive analytical RSP 20 |
| cysteine | chicken | Presence-only: no quantitative observation |
| cysteine | eggs | Presence-only: no quantitative observation |
| cysteine | lentils | Presence-only: no quantitative observation |
| cysteine | lentils | Presence-only: no quantitative observation |
| cysteine | liver | Presence-only: no quantitative observation |
| cysteine | oats | Presence-only: no quantitative observation |
| cysteine | pork | Presence-only: no quantitative observation |
| cysteine | tuna | Presence-only: no quantitative observation |
| glutamate | beef | Presence-only: no quantitative observation |
| glutamate | eggs | Presence-only: no quantitative observation |
| glutamate | tofu | Presence-only: no quantitative observation |
| magnesium | broccoli-sprouts | Presence-only: no quantitative observation |
| magnesium | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| magnesium | nori | Presence-only: no quantitative observation |
| magnesium | seaweed | Presence-only: no quantitative observation |
| magnesium | sourdough-bread | Presence-only: no quantitative observation |
| magnesium | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| magnesium | whole-grains | Presence-only: no quantitative observation |
| magnesium | apples | Below the provisional one-tenth threshold inside this basis. |
| magnesium | asparagus | Below the provisional one-tenth threshold inside this basis. |
| magnesium | aubergine | Below the provisional one-tenth threshold inside this basis. |
| magnesium | avocado | Below the provisional one-tenth threshold inside this basis. |
| magnesium | bananas | Below the provisional one-tenth threshold inside this basis. |
| magnesium | beef | Below the provisional one-tenth threshold inside this basis. |
| magnesium | beetroot | Below the provisional one-tenth threshold inside this basis. |
| magnesium | bell-peppers | Below the provisional one-tenth threshold inside this basis. |
| magnesium | black-tea | Below the provisional one-tenth threshold inside this basis. |
| magnesium | blueberries | Below the provisional one-tenth threshold inside this basis. |
| magnesium | broccoli-sprouts | Below the provisional one-tenth threshold inside this basis. |
| magnesium | broccoli | Below the provisional one-tenth threshold inside this basis. |
| magnesium | brussels-sprouts | Below the provisional one-tenth threshold inside this basis. |
| magnesium | butter | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cabbage | Below the provisional one-tenth threshold inside this basis. |
| magnesium | capers | Below the provisional one-tenth threshold inside this basis. |
| magnesium | carrots | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cauliflower | Below the provisional one-tenth threshold inside this basis. |
| magnesium | chamomile-tea | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cherries | Below the provisional one-tenth threshold inside this basis. |
| magnesium | chicken-liver | Below the provisional one-tenth threshold inside this basis. |
| magnesium | chicken | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cilantro | Below the provisional one-tenth threshold inside this basis. |
| magnesium | clams | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cod | Below the provisional one-tenth threshold inside this basis. |
| magnesium | coffee | Below the provisional one-tenth threshold inside this basis. |
| magnesium | corn | Below the provisional one-tenth threshold inside this basis. |
| magnesium | crab | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cranberries | Below the provisional one-tenth threshold inside this basis. |
| magnesium | cucumber | Below the provisional one-tenth threshold inside this basis. |
| magnesium | dandelion-greens | Below the provisional one-tenth threshold inside this basis. |
| magnesium | egg-yolks | Below the provisional one-tenth threshold inside this basis. |
| magnesium | eggs | Below the provisional one-tenth threshold inside this basis. |
| magnesium | fermented-hot-sauce | Below the provisional one-tenth threshold inside this basis. |
| magnesium | garlic | Below the provisional one-tenth threshold inside this basis. |
| magnesium | ginger | Below the provisional one-tenth threshold inside this basis. |
| magnesium | grapes | Below the provisional one-tenth threshold inside this basis. |
| magnesium | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| magnesium | green-tea | Below the provisional one-tenth threshold inside this basis. |
| magnesium | heart | Below the provisional one-tenth threshold inside this basis. |
| magnesium | herring | Below the provisional one-tenth threshold inside this basis. |
| magnesium | jerusalem-artichokes | Below the provisional one-tenth threshold inside this basis. |
| magnesium | kale | Below the provisional one-tenth threshold inside this basis. |
| magnesium | kefir | Below the provisional one-tenth threshold inside this basis. |
| magnesium | kidney | Below the provisional one-tenth threshold inside this basis. |
| magnesium | kimchi | Below the provisional one-tenth threshold inside this basis. |
| magnesium | lamb | Below the provisional one-tenth threshold inside this basis. |
| magnesium | leeks | Below the provisional one-tenth threshold inside this basis. |
| magnesium | lemon | Below the provisional one-tenth threshold inside this basis. |
| magnesium | lentils | Below the provisional one-tenth threshold inside this basis. |
| magnesium | lions-mane-mushroom | Below the provisional one-tenth threshold inside this basis. |
| magnesium | liver | Below the provisional one-tenth threshold inside this basis. |
| magnesium | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| magnesium | milk | Below the provisional one-tenth threshold inside this basis. |
| magnesium | miso | Below the provisional one-tenth threshold inside this basis. |
| magnesium | mushrooms | Below the provisional one-tenth threshold inside this basis. |
| magnesium | mussels | Below the provisional one-tenth threshold inside this basis. |
| magnesium | olives | Below the provisional one-tenth threshold inside this basis. |
| magnesium | onions | Below the provisional one-tenth threshold inside this basis. |
| magnesium | oranges | Below the provisional one-tenth threshold inside this basis. |
| magnesium | oyster-mushroom | Below the provisional one-tenth threshold inside this basis. |
| magnesium | oysters | Below the provisional one-tenth threshold inside this basis. |
| magnesium | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| magnesium | parsley | Below the provisional one-tenth threshold inside this basis. |
| magnesium | pears | Below the provisional one-tenth threshold inside this basis. |
| magnesium | peas | Below the provisional one-tenth threshold inside this basis. |
| magnesium | pomegranates | Below the provisional one-tenth threshold inside this basis. |
| magnesium | pork | Below the provisional one-tenth threshold inside this basis. |
| magnesium | potatoes | Below the provisional one-tenth threshold inside this basis. |
| magnesium | radicchio | Below the provisional one-tenth threshold inside this basis. |
| magnesium | raspberries | Below the provisional one-tenth threshold inside this basis. |
| magnesium | rice | Below the provisional one-tenth threshold inside this basis. |
| magnesium | romaine-lettuce | Below the provisional one-tenth threshold inside this basis. |
| magnesium | salmon | Below the provisional one-tenth threshold inside this basis. |
| magnesium | sardines | Below the provisional one-tenth threshold inside this basis. |
| magnesium | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| magnesium | scallops | Below the provisional one-tenth threshold inside this basis. |
| magnesium | shiitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| magnesium | shrimp | Below the provisional one-tenth threshold inside this basis. |
| magnesium | strawberries | Below the provisional one-tenth threshold inside this basis. |
| magnesium | sweet-potatoes | Below the provisional one-tenth threshold inside this basis. |
| magnesium | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| magnesium | tofu | Below the provisional one-tenth threshold inside this basis. |
| magnesium | tomatoes | Below the provisional one-tenth threshold inside this basis. |
| magnesium | tuna | Below the provisional one-tenth threshold inside this basis. |
| magnesium | turkey | Below the provisional one-tenth threshold inside this basis. |
| magnesium | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| magnesium | vinegar | Below the provisional one-tenth threshold inside this basis. |
| magnesium | watercress | Below the provisional one-tenth threshold inside this basis. |
| magnesium | watermelon | Below the provisional one-tenth threshold inside this basis. |
| magnesium | chicory-root | Single-source comparison set: fewer than two distinct comparable foods |
| magnesium | nori | Single-source comparison set: fewer than two distinct comparable foods |
| magnesium | natto | Below inclusive analytical RSP 20 |
| magnesium | salmon-roe | Below inclusive analytical RSP 20 |
| magnesium | tahini | Below inclusive analytical RSP 20 |
| magnesium | rosemary | Below inclusive analytical RSP 20 |
| magnesium | swiss-chard | Below inclusive analytical RSP 20 |
| magnesium | tempeh | Below inclusive analytical RSP 20 |
| magnesium | peppermint | Below inclusive analytical RSP 20 |
| magnesium | chickpeas | Below inclusive analytical RSP 20 |
| magnesium | spinach | Below inclusive analytical RSP 20 |
| magnesium | mackerel | Below inclusive analytical RSP 20 |
| magnesium | anchovies | Below inclusive analytical RSP 20 |
| magnesium | wasabi | Below inclusive analytical RSP 20 |
| magnesium | edamame | Below inclusive analytical RSP 20 |
| magnesium | cinnamon | Below inclusive analytical RSP 20 |
| methionine | lentils | Below the provisional one-tenth threshold inside this basis. |
| methionine | milk | Below the provisional one-tenth threshold inside this basis. |
| methionine | oats | Below the provisional one-tenth threshold inside this basis. |
| methionine | quinoa | Below the provisional one-tenth threshold inside this basis. |
| methionine | tofu | Below inclusive analytical RSP 20 |
| methionine | almonds | Below inclusive analytical RSP 20 |
| methionine | kidney-beans | Below inclusive analytical RSP 20 |
| methionine | chickpeas | Below inclusive analytical RSP 20 |
| phosphatidylcholine | mussels | Presence-only: no quantitative observation |
| phosphatidylcholine | oysters | Presence-only: no quantitative observation |
| phosphatidylcholine | salmon-roe | Presence-only: no quantitative observation |
| phosphatidylcholine | soy-lecithin | Presence-only: no quantitative observation |
| phosphatidylcholine | sunflower-lecithin | Presence-only: no quantitative observation |
| phosphatidylcholine | trout-roe | Presence-only: no quantitative observation |
| potassium | broccoli-sprouts | Presence-only: no quantitative observation |
| potassium | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| potassium | early-harvest-olive-oil | Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. |
| potassium | extra-virgin-olive-oil | Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. |
| potassium | sourdough-bread | Presence-only: no quantitative observation |
| potassium | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| potassium | apples | Below the provisional one-tenth threshold inside this basis. |
| potassium | asparagus | Below the provisional one-tenth threshold inside this basis. |
| potassium | black-tea | Below the provisional one-tenth threshold inside this basis. |
| potassium | blueberries | Below the provisional one-tenth threshold inside this basis. |
| potassium | butter | Below the provisional one-tenth threshold inside this basis. |
| potassium | cabbage | Below the provisional one-tenth threshold inside this basis. |
| potassium | capers | Below the provisional one-tenth threshold inside this basis. |
| potassium | chamomile-tea | Below the provisional one-tenth threshold inside this basis. |
| potassium | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| potassium | chicken | Below the provisional one-tenth threshold inside this basis. |
| potassium | clams | Below the provisional one-tenth threshold inside this basis. |
| potassium | coffee | Below the provisional one-tenth threshold inside this basis. |
| potassium | crab | Below the provisional one-tenth threshold inside this basis. |
| potassium | cranberries | Below the provisional one-tenth threshold inside this basis. |
| potassium | cucumber | Below the provisional one-tenth threshold inside this basis. |
| potassium | egg-yolks | Below the provisional one-tenth threshold inside this basis. |
| potassium | eggs | Below the provisional one-tenth threshold inside this basis. |
| potassium | fermented-hot-sauce | Below the provisional one-tenth threshold inside this basis. |
| potassium | ghee | Below the provisional one-tenth threshold inside this basis. |
| potassium | grapes | Below the provisional one-tenth threshold inside this basis. |
| potassium | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| potassium | green-tea | Below the provisional one-tenth threshold inside this basis. |
| potassium | kefir | Below the provisional one-tenth threshold inside this basis. |
| potassium | kimchi | Below the provisional one-tenth threshold inside this basis. |
| potassium | leeks | Below the provisional one-tenth threshold inside this basis. |
| potassium | lemon | Below the provisional one-tenth threshold inside this basis. |
| potassium | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| potassium | milk | Below the provisional one-tenth threshold inside this basis. |
| potassium | olives | Below the provisional one-tenth threshold inside this basis. |
| potassium | onions | Below the provisional one-tenth threshold inside this basis. |
| potassium | oranges | Below the provisional one-tenth threshold inside this basis. |
| potassium | oysters | Below the provisional one-tenth threshold inside this basis. |
| potassium | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| potassium | pears | Below the provisional one-tenth threshold inside this basis. |
| potassium | raspberries | Below the provisional one-tenth threshold inside this basis. |
| potassium | rice | Below the provisional one-tenth threshold inside this basis. |
| potassium | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| potassium | scallops | Below the provisional one-tenth threshold inside this basis. |
| potassium | shrimp | Below the provisional one-tenth threshold inside this basis. |
| potassium | strawberries | Below the provisional one-tenth threshold inside this basis. |
| potassium | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| potassium | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| potassium | vinegar | Below the provisional one-tenth threshold inside this basis. |
| potassium | watermelon | Below the provisional one-tenth threshold inside this basis. |
| potassium | chicory-root | Single-source comparison set: fewer than two distinct comparable foods |
| potassium | nori | Single-source comparison set: fewer than two distinct comparable foods |
| potassium | ginger | Below inclusive analytical RSP 20 |
| potassium | tahini | Below inclusive analytical RSP 20 |
| potassium | cod | Below inclusive analytical RSP 20 |
| potassium | tempeh | Below inclusive analytical RSP 20 |
| potassium | chia-seeds | Below inclusive analytical RSP 20 |
| potassium | garlic | Below inclusive analytical RSP 20 |
| potassium | dandelion-greens | Below inclusive analytical RSP 20 |
| potassium | sardines | Below inclusive analytical RSP 20 |
| potassium | brussels-sprouts | Below inclusive analytical RSP 20 |
| potassium | spelt | Below inclusive analytical RSP 20 |
| potassium | swiss-chard | Below inclusive analytical RSP 20 |
| potassium | salmon | Below inclusive analytical RSP 20 |
| potassium | wheat | Below inclusive analytical RSP 20 |
| potassium | bananas | Below inclusive analytical RSP 20 |
| potassium | pork | Below inclusive analytical RSP 20 |
| potassium | kale | Below inclusive analytical RSP 20 |
| potassium | sweet-potatoes | Below inclusive analytical RSP 20 |
| potassium | watercress | Below inclusive analytical RSP 20 |
| potassium | herring | Below inclusive analytical RSP 20 |
| potassium | beetroot | Below inclusive analytical RSP 20 |
| potassium | carrots | Below inclusive analytical RSP 20 |
| potassium | mussels | Below inclusive analytical RSP 20 |
| potassium | mushrooms | Below inclusive analytical RSP 20 |
| potassium | broccoli | Below inclusive analytical RSP 20 |
| potassium | mackerel | Below inclusive analytical RSP 20 |
| potassium | liver | Below inclusive analytical RSP 20 |
| potassium | shiitake-mushroom | Below inclusive analytical RSP 20 |
| potassium | radicchio | Below inclusive analytical RSP 20 |
| potassium | cauliflower | Below inclusive analytical RSP 20 |
| potassium | beef | Below inclusive analytical RSP 20 |
| potassium | heart | Below inclusive analytical RSP 20 |
| potassium | corn | Below inclusive analytical RSP 20 |
| potassium | kidney | Below inclusive analytical RSP 20 |
| potassium | tuna | Below inclusive analytical RSP 20 |
| potassium | romaine-lettuce | Below inclusive analytical RSP 20 |
| potassium | peas | Below inclusive analytical RSP 20 |
| potassium | tofu | Below inclusive analytical RSP 20 |
| potassium | tomatoes | Below inclusive analytical RSP 20 |
| potassium | pomegranates | Below inclusive analytical RSP 20 |
| potassium | turkey | Below inclusive analytical RSP 20 |
| potassium | chicken-liver | Below inclusive analytical RSP 20 |
| potassium | aubergine | Below inclusive analytical RSP 20 |
| potassium | cherries | Below inclusive analytical RSP 20 |
| potassium | lamb | Below inclusive analytical RSP 20 |
| potassium | broccoli-sprouts | Below inclusive analytical RSP 20 |
| potassium | bell-peppers | Below inclusive analytical RSP 20 |
| potassium | miso | Below inclusive analytical RSP 20 |
| potassium | salmon-roe | Below inclusive analytical RSP 20 |
| pyridoxal-5-phosphate | milk | Presence-only: no quantitative observation |
| uridine | milk | Presence-only: no quantitative observation |
| vitamin-b12 | chlorella | Active cobalamin identity unverified for this algal preparation. |
| vitamin-b12 | chlorella | Presence-only: no quantitative observation |
| vitamin-b12 | cockles | Presence-only: no quantitative observation |
| vitamin-b12 | crab | Presence-only: no quantitative observation |
| vitamin-b12 | fortified-plant-milks | Presence-only: no quantitative observation |
| vitamin-b12 | nori | Presence-only: no quantitative observation |
| vitamin-b12 | nutritional-yeast | Presence-only: no quantitative observation |
| vitamin-b12 | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| vitamin-b12 | anchovies | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | beef | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | butter | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | chicken | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | cod | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | crab | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | dark-chocolate | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | egg-yolks | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | eggs | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | ghee | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | kefir | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | lamb | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | milk | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | miso | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | mushrooms | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | pork | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | salmon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | scallops | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | shrimp | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | tempeh | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | turkey | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b12 | nutritional-yeast | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b12 | clams | Below inclusive analytical RSP 20 |
| vitamin-b12 | tuna | Below inclusive analytical RSP 20 |
| vitamin-b12 | sardines | Below inclusive analytical RSP 20 |
| vitamin-b12 | oysters | Below inclusive analytical RSP 20 |
| vitamin-b12 | mackerel | Below inclusive analytical RSP 20 |
| vitamin-b12 | heart | Below inclusive analytical RSP 20 |
| vitamin-b2 | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| vitamin-b2 | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| vitamin-b2 | amaranth | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | anchovies | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | apples | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | asparagus | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | aubergine | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | avocado | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | bananas | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | barley | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | beef | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | beetroot | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | bell-peppers | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | black-beans | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | black-tea | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | blueberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | brazil-nuts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | broccoli | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | brussels-sprouts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | butter | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cabbage | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | capers | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | carrots | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cashews | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cauliflower | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cherries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | chia-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | chicken | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | chickpeas | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cilantro | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cinnamon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | clams | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cockles | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cocoa | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cod | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | corn | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cranberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | cucumber | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | dandelion-greens | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | dark-chocolate | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | edamame | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | fermented-hot-sauce | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | flax-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | garlic | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | ghee | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | ginger | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | grapes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | green-tea | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | herring | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | kale | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | kefir | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | kidney-beans | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | kimchi | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | lamb | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | leeks | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | lemon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | lentils | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | lupins | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | mackerel | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | milk | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | miso | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | mussels | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | natto | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | oats | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | onions | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | oranges | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | oyster-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | oysters | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | parsley | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | peanuts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | pears | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | peas | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | peppermint | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | pistachios | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | pomegranates | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | pork | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | potatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | pumpkin-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | quinoa | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | radicchio | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | raspberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | rice | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | romaine-lettuce | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | rosemary | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | salmon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | sardines | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | scallops | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | sesame-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | shiitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | shrimp | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | spelt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | spinach | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | strawberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | sunflower-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | sweet-potatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | swiss-chard | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | tempeh | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | tofu | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | tomatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | tuna | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | turkey | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | turmeric | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | walnuts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | wasabi | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | watercress | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | watermelon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | wheat | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b2 | nori | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b2 | nutritional-yeast | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b2 | salmon-roe | Below inclusive analytical RSP 20 |
| vitamin-b2 | egg-yolks | Below inclusive analytical RSP 20 |
| vitamin-b2 | wheat-germ | Below inclusive analytical RSP 20 |
| vitamin-b2 | tahini | Below inclusive analytical RSP 20 |
| vitamin-b2 | eggs | Below inclusive analytical RSP 20 |
| vitamin-b2 | cheddar-cheese | Below inclusive analytical RSP 20 |
| vitamin-b2 | buckwheat | Below inclusive analytical RSP 20 |
| vitamin-b2 | mushrooms | Below inclusive analytical RSP 20 |
| vitamin-b2 | thyme | Below inclusive analytical RSP 20 |
| vitamin-b6 | broccoli-sprouts | Presence-only: no quantitative observation |
| vitamin-b6 | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| vitamin-b6 | nutritional-yeast | Presence-only: no quantitative observation |
| vitamin-b6 | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| vitamin-b6 | almonds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | anchovies | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | apples | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | asparagus | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | aubergine | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | avocado | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | beetroot | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | blueberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | brazil-nuts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | broccoli-sprouts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | broccoli | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | brussels-sprouts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | buckwheat | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | butter | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cabbage | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | capers | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | carrots | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cauliflower | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cherries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cilantro | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cinnamon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | clams | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cocoa | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cod | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | corn | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cranberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | cucumber | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | dandelion-greens | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | dark-chocolate | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | edamame | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | eggs | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | fermented-hot-sauce | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | ghee | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | ginger | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | grapes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | green-tea | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | jerusalem-artichokes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | kale | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | kefir | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | kimchi | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | lamb | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | leeks | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | lemon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | lions-mane-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | milk | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | miso | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | mushrooms | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | mussels | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | natto | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | oats | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | olives | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | onions | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | oranges | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | oyster-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | oysters | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | parsley | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | pears | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | peas | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | peppermint | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | pomegranates | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | pumpkin-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | radicchio | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | raspberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | rice | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | romaine-lettuce | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | salmon-roe | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | sardines | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | scallops | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | shrimp | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | spelt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | spinach | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | strawberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | sweet-potatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | swiss-chard | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | tahini | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | tempeh | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | tofu | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | tomatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | turmeric | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | watercress | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | watermelon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b6 | chicory-root | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b6 | nori | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b6 | nutritional-yeast | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b6 | walnuts | Below inclusive analytical RSP 20 |
| vitamin-b6 | chickpeas | Below inclusive analytical RSP 20 |
| vitamin-b6 | quinoa | Below inclusive analytical RSP 20 |
| vitamin-b6 | flax-seeds | Below inclusive analytical RSP 20 |
| vitamin-b6 | pork | Below inclusive analytical RSP 20 |
| vitamin-b6 | tuna | Below inclusive analytical RSP 20 |
| vitamin-b6 | cashews | Below inclusive analytical RSP 20 |
| vitamin-b6 | mackerel | Below inclusive analytical RSP 20 |
| vitamin-b6 | kidney-beans | Below inclusive analytical RSP 20 |
| vitamin-b6 | cloves | Below inclusive analytical RSP 20 |
| vitamin-b6 | soy | Below inclusive analytical RSP 20 |
| vitamin-b6 | bananas | Below inclusive analytical RSP 20 |
| vitamin-b6 | spirulina | Below inclusive analytical RSP 20 |
| vitamin-b6 | lupins | Below inclusive analytical RSP 20 |
| vitamin-b6 | chicken | Below inclusive analytical RSP 20 |
| vitamin-b6 | egg-yolks | Below inclusive analytical RSP 20 |
| vitamin-b6 | peanuts | Below inclusive analytical RSP 20 |
| vitamin-b6 | beef | Below inclusive analytical RSP 20 |
| vitamin-b6 | rosemary | Below inclusive analytical RSP 20 |
| vitamin-b6 | barley | Below inclusive analytical RSP 20 |
| vitamin-b6 | herring | Below inclusive analytical RSP 20 |
| vitamin-b6 | wheat | Below inclusive analytical RSP 20 |
| vitamin-b6 | potatoes | Below inclusive analytical RSP 20 |
| vitamin-b6 | shiitake-mushroom | Below inclusive analytical RSP 20 |
| vitamin-b6 | bell-peppers | Below inclusive analytical RSP 20 |
| vitamin-b6 | black-pepper | Below inclusive analytical RSP 20 |
| vitamin-b6 | black-beans | Below inclusive analytical RSP 20 |
| vitamin-b6 | heart | Below inclusive analytical RSP 20 |
| vitamin-b6 | wasabi | Below inclusive analytical RSP 20 |
| vitamin-b9 | broccoli-sprouts | Presence-only: no quantitative observation |
| vitamin-b9 | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| vitamin-b9 | nori | Presence-only: no quantitative observation |
| vitamin-b9 | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| vitamin-b9 | almonds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | anchovies | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | apples | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | asparagus | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | aubergine | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | bananas | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | barley | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | beef | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | bell-peppers | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | black-pepper | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | black-tea | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | blueberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | brazil-nuts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | broccoli-sprouts | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | buckwheat | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | butter | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cabbage | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | capers | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | carrots | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cashews | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cauliflower | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | chamomile-tea | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cherries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | chia-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | chicken | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cinnamon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | clams | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cloves | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cocoa | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cod | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | corn | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cranberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | cucumber | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | dandelion-greens | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | eggs | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | fermented-hot-sauce | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | garlic | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | ginger | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | grapes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | heart | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | herring | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | jerusalem-artichokes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | kefir | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | kimchi | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | lamb | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | lemon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | lions-mane-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | mackerel | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | milk | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | miso | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | mushrooms | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | mussels | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | natto | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | oats | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | onions | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | oranges | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | oyster-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | oysters | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | pears | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | pistachios | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | pomegranates | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | pork | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | potatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | pumpkin-seeds | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | raspberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | rice | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | salmon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | sardines | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | scallops | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | shiitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | shrimp | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | spelt | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | strawberries | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | sweet-potatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | swiss-chard | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | tempeh | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | tofu | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | tomatoes | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | tuna | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | turkey | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | turmeric | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | wasabi | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | watercress | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | watermelon | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | wheat | Below the provisional one-tenth threshold inside this basis. |
| vitamin-b9 | chicory-root | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b9 | nori | Single-source comparison set: fewer than two distinct comparable foods |
| vitamin-b9 | peppermint | Below inclusive analytical RSP 20 |
| vitamin-b9 | beetroot | Below inclusive analytical RSP 20 |
| vitamin-b9 | rosemary | Below inclusive analytical RSP 20 |
| vitamin-b9 | salmon-roe | Below inclusive analytical RSP 20 |
| vitamin-b9 | kidney | Below inclusive analytical RSP 20 |
| vitamin-b9 | tahini | Below inclusive analytical RSP 20 |
| vitamin-b9 | walnuts | Below inclusive analytical RSP 20 |
| vitamin-b9 | sesame-seeds | Below inclusive analytical RSP 20 |
| vitamin-b9 | spirulina | Below inclusive analytical RSP 20 |
| vitamin-b9 | saffron | Below inclusive analytical RSP 20 |
| vitamin-b9 | flax-seeds | Below inclusive analytical RSP 20 |
| vitamin-b9 | amaranth | Below inclusive analytical RSP 20 |
| vitamin-b9 | avocado | Below inclusive analytical RSP 20 |
| vitamin-b9 | peas | Below inclusive analytical RSP 20 |
| vitamin-b9 | leeks | Below inclusive analytical RSP 20 |
| vitamin-b9 | broccoli | Below inclusive analytical RSP 20 |
| vitamin-b9 | cilantro | Below inclusive analytical RSP 20 |
| vitamin-b9 | kale | Below inclusive analytical RSP 20 |
| vitamin-b9 | brussels-sprouts | Below inclusive analytical RSP 20 |
| vitamin-b9 | radicchio | Below inclusive analytical RSP 20 |
| zinc | cacao-powder | Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder |
| zinc | cockles | Presence-only: no quantitative observation |
| zinc | crab | Presence-only: no quantitative observation |
| zinc | sourdough-bread | Presence-only: no quantitative observation |
| zinc | whey-protein | Whey-based beverage mix; undiluted formulation, separate product pool. |
| zinc | whole-grains | Presence-only: no quantitative observation |
| zinc | almonds | Below the provisional one-tenth threshold inside this basis. |
| zinc | amaranth | Below the provisional one-tenth threshold inside this basis. |
| zinc | anchovies | Below the provisional one-tenth threshold inside this basis. |
| zinc | apples | Below the provisional one-tenth threshold inside this basis. |
| zinc | asparagus | Below the provisional one-tenth threshold inside this basis. |
| zinc | aubergine | Below the provisional one-tenth threshold inside this basis. |
| zinc | avocado | Below the provisional one-tenth threshold inside this basis. |
| zinc | bananas | Below the provisional one-tenth threshold inside this basis. |
| zinc | barley | Below the provisional one-tenth threshold inside this basis. |
| zinc | beetroot | Below the provisional one-tenth threshold inside this basis. |
| zinc | bell-peppers | Below the provisional one-tenth threshold inside this basis. |
| zinc | black-beans | Below the provisional one-tenth threshold inside this basis. |
| zinc | black-pepper | Below the provisional one-tenth threshold inside this basis. |
| zinc | black-tea | Below the provisional one-tenth threshold inside this basis. |
| zinc | blueberries | Below the provisional one-tenth threshold inside this basis. |
| zinc | broccoli-sprouts | Below the provisional one-tenth threshold inside this basis. |
| zinc | broccoli | Below the provisional one-tenth threshold inside this basis. |
| zinc | brussels-sprouts | Below the provisional one-tenth threshold inside this basis. |
| zinc | buckwheat | Below the provisional one-tenth threshold inside this basis. |
| zinc | butter | Below the provisional one-tenth threshold inside this basis. |
| zinc | cabbage | Below the provisional one-tenth threshold inside this basis. |
| zinc | capers | Below the provisional one-tenth threshold inside this basis. |
| zinc | carrots | Below the provisional one-tenth threshold inside this basis. |
| zinc | cauliflower | Below the provisional one-tenth threshold inside this basis. |
| zinc | chamomile-tea | Below the provisional one-tenth threshold inside this basis. |
| zinc | cheddar-cheese | Below the provisional one-tenth threshold inside this basis. |
| zinc | cherries | Below the provisional one-tenth threshold inside this basis. |
| zinc | chicken-liver | Below the provisional one-tenth threshold inside this basis. |
| zinc | chicken | Below the provisional one-tenth threshold inside this basis. |
| zinc | chickpeas | Below the provisional one-tenth threshold inside this basis. |
| zinc | cilantro | Below the provisional one-tenth threshold inside this basis. |
| zinc | cinnamon | Below the provisional one-tenth threshold inside this basis. |
| zinc | clams | Below the provisional one-tenth threshold inside this basis. |
| zinc | cloves | Below the provisional one-tenth threshold inside this basis. |
| zinc | coconut-oil | Below the provisional one-tenth threshold inside this basis. |
| zinc | cod | Below the provisional one-tenth threshold inside this basis. |
| zinc | coffee | Below the provisional one-tenth threshold inside this basis. |
| zinc | corn | Below the provisional one-tenth threshold inside this basis. |
| zinc | crab | Below the provisional one-tenth threshold inside this basis. |
| zinc | cranberries | Below the provisional one-tenth threshold inside this basis. |
| zinc | cucumber | Below the provisional one-tenth threshold inside this basis. |
| zinc | dandelion-greens | Below the provisional one-tenth threshold inside this basis. |
| zinc | dark-chocolate | Below the provisional one-tenth threshold inside this basis. |
| zinc | edamame | Below the provisional one-tenth threshold inside this basis. |
| zinc | egg-yolks | Below the provisional one-tenth threshold inside this basis. |
| zinc | eggs | Below the provisional one-tenth threshold inside this basis. |
| zinc | fermented-hot-sauce | Below the provisional one-tenth threshold inside this basis. |
| zinc | garlic | Below the provisional one-tenth threshold inside this basis. |
| zinc | ghee | Below the provisional one-tenth threshold inside this basis. |
| zinc | ginger | Below the provisional one-tenth threshold inside this basis. |
| zinc | grapes | Below the provisional one-tenth threshold inside this basis. |
| zinc | greek-yogurt | Below the provisional one-tenth threshold inside this basis. |
| zinc | green-tea | Below the provisional one-tenth threshold inside this basis. |
| zinc | heart | Below the provisional one-tenth threshold inside this basis. |
| zinc | herring | Below the provisional one-tenth threshold inside this basis. |
| zinc | jerusalem-artichokes | Below the provisional one-tenth threshold inside this basis. |
| zinc | kale | Below the provisional one-tenth threshold inside this basis. |
| zinc | kefir | Below the provisional one-tenth threshold inside this basis. |
| zinc | kidney-beans | Below the provisional one-tenth threshold inside this basis. |
| zinc | kidney | Below the provisional one-tenth threshold inside this basis. |
| zinc | kimchi | Below the provisional one-tenth threshold inside this basis. |
| zinc | lamb | Below the provisional one-tenth threshold inside this basis. |
| zinc | leeks | Below the provisional one-tenth threshold inside this basis. |
| zinc | lemon | Below the provisional one-tenth threshold inside this basis. |
| zinc | lentils | Below the provisional one-tenth threshold inside this basis. |
| zinc | lions-mane-mushroom | Below the provisional one-tenth threshold inside this basis. |
| zinc | mackerel | Below the provisional one-tenth threshold inside this basis. |
| zinc | maitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| zinc | milk | Below the provisional one-tenth threshold inside this basis. |
| zinc | miso | Below the provisional one-tenth threshold inside this basis. |
| zinc | mushrooms | Below the provisional one-tenth threshold inside this basis. |
| zinc | mussels | Below the provisional one-tenth threshold inside this basis. |
| zinc | natto | Below the provisional one-tenth threshold inside this basis. |
| zinc | olives | Below the provisional one-tenth threshold inside this basis. |
| zinc | onions | Below the provisional one-tenth threshold inside this basis. |
| zinc | oranges | Below the provisional one-tenth threshold inside this basis. |
| zinc | oregano | Below the provisional one-tenth threshold inside this basis. |
| zinc | oyster-mushroom | Below the provisional one-tenth threshold inside this basis. |
| zinc | parmesan-cheese | Below the provisional one-tenth threshold inside this basis. |
| zinc | parsley | Below the provisional one-tenth threshold inside this basis. |
| zinc | peanuts | Below the provisional one-tenth threshold inside this basis. |
| zinc | pears | Below the provisional one-tenth threshold inside this basis. |
| zinc | peas | Below the provisional one-tenth threshold inside this basis. |
| zinc | peppermint | Below the provisional one-tenth threshold inside this basis. |
| zinc | pistachios | Below the provisional one-tenth threshold inside this basis. |
| zinc | pomegranates | Below the provisional one-tenth threshold inside this basis. |
| zinc | pork | Below the provisional one-tenth threshold inside this basis. |
| zinc | potatoes | Below the provisional one-tenth threshold inside this basis. |
| zinc | quinoa | Below the provisional one-tenth threshold inside this basis. |
| zinc | radicchio | Below the provisional one-tenth threshold inside this basis. |
| zinc | raspberries | Below the provisional one-tenth threshold inside this basis. |
| zinc | rice | Below the provisional one-tenth threshold inside this basis. |
| zinc | romaine-lettuce | Below the provisional one-tenth threshold inside this basis. |
| zinc | rosemary | Below the provisional one-tenth threshold inside this basis. |
| zinc | saffron | Below the provisional one-tenth threshold inside this basis. |
| zinc | salmon-roe | Below the provisional one-tenth threshold inside this basis. |
| zinc | salmon | Below the provisional one-tenth threshold inside this basis. |
| zinc | sardines | Below the provisional one-tenth threshold inside this basis. |
| zinc | sauerkraut | Below the provisional one-tenth threshold inside this basis. |
| zinc | scallops | Below the provisional one-tenth threshold inside this basis. |
| zinc | shiitake-mushroom | Below the provisional one-tenth threshold inside this basis. |
| zinc | shrimp | Below the provisional one-tenth threshold inside this basis. |
| zinc | spelt | Below the provisional one-tenth threshold inside this basis. |
| zinc | spinach | Below the provisional one-tenth threshold inside this basis. |
| zinc | spirulina | Below the provisional one-tenth threshold inside this basis. |
| zinc | strawberries | Below the provisional one-tenth threshold inside this basis. |
| zinc | sweet-potatoes | Below the provisional one-tenth threshold inside this basis. |
| zinc | swiss-chard | Below the provisional one-tenth threshold inside this basis. |
| zinc | tart-cherry | Below the provisional one-tenth threshold inside this basis. |
| zinc | tempeh | Below the provisional one-tenth threshold inside this basis. |
| zinc | tofu | Below the provisional one-tenth threshold inside this basis. |
| zinc | tomatoes | Below the provisional one-tenth threshold inside this basis. |
| zinc | tuna | Below the provisional one-tenth threshold inside this basis. |
| zinc | turkey | Below the provisional one-tenth threshold inside this basis. |
| zinc | vinegar-pickles | Below the provisional one-tenth threshold inside this basis. |
| zinc | vinegar | Below the provisional one-tenth threshold inside this basis. |
| zinc | walnuts | Below the provisional one-tenth threshold inside this basis. |
| zinc | wasabi | Below the provisional one-tenth threshold inside this basis. |
| zinc | watercress | Below the provisional one-tenth threshold inside this basis. |
| zinc | watermelon | Below the provisional one-tenth threshold inside this basis. |
| zinc | wheat | Below the provisional one-tenth threshold inside this basis. |
| zinc | chicory-root | Single-source comparison set: fewer than two distinct comparable foods |
| zinc | nori | Single-source comparison set: fewer than two distinct comparable foods |
| zinc | nutritional-yeast | Single-source comparison set: fewer than two distinct comparable foods |
| zinc | pumpkin-seeds | Below inclusive analytical RSP 20 |
| zinc | sesame-seeds | Below inclusive analytical RSP 20 |
| zinc | cocoa | Below inclusive analytical RSP 20 |
| zinc | thyme | Below inclusive analytical RSP 20 |
| zinc | cashews | Below inclusive analytical RSP 20 |
| zinc | sunflower-seeds | Below inclusive analytical RSP 20 |
| zinc | soy | Below inclusive analytical RSP 20 |
| zinc | lupins | Below inclusive analytical RSP 20 |
| zinc | sage | Below inclusive analytical RSP 20 |
| zinc | tahini | Below inclusive analytical RSP 20 |
| zinc | chia-seeds | Below inclusive analytical RSP 20 |
| zinc | turmeric | Below inclusive analytical RSP 20 |
| zinc | beef | Below inclusive analytical RSP 20 |
| zinc | flax-seeds | Below inclusive analytical RSP 20 |
| zinc | brazil-nuts | Below inclusive analytical RSP 20 |
| zinc | liver | Below inclusive analytical RSP 20 |
| zinc | oats | Below inclusive analytical RSP 20 |
Full source records without a retained score are exported in analysis.json → unscored_sources; this includes below-cutoff/restricted sources, not only missing measurements. They receive no numerical points. Publication exclusions and PM-specific holds are separately exported.

## Distribution — candidate presentation cutoffs only

| Score at least | Foods |
|---|---|
| 0 | 74 |
| 1 | 39 |
| 2 | 12 |
| 3 | 2 |
| 4 | 1 |
No final cutoff adopted. Concentration-based connectivity is not serving usefulness or biological benefit. Portions, exposure optimisation, safety, other BRSs and abacus work remain deferred.

## Verification

| Check | Result | Evidence |
|---|---|---|
| Independent direct aggregation of EVERY score and rank | PASS | 183 food/view scores and ranks reconstructed without scoreFoods() |
| Independent pre-cap qualification and RSP reconstruction | PASS | 200 >=20 food/form candidates; includes pools larger than ten |
| Observed quantities/preparations/protein match canonical records | PASS | 474 component rows checked against live canonical fields; no missing value is numeric zero |
| Exact USDA additions and preservation of intake | PASS | 27 exact-source additions; all intake values, prose, profiles and existing supplementary records preserved |
| Deduplication, overlap, sodium, inclusive threshold, ties | PASS | Synthetic boundary/tie/duplicate/ownership tests plus every real group |
| Incompatible pools never silently maximised | PASS | Conflicting input pools produce unresolved subtotal, not maximum |
| Shared selector default unchanged | PASS | Exact equality with HEAD implementation for all 19 current source pools |
| Frozen manifest, site data, PM records and scientific gates unchanged | PASS | Tracked changes limited to source-food additions and four opt-in helper paths; no PM, gate, manifest or generated-site changes |
| Source hashes fresh | PASS | 354 source hashes match current candidate |
| BRS1 saved analysis remains equivalent under reusable scorer | PASS | 18 BRS1 files unchanged; every saved BRS1 score/group/rank reproduced |
| No coqualifying choline/betaine supply-route overlap | PASS | No food qualifies for both at >=20; conversion is not treated as identity equivalence |

No build, site-data regeneration, QC reactivation, commit, push or deployment. Frozen manifest and snapshot, PM scientific records, admissions and gates remain unchanged. Source corrections are local and publication-pending. BRS1 saved analyses are preserved; the common pure scorer exactly reproduces them. Existing whole-site suites were not rerun or represented as passing in this scoped analysis.
