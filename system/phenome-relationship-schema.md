# Phenome Relationship Schema

## Purpose

**Target functional outcomes / phenomes** are emergent functional patterns (for example Motivation, Emotional Regulation, Sustained Attention). They must not be treated as simple tags or hard causal claims on PM/FM pages.

PM and FM pages remain **primarily biological**. Phenome mappings are **translational relationships** — evidence-weighted links between mechanisms and functional phenomes — stored in structured front matter and rendered in dedicated sections **after Definition**.

## Core principle

| Layer | Role |
|-------|------|
| **§1 Definition** | Biological mechanism only — no phenome outcome claims |
| **§2 Phenome layer** | Translational relationships (this schema) |
| **§3+** | Intervention, functional role, mechanistic basis, levers, etc. |

## Canonical disclaimer (required on PM §2 and FM §2)

> These mappings are translational relationships, not single-mechanism outcome claims. Phenomes are emergent functional patterns supported by multiple interacting PMs across the BRAIN Framework.

## Empty state (required when no mappings)

When no credible phenome relationship exists for a PM or FM:

```text
No direct functional outcome relationship currently mapped.
```

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
        citation_key: celec_testosterone_2015
        href: "/docs/papers/BRAIN-Diet-References#celec_testosterone_2015"
```

### Field rules

| Field | Required | Allowed values |
|-------|----------|----------------|
| `target_phenome` | Yes | Title-case phenome label (stable string for aggregation) |
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

## Data model — FM (`connected_phenomes`)

FM roll-ups are **aggregated from child PM `phenome_relationships`**. The FM front matter field `connected_phenomes` is the published snapshot (regenerate when child PMs change).

```yaml
connected_phenomes:
  - target_phenome: "Motivation"
    connected_pm_count: 3
    strongest_relationship_type: supports
    highest_evidence_level: mechanistic
    overall_confidence: medium
    evidence_summary: >-
      Supported by testosterone signalling, dopaminergic modulation and metabolic-hormonal integration.
    contributing_pms:
      - id: "BRS-X(Hormones-PM5)"
        name: "Testosterone–Motivation Signalling"
        href: "/docs/biological-targets/brs-x/hormones/fm2/brs-x-hormones-pm5-testosterone-motivation-signalling"
        relationship_type: supports
        confidence: medium
        evidence_level: mechanistic
```

### FM aggregation rules

Generate with `scripts/lib/phenome-relationships.mjs` → `aggregateFmConnectedPhenomes(childPmRelationships)`:

| Output field | Rule |
|--------------|------|
| `connected_pm_count` | Count of distinct child PMs mapping to this phenome |
| `strongest_relationship_type` | Priority: `supports` > `modulates` > `indirect` > `disrupts` |
| `highest_evidence_level` | Priority: `clinical` > `intervention` > `observational` > `mechanistic` |
| `overall_confidence` | See confidence roll-up below |
| `evidence_summary` | Author or auto-draft one integrative sentence |
| `contributing_pms` | All child PM rows for this phenome |

### Overall confidence roll-up

Numeric weights: `low`=1, `low-medium`=1.5, `medium`=2, `high`=3.

1. Start from the **maximum** child PM confidence for the phenome.
2. If **≥2 PMs** map to the same phenome with `relationship_type` in (`supports`, `modulates`), you may raise overall confidence by **one step** (e.g. low→low-medium, medium→high).
3. **Cap at `high`**.
4. Overall confidence must **not exceed `high`**.
5. A single low-confidence PM must not produce `high` overall confidence.

---

## Page rendering contract

### PM — `## 2. Target Functional Outcome / Phenome`

Placement: immediately after `## 1. Definition`, before Intervention Breakdown.

Structure:

1. Canonical disclaimer paragraph
2. For each relationship: `<details>` with summary **`<Target Phenome> — <relationship_type>`**
3. Inside dropdown: Confidence, Evidence Level, Rationale, Key References (linked)

Optional summary table may precede dropdowns when ≥2 mappings exist.

### FM — `## 2. Connected Phenomes / Functional Outcomes`

Placement: immediately after `## 1. Definition`, before Intervention Breakdown.

Structure:

1. Canonical disclaimer paragraph
2. Roll-up markdown table:

| Phenome | Connected PMs | Strongest Relationship | Highest Evidence Level | Overall Confidence | Evidence Summary |
|---------|---------------:|------------------------|------------------------|--------------------|------------------|
| Motivation | 3 | supports | mechanistic | medium | … |

3. Optional `<details>` per phenome listing `contributing_pms` bullets

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

Evidence Highlights: `### 5.1` under Mechanistic Basis (was `### 4.1`).

### FM renumbering

| Old § | New § |
|-------|-------|
| 1 Definition | 1 Definition |
| — | **2 Connected Phenomes / Functional Outcomes** |
| 2 Intervention Breakdown | 3 Intervention Breakdown |
| 3 Functional Role | 4 Functional Role |
| 4 Mechanistic Basis | 5 Mechanistic Basis |
| 5 Connected Mechanisms | 6 Connected Mechanisms |
| 6 References | 7 References |

---

## Spreadsheet columns (PM rows)

Add to `system/brs-spreadsheet-schema.md` ingestion:

| Column | Meaning |
|--------|---------|
| `phenome_relationships` | JSON/YAML array per data model above |
| `target_phenome` | Shortcut when one phenome per row extension |
| `phenome_relationship_type` | supports / disrupts / modulates / indirect |
| `phenome_confidence` | low / medium / high / low-medium |
| `phenome_evidence_level` | mechanistic / observational / intervention / clinical |
| `phenome_rationale` | Translational rationale text |

FM rows: `connected_phenomes` is **generated** from child PMs — do not hand-author unless overriding summary text.

---

## Graph database export (future)

Node types:

- `Mechanism` (`source_node`: PM or FM ID)
- `Phenome` (`target_phenome`)

Edge properties: `relationship_type`, `confidence`, `evidence_level`, `rationale`, `references`.

---

## Related schemas

- `system/primary-mechanism-schema.md` — PM §2
- `system/functional-mechanism-schema.md` — FM §2
- `scripts/lib/phenome-relationships.mjs` — validation and aggregation
