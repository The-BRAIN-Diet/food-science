# BRAIN Diet — concise project context

Orientation, verified 3 November 2026. Sources and implementation authority are indexed in [system/INDEX.md](../system/INDEX.md). The existing [root context](../PROJECT-CONTEXT.md) retains technical architecture and repository conventions; this overview does not replace it.

## Purpose and architecture

BRAIN Diet connects biological mechanisms to evidence-qualified dietary inputs, food delivery and interventions, supporting the scientific paper and understandable reader guidance. Biochemical plausibility, dietary supply, measured target engagement and clinical benefit are distinct claims. ADHD or cognitive benefit must not be inferred from unrelated endpoints.

The six Biological Regulatory Systems (BRSs), using current hub titles, are:

| System | Domain |
|---|---|
| BRS1 | Neurotransmitter Regulation |
| BRS2 | Methylation & One-Carbon Metabolism |
| BRS3 | Inflammation & Oxidative Stress |
| BRS4 | Mitochondrial Function & Bioenergetics |
| BRS5 | Gut-Brain Axis & Enteric Nervous System |
| BRS6 | Metabolic & Neuroendocrine Regulation |

Cross-BRS modulators are Circadian, Endocannabinoid System (ECS) and Hormones. Current scope is 64 PMs: 51 numbered-system PMs plus 13 Cross-BRS PMs. Preserve their canonical identities rather than forcing Cross-BRS records into numbered identifiers.

Functional Mechanisms (FMs) group related Primary Mechanisms (PMs). A PM owns a defined biological operation and mission. A Key Constraint (KC) represents a biologically coherent shared dietary resource pool, not any generic prerequisite or a duplicate PM. Cross-system dependencies do not transfer KC ownership. See the PM, FM, KC and Cross-BRS contracts in the index.

## Dietary identification and evidence structures

For orientation, the three governed dietary identification locations are **dietary inputs/regulatory modulators**, **cofactors/substrates**, and **shared KC resources** (canonical §3.1.1–3.1.3, sometimes displayed under §1.1). This maps existing sections; it is not a newly approved three-route admission taxonomy. The owner's phrase “three dietary identification routes” has no separately verified definition in the inspected contracts; confirm any intended alternative before formalising it.

Type A capacity and Type B regulation are independent of Direct/Derived classification. Supported upstream endogenous or microbial conversion can connect dietary supply to an operation; graph connectivity alone does not admit it. Biochemical participation does not automatically establish a dietary requirement. Independently supported FM/BRS pattern, matrix or timing evidence may retain its own scope rather than being forced into a PM.

Dietary six atoms: **Input | Input type | Biological role | Evidence source | Limitation | Dietary input (Yes/No/Unset)**.

SOP/Lifestyle six atoms: **Intervention | Intervention type | Biological relationship | Evidence source | Limitations | Intervention admitted (Yes/No/Unset)**. Atom 3 separates full Mechanism of Action, measured effect and PM relevance. Typed limitations remain separate, including null outcomes. A short Mechanism derives from the full mechanism; omit it if unresolved. It is not a seventh atom. Use controlled identities and original references, not food pages as independent evidence.

## Stages and confidence

- **Stage 2A — active:** scientific discovery, proposition classification, source appraisal, synthesis and evidence boundaries. Distinguish Scientific Findings, Scientific Principles, scientific Evidence Gaps and unfinished Assessment gaps.
- **Stage 2B — active:** PM-specific applicability/admission, Type A/B and Direct/Derived, ontology/food mapping, intervention classification and governed presentation. Data validity does not authorise a new public panel.
- **Stage 2C — proposed, not yet activated:** proposed separate evidence-confidence responsibility. No approved independent Stage 2C contract or migration was verified. Existing SEC responsibilities remain with the current contracts; do not move them or launch refactoring.

SEC evaluates the exact scientific or intervention proposition using existing D/B/P/R and caps, with immutable versions. Intervention scores cannot inherit Finding scores. Dietary Confidence evaluates an already-admitted dietary relationship's supported pathway and supply/engagement; current stored values are **High / Moderate / Low**, not the older conversational “Medium”. Neither scale proves clinical efficacy or creates an admission. Missing appraisal is not zero.

## Paper and training

The paper needs traceable, qualified intervention examples and food roll-ups; appearance counts are not effectiveness scores. Reuse the Section 6 register, but reconcile stale status text before manuscript use. Training explains the framework without changing its scientific records. Training/QA remains local-only and untracked under [INTERNAL-DOCS.md](../INTERNAL-DOCS.md). Existing drafts are not approved public course content.

A complete Gold Standard PM is **proposed**, not an approved new template. Existing approved references are PM1's Section 4 Finding layout and PM8's evidence tabs, within their documented scopes. LAT1 remains incomplete; see [decisions](DECISIONS.md) and [handoffs](handoffs/INDEX.md).
