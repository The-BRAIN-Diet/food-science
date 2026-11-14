# First author-review groups — existing dietary connectivity

Local audit only. Current top-ten PR and build untouched. No new retrieval or source-value verification is claimed here: this report reconciles the saved source evidence and canonical records. No source-publication hold is released.

## Finding 1: the 32 are scoped relationships, not 32 missing dietary classifications

Inspection of every original atom and overlay finds **27 KC-relevance and five biochemical-requirement records**. The five inventory records are LAT1 tyrosine/tryptophan, acetylcholine PM6 vitamin B5, and transsulfuration PM5 methionine/serine. The contract explicitly says that these layers do not confer Direct/Derived status. Their optional absent classification is not sufficient evidence of a scientific defect.

**Technical correction implemented in the local diagnostic:** preserve the original layer, role, permitted wording and evidence instead of treating a null classification as an unexplained scientific gap. Do not relabel these records Direct/Derived or alter the 151-target ranking universe. Any future public summary should distinguish these scopes; no presentation change is made here.

## Group A — source-publication decisions with greatest reach

**Glycine — five existing PM targets.** Eight saved USDA observations exist outside the publication-approved snapshot. Proposed correction after exact-record approval: incorporate the source-specific supplementary observations below into their canonical food records, retain source row/derivation and preparation, then regenerate from canonical records. Do not add glycine to the nine-essential-amino-acid profile. Raw mature soybeans require explicit material/edibility review before ordinary edible-food ranking; do not silently treat their values as cooked soybeans.

**Betaine — seven existing PM targets.** Five saved USDA Choline Release 2 observations exist outside the approved snapshot. Proposed correction after exact-record approval: reconcile those specific supplementary records and citations, preserving raw beet, frozen unprepared spinach and toasted wheat germ as different materials from generic page panels. Amaranth and quinoa preparation is not specified in the source table; resolve that metadata without inventing a preparation. Do not overwrite the existing corrected Zeisel raw-beet estimate (129 mg) with the separate USDA 130 mg observation or treat the two as independent foods. No shrimp estimate is rehabilitated.

|Food|Substance|Saved proposed value|Basis|Source material|Original source|
|---|---|---|---|---|---|
|almonds|glycine|1.429 g|per 100 g edible portion|Nuts, almonds|https://fdc.nal.usda.gov/food-details/170567/nutrients|
|amaranth|betaine|68 mg|per 100 g food|Amaranth; NDB 20001; preparation not specified in source table|https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf|
|beef|glycine|1.262 g|per 100 g edible portion|Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program)|https://fdc.nal.usda.gov/food-details/171796/nutrients|
|beetroot|betaine|130 mg|per 100 g food|Beets, raw; NDB 11080|https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf|
|chicken|glycine|1.223 g|per 100 g edible portion|Chicken, broilers or fryers, meat and skin, raw|https://fdc.nal.usda.gov/food-details/171447/nutrients|
|eggs|glycine|0.432 g|per 100 g edible portion|Egg, whole, raw, fresh|https://fdc.nal.usda.gov/food-details/171287/nutrients|
|pumpkin-seeds|glycine|1.843 g|per 100 g edible portion|Seeds, pumpkin and squash seed kernels, dried|https://fdc.nal.usda.gov/food-details/170556/nutrients|
|quinoa|betaine|630 mg|per 100 g food|Quinoa; NDB 20035; preparation not specified in source table|https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf|
|salmon|glycine|0.96 g|per 100 g edible portion|Fish, salmon, Atlantic, farmed, raw|https://fdc.nal.usda.gov/food-details/175167/nutrients|
|soy|glycine|1.88 g|per 100 g edible portion|Soybeans, mature seeds, raw|https://fdc.nal.usda.gov/food-details/174270/nutrients|
|spinach|betaine|120 mg|per 100 g food|Spinach, frozen, chopped or leaf, unprepared; NDB 11463|https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf|
|sunflower-seeds|glycine|1.461 g|per 100 g edible portion|Seeds, sunflower seed kernels, dried|https://fdc.nal.usda.gov/food-details/170562/nutrients|
|wheat-germ|betaine|410 mg|per 100 g food|Wheat germ, toasted, plain; NDB 08084|https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf|

