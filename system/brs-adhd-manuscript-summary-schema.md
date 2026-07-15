# BRS ADHD Manuscript Summary Schema

**Version:** 3.2  
**Status:** Active  
**Generator:** `scripts/generate-brs-adhd-manuscript-summaries.py`  
**Integration library:** `scripts/data/brs-cross-integration-evidence.json` (Systems Integration synthesis only)  
**Output:** `manuscript/BRS1-6-ADHD-structure-and-evidence-summary.docx`

The website is the authoritative implementation of cross-BRS architecture. The manuscript explains the framework architecture; it must not reproduce hub Cross-BRS Dependency sections or catalogue Primary Mechanisms.

---

## Purpose

This document supports the **framework paper** — not six standalone literature reviews. Each BRS summary must **justify why that Biological Regulatory System deserves to exist** as one of the six principal adaptive regulatory systems within the BRAIN Framework.

Target length: **approximately 700–800 words per BRS** (canonical template applied to all six systems); approximately 400–450 words for the conceptual allostasis section.

The reader should finish each section understanding:

- why this Biological Regulatory System exists;
- why it is biologically important in ADHD;
- why it occupies a distinct position within the integrated adaptive architecture;
- how it contributes to resilience and allostasis.

**BRS canonical template (v3.2):** Each BRS summary answers three architectural questions in order:

1. **Why is this biological system fundamental?** — Biological Regulatory Identity. Distinct adaptive regulatory capacity; minimal definitional biology; breadth across major system families where applicable.
2. **Why is this system central to adaptive regulation?** — Systems Integration. Cross-BRS dependencies and mutual constraint; 2–3 landmark mechanistic studies supporting architecture (not field review).
3. **Why is ADHD an appropriate exemplar?** — Landmark ADHD Evidence. **Longest section (~300 words minimum).** Translational argument: does this architecture explain something useful? Separate direct ADHD cohort evidence from broader mechanistic evidence informing the framework.

Allostasis and Adaptive Resilience remains brief — ties BRS to network-level adaptive performance without repeating theory.

**Role within the Adaptive Network** replaces per-BRS allostasis mini-essays. State unique architectural function plus one nutritional translation sentence; reserve allostasis language for the conceptual section and BRS6.

---

## Evidence hierarchy (strict)

| Layer | Manuscript responsibility |
|-------|---------------------------|
| **Paper** | Justifies the BRAIN Framework architecture |
| **BRS summary** | Justifies the Biological Regulatory System |
| **Functional Mechanism** | Referenced by name only — detailed justification lives on FM pages |
| **Primary Mechanism** | Never the focus of BRS summaries |

---

## Per-BRS section structure

Render in this order:

### 1. Title

`BRSn — {BRS Name}`

### 2. Biological Regulatory Identity

One or two paragraphs establishing:

- what adaptive biological capacity the BRS represents;
- why it is organised as a Biological Regulatory System rather than isolated pathways;
- why it is biologically relevant to ADHD.

Name Functional Mechanisms collectively; do not catalogue PM IDs, enzymes, or pathway steps. Define identity — not architecture inventory.

### 3. Landmark ADHD Evidence

**Approximately two landmark studies** per BRS.

Prefer Nature journals, Cell Press, high-impact psychiatric or neuroscience journals, or major systematic reviews where appropriate.

Each study should demonstrate why this BRS is genuinely implicated in ADHD — not exhaust the literature.

Integrated narrative prose; avoid review-article catalogue format.

### 4. Systems Integration

Brief synthesis of how this BRS integrates with the wider framework.

- Do **not** reproduce full Cross-BRS Dependency sections from hub pages.
- Explain principal upstream or downstream biological relationships.
- One or two landmark systems-biology references where appropriate.

Objective: demonstrate that the BRS forms part of an integrated adaptive regulatory network, not an isolated pathway.

Source relationships from `brs-cross-integration-evidence.json` and `hub_cross_brs_summaries`; synthesise — do not copy four-section dependency blocks.

### 5. Role within the Adaptive Network

**Required in every BRS summary.**

