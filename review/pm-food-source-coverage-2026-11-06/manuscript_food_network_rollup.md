# Food network scientific roll-up — local author review

The bounded research and local implementation pass covers **67 PMs**, including the two author-approved Cursor extensions read from their separate checkout. **45 PMs have 151 eligible PM–substance pairs (55 distinct substances).** No PM admission, mission, Finding or SEC was changed by this task.

## Completeness (explicit denominators)

- Research decisions: 151/151 eligible pairs (100%). This includes documented access/form limitations, not fabricated negative findings.
- Five-source completeness: baseline 87/151 (57.6%); candidate 114/151 (75.5%).
- At least one qualified quantitative source: baseline 98/151 (64.9%); candidate 119/151 (78.8%).
- Candidate partial: 5; unresolved/no rankable source: 32.
- Five-slot quantitative coverage: 588/755 (77.9%); 755 is 151 × five, a reporting ceiling, not an obligation to invent foods.
- Author-approved individual top-five selections: **not established**. The author approved the selection rule and researched ontology updates; “approved-source” means the pre-task canonical source pool. It does not manufacture a history of author approval for each automatically selected food.
- Presence-only records are retained in the inventory but contribute zero ranking edges. Database-derived/calculated quantities are explicitly classified; verified does not mean every value is a direct laboratory measurement.

91 source-specific observations were added and seven existing observations qualified across 36 food pages. The candidate source pool is reranked, producing 588 selected edges versus 467 baseline edges. Higher-ranked new foods can replace lower-ranked historical selections. Candidate edges are not simply unioned with baseline edges.

## Baseline source-pool ranking

| Food | Substance–PM score | Substances | PMs | BRS reach |
|---|---:|---:|---:|---:|
| nori | 31 | 7 | 18 | 5 |
| liver | 30 | 7 | 18 | 5 |
| soy | 27 | 5 | 18 | 5 |
| pumpkin-seeds | 25 | 7 | 19 | 8 |
| spirulina | 23 | 6 | 13 | 4 |
| nutritional-yeast | 22 | 5 | 16 | 7 |
| sunflower-seeds | 19 | 5 | 15 | 6 |
| eggs | 16 | 2 | 13 | 3 |
| salmon | 16 | 4 | 14 | 6 |
| sesame-seeds | 15 | 4 | 13 | 8 |
| anchovies | 14 | 4 | 11 | 4 |
| kidney | 14 | 4 | 11 | 4 |
| tuna | 14 | 3 | 14 | 7 |
| egg-yolks | 13 | 3 | 12 | 3 |
| soy-lecithin | 13 | 3 | 13 | 5 |
| thyme | 13 | 3 | 11 | 7 |
| black-beans | 10 | 2 | 9 | 2 |
| chickpeas | 10 | 2 | 10 | 4 |
| herring | 10 | 3 | 8 | 5 |
| kidney-beans | 10 | 2 | 9 | 2 |

## Research-qualified candidate ranking

| Food | Substance–PM score | Substances | PMs | BRS reach |
|---|---:|---:|---:|---:|
| sunflower-seeds | 38 | 11 | 23 | 6 |
| soy | 36 | 9 | 23 | 5 |
| pumpkin-seeds | 34 | 11 | 24 | 8 |
| nori | 31 | 7 | 18 | 5 |
| liver | 30 | 7 | 18 | 5 |
| chicken | 26 | 7 | 17 | 5 |
| spirulina | 23 | 6 | 13 | 4 |
| nutritional-yeast | 22 | 5 | 16 | 7 |
| eggs | 17 | 3 | 13 | 3 |
| salmon | 16 | 4 | 14 | 6 |
| sesame-seeds | 15 | 4 | 13 | 8 |
| anchovies | 14 | 4 | 11 | 4 |
| kidney | 14 | 4 | 11 | 4 |
| tuna | 14 | 3 | 14 | 7 |
| egg-yolks | 13 | 3 | 12 | 3 |
| soy-lecithin | 13 | 3 | 13 | 5 |
| thyme | 13 | 3 | 11 | 7 |
| spinach | 11 | 3 | 11 | 3 |
| black-beans | 10 | 2 | 9 | 2 |
| chickpeas | 10 | 2 | 10 | 4 |

## Interpretation and method

Scores count unique (substance, receiving PM) pairs per food, not distinct molecules alone and not health effects. Foods represented in many PMs therefore receive larger counts; this reflects framework structure and source availability. The exact receiving PM owns system reach. No transitive “this substance appears somewhere in BRS6” expansion is allowed. Derived provision is counted at its admitted dietary precursor identity, not once again for every endogenous downstream molecule. BRS-X subsystems are separate in reach counts.

Selection considers only existing eligible dietary-input relationships and source-qualified positive per-100g observations with compatible chemical forms. Up to five distinct canonical foods are sorted by amount after documented mass-unit conversion. Dried edible products remain distinct preparations but may be compared per100g product; dry-matter analytical values require matched moisture. Sample ranges, estimates without adequate qualification, presence-only claims and unknown denominators are not ranked. Pectin and folate equivalents remain source-specific groups. Realistic servings and bioavailability are limitations, not invented score adjustments.

Broad coverage does not demonstrate absorbed dose, brain delivery, nutritional adequacy or ADHD efficacy. Nori, seeds and liver appear prominently because their recorded concentrated forms connect to several eligible PMs. This is not a recommendation to consume 100g of dried seaweed or liver. Safety, serving size and population needs require separate evaluation.

Reproduce: run `node review/pm-food-source-coverage-2026-11-06/select.mjs`, then this report script, `wheel.mjs`, and the local preview `build.mjs`. Backfill scripts must not be rerun as a routine generation step. They preserve source-specific histories and are not data-refresh jobs. Use `validate-final.mjs` for edge, provenance and preservation checks. Review `target-research-decisions.csv` and the full observation JSON for exact source qualifications.
