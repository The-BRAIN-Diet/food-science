---
id: food-composition-holding
title: Food composition holding register
sidebar_label: Food composition holding register
description: Referenced food measurements awaiting canonical food-page integration.
list_image: /img/foods/shrimp/shrimp_thumb.webp
---

# Food composition holding register

Source-specific food measurements held for future food-page integration. Inclusion here does not register a new canonical food, generate food mappings, establish a PM-specific dietary requirement or constitute a food recommendation.

## Candidate measurements

Amounts are per 100 g of the specified food, not dry matter. Preparation is part of the observation identity; do not transfer values to other preparations or generic food identities.

| Food and preparation | Substance | Amount per 100 g | Source study | Source record ID | BRAIN canonical IDs / integration status |
| --- | --- | --- | --- | --- | --- |
| Tilapia, cooked, dry heat | [Betaine](/docs/substances/bioactive-compounds/choline-methylation/betaine) | 25 mg | [USDA Release 2 (2008), printed p. 27](#source-usda-choline-2008) | NDB `15262` | Substance: `betaine`. Food: unassigned; no exact food page identified. |
| Shrimp, mixed species, canned | [Betaine](/docs/substances/bioactive-compounds/choline-methylation/betaine) | 23 mg | [USDA Release 2 (2008), printed p. 27](#source-usda-choline-2008) | NDB `15152` | Substance: `betaine`. Existing food: [`shrimp`](/docs/foods/shrimp); preparation-specific observation not yet integrated. |
| Chicken liver, pan-fried | [Betaine](/docs/substances/bioactive-compounds/choline-methylation/betaine) | 21 mg | [USDA Release 2 (2008), printed p. 15](#source-usda-choline-2008) | NDB `05661` | Substance: `betaine`. Exact food: unassigned. Existing [`liver`](/docs/foods/liver) is generic and is not an exact identity match. |

## References

### USDA choline database, Release 2 (2008) {#source-usda-choline-2008}

Patterson KY, Bhagwat SA, Williams JR, Howe JC, Holden JM, Zeisel SH, Dacosta KA, Mar MH. *USDA Database for the Choline Content of Common Foods, Release Two*. January 2008. [Authoritative USDA database and methods (PDF)](https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Choline/Choln02.pdf).

The betaine column reports milligrams of betaine per 100 g of food, separately from total choline. Release 2 corrects analytical problems affecting some earlier measurements. Values describe the specified sampled foods, not guaranteed concentrations in every product. The database confidence code concerns total choline and must not be represented as a betaine-specific confidence rating.

## Integration safeguards

- Preserve the source record ID, substance ID, preparation and citation when later creating or updating a food page.
- Assign a BRAIN food ID only through the existing canonical registration process; an NDB ID is an external source identifier, not a BRAIN ID.
- Put the supporting reference on the eventual canonical food page. Keep PM food rows compact.
- Do not automatically import this holding register into food-source rankings, dietary roll-ups or PM admissions.
- Retain the source observation and its provenance when promoted; record the destination here rather than silently deleting its history.
