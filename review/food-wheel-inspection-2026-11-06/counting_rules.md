# Counting rules — actual deployed implementation

These rules describe the deployed snapshot, not a proposed correction. Source: deployed.html embedded DATA and JavaScript runtime.

## Counts and deduplication

* Food label N = number of distinct substance IDs in existing foodPairs for that canonical food. Proposed-only pairs are excluded. Direct means any non-derived pair (quantified or presence-only), not clinical directness. Derived-only pairs count once each. If a pair also has direct evidence it is classified direct, while its derivation records remain available.
* Labels do not change when selecting a BRS or enabling proposals. Collective pools (e.g. indispensable amino acids, SCFAs) coexist with individual constituents; they are different ontology identities and may both count. N is not independent biochemical functions, nutrient density or efficacy.
* Identity aliases and repeated PM/source references do not multiply food–substance pairs. Deduplication is by canonical IDs; this export does not independently adjudicate whether ontology identities should be merged. Presence-only pairs count equally to quantified pairs. Duplicate evidence records remain in provenance arrays.
* Default header: 90 food objects, 68 inventory records with inclusion=included, and 121 substance–system connection objects. Inventory includes 76 total records, of which eight are not displayed. 121 is not the food-edge count. Default food ribbons: 1,750 existing pairs; enabling proposed-only adds 18, reaching 1,768. There are 21 proposal records, including proposals improving existing pairs.
* Selected food header: one food, distinct eligible substances attached to it, unique systems reached through those substances. Selected substance: one target, its eligible foods, its unique systems. Selected system: all distinct targets in that system, all foods attached to any such target, and one selected system. A target can count despite no food source. No dosage or admission-strength filter applies.
* System detail count for a food = number of that food's eligible pairs whose target belongs to the selected system. This is smaller than or equal to the persistent whole-network food-label count. One substance mentioned by several PMs in the same system counts once. Admission/contextual status belongs to the substance–system relation and underlying records, not automatically to the food composition edge.
* Proposal toggle includes non-existing pairs in selection logic. Fixed label counts and default header totals do not change. Proposed improvements to an existing pair remain in its detail disclosure even when proposed-only edges are disabled. The source shortlist may also contain proposed entries; it is not itself filtered by the toggle.

## Rendering and selection

Font size in SVG units: 1–2 targets = 16; 3–4 = 18; 5–7 = 20; 8+ = 22. Screen size also depends on responsive SVG scaling and zoom. No quantity-dependent font scaling.

All food/substance nodes remain rendered. Unselected nodes fade to opacity .15; they are not removed. Unselected substance–system links fade to .035; selected links use style opacity 1, multiplied by their underlying fill opacity. System arcs are not dimmed by selection. Food links outside the selected route are hidden (display:none), unless Show all food connections is enabled. All-connections food fill opacity is .12; focused is .42.

Selection first disables Show all. A system selects its target set and follows every eligible food pair, including contextual and derived relationships. This explains broad views: BRS6 has 80 foods/7 targets (magnesium alone has 78); Hormones has 81 foods/1 target. The UI does not default to its top-ten shortlists. No direct food–BRS ribbon is drawn.

Reset returns to all connections but replaces the original explanatory panel with a shorter paragraph. Enabling Show all similarly clears focus and changes panel text. Thus no-selection panel content can differ by interaction history. Unchecking Show all with no selection hides food ribbons while the overview header still reports inventory totals.

## Worked examples

### beef
Label 28 = 24 direct + 4 derived. Proposed-only additional targets: 4. BRS6-specific count: 3. Whole-network system reach: 8. Font: 22 SVG units.

Direct IDs: choline, copper, coq10, creatine, dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid, glutamate, glutamine, indispensable-amino-acids, iron, linoleic-acid, magnesium, manganese, potassium, selenium, sodium, vitamin-a, vitamin-b12, vitamin-b2, vitamin-b5, vitamin-b6, vitamin-b9, vitamin-e, zinc.

Derived IDs: flavin-adenine-dinucleotide, flavin-mononucleotide, pyridoxal-5-phosphate, retinoic-acid.

Proposed-only IDs: glycine, l-carnitine, phenylalanine, serine.

BRS6 IDs: dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid, magnesium.

### bananas
Label 26 = 19 direct + 7 derived. Proposed-only additional targets: 0. BRS6-specific count: 3. Whole-network system reach: 8. Font: 22 SVG units.

Direct IDs: choline, copper, glucose, iron, linoleic-acid, magnesium, manganese, potassium, resistant-starch, selenium, sodium, vitamin-a, vitamin-b2, vitamin-b5, vitamin-b6, vitamin-b9, vitamin-c, vitamin-e, zinc.

Derived IDs: acetate, butyrate, flavin-adenine-dinucleotide, flavin-mononucleotide, propionate, pyridoxal-5-phosphate, retinoic-acid.

Proposed-only IDs: none.

BRS6 IDs: butyrate, magnesium, resistant-starch.

### salmon-roe
Label 24 = 20 direct + 4 derived. Proposed-only additional targets: 0. BRS6-specific count: 3. Whole-network system reach: 8. Font: 22 SVG units.

Direct IDs: choline, copper, dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid, iron, linoleic-acid, magnesium, manganese, phosphatidylcholine, potassium, sodium, vitamin-a, vitamin-b12, vitamin-b2, vitamin-b5, vitamin-b6, vitamin-b9, vitamin-c, vitamin-e, zinc.

Derived IDs: flavin-adenine-dinucleotide, flavin-mononucleotide, pyridoxal-5-phosphate, retinoic-acid.

Proposed-only IDs: none.

BRS6 IDs: dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid, magnesium.

### oysters
Label 24 = 20 direct + 4 derived. Proposed-only additional targets: 0. BRS6-specific count: 3. Whole-network system reach: 8. Font: 22 SVG units.

Direct IDs: choline, copper, dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid, iron, linoleic-acid, magnesium, manganese, phosphatidylcholine, potassium, selenium, sodium, vitamin-a, vitamin-b12, vitamin-b2, vitamin-b5, vitamin-b6, vitamin-b9, vitamin-e, zinc.

Derived IDs: flavin-adenine-dinucleotide, flavin-mononucleotide, pyridoxal-5-phosphate, retinoic-acid.

Proposed-only IDs: none.

BRS6 IDs: dha-docosahexaenoic-acid, epa-eicosapentaenoic-acid, magnesium.

### broccoli-sprouts
Label 9 = 8 direct + 1 derived. Proposed-only additional targets: 0. BRS6-specific count: 1. Whole-network system reach: 8. Font: 22 SVG units.

Direct IDs: iron, magnesium, potassium, sulforaphane, vitamin-b6, vitamin-b9, vitamin-c, zinc.

Derived IDs: pyridoxal-5-phosphate.

Proposed-only IDs: none.

BRS6 IDs: magnesium.
