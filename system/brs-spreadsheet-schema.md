# BRS Spreadsheet Schema

Citation and reference format for generated pages: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This document defines the canonical schema and interpretation rules for the
BRAIN Diet mechanism spreadsheet used to generate BRS, FM, and PM content.

For **BRS-X** (Endocannabinoid System and Hormones cross-system layers), use
`system/brs-x-spreadsheet-schema.md` — same field semantics with BRS-X-specific
IDs, tabs, Connected Mechanisms rules, and seed rows.

## Purpose

- Spreadsheet = source of truth for mechanism data.
- Schema files = page structure contracts.
- Cursor rules = generation behavior constraints.

## Global Constraints

- Must not infer or invent PMs, FMs, KCs, cofactors, BRSX modifiers, foods, substances, or references.
- Must use only entities explicitly present in the spreadsheet or already defined in-system.
- If data is missing or ambiguous, stop and ask.
- Must not create PM->PM dependency chains.
- Must not create FM->FM dependency chains.
- Must not include Secondary Mechanisms (SMs) during initial rollout.

## Field Schema

## Mechanism ID + Name

**Meaning**
- Canonical mechanism identity.

**Allowed row types**
- BRS
- FM
- KC
- PM
- SM (only if explicitly retained for advanced/internal use)

**Rules**
- IDs must remain stable.
- IDs must not be renamed, reused, or inferred.
- Mechanism references should use ID + name where possible.

## Description

**Meaning**
- Concise biological description of the row.

**Rules**
- Must remain mechanistic.
- Must not introduce new mechanisms.
- Must not include scoring logic.

## Underlying Mechanisms and Requirements

**Meaning**
- Structured mechanism requirements; not a general dependency graph.

**FM row interpretation**
- PMs that define the FM
- KCs required by the FM
- Optional BRSX modifiers

**PM row interpretation**
- KCs only
- Optional BRSX modifiers

**Rules**
- KCs must be interpreted as substrates/precursors only.
- PMs must not reference other PMs as dependencies.
- FMs must not reference other FMs as dependencies.
- BRSX entries are modifiers only (not mechanisms, KCs, or cofactors).
- Must not use underlying requirements to create pathway chains.

**BRSX handling**
- BRSX entries represent cross-system or contextual modulation.
- BRSX primarily acts at PM level; effects may propagate to FM level via PM aggregation.
- BRSX may appear in underlying requirements where it directly influences a PM or FM.
- BRSX must not be treated as:
  - defining components of an FM
  - KCs (substrates/precursors)
  - cofactors
  - standalone mechanisms
- BRSX must not be used to construct dependency chains.

## Cofactors

**Meaning**
- Cofactors only.

**Rules**
- PM rows may list cofactors.
- FM rows inherit cofactors through PM aggregation.
- KC rows should not list cofactors.
- Cofactors must not include:
  - KCs
  - PMs
  - FMs
  - foods
  - general substances unless explicitly acting as cofactors

## Secondary Mechanisms (SMs)

**Meaning**
- Reserved for edge/context-specific advanced mechanisms.

**Current rollout rules**
- SMs are parked for advanced training/personalization.
- SMs must not be included in FM or PM pages unless explicitly instructed.
- Every SM must be linked to one PM.
- SMs must not exist independently of a PM.
- SMs refine/extend PMs; they do not define core FMs.
- SMs must not be used in initial scoring or core page generation.

## Interventions / Inputs -> Substances / Signals

**Meaning**
- Actionable intervention inputs.

**May include**
- foods -> substances
- lifestyle inputs -> biological signals
- timing/behavioral interventions

**Rules**
- Foods should map to substances where possible.
- Must not include generic "healthy food" lists.
- Diet recommendations must be traceable to KCs, PMs, or defined substances.
- Missing entities must be flagged as:
  - `Missing system entity: [name]`

## Outputs / Function

**Meaning**
- Immediate biological effect.

**Rules**
- Must remain biological/mechanistic.
- Must not shift into behavioral outcome language.
- Must not include scoring.

## Evidence Type

**Meaning**
- Type/strength of evidence.

**Allowed examples**
- Human
- Human + mechanistic
- Preclinical
- Mixed
- Emerging

## Key Studies

**Meaning**
- Key supporting studies.

**Rules**
- Must use real studies only.
- Prefer 1–3 directly relevant papers.
- Required format (ingestion → page References):
  - `Author et al. (Year) — Short Descriptive Study Topic | citation_key`
- Page references must link to:
  - `/docs/papers/BRAIN-Diet-References#citationKey`
- Inline body text on generated pages uses `[Author et al., Year]` per **`system/brs-citation-reference-standard.md`**.
- Citation keys must exist in:
  - `static/bibtex/BRAIN-diet.bib`
- If missing, flag:
  - `Missing bibliography entry: [paper / DOI / URL]`

## Dose Target / Requirement

**Meaning**
- Dose context where known.

**Rules**
- Dose should be physiological/diet-relevant where possible.
- Must not present doses as prescriptions.
- If PM-specific, PM context must be explicit.
- If unknown, state dose is not yet defined.

## Coverage Timing

**Meaning**
- How often support may be needed.
- Coverage Timing estimates how often an intervention must be repeated to maintain a positive contribution to the target mechanism, using direct mechanism-persistence evidence where available, and nutrient/status kinetics as proxies where direct evidence is limited.

