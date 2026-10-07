# BRS1/BRS2 Scientific Findings Summary implementation

Date: 6 October 2026. Implements the accepted editorial audit. All 17 active BRS1/BRS2 PM summaries now synthesise their existing evidence and preserve context and inference boundaries. The visible subheading is **Summary**. FM prose, records and pages are unchanged and reserved for separate review.

## Changes

The Stage 2A source definition, PM schema and prose guide now distinguish §4’s biological explanation from §4.1’s evidence synthesis. The stable field remains `scientific_findings_intro`. Summaries use the target PM’s existing numbered references; no bibliography was renumbered or extended. All scientific Finding, dietary, KC, phenome and rating records were preserved.

BRS1 PM1 is legacy Evidence Highlights: both its page paragraph and its legacy generator source were updated. The legacy rendering helper accepts a PM-specific Summary heading; its FM default remains unchanged.

The shared Scientific Findings heading change required 14 additional PM **heading-only** updates outside BRS1/BRS2 so their generated sections remain fresh. Their introductory prose and scientific records were not reassessed or rewritten. No FM or SM was regenerated.

## Verification

- Focused summary tests: **2/2 passed**. Checks cover all 17 PMs, durable-source/rendered-section agreement, Finding schema validity and all summary citation destinations; also legacy generation and preservation of the FM default.
- Source preservation comparison: **17/17 passed**. Parsed front matter is identical after excluding only the summary field, and body content is identical after excluding only the summary heading/paragraph.
- MDX body compilation: **17/17 passed**.
- Full `npm run build`: **passed**, generated static files. Build warnings remain for tags, links and anchors elsewhere; this is not a clean site-wide warning audit.
- Browser inspection on localhost: glutathione, DHA and legacy amino-acid pages show Summary and the revised evidence paragraph before existing Finding disclosures. Glutathione’s blood-cell Finding opens; bibliography navigation reached `#pm-ref-3`. Summary links and values were visible on DHA and legacy PM1.
- Broad mechanism validation: results for these 17 PMs are **identical to pre-edit snapshots**. Existing layout/connection issues remain; none was added by this patch.
- Existing `scripts/scientific-findings.test.mjs`: **27/30 passed**. Outstanding failures concern BRS3 PM4 evidence-source values/undeclared evidence reuse, PM9’s existing section-order expectation and FM4’s existing roll-up-label expectation. No affected scientific records, section order or FM4 content were changed in this pass. Generated Scientific Findings freshness is satisfied after heading synchronisation.

## Exact files changed in this pass

### Rewritten PM pages (17)

- `docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx`
- `docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx`
- `docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx`
- `docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx`
- `docs/biological-targets/brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation.mdx`
- `docs/biological-targets/brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support.mdx`
- `docs/biological-targets/brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation.mdx`
- `docs/biological-targets/brs1/fm4/brs1-fm4-pm10-glutamate-clearance-and-recycling.mdx`
- `docs/biological-targets/brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation.mdx`
- `docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx`
- `docs/biological-targets/brs2/fm1/brs2-fm1-pm4-methionine-cycle-flux.mdx`
- `docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway.mdx`
- `docs/biological-targets/brs2/fm2/brs2-fm2-pm6-glutathione-synthesis.mdx`
- `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx`

### Heading-only compatibility changes (14)

- `docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx`
- `docs/biological-targets/brs3/fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx`
- `docs/biological-targets/brs3/fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx`
- `docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx`
- `docs/biological-targets/brs3/fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx`
- `docs/biological-targets/brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx`
- `docs/biological-targets/brs3/fm3/brs3-fm3-pm7-cytokine-network-modulation.mdx`
- `docs/biological-targets/brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance.mdx`
- `docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function.mdx`
- `docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx`
- `docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx`
- `docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx`
- `docs/biological-targets/brs5/fm1/brs5-fm1-pm3-keystone-taxa-support.mdx`
- `docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx`

### Guidance

- `system/scientific-finding-schema.md`
- `system/primary-mechanism-schema.md`
- `system/mechanism-page-section-prose.md`

### Rendering/generation and verification

- `scripts/lib/scientific-findings.mjs`
- `scripts/lib/scientific-findings-gate.mjs`
- `scripts/lib/evidence-highlights-render.mjs`
- `scripts/lib/pm-evidence-highlights.mjs`
- `scripts/populate-pm-evidence-highlights.mjs`
- `scripts/migrate-pm-legacy-evidence-highlights.mjs`
- `scripts/scientific-findings-summary.test.mjs`

- `system/brs1-brs2-scientific-findings-summary-implementation-report.md` (this record)

Existing uncommitted work was preserved. No FM reassessment, admissions migration, commit or deployment was performed. Before snapshots, final summary inventory, verification baseline and a browser screenshot are retained in the local review workspace at `/Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/findings-summary-implementation/`.
