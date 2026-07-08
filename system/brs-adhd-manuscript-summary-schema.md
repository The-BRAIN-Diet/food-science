# BRS ADHD Manuscript Summary Schema

**Version:** 2.1  
**Status:** Active  
**Generator:** `scripts/generate-brs-adhd-manuscript-summaries.py`  
**Integration library:** `scripts/data/brs-cross-integration-evidence.json`  
**Canonical implementation:** BRS hub pages (`npm run brs:generate-hub-cross-integration`)  
**Output:** `manuscript/BRS1-6-ADHD-structure-and-evidence-summary.docx`

The website is the authoritative implementation of cross-BRS architecture. The manuscript synthesises the framework; it must not introduce integration relationships absent from the hub pages.

---

## Purpose

Each BRS summary in the Miguel manuscript must **justify the Biological Regulatory System as a whole** — not catalogue Primary Mechanisms or provide representative PM evidence.

The reader should finish each section convinced that:

> **This Biological Regulatory System represents an important and biologically plausible regulatory domain in ADHD.**

---

## Evidence hierarchy (strict)

| Layer | Manuscript responsibility |
|-------|---------------------------|
| **Paper** | Justifies the BRAIN Framework |
| **BRS summary** | Justifies the Biological Regulatory System |
| **Functional Mechanism** | Justified within FM pages and BRS architecture — referenced by name only in BRS summaries |
| **Primary Mechanism** | Detailed mechanistic evidence — **never** the focus of BRS summaries |

Do not ask BRS summaries to perform the role of PM pages.

---

## Per-BRS section structure

Render in this order:

### 1. Title

`BRSn — {BRS Name}: Biological Regulatory Identity and ADHD-Relevant Evidence`

### 2. Biological Regulatory System identity

- One concise paragraph establishing **what this BRS is** as an integrated regulatory domain.
- Name the **Functional Mechanisms** (FM1–FMn) and their collective role.
- Do **not** list PM IDs, enzyme names, or pathway steps.
- Do **not** read as an architecture inventory.

### 3. Landmark ADHD evidence

- **2–3 studies maximum** per BRS.
- Studies must be conducted in **ADHD cohorts** or **ADHD-labelled intervention trials**.
- Each study must justify **FM-level or BRS-level importance**, not individual PMs.
- Prefer fewer, stronger anchors over weak mechanistic stretches.
- **Exclude** studies whose primary finding is a distant nutritional association unless it directly supports the BRS identity (e.g. dietary B-vitamin patterns do not anchor BRS1 amino-acid precursor biology).

Per-study format:

1. **Citation**
2. **What they found** — factual, concise
3. **Why this matters for the BRS** — FM-level or whole-BRS framing (not PM catalogue)

### 4. Cross-BRS integration Evidence

- Supporting literature for every major Cross-BRS relationship, rendered like Primary Mechanism evidence.
- **1–2 landmark mechanistic reviews per relationship** — not ADHD intervention studies.
- Prioritise integrative neuroscience, systems biology, allostasis, and neuroinflammation reviews.
- Source from `scripts/data/brs-cross-integration-evidence.json`.

Per-relationship format:

1. **Relationship label** (e.g. BRS4 → BRS1)
2. **Brief integration statement**
3. **Landmark citation(s)** with what each supports

### 5. Translational interpretation

Must explicitly answer:

1. **Why does regulating this BRS have potential relevance for ADHD?**
2. **How might regulating this BRS contribute to adaptive capacity, lower stress burden, or higher resilience under allostatic load?**

Requirements:

- Persuasive argument, not evidence summary.
- Emphasise modifiable regulatory capacity.
- Refer to Cross-BRS integration Evidence rather than restating uncited mechanistic claims.
- Do **not** relabel every BRS as “allostatic” — see Allostasis gateway rules below.

### 6. References

- Landmark ADHD papers supporting BRS identity and FM-level anchors.
- Cross-BRS integration references (deduplicated).
- Foundational allostasis citations appear in the manuscript introduction only.

---

## Study selection rules

### Include when

- Study defines ADHD biology at the **system** or **FM** level.
- Study demonstrates **modifiable** biology relevant to the whole BRS.
- Study is a landmark review or meta-analysis synthesising ADHD relevance for the domain.

### Exclude when

- Study only supports a single PM without FM/BRS significance.
- Study demonstrates dietary pattern ↔ biomarker association without direct BRS biological identity (e.g. Wang 2019 B-vitamins for BRS1-FM1-PM1).
- Study is general mechanistic biology with no ADHD cohort.

### FM coverage principle

Landmark evidence should collectively support the **major Functional Mechanisms** within the BRS. It is not required to anchor every FM with a separate study.

---

## Allostasis gateway rules

The BRAIN Framework does **not** propose allostatic load as a primary explanation of ADHD. Allostatic theory is a **complementary organising model** for adaptive capacity, resilience, and regulatory burden.

| BRS | Allostasis framing |
|-----|-------------------|
| **BRS6** | Principal allostatic gateway — HPA rhythm, autonomic balance, glycaemic stability, stress–metabolic load allocation |
| **BRS1** | Neurochemical flexibility supporting attention, motivation, arousal, behavioural control under demand |
| **BRS2** | Methylation, repair, and phospholipid capacity for adaptation and maintenance |
| **BRS3** | Inflammatory and redox load control |
| **BRS4** | Bioenergetic reserve and recovery capacity |
| **BRS5** | Gut-derived immune, metabolic, and vagal signalling |

### Cross-BRS integration architecture

| Section | Role |
|---------|------|
| **Cross-BRS integration Evidence** | Landmark reviews supporting each adaptive dependency (relationship statement + citations) |
| **Translational interpretation** | ADHD relevance and adaptive capacity — points to evidence above |

Use **adaptive dependency** language. Examples (summaries only; evidence in integration library):

- BRS4 → BRS1: bioenergetic capacity supports neurotransmitter synthesis, vesicle cycling, and synaptic signalling.
- BRS3 → BRS1: inflammatory and oxidative burden modulate monoamine, glutamate, and GABA biology.
- BRS6 → BRS1: HPA-axis regulation, autonomic balance, and glycaemic stability shape neurotransmitter signalling under stress.
- BRS2 → BRS1: one-carbon metabolism and BH4 cofactor chemistry support monoamine synthesis.
- BRS5 → BRS1: gut-derived metabolites and vagal signalling modulate central neurotransmission.

Do not force allostasis into every BRS. BRS6 remains the principal allostatic gateway.

---

## Manuscript introduction (document-level)

The generated Word document must include:

1. Revised objective statement (BRS justification, not PM catalogue).
2. Allostasis positioning paragraph (BRS6 gateway; not ADHD causation claim).
3. Evidence hierarchy reminder.

Foundational allostasis references (introduction only):

- Sterling & Eyer (1988)
- McEwen (1998, 2006)

---

## Editorial success test

A reviewer should finish each BRS summary thinking:

> **"There is compelling evidence that this Biological Regulatory System represents an important and modifiable aspect of ADHD biology."**

---

## Related documents

- `scripts/data/brs-cross-integration-evidence.json` — landmark mechanistic evidence for cross-BRS relationships
- `system/brain-ta-evidence-integration-standard.md` — TA evidence workflow
- `system/brs-hub-ta-adhd-dropdown-schema.md` — hub ADHD evidence inclusion rules
- `system/brs-adhd-manuscript-summary-schema.md` — this document
