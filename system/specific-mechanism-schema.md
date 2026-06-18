# Specific Mechanism (SM) Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`** (same as PM).

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names.
- SMs are **not** a separate rendering system — they reuse the PM page contract (section order, collapsible blocks, scoreable table, bibliography rules, validators).

## Ontology layers (framework interpretation)

| Layer | Role |
|-------|------|
| **KC** | Feasibility conditions — shared sufficiency and constraint context |
| **PM** | Bounded biological mechanisms |
| **FM** | Integrated biological states emerging from coordinated PMs — capacities, desired states or regulatory conditions; principal biological targets of the framework |
| **SM** | Interpretation layers — context-specific reading of stable biology |

The ontology describes biology. Therapeutic-area framing (e.g. ADHD) belongs on **BRS hub pages**, introductions, and rationale sections — not as a primary SM category.

## Core principle

**PMs** define stable, intervention-influenceable regulatory mechanisms.

**Specific Mechanisms (SMs)** are interpretation layers: context-specific expressions of stable biological regulation grounded in connected PMs, FMs, and KCs. They use the same PM rendering architecture, with categories:

- **SM-SNP** — variant-sensitive interpretation (e.g. COMT, MTHFR, DAO, PEMT)
- **SM-PHEN** — phenotype-sensitive interpretation (e.g. emotional dysregulation, hyperarousal, histamine sensitivity, sensory responsiveness, cognitive fatigue)

### SM-PHEN pages (phenome interpretation layer)

`SM-PHEN` pages are **phenotype interpretation layers** hosted on a single BRS. They read stable biology from connected host PMs/FMs/KCs and apply it to a **registry phenome** (`src/data/phenome-registry.json`) — without redefining PM mechanism biology.

**Core discipline**

| Layer | Owns |
|-------|------|
| **PM** | Mechanism biology (synthesis, transport, signalling pathways, cofactors) |
| **FM** | Integrated biological states emerging from coordinated PMs |
| **SM-PHEN** | Phenotype interpretation — how connected host biology may relate to a functional phenome pattern |