These are pending source observations, not newly admitted or ranked values. Source metadata and prior local-implementation status remain in unpublished-composition.json.

## Group B — complete declared-route metadata, not new dietary admissions

All 18 incomplete conversion records already declare Derived relationships, identify target atoms and cite evidence. All lack the newer PM-specific dietary_input_assessments entry, active_target_id and structured conversion_pathway. Three additionally lack a resolved source identity: two Dietary protein → methionine rows and one generic fermentable fibre → butyrate row.

Start with **B6 → PLP** in BRS1 PM3/PM4/PM5 and BRS2 PM5. The original records cite Kennedy 2016 and Spector 1978 (BRS1); Di Salvo 2012, Belew 2009, Zhu 2008 and Lamers 2011 (BRS2 PM5). Proposed bounded correction: reconcile each existing declared route into the existing assessment schema with its own source evidence, cofactor target and limitations. Use PM9 only as a structural precedent; do not copy its evidence status or SEC. Retain the Lamers null total-transsulfuration result. No extra-intake or brain-neurotransmitter benefit is proposed.

Next: phosphatidylcholine → choline (two PMs; Bockmann 2023), choline → betaine (Obeid 2013, Salvi 2013, Evans 2002), folate/B12 → active cofactors (Froese 2019), riboflavin → FMN (Curtabbi 2022), tryptophan → nicotinamide (Covarrubias 2021). Each requires exact structured source reconciliation, not transfer of a generic pathway to every PM.

Keep separately qualified: methionine → cysteine (Lyons 2000; Courtney-Martin 2008), combined GlyNAC protocol (Sekhar 2011), retinoids → retinoic acid (Cantorna 2019; Li 2017), and ellagitannins → ellagic acid (Singh 2022). Preserve the absent downstream admissions, protocol context and interindividual conversion limitations. Canonical ellagitannins now resolves despite its old missing-substance annotation; the mapper already resolves it, so no new identity or automatic conversion approval is needed.

## Group C — retain scientifically meaningful exclusions

- **5-MTHF:** existing quantitative records explicitly prohibit ranking; include calculated monoglutamate-equivalent sums and independent samples. A missing comparison-pool message obscured this explicit hold. The diagnostic now exposes the hold first; no folate-total substitution or flag change.
- **Inulin:** the available asparagus observation is 1.30 g/100 g dry matter, not fresh edible weight. No water conversion is supplied.
- **Ellagic acid / ellagitannins:** commercial juice values per 100 mL, distinct chemical definitions; do not turn them into fresh-aril or per-100-g measurements. Walnut presence does not provide a second quantified comparator.
- **Epicatechin:** current values are unverified representative estimates/ranges. Do not turn them into verified analytical rankings.
- **PC, cysteine, glutamate, glutamine, FMN, NR, uridine and sulforaphane:** occurrence is retained, but current mapped records do not supply verified comparable quantitative pools. Total choline, cystine, total protein, niacin or glucoraphanin are not interchangeable substitutes.
- **Defined C8 protocol, arabinan, FOS/GOS, oligofructose, supplemental NAC and luminal glucose:** retain existing target/protocol restrictions. Missing ordinary-food ranking is not a missing admission.
- **Butyrate/retinoic acid:** existing precursor rows do not authorise direct product admission. Generic fibre must not be silently identified as resistant starch, pectin or a tested mixture.
- **L-carnitine, nicotinamide, nicotinic acid and serine:** no usable canonical quantitative food join in this snapshot. Investigate source/form records; do not substitute total niacin or create an admission from biochemical inventory.

## Validation and boundaries

11/11 focused audit tests pass. All 32 original scope records and 18 conversion records are preserved with original evidence in SOURCE-RECONCILIATION.json. All 42 remaining network identities are individually diagnosed there (the original 43 minus recovered phenylalanine). No canonical scientific, food, registry, wheel, SEC, admission or approval record changed. No production build, Netlify polling, PR update, commit or push performed during this reconciliation.
