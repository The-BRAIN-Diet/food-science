# BRS4 analytical source strength and biological coverage

16 November 2026. Provisional peer-review analysis; not an overall food-quality, adequacy, intake, safety or efficacy score. No site generation or publication.

## Pinned inputs

Checkout: `/Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science`

Branch: `review/pm8-caffeine-neuroeshot-2026-11-16`; commit: `d67c181ff6ebec80873e4da581af759e8e98199c`. The checkout contains preserved uncommitted BRS1–3 work. Exact intake state and hashes are in intake.json; extraction hashes are in analysis.json. Input hash: `d96745b3c371e255b0814a3ce0476e7ccdf8dcc601a8c2d353d72f4acae88202`. Frozen site snapshot: `682e4da0617af57788a83135d36947f31658dbe3d5b8c1ae6cc60245d66056c7` (unchanged).

## Same equations and restrictions

Existing `buildInputSubstanceFood` and `selectRankedFoodSources` are used in memory before display caps, with the analysis-only profile option and food-form retention. No site output is written.

- RSP = 100 × concentration / maximum eligible comparable concentration, using existing source, chemical-identity, preparation, denominator, publication and reference-pool rules. At least two distinct comparable foods are required in the pool.
- Retain every unrounded RSP ≥20, inclusive. No numerical food cap. The scorer’s prior ≥10 floor cannot remove an eligible ≥20 input.
- Score = Σ distinct non-overlapping input contributions (RSP/100), not Σ PM appearances. Source strength and single-system coverage coincide.
- EAA aggregate, tryptophan, tyrosine and phenylalanine share the approved provisional max-once group. BRS4 has qualifying tryptophan and tyrosine; every component remains visible.
- Other independently identified inputs are counted once. Arginine, glycine and methionine are distinct substrates, not quantities of creatine. There is no admitted quantitative yield or canonical score-equivalence merging them. Do not interpret their contributions as independent clinical benefits or three separate creatine effects. Direct creatine is unscored, so it is not additionally credited alongside its precursors.
- Riboflavin/FMN and tryptophan/B3-form routes retain chemical distinctions. FMN and the specific B3 forms have no eligible point scores; total niacin is never substituted for nicotinamide, nicotinic acid or NR. No new route equivalences are invented.
- PM-owned A, upstream/shared B/C/D and combined are calculated separately. Combined deduplicates inputs; separate scores are not added.
- Sodium contributes no points; no eligible sodium row exists here. Admissions/composition are untouched.
- Full stored precision is used. Only display is rounded; tied scores sort by canonical food ID.

## Counts

| Measure | Count |
|---|---|
| PMs examined | 10 |
| Structured relationships | 37 |
| Eligible relationships | 20 |
| Distinct resolved input identities | 17 |
| Eligible identities unresolved | 0 |
| Candidate food/input/form rows ≥10 before analytical cutoff | 187 |
| Candidate food/input/form rows ≥20 | 142 |
| Component rows before / after sodium exclusion | 182 / 182 |

| View | Foods | Food/material contexts | Food–PM pairs | PMs reached |
|---|---|---|---|---|
| PM-owned | 44 | 51 | 105 | 5 |
| upstream-shared | 0 | 0 | 0 | 0 |
| combined | 44 | 51 | 105 | 5 |

Upstream/shared is explicitly zero because the eligible BRS4 atoms are all classified A in the canonical records. A biochemical precursor route is not automatically upstream ownership. No relationship was reclassified. PM-owned and combined scores are therefore identical.

## Per-input selection

| Input | Source contexts | Observations | Uncapped ≥10 | Retained ≥20 | Reference food(s) |
|---|---|---|---|---|---|
| arginine | 17 | 17 | 16 | 16 | lupins |
| caprylic-triglyceride | 1 | 0 | 0 | 0 | no qualifying pool |
| copper | 136 | 135 | 21 | 6 | liver |
| creatine | 6 | 1 | 0 | 0 | no qualifying pool |
| flavin-mononucleotide | 1 | 0 | 0 | 0 | no qualifying pool |
| glycine | 19 | 19 | 19 | 19 | pumpkin-seeds |
| iron | 153 | 146 | 9 | 5 | thyme |
| l-carnitine | 0 | 0 | 0 | 0 | no qualifying pool |
| manganese | 132 | 131 | 5 | 4 | cloves |
| methionine | 39 | 39 | 32 | 28 | sardines |
| nicotinamide | 0 | 0 | 0 | 0 | no qualifying pool |
| nicotinamide-riboside | 1 | 0 | 0 | 0 | no qualifying pool |
| nicotinic-acid | 0 | 0 | 0 | 0 | no qualifying pool |
| tryptophan | 37 | 37 | 32 | 27 | soy |
| tyrosine | 30 | 30 | 27 | 24 | parmesan-cheese |
| vitamin-b2 | 131 | 131 | 16 | 7 | spirulina |
| vitamin-e | 123 | 121 | 10 | 6 | sunflower-seeds |

## PM-owned — full ranking

| Rank | Food ID | Score | Scoring inputs | Substances | PMs | Profile | Arithmetic |
|---|---|---|---|---|---|---|---|
| 1 | liver | 3.6474 | 6 | 7 | 4 | single recorded material | arginine: 32.0093% /100; copper: 100.0000% /100; glycine: 63.1579% /100; methionine: 50.0000% /100; protein-amino-acid-supply: 44.5008% /100; vitamin-b2: 75.0681% /100 |
| 2 | sunflower-seeds | 2.8364 | 4 | 4 | 4 | single recorded material | glycine: 79.2729% /100; methionine: 45.4880% /100; protein-amino-acid-supply: 58.8832% /100; vitamin-e: 100.0000% /100 |
| 3 | anchovies | 2.5341 | 4 | 5 | 3 | single recorded material | arginine: 44.5963% /100; glycine: 75.2577% /100; methionine: 78.7293% /100; protein-amino-acid-supply: 54.8223% /100 |
| 4 | pumpkin-seeds | 2.5299 | 3 | 4 | 3 | single recorded material | glycine: 100.0000% /100; methionine: 55.5249% /100; protein-amino-acid-supply: 97.4619% /100 |
| 5 | sardines | 2.4877 | 4 | 5 | 3 | single recorded material | arginine: 37.9933% /100; glycine: 64.0803% /100; methionine: 100.0000% /100; protein-amino-acid-supply: 46.7005% /100 |
| 6 | chicken | 2.3686 | 4 | 5 | 3 | COMPOSITE | arginine: 30.1522% /100; glycine: 66.3592% /100; methionine: 79.0976% /100; protein-amino-acid-supply: 61.2521% /100 |
| 7 | almonds | 2.1712 | 4 | 4 | 5 | single recorded material | glycine: 77.5366% /100; protein-amino-acid-supply: 35.7022% /100; vitamin-b2: 31.0082% /100; vitamin-e: 72.8746% /100 |
| 8 | tuna | 2.0448 | 4 | 5 | 3 | COMPOSITE | arginine: 36.0072% /100; glycine: 60.7705% /100; methionine: 63.5359% /100; protein-amino-acid-supply: 44.1624% /100 |
| 9 | turkey | 1.9896 | 4 | 5 | 3 | COMPOSITE | arginine: 33.0668% /100; glycine: 52.4145% /100; methionine: 64.9171% /100; protein-amino-acid-supply: 48.5618% /100 |
| 10 | chicken-liver | 1.9522 | 5 | 6 | 4 | single recorded material | arginine: 28.1919% /100; glycine: 46.0662% /100; methionine: 39.7790% /100; protein-amino-acid-supply: 32.7318% /100; vitamin-b2: 48.4469% /100 |
| 11 | salmon | 1.8577 | 4 | 5 | 3 | COMPOSITE | arginine: 31.4934% /100; glycine: 52.0890% /100; methionine: 60.2210% /100; protein-amino-acid-supply: 41.9628% /100 |
| 12 | spirulina | 1.8559 | 3 | 3 | 2 | single recorded material | copper: 62.5320% /100; iron: 23.0583% /100; vitamin-b2: 100.0000% /100 |
| 13 | pork | 1.7602 | 4 | 5 | 3 | single recorded material | arginine: 32.1125% /100; glycine: 55.2903% /100; methionine: 47.3297% /100; protein-amino-acid-supply: 41.2860% /100 |
| 14 | beef | 1.7237 | 4 | 4 | 2 | COMPOSITE | arginine: 31.2097% /100; glycine: 68.4753% /100; methionine: 44.0147% /100; protein-amino-acid-supply: 28.6717% /100 |
| 15 | mackerel | 1.6309 | 4 | 5 | 3 | single recorded material | arginine: 28.7078% /100; glycine: 48.4536% /100; methionine: 50.7366% /100; protein-amino-acid-supply: 35.1946% /100 |
| 16 | herring | 1.5750 | 4 | 5 | 3 | single recorded material | arginine: 27.7276% /100; glycine: 46.7716% /100; methionine: 48.9871% /100; protein-amino-acid-supply: 34.0102% /100 |
| 17 | cod | 1.5609 | 4 | 5 | 3 | single recorded material | arginine: 27.4955% /100; glycine: 46.3918% /100; methionine: 48.5267% /100; protein-amino-acid-supply: 33.6717% /100 |
| 18 | cheddar-cheese | 1.4292 | 2 | 3 | 3 | single recorded material | methionine: 50.3683% /100; protein-amino-acid-supply: 92.5550% /100 |
| 19 | lamb | 1.4107 | 4 | 5 | 3 | single recorded material | arginine: 25.3804% /100; glycine: 43.8958% /100; methionine: 39.1344% /100; protein-amino-acid-supply: 32.6565% /100 |
| 20 | cloves | 1.2508 | 2 | 2 | 1 | single recorded material | manganese: 100.0000% /100; vitamin-e: 25.0782% /100 |
| 21 | soy | 1.2371 | 2 | 3 | 3 | single recorded material | protein-amino-acid-supply: 100.0000% /100; vitamin-b2: 23.7057% /100 |
| 22 | egg-yolks | 1.2362 | 4 | 5 | 3 | single recorded material | arginine: 28.3467% /100; glycine: 26.4786% /100; methionine: 34.8066% /100; protein-amino-acid-supply: 33.9850% /100 |
| 23 | thyme | 1.2127 | 2 | 2 | 3 | single recorded material | iron: 100.0000% /100; vitamin-e: 21.2681% /100 |
| 24 | lupins | 1.0000 | 1 | 1 | 1 | single recorded material | arginine: 100.0000% /100 |
| 25 | parmesan-cheese | 1.0000 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 100.0000% /100 |
| 26 | mussels | 0.9463 | 2 | 2 | 3 | single recorded material | methionine: 49.4475% /100; protein-amino-acid-supply: 45.1777% /100 |
| 27 | peanuts | 0.8940 | 3 | 3 | 4 | COMPOSITE | methionine: 26.7956% /100; protein-amino-acid-supply: 38.9171% /100; vitamin-e: 23.6850% /100 |
| 28 | eggs | 0.8542 | 3 | 4 | 3 | COMPOSITE | glycine: 23.4400% /100; methionine: 36.0958% /100; protein-amino-acid-supply: 25.8883% /100 |
| 29 | turmeric | 0.7743 | 2 | 2 | 3 | single recorded material | iron: 44.4984% /100; manganese: 32.9287% /100 |
| 30 | kidney | 0.7738 | 1 | 1 | 2 | single recorded material | vitamin-b2: 77.3842% /100 |
| 31 | sesame-seeds | 0.4185 | 1 | 1 | 1 | single recorded material | copper: 41.8452% /100 |
| 32 | tofu | 0.3976 | 1 | 2 | 2 | single recorded material | protein-amino-acid-supply: 39.7631% /100 |
| 33 | cocoa | 0.3883 | 1 | 1 | 1 | single recorded material | copper: 38.8314% /100 |
| 34 | tempeh | 0.3328 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 33.2832% /100 |
| 35 | clams | 0.2992 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 29.9248% /100 |
| 36 | oregano | 0.2977 | 1 | 1 | 2 | single recorded material | iron: 29.7735% /100 |
| 37 | oysters | 0.2930 | 1 | 1 | 1 | single recorded material | copper: 29.2978% /100 |
| 38 | cinnamon | 0.2905 | 1 | 1 | 1 | single recorded material | manganese: 29.0471% /100 |
| 39 | salmon-roe | 0.2587 | 1 | 1 | 1 | single recorded material | vitamin-e: 25.8743% /100 |
| 40 | shrimp | 0.2581 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 25.8145% /100 |
| 41 | heart | 0.2469 | 1 | 1 | 2 | single recorded material | vitamin-b2: 24.6866% /100 |
| 42 | sage | 0.2275 | 1 | 1 | 2 | single recorded material | iron: 22.7508% /100 |
| 43 | cashews | 0.2250 | 1 | 1 | 1 | single recorded material | copper: 22.5013% /100 |
| 44 | wheat-germ | 0.2212 | 1 | 1 | 1 | single recorded material | manganese: 22.1204% /100 |