**One phenome, many SMs.** The same registry phenome (e.g. **PH003 — Emotional Regulation**) may have **multiple SM-PHEN pages** across different BRS domains (e.g. BRS1 monoaminergic interpretation, a future BRS3 inflammatory interpretation). Each SM owns **one BRS interpretation lens** only. Do not collapse cross-BRS phenome biology into a single SM; use additional host-BRS `SM-PHEN` pages or `SM-CROSS` when the [SM-CROSS test](#sm-cross-test-qualification-gate) applies.

**Required front matter (SM-PHEN)**

```yaml
interpreted_phenome:
  id: PH003                    # registry id from phenome-registry.json
  name: Emotional Regulation   # must match registry name exactly
interpretation_lens: string    # short BRS-specific lens, e.g. "BRS1 monoaminergic precursor, transport, and signalling context"
```

`use_case` remains a concise phenotype framing string; `interpreted_phenome` + `interpretation_lens` tie the page to the Phenome Registry.

**§1 Definition** — describe the **phenotype pattern** (emotional reactivity, affective instability, stress responsiveness, sensory overwhelm, etc.), not a neurotransmitter or PM pathway. Therapeutic-area context (e.g. ADHD prevalence of emotional dysregulation) may appear briefly with phenotype-relevant citations; mechanism detail belongs on PM pages.

**§2 Phenome Connections** — link to the registry phenome (`/docs/phenomes/index#<id>`). State that this page is **one interpretation lens** on that phenome. Use a single `<details>` dropdown per interpreted phenome with confidence, evidence level, translational rationale, and key references — **do not** duplicate PM `phenome_relationships` prose or list every connected PM.

**§4 Primary Biological Effects** — directional summary oriented to **phenotype regulation** (reactivity, stability, tolerance, control), not transmitter synthesis pathways.

**§5 Mechanistic Basis** — `### Summary` must open with the **emergent-phenotype framing** (multi-system phenotype, host BRS contributes one component). Use `<details>` for interpretation-layer bullets that **link to connected PMs** in one or two sentences each. **Do not** explain serotonin biology, tryptophan metabolism, LNAA transport, or other PM-owned pathways in detail — those belong on PM1–PM4 (or relevant host PMs).

**§6.3 / §6.4** — bullet lists for host-BRS `connected_pms` / `connected_fms` only.

**§6.5 Connected Mechanisms** — **recommended** when the phenotype is materially influenced by other BRS domains. Brief paragraph-led cross-links to **specific PM pages** on BRS3, BRS5, BRS6, etc. Do not explain those systems in PM depth.

**Reference implementation:** `docs/biological-targets/brs1/sm/brs1-sm-phen2-emotional-dysregulation-monoaminergic-interpretation.mdx`.
- **SM-CROSS** — cross-system interpretive concepts spanning multiple BRS domains simultaneously, not naturally owned by a single PM or FM

SM-CROSS pages are **not** bounded mechanisms and **not** phenotype pages. They explain **cross-system biological concepts** that influence or connect multiple BRS domains (e.g. histaminergic arousal and neuroimmune crosstalk spanning BRS1, BRS3, BRS5, BRS6).

### SM-CROSS test (qualification gate)

A page should use `sm_category: SM-CROSS` **only if both** conditions are met:

1. **Multi-BRS span** — The concept **materially spans ≥ 2 BRS domains** (not a passing mention of another BRS; the interpretive story requires placement across domains).
2. **No single PM/FM owner** — The concept **cannot be naturally owned by a single PM or FM** (if one PM or FM already defines the biology cleanly, extend that page or use `SM-PHEN` / `SM-SNP` on the host BRS instead).

**Pass examples:** histaminergic arousal and neuroimmune crosstalk (BRS1 + BRS3 + BRS5 + BRS6 crossover); future candidates such as endocannabinoid signalling context or stress adaptation / allostatic load when genuinely multi-domain.

**Fail → use elsewhere:**

| Situation | Prefer |
|-----------|--------|
| Biology fits one PM | That **PM** page (or expand it) |
| Biology fits one FM’s integrated state | That **FM** page |
| Single-BRS phenotype or variant pattern | **`SM-PHEN`** or **`SM-SNP`** on the host BRS |
| Therapeutic-area framing only | **BRS hub** rationale sections |

If only one condition holds (e.g. spans two BRSs but one PM already owns the mechanism), **do not** classify as SM-CROSS.

SMs must remain mechanistically grounded in connected PMs, FMs, and KCs. They must not redefine PM biology, duplicate FM pages, make diagnostic claims, imply deterministic SNP outcomes, prescribe treatments, or exaggerate efficacy.

### Retired category: SM-ADHD

`SM-ADHD` is **not** a valid category. Do not create new SM-ADHD pages. Existing therapeutic-area content should live on BRS hubs or be reclassified as `SM-PHEN` (genuine phenotype) or `SM-CROSS` (multi-BRS interpretive concept).

### BRS-X cross-system layer

Genuinely cross-system biological networks that span multiple BRS domains and cannot be owned by a single BRS are documented as **BRS-X** systems (see `system/brs-x-schema.md`). Initial systems: `BRS-X(ECS)` (endocannabinoid system) and `BRS-X(Hormones)` (hormone signalling & regulation). SM-Female and SM-Male may reference BRS-X(Hormones) FMs and PMs without owning those mechanisms.

`SM-CROSS` pages remain interpretation layers hosted on a BRS hub for navigation. When a concept matures into a bounded cross-system mechanism with PM/FM ownership, migrate to the appropriate `BRS-X(...)` namespace rather than expanding SM-CROSS indefinitely.

## Required top-level front matter

```yaml
title: string
sm_id: string                    # e.g. "BRS1(SM-PHEN1)" or "BRS1(SM-CROSS1)"
sm_category: string               # SM-SNP | SM-PHEN | SM-CROSS
use_case: string                  # short phenotype / variant / cross-system framing
parent_brs: string                # e.g. "BRS1" (host BRS for the page)
summary: string                   # <=120 words
connected_pms:
  - id: string
    name: string
    href: string
connected_fms:
  - id: string
    name: string
    href: string
connected_kcs:
  - id: string
    name: string
    href: string
intervention_breakdown: string    # same five values as PM/FM
timing_specific: "Yes" | "No"     # required; not a public body section
references:                       # same format as PM pages
  - '[Ramsey et al. (2009) — Circadian Control of NAD⁺ Biosynthesis](/docs/papers/BRAIN-Diet-References#citation_key)'
hide_title: true
```

Optional PM-compatible fields: `intervention_dominance`, `dose_sensitivity`, `mechanistic_authoring_required`, `key_constraints`, `cofactors`.

**SM-PHEN only:** `interpreted_phenome` (`id`, `name`) and `interpretation_lens` — see [SM-PHEN pages (phenome interpretation layer)](#sm-phen-pages-phenome-interpretation-layer).

SMs do **not** use `parent_fm` or `pm_id` — use `connected_*` lists instead.

## SM category (required)

One of:

- `SM-SNP` — variant-sensitive interpretation
- `SM-PHEN` — phenotype-sensitive interpretation
- `SM-CROSS` — cross-system interpretive concepts that pass the [SM-CROSS test](#sm-cross-test-qualification-gate) (≥ 2 BRS domains; no single PM/FM owner)

**§3 Intervention Breakdown** in the public body contains **only** the `intervention_breakdown` value (same as PM pages), for example:

```markdown
## 3. Intervention Breakdown

Food-State Leaning
```

`sm_category` and `use_case` are required in **front matter** only — do not repeat them in the §2 body.

## Section body prose

Same contract as PM pages: sections must not restate the title, `sm_id`, BRS name/number, or Definition; each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section order (Profile A — extended, same as PM)

First body line: `## <SM_ID> - <title>` (level `##`, not `#` or `###`).

1. Definition — phenotype / variant / cross-system framing (not a core PM definition). **`SM-CROSS`:** open with *why* a cross-system page is needed (what single-PM or neurotransmitter-only framing misses) and *how* an SM-CROSS differs from a PM, FM, or `SM-PHEN`/`SM-SNP` page; defer integrative biology to §5 and PM links to §6.5.
2. Phenome Connections — evidence-weighted translational mappings (same contract as PM §3); empty state when none mapped
3. Intervention Breakdown — breakdown value only
4. Primary Biological Effects — directional summary oriented to regulatory balance and resilience
5. Mechanistic Basis — `### Summary` opens with the **multi-domain implication**, then explains the cross-system concept (`### Summary` + `<details>` as on PM pages). **`SM-CROSS`:** implication first (e.g. few systems span neural, immune, gut, and circadian biology → then histamine). See `system/mechanism-page-section-prose.md`. PM links stay in §6.5.
6. Underlying Mechanisms and Requirements
   - `### 6.1` Cofactors and Supporting Inputs
   - `### 6.2` KCs (Key Constraints)
   - `### 6.3` Connected Primary Mechanisms (PMs) — required when `connected_pms` non-empty
   - `### 6.4` Connected Functional Mechanisms (FMs)
   - `### 6.5` Connected Mechanisms — see [§6.5 Connected Mechanisms (authoring contract)](#65-connected-mechanisms-authoring-contract) below
7. Dietary Levers — `<details><summary><strong>Diet</strong></summary>` — use substance ← food bullets per `system/substance-food-mapping-format.md` where listing substrates and example foods
8. Lifestyle Levers — `<details><summary><strong>Lifestyle</strong></summary>`
9. Scoreable Inputs & Modulation Signals — optional; same table categories as PM/FM
10. References — if §9 Scoreable omitted, References is §9

Timing: `timing_specific` in front matter only; discuss timing in Primary Biological Effects, Mechanistic Basis, Lifestyle, or Scoreable when relevant.

### SM-CROSS alignment with PM Profile A (reference: BRS1-FM1-PM1)

`SM-CROSS` pages follow the **PM Profile A extended** teaching model where possible. SMs are not FM-owned, so they do not roll up evidence through an FM integrative layer; cross-BRS PM placement lives in **`### 6.5 Connected Mechanisms`** instead of PM `## 6. BRS Pathways and Connections`.

| PM Profile A (`BRS1-FM1-PM1`) | SM-CROSS equivalent |
|-------------------------------|---------------------|
| `## 1. Definition` | `## 1. Definition` |
| `## 2. Primary Biological Effects` | `## 4. Primary Biological Effects` |
| `## 3. Phenome Connections` | `## 2. Phenome Connections` |
| `## 4. Levers` (4.1 Dietary + 4.2 Lifestyle) | `## 7. Dietary Levers` + `## 8. Lifestyle Levers` |
| `## 5. Mechanistic Basis` (+ optional `### 5.1`) | `## 5. Mechanistic Basis` |
| `## 6. BRS Pathways and Connections` (6.1–6.3) | `## 6. Underlying Mechanisms` — 6.1 Cofactors, 6.2 KCs, 6.3 host PMs, 6.4 FMs, **6.5 cross-BRS narrative (required)** |
| `## 7. Scoreable Inputs` | `## 9. Scoreable Inputs` |
| `## 8. References` | `## 10. References` |
| *(not on PM)* | `## 3. Intervention Breakdown` |

Reuse PM §5 canonical four-part narrative inside SM `## 5.`; keep substance ← food bullets in lever sections; link PMs in §6.5 without duplicating PM mechanism biology. Reference: `docs/biological-targets/brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk.mdx`.

## §6.5 Connected Mechanisms (authoring contract)

### When required

- **`SM-CROSS`:** `### 6.5` is **required** when the interpretive concept spans more than one BRS domain.
- **`SM-SNP` / `SM-PHEN`:** `### 6.5` is **optional**; use when cross-BRS PM context materially clarifies the interpretation (e.g. COMT cross-talk to BRS1, methylation to BRS3).

### Relationship to other §6 subsections

| Subsection | Purpose |
|------------|---------|
| **§6.3 Connected PMs** | Bullet list of **host-BRS** PMs anchored in `connected_pms` front matter — the stable biology this SM reads from on the parent BRS. |
| **§6.4 Connected FMs** | Bullet list of host-BRS FMs from `connected_fms` front matter. |
| **§6.5 Connected Mechanisms** | **Narrative** cross-domain placement: prose paragraphs (and optional `####` subheads) that explain how the SM concept maps across BRS domains, with **inline markdown links to specific PM pages**. |

Do **not** use hub-only labels (e.g. “BRS3 crossover”) without at least one linked PM when a relevant PM exists. Do **not** duplicate full PM definitions — link and interpret.

### Format

- **Paragraph form (preferred):** Explain cross-links in connected prose. Embed links as `[BRSx(PMn) — Name](/docs/biological-targets/brsX/pm/...)`.
- **Optional structure:** Use `####` subheads for priority tiers (e.g. Primary / Secondary / Tertiary) or thematic blocks when an `SM-CROSS` concept spans several domains — each block should still be **paragraph-led**, not bullet-only.
- **Citations:** Use `[Author et al., Year]` in §6.5 when claims need evidence; References per **`system/brs-citation-reference-standard.md`**.
- **§5 vs §6.5:** §5 Mechanistic Basis summarises how **connected host PMs/FMs** support the overlay; §6.5 is where **cross-BRS PM placement** and priority (e.g. primary neurotransmitter home vs gut-interface crossover) are spelled out.

### Example pattern (`SM-CROSS`)

```markdown
### 6.5 Connected Mechanisms

<Concept> is placed by cross-BRS priority through linked PMs, not by reassignment to a single PM home.

#### Primary: <theme> in BRS1

<Paragraph explaining neural/arousal role.> Arousal coupling maps to [BRS1-FM1-PM3 — …](/docs/biological-targets/brs1/pm/…). Circadian crossover maps to [BRS6-FM2-PM5 — Circadian Feeding & Light–Dark Entrainment](/docs/biological-targets/brs6/fm2/brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment) [Ramsey et al., 2009].

#### Secondary: <theme> in BRS3

<Paragraph on immune/inflammatory intersection.> Maps to [BRS3-FM3-PM7 — Cytokine Network Modulation](/docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation) [2].
```

Reference implementation: `docs/biological-targets/brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk.mdx`.

## Validation

```bash
npm run mechanisms:validate
```

Validates SM pages with the same JS contract as PM pages (timing, intervention breakdown, section numbering, scoreable categories, mechanistic basis audit). SM-specific checks: `sm_category`, `use_case`, connected-entity front matter, and §2 category block.

## Spreadsheet

SM rows belong under BRSX in the six-systems workbook (not PM/FM/KC sheets). Generation should reuse PM MDX shell patterns; see `scripts/lib/brs-spreadsheet-generate.mjs` when SM export is wired.
