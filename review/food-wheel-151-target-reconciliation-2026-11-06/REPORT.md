# Food Wheel comparability correction and 151-target reconciliation

6 November 2026. Implemented and browser-verified locally; **not committed or published**. Branch `review/brs5-pm4-sec-assessment`, HEAD `521036b1d6c212e58c660f0f985e47617a71a716`. Concurrent pre-existing work preserved.

## Result

|Measure|Before|After|
|---|---:|---:|
|Unique selected foods|57|64|
|Food–substance–PM connections|579|586|
|Unique covered PM–substance targets|119|119|
|Uncovered targets|32|32|
|Total admitted targets reconciled|151|151|

The 32 uncovered targets represent **22 distinct substances**, not 32 missing foods. `TARGET-LEDGER.md` accounts for every target. `target-ledger.json` includes canonical BRS/FM/PM and substance IDs, source-record pointers, admitted relationships, measured amounts, Power Scores, pools, exact exclusions and gap categories. `shared-substance-gaps.json` identifies repeated gaps across PMs. Categories may overlap; they are diagnostic, not new scientific classifications.

## Correction and preserved boundaries

Ordinary edible preparation labels no longer fragment an otherwise compatible chemical-substance/measurement pool. Salted, raw, cooked, canned and other edible preparations retain their source metadata but can compete. Dry-weight, volume/mass differences, incompatible chemical forms and specialised analytical groups remain separate. This corrects preparation partitioning; it does not assert all laboratory methods are equivalent.

The existing Relative Source Power function is reused: concentration / highest verified comparable concentration × 100. Provisional ≥10%, at least two distinct comparable foods, maximum five, no padding. No nutritional value is researched, replaced or inferred. Unit normalization for comparison leaves original source values and units intact. Sodium/serving suitability does not exclude a food's measured source ranking.

Ranked edge metadata now joins the actual canonical admitted dietary record; it no longer inherits an unrelated SOP's limitations or a cached contextual status for the same PM/substance. Canonical records themselves are untouched. The biological substance/BRS network is unchanged.

## Roe verified

Salmon roe appears in the food selector and wheel with 17 selected PM–substance connections spanning six substances. MEXT 10140 salted chum-salmon roe (Oncorhynchus keta) ranks first for DHA **2,000 mg/100 g** and EPA **1,600 mg/100 g**, each at **100% Relative Source Power**. Source provenance, preparation and limitations render in the expanded detail. No claim of clinical efficacy is inferred.

Trout roe remains a documented presence-only source in the diagnostic data; no verified concentration, no ranked food node, no substitution of salmon values.

## Foods affected

Newly displayed: black-beans, brussels-sprouts, garlic, heart, kidney-beans, lentils, oregano, salmon-roe, sesame-seeds, strawberries, sweet-potatoes, tahini.

No longer selected: clams, coconut-oil, edamame, sauerkraut, spelt. Their records remain canonical. Precise target-level reasons are in `changes.json` and `target-ledger.json`:

- Clams and spelt: still qualify for relevant pools but fall outside the maximum five.
- Coconut oil: below 10% in the corrected compatible pool.
- Edamame and sauerkraut: below threshold for some targets and outside the top five for others.

All prior exclusions are retained in the baseline audit and reconsidered by the same selector, not by roe exceptions. The earlier read-only audit found 110 previously single-source food–target records now qualifying before the cap, across pumpkin seeds, edamame, salmon roe, tahini, sardines, crab and ghee. Twenty-nine enter capped selections. Other ranks change as preparation-specific denominators disappear. Overall 226 selected edges enter and 219 leave.

## BRS-level selected-food coverage

|System|Before foods|After foods|After connections|After unique targets|
|---|---:|---:|---:|---:|
|BRS-X/ecs|10|11|15|3|
|BRS-X/hormones|5|5|5|1|
|BRS1|39|45|220|44|
|BRS2|38|40|155|31|
|BRS3|33|35|80|16|
|BRS4|29|31|67|14|
|BRS5|22|21|34|8|
|BRS6|9|10|10|2|

Circadian has no selected food edges; its existing biological ring is preserved. Systems overlap, so their food counts must not be added to obtain the unique total.

## Remaining shared gaps