**Assignment rule**
- Assign Coverage Timing based on mechanism persistence first.
- Use nutrient/status kinetics only when direct mechanism-persistence evidence is limited.
- Use the least frequent interval that maintains a stable positive contribution to the mechanism.

**Allowed examples**
- Meal
- Daily
- 48h
- Weekly
- Monthly

## Response Type

**Meaning**
- Nature of response.

**Allowed examples**
- Immediate
- Hours
- Day
- Days
- Weeks
- Builds
- Reservoir

## Functional Latency

**Meaning**
- Approximate time from intervention to meaningful biological effect.

**Allowed examples**
- Same meal
- Same day
- A week
- Month
- Months

## Evidence Notes

**Meaning**
- Supporting context and caveats.

**May include**
- limitations
- biological caveats
- evidence nuance
- genotype/context sensitivity

**Rules**
- Must not override column definitions.
- Must not introduce new mechanisms.

## Intervention Dominance

**Meaning**
- Dominant intervention type.

**Allowed values**
- Diet-Dominant
- Diet-Supported
- Lifestyle-Dominant
- Mixed (only if explicitly allowed in sheet/schema)

**Rules**
- FM rows define primary dominance.
- PM rows inherit from parent FM unless clearly justified.
- Must not overstate diet where lifestyle is dominant.

## Phenome relationships (PM rows)

Optional translational mappings — see `system/phenome-relationship-schema.md`.

| Column | Meaning |
|--------|---------|
| `phenome_relationships` | JSON/YAML array: `target_phenome`, `relationship_type`, `confidence`, `evidence_level`, `rationale`, `references` |
| `target_phenome` | Shortcut when authoring one phenome per spreadsheet row extension |
| `phenome_relationship_type` | `supports` \| `disrupts` \| `modulates` \| `indirect` |
| `phenome_confidence` | `low` \| `low-medium` \| `medium` \| `high` |
| `phenome_evidence_level` | `mechanistic` \| `observational` \| `intervention` \| `clinical` |
| `phenome_rationale` | Translational rationale (not a mechanism definition) |

FM rows: `functional_outcome_context` is **hand-authored** integrative synthesis (2–4 outcomes). Do not auto-generate FM outcome context from child PM phenome rows.

## Column P - FM Ownership

**Meaning**
- Structural FM owner for each PM.

**Rules**
- Every PM must map to exactly one FM.
- A PM must not belong to multiple FMs.
- FM ownership is structural and required.
- Secondary relevance may be noted elsewhere but must not duplicate ownership.

## Page Generation Mapping

## FM Pages

- Mechanism ID + name -> FM ID + title
- Description -> overview/summary
- Underlying mechanisms and requirements -> PMs, KCs, optional BRSX
- Interventions / inputs -> interventions
- Outputs / function -> outputs
- Evidence type + key studies + evidence notes -> evidence context
- Coverage Timing -> coverage timing
- Intervention Dominance -> intervention dominance

## PM Pages

- Mechanism ID + name -> PM ID + title
- Description -> overview/summary
- Underlying mechanisms and requirements -> KCs + optional BRSX only
- Cofactors -> cofactors
- Interventions / inputs -> inputs
- Outputs / function -> outputs
- Evidence type + key studies + dose target + coverage timing + response type + functional latency + evidence notes -> evidence, dose, timing, latency
- Intervention Dominance -> intervention dominance
- Column P -> single FM ownership

### PM §4 Mechanistic Basis (spreadsheet extension)

After PM MDX shell generation, populate **§4 Mechanistic Basis** via `scripts/generate-pm-mechanistic-basis.mjs` (or flag with `npm run mechanisms:validate`). Follow the canonical four-part narrative and citation rules in `system/primary-mechanism-schema.md` and **`system/brs-citation-reference-standard.md`**; reference page: BRS1-FM1-PM1.

Optional row field `mechanistic_detail`:

```yaml
mechanistic_detail:
  summary: string              # optional override of §4 Summary (why it matters)
  details_title: string        # optional <details> summary label (omit when using visible #### blocks)
  closing: string              # optional; avoid review-paper “together…” closers
  blocks:
    - heading: string          # rendered as #### (heading) — primary mechanism, boundaries, or integration
      paragraphs: [string]     # embed [Author et al., Year] on evidence-backed claims
```

If `mechanistic_detail.blocks` is absent, conversion must leave a detectable placeholder or the validator will fail with `placeholder_mechanistic_detail`.

**Citations:** map `key_studies` to inline `[Author et al., Year]` in primary mechanism blocks; References as `Author et al. (Year) — Topic` with bibliography links per **`system/brs-citation-reference-standard.md`**. Preserve citations on rewrite; do not emit dietary-lever prose in §4.

Optional `evidence_highlights` (array of insight strings with embedded citation links) maps to `### 4.1 Evidence Highlights` as a **subsection at the end of §4** — see `system/primary-mechanism-schema.md` (**PM §4.1 — Evidence Highlights**). Insight-driven only; not mechanism definition or study summaries.

## Enforcement Checklist

- No inferred data.
- No PM->PM chains.
- No FM->FM chains.
- No SMs in initial rollout.
- No scoring formulas in FM/PM pages.
- No non-system food/substance entities without explicit missing-entity flags.
