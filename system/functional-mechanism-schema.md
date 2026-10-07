# Functional Mechanism (FM) Schema

### Nutrient naming

Apply [Nutrient naming conventions](nutrient-naming-conventions.md) to vitamin names, form-specific claims and structured input/presentation labels. Keep family, specific form, preferred display label and aliases separately in the authoring/identity record; project labels through existing accepted page fields. This applies to Stage 2A handoff and Stage 2B adjudication.


Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical data contract for Functional Mechanism pages.
It is derived from the FM specification and is intended to be strict enough for
validation while remaining readable for authors.

## Related: Phenome roll-ups

FM **§7 Phenome Connections** holds a concise integrative snapshot (`functional_outcome_context` in front matter) — normally 2–3 outcomes, max 4. It does **not** roll up all child PM phenome mappings (that belongs on future phenome graph pages). See `system/phenome-relationship-schema.md`. Do not embed phenome outcome claims in §1 Definition.

**Phenome review:** §4.1 provides a bounded functional rationale, §4.2 summarises its evidence, and §4.3 describes capacity-loss consequences. Independent phenome assessment remains required; existing ratings are unchanged by presentation migration.

When `mechanisms_covered` has **exactly one** PM, apply the **Single-PM FM (1:1) rule**: FM §7 phenome labels and confidence must align with that PM’s `phenome_relationships` at publish time — but Phase 2 FM review may surface candidates requiring Phase 1 PM updates first (see methodology § Single-PM FM reconciliation).

## Spreadsheet Interpretation Authority

- Use `system/brs-spreadsheet-schema.md` as the authoritative field-by-field
  interpretation for spreadsheet ingestion.
- When schema structure and spreadsheet interpretation need coordination, do not
  infer; resolve using the spreadsheet schema and generation rules.

## Definition (ontology)

Functional Mechanisms (FMs) represent integrated biological states that emerge from the coordinated activity of related Primary Mechanisms (PMs). They describe the functional capacities, desired states or regulatory conditions that arise from underlying biological processes and serve as the **principal navigational and teaching layer** of the framework.

Architecture: **BRS → FM → PM**. FM pages live at `docs/biological-targets/brs{N}/fm{M}/`; child PMs share the same folder. PM identifiers use **BRS-wide incremental numbering** (`BRS{N}-FM{M}-PM{k}` where `k` is unique within the BRS, assigned in FM order — e.g. `BRS1-FM1-PM1`, `BRS1-FM1-PM4`, `BRS1-FM1-PM2`, … `BRS1-FM4-PM11`).

See also `system/brain-diet-ontology-rules.md` §1.2 and §1.4.

## Scope

- FM pages are **synthesis pages**, not implementation pages.
- Represents an integrated biological state at FM breadth (not a single PM process).
- Must synthesise constituent PMs into an emergent functional state; must not repeat PM page content (mechanistic detail, dietary levers, lifestyle levers, or scoreable inputs).
- **Interventions act on PMs.** Dietary levers, lifestyle levers, and scoreable inputs belong on **PM pages** only.
- FM pages describe the integrated state that emerges, identify contributing PMs and KCs in §4, and roll up cross-BRS placement in §5.
- Must not contain scoring formulas.

## FM Authoring — Synthesis Without Repetition

PMs own detailed biology, interventions and Scientific Findings. FMs provide a concise account of the functional capacity represented by their child mechanisms. The inventory is navigation; the evidence synthesis is interpretation. Neither cooperation nor shared relevance establishes synergy, superior outcomes or a confidence uplift.

### Definition and Overview

State the FM’s biological purpose and functional relevance at a high level, using its reviewed evidence. Do not enumerate PM contributions or repeat their mechanism descriptions. Preserve the stated coverage boundary. A single-PM FM must not manufacture multi-PM integration or imply coverage beyond its child and separately supported connections.

### Top inventory — before the Objective, Mission or Definition

Render **Primary Mechanisms** from `mechanisms_covered` and **Key Constraints** from the existing `key_constraints` records above section 1. Each entry is a linked canonical ID and name, without a repeated contribution paragraph, nutrient list, or “Relied upon by” block. Where typed child connections have been assessed, follow the accepted-connection summary rule below. Show each record once. If no KC is recorded, omit the KC heading rather than invent a mapping. Moving these links changes presentation, not applicability or evidence status. Do not derive new admissions merely from a linked pool or import constituent inputs.

