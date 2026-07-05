# BRAIN Therapeutic Area (TA) Evidence Integration Standard

**Version:** 1.3  
**Status:** Active  
**Primary worked example:** ADHD (`TA001`) — BRS hub Therapeutic Area Research dropdowns  

**Related documents:**

| Document | Role |
|----------|------|
| [BRS Hub ADHD TA Dropdown Schema](./brs-hub-ta-adhd-dropdown-schema.md) | **Presentation profile** for BRS1–BRS6 hub ADHD dropdowns (Phase 8 implementation) |
| [BRS Hub Dietary & Lifestyle Levers](./brs-hub-levers-schema.md) | Generated diet/lifestyle block — Phases 7 and 7.5 refactoring targets |
| [BRS Citation & Reference Standard](./brs-citation-reference-standard.md) | Inline citations, bibliography keys, reference formatting |
| [BRS Page Schema](./brs-page-schema.md) | Hub page section order and rendering contract |
| [Phenome Relationship Review Methodology](./phenome-relationship-review-methodology.md) | Phenome mapping and independent evidence review |
| [Primary Mechanism Schema](./primary-mechanism-schema.md) | PM page structure and evidence placement |
| [Functional Mechanism Schema](./functional-mechanism-schema.md) | FM page structure |

**Reference implementation (ADHD / BRS4):** [`docs/biological-targets/mitochondrial-function-bioenergetics.md`](../docs/biological-targets/mitochondrial-function-bioenergetics.md)

**Operational assets:**

| Asset | Location |
|-------|----------|
| Master bibliography | `static/bibtex/BRAIN-diet.bib` |
| Reference data levels | `scripts/lib/reference-data-levels.mjs` |
| PM evidence highlights | `scripts/lib/pm-evidence-highlights.mjs` |
| Populate PM highlights | `node scripts/populate-pm-evidence-highlights.mjs --brs BRSn --force` |
| Bib key validation | `node scripts/validate-bib-citation-keys.mjs` |
| Hub TA markers | `npm run brs:patch-ta-research` |
| Manuscript summary generator | `scripts/generate-brs-adhd-manuscript-summaries.py` |

---

## Purpose

This standard defines the canonical **process** for integrating scientific evidence into all BRAIN Therapeutic Area (TA) surfaces — e.g. ADHD, Depression, Anxiety, Autism, Cognitive Ageing.

The objective is not simply to rewrite content. The objective is to continuously strengthen the underlying **BRAIN Knowledge Architecture** while producing scientifically rigorous, conservative, and translational TA summaries.

The BRAIN Framework distinguishes between:

| Layer | Definition |
|-------|------------|
| **Knowledge Architecture** | BRS → FM → PM → SM → KC (+ Phenome where mapped) |
| **Therapeutic Area Interpretation** | Condition-specific evidence mapped onto that architecture |

**Therapeutic Area pages interpret biology. They do not duplicate or replace the core biological architecture.**

---

## Scope and surfaces

This standard governs **all TA evidence integration work**, regardless of where the summary is rendered.

| Surface | Current status | Marker / path |
|---------|----------------|---------------|
| **BRS hub TA dropdown** | Active — ADHD on BRS1–BRS6 | `<!-- brs-hub-ta-research:start/end -->` |
| **Dedicated TA pages** | Future | TBD |
| **FM / PM translational blocks** | Supporting — fed by propagation | §5.1 Evidence Highlights, phenome rows |
| **Manuscript / audit exports** | Supporting | `generate-brs-adhd-manuscript-summaries.py` |

When a presentation surface compresses sections (e.g. hub dropdown merges prose blocks), it must still satisfy every **content requirement** in Phase 8. See [BRS Hub ADHD TA Dropdown Schema](./brs-hub-ta-adhd-dropdown-schema.md) for the BRS hub ADHD profile.

---

## Workflow overview

Every TA revision follows **nine core phases** plus **Phase 7.5** (ledger QA). Phases 1–6 are analytical and architectural. Phase 7 rebuilds hub dietary/lifestyle levers. **Phase 7.5** completes biological intervention ledger integration. Phase 8 is the TA rewrite. Phase 9 is quality assurance.

