# 41-food canonical-source reconciliation — 9 November 2026

**Read-only audit and proposal. No scientific records, selectors, renderers or approvals changed in this task.** Earlier uncommitted wheel-only work remains paused.

Compared fetched GitHub main `2efc9c82b42128d81e1039d7244651b591c3e11d` with the scientific worktree at base `521036b1d6c212e58c660f0f985e47617a71a716` plus its uncommitted records. All 41 local file hashes match the frozen published-wheel composition snapshot. Raw differences: [complete-source-diff.patch](complete-source-diff.patch). Complete old/new records, source notes, analytical forms, preparation and counterfactual ranks: [records.json](records.json).

## Conclusions and authority

The differences comprise **91 added observations, seven eligibility-only updates, five CoQ10 provenance/occurrence changes and two scoped review holds** (105 rows). No existing numeric concentration, standard nutrient-panel value or scientific admission was overwritten in these 41 diffs. Multiple measurements for different preparations are additions, not replacements. “No matching observation” means no corresponding structured record on main, never zero content. Existing main observations for the same substance are recorded separately below.

The original author instruction, “Complete PM Food-Source Coverage, Populate Ontology & Rebuild Food Wheel”, §§5–6, explicitly authorises local evidence-qualified composition additions and requires actual review status to be retained. §8 distinguishes approved selections from candidates. The local coverage handoff explicitly requests author review before publication. CoQ10 has separate explicit 5 November integration approval. Therefore these are **authorised local changes**, not necessarily individually author-adjudicated or approved for publication as canonical food pages. Existing publication of the 64-food snapshot does not establish approval to merge every underlying food record.

Authority source: original supplied instruction attachment (83de256c-d413-407d-82bb-2b8574ba0ef6), plus scientific checkout reports `review/pm-food-source-coverage-2026-11-06/ontology_backfill_changelog.md`, `project-knowledge/handoffs/pm-food-source-coverage-2026-11-06.md`, `review/coq-integration-2026-11-05/REPORT.md` and `review/pm-food-source-coverage-2026-11-06/reconciliation/FINAL-RECONCILIATION.md`. These summaries are supporting evidence, not replacement scientific contracts.

## Impact interpretation

The record-level tests replace only one food/substance source bundle in the main comparison pool while holding the corrected mapper, formula and cap fixed. Such tests isolate a food's effect but can miss collective changes (e.g. two new foods are required to unlock a comparison pool). **17 foods change a rank/power result in that one-food counterfactual**; source-preview simulation changes for 40 foods. These are not a count of browser-verified PM pages. Record metadata changes may matter even when ranks do not.

Displayed “Wheel targets 5/10” counts actual frozen-snapshot PM–substance selections for that food/substance, not causal impact or benefit. Several audit rows can share one food/substance bundle; do not sum their counts. A missing ranked result does not erase food occurrence.

## Important conflicts and qualifications

1. **Pectin and glucose target fit:** the earlier relationship-first report marks BRS5-FM2-PM4 citrus pectin and BRS5-FM3-PM7 glucose sensory stimulation non-rankable as ordinary-food optimisation lists. The later extractor uses `dietary_input === true` plus substance identity and does not apply those target-specific restrictions. Its counts include those targets. Resolve the discrepancy before making the wheel authoritative for PM lists; no automatic admission change is proposed.
2. **Beef holds:** creatine 400 mg/100 g and CoQ10 2.5 mg/100 g remain estimates with unresolved provenance/preparation. Adding their nutrient keys prevents those two holds from suppressing unrelated amino-acid/carnitine observations; it does not verify either estimate.
3. **Betaine:** new Release 2 records retain their exact food states and source assays; these coexist with older records. Quinoa and amaranth source preparation is unspecified, wheat germ is toasted, beetroot raw and added spinach frozen/unprepared. They must not overwrite general-page or differently prepared values.
4. **5-MTHF:** the five existing converted observations retain their original molar values and monoglutamate-equivalent calculation; only eligibility metadata changed. Analytical extraction treatment is not the consumed preparation, and vitamer values must not be added to total folate.
5. **Pectin composition:** four values are calculated from total pectic substances and matched dry matter, not purified/citrus-pectin intervention quantities.
6. **CoQ10:** olive-oil measurements remain mg/L, not converted to mg/100 g; pistachio 10.21–42.16 µg/g remains a sample-specific prose range, not a universal roasted-pistachio point estimate. Heart/early-harvest remain presence-only.
7. **USDA additions:** preserve derivation codes and reported data points. A database-derived value with zero reported sample points must not be labelled a newly measured food assay.
8. **Existing identity ambiguity outside these 41 differences:** `lupins` versus `lupin-beans` share some values but remain separate IDs. Do not silently deduplicate or treat their apparent coverage as proof of distinct food sources.

## Food-by-food overview

