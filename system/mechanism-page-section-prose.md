# Mechanism Page — Section Body Prose

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names.

## Scope

Applies to **PM**, **FM**, **SM**, and **KC** pages under `docs/biological-targets/**/{pm,fm,sm,kc}/`. BRS hub pages should follow the same principle within each section defined in `system/brs-page-schema.md`.

## Rule

**References stay with the PM they support.** In Biological Relevance and in every other section, do not cite a study because another PM uses it. A reference may appear on this page only when it supports a claim about this page’s own mechanism. A sentence that only sets a boundary with a neighbouring PM names that PM, for example “see PM2”, and carries no citation.

**Sections should never begin by restating the title or definition.**

Each section must follow **only** the schema role for that section (Definition, Primary Biological Effects, Phenome Connections, Mechanistic Basis, Dietary Requirements, Connected Mechanisms, etc.). Do not open a section with boilerplate that repeats what the heading or a prior section already established.

### Do not use as section openers

- Restating the page title or entity ID (e.g. `BRS1(SM-CROSS1) is…`, `BRS6-FM2-PM5 describes…`)
- Restating the **BRS name or number** (e.g. `BRS1 — Neurotransmitter Regulation…`, `Within BRS2…`) when the page is already scoped to that BRS
- Paraphrasing the **Definition** section at the start of Primary Biological Effects, Mechanistic Basis, Dietary Requirements, or §5.5
- Generic filler (`This section covers…`, `The following describes…`)

### Allowed

- **One** in-body title line after front matter: `## <Entity_ID> - <Title>` (per PM/FM/SM/KC section-order schema)
- Entity IDs **inline** when linking or distinguishing mechanisms (e.g. `[BRS3-FM3-PM7 — …](href)` mid-paragraph)
- Canonical **bullet lists** in connected-entity subsections (§5.3 PMs, §5.4 FMs, hub FM/KC lists)
- **`### Summary`** under Mechanistic Basis: short synthesis for that section only — not a copy of §1 Definition

## Page title block

After front matter, each mechanism page opens with:

```
## <Entity_ID> - <Scientific Title>

(<Functional descriptor — explains biological role>)

## 1. …
```

**§1 heading by page type:** PM Profile A → `## 1. Mission & Overview`; FM/SM → `## 1. Definition` or `## 1. Mission & Overview`; KC → `### 1. Ambition`.

**Functional descriptor rule:** The **title names the mechanism**; the **functional descriptor explains its biological role**. Do not restate the scientific title — describe what the mechanism does in the body (lay-readable, parenthetical line under the title). Applies to **hub pages**, **FMs**, **PMs**, **KCs**, and **SMs** where used.

**Principle:** Translate, do not dumb down. Keep scientific terms; explain them inline in **parentheses** on first use so both specialist and non-specialist readers can follow without leaving the page.

**Canonical FM example:** [BRS1(FM1) — Monoaminergic Function](/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function).

## Per-section intent (reminder)

| Section | Write |
|---------|--------|
| **§1 Mission & Overview (PM)** | Biological ambition → purpose, health significance and practical support; preferred Benefits / Implementation Notes / Biological Relevance bullets, adaptable to evidence | Technical evidence dump; unsupported benefit/action claims; unexplained architecture |
| **§1 Definition / Mission & Overview (FM/SM legacy)** | **Translational opening paragraph (1–3 sentences) + 3 bullets** — see **PM §1** for migration target |
| **Phenome Connections (PM / FM / SM §7)** | Evidence-weighted translational mappings only — not mechanism definition |
| **Primary Biological Effects (§2)** | Directional ↑/↓ summary only |
| **Mechanistic Basis (PM)** | **Summary → primary mechanism → boundaries → integration** (see below); link PMs/KCs/citations; do not re-define the entity |
| **Intervention Summary (PM §3)** | Intervention Profile + lever tiers with evidence tags — not mechanism definition |
| **Dietary Requirements / Lifestyle Levers** | Pattern → Nutrients → Biology → Target Foods — only after §1 establishes why the mechanism matters |
| **§5.5 Connected Mechanisms** | Cross-domain placement prose + PM links — not a second Definition |

## PM Mechanistic Basis — canonical structure

Mechanistic Basis is the **starting boundary** for bounded evidence assessment, not
an immutable one. If adjudication materially changes what the PM can claim, flag a
PM-scope consequence and review Mission, Overview, and Mechanistic Basis together
(`system/primary-mechanism-schema.md` § **PM scope consistency (evidence assessment)**).

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