```
Phase 1   Architecture audit                    (no rewriting)
Phase 2   Literature expansion                  (mandatory fresh search)
Phase 3   Evidence classification               (A / B / C / D)
Phase 4   Biology migration                     (never delete — migrate first)
Phase 5   Framework mapping                       (every paper → BRS/FM/PM/SM/KC/Phenome)
Phase 6   Reference propagation                 (single coherent evidence network)
Phase 7   Dietary & lifestyle lever refactor      (hub levers block — mandatory)
Phase 7.5 Biological intervention ledger          (framework-wide relocation + gap audit)
Phase 8   Therapeutic Area rewrite              (canonical TA structure)
Phase 9   Scientific QA                         (checklist before publication)
```

**Gate rules:**

- Do not publish Phase 8 TA content until Phases 4–6 are complete for every **accepted** study (Categories A and B).
- Do not consider a TA revision **complete** until Phases 7 **and 7.5** are complete and Phase 9 QA passes.
- **Implementation priority (v1.2):** apply Phases 7 and 7.5 together on all remaining BRS hub refactors, **starting with BRS5**. BRS4 Phase 7/7.5 backlog may be closed in a dedicated pass.

---

## Phase 1 — Existing architecture audit

Before searching for new literature, audit the existing TA surface and its connected architecture.

**Identify:**

- [ ] Existing TA-specific evidence (direct and inferred)
- [ ] Existing direct mechanistic mappings
- [ ] Existing BRS, FM, PM, SM, and KC mappings
- [ ] Existing references (`references` front matter, bib keys, Evidence Highlights)
- [ ] Biology duplicated from the architecture (candidate for migration, not deletion)
- [ ] Missing mechanisms, PMs, or FM coverage
- [ ] Missing SM-SNP or other SM opportunities
- [ ] Existing evidence gaps
- [ ] Cross-BRS shared evidence (same study routed to multiple hubs)

**No rewriting occurs during this phase.**

Record findings in an audit note or manuscript summary section before proceeding.

---

## Phase 2 — Literature expansion

A **fresh literature search is mandatory** for every TA revision — even when the page appears current.

**Search for:**

- Recent TA-specific studies (e.g. ADHD cohorts, ADHD-labelled interventions)
- New systematic reviews and meta-analyses
- Human intervention trials
- Human observational studies
- Mechanistic studies (including ex vivo / cybrid / biomarker work in TA samples)
- Genetic and SM-SNP-relevant evidence
- Emerging nutrition and lifestyle evidence

**Preference:** newer and stronger evidence where available. Phase 3 classification determines acceptance; Phase 2 collects candidates.

---

## Phase 3 — Evidence classification

Classify **every candidate study** before writing. Each study receives exactly one primary category.

### Category A — Direct Therapeutic Area evidence

Studies performed in the TA population (e.g. ADHD) or explicitly framed as TA intervention trials.

**Examples:** RCTs, case–control, cohort, human biomarker studies in TA samples, TA-specific narrative reviews and meta-analyses.

**Phase 8 placement:** §4 Direct Therapeutic Area Evidence (table + §3 prose summary).

---

### Category B — Mechanistic evidence relevant to TA symptomology

General biology that provides **biological plausibility** but does not directly demonstrate TA effects.

**Examples:** cofactor reviews, non-TA intervention trials (e.g. urolithin A in healthy adults), gut–brain mechanistic papers interpreted toward TA symptom domains.

**Phase 8 placement (BRS hub TA dropdowns):** **Do not include.** Propagate to BRS / FM / PM / KC architecture (Phases 4–6). Hub ADHD dropdowns list **Category A only** — see [BRS Hub ADHD TA Dropdown Schema](./brs-hub-ta-adhd-dropdown-schema.md).

**Phase 8 placement (dedicated TA pages, when implemented):** may use inferred-mechanistic sections with explicit disclaimers.

---

### Category C — Core biological architecture

