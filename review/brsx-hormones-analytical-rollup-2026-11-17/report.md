# BRS-X/Hormones — local analytical source strength

17 November 2026. Provisional analysis, not food quality, adequacy, beneficial direction or demonstrated efficacy. No serving-level inference.

Checkout: /Users/paulhouston/.codex/worktrees/pm-recipe-local-review/food-science

Branch: review/pm8-caffeine-neuroeshot-2026-11-16; source commit: d67c181ff6ebec80873e4da581af759e8e98199c. Working tree and complete hashes: [analysis.json](analysis.json), snapshot.input_hash 19e9ae2a6d20e9620c4bb204fd05e86853dc7c5bcbb386998b31966c44c7c585. Existing uncommitted BRS1–6 corrections retained; no new composition corrections in this task.

## Rules

Existing builder/scorer used in memory before display caps; stored unrounded RSP ≥20 inclusive, no food cap. RSP = 100 × comparable concentration / highest eligible comparable concentration. Existing minimum-two-food, material, identity, publication and target restrictions preserved. Sum distinct non-overlapping input RSP/100 once per food; protein/amino-acid group uses maximum once; sodium excluded analytically only. PM counts describe coverage and do not multiply points. Combined deduplicates ownership routes, never adds view totals. Full precision calculations; canonical food ID breaks ties. Food-ID aggregates across materials are labelled composite, not interchangeable servings. Source-strength and system-coverage conventions coincide within this one modulator.

All qualified source observations, presence records, exclusions, admission decisions and contextual non-admitted evidence remain in the JSON; contextual evidence supplies no points. The inherited unscored_sources key means sources without retained score rows, including below-threshold sources—not necessarily unavailable RSP. Precise exclusion reasons are listed below. No new equivalences, hypotheses, admissions or ranking policy. Portion-aware/abacus, safety and cross-system totals remain deferred.

## Coverage

| PMs | Structured relationships | Eligible relationships | Eligible inputs | Retained component rows |
| --- | --- | --- | --- | --- |
| 7 | 6 | 1 | 1 | 2 |

| Input | Qualified source contexts | Scored ≥10 before analytical filter | Retained ≥20 before PM holds |
| --- | --- | --- | --- |
| zinc | 149 | 19 | 2 |

## Admissions and exclusions

| Relationship | Input | Ownership | Eligible | Basis / restriction | Canonical pointer |
| --- | --- | --- | --- | --- | --- |
| BRS-X(Hormones-PM2)::PM2-DIT-1 | Estrogen glucuronides | E | false | dietary input is not Yes | docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm2-estrobolome-regulation.mdx#dietary_input_traceability/PM2-DIT-1 |
| BRS-X(Hormones-PM3)::PM3-DIT-1 | 3α,5α-Tetrahydrodeoxycorticosterone (THDOC) | E | false | dietary input is not Yes | docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm3-progesterone-supportive-microbial-metabolism.mdx#dietary_input_traceability/PM3-DIT-1 |
| BRS-X(Hormones-PM3)::PM3-DIT-2 | Molecular hydrogen (H₂) | E | false | dietary input is not Yes | docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm3-progesterone-supportive-microbial-metabolism.mdx#dietary_input_traceability/PM3-DIT-2 |
| BRS-X(Hormones-PM5)::PM5-DIT-1 | zinc | A | false | dietary input is not Yes | docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm5-testosterone-signalling-stability.mdx#dietary_input_traceability/PM5-DIT-1 |
| BRS-X(Hormones-PM5)::PM5-DIT-RECOVERY-ZINC-RECEPTOR | zinc | A | true | explicit assessment | docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm5-testosterone-signalling-stability.mdx#dietary_input_traceability/PM5-DIT-RECOVERY-ZINC-RECEPTOR |
| BRS-X(Hormones-PM6)::PM6-DIT-1 | Androgen glucuronides | E | false | dietary input is not Yes | docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm6-androgen-microbiome-regulation.mdx#dietary_input_traceability/PM6-DIT-1 |

