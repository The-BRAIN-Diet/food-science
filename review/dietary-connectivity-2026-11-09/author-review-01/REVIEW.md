# Author review 01 — USDA CODEX — Author decisions for review 01:
APPROVE: Six ready observations. Almonds, pumpkin seeds, sunflower seeds, eggs and salmon (glycine); raw beetroot (betaine).
APPROVE: Six qualified observations. Beef and chicken glycine; amaranth, quinoa, frozen spinach and toasted wheat germ betaine. Preserve exact derivation and preparation qualifications.
DO NOT APPROVE: Soybean glycine. Retain hold: adjusted from another form/similar food, not an independent assay.
APPROVE: Four B6 → PLP assessments. Approve structured reconciliation of existing PM-specific routes, retaining the original evidence and null findings.
Implement approved items only, preserve exact source qualifications and holds, run focused validation, and report revised coverage. No builds or deployment.source observations and B6 → PLP

9 November 2026. Proposal only; no canonical writes or hold releases. Existing audit branch, no PR modification/build/deployment. Independent checks used a fresh official USDA SR Legacy CSV archive and the original Choline Release Two PDF, rather than trusting the saved proposal.

## Source verification decisions

All thirteen numerical values match the original USDA records. This does not make all thirteen independently assayed, preparation-equivalent or automatically rankable.

Glycine is grams per **100 g edible portion**. Betaine is milligrams of **betaine per 100 g food**, not choline-moiety mass. Dried seed preparations are not dry-matter denominators. No water, density, cooked-weight or serving conversion was made.

**Ready** means defensible for author approval with the standard listed source limitations. **Qualification** requires explicit approval of the stated derivation/material attribution. **Hold** is not recommended for release in this batch.