General biology that belongs on **BRS / FM / PM / KC / SM** pages rather than TA surfaces.

**Action:** Map and propagate to architecture (Phases 4–6). Do not expand TA prose with Category C content unless needed for translational framing (one sentence + link to architecture).

---

### Category D — Exclude

Outdated, duplicated, weak, or non-contributory evidence.

**Action:** Remove from TA surface **only after** confirming the biology and references exist elsewhere (Phase 4). If not elsewhere, reclassify as C and migrate.

---

### Classification decision summary

| Question | If yes → |
|----------|----------|
| Study population or trial is TA-specific (ADHD in title or consistent ADHD focus)? | **A** |
| General science with TA plausibility only — no ADHD title or cohort focus? | **C** (architecture); not hub TA dropdown |
| General biology with no TA translational role? | **C** (architecture only) |
| Adds nothing or superseded? | **D** (after migration check) |

---

## Phase 4 — Biology migration (critical rule)

General biological or mechanistic content must **never** be deleted simply because it is not TA-specific.

**Before removing any non-TA biology from a TA surface:**

1. Verify whether the biology already exists within the BRAIN architecture.
2. If absent: create or expand the appropriate BRS, FM, PM, SM, or KC content.
3. Propagate all supporting references into the architecture.
4. Only then remove duplicated biology from the TA surface.

**No biological knowledge should ever be lost.**

TA revisions should **strengthen** the architecture, never reduce it.

---

## Phase 5 — Framework mapping

Every **accepted** paper (Categories A and B; Category C when migrating) must be explicitly mapped.

**Map to all that apply:**

| Layer | Requirement |
|-------|-------------|
| **BRS** | Owning regulatory system |
| **FM** | Functional module(s) implicated |
| **PM** | Physiological mechanism(s) — primary mapping target |
| **SM** | Supporting mechanism (SNP, sex, lifestage, pattern, phenotype) when relevant |
| **KC** | Key constraint when dietary/cofactor context applies |
| **Phenome** | Registry phenome IDs when symptom-domain mapping is justified |

Studies are not simply cited. **They become part of the framework.**

Document mappings in:

- Hub TA table **Connected mechanisms** column
- PM `pm-evidence-highlights.mjs` entries
- FM/PM `references` front matter
- Phenome relationship rows (when in scope)

---

## Phase 6 — Reference propagation

Every accepted study should propagate throughout the framework wherever biologically relevant.

**Targets:**

- BRS hub pages (TA tables)
- FM pages
- PM pages (including §5.1 Evidence Highlights)
- SM pages (when published)
- KC pages
- Cross-BRS PM/FM when hub table explicitly routes evidence (e.g. butyrate → BRS5 PM)

The framework maintains a **single coherent evidence network**, not isolated citation lists per page.

**After hub TA edits:**

```bash
node scripts/populate-pm-evidence-highlights.mjs --brs BRSn --force
node scripts/validate-bib-citation-keys.mjs
```

New bib entries require keys in `static/bibtex/BRAIN-diet.bib` and `scripts/lib/reference-data-levels.mjs`.

---

## Phase 7 — Dietary & lifestyle lever refactoring

**Mandatory.** Runs after Phases 1–6 are complete and **before** Phase 8 TA rewrite is published (or in the same change set immediately after Phase 8 draft, before Phase 9).

The hub **Dietary Strategy & Lifestyle Priorities** block is not a static summary. It is the **translational output** of the evidence integration process. Content removed from TA surfaces during deduplication (Phase 4 / Phase 8) must land here or in FM/PM/KC architecture — never disappear.

### Purpose

Every TA update should produce a richer, more accurate dietary interpretation on the hub levers block while keeping TA dropdowns evidence-focused.

### Review requirements

Re-read the full TA evidence synthesis (Phases 1–6) before editing levers. Extract practical messages for the hub **Dietary Strategy & Lifestyle Priorities** block. Full gold-nugget relocation across all framework layers is governed by **Phase 7.5**.

### Preserve high-value translational content