### FM section 4 — distinct responsibilities

Use this visible order and numbering:

1. **§4.1 Functional Rationale** — retain a concise account of why adequate operation of the covered biology would matter functionally. No PM-by-PM walkthrough, repeated inventory, architecture commentary or assertion of superiority. This is a bounded rationale, not an independently demonstrated outcome.
2. **§4.2 Evidence Summary** — aggregate and synthesise the child PM §4.1 Scientific Findings summaries and the underlying Findings needed to interpret them accurately. State the main findings, relevant differences in context/endpoints, and what their aggregation would mean if the covered capacities functioned adequately. Do not concatenate the PM summaries, reproduce each study assessment, or infer that separate studies tested the combined system. Keep measured effects separate from the conditional combined interpretation. Shared evidence counts once; null results and material limitations must remain visible.
3. **§4.3 Suboptimal Function & Its Effects** — consequences when the covered capacity is constrained. This follows the Evidence Summary. Preserve context and limits; do not substitute dietary stressors, an intervention list or unreviewed phenome ratings.

The old §4.1 Core Primary Mechanisms section and extended §4.2 Integrated Functional Narrative are removed from section 4. The former §4.4 Evidence Highlights becomes the concise Evidence Summary, without copied PM evidence dropdowns. Stable old anchors may remain as aliases; visible headings follow the new sequence.

### Evidence and decision preservation

Reuse reviewed evidence. If a PM summary is only an introduction, inspect its Findings before synthesising it. Distinguish biochemical necessity, measured provision, physiological response and functional outcome. “If these capacities function adequately…” is a conditional biological interpretation, not proof of an intervention effect. Preserve reported benefits at their studied level; do not broaden strain-, tissue-, form- or population-specific findings.

Do not change PM admissions, KC applicability, phenome ratings or outcome confidence to fit the layout. FM phenome decisions still require their separate evidence assessment; aggregation alone does not validate a phenome or increase confidence. Preserve removed material and its provenance in the review/archive record.

### Durable source and rendering

- `mechanisms_covered` and `key_constraints` → the top linked inventory.
- `functional_rationale` → §4.1, a concise reviewed string.
- `fm_evidence_summary` → §4.2, a reviewed synthesis followed by its bounded combined meaning. Use `{{cite:canonical_key}}` markers resolved against the target FM’s `references`.
- The existing Suboptimal Function body → §4.3, preserved unless separately assessed.
- `references` → numbered `fm-ref-n` bibliography anchors. Append reused references when needed; preserve existing order and numbering. Never copy PM reference numbers into an FM.

Use `scripts/lib/fm-synthesis-layout.mjs`. Generators must preserve these durable decisions, not reconstruct PM inventories or generic emergent-state prose in section 4. Missing reviewed source is a reported authoring gap, not permission to fabricate an integrated evidence claim.

### Minimal working example

```yaml
mechanisms_covered:
  - id: BRS1-FM3-PM7
    name: Neuronal Membrane DHA Incorporation
    href: /docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation
functional_rationale: Maintaining DHA incorporation supports neuronal membrane composition and the structural context for signalling. Current coverage is DHA-focused, rather than a comprehensive account of brain nutrient or membrane-lipid pools.
fm_evidence_summary: >-
  Human PET and plasma measurements estimated whole-brain DHA incorporation at 3.8 ± 1.7 mg/day.
  Turnover estimates additionally used a previously reported pool and steady-state assumptions.
  A porcine comparison supports delivery-form differences in gray-matter accretion, alongside reviewed carrier biology.
  {{cite:umhau_brain_docosahexaenoic_2009,liu_higher_2014,patrick_role_2019}}
```

This excerpt uses the existing FM renderer and target bibliography; it is not a standalone page or a replacement bibliography. The complete canonical example also states the bounded combined meaning: maintaining membrane DHA is supported, while an optimal oral dose, capsule-to-brain fraction and cognitive benefit are not established. See BRS1-FM3’s exact source.

### Deduplication and review gate

Compare the Overview, Functional Rationale, Evidence Summary and Suboptimal Function for distinct jobs. The top inventory replaces contribution lists, not scientific evidence. Verify every child’s material evidence contribution or record why it supplies no relevant evidence. Keep one synthesis rather than one repeated PM paragraph per child. Validate source/render agreement, order, inventory links, local citation destinations and preserved aliases. Review the science separately: structural validity does not establish the combined interpretation.

