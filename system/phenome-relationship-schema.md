# Phenome Relationship Schema

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
| `confidence` | Yes | Integrated-system confidence; may equal or exceed child PM confidence where PMs converge |
| `synthesis` | Yes | 1–2 sentences; do not list child PMs |
| `references` | Recommended | Key references only; must resolve in bibliography when cited |

### FM rules

1. Include **normally 2–3** outcomes; **absolute maximum 4**.
2. Do **not** list every child PM.
3. Do **not** repeat PM-level phenome dropdown content.
4. Do **not** present outcomes as direct treatment claims.
5. Do **not** use `connected_phenomes` on FM pages (deprecated for publication).

### Generated index (source of truth pipeline)

PM `phenome_relationships` front matter is the **sole authoring source**. Regenerate the machine index with:

```bash
npm run phenome:index
```

Output: `src/data/phenome-relationships.generated.json`

Each flat record includes: `sourceNode`, `sourceTitle`, `sourcePath`, `parentFM`, `parentBRS`, `targetPhenome`, `relationshipType`, `confidence`, `evidenceLevel`, `rationale`, `references`.

The index also includes generated derived views:

| Key | Purpose |
|-----|---------|
| `relationships` | Flat PM → phenome edges |
| `byPhenome` | Phenome → PM source nodes (reciprocal links for phenome pages) |
| `fmRollups` | FM connected-phenome roll-ups (phenome graph pages — **not** FM MDX §2) |

TypeScript query helpers: `src/data/phenomeRelationships.ts`.

Do **not** hand-edit the generated JSON.

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
2. For each outcome: `### <Outcome name>`
3. **Confidence:** (display label, e.g. Medium, Low–Medium)
4. 1–2 sentence synthesis paragraph
5. **Key references:** linked citations

**Forbidden on FM §2:** roll-up tables, contributing-PM lists, `<details>` per phenome listing child PMs.

---

## Section renumbering (PM Profile A)

| Old § | New § |
|-------|-------|
| 1 Definition | 1 Definition |
| — | **2 Target Functional Outcome / Phenome** |
| 2 Intervention Breakdown | 3 Intervention Breakdown |
| 3 Functional Role | 4 Functional Role |
| 4 Mechanistic Basis | 5 Mechanistic Basis |
| 5 Connected BRS{N} Mechanisms | 6 Connected BRS{N} Mechanisms |
| 6 Connected Mechanisms | 7 Connected Mechanisms |
| 7 Dietary Levers | 8 Dietary Levers |
| 8 Lifestyle Levers | 9 Lifestyle Levers |
| 9 Scoreable | 10 Scoreable |
| 10 References | 11 References |

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

FM rows: `functional_outcome_context` is **hand-authored** integrative synthesis (2–4 outcomes). Do not auto-generate FM §2 from child PM roll-ups.

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