Do not lose practical educational content because it lived in a long biological or TA paragraph. Re-home gold nuggets per **Phase 7.5 §1** — relocation targets include this phase’s hub levers assets and connected FM/PM/KC pages.

### Refactoring targets (Phase 7 — hub levers block)

| Asset | Location |
|-------|----------|
| Strategy prose | `KEY_DIETARY_STRATEGY_PROSE[brsId]` in `scripts/lib/brs-hub-levers.mjs` |
| Strategy seed targets | `KEY_DIETARY_STRATEGY_TARGETS[brsId]` |
| Target Foods captions | `scripts/data/brs-hub-signature-foods.mjs` |
| Lifestyle themes | `scripts/data/brs-hub-lifestyle-priorities.mjs` |
| FM §4.3 suboptimal biology | Biological *why* preparation/antinutrient effects matter — not cooking instructions |
| Hub HTML block | Regenerate via `npm run brs:generate-hub-levers` |

### Refactoring principles

The dietary lever overview should:

- Synthesise the strongest **practical** messages from the evidence review
- Avoid becoming merely a food list
- Organise foods into coherent dietary frameworks
- Explain **why** foods matter biologically (linked to FMs/PMs in Target Foods captions)
- Prioritise memorable, clinically useful guidance
- Preserve the strongest educational gold nuggets

### Phase 7 final QA

Before proceeding to Phase 7.5, confirm hub levers prose and Target Foods captions absorb the strongest practical dietary messages from the evidence review.

See [BRS Hub Dietary & Lifestyle Levers](./brs-hub-levers-schema.md) for rollup mechanics.

Regenerate hub levers after edits:

```bash
npm run brs:generate-hub-levers
```

---

## Phase 7.5 — Biological intervention ledger & translational integration

**Mandatory extension of Phase 7.** Runs after Phase 7 hub lever edits and **before** Phase 8 TA rewrite is published (or in the same change set, before Phase 9).

Phase 7 updates the hub **Dietary Strategy & Lifestyle Priorities** block. Phase 7.5 ensures **no biological knowledge is lost** during TA deduplication by completing the **Biological Intervention Ledger** across the full BRS architecture.

### 1. Preserve biological gold nuggets

Before removing or deduplicating any existing TA content, inventory all biologically meaningful food, preparation, lifestyle, and substance insights (**gold nuggets**).

Gold nuggets must **not** disappear during deduplication. Re-home each into the most appropriate layer:

| Layer | Examples |
|-------|----------|
| **Dietary Strategy** | `KEY_DIETARY_STRATEGY_PROSE`, seed targets |
| **Signature Foods** | `brs-hub-signature-foods.mjs` captions + PM tags |
| **Lifestyle Priorities** | `brs-hub-lifestyle-priorities.mjs` |
| **FM pages** | §4.3 suboptimal function — biological *why* preparation matters (not cooking instructions) |
| **PM pages** | Dietary levers (`substance ← food`) |
| **Substance pages** | Evidence-linked nutrient/substance context |
| **Food pages** | **Primary home** for preparation guidance where evidence exists |
| **Cross-BRS notes** | Hub TA Framework expansion or strategy prose |

**Objective: relocation, never loss.**

**Synthesis rule:** Multiple facts may be combined into a single stronger narrative where readability improves without losing scientific meaning. The objective is not to migrate every statement — it is to preserve every unique biological insight.

### 2. Biological intervention ledger

Each BRS should progressively build a **complete intervention ledger**: every intervention mapped to one or more **BRS → FM → PM**.

| Intervention category | Hub / architecture home |
|----------------------|-------------------------|
| Foods | Signature Foods, PM dietary levers, KC food lists |
| Substances | PM `substance ← food` bullets, substance pages; future hub Evidence-Based Substances section |
| Lifestyle | Lifestyle Priorities, FM §4.2 |
| Food preparation | **Food pages (primary)**; general principles in Dietary Strategy; FM §4.3 biological rationale only — **not** Lifestyle Priorities |
| Meal timing | Strategy prose, BRS6 cross-links where relevant |

