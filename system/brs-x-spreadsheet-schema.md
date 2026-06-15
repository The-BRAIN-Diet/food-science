# BRS-X Spreadsheet Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet column letters in generated MDX or public pages.
- Always use semantic field names (for example, `Intervention Dominance`, `FM Ownership`, `Connected Mechanisms`).
- Treat letter-identifier wording in generated outputs as a validation failure.

## Purpose

This document defines the **canonical spreadsheet contract** for authoring **BRS-X** Functional Mechanisms (FM), Primary Mechanisms (PM), and Key Constraints (KC) for:

- `BRS-X(ECS)` — Endocannabinoid System
- `BRS-X(Hormones)` — Hormone Signalling & Regulation

It extends `system/brs-spreadsheet-schema.md`. Where BRS-X rules differ, **this file wins** for BRS-X ingestion.

**Use case:** hand the workbook structure and seed rows below to ChatGPT (or another author) to populate mechanism rows. Cursor ingests the finished sheet to generate pages under `docs/biological-targets/brs-x/{ecs,hormones}/`.

**Related schemas:** `system/brs-x-schema.md`, `system/functional-mechanism-schema.md`, `system/primary-mechanism-schema.md`.

---

## Workbook Structure

Create **one Google Sheet / Excel workbook** with these tabs:

| Tab | Purpose |
|-----|---------|
| `README` | Instructions, naming rules, allowed values (copy from this doc) |
| `ECS-FM` | Functional mechanisms for Endocannabinoid System |
| `ECS-PM` | Primary mechanisms for ECS |
| `ECS-KC` | Key constraints for ECS |
| `Hormones-FM` | Functional mechanisms for Hormones |
| `Hormones-PM` | Primary mechanisms for Hormones |
| `Hormones-KC` | Key constraints for Hormones |
| `Connected-Index` | Optional lookup: existing BRS1–6 PM/FM IDs to link from §6 Connected Mechanisms |

**Do not** mix ECS and Hormones on the same data tab.

**Initial rollout:** no SM rows. Park SMs until PM/FM/KC pages exist.

---

## Entity Hierarchy

```
BRS-X(System)
 └── FM (integrated state)
      ├── PM (intervention-influenceable mechanism) — many per FM
      └── KC (shared substrate/precursor pool) — optional per FM
```

**Architecture:** `BRS-X(System) → FM → PM`, same teaching model as BRS1–6.

**Critical difference from BRS1–6:** BRS-X PMs are **owned by BRS-X FMs**, not by BRS1–BRS6. Existing BRS1–6 PMs are **not moved** into BRS-X; they are referenced only in **Connected Mechanisms**.

---

## ID and Naming Rules

### System identifiers

| Object | Pattern | Example |
|--------|---------|---------|
| System | `BRS-X(ECS)`, `BRS-X(Hormones)` | Endocannabinoid System |
| FM | `BRS-X(ECS-FM1)` | Endocannabinoid Tone Regulation |
| PM | `BRS-X(ECS-PM1)` | NAPE → NAE Biosynthesis |
| KC | `BRS-X(ECS-KC1)` | Phospholipid Precursor Pool |

### Numbering

- **FM numbers** restart at 1 within each system (`ECS-FM1…`, `Hormones-FM1…`).
- **PM numbers** are **system-wide incremental** within each BRS-X system (not reset per FM):
  - ECS: `BRS-X(ECS-PM1)`, `BRS-X(ECS-PM2)`, …
  - Hormones: `BRS-X(Hormones-PM1)`, `BRS-X(Hormones-PM2)`, …
- **KC numbers** restart at 1 within each system.
- IDs are **stable** once assigned. Do not rename or reuse IDs.

### Slug / file path convention (for generation)

| Type | Path pattern |
|------|----------------|
| FM | `docs/biological-targets/brs-x/{ecs\|hormones}/fm{M}/brs-x-{ecs\|hormones}-fm{M}-{slug}.mdx` |
| PM | `docs/biological-targets/brs-x/{ecs\|hormones}/fm{M}/brs-x-{ecs\|hormones}-pm{P}-{slug}.mdx` |
| KC | `docs/biological-targets/brs-x/{ecs\|hormones}/kc/brs-x-{ecs\|hormones}-kc{K}-{slug}.mdx` |

