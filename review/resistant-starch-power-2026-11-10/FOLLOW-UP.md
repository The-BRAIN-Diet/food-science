# Resistant-starch reconciliation follow-up — 10 November 2026

Read-only scientific/software investigation; no canonical or Food Wheel changes.

## Gao retrieval and verification status

Original DOI: https://doi.org/10.1016/j.postharvbio.2016.03.022
Publisher PII: S0925521416300588. Publisher abstract/full-page requests returned 403. Scite read_fulltext could not run because the account's monthly allowance is exhausted. Targeted repository file inventory found no saved Gao full-text artifact in the reviewed locations. Targeted title/DOI searches found abstract/index records and citations, not accessible original methods/results. The author's 2019 conference abstract is not the 2016 methods paper and is not substituted.

Verified bibliographic identity and abstract-level distinction: Cavendish versus Plantain, different ripening behaviour. NOT independently verified in this pass: 18.1→2.7 and 25.3→5.3 numerical endpoints, their exact sampling days, fresh edible pulp denominator, assay protocol, uncertainty, cultivar accession and genotype. These remain existing canonical claims pending original verification, not validated new measurements. The public BRAIN page repeats its own canonical record and cannot independently verify it.

## Raatz method and observations

Original full paper previously retrieved: https://doi.org/10.1016/j.foodchem.2016.03.120 ; accessible author-paper copy linked in REPORT.md. Section 2.3 specifies modified Megazyme K-RSTAR, miniaturisation, sodium azide, 0.50 g riced potato and 16 h hydrolysis at 37°C. It states correction for moisture, but does not supply moisture fractions, a correction equation or an explicit reference-moisture denominator. Do not silently translate “moisture-corrected” into fresh/edible weight or dry weight.

Preserve six Table 1 observations, mean ± SD, g/100 g as reported:

| Cultivar | Boiled/chilled | Baked/chilled |
|---|---:|---:|
| Red Norland | 3.1 ± 0.2 | 4.8 ± 0.7 |
| Russet Burbank | 3.8 ± 0.2 | 4.7 ± 0.5 |
| Yukon Gold | 3.9 ± 0.3 | 5.4 ± 0.5 |

Chilled means six days at 4°C. Cultivar spans summarize separate means, not confidence intervals; no midpoint selected. These are total-RS assays, not isolated RS3 amounts.

## Comparability conclusion

Cross-food compatibility is unestablished, not disproven. Need the authors' potato correction definition and, if conversion is required, sample-specific moisture/dry-matter fractions and the reference basis. For genuine dry-weight concentration C_DW, edible-weight concentration is C_DW times the measured dry-matter fraction; this equation must not be applied until the reported basis is known. Generic USDA potato moisture cannot replace moisture for the tested cooked/chilled samples. Also verify Gao analyte, assay and food tissue. Neither citation alone establishes assay equivalence.

## Conditional threshold calculations (not eligible published scores)

Assuming compatible denominators/methods AND a verified 18.1 g/100 g Cavendish maximum in the eligible selected comparison pool:

| Observation | Conditional RSP | ≥10% | ≥25% | ≥50% |
|---|---:|---|---|---|
| Green Cavendish 18.1 | 100% | yes | yes | yes |
| Red Norland boiled/chilled 3.1 | 17.13% | yes | no | no |
| Russet boiled/chilled 3.8 | 20.99% | yes | no | no |
| Yukon boiled/chilled 3.9 | 21.55% | yes | no | no |
| Red Norland baked/chilled 4.8 | 26.52% | yes | yes | no |
| Russet baked/chilled 4.7 | 25.97% | yes | yes | no |
| Yukon baked/chilled 5.4 | 29.83% | yes | yes | no |

If a distinct eligible plantain identity and its reported 25.3 maximum were instead verified and selected, Cavendish would be 71.54%; boiled/chilled potatoes 12.25–15.42%; baked/chilled potatoes 18.58–21.34%. Potatoes would still pass 10% but neither preparation would pass 25% or 50%. This illustrates reference-pool sensitivity; plantain is not silently registered or substituted. Actual selection/coverage remains unchanged. The 25% and 50% levels are exploratory filters, not changes to the approved 10% rule.

## Scorer inspection and minimal proposal

Current selectRankedFoodSources:
- Requires verified eligible observation and comparison group; normalises g/mg/µg.
- Groups comparable edible preparations, but retains substance/form and basis boundaries.
- Conflicting quantities under the same food/preparation key reject that key, even when they could be distinct cultivar observations.
- relativeSourcePower rejects any low/high span and uses the maximum across surviving preparation rows.
- Final canonical food deduplication happens AFTER scoring; a non-displayed preparation can influence the maximum. There is no explicit observation-selection argument.

Smallest proposed change (NOT implemented): optional explicit approved observation IDs passed into the shared selector, applied BEFORE grouping, conflict detection and reference-maximum calculation. Resolve them against canonical observation IDs; require exact food, material/cultivar, preparation, analyte, unit, basis and source provenance. Reject missing, duplicate/conflicting or held selections. Do not create an independent composition dataset. Selected means remain point measurements; SD remains metadata, not a ranking range. Do not auto-pick a best cultivar or average studies.

For a food-form scenario, select one documented observation per canonical food, then apply the unchanged minimum-two-distinct-foods rule, 10% threshold and top-ten cap. Keep alternative boiled/chilled and baked/chilled observations available as separate explicit scenarios. They do not count as two foods. If a display summarises several scenarios, label the resulting RSP span as scenario variation, not uncertainty, and retain each reference maximum. A common-reference score span requires an explicitly approved fixed pool; do not silently widen the current scorer to all ranges.

Regression requirements before implementation: selected observation only sets maximum; unselected high observation cannot shift scores; absent/conflicting selection fails; g/mg equivalent conversion; no fresh/dry conversion without data; ordinary compatible preparations can compete; two potato preparations cannot meet two-food minimum; no midpoint/SD-bound substitution; threshold boundary tests at 10/25/50; food dedup and top-ten unchanged; PM/wheel use same selected observations.

## Next evidence required

Gao original methods/results (or authorised full-text copy) and Raatz moisture-correction clarification/sample data. No final cross-food Power Score can be certified before these are resolved. Existing measurements and food connections remain visible as qualified unranked evidence. No admissions, SEC, source values, scorer, Food Wheel, commits, pushes or publication changed.
