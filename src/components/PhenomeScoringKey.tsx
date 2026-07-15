import React, { useId, useState } from 'react';

/**
 * Collapsible confidence-score legend — Phenome Registry detail pages and PM/FM §3.
 */
export default function PhenomeScoringKey({
  defaultExpanded = false,
}: {
  defaultExpanded?: boolean;
}): React.JSX.Element {
  const [open, setOpen] = useState(defaultExpanded);
  const panelId = useId();

  return (
    <div className="brs-fm-hub-item phenome-scoring-key-hub" data-brs-fm-hub data-brs-fm-hub-init="true">
      <div className="brs-fm-hub-shell">
        <button
          type="button"
          className="brs-fm-hub-summary"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`brs-fm-hub-chevron${open ? ' brs-fm-hub-chevron--open' : ''}`} aria-hidden="true" />
          <strong>How confidence scores differ</strong>
        </button>
        <div id={panelId} className="brs-fm-hub-panel" hidden={!open}>
          <div className="phenome-scoring-key">
            <p className="phenome-scoring-key-intro">
              These are <strong>three independent scores</strong>. They are not combined or averaged.
              A phenome can have <strong>Medium</strong> registry evidence while individual mechanism
              rows show different Biology → Phenome and Evidence scores.
            </p>

            <div className="phenome-scoring-key-section">
              <p className="phenome-scoring-key-heading">
                <strong>1. Phenome Evidence Confidence</strong> (Phenome Registry only)
              </p>
              <p className="phenome-scoring-key-body">
                <strong>Question:</strong> How convincing is the foundational evidence that this
                phenome is a valid, well-defined functional construct — and that diet-relevant
                biology can plausibly connect to it?
              </p>
              <p className="phenome-scoring-key-body">
                <strong>Not</strong> a roll-up of Biology → Phenome Confidence or Evidence
                Confidence from Primary Mechanism page rows. Those are scored per mechanism; this
                score is assigned once per phenome at registry level.
              </p>
              <p className="phenome-scoring-key-body">
                <strong>Derived from</strong> foundational landmark evidence organised in up to
                three layers: construct validation, biology→phenome linkage, and nutrition→biology
                modulation. Each layer may include one or many landmark papers depending on registry
                review.
              </p>
            </div>

            <div className="phenome-scoring-key-section">
              <p className="phenome-scoring-key-heading">
                <strong>2. Biology → Phenome Confidence</strong> (Primary Mechanism page §3 rows)
              </p>
              <p className="phenome-scoring-key-body">
                <strong>Question:</strong> If this PM/FM biology were substantially impaired in
                isolation, how directly would that phenome be expected to suffer — within BRAIN
                architecture?
              </p>
              <p className="phenome-scoring-key-body">
                <strong>How it is derived:</strong> Reviewers read the PM/FM <em>definition and
                biological function first</em> — initially <em>ignoring</em> attached references and
                whether dietary intervention studies exist. References are reviewed only when scoring
                Evidence Confidence (below).
              </p>
              <p className="phenome-scoring-key-body">
                <strong>Score levels</strong> (the value shown on each row as{' '}
                <em>Biology → Phenome Confidence</em>):
              </p>
              <ul className="phenome-scoring-key-sublist">
                <li>
                  <strong>High</strong> — primary biological determinant (e.g. noradrenergic
                  signalling → attention; GABA synthesis → calming tone)
                </li>
                <li>
                  <strong>Medium</strong> — major contributory determinant, not the sole driver
                </li>
                <li>
                  <strong>Low–Medium</strong> — established but indirect, modulatory, or one
                  integrative step removed
                </li>
                <li>
                  <strong>Low</strong> — distal, conditional, or weak biological coupling
                </li>
              </ul>
              <p className="phenome-scoring-key-body">
                <strong>“Not dietary treatment efficacy”</strong> means this score does not ask
                whether a diet or supplement <em>treats</em> the phenome. It asks whether the{' '}
                <em>biology itself</em> is architecturally relevant. Limited dietary RCT evidence
                belongs in Evidence Confidence, not here.
              </p>
            </div>

            <div className="phenome-scoring-key-section">
              <p className="phenome-scoring-key-heading">
                <strong>3. Evidence Confidence</strong> (Primary Mechanism page §3 rows)
              </p>
              <p className="phenome-scoring-key-body">
                <strong>Question:</strong> How convincing are the <strong>attached Key References</strong>{' '}
                on that specific row that this biology actually relates to this phenome?
              </p>
              <p className="phenome-scoring-key-body">
                <strong>How it is derived:</strong> Assigned <em>after</em> Biology → Phenome
                Confidence, by reviewing only the references on that PM/FM row. Judges whether refs
                support the <em>relationship</em> — not just mechanism or phenome in isolation.
              </p>
              <ul className="phenome-scoring-key-sublist">
                <li>
                  <strong>High</strong> — strong convergent human evidence directly linking mechanism
                  biology to phenome variation
                </li>
                <li>
                  <strong>Medium</strong> — multiple human lines supporting the relationship; may
                  include one bridge study with an inferential step
                </li>
                <li>
                  <strong>Low–Medium</strong> — convergent translational stack without direct
                  mechanism↔phenome measurement on the row
                </li>
                <li>
                  <strong>Low</strong> — mechanistic or preclinical only; mechanism and phenome
                  supported separately but not bridged
                </li>
              </ul>
              <p className="phenome-scoring-key-body">
                Often equal to or <em>lower than</em> Biology → Phenome Confidence. Can occasionally
                be higher when outcome evidence is stronger than the mechanism&apos;s contributory
                role.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