### FM Primary Biological Effects

Describe the covered biological capacity without assuming synergy or an independently measured integrated outcome. Preserve existing decisions until separately reassessed.

## Intervention Breakdown (required front matter)

`intervention_breakdown` is **required in front matter** on all FM pages. It is **not** rendered as a public body section on current FM pages (see validation contract).

Choose **one** value only (no percentages, weighted estimates, or prose unless necessary):

| Value | Meaning |
|---|---|
| Food-State Dominant | Primarily modulated through food composition, structure, preparation state, digestion kinetics, or meal architecture. |
| Food-State Leaning | Strongly food-responsive but meaningfully influenced by behavioural, physiological, or environmental context. |
| Mixed Modulation | Food-state and behavioural/lifestyle regulation contribute comparably. |
| Behavioural/Lifestyle Leaning | Primarily influenced through behavioural, circadian, environmental, autonomic, or adaptive regulation, with meaningful nutritional contribution. |
| Behavioural/Lifestyle Dominant | Primarily governed through behavioural, environmental, circadian, autonomic, or adaptive regulation rather than meal-level modulation. |

Use this field to guide recipe-scoreability expectations. Do **not** create temporal or timing-based intervention categories (for example, “Temporal Leaning”).

Legacy `intervention_dominance` spreadsheet values map approximately as: Diet-Dominant → Food-State Dominant; Diet-Supported → Food-State Leaning; Lifestyle-Dominant → Behavioural/Lifestyle Dominant; mixed → Mixed Modulation.

## Timing Specific (required ontology metadata; not a default public body section)

`timing_specific` is **required in front matter** (and in CUE / extractors / scoring / traversal when wired). It must **not** be rendered as a standalone numbered body section (`## N. Timing Specific` with only `Yes` or `No`).

Allowed values only:

- **Yes** — timing materially alters interpretation, effectiveness, or biological meaning (chrononutrition, temporal state).
- **No** — timing is not a material modifier for interpreting this FM.

Timing is a **separate modifier flag**, not an intervention modulation class. Where timing materially alters interpretation, discuss it naturally within **Primary Biological Effects**, **Mechanistic Basis**, or constituent PM **Lifestyle Levers** rather than as an isolated Yes/No section.

## Required Top-Level Fields

```yaml
title: string                      # e.g. "Glycaemic–Insulin Stability & Cognitive Energy Availability"
fm_id: string                      # e.g. "BRS6(FM1)"
parent_brs: string                 # e.g. "BRS6"
summary: string                    # concise overview of the covered functional capacity
functional_rationale: string       # reviewed bounded rationale → §4.1
fm_evidence_summary: string        # reviewed evidence aggregation + conditional meaning → §4.2
mechanisms_covered:
  - id: string
    name: string
    href: string                   # required PM page link
key_constraints:
  - id: string
    name: string
    type: "substrate" | "precursor"
    href: string                   # required KC page link
intervention_breakdown: string     # required; one allowed value only (see Intervention Breakdown)
timing_specific: string            # required; "Yes" | "No" only
intervention_dominance: string     # legacy spreadsheet alias; map to intervention_breakdown at ingest
coverage_timing: string            # legacy; does not replace timing_specific on the page
references:
  - string                         # numeric citation links to bibliography anchors
functional_outcome_context:        # optional; concise FM integrative outcomes (max 4)
  - outcome_name: string
    confidence: string             # low | low-medium | medium | high
    synthesis: string              # 1–2 sentences; do not list child PMs
    references:
      - label: string
        citation_key: string
        href: string
hide_title: boolean
```

## Canonical Body Sections (Authoring / Ingestion Superset)

The YAML shape below supports spreadsheets, tooling, and future sections. **Published FM MDX** follows **Section Order (Page Rendering Contract)**; many keys below are not rendered as body sections on the current BRS6 FM pages (see **MDX body vs YAML**).

