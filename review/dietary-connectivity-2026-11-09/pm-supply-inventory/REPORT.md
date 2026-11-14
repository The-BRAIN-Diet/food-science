# PM dietary-supply inventory

Read-only extraction on audit/dietary-connectivity-2026-11-09, HEAD af13bec172b5938098a46f85c06523b8a20e90dc, including current local approved work. No scientific records changed.

## Scope and rules

All 67 canonical PM documents were scanned. Explicitly admitted Direct/Derived input relationships are retained. Accepted KC links require existing established applicability adjudication or explicit supported-upstream-supply status. A KC constituent enters the supply union only with explicit established disposition and a linked dietary_input=true PM atom that is not unresolved/rejected. Supported resource supply is not renamed a limiting iKC. No entire KC pool is expanded merely because its constituents participate biochemically.

Unclassified dietary flags, non-established KC links and unresolved identities remain visible in the full per-PM inventory and issue files; they are not silently converted into new admissions. Source evidence, scope, limits, upstream links and original KC/iKC fields are retained in JSON.

## Results

- 67 PMs; 127 explicitly admitted input records, of which nine lack a single canonical substance ID.
- 145 unique PM–substance supply pairs; 53 distinct canonical substances.
- 22/24 explicit KC relationships pass existing applicability/supply checks; 32 explicitly established constituent links.
- 27 supply pairs are added through established KC/resource routes beyond the 118 identity-resolved explicitly admitted input pairs.
- 5 pairs have multiple legitimate routes; all provenance retained, each pair counted once.
- 927 ranked food–substance–PM triples and 200 documented-unranked triples within this strictly classified union; layers remain separate.
- These are not replacement counts for the previous 151-target presentation inventory. Six existing displayed targets have weaker/unclassified scope metadata and remain in a separate reconciliation list below. Their public display was not modified.

## Six presentation targets outside the strictly qualified union

- BRS1-FM1-PM2|tryptophan
- BRS1-FM1-PM2|tyrosine
- BRS1-FM2-PM6|vitamin-b5
- BRS1-FM2-PM6|vitamin-b9
- BRS2-FM2-PM5|serine
- BRS5-FM2-PM5|fructo-galacto-oligosaccharides

These account for 33 ranked triples relative to the existing 960 presentation total. Do not withdraw them or assign classifications merely to force agreement.

## Mapping issues

- 34 dietary_input=true rows lack explicit admitted classification in the generated relationship. Many are legitimate KC rows recovered through the explicit KC route; this is not 34 missing admissions. The raw issue list preserves that diagnostic distinction.
- One established-parent constituent lacks its own disposition: BRS1-FM2-PM6 / BRS2(KC1), BRS1-FM2-PM6-KCI-1. Retain as unresolved constituent metadata, not inferred established iKC.
- Nine records lack a single resolved canonical substance; see list below. Broad classes, mixtures and strains may require their own appropriate identities or existing constituent mapping, not forced nutrient aliases.
- BRS2-FM1-PM4: Dietary protein
- BRS5-FM1-PM1: Fermentable dietary fibre
- BRS5-FM1-PM2: Type 2 resistant starch (tested aged-mouse exposure)
- BRS5-FM1-PM2: Fish-oil-containing meal (tested comparison)
- BRS5-FM1-PM2: Milk-fat physical structure (tested comparison)
- BRS5-FM1-PM3: Oligofructose-enriched inulin
- BRS5-FM1-PM3: Bifidobacterium longum NCC2705
- BRS5-FM3-PM7: Lactobacillus rhamnosus JB-1
- BRS5-FM3-PM8: Apple pectin (studied preparation)

## Duplicate validation

Exact repeated provenance relationship IDs within a pair: 0. Multiple independent routes are not duplicate scientific records. See multiple-provenance.json.

## Every PM