`{slug}` = lowercase kebab-case from mechanism name (omit parenthetical labels).

**Permalinks** (Docusaurus): `/docs/biological-targets/brs-x/{ecs|hormones}/brs-x-{ecs|hormones}-fm{M}-{slug}` (and analogous for PM/KC).

### Parent fields (required on every row)

| Field | FM row | PM row | KC row |
|-------|--------|--------|--------|
| `parent_system` | `BRS-X(ECS)` or `BRS-X(Hormones)` | same | same |
| `parent_fm` | — | exactly one `BRS-X(…-FMn)` | — |
| `fm_ownership` | — | duplicate of `parent_fm` (structural check) | list FMs that depend on this KC |

---

## Global Constraints (inherit + BRS-X extensions)

From `system/brs-spreadsheet-schema.md`:

- Do not infer or invent PMs, FMs, KCs, cofactors, foods, substances, or references.
- Do not create PM→PM or FM→FM **dependency chains** in Underlying Mechanisms.
- No SMs in initial rollout.
- No scoring formulas on FM/PM pages.

**BRS-X extensions:**

- **Do not relocate** existing BRS1–6 PMs into BRS-X tabs. Link them only via **Connected Mechanisms**.
- **Connected BRS-X Mechanisms** (§5 on PM pages): same-system FM + sibling PMs only.
- **Connected Mechanisms** (§6 on PM / §5 on FM): cross-links to BRS1–6 **or** the other BRS-X system.
- KCs are **substrates/precursors only** — not hormones as KCs unless explicitly framed as a **pool/availability constraint** (e.g. cholesterol substrate pool), not receptor pharmacology.
- Cofactors ≠ KCs ≠ Connected Mechanisms.

---

## Column Schema (all mechanism tabs)

Use **one header row**. Column order below is recommended for ChatGPT workbooks.

### Core identity

| Column | Required | Row types | Meaning |
|--------|----------|-----------|---------|
| `row_type` | Yes | all | `FM` \| `PM` \| `KC` |
| `mechanism_id` | Yes | all | Canonical ID (see naming rules) |
| `mechanism_name` | Yes | all | Human title |
| `parent_system` | Yes | all | `BRS-X(ECS)` or `BRS-X(Hormones)` |
| `status` | Yes | all | `proposed` \| `ready_for_page` \| `published` \| `parked` |

### Definition and integration

| Column | Required | Row types | Meaning |
|--------|----------|-----------|---------|
| `description` | Yes | all | Concise mechanistic definition (≤120 words for PM/FM summary) |
| `functional_outputs` | FM, PM | FM, PM | Directional biological effects (↑ / ↓); not behavioural outcomes |
| `integrated_definition` | FM only | FM | One-line FM definition following FM synthesis pattern (see `functional-mechanism-schema.md`) |

### Structure and dependencies

| Column | Required | Row types | Meaning |
|--------|----------|-----------|---------|
| `underlying_mechanisms` | FM, PM | FM, PM | **FM:** semicolon-separated PM IDs that define this FM. **PM:** semicolon-separated KC IDs only |
| `fm_ownership` | PM only | PM | Exactly one parent FM ID |
| `cofactors` | PM only | PM | Semicolon-separated cofactor names (must exist in substance ontology or be flagged missing) |
| `connected_mechanisms` | FM, PM | FM, PM | Semicolon-separated `ID — Name` links to **other systems** (BRS1–6 or other BRS-X). Optional on KC |
| `connected_brs_domains` | FM, PM | FM, PM | Semicolon-separated list: `BRS1`, `BRS3`, … — which core BRS domains this row primarily touches |

### Interventions and evidence

