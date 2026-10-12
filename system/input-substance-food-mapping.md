# Input to Substance to Food

Status: BRS1 inventory and four-PM UI pilot. Generated joins; no new scientific admission, composition registry or food quantity target.

## Authority and outputs

- PM records: `dietary_input_traceability`, `dietary_lever_atoms`, structured presentations in §1.1.1–1.1.3 / §3.1.1–3.1.3. PM-to-KC relationships preserve independently admitted PM atom IDs, KC constituent IDs and accepted scope.
- Dependencies: read external PM/KC documents only through explicit BRS1 relationships. This pilot reads BRS2 PM7 and BRS2 KC1, not other BRS scientific inventories.
- Identity: `registry/substances.json` plus canonical page titles/IDs and documented synonyms. Never use taxonomy to infer PM admission or food presence.
- Foods: canonical `substance_relationships` and exact-food `nutrition_per_100g`/`nutrition_source` observations, plus supported source-specific supplementary records. No rendered-text extraction, 10% filter, estimate promotion, combined-analyte split or conversion yield.
- Generator: `scripts/lib/input-substance-food.mjs`. Shared preview selection: `src/data/inputSubstanceFoodSelection.mjs`. CLI exports and Docusaurus `input-substance-food` plugin consume that same engine.
- Review outputs: `system/generated/brs1-input-substance-food/`. JSON is normalized: relationship, source and row identifiers join independently; its values are reproducible snapshots, not independently editable authority. Markdown and CSV repeat values only for review/export.
- Interactive review: `/docs/system/brs1-input-substance-food` (internal docs enabled). PM UI: `PILOT_PMS`, currently BRS1 PM3, PM6, PM7 and PM12.

## Stable joins and identity gaps

Relationship ID is `PM ID::atom ID`, or the existing PM-KC relationship ID. Food-material ID joins canonical food ID, substance ID, documented material and preparation. Each source observation retains a keyed source-record pointer; no midpoint or universal range is calculated. Substance/food pages retain canonical ownership. Missing substance IDs/pages, inconsistent identities and unverifiable upstream references remain explicit gaps; Cursor can create missing pages after synonym checks.

Canonical food relationships are reciprocal by consuming the same food records in both directions. A new food, substance or PM does not require a second list: add the authoritative source record, then regenerate exports. The live plugin watches source documents/registry changes and rebuilds its derived view. Plugin registration or implementation changes require restarting the dev server. Only representative PMs expose disclosures initially.

## Accounting versus biology

A = PM-owned dietary relationship. B = accepted upstream PM **supply** reference (other upstream links do not erase an independently admitted local role). C = upstream iKC/resource constituent relationship, preserving the existing relationship type and applicability. D = shared-pool/KC reference. E = biochemical/endogenous dependency; food occurrence does not admit a dietary supply route.

The original Direct/Derived classification, relationship layer, claim ceiling and biological role remain stored separately. A local biochemical requirement may have dietary occurrence without becoming a PM dietary requirement. A supported upstream resource constituent does not become a new limiting iKC relationship. Pools deduplicate globally by KC ID and constituents by pool+KC atom; dependent PM connections and independent substance roles remain intact.

One canonical substance amount will be calculated once from recipe ingredients later and associated with every supported role. Pools are not another nutrient. Do not add unlike nutrients, duplicate B6 as PLP supply, multiply requirements by PM count, count precursor conversion without a yield, infer priority from biological reach or claim target coverage without a quantitative target. Conditional balance/competition and timing constraints remain in accepted source records and limitations.

## Quantities and preview UX

Opening Food sources shows up to three quantified sources; Expand food list reveals up to ten in total. The preview selects the largest comparable preparation/basis group deterministically, breaking group-size ties lexically. This is a UX default, not a biological priority. Individual values sort descending within the group; tied values are equal, not precise ordinal ranks. Overlapping ranges prevent precise ranking. Other supported food sources retains qualitative observations and other food states. The full food view uses every eligible relationship, not preview selections.

Preparation or measurement-basis gaps prohibit precise ranking without erasing occurrence. Regulatory minima are not product measurements; the algal-oil specification remains an explicit quantitative-adapter gap. No invented range, recipe serving or dose is provided. Compound-class and meal-composition rules retain non-substance identity; candidate ingredient carbohydrate/protein records are review data, not admitted single-food pattern equivalents.

## Required author checks

Run `npm run mappings:brs1` and `npm run test:input-substance-food`. Check complete structured-input coverage; registry identity and upstream supply joins; no duplicate relationship IDs or supply cycles; unique pool/constituent roll-up; qualitative retention; combined-analyte exclusion; reciprocal food/substance consistency; independent roles; and source-value reproducibility. Keep food-composition confidence separate from PM relationship evidence.


## Sixth atomic field — Dietary input (Stage 2A / Stage 2B)

The PM dietary-context contract is **Input | Input type | Biological role | Evidence source | Limitation | Dietary input**. Store the sixth field on the authoritative `dietary_input_traceability` atom as `dietary_input: true`, `false`, or `null`; render these as **Yes**, **No**, or **Unset — clarification required**. Never copy the decision into a separately editable food registry or lever overlay. `dietary_input_note` and `dietary_input_flags` are review metadata, not additional atomic fields. Missing legacy values remain unset until reviewed.

Stage 2A makes the existing accepted supply decision explicit; Stage 2B projects that same atom without reassessing evidence. Preserve findings, citations, limitations, biological role, relationship classification, ownership and upstream/KC applicability.

