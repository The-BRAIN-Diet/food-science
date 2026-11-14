# Resistant-starch Power Score investigation

10 November 2026. Investigation only; canonical quantities, selection code, admissions, food edges and publication unchanged.

## Existing records

Bananas: 2.7–25.3 g/100 g fresh weight combines Cavendish and plantain across ripening. Source note distinguishes Cavendish 18.1→2.7 and plantain 25.3→5.3. Neither the combined range nor plantain's endpoint is a generic green-Cavendish concentration. Gao DOI 10.1016/j.postharvbio.2016.03.022. Accessible abstract confirms cultivar/ripening differences but does not independently verify the stored numerical endpoints, assay or denominator; full methods/results remain required. No source value changed.

Potatoes: existing 2.2–5.4 g/100 g moisture-corrected range includes hot, chilled and reheated preparations. Original Raatz 2016 Table 1 was retrieved: https://7157e75ac0509b6a8f5c-5b19c577d01b9ccfe75d2f9e4b17ab55.ssl.cf1.rackcdn.com/GVISUTJI-PDF-4-683753-4519573448.pdf . Chilled means (SD), Red Norland/Russet Burbank/Yukon Gold respectively: boiled 3.1(.2), 3.8(.2), 3.9(.3); baked 4.8(.7), 4.7(.5), 5.4(.5). Chilled means six days at 4°C. Methods use modified Megazyme assay and state moisture correction, without an explicit correction equation. These are total RS assays, not isolated RS3 concentrations. Table-specific mean spans are not confidence intervals. No canonical value replaced.

## Why scoring is absent

The shared relativeSourcePower function explicitly refuses low!=high measurement spans. There are also distinct fresh-weight, moisture-corrected and dry-weight denominators. Thus the absent score is partly an explicit software policy, but assigning every record the same pool without analytical verification would not fix the scientific issue. Existing black-bean/chickpea dry-weight ranges cannot be inserted into this edible-weight pool without verified conversions.

## Conditional calculation, NOT validated/published Power Scores

If full-text verification establishes compatible total-RS assays and edible-weight denominators, and confirms green Cavendish 18.1 as the maximum among eligible canonical comparison foods:

| Material | Candidate concentration | Conditional RSP |
|---|---|---|
| Green Cavendish | 18.1 g/100 g | 100% |
| Boiled/chilled potato | 3.1–3.9 g/100 g | 17.1–21.5% |
| Baked/chilled potato | 4.7–5.4 g/100 g | 26.0–29.8% |

Arithmetic is concentration/18.1*100. These ranges describe cultivar means, not statistical uncertainty. They are not ready for the live selector: denominator compatibility, banana primary extraction, reference-pool completeness and source-specific structured records remain unresolved. Plantain 25.3 must not silently replace Cavendish or enter as a separate canonical food without identity adjudication. Within-potato normalisation would be a preparation comparison, not the wheel's minimum-two-distinct-food ranking.

## Smallest defensible next corrections

1. Retrieve Gao full methods/results and verify endpoints, edible tissue, assay and freshness basis.
2. Establish the Raatz moisture correction's reporting basis before pooling it with fresh banana.
3. Propose separate canonical preparation/cultivar observations, preserving original span records and provenance, instead of assigning a midpoint.
4. If point means are confirmed, the current formula can score them without new mathematics; preserve SD separately. If displaying cross-preparation score ranges, approve interval presentation and deterministic food/preparation selection explicitly. Never use uncertainty bounds as an invented maximum.
5. Retain measured-unranked connections meanwhile. Do not equate a missing score or a sub-50% score with no nutritional value.

No push, build or deployment. No final production Power Scores established from incompatible/unverified bases.