| Column | Required | Row types | Meaning |
|--------|----------|-----------|---------|
| `interventions_inputs` | PM (recommended FM) | FM, PM | `substance ← food` bullets; lifestyle → signal pairs; no generic “healthy diet” |
| `intervention_dominance` | FM, PM | FM, PM | `Diet-Dominant` \| `Diet-Supported` \| `Lifestyle-Dominant` \| `Mixed` |
| `intervention_breakdown` | FM, PM | FM, PM | One of: `Food-State Dominant`, `Food-State Leaning`, `Mixed Modulation`, `Behavioural/Lifestyle Leaning`, `Behavioural/Lifestyle Dominant` |
| `evidence_type` | FM, PM | FM, PM | `Human` \| `Human + mechanistic` \| `Preclinical` \| `Mixed` \| `Emerging` |
| `key_studies` | PM (required), FM (recommended) | FM, PM | `Author et al. (Year) — Short Descriptive Study Topic \| citation_key` — one per line or semicolon-separated |
| `dose_sensitivity` | PM | PM | Pattern-based dose context; not prescriptive |
| `coverage_timing` | FM, PM | FM, PM | `Meal` \| `Daily` \| `48h` \| `Weekly` \| `Monthly` |
| `response_type` | PM | PM | `Immediate` \| `Hours` \| `Days` \| `Weeks` \| `Builds` \| `Reservoir` |
| `functional_latency` | PM | PM | `Same meal` \| `Same day` \| `A week` \| `Month` \| `Months` |
| `timing_specific` | FM, PM | FM, PM | `Yes` \| `No` |
| `evidence_notes` | optional | all | Caveats, limitations, context sensitivity |

### Phenome relationships (PM rows)

See `system/phenome-relationship-schema.md`. Add `phenome_relationships` JSON column on PM tabs. FM `functional_outcome_context` is hand-authored integrative synthesis (not a child PM roll-up). **Single-PM FM (1:1):** when an FM has one child PM, FM outcome names and confidence must match that PM.

### Page-generation extensions (PM only)

| Column | Required | Meaning |
|--------|----------|---------|
| `mechanistic_detail_summary` | recommended | §4 Summary override (why it matters) |
| `mechanistic_detail_blocks` | recommended | JSON or YAML block list — see `system/brs-spreadsheet-schema.md` § PM §4 |
| `evidence_highlights` | optional | Insight bullets for §4.1 (not mechanism re-teaching) |
| `missing_entities` | optional | `food:` / `substance:` / `bibliography:` flags |

### KC-specific

| Column | Required | Meaning |
|--------|----------|---------|
| `kc_type` | KC only | `substrate` \| `precursor` |
| `fm_dependents` | KC only | Semicolon-separated FM IDs that require this pool |
| `failure_mode_narrative` | KC only | Short stressor narrative for FM §4.4 (when linked) |

---

## Page Generation Mapping

### BRS-X FM pages

Same synthesis contract as BRS1–6 (`functional-mechanism-schema.md`):

- §1 Definition ← `integrated_definition` or `description`
- §2 Intervention Breakdown ← `intervention_breakdown`
- §3 Functional Role ← `functional_outputs`
- §4 Mechanistic Basis — §4.1 PMs, §4.2 KCs, §4.3 narrative, §4.4 failure modes if KCs present
- §5 Connected Mechanisms ← `connected_mechanisms` + `connected_brs_domains`

**Not on FM pages:** dietary levers, lifestyle levers, scoreable tables (PM-only).

### BRS-X PM pages

Profile A extended (`primary-mechanism-schema.md`):

- `parent_brs` in front matter = `BRS-X(ECS)` or `BRS-X(Hormones)` (not `BRS1`…`BRS6`)
- §5 **Connected BRS-X Mechanisms** (same-system FM + sibling PMs)
- §6 **Connected Mechanisms** ← BRS1–6 and cross BRS-X links
- **FM / PM / SM pages:** portrait thumbnail in `<p class="brs-pm-thumbnail-wrap">` with `<img class="brs-pm-thumbnail">` (same 217×122 crop as BRS1–6 mechanism pages). Assets: `brs-x-ecs-portrait-thumbnail.jpg` or `brs-x-hormones-portrait-thumbnail.jpg`
- **System hub pages:** `brs-x-hero` or `brs-hub-hero` (half content width, no crop)