|Food|Affected substances|Record changes|Changes ranking/power in single-food test?|Actual Wheel target counts (5 → 10), distinct food–substance–PM|
|---|---|---:|---|---:|
|Almonds (`almonds`)|glycine, serine, arginine, tyrosine, phenylalanine, tryptophan|6|Yes|7 → 14|
|Amaranth (`amaranth`)|betaine|1|No; metadata/unranked or collective effects may remain|9 → 21|
|Apples (`apples`)|pectin|1|No; metadata/unranked or collective effects may remain|3 → 3|
|Bananas (`bananas`)|glucose|1|No; metadata/unranked or collective effects may remain|1 → 1|
|Beef (`beef`)|arginine, tyrosine, phenylalanine, tryptophan, l-carnitine, glycine, serine, creatine, coq10|10|Yes|6 → 13|
|Beetroot (`beetroot`)|betaine|1|No; metadata/unranked or collective effects may remain|7 → 7|
|Broccoli (`broccoli`)|5-methyltetrahydrofolate|1|No; metadata/unranked or collective effects may remain|3 → 3|
|Carrots (`carrots`)|pectin|1|No; metadata/unranked or collective effects may remain|4 → 4|
|Cauliflower (`cauliflower`)|5-methyltetrahydrofolate|1|No; metadata/unranked or collective effects may remain|1 → 3|
|Cheddar Cheese (`cheddar-cheese`)|phenylalanine, tryptophan, l-carnitine|3|Yes|6 → 8|
|Chicken (`chicken`)|arginine, tyrosine, phenylalanine, tryptophan, l-carnitine, glycine, serine|8|Yes|20 → 27|
|Chickpeas (`chickpeas`)|phenylalanine, tryptophan|2|Yes|10 → 20|
|Olive Oil (Early Harvest) (`early-harvest-olive-oil`)|coq10|1|No; metadata/unranked or collective effects may remain|3 → 4|
|Eggs (`eggs`)|arginine, tyrosine, phenylalanine, tryptophan, glycine, serine|7|Yes|17 → 36|
|Extra Virgin Olive Oil (`extra-virgin-olive-oil`)|coq10|1|No; metadata/unranked or collective effects may remain|3 → 3|
|Grapes (`grapes`)|glucose|1|No; metadata/unranked or collective effects may remain|1 → 1|
|Heart (`heart`)|coq10|1|No; metadata/unranked or collective effects may remain|8 → 9|
|Kale (`kale`)|5-methyltetrahydrofolate|1|No; metadata/unranked or collective effects may remain|3 → 3|
|Kidney Beans (`kidney-beans`)|phenylalanine, tryptophan|2|Yes|10 → 10|
|Lentils (`lentils`)|phenylalanine, tryptophan|2|Yes|8 → 18|
|Milk (`milk`)|phenylalanine, tryptophan|2|No; metadata/unranked or collective effects may remain|0 → 0|
|Miso (`miso`)|l-carnitine|1|No; metadata/unranked or collective effects may remain|0 → 0|
|Mussels (`mussels`)|phenylalanine, tryptophan|2|Yes|4 → 23|
|Oats (`oats`)|phenylalanine, tryptophan|2|No; metadata/unranked or collective effects may remain|0 → 0|
|Olive Oil (`olive-oil`)|coq10|1|No; metadata/unranked or collective effects may remain|0 → 0|
|Peanuts (`peanuts`)|phenylalanine, tryptophan|2|Yes|5 → 13|
|Pistachios (`pistachios`)|coq10|1|No; metadata/unranked or collective effects may remain|6 → 12|
|Pork (`pork`)|l-carnitine|1|No; metadata/unranked or collective effects may remain|1 → 1|
|Potatoes (`potatoes`)|pectin|1|No; metadata/unranked or collective effects may remain|3 → 3|
|Pumpkin Seeds (`pumpkin-seeds`)|glycine, serine, arginine, tyrosine, phenylalanine, tryptophan|6|Yes|34 → 39|
|Quinoa (`quinoa`)|phenylalanine, tryptophan, betaine|3|No; metadata/unranked or collective effects may remain|7 → 7|
|Salmon (`salmon`)|arginine, tyrosine, phenylalanine, tryptophan, glycine, serine|7|No; metadata/unranked or collective effects may remain|16 → 26|
|Sardines (`sardines`)|phenylalanine, tryptophan|2|Yes|8 → 28|
|Soy (`soy`)|arginine, tyrosine, glycine, serine, phenylalanine|5|Yes|52 → 69|
|Spinach (`spinach`)|betaine, pectin, 5-methyltetrahydrofolate|3|No; metadata/unranked or collective effects may remain|11 → 11|
|Sunflower Seeds (`sunflower-seeds`)|glycine, serine, arginine, tyrosine, phenylalanine, tryptophan|6|Yes|35 → 47|
|Swiss Chard (`swiss-chard`)|5-methyltetrahydrofolate|1|No; metadata/unranked or collective effects may remain|1 → 1|
|Tofu (`tofu`)|phenylalanine, tryptophan|2|Yes|5 → 10|
|Tuna (`tuna`)|phenylalanine, tryptophan|2|Yes|14 → 19|
|Turkey (`turkey`)|phenylalanine, tryptophan|2|Yes|0 → 14|
|Wheat Germ (`wheat-germ`)|betaine|1|No; metadata/unranked or collective effects may remain|7 → 7|

## Almonds — almonds

Canonical file: `docs/foods/almonds.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### glycine — glycine_recovered_fdc_170567

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.429 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170567/nutrients. #food-source-8
- **Material / preparation / chemical form:** Nuts, almonds / as described in source / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 4 / 4; power 76.01063829787233%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### serine — serine_recovered_fdc_170567

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.912 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170567/nutrients. #food-source-8
- **Material / preparation / chemical form:** Nuts, almonds / as described in source / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 5 / 5; power 38.69325413661434%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### arginine — arginine_recovered_fdc_170567

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 2.465 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170567/nutrients. #food-source-8
- **Material / preparation / chemical form:** Nuts, almonds / as described in source / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 4 / 4; power 46.04894451709322%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_170567

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.45 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170567/nutrients. #food-source-8
- **Material / preparation / chemical form:** Nuts, almonds / as described in source / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 8; power 29.239766081871345%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### phenylalanine — phenylalanine_recovered_fdc_170567

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.132 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170567/nutrients. #food-source-7
- **Material / preparation / chemical form:** Nuts, almonds / as described in source / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 6; power 53.34590009425071%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_170567

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.211 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170567/nutrients. #food-source-7
- **Material / preparation / chemical form:** Nuts, almonds / as described in source / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Amaranth — amaranth

Canonical file: `docs/foods/amaranth.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### betaine — betaine_usda_release2_20001

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 68 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf. #food-source-4
- **Material / preparation / chemical form:** Amaranth; NDB 20001; preparation not specified in source table / unspecified / betaine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 5 / 5; power 10.793650793650794%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 7/7.
- **Limitations:** Source-specific Release 2 assay (1 sample); not a universal value or a cooked-food equivalent. Release 2 corrected earlier betaine overestimation. Choline confidence codes do not grade betaine. Preserve the specified material; no bioavailability or clinical efficacy inferred. Multiple source/preparation records may coexist; Release 2 amounts must not silently overwrite earlier material-specific records.

## Apples — apples

Canonical file: `docs/foods/apples.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### pectin — pectic_substances_bailoni_2005

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.51778 g per 100 g source edible material.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.4081/ijas.2005.49. #food-source-6
- **Material / preparation / chemical form:** Apple, with peel; peduncle and seeds removed / fresh food; laboratory drying for analysis / Total pectic substances (HM, LM and protopectin).
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. Conflicting historical selection instructions: later wheel selects this substance for target(s) previously marked non-rankable; author reconciliation required
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 3/3.
- **Limitations:** Calculated using same-sample moisture. Analytical fractions are not equivalent to purified intervention pectin; cultivar, ripeness and method limit generalisation. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay. Total pectic substances are not the PM-admitted citrus/isolated pectin; stored food occurrence is not target eligibility. Existing wheel selection and relationship-first non-rankable report disagree. Do not silently propagate this discrepancy to PMs.

## Bananas — bananas

Canonical file: `docs/foods/bananas.md`. Body text unchanged.

### glucose — glucose_sr_173944

- **Difference:** observation amended.
- **GitHub main:** 4.98 g per 100 g edible portion.
- **Local:** 4.98 g per 100 g edible portion.
- **Other main observations for this substance:** 4.98 g per 100 g edible portion; raw; docs/foods/bananas.md#nutrition_supplementary_sources/glucose_sr_173944
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173944/nutrients. 
- **Material / preparation / chemical form:** Bananas, raw / raw / glucose.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. Conflicting historical selection instructions: later wheel selects this substance for target(s) previously marked non-rankable; author reconciliation required
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 69.16666666666667%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy glucose (nutrient 1011), distinct from total sugars. Exact source food and form retained. Existing wheel selection and relationship-first non-rankable report disagree. Do not silently propagate this discrepancy to PMs.

## Beef — beef

Canonical file: `docs/foods/beef.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### arginine — arginine_recovered_fdc_171796

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.21 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171796/nutrients. #food-source-9
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 6; power 22.604147207173547%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier AR, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_171796

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.572 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171796/nutrients. #food-source-9
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 6; power 37.16699155295646%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier AR, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### phenylalanine — phenylalanine_recovered_fdc_174032

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.725 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174032/nutrients. #food-source-8
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 3, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_174032

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.094 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174032/nutrients. #food-source-8
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, patty, cooked, broiled / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 3, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### l-carnitine — l_carnitine_furusho_2026_mg

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 45.58 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.5702/massspectrometry.A0191. #food-source-7
- **Material / preparation / chemical form:** Ground beef purchased in Japan / ground, as purchased / free L-carnitine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Single grocery-source preparation; mean ± SE from three extraction determinations, not three independent population samples. Chiral LC-MS/MS measured free L-carnitine with water extraction intended to avoid release from acylcarnitines. Not total acylcarnitine, a universal food value, cooked-food retention, or evidence of mitochondrial benefit. Source-specific measured free L-carnitine; preparation and analytical limitations retained.

