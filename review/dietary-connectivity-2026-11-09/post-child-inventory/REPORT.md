# PM connectivity after exact child identity resolution

Read-only recalculation on audit/dietary-connectivity-2026-11-09. Scientific records, rankings, SEC and publication decisions unchanged. Earlier snapshots preserved.

## Counts and denominators

| Category | PM–identity connections | Distinct canonical identities |
|---|---:|---:|
| Existing substances |150|55|
| Studied preparations |2|2|
| Defined mixtures |1|1|
| Exact microbial strains |2|2|
| Total |155|60|

All 150 earlier pairs remain. These five existing admitted atoms were already part of the 67-PM records; resolving their identities adds no admission. The species documentation parents are not additional PM targets. Six multiple-provenance pairs remain counted once. All original relationships, citations and limitations remain in pm-inventory.json and pm-substance-pairs.json.

## Food coverage remains separate

| Layer | Food–identity–PM triples | Covered pairs | Distinct identities |
|---|---:|---:|---:|
| Ranked |960|112|28|
| Documented unranked |200|72|26|
| Either, deduplicated |1160|128|40|

Of the updated 155 pairs, 128 have at least one source in either food layer; 27 do not. This is a food-layer count, not a claim that all 27 lack a Derived or protocol route. Of 60 identities, 40 have food-layer coverage. Fresh in-memory documented-source extraction exactly matches all 200 previously recorded triples. No parent observations, food quantities or efficacy inherited by a child.

The existing 151-target presentation snapshot stays unchanged. It is a different universe: it includes the unresolved historical FOS/GOS target and excludes the five newly resolved but publication-held child identities. Do not relabel the public snapshot as 155 targets.

## Exact child results

- **BRS5-FM1-PM2 → resistant-starch-type-2-zhang-2020**: resolved, original admission retained. Parent `resistant-starch`; verified documentation [/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/resistant-starch#rs2-zhang-2020](/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/resistant-starch#rs2-zhang-2020). `projection_status=blocked`, `network_activation=held`; no ranked or unranked food connections.
- **BRS5-FM1-PM3 → oligofructose-enriched-inulin-schroeder-2018**: resolved, original admission retained. Parent `inulin`; verified documentation [/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/fructans/inulin#oligofructose-enriched-inulin-schroeder-2018](/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/fructans/inulin#oligofructose-enriched-inulin-schroeder-2018). `projection_status=blocked`, `network_activation=held`; no ranked or unranked food connections.
- **BRS5-FM1-PM3 → bifidobacterium-longum-ncc2705**: resolved, original admission retained. Parent `bifidobacterium-longum`; verified documentation [/docs/substances/bifidobacterium-longum#ncc2705](/docs/substances/bifidobacterium-longum#ncc2705). `projection_status=blocked`, `network_activation=held`; no ranked or unranked food connections.
- **BRS5-FM3-PM7 → lacticaseibacillus-rhamnosus-jb-1**: resolved, original admission retained. Parent `lacticaseibacillus-rhamnosus`; verified documentation [/docs/substances/lacticaseibacillus-rhamnosus#jb-1](/docs/substances/lacticaseibacillus-rhamnosus#jb-1). `projection_status=blocked`, `network_activation=held`; no ranked or unranked food connections.
- **BRS5-FM3-PM8 → apple-pectin-sinha-2024**: resolved, original admission retained. Parent `pectin`; verified documentation [/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/pectin#apple-pectin-sinha-2024](/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/pectin#apple-pectin-sinha-2024). `projection_status=blocked`, `network_activation=held`; no ranked or unranked food connections.

All five have an explicit heading and stable anchor in their local parent documentation page. This is local source/anchor verification, not proof of deployment or navigation from the public wheel. No child identity remains blocked for a scientific identity reason. Publication is still deferred: registration and exact matching do not settle source-specific formulation completeness, ordinary-food equivalence, human translation, or separate public-network eligibility.

## Remaining actionable mappings

- BRS2-FM1-PM4 / BRS2-FM1-PM4::PM4-DIT-2: **Dietary protein** — Source-class representation remains unresolved; the methionine supply relationship is retained. Do not replace protein with methionine or infer conversion efficiency. Identity/schema decision, not a missing admission.
- BRS5-FM1-PM1 / BRS5-FM1-PM1::PM1-DIT-2: **Fermentable dietary fibre** — Heterogeneous functional class: exact substrate specificity and the proposed butyrate route still require scientific/scope adjudication. Do not substitute a convenient fibre.
- BRS5-FM1-PM2 / BRS5-FM1-PM2::PM2-DIT-3: **Fish-oil-containing meal (tested comparison)** — Existing mixed dietary matrix, not a single substance. Preserve protocol/ingredient traceability without attributing outcomes to DHA/EPA. Representation gap.
- BRS5-FM1-PM2 / BRS5-FM1-PM2::PM2-DIT-4: **Milk-fat physical structure (tested comparison)** — Existing preparation characteristic; not generic milk fat or an emulsifier identity. Representation gap.

Other diagnostics are retained, not newly adjudicated: 29 dietary flags without a separate explicit admission label include established KC/resource routes and unclassified rows, not 29 new missing admissions. FOS/GOS remains explicitly unresolved. Two BRS4 KC historical-context relationships remain intentionally excluded. Existing source-composition gaps and pending Derived conversion assessments are unaffected.

## Validation and artifacts

verify.mjs checks unique keys, retention of all 150 pairs, five exact registered IDs, original admitted status, active publication/projection holds, verified parent anchors, absence of inherited child food sources, and fresh-versus-saved documented coverage. comparison.json records the results; mapping-issues.json retains the four unresolved source representations. No scientific implementation or generated production output is written by this recalculation.

Reproduce with extract.mjs, followed by verify.mjs, from repository root. No builds, deployment or PR changes.
