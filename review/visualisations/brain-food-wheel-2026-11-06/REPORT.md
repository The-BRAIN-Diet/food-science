# Integrated BRAIN Food Chord Wheel — 6 November 2026

Local author-review artifact. No canonical food/substance edits, scientific admissions, PM changes, scores, commits or deployment.

## Integrated result

[Open local wheel](http://127.0.0.1:3160/food-wheel.html). The outer food ring connects by actual ribbons to the existing substance nodes, which retain all 121 original system connections. The original 3159 prototype is preserved. Canonical BRS colours and thin BRS-X/outer system arcs retained. No direct food–BRS ribbon, and no fourth strategy ring.

- 90 canonical foods selected from the per-substance shortlists.
- 1768 possible food–substance pairs: 1750 existing direct/derived relationships and 18 proposed-only pairs.
- 68 substance nodes and 121 original substance–system pairs preserved.
- 21 proposed records: 15 USDA amino-acid values, two skim-milk B3 values, cocoa epicatechin, pistachio CoQ10, oat phytate presence, and an explicitly approximate carnitine serving value. Some proposals improve existing pairs instead of adding new pairs.

## Before / after reconciliation

|Measure — full eligible food inventory, before shortlist|Existing records|Including proposals|
|---|---:|---:|
|Substances with direct food mapping|49|54|
|Substances with verified numerical observations / researched numerical proposals|32|39|
|Direct food–substance pairs|2346|2364|

Canonical backfills: **zero**, pending author approval. Numerical coverage includes non-comparable sample-specific concentrations; it does not mean that all 39 substances can be ranked globally. The carnitine estimate does not increase verified numerical coverage. The proposal checkbox changes displayed links; existing target-count labels remain fixed and proposed additions are shown separately.

## Ranking and counting

Existing mapper verification, comparison groups, preparation and unit restrictions are retained. Only comparable point values are ordered; ranges and qualified/non-comparable measurements remain unranked. Convertible g/mg/µg amounts share a mass basis only within the existing compatible group. No mg/L-to-mass conversion, arbitrary serving sizes, range midpoint invention or nutrient-efficacy scores.

Up to ten food identities are shortlisted for each substance. Where multiple groups exist, leading records are interleaved across groups; no global rank is implied. Presence-only/derived records fill remaining positions transparently and alphabetically, not as alleged “best” sources. [Source tables](TOP-FOODS.md) record every substance, including unresolved ones.

Selected foods expose **all** their eligible existing target connections, allowing useful multi-target exploration even when not top ten for each target. Counts deduplicate canonical food–substance pairs and aliases. Derived and direct targets are distinct in details. Collective SCFA and amino-acid-pool identities coexist with specific constituents; counts therefore describe ontology connectivity, not independent biochemical mechanisms or nutritional breadth.

## Research and limitations

[Full gap ledger](GAP-LEDGER.md), [multi-target table](MULTI-TARGET-FOODS.md), research.json and official USDA API snapshots in research-sources/. Source access is explicit; unavailable primary tables were not treated as verified. The mapped raw beef, eggs, chicken, salmon and soy entries match USDA IDs exactly. Raw composition is not converted into cooked-serving delivery.

The primary milk study distinguishes nicotinamide/NR from undetected NAD+/nicotinic acid. USDA phosphatidylcholine-associated choline is not relabelled as phosphatidylcholine molecular mass. Hydrolysis-derived glutamate is not substituted for glutamine. The pistachio range is six samples, not a universal value. Original food estimates remain estimates.

Serving delivery is mostly unavailable in existing structured records; the UI states this explicitly. The NIH cooked-steak carnitine serving is a separately labelled estimate. More serving metadata, and full primary analytical retrieval for several specialised compounds, remain open. The source tables are best-supported candidates in the current verified inventory, **not an exhaustive global ranking of all foods**.

Canonical proposals remain separate from accepted records. Generic healthy-food relevance never creates an edge. Complete PM-scoped conversion chains may create qualified derived food links, but downstream quantity is never inherited. Urolithin food-equivalence is not invented where a structured conversion mapping is absent. Existing CoQ source-specific observations are retained even when the mapper does not mark them rankable.

## Reproduction and files

Run data.mjs, build.mjs, report.mjs and validate.mjs in this directory from the repository root. source-materials.json is the read-only snapshot from the existing seven-scope mapper; source hashes are inherited from the validated substance network. New files are confined to this review directory plus its handoff. The separate localhost checkout remains a labelled supplemental source for acetic acid, as in the original network.

Automated validation passes 6,764 assertions. Browser checks are blocked: in-app attachment failed, Chrome reported an unattached debugger, and native computer-use permissions were unavailable. No screenshots or successful browser interaction checks are claimed; see browser-validation.json. The preview returns HTTP 200.

Ten unused supplemental source files have changed concurrently since the substance-network snapshot. They are listed in validation.json and were not incorporated. Primary sources and the supplemental sources actually used still match the frozen baseline; existing substance/system connections remain identical. No production build is needed for this standalone review HTML/SVG.

## Display refinement
All documented food connections now display by default. Show all food connections restores the overview after focused selection. Canonical system colours replace neutral ribbon fills; multiple system relationships use multicolour bands. Browser access recovered for this refinement: verified 1,750 default visible ribbons, 28 for Beef focus, and 1,768 when proposals are included. Screenshot: all-connections.png. Full earlier browser checklist remains incomplete.

### Food placement refinement
Author requested food placement near relevant systems. Replaced alphabetical circumference with the circular mean of distinct documented target positions, equal weight per target and no proposed-only influence. Sort by affinity and fit evenly spaced slots by circular rotation to avoid label collisions. This approximates target affinity, not efficacy or quantitative nutritional contribution; multi-system foods cannot occupy every relevant sector. All identities and relationships preserved; 6,768 validation assertions pass. Browser refresh verification for this placement change was unavailable (browser session error).
