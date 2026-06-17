# Mechanism Page — Section Body Prose

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names.

## Scope

Applies to **PM**, **FM**, **SM**, and **KC** pages under `docs/biological-targets/**/{pm,fm,sm,kc}/`. BRS hub pages should follow the same principle within each section defined in `system/brs-page-schema.md`.

## Rule

**Sections should never begin by restating the title or definition.**

Each section must follow **only** the schema role for that section (Definition, Primary Biological Effects, Phenome Connections, Mechanistic Basis, Dietary Levers, Connected Mechanisms, etc.). Do not open a section with boilerplate that repeats what the heading or a prior section already established.

### Do not use as section openers

- Restating the page title or entity ID (e.g. `BRS1(SM-CROSS1) is…`, `BRS6-FM2-PM5 describes…`)
- Restating the **BRS name or number** (e.g. `BRS1 — Neurotransmitter Regulation…`, `Within BRS2…`) when the page is already scoped to that BRS
- Paraphrasing the **Definition** section at the start of Primary Biological Effects, Mechanistic Basis, Dietary Levers, or §5.5
- Generic filler (`This section covers…`, `The following describes…`)

### Allowed

- **One** in-body title line after front matter: `## <Entity_ID> - <Title>` (per PM/FM/SM/KC section-order schema)
- Entity IDs **inline** when linking or distinguishing mechanisms (e.g. `[BRS3-FM3-PM7 — …](href)` mid-paragraph)
- Canonical **bullet lists** in connected-entity subsections (§5.3 PMs, §5.4 FMs, hub FM/KC lists)
- **`### Summary`** under Mechanistic Basis: short synthesis for that section only — not a copy of §1 Definition

## Per-section intent (reminder)

| Section | Write |
|---------|--------|
| **Definition** | What this entity is in ontology terms (once per page) |
| **Phenome Connections (PM §3 / FM §3)** | Evidence-weighted translational mappings only — not mechanism definition |
| **Primary Biological Effects (§2)** | Directional ↑/↓ summary only |
| **Mechanistic Basis (PM)** | **Summary → primary mechanism → boundaries → integration** (see below); link PMs/KCs/citations; do not re-define the entity |
| **Intervention Summary (PM §3)** | Intervention Profile + lever tiers with evidence tags — not mechanism definition |
| **Dietary / Lifestyle Levers** | Levers and patterns — not a repeat of Definition |
| **§5.5 Connected Mechanisms** | Cross-domain placement prose + PM links — not a second Definition |

## PM Mechanistic Basis — canonical structure

**Reference:** [BRS1-FM1-PM1 — Amino-Acid Availability & Prioritisation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).

```
### Summary          → why this mechanism matters (implication first)
#### (…)            → primary mechanism — how it works (one or more blocks)
#### (Boundaries…)  → what this PM does not cover (downstream PMs, other domains)
#### (Integration…) → KCs, FM placement, connected mechanisms
```

**Write like a framework mechanism, not a review paper.** Explain why the mechanism matters and how it works; do not re-define the entity (that is §1). Do not open §4 with the mechanism name, `BRSn(PMx) describes…`, or scope boundaries.

| Block | Do | Avoid |
|-------|-----|--------|
| **Summary** | State the central implication in 1–2 short paragraphs | Repeating §1 Definition; naming the PM in the first sentence |
| **Primary mechanism** | Meal-level or pathway biology the PM owns; **inline citations** for evidence-backed claims | Dietary levers, food lists, lifestyle advice; uncited assertions where sources exist |
| **Boundaries** | Point to owning PMs elsewhere (linked); cite when the boundary depends on literature | Long boundary sections before the mechanism is explained |
| **Integration** | KCs + placement in FM/BRS | “Together, these relationships…” closing essays |

## PM §4 — Citations (keep when simplifying)

**Do not remove citations** to shorten §4. Follow **`system/brs-citation-reference-standard.md`**.

- **Format:** `[Author et al., Year]` in the sentence that makes the claim.
- **Primary mechanism blocks:** cite pathway, meal-composition, and substrate claims from `key_studies` / the PM reference list.
- **Summary:** implication-first; citations optional unless one study anchors the whole implication.
- **Rewrites:** if a cited claim stays, the citation stays; if a claim is new and evidence-backed, add the citation and References entry (`Author et al. (Year) — Topic` with bibliography link).

Example placement: [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation) — Mariotti in protein quality; Fernstrom at the PM2 boundary.

**§4 UX:** `### Summary` stays **outside** `<details>`; the four-part `####` narrative goes **inside** one `<details>` block. `### 4.1 Evidence Highlights` follows the dropdown as a subsection of `## 4.`, not inside it.

## PM §4.1 — Evidence Highlights

**Placement:** `### 4.1 Evidence Highlights` at the end of `## 4. Mechanistic Basis` (Profile A), or `### 2.1` at the end of `## 2.` (Profile B). Not inside the mechanism `<details>` block.

| Do | Avoid |
|----|--------|
| Explain why a finding matters for this PM | Restating §4 mechanism biology |
| Prefer landmark trials, meta-analyses, human relevance, synergy/limitation insights | Exhaustive or redundant paper summaries |
| Insight-first bullets with `[Author et al., Year]` | Methods-heavy study recaps |
| Reuse bibliography entries; add BibTeX only when needed | Plain-text or unlinked “see study X” bullets |

**Core principle:** §4 = how the mechanism works. §4.1 = how we know (findings that change interpretation).

**§4.1 UX (reference: BRS1 PM1, BRS1 PM2):** `#### Introduction/Summary` stays visible; curated finding bullets or short `####` blocks go inside one `<details><summary>Evidence highlights — …</summary>…</details>`. Do not repeat §4 mechanism prose in §4.1.

## PM section roles — avoid triple repetition

| Section | Role | Do | Avoid |
|---------|------|-----|--------|
| **§1 Definition** | What it is | One tight mechanism sentence + optional scope paragraph | Mechanism biology dump; study citations unless defining scope |
| **§4 Summary + blocks** | How it happens | Pathway biology, boundaries, integration | Restating Definition; food lists; evidence-trial recap |
| **§4.1 Evidence Highlights** | How we know | Finding-first bullets with citations | Re-explaining LAT1, NF-κB, Nrf2, etc. |

Optional **`#### (Cross-BRS relevance of …)`** inside the mechanism dropdown when a PM's foods span multiple BRS domains (reference: BRS1 PM1 protein foods).

## Mechanistic Basis opening (FM / SM)

The **`### Summary`** (or first paragraph of § Mechanistic Basis on **FM** and **SM** pages) should open with the **interesting implication**, then explain integration. Do not open with entity IDs, “this page describes…”, or a restated Definition.

| Page type | Open with (implication) | Then explain |
|-----------|-------------------------|--------------|
| **FM** | The emergent integrated state | How constituent PMs combine (e.g. methylation capacity from linked one-carbon pathways, not one reaction) |
| **SM-CROSS** | Why the signal is inherently multi-domain | The cross-system concept (e.g. few systems span neural, immune, gut, and circadian biology — then histamine) |
| **SM-PHEN / SM-SNP** | Phenotype or variant interpretation at stake | Connected host PM biology (§4); do not duplicate PM §4 structure on SMs unless overlay-specific |

Expanded FM narrative may use `<details>`; §5.5 (SM-CROSS) remains for cross-BRS **PM links**, not for repeating the Summary implication.

Referenced from: `system/primary-mechanism-schema.md`, `system/functional-mechanism-schema.md`, `system/specific-mechanism-schema.md`, `system/key-constraint-schema.md`.
