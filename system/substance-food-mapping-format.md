# Substance → Food Mapping Format (PM, SM)

Canonical public format for substrate/substance linkage to foods on:

| Page kind | Section |
|---|---|
| PM | `## N. Levers` → **N.1 Dietary Requirements** → **N.1.1 Direct and/or Derived Dietary Requirements** (legacy pages may still use Dietary Levers / Direct Dietary Levers) |
| SM | `## N. Dietary Levers` — inside `<details><summary><strong>Diet</strong></summary>` |

KC pages use `### 2. Shared Biological Pool` with the same `Resource ← food examples` bullet convention.

FM pages do **not** carry Dietary Levers — interventions belong on constituent PM pages.

## Direction (required)

**Substance first, then 2–3 representative food examples** — not food → substance.

```text
- Choline ← eggs, liver
- Folate ← leafy greens, legumes, liver
- B12 ← dairy, seafood, liver
- Betaine ← beetroot, spinach
```

Use the Unicode arrow **`←`** (U+2190) between substance and foods.

## Rules

1. **One substance per bullet** — split combined legacy lines (`eggs/liver → choline,B12`) into separate bullets so each substance has its own food list.
2. **2–3 food examples** per substance when possible; omit weak fourth duplicates unless needed for clarity.
3. **Repeat foods across substances** when the same food supplies multiple substrates (e.g. liver under Choline, Folate, and B12).
4. **Prefer substance links** to `/docs/substances/…` when a substance page exists; foods stay plain text (no requirement for food pages).
5. **No nested “Food sources (examples)”** collapsible under Dietary Levers — merge into the single Diet `<details>` list using this format.
6. **Narrative dietary levers** (meal patterns, glycaemic structure, timing) may remain prose bullets without `←` when they describe mechanisms rather than substrate→food mapping.

## Deprecated (do not use)

- `food → substance` (legacy)
- `food, food → substance A, substance B` on one line
- Separate `Food sources (examples)` `<details>` blocks under Dietary Levers
- Comma-joined substances on the right of a single food-first line (`eggs/liver → choline,B12`)

## Validation

- JS: `scripts/lib/mechanism-page-validation.mjs` (`validateSubstanceFoodMappingSections`)
- CUE: `cue/brain/common.cue` (`#SubstanceFoodBullet`, `#LegacyFoodToSubstanceArrow`)
- Run: `npm run mechanisms:validate`

## Generator

`scripts/lib/brs-spreadsheet-generate.mjs` and `scripts/lib/substance-food-mapping.mjs` emit this format from intervention rows.

## BRS1 generated pilot — supersedes manual food examples on pilot PMs

The **Input to Substance to Food** table (`system/input-substance-food-mapping.md`) now supplies the food disclosures for the representative BRS1 PMs. Do not add or maintain a separate example list for those inputs. Keep the accepted PM input line and its evidence/relationship IDs; generated Food sources shows three initial quantified sources, expands to at most ten comparable sources, and retains qualitative/other-state sources separately. Existing manual examples are not authority for the new mapping and are not used as admission evidence. Other pages retain their current presentation pending later rollout.


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