## upstream-shared — full ranking

No eligible upstream/shared relationship or positive score. Zero is an extraction result, not a conclusion that upstream biology is absent.

## combined — full ranking

| Rank | Food ID | Score | Scoring inputs | Substances | PMs | Profile | Arithmetic |
|---|---|---|---|---|---|---|---|
| 1 | liver | 3.6474 | 6 | 7 | 4 | single recorded material | arginine: 32.0093% /100; copper: 100.0000% /100; glycine: 63.1579% /100; methionine: 50.0000% /100; protein-amino-acid-supply: 44.5008% /100; vitamin-b2: 75.0681% /100 |
| 2 | sunflower-seeds | 2.8364 | 4 | 4 | 4 | single recorded material | glycine: 79.2729% /100; methionine: 45.4880% /100; protein-amino-acid-supply: 58.8832% /100; vitamin-e: 100.0000% /100 |
| 3 | anchovies | 2.5341 | 4 | 5 | 3 | single recorded material | arginine: 44.5963% /100; glycine: 75.2577% /100; methionine: 78.7293% /100; protein-amino-acid-supply: 54.8223% /100 |
| 4 | pumpkin-seeds | 2.5299 | 3 | 4 | 3 | single recorded material | glycine: 100.0000% /100; methionine: 55.5249% /100; protein-amino-acid-supply: 97.4619% /100 |
| 5 | sardines | 2.4877 | 4 | 5 | 3 | single recorded material | arginine: 37.9933% /100; glycine: 64.0803% /100; methionine: 100.0000% /100; protein-amino-acid-supply: 46.7005% /100 |
| 6 | chicken | 2.3686 | 4 | 5 | 3 | COMPOSITE | arginine: 30.1522% /100; glycine: 66.3592% /100; methionine: 79.0976% /100; protein-amino-acid-supply: 61.2521% /100 |
| 7 | almonds | 2.1712 | 4 | 4 | 5 | single recorded material | glycine: 77.5366% /100; protein-amino-acid-supply: 35.7022% /100; vitamin-b2: 31.0082% /100; vitamin-e: 72.8746% /100 |
| 8 | tuna | 2.0448 | 4 | 5 | 3 | COMPOSITE | arginine: 36.0072% /100; glycine: 60.7705% /100; methionine: 63.5359% /100; protein-amino-acid-supply: 44.1624% /100 |
| 9 | turkey | 1.9896 | 4 | 5 | 3 | COMPOSITE | arginine: 33.0668% /100; glycine: 52.4145% /100; methionine: 64.9171% /100; protein-amino-acid-supply: 48.5618% /100 |
| 10 | chicken-liver | 1.9522 | 5 | 6 | 4 | single recorded material | arginine: 28.1919% /100; glycine: 46.0662% /100; methionine: 39.7790% /100; protein-amino-acid-supply: 32.7318% /100; vitamin-b2: 48.4469% /100 |
| 11 | salmon | 1.8577 | 4 | 5 | 3 | COMPOSITE | arginine: 31.4934% /100; glycine: 52.0890% /100; methionine: 60.2210% /100; protein-amino-acid-supply: 41.9628% /100 |
| 12 | spirulina | 1.8559 | 3 | 3 | 2 | single recorded material | copper: 62.5320% /100; iron: 23.0583% /100; vitamin-b2: 100.0000% /100 |
| 13 | pork | 1.7602 | 4 | 5 | 3 | single recorded material | arginine: 32.1125% /100; glycine: 55.2903% /100; methionine: 47.3297% /100; protein-amino-acid-supply: 41.2860% /100 |
| 14 | beef | 1.7237 | 4 | 4 | 2 | COMPOSITE | arginine: 31.2097% /100; glycine: 68.4753% /100; methionine: 44.0147% /100; protein-amino-acid-supply: 28.6717% /100 |
| 15 | mackerel | 1.6309 | 4 | 5 | 3 | single recorded material | arginine: 28.7078% /100; glycine: 48.4536% /100; methionine: 50.7366% /100; protein-amino-acid-supply: 35.1946% /100 |
| 16 | herring | 1.5750 | 4 | 5 | 3 | single recorded material | arginine: 27.7276% /100; glycine: 46.7716% /100; methionine: 48.9871% /100; protein-amino-acid-supply: 34.0102% /100 |
| 17 | cod | 1.5609 | 4 | 5 | 3 | single recorded material | arginine: 27.4955% /100; glycine: 46.3918% /100; methionine: 48.5267% /100; protein-amino-acid-supply: 33.6717% /100 |
| 18 | cheddar-cheese | 1.4292 | 2 | 3 | 3 | single recorded material | methionine: 50.3683% /100; protein-amino-acid-supply: 92.5550% /100 |
| 19 | lamb | 1.4107 | 4 | 5 | 3 | single recorded material | arginine: 25.3804% /100; glycine: 43.8958% /100; methionine: 39.1344% /100; protein-amino-acid-supply: 32.6565% /100 |
| 20 | cloves | 1.2508 | 2 | 2 | 1 | single recorded material | manganese: 100.0000% /100; vitamin-e: 25.0782% /100 |
| 21 | soy | 1.2371 | 2 | 3 | 3 | single recorded material | protein-amino-acid-supply: 100.0000% /100; vitamin-b2: 23.7057% /100 |
| 22 | egg-yolks | 1.2362 | 4 | 5 | 3 | single recorded material | arginine: 28.3467% /100; glycine: 26.4786% /100; methionine: 34.8066% /100; protein-amino-acid-supply: 33.9850% /100 |
| 23 | thyme | 1.2127 | 2 | 2 | 3 | single recorded material | iron: 100.0000% /100; vitamin-e: 21.2681% /100 |
| 24 | lupins | 1.0000 | 1 | 1 | 1 | single recorded material | arginine: 100.0000% /100 |
| 25 | parmesan-cheese | 1.0000 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 100.0000% /100 |
| 26 | mussels | 0.9463 | 2 | 2 | 3 | single recorded material | methionine: 49.4475% /100; protein-amino-acid-supply: 45.1777% /100 |
| 27 | peanuts | 0.8940 | 3 | 3 | 4 | COMPOSITE | methionine: 26.7956% /100; protein-amino-acid-supply: 38.9171% /100; vitamin-e: 23.6850% /100 |
| 28 | eggs | 0.8542 | 3 | 4 | 3 | COMPOSITE | glycine: 23.4400% /100; methionine: 36.0958% /100; protein-amino-acid-supply: 25.8883% /100 |
| 29 | turmeric | 0.7743 | 2 | 2 | 3 | single recorded material | iron: 44.4984% /100; manganese: 32.9287% /100 |
| 30 | kidney | 0.7738 | 1 | 1 | 2 | single recorded material | vitamin-b2: 77.3842% /100 |
| 31 | sesame-seeds | 0.4185 | 1 | 1 | 1 | single recorded material | copper: 41.8452% /100 |
| 32 | tofu | 0.3976 | 1 | 2 | 2 | single recorded material | protein-amino-acid-supply: 39.7631% /100 |
| 33 | cocoa | 0.3883 | 1 | 1 | 1 | single recorded material | copper: 38.8314% /100 |
| 34 | tempeh | 0.3328 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 33.2832% /100 |
| 35 | clams | 0.2992 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 29.9248% /100 |
| 36 | oregano | 0.2977 | 1 | 1 | 2 | single recorded material | iron: 29.7735% /100 |
| 37 | oysters | 0.2930 | 1 | 1 | 1 | single recorded material | copper: 29.2978% /100 |
| 38 | cinnamon | 0.2905 | 1 | 1 | 1 | single recorded material | manganese: 29.0471% /100 |
| 39 | salmon-roe | 0.2587 | 1 | 1 | 1 | single recorded material | vitamin-e: 25.8743% /100 |
| 40 | shrimp | 0.2581 | 1 | 1 | 1 | single recorded material | protein-amino-acid-supply: 25.8145% /100 |
| 41 | heart | 0.2469 | 1 | 1 | 2 | single recorded material | vitamin-b2: 24.6866% /100 |
| 42 | sage | 0.2275 | 1 | 1 | 2 | single recorded material | iron: 22.7508% /100 |
| 43 | cashews | 0.2250 | 1 | 1 | 1 | single recorded material | copper: 22.5013% /100 |
| 44 | wheat-germ | 0.2212 | 1 | 1 | 1 | single recorded material | manganese: 22.1204% /100 |

