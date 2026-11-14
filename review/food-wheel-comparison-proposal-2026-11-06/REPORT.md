# Food Wheel comparison correction — proposal, 6 November 2026

Read-only diagnostic. No selection-module, renderer, wheel data, canonical source or contract edits. No commit/push/deployment. The simulation changes an in-memory copy of the ranking function only. Reproduce from the repository root with `node review/food-wheel-comparison-proposal-2026-11-06/audit.mjs`.

## Defect

Ordinary edible preparation labels were used as separate comparison pools. This created a different denominator for raw/canned/salted/oil/roasted foods and could award several unrelated 100% scores for the same substance. It also made salted salmon roe artificially single-source. Preparation is required metadata, not intrinsically a barrier to concentration comparison.

## Proposed correction

For already verified/rank-eligible observations, pool identical chemical substances and compatible mass denominators across ordinary edible preparations. Preserve original preparation, species/material, source, sodium, quantity and limitations. Keep dry-weight, incompatible chemical forms, specialised analytical groups and non-mass denominators separate. Preserve the existing formula, provisional 10% boundary, minimum two distinct comparable foods and five-food cap. Serving size and sodium do not independently reject composition rankings.

This diagnostic merges only existing `edible::…` preparation partitions, retaining exact denominator and chemical-form fields. It does not silently merge specialist analytical groups or interpret ambiguous dry-product denominators. The 32 uncovered targets remain uncovered; they require their existing source/form/measurement review, not automatic inclusion.

## Results from current canonical records

| Metric | Current wheel | Corrected comparison proposal |
|---|---:|---:|
| Selected foods |57|64|
| Food–substance–PM edges |579|586|
| Unique covered PM–substance targets |119|119|

226 selected edges enter and 219 leave as both comparison denominators and ranks change. This is not just adding seven foods. Exact gains/losses, original observations and excluded reasons are in `comparison.json`.

## Salmon roe

MEXT salted chum-salmon roe: DHA 2,000 mg/100 g edible portion; EPA 1,600 mg/100 g edible portion. The canonical material is `Oncorhynchus keta`, salted roe (ikura), source item 10140. It ranks first in both compatible pools. These concentrations are not serving recommendations or evidence of brain delivery.

| DHA food | mg/100 g | Relative Source Power |
|---|---:|---:|
|Salmon roe|2000|100%|
|Mackerel|1401|70.05%|
|Anchovies|1292|64.60%|
|Salmon|1104|55.20%|
|Tuna|890|44.50%|

| EPA food | mg/100 g | Relative Source Power |
|---|---:|---:|
|Salmon roe|1600|100%|
|Mackerel|898|56.125%|
|Salmon|862|53.875%|
|Anchovies|763|47.6875%|
|Herring|709|44.3125%|

Trout roe remains presence-only and unranked; no salmon values are substituted.

## Foods previously excluded through artificial single-source partitions

110 food–target records previously labelled single-source now meet the comparison/threshold test (including those outside the cap). They concern pumpkin seeds, edamame, salmon roe, tahini, sardines, crab and ghee. Of these, 29 food–target records enter the final capped selections:

|Food|Affected substances entering the capped selections|
|---|---|
|Salmon roe|DHA, EPA, B5, B12, vitamin E, sodium|
|Sardines|Methionine|
|Crab|Selenium|
|Ghee|Vitamin A|
|Tahini|Linoleic acid|

Pumpkin-seed and edamame records may now be comparable yet fall outside the capped ranking. Qualifying and selected are distinct statuses. Other foods also change rank as the denominator ceases to be preparation-specific.

New food nodes: oregano, garlic, lentils, black beans, kidney beans, heart, sesame seeds, Brussels sprouts, strawberries, salmon roe, sweet potatoes and tahini.

Food nodes leaving the capped wheel: edamame, sauerkraut, spelt, clams and coconut oil. Their canonical food relationships remain intact; departure does not mean absence or poor overall nutritional quality.

## Validation and limits

All 174 canonical source-file hashes match the saved source snapshot. Ranking uses the existing `relativeSourcePower` function on an in-memory grouping variant. No nutritional values, admissions, scientific limitations or evidence classifications are edited. All resulting source records remain traceable. No browser/wheel regeneration was performed.

Before implementation, update tests that currently assert preparation-only isolation; preserve tests for dry-weight, chemical forms, ranges, sources and minimum comparison set. The comparison change should be confined to the wheel adapter, not change admissions or recipe rules. Further equivalence across specially named analytical groups requires explicit evidence; this report does not declare those groups interchangeable.