## §1 Definition — translational UX (paragraph + bullets)

Applies to **PM**, **FM**, and **SM** pages. KC pages follow `system/key-constraint-schema.md` with `### 1. Ambition` (not `Definition`). BRS hub pages use **`## Overview`** with the same translational contract (see `system/brs-page-schema.md`).

**Principle:** Translate, do not dumb down. Retain scientific terms; gloss them inline in **parentheses** so both audiences can read without leaving the page.

### Opening paragraph (translational)

- 1–3 sentences explaining everyday function.
- Specialist terms kept; unfamiliar terms introduced in **parentheses** on first use.
- **Avoid** opening with dense technical language without context — weave specialist terms into the translational paragraph with parenthetical glosses instead.

**Canonical FM example:** [BRS1(FM1) — Monoaminergic Function](/docs/biological-targets/brs1/fm1/brs1-fm1-monoaminergic-function).

### Functional role bullets

3 concise bullets (4–5 where needed) immediately after §1 paragraph: what it supports, primary BRS (`— within BRSn`), cross-BRS influence (`— Supporting BRSn`).

Technical/architectural detail belongs in **Mechanistic Basis**, not a separate definition section.

## PM §1 — Mission & Overview

**Scope:** All **Profile A PM** pages. **FM** and **SM** pages may use `## 1. Definition` or `## 1. Mission & Overview`. **KC** pages keep `### 1. Ambition`. **BRS hub** pages use `## Ambition` + Dietary Guidance per `system/brs-hub-levers-schema.md`.

**Canonical heading (Profile A PM):**

```
## 1. Mission & Overview

### Mission
[1–2 lines]

### Overview
[~65–75 words — purpose/health/usefulness paragraph + normally Benefits, Implementation Notes and Biological Relevance bullets; adapt when evidence is insufficient]
```

**20-second acid test:** Can someone understand this page's purpose in ~20 seconds? If not, the Overview is doing too much.

### Mission

Answers:

> What biological capability is this PM trying to maintain or support?

| Do | Avoid |
|----|--------|
| Describe a **functional biological capacity** | Repeat the PM title |
| State biological ambition in 1–2 lines | Nutrients, foods, interventions, biomarkers |
| Use plain, outcome-oriented language | Pathway teaching, enzymes, citations |

**Good examples:**

- Maintain coordinated glutamate clearance to preserve excitatory–inhibitory stability.
- Maintain a resilient gut microbial ecosystem that supports beneficial metabolite production and gut–brain signalling.
- Maintain efficient ketone utilisation to support flexible neuronal energy metabolism.

**Front matter:** `mission`

### Overview

**Job:** Make the reader think *"Ah, this is why [this mechanism] matters"* — not teach full pathway or parent-FM architecture.

