# Mechanism / MoA — proposed demo contract

Mechanism is a concise vocabulary label projected from Atom 3's mechanismRef. MoA is Atom 3's full scientific description and evidence status. Mechanism is neither a seventh atom nor a separate Finding or scientific assertion. The measured effect remains separate.

Demo records in mechanisms.json retain atom3.mechanismRef, moa and evidenceStatus. A single terms map supplies the short label; no second per-record short assertion is authored. Vocabulary keys are proposed demo-local terms, NOT approved canonical ontology identifiers. Canonical adoption/identity reconciliation remains subject to author approval.

The same projectMechanism function supplies the visible summary and mechanism-rollup.json; future PM, food/substance and diagram consumers must use that projection without writing destination-specific summaries. The roll-up retains evidence-record links and status. No public roll-up was installed.

Any MoA, mechanismRef or evidence-status change invalidates the reviewedMoAFingerprint and blocks generation until summary alignment has been reviewed. The generator does not automatically refresh the fingerprint. This structural check detects change, not scientific truth: a reviewer must check that the vocabulary label is no stronger than the qualified MoA. Vocabulary-label changes also require scientific review.

For beef and eggs, the visible summary retains 'Mechanistic interpretation; mediator not isolated'. Walking retains 'Proposed rationale; not measured in this trial'. No summary equates the measured effect with a mechanism. The row remains one-click and unlinked as last approved; food/substance links remain inside Atom 1/3 rather than reversing the earlier click-behaviour decision.

Validation: all three projections resolve to the same identity as Atom 3; mutated MoA text fails generation for all three. Existing presentation gate passes. Canonical content, global renderers, admissions and scores unchanged. Demo only; no commit or deployment.