**Intervention hierarchy:** Biological architecture is BRS → FM → PM. Intervention layers are foods, substances, lifestyle, and recipes. Preparation is **not** an independent category — it modifies food interventions.

Every PM should ultimately have identifiable intervention levers **where evidence exists**. Current implementation is partial — **report gaps; do not invent links.**

### 3. Evidence-first intervention mapping

Foods and substances are linked to PMs **only where evidence exists**. Each intervention inherits the framework evidence methodology:

| Field | Requirement |
|-------|-------------|
| Key references | Bib-linked where intervention claim is evidence-based |
| Evidence type / data level | Per `reference-data-levels.mjs` |
| Evidence confidence | PM/FM phenome or evidence-highlight fields where applicable |
| TA tier | Direct ADHD vs inferred biology — same Categories A/B as TA tables |

No food or substance becomes a **recommended intervention** without identifiable supporting evidence.

### 4. Missing-link audit (ledger QA)

End each BRS review by documenting ledger gaps (report only — do not fabricate):

- PM has no mapped foods or substances
- Signature food lacks PM linkage tags
- Substance page evidence not represented in the relevant BRS PM/FM
- Food page biological evidence not reflected in hub or PM levers
- Preparation science on food pages without FM §4.3 biological rationale where relevant
- Cross-BRS intervention routed only on food page, not hub strategy

Record gaps in the manuscript summary, audit note, or BRS alignment backlog table.

### 5. BRS narrative philosophy

The BRS hub explains **biological regulation first**. Foods, substances, and lifestyle are **interventions supporting those capacities** — not nutrient monographs or supplement lists. Biology remains the organising principle (aligns with Phase 8 TA §1–§2 and hub Overview).

### 6. Translational Phenome terminology

**Framework rename (in progress):** `Phenome Connections` → **`Translational Phenome Connections`** on PM, FM, and SM pages.

Maintain the distinction:

| Term | Meaning |
|------|---------|
| **Biology → Phenome Confidence** | Biological relevance of mechanism to phenome |
| **Evidence Confidence** | Strength of evidence for that Biology → Phenome relationship |

See `system/phenome-relationship-schema.md` for rendering contract. Page/template renames follow schema adoption — not required to complete Phase 7.5 ledger work.

### 7. Preparation science

Food preparation (boiling, fermentation, soaking, cooling, gentle cooking, etc.) modifies food interventions. It is a **legitimate biological lever** where evidence exists — not optional food-page trivia and **not** a lifestyle intervention.

| Home | Content |
|------|---------|
| **Food pages (primary)** | Practical preparation guidance for that food |
| **Dietary Strategy (secondary)** | Cross-food preparation principles (e.g. AGE reduction, mineral bioavailability, polyphenol preservation) |
| **FM §4.3** | Biological *why* preparation matters as part of suboptimal-function explanation — e.g. oxalate load and boiling greens — **not** step-by-step cooking instructions |
| **Not Lifestyle Priorities** | Preparation is not a behavioural lifestyle lever |