## Composite profiles and exact preparations

Compatible edible-weight forms may compete under existing rules. Different source forms remain visible and are not silently interchangeable. These food-ID scores combine recorded materials; none describes one serving or preparation.

| Food | Recorded materials |
|---|---|
| chicken | Chicken, broilers or fryers, breast, meat only, cooked, roasted; Chicken, broilers or fryers, meat and skin, raw |
| tuna | Fish, tuna, fresh, bluefin, raw; Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) |
| turkey | Turkey, whole, breast, meat only, cooked, roasted; Turkey, whole, meat only, raw |
| salmon | Fish, salmon, Atlantic, farmed, cooked, dry heat; Fish, salmon, Atlantic, farmed, raw |
| beef | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled; Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) |
| peanuts | Peanuts, all types, dry-roasted, without salt; Peanuts, all types, raw |
| eggs | Egg, whole, cooked, hard-boiled; Egg, whole, raw, fresh |

## Component arithmetic and evidence

★ is a winning observation for its scoring group. Repeated PM rows do not add points. Both tyrosine and tryptophan remain visible when only one wins the protein/amino-acid group. Full precision and separate view flags are in components.json.

| Food | Input | RSP | PM / ownership | Winner | Amount / basis | Material / preparation | Source | Publication |
|---|---|---|---|---|---|---|---|---|
| lupins | arginine | 100.0000 | BRS4-FM1-PM3 / A | ★ | 3.877 g; per 100 g edible portion | Lupins, mature seeds, raw / raw | docs/foods/lupins.md#nutrition_per_100g/arginine_g | pin-matched |
| anchovies | arginine | 44.5963 | BRS4-FM1-PM3 / A | ★ | 1.729 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/arginine_usda_brs4_174183 | listed-publication-pin-pending |
| sardines | arginine | 37.9933 | BRS4-FM1-PM3 / A | ★ | 1.473 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/arginine_usda_brs4_175139 | listed-publication-pin-pending |
| tuna | arginine | 36.0072 | BRS4-FM1-PM3 / A | ★ | 1.396 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/arginine_usda_brs4_173706 | listed-publication-pin-pending |
| turkey | arginine | 33.0668 | BRS4-FM1-PM3 / A | ★ | 1.282 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/arginine_usda_brs4_171480 | listed-publication-pin-pending |
| pork | arginine | 32.1125 | BRS4-FM1-PM3 / A | ★ | 1.245 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/arginine_usda_brs4_167818 | listed-publication-pin-pending |
| liver | arginine | 32.0093 | BRS4-FM1-PM3 / A | ★ | 1.241 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/arginine_usda_brs4_169451 | listed-publication-pin-pending |
| salmon | arginine | 31.4934 | BRS4-FM1-PM3 / A | ★ | 1.221 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_supplementary_sources/arginine_usda_brs4_175167 | listed-publication-pin-pending |
| beef | arginine | 31.2097 | BRS4-FM1-PM3 / A | ★ | 1.21 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_supplementary_sources/arginine_usda_brs4_171796 | listed-publication-pin-pending |
| chicken | arginine | 30.1522 | BRS4-FM1-PM3 / A | ★ | 1.169 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_supplementary_sources/arginine_usda_brs4_171447 | listed-publication-pin-pending |
| mackerel | arginine | 28.7078 | BRS4-FM1-PM3 / A | ★ | 1.113 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/arginine_usda_brs4_175119 | listed-publication-pin-pending |
| egg-yolks | arginine | 28.3467 | BRS4-FM1-PM3 / A | ★ | 1.099 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/arginine_usda_brs4_172184 | listed-publication-pin-pending |
| chicken-liver | arginine | 28.1919 | BRS4-FM1-PM3 / A | ★ | 1.093 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/arginine_usda_brs4_171060 | listed-publication-pin-pending |
| herring | arginine | 27.7276 | BRS4-FM1-PM3 / A | ★ | 1.075 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/arginine_usda_brs4_175116 | listed-publication-pin-pending |
| cod | arginine | 27.4955 | BRS4-FM1-PM3 / A | ★ | 1.066 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/arginine_usda_brs4_171955 | listed-publication-pin-pending |
| lamb | arginine | 25.3804 | BRS4-FM1-PM3 / A | ★ | 0.984 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/arginine_usda_brs4_174370 | listed-publication-pin-pending |
| liver | copper | 100.0000 | BRS4-FM1-PM1 / A | ★ | 9.755 mg; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/copper_mg | listed-publication-pin-pending |
| spirulina | copper | 62.5320 | BRS4-FM1-PM1 / A | ★ | 6.1 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/copper_mg | pin-matched |
| sesame-seeds | copper | 41.8452 | BRS4-FM1-PM1 / A | ★ | 4.082 mg; per 100 g edible portion | Seeds, sesame seeds, whole, dried / dried | docs/foods/sesame-seeds.md#nutrition_per_100g/copper_mg | pin-matched |
| cocoa | copper | 38.8314 | BRS4-FM1-PM1 / A | ★ | 3.788 mg; per 100 g edible portion | Cocoa, dry powder, unsweetened / dry powder | docs/foods/cocoa.md#nutrition_per_100g/copper_mg | pin-matched |
| oysters | copper | 29.2978 | BRS4-FM1-PM1 / A | ★ | 2.858 mg; per 100 g edible portion | Mollusks, oyster, eastern, wild, raw / raw | docs/foods/oysters.md#nutrition_per_100g/copper_mg | pin-matched |
| cashews | copper | 22.5013 | BRS4-FM1-PM1 / A | ★ | 2.195 mg; per 100 g edible portion | Nuts, cashew nuts, raw / raw | docs/foods/cashews.md#nutrition_per_100g/copper_mg | pin-matched |
| pumpkin-seeds | glycine | 100.0000 | BRS4-FM1-PM3 / A | ★ | 1.843 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / Seeds, pumpkin and squash seed kernels, dried | docs/foods/pumpkin-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170556 | pin-matched |
| sunflower-seeds | glycine | 79.2729 | BRS4-FM1-PM3 / A | ★ | 1.461 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / Seeds, sunflower seed kernels, dried | docs/foods/sunflower-seeds.md#nutrition_supplementary_sources/glycine_usda_review01_170562 | pin-matched |
| almonds | glycine | 77.5366 | BRS4-FM1-PM3 / A | ★ | 1.429 g; per 100 g edible portion | Nuts, almonds / Nuts, almonds | docs/foods/almonds.md#nutrition_supplementary_sources/glycine_usda_review01_170567 | pin-matched |
| anchovies | glycine | 75.2577 | BRS4-FM1-PM3 / A | ★ | 1.387 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_supplementary_sources/glycine_usda_brs2_174183 | listed-publication-pin-pending |
| beef | glycine | 68.4753 | BRS4-FM1-PM3 / A | ★ | 1.262 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) | docs/foods/beef.md#nutrition_supplementary_sources/glycine_usda_review01_171796 | listed-publication-pin-pending |
| chicken | glycine | 66.3592 | BRS4-FM1-PM3 / A | ★ | 1.223 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / Chicken, broilers or fryers, meat and skin, raw | docs/foods/chicken.md#nutrition_supplementary_sources/glycine_usda_review01_171447 | listed-publication-pin-pending |
| sardines | glycine | 64.0803 | BRS4-FM1-PM3 / A | ★ | 1.181 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_supplementary_sources/glycine_usda_brs2_175139 | listed-publication-pin-pending |
| liver | glycine | 63.1579 | BRS4-FM1-PM3 / A | ★ | 1.164 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_supplementary_sources/glycine_usda_brs2_169451 | listed-publication-pin-pending |
| tuna | glycine | 60.7705 | BRS4-FM1-PM3 / A | ★ | 1.12 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_supplementary_sources/glycine_usda_brs2_173706 | listed-publication-pin-pending |
| pork | glycine | 55.2903 | BRS4-FM1-PM3 / A | ★ | 1.019 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_supplementary_sources/glycine_usda_brs2_167818 | listed-publication-pin-pending |
| turkey | glycine | 52.4145 | BRS4-FM1-PM3 / A | ★ | 0.966 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_supplementary_sources/glycine_usda_brs2_171480 | listed-publication-pin-pending |
| salmon | glycine | 52.0890 | BRS4-FM1-PM3 / A | ★ | 0.96 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / Fish, salmon, Atlantic, farmed, raw | docs/foods/salmon.md#nutrition_supplementary_sources/glycine_usda_review01_175167 | listed-publication-pin-pending |
| mackerel | glycine | 48.4536 | BRS4-FM1-PM3 / A | ★ | 0.893 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_supplementary_sources/glycine_usda_brs2_175119 | listed-publication-pin-pending |
| herring | glycine | 46.7716 | BRS4-FM1-PM3 / A | ★ | 0.862 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_supplementary_sources/glycine_usda_brs2_175116 | listed-publication-pin-pending |
| cod | glycine | 46.3918 | BRS4-FM1-PM3 / A | ★ | 0.855 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_supplementary_sources/glycine_usda_brs2_171955 | listed-publication-pin-pending |
| chicken-liver | glycine | 46.0662 | BRS4-FM1-PM3 / A | ★ | 0.849 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_supplementary_sources/glycine_usda_brs2_171060 | listed-publication-pin-pending |
| lamb | glycine | 43.8958 | BRS4-FM1-PM3 / A | ★ | 0.809 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_supplementary_sources/glycine_usda_brs2_174370 | listed-publication-pin-pending |
| egg-yolks | glycine | 26.4786 | BRS4-FM1-PM3 / A | ★ | 0.488 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_supplementary_sources/glycine_usda_brs2_172184 | listed-publication-pin-pending |
| eggs | glycine | 23.4400 | BRS4-FM1-PM3 / A | ★ | 0.432 g; per 100 g edible portion | Egg, whole, raw, fresh / Egg, whole, raw, fresh | docs/foods/eggs.md#nutrition_supplementary_sources/glycine_usda_review01_171287 | pin-matched |
| thyme | iron | 100.0000 | BRS4-FM1-PM1 / A | ★ | 123.6 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/iron_mg | pin-matched |
| thyme | iron | 100.0000 | BRS4-FM1-PM10 / A | ★ | 123.6 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/iron_mg | pin-matched |
| turmeric | iron | 44.4984 | BRS4-FM1-PM1 / A | ★ | 55 mg; per 100 g edible portion | Spices, turmeric, ground / not recorded | docs/foods/turmeric.md#nutrition_per_100g/iron_mg | pin-matched |
| turmeric | iron | 44.4984 | BRS4-FM1-PM10 / A | ★ | 55 mg; per 100 g edible portion | Spices, turmeric, ground / not recorded | docs/foods/turmeric.md#nutrition_per_100g/iron_mg | pin-matched |
| oregano | iron | 29.7735 | BRS4-FM1-PM1 / A | ★ | 36.8 mg; per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/iron_mg | pin-matched |
| oregano | iron | 29.7735 | BRS4-FM1-PM10 / A | ★ | 36.8 mg; per 100 g edible portion | Spices, oregano, dried / dried | docs/foods/oregano.md#nutrition_per_100g/iron_mg | pin-matched |
| spirulina | iron | 23.0583 | BRS4-FM1-PM1 / A | ★ | 28.5 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/iron_mg | pin-matched |
| spirulina | iron | 23.0583 | BRS4-FM1-PM10 / A | ★ | 28.5 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/iron_mg | pin-matched |
| sage | iron | 22.7508 | BRS4-FM1-PM1 / A | ★ | 28.12 mg; per 100 g edible portion | Spices, sage, ground / not recorded | docs/foods/sage.md#nutrition_per_100g/iron_mg | pin-matched |
| sage | iron | 22.7508 | BRS4-FM1-PM10 / A | ★ | 28.12 mg; per 100 g edible portion | Spices, sage, ground / not recorded | docs/foods/sage.md#nutrition_per_100g/iron_mg | pin-matched |
| cloves | manganese | 100.0000 | BRS4-FM2-PM5 / A | ★ | 60.13 mg; per 100 g edible portion | Spices, cloves, ground / not recorded | docs/foods/cloves.md#nutrition_per_100g/manganese_mg | pin-matched |
| turmeric | manganese | 32.9287 | BRS4-FM2-PM5 / A | ★ | 19.8 mg; per 100 g edible portion | Spices, turmeric, ground / not recorded | docs/foods/turmeric.md#nutrition_per_100g/manganese_mg | pin-matched |
| cinnamon | manganese | 29.0471 | BRS4-FM2-PM5 / A | ★ | 17.466 mg; per 100 g edible portion | Spices, cinnamon, ground / not recorded | docs/foods/cinnamon.md#nutrition_per_100g/manganese_mg | pin-matched |
| wheat-germ | manganese | 22.1204 | BRS4-FM2-PM5 / A | ★ | 13.301 mg; per 100 g edible portion | Wheat germ, crude / not recorded | docs/foods/wheat-germ.md#nutrition_per_100g/manganese_mg | pin-matched |
| sardines | methionine | 100.0000 | BRS4-FM1-PM10 / A | ★ | 1.086 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| sardines | methionine | 100.0000 | BRS4-FM1-PM3 / A | ★ | 1.086 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS4-FM1-PM10 / A | ★ | 0.859 g; per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| chicken | methionine | 79.0976 | BRS4-FM1-PM3 / A | ★ | 0.859 g; per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS4-FM1-PM10 / A | ★ | 0.855 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| anchovies | methionine | 78.7293 | BRS4-FM1-PM3 / A | ★ | 0.855 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS4-FM1-PM10 / A |  | 0.729 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| sardines | methionine | 67.1271 | BRS4-FM1-PM3 / A |  | 0.729 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS4-FM1-PM10 / A | ★ | 0.705 g; per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 64.9171 | BRS4-FM1-PM3 / A | ★ | 0.705 g; per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS4-FM1-PM10 / A | ★ | 0.69 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| tuna | methionine | 63.5359 | BRS4-FM1-PM3 / A | ★ | 0.69 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS4-FM1-PM10 / A | ★ | 0.654 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 60.2210 | BRS4-FM1-PM3 / A | ★ | 0.654 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/methionine | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS4-FM1-PM10 / A |  | 0.626 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| salmon | methionine | 57.6427 | BRS4-FM1-PM3 / A |  | 0.626 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| pumpkin-seeds | methionine | 55.5249 | BRS4-FM1-PM10 / A | ★ | 0.603 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| pumpkin-seeds | methionine | 55.5249 | BRS4-FM1-PM3 / A | ★ | 0.603 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_amino_acid_profiles/usda-sr-170556/amino_acids/methionine | pin-matched |
| turkey | methionine | 54.5120 | BRS4-FM1-PM10 / A |  | 0.592 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| turkey | methionine | 54.5120 | BRS4-FM1-PM3 / A |  | 0.592 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171480/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS4-FM1-PM10 / A | ★ | 0.551 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| mackerel | methionine | 50.7366 | BRS4-FM1-PM3 / A | ★ | 0.551 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS4-FM1-PM10 / A |  | 0.551 g; per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| tuna | methionine | 50.7366 | BRS4-FM1-PM3 / A |  | 0.551 g; per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/methionine | listed-publication-pin-pending |
| cheddar-cheese | methionine | 50.3683 | BRS4-FM1-PM10 / A | ★ | 0.547 g; per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| cheddar-cheese | methionine | 50.3683 | BRS4-FM1-PM3 / A | ★ | 0.547 g; per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/methionine | pin-matched |
| liver | methionine | 50.0000 | BRS4-FM1-PM10 / A | ★ | 0.543 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| liver | methionine | 50.0000 | BRS4-FM1-PM3 / A | ★ | 0.543 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/methionine | listed-publication-pin-pending |
| mussels | methionine | 49.4475 | BRS4-FM1-PM10 / A | ★ | 0.537 g; per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| mussels | methionine | 49.4475 | BRS4-FM1-PM3 / A | ★ | 0.537 g; per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/methionine | pin-matched |
| herring | methionine | 48.9871 | BRS4-FM1-PM10 / A | ★ | 0.532 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| herring | methionine | 48.9871 | BRS4-FM1-PM3 / A | ★ | 0.532 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS4-FM1-PM10 / A | ★ | 0.527 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| cod | methionine | 48.5267 | BRS4-FM1-PM3 / A | ★ | 0.527 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS4-FM1-PM10 / A | ★ | 0.514 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| pork | methionine | 47.3297 | BRS4-FM1-PM3 / A | ★ | 0.514 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/methionine | listed-publication-pin-pending |
| sunflower-seeds | methionine | 45.4880 | BRS4-FM1-PM10 / A | ★ | 0.494 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| sunflower-seeds | methionine | 45.4880 | BRS4-FM1-PM3 / A | ★ | 0.494 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/methionine | pin-matched |
| chicken | methionine | 45.3959 | BRS4-FM1-PM10 / A |  | 0.493 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| chicken | methionine | 45.3959 | BRS4-FM1-PM3 / A |  | 0.493 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/methionine_g | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS4-FM1-PM10 / A | ★ | 0.478 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS4-FM1-PM3 / A | ★ | 0.478 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-171796/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS4-FM1-PM10 / A | ★ | 0.478 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| beef | methionine | 44.0147 | BRS4-FM1-PM3 / A | ★ | 0.478 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked | docs/foods/beef.md#nutrition_amino_acid_profiles/usda-sr-174032/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS4-FM1-PM10 / A | ★ | 0.432 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| chicken-liver | methionine | 39.7790 | BRS4-FM1-PM3 / A | ★ | 0.432 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS4-FM1-PM10 / A | ★ | 0.425 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| lamb | methionine | 39.1344 | BRS4-FM1-PM3 / A | ★ | 0.425 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/methionine | listed-publication-pin-pending |
| eggs | methionine | 36.0958 | BRS4-FM1-PM10 / A | ★ | 0.392 g; per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 36.0958 | BRS4-FM1-PM3 / A | ★ | 0.392 g; per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/methionine | pin-matched |
| eggs | methionine | 34.9908 | BRS4-FM1-PM10 / A |  | 0.38 g; per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| eggs | methionine | 34.9908 | BRS4-FM1-PM3 / A |  | 0.38 g; per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/methionine_g | pin-matched |
| egg-yolks | methionine | 34.8066 | BRS4-FM1-PM10 / A | ★ | 0.378 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| egg-yolks | methionine | 34.8066 | BRS4-FM1-PM3 / A | ★ | 0.378 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/methionine | listed-publication-pin-pending |
| peanuts | methionine | 26.7956 | BRS4-FM1-PM10 / A | ★ | 0.291 g; per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| peanuts | methionine | 26.7956 | BRS4-FM1-PM3 / A | ★ | 0.291 g; per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/methionine | pin-matched |
| soy | tryptophan | 100.0000 | BRS4-FM1-PM2 / A | ★ | 0.591 g; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/tryptophan_g | pin-matched |
| pumpkin-seeds | tryptophan | 97.4619 | BRS4-FM1-PM2 / A | ★ | 0.576 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/tryptophan_g | pin-matched |
| cheddar-cheese | tryptophan | 92.5550 | BRS4-FM1-PM2 / A | ★ | 0.547 g; per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / cheddar | docs/foods/cheddar-cheese.md#nutrition_amino_acid_profiles/usda-sr-173414/amino_acids/tryptophan | pin-matched |
| chicken | tryptophan | 61.2521 | BRS4-FM1-PM2 / A | ★ | 0.362 g; per 100 g edible portion | Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171477/amino_acids/tryptophan | listed-publication-pin-pending |
| sunflower-seeds | tryptophan | 58.8832 | BRS4-FM1-PM2 / A | ★ | 0.348 g; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_amino_acid_profiles/usda-sr-170562/amino_acids/tryptophan | pin-matched |
| anchovies | tryptophan | 54.8223 | BRS4-FM1-PM2 / A | ★ | 0.324 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned, drained | docs/foods/anchovies.md#nutrition_amino_acid_profiles/usda-sr-174183/amino_acids/tryptophan | listed-publication-pin-pending |
| turkey | tryptophan | 48.5618 | BRS4-FM1-PM2 / A | ★ | 0.287 g; per 100 g edible portion | Turkey, whole, breast, meat only, cooked, roasted / cooked | docs/foods/turkey.md#nutrition_amino_acid_profiles/usda-sr-171496/amino_acids/tryptophan | listed-publication-pin-pending |
| sardines | tryptophan | 46.7005 | BRS4-FM1-PM2 / A | ★ | 0.276 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned, drained | docs/foods/sardines.md#nutrition_amino_acid_profiles/usda-sr-175139/amino_acids/tryptophan | listed-publication-pin-pending |
| mussels | tryptophan | 45.1777 | BRS4-FM1-PM2 / A | ★ | 0.267 g; per 100 g edible portion | Mollusks, mussel, blue, cooked, moist heat / cooked | docs/foods/mussels.md#nutrition_amino_acid_profiles/usda-sr-174217/amino_acids/tryptophan | pin-matched |
| liver | tryptophan | 44.5008 | BRS4-FM1-PM2 / A | ★ | 0.263 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_amino_acid_profiles/usda-sr-169451/amino_acids/tryptophan | listed-publication-pin-pending |
| tuna | tryptophan | 44.1624 | BRS4-FM1-PM2 / A | ★ | 0.261 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173706/amino_acids/tryptophan | listed-publication-pin-pending |
| salmon | tryptophan | 41.9628 | BRS4-FM1-PM2 / A | ★ | 0.248 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175168/amino_acids/tryptophan | listed-publication-pin-pending |
| pork | tryptophan | 41.2860 | BRS4-FM1-PM2 / A | ★ | 0.244 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_amino_acid_profiles/usda-sr-167818/amino_acids/tryptophan | listed-publication-pin-pending |
| turkey | tryptophan | 40.7783 | BRS4-FM1-PM2 / A |  | 0.241 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_per_100g/tryptophan_g | listed-publication-pin-pending |
| tofu | tryptophan | 39.7631 | BRS4-FM1-PM2 / A | ★ | 0.235 g; per 100 g edible portion | Tofu, raw, firm, prepared with calcium sulfate / firm, calcium-set | docs/foods/tofu.md#nutrition_amino_acid_profiles/usda-sr-172475/amino_acids/tryptophan | pin-matched |
| peanuts | tryptophan | 38.9171 | BRS4-FM1-PM2 / A | ★ | 0.23 g; per 100 g edible portion | Peanuts, all types, dry-roasted, without salt / dry-roasted | docs/foods/peanuts.md#nutrition_amino_acid_profiles/usda-sr-173806/amino_acids/tryptophan | pin-matched |
| almonds | tryptophan | 35.7022 | BRS4-FM1-PM2 / A | ★ | 0.211 g; per 100 g edible portion | Nuts, almonds / raw | docs/foods/almonds.md#nutrition_amino_acid_profiles/usda-sr-170567/amino_acids/tryptophan | pin-matched |
| salmon | tryptophan | 35.3638 | BRS4-FM1-PM2 / A |  | 0.209 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_amino_acid_profiles/usda-sr-175167/amino_acids/tryptophan | listed-publication-pin-pending |
| tuna | tryptophan | 35.3638 | BRS4-FM1-PM2 / A |  | 0.209 g; per 100 g edible portion | Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned, drained | docs/foods/tuna.md#nutrition_amino_acid_profiles/usda-sr-173709/amino_acids/tryptophan | listed-publication-pin-pending |
| mackerel | tryptophan | 35.1946 | BRS4-FM1-PM2 / A | ★ | 0.208 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_amino_acid_profiles/usda-sr-175119/amino_acids/tryptophan | listed-publication-pin-pending |
| chicken | tryptophan | 35.0254 | BRS4-FM1-PM2 / A |  | 0.207 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_amino_acid_profiles/usda-sr-171447/amino_acids/tryptophan | listed-publication-pin-pending |
| herring | tryptophan | 34.0102 | BRS4-FM1-PM2 / A | ★ | 0.201 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_amino_acid_profiles/usda-sr-175116/amino_acids/tryptophan | listed-publication-pin-pending |
| cod | tryptophan | 33.6717 | BRS4-FM1-PM2 / A | ★ | 0.199 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_amino_acid_profiles/usda-sr-171955/amino_acids/tryptophan | listed-publication-pin-pending |
| lamb | tryptophan | 32.6565 | BRS4-FM1-PM2 / A | ★ | 0.193 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_amino_acid_profiles/usda-sr-174370/amino_acids/tryptophan | listed-publication-pin-pending |
| egg-yolks | tryptophan | 29.9492 | BRS4-FM1-PM2 / A |  | 0.177 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_amino_acid_profiles/usda-sr-172184/amino_acids/tryptophan | listed-publication-pin-pending |
| chicken-liver | tryptophan | 29.7800 | BRS4-FM1-PM2 / A |  | 0.176 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_amino_acid_profiles/usda-sr-171060/amino_acids/tryptophan | listed-publication-pin-pending |
| eggs | tryptophan | 25.8883 | BRS4-FM1-PM2 / A | ★ | 0.153 g; per 100 g edible portion | Egg, whole, cooked, hard-boiled / cooked | docs/foods/eggs.md#nutrition_amino_acid_profiles/usda-sr-173424/amino_acids/tryptophan | pin-matched |
| parmesan-cheese | tyrosine | 100.0000 | BRS4-FM1-PM10 / A | ★ | 1.995 g; per 100 g edible portion | Cheese, parmesan, hard / not recorded | docs/foods/parmesan-cheese.md#nutrition_per_100g/tyrosine_g | pin-matched |
| soy | tyrosine | 77.1429 | BRS4-FM1-PM10 / A |  | 1.539 g; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/tyrosine_g | pin-matched |
| cheddar-cheese | tyrosine | 55.5388 | BRS4-FM1-PM10 / A |  | 1.108 g; per 100 g edible portion | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / not recorded | docs/foods/cheddar-cheese.md#nutrition_per_100g/tyrosine_g | pin-matched |
| pumpkin-seeds | tyrosine | 54.7870 | BRS4-FM1-PM10 / A |  | 1.093 g; per 100 g edible portion | Seeds, pumpkin and squash seed kernels, dried / dried | docs/foods/pumpkin-seeds.md#nutrition_per_100g/tyrosine_g | pin-matched |
| anchovies | tyrosine | 48.8722 | BRS4-FM1-PM10 / A |  | 0.975 g; per 100 g edible portion | Fish, anchovy, european, canned in oil, drained solids / canned | docs/foods/anchovies.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| sardines | tyrosine | 41.6541 | BRS4-FM1-PM10 / A |  | 0.831 g; per 100 g edible portion | Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned | docs/foods/sardines.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| liver | tyrosine | 40.4511 | BRS4-FM1-PM10 / A |  | 0.807 g; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| tuna | tyrosine | 39.4486 | BRS4-FM1-PM10 / A |  | 0.787 g; per 100 g edible portion | Fish, tuna, fresh, bluefin, raw / raw | docs/foods/tuna.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| salmon | tyrosine | 38.0451 | BRS4-FM1-PM10 / A |  | 0.759 g; per 100 g edible portion | Fish, salmon, Atlantic, farmed, raw / raw | docs/foods/salmon.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| tofu | tyrosine | 35.1378 | BRS4-FM1-PM10 / A |  | 0.701 g; per 100 g edible portion | Tofu, raw, firm, prepared with calcium sulfate / raw | docs/foods/tofu.md#nutrition_per_100g/tyrosine_g | pin-matched |
| egg-yolks | tyrosine | 33.9850 | BRS4-FM1-PM10 / A | ★ | 0.678 g; per 100 g edible portion | Egg, yolk, raw, fresh / raw | docs/foods/egg-yolks.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| pork | tyrosine | 33.8847 | BRS4-FM1-PM10 / A |  | 0.676 g; per 100 g edible portion | Pork, fresh, loin, whole, separable lean and fat, raw / raw | docs/foods/pork.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| turkey | tyrosine | 33.6842 | BRS4-FM1-PM10 / A |  | 0.672 g; per 100 g edible portion | Turkey, whole, meat only, raw / raw | docs/foods/turkey.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| tempeh | tyrosine | 33.2832 | BRS4-FM1-PM10 / A | ★ | 0.664 g; per 100 g edible portion | Tempeh / not recorded | docs/foods/tempeh.md#nutrition_per_100g/tyrosine_g | pin-matched |
| chicken-liver | tyrosine | 32.7318 | BRS4-FM1-PM10 / A | ★ | 0.653 g; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| mackerel | tyrosine | 31.4787 | BRS4-FM1-PM10 / A |  | 0.628 g; per 100 g edible portion | Fish, mackerel, Atlantic, raw / raw | docs/foods/mackerel.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| herring | tyrosine | 30.3759 | BRS4-FM1-PM10 / A |  | 0.606 g; per 100 g edible portion | Fish, herring, Atlantic, raw / raw | docs/foods/herring.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| cod | tyrosine | 30.1253 | BRS4-FM1-PM10 / A |  | 0.601 g; per 100 g edible portion | Fish, cod, Atlantic, raw / raw | docs/foods/cod.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| chicken | tyrosine | 29.9248 | BRS4-FM1-PM10 / A |  | 0.597 g; per 100 g edible portion | Chicken, broilers or fryers, meat and skin, raw / raw | docs/foods/chicken.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| clams | tyrosine | 29.9248 | BRS4-FM1-PM10 / A | ★ | 0.597 g; per 100 g edible portion | Mollusks, clam, mixed species, raw / raw | docs/foods/clams.md#nutrition_per_100g/tyrosine_g | pin-matched |
| beef | tyrosine | 28.6717 | BRS4-FM1-PM10 / A | ★ | 0.572 g; per 100 g edible portion | Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw | docs/foods/beef.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| lamb | tyrosine | 27.8697 | BRS4-FM1-PM10 / A |  | 0.556 g; per 100 g edible portion | Lamb, ground, raw / raw | docs/foods/lamb.md#nutrition_per_100g/tyrosine_g | listed-publication-pin-pending |
| shrimp | tyrosine | 25.8145 | BRS4-FM1-PM10 / A | ★ | 0.515 g; per 100 g edible portion | Crustaceans, shrimp, mixed species, raw (may contain additives to retain moisture) / raw | docs/foods/shrimp.md#nutrition_per_100g/tyrosine_g | pin-matched |
| eggs | tyrosine | 25.0125 | BRS4-FM1-PM10 / A |  | 0.499 g; per 100 g edible portion | Egg, whole, raw, fresh / raw | docs/foods/eggs.md#nutrition_per_100g/tyrosine_g | pin-matched |
| spirulina | vitamin-b2 | 100.0000 | BRS4-FM1-PM1 / A | ★ | 3.67 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| spirulina | vitamin-b2 | 100.0000 | BRS4-FM1-PM10 / A | ★ | 3.67 mg; per 100 g edible portion | Seaweed, spirulina, dried / dried | docs/foods/spirulina.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| kidney | vitamin-b2 | 77.3842 | BRS4-FM1-PM1 / A | ★ | 2.84 mg; per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| kidney | vitamin-b2 | 77.3842 | BRS4-FM1-PM10 / A | ★ | 2.84 mg; per 100 g edible portion | Beef, variety meats and by-products, kidneys, raw / raw | docs/foods/kidney.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| liver | vitamin-b2 | 75.0681 | BRS4-FM1-PM1 / A | ★ | 2.755 mg; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| liver | vitamin-b2 | 75.0681 | BRS4-FM1-PM10 / A | ★ | 2.755 mg; per 100 g edible portion | Beef, variety meats and by-products, liver, raw / raw | docs/foods/liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| chicken-liver | vitamin-b2 | 48.4469 | BRS4-FM1-PM1 / A | ★ | 1.778 mg; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| chicken-liver | vitamin-b2 | 48.4469 | BRS4-FM1-PM10 / A | ★ | 1.778 mg; per 100 g edible portion | Chicken, liver, all classes, raw / raw | docs/foods/chicken-liver.md#nutrition_per_100g/vitamin_b2_mg | listed-publication-pin-pending |
| almonds | vitamin-b2 | 31.0082 | BRS4-FM1-PM1 / A | ★ | 1.138 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| almonds | vitamin-b2 | 31.0082 | BRS4-FM1-PM10 / A | ★ | 1.138 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| heart | vitamin-b2 | 24.6866 | BRS4-FM1-PM1 / A | ★ | 0.906 mg; per 100 g edible portion | Beef, variety meats and by-products, heart, raw / raw | docs/foods/heart.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| heart | vitamin-b2 | 24.6866 | BRS4-FM1-PM10 / A | ★ | 0.906 mg; per 100 g edible portion | Beef, variety meats and by-products, heart, raw / raw | docs/foods/heart.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| soy | vitamin-b2 | 23.7057 | BRS4-FM1-PM1 / A | ★ | 0.87 mg; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| soy | vitamin-b2 | 23.7057 | BRS4-FM1-PM10 / A | ★ | 0.87 mg; per 100 g edible portion | Soybeans, mature seeds, raw / raw | docs/foods/soy.md#nutrition_per_100g/vitamin_b2_mg | pin-matched |
| sunflower-seeds | vitamin-e | 100.0000 | BRS4-FM2-PM5 / A | ★ | 35.17 mg; per 100 g edible portion | Seeds, sunflower seed kernels, dried / dried | docs/foods/sunflower-seeds.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| almonds | vitamin-e | 72.8746 | BRS4-FM2-PM5 / A | ★ | 25.63 mg; per 100 g edible portion | Nuts, almonds / not recorded | docs/foods/almonds.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| salmon-roe | vitamin-e | 25.8743 | BRS4-FM2-PM5 / A | ★ | 9.1 mg; per 100 g edible portion | Chum salmon (Oncorhynchus keta), salted roe (ikura) / salted | docs/foods/salmon-roe.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| cloves | vitamin-e | 25.0782 | BRS4-FM2-PM5 / A | ★ | 8.82 mg; per 100 g edible portion | Spices, cloves, ground / not recorded | docs/foods/cloves.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| peanuts | vitamin-e | 23.6850 | BRS4-FM2-PM5 / A | ★ | 8.33 mg; per 100 g edible portion | Peanuts, all types, raw / raw | docs/foods/peanuts.md#nutrition_per_100g/vitamin_e_mg | pin-matched |
| thyme | vitamin-e | 21.2681 | BRS4-FM2-PM5 / A | ★ | 7.48 mg; per 100 g edible portion | Spices, thyme, dried / dried | docs/foods/thyme.md#nutrition_per_100g/vitamin_e_mg | pin-matched |