### BRS-X KC pages

Follow BRS KC pattern: pool definition, FM dependents, no food examples on KC body (foods live on PM §7).

---

## Seed Rows — BRS-X(ECS)

Use these as **starting proposals**. ChatGPT may refine descriptions and evidence but must not invent IDs outside this namespace without explicit approval.

### ECS-FM (tab `ECS-FM`)

| mechanism_id | mechanism_name | integrated_definition | underlying_mechanisms (PM IDs) | connected_brs_domains |
|--------------|----------------|---------------------|--------------------------------|------------------------|
| `BRS-X(ECS-FM1)` | Endocannabinoid Tone Regulation | Integrated regulation of endocannabinoid synthesis, degradation, and receptor signalling tone across neural and peripheral tissues. | `BRS-X(ECS-PM1)`; `BRS-X(ECS-PM2)`; `BRS-X(ECS-PM4)` | BRS1; BRS3; BRS6 |
| `BRS-X(ECS-FM2)` | Stress-Buffering Neuromodulation | Integrated modulation of stress-responsive neuromodulatory signalling via endocannabinoid–dopamine and autonomic interface pathways. | `BRS-X(ECS-PM6)`; `BRS-X(ECS-PM7)` | BRS1; BRS5; BRS6 |
| `BRS-X(ECS-FM3)` | Appetite–Reward Coupling | Integrated regulation of satiety signalling, reward drive, and intake stability through NAE/OEA biology and stress-linked appetite pathways. | `BRS-X(ECS-PM5)`; `BRS-X(ECS-PM8)` | BRS5; BRS6 |

### ECS-PM (tab `ECS-PM`)

| mechanism_id | mechanism_name | fm_ownership | underlying_mechanisms (KCs) | connected_mechanisms (BRS1–6 examples) |
|--------------|----------------|--------------|-------------------------------|----------------------------------------|
| `BRS-X(ECS-PM1)` | Endocannabinoid Tone Regulation | `BRS-X(ECS-FM1)` | `BRS-X(ECS-KC1)`; `BRS-X(ECS-KC2)` | `BRS1-FM3-PM4 — Acetylcholine Synthesis Support`; `BRS1-FM4-PM5 — Neuronal Membrane DHA Incorporation` |
| `BRS-X(ECS-PM2)` | NAPE → NAE Biosynthesis from Dietary Phospholipids | `BRS-X(ECS-FM1)` | `BRS-X(ECS-KC1)` | `BRS1-FM3-PM4 — Acetylcholine Synthesis Support`; `BRS2-FM3-PM7 — Phospholipid Methylation` |
| `BRS-X(ECS-PM3)` | Omega-3-Derived N-Acylethanolamine Production | `BRS-X(ECS-FM1)` | `BRS-X(ECS-KC2)`; `BRS-X(ECS-KC3)` | `BRS3-FM3-PM8 — Eicosanoid / SPM Balance`; `BRS1-FM4-PM5 — Neuronal Membrane DHA Incorporation` |
| `BRS-X(ECS-PM4)` | FAAH-Mediated Endocannabinoid Degradation Modulation | `BRS-X(ECS-FM1)` | — | `BRS3-FM1-PM1 — NF-κB Signalling Regulation` (genistein cross-link only if evidence-backed) |
| `BRS-X(ECS-PM5)` | OEA / PEA Satiety Signalling | `BRS-X(ECS-FM3)` | `BRS-X(ECS-KC1)` | `BRS6-FM4-PM9 — Stress-Induced Appetite / Reward Drive Modulation` |
| `BRS-X(ECS-PM6)` | ECS–Dopamine Motivation Coupling | `BRS-X(ECS-FM2)` | — | `BRS1-FM1-PM1 — Amino-Acid Availability & Prioritisation`; `BRS1-FM1-PM2 — Noradrenergic Signalling` |
| `BRS-X(ECS-PM7)` | Vagal–ECS Stress Buffering | `BRS-X(ECS-FM2)` | — | `BRS5-FM3-PM7 — Vagal–ENS Signalling Modulation`; `BRS6-FM3-PM7 — Vagal Tone / HRV Regulation` |
| `BRS-X(ECS-PM8)` | Stress-Linked Reward Appetite Modulation | `BRS-X(ECS-FM3)` | — | `BRS6-FM4-PM9 — Stress-Induced Appetite / Reward Drive Modulation` |

