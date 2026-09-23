import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import EvidenceConfidenceIndicator, {
  EVIDENCE_CONFIDENCE_LEVELS,
  type EvidenceConfidenceLevel,
} from '@site/src/components/EvidenceConfidenceIndicator';
import styles from './evidence-confidence-indicator.module.css';

const LEVEL_NOTES: Record<EvidenceConfidenceLevel, string> = {
  'very-low': '1 active segment (red) + 3 inactive',
  low: '2 active segments (yellow) + 2 inactive',
  moderate: '3 active segments (orange) + 1 inactive',
  high: '4 active segments (green)',
};

const PROPORTIONS: { name: string; note: string; className: string }[] = [
  { name: 'Compact', note: '14 x 10px segments', className: styles.proportionCompact },
  { name: 'Standard', note: '18 x 10px segments (current default)', className: '' },
  { name: 'Wide gauge', note: '24 x 8px segments', className: styles.proportionWide },
];

function StateStack({ grayscale = false }: { grayscale?: boolean }) {
  return (
    <div className={grayscale ? styles.stackGrayscale : styles.stack}>
      {EVIDENCE_CONFIDENCE_LEVELS.map((level) => (
        <div key={level} className={styles.stackRow}>
          <EvidenceConfidenceIndicator level={level} />
          <span className={styles.stackNote}>{LEVEL_NOTES[level]}</span>
        </div>
      ))}
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
    <section
      data-theme={theme}
      className={theme === 'dark' ? styles.panelDark : styles.panelLight}
    >
      <h3 className={styles.panelTitle}>{title}</h3>
      {children}
    </section>
  );
}

export default function EvidenceConfidenceIndicatorDemo(): ReactNode {
  return (
    <Layout
      title="Evidence Confidence indicator"
      description="Development preview of the reusable Evidence Confidence visual indicator in both themes."
    >
      <main className="container margin-vert--lg">
        <h1>Evidence Confidence indicator</h1>
        <p className={styles.lede}>
          Development preview of the reusable <code>EvidenceConfidenceIndicator</code> component. It
          renders a confidence state that has already been determined elsewhere. It does not
          calculate, infer or modify any score, and it is not yet used anywhere on the site.
        </p>
        <p className={styles.lede}>
          The four levels are an ordinal scale. They are not percentages and carry no implied
          probability.
        </p>

        <h2>All four states, both themes</h2>
        <p>
          Each panel forces its own theme so the two can be compared directly, regardless of the
          theme currently selected in the navbar.
        </p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <StateStack />
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <StateStack />
          </ThemePanel>
        </div>

        <h2>Geometry check</h2>
        <p>
          The states are stacked so the segment columns line up. Every block in every column should
          share one width, one height and one spacing, with only the fill colour changing between
          active and inactive.
        </p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <div className={styles.geometryStack}>
              {EVIDENCE_CONFIDENCE_LEVELS.map((level) => (
                <EvidenceConfidenceIndicator key={level} level={level} />
              ))}
            </div>
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <div className={styles.geometryStack}>
              {EVIDENCE_CONFIDENCE_LEVELS.map((level) => (
                <EvidenceConfidenceIndicator key={level} level={level} />
              ))}
            </div>
          </ThemePanel>
        </div>

        <h2>Segment proportions</h2>
        <p>
          Three candidate block proportions for comparison. These are set by the demo page only; the
          component itself ships the standard size and the API is unchanged.
        </p>
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
                      {EVIDENCE_CONFIDENCE_LEVELS.map((level) => (
                        <EvidenceConfidenceIndicator key={level} level={level} />
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
          The same states rendered greyscale. Confidence must still be readable from the number of
          filled segments and the written label alone.
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
        <p>
          The indicator is inline, so it sits inside running text and table cells without changing
          line height.
        </p>
        <div className={styles.panelGrid}>
          <ThemePanel theme="light" title="Light page">
            <p className={styles.contextParagraph}>
              Circadian misalignment and cortisol disruption{' '}
              <EvidenceConfidenceIndicator level="moderate" /> is one of several findings that
              qualify how this mechanism should be read.
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
                    <EvidenceConfidenceIndicator level="high" />
                  </td>
                </tr>
                <tr>
                  <td>Gut-related modulation of waking cortisol</td>
                  <td>
                    <EvidenceConfidenceIndicator level="low" />
                  </td>
                </tr>
              </tbody>
            </table>
          </ThemePanel>
          <ThemePanel theme="dark" title="Dark page">
            <p className={styles.contextParagraph}>
              Circadian misalignment and cortisol disruption{' '}
              <EvidenceConfidenceIndicator level="moderate" /> is one of several findings that
              qualify how this mechanism should be read.
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
                    <EvidenceConfidenceIndicator level="high" />
                  </td>
                </tr>
                <tr>
                  <td>Gut-related modulation of waking cortisol</td>
                  <td>
                    <EvidenceConfidenceIndicator level="low" />
                  </td>
                </tr>
              </tbody>
            </table>
          </ThemePanel>
        </div>

        <h2>Usage</h2>
        <p>
          The component is registered for MDX, so pages can use it directly. It takes one required
          prop.
        </p>
        <pre className={styles.usageBlock}>
          <code>{`<EvidenceConfidenceIndicator level="moderate" />

level: "very-low" | "low" | "moderate" | "high"   (required)
className: string                                  (optional)
srPrefix: string                                   (optional, default "Evidence confidence")`}</code>
        </pre>
        <p>
          Each instance exposes a single accessible label, for example{' '}
          <em>&ldquo;Evidence confidence: Moderate, level 3 of 4&rdquo;</em>. The individual segments
          are hidden from assistive technology so they are not announced one by one.
        </p>
      </main>
    </Layout>
  );
}
