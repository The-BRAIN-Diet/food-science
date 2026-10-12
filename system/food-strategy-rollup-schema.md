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