### glycine — glycine_fdc_171796_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.262 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171796/nutrients. #food-source-6
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 5 / 5; power 67.12765957446808%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program). USDA derivation: Analytical data; derived by linear regression. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records glycine in this exact raw food. No dietary intervention efficacy inferred.

### serine — serine_fdc_171796_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.744 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171796/nutrients. #food-source-6
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 6; power 31.565549427238015%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/1.
- **Limitations:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program). USDA derivation: Analytical data; derived by linear regression. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records serine in this exact raw food. No dietary intervention efficacy inferred.

### phenylalanine — phenylalanine_fdc_171796_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.725 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171796/nutrients. #food-source-6
- **Material / preparation / chemical form:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program) / raw / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program). USDA derivation: Analytical data; derived by linear regression. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records phenylalanine in this exact raw food. No dietary intervention efficacy inferred.

### creatine — creatine_mg

- **Difference:** review hold scoped.
- **GitHub main:** 400 mg/100 g estimate, source verification pending.
- **Local:** 400 mg/100 g estimate, source verification pending; hold now names creatine_mg.
- **Other main observations for this substance:** 400 mg ; raw; docs/foods/beef.md#nutrition_supplementary_sources/creatine_mg
- **Source/provenance:** Existing source retained; see full record. 
- **Material / preparation / chemical form:** See original record / not specified / creatine.
- **Status:** Approved technical scoping; underlying quantity verification pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Retained researched estimate: 400 mg per 100 g. Original note: Approximate creatine content per 100 g cooked beef based on dietary creatine source summaries and compositional surveys (raw beef muscle ~390–445 mg/100 g, with modest cooking losses; see Avgerinos et al. 2018 and creatine dietary sources reviews).
 Existing estimate remains unresolved; never promote to verified measurement.

### coq10 — coq10_mg

- **Difference:** review hold scoped.
- **GitHub main:** 2.5 mg/100 g estimate, source verification pending.
- **Local:** 2.5 mg/100 g estimate, source verification pending; hold now names coq10_mg.
- **Other main observations for this substance:** 2.5 mg ; raw; docs/foods/beef.md#nutrition_supplementary_sources/coq10_qual
- **Source/provenance:** Existing source retained; see full record. 
- **Material / preparation / chemical form:** See original record / not specified / coq10.
- **Status:** Approved technical scoping; underlying quantity verification pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Retained original beef-muscle estimate of 2.5 mg per 100 g. The cited food-composition research supports beef occurrence, while the exact estimate and applicability to ground beef require verification. Existing estimate remains unresolved; never promote to verified measurement.

## Beetroot — beetroot

Canonical file: `docs/foods/beetroot.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### betaine — betaine_usda_release2_11080

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 130 mg per 100 g food.
- **Other main observations for this substance:** 129 mg per 100 g edible portion; raw; docs/foods/beetroot.md#nutrition_supplementary_sources/betaine_mg
- **Source/provenance:** https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf. #food-source-5
- **Material / preparation / chemical form:** Beets, raw; NDB 11080 / raw / betaine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 20.634920634920633%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 7/7.
- **Limitations:** Source-specific Release 2 assay (1 sample); not a universal value or a cooked-food equivalent. Release 2 corrected earlier betaine overestimation. Choline confidence codes do not grade betaine. Preserve the specified material; no bioavailability or clinical efficacy inferred. Multiple source/preparation records may coexist; Release 2 amounts must not silently overwrite earlier material-specific records.

## Broccoli — broccoli

Canonical file: `docs/foods/broccoli.md`. Body text unchanged.

### 5-methyltetrahydrofolate — 5_mthf_wang_2010

- **Difference:** observation amended.
- **GitHub main:** 101 µg per 100 g fresh edible material.
- **Local:** 101 µg per 100 g fresh edible material.
- **Other main observations for this substance:** 101 µg per 100 g fresh edible material; raw; docs/foods/broccoli.md#nutrition_supplementary_sources/5_mthf_wang_2010
- **Source/provenance:** https://pubmed.ncbi.nlm.nih.gov/20888309/. Wang, Riedl and Schwartz (2010), Journal of Chromatography B 878(29), 2949–2958, Table 5
- **Material / preparation / chemical form:** Raw vegetable, analytical sample treated for folate extraction / raw / 5-MTHF equivalents, summed monoglutamate and polyglutamate species.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 35.06944444444444%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Calculated from the reported Table 5 molar sum, not directly reported mass concentration. Includes polyglutamate species as monoglutamate equivalents, not their intact molecular masses. Glu8 response was estimated by calibration extrapolation; this sample includes that estimated component. Analytical steaming was extraction treatment, not a cooked-food state. One study sample does not establish universal food composition; do not add this vitamer value to total folate as an independent nutrient supply. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay.

## Carrots — carrots

Canonical file: `docs/foods/carrots.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### pectin — pectic_substances_bailoni_2005

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.3049 g per 100 g source edible material.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.4081/ijas.2005.49. #food-source-4
- **Material / preparation / chemical form:** Carrot, raw, peeled / fresh food; laboratory drying for analysis / Total pectic substances (HM, LM and protopectin).
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. Conflicting historical selection instructions: later wheel selects this substance for target(s) previously marked non-rankable; author reconciliation required
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 58.8860133647495%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 3/3.
- **Limitations:** Calculated using same-sample moisture. Analytical fractions are not equivalent to purified intervention pectin; cultivar, ripeness and method limit generalisation. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay. Total pectic substances are not the PM-admitted citrus/isolated pectin; stored food occurrence is not target eligibility. Existing wheel selection and relationship-first non-rankable report disagree. Do not silently propagate this discrepancy to PMs.

## Cauliflower — cauliflower

Canonical file: `docs/foods/cauliflower.md`. Body text unchanged.

### 5-methyltetrahydrofolate — 5_mthf_wang_2010

- **Difference:** observation amended.
- **GitHub main:** 92 µg per 100 g fresh edible material.
- **Local:** 92 µg per 100 g fresh edible material.
- **Other main observations for this substance:** 92 µg per 100 g fresh edible material; raw; docs/foods/cauliflower.md#nutrition_supplementary_sources/5_mthf_wang_2010
- **Source/provenance:** https://pubmed.ncbi.nlm.nih.gov/20888309/. Wang, Riedl and Schwartz (2010), Journal of Chromatography B 878(29), 2949–2958, Table 5
- **Material / preparation / chemical form:** Raw vegetable, analytical sample treated for folate extraction / raw / 5-MTHF equivalents, summed monoglutamate and polyglutamate species.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 4 / 4; power 31.944444444444443%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Calculated from the reported Table 5 molar sum, not directly reported mass concentration. Includes polyglutamate species as monoglutamate equivalents, not their intact molecular masses. Glu8 response was estimated by calibration extrapolation; no Glu8 was detected in this cauliflower sample. Analytical steaming was extraction treatment, not a cooked-food state. One study sample does not establish universal food composition; do not add this vitamer value to total folate as an independent nutrient supply. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay.