## Composition audit and corrections

The same 21 existing meat/fish/poultry/offal/roe/egg-yolk identities were checked against the 17 BRS4 inputs. Exact USDA SR Legacy evidence already retrieved for prior work was used; no broad external research, proxy identity, protein-ratio estimate or category estimate was introduced. Archive SHA-256: `b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0`; original download: https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip.

| Food | Added arginine g/100 g | Exact FDC | Preparation | USDA row |
|---|---|---|---|---|
| anchovies | 1.729 | 174183 | canned, drained | 1837753 |
| beef | 1.21 | 171796 | raw | 1641413 |
| chicken | 1.169 | 171447 | raw | 1610580 |
| chicken-liver | 1.093 | 171060 | raw | 1576610 |
| cod | 1.066 | 171955 | raw | 1653449 |
| herring | 1.075 | 175116 | raw | 1913730 |
| lamb | 0.984 | 174370 | raw | 1852538 |
| liver | 1.241 | 169451 | raw | 1443246 |
| mackerel | 1.113 | 175119 | raw | 1913969 |
| pork | 1.245 | 167818 | raw | 1307037 |
| salmon | 1.221 | 175167 | raw | 1918063 |
| sardines | 1.473 | 175139 | canned, drained | 1915799 |
| tuna | 1.396 | 173706 | raw | 1799988 |
| turkey | 1.282 | 171480 | raw | 1613416 |
| egg-yolks | 1.099 | 172184 | raw | 1674730 |

