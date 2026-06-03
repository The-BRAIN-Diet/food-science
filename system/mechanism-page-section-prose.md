# Mechanism Page — Section Body Prose

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names.

## Scope

Applies to **PM**, **FM**, **SM**, and **KC** pages under `docs/biological-targets/**/{pm,fm,sm,kc}/`. BRS hub pages should follow the same principle within each section defined in `system/brs-page-schema.md`.

## Rule

**Sections should never begin by restating the title or definition.**

Each section must follow **only** the schema role for that section (Definition, Functional Role, Mechanistic Basis, Dietary Levers, Cross-BRS Links, etc.). Do not open a section with boilerplate that repeats what the heading or a prior section already established.

### Do not use as section openers

- Restating the page title or entity ID (e.g. `BRS1(SM-CROSS1) is…`, `BRS6(PM5) describes…`)
- Restating the **BRS name or number** (e.g. `BRS1 — Neurotransmitter Regulation…`, `Within BRS2…`) when the page is already scoped to that BRS
- Paraphrasing the **Definition** section at the start of Functional Role, Mechanistic Basis, Dietary Levers, or §5.5
- Generic filler (`This section covers…`, `The following describes…`)

### Allowed

- **One** in-body title line after front matter: `## <Entity_ID> - <Title>` (per PM/FM/SM/KC section-order schema)
- Entity IDs **inline** when linking or distinguishing mechanisms (e.g. `[BRS3(PM4) — …](href)` mid-paragraph)
- Canonical **bullet lists** in connected-entity subsections (§5.3 PMs, §5.4 FMs, hub FM/KC lists)
- **`### Summary`** under Mechanistic Basis: short synthesis for that section only — not a copy of §1 Definition

## Per-section intent (reminder)

| Section | Write |
|---------|--------|
| **Definition** | What this entity is in ontology terms (once per page) |
| **Functional Role** | Directional ↑/↓ summary only |
| **Mechanistic Basis** | Lead with the **interesting implication**, then explain the mechanism (see below) — link PMs/citations; do not re-define the entity |
| **Intervention Breakdown** | Single allowed value only (when in schema) |
| **Dietary / Lifestyle Levers** | Levers and patterns — not a repeat of Definition |
| **§5.5 Cross-BRS Links** | Cross-domain placement prose + PM links — not a second Definition |

## Mechanistic Basis opening (implication first)

The **`### Summary`** (or first paragraph of § Mechanistic Basis) should open with the **interesting implication** — the integrative insight the reader needs — then explain the named mechanism or integration. Do not open with entity IDs, “this page describes…”, or a restated Definition.

| Page type | Open with (implication) | Then explain |
|-----------|-------------------------|--------------|
| **PM** | The regulatory consequence at stake | The bounded process (e.g. LAT1 competitive transport after “nutrient delivery depends on availability *and* competitive transport”) |
| **FM** | The emergent integrated state | How constituent PMs combine (e.g. methylation capacity from linked one-carbon pathways, not one reaction) |
| **SM-CROSS** | Why the signal is inherently multi-domain | The cross-system concept (e.g. few systems span neural, immune, gut, and circadian biology — then histamine) |

Expanded narrative belongs in `<details>` or following paragraphs; §5.5 (SM-CROSS) remains for cross-BRS **PM links**, not for repeating the Summary implication.

Referenced from: `system/primary-mechanism-schema.md`, `system/functional-mechanism-schema.md`, `system/specific-mechanism-schema.md`, `system/key-constraint-schema.md`.
