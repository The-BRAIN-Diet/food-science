# Phenome Relationship Schema

Citation format for phenome `references`: **`system/brs-citation-reference-standard.md`** (`label` = `Author et al. (Year) — Topic`).

## Purpose

**Target functional outcomes / phenomes** are emergent functional patterns (for example Motivation, Emotional Regulation, Sustained Attention). They must not be treated as simple tags or hard causal claims on PM/FM pages.

PM and FM pages remain **primarily biological**. Phenome mappings are **translational relationships** — evidence-weighted links between mechanisms and functional phenomes — stored in structured front matter and rendered in dedicated sections **after Definition**.

## Layer model

| Layer | Page | §2 section | Confidence type |
|-------|------|------------|-----------------|
| **PM** | Primary Mechanism | Target Functional Outcome / Phenome | Mechanism-level |
| **FM** | Functional Mechanism | Functional Outcome Context | Integrated-system |
| **Phenome** (future) | Phenome graph pages | Full aggregation | Cross-system / graph |

PM pages hold detailed `phenome_relationships`. FM pages hold a **concise** `functional_outcome_context` (2–3 outcomes normally; max 4). Full PM → phenome roll-up graphs belong on future phenome pages — **not** on FM pages.

When an FM has **exactly one** child PM (`mechanisms_covered.length === 1`), §2 must follow the **[Single-PM FM (1:1) rule](#single-pm-fm-11-rule)** below instead of inventing a separate integrative outcome set.

## Core principle

| Layer | Role |
|-------|------|
| **§1 Definition** | Biological mechanism only — no phenome outcome claims |
| **§2 Phenome layer** | Translational relationships (this schema) |
| **§3+** | Intervention, functional role, mechanistic basis, levers, etc. |

## Canonical disclaimer — PM §2

> These mappings are translational relationships, not single-mechanism outcome claims. Phenomes are emergent functional patterns supported by multiple interacting PMs across the BRAIN Framework.

## Canonical disclaimer — FM §2

> These outcomes describe translational contexts for the FM as an integrated biological capacity. They are not single-mechanism treatment claims. Confidence may increase where multiple child PMs converge on the same functional outcome.

## Empty state

**PM:** `No direct functional outcome relationship currently mapped.`

**FM:** `No functional outcome context currently mapped.`

Do not invent provisional mappings to avoid an empty section.

---

## Data model — PM (`phenome_relationships`)

Authoritative source for PM pages. Graph-database ready.

```yaml
phenome_relationships:
  - source_node: "BRS1-FM1-PM2"           # optional; defaults to pm_id
    target_phenome: "Motivation"
    relationship_type: supports           # supports | disrupts | modulates | indirect
    confidence: medium                    # low | medium | high | low-medium
    evidence_level: mechanistic           # mechanistic | observational | intervention | clinical
    rationale: >-
      Testosterone signalling is associated with drive, effort and goal-directed behaviour.
    references:
      - index: 1
        label: "Celec et al. (2015)"
        citation_key: celec_testosterone_brain_behavioral_functions_2015
        href: "/docs/papers/BRAIN-Diet-References#celec_testosterone_brain_behavioral_functions_2015"
```

### PM field rules

| Field | Required | Allowed values |
|-------|----------|----------------|
| `target_phenome` | Yes | Title-case phenome label (stable string for graph export) |
| `relationship_type` | Yes | `supports`, `disrupts`, `modulates`, `indirect` |
| `confidence` | Yes | `low`, `low-medium`, `medium`, `high` |
| `evidence_level` | Yes | `mechanistic`, `observational`, `intervention`, `clinical` |
| `rationale` | Yes | One or two sentences; mechanistic/translational, not diagnostic |
| `references` | Recommended | Same shape as PM `references`; must resolve in `static/bibtex/BRAIN-diet.bib` when cited |
| `source_node` | Optional | Defaults to `pm_id`; use for graph export |

### PM rules

1. A PM may map to **multiple** phenomes.
2. Do not restate phenome mappings inside §1 Definition.
3. Mappings may be **provisional** — reflect confidence and evidence level honestly.
4. Do not use phenomes as mechanism tags in Definition or Functional Role.

---

## Data model — FM (`functional_outcome_context`)

FM pages describe the **main functional outcomes most relevant to the FM as an integrated biological capacity**. This is **not** a roll-up table of all child PM phenome mappings.

```yaml
functional_outcome_context:
  - outcome_name: "Emotional Regulation"
    confidence: medium                 # low | low-medium | medium | high
    synthesis: >-
      One or two sentences integrating across child PMs without listing them.
    references:
      - label: "Sarkar et al. (2020)"
        citation_key: sarkar_microbiome_social_behaviour_2020
        href: "/docs/papers/BRAIN-Diet-References#sarkar_microbiome_social_behaviour_2020"
```

### FM field rules

| Field | Required | Notes |
|-------|----------|-------|
| `outcome_name` | Yes | Human-readable integrated outcome label |
| `confidence` | Yes | Integrated-system confidence; may exceed child PM confidence **only when multiple PMs converge** on the same phenome (not on 1:1 FM→PM instances) |
| `synthesis` | Yes | 1–2 sentences; do not list child PMs |
| `references` | Recommended | Key references only; must resolve in bibliography when cited |

### FM rules

1. Include **normally 2–3** outcomes; **absolute maximum 4**.
2. Do **not** list every child PM.
3. Do **not** repeat PM-level phenome dropdown content.
4. Do **not** present outcomes as direct treatment claims.
5. Do **not** use `connected_phenomes` on FM pages (deprecated for publication).

### Single-PM FM (1:1) rule

When `mechanisms_covered` contains **exactly one** PM, the FM is a **1:1 FM → PM** instance. The FM does not integrate across multiple mechanisms at the phenome layer; the emergent FM state maps directly onto that PM.

| Layer | Requirement |
|-------|-------------|
| **Outcome set** | `functional_outcome_context[].outcome_name` must match the sole child PM’s `phenome_relationships[].target_phenome` **exactly** (same labels, same count). |
| **Confidence** | Each FM outcome `confidence` must match the corresponding PM `confidence`. |
| **Synthesis** | Rewrite at FM integrative level (1–2 sentences); do **not** copy PM `rationale` verbatim. |
| **References** | FM outcome `references` should draw from the same citation keys as the matching PM phenome mapping. |
| **Empty state** | If the sole child PM has no `phenome_relationships`, FM §2 uses the empty state (`No functional outcome context currently mapped.`). |

**What changes vs multi-PM FMs:** do **not** add FM-only phenomes, merge phenomes, or raise/lower confidence because of “FM integration”. Convergence-based confidence uplift applies only when **multiple** child PMs support the same phenome.

**What stays the same:** FM §2 still uses `<details>` dropdowns per outcome (same interaction pattern as PM §2; summary shows outcome name only), the FM disclaimer, and no contributing-PM lists.

**Canonical example:** `docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation.mdx` with child `BRS4-FM4-PM9`.

**Enforcement:** `npm run mechanisms:validate` calls `validateSinglePmFmOutcomeAlignment` in `scripts/lib/phenome-relationships.mjs` when an FM page has exactly one `mechanisms_covered` entry.

---

## Phenome Registry (canonical phenome definitions)

Stable phenome IDs, names, and descriptions live in **`src/data/phenome-registry.json`** — hand-edited with registry approval. Do **not** auto-create registry entries from PM edges.

### Registry entry fields

| Field | Required | Notes |
|-------|----------|-------|
| `id` | Yes | Stable ID (`PH001` …) |
| `name` | Yes | Human-readable label; must match PM `target_phenome` / FM `outcome_name` exactly when used |
| `slug` | Yes | URL-safe slug |
| `description` | Yes | General, stable phenome definition — no BRS-, mechanism-, or ADHD-specific claims |
| `publicSummary` | Yes | Plain-language summary for public pages |
| `primaryDomains` | Yes | Tag list (e.g. `energy`, `cognition`) |
| `status` | Yes | `active` \| `deprecated` |

### Public page

**`/docs/phenomes/index`** — Phenome Registry table + detail sections. Renders from `phenome-registry.json` + `phenome-relationships.generated.json`. Evidence rationales stay on PM/FM pages.

### Registry review flags

Near-duplicate or related-but-distinct phenome pairs are listed in `phenome-registry.json` → `reviewFlags` for manual review (not auto-merged).

---

### Generated index (source of truth pipeline)

PM `phenome_relationships` front matter is the **sole authoring source** for mechanism edges. Regenerate the machine index with:

```bash
npm run phenome:index
npm run phenome:validate
```

Output: `src/data/phenome-relationships.generated.json`

Each flat record includes: `sourceNode`, `sourceTitle`, `sourcePath`, `parentFM`, `parentBRS`, **`targetPhenomeId`**, `targetPhenome`, `relationshipType`, `confidence`, `evidenceLevel`, `rationale`, `references`.

| Field | Source |
|-------|--------|
| `targetPhenome` | PM front matter `phenome_relationships[].target_phenome` |
| `targetPhenomeId` | Matched from `phenome-registry.json` by exact `name`; `null` if unmapped |
| `rationale` | Edge-specific; stays on PM page and index edge |
| Phenome `description` | Registry only — not duplicated on edges |

The index also includes generated derived views:

| Key | Purpose |
|-----|---------|
| `relationships` | Flat PM → phenome edges (with `targetPhenomeId`) |
| `byPhenome` | Phenome label → PM source nodes |
| `byPhenomeId` | Registry ID → PM source nodes |
| `fmRollups` | FM connected-phenome roll-ups (phenome graph pages — **not** FM MDX §2) |
| `diagnostics` | Unmapped labels, orphan registry phenomes, mapping counts |

TypeScript query helpers: `src/data/phenomeRelationships.ts`.

Do **not** hand-edit the generated JSON.

### Registry validation

`npm run phenome:validate` checks:

- Every relationship edge has `targetPhenome`
- Every `targetPhenome` label matches a registry entry
- Every matched edge receives `targetPhenomeId`
- No duplicate registry phenome names
- Warn on unmapped phenome labels (`targetPhenomeId: null`)
- Warn on active registry phenomes with no connected mechanisms

### Graph aggregation (derived from index)

`scripts/lib/phenome-relationship-index.mjs` builds `fmRollups` using `aggregateFmConnectedPhenomes`. FM MDX §2 remains hand-authored `functional_outcome_context`; full PM roll-up graphs belong on future phenome pages.

---

## Page rendering contract

### PM — `## 2. Target Functional Outcome / Phenome`

Placement: immediately after `## 1. Definition`, before Intervention Breakdown.

Structure:

1. Canonical PM disclaimer paragraph
2. For each relationship: `<details>` with summary **`<Target Phenome> — <relationship_type>`**
3. Inside dropdown: Confidence, Evidence Level, Rationale, Key References (linked)

### FM — `## 2. Functional Outcome Context`

Placement: immediately after `## 1. Definition`, before Intervention Breakdown.

Structure:

1. Canonical FM disclaimer paragraph
2. For each outcome: `<details>` with summary **`<Outcome name>`**
3. Inside dropdown: Confidence, Synthesis, Key References (linked list)

**Forbidden on FM §2:** roll-up tables, contributing-PM lists, dropdowns that enumerate child PMs per phenome.

---

## Section renumbering (PM Profile A)

| Old § | New § |
|-------|-------|
| 1 Definition | 1 Definition |
| — | **2 Target Functional Outcome / Phenome** |
| 2 Intervention Breakdown | 3 Intervention Breakdown |
| 3 Functional Role | 4 Functional Role |
| 4 Mechanistic Basis | 5 Mechanistic Basis |
| 5 Connected BRS{N} Mechanisms | 6 BRS Pathways and Connections (6.1 pathways, 6.2 cross-BRS, 6.3 same-FM PMs) |
| 6 Connected Mechanisms | absorbed into §6.2 Connected BRS Mechanisms |
| 7 Dietary Levers | 7 Dietary Levers |
| 8 Lifestyle Levers | 8 Lifestyle Levers |
| 9 Scoreable | 9 Scoreable |
| 10 References | 10 References |

### FM renumbering

| Old § | New § |
|-------|-------|
| 1 Definition | 1 Definition |
| — | **2 Functional Outcome Context** |
| 2 Intervention Breakdown | 3 Intervention Breakdown |
| 3 Functional Role | 4 Functional Role |
| 4 Mechanistic Basis | 5 Mechanistic Basis |
| 5 Connected Mechanisms | 6 Connected Mechanisms |
| 6 References | 7 References |

---

## Spreadsheet columns (PM rows)

| Column | Meaning |
|--------|---------|
| `phenome_relationships` | JSON/YAML array per PM data model above |
| `target_phenome` | Shortcut when one phenome per row extension |
| `phenome_relationship_type` | supports / disrupts / modulates / indirect |
| `phenome_confidence` | low / medium / high / low-medium |
| `phenome_evidence_level` | mechanistic / observational / intervention / clinical |
| `phenome_rationale` | Translational rationale text |

FM rows: `functional_outcome_context` is **hand-authored** integrative synthesis (2–4 outcomes). Do not auto-generate FM §2 from child PM roll-ups. When the FM has **one** child PM, follow the **Single-PM FM (1:1) rule** above (matching phenome labels and confidence).

---

## Graph database export (future)

Node types:

- `Mechanism` (`source_node`: PM or FM ID)
- `Phenome` (`target_phenome` / `outcome_name`)

Edge properties: `relationship_type`, `confidence`, `evidence_level`, `rationale`, `references`.

Future phenome pages query both PM-level and FM-level relationships.

---

## Related schemas

- `system/primary-mechanism-schema.md` — PM §2
- `system/functional-mechanism-schema.md` — FM §2
- `scripts/lib/phenome-relationships.mjs` — validation and section rendering
