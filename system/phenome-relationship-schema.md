# Phenome Relationship Schema

Citation format for phenome `references`: **`system/brs-citation-reference-standard.md`** (`label` = `Author et al. (Year) — Topic`).

**Authoring and review procedure:** **`system/phenome-relationship-review-methodology.md`** — neuropsychiatric/neurocognitive phenome review system with ADHD (`TA001`) as the primary Version 1 validation use case (Phase 0 bibliography → Phase 1 PM review → Phase 2 FM review → Phase 3 independent phenome evidence review → Phase 4 audit & QC → human sign-off on rendered §3). This schema defines structure and validation; the methodology defines how mappings are researched, scoped, and approved.

## Purpose

**Target functional outcomes / phenomes** are emergent functional patterns (for example Motivation, Emotional Regulation, Sustained Attention). They must not be treated as simple tags or hard causal claims on PM/FM pages.

PM and FM pages remain **primarily biological**. Phenome mappings are **translational relationships** — evidence-weighted links between mechanisms and functional phenomes — stored in structured front matter and rendered in dedicated sections **after Definition**.

The **Phenome Registry Evidence Hierarchy** (below) governs how demonstrated outcomes are separated from inferential framework translations when assigning phenomes and setting confidence.

## Phenome assignment pipeline

Phenome mappings must be produced through a **sequential four-phase review workflow**. Each phase has a distinct question; do not skip phases or collapse mechanism plausibility into phenome demonstration.

```
Phase 1 — PM review          → candidate PM-level phenome mappings (no final confidence)
Phase 2 — FM review          → candidate FM-level functional outcomes (no final confidence)
Phase 3 — Independent phenome evidence review → mechanism validation + phenome validation → Biology → Phenome Confidence + Evidence Confidence (+ evidence_level audit)
Phase 4 — Audit & quality control             → validate registry output
```

The logical evidence sequence:

```
PM evidence
    ↓
FM evidence
    ↓
Phenome hypothesis (Phase 1 + Phase 2 candidates)
    ↓
Independent phenome evidence review (Phase 3)
    ↓
Audit & quality control (Phase 4)
```