15 observations were added as separate exact-source supplementary records, all publication-pending. Nutrient 1220 is arginine in grams. Existing amounts, profiles, prose and source records are unchanged. These are database-listed concentrations, not assertions of independently measured free arginine or brain delivery. The prior BRS1 methionine and amino-acid profiles are enabled for this analysis without adding portions. No PM admission changed.

| Food | Quantified mapped input cells | Qualitative mapped cells | Unavailable/unresolved cells |
|---|---|---|---|
| anchovies | 10 | 0 | 7 |
| beef | 11 | 0 | 6 |
| chicken | 10 | 0 | 7 |
| chicken-liver | 10 | 0 | 7 |
| cod | 10 | 0 | 7 |
| dark-meat-poultry | 0 | 1 | 16 |
| heart | 5 | 0 | 12 |
| herring | 10 | 0 | 7 |
| kidney | 5 | 0 | 12 |
| lamb | 10 | 1 | 6 |
| liver | 10 | 1 | 6 |
| lumpfish-roe | 0 | 0 | 17 |
| mackerel | 10 | 0 | 7 |
| pork | 10 | 1 | 6 |
| salmon | 10 | 0 | 7 |
| salmon-roe | 5 | 0 | 12 |
| sardines | 10 | 0 | 7 |
| trout-roe | 0 | 0 | 17 |
| tuna | 10 | 1 | 6 |
| turkey | 10 | 0 | 7 |
| egg-yolks | 10 | 0 | 7 |