## Cheddar Cheese — cheddar-cheese

Canonical file: `docs/foods/cheddar-cheese.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_173414

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.074 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173414/nutrients. #food-source-4
- **Material / preparation / chemical form:** Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / as described in source / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 7; power 50.61262959472196%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_173414

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.547 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173414/nutrients. #food-source-4
- **Material / preparation / chemical form:** Cheese, cheddar (Includes foods for USDA's Food Distribution Program) / as described in source / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 3 / 3; power 92.55499153976311%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### l-carnitine — l_carnitine_furusho_2026_mg

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.32 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.5702/massspectrometry.A0191. #food-source-3
- **Material / preparation / chemical form:** Cheddar cheese purchased at a local grocery store / as purchased / free L-carnitine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Single grocery-source preparation; mean ± SE from three extraction determinations, not three independent population samples. Chiral LC-MS/MS measured free L-carnitine with water extraction intended to avoid release from acylcarnitines. Not total acylcarnitine, a universal food value, cooked-food retention, or evidence of mitochondrial benefit. Source-specific measured free L-carnitine; preparation and analytical limitations retained.

## Chicken — chicken

Canonical file: `docs/foods/chicken.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### arginine — arginine_recovered_fdc_171447

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.169 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171447/nutrients. #food-source-5
- **Material / preparation / chemical form:** Chicken, broilers or fryers, meat and skin, raw / raw / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 7; power 21.838221558004857%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier not reported, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_171447

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.597 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171447/nutrients. #food-source-5
- **Material / preparation / chemical form:** Chicken, broilers or fryers, meat and skin, raw / raw / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 5 / 5; power 38.79142300194932%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier not reported, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### phenylalanine — phenylalanine_recovered_fdc_171477

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.231 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171477/nutrients. #food-source-4
- **Material / preparation / chemical form:** Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 58.01131008482564%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 2/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_171477

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.362 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171477/nutrients. #food-source-4
- **Material / preparation / chemical form:** Chicken, broilers or fryers, breast, meat only, cooked, roasted / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 4 / 4; power 61.25211505922166%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### l-carnitine — l_carnitine_furusho_2026_mg

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 3.83 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.5702/massspectrometry.A0191. #food-source-3
- **Material / preparation / chemical form:** Ground chicken purchased in Japan / ground, as purchased / free L-carnitine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Single grocery-source preparation; mean ± SE from three extraction determinations, not three independent population samples. Chiral LC-MS/MS measured free L-carnitine with water extraction intended to avoid release from acylcarnitines. Not total acylcarnitine, a universal food value, cooked-food retention, or evidence of mitochondrial benefit. Source-specific measured free L-carnitine; preparation and analytical limitations retained.

### glycine — glycine_fdc_171447_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.223 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171447/nutrients. #food-source-2
- **Material / preparation / chemical form:** Chicken, broilers or fryers, meat and skin, raw / raw / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 6; power 65.05319148936171%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** Chicken, broilers or fryers, meat and skin, raw. USDA derivation: Derivation method not reported in this API record. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records glycine in this exact raw food. No dietary intervention efficacy inferred.

### serine — serine_fdc_171447_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.657 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171447/nutrients. #food-source-2
- **Material / preparation / chemical form:** Chicken, broilers or fryers, meat and skin, raw / raw / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 7; power 27.87441663131099%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/1.
- **Limitations:** Chicken, broilers or fryers, meat and skin, raw. USDA derivation: Derivation method not reported in this API record. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records serine in this exact raw food. No dietary intervention efficacy inferred.

### phenylalanine — phenylalanine_fdc_171447_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.721 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171447/nutrients. #food-source-2
- **Material / preparation / chemical form:** Chicken, broilers or fryers, meat and skin, raw / raw / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 58.01131008482564%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 2/2.
- **Limitations:** Chicken, broilers or fryers, meat and skin, raw. USDA derivation: Derivation method not reported in this API record. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records phenylalanine in this exact raw food. No dietary intervention efficacy inferred.

## Chickpeas — chickpeas

Canonical file: `docs/foods/chickpeas.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_173757

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.475 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173757/nutrients. #food-source-2
- **Material / preparation / chemical form:** Chickpeas (garbanzo beans, bengal gram), mature seeds, cooked, boiled, without salt / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_173757

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.085 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173757/nutrients. #food-source-2
- **Material / preparation / chemical form:** Chickpeas (garbanzo beans, bengal gram), mature seeds, cooked, boiled, without salt / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Olive Oil (Early Harvest) — early-harvest-olive-oil

Canonical file: `docs/foods/early-harvest-olive-oil.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### coq10 — coq10_qual

- **Difference:** observation amended.
- **GitHub main:** Presence/provenance only; no rankable numeric value.
- **Local:** Presence/provenance only; no rankable numeric value.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://dirros.openscience.si/Dokument.php?id=36758&lang=eng. #food-source-3
- **Material / preparation / chemical form:** See original record / not specified / coq10.
- **Status:** Explicitly approved local CoQ10 integration; exact source-file publication pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Pravst, Zmitek and Zmitek (2010), Coenzyme Q10 Contents in Foods and Fortification Strategies. Table 1 identifies CoQ10 in extra virgin olive oil. Early-harvest is within virgin olive oil; this supports presence without an early-harvest amount or enhancement claim. CoQ10 is documented in virgin olive oil; an early-harvest-specific amount is unavailable.

## Eggs — eggs

Canonical file: `docs/foods/eggs.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### arginine — arginine_recovered_fdc_171287

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.82 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171287/nutrients. #food-source-8
- **Material / preparation / chemical form:** Egg, whole, raw, fresh / raw / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 8; power 15.318512983373807%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_171287

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.499 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171287/nutrients. #food-source-8
- **Material / preparation / chemical form:** Egg, whole, raw, fresh / raw / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 7; power 32.423651721897336%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### phenylalanine — phenylalanine_recovered_fdc_173424

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.668 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173424/nutrients. #food-source-7
- **Material / preparation / chemical form:** Egg, whole, cooked, hard-boiled / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_173424

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.153 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173424/nutrients. #food-source-7
- **Material / preparation / chemical form:** Egg, whole, cooked, hard-boiled / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### glycine — glycine_fdc_171287_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.432 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171287/nutrients. #food-source-6
- **Material / preparation / chemical form:** Egg, whole, raw, fresh / raw / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 7; power 22.97872340425532%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** Egg, whole, raw, fresh. USDA derivation: Analytical. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA analytical value. USDA FoodData Central records glycine in this exact raw food. No dietary intervention efficacy inferred.

### serine — serine_fdc_171287_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.971 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171287/nutrients. #food-source-6
- **Material / preparation / chemical form:** Egg, whole, raw, fresh / raw / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 4 / 4; power 41.19643614764531%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Egg, whole, raw, fresh. USDA derivation: Analytical. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA analytical value. USDA FoodData Central records serine in this exact raw food. No dietary intervention efficacy inferred.

### phenylalanine — phenylalanine_fdc_171287_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.68 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171287/nutrients. #food-source-6
- **Material / preparation / chemical form:** Egg, whole, raw, fresh / raw / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Egg, whole, raw, fresh. USDA derivation: Analytical. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA analytical value. USDA FoodData Central records phenylalanine in this exact raw food. No dietary intervention efficacy inferred.

## Extra Virgin Olive Oil — extra-virgin-olive-oil

Canonical file: `docs/foods/extra-virgin-olive-oil.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### coq10 — coq10

