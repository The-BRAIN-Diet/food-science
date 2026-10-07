# BRS5 PM3/PM4 accepted scope implementation — 2026-10-05

Status: accepted by the project owner and implemented locally. This is a PM scope/evidence correction, not a completed Stage 2B, phenome or parent-FM reassessment.

## Accepted partition

- BRS5-FM1-PM3: **Microbial Barrier–Immune Interface Support**. Mission: Support intestinal mucus maintenance and mucosal immune regulation through defined microbial activities.
- BRS5-FM2-PM4: **Microbial Substrate-Processing Selection & Adaptation**. Mission: Adjust community substrate-processing capacity through resource competition and changes in microbial function.

IDs and URL paths are unchanged. The distinction is the biological process, not duration, diversity or a generic beneficial-taxon label. Mission, Overview, Effects and Mechanistic Basis were reconciled together. The Overviews have claim-local numbered citations and three boundary bullets.

## Evidence disposition

| Record | Primary evidence | Preserved claim and limit |
|---|---|---|
| PM3-F1 | Schroeder 2018, schroeder_bifidobacteria_2018 | B. longum NCC2705 preserved mucus growth in Western-diet mice; inulin affected penetrability separately. Strain-specific experimental effect; no human dietary admission. |
| PM3-F2 | Mazmanian 2008, mazmanian_symbiosis_2008 | PSA-dependent mucosal immune protection in experimental models; no generic genus or food claim. Abstract/figure access limitation remains explicit. |
| PM4-F1 | Patnode 2019, patnode_interspecies_2019; Desai 2016, desai_fiber-deprived_2016 | Community competition, expression and measured glycan processing; resource-use shifts may also have adverse host effects. Defined-community and source-access limits retained. |
| PM4-F2 | Wastyk 2021, wastyk_gut-microbiota-targeted_2021 | Gene-potential changes with stable diversity; fermented-food inflammatory findings preserved without diversity-mediated causation. Residual carbohydrate, unchanged primary score and other endpoint limits retained. |

Jiang, Aarts, Pärtty, Wang, Prehn-Kristensen, Schleupner/Carmichael and Steckler remain in the canonical bibliography and appropriate connected/supportive assessment records. Their composition, predicted-function, developmental, symptom or review findings are not rewritten as proof of barrier actions or competitive selection. Numerical phenome ratings, rationale records and existing dietary/intervention metadata are unchanged. Obsolete legacy evidence-generator entries were removed because the canonical scientific_findings now own the evidence.

SCFA production/signalling stays with PM5, polyphenol conversion with PM6 and precursor handling with PM8. PM1 owns host tight-junction machinery; PM2 owns endotoxin containment. Relationship explanations distinguish the upstream contributor from downstream host endpoints.

## KC disposition and provenance

Both PMs previously declared BRS5(KC1) and BRS5(KC2) and repeated their food/constituent lists in public §3.1.3. Those declarations and public lists are removed; key_constraints is now empty and §3.1.3 reads **No mapping established.** No separate PM constraint disclosure was established by this scope assessment. These were legacy declarations, not an independently adjudicated PM-specific bottleneck.

The shared substrate/provision context is retained in the unchanged dietary sections and evidence, not converted into an additional KC job. Historical KC1/KC2 identifiers, former declarations and decision history are retained here and in exact pre-edit snapshots in the Codex assessment workspace. KC1's canonical review still establishes its substrate pool independently; KC2's existing review rejects its proposed combined pool. Neither decision is changed here.

The user's FM-level KC placement preference supersedes an inference that each PM must repeat its parent pool. No new FM admission is invented. The current functional-mechanism-schema still specifies a PM-derived KC union; reconciling that with independently adjudicated FM relationships, including cross-BRS use, is a **parent integration follow-up**, not a shared-contract change in this pass. FM pages receive new child labels only; their scientific narratives and KC records are not rewritten.

## Follow-up boundaries

- Review both parent FMs' evidence-supported integration and independently justified KC relationships. Do not infer reliance from a list or automatically resurrect rejected KC2.
- Run scope-specific Stage 2B on retained dietary, preparation, lifestyle and dominance records. Their legacy preservation is not fresh scientific approval; the narrower scope may require changes after evidence adjudication.
- Reassess phenome connections against each new job; existing ratings have not been silently upgraded or migrated.
- Improve human translation/effector resolution where needed, without imposing a universal end-to-end clinical trial.

## Verification

Target PM schema checks: both passed, zero issues. Global Scientific Finding model/freshness check: zero issues. Both MDX bodies compiled. All cited bibliography keys, numbered citation anchors and contextual PM links resolved. Disclosure wrappers are balanced. The actual shared ScientificFinding renderer was exercised through React server rendering for all four generated records; disclosure controls, evidence panels and numbered links rendered. Existing phenome records/ratings and dietary/intervention metadata were compared with pre-edit copies and preserved.

Browser verification remains uncompleted: the in-app browser's CDP connection timed out twice; the native Chrome fallback reported Computer Use permissions not granted. No claim of pointer/keyboard visual verification or a completed full production build is made. No shared renderer, schema, instructions or deployment was changed.

Source assessment: /Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/brs5-pm3-pm4-scope-review/joint-mission-and-scope-assessment.md
Verification and exact pre-edit snapshots: /Users/paulhouston/Documents/Codex/2026-10-01/we/outputs/brs5-pm3-pm4-scope-review/implementation/

Broad Scientific Finding regression suite: **27 passed, 3 failed**. Failures concern unchanged BRS1-FM1-PM2 section headings, unchanged BRS1-FM4-PM9 section headings, and the unchanged FM4 roll-up selection. SHA-256 comparison confirms those input files were not changed by this pass. Targeted PM3/PM4 checks and the global Finding model/freshness gate passed. Fourteen dependent files were verified to contain title replacements only.