**Governing rule:** Follow [Stage 2A — Evidence-supported Overview](scientific-finding-schema.md#evidence-supported-overview-stage-2a) for paragraph content, preferred bullet roles, adaptation, evidence reuse, claim boundaries and completion checks. Follow [PM §1 — Mission & Overview](primary-mechanism-schema.md#pm-1--mission--overview) for page structure and frontmatter. This section supplies writing aids and an illustrative example, not a second assessment contract.

| Do | Avoid |
|----|-------|
| Explain purpose, health significance and supported routes in plain language | Technical evidence summaries in the opening |
| Give useful implementation context at the adjudicated claim ceiling | Invented doses, generic food lists or experimental effects recast as human recommendations |
| In Benefits, name the function maintained and why it matters, at the highest level the page’s evidence supports | A mechanism description followed by a study limit; an invented clinical outcome; the same benefit repeated on neighbouring PMs |
| Name one nutritionist mix-up in Biological Relevance | Framework placement, or a mix-up the paragraph already states |
| Put mechanism boundaries and measurement detail in §4 Mechanistic Basis / Scientific Findings | Boundary and limitation bullets replacing the reader's orientation |

`summary` stores the opening paragraph; bullets are body-only. Retain claim-local numbered citations. See the live PM3 source for the exact current evidence-supported example; do not restore the former generic “keystone taxa / plant diversity / resilience” example.

**Worked PM3 example (use with its canonical references and admitted input disclosures):**

> Some gut microbes help maintain the mucus layer that separates the intestinal contents from the gut lining, and they influence local immune responses. These functions matter because a protective mucus barrier reduces unwanted microbial contact, while appropriately regulated immunity helps prevent inflammatory injury. This PM concerns those protective microbial activities. [[6]](#pm-ref-6) [[7]](#pm-ref-7)
>
> - **Benefits:** Maintaining protective mucus and regulated local immunity can help protect the gut lining from microbial contact and inflammatory injury. [[6]](#pm-ref-6) [[7]](#pm-ref-7)
> - **Implementation Notes:** Oligofructose-enriched inulin is the studied fibre preparation, and it is distinct from Bifidobacterium longum NCC2705. They are not interchangeable, and no routine human regimen is established here. [[6]](#pm-ref-6)
> - **Biological Relevance:** Mucus maintenance and protection from experimental intestinal inflammation are separate microbial actions, not one general gut benefit. [[6]](#pm-ref-6) [[7]](#pm-ref-7)

Example reference numbers are local to PM3. Resolve citations from each target PM's bibliography; do not copy or renumber PM3's references for other pages. Detailed mechanism and endpoint boundaries remain in PM3 §4.

### §1 role split (PM)

| §1 subsection | Role | §4 Mechanistic Basis |
|---------------|------|----------------------|
| **Mission** | Biological ambition | `### Summary` — implication in depth |
| **Overview** | Context + job + importance + high-level diet frame (paragraph + 3 bullets) | Primary mechanism `####` blocks — how it works |

After reading §1 only, a non-specialist should understand what the mechanism does, why it matters, and how diet relates at a high level — without reading §4 pathway detail first.

**Canonical PM example:** [BRS5-FM1-PM3 — Microbial Barrier–Immune Interface Support](/docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support).

## PM translational writing

Write to the **Stage 2A audience** in `system/primary-mechanism-schema.md`
(interested members of the public; nutritionists as the most technically
specialised intended readers). Do not assume PhD-level biology knowledge.
Translate; do not delete substantive science or replace it with generic
statements. Reader-facing copy explains the biology. Ownership, adjudication
and record-maintenance language stay in reports, schema documentation and
Review & Corrections.

**PM §1 narrative arc:** biological story → mechanism (§5) → diet (§4) — not textbook biology followed by a food list.

**Principle:** Translate, do not dumb down. Keep scientific terms; gloss unfamiliar terms inline on first use.

## Technical language policy (PM, FM, SM)

When uncommon scientific terms first appear, provide a short plain-English definition immediately afterwards in brackets.

| Term | Gloss |
|------|--------|
| Ketones | alternative energy molecules produced from fat |
| Substrate | the biological material used to fuel or build a process |
| Taxa | groups of related microorganisms |
| Excitotoxicity | cell damage caused by excessive excitatory signalling |
| Glycaemic variability | fluctuations in blood glucose over time |
| Short-chain fatty acids | beneficial microbial metabolites produced from fibre |
| One-carbon metabolism | the biochemical network that transfers methyl groups between molecules |

Do **not** over-explain common biological terms. Definitions remain concise.

## Functional descriptors

Formal naming convention for **BRS hub pages**, **FMs**, **PMs**, **KCs**, and **SMs** where used.

```
## <Entity_ID> - <Scientific Title>

(<Functional descriptor — biological role>)
```

The **title names the mechanism**; the **functional descriptor explains its biological role** — what it accomplishes, not a restated scientific name.

Examples:

- LAT1 Competitive Transport → `(Regulating Amino Acid Entry into the Brain)`
- Keystone Taxa Support → `(Maintaining Beneficial Microbial Communities & Gut Ecosystem Function)`
- Ketone Utilisation Capacity → `(Using Ketones to Sustain Cellular Energy During Fuel Transitions)`

Source: `scripts/data/mechanism-functional-descriptors.mjs`; `npm run mechanisms:apply-functional-descriptors`.

## PM §3 — Dietary Requirements framing

**§3.1 Dietary Requirements** must never be the first place that explains why foods matter.

Before opening 3.1, readers should already understand from §1 Overview:

- the biological function;
- the regulatory purpose;
- the mechanism being supported.

Within **3.1**, distinguish Direct vs Derived dietary relationships, then the biochemical cofactor/substrate inventory, then Key Constraints. Use **Pattern → Nutrients → Biology → Target Foods** (substance ← food bullets per `system/substance-food-mapping-format.md`) only where food mapping is evidence-supported. Hub Dietary Guidance follows the same frame (`system/brs-hub-levers-schema.md`). Untouched PMs may still use the former Dietary Levers headings.

**§3.2 System Optimisation** and **§3.3 Lifestyle** build on the same biological framing — they do not re-introduce why the mechanism exists.

## PM UX progression

PM pages should progressively answer:

1. **What** is this mechanism? — title + functional descriptor
2. **Why** does it matter? — Mission + Overview (paragraph + bullets)
3. **How** can diet and lifestyle support it? — §3 (legacy §4)
4. **What** dietary relationships apply? — §3.1.1–3.1.3
5. **What** evidence supports these relationships? — §4; §4.1; §5

**Avoid:** repetitive introductions; repeating the PM title in Mission or Overview; specialist concepts before glossing; isolated molecules, biomarkers, or microbial species when a **biological capacity** frame is clearer.

## §1 Mission & Overview — FM / SM

**Scope:** FM and SM pages on `## 1. Mission & Overview` or `## 1. Definition`. PM pages follow **PM §1 — Mission & Overview** above.

```
## 1. Mission & Overview

### Mission
[1–2 lines max]

### Overview
[~65–75 words + exactly 3 scannable bullets]
```

| Part | Role | Rules |
|------|------|--------|
| **Mission** | Biological ambition | Same rules as **PM §1 — Mission** |
| **Overview** | Context + significance | Follow the FM/SM governing schema for structure; apply the plain-language purpose/health/usefulness principles above. The PM bullet-count exception applies to PMs. |

**Front matter:** `mission` + `summary` (Overview paragraph).

## §1 Definition — legacy UX structure (paragraph + three bullets)

Applies to **PM**, **FM**, **SM**, and **KC** pages (`## 1. Definition` or `### 1. Definition`). BRS hub pages use **`## Overview`** with the same contract (see `system/brs-page-schema.md`).

The Definition is the **primary user-facing explanation** of the mechanism. Think **“Why does this mechanism matter?”** before **“How does it work?”** — detailed pathways, enzymes, transporters, and boundaries belong in **Mechanistic Basis** (PM §5 / FM §4), not in §1.

**Do not add subheadings** inside §1 (no “Key Roles”, “Key Functions”, “Technical Overview”, or similar).

### Opening paragraph

**Purpose:** Explain what the mechanism does, why it matters, and its role in brain and body health.

**Requirements:**

- 1–3 sentences.
- Written for an intelligent non-specialist.
- Focus on biological significance, not biochemical implementation.
- Avoid excessive jargon, enzymes, pathways, and transporters.

Front matter `summary` / `overview` should align with this paragraph’s intent.

### Three bullets (required)

For PMs, follow the adaptive Benefits / Implementation Notes / Biological Relevance rule above. For other page types, follow the opening paragraph with **exactly 3 concise bullets** highlighting important downstream biological consequences or cross-system effects.

**Requirements:**

- No heading above the bullet list.
- Each bullet leads with **biology**, not framework terminology.
- Understandable to a non-specialist.
- End with a connected BRS reference where relevant — e.g. `— Supporting BRS1`, `— within BRS2`.

**Good bullet:** `Supports neurotransmitter synthesis and regulation through methylation-dependent pathways — Supporting BRS1.`

**Poor bullet:** `Contributes to BRS1-FM1 monoaminergic integration via PM3–PM5 cross-links.`

### Role split (Definition vs Mechanistic Basis)

| §1 Definition | §5 Mechanistic Basis (PM) / §4 (FM) |
|---------------|-------------------------------------|
| What + why (paragraph) | Why it matters in depth (`### Summary`) |
| Cross-system significance (3 bullets) | Detailed how — pathways, boundaries, integration |
| No citations required | Evidence-anchored; citations required where claims are literature-backed |
| No enzymes, transporters, or boundary essays | Enzymology, evidence highlights, PM cross-links |

### Success test

After reading §1 only, a non-specialist should understand what the mechanism does, why it exists, and why it matters — including how it connects to other body systems. If the opening primarily describes chemistry or enzymes, rewrite.

**Canonical PM example:** [BRS2-FM1-PM1 — Folate/B12-Dependent Homocysteine Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation).

### Entity-specific notes

| Entity | §1 heading | Paragraph focus | Bullet focus |
|--------|------------|-----------------|--------------|
| **PM (Profile A)** | `## 1. Mission & Overview` | Mission + Overview (~65–75 words) | Overview: normally Benefits / Implementation Notes / Biological Relevance; adapt to evidence |
| **FM** | `## 1. Definition` or `## 1. Mission & Overview` | Emergent integrated state and why it matters | Cross-system effects of the FM state |
| **SM** | `## 1. Definition` | Why this interpretation layer matters | How the SM changes reading of connected biology |
| **KC** | `### 1. Ambition` | Desired state of shared resource availability | What functions become constrained when the pool is strained |
| **BRS hub** | `## Overview` | System purpose and brain/body integration | Cross-BRS significance of the whole BRS |

**§4 UX:** `### Summary` stays **outside** `<details>`; the four-part `####` narrative goes **inside** one `<details>` block. `### 4.1 Evidence Highlights` follows the dropdown as a subsection of `## 4.`, not inside it.

## PM §4.1 — Scientific Findings

**Governance:** `system/scientific-finding-schema.md` § Bounded assessment — the
ontology proposes the question; evidence gets to challenge it. Define proposition
→ assess relevant evidence → adjudicate → stop.

**Placement:** `### 4.1 Scientific Findings` (or legacy `Evidence Highlights`) at the end of `## 4. Mechanistic Basis` (Profile A), or `### 2.1` at the end of `## 2.` (Profile B). Not inside the mechanism `<details>` block.

| Do | Avoid |
|----|--------|
| Explain why a finding matters for this PM | Restating §4 mechanism biology |
| Prefer landmark trials, meta-analyses, human relevance, synergy/limitation insights | Exhaustive or redundant paper summaries |
| Insight-first prose with target-page numbered bibliography links | Methods-heavy study recaps |
| Reuse bibliography entries; add BibTeX only when needed | Plain-text or unlinked “see study X” bullets |

**Core principle:** §4 = how the mechanism works. §4.1 = how we know (findings that change interpretation).

**§4.1 UX (reference: BRS1 PM1, BRS1 PM2):** `#### Summary` stays visible; individual Scientific Findings follow in the existing shared disclosure components (legacy Evidence Highlights retain their existing components). Do not repeat §4 mechanism prose in §4.1. The visible Summary synthesises the strongest adjudicated findings and overall evidence picture, including studied context and principal limitations; follow Stage 2A’s “Scientific Findings — Summary authoring rule”.

## PM section roles — avoid triple repetition

| Section | Role | Do | Avoid |
|---------|------|-----|--------|
| **§1 Mission & Overview (PM)** | Biological ambition + brief orientation (~65–75 words) + 3 scannable bullets | Mechanism biology dump; foods; parent-FM architecture; title paraphrase |
| **§5 Summary + blocks** | How it happens | Restating §1; food lists; evidence-trial recap |
| **§4.1 Scientific Findings** | How we know — proposition-bound Findings with citations | Re-explaining LAT1, NF-κB, Nrf2, etc.; **phenome/outcome science** unless it tests a defined relationship proposition (otherwise §3 or Connected / Supportive Evidence) |

Optional **`#### (Cross-BRS relevance of …)`** inside the mechanism dropdown when a PM's foods span multiple BRS domains (reference: BRS1 PM1 protein foods).

## Mechanistic Basis opening (FM / SM)

The **`### Summary`** (or first paragraph of § Mechanistic Basis on **FM** and **SM** pages) should open with the **interesting implication**, then explain integration. Do not open with entity IDs, “this page describes…”, or a restated Definition.

| Page type | Open with (implication) | Then explain |
|-----------|-------------------------|--------------|
| **FM** | Concise Functional Rationale (§4.1) | Evidence Summary (§4.2), then Suboptimal Function (§4.3); PM/KC links sit above section 1 |
| **SM-CROSS** | Why the signal is inherently multi-domain | The cross-system concept (e.g. few systems span neural, immune, gut, and circadian biology — then histamine) |
| **SM-SNP** | Variant interpretation at stake | Connected host PM biology (§4); do not duplicate PM §4 structure on SMs unless overlay-specific |

FM pages use the concise synthesis layout in `functional-mechanism-schema.md`, without an expanded PM-by-PM narrative; §5.5 (SM-CROSS) remains for cross-BRS **PM links**, not for repeating the Summary implication.

Referenced from: `system/primary-mechanism-schema.md`, `system/functional-mechanism-schema.md`, `system/specific-mechanism-schema.md`, `system/key-constraint-schema.md`.