The exact-source check found no remaining positive missing entry in the targeted USDA nutrient set. This is not complete analytical coverage of every BRS4 substance. Heart/kidney amino-acid gaps and unmatched roe data remain unknown. Existing beef tryptophan stays source-specific and discrepancy-flagged; the low value was not replaced. Arginine’s food universe is still incomplete outside the bounded recovery; no absence or zero is inferred for other foods.

## Admission, exclusions and unscored sources

| Relationship | Input | Ownership | Disposition | Source |
|---|---|---|---|---|
| BRS4-FM1-PM1::PM1-DIT-1 | Iron | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx#dietary_input_traceability/PM1-DIT-1 |
| BRS4-FM1-PM1::PM1-DIT-2 | Flavin mononucleotide (FMN) | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx#dietary_input_traceability/PM1-DIT-2 |
| BRS4-FM1-PM1::PM1-DIT-3 | Vitamin B2 (riboflavin) | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx#dietary_input_traceability/PM1-DIT-3 |
| BRS4-FM1-PM1::PM1-DIT-4 | Ubiquinone | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx#dietary_input_traceability/PM1-DIT-4 |
| BRS4-FM1-PM1::PM1-DIT-5 | Copper | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx#dietary_input_traceability/PM1-DIT-5 |
| BRS4-FM1-PM10::PM10-DIT-1 | Tyrosine | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-1 |
| BRS4-FM1-PM10::PM10-DIT-2 | Methionine | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-2 |
| BRS4-FM1-PM10::PM10-DIT-3 | Vitamin B2 | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-3 |
| BRS4-FM1-PM10::PM10-DIT-4 | Iron | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-4 |
| BRS4-FM1-PM10::PM10-DIT-5 | CoQ10 | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-5 |
| BRS4-FM1-PM10::PM10-DIT-6 | S-adenosylmethionine (SAM) | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-6 |
| BRS4-FM1-PM10::PM10-DIT-7 | Flavin adenine dinucleotide (FAD) | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm1/brs4-fm1-pm10-coenzyme-q-biosynthesis-and-pool-availability.mdx#dietary_input_traceability/PM10-DIT-7 |
| BRS4-FM1-PM2::PM2-DIT-1 | Nicotinamide (a form of vitamin B3) | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-1 |
| BRS4-FM1-PM2::PM2-DIT-2 | Nicotinic acid (a form of vitamin B3) | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-2 |
| BRS4-FM1-PM2::PM2-DIT-3 | Tryptophan | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-3 |
| BRS4-FM1-PM2::PM2-DIT-RECOVERY-NAD-PLUS | NAD+ (oxidised nicotinamide adenine dinucleotide) | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-RECOVERY-NAD-PLUS |
| BRS4-FM1-PM2::PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE | Nicotinamide riboside | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx#dietary_input_traceability/PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE |
| BRS4-FM1-PM3::PM3-DIT-1 | Creatine | A | eligible: valid preserved historical fingerprint | docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-1 |
| BRS4-FM1-PM3::PM3-DIT-2 | Arginine | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-2 |
| BRS4-FM1-PM3::PM3-DIT-3 | Glycine | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-3 |
| BRS4-FM1-PM3::PM3-DIT-4 | Methionine-derived S-adenosylmethionine (SAM) | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-4 |
| BRS4-FM1-PM3::PM3-DIT-RECOVERY-METHIONINE | Methionine | A | eligible: explicit assessment | docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx#dietary_input_traceability/PM3-DIT-RECOVERY-METHIONINE |
| BRS4-FM2-PM4::PM4-LEGACY-MN | Manganese | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control.mdx#dietary_input_traceability/PM4-LEGACY-MN |
| BRS4-FM2-PM4::PM4-LEGACY-SE | Selenium | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control.mdx#dietary_input_traceability/PM4-LEGACY-SE |
| BRS4-FM2-PM4::PM4-LEGACY-CU | Copper | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control.mdx#dietary_input_traceability/PM4-LEGACY-CU |
| BRS4-FM2-PM4::PM4-LEGACY-ZN | Zinc | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm4-ros-production-and-control.mdx#dietary_input_traceability/PM4-LEGACY-ZN |
| BRS4-FM2-PM5::PM5-DIT-E | Vitamin E | A | eligible: explicit assessment | docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-DIT-E |
| BRS4-FM2-PM5::PM5-DIT-MN | Manganese | A | eligible: explicit assessment | docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-DIT-MN |
| BRS4-FM2-PM5::PM5-BIO-Q | CoQ10 | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-BIO-Q |
| BRS4-FM2-PM5::PM5-BIO-GSH | Glutathione | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-BIO-GSH |
| BRS4-FM2-PM5::PM5-LEGACY-SE | Selenium | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-LEGACY-SE |
| BRS4-FM2-PM5::PM5-LEGACY-MG | Magnesium | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm2/brs4-fm2-pm5-mitochondrial-protection-redox-integrity.mdx#dietary_input_traceability/PM5-LEGACY-MG |
| BRS4-FM3-PM6::PM6-DEFERRED-BIO-1 | Carnitine | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport.mdx#dietary_input_traceability/PM6-DEFERRED-BIO-1 |
| BRS4-FM3-PM6::PM6-DIT-CARNITINE-1 | L-Carnitine | A | eligible: explicit assessment | docs/biological-targets/brs4/fm3/brs4-fm3-pm6-carnitine-mediated-fat-transport.mdx#dietary_input_traceability/PM6-DIT-CARNITINE-1 |
| BRS4-FM3-PM7::PM7-DEFERRED-BIO-1 | Acetoacetate | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx#dietary_input_traceability/PM7-DEFERRED-BIO-1 |
| BRS4-FM3-PM7::PM7-DEFERRED-BIO-2 | Beta-hydroxybutyrate | E | excluded: dietary input is not Yes | docs/biological-targets/brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx#dietary_input_traceability/PM7-DEFERRED-BIO-2 |
| BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE | Caprylic Triglyceride | A | eligible: explicit assessment | docs/biological-targets/brs4/fm3/brs4-fm3-pm7-ketone-utilisation-capacity.mdx#dietary_input_traceability/PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE |

No/unset legacy minerals, endogenous CoQ10/SAM/NAD/glutathione or mechanistic participants became dietary admissions. The accepted carnitine and NR relationships do not establish ordinary-food equivalence. Caprylic triglyceride retains its protocol-specific ordinary-food ranking hold; coconut oil is not substituted. Creatine’s beef quantitative record remains held, and qualitative occurrence stays unscored.

| Unscored input | Source contexts | Recorded food IDs | Reason summary |
|---|---|---|---|
| caprylic-triglyceride | 1 | mct-oil | Presence-only: no quantitative observation |
| creatine | 6 | beef, lamb, liver, pork, tuna | Unverified or held canonical quantity; Presence-only: no quantitative observation |
| flavin-mononucleotide | 1 | milk | Presence-only: no quantitative observation |
| l-carnitine | 0 | none | No qualifying quantitative food source |
| nicotinamide | 0 | none | No qualifying quantitative food source |
| nicotinamide-riboside | 1 | milk | Presence-only: no quantitative observation |
| nicotinic-acid | 0 | none | No qualifying quantitative food source |

| Quantitative exclusion reason | Records |
|---|---|
| Below the provisional one-tenth threshold inside this basis. | 590 |
| Below inclusive analytical RSP 20 | 45 |
| Presence-only: no quantitative observation | 19 |
| Single-source comparison set: fewer than two distinct comparable foods | 9 |
| Shared reference observation attributed once to cocoa; not an independent measurement of cacao-powder | 5 |
| Generic olive oil does not verify extra-virgin or early-harvest preparation. Qualified proxy ranking requires an explicit scoped exception to system/food-nutrition-schema.md#exact-food-source-matching. | 4 |
| Whey-based beverage mix; undiluted formulation, separate product pool. | 3 |
| Unverified or held canonical quantity | 1 |
| Branded broken-cell-wall chlorella powder; manufacturer serving declaration, separate product pool. | 1 |
| No authorised compatible comparison pool for this measurement basis | 1 |
| Isolated soybean lecithin emulsifier; separate ingredient-fraction pool. | 1 |

Every row-level exclusion, publication restriction and source record is retained in analysis.json. Its unscored_sources collection includes below-threshold and restricted records, not just missing quantities. Neither unscored occurrence nor missing data earns numeric points; neither is biological zero.

## Comparison with intake and frozen display

The saved intake/default mapping yielded 133 component rows; current analysis yields 182. The difference includes activation of existing analysis-only profiles as well as 15 new arginine observations. The latter add 15 PM3 component rows; all other source concentrations are unchanged. Every previously scored matching observation also retains its exact RSP; power-comparison.json records zero changes. This intake comparison is not a prior approved BRS4 analytical ranking.