```yaml
definition: string
functional_role: string
mechanistic_basis_implementation_of_pms: string
underlying_mechanisms_and_requirements:
  pms:                               # ingestion alias; public PM links are above section 1
    - id: string
      name: string
      href: string
  kcs:                               # ingestion alias; public KC links are above section 1
    - id: string
      name: string
      type: "substrate" | "precursor"
      href: string
  optional_brsx_modifiers:           # optional; render as ### 5.4 only if used
    - string
  connected_mechanisms:                   # render: ### 5.4 Connected Mechanisms
    - id: string
      name: string
dietary_levers:
  - string
lifestyle_levers:
  - string
scoreable_food_state_inputs:           # ingestion YAML key unchanged; public heading: ## N. Scoreable Inputs & Modulation Signals
  input_rows:
    - input_category: string       # Functional Property Potentials | Realised Functional States | Substance / Nutrient Signals | Preparation Transformations
      example_inputs: [string]
      functional_relevance: string
  interpretation_note: string
recipe_translation_scoring_logic:    # tooling / narrative artefacts; not a public body section in current contract
  intro: string
  recipe_characteristics:
    - characteristic: string
      interpretation: string
  prioritisation_rule: string
functional_consequences:
  - string
cross_system_links:
  - id: string
    name: string
mechanism_summary:
  fm_id: string
  parent_brs: string
  intervention_dominance: string
  coverage_timing: string
  response_type: string
  functional_latency: string
scoring_interpretation:
  low_support: string
  high_support: string
interpretation_boundary: string
evidence_base:
  evidence_type: string
  evidence_notes: string
references:
  - index: number
    label: string
    href: string                   # /docs/papers/BRAIN-Diet-References#citation_key
missing_entities:
  - string
```

## Section body prose

Sections must not restate the page title, entity ID, BRS name/number, or Definition. Each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section Order (Page Rendering Contract)

First line of the MDX body (after front matter) must be the FM title: `## <FM_ID> - <FM name>` (same heading level as `## 1. Definition`; use a hyphen/spaces as on live pages; do not use `#` or `###` for this line).

### Canonical public body (synthesis contract)

Place the linked PM/KC inventory above section 1, before the Objective, Mission or Definition. Preserve existing major-section identifiers and anchors during this presentation migration.

- **§1 Mission/Objective and Overview** — high-level purpose and relevance, not the PM inventory.
- **§2 Primary Biological Effects** — covered biological capacity.
- **§4 Mechanistic Basis** — §4.1 Functional Rationale → §4.2 Evidence Summary → §4.3 Suboptimal Function & Its Effects.
- **§5 Connected Mechanisms** — supported cross-system relationships.
- **§7 Phenome Connections** — separately assessed published relationships; no automatic aggregation uplift.
- **References** — target FM numbered bibliography.

No PM/KC inventory, extended Integrated Functional Narrative or copied PM Evidence Highlights remains in §4. Retain old subsection anchors as aliases where needed.

### Excluded from the public FM body (current contract)

Do not add body sections after **References** (`## 8.`). The following are **not** part of the FM narrative: **Dietary Levers**, **Lifestyle Levers**, **Scoreable Inputs & Modulation Signals**, **Underlying Mechanisms and Requirements** (and legacy §5.1–§5.4 rollups), Recipe Translation & Scoring Logic, standalone Functional Consequences / Outputs, Mechanism Summary Table, Scoring Interpretation, Interpretation Boundary, Evidence Base, Missing Entities. Those may exist in YAML, spreadsheets, PM pages, or other artefacts.

### Legacy note

Older FM pages used Diet/Lifestyle/Scoreable sections and `Underlying Mechanisms and Requirements` with PM/KC rollups. New edits must follow the **synthesis contract** above (§4 integrated narrative + §5 Connected Mechanisms).

## Automated validation

Run against all FM and PM MDX pages under `docs/biological-targets/**/{fm,pm}/`:

```bash
npm run mechanisms:validate
```

Implementation: `scripts/validate-mechanism-pages.mjs` (shared rules in `scripts/lib/mechanism-page-validation.mjs` and `scripts/lib/phenome-relationships.mjs`). Checks front matter for `intervention_breakdown` and `timing_specific`, forbids visible `## N. Timing Specific` body sections, validates FM section order, phenome/outcome front matter, and **Single-PM FM (1:1)** alignment when `mechanisms_covered` has exactly one child PM.

## Validation Rules

