# CoQ10 food provision and chord eligibility — 5 November 2026

Local working branch review/brs5-pm4-sec-assessment, HEAD 521036b1. No publication. PM admissions, SEC and prior concurrent changes preserved.

## Decision

Propose ONE CoQ10 node with a contextual BRS4 connection, justified by documented direct food occurrence and PM10's pool-availability research target. This is not an admitted dietary intervention or an established tissue-delivery pathway. Do not count it toward admitted BRS reach. Do not create separate ubiquinone and ubiquinol nodes or automatically inherit precursor admissions. Diagram remains unchanged pending review.

The prototype mistakenly used verified manuscript rows from admission-based mappings to test food occurrence. Those rows omit CoQ10 because its PM records are contextual. Eight canonical foods already had explicit supported contains relationships. Thus exclusion was a filtering limitation, not absence of foods or a negative scientific decision. Future correction should read direct food-occurrence records independently and label the PM relationship separately; no manual CoQ-only exception.

## Food records and quantities

|Food|Evidence and amount|State/boundary|Local action|
|---|---|---|---|
|Regular olive oil|Žmitek 2014: refined group 54 ± 10 mg/L, n=2|Commercial refined samples; not this page's branded USDA product or heated oil|Added supported occurrence with reference; no generic numerical panel value|
|Extra-virgin olive oil|Same study: commercial blends 56 ± 4 mg/L, n=7; monocultivar oils 52 ± 17 mg/L, n=79|Monocultivar samples fresh/fresh-frozen; refrigerated, nitrogen-protected storage. Cultivar dependence; no universal concentration|Existing occurrence retained; original reference and source-specific detail repaired|
|Early-harvest olive oil|Existing qualitative link; 2014 primary abstract and methods support investigation of maturity in Istrska belica and Leccino|No universal early-harvest concentration or guarantee across cultivars|Retained; no new numeric value|
|Beef|Primary Mattila 2000 abstract supports beef-steak occurrence. Existing 2.5 mg/100 g is explicitly an estimate with quantity citation pending|Does not verify the page's ground-beef preparation; do not reinterpret estimate as measurement|Retained original estimate/status|
|Heart|Mattila 2000 primary abstract: beef heart|Presence-only in current page; no generic organ-meat quantity|Existing link retained|
|Liver|Existing review-derived beef/pork-liver occurrence|Original quantitative table not retrieved in this task; species/preparation cannot be pooled|Existing presence-only link retained|
|Mackerel; sardines|Existing review Table 1 occurrence records|Muscle types and processing differ; current shared wording is imprecise. No validated number for canned sardines or each mackerel preparation|Existing links retained; primary-table follow-up remains|
|Pistachios|Aydoğan 2023 Table 2: six named samples, 10.21–42.16 µg/g (arithmetic equivalent 1.021–4.216 mg/100 g)|Sample-specific nano-LC measurements; not a generic roasted/salted kernel panel|Existing occurrence retained; no generic numeric substitution|

Original food-composition sources:
- https://doi.org/10.1021/jf5002167 — Scite retrieved methods/results, characters 0–15999 of 20993; not complete article/table verification. CoQ10 and CoQ9 separated by HPLC with electrochemical detection, calibration standards and replicate analyses. Original reported mg/L retained; no density-based conversion to mg/100 g. This is CoQ10 itself, not olive phenolics or a summed CoQ9+10 value. Method uses redox conditioning; no native ubiquinol fraction inferred. Scite quota exhausted after these two reads; no account changes made.
- https://pubmed.ncbi.nlm.nih.gov/10775376/ / https://doi.org/10.1021/jf990581f — primary abstract identifies beef steak, beef heart and Baltic herring fillet. Herring is not mackerel or sardine; no species substitution.
- https://doi.org/10.1006/jfca.2000.0983 — Mattila and Kumpulainen food-content study; publisher full text unavailable in this task. Do not present its tables as verified.
- https://www.mdpi.com/1420-3049/28/3/1423 / https://pmc.ncbi.nlm.nih.gov/articles/PMC9920066/ — primary pistachio study, Table 2. Six measurements are Barak Yıldızı 30.5 ± 0.4, Tekin 42.16 ± 0.6, Halebi 17.21 ± 0.6, Uzun 10.21 ± 0.4, Siirt 28.21 ± 0.5, Kırmızı 30.2 ± 0.8 µg/g. No processing equivalence or tissue benefit inferred.

## Identity and BRS4 boundaries

Registry coq10 resolves CoQ10, Coenzyme Q10 and ubiquinone-10 aliases to one page. Its InChIKey specifies oxidised ubiquinone-10. The page correctly distinguishes reduced ubiquinol-10, CoQ9 homologue and COQ9 protein. Ubiquinol is described in prose but not registered as a separate form in the inspected substance registry: preserve this as a form-resolution limitation rather than add it as an exact chemical synonym of the oxidised InChIKey. Total CoQ10 and individual redox forms must not be summed as independent contents.

- PM1 electron transfer: established endogenous carrier role; food content alone does not demonstrate ETC target engagement.
- PM5 redox buffering: endogenous redox participation, not proof of food-derived antioxidant efficacy.
- PM10 production/pool availability: four admitted upstream capacity inputs (tyrosine, methionine, riboflavin, iron) remain distinct from direct CoQ10 provision. Supplement studies are tissue-target-engagement research, not an admitted food intervention. No new admission is made.
- PM10 SOP/Lifestyle arrays are empty. Saved twelve-week combined endurance/resistance exercise candidate remains deferred: wet-muscle CoQ change, no inactive control, no demonstrated synthesis flux or mitochondrial-normalised mediation. Parent-trial null ATP-capacity/peak-oxygen-uptake observations remain recorded.

## Changes and remaining issues

Only olive-oil.md and extra-virgin-olive-oil.md scientific food records changed, within existing substance/reference structures. Existing animal-food and pistachio links required no new admission. Nine food pages now carry CoQ10 occurrence links. No new UI component, PM/SOP admission, SEC or substance identity. Approval ledger records the author's explicit requested food-link additions; baseline unchanged.

Food-specific numeric recovery for animal tissues and preparation comparisons remains incomplete. Existing pistachio prose overstates mitochondrial support and generic olive-oil prose overstates brain benefits; these pre-existing editorial claims were not used as evidence and need a separately scoped review. Do not equate these claims with composition.

Validation: both changed food-page validators pass; citation-integrity regression 5/5 pass; presentation contract passes using the existing structural-hash approval mechanism, no baseline regeneration. Source-specific occurrence references resolve to the existing bibliography key. No production build or deployment run.
