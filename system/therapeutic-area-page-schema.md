# Therapeutic Area Page Schema

**Version:** 1.0
**Status:** Active — internal V1
**Applies to:** TA001 ADHD, TA002 Anxiety Disorders, TA003 Depressive Disorders

## Purpose

Therapeutic Area (TA) pages are condition-level syntheses over the permanent BRAIN
architecture. They retrieve canonical evidence records and map them to BRS, FM, PM,
Phenome and intervention layers; they do not become a second home for study facts.

V1 is repository-first. It inventories and organises reviewed material already present
in the repository. A later targeted literature phase is required before publication.

## Canonical data model

`src/data/therapeutic-area-evidence.json` is the reviewed V1 source.

### Evidence record (`ER######`)

One record represents one study or review. Population, life stage, exposure, design,
outcomes, direction and limitations are written once.

Required fields:

- `id`, `citationKey`, `citationLabel`
- `population`, `lifeStage`, `exposure`
- `studyDesign`, `measuredOutcomes`, `resultDirection`
- `targetEngagement`, `functionalClinicalOutcome`
- `limitations`, `provenance`

The BibTeX entry remains the canonical bibliographic record. An evidence record must
not copy authors, title, journal or DOI beyond the display label.

### Evidence claim (`EC######`)

A claim is a condition-specific interpretation of an evidence record. It contains:

- `evidenceId`, `taId`, `brsId`
- `fmIds`, `pmIds`, `phenomeIds`
- `evidenceRelation`: `direct-condition`, `extrapolated-population`,
  `mechanistic-inference`, or `biomarker-association`
- `demonstration`: `plausibility`, `association`, `target-engagement`,
  `functional-improvement`, `symptom-improvement`, or `established-treatment`
- `currentClaim`, `claimCeiling`, `confidence`, `resultDirection`
- `sourceOccurrences` linking the exact repository page and section

The same `ER` may have several `EC` mappings. Study facts remain on the `ER`; only
the architecture-specific interpretation differs.

### Source occurrence (`SO######`)

The scan output stores verbatim current wording, path, section, citation keys and
review flags. Scan occurrences are provenance records, not accepted claims. An
occurrence can be duplicated, contradictory, unsupported, or awaiting review.

### Page profile

`src/data/therapeutic-area-pages.json` stores synthesis copy and references `EC` IDs.
The renderer presents five tabs with the same structure on every Therapeutic Area page:

| Tab | Content |
|-----|---------|
| **Overview** | Therapeutic Area introduction; compact BRS1–BRS6 summary; overall evidence status |
| **Biological Systems** | Evidence by BRS; connected FMs and PMs; cross-system cascades |
| **Functional Outcomes** | Relevant Phenomes and relationships derived from mapped BRS evidence (secondary to biology) |
| **Dietary & Lifestyle Evidence** | Reserved for a later dietary-evidence pass — **empty during initial BRS migration** |
| **Evidence Gaps** | Missing BRS representation; limitations and inconsistencies; unresolved mappings; research priorities |

BRS sections render on the Biological Systems tab only when the profile contains
accepted evidence or a material synthesis. Missing systems are listed on Evidence Gaps;
empty BRS sections are prohibited on Biological Systems.

## Evidence vocabulary

| Field | Allowed values |
|---|---|
| Confidence | low, low-medium, medium, medium-high, high |
| Result direction | supportive, null, contradictory, mixed, not-applicable |
| Claim ceiling | mechanistic-plausibility, biomarker-association, target-engagement, functional-association, symptom-improvement, adjunctive-intervention, established-treatment |
| Exposure level | dietary-pattern, food-group, food-matrix, individual-food, nutrient-bioactive, supplement, meal-timing-circadian, physical-activity, sleep, stress-regulation, non-intervention |

Claim ceilings are upper bounds, not conclusions. `established-treatment` requires
an established treatment evidence base and cannot be inferred from biomarkers,
target engagement, food composition or a single trial.

## Exposure fidelity

The renderer displays the studied exposure level. Supplement evidence cannot be
rewritten as a food claim; food-group evidence cannot be assigned to every member;
extract doses cannot be presented as culinary exposure; multi-component interventions
cannot be attributed to one component.

## Provenance and validation

- Stable IDs are never recycled.
- Every accepted claim resolves to one `ER`, one active TA and one BRS.
- Citation keys must exist in `static/bibtex/BRAIN-diet.bib`.
- FM/PM/Phenome IDs and source paths must resolve.
- Current source wording is preserved in scan output even when the V1 synthesis is
  more conservative.
- Conflicts and null findings remain visible.
- Generated scan files and MDX shells are changed only through their scripts.
- Pages remain internal until scientific review and the publication gate in the
  BRAIN TA Evidence Integration Standard are complete.
