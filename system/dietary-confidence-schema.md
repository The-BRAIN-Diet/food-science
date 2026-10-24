# Dietary Confidence — bounded pilot

Dietary Confidence assesses confidence that an **already admitted** dietary relationship engages or sustains the operation named in the PM mission through its stated pathway. It describes the **exact proposition and scope**, not effect size, clinical benefit, ADHD efficacy, food quantity, or a substitute for Scientific Finding evidence confidence. It does not change admission, Type A/B, Direct/Derived, six atoms, SEC/CC, food mappings or manuscript decisions.

## Values and applicability

- **High:** Strong, coherent evidence supports the complete relationship within its defined biological scope.
- **Moderate:** Every essential link is sufficiently supported; meaningful uncertainty remains about context, delivery or generalisability.
- **Low:** The admission gate is satisfied, but support is limited, indirect or confined to narrow experimental conditions. Every essential delivery and engagement/dependency link must still be supported.

These are the only stored confidence values. **Unassessed means no assessment exists**, not a stored value and not Low. **Not admitted is an admission disposition**, represented by the existing unresolved/rejected admission or unestablished hypothesis, never by a confidence value. Confidence is not applicable to hypotheses; do not create a confidence record for PM1-H1, even beside rather than inside its hypothesis record. Hypothesis status Supported is still not admission.

Absence of a demonstrated benefit from extra intake does not downgrade a Type A capacity proposition. Neuronal occupancy, clinical efficacy or greater-than-adequate intake response must not be silently added to an assessment of precursor supply to an established cofactor-dependent operation. Bioavailability and conversion dependencies still require consideration. Low cannot repair an unsupported essential link; leave confidence unassessed and flag a substantive admission conflict while preserving the existing admission pending review.

## Minimal separate metadata

Optional PM frontmatter `dietary_confidence_assessments` array. No assessment is added to an atom, Finding or hypothesis. Each record contains:

- Stable `id: DC-{PM ID}-{atom ID}` and `atom_id` resolving to an existing admitted §3.1.1 relationship.
- `criteria_version: dietary-confidence-v1`, `confidence: High | Moderate | Low`.
- `type: A | B`, `classification: direct | derived`, matching the existing relationship; these identify the assessed proposition and cannot change it.
- `proposition`, bounded `scope`, concise reader `explanation`, evidence-based `rationale` and `limitations`.
- Two reviewed `essential_links`: Type A `functional_dependency` / `dietary_supply`; Type B `mechanism_engagement` / `dietary_exposure`. Each records `status: supported`, a precise `statement` and primary/authoritative source URLs. Unsupported links require review, not a confidence record. Source assertions remain scientifically reviewable; schema validity is not scientific proof.
- `finding_links` with resolving PM/Finding IDs, local page href and explanation; external sources may supplement, not silently rewrite, the existing Findings.
- `assessor` and `review_date`. This is a Codex assessment, not external human scientific review.

Historical admitted relationships can be assessed without reconstructing or reapproving their original admission records. Explicit unresolved/rejected admission status overrides historical acceptance for confidence eligibility. The frozen historical baseline is not regenerated. Confidence criteria do not create a new SEC/CC scale, derive values from those scores, or reopen admission automatically.

## Presentation and validation

In the existing admitted input disclosure, show the label, one short explanation and linked Findings as a separate assessment note before the six atoms. It is not a seventh atom or text inserted into Limitation. No record means no confidence field; do not populate default values across other PMs. The hypothesis review example shows **Admission: not established; Dietary Confidence: not applicable**, without storing either phrase as confidence.

`src/lib/dietaryConfidence.mjs` supplies the shared renderer and validator. The existing Stage 2B governance checker invokes it. Validate identity, existing admission, Type/distance consistency, both supported links, Finding references and dates. Tests must reject missing delivery at every confidence level, all hypothesis confidence assignments, Unassessed/Not admitted values, unresolved subjects and score inheritance. Four presentation examples live in the pilot review directory; PM1-H1 remains a proposal until separately approved.
