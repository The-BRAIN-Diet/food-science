# Food-related SOP rollup — strategies and interventions

The SOP rollup is a read-only projection of independently admitted `system_optimisation_practices` records. It is separate from dietary-input supply and recipe nutrient accounting. A Dietary input No, an empty food list, a narrative mention, a tag or KC membership does not admit an SOP.

## Authoritative PM relationship

Retain the SOP atom ID, input and input type, biological role, `evidence_source.finding_ids`/`citation_keys`, limitation and `optimisation_category`. Add:

- `food_strategy_id`: stable strategy grouping ID. Reuse only for the same explicitly defined protocol; preserve every independent PM relationship, population, tested formulation, preparation, duration and limitation.
- `food_strategy_scope`: `food-preparation`, `dietary-protocol`, `supplementation`, `mixed-food-and-timing`, or `mixed-food-and-behaviour`.
- Optional accepted `food_ids` and `substance_ids`: canonical identities supported by that relationship. Missing links stay flagged; do not infer isolated nutrient effects, generic-food equivalence or doses from a strategy title.

Current IDs were seeded from exact admitted strategy names/categories. Subsequently treat the assigned ID as stable across wording changes. A change of intervention identity requires a new reviewed grouping decision. Shared wording alone does not make biological roles interchangeable.

## Generated rollup

Run `npm run mappings:food-strategies`. Generate one strategy group with all PM-owned relationships. Each relationship has a stable PM::SOP ID, BRS/FM/PM, source-record pointer, strategy ID, scope/category, original role, original evidence and limitation, and optional accepted canonical food/substance IDs. Conflicting grouping metadata is an error; incomplete evidence or food links are explicit gaps, not scientific rejection.

Mixed food/timing and food/behaviour protocols retain the whole tested combination. Do not attribute a combined sleep–meal protocol solely to meal timing. Preserve animal-only, selected clinical, experimental or indirect-marker ceilings. Conditional supplementation is not an ordinary-food prescription. No amount, dose, conversion yield, dietary requirement, diet score or priority is inferred from strategy or connection counts.

Food preparation strategies can qualify delivery or retention without becoming another nutrient input. At recipe level, canonical ingredient-derived substance amounts are calculated once, then linked to separately accepted supply roles and strategies. No SOP multiplies a substance amount. Interventions and strategies remain visible even when a canonical food/material join has not yet been documented.

## Review and extension

The initial rollup contains only currently admitted PM SOPs tagged after reading their accepted records. Pure breathing/meditation records remain outside the food rollup; food-related mindfulness and combined meal/sleep schedules are explicitly mixed. BRS2 has no admitted food-related SOP records in this collection; do not invent examples. KC emerging supports and narrative optimisation candidates need their own existing admission workflow before inclusion.

Review page: `/docs/system/food-strategy-rollup`. The page and data are generated/reproducible and hidden from navigation; PM records remain the only editable scientific authority.


## Approved SOP/Lifestyle food–substance joins — 6 November 2026

Author approved PM intervention-level food/substance links and reuse by the chord extractor. This does not admit an intervention, alter SEC or establish a causal mediator. Reuse canonical `food_ids`, `substance_ids`, ontology entries and exact existing six-atom links. Add only identity metadata supported by the recorded exposure; preserve preparation, comparator and limitations. Never mine unrelated Findings, outcome prose or pattern names for ingredients. Named patterns without explicit constituent identities remain unmapped. Behavioural interventions need no food/substance mapping.

Generate the shared `intervention_mapping` in the existing food-strategy roll-up with `npm run mappings:food-strategies`. It inventories both SOPs and Lifestyle Levers, including Cross-BRS, independently of food-strategy scope. Explicitly rejected/deferred/candidate records are excluded; existing canonical arrays are retained as historical admissions, not newly adjudicated. A false dietary-input flag does not reject a Lifestyle Lever.

Render documented identity links directly beneath the intervention title, using existing dietary-lever/source CSS. Preserve direct six-atom expansion and separate optional Mechanism summary. Composition-only sources are labelled separately; no seventh atom, new score, clinical claim, food-equivalence assumption or technical pathway panel. Missing mappings produce no public placeholder. Existing contextual material roles (e.g. potatoes versus extracted RS2) remain visible.

The chord consumer uses the very same generated records/typed edges: PM-to-intervention, named identity, documented composition and intervention-context-to-BRS. These edges are not dietary-input admissions or therapeutic-effect assertions. Keep composition provenance and original PM/SOP identifiers. A pattern is not expanded into foods without recorded constituent evidence.

Validation: `node --test scripts/intervention-food-substance.test.mjs`, existing dietary/Findings/SEC checks, `npm run presentation:check`, and representative browser inspection. Counts distinguish complete recorded food–substance pairs, partial identity-only mapping and unmapped records (including behaviour where a mapping is unnecessary). This is mapping completeness, not evidence confidence.