| Food | Intake/default rank | Intake/default score | Current rank | Current score | Difference | New arginine contribution |
|---|---|---|---|---|---|---|
| liver | 2 | 2.7868 | 1 | 3.6474 | 0.8606 | 0.3201 |
| sunflower-seeds | 1 | 2.8364 | 2 | 2.8364 | 0.0000 | 0.0000 |
| anchovies | 15 | 1.2413 | 3 | 2.5341 | 1.2928 | 0.4460 |
| pumpkin-seeds | 3 | 2.5299 | 4 | 2.5299 | 0.0000 | 0.0000 |
| sardines | 5 | 2.1078 | 5 | 2.4877 | 0.3799 | 0.3799 |
| chicken | 6 | 2.0671 | 6 | 2.3686 | 0.3015 | 0.3015 |
| almonds | 4 | 2.1712 | 7 | 2.1712 | 0.0000 | 0.0000 |
| tuna | 9 | 1.6376 | 8 | 2.0448 | 0.4072 | 0.3601 |
| turkey | 8 | 1.6589 | 9 | 1.9896 | 0.3307 | 0.3307 |
| chicken-liver | 13 | 1.2724 | 10 | 1.9522 | 0.6797 | 0.2819 |
| salmon | 10 | 1.5427 | 11 | 1.8577 | 0.3149 | 0.3149 |
| spirulina | 7 | 1.8559 | 12 | 1.8559 | 0.0000 | 0.0000 |
| pork | 22 | 0.8917 | 13 | 1.7602 | 0.8684 | 0.3211 |
| beef | 12 | 1.4116 | 14 | 1.7237 | 0.3121 | 0.3121 |
| mackerel | 24 | 0.7993 | 15 | 1.6309 | 0.8316 | 0.2871 |
| herring | 27 | 0.7715 | 16 | 1.5750 | 0.8035 | 0.2773 |
| cod | 28 | 0.7652 | 17 | 1.5609 | 0.7957 | 0.2750 |
| cheddar-cheese | 11 | 1.4292 | 18 | 1.4292 | 0.0000 | 0.0000 |
| lamb | 29 | 0.7177 | 19 | 1.4107 | 0.6930 | 0.2538 |
| cloves | 14 | 1.2508 | 20 | 1.2508 | 0.0000 | 0.0000 |
| soy | 16 | 1.2371 | 21 | 1.2371 | 0.0000 | 0.0000 |
| egg-yolks | 30 | 0.6046 | 22 | 1.2362 | 0.6315 | 0.2835 |
| thyme | 17 | 1.2127 | 23 | 1.2127 | 0.0000 | 0.0000 |
| lupins | 18 | 1.0000 | 24 | 1.0000 | 0.0000 | 1.0000 |
| parmesan-cheese | 19 | 1.0000 | 25 | 1.0000 | 0.0000 | 0.0000 |
| mussels | 20 | 0.9463 | 26 | 0.9463 | 0.0000 | 0.0000 |
| peanuts | 21 | 0.8940 | 27 | 0.8940 | 0.0000 | 0.0000 |
| eggs | 23 | 0.8542 | 28 | 0.8542 | 0.0000 | 0.0000 |
| turmeric | 25 | 0.7743 | 29 | 0.7743 | 0.0000 | 0.0000 |
| kidney | 26 | 0.7738 | 30 | 0.7738 | 0.0000 | 0.0000 |
| sesame-seeds | 31 | 0.4185 | 31 | 0.4185 | 0.0000 | 0.0000 |
| tofu | 32 | 0.3976 | 32 | 0.3976 | 0.0000 | 0.0000 |
| cocoa | 33 | 0.3883 | 33 | 0.3883 | 0.0000 | 0.0000 |
| tempeh | 34 | 0.3328 | 34 | 0.3328 | 0.0000 | 0.0000 |
| clams | 35 | 0.2992 | 35 | 0.2992 | 0.0000 | 0.0000 |
| oregano | 36 | 0.2977 | 36 | 0.2977 | 0.0000 | 0.0000 |
| oysters | 37 | 0.2930 | 37 | 0.2930 | 0.0000 | 0.0000 |
| cinnamon | 38 | 0.2905 | 38 | 0.2905 | 0.0000 | 0.0000 |
| salmon-roe | 39 | 0.2587 | 39 | 0.2587 | 0.0000 | 0.0000 |
| shrimp | 40 | 0.2581 | 40 | 0.2581 | 0.0000 | 0.0000 |
| heart | 41 | 0.2469 | 41 | 0.2469 | 0.0000 | 0.0000 |
| sage | 42 | 0.2275 | 42 | 0.2275 | 0.0000 | 0.0000 |
| cashews | 43 | 0.2250 | 43 | 0.2250 | 0.0000 | 0.0000 |
| wheat-germ | 44 | 0.2212 | 44 | 0.2212 | 0.0000 | 0.0000 |

| Relationship | Input | Frozen selected ≥10 capped | Current ≥10 uncapped | Current ≥20 |
|---|---|---|---|---|
| BRS4-FM1-PM1::PM1-DIT-1 | iron | 9 | 9 | 5 |
| BRS4-FM1-PM1::PM1-DIT-2 | flavin-mononucleotide | 0 | 0 | 0 |
| BRS4-FM1-PM1::PM1-DIT-3 | vitamin-b2 | 10 | 16 | 7 |
| BRS4-FM1-PM1::PM1-DIT-5 | copper | 10 | 21 | 6 |
| BRS4-FM1-PM10::PM10-DIT-1 | tyrosine | 10 | 27 | 24 |
| BRS4-FM1-PM10::PM10-DIT-2 | methionine | 10 | 32 | 28 |
| BRS4-FM1-PM10::PM10-DIT-3 | vitamin-b2 | 10 | 16 | 7 |
| BRS4-FM1-PM10::PM10-DIT-4 | iron | 9 | 9 | 5 |
| BRS4-FM1-PM2::PM2-DIT-1 | nicotinamide | 0 | 0 | 0 |
| BRS4-FM1-PM2::PM2-DIT-2 | nicotinic-acid | 0 | 0 | 0 |
| BRS4-FM1-PM2::PM2-DIT-3 | tryptophan | 10 | 32 | 27 |
| BRS4-FM1-PM2::PM2-DIT-RECOVERY-NICOTINAMIDE-RIBOSIDE | nicotinamide-riboside | 0 | 0 | 0 |
| BRS4-FM1-PM3::PM3-DIT-1 | creatine | 0 | 0 | 0 |
| BRS4-FM1-PM3::PM3-DIT-2 | arginine | 1 | 16 | 16 |
| BRS4-FM1-PM3::PM3-DIT-3 | glycine | 7 | 19 | 19 |
| BRS4-FM1-PM3::PM3-DIT-RECOVERY-METHIONINE | methionine | 10 | 32 | 28 |
| BRS4-FM2-PM5::PM5-DIT-E | vitamin-e | 10 | 10 | 6 |
| BRS4-FM2-PM5::PM5-DIT-MN | manganese | 5 | 5 | 4 |
| BRS4-FM3-PM6::PM6-DIT-CARNITINE-1 | l-carnitine | 0 | 0 | 0 |
| BRS4-FM3-PM7::PM7-DIT-RECOVERY-CAPRYLIC-TRIGLYCERIDE | caprylic-triglyceride | 0 | 0 | 0 |

The site snapshot is unchanged. It has different display thresholds/caps and does not include all local pending corrections. The strict-pin-matched sensitivity export omits pending rows using current powers; it is not a reranked alternative reference pool. No publication approval is inferred from this analysis.

## Requested food examples

| Food | Rank / score | Inputs and overlap winners |
|---|---|---|
| beef | 14 / 1.7237 | arginine 31.2097%; glycine 68.4753%; methionine 44.0147%; protein-amino-acid-supply 28.6717% |
| herring | 16 / 1.5750 | arginine 27.7276%; glycine 46.7716%; methionine 48.9871%; protein-amino-acid-supply 34.0102% |
| turkey | 9 / 1.9896 | arginine 33.0668%; glycine 52.4145%; methionine 64.9171%; protein-amino-acid-supply 48.5618% |
| sardines | 5 / 2.4877 | arginine 37.9933%; glycine 64.0803%; methionine 100.0000%; protein-amino-acid-supply 46.7005% |
| egg-yolks | 22 / 1.2362 | arginine 28.3467%; glycine 26.4786%; methionine 34.8066%; protein-amino-acid-supply 33.9850% |
| sage | 42 / 0.2275 | iron 22.7508% |
| liver | 1 / 3.6474 | arginine 32.0093%; copper 100.0000%; glycine 63.1579%; methionine 50.0000%; protein-amino-acid-supply 44.5008%; vitamin-b2 75.0681% |
| bell-peppers | no retained score | none ≥20 |
| miso | no retained score | none ≥20 |

Their order was not tuned. Complete protein status is not substituted for a specific BRS4 input. Glycine/arginine/methionine record synthesis substrates; they do not demonstrate increased cerebral creatine. Tyrosine/tryptophan group points remain the explicitly approved provisional overlap convention, not chemical equivalence.

## Distribution and deferred interpretation

| Candidate presentation cutoff (not adopted) | Foods |
|---|---|
| all positive | 44 |
| score ≥1 | 25 |
| score ≥2 | 8 |
| score ≥3 | 1 |
| 25% of leader | 26 |
| 50% of leader | 12 |
| 75% of leader | 2 |

No final cutoff, portion-aware model, intake target, dietary average, frequency/safety recommendation or abacus change was adopted. Existing maxima and incomplete composition coverage affect source-strength order; the result is not nutritional adequacy or demonstrated benefit. Other BRSs remain outside this task.

## Verification

| Check | Status | Evidence |
|---|---|---|
| Independent direct aggregation of EVERY score and rank | PASS | 88 food/view scores and ranks reconstructed without scoreFoods() |
| Independent pre-cap qualification and RSP reconstruction | PASS | 142 >=20 food/form candidates; includes pools larger than ten |
| Observed quantities/preparations/protein match canonical records | PASS | 182 component rows checked against live canonical fields; no missing value is numeric zero |
| Exact USDA arginine recovery and complete intake preservation | PASS | 15 exact-source arginine additions; all old fields, profiles, supplementary records and prose preserved; 357 completeness cells |
| Deduplication, overlap, sodium, inclusive threshold, ties | PASS | Synthetic boundary/tie/duplicate/ownership tests plus every real group |
| Incompatible pools never silently maximised | PASS | Conflicting input pools produce unresolved subtotal, not maximum |
| Shared selector default unchanged | PASS | Exact equality with HEAD implementation for all current BRS4 source pools |
| Frozen manifest, site data, PM records and scientific gates unchanged | PASS | Tracked changes are confined to inherited work, documented food additions and opt-in helpers; no PM, gate, manifest or generated-site changes. |
| Source hashes fresh | PASS | 357 source hashes match current candidate |
| BRS1–3 analyses preserved and scoring unchanged | PASS | 538 prior food/view results identical; 51 prior artifacts byte-identical |
| Non-edited intake records and publication pins preserved | PASS | 375 unchanged pinned files; source additions verified separately; only analysis scope guards extended |
| BRS4 ownership, active-form restrictions and overlap convention | PASS | All eligible atoms PM-owned; no invented upstream routes; Tyr/Trp grouped once; no held active forms or cap losses |
| Previously scored source powers unchanged and new rows publication-pending | PASS | 148 matching observation powers unchanged; 15 new arginine rows pending publication |

Canonical publication contract tests: 3/3 PASS; results in publication-tests.txt. This is focused analytical verification, not a whole-site or release-gate pass.

## Files and boundaries

Source additions: the 15 food files in source-corrections.json. Analysis-only changes: BRS4 configuration, scripts and exports here; the common scorer and existing composition-only builder scope guards now allow BRS4, with equations/default display behavior unchanged. Full inventory: changed-files.json. All prior BRS1–3 artifacts and original food content are preserved. Approved manifest, frozen site snapshot, admissions, ratings, SEC and QC suspension are unchanged. No site build/regeneration, commit, push, merge or deployment.