- **Difference:** relationship/provenance amended.
- **GitHub main:** Presence/provenance only; no rankable numeric value.
- **Local:** Presence/provenance only; no rankable numeric value.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.1021/jf5002167. #food-source-5
- **Material / preparation / chemical form:** Fresh extra-virgin olive oils from the tested cultivars and maturity stages; not every bottled or heated preparation. / not specified / coq10.
- **Status:** Explicitly approved local CoQ10 integration; exact source-file publication pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** HPLC analysis identified CoQ10 in fresh extra-virgin olive oils; cultivar and maturity affected measured content.

## Grapes — grapes

Canonical file: `docs/foods/grapes.md`. Body text unchanged.

### glucose — glucose_sr_174683

- **Difference:** observation amended.
- **GitHub main:** 7.2 g per 100 g edible portion.
- **Local:** 7.2 g per 100 g edible portion.
- **Other main observations for this substance:** 7.2 g per 100 g edible portion; raw; docs/foods/grapes.md#nutrition_supplementary_sources/glucose_sr_174683
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174683/nutrients. 
- **Material / preparation / chemical form:** Grapes, red or green (European type, such as Thompson seedless), raw / raw / glucose.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. Conflicting historical selection instructions: later wheel selects this substance for target(s) previously marked non-rankable; author reconciliation required
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy glucose (nutrient 1011), distinct from total sugars. Exact source food and form retained. Existing wheel selection and relationship-first non-rankable report disagree. Do not silently propagate this discrepancy to PMs.

## Heart — heart

Canonical file: `docs/foods/heart.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### coq10 — coq10_qual

- **Difference:** observation amended.
- **GitHub main:** Presence/provenance only; no rankable numeric value.
- **Local:** Presence/provenance only; no rankable numeric value.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://pubmed.ncbi.nlm.nih.gov/10775376/. #food-source-3
- **Material / preparation / chemical form:** See original record / not specified / coq10.
- **Status:** Explicitly approved local CoQ10 integration; exact source-file publication pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Primary abstract explicitly analyzes individual CoQ10 in beef steak and beef heart; no generic cut-specific amount inferred. Mattila et al. (2000) analysed CoQ10 in beef heart. A separate amount for this page’s preparation is not established.

## Kale — kale

Canonical file: `docs/foods/kale.md`. Body text unchanged.

### 5-methyltetrahydrofolate — 5_mthf_wang_2010

- **Difference:** observation amended.
- **GitHub main:** 54 µg per 100 g fresh edible material.
- **Local:** 54 µg per 100 g fresh edible material.
- **Other main observations for this substance:** 54 µg per 100 g fresh edible material; raw; docs/foods/kale.md#nutrition_supplementary_sources/5_mthf_wang_2010 / 67.02 µg per 100 g fresh material; raw; docs/foods/kale.md#nutrition_supplementary_sources/5_mthf_independent_observation
- **Source/provenance:** https://pubmed.ncbi.nlm.nih.gov/20888309/. Wang, Riedl and Schwartz (2010), Journal of Chromatography B 878(29), 2949–2958, Table 5
- **Material / preparation / chemical form:** Raw vegetable, analytical sample treated for folate extraction / raw / 5-MTHF equivalents, summed monoglutamate and polyglutamate species.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 5 / 5; power 18.749999999999996%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Calculated from the reported Table 5 molar sum, not directly reported mass concentration. Includes polyglutamate species as monoglutamate equivalents, not their intact molecular masses. Glu8 response was estimated by calibration extrapolation; this sample includes that estimated component. Analytical steaming was extraction treatment, not a cooked-food state. One study sample does not establish universal food composition; do not add this vitamer value to total folate as an independent nutrient supply. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay.

## Kidney Beans — kidney-beans

Canonical file: `docs/foods/kidney-beans.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_175194

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.469 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175194/nutrients. #food-source-1
- **Material / preparation / chemical form:** Beans, kidney, red, mature seeds, cooked, boiled, without salt / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_175194

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.103 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175194/nutrients. #food-source-1
- **Material / preparation / chemical form:** Beans, kidney, red, mature seeds, cooked, boiled, without salt / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Lentils — lentils

Canonical file: `docs/foods/lentils.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_172421

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.445 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/172421/nutrients. #food-source-7
- **Material / preparation / chemical form:** Lentils, mature seeds, cooked, boiled, without salt / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_172421

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.081 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/172421/nutrients. #food-source-7
- **Material / preparation / chemical form:** Lentils, mature seeds, cooked, boiled, without salt / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Milk — milk

Canonical file: `docs/foods/milk.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_171265

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.163 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171265/nutrients. #food-source-3
- **Material / preparation / chemical form:** Milk, whole, 3.25% milkfat, with added vitamin D / as described in source / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_171265

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.04 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171265/nutrients. #food-source-3
- **Material / preparation / chemical form:** Milk, whole, 3.25% milkfat, with added vitamin D / as described in source / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Miso — miso

Canonical file: `docs/foods/miso.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### l-carnitine — l_carnitine_furusho_2026_mg

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.22 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.5702/massspectrometry.A0191. #food-source-3
- **Material / preparation / chemical form:** Miso purchased at a local grocery store / fermented paste, as purchased / free L-carnitine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Single grocery-source preparation; mean ± SE from three extraction determinations, not three independent population samples. Chiral LC-MS/MS measured free L-carnitine with water extraction intended to avoid release from acylcarnitines. Not total acylcarnitine, a universal food value, cooked-food retention, or evidence of mitochondrial benefit. Source-specific measured free L-carnitine; preparation and analytical limitations retained.

## Mussels — mussels

Canonical file: `docs/foods/mussels.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_174217

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.853 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174217/nutrients. #food-source-4
- **Material / preparation / chemical form:** Mollusks, mussel, blue, cooked, moist heat / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 10; power 40.19792648444863%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_174217

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.267 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174217/nutrients. #food-source-4
- **Material / preparation / chemical form:** Mollusks, mussel, blue, cooked, moist heat / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 8; power 45.17766497461929%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Oats — oats

Canonical file: `docs/foods/oats.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_173905

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.142 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173905/nutrients. #food-source-4
- **Material / preparation / chemical form:** Cereals, oats, regular and quick, unenriched, cooked with water (includes boiling and microwaving), without salt / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_173905

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.04 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173905/nutrients. #food-source-4
- **Material / preparation / chemical form:** Cereals, oats, regular and quick, unenriched, cooked with water (includes boiling and microwaving), without salt / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Olive Oil — olive-oil

Canonical file: `docs/foods/olive-oil.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### coq10 — coq10

