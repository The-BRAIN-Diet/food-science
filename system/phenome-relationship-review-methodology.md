# Phenome Relationship Review Methodology

**Version:** 2.0  
**Status:** Active  
**Therapeutic area scope (v1):** ADHD  

**Related contracts:**

- `system/phenome-relationship-schema.md` — data model, rendering, registry rules
- `system/functional-mechanism-schema.md` — FM §4 integrated narrative structure
- `system/fm-schema-rollout-sequence.md` — complete FM §4.4 on all FMs **before** FM phenome Phase 2
- `system/brs-citation-reference-standard.md` — citation format
- `src/data/phenome-registry.json` — canonical phenome vocabulary
- `src/data/phenome-relationships.generated.json` — generated PM → registry graph (do not hand-edit)

---

## Objective

Standardise how PM and FM phenome connections are **generated, reviewed, justified, and maintained**.

Move from:

**PM biology → manual phenome assignment**

to:

**PM biology + FM integrated state + framework evidence → AI research review → candidate phenome relationships → human review → approved mapping**

### Three evidence layers

All three layers must be reviewed before assigning, removing, upgrading, or downgrading phenome relationships.

| Layer | Question it answers | Primary review surfaces |
|-------|---------------------|-------------------------|
| **PM evidence** | Can this biology be influenced? | PM Definition, Primary Biological Effects, Mechanistic Basis, Evidence Highlights, Phenome Connections, levers, references |
| **FM evidence** | Does this integrated biological state matter? | FM §4.1–4.4 (see [Final FM schema](#final-fm-schema-primary-evidence-source)), FM §3 synthesis |
| **Phenome evidence** | How does this influence human function and experience? | Registry definitions, bibliography, therapeutic-area literature, food/substance outcome evidence |

**Previous methodology (v1) was incomplete** because it treated FM pages primarily as integrative roll-ups of child PM mappings. FM pages now contain a mature evidence and synthesis architecture and must be treated as a **first-class phenome evidence source**.

The PM page (§3 Phenome Connections) remains the **primary mechanism-level review surface**. The FM page (§3 + §4) is the **primary integrated-state review surface**. The generated relationship index is implementation output, not the editorial workspace.

---

## Therapeutic area scope (Version 1)

The Phenome Relationship Review System is constrained to **ADHD** as the primary therapeutic area of interest.

The purpose of the review process is **not** to identify every possible therapeutic application of a biological mechanism. It is to identify phenome relationships most relevant to:

- ADHD symptom expression
- ADHD-associated functional impairment
- Cognitive performance in ADHD-relevant domains
- Emotional and behavioural regulation
- Recovery capacity
- Broader brain-health outcomes plausibly relevant to ADHD populations

### Primary review priority

When searching and weighing evidence, prioritise:

- ADHD literature
- ADHD intervention studies
- ADHD biomarker studies
- ADHD dietary and nutritional studies
- ADHD symptom and trait research

### Secondary supporting evidence

Evidence from other therapeutic areas may strengthen biological plausibility or outcome relevance **for ADHD**, but must not drive new mappings on its own.

| Source area | May support registry phenome | Condition |
|-------------|------------------------------|-----------|
| Depression literature | Emotional Regulation | Plausible ADHD-relevant connection stated in rationale |
| Anxiety literature | Stress Resilience, Stress Reactivity | Same |
| Alzheimer's / cognitive ageing | Cognitive Clarity, Cognitive Energy Stability | Same |
| Sleep-disorder literature | Sleep / Calming Tone | Same |

Do **not** create phenome relationships for non-ADHD conditions unless the mapping is justified through ADHD symptoms, traits, functional outcomes, comorbid patterns, or general brain-health relevance for ADHD populations.

### Phenome assignment rule

Add a phenome relationship only when evidence suggests potential relevance to:

- ADHD symptoms
- ADHD-associated traits
- ADHD functional outcomes
- ADHD comorbid patterns
- General brain-health outcomes relevant to ADHD populations

Build an **ADHD-focused phenome architecture first** before expanding into broader therapeutic-area overlays.

### Future expansion (design constraint)

This methodology must not require changes to PM, FM, or phenome page architecture when additional therapeutic-area overlays are added later (e.g. Depression, Anxiety, Alzheimer's Disease, Autism, Metabolic Health).

Future overlays should attach as **review lenses** or **metadata layers** on the same registry phenomes and the same `phenome_relationships` / `functional_outcome_context` fields — not as duplicate phenome labels per condition.

---

## Architecture recap

| Artifact | Role |
|----------|------|
| `phenome_relationships` (PM/SM front matter) | Authoritative mechanism-level mappings |
| `functional_outcome_context` (FM front matter) | Hand-authored integrative FM synthesis (convergence-based, not PM roll-up) |
| FM §4 Mechanistic Basis | Primary integrated-state evidence and synthesis (§4.1–4.4) |
| `src/data/phenome-registry.json` | Canonical phenome definitions (PH001–PH015) |
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
| **4.3 Functional Failure Modes** | Functional impairments and performance limitations → phenome candidates (required on all FMs) |
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

Identify **mechanism-level** phenome candidates.

### Review inputs

For each PM under review, gather:

| Input | Purpose |
|-------|---------|
| PM §1 Definition | Mechanism boundary |
| PM §2 Primary Biological Effects | Directional biological outputs |
| PM Mechanistic Basis (§4 / numbered Mechanistic Basis) | Mechanism → pathway evidence |
| PM §4.1 Evidence Highlights (when present) | Mechanism-level outcome clues |
| PM §3 Phenome Connections (existing mappings) | Current state and gaps |
| PM Dietary Levers, Lifestyle Levers, Scoreable Inputs | Intervention and substrate context |
| PM `references` / `key_studies` front matter | Connected research on-page |
| Parent FM definition + `mechanisms_covered` | Integrative context |
| Parent BRS scope | System framing |
| Connected substances, foods, KCs (via levers and tags) | Intervention and substrate context |
| `static/bibtex/BRAIN-diet.bib` | Canonical bibliography search |
| `src/data/phenome-registry.json` | Allowed phenome targets |

### Review principle

Do **not** rely only on references already present on the PM page.

The review process must search for:

- mechanism → phenome evidence
- pathway → phenome evidence
- **ADHD-prioritised** therapeutic-area evidence
- intervention and dietary outcome evidence already represented in the bibliography
- food/substance outcome evidence linked to the mechanism chain

### Candidate generation steps

1. **Mechanism parse** — summarise biological outputs and intervention levers (no phenome claims in §1/§2).
2. **Registry shortlist** — list registry phenomes plausibly touched by the mechanism **through an ADHD lens**.
3. **Connected evidence pass** — mine PM body, front matter, parent FM §4, linked foods/substances.
4. **Bibliography pass** — search `BRAIN-diet.bib` and ADHD-corpus sources for mechanism/phenome bridges not yet on the page.
5. **Secondary-area pass** — allow supporting non-ADHD literature only where ADHD relevance is explicit.
6. **Draft candidates** — one row per phenome with relationship type, confidence, evidence level, rationale, references.
7. **Human review** — accept, modify, or reject each candidate on the rendered PM §3.
8. **Publish** — write approved rows to front matter; run sync, index, validate.

### Phase 1 output

For each PM, produce:

| Field | Required |
|-------|----------|
| `target_phenome` | Registry `name` |
| `relationship_type` | See [Relationship types](#relationship-types) |
| `confidence` | `high` \| `medium` \| `low-medium` \| `low` |
| `evidence_level` | See [Evidence levels](#evidence-levels) |
| `rationale` | Translational, ADHD-scoped, non-treatment-efficacy |
| `references` | Bibliography-resolved citation keys |

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

### Confidence

Use existing enforced values:

- `high`
- `medium`
- `low-medium`
- `low`

Assign conservatively. ADHD outcome claims from mechanistic-only evidence should rarely exceed `low-medium`.

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

### PM candidate output shape

Write candidates using the existing PM schema (`phenome_relationships`).

Example (approved mapping):

```yaml
phenome_relationships:
  - target_phenome: "Focus / Attention Stability"
    relationship_type: modulates
    confidence: low-medium
    evidence_level: mechanistic
    rationale: >-
      Amino-acid availability and competitive LAT1 transport may influence
      catecholamine and serotonin precursor supply relevant to attention
      regulation in ADHD; not a single-nutrient treatment claim.
    references:
      - label: "Fernstrom (2013)"
        citation_key: fernstrom_lnna_2013
        href: "/docs/papers/BRAIN-Diet-References#fernstrom_lnna_2013"
```

Render for review:

```bash
npm run phenome:sync -- --file <path-to-pm.mdx>
```

Review the public §3 dropdowns on localhost before accepting.

### PM publish workflow

```bash
# 1. Write approved phenome_relationships to PM front matter
# 2. Render §3
npm run phenome:sync -- --file docs/biological-targets/.../....mdx

# 3. Mechanism + phenome contract validation
npm run mechanisms:validate

# 4. Rebuild graph
npm run phenome:index
npm run phenome:validate
```

---

## Phase 2 — FM review

### Purpose

Identify phenomes supported by the **integrated biological state itself**, not merely by individual PMs.

**Prerequisite:** every FM page must include `### 4.4 Evidence Highlights` before FM phenome work begins (`system/fm-schema-rollout-sequence.md`). Run `npm run mechanisms:migrate-fm-schema`, then human-review §4.4 drafts.

FM phenome connections must represent **convergence across FM evidence sources**, not a simple roll-up of child PM mappings.

Complete Phase 1 for child PMs first (or mark PMs explicitly out of scope). Phase 2 may surface phenome candidates not yet obvious from individual PM pages — especially from §4.2, §4.3, and §4.4.

### Mandatory review sources

#### 4.1 Core Primary Mechanisms

Review convergence across child PM phenome mappings.

**Ask:** Which phenomes appear repeatedly across child PM mappings?

Note PM-level phenomes that converge on the same registry target. Convergence across multiple child PMs may justify higher FM confidence than any single PM mapping.

#### 4.2 Integrated Functional Narrative

Review for statements describing:

- cognitive capacities
- behavioural capacities
- regulatory capacities
- biological capabilities
- integrated system functions

These may reveal phenome connections **not obvious from individual PM pages**.

#### 4.3 Functional Failure Modes

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

#### 4.4 Evidence Highlights

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
3. **Functional Failure Mode-derived phenomes** — from §4.3 impairment language (when present)
4. **Evidence Highlight-derived phenomes** — from §4.4 outcome evidence

Then **synthesise a final FM-level phenome assessment**:

- Merge duplicate candidates across the four buckets
- Prefer phenomes supported by multiple FM sources
- Assign FM `confidence` based on convergence (not PM count alone)
- Select **normally 2–3 outcomes; absolute maximum 4** for `functional_outcome_context`
- Write integrative `synthesis` (1–2 sentences per outcome); do not copy PM `rationale` verbatim
- Attach `references` from FM §4.4 and bibliography where they support the integrated claim

### FM review output

| Field | Required |
|-------|----------|
| `outcome_name` | Registry `name` |
| `confidence` | May exceed child PM confidence when multiple FM sources converge |
| `synthesis` | Integrative FM-level framing |
| `references` | FM-level evidence keys (especially §4.4) |

### FM confidence rules

| Situation | Rule |
|-----------|------|
| Multiple child PMs + FM §4 sources converge on same phenome | FM confidence may exceed any single PM confidence |
| FM §4.4 provides stronger outcome evidence than child PM biochemistry | FM synthesis may cite §4.4 refs; confidence uplift requires explicit reviewer justification |
| Phenome appears in only one source bucket | Assign conservatively; note thin evidence in review notes |
| Single-PM FM (1:1) | See [Single-PM FM reconciliation](#single-pm-fm-11-reconciliation) |

### Single-PM FM (1:1) reconciliation

When `mechanisms_covered` contains **exactly one** PM, current schema enforcement still requires FM §3 to align with that PM at publish time (`validateSinglePmFmOutcomeAlignment`).

Phase 2 remains **mandatory** for single-PM FMs — §4.2 and §4.4 especially may surface phenome evidence the PM review missed.

**Workflow when FM review diverges from child PM mappings:**

1. Document all four FM candidate buckets in review notes.
2. If FM-derived sources support phenomes not yet on the child PM, **return to Phase 1** and update PM `phenome_relationships` first.
3. Re-run Phase 2 synthesis against the updated PM set.
4. Publish FM `functional_outcome_context` with matching phenome labels and confidence per the 1:1 rule; rewrite synthesis at FM integrative level.

Do **not** publish FM-only phenomes that lack a corresponding PM mapping on a 1:1 FM without first extending the child PM (or revising schema enforcement).

**Canonical Type B (single-PM anchor) example:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` → BRS1-FM3-PM6. See `system/single-pm-fm-rule.md`.

**Canonical FM evidence example:** `docs/biological-targets/brs1/fm3/brs1-fm3-phospholipid-mediated-dha-delivery-and-membrane-integration.mdx` → `BRS1-FM3-PM6`.

### FM publish workflow

```bash
# 1. Write approved functional_outcome_context to FM front matter
# 2. Render §3
npm run phenome:sync -- --file docs/biological-targets/.../brs*-fm*.mdx

# 3. Mechanism + phenome contract validation
npm run mechanisms:validate

# 4. Rebuild graph (PM edges; FM remains hand-authored)
npm run phenome:index
npm run phenome:validate
```

---

## Phase 3 — Framework expansion review

### Purpose

After PM and FM review, search the wider framework for evidence that **reinforces** existing phenome relationships or **discovers** additional relationships supported outside the immediate PM/FM literature.

### Review sources

| Source | Goal |
|--------|------|
| Parent BRS pages | System framing; cross-mechanism phenome context |
| Connected BRS pages (from PM/FM §6) | Adjacent biology and phenome bridges |
| `static/bibtex/BRAIN-diet.bib` | ADHD-prioritised wider literature |
| Food pages (`docs/foods/`) | Dietary outcome and intervention evidence |
| Substance pages (`docs/substances/`) | Nutrient/bioactive outcome evidence |
| Therapeutic-area literature | ADHD-scoped reinforcement only |
| Intervention literature | Human outcome upgrades/downgrades |

### Phase 3 goals

**A. Reinforce existing phenome relationships**

- Add bibliography references not yet cited on PM/FM pages
- Upgrade confidence where human outcome evidence supports mechanistic mappings
- Downgrade or remove mappings where framework-wide search finds contradictory or non-ADHD-scoped evidence

**B. Discover additional phenome relationships**

- Identify registry phenomes supported by food/substance/BRS evidence not yet represented on the PM/FM page
- Route discoveries back to Phase 1 (PM) or Phase 2 (FM) before publish
- Do not add mappings from Phase 3 alone without PM or FM anchoring

### Phase 3 output

| Output | Action |
|--------|--------|
| Reinforcement notes | Add refs; adjust confidence with reviewer sign-off |
| New PM candidates | Return to Phase 1 |
| New FM candidates | Return to Phase 2 |
| Rejected candidates | Document in audit trail |

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

- [ ] Every `target_phenome` matches a registry `name` exactly
- [ ] Rationale is translational, not diagnostic or treatment-efficacy
- [ ] ADHD relevance is explicit in rationale (v1 scope)
- [ ] Confidence and evidence level match evidence strength
- [ ] Every `citation_key` resolves via `npm run bib:validate`
- [ ] No phenome claims duplicated in §1 Definition or §2 Primary Biological Effects
- [ ] §3 disclaimer present after `phenome:sync`
- [ ] Reviewer accepted or rejected each candidate explicitly

### Per FM (Phase 2)

- [ ] All four FM evidence buckets reviewed (§4.1–§4.4 on canonical full-template FMs; §4.3 always)
- [ ] FM §3 outcomes represent convergence, not a PM dropdown copy-paste
- [ ] Every `outcome_name` matches a registry `name` exactly
- [ ] Synthesis is integrative (FM-level); does not list child PMs
- [ ] §4.4 Evidence Highlights reviewed as primary outcome evidence
- [ ] §4.3 failure-mode language mapped to candidate phenomes (when present)
- [ ] Confidence reflects multi-source convergence where claimed
- [ ] 2–3 outcomes normally; max 4
- [ ] Single-PM FM: labels and confidence align with child PM after any Phase 1 feedback
- [ ] Reviewer accepted or rejected each candidate explicitly

### Per framework pass (Phase 3)

- [ ] Parent and connected BRS pages searched
- [ ] Food/substance pages searched for outcome evidence on the mechanism chain
- [ ] Reinforcements documented; confidence changes justified
- [ ] New candidates routed back to Phase 1 or Phase 2 — not published from Phase 3 alone

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
- FM §4.1–4.4 reviewed as mandatory evidence sources
- At least one mapping supported by FM §4.4 or §4.2 where PM evidence alone is primarily biochemical
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
