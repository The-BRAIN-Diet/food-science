import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import EvidenceConfidenceIndicator, {
  SEC_DISPLAY_LEVELS,
} from '@site/src/components/EvidenceConfidenceIndicator';
import styles from './evidence-confidence-indicator.module.css';

const PROPORTIONS: {name: string; note: string; className: string}[] = [
  {name: 'Compact', note: '9.3 × 10px increments', className: styles.proportionCompact},
  {name: 'Standard', note: '12 × 10px increments', className: ''},
];

function StateStack({grayscale = false}: {grayscale?: boolean}) {
  return (
    <div className={grayscale ? styles.stackGrayscale : styles.stack}>
      {SEC_DISPLAY_LEVELS.map((level) => (
        <div key={level.score} className={styles.stackRow}>
          <EvidenceConfidenceIndicator score={level.score} />
          <span className={styles.stackNote}>
            {level.score}/8 · {level.label} · {level.family}
          </span>
        </div>
      ))}
      <div className={styles.stackRow}>
        <EvidenceConfidenceIndicator />
        <span className={styles.stackNote}>Missing assessment · Not scored</span>
      </div>
      <div className={styles.stackRow}>
        <EvidenceConfidenceIndicator score={0} />
        <span className={styles.stackNote}>Raw zero · Not scored, not shown as 1</span>
      </div>
    </div>
  );
}

function ThemePanel({
  theme,
  title,
  children,
}: {
  theme: 'light' | 'dark';
  title: string;
  children: ReactNode;
}) {
  return (
    <section data-theme={theme} className={theme === 'dark' ? styles.panelDark : styles.panelLight}>
      <h3 className={styles.panelTitle}>{title}</h3>
      {children}
    </section>
  );
}

export default function EvidenceConfidenceIndicatorDemo(): ReactNode {
  return (
    <Layout
      title="Evidence Confidence indicator"
      description="Development preview of the eight-level Synthesised Evidence Confidence indicator."
    >
      <main className="container margin-vert--lg">
        <h1>Evidence Confidence indicator</h1>
        <p className={styles.lede}>
          Development preview of the reusable <code>EvidenceConfidenceIndicator</code>. It renders a
          Synthesised Evidence Confidence state that governance has already decided. It does not
          add directness, bias protection, precision or replication, and the examples below are
          not scientific findings.
        </p>
        <p className={styles.lede}>
          Four grouped blocks each contain two increments. Scores 1–2 are red, 3–4 yellow, 5–6
          orange, and 7–8 green. A missing assessment or a raw zero stays outside the scale as Not
          scored.
        </p>

        <h2>All eight levels, both themes</h2>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <StateStack />
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <StateStack />
          </ThemePanel>
        </div>

        <h2>Four blocks</h2>
        <p>
          The wider gap separates the four colour-family blocks. Only the fill changes between an
          active increment and a neutral one. Score 6 fills six increments in the orange family.
        </p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <div className={styles.geometryStack}>
              {SEC_DISPLAY_LEVELS.map((level) => (
                <EvidenceConfidenceIndicator key={level.score} score={level.score} />
              ))}
            </div>
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <div className={styles.geometryStack}>
              {SEC_DISPLAY_LEVELS.map((level) => (
                <EvidenceConfidenceIndicator key={level.score} score={level.score} />
              ))}
            </div>
          </ThemePanel>
        </div>

        <h2>Segment proportions</h2>
        <div className={styles.panelGrid}>
          {(['light', 'dark'] as const).map((theme) => (
            <ThemePanel key={theme} theme={theme} title={theme === 'dark' ? 'Dark page' : 'Light page'}>
              <div>
                {PROPORTIONS.map((proportion) => (
                  <div
                    key={proportion.name}
                    className={`${styles.proportionGroup} ${proportion.className}`}
                  >
                    <div className={styles.proportionLabel}>
                      {proportion.name} — {proportion.note}
                    </div>
                    <div className={styles.geometryStack}>
                      {SEC_DISPLAY_LEVELS.map((level) => (
                        <EvidenceConfidenceIndicator key={level.score} score={level.score} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ThemePanel>
          ))}
        </div>

        <h2>Without colour</h2>
        <p>
          The same states in greyscale. The score, the filled increments, and the written label
          still identify the level.
        </p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page, greyscale">
            <StateStack grayscale />
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page, greyscale">
            <StateStack grayscale />
          </ThemePanel>
        </div>

        <h2>In context</h2>
        <p>Illustrative finding lines. These scores are display samples, not adjudicated records.</p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <p className={styles.contextParagraph}>
              Circadian misalignment and cortisol disruption{' '}
              <EvidenceConfidenceIndicator score={6} /> is one of several findings that qualify how
              this mechanism should be read.
            </p>
            <table className={styles.contextTable}>
              <thead>
                <tr>
                  <th>Finding</th>
                  <th>Evidence confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Diurnal cortisol as a timing mechanism</td>
                  <td>
                    <EvidenceConfidenceIndicator score={7} />
                  </td>
                </tr>
                <tr>
                  <td>Gut-related modulation of waking cortisol</td>
                  <td>
                    <EvidenceConfidenceIndicator score={3} />
                  </td>
                </tr>
                <tr>
                  <td>Assessment not yet recorded</td>
                  <td>
                    <EvidenceConfidenceIndicator />
                  </td>
                </tr>
              </tbody>
            </table>
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <p className={styles.contextParagraph}>
              Circadian misalignment and cortisol disruption{' '}
              <EvidenceConfidenceIndicator score={6} /> is one of several findings that qualify how
              this mechanism should be read.
            </p>
            <table className={styles.contextTable}>
              <thead>
                <tr>
                  <th>Finding</th>
                  <th>Evidence confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Diurnal cortisol as a timing mechanism</td>
                  <td>
                    <EvidenceConfidenceIndicator score={7} />
                  </td>
                </tr>
                <tr>
                  <td>Gut-related modulation of waking cortisol</td>
                  <td>
                    <EvidenceConfidenceIndicator score={3} />
                  </td>
                </tr>
                <tr>
                  <td>Assessment not yet recorded</td>
                  <td>
                    <EvidenceConfidenceIndicator />
                  </td>
                </tr>
              </tbody>
            </table>
          </ThemePanel>
        </div>

        <h2>Legacy four-level prop</h2>
        <p>
          The previous <code>level</code> prop still renders four blocks and is not assigned an
          eight-level score. A stored finding remains <code>not-yet-scored</code> until governance
          records one.
        </p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <EvidenceConfidenceIndicator level="moderate" />
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <EvidenceConfidenceIndicator level="moderate" />
          </ThemePanel>
        </div>

        <h2>Usage</h2>
        <pre className={styles.usageBlock}>
          <code>{`<EvidenceConfidenceIndicator score={6} />
<EvidenceConfidenceIndicator score={8} adjustedScore={4} />
<EvidenceConfidenceIndicator />
<EvidenceConfidenceIndicator level="moderate" />`}</code>
        </pre>
        <p>
          A scored indicator exposes one accessible label, for example{' '}
          <em>&ldquo;Evidence confidence: 6 of 8, Moderate–High&rdquo;</em>. The increments are
          hidden from assistive technology. An adjusted score replaces the raw total. A missing
          score is announced as Not scored.
        </p>
      </main>
    </Layout>
  );
}