### ECS-KC (tab `ECS-KC`)

| mechanism_id | mechanism_name | kc_type | fm_dependents |
|--------------|----------------|---------|---------------|
| `BRS-X(ECS-KC1)` | Phospholipid / NAPE Precursor Pool | precursor | `BRS-X(ECS-FM1)`; `BRS-X(ECS-FM3)` |
| `BRS-X(ECS-KC2)` | Long-Chain PUFA Substrate Pool | precursor | `BRS-X(ECS-FM1)` |
| `BRS-X(ECS-KC3)` | Antioxidant / Redox Support Context | substrate | `BRS-X(ECS-FM1)` |

**Bibliography anchors to prioritise for ECS rows:** `garani_endocannabinoid_2021`, `covey_endocannabinoid_2017`, `laksmidewi_endocannabinoid_2021`, `kim_n_2011`, `kim_synaptamide_2013`, `watson_emerging_2019`, `gibellini_kennedy_2010`, `solinas_anandamide_2006`, `mock_anandamide_2023`, `saleh-ghadimi_endocannabinoid_2020`.

---

## Seed Rows — BRS-X(Hormones)

From `system/brs-x-schema.md` § proposed FM structure. PM names are **placeholders** until evidence rows are filled.

### Hormones-FM (tab `Hormones-FM`)

| mechanism_id | mechanism_name | underlying_mechanisms (PM IDs) | connected_brs_domains |
|--------------|----------------|--------------------------------|------------------------|
| `BRS-X(Hormones-FM1)` | Hormone Production & Availability | `BRS-X(Hormones-PM1)`; `BRS-X(Hormones-PM2)` | BRS2; BRS4; BRS6 |
| `BRS-X(Hormones-FM2)` | Hormone-Responsive Neural Regulation | `BRS-X(Hormones-PM3)`; `BRS-X(Hormones-PM4)`; `BRS-X(Hormones-PM5)` | BRS1; BRS6 |
| `BRS-X(Hormones-FM3)` | Hormone–Microbiome Interaction | `BRS-X(Hormones-PM6)`; `BRS-X(Hormones-PM7)`; `BRS-X(Hormones-PM8)` | BRS5; BRS2 |
| `BRS-X(Hormones-FM4)` | Hormonal Adaptation & Transition Resilience | `BRS-X(Hormones-PM9)`; `BRS-X(Hormones-PM10)`; `BRS-X(Hormones-PM11)`; `BRS-X(Hormones-PM12)` | BRS1; BRS2; BRS6 |

### Hormones-PM (tab `Hormones-PM`)

| mechanism_id | mechanism_name | fm_ownership |
|--------------|----------------|--------------|
| `BRS-X(Hormones-PM1)` | Steroid Hormone Synthesis Support | `BRS-X(Hormones-FM1)` |
| `BRS-X(Hormones-PM2)` | Endocrine Cofactor Sufficiency | `BRS-X(Hormones-FM1)` |
| `BRS-X(Hormones-PM3)` | Estrogen–Neurotransmitter Coupling | `BRS-X(Hormones-FM2)` |
| `BRS-X(Hormones-PM4)` | Progesterone–GABA Regulation | `BRS-X(Hormones-FM2)` |
| `BRS-X(Hormones-PM5)` | Testosterone–Motivation Signalling | `BRS-X(Hormones-FM2)` |
| `BRS-X(Hormones-PM6)` | Estrobolome Regulation | `BRS-X(Hormones-FM3)` |
| `BRS-X(Hormones-PM7)` | Androbolome Regulation | `BRS-X(Hormones-FM3)` |
| `BRS-X(Hormones-PM8)` | Microbial Hormone Biotransformation | `BRS-X(Hormones-FM3)` |
| `BRS-X(Hormones-PM9)` | Menstrual Cycle Adaptation | `BRS-X(Hormones-FM4)` |
| `BRS-X(Hormones-PM10)` | Perimenopause & Menopause Adaptation | `BRS-X(Hormones-FM4)` |
| `BRS-X(Hormones-PM11)` | Androgen Transition & Ageing Adaptation | `BRS-X(Hormones-FM4)` |
| `BRS-X(Hormones-PM12)` | Gender-Affirming Hormone Transition Support | `BRS-X(Hormones-FM4)` |

