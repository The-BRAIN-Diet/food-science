# Completed PM/KC dietary-supply reconciliation

Local implementation on audit/dietary-connectivity-2026-11-09, HEAD af13bec1. Author EXEC authorizes five existing supply reconciliations and the folate child metadata; no new admissions.

| Measure | Before | After |
|---|---:|---:|
| PMs |67|67|
| Unique PM–substance pairs |145|150|
| Canonical substances |53|55|
| Accepted KC/resource relationships |22|22|
| Explicitly established constituent links |32|33|
| Pairs with multiple provenance routes |5|6|
| Ranked food triples |927|960|
| Documented-unranked food triples |200|200|

33 pairs have explicit KC/resource provenance; 28 of these extend the identity-resolved explicitly admitted-input list. Supported resource supply remains distinct from conditional constraint. Multiple routes are counted once per PM–substance identity. B5 and serine account for the two additional distinct substances.

## Implementation

The only canonical edit adds disposition=established, relationship_type=conditional-constraint, substance_id=vitamin-b9 and ikc_id=BRS2-KC1-KIT-1 to BRS1-FM2-PM6-KCI-1. Exact comparison confirms every other byte of that PM record is preserved. Parent applicability, original evidence, deficiency/age/region qualifications and null findings remain untouched.

The separate corrected audit extractor consumes approved-reconciliations.json to retain the five author-confirmed existing supply roles, without altering their original Direct/Derived fields. These entries are explicit provenance-backed extraction decisions, not new admissions or general eligibility rules. Original 145-pair outputs remain in ../pm-supply-inventory/. Public selector and renderer were not changed.

## Remaining scope

The existing 151-target presentation snapshot is byte-identical. FOS/GOS is its only pair outside the corrected 150-pair supply union; its unresolved assessment and displayed historical record remain. Both BRS4(KC2) historical-context relationships remain excluded.

Nine identity structures are classified in identity-proposals.json and remain proposals only: source class; heterogeneous functional class; tested subtype; mixed matrix; preparation characteristic; defined mixture; two exact strains; studied apple-pectin preparation. No canonical records, generic substitutes, food equivalence or lifted projection holds were introduced. Exact identity registration/representation still requires author review.

The diagnostic file also retains 29 dietary flags without a separate explicit admission label. This is not 29 additional missing-supply decisions: explicit established KC/resource routes remain represented through their own authority. Inventory/non-admitted rows retain their original statuses.

## Multiple-route pairs

- BRS1-FM1-PM3 / tyrosine: admitted-input (BRS1-FM1-PM3::PM3-DIT-5), supported-resource-supply (BRS1-PM3-BRS1-KC1-KIT-2-SUPPLY)
- BRS1-FM2-PM6 / vitamin-b9: established-kc-constituent (BRS1-FM2-PM6-KCI-1), existing-kc-resource (BRS1-FM2-PM6::PM6-DIT-5)
- BRS2-FM1-PM1 / vitamin-b9: admitted-input (BRS2-FM1-PM1::PM1-DIT-2), supported-resource-supply (PM1-DIT-2-KC1-ADMISSION)
- BRS2-FM1-PM2 / betaine: admitted-input (BRS2-FM1-PM2::PM2-DIT-1), established-kc-constituent (PM2-DIT-1-KC1-ADMISSION)
- BRS2-FM1-PM2 / choline: admitted-input (BRS2-FM1-PM2::PM2-DIT-2), established-kc-constituent (PM2-DIT-2-KC1-ADMISSION)
- BRS2-FM1-PM4 / vitamin-b9: admitted-input (BRS2-FM1-PM4::PM4-DIT-3), supported-resource-supply (PM4-DIT-3-KC1-ADMISSION)

## Every PM

