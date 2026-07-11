# BRS Hub ADHD Therapeutic Area Dropdown Schema

**Version:** 1.0  
**Status:** Active  
**Parent standard:** [BRAIN Therapeutic Area Evidence Integration Standard](./brain-ta-evidence-integration-standard.md) (Phase 8 presentation profile)

**Applies to:** BRS1–BRS6 hub pages — `## Therapeutic Area Research` → ADHD dropdown within `<!-- brs-hub-ta-research:start/end -->`.

---

## Purpose

The ADHD dropdown is a **Therapeutic Area evidence surface**, not a general biology bibliography. It lists studies that directly concern ADHD and maps them to connected BRS mechanisms. Implicated or plausibility-only mechanistic studies belong on BRS / FM / PM / KC architecture pages.

**Cross-BRS Dependencies** (landmark reviews explaining how BRS systems support one another) belong on BRS hub pages — not in the ADHD dropdown. Source: `scripts/data/brs-cross-integration-evidence.json`; regenerate with `npm run brs:generate-hub-cross-integration`.

---

## Evidence inclusion rule (mandatory)

Include a study in the ADHD dropdown **only if**:

1. **ADHD appears in the title**, or  
2. The study **consistently focuses on ADHD** throughout (ADHD cohort, ADHD intervention trial, or ADHD-specific review/meta-analysis).

**Do not include:**

- General mechanistic papers mapped to ADHD symptom domains by inference only  
- Healthy-volunteer or non-ADHD cohort studies cited for plausibility  
- Cross-condition papers where ADHD is a minor secondary outcome  
- “Inferred mechanistic evidence relevant to ADHD symptomology” sections or tables

Reclassify excluded studies as **Category C** (architecture) and propagate to FM/PM/KC pages per the parent standard.

---

## Canonical dropdown structure

Each BRS hub ADHD dropdown follows this order:

| § | Heading (may vary slightly by BRS) | Content |
|---|-------------------------------------|---------|
| 1 | `### Introduction` | Integrated BRS regulatory capacities; no citations |
| 2 | `### Dietary and lifestyle context` | How diet/lifestyle influence those capacities in ADHD interpretation; no food lists |
| 3 | `### ADHD translational biological context` | Prose summary of **ADHD-only** evidence with inline citations; closing translational paragraph |
| 4 | `### ADHD evidence and connected BRSn mechanisms` | Three-column table: Evidence \| Citation \| Connected mechanisms |
| 5 | `### Current evidence limitations` | Gaps table; citation column may read **Future evidence integration** |
| 6 | `### Framework expansion` | Pending SM pages, cross-BRS routing notes — flag only |

**Not permitted on hub ADHD dropdowns:**

- `### Inferred mechanistic evidence relevant to ADHD symptomology`  
- Separate Category B evidence tables  
- Nutrient monographs or duplicated Dietary Priorities content

---

## Table rules

- One row per ADHD-focused study (merge review + pending SM flag when appropriate).  
- **Connected mechanisms** column: link to owning FM/PM/KC/SM pages using canonical IDs.  
- Evidence column: factual finding in ADHD cohorts — no treatment-efficacy overstatement from single studies.

---

## Cross-BRS routing

When the same ADHD study maps to multiple BRS hubs, list it on the **primary** BRS hub table and note cross-routing in **Framework expansion** on secondary hubs. Do not duplicate full rows across hubs unless the mechanism mapping is genuinely split.

---

## Reference implementations

| BRS | Hub file |
|-----|----------|
| BRS4 | [`docs/biological-targets/mitochondrial-function-bioenergetics.md`](../docs/biological-targets/mitochondrial-function-bioenergetics.md) |
| BRS5 | [`docs/biological-targets/gut-brain-axis-enteric-nervous-system.md`](../docs/biological-targets/gut-brain-axis-enteric-nervous-system.md) |
| BRS6 | [`docs/biological-targets/metabolic-neuroendocrine-stress.md`](../docs/biological-targets/metabolic-neuroendocrine-stress.md) |

---

## QA checklist (ADHD dropdown)

- [ ] No inferred-mechanistic section or Category B table on hub  
- [ ] Every table row cites an ADHD-titled or ADHD-focused study  
- [ ] §3 prose cites only ADHD-focused studies (architecture pointer sentence allowed)  
- [ ] Translational closing paragraph present in §3  
- [ ] HTML markers `brs-hub-ta-research:start/end` intact; FM section **outside** TA block  
- [ ] Bib keys validate (`node scripts/validate-bib-citation-keys.mjs`)
