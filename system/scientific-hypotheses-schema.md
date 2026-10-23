# Scientific Hypotheses — optional PM pilot extension

A Scientific Hypothesis is a testable biological proposition with a plausible rationale that has not met the threshold for an approved mechanism relationship. It is separate from Findings, dietary admissions, KCs, Phenome links and administrative issues. This pilot creates no scores or new admission pathway.

## Minimal record

Optional `scientific_hypotheses` array on the receiving PM:

- `id`: stable PM-local `PMn-Hn`, displayed as SHn; distinct from `PMn-Fn`.
- `title`, explicit `proposition`, `source_pm` / `target_pm` where applicable, explicit `proposed_direction`, `rationale`.
- `finding_links`: separate `supporting`, `contradictory_or_null`, `contextual` arrays. Each link has `pm_id`, `finding_id`, `href`, and an explanation of the precise evidential role. Empty arrays explicitly mean no such evidence identified, not evidence of absence.
- `evidence_sources`: study/cohort identity, label, URL, evidential role, proposition and limitations; a source need not have a new SF manufactured for it.
- `limitations`, `alternative_explanations`, `required_evidence`.
- `status`: `Unestablished`, `Under Review`, `Supported`, or `Rejected`.
- `historical_relationship` when an earlier connection is being reclassified: original page/linked PM, section, href, original statement, prior review statement and disposition; retain historical reference direction separately from proposed biological direction.
- `provenance`, `review_date`.

No SEC/CC field or inherited Finding score. Multiple links to a shared study/cohort are not independent evidence. **Supported is a hypothesis status, not scientific admission:** the usual mechanism relationship approval must occur separately before promoting any relationship. Status changes alone never add graph, food, KC or Phenome edges.

## Presentation and numbering

An optional **unnumbered** `### Scientific Hypotheses` subsection appears immediately before existing `### 4.1 Scientific Findings` (or its legacy §5.1 alias). The existing Findings number, IDs, count, anchors and parent section numbering are unchanged. There is no §4.0 or renumbering migration. Hypotheses remain outside the mechanism narrative dropdown, alongside Findings.

`ScientificHypothesis` renders a compact native disclosure with an always-visible status, explicit direction and differentiated border. `renderScientificHypotheses` produces the marked body projection. Pages without records render no section and retain their existing presentation.

## Relationship ownership and safeguards

The target PM holds this pilot record; the source PM is referenced without adding a reciprocal approved edge. Historical hrefs recorded in hypotheses are excluded from approved cross-BRS extraction and automatic relationship population, including when status is Supported. Preservation of a historical link is not preservation of an approved causal status when the user has explicitly adjudicated it as unestablished.

The PM9 pilot uses contextual Finding links only: training/mitochondrial-marker evidence and glucose-appearance measurement evidence do not jointly prove mediation. No direct supporting or contradicting experiment has been assigned. The carbohydrate–whey source remains contextual. No new SF is created.

Validation checks record identity, statuses, source/target direction, referenced PMs/Findings, source roles, provenance, projection freshness, placement and category isolation. This is a pilot, not authorisation to migrate other PMs or search for further hypotheses.
