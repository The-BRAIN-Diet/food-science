# Phenome Relationship Review Methodology

**Version:** 4.0  
**Status:** Active  
**Therapeutic area scope (v1):** Neuropsychiatric and neurocognitive health — ADHD (`TA001`) primary worked example  

**Related contracts:**

- `system/phenome-relationship-schema.md` — data model, rendering, registry rules, **[Phenome Registry Evidence Hierarchy](phenome-relationship-schema.md#phenome-registry-evidence-hierarchy)**
- `system/functional-mechanism-schema.md` — FM §4 integrated narrative structure
- `system/fm-schema-rollout-sequence.md` — complete FM §4.4 on all FMs **before** phenome Phase 2 (FM review)
- `system/brs-citation-reference-standard.md` — citation format
- `src/data/phenome-registry.json` — canonical phenome vocabulary
- `src/data/phenome-relationships.generated.json` — generated PM → registry graph (do not hand-edit)

---

## Objective

Standardise how PM and FM phenome connections are **generated, reviewed, justified, and maintained**.

Move from:

**PM biology → manual phenome assignment**

to:

**Integrated PM/FM review → candidate phenome hypotheses → independent phenome evidence review → audit & publish**

(Full phase workflow: Phase 0 bibliography → Phase 1 PM review → Phase 2 FM review → Phase 3 independent phenome evidence review → Phase 4 audit & quality control → human sign-off on rendered §3.)

## Phenome development

Candidate phenomes were developed within the BRAIN Framework as functional outcome domains linking biological regulatory systems to clinically relevant cognitive, behavioural, emotional, social, and physiological capacities. During development, the registry was compared with established research frameworks, including the NIH Research Domain Criteria (RDoC), to identify omissions, reduce overlap between phenomes, and improve construct separation. These external frameworks were used to validate and refine the taxonomy rather than define its structure. The BRAIN Phenome Registry therefore represents an independent translational classification informed by, but not derived from, existing neuropsychiatric research frameworks.

**Canonical source:** `src/data/phenome-registry.json` → `meta.phenomeDevelopment` and per-phenome `provenance`, `crossReferences`, and `evidence` fields.

**Evidence layering:**

| Location | What it holds |
|----------|----------------|
| **Registry** (`evidence.*_landmark_papers` + `evidence_confidence`) | Foundational construct, biology→phenome, and nutrition→biology evidence per phenome; **Phenome Evidence Confidence** scores the combined stack |
| **PM `phenome_relationships`** | Mechanism-specific translational links with **Biology → Phenome Confidence** and row-level **Evidence Confidence** |
| **FM `functional_outcome_context`** | Integrated FM outcome synthesis with FM-level references |

Do **not** duplicate registry landmark lists on every PM page. Add relationship-specific citations on mechanism pages; enrich registry landmark layers during phased provenance review.

**RDoC-informed phenomes (v3+):**

| ID | Phenome | RDoC benchmark context |
|----|---------|------------------------|
| PH016 | Apprehensive Worry / Perseverative Thought | Negative Valence Systems (potential threat) + Cognitive Systems (perseverative thought) |
| PH017 | Pleasure & Interest Capacity | Positive Valence Systems (reward valuation / anhedonia) |
| PH018 | Social Engagement Capacity | Social Processes (affiliation, attachment, social communication) |

## Integrated PM/FM workflow

```
Phase 0 — Bibliography readiness (prerequisite)
    ↓
Phase 1 — PM review          → candidate PM-level phenome mappings (no final confidence)
    ↓
Phase 2 — FM review          → candidate FM-level functional outcomes (no final confidence)
    ↓
Phase 3 — Biology → phenome validation → Biology → Phenome Confidence + Evidence Level, retain/downgrade/upgrade/remove
    ↓
Phase 4 — Audit & quality control             → validate registry output (no new evidence)
```

**Critical rule:** Do not publish §3 mappings until Phase 3 is complete and Phase 4 validation passes.

### Phase summary

| Phase | Purpose | Final confidence? |
|-------|---------|-------------------|
| **0** | Bibliography consolidation | — |
| **1** | PM mechanism review → candidate phenome hypotheses | **No** |
| **2** | FM integrated-state review → candidate functional outcomes | **No** |
| **3** | Dedicated biology → phenome literature review per candidate phenome | **Yes** (confidence + evidence_level) |
| **4** | Reference, confidence, registry, and duplication checks | Validates only |

Functional convergence (Phase 2) is a **system-design validation layer**, not a confidence multiplier.

---

## Phenome assignment pipeline

The four review phases operationalise this logical sequence:

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

### Step 1 — PM evidence → Phase 1

**Question:** What phenomes could this specific mechanism plausibly influence, based on its biological depth and evidence base?

Review PM Definition, Primary Biological Effects, Mechanistic Basis, Evidence Highlights, levers, cofactors, Key Constraints, and references. Establish mechanism depth, evidence depth, and mechanism-to-phenome plausibility.

**Output:** Candidate PM-level phenome mappings. **No final confidence assignment.**

**Methodology phase:** [Phase 1 — PM review](#phase-1--pm-review).

### Step 2 — FM evidence → Phase 2

**Question:** When all child PMs are considered together, which phenomes emerge most strongly from the integrated FM state?

Review PM convergence, FM definition, FM functional narrative, FM failure modes, FM evidence highlights, and FM-level literature. Assess functional coherence, dependency structure, constraint satisfaction, and integrated phenome plausibility.

**Output:** Candidate FM-level functional outcomes. **No final confidence assignment.**

**Methodology phase:** [Phase 2 — FM review](#phase-2--fm-review).

### Step 3 — Phenome hypothesis (Phase 1 + Phase 2 combined output)

**Question:** Which registry phenome(s) might this PM/FM biology plausibly touch in ADHD-relevant contexts?

Draft **candidate** rows: `target_phenome` / `outcome_name`, `relationship_type`, provisional `rationale` / `synthesis`, and a shortlist of references. Label inferential candidates explicitly (framework translation).

**Output:** Unpublished hypothesis set awaiting Phase 3 validation. Hypotheses are **not** authoritative until Phase 3.

**Methodology:** End of Phase 1 + Phase 2 candidate generation. Do not assign final confidence or evidence level here.

### Step 4 — Biology → phenome validation → Phase 3

**Question:** How strong is the **biological relationship** between this PM/FM and this phenome — and what evidence types support it?

Conduct a **dedicated literature review** — not restricted to references already on PM or FM pages. For each candidate, search mechanism/FM terms + phenome terms + ADHD evidence + wider neuroscience + human physiology + clinical pharmacology where appropriate.

**Output:** Phenome-specific evidence summary, phenome-specific references, **Biology → Phenome Confidence**, **Evidence Level** (separate fields), and retain / downgrade / upgrade / remove decision per mapping.

**Methodology phase:** [Phase 3 — Biology → phenome validation](#phase-3--biology--phenome-validation).

Biology → Phenome Confidence reflects **framework relevance**, not dietary intervention efficacy.

### Step 5 — Audit & quality control → Phase 4

**Purpose:** Validate the integrity of Phase 3 outputs. Phase 4 does **not** generate phenome evidence.

**Methodology phase:** [Phase 4 — Audit & quality control](#phase-4--audit--quality-control) **plus**:

```bash
npm run phenome:audit-evidence
npm run phenome:audit-evidence -- --fix   # correct overstated evidence_level only
npm run bib:validate
npm run phenome:sync
npm run phenome:index
npm run phenome:validate
npm run mechanisms:validate
```

Reject or leave empty when Phase 3 or Phase 4 fails — prefer **empty §3** over a weak mapping.

---

### Three evidence layers (review questions)

The pipeline above operationalises three distinct review questions. Phases 1–2 gather biological evidence and generate hypotheses; Phase 3 validates phenome-outcome evidence; Phase 4 validates registry integrity.

| Layer | Phase | Question it answers | Primary review surfaces |
|-------|-------|---------------------|-------------------------|
| **PM evidence** | 1 | What phenomes could this mechanism plausibly influence? | PM Definition, Primary Biological Effects, Mechanistic Basis, Evidence Highlights, levers, KCs, references |
| **FM evidence** | 2 | Which phenomes emerge from the integrated FM state? | PM convergence, FM §4.1–4.4, FM §3 synthesis context |
| **Phenome hypothesis** | 1 + 2 | Which registry phenomes are candidates? | Registry definitions, PM+FM convergence, failure-mode language |
| **Phenome outcome evidence** | 3 | How strong is the biology → phenome link; what evidence types support it? | Targeted literature search, ADHD + neuroscience literature, Evidence Hierarchy |
| **Registry integrity** | 4 | Are published mappings consistent and valid? | Audit tooling, bibliography, duplicate mapping review |

**Previous methodology (v1–v2) was incomplete** because it treated FM pages primarily as integrative roll-ups of child PM mappings and assigned confidence during Phase 1–2. FM pages now contain a mature evidence and synthesis architecture and must be treated as a **first-class phenome evidence source**. Confidence assignment belongs in **Phase 3 only**.

The PM page (§3 Phenome Connections) remains the **primary mechanism-level review surface**. The FM page (§3 + §4) is the **primary integrated-state review surface**. The generated relationship index is implementation output, not the editorial workspace.

---

## Therapeutic area scope (Version 1)

### Lens: neuropsychiatric and neurocognitive health

The Phenome Registry is **not** a disease catalogue. It defines **shared functional outcome domains** that emerge across common neuropsychiatric, neurodevelopmental, and brain-health conditions.

**Therapeutic lens (v1):** Neuropsychiatric and neurocognitive health, with **ADHD as the primary worked example** (`TA001`). The architecture is designed to accommodate anxiety disorders, depressive disorders, autism spectrum conditions, stress-related disorders, cognitive ageing, long COVID, and healthy cognitive optimisation **without duplicating phenome labels per condition**.

Canonical therapeutic areas live in **`src/data/phenome-registry.json` → `therapeuticAreas`** (`TA001`–`TA007`). Each registry phenome carries `therapeuticAreaIds` — the set of therapeutic areas where that functional domain is clinically relevant.

| ID | Therapeutic area | V1 role |
|----|------------------|---------|
| **TA001** | ADHD | Primary validation use case; mechanism phenome review prioritises ADHD literature |
| **TA002** | Anxiety Disorders | Supported overlay |
| **TA003** | Depressive Disorders | Supported overlay |
| **TA004** | Autism Spectrum | Supported overlay |
| **TA005** | Cognitive Ageing | Supported overlay |
| **TA006** | Long COVID | Supported overlay |
| **TA007** | Healthy Cognitive Optimisation | Supported overlay |

### Primary review priority (v1)

When searching and weighing evidence for **new mechanism → phenome mappings**, prioritise:

- ADHD literature (`TA001`)
- ADHD intervention, biomarker, dietary, and symptom/trait research

### Secondary supporting evidence

Evidence from other therapeutic areas may strengthen biological plausibility or outcome relevance when **ADHD relevance is stated in the rationale** (or when reviewing phenomes mapped to additional `therapeuticAreaIds` in a future TA-specific pass).

| Source area | May support registry phenome | Condition |
|-------------|------------------------------|-----------|
| Depression literature (`TA003`) | Emotional Regulation, Motivation / Drive | ADHD-relevant or shared-domain connection stated in rationale |
| Anxiety literature (`TA002`) | Stress Resilience, Stress Reactivity, Sleep / Calming Tone | Same |
| Alzheimer's / cognitive ageing (`TA005`) | Cognitive Clarity, Cognitive Energy Stability | Same |
| Sleep-disorder literature | Sleep / Calming Tone | Same |

Do **not** create phenome relationships for a non-ADHD condition **unless** the mapping is justified through shared functional domains, comorbid patterns, or explicit ADHD-population relevance in the rationale.

### Phenome assignment rule

Add a phenome relationship when evidence suggests potential relevance to:

- Functional domains in the registry (`PH001`–`PH015`)
- ADHD symptoms, traits, and functional outcomes (primary v1 pass)
- Shared neuropsychiatric / neurocognitive outcomes plausibly relevant across tagged therapeutic areas

Build the **ADHD-focused mechanism mapping pass first** (`TA001`); expand TA-specific evidence overlays on the same registry phenomes later — not as duplicate phenome labels per condition.

### Future expansion (design constraint)

This methodology must not require changes to PM, FM, or phenome page architecture when additional therapeutic-area overlays are added later.

Future overlays attach as **review lenses** or **metadata layers** on the same registry phenomes and the same `phenome_relationships` / `functional_outcome_context` fields — referencing `therapeuticAreaIds` from the registry, not duplicate phenome labels per condition. Studies, intervention profiles, and food pages may eventually reference one or more `TA00x` IDs using the same canonical therapeutic-area table.

---

## Phenome Registry Evidence Hierarchy

All review phases must apply the **[Phenome Registry Evidence Hierarchy](phenome-relationship-schema.md#phenome-registry-evidence-hierarchy)** in `system/phenome-relationship-schema.md`. **Biology → Phenome Confidence and Evidence Level are assigned in Phase 3 only** — Phases 1–2 may note provisional strength in review notes but must not publish final values.

Summary for reviewers:

| Principle | Rule |
|-----------|------|
| **Measured outcomes take precedence (citations)** | Primary citations should assess the phenome domain when claiming high Evidence Level; do not cite attention trials as primary support for Emotional Regulation, etc. |
| **Mechanistic translation permitted** | Inferential mappings allowed when biologically plausible; state explicitly in `rationale` / `synthesis` |
| **Biology → Phenome Confidence = framework relevance** | Scores biological centrality within BRAIN — not dietary RCT efficacy |
| **Evidence Level = demonstration types** | mechanistic, observational, intervention, clinical |
| **Evidence Confidence = Biology → Phenome demonstration** | How convincing is evidence for the mechanism↔phenome relationship on the row? (biomarker, imaging, pharmacology, outcomes — not intervention RCT count alone) |
| **Upstream mechanisms: higher scrutiny** | Substrate, transport, membrane, cofactor PMs — prefer empty §3 or conservative biology confidence |
| **ADHD human data priority** | Prioritise ADHD literature when establishing biology → phenome links |

**Practical test (mandatory before publish):** Walk the [Phase 3 review stack](phenome-relationship-schema.md#convergent-translational-evidence-phase-3):

1. **Mechanism validation** — refs validate PM/FM biology?
2. **Phenome validation** — refs validate phenome domain in target population?
3. **Biology → Phenome Confidence** — assign `confidence` (functional dependency heuristic; refs ignored)
4. **Evidence Confidence** — assign `evidence_confidence` (relationship strength, not RCT count alone)
5. **Evidence–biology gap disclosure** — when Biology > Evidence, state in rationale/synthesis why evidence is limited — **not because the biological relationship is weak**
6. **Evidence Level** — assign `evidence_level` in front matter (audit only)
7. Framework translation labelled where inferential?
8. External neuroscientist test — independent of diet trials?

Rows supported by convergent translational evidence are **not** “merely plausible” — document mechanism validation and phenome validation explicitly in the rationale.

---

## Architecture recap

| Artifact | Role |
|----------|------|
| `phenome_relationships` (PM/SM front matter) | Authoritative mechanism-level mappings |
| `functional_outcome_context` (FM front matter) | Hand-authored integrative FM synthesis (convergence-based, not PM roll-up) |
| FM §4 Mechanistic Basis | Primary integrated-state evidence and synthesis (§4.1–4.4) |
| `src/data/phenome-registry.json` | Canonical phenome definitions (PH001–PH015) and therapeutic areas (TA001–TA007) |
| `src/data/phenome-relationships.generated.json` | Generated graph with `targetPhenomeId` |
| `npm run phenome:sync` | Front matter → §3 rendered body; merges phenome `references` into page `references` + `## N. References` |
| `npm run phenome:index` | PM front matter → generated JSON |
| `npm run phenome:validate` | Registry name matching and diagnostics |

**Registry rules:**

- Use **only** registry `name` values for PM `target_phenome` and FM `outcome_name`.
- Do not invent phenome labels in PM or FM front matter.
- Propose new registry entries separately; do not auto-create from PM edges.
- Edit source MDX files, not generated JSON.

---

## Final FM schema (primary evidence source)

FM **§4. Mechanistic Basis (Integrated FM Narrative)** is now a first-class phenome review surface. The canonical subsection structure:

| Subsection | Role in phenome review |
|------------|------------------------|
| **4.1 Core Primary Mechanisms** | Convergence across child PM phenome mappings |
| **4.2 Integrated Functional Narrative** | Cognitive, behavioural, regulatory, and integrated-system capacities |
| **4.3 Suboptimal Function & Its Effects** | Functional impairments and performance limitations → phenome candidates (required on all FMs) |
| **4.4 Evidence Highlights** | Primary FM-level outcome evidence for the integrated biological state (required on canonical full-template FMs) |

**Canonical full-template FM:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` — §4.1–§4.4 all present.

§4.3 is required on all FM pages. KC-linked detail in §4.3 when `key_constraints` is non-empty; PM- and delivery-framed failure modes when no formal KCs apply (see BRS1 FM3).

---

## Phase 0 — Canonical bibliography consolidation

Before large-scale phenome review, confirm the evidence base is bibliographically sound.

### Primary bibliography

- `static/bibtex/BRAIN-diet.bib` — canonical BRAIN Diet bibliography
- `/docs/papers/BRAIN-Diet-References` — public citation resolver

### Validation command

```bash
npm run bib:validate
```

This checks that every `BRAIN-Diet-References#citation_key` link under `docs/` resolves to an entry in `BRAIN-diet.bib`.

### Phase 0 audit scope

Audit references used across:

- Food pages (`docs/foods/`)
- Substance pages (`docs/substances/`)
- PM pages (`docs/biological-targets/**/fm*/**-pm*.mdx`)
- FM pages (`docs/biological-targets/**/fm*/**-fm*.mdx`)
- SM pages (`docs/biological-targets/**/sm/`)
- BRS hub pages (`docs/biological-targets/**/`)

### Phase 0 outputs

| Output | Description |
|--------|-------------|
| Missing reference report | Citation keys cited in docs but absent from bib (blocking) |
| Orphan-key inventory | Bib entries never cited (informational; consolidation candidate) |
| Consolidation recommendations | Duplicate/near-duplicate sources; keys to merge or alias |
| Readiness verdict | **Ready** / **Blocked** for Phase 1 at scale |

### Phase 0 readiness (current baseline)

As of methodology v2 adoption:

- `npm run bib:validate`: **passed** — all cited doc keys resolve in `BRAIN-diet.bib`
- Phenome review should treat the canonical bibliography as a **primary evidence source**
- New evidence discovered during review must be added to `BRAIN-diet.bib` before citation in `phenome_relationships[].references` or `functional_outcome_context[].references`

---

## Phase 1 — PM review

### Purpose

Assess each PM as a mechanism and generate **candidate phenome hypotheses**.

Phenome candidates drafted here are **hypotheses only**; they require [Phase 3 — Independent phenome evidence review](#phase-3--independent-phenome-evidence-review) before publish. **Do not assign final confidence or evidence level in Phase 1.**

### Core question

**What phenomes could this specific mechanism plausibly influence, based on its biological depth and evidence base?**

### Evidence sources

| Source | Purpose |
|--------|---------|
| PM §1 Definition | Mechanism boundary |
| PM §2 Primary Biological Effects | Directional biological outputs |
| PM Mechanistic Basis (§4 / numbered Mechanistic Basis) | Mechanism → pathway evidence |
| PM §5.1 / §4.1 Evidence Highlights (when present) | Mechanism-level outcome clues |
| PM §3 Phenome Connections (existing mappings) | Current state and gaps |
| PM Dietary Levers, Lifestyle Levers, cofactors, Key Constraints | Intervention and substrate context |
| PM `references` / `key_studies` front matter | Connected research on-page |
| Parent FM definition + `mechanisms_covered` | Integrative context |
| Parent BRS scope | System framing |
| Connected substances, foods, KCs (via levers and tags) | Intervention and substrate context |
| `static/bibtex/BRAIN-diet.bib` | Canonical bibliography search |
| **New external literature search** | ADHD evidence and relevant adjacent evidence |
| `src/data/phenome-registry.json` | Allowed phenome targets |

### Phase 1 must assess

1. **Mechanistic depth** — is this a meaningful biological mechanism or only a weak/subordinate step?
2. **Evidence depth** — does the PM have its own literature base?
3. **Mechanism-to-phenome plausibility** — which phenomes could this PM plausibly touch?

### Review principle

Do **not** rely only on references already present on the PM page.

The review process must search for:

- mechanism → phenome evidence
- pathway → phenome evidence
- **ADHD-prioritised** therapeutic-area evidence
- intervention and dietary outcome evidence already represented in the bibliography
- food/substance outcome evidence linked to the mechanism chain
- **external literature** not yet cited on the page

### Candidate generation steps

1. **Mechanism parse** — summarise biological outputs, intervention levers, and mechanistic depth (no phenome claims in §1/§2).
2. **Evidence depth pass** — assess whether the PM has its own literature base or depends on downstream biology.
3. **Registry shortlist** — list registry phenomes plausibly touched by the mechanism **through an ADHD lens**.
4. **Connected evidence pass** — mine PM body, front matter, parent FM §4, linked foods/substances.
5. **Bibliography + external pass** — search `BRAIN-diet.bib` and ADHD-corpus / external sources for mechanism/phenome bridges not yet on the page.
6. **Secondary-area pass** — allow supporting non-ADHD literature only where ADHD relevance is explicit.
7. **Draft candidates** — one row per phenome with relationship type, provisional rationale, reference shortlist; note inferential vs measured where known.
8. **Human review** — accept, modify, or reject each candidate for Phase 3 (do not publish §3 yet).

### Phase 1 output

For each PM, produce **candidate PM-level phenome mappings**:

| Field | Required in Phase 1 | Notes |
|-------|---------------------|-------|
| `target_phenome` | Yes | Registry `name` |
| `relationship_type` | Yes | See [Relationship types](#relationship-types) |
| `rationale` | Yes | Provisional; translational, ADHD-scoped |
| `references` | Recommended | Shortlist; may expand in Phase 3 |
| `confidence` | **No** | Assigned in Phase 3 only |
| `evidence_level` | **No** | Assigned in Phase 3 only |

Store candidates in review notes or draft front matter marked **provisional** until Phase 3 completes. Do not run `phenome:sync` for publication until Phase 3 assigns final fields.

### Relationship types

**Target vocabulary (review v1):**

| Type | Meaning |
|------|---------|
| `supports` | Mechanism plausibly supports phenome capacity |
| `modulates` | Mechanism adjusts phenome expression without sole-cause framing |
| `contributes_to` | Partial, non-exclusive contribution |
| `indirect` | Mediated through upstream/downstream biology |
| `contextual` | Conditional or state-dependent relevance |

**Current schema enforcement** (`phenome-relationship-schema.md`): `supports`, `disrupts`, `modulates`, `indirect` only.

Until schema extension, map review candidates as follows:

| Review type | Use in PM front matter now |
|-------------|----------------------------|
| `supports` | `supports` |
| `modulates` | `modulates` |
| `contributes_to` | `modulates` |
| `indirect` | `indirect` |
| `contextual` | `indirect` |
| disruptive / impairing effect | `disrupts` |

Record intended review type in review notes when the enforced value is a downgrade.

### Confidence and evidence level (Phase 3 only)

The schema requires `confidence` and `evidence_level` on published PM rows. **Assign these in Phase 3**, not Phase 1.

Use the vocabulary below when writing final values after independent phenome evidence review.

### Confidence (Biology → Phenome Confidence)

Use existing enforced values:

- `high`
- `medium`
- `low-medium`
- `low`

Assign using the [functional dependency heuristic](phenome-relationship-schema.md#functional-dependency-heuristic-assign-before-reviewing-references) in the schema (**before** reviewing attached references for evidence strength). Biology → Phenome Confidence reflects **functional biological dependency** — not whether refs directly demonstrate phenome outcomes. Do not cap biology confidence because dietary intervention evidence is limited or because Key References are mechanistic-only.

### Evidence levels

**Target vocabulary (review v1):**

| Level | Meaning |
|-------|---------|
| Human Outcome | Human clinical or functional outcome data |
| Human Mechanistic | Human study with mechanistic endpoints |
| Mechanistic | Established biological pathway plausibility |
| Preclinical | Animal or in vitro evidence |
| Theoretical | Model-based inference only |
| Mixed | Multiple levels combined |

**Current schema enforcement:** `mechanistic`, `observational`, `intervention`, `clinical`.

Map review candidates as follows until schema extension:

| Review level | Use in PM front matter now |
|--------------|----------------------------|
| Human Outcome | `clinical` |
| Human Mechanistic | `observational` |
| Mechanistic | `mechanistic` |
| Preclinical | `mechanistic` (note preclinical in rationale) |
| Theoretical | `mechanistic` (note theoretical in rationale) |
| Mixed | highest applicable enforced level; note mix in rationale |

### PM publish workflow (after Phase 3 + Phase 4)

```bash
# 1. Write Phase 3-approved phenome_relationships to PM front matter (with final confidence + evidence_level)
# 2. Render §3
npm run phenome:sync -- --file docs/biological-targets/.../....mdx

# 3. Phase 4 validation
npm run phenome:audit-evidence
npm run mechanisms:validate
npm run phenome:index
npm run phenome:validate
```

Example (Phase 3-approved mapping — confidence assigned only after independent review):

```yaml
phenome_relationships:
  - target_phenome: "Focus / Attention Stability"
    relationship_type: modulates
    confidence: low-medium          # Phase 3 assignment
    evidence_level: mechanistic     # Phase 3 assignment
    rationale: >-
      Amino-acid availability and competitive LAT1 transport may influence
      catecholamine and serotonin precursor supply relevant to attention
      regulation in ADHD; not a single-nutrient treatment claim.
    references:
      - label: "Fernstrom (2013)"
        citation_key: fernstrom_lnna_2013
        href: "/docs/papers/BRAIN-Diet-References#fernstrom_lnna_2013"
```

Render for human sign-off:

```bash
npm run phenome:sync -- --file <path-to-pm.mdx>
```

Review the public §3 dropdowns on localhost before accepting.

---

## Phase 2 — FM review

### Purpose

Assess whether the FM is a coherent integrated functional capacity and generate **FM-level phenome hypotheses**.

**Prerequisite:** every FM page must include `### 4.4 Evidence Highlights` before FM phenome work begins (`system/fm-schema-rollout-sequence.md`). Run `npm run mechanisms:migrate-fm-schema`, then human-review §4.4 drafts.

FM phenome hypotheses must represent **convergence across FM evidence sources** (§4.1–4.4), not a simple roll-up of child PM §3 dropdowns. Hypotheses remain unpublished until [Phase 3](#phase-3--independent-phenome-evidence-review). **Do not assign final confidence in Phase 2.**

Functional convergence is a **system-design validation layer**, not a confidence multiplier.

### Core question

**When all child PMs are considered together, which phenomes emerge most strongly from the integrated FM state?**

### Evidence sources

| Source | Purpose |
|--------|---------|
| PM convergence (Phase 1 candidates + §4.1) | Cross-PM phenome overlap |
| FM §1 Definition | Integrated capacity boundary |
| FM §4.2 Integrated Functional Narrative | Cognitive, behavioural, regulatory capacities |
| FM §4.3 Suboptimal Function & Its Effects | Impairments → candidate phenomes |
| FM §4.4 Evidence Highlights | FM-level outcome evidence |
| FM-level literature | Integrated-state evidence beyond child PM pages |

### Phase 2 must assess

1. **Functional coherence** — do the PMs genuinely belong together?
2. **Dependency structure** — are PMs sequential, parallel, enabling, redundant, or orthogonal?
3. **Constraint satisfaction** — do the PMs describe the conditions required for the FM to function?
4. **Integrated phenome plausibility** — which outcomes plausibly emerge from the FM as a whole?

### FM §4 review buckets

#### §4.1 Core Primary Mechanisms

Review convergence across child PM phenome mappings.

**Ask:** Which phenomes appear repeatedly across child PM mappings?

Note PM-level phenomes that converge on the same registry target. Convergence across multiple child PMs is **evidence for Phase 3 consideration** — it does not automatically raise confidence.

#### §4.2 Integrated Functional Narrative

Review for statements describing:

- cognitive capacities
- behavioural capacities
- regulatory capacities
- biological capabilities
- integrated system functions

These may reveal phenome connections **not obvious from individual PM pages**.

#### §4.3 Suboptimal Function & Its Effects

This section is now a **major phenome source** (required on all FM pages).

Review for:

- functional impairments
- performance limitations
- behavioural consequences
- cognitive consequences
- resilience limitations

Failure-mode descriptions frequently map directly to phenome domains.

| Failure-mode language (examples) | Candidate registry phenomes |
|----------------------------------|----------------------------|
| reduced cognitive flexibility | Cognitive Clarity |
| impaired attention stability | Focus / Attention Stability |
| emotional dysregulation | Emotional Regulation |
| reduced recovery capacity | Recovery Capacity |
| stress vulnerability | Stress Resilience, Stress Reactivity |

Treat failure-mode phenome candidates as **inverse or deficit-framed** evidence for the same registry phenomes — the FM §3 synthesis should describe the integrated capacity, not restate failure-mode prose.

#### §4.4 Evidence Highlights

This section is now a **primary phenome evidence source**.

Review for evidence describing:

- functional outcomes
- cognitive outcomes
- behavioural outcomes
- neurodevelopmental outcomes
- performance outcomes
- resilience outcomes

**Important:** Evidence Highlights often contain stronger phenome clues than individual PM evidence because they evaluate the FM as an **integrated biological state**.

**Example (BRS1 FM3):**

> Membrane composition influences receptor function, ion-channel behaviour, synaptic transmission and broader neural signalling.

This provides direct support for evaluating candidate phenomes such as:

- Cognitive Clarity
- Focus / Attention Stability
- Cognitive Energy Stability

even where individual PM references are primarily biochemical.

### FM review workflow

For every FM:

1. **Child PM-derived phenomes** — from Phase 1 outputs and §4.1 convergence
2. **Integrated Narrative-derived phenomes** — from §4.2 capacity language
3. **§4.3 Suboptimal Function & Its Effects-derived phenomes** — from §4.3 impairment language (when present)
4. **Evidence Highlight-derived phenomes** — from §4.4 outcome evidence

Then **synthesise candidate FM-level phenome outcomes**:

- Merge duplicate candidates across the four buckets
- Prefer phenomes supported by multiple FM sources (for Phase 3 prioritisation)
- Select **normally 2–3 outcomes; absolute maximum 4** candidate `outcome_name` values
- Write provisional `synthesis` (1–2 sentences per outcome); do not copy PM `rationale` verbatim
- Attach reference shortlist from FM §4.4 and bibliography where they may support the integrated claim
- **Do not assign final confidence** — note convergence strength in review notes for Phase 3

### Phase 2 output

For each FM, produce **candidate FM-level functional outcomes**:

| Field | Required in Phase 2 | Notes |
|-------|---------------------|-------|
| `outcome_name` | Yes | Registry `name` |
| `synthesis` | Yes | Provisional integrative FM-level framing |
| `references` | Recommended | Shortlist; may expand in Phase 3 |
| `confidence` | **No** | Assigned in Phase 3 only |

### FM confidence rules (Phase 3 application)

When assigning FM Biology → Phenome Confidence in Phase 3, follow the [Phenome Registry Evidence Hierarchy](phenome-relationship-schema.md#phenome-registry-evidence-hierarchy). FM convergence may uplift confidence only when convergent PM biology supports the same phenome — not because FM §4.2 mechanism prose alone is stronger.

| Situation | Rule |
|-----------|------|
| Multiple child PMs + FM §4 sources converge on same phenome | FM biology confidence may exceed any single PM **only if** Phase 3 documents biological uplift |
| FM §4.4 provides stronger outcome evidence than child PM biochemistry | May raise **Evidence Level** on FM synthesis refs; biology confidence uplift requires explicit justification |
| Phenome appears in only one source bucket | Assign conservatively; note thin evidence in review notes |
| Primary citations do not measure the phenome | May still support **high biology confidence** when pathway is core; label framework translation where multi-step |
| Single-PM FM (1:1) | See [Single-PM FM reconciliation](#single-pm-fm-11-reconciliation) |

### Single-PM FM (1:1) reconciliation

When `mechanisms_covered` contains **exactly one** PM, current schema enforcement still requires FM §3 to align with that PM at publish time (`validateSinglePmFmOutcomeAlignment`).

Phase 2 remains **mandatory** for single-PM FMs — §4.2 and §4.4 especially may surface phenome evidence the PM review missed.

**Workflow when FM review diverges from child PM mappings:**

1. Document all four FM candidate buckets in review notes.
2. If FM-derived sources support phenomes not yet on the child PM, **return to Phase 1** and update PM `phenome_relationships` first.
3. Re-run Phase 2 synthesis against the updated PM set.
4. After Phase 3, publish FM `functional_outcome_context` with matching phenome labels and confidence per the 1:1 rule; rewrite synthesis at FM integrative level.

Do **not** publish FM-only phenomes that lack a corresponding PM mapping on a 1:1 FM without first extending the child PM (or revising schema enforcement).

**Canonical Type B (single-PM anchor) example:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` → BRS1-FM3-PM6. See `system/single-pm-fm-rule.md`.

**Canonical FM evidence example:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` → `BRS1-FM3-PM6`.

### FM publish workflow (after Phase 3 + Phase 4)

```bash
# 1. Write Phase 3-approved functional_outcome_context to FM front matter (with final confidence)
# 2. Render §3
npm run phenome:sync -- --file docs/biological-targets/.../brs*-fm*.mdx

# 3. Phase 4 validation
npm run phenome:audit-evidence
npm run mechanisms:validate
npm run phenome:index
npm run phenome:validate
```

---

## Phase 3 — Biology → phenome validation

### Purpose

Validate each candidate phenome using a **dedicated biology → phenome literature review**.

**Independently validate or reject** phenome hypotheses from Phase 1–2. This review must **not** be restricted to references already present on PM or FM pages.

This phase implements [pipeline step 4](#step-4--biology--phenome-validation--phase-3) and the [Evidence Hierarchy](phenome-relationship-schema.md#phenome-registry-evidence-hierarchy). **Biology → Phenome Confidence, Evidence Confidence, and Evidence Level are assigned here as separate fields.**

### Phase 3 review stack

For each candidate phenome row, apply the stack in order ([schema](phenome-relationship-schema.md#convergent-translational-evidence-phase-3)):

| Step | Review question | Output |
|------|-----------------|--------|
| 1. **Mechanism validation** | Do attached (and searched) refs validate this PM/FM biology in ADHD-relevant context? | Notes in rationale; Key References |
| 2. **Phenome validation** | Do refs validate this phenome domain in the target population? | Notes in rationale; Key References |
| 3. **Biology → Phenome Confidence** | Apply [functional dependency heuristic](phenome-relationship-schema.md#functional-dependency-heuristic-assign-before-reviewing-references) (ignore refs): if this PM were substantially dysfunctional in isolation, would phenome impairment be a direct biological consequence? | `confidence` |
| 4. **Evidence Confidence** | Now review refs: how convincing is the evidence for that Biology → Phenome relationship? | `evidence_confidence` |
| 5. **Evidence–biology gap disclosure** | When Biology confidence > Evidence Confidence: state why evidence is limited and that the gap is **not** weak biological coupling | `rationale` / `synthesis` prose ([schema](phenome-relationship-schema.md#evidencebiology-gap-disclosure-rationale-standard)) |

`evidence_level` is assigned separately in front matter for audit (not rendered in public §3).

### Core question

**After mechanism validation and phenome validation, how strongly does this PM/FM biology relate to the proposed phenome — and how convincing is the evidence for that relationship?**

### Targeted literature search (per candidate)

For each candidate phenome, perform a targeted search combining:

- mechanism / FM terms
- phenome outcome terms
- ADHD terms where available
- adjacent clinical or cognitive evidence where ADHD evidence is limited

### Review sources

| Source | Goal |
|--------|------|
| Phase 1 + Phase 2 candidate lists | Scope of validation |
| Parent BRS pages | System framing; cross-mechanism phenome context |
| Connected BRS pages (from PM/FM §6) | Adjacent biology and phenome bridges |
| `static/bibtex/BRAIN-diet.bib` | ADHD-prioritised wider literature |
| **External literature search** | Outcome evidence not yet on PM/FM pages |
| Food pages (`docs/foods/`) | Dietary outcome and intervention evidence |
| Substance pages (`docs/substances/`) | Nutrient/bioactive outcome evidence |
| Therapeutic-area literature | ADHD-scoped reinforcement only |
| Intervention literature | Human outcome upgrades/downgrades |

### Phase 3 deliverables (per candidate phenome)

1. **Mechanism validation** summary (what refs establish about PM/FM biology)
2. **Phenome validation** summary (what refs establish about the phenome domain)
3. **Phenome-specific references** (add to `BRAIN-diet.bib` before citation)
4. **Biology → Phenome Confidence** assignment (`confidence`)
5. **Evidence Confidence** assignment (`evidence_confidence`)
6. **Evidence Level** assignment (`evidence_level` — audit/front matter)
7. **Retain, downgrade, upgrade, or remove** mapping decision

### Phase 3 validation checks

| Check | Source |
|-------|--------|
| Did cited studies support the assigned Evidence Level? | Per-reference `data_level`; Principle 3b |
| Is Biology → Phenome Confidence based on framework relevance? | Principle 3; practical test |
| Is ADHD human evidence prioritised where available? | Principle 5; therapeutic-area scope |
| Is inferential translation labelled? | Principle 2 |
| When Biology > Evidence, is the gap disclosed in rationale/synthesis? | [Evidence–biology gap disclosure](phenome-relationship-schema.md#evidencebiology-gap-disclosure-rationale-standard) |
| Should upstream PMs have no mapping? | Principle 4 |

### Phase 3 goals

**A. Validate existing candidates**

- Add bibliography references not yet cited on PM/FM pages
- Upgrade confidence where human outcome evidence supports the phenome link
- Downgrade or remove mappings where outcome search finds weak, contradictory, or non-ADHD-scoped evidence

**B. Discover additional candidates**

- Identify registry phenomes supported by food/substance/BRS evidence not yet represented on the PM/FM page
- Route discoveries back to Phase 1 (PM) or Phase 2 (FM) for candidate registration — then re-run Phase 3
- Do not add mappings from Phase 3 alone without PM or FM anchoring

### Phase 3 output

| Output | Action |
|--------|--------|
| Approved PM mappings | Write `phenome_relationships` with final confidence + evidence_level |
| Approved FM outcomes | Write `functional_outcome_context` with final confidence |
| New PM candidates | Return to Phase 1 |
| New FM candidates | Return to Phase 2 |
| Rejected candidates | Document in audit trail; leave §3 empty for that phenome |

---

## Phase 4 — Audit & quality control

### Purpose

Validate the integrity of Phase 3 outputs. **Phase 4 does not generate phenome evidence.**

### Tasks

| Task | Command / action |
|------|------------------|
| Reference validation | `npm run bib:validate` |
| Confidence consistency checks | `npm run phenome:audit-evidence` (optional `--fix` for overstated evidence_level only) |
| Registry formatting | `npm run phenome:validate` |
| Bibliography integrity | Confirm new Phase 3 keys resolve in `BRAIN-diet.bib` |
| Duplicate mapping review | Manual — same phenome supported by repeated dependent mechanisms |
| PM/FM inflation check | Ensure claims are not inflated by counting the same biology twice |
| Mechanism contract validation | `npm run mechanisms:validate` |
| Index regeneration | `npm run phenome:sync` → `npm run phenome:index` |
| Human sign-off | Review rendered §3 on localhost |

### Phase 4 output

| Verdict | Action |
|---------|--------|
| **Pass** | Publish §3 mappings |
| **Fail** | Return to Phase 3 for evidence revision, or remove mapping |

Reject or leave empty when validation fails — prefer **empty §3** over a weak mapping.

---

## SM phenome review

| SM category | Phenome approach |
|-------------|------------------|
| **SM-CROSS** (PM-canonical layout) | `phenome_relationships` — same Phase 1 PM workflow; emphasise connected PM phenomes + cross-system ADHD framing |
| **SM-PHEN** | `interpreted_phenome` + lens narrative — one registry phenome; do not duplicate PM dropdown sets |
| **SM-SNP** | Phenome layer per `specific-mechanism-schema.md`; defer bulk review until PM pilot complete |

SM edges are not yet indexed in `phenome-relationships.generated.json` (PM-only index today). SM front matter is still the authoring source for SM §3.

---

## Human review checklists

### Per PM (Phase 1)

- [ ] Mechanistic depth assessed (meaningful mechanism vs weak/subordinate step)
- [ ] Evidence depth assessed (PM has its own literature base)
- [ ] Mechanism-to-phenome plausibility documented
- [ ] External literature search performed (not page references only)
- [ ] Every candidate `target_phenome` matches a registry `name` exactly
- [ ] Provisional rationale is translational, not diagnostic or treatment-efficacy
- [ ] ADHD relevance is explicit in rationale (v1 scope)
- [ ] Inferential candidates labelled as framework translation
- [ ] **No final confidence or evidence level assigned**
- [ ] Reviewer accepted or rejected each candidate for Phase 3

### Per FM (Phase 2)

- [ ] Functional coherence assessed (PMs belong together)
- [ ] Dependency structure documented (sequential / parallel / enabling / redundant / orthogonal)
- [ ] Constraint satisfaction assessed
- [ ] All four FM evidence buckets reviewed (§4.1–§4.4 on canonical full-template FMs; §4.3 always)
- [ ] FM candidate outcomes represent convergence, not a PM dropdown copy-paste
- [ ] Every candidate `outcome_name` matches a registry `name` exactly
- [ ] Provisional synthesis is integrative (FM-level); does not list child PMs
- [ ] §4.4 Evidence Highlights reviewed as primary outcome evidence
- [ ] §4.3 failure-mode language mapped to candidate phenomes (when present)
- [ ] 2–3 outcomes normally; max 4 candidates
- [ ] **No final confidence assigned**
- [ ] Single-PM FM: candidate labels align with child PM after any Phase 1 feedback
- [ ] Reviewer accepted or rejected each candidate for Phase 3

### Per phenome candidate (Phase 3)

- [ ] Targeted literature search performed (mechanism + phenome + ADHD terms)
- [ ] Search not restricted to on-page references
- [ ] Phenome-specific evidence summary written
- [ ] Phenome-specific references added to bibliography where new
- [ ] Final Biology → Phenome Confidence and Evidence Level assigned per Evidence Hierarchy (separate fields)
- [ ] Retain / downgrade / upgrade / remove decision documented
- [ ] Practical test passed (measured outcomes vs plausibility)
- [ ] New candidates routed back to Phase 1 or Phase 2 — not published without anchoring

### Per publish pass (Phase 4)

- [ ] `npm run bib:validate` passed
- [ ] `npm run phenome:audit-evidence` passed (or `--fix` applied and re-reviewed)
- [ ] `npm run phenome:validate` passed
- [ ] `npm run mechanisms:validate` passed
- [ ] Duplicate / dependent-mechanism inflation reviewed
- [ ] Human sign-off on rendered PM and FM §3

---

## Pilot plan (v2)

Do **not** mass-update existing PM/FM mappings when adopting this methodology. Run controlled pilots first.

### Coverage baseline

| Metric | Count |
|--------|------:|
| PM pages total | 62 |
| PM pages with `phenome_relationships` | 21+ |
| PM pages without mappings | 41− |
| Registry phenomes | 15 |
| Indexed relationship edges | 57+ |

### Recommended pilots

| Pilot | Page | Why |
|-------|------|-----|
| **A — PM empty state** | `docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx` | Canonical Profile A reference PM; high ADHD relevance; Phase 1 workflow proof |
| **B — PM re-review** | `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation.mdx` | Existing mappings; test ADHD scoping tighten |
| **C — FM canonical (complete)** | `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` + `brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx` | Full §4.1–§4.4 template; Phase 1 + Phase 2 + 1:1 reconciliation |
| **D — Multi-PM FM (optional)** | `docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function.mdx` | Test FM convergence across multiple child PMs without simple roll-up |

### Pilot success criteria

- Phase 1 and Phase 2 steps followed (not intuition-only)
- Phase 3 independent outcome search performed before confidence assignment
- Phase 4 validation passed
- FM §4.1–4.4 reviewed as mandatory evidence sources
- At least one mapping supported by outcome evidence where PM evidence alone is primarily biochemical
- Human reviewer sign-off on rendered PM and FM §3
- `mechanisms:validate`, `phenome:index`, `phenome:validate` pass
- Documented rejections (phenomes considered but excluded) for audit trail

---

## Schema gaps discovered (v1–v2)

Track these for a future schema/tooling release. **Do not block pilots** — use mapping tables above.

| Gap | Current enforcement | Review target | Affected files |
|-----|--------------------|---------------|----------------|
| Relationship types | `supports`, `disrupts`, `modulates`, `indirect` | add `contributes_to`, `contextual` | `scripts/lib/phenome-relationships.mjs`, schema |
| Evidence levels | `mechanistic`, `observational`, `intervention`, `clinical` | Human Outcome, Human Mechanistic, Preclinical, Theoretical, Mixed | same |
| SM index coverage | PM-only in `phenome:index` | Include SM `phenome_relationships` | `scripts/lib/phenome-relationship-index.mjs` |
| FM registry alignment | `outcome_name` not validated against registry | Optional strict mode or lint warnings | validation layer |
| FM evidence layer metadata | none on FM outcomes | optional `evidence_sources: [pm, narrative, failure_modes, highlights]` | front matter v2 |
| Therapeutic-area metadata | none on edges | future `review_scope: ADHD` overlay | registry / index v2 |
| Automated review script | none | `phenome:review` candidate generator | new script (future) |
| Bibliography audit depth | cited-key check only | orphan keys, cross-corpus ADHD search | extend Phase 0 tooling |
| Single-PM 1:1 vs FM-first discovery | strict alignment at publish | optional relax when FM §4.4 supports FM-only uplift | schema + validator |

---

## Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-06-18 | Initial methodology; ADHD scope v1; Phase 0–2; pilot plan; schema gap register |
| 2.0 | 2026-06-16 | FM §4.1–4.4 as first-class phenome evidence; three-layer evidence model; Phase 2 FM review expanded; Phase 3 framework expansion; BRS1 FM3 canonical pilot |
| 3.0 | 2026-06-24 | Integrated PM/FM workflow; confidence assignment moved to Phase 3 only; Phase 4 audit & QC separated; external literature search mandatory in Phases 1 and 3; functional convergence explicitly not a confidence multiplier |
| 4.0 | 2026-06-25 | **Biology → Phenome Confidence** separated from **Evidence Level**; Phase 3 question reframed to biological relationship strength; audit tooling no longer caps confidence from reference data_level; public §3 labels updated |
| 4.1 | 2026-06-25 | Phase 3 **review stack**: Mechanism validation → Phenome validation → Biology → Phenome Confidence → Evidence Confidence; convergent translational evidence framing; Evidence Confidence = relationship demonstration (not RCT count) |
| 4.2 | 2026-06-25 | **Functional dependency heuristic**: Biology → Phenome Confidence assigned from PM definition and mechanism boundary before reviewing refs; PM8→Sleep worked example in schema |
| 4.3 | 2026-06-25 | **Evidence–biology gap disclosure**: when Biology confidence exceeds Evidence Confidence, rationale/synthesis must state why evidence is limited — not because the biological relationship is weak |