- **Difference:** relationship added.
- **GitHub main:** No matching observation (not zero).
- **Local:** Presence/provenance only; no rankable numeric value.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.1021/jf5002167. #food-source-3
- **Material / preparation / chemical form:** Two commercial refined olive-oil samples; not a measurement of this page's branded USDA product or heated oil. / not specified / coq10.
- **Status:** Explicitly approved local CoQ10 integration; exact source-file publication pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** CoQ10 was measured separately from CoQ9 in tested commercial refined olive oils.

## Peanuts — peanuts

Canonical file: `docs/foods/peanuts.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_173806

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.227 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173806/nutrients. #food-source-1
- **Material / preparation / chemical form:** Peanuts, all types, dry-roasted, without salt / roasted / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 4 / 4; power 57.822808671065026%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 2/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_173806

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.23 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173806/nutrients. #food-source-1
- **Material / preparation / chemical form:** Peanuts, all types, dry-roasted, without salt / roasted / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 10; power 38.917089678511%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Pistachios — pistachios

Canonical file: `docs/foods/pistachios.md`. Body text unchanged.

### coq10 — coq10_qual

- **Difference:** observation amended.
- **GitHub main:** Presence/provenance only; no rankable numeric value.
- **Local:** Presence/provenance only; no rankable numeric value.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://pmc.ncbi.nlm.nih.gov/articles/PMC9920066/. #food-source-1
- **Material / preparation / chemical form:** See original record / not specified / coq10.
- **Status:** Explicitly approved local CoQ10 integration; exact source-file publication pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** no source-preview difference detected by this simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Nano-Liquid Chromatography for Coenzyme Q10 in Pistachio Samples (2023). Primary Table 2 measures individual CoQ10 in six named pistachio samples. Six named pistachio samples contained 10.21–42.16 µg/g CoQ10; not a generic roasted-kernel value.

## Pork — pork

Canonical file: `docs/foods/pork.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### l-carnitine — l_carnitine_furusho_2026_mg

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 12.76 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.5702/massspectrometry.A0191. #food-source-5
- **Material / preparation / chemical form:** Ground pork purchased in Japan / ground, as purchased / free L-carnitine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 27.994734532689776%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Single grocery-source preparation; mean ± SE from three extraction determinations, not three independent population samples. Chiral LC-MS/MS measured free L-carnitine with water extraction intended to avoid release from acylcarnitines. Not total acylcarnitine, a universal food value, cooked-food retention, or evidence of mitochondrial benefit. Source-specific measured free L-carnitine; preparation and analytical limitations retained.

## Potatoes — potatoes

Canonical file: `docs/foods/potatoes.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### pectin — pectic_substances_bailoni_2005

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.18067 g per 100 g source edible material.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.4081/ijas.2005.49. #food-source-4
- **Material / preparation / chemical form:** Potato, with peel; buds removed / fresh food; laboratory drying for analysis / Total pectic substances (HM, LM and protopectin).
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. Conflicting historical selection instructions: later wheel selects this substance for target(s) previously marked non-rankable; author reconciliation required
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 4 / 4; power 34.89319788327089%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 3/3.
- **Limitations:** Calculated using same-sample moisture. Analytical fractions are not equivalent to purified intervention pectin; cultivar, ripeness and method limit generalisation. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay. Total pectic substances are not the PM-admitted citrus/isolated pectin; stored food occurrence is not target eligibility. Existing wheel selection and relationship-first non-rankable report disagree. Do not silently propagate this discrepancy to PMs.

## Pumpkin Seeds — pumpkin-seeds

Canonical file: `docs/foods/pumpkin-seeds.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### glycine — glycine_recovered_fdc_170556

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.843 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170556/nutrients. #food-source-3
- **Material / preparation / chemical form:** Seeds, pumpkin and squash seed kernels, dried / dried / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 98.03191489361703%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### serine — serine_recovered_fdc_170556

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.673 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170556/nutrients. #food-source-3
- **Material / preparation / chemical form:** Seeds, pumpkin and squash seed kernels, dried / dried / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 70.98005939753924%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### arginine — arginine_recovered_fdc_170556

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 5.353 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170556/nutrients. #food-source-3
- **Material / preparation / chemical form:** Seeds, pumpkin and squash seed kernels, dried / dried / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_170556

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.093 g per 100 g edible portion.
- **Other main observations for this substance:** 1.093 g per 100 g edible portion; dried; docs/foods/pumpkin-seeds.md#nutrition_per_100g/tyrosine_g
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170556/nutrients. #food-source-3
- **Material / preparation / chemical form:** Seeds, pumpkin and squash seed kernels, dried / dried / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 71.02014294996751%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### phenylalanine — phenylalanine_recovered_fdc_170556

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.733 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170556/nutrients. #food-source-2
- **Material / preparation / chemical form:** Seeds, pumpkin and squash seed kernels, dried / dried / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 81.66823751178134%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 2/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_170556

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.576 g per 100 g edible portion.
- **Other main observations for this substance:** 0.576 g per 100 g edible portion; dried; docs/foods/pumpkin-seeds.md#nutrition_per_100g/tryptophan_g
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170556/nutrients. #food-source-2
- **Material / preparation / chemical form:** Seeds, pumpkin and squash seed kernels, dried / dried / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 97.46192893401016%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Quinoa — quinoa

Canonical file: `docs/foods/quinoa.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_168917

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.185 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/168917/nutrients. #food-source-4
- **Material / preparation / chemical form:** Quinoa, cooked / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_168917

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.052 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/168917/nutrients. #food-source-4
- **Material / preparation / chemical form:** Quinoa, cooked / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### betaine — betaine_usda_release2_20035

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 630 mg per 100 g food.
- **Other main observations for this substance:** 630 mg ; uncooked; docs/foods/quinoa.md#nutrition_supplementary_sources/betaine_mg
- **Source/provenance:** https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf. #food-source-3
- **Material / preparation / chemical form:** Quinoa; NDB 20035; preparation not specified in source table / unspecified / betaine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 7/7.
- **Limitations:** Source-specific Release 2 assay (1 sample); not a universal value or a cooked-food equivalent. Release 2 corrected earlier betaine overestimation. Choline confidence codes do not grade betaine. Preserve the specified material; no bioavailability or clinical efficacy inferred. Multiple source/preparation records may coexist; Release 2 amounts must not silently overwrite earlier material-specific records.

## Salmon — salmon

Canonical file: `docs/foods/salmon.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### arginine — arginine_recovered_fdc_175167

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.221 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175167/nutrients. #food-source-6
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, raw / raw / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_175167

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.759 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175167/nutrients. #food-source-6
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, raw / raw / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier A, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### phenylalanine — phenylalanine_recovered_fdc_175168

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.863 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175168/nutrients. #food-source-5
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_175168

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.248 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175168/nutrients. #food-source-5
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, cooked, dry heat / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### glycine — glycine_fdc_175167_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.96 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175167/nutrients. #food-source-4
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, raw / raw / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Fish, salmon, Atlantic, farmed, raw. USDA derivation: Analytical. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA analytical value. USDA FoodData Central records glycine in this exact raw food. No dietary intervention efficacy inferred.