State the **unique architectural role** this Biological Regulatory System plays within the integrated network — not a mini-essay on allostasis. Allostatic theory is reserved for the dedicated conceptual section and for BRS6, where resource-allocation logic most directly aligns with McEwen's framework.

Each subsection should answer: *What unique role does this BRS play in the architecture?*

Close with **one sentence of nutritional translation** — why dietary inputs matter for this system's architectural role, not as isolated nutrient targets.

| BRS | Architectural role |
|-----|-------------------|
| BRS1 | Neurochemical expression layer — downstream signalling visible as attention, motivation and behavioural control |
| BRS2 | Biochemical maintenance infrastructure coupling one-carbon metabolism to downstream systems |
| BRS3 | Inflammatory and redox environment within which other systems operate |
| BRS4 | Energetic reserve limiting sustained performance across the network |
| BRS5 | Principal environmental interface for diet, microbiota and peripheral signalling |
| BRS6 | Resource-allocation logic across the network (may reference allostatic theory) |

Do **not** repeat adaptive resilience / allostatic load language across BRS1–BRS5.

### 6. References

Organised under three headings:

1. **ADHD landmark evidence** — approximately two references
2. **Systems integration** — one or two landmark systems-biology references where appropriate
3. **Allostasis and resilience** — landmark references only where required for that BRS

Do not duplicate the same explanatory text across every BRS.

---

## Study selection rules

### Include when

- Study defines ADHD biology at the system or FM level.
- Study is a landmark review or meta-analysis with BRS-level significance.
- Study demonstrates modifiable biology relevant to the whole BRS.

### Exclude when

- Study only supports a single PM without FM/BRS significance.
- Study is general mechanistic biology with no ADHD cohort.
- Study is a distant nutritional association without direct BRS biological identity.

---

## Writing style

Write like a **Nature Reviews framework paper**.

- Informed scientific readership.
- Synthesis over description.
- Every paragraph answers one conceptual question.
- Not a textbook, educational website, or comprehensive review.

---

## Document-level introduction

The generated Word document must include:

1. Framework-paper objective (architecture justification, not knowledge-base reproduction).
2. Brief note that detailed FM architecture, Cross-BRS Dependencies, Key Constraints and PM evidence live on the website.
3. Evidence hierarchy reminder.

---

## Allostasis and the BRAIN Framework (conceptual section)

Preceding the six BRS summaries, the document includes a standalone conceptual section (~400–450 words) that states the paper's principal contribution.

**Objective:** Explain why the framework has the architecture it does, and how allostatic theory provides the most appropriate interpretive lens — not a literature review of allostasis.

**Required conceptual elements:**

1. **Independent development** — The framework emerged through nutritional systems biology; convergence with Sterling & Eyer (1988), McEwen & Wingfield (2003) and McEwen (2006) is observation, not retrospective justification.
2. **Architectural claim** — Organised around adaptive regulatory capacities within interconnected Biological Regulatory Systems (not nutrients, pathways, biomarkers or diseases).
3. **Mutual constraint** — Cross-BRS dependencies as explicit biological architecture.
4. **Operationalisation** — Translational nutritional interface: BRS → FM → PM, cross-system dependencies, phenomes, intervention points.
5. **Falsifiability** — Explicit, testable hypotheses; architecture intended to be refined or rejected as evidence accumulates.
6. **Phenome bridge** — One concise sentence: clinically interpretable link between biological regulation and cognitive, emotional and behavioural outcomes.
7. **Closing thesis** — Contribution is a translational nutritional architecture, not a new theory of allostasis.

**References (conceptual section only):** Sterling & Eyer (1988); McEwen & Wingfield (2003); McEwen (2006); Picard et al. (2018); Picard & Shirihai (2022).

---

## Editorial success test

A reviewer should finish each BRS summary thinking:

> **"This Biological Regulatory System is a distinct, biologically credible, and architecturally necessary component of an integrated adaptive regulatory network in ADHD."**

---

## Related documents

- `scripts/data/brs-cross-integration-evidence.json` — relationship synthesis for Systems Integration sections
- `system/brs-hub-levers-schema.md` — full Cross-BRS Dependencies (website only)
- `system/brain-ta-evidence-integration-standard.md` — TA evidence workflow