Only where **evidence-supported** and **biologically relevant** to the connected PM/FM. See [BRS Hub Phase 7.5 improvements](./brs-hub-levers-schema.md#brs-hub-schema--phase-75-improvements-before-brs6).

### Phase 7.5 final QA

> *Have any gold nuggets from the TA or legacy hub content failed to appear in the intervention ledger (hub levers, FM/PM, substance/food pages, or gap report)?*

> *Does any hub or TA prose read as a nutrient monograph rather than biology-first intervention framing?*

If yes: relocate or refactor before marking the BRS hub revision complete.

**Implementation priority:** BRS5 → BRS6 → BRS1–BRS3 audit passes. BRS4 may close Phase 7/7.5 backlog separately.

---

## Phase 8 — Therapeutic Area rewrite

The TA surface follows the **canonical content structure** below. Headings may vary by surface; content requirements do not.

### 1. Introduction

Describe **integrated biological regulatory capacities** for the owning BRS.

- Avoid presenting the condition as a single-pathway disorder.
- Name capacity domains; state that the BRS organises connected FMs/PMs.
- No nutrient monographs, food lists, or study citations.

---

### 2. Dietary and lifestyle context

Describe how diet, nutrients, food matrices, and lifestyle influence the capacities named in §1.

- May note cross-BRS links in prose.
- Actionable detail lives in the hub **Dietary Strategy & Lifestyle Priorities** block — do not duplicate here.

---

### 3. Therapeutic Area biological context

Summarise the biological interpretation for the condition in prose.

- **Direct TA evidence** summary with inline citations (Category A only on BRS hub dropdowns).
- Closing **translational interpretation** paragraph(s) — see §6.
- Do **not** cite Category B / inferred-mechanistic studies on BRS hub ADHD dropdowns; point readers to architecture pages instead.

---

### 4. Direct Therapeutic Area evidence

Present **only** Category A evidence — typically a three-column table:

| Evidence | Citation | Connected mechanisms |

One row per study unless distinct mechanism mappings justify a split (prefer merging, e.g. review + SM-SNP pending in one row).

**BRS hub ADHD dropdowns:** this is the **only** evidence table. No separate inferred-mechanistic table.

---

### 5. Translational interpretation

Summarise how the evidence supports interpretation within the BRAIN Framework.

**Required elements:**

- Findings do **not** imply universal dysfunction or biomarker-defined disorder.
- Biology is framed as a **modifiable regulatory system**.
- Conservative language; no causal overstatement.

**Presentation profiles:**

| Surface | §5 placement |
|---------|----------------|
| BRS hub ADHD dropdown | Closing paragraph(s) within §3 *ADHD translational biological context* |
| Dedicated TA pages | May use standalone `### Translational interpretation` heading |

---

### 6. Current evidence limitations

Explicitly acknowledge where evidence remains incomplete.

- Table format encouraged; citation column may read **Future evidence integration**.
- Do not present absence of evidence as evidence of absence.

---

### 7. Future framework expansion

**Flag only. Do not implement automatically.**

- SM-SNP opportunities (cite review source; label **BRSn(SM-SNP) — pending**)
- New PM or FM candidates
- Missing functional modules
- Cross-BRS shared evidence notes
- Future research priorities

---

## Phase 9 — Scientific quality assurance

Before publication, verify:

- [ ] Hub ADHD dropdown lists **Category A only** — no inferred-mechanistic table or Category B citations
- [ ] Conservative causal language maintained
- [ ] Biology mapped correctly (Phase 5 complete for all accepted studies)
- [ ] References propagated (Phase 6 complete)
- [ ] **Dietary & lifestyle levers rebuilt** (Phase 7)
- [ ] **Biological intervention ledger complete** (Phase 7.5 — gold nuggets relocated; gap report recorded)
- [ ] Duplicate biology removed from TA surface **only after** architecture + Phases 7 and 7.5 migration
- [ ] Architecture strengthened (new or updated FM/PM/KC/SM content where needed)
- [ ] Evidence gaps documented (Phase 8 §6)
- [ ] Future expansion opportunities recorded (Phase 8 §7)
- [ ] Hub levers regenerated (`npm run brs:generate-hub-levers`)
- [ ] Bib keys validate (`node scripts/validate-bib-citation-keys.mjs`)
- [ ] PM Evidence Highlights regenerated where hub tables changed

---

## Core principles

### The architecture comes first

The BRAIN architecture is the permanent knowledge base. Therapeutic Areas are interpretations built upon it.

### Biology is never deleted

Biology is migrated. Evidence is propagated. Knowledge accumulates.

### Every revision improves the framework

Updating one TA should improve the BRS, FMs, PMs, SMs, KCs, Phenome Knowledge Database, and future TA pages. Every iteration leaves the architecture stronger than before.

### Conservative scientific interpretation

The framework distinguishes:

| Tier | Meaning |
|------|---------|
| **Direct evidence** | TA population or TA-labelled intervention (hub dropdown eligible) |
| **Inferred mechanistic evidence** | General science + plausibility — **architecture pages only** on BRS hubs |
| **Biological plausibility** | Mechanism-level context without TA outcome claim |
| **Translational interpretation** | How evidence supports BRAIN reading of the condition |
| **Therapeutic evidence** | Established intervention efficacy — rarely claimed from inferred mechanistic work alone |

**These categories must never be conflated.**

### Deduplication across page layers

| Layer | Owns |
|-------|------|
| Hub Overview | BRS ambition; high-level cross-BRS pointers |
| Hub levers block | Actionable foods, patterns, lifestyle |
| TA surface (this standard) | TA-specific evidence, interpretation, gaps, expansion flags |
| FM / PM pages | Mechanistic depth, phenome rows, evidence highlights |

Remove from TA surfaces biology already fully covered in Overview or levers unless needed for TA translational framing.

---

## BRS ADHD alignment status (v1.2)

| BRS | Hub file | Phase 8 TA | Phase 7 / 7.5 |
|-----|----------|------------|----------------|
| BRS1 | `neurotransmitter-regulation.md` | Legacy — audit pass | Not refactored |
| BRS2 | `methylation-one-carbon-metabolism.md` | Legacy — audit pass | Not refactored |
| BRS3 | `inflammation-oxidative-stress.md` | Legacy — audit pass | Not refactored |
| **BRS4** | `mitochondrial-function-bioenergetics.md` | **TA reference** (local) | **Phase 7 complete; Phase 7.5 partial** (ledger gaps: organ meats as signature foods) |
| **BRS5** | `gut-brain-axis-enteric-nervous-system.md` | **TA reference** (local) | **Phase 7 complete; Phase 7.5 partial** (substances hub section pending) |
| BRS6 | `metabolic-neuroendocrine-stress.md` | Next refactor | **Apply Phase 7 + 7.5 with refactor** |

### BRS4 Phase 7 / 7.5 backlog (from live-site audit)

Content currently on the live TA Introduction that must migrate to levers or architecture — **not** return to the TA dropdown:

| Live-site content | Current local home | Phase 7 / 7.5 action |
|-------------------|-------------------|----------------|
| Vitamins/minerals as interdependent enabling layer | KC2, Tardy on PMs | Add cofactor-enabling sentence to `KEY_DIETARY_STRATEGY_PROSE` BRS4 |
| Nutrient-dense animal foods (seafood, eggs, fermented dairy, offal, lean protein) | Partial (salmon, eggs in Target Foods) | Expand strategy prose; consider signature foods for lean meat / dairy |
| Creatine food examples; vegan dietary gap | FM1-PM3 | Add to strategy prose + optional Target Food (beef/lamb) or PM lever bullets |
| Carnitine foods + substrate transport framing | FM3-PM6 | Add carnitine food context to strategy prose |
| CoQ10-rich foods | Salmon, broccoli (partial) | Expand strategy prose; pistachios / organ meats via PM levers or signature caption |
| Early-harvest EVOO (CoQ10, oleuropein, polyphenols) | Olive Oil in KC list only | Add EVOO signature food or strategy gold nugget |
| GSH / oxidative stress context | FM2 evidence, TA table | Cofactor/antioxidant pattern in strategy prose — not TA monograph |
| Polyphenol → urolithin A / mitophagy dietary pattern | Blueberries signature; FM2/FM4 evidence | Expand strategy prose on polyphenol diversity + fermented/plant diversity |
| Butyrate / SCFA brain energy | TA inferred table; BRS5 PM | Cross-BRS note in BRS4 strategy prose (fermentable fibre, barley/oats) |
| Oxalate, boiling greens, mitochondrial redox | Spinach/kale food pages | **FM2 §4.3** (done locally); boiling prep in lifestyle or strategy prose; spinach signature caption |

---

## Philosophy

The objective of the BRAIN Framework is not simply to collect scientific papers.

It is to create a **continuously improving translational knowledge architecture** in which:

- every new study strengthens the biological framework,
- every Therapeutic Area benefits from previous work, and
- scientific knowledge becomes progressively more organised, reusable, and clinically interpretable.

**The methodology — not the individual page — is the enduring intellectual property of the BRAIN Framework.**