- §1.1.1 / §3.1.1 Direct/Derived Dietary Requirements normally receive Yes because section admission establishes dietary applicability. Explicit contradictions must be flagged (`section-supply-contradiction`), leaving the value unset pending resolution rather than silently overriding either record.
- §1.1.2 / §3.1.2 Cofactors and Substrates require individual review of the accepted biological role, supply route and limitation. Intracellular participation alone establishes neither Yes nor No.
- §1.1.3 / §3.1.3 Key Constraints/upstream resource inputs distinguish dietary constituents from the pool or constraint itself. A constituent may receive Yes; a pool reference receives No when no dietary supply relationship is admitted for the pool itself. Constituent decisions remain on their PM atoms, never inherited from KC applicability.
- Ambiguous cases receive `dietary_input: null`, a specific `dietary_input_note` and a clarification flag. Do not default to No.

No means **no dietary supply relationship is admitted for this entry in this PM**. It does not mean the substance is absent from food or biologically unnecessary. Lack of demonstrated benefit from extra intake, dose responsiveness or a universal requirement is not alone a reason to assign No. Dietary input and PM ownership/upstream/accounting designation are independent fields.

```yaml
- atom_id: PM-example-DIT-1
  input: Vitamin B6
  input_type: cofactor precursor
  biological_role: Accepted precursor provision for intracellular PLP
  evidence_source: # retain accepted finding and citation references
    finding_ids: [PM-example-F1]
    citation_keys: [accepted_reference_key]
  evidence_limitation: Retain the accepted limitation verbatim
  dietary_input: true
  dietary_input_note: Accepted dietary precursor route; no conversion yield inferred
```

Generate PM-input substance–food lists only for `dietary_input === true`. Keep No and unset entries visible as biological context; suppress their food lists without removing canonical food composition records. The same substance may have Yes and No entries in different PMs. Generated tables expose the sixth field and source note; retain unresolved rows and gaps. Missing optional food quantities do not suppress an admitted qualitative food relationship. SOPs/lifestyle are outside this PM dietary-input migration.


## Preparation and relationship filters for the BRS1 review index

The initial preparation selection is **All preparations**. Include all eligible verified per-100 g observations with their source-specific preparation and measurement basis. Preserve multiple observations; do not average or merge incompatible states. Mixed preparations/bases and overlapping ranges use alphabetical display, not a precise cross-state ranking. A preparation filter narrows food observations, not scientific admissions. The main preview has at most ten material/preparation sources; do not place quantified cooked or dried records in qualitative sources solely because another state has more records.

Ownership is a PM–input relationship property. Initial independent checkboxes select both **PM-owned dietary relationships** (accepted A relationships with Dietary input Yes) and **Upstream/shared relationships** (accepted B/C dietary supply references plus D pool references). D remains a pool reference, not a nutrient amount. Filter relationships first, then generate all three views and visible relationship/substance/food/pool counts from the selected connections. Each remaining substance and food must have a selected dietary relationship. Neither selected yields empty dietary views. Retain unique constituent amounts regardless of reach.

Display each relationship’s designation beside its PM/section connection. Do not label a substance globally as owned or upstream. No/unset biological context remains in a separate disclosure independent of these checkboxes. Dietary Yes with an incompatible/missing accounting designation is explicitly unresolved there; do not infer a category. Search applies within the projected view and reports matching rows separately from relationship-selection totals.


## Scoped generator runs

Run `npm run mappings:brs1` or `npm run mappings:brs2`. Outputs are reproducible under `system/generated/<brs>-input-substance-food/`. Each run reads PM admissions from that BRS and only explicit external dependencies. Missing `dietary_input` values remain unset and are reported; a generator run does not perform scientific admission or populate supply decisions by inference. BRS2 generation does not enable PM food disclosures or publish a new review route.


The review has a single-selection BRS 1–6 button group, initially BRS1. Switching BRS resets preparation to All preparations and pagination while retaining relationship checkbox choices. BRS2 consumes the same generated dataset; generated `src/data/brs2InputMapping.generated.json` is a read-only fallback for existing preview sessions until the plugin reloads. Live plugin data takes precedence. Never hand-edit this snapshot; `npm run mappings:brs2` refreshes it. BRS3–6 display not-generated status without borrowing BRS1 data or implying no scientific relationships exist. Unset dietary flags remain visible as inventory/context, not admitted food supplies.


BRS3–6 generator commands are `npm run mappings:brs3` through `npm run mappings:brs6`; they refresh the corresponding review snapshots and selector datasets exactly as for BRS2. Generation preserves unset dietary decisions, missing projections and conflicting canonical identities. Counts report admitted structured relationships only; narrative-only and unprojected records are explicit coverage gaps, not invented food mappings.


Pending dietary decisions and biological context use the same four substance-review columns as admitted mappings across BRS1–6: Section ID / relationship accounting, Substance, Up to ten quantified sources, and Other supported sources. Group context by canonical substance identity, retaining all PM relationships and accepted limitations. Unknown identities remain explicit inputs. Auto-open this separate context table when the selected main view has no rows, so an incomplete migration does not look like an empty inventory. Unset/No/ambiguous accounting still never admits food supplies, and dietary filters continue to affect only resolved admitted relationships.


For independently admitted food-related SOPs, follow `system/food-strategy-rollup-schema.md`. Record stable `food_strategy_id` and explicit `food_strategy_scope` on the PM SOP atom, retain its original role/evidence/limitation, and regenerate the rollup. A dietary-input No does not admit an SOP. The food rollup is a separate strategy/intervention view; canonical food or substance links require accepted identities and must not be guessed.

### Combined BRS review

The “Show All BRS” selector combines BRS1–6 authoritative projections. Keep every distinct PM–input relationship, while deduplicating substance IDs, food/material source IDs and pool IDs across scopes. Apply the same preparation and relationship filters to the combined data before computing visible counts and connections. Individual BRS selection remains available.