Only the admitted zinc relationship supplies points. Unset hormone/glucuronide/hydrogen relationships and associated evidence remain recorded without inferred ordinary-food or precursor admissions. This is not a comprehensive ranking of hormonal effects.

## PM-owned

| Rank | Food | Score | Distinct inputs | PMs | Component arithmetic | Material profile |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | oysters | 1.000000 | 1 | 1 | zinc: 100% /100 | Mollusks, oyster, eastern, wild, raw |
| 2 | wheat-germ | 0.312723 | 1 | 1 | zinc: 31.272264631043257% /100 | Wheat germ, crude |

## upstream-shared

No positive-score foods. This view remains separate.

## combined

| Rank | Food | Score | Distinct inputs | PMs | Component arithmetic | Material profile |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | oysters | 1.000000 | 1 | 1 | zinc: 100% /100 | Mollusks, oyster, eastern, wild, raw |
| 2 | wheat-germ | 0.312723 | 1 | 1 | zinc: 31.272264631043257% /100 | Wheat germ, crude |

## Exact component observations and winners

| Food | Substance | PM / ownership | RSP | Winner in combined input group | Amount / basis | Material / preparation | Publication | Pointer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| oysters | zinc | BRS-X(Hormones-PM5) / A | 100 | yes | 39.3 mg; per 100 g edible portion | Mollusks, oyster, eastern, wild, raw / raw | pin-matched | docs/foods/oysters.md#nutrition_per_100g/zinc_mg |
| wheat-germ | zinc | BRS-X(Hormones-PM5) / A | 31.272264631043257 | yes | 12.29 mg; per 100 g edible portion | Wheat germ, crude / unspecified | pin-matched | docs/foods/wheat-germ.md#nutrition_per_100g/zinc_mg |

## Retained exclusions and unranked evidence

| Substance | Food / record | Reason |
| --- | --- | --- |
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

| Publication-excluded source | Reason |
| --- | --- |


## Missing data / unresolved relationships

| Kind | Affected record | Reason |
| --- | --- | --- |
| no-structured-admissions | BRS-X(Hormones-PM1) | No structured accepted dietary inputs; narrative mentions are not admissions. |
| dietary-input-unset | BRS-X(Hormones-PM2)::PM2-DIT-1 | Dietary supply decision unset |
| substance-identity | BRS-X(Hormones-PM2) | unresolved-identity |
| dietary-input-unset | BRS-X(Hormones-PM3)::PM3-DIT-1 | Dietary supply decision unset |
| substance-identity | BRS-X(Hormones-PM3) | unresolved-identity |
| dietary-input-unset | BRS-X(Hormones-PM3)::PM3-DIT-2 | Dietary supply decision unset |
| substance-identity | BRS-X(Hormones-PM3) | unresolved-identity |
| no-structured-admissions | BRS-X(Hormones-PM4) | No structured accepted dietary inputs; narrative mentions are not admissions. |
| dietary-input-unset | BRS-X(Hormones-PM5)::PM5-DIT-1 | Dietary supply decision unset |
| dietary-input-unset | BRS-X(Hormones-PM6)::PM6-DIT-1 | Dietary supply decision unset |
| substance-identity | BRS-X(Hormones-PM6) | unresolved-identity |
| no-structured-admissions | BRS-X(Hormones-PM7) | No structured accepted dietary inputs; narrative mentions are not admissions. |

## Validation and interpretation

See [shared validation](../brsx-analytical-rollup-2026-11-17/validation.json): independent direct reconstruction of every food score/rank; exact source/scorer trace; inclusive threshold/ownership/overlap tests; all 768 BRS1–6 results reproduced and 515 preserved files byte-identical. No site generation, build, push or canonical edits. Missing values remain unknown. Unresolved identities are not rejected biology.

There is no prior BRS-X ranking produced under this equation to compare. All rankings are shown without a final presentation cutoff; no cutoff adopted.

Distribution data: [distribution.json](distribution.json), including percentage of leader, adjacent drops and cumulative PM/input coverage. Cumulative score share describes connectivity, not biological benefit. Any presentation cutoff remains a proposal; none adopted.