| PM | Canonical dietary-supply substances | Ranked triples | Documented triples |
|---|---|---:|---:|
| BRS-X(Circadian-FM1-PM1) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Circadian-FM1-PM2) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Circadian-FM1-PM3) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(ECS-PM1) | zinc | 10 | 3 |
| BRS-X(ECS-PM2) | dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid | 17 | 7 |
| BRS-X(ECS-PM3) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(ECS-PM4) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(ECS-PM5) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Hormones-PM1) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Hormones-PM2) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Hormones-PM3) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Hormones-PM4) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Hormones-PM5) | zinc | 10 | 3 |
| BRS-X(Hormones-PM6) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS-X(Hormones-PM7) | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS1-FM1-PM1 | indispensable-amino-acids, tryptophan, tyrosine | 23 | 0 |
| BRS1-FM1-PM2 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS1-FM1-PM3 | betaine, choline, iron, magnesium, phenylalanine, tyrosine, vitamin-b2, vitamin-b6, vitamin-b9 | 73 | 13 |
| BRS1-FM1-PM4 | betaine, choline, copper, iron, magnesium, phenylalanine, tyrosine, vitamin-b2, vitamin-b6, vitamin-b9, vitamin-c | 93 | 14 |
| BRS1-FM1-PM5 | iron, tryptophan, vitamin-b2, vitamin-b6 | 37 | 4 |
| BRS1-FM2-PM6 | choline, phosphatidylcholine, sodium | 17 | 12 |
| BRS1-FM3-PM7 | betaine, choline, dha-docosahexaenoic-acid, sodium, vitamin-b9 | 40 | 11 |
| BRS1-FM4-PM10 | potassium, sodium | 19 | 1 |
| BRS1-FM4-PM11 | magnesium | 10 | 2 |
| BRS1-FM4-PM9 | vitamin-b6 | 10 | 0 |
| BRS1-FM5-PM12 | choline, dha-docosahexaenoic-acid, uridine | 16 | 11 |
| BRS2-FM1-PM1 | 5-methyltetrahydrofolate, vitamin-b12, vitamin-b2, vitamin-b9 | 30 | 1 |
| BRS2-FM1-PM2 | betaine, choline, zinc | 23 | 9 |
| BRS2-FM1-PM3 | betaine, choline, magnesium, methionine, potassium, vitamin-b9 | 53 | 10 |
| BRS2-FM1-PM4 | betaine, choline, glycine, methionine, vitamin-b12, vitamin-b2, vitamin-b6, vitamin-b9 | 70 | 8 |
| BRS2-FM2-PM5 | methionine, pyridoxal-5-phosphate, vitamin-b6 | 20 | 1 |
| BRS2-FM2-PM6 | cysteine, glutamate, glycine, magnesium, methionine, n-acetylcysteine | 27 | 6 |
| BRS2-FM3-PM7 | betaine, choline, methionine, phosphatidylcholine, uridine, vitamin-b9 | 33 | 14 |
| BRS3-FM1-PM1 | cysteine, glycine | 7 | 1 |
| BRS3-FM1-PM2 | cysteine, glycine, oligofructose | 7 | 1 |
| BRS3-FM2-PM3 | sulforaphane | 0 | 0 |
| BRS3-FM2-PM4 | copper, iron, manganese, selenium, zinc | 47 | 11 |
| BRS3-FM2-PM5 | selenium, vitamin-e | 17 | 4 |
| BRS3-FM2-PM6 | selenium, vitamin-b2, vitamin-c, vitamin-e | 37 | 4 |
| BRS3-FM3-PM7 | dha-docosahexaenoic-acid | 8 | 4 |
| BRS3-FM3-PM8 | dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid | 17 | 7 |
| BRS4-FM1-PM1 | copper, flavin-mononucleotide, iron, vitamin-b2 | 27 | 6 |
| BRS4-FM1-PM10 | iron, methionine, tyrosine, vitamin-b2 | 30 | 4 |
| BRS4-FM1-PM2 | nicotinamide, nicotinamide-riboside, nicotinic-acid, tryptophan | 10 | 1 |
| BRS4-FM1-PM3 | arginine, creatine, glycine, methionine | 18 | 5 |
| BRS4-FM2-PM4 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS4-FM2-PM5 | manganese, vitamin-e | 17 | 3 |
| BRS4-FM3-PM6 | l-carnitine | 0 | 0 |
| BRS4-FM3-PM7 | caprylic-triglyceride | 0 | 0 |
| BRS4-FM3-PM8 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS4-FM4-PM9 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS5-FM1-PM1 | fructo-galacto-oligosaccharides, glutamine, pectin, resistant-starch, vitamin-a, zinc | 16 | 7 |
| BRS5-FM1-PM2 | oligofructose | 0 | 0 |
| BRS5-FM1-PM3 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS5-FM2-PM4 | arabinan, inulin, pectin, resistant-starch | 0 | 1 |
| BRS5-FM2-PM5 | inulin, pectin, resistant-starch | 0 | 0 |
| BRS5-FM2-PM6 | ellagic-acid, ellagitannins, epicatechin | 0 | 5 |
| BRS5-FM3-PM7 | glucose, linoleic-acid | 10 | 0 |
| BRS5-FM3-PM8 | tryptophan | 10 | 0 |
| BRS6-FM1-PM1 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS6-FM1-PM2 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS6-FM1-PM3 | magnesium, resistant-starch | 10 | 2 |
| BRS6-FM2-PM4 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS6-FM3-PM6 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS6-FM3-PM7 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |
| BRS6-FM4-PM8 | dha-docosahexaenoic-acid | 8 | 4 |
| BRS6-FM4-PM9 | No resolved explicitly qualifying supply; see full PM record | 0 | 0 |

## Files and validation

pm-inventory.json contains every PM including excluded/unclassified relationships; pm-substance-pairs.json is the deduplicated union with complete provenance and separate food layers. kc-relationships.json retains all 24 relationships and adjudications. mapping-issues.json and existing-extractor-issues.json retain diagnostics. extract.mjs reproduces this read-only extraction from the checkout root.

Assertions passed: 67 PMs; unique PM–substance keys; maximum ten ranked foods and ≥10% RSP for selected rows. No canonical food quantities or scientific classifications were written; no builds, deployment, PR changes or commits.