### Hormones-KC (tab `Hormones-KC`) — proposed pools

| mechanism_id | mechanism_name | kc_type | fm_dependents |
|--------------|----------------|---------|---------------|
| `BRS-X(Hormones-KC1)` | Cholesterol / Steroid Substrate Pool | precursor | `BRS-X(Hormones-FM1)` |
| `BRS-X(Hormones-KC2)` | Endocrine Cofactor & Trace-Element Pool | substrate | `BRS-X(Hormones-FM1)` |
| `BRS-X(Hormones-KC3)` | Fibre / Polyphenol Microbial Substrate Pool | precursor | `BRS-X(Hormones-FM3)` |

---

## ChatGPT Workbook Prompt (copy-paste)

```
Create a Google Sheet workbook for the BRAIN Diet BRS-X mechanism layer.

Follow system/brs-x-spreadsheet-schema.md exactly.

Tabs: README, ECS-FM, ECS-PM, ECS-KC, Hormones-FM, Hormones-PM, Hormones-KC, Connected-Index.

Use the seed rows in that document for mechanism_id and mechanism_name. Fill all required columns for each seed row.

Rules:
- Do not invent new mechanism IDs.
- Do not move BRS1–6 mechanisms into BRS-X; only link them in connected_mechanisms.
- key_studies must use citation_key values that exist in BRAIN-diet.bib; if unsure, leave blank and set missing_entities = bibliography: [topic].
- interventions_inputs must use substance ← food format where possible.
- PM fm_ownership must match exactly one FM row.
- FM underlying_mechanisms must list only PM IDs assigned to that FM.
- status = proposed until evidence columns are complete; then ready_for_page.

Export one CSV per tab when done.
```

---

## Validation Checklist (before ingest)

- [ ] Every PM has exactly one `fm_ownership`
- [ ] Every FM `underlying_mechanisms` PM is owned by that FM
- [ ] No PM lists another PM in `underlying_mechanisms` (KCs only)
- [ ] No FM lists another FM as a dependency
- [ ] `connected_mechanisms` IDs match real published BRS1–6 or BRS-X IDs
- [ ] All `key_studies` citation_keys resolve in `static/bibtex/BRAIN-diet.bib`
- [ ] No SM rows in initial workbook
- [ ] `parent_system` consistent on every row in a tab
- [ ] ECS and Hormones tabs are not mixed

---

## Example PM row (JSON export shape)

See `system/brs-x-spreadsheet-pm-row.example.json` for the ingest-friendly object format aligned with `pm-mechanistic-spreadsheet-row.example.json`.

---

## Relationship to BRS1–6 spreadsheet

| Topic | BRS1–6 | BRS-X |
|-------|--------|-------|
| PM ID pattern | `BRS1-FM2-PM3` (BRS-wide incremental) | `BRS-X(ECS-PM3)` (system-wide incremental) |
| `parent_brs` | `BRS1`…`BRS6` | `BRS-X(ECS)` / `BRS-X(Hormones)` |
| Cross-links field | BRSX modifiers in underlying requirements | `connected_mechanisms` column |
| File root | `docs/biological-targets/brs{N}/` | `docs/biological-targets/brs-x/{ecs,hormones}/` |
| Hub page | Per-BRS overview | `cross-system-regulation.md` + system page |

When both spreadsheets exist, **Connected-Index** should list reciprocal links: BRS-X PMs → BRS1–6 PMs and (optionally) back-link updates on BRS1–6 PM §6.
