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
| **Mechanistic Basis (PM)** | **Summary → primary mechanism → boundaries → integration** (see below); link PMs/KCs/citations; do not re-define the entity |
| **Intervention Breakdown** | Single allowed value only (when in schema) |
| **Dietary / Lifestyle Levers** | Levers and patterns — not a repeat of Definition |
| **§5.5 Cross-BRS Links** | Cross-domain placement prose + PM links — not a second Definition |

## PM Mechanistic Basis — canonical structure

**Reference:** [BRS1(PM1) — Amino-Acid Availability & Prioritisation](/docs/biological-targets/brs1/pm/brs1-pm1-amino-acid-availability-and-prioritisation).

```
### Summary          → why this mechanism matters (implication first)
#### (…)            → primary mechanism — how it works (one or more blocks)
#### (Boundaries…)  → what this PM does not cover (downstream PMs, other domains)
#### (Integration…) → KCs, FM placement, cross-BRS links
```

**Write like a framework mechanism, not a review paper.** Explain why the mechanism matters and how it works; do not re-define the entity (that is §1). Do not open §4 with the mechanism name, `BRSn(PMx) describes…`, or scope boundaries.

| Block | Do | Avoid |
|-------|-----|--------|
| **Summary** | State the central implication in 1–2 short paragraphs | Repeating §1 Definition; naming the PM in the first sentence |
| **Primary mechanism** | Meal-level or pathway biology the PM owns; **inline citations** for evidence-backed claims | Dietary levers, food lists, lifestyle advice; uncited assertions where sources exist |
| **Boundaries** | Point to owning PMs elsewhere (linked); cite when the boundary depends on literature | Long boundary sections before the mechanism is explained |
| **Integration** | KCs + placement in FM/BRS | “Together, these relationships…” closing essays |

## PM §4 — Citations (keep when simplifying)

**Do not remove citations** to shorten §4. The canonical structure trades review-paper length for clarity, not for weaker evidence.

- **Format:** `[Author (Year)](/docs/papers/BRAIN-Diet-References#citation_key) [n]` in the sentence that makes the claim; `[n]` must match **§9 References** (extended PM) or **§7** (compact PM).
- **Primary mechanism blocks:** cite pathway, meal-composition, and substrate claims that come from `key_studies` / the PM reference list.
- **Summary:** implication-first; citations optional unless one study anchors the whole implication.
- **Rewrites:** if a cited claim stays, the citation stays; if a claim is new and evidence-backed, add the citation and References entry.

Example placement: [BRS1(PM1)](/docs/biological-targets/brs1/pm/brs1-pm1-amino-acid-availability-and-prioritisation) — Mariotti [2] in protein quality; Fernstrom [1] at the PM2 boundary.

`<details>` is optional for very long PM narratives; **Summary and the four-part flow stay visible** when using the canonical pattern.

## Mechanistic Basis opening (FM / SM)

The **`### Summary`** (or first paragraph of § Mechanistic Basis on **FM** and **SM** pages) should open with the **interesting implication**, then explain integration. Do not open with entity IDs, “this page describes…”, or a restated Definition.

| Page type | Open with (implication) | Then explain |
|-----------|-------------------------|--------------|
| **FM** | The emergent integrated state | How constituent PMs combine (e.g. methylation capacity from linked one-carbon pathways, not one reaction) |
| **SM-CROSS** | Why the signal is inherently multi-domain | The cross-system concept (e.g. few systems span neural, immune, gut, and circadian biology — then histamine) |
| **SM-PHEN / SM-SNP** | Phenotype or variant interpretation at stake | Connected host PM biology (§4); do not duplicate PM §4 structure on SMs unless overlay-specific |

Expanded FM narrative may use `<details>`; §5.5 (SM-CROSS) remains for cross-BRS **PM links**, not for repeating the Summary implication.

Referenced from: `system/primary-mechanism-schema.md`, `system/functional-mechanism-schema.md`, `system/specific-mechanism-schema.md`, `system/key-constraint-schema.md`.