### serine — serine_fdc_175167_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.896 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175167/nutrients. #food-source-4
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, raw / raw / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Fish, salmon, Atlantic, farmed, raw. USDA derivation: Analytical. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA analytical value. USDA FoodData Central records serine in this exact raw food. No dietary intervention efficacy inferred.

### phenylalanine — phenylalanine_fdc_175167_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.845 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175167/nutrients. #food-source-4
- **Material / preparation / chemical form:** Fish, salmon, Atlantic, farmed, raw / raw / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** Fish, salmon, Atlantic, farmed, raw. USDA derivation: Analytical. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA analytical value. USDA FoodData Central records phenylalanine in this exact raw food. No dietary intervention efficacy inferred.

## Sardines — sardines

Canonical file: `docs/foods/sardines.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_175139

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.961 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175139/nutrients. #food-source-6
- **Material / preparation / chemical form:** Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 8; power 45.28746465598492%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_175139

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.276 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/175139/nutrients. #food-source-6
- **Material / preparation / chemical form:** Fish, sardine, Atlantic, canned in oil, drained solids with bone / canned / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 7; power 46.7005076142132%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Soy — soy

Canonical file: `docs/foods/soy.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### arginine — arginine_recovered_fdc_174270

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 3.153 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174270/nutrients. #food-source-8
- **Material / preparation / chemical form:** Soybeans, mature seeds, raw / raw / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 3 / 3; power 58.901550532411726%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier BFSN, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tyrosine — tyrosine_recovered_fdc_174270

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.539 g per 100 g edible portion.
- **Other main observations for this substance:** 1.539 g per 100 g edible portion; raw; docs/foods/soy.md#nutrition_per_100g/tyrosine_g
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174270/nutrients. #food-source-8
- **Material / preparation / chemical form:** Soybeans, mature seeds, raw / raw / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier BFSN, data points not reported. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### glycine — glycine_fdc_174270_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.88 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174270/nutrients. #food-source-7
- **Material / preparation / chemical form:** Soybeans, mature seeds, raw / raw / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** Soybeans, mature seeds, raw. USDA derivation: Based on another form of the food or similar food; Concentration adjustment; Solids; Retention factors not used. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records glycine in this exact raw food. No dietary intervention efficacy inferred.

### serine — serine_fdc_174270_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 2.357 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174270/nutrients. #food-source-7
- **Material / preparation / chemical form:** Soybeans, mature seeds, raw / raw / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Soybeans, mature seeds, raw. USDA derivation: Based on another form of the food or similar food; Concentration adjustment; Solids; Retention factors not used. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records serine in this exact raw food. No dietary intervention efficacy inferred.

### phenylalanine — phenylalanine_fdc_174270_g

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 2.122 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/174270/nutrients. #food-source-7
- **Material / preparation / chemical form:** Soybeans, mature seeds, raw / raw / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 2/2.
- **Limitations:** Soybeans, mature seeds, raw. USDA derivation: Based on another form of the food or similar food; Concentration adjustment; Solids; Retention factors not used. Raw-food composition does not establish cooked-food retention, digestibility, brain delivery or intervention efficacy. Raw-food composition; USDA database value; derivation qualified in source record. USDA FoodData Central records phenylalanine in this exact raw food. No dietary intervention efficacy inferred.

## Spinach — spinach

Canonical file: `docs/foods/spinach.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### betaine — betaine_usda_release2_11463

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 120 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf. #food-source-7
- **Material / preparation / chemical form:** Spinach, frozen, chopped or leaf, unprepared; NDB 11463 / frozen, unprepared / betaine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 4 / 4; power 19.047619047619047%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 7/7.
- **Limitations:** Source-specific Release 2 assay (3 samples); not a universal value or a cooked-food equivalent. Release 2 corrected earlier betaine overestimation. Choline confidence codes do not grade betaine. Preserve the specified material; no bioavailability or clinical efficacy inferred. Multiple source/preparation records may coexist; Release 2 amounts must not silently overwrite earlier material-specific records.

### pectin — pectic_substances_bailoni_2005

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.38167 g per 100 g source edible material.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://doi.org/10.4081/ijas.2005.49. #food-source-6
- **Material / preparation / chemical form:** Spinach, root removed / fresh food; laboratory drying for analysis / Total pectic substances (HM, LM and protopectin).
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. Conflicting historical selection instructions: later wheel selects this substance for target(s) previously marked non-rankable; author reconciliation required
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 73.71277376491948%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 3/3.
- **Limitations:** Calculated using same-sample moisture. Analytical fractions are not equivalent to purified intervention pectin; cultivar, ripeness and method limit generalisation. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay. Total pectic substances are not the PM-admitted citrus/isolated pectin; stored food occurrence is not target eligibility. Existing wheel selection and relationship-first non-rankable report disagree. Do not silently propagate this discrepancy to PMs.

### 5-methyltetrahydrofolate — 5_mthf_wang_2010

- **Difference:** observation amended.
- **GitHub main:** 288 µg per 100 g fresh edible material.
- **Local:** 288 µg per 100 g fresh edible material.
- **Other main observations for this substance:** 288 µg per 100 g fresh edible material; raw; docs/foods/spinach.md#nutrition_supplementary_sources/5_mthf_wang_2010 / 72.2 µg per 100 g fresh material; unspecified; docs/foods/spinach.md#nutrition_supplementary_sources/5_mthf_independent_observation
- **Source/provenance:** https://pubmed.ncbi.nlm.nih.gov/20888309/. Wang, Riedl and Schwartz (2010), Journal of Chromatography B 878(29), 2949–2958, Table 5
- **Material / preparation / chemical form:** Raw vegetable, analytical sample treated for folate extraction / raw / 5-MTHF equivalents, summed monoglutamate and polyglutamate species.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 1 / 1; power 100%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Calculated from the reported Table 5 molar sum, not directly reported mass concentration. Includes polyglutamate species as monoglutamate equivalents, not their intact molecular masses. Glu8 response was estimated by calibration extrapolation; this sample includes that estimated component. Analytical steaming was extraction treatment, not a cooked-food state. One study sample does not establish universal food composition; do not add this vitamer value to total folate as an independent nutrient supply. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay.

## Sunflower Seeds — sunflower-seeds

Canonical file: `docs/foods/sunflower-seeds.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### glycine — glycine_recovered_fdc_170562

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.461 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170562/nutrients. #food-source-5
- **Material / preparation / chemical form:** Seeds, sunflower seed kernels, dried / dried / glycine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 77.7127659574468%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier not reported, data points 26. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred.

### serine — serine_recovered_fdc_170562

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.075 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170562/nutrients. #food-source-5
- **Material / preparation / chemical form:** Seeds, sunflower seed kernels, dried / dried / serine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 3 / 3; power 45.60882477725923%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier not reported, data points 26. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred.