| Phase | Question | What it is | What it is not |
|-------|----------|------------|----------------|
| **1. PM review** | What phenomes could this mechanism plausibly influence? | Mechanism depth, evidence depth, candidate phenome hypotheses | Final confidence; demonstrated outcome evidence |
| **2. FM review** | Which phenomes emerge from the integrated FM state? | Functional coherence, PM dependency, candidate FM outcomes | A roll-up of PM §3 dropdowns; final confidence |
| **3. Independent phenome evidence review** | After mechanism and phenome validation, how strongly does this PM/FM relate to this phenome — and how convincing is the relationship evidence? | Dedicated literature review; [Phase 3 review stack](#convergent-translational-evidence-phase-3) | Re-reading mechanism prose only; intervention RCTs as sole Evidence Confidence driver |
| **4. Audit & QC** | Are Phase 3 outputs valid and consistent? | Reference, confidence, registry, duplication checks | New phenome evidence generation |

**Critical separation:** Phases 1–2 establish **biological evidence and candidate hypotheses**. Phase 3 walks the **[review stack](#convergent-translational-evidence-phase-3)** — mechanism validation, phenome validation, then assigns **Biology → Phenome Confidence**, **Evidence Confidence**, and **Evidence Level** (audit) as **separate fields**. Phase 4 validates registry integrity only.

A mapping must not be published to `phenome_relationships` or `functional_outcome_context` until Phase 3 is complete and Phase 4 validation passes. Empty §3 is valid when Phase 3 does not support a hypothesis.

**Procedure detail:** `system/phenome-relationship-review-methodology.md` — full integrated PM/FM workflow (Phases 0–4).

**Tooling (Phase 4):**

```bash
npm run phenome:audit-evidence          # evidence level / inferential checks
npm run phenome:audit-evidence -- --fix # correct overstated evidence_level only
npm run bib:validate
npm run phenome:sync
npm run phenome:index
npm run phenome:validate
npm run mechanisms:validate
```

## Layer model (page structure)

**Terminology (v1.2):** Section heading **Phenome Connections** is being renamed to **Translational Phenome Connections** across PM, FM, and SM pages. Until templates and pages are updated, both names refer to the same §3 contract below.

| Layer | Page | §3 section (canonical) | Confidence type |
|-------|------|------------------------|-----------------|
| **PM** | Primary Mechanism | Translational Phenome Connections | Biology → Phenome Confidence (mechanism-level) |
| **FM** | Functional Mechanism | Translational Phenome Connections | Biology → Phenome Confidence (integrated-system) |
| **Phenome** (future) | Phenome graph pages | Full aggregation | Cross-system / graph |

PM pages hold detailed `phenome_relationships`. FM pages hold a **concise** `functional_outcome_context` (2–3 outcomes normally; max 4). Full PM → phenome roll-up graphs belong on future phenome pages — **not** on FM pages.

When an FM has **exactly one** child PM (`mechanisms_covered.length === 1`), §3 must follow the **[Single-PM FM (1:1) rule](#single-pm-fm-11-rule)** below instead of inventing a separate integrative outcome set.

## Core principle

| Layer | Role |
|-------|------|
| **§1 Definition** | Biological mechanism only — no phenome outcome claims |
| **§2 Primary Biological Effects** | Directional ↑/↓ summary only |
| **§3 Phenome layer** | Translational relationships (this schema) |
| **§4+** | Intervention, mechanistic basis, levers, etc. |

## Canonical disclaimer — PM §3

> These mappings are translational relationships, not single-mechanism outcome claims. Phenomes are emergent functional patterns supported by multiple interacting PMs across the BRAIN Framework. **Biology → Phenome Confidence** reflects how directly this mechanism's biology would be expected to affect the phenome within BRAIN architecture — not dietary treatment efficacy. **Evidence Confidence** (below Key References) reflects how convincing the attached evidence is for the Biology → Phenome relationship on that row.

## Canonical disclaimer — FM §3

> These outcomes describe translational contexts for the FM as an integrated biological capacity. They are not single-mechanism treatment claims. **Biology → Phenome Confidence** reflects biological relevance to each outcome — not proof that diet or lifestyle alone will improve it. **Evidence Confidence** (below Key References) reflects how convincing the attached evidence is for the Biology → Phenome relationship on that row. **FM confidence uplift:** FM confidence may exceed that of any individual child PM only where multiple PMs converge on the same phenome and the integrated FM biology provides additional biological rationale (biological uplift) beyond the individual mechanisms.

## Empty state

**PM:** `No direct functional outcome relationship currently mapped.`

**FM:** `No functional outcome context currently mapped.`

Do not invent provisional mappings to avoid an empty section.

When running a formal review, empty §3 is valid until Phase 3 approves a candidate — see the methodology pilot workflow.

---

## Review methodology (v4)

| Topic | Document |
|-------|----------|
| ADHD-scoped review process | `system/phenome-relationship-review-methodology.md` |
| Evidence hierarchy (measured vs inferred; confidence vs evidence level) | [Phenome Registry Evidence Hierarchy](#phenome-registry-evidence-hierarchy) (this document) |
| Assignment pipeline | [Phenome assignment pipeline](#phenome-assignment-pipeline) (this document) |
| Bibliography readiness | Phase 0 — `npm run bib:validate` |
| PM candidate phenome hypotheses | Phase 1 — mechanism depth, plausibility; **no final confidence** |
| FM candidate functional outcomes | Phase 2 — integrated-state review; **no final confidence** |
| Biology → phenome validation + evidence level | Phase 3 — dedicated literature review per phenome |
| Registry validation | Phase 4 — audit tooling, duplication review |

**Assignment rule (v1):** Mechanism → **ADHD-relevant** registry phenome only. Secondary therapeutic-area literature may support plausibility but must not create mappings without ADHD-relevant justification.

### Schema evolution register

The review methodology v1 proposes additional `relationship_type` and `evidence_level` values not yet enforced by validation. Until extended, map candidates using the translation tables in the methodology doc.

| Field | Enforced today | Proposed (review v1) |
|-------|----------------|----------------------|
| `relationship_type` | `supports`, `disrupts`, `modulates`, `indirect` | add `contributes_to`, `contextual` |
| `evidence_level` | `mechanistic`, `observational`, `intervention`, `clinical` | Human Outcome, Human Mechanistic, Preclinical, Theoretical, Mixed |

Do not use proposed values in PM front matter until `scripts/lib/phenome-relationships.mjs` and this schema are updated together.

---

## Data model — PM (`phenome_relationships`)

Authoritative source for PM pages. Graph-database ready.

```yaml
phenome_relationships:
  - source_node: "BRS1-FM1-PM3"           # optional; defaults to pm_id
    target_phenome: "Motivation"
    relationship_type: supports           # supports | disrupts | modulates | indirect
    confidence: medium                    # Biology → Phenome Confidence: low | medium | high | low-medium
    evidence_level: mechanistic           # mechanistic | observational | intervention | clinical
    evidence_confidence: low-medium       # Evidence Confidence: low | low-medium | medium | high (from Key References)
    rationale: >-
      Testosterone signalling is associated with drive, effort and goal-directed behaviour.
    references:
      - index: 1
        label: "Celec et al. (2015)"
        citation_key: celec_testosterone_brain_behavioral_functions_2015
        href: "/docs/papers/BRAIN-Diet-References#celec_testosterone_brain_behavioral_functions_2015"
        data_level: Mechanistic
```

### PM field rules

| Field | Required | Allowed values |
|-------|----------|----------------|
| `target_phenome` | Yes | Title-case phenome label (stable string for graph export) |
| `relationship_type` | Yes | `supports`, `disrupts`, `modulates`, `indirect` |
| `confidence` | Yes | `low`, `low-medium`, `medium`, `high` — **Biology → Phenome Confidence** (framework relevance; not intervention efficacy) |
| `evidence_level` | Yes | `mechanistic`, `observational`, `intervention`, `clinical` — evidence types supporting the biology → phenome link |
| `evidence_confidence` | Yes | `low`, `low-medium`, `medium`, `high` — **Evidence Confidence** (strength of attached Key References; independent of biology confidence) |
| `confidence_disparity_note` | When Evidence Confidence > Biology confidence | One sentence explaining why attached evidence strength exceeds biological-centrality score |
| `rationale` | Yes | One or two sentences; mechanistic/translational, not diagnostic. When Biology → Phenome Confidence exceeds Evidence Confidence, include [evidence–biology gap disclosure](#evidencebiology-gap-disclosure-rationale-standard). |
| `references` | Recommended | Same shape as PM `references`; must resolve in `static/bibtex/BRAIN-diet.bib` when cited |
| `references[].data_level` | Recommended | Per-study data type label — see [Reference data levels](#reference-data-levels) |
| `source_node` | Optional | Defaults to `pm_id`; use for graph export |

### PM rules

1. A PM may map to **multiple** phenomes.
2. Do not restate phenome mappings inside §1 Definition.
3. Mappings may be **provisional** during Phases 1–2; reflect final confidence and evidence level honestly after Phase 3.
4. Do not use phenomes as mechanism tags in Definition or Primary Biological Effects.
5. Apply the [Phenome Registry Evidence Hierarchy](#phenome-registry-evidence-hierarchy): distinguish measured outcomes from framework translations in `rationale`; do not list a citation as primary support unless it assessed that phenome domain.

---

## Data model — FM (`functional_outcome_context`)

FM pages describe the **main functional outcomes most relevant to the FM as an integrated biological capacity**. This is **not** a roll-up table of all child PM phenome mappings.

```yaml
functional_outcome_context:
  - outcome_name: "Emotional Regulation"
    confidence: medium                 # Biology → Phenome Confidence: low | low-medium | medium | high
    evidence_confidence: low-medium      # Evidence Confidence (from Key References)
    synthesis: >-
      One or two sentences integrating across child PMs without listing them.
    references:
      - label: "Sarkar et al. (2020)"
        citation_key: sarkar_microbiome_social_behaviour_2020
        href: "/docs/papers/BRAIN-Diet-References#sarkar_microbiome_social_behaviour_2020"
        data_level: Mechanistic
```

### FM field rules

| Field | Required | Notes |
|-------|----------|-------|
| `outcome_name` | Yes | Human-readable integrated outcome label |
| `confidence` | Yes | Biology → Phenome Confidence (integrated-system); may exceed child PM confidence **only when multiple PMs converge** on the same phenome with Phase 3 justification (not on 1:1 FM→PM instances) |
| `evidence_confidence` | Yes | Strength of attached Key References (independent of biology confidence) |
| `confidence_disparity_note` | When Evidence Confidence > Biology confidence | One sentence explaining why attached evidence strength exceeds biological-centrality score |
| `synthesis` | Yes | 1–2 sentences; do not list child PMs. When Biology → Phenome Confidence exceeds Evidence Confidence, include [evidence–biology gap disclosure](#evidencebiology-gap-disclosure-rationale-standard). |
| `references` | Recommended | Key references only; must resolve in bibliography when cited |
| `references[].data_level` | Recommended | Per-study data type label — see [Reference data levels](#reference-data-levels) |

### FM rules

1. Include **normally 2–3** outcomes; **absolute maximum 4**.
2. Do **not** list every child PM.
3. Do **not** repeat PM-level phenome dropdown content.
4. Do **not** present outcomes as direct treatment claims.
5. Do **not** use `connected_phenomes` on FM pages (deprecated for publication).
6. Apply the [Phenome Registry Evidence Hierarchy](#phenome-registry-evidence-hierarchy): FM `synthesis` must identify inferential framework translations explicitly when primary citations did not measure the phenome.
7. **FM confidence uplift (multi-PM only):** FM confidence may exceed that of any individual child PM only where multiple PMs converge on the same phenome and the integrated FM biology provides additional biological rationale (biological uplift) beyond the individual mechanisms.

### FM confidence uplift (multi-PM only)

FM **Biology → Phenome Confidence** may exceed that of any individual child PM **only when both of the following hold**:

1. **Multiple PM convergence** — two or more child PMs map the same registry phenome.
2. **Integrated biological rationale** — the FM as an integrated capacity provides additional biological uplift beyond what any single PM establishes alone (not merely FM §4.2 prose restated at higher level).

FM §4.2 mechanism prose alone, FM §4.4 outcome evidence alone, or listing the same phenome on multiple PMs **without** integrative biological uplift does **not** justify FM confidence above child PM levels.

### Single-PM FM (1:1) rule

When `mechanisms_covered` contains **exactly one** PM, the FM is a **1:1 FM → PM** instance. The FM does not integrate across multiple mechanisms at the phenome layer; the emergent FM state maps directly onto that PM.

| Layer | Requirement |
|-------|-------------|
| **Outcome set** | `functional_outcome_context[].outcome_name` must match the sole child PM’s `phenome_relationships[].target_phenome` **exactly** (same labels, same count). |
| **Confidence** | Each FM outcome `confidence` must match the corresponding PM `confidence`. |
| **Synthesis** | Rewrite at FM integrative level (1–2 sentences); do **not** copy PM `rationale` verbatim. |
| **References** | FM outcome `references` should draw from the same citation keys as the matching PM phenome mapping. |
| **Empty state** | If the sole child PM has no `phenome_relationships`, FM §3 uses the empty state (`No functional outcome context currently mapped.`). |

**What changes vs multi-PM FMs:** do **not** add FM-only phenomes, merge phenomes, or raise/lower confidence because of “FM integration”. Convergence-based confidence uplift applies only when **multiple** child PMs support the same phenome.

**What stays the same:** FM §3 still uses `<details>` dropdowns per outcome (same interaction pattern as PM §3; summary shows outcome name only), the FM disclaimer, and no contributing-PM lists.

**Canonical example:** `docs/biological-targets/brs4/fm4/brs4-fm4-mitochondrial-capacity-expansion-and-adaptation.mdx` with child `BRS4-FM4-PM9`.

**Enforcement:** `npm run mechanisms:validate` calls `validateSinglePmFmOutcomeAlignment` in `scripts/lib/phenome-relationships.mjs` when an FM page has exactly one `mechanisms_covered` entry.

---

## Reference data levels

Each entry in `references` (PM `phenome_relationships` and FM `functional_outcome_context`) may include **`data_level`** — a short label stating what kind of evidence that study contributes. This is rendered after the citation label in §3 Key References:

- Huss et al. (2010) — **Human Study**
- McNamara & Carlson (2006) — **Animal Data**
- Pei-Chen Chang (2021) — **Mechanistic**

### Allowed values

| Value | Meaning |
|-------|---------|
| Human Outcome | Human clinical or functional outcome data |
| Human Study | Human study (intervention, cohort, or review of human data) |
| Human Mechanistic | Human study with mechanistic endpoints |
| Animal Data | Animal-model evidence |
| Preclinical | Animal or in vitro evidence |
| Mechanistic | Established pathway plausibility or mechanistic review |
| Theoretical | Model-based inference only |
| Cellular / Molecular | Cell or molecular biology |
| Mixed | Multiple evidence levels combined |

Curated defaults live in `scripts/lib/reference-data-levels.mjs` (`CURATED_REFERENCE_DATA_LEVELS`). Backfill with:

```bash
npm run phenome:migrate-ref-levels
npm run phenome:sync -- --sync
```

### Evidence vs phenome boundary

| Section | Content |
|---------|---------|
| **§3 Phenome Connections** (PM) / **§3 functional_outcome_context** (FM) | Translational outcome mappings — ADHD hub rows, attention, emotional dysregulation, condition-specific biomarkers, intervention outcomes |
| **§5.1 Evidence Highlights** (PM) / **§4.4 Evidence Highlights** (FM) | Mechanism-qualifying findings only — delivery forms, cofactors, substrate biochemistry, pathway interpretation |

BRS hub ADHD dropdown tables feed **phenome review** (`system/phenome-relationship-review-methodology.md`), **not** `scripts/lib/pm-evidence-highlights.mjs`.

### §5.1 populate: `npm run mechanisms:populate-evidence -- --brs BRS3 --force`. FM §4.4 rolls up child PM §5.1 entries (mechanism-only): `npm run mechanisms:populate-fm-evidence -- --force`.

---

## Phenome Registry (canonical phenome definitions)

Stable phenome IDs, names, and descriptions live in **`src/data/phenome-registry.json`** — hand-edited with registry approval. Do **not** auto-create registry entries from PM edges.

### Therapeutic areas (first-class registry entities)

Therapeutic areas (`TA001`–`TA007`) tag **where each phenome is clinically relevant** across neuropsychiatric and neurocognitive health. They are **not** phenome labels and must not duplicate the `PH00x` vocabulary.

| Field | Required | Notes |
|-------|----------|-------|
| `id` | Yes | Stable ID (`TA001` …) |
| `name` | Yes | Human-readable label |
| `slug` | Yes | URL-safe slug |
| `description` | Yes | Stable TA definition |
| `status` | Yes | `active` \| `deprecated` |
| `primaryWorkedExample` | No | `true` for `TA001` (ADHD) in v1 |

`meta.primaryTherapeuticAreaId` points to the primary validation TA (`TA001`).

### Registry entry fields (phenomes)

| Field | Required | Notes |
|-------|----------|-------|
| `id` | Yes | Stable ID (`PH001` …) |
| `name` | Yes | Human-readable label; must match PM `target_phenome` / FM `outcome_name` exactly when used |
| `slug` | Yes | URL-safe slug |
| `description` | Yes | General, stable phenome definition — no BRS-, mechanism-, or ADHD-specific claims |
| `publicSummary` | Yes | Plain-language summary for public pages |
| `primaryDomains` | Yes | Tag list (e.g. `energy`, `cognition`) |
| `therapeuticAreaIds` | Yes | Array of `TA00x` IDs — all active phenomes include `TA001`; add other TAs where the functional domain is clinically relevant |
| `status` | Yes | `active` \| `deprecated` |
| `evidence_confidence` | No | **Phenome Evidence Confidence** — `low` \| `low-medium` \| `medium` \| `high`; strength of the registry foundational evidence stack for this phenome construct. **Not** PM/FM Biology → Phenome Confidence on mechanism rows |
| `evidence_confidence_note` | No | Short rationale for the phenome-level Evidence Confidence score |
| `provenance` | No | BRAIN development origin, optional `developmentNote`, `relatedPhenomeIds` — phased enrichment |
| `crossReferences` | No | Optional external framework tags: `rdoc_domains`, `icf_domains`, `promis_measures`, `hpo_terms`, `dsm_icd_context` (string arrays) |
| `evidence` | No | Foundational evidence layers (see below) — **not** duplicated on PM/FM pages |

### Registry meta — phenome development provenance

| Field | Required | Notes |
|-------|----------|-------|
| `meta.phenomeDevelopment` | No | Portal-level statement: BRAIN-developed taxonomy benchmarked against external frameworks (e.g. RDoC) for validation, not derivation |
| `meta.provenanceSchemaVersion` | No | Version of optional provenance/evidence field shapes |
| `meta.benchmarkedFrameworks` | No | Registry-level list of external frameworks used during taxonomy review |

### Phenome provenance (`provenance`)

| Field | Required | Notes |
|-------|----------|-------|
| `frameworkOrigin` | No | Expected `"BRAIN"` when present |
| `developmentNote` | No | Phenome-specific development / benchmarking note |
| `relatedPhenomeIds` | No | Stable `PH00x` IDs for related-but-distinct phenomes (complements `reviewFlags`) |

### Phenome cross-references (`crossReferences`)

Optional string arrays. Used for **benchmarking and construct alignment** — not as the defining taxonomy.

| Field | Notes |
|-------|-------|
| `rdoc_domains` | NIH RDoC domain / construct labels |
| `icf_domains` | WHO ICF activity / participation domains |
| `promis_measures` | PROMIS measure names or IDs where mapped |
| `hpo_terms` | Human Phenotype Ontology terms where mapped |
| `dsm_icd_context` | Diagnostic context labels (not disease phenome labels) |

### Phenome foundational evidence (`evidence`)

Landmark papers live in the **registry only**. PM/FM `phenome_relationships` and `functional_outcome_context` rows link to registry phenome IDs and carry **relationship-specific** citations — do not duplicate registry landmark lists on every mechanism page.

**Phenome Evidence Confidence** (`evidence_confidence` on the registry entry, sibling to `evidence`) scores how convincing the **combined foundational evidence stack** is for this phenome as a functional construct. It is independent of:

- **Biology → Phenome Confidence** on PM/FM rows (mechanism centrality within BRAIN)
- **Evidence Confidence** on PM/FM rows (strength of refs for that specific mechanism→phenome link)

| Layer | Purpose |
|-------|---------|
| `construct_landmark_papers` | Defines or validates the phenome as a cognitive, behavioural, emotional, social, or physiological construct |
| `biology_to_phenome_landmark_papers` | Links biological mechanisms or systems to the phenome |
| `nutrition_to_biology_landmark_papers` | Dietary, nutrient, or metabolic modulation of relevant biology |

Each landmark paper object:

| Field | Required | Notes |
|-------|----------|-------|
| `label` | Yes | Display citation label |
| `citation_key` | Recommended | `BRAIN-diet.bib` key |
| `href` | Recommended | `/docs/papers/BRAIN-Diet-References#<key>` |
| `note` | No | Short rationale for why this paper is landmark for the layer |

Validation: `npm run phenome:validate` — optional fields validated when present; omission does not fail the registry (phased enrichment).

### Public page

**`/docs/phenomes/index`** — Phenome development provenance, therapeutic area table, filterable registry overview. **`/docs/phenomes/details/<ph-id>-<slug>`** — per-phenome detail subpages (provenance, cross-references, foundational evidence, connected mechanisms) generated via `npm run phenome:generate-detail-pages`. Renders from `phenome-registry.json` + `phenome-relationships.generated.json`. Relationship-specific evidence rationales stay on PM/FM pages.

### Registry review flags

Near-duplicate or related-but-distinct phenome pairs are listed in `phenome-registry.json` → `reviewFlags` for manual review (not auto-merged).

---

## Phenome Registry Evidence Hierarchy

The purpose of the Phenome Registry is to map biological mechanisms to functional outcomes while maintaining clear separation between:

1. **Biology → Phenome Confidence** (`confidence` in front matter) — framework relevance
2. **Evidence Level** (`evidence_level`) — quality and type of evidence supporting that link
3. **Evidence Confidence** (`evidence_confidence`) — how convincing the attached evidence is for the **Biology → Phenome relationship** on that row (not intervention RCT count; rendered below Key References)
4. **Framework translations** — inferential mappings that must be labelled in rationale/synthesis

Registry phenome labels in examples below use canonical `name` values from `src/data/phenome-registry.json` where they exist (e.g. **Focus / Attention Stability**, **Sleep / Calming Tone**, **Behavioural Activation**).

### Biology → Phenome Confidence vs Evidence Level

These are **not interchangeable**.

| Field | Question it answers | What it is not |
|-------|---------------------|----------------|
| **`confidence`** | How centrally does successful operation of this PM/FM contribute to this phenome within BRAIN? | Dietary intervention efficacy; RCT effect size |
| **`evidence_level`** | What types of studies support this link (mechanistic → clinical)? | Biological importance of the mechanism itself |
| **`evidence_confidence`** | How convincing is the evidence that this PM/FM biology relates to this phenome on this row? | Intervention trial count; dietary RCT efficacy; Biology → Phenome Confidence (independent dimension) |

A mechanism may legitimately have **high Biology → Phenome Confidence** with **moderate Evidence Level** and **limited dietary intervention evidence** — without contradiction.

**Example — PM3 Noradrenergic Signalling → Focus / Attention Stability**

| Field | Value | Reason |
|-------|-------|--------|
| Biology → Phenome Confidence | **high** | Noradrenergic signalling is a core determinant of attentional regulation in ADHD neuroscience and clinical pharmacology |
| Evidence Level | **observational** (Human Mechanistic) + clinical pharmacology framing | Human mechanistic ADHD literature and pharmacology support the link |
| Evidence Confidence | **low** (mechanistic refs only on row) | Key References establish mechanism and phenome context separately — no direct mechanism↔phenome bridge on the row |

### Principle 1: Measured outcomes take precedence (for citations and Evidence Level)

Phenome assignments should be based primarily on outcomes **directly measured** in the cited evidence.

Examples:

| Measured outcome (study) | Registry phenome |
|--------------------------|------------------|
| Attention scales | Focus / Attention Stability |
| Emotional regulation scales | Emotional Regulation |
| Hyperactivity / behavioural symptom scales | Behavioural Activation |
| Sleep outcomes | Sleep / Calming Tone |

A study should **not** be used as primary support for a phenome that was not directly assessed.

When a citation is listed under a phenome mapping, at least one reference in that row should measure (or explicitly report) that phenome domain **when claiming high Evidence Confidence from outcome demonstration**. Other references may support **translational mechanism or phenome-domain context** if the rationale identifies their role in a convergent evidence stack (see [Convergent translational evidence](#convergent-translational-evidence-phase-3)).

### Principle 2: Mechanistic translation is permitted

Where a biologically plausible relationship exists but direct outcome measurement is absent, a phenome may be assigned as a **framework translation**.

Examples:

| Mechanism biology | Registry phenome (inferential) |
|-------------------|-------------------------------|
| Membrane DHA integration | Cognitive Clarity |
| Mitochondrial efficiency | Cognitive Energy Stability |
| Neuroinflammatory load | Stress Resilience |

These mappings must be clearly identified as inferential in the **`rationale`** (PM) or **`synthesis`** (FM) — e.g. *framework translation from membrane/synaptic signalling competence* — not presented as directly demonstrated outcomes.

### Convergent translational evidence (Phase 3)

Many valid PM → phenome rows are supported by a **stack** of complementary evidence types, not a single intervention RCT. This is **convergent translational evidence** — established biology integrated across mechanism validation, phenome validation, and framework scoring. **Do not describe it as merely “plausible” or “speculative”** when the stack includes validated pathway biology, ADHD-relevant phenome literature, and explicit integrative reasoning.

**Phase 3 review stack** (internal sequence — top to bottom is review order; bottom two are published scores):

```
Mechanism validation          →  Do attached refs validate PM biology? (e.g. serotonin in ADHD)
        ↓
Phenome validation            →  Do attached refs validate the phenome domain in the target population? (e.g. emotion dysregulation in ADHD)
        ↓
Biology → Phenome Confidence  →  How centrally does this PM/FM biology relate to this phenome within BRAIN? (`confidence`)
        ↓
Evidence Confidence           →  How convincing is the evidence for that Biology → Phenome relationship? (`evidence_confidence`)
```

Steps 1–2 are **validation questions** (what the literature establishes). Steps 3–4 are **published confidence fields** (how the reviewer scores the row after validation).

That four-step structure **is translational biology** — not keyword matching and not guesswork.

| Language | Use when |
|----------|----------|
| **Convergent translational evidence** | Mechanism validation + phenome validation + explicit framework integration (ADHD-scoped) |
| **Framework translation** (Principle 2) | Genuinely inferential or distal jumps (e.g. membrane integration → Cognitive Clarity) — label explicitly |
| **Speculative / weak coupling** | Distal chain with little established biology — prefer empty §3 or **low** biology confidence |

**Worked example — BRS1-FM1-PM4 Serotonergic Signalling → Emotional Regulation**

| Review step | References (illustrative) | What it validates |
|-------------|---------------------------|-------------------|
| **Mechanism validation** | Oades (2010); Banerjee & Nandagopal (2015) | Serotonin biology in ADHD |
| **Phenome validation** | Shaw et al. (2014) | Emotion dysregulation as ADHD phenotype |
| **Biology → Phenome Confidence** | Rationale on row | Serotonergic signalling as core substrate for affective/inhibitory control → **high** (biological relevance, not dietary efficacy) |
| **Evidence Confidence** | Full reference stack | No direct mechanism↔phenome bridge on row → **low–medium** (not “only plausible”) |

### Principle 3: Biology → Phenome Confidence reflects framework relevance

`confidence` must reflect the **biological relevance** of the PM/FM to the phenome within the BRAIN Framework — not dietary intervention efficacy, reference count, or whether attached Key References directly measure the phenome outcome.

#### Functional dependency heuristic (assign before reviewing references)

Biology → Phenome Confidence is calibrated from **functional biological dependency**, not from the quantity or type of attached evidence. Apply this heuristic **before** assigning `confidence`; review Key References only when assigning `evidence_confidence` and `evidence_level`.

1. **Ignore** attached references initially.
2. **Ignore** whether dietary intervention studies exist.
3. Read only: the **PM/FM definition**, the **biological function**, and the **mechanism boundary**.
4. Ask:

> If this PM became substantially dysfunctional in isolation, would impairment of this phenome be expected as a **direct biological consequence**?

| Confidence | Functional dependency |
|------------|----------------------|
| **high** | Primary biological determinant of the phenome |
| **medium** | Major contributory determinant |
| **low-medium** | Established but indirect, modulatory, or one integrative step removed |
| **low** | Indirect or conditional contributor — prefer empty §3 when coupling is weak |

Attached references must **never reduce** Biology → Phenome Confidence when the biological relationship itself is fundamental. Weak or mechanistic-only refs may still justify **low** Evidence Confidence — that is a separate dimension.

**Worked example — BRS1-FM4-PM8 GABA Synthesis Capacity → Sleep / Calming Tone**

| Step | Input | Assignment |
|------|-------|------------|
| Functional dependency (refs ignored) | PM converts glutamate to GABA — the principal inhibitory neurotransmitter; definition cites calm, control, and resistance to overstimulation | **high** — adequate GABA synthesis is a principal biological contributor to inhibitory calming neurophysiology |
| Evidence Confidence (refs reviewed) | Cataldo et al. (2024) — PLP-dependent glutamate decarboxylase biochemistry only; no sleep-outcome measurement on row | **low** — mechanistic pathway support without direct mechanism↔phenome bridge |
| **Rationale disclosure** | Biology **high**, Evidence **low** | State the evidence gap **and** clarify it does not weaken biological centrality — see [evidence–biology gap disclosure](#evidencebiology-gap-disclosure-rationale-standard) |

| Confidence | Assignment rule (summary) |
|------------|---------------------------|
| **high** | Core, validated biological pathway for this phenome (e.g. noradrenergic signalling → attention; serotonin → emotional regulation; E/I balance → attention in ADHD) |
| **medium** | Established but indirect, modulatory, or one integrative step removed (substrate → signalling; integrated FM capacity → phenome) |
| **low-medium** | Convergent translational evidence with one or more inferential steps; not yet core pathway status |
| **low** | Distal, speculative, or weak biological coupling — prefer empty §3 |

FM confidence may exceed that of any individual child PM only where multiple PMs converge on the same phenome and the integrated FM biology provides additional biological rationale (biological uplift) beyond the individual mechanisms — not because FM §4.2 mechanism prose alone is stronger.

**Evidence Level** is assigned separately using the reference profile and literature types (mechanistic, human mechanistic, human observational, intervention, clinical pharmacology, meta-analysis). See Phase 3 in the methodology doc.

### Principle 3c: Evidence Confidence reflects Biology → Phenome demonstration

`evidence_confidence` answers: **How convincing is the evidence for the Biology → Phenome relationship on this row?**

It is **not** a count of dietary intervention RCTs. Human evidence that **directly strengthens the mechanism ↔ phenome link** — including biomarker–phenome associations, neuroimaging (e.g. serotonergic receptor occupancy ↔ emotional dysregulation), pharmacology, or measured phenome outcomes — can raise Evidence Confidence without any intervention study on the row.

Phase 3 scores from the **attached Key References** and their demonstrated link to the phenome. `data_level` profiles (Mechanistic, Human Mechanistic, Human Outcome, etc.) inform the score but do not replace reviewer judgment about whether each ref actually supports the **relationship**, not just the mechanism or phenome in isolation.

Rendered **below Key References** in §3 so readers see biology relevance first, then relationship evidence strength.

| Evidence Confidence | Typical evidence for the Biology → Phenome relationship |
|---------------------|--------------------------------------------------------|
| **high** | Strong convergent human evidence directly linking mechanism biology to phenome variation (biomarker–phenome, imaging, pharmacology, and/or outcome studies on the row) |
| **medium** | Multiple human lines supporting the relationship; may include one direct human bridge study |
| **low-medium** | Convergent translational stack (mechanism + phenome-domain + framework reasoning) without direct mechanism↔phenome measurement on the row |
| **low** | Mechanistic/preclinical only; mechanism and phenome supported separately but not bridged |

**Intervention studies are one way to strengthen Evidence Confidence — not the definition of it.**

Evidence Confidence is scored **independently** from Biology → Phenome Confidence. It will **often** be equal to or lower than biology confidence (e.g. high pathway relevance with mechanistic refs only), but the reverse is also valid when human outcome evidence is stronger than the contributory biological role (e.g. Biology **medium**, Evidence **high**).

When Evidence Confidence **exceeds** Biology → Phenome Confidence on a row, Phase 3 must add `confidence_disparity_note` explaining the divergence. `npm run phenome:audit-evidence` flags missing notes; it does not auto-correct scores.

#### Evidence–biology gap disclosure (rationale standard)

When **Biology → Phenome Confidence exceeds Evidence Confidence** on a row, the **`rationale`** (PM) or **`synthesis`** (FM) must make the separation explicit for readers. Weak or absent mechanism↔phenome demonstration must **not** be read as weak biological coupling.

**Required pattern** (adapt to the row):

> Evidence Confidence is [level] because [specific gap on this row — e.g. refs establish pathway biochemistry only, no direct phenome measurement]; **not because the biological relationship is weak**.

| Dimension gap | Where to disclose |
|---------------|-------------------|
| Biology **higher** than Evidence | `rationale` / `synthesis` prose (this standard) |
| Evidence **higher** than Biology | `confidence_disparity_note` (front matter) |

Phase 3 may assign `evidence_confidence` explicitly; `npm run phenome:sync` backfills from references when missing.

### Principle 3b: Evidence Level reflects demonstration quality

`evidence_level` describes **how well the biology → phenome link has been demonstrated** — not the biological centrality of the mechanism.

| Schema value | Typical literature types |
|--------------|---------------------------|
| `mechanistic` | Pathway reviews, animal data, theoretical models |
| `observational` | Human mechanistic endpoints with **direct biomarker–phenome association** in ADHD-relevant cohorts (not pathway reviews alone) |
| `intervention` | Human intervention studies (not necessarily dietary) |
| `clinical` | Human outcome trials, clinical pharmacology, meta-analyses |

Dietary intervention evidence may remain limited without reducing Biology → Phenome Confidence.

### Principle 4: Upstream structural mechanisms require higher scrutiny

Structural, transport, substrate, and precursor mechanisms should not automatically receive phenome assignments.

Examples:

- Membrane integration
- Nutrient transport
- Substrate availability
- Cofactor sufficiency

These mechanisms often support Functional Modules rather than directly supporting a phenome.

Where no convincing phenome relationship exists, **empty §3** (`No direct functional outcome relationship currently mapped.` / `No functional outcome context currently mapped.`) is preferred over a weak assignment.

### Principle 5: ADHD-relevant human data takes priority

When available, **ADHD human evidence** should be prioritised over:

- Animal studies
- Ageing studies
- Neurodegeneration studies
- General cognitive-performance studies

Non-ADHD evidence may support **biology → phenome confidence** and **evidence level** when the pathway is conserved — but ADHD relevance must be stated in the rationale.

Aligns with therapeutic-area scope in `system/phenome-relationship-review-methodology.md`.

### Practical test (Phase 3)

For every phenome assignment, walk the **Phase 3 review stack**:

1. **Mechanism validation** — Do the attached references validate this PM/FM biology in ADHD-relevant context?
2. **Phenome validation** — Do the attached references validate this phenome domain in the target population?
3. **Biology → Phenome Confidence** — Apply the [functional dependency heuristic](#functional-dependency-heuristic-assign-before-reviewing-references) first (refs ignored); then assign `confidence`.
4. **Evidence Confidence** — Only now review Key References: how convincing is the evidence for that Biology → Phenome relationship on this row? (Assign `evidence_confidence`.)
5. **Evidence–biology gap disclosure** — When Biology confidence exceeds Evidence Confidence, state in `rationale`/`synthesis` why evidence is limited **and** that the gap is not weak biological coupling ([standard](#evidencebiology-gap-disclosure-rationale-standard)).
6. What **Evidence Level** do references support in front matter (`evidence_level` — audit field, not rendered in public §3)?
7. Is an inferential **framework translation** explicitly labelled where the link is multi-step?
8. Would an external neuroscientist agree this mechanism matters for this phenome — independent of diet trials?

Biology → Phenome Confidence and Evidence Confidence are scored **independently**. High biology confidence does not require a direct mechanism↔phenome bridge on the row.

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

`scripts/lib/phenome-relationship-index.mjs` builds `fmRollups` using `aggregateFmConnectedPhenomes`. FM MDX §3 remains hand-authored `functional_outcome_context`; full PM roll-up graphs belong on future phenome pages.

---

## Page rendering contract

### PM — `## 3. Phenome Connections`

Placement: immediately after `## 1. Definition`, before Intervention Breakdown.

Structure:

1. Canonical PM disclaimer paragraph
2. For each relationship: `<details>` with summary **`<Target Phenome> — <relationship_type>`**
3. Inside dropdown: Biology → Phenome Confidence, Rationale, Key References, **Evidence Confidence** (below references) via `<PhenomeBibLinks />`

`evidence_level` remains in front matter for Phase 3 audit and registry export — it is **not** rendered in public §3 (v4: readers see Biology confidence + Evidence Confidence only).

### FM — `## 3. Phenome Connections`

Placement: immediately after `## 1. Definition`, before Intervention Breakdown.

Structure:

1. Canonical FM disclaimer paragraph
2. For each outcome: `<details>` with summary **`<Outcome name>`**
3. Inside dropdown: Biology → Phenome Confidence, Synthesis, Key References, **Evidence Confidence** (below references) via `<PhenomeBibLinks />` (background tab)

**Forbidden on FM §3:** roll-up tables, contributing-PM lists, dropdowns that enumerate child PMs per phenome.

### SM-PHEN — retired

`SM-PHEN` pages are removed. Phenome interpretation is owned by the **Phenome Registry** and by PM/FM phenome mappings (`## 3. Phenome Connections` on PMs; FM `functional_outcome_context`). Do not author SM-PHEN §2 content.

---

## Section renumbering (PM Profile A)

| Old § | New § |
|-------|-------|
| 1 Definition | 1 Definition |
| 2 Functional Role | 2 Primary Biological Effects |
| — | **3 Phenome Connections** |
| 2 Intervention Breakdown | *(front matter only on FM)* |
| 3 Functional Role | *(absorbed into §2)* |
| 4 Mechanistic Basis | 4 Mechanistic Basis |
| 5 Connected BRS{N} Mechanisms | 5 BRS Pathways and Connections (6.1 pathways, 6.2 cross-BRS, 6.3 same-FM PMs) |
| 6 Connected Mechanisms | absorbed into §6.2 Connected BRS Mechanisms |
| 7 Dietary Levers | 7 Dietary Levers |
| 8 Lifestyle Levers | 8 Lifestyle Levers |
| 9 Scoreable | 9 Scoreable |
| 10 References | 10 References |

### FM renumbering

| Old § | New § |
|-------|-------|
| 1 Definition | 1 Definition |
| 2 Functional Outcome Context | 3 Phenome Connections |
| 3 Functional Role | 2 Primary Biological Effects |
| 4 Mechanistic Basis | 4 Mechanistic Basis |
| 5 Connected Mechanisms | 5 Connected Mechanisms |
| 6 References | 6 References |

---

## Spreadsheet columns (PM rows)

| Column | Meaning |
|--------|---------|
| `phenome_relationships` | JSON/YAML array per PM data model above |
| `target_phenome` | Shortcut when one phenome per row extension |
| `phenome_relationship_type` | supports / disrupts / modulates / indirect |
| `phenome_confidence` | Biology → Phenome Confidence: low / medium / high / low-medium |
| `phenome_evidence_confidence` | Evidence Confidence: low / medium / high / low-medium |
| `phenome_evidence_level` | mechanistic / observational / intervention / clinical |
| `phenome_rationale` | Translational rationale text |

FM rows: `functional_outcome_context` is **hand-authored** integrative synthesis (2–4 outcomes). Do not auto-generate FM §3 from child PM roll-ups. When the FM has **one** child PM, follow the **Single-PM FM (1:1) rule** above (matching phenome labels and confidence).

---

## Graph database export (future)

Node types:

- `Mechanism` (`source_node`: PM or FM ID)
- `Phenome` (`target_phenome` / `outcome_name`)

Edge properties: `relationship_type`, `confidence`, `evidence_level`, `rationale`, `references`.

Future phenome pages query both PM-level and FM-level relationships.

---

## Related schemas

- `system/primary-mechanism-schema.md` — PM §3
- `system/functional-mechanism-schema.md` — FM §3
- `scripts/lib/phenome-relationships.mjs` — validation and section rendering