|Substance|Uncovered PM targets|Category|Exact issue|
|---|---:|---|---|
|phosphatidylcholine|2|compositional, mapping-related|Food occurrence is documented but no verified PC-mass quantity is exposed by the canonical mapper. Choline or PC-derived choline mass must not be substituted for PC mass.|
|uridine|2|compositional|Milk occurrence is qualitative; no verified comparable uridine amounts in the canonical source rows.|
|pyridoxal-5-phosphate|1|compositional|Native PLP occurrence in milk is qualitative. Total B6 is not a PLP concentration.|
|cysteine|3|compositional|Documented food protein occurrence is qualitative; total cystine/hydrolysed sulphur-amino-acid values are not silently relabelled cysteine.|
|glutamate|1|compositional|Existing source relationship is qualitative; no verified exact-analyte quantitative source row. Glx or combined hydrolysis values are not substituted.|
|n-acetylcysteine|1|scientific, selection-related|Canonical food-delivery assessment specifies supplemental NAC and no verified ordinary-food source. Protein cysteine/cystine is not NAC; preserve admission without inventing food equivalence.|
|oligofructose|2|scientific, selection-related|Canonical assessment identifies a defined inulin-hydrolysate exposure; native food fructans do not establish the same mixture. No matching ordinary-food quantities.|
|sulforaphane|1|compositional, mapping-related|Broccoli/sprout relationships are qualitative. Precursor glucoraphanin, potential sulforaphane yield and observed sulforaphane concentration are not interchangeable.|
|flavin-mononucleotide|1|compositional|Milk native-FMN occurrence is qualitative; total riboflavin is not measured FMN.|
|nicotinamide|1|mapping-related, compositional|Existing PM warnings identify chicken and chickpea analytical materials with food-ontology links pending; canonical food-source mapper has no matching quantitative rows. Total niacin does not resolve the vitamer.|
|nicotinic-acid|1|mapping-related, compositional|Existing PM warnings identify chicken and chickpea analytical materials with food-ontology links pending; no matching canonical quantitative rows. Total niacin is not nicotinic acid.|
|nicotinamide-riboside|1|compositional|Milk occurrence is documented without a verified food-matched quantity.|
|creatine|1|compositional, mapping-related|Several qualitative food records; beef 400 mg is explicitly approximate/unverified with material-equivalence limits, not a verified ranking value.|
|caprylic-triglyceride|1|compositional, scientific|MCT-oil relationship is qualitative and formulation-specific. Total MCT, free C8 or coconut oil cannot replace the defined triglyceride concentration.|
|glutamine|1|compositional|Protein-bound occurrence is qualitative. No verified specific glutamine concentrations; do not substitute glutamate/Glx.|
|fructo-galacto-oligosaccharides|2|scientific, mapping-related|The PM record concerns a studied FOS/GOS mixture, not a universal food analyte. No matching canonical food source. BRS5 PM5 additionally carries an existing scientific-admission review warning, preserved without adjudication.|
|resistant-starch|4|selection-related, compositional|Verified ranges are retained for bananas, beans, chickpeas and potatoes, but the contract does not rank ranges. Fresh-, dry- and moisture-corrected bases are distinct; no midpoint or denominator conversion.|
|arabinan|1|compositional|Pea occurrence is qualitative. No comparable quantitative arabinan concentration.|
|inulin|2|mapping-related, selection-related|One verified asparagus-spear amount: 1.30 g/100 g dry matter. No authorised comparable pool, no second quantitative source, and no fresh-weight conversion. PM4 also records pending chicory/Jerusalem-artichoke ontology links.|
|ellagic-acid|1|selection-related, compositional|One verified pomegranate-juice value, 3.79 mg/100 mL. Volume is not food mass; no second comparable quantitative source.|
|ellagitannins|1|selection-related, compositional|Pomegranate juice has 156.17 mg/100 mL gallagyl-type tannins, while walnuts are presence-only. No second compatible quantified pool; preserve tannin analytical definition and volume basis.|
|epicatechin|1|compositional, mapping-related|Canonical cacao/cocoa/chocolate values are representative or approximate/unverified and have material-context limitations; not verified ranking inputs.|

No admission is withdrawn or newly accepted by these gap labels. Questions requiring scientific review include exact PC versus choline quantities; specific niacin-vitamer food mappings; creatine/epicatechin held estimates and material contexts; source-specific resistant-starch ranges and moisture bases; formulation equivalence for NAC/oligofructose/FOS-GOS/caprylic triglyceride; and the existing BRS5 PM5 FOS/GOS admission warning. Ordinary-food ranking should not be forced onto supplemental/formulation-specific exposure. These remain review matters, not technical permission to fill values.

## Validation

- 21 focused tests pass: canonical copies, source hashes/identities, salmon/trout roe, compatible ordinary preparations, incompatible forms/bases, ranges, power boundaries, units, deduplication, cap, all 151 target statuses and unchanged biological network.
- All 174 canonical food-directory source hashes match the before snapshot (includes two nonfood index/shopping documents, neither ranked).
- Presentation check passes: 691 protected files, no unapproved structural changes.
- Browser verified expected totals, salmon-roe selection, DHA/EPA first-place records and MEXT source details. Screenshots: `full-wheel.png`, `salmon-roe.png`. Preview: http://127.0.0.1:3162/food-wheel.html
- Broader mapper suite: 37/41 pass, with the same four failures before and after this task, listed below. No suppression or fixture weakening:
- meal pattern remains a pattern with candidate ingredient source pointers, no nutrient substitute
- sixth field gates PM lists independently of accounting and preserves unresolved decisions
- rollout records every accepted atom decision and retains evidence and precursor distinctions
- food strategy rollup preserves independently admitted SOP science and separate intervention scopes

No production build or deployment performed. Relevant tests passed; this does not declare the wider repository fully validated.

## Implementation and reproduction

Changed technical files: `scripts/lib/food-wheel-power.mjs`, `scripts/export-food-wheel-canonical.mjs`, `scripts/food-wheel-canonical.test.mjs`; added `scripts/reconcile-food-wheel-targets.mjs`. Generated local JSON, HTML, SVG, source tables and audit reports refreshed. The mapping contract and workstream handoff record the authorised correction. No canonical food composition, PM mission/admission, SEC, Finding or biological relationship edited.

Rebuild: `node scripts/export-food-wheel-canonical.mjs`; `node scripts/reconcile-food-wheel-targets.mjs`; `node review/visualisations/brain-food-wheel-pm-qualified-2026-11-06/build.mjs`.

Test: `node --test scripts/food-wheel-canonical.test.mjs scripts/related-substance-associations.test.mjs`; `npm run presentation:check`. Baseline and complete diagnostics retained in this directory.