- When `mechanisms_covered` has **exactly one** PM, `functional_outcome_context` must follow the **Single-PM FM (1:1) rule** in `system/phenome-relationship-schema.md` (matching phenome labels and confidence to the child PM; enforced by `validateSinglePmFmOutcomeAlignment`).
- `title`, `fm_id`, `parent_brs`, `summary`, `intervention_breakdown`, and `timing_specific` are required and non-empty.
- `intervention_breakdown` must be exactly one of the five allowed values in **Intervention Breakdown**; no combined or percentage labels.
- `timing_specific` must be exactly `Yes` or `No`.
- `summary` must match the Definition section intent, remain concise, and follow **FM Definition Rule** (integrated PM contributions + emergent outcome; no full PM definition repeats).
- Definition and **Mechanistic Basis** must follow **FM Authoring — Synthesis Without Repetition** (no PM summary dumps; no duplicated PM `<details>` content).
- `mechanisms_covered` and `key_constraints` must use ID+name+href.
- FM body section headings must be explicitly numbered: Definition → Primary Biological Effects → Mechanistic Basis (Integrated FM Narrative) → Connected Mechanisms → Phenome Connections → References.
- Published body must **not** include `## N. Timing Specific`; `timing_specific` is validated in front matter only (`Yes` | `No`).
- Published body must **not** include `Dietary Levers`, `Lifestyle Levers`, `Scoreable Inputs & Modulation Signals`, or `Underlying Mechanisms and Requirements`.
- Published body must **not** use legacy `## N. BRS Links` or standalone `## N. Connected Mechanisms`; use `## 5. Connected Mechanisms`.
- `## 5. Connected Mechanisms` is required; roll up from constituent PM §6.2 connected mechanisms.
- Each Connected Mechanisms bullet must use: `[ID — Name](href) — one-sentence biological connection to this FM`. Do not list BRS hub pages without a specific PM/FM link and connection sentence.
- `## 8. References` is required when references exist in front matter.
- KC summaries use separately adjudicated child-PM connections. For an assessed FM, set `kc_summary_mode: adjudicated-pm-relationships`; generate `fm_kc_relationship_summary` and the top `key_constraints` inventory with `deriveFmKcUnion` from `pm_kc_relationships` matched to established `kc_applicability_adjudications`. Preserve each relationship’s type, biological role, child Finding references, numbered child bibliography links and limitation. Supported upstream supply is not a demonstrated limiting constraint or intake benefit. Conditional constraint retains its studied context. Unresolved/rejected candidates and canonical membership alone must not enter the summary. Consolidated public disclosures may retain an independently admitted connection; their removal does not erase applicability.
- Render this accepted-connection summary once beneath the top KC inventory, not as another section-4 inventory or unconditional “Relied upon by” claim. Validate the stored summary against the child records; stale types, evidence or limitations fail `fm_kc_relationship_summary_stale`. Do not silently reassess an FM outcome rating or invent an FM-wide constraint from child connections.
- Legacy FMs without this explicit summary mode retain the existing `key_constraints` PM-union checks until individually reassessed. Legacy prose or pool membership cannot substitute for a new typed adjudication. A KC citation absent from the applicable child-derived union remains a review flag (`fm_kc_43_not_in_pm_union`).
- Claims in Mechanistic Basis and §4.1 must stay mechanistic / interpretive (`may`, `supports`, `associated with`) unless evidence supports stronger wording.
- Where `scoring_interpretation` or similar content exists in YAML or tooling, it must not include formulas, equations, or numeric scoring logic.
- Do not expose raw scoring code or internal scoring implementation details in FM pages.
- Do not display PM/FM code references in recipe-facing examples beyond mechanism-page context.
- References must all resolve to `static/bibtex/BRAIN-diet.bib` citation keys per **`system/brs-citation-reference-standard.md`**.
- When an **Evidence Base** (or equivalent) block exists in non-page artefacts, avoid uncited research claims there; the public FM MDX body does not require a separate Evidence Base section under the current contract.

## Dose Rules (when summary or dose metadata exists)

- Dose ranges are functional anchors, not prescriptions.
- Prefer diet-first physiological ranges.
- Avoid supplement-level dose framing unless explicitly justified in evidence.
- Always contextualize dose with bioavailability where relevant.
- The trimmed FM page body does not include a Mechanism Summary Table; keep dose-adjacent fields in front matter or ingestion metadata unless the contract is extended.

**Presentation validation:** Require the top inventory and the three sequential §4 headings above; prohibit repeated section-4 inventories. Resolve numbered citations against the target FM bibliography. Author names may be included when useful, but an evidence synthesis may use numbered links without repeating author names.