| PM | Resolved supply substances | Ranked triples | Documented triples |
|---|---|---:|---:|
| BRS-X(Circadian-FM1-PM1) | None resolved; full record retained | 0 | 0 |
| BRS-X(Circadian-FM1-PM2) | None resolved; full record retained | 0 | 0 |
| BRS-X(Circadian-FM1-PM3) | None resolved; full record retained | 0 | 0 |
| BRS-X(ECS-PM1) | zinc | 10 | 3 |
| BRS-X(ECS-PM2) | dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid | 17 | 7 |
| BRS-X(ECS-PM3) | None resolved; full record retained | 0 | 0 |
| BRS-X(ECS-PM4) | None resolved; full record retained | 0 | 0 |
| BRS-X(ECS-PM5) | None resolved; full record retained | 0 | 0 |
| BRS-X(Hormones-PM1) | None resolved; full record retained | 0 | 0 |
| BRS-X(Hormones-PM2) | None resolved; full record retained | 0 | 0 |
| BRS-X(Hormones-PM3) | None resolved; full record retained | 0 | 0 |
| BRS-X(Hormones-PM4) | None resolved; full record retained | 0 | 0 |
| BRS-X(Hormones-PM5) | zinc | 10 | 3 |
| BRS-X(Hormones-PM6) | None resolved; full record retained | 0 | 0 |
| BRS-X(Hormones-PM7) | None resolved; full record retained | 0 | 0 |
| BRS1-FM1-PM1 | indispensable-amino-acids, tyrosine, tryptophan | 23 | 0 |
| BRS1-FM1-PM2 | tyrosine, tryptophan | 13 | 0 |
| BRS1-FM1-PM3 | iron, vitamin-b6, tyrosine, vitamin-b2, magnesium, phenylalanine, vitamin-b9, betaine, choline | 73 | 13 |
| BRS1-FM1-PM4 | iron, vitamin-b6, copper, vitamin-c, vitamin-b2, magnesium, tyrosine, phenylalanine, vitamin-b9, betaine, choline | 93 | 14 |
| BRS1-FM1-PM5 | tryptophan, iron, vitamin-b6, vitamin-b2 | 37 | 4 |
| BRS1-FM2-PM6 | choline, phosphatidylcholine, sodium, vitamin-b9, vitamin-b5 | 37 | 12 |
| BRS1-FM3-PM7 | dha-docosahexaenoic-acid, sodium, choline, vitamin-b9, betaine | 40 | 11 |
| BRS1-FM4-PM10 | sodium, potassium | 19 | 1 |
| BRS1-FM4-PM11 | magnesium | 10 | 2 |
| BRS1-FM4-PM9 | vitamin-b6 | 10 | 0 |
| BRS1-FM5-PM12 | choline, uridine, dha-docosahexaenoic-acid | 16 | 11 |
| BRS2-FM1-PM1 | 5-methyltetrahydrofolate, vitamin-b9, vitamin-b12, vitamin-b2 | 30 | 1 |
| BRS2-FM1-PM2 | betaine, choline, zinc | 23 | 9 |
| BRS2-FM1-PM3 | methionine, magnesium, potassium, vitamin-b9, betaine, choline | 53 | 10 |
| BRS2-FM1-PM4 | methionine, vitamin-b9, vitamin-b12, vitamin-b6, vitamin-b2, glycine, betaine, choline | 70 | 8 |
| BRS2-FM2-PM5 | pyridoxal-5-phosphate, vitamin-b6, methionine, serine | 20 | 1 |
| BRS2-FM2-PM6 | cysteine, glutamate, glycine, magnesium, methionine, n-acetylcysteine | 27 | 6 |
| BRS2-FM3-PM7 | choline, phosphatidylcholine, uridine, methionine, vitamin-b9, betaine | 33 | 14 |
| BRS3-FM1-PM1 | cysteine, glycine | 7 | 1 |
| BRS3-FM1-PM2 | oligofructose, cysteine, glycine | 7 | 1 |
| BRS3-FM2-PM3 | sulforaphane | 0 | 0 |
| BRS3-FM2-PM4 | selenium, zinc, copper, manganese, iron | 47 | 11 |
| BRS3-FM2-PM5 | vitamin-e, selenium | 17 | 4 |
| BRS3-FM2-PM6 | vitamin-c, vitamin-e, vitamin-b2, selenium | 37 | 4 |
| BRS3-FM3-PM7 | dha-docosahexaenoic-acid | 8 | 4 |
| BRS3-FM3-PM8 | epa-eicosapentaenoic-acid, dha-docosahexaenoic-acid | 17 | 7 |
| BRS4-FM1-PM1 | iron, flavin-mononucleotide, vitamin-b2, copper | 27 | 6 |
| BRS4-FM1-PM10 | tyrosine, methionine, vitamin-b2, iron | 30 | 4 |
| BRS4-FM1-PM2 | nicotinamide, nicotinic-acid, tryptophan, nicotinamide-riboside | 10 | 1 |
| BRS4-FM1-PM3 | creatine, arginine, glycine, methionine | 18 | 5 |
| BRS4-FM2-PM4 | None resolved; full record retained | 0 | 0 |
| BRS4-FM2-PM5 | vitamin-e, manganese | 17 | 3 |
| BRS4-FM3-PM6 | l-carnitine | 0 | 0 |
| BRS4-FM3-PM7 | caprylic-triglyceride | 0 | 0 |
| BRS4-FM3-PM8 | None resolved; full record retained | 0 | 0 |
| BRS4-FM4-PM9 | None resolved; full record retained | 0 | 0 |
| BRS5-FM1-PM1 | vitamin-a, zinc, glutamine, fructo-galacto-oligosaccharides, pectin, resistant-starch | 16 | 7 |
| BRS5-FM1-PM2 | oligofructose | 0 | 0 |
| BRS5-FM1-PM3 | None resolved; full record retained | 0 | 0 |
| BRS5-FM2-PM4 | arabinan, pectin, resistant-starch, inulin | 0 | 1 |
| BRS5-FM2-PM5 | resistant-starch, pectin, inulin | 0 | 0 |
| BRS5-FM2-PM6 | ellagic-acid, ellagitannins, epicatechin | 0 | 5 |
| BRS5-FM3-PM7 | glucose, linoleic-acid | 10 | 0 |
| BRS5-FM3-PM8 | tryptophan | 10 | 0 |
| BRS6-FM1-PM1 | None resolved; full record retained | 0 | 0 |
| BRS6-FM1-PM2 | None resolved; full record retained | 0 | 0 |
| BRS6-FM1-PM3 | magnesium, resistant-starch | 10 | 2 |
| BRS6-FM2-PM4 | None resolved; full record retained | 0 | 0 |
| BRS6-FM3-PM6 | None resolved; full record retained | 0 | 0 |
| BRS6-FM3-PM7 | None resolved; full record retained | 0 | 0 |
| BRS6-FM4-PM8 | dha-docosahexaenoic-acid | 8 | 4 |
| BRS6-FM4-PM9 | None resolved; full record retained | 0 | 0 |

## Validation

- All original 145 pairs and every provenance record retained; exactly five approved additions.
- 150 unique keys; 67 PMs; ranked cap ten and ≥10% RSP unchanged.
- Nine focused documented-food-source tests passed.
- Canonical, registry, system and generated-data fingerprints unchanged except the exact four approved folate child fields. This includes SEC history, food quantities, publication holds and the 151-target ranked snapshot.
- Two historical KC exclusions and FOS/GOS unresolved status retained.
- No builds, deployments, PR changes, commits or pushes.

Reproduce extraction: node review/dietary-connectivity-2026-11-09/pm-supply-reconciled/extract.mjs; then python3 review/dietary-connectivity-2026-11-09/pm-supply-reconciled/validate.py. Both write review artifacts only. Source-changing installation script is not part of the reproducible audit.