### arginine — arginine_recovered_fdc_170562

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 2.403 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170562/nutrients. #food-source-5
- **Material / preparation / chemical form:** Seeds, sunflower seed kernels, dried / dried / arginine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 5 / 5; power 44.890715486643%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier not reported, data points 35. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred.

### tyrosine — tyrosine_recovered_fdc_170562

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.666 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170562/nutrients. #food-source-5
- **Material / preparation / chemical form:** Seeds, sunflower seed kernels, dried / dried / tyrosine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 4 / 4; power 43.27485380116959%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier not reported, data points 31. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred.

### phenylalanine — phenylalanine_recovered_fdc_170562

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 1.169 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170562/nutrients. #food-source-4
- **Material / preparation / chemical form:** Seeds, sunflower seed kernels, dried / dried / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 5 / 5; power 55.08953817153629%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 2/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 40. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred.

### tryptophan — tryptophan_recovered_fdc_170562

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.348 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/170562/nutrients. #food-source-4
- **Material / preparation / chemical form:** Seeds, sunflower seed kernels, dried / dried / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: 5 / 5; power 58.88324873096447%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 5/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier , data points 25. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred.

## Swiss Chard — swiss-chard

Canonical file: `docs/foods/swiss-chard.md`. Body text unchanged.

### 5-methyltetrahydrofolate — 5_mthf_wang_2010

- **Difference:** observation amended.
- **GitHub main:** 242 µg per 100 g fresh edible material.
- **Local:** 242 µg per 100 g fresh edible material.
- **Other main observations for this substance:** 242 µg per 100 g fresh edible material; raw; docs/foods/swiss-chard.md#nutrition_supplementary_sources/5_mthf_wang_2010
- **Source/provenance:** https://pubmed.ncbi.nlm.nih.gov/20888309/. Wang, Riedl and Schwartz (2010), Journal of Chromatography B 878(29), 2949–2958, Table 5
- **Material / preparation / chemical form:** Raw vegetable, analytical sample treated for folate extraction / raw / 5-MTHF equivalents, summed monoglutamate and polyglutamate species.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 84.02777777777777%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 1/1.
- **Limitations:** Calculated from the reported Table 5 molar sum, not directly reported mass concentration. Includes polyglutamate species as monoglutamate equivalents, not their intact molecular masses. Glu8 response was estimated by calibration extrapolation; this sample includes that estimated component. Analytical steaming was extraction treatment, not a cooked-food state. One study sample does not establish universal food composition; do not add this vitamer value to total folate as an independent nutrient supply. Calculated/converted source-specific amount; preserve original observation and conversion, not a direct universal assay.

## Tofu — tofu

Canonical file: `docs/foods/tofu.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_172475

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.835 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/172475/nutrients. #food-source-6
- **Material / preparation / chemical form:** Tofu, raw, firm, prepared with calcium sulfate / raw / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 51, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_172475

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.235 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/172475/nutrients. #food-source-6
- **Material / preparation / chemical form:** Tofu, raw, firm, prepared with calcium sulfate / raw / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 9; power 39.76311336717428%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 51, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Tuna — tuna

Canonical file: `docs/foods/tuna.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_173709

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.727 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173709/nutrients. #food-source-4
- **Material / preparation / chemical form:** Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_173709

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.209 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/173709/nutrients. #food-source-4
- **Material / preparation / chemical form:** Fish, tuna, light, canned in water, drained solids (Includes foods for USDA's Food Distribution Program) / canned / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / unselected; power unranked.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/0.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Turkey — turkey

Canonical file: `docs/foods/turkey.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### phenylalanine — phenylalanine_recovered_fdc_171496

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.869 g per 100 g edible portion.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171496/nutrients. #food-source-2
- **Material / preparation / chemical form:** Turkey, whole, breast, meat only, cooked, roasted / cooked / phenylalanine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: unselected / 9; power 40.95193213949105%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/2.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

### tryptophan — tryptophan_recovered_fdc_171496

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 0.287 g per 100 g edible portion.
- **Other main observations for this substance:** 0.241 g per 100 g edible portion; raw; docs/foods/turkey.md#nutrition_per_100g/tryptophan_g
- **Source/provenance:** https://fdc.nal.usda.gov/food-details/171496/nutrients. #food-source-2
- **Material / preparation / chemical form:** Turkey, whole, breast, meat only, cooked, roasted / cooked / tryptophan.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 yes, top10 yes. Actual local rank: unselected / 6; power 48.56175972927242%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 0/5.
- **Limitations:** USDA SR Legacy source-specific database value; derivation identifier 1, data points 0. Full source description defines preparation, not the generic page nutrient panel. No digestibility, brain uptake or clinical benefit inferred. USDA derivation retained; zero reported data points is not a direct measured sample count.

## Wheat Germ — wheat-germ

Canonical file: `docs/foods/wheat-germ.md`. Supporting authored text/references also differ; exact changes preserved in the patch.

### betaine — betaine_usda_release2_08084

- **Difference:** observation added.
- **GitHub main:** No matching observation (not zero).
- **Local:** 410 mg per 100 g food.
- **Other main observations for this substance:** None returned by canonical mapper (presence or held records may still exist).
- **Source/provenance:** https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf. #food-source-7
- **Material / preparation / chemical form:** Wheat germ, toasted, plain; NDB 08084 / toasted / betaine.
- **Status:** Approved local evidence-qualified backfill; individual candidate/publication review pending. 
- **Ranking impact:** single-food replacement changes top5 no, top10 no. Actual local rank: 2 / 2; power 65.07936507936508%.
- **PM source-preview impact:** changes selected records/order/metadata in read-only source-level simulation.
- **Wheel targets 5/10:** 7/7.
- **Limitations:** Source-specific Release 2 assay (2 samples); not a universal value or a cooked-food equivalent. Release 2 corrected earlier betaine overestimation. Choline confidence codes do not grade betaine. Preserve the specified material; no bioavailability or clinical efficacy inferred. Multiple source/preparation records may coexist; Release 2 amounts must not silently overwrite earlier material-specific records.

## Validation and release dependencies

Read-only checks passed: 41 main/local file hash pairs unchanged; all 105 changes accounted for; no existing observation value/unit/basis/calculation altered; 189 local source-anchor checks resolve. This validates record reconciliation, not independent reappraisal of every original paper. No production build or new browser validation was needed or claimed for this report-only task.

Two citation entries exist in the scientific checkout but are absent from main: `bailoni_pectins_2005` and `furusho_carnitine_food_2026`. A future approved integration needs those exact bibliography entries, not a wholesale bibliography overwrite. Source access and limitations remain as recorded. See [validation.json](validation.json).

The existing wheel conflict comprises four pectin food edges to BRS5-FM2-PM4 (apples, spinach, carrots, potatoes) and two glucose food edges to BRS5-FM3-PM7 (grapes, bananas). Their composition records and PM admissions are distinct from the decision to rank these foods for the particular target. No edge or admission was removed in this audit.

Next review: approve or hold exact composition additions and ranking metadata, reconcile the two target-scope conflicts, and review the [shared-selector proposal](SHARED-SELECTOR-PROPOSAL.md). Only then implement joint PM/Wheel generation. No commit, push, merge or deployment performed.