|Food|Substance|Verified value|Exact material / preparation|Original identity|Decision|Source qualification|
|---|---|---:|---|---|---|---|
|almonds|glycine|1.429 g/100 g|Nuts, almonds|FDC 170567|ready-for-author-approval|A (analytical); sample count unreported|
|amaranth|betaine|68 mg/100 g|uncooked (NDB crosswalk; not stated in the 2008 table)|NDB 20001|requires-qualification|LC-ESI-IDMS; N=1; uncooked resolved by matching NDB, not PDF wording|
|beef|glycine|1.262 g/100 g|Beef, ground, 85% lean meat / 15% fat, raw (Includes foods for USDA's Food Distribution Program)|FDC 171796|requires-qualification|AR: analytical data derived by linear regression; count unreported|
|beetroot|betaine|130 mg/100 g|raw|NDB 11080|ready-for-author-approval|LC-ESI-IDMS; N=1; separate from corrected Zeisel 129 mg|
|chicken|glycine|1.223 g/100 g|Chicken, broilers or fryers, meat and skin, raw|FDC 171447|requires-qualification|No derivation code; data_points=0 (not a measured zero)|
|eggs|glycine|0.432 g/100 g|Egg, whole, raw, fresh|FDC 171287|ready-for-author-approval|A (analytical); sample count unreported|
|pumpkin-seeds|glycine|1.843 g/100 g|Seeds, pumpkin and squash seed kernels, dried|FDC 170556|ready-for-author-approval|A (analytical); sample count unreported|
|quinoa|betaine|630 mg/100 g|uncooked (NDB crosswalk; not stated in the 2008 table)|NDB 20035|requires-qualification|LC-ESI-IDMS; N=1; uncooked resolved by matching NDB, not PDF wording|
|salmon|glycine|0.96 g/100 g|Fish, salmon, Atlantic, farmed, raw|FDC 175167|ready-for-author-approval|A (analytical); sample count unreported|
|soy|glycine|1.88 g/100 g|Soybeans, mature seeds, raw|FDC 174270|retain-hold|BFSN: another form/similar food; solids adjustment; no retention factors|
|spinach|betaine|120 mg/100 g|frozen, unprepared|NDB 11463|requires-qualification|LC-ESI-IDMS; N=3; frozen material differs from raw base panel|
|sunflower-seeds|glycine|1.461 g/100 g|Seeds, sunflower seed kernels, dried|FDC 170562|ready-for-author-approval|26 data points; derivation code absent|
|wheat-germ|betaine|410 mg/100 g|toasted|NDB 08084|requires-qualification|LC-ESI-IDMS; N=2; toasted material differs from crude base panel|

### Release recommendations and preservation

- **Six ready:** almonds, pumpkin seeds, sunflower seeds, eggs and salmon glycine; raw-beet betaine. Preserve exact raw/farmed/meat/seed material descriptors. USDA `data_points=0` means no count reported here; it is not proof of no analysis. Do not describe the sunflower row as freshly assayed merely because it reports 26 data points.
- **Six require qualification:** beef and chicken glycine; amaranth, quinoa, frozen-spinach and toasted-wheat-germ betaine. Beef's regression-derived value must remain labelled; chicken's derivation uncertainty remains visible. Amaranth and quinoa match NDB 20001/20035 to uncooked SR Legacy identities, but the 2008 table names do not specify preparation. Spinach and wheat germ require separate material-labelled supplementary observations; they cannot replace raw spinach or crude wheat-germ panels.
- **Retain soy hold:** 1.880 g/100 g is confirmed as a database value, but its BFSN derivation is an adjusted value from another form/similar food, not an independent assay of this source material. Retain it for source review, not a verified measured ranking leader. This does not introduce a blanket exclusion of raw foods or change ranking rules.
- The USDA PDF confidence grades apply to **total choline only**, not betaine. No betaine confidence score is inferred from the adjacent column. N is retained as the printed row sample count.
- Raw-beet USDA 130 mg and the pre-existing rounded corrected-Zeisel 129 mg are separate observations. If approved, nominate USDA Release Two for ranking explicitly; retain the older estimate and provenance, do not average, overwrite or count it as another food. Other independent beef creatine/CoQ10 and quinoa-DHA holds remain unchanged.

## Conditional ranked gains — no activation

The same shared selector was run in memory with the proposed observations. Baseline is the approved amino-acid correction snapshot (65 foods, 890 edges, 100/151 targets, 26 ranked inputs), not a claim about what is deployed.

|Approval scenario|Ranked glycine foods|Ranked betaine foods|Added edges|Added PM targets|Result|
|---|---:|---:|---:|---:|---|
|Only six ready observations|5|0 (single-source comparator rule)|25|5|65 foods, 915 edges, 105/151 targets, 27 ranked inputs|
|Ready plus six qualified observations; soy held|7|5|70|12|70 foods, 960 edges, 112/151 targets, 28 ranked inputs|

In the second scenario the newly displayed identities are beef, beetroot, quinoa, spinach and wheat germ. Source-specific preparations must remain visible. These results assume author-approved attribution and explicit USDA selection for beetroot. No data is written into the canonical snapshot, selector or wheel.

### Glycine ranking if qualifications approved

|Food|Concentration per 100 g|Relative Source Power|
|---|---:|---:|
|pumpkin-seeds|1.843 g|100.00%|
|sunflower-seeds|1.461 g|79.27%|
|almonds|1.429 g|77.54%|
|beef|1.262 g|68.48%|
|chicken|1.223 g|66.36%|
|salmon|0.96 g|52.09%|
|eggs|0.432 g|23.44%|
### Betaine ranking if qualifications approved

|Food|Concentration per 100 g|Relative Source Power|
|---|---:|---:|
|quinoa|630 mg|100.00%|
|wheat-germ|410 mg|65.08%|
|beetroot|130 mg|20.63%|
|spinach|120 mg|19.05%|
|amaranth|68 mg|10.79%|

Every qualifying glycine food adds one connection to each of the five already flagged target records; every betaine food adds one to each of seven. The diagnostic preserves the existing KC/biochemical versus Direct/Derived scopes; coverage is not a new admission or efficacy claim. Target IDs are enumerated in conditional-ranking-impact.json.

## Four proposed B6 → PLP records

The accompanying `b6-plp-proposed-assessments.json` contains the full current-schema proposals, original atoms/overlays and source access status. They are **not installed** in canonical PMs. Their `status: admitted` preserves the historical admission in the proposed record; the enclosing proposal remains awaiting author approval.

|PM / atom|Receiving operation and boundary|Original evidence retained|
|---|---|---|
|BRS1-FM1-PM3 / PM3-DIT-3|PLP provision to aromatic amino-acid decarboxylase; no increased brain dopamine claim|Kennedy 2016; Spector 1978|
|BRS1-FM1-PM4 / PM4-DIT-3|PLP provision to upstream decarboxylation; not the DBH copper cofactor or attention efficacy|Kennedy 2016; Spector 1978|
|BRS1-FM1-PM5 / PM5-DIT-4|PLP provision to decarboxylation; no increased serotonin, mood or ADHD claim|Kennedy 2016; Spector 1978|
|BRS2-FM2-PM5 / PM5-DIT-2|PLP provision for CBS/CGL capacity; no increased transsulfuration flux claim|Di Salvo 2012; Belew 2009; Zhu 2008; Lamers 2011, original Finding/IC links retained|

All four preserve exact PM missions and original limitations. The ordered biochemical routes are reused with provenance from the existing PM9 schema and independently checked human PDXK/PNPO papers: PL → PLP by PDXK; PN → PNP → PLP and PM → PMP → PLP by PDXK then FMN-dependent PNPO. PM9's GAD dependency and SEC/confidence are not transferred.

The shared dietary-supply support retains the existing human PN-glucoside tracer study (abstract verified; full methods not newly verified). Plant glycoside hydrolysis and incomplete utilisation remain explicit; total B6 is not a fixed PLP yield. Rabbit transport findings remain animal evidence, not measured human brain delivery. No new cofactor dietary admissions are created from the enzyme dependencies.

**Null result preserved:** in Lamers 2011, B6 restriction lowered plasma PLP and increased cystathionine fractional synthesis, but remethylation, transmethylation and total transsulfuration rates were not significantly altered. This does not negate cofactor biology or establish an extra-intake benefit.

If accepted, these four proposals reconcile four existing PM-specific conversion records; they do not add ranked food targets, change admissions, or rescore SEC. The 151-target ranking denominator stays unchanged.

## Verification sources and reproducibility

- [Official SR Legacy CSV download](https://fdc.nal.usda.gov/fdc-datasets/FoodData_Central_sr_legacy_food_csv_2018-04.zip): fresh archive SHA256 `b80817294b8850530aaedf2e515c02593b1824f763a0ff356e5c2081643e6fd0`. Joins: food.fdc_id → sr_legacy_food.NDB_number; food_nutrient nutrient_id=1225 → nutrient.unit_name=G; derivation_id → food_nutrient_derivation. Exact eight source rows saved in usda-glycine-source-rows.json.
- [USDA Choline Release Two](https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf): fresh PDF SHA256 `01edefe9d3a109175cd8a9d61d3bc92d209e159c1a9de96c472011c1192e24ac`. Printed pp17,21,23,31 contain the five rows; methods/units/quality rules pp4–6. Values were independently read from the original table. FDC crosswalk IDs are identity checks, not alternative quantitative sources.
- [Human PDXK primary full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC2204131/), [human PNPO primary full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC2323923/), [human oral tracer abstract](https://pubmed.ncbi.nlm.nih.gov/1995788/), [Lamers primary full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC3077887/).

Five focused tests pass: 13 values/holds, derivation/material distinctions, four schema-valid original-preserving proposals, conditional ranking/minimum-two rule, and unchanged canonical/scientific/public files. Schema validation is not author approval or a new scientific score. No build, deployment, PR change, commit or push.
