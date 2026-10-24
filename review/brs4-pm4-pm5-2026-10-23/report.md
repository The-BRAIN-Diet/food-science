# BRS4-FM2-PM4 / PM5 — Coordinated Stage 2A/2B reassessment

> **24 October SEC follow-up:** Nine provisional assessments and two explicit incomplete assessments are now current; see [four-Finding follow-up](sec-followup/report.md). Earlier score counts below are historical.

> **24 October SEC completion:** The original blanket Not yet scored disposition below is superseded by [the bounded SEC assessment](sec/report.md): seven provisional assessments and four explicit incomplete assessments. Original scientific propositions and admissions remain unchanged.


Date: 23 October 2026. Result: **PASS WITH LIMITATIONS — implemented for review**.

Branch: `codex/brs4-pm4-pm5-reassessment`, based on `d3570391e7a6e3de40c57af784683cd13bd2370a`. No commit, push or merge performed. The original enrichment checkout, `main`, approved integration branches and unrelated uncommitted work were not modified.

## Approved identities and missions

Names, IDs, filenames, URLs, parent BRS/FM and navigation identity remain unchanged.

- **BRS4-FM2-PM4 — ROS Production and Control:** Regulate mitochondrial superoxide and hydrogen peroxide generation in response to metabolic conditions, preserving physiological redox signalling while limiting excessive oxidant production.
- **BRS4-FM2-PM5 — Mitochondrial Protection (Redox Integrity):** Preserve mitochondrial membrane and protein integrity through local protective mechanisms that limit oxidative injury and maintain organelle function.

PM4 owns generation/source regulation and physiological signalling, not general clearance. PM5 owns local membrane/protein protection, not biogenesis, mitophagy or damaged-organelle removal. BRS3 induction, general clearance, membrane peroxidation and antioxidant recycling remain separate. ETC electron transfer is a shared interface, not duplicated ownership. No neighbouring PM was edited.

## Stage 2A — Findings and evidence

Eleven new structured Findings replace no pre-existing structured Finding: both pages previously used legacy Evidence Highlights. Original highlights and their exact explanations remain in the full-page baseline snapshots with SHA-256 fingerprints. Existing references remain in each canonical reference array. New Findings remain **Not yet scored**; no SEC/CC anchor or numerical score was introduced.

| PM / Finding | Proposition and principal evidence | Main boundary |
|---|---|---|
| PM4-F1 | Source-specific ROS production: Brand 2016; Chouchani 2014 | Experimental suppressors and reperfusion models are not dietary efficacy; pathological succinate handling is not food advice |
| PM4-F2 | Adaptive complex-III ROS signalling: Guzy 2005 | Hypoxia differs from anoxia; cultured-cell signalling is not a brain-health outcome |
| PM4-F3 | High-fat exposure changes mitochondrial H2O2-emitting potential: Anderson 2009 | Nine-man feeding sequence; net emission includes scavenging; rodent causal perturbations are separate |
| PM4-F4 | Inactivity/retraining and state-dependent acute exercise responses: Gram 2015; primary 2017 exercise/clamp study | Muscle emission is not pure production; exercise does not uniformly lower ROS |
| PM4-F5 | Fish-oil mixture increased ROS-emission capacity without measured oxidative-damage increases: Herbst 2014 | Pre/post mixture study; do not split EPA/DHA effects or generalise to whole fish |
| PM4-F6 | BHB/acetoacetate mixture altered neuronal mitochondrial oxidant responses: Maalouf 2007 | 1 mM of each in rat preparations; not an independent effect of either constituent or a food intervention |
| PM5-F1 | Vitamin E local protection is tissue/stress dependent: Rafique 2001; Azuma 2022 | Preserve liver null/divergence; mitochondrial-GPX4 deletion and enriched-feed rescue are not ordinary-food equivalence |
| PM5-F2 | Ubiquinol inhibits particle lipid peroxidation independently of vitamin E: Forsmark 1991; bounded Glover 2010 trial context | Reduced-form protection differs from electron transport and oral dietary delivery; trial outcomes do not establish antioxidant mediation |
| PM5-F3 | Glutathione import/local use: Wang 2021; Shi 2022; Colell 1997 | Import, iron–sulfur maintenance and peroxide handling differ. NAC failed to restore mitochondrial GSH in the ethanol model |
| PM5-F4 | SOD2 metal occupancy and local protein injury: Ganini 2018 | Mn-deficient/iron-enriched mouse and cell contexts; not extra-manganese benefit in replete people |
| PM5-F5 | Sulforaphane local protection in defined cells: de Oliveira 2018; Zhu 2008 | Nrf2-dependent cell effects; human conjugated-metabolite exposure is not sustained free-compound culture exposure |

Each Finding retains source-specific design, population/model, formulation/exposure, measured result, limitations, retrieval scope and primary-publication classification. Shared evidence is not counted as independent replication. Secondary legacy reviews appear as contextual/supportive evidence, not primary experiments.

Versioned UniProt annotations were retrieved for Cu/Zn-SOD1 P00441 (entry 279), mitochondrial manganese-SOD2 P04179 (entry 268), and GPX4 P36969 (entry 235). These establish distinct biochemical identities/roles, not dietary effectiveness or automatic ownership. Exact annotations and retrieval date are retained in `biochemical-annotations.json`.

### Complete legacy-corpus reconciliation

- **Packer 1997:** secondary antioxidant-network synthesis; no independent food-pattern or mitochondrial intervention proof.
- **Kyriazis 2022:** secondary diet/mitochondrial synthesis; not a primary replication or admission.
- **Verlaet 2019:** primary peripheral ADHD case-control work; erythrocyte GSH is not mitochondrial ROS, local protection or a mitochondrial lactate experiment.
- **Öğütlü:** secondary mitochondrial/ADHD review, despite the historical Human Study label. Historical source-label/rating records are preserved and explicitly flagged rather than silently revalidated.
- **Crane 2001:** secondary CoQ biochemistry; primary ubiquinol particle evidence is assessed separately.
- **Singh 2022:** primary urolithin exposure/formulation work; not predictable conversion from ordinary ellagitannin foods.
- **Andreux 2019:** supplementation/molecular-signature evidence; mitophagy does not establish this PM's local protection.
- **Hou 2024:** AD mouse-model work, not human cognitive endurance. The inaccurate historical label is preserved as history and flagged; it supports no new dietary or causal claim.
- **Almutairi 2024:** secondary ADHD/mitophagy synthesis; organelle removal is outside approved ownership.

See `legacy-corpus-reconciliation.json`, the canonical connected/supportive evidence and PM Open Issues. Historical Phenome relationships/ratings and therapeutic-area links remain intact, explicitly not newly validated.

## Stage 2B — Admission and candidate decisions

Exactly six atoms remain: Input; Input type; Biological role; Evidence source; Limitation; Dietary input. Type A/B, Direct/Derived, identity, admission gates and food research remain separate metadata.

| PM / candidate | Current disposition | Relationship / explanation |
|---|---|---|
| PM4 dietary inputs | No new admission | Generic antioxidant consumption and clearance cofactors do not establish ROS-source regulation |
| PM5 Vitamin E | **Admitted** | Type A Capacity; Direct. Conditional mitochondrial protective capacity plus supported dietary supply. Alpha-tocopherol-specific experiments do not establish equal effects of all tocols or benefit above adequacy |
| PM5 Manganese | **Admitted** | Type A Capacity; Direct. SOD2 metal dependency and mouse dietary manipulation support a local protective role; food composition supports supply, not efficacy |
| CoQ10 / ubiquinol | **Unresolved; biochemical participant retained** | Existing `coq10` identity resolves; no registry modification or duplicate. Reduced-form identity/conversion and dietary protective delivery require reconciliation |
| Glutathione, cysteine/methionine, NAC/SAM | **Unresolved** | Precursor supply, synthesis, mitochondrial transport and protective use remain distinct; transport-dependent counterexample retained |
| Selenium | **Unresolved** | GPX4 biochemical role and dietary PHGPX studies considered; mitochondrial isoform/supply attribution remains unresolved. No generic mineral package |
| Copper / zinc | **Legacy candidates retained** | Cu/Zn-SOD annotation is adjacent clearance biology, not proof of PM4 source control; no new PM-specific supply admission |
| Magnesium | **Legacy candidate retained** | ATP/ETC participation is not an independently established local protective operation |
| Sulforaphane | **Unresolved Type B candidate** | Cell mechanism engagement established; human plasma conjugates/free-compound exposure and tested mitochondrial context remain unresolved after PK review |
| EPA/DHA and ketone mixtures | **Unresolved constituent admissions** | No silent mixture splitting, independent constituent attribution or ordinary-food equivalence |
| “Sulfur-supportive foods” | **Ineligible as a biochemical input** | Historical category/research leads preserved; identified compounds assessed separately |
| Urolithin / mitophagy leads | **Outside approved PM5 ownership** | Original research retained; not newly admitted for local protection |

Unresolved means no new admission was established in this bounded assessment; it is not evidence that the literature contains no relationship. Neither extra-intake efficacy nor an end-to-end human experiment was imposed as a universal Capacity requirement.

### Cofactors, KCs, SOPs and lifestyle

- All original cofactor labels remain traceable through individual six-atom records; Unset is explicit and flagged. Enzyme participation is not dietary provision.
- Original **BRS4(KC2)** labels remain unchanged. Structured `historical-context` records explicitly retain unresolved status and no constituent relationships. The mapping is not admitted as current pool supply or used for dietary extraction. PM-specific applicability remains an Open Issue.
- PM4 records the high-fat experimental exposure under SOPs with **Dietary input No**: an adverse experimental response, not a recommendation or an admitted biochemical input.
- PM4 records aerobic activity/retraining under Lifestyle Levers, with the tested muscle/inactivity context. It is not a claim of universal ROS suppression.
- No new PM5 SOP/lifestyle recommendation was established. Historical cooking, mineral-absorption, sleep/recovery and antioxidant-pattern leads are preserved, not silently moved into a new admission.
- Every existing hub category was screened, including empty light/circadian and stress/autonomic categories. Actual queries, source recovery, limitations and stopping rationale are in `research-and-coverage.json`.
- Both historical **Diet-Dominant** labels are preserved in baseline history; current qualification is **Not established**, with a separate **No principal intervention route established** placement decision. Supported conditional effects are not comparative dominance.

## Food targets and roll-up

Before: zero structured target-PM manuscript rows. After: **36 input–food rows**, not 36 independent foods or clinical effects.

| Input | Verified | Research-supported provisional |
|---|---:|---:|
| Vitamin E | 12 | 0 |
| Manganese | 21 | 3 |
| **Total** | **33** | **3** |

Examples of verified delivery sources include almonds and dried sunflower kernels. Other sources remain attached with their actual material/preparation contexts. Presence/quantity does not imply a food intervention effect. Raw legumes are analytical material descriptions, not instructions to eat uncooked legumes. Existing composition quantities were reused, not recalculated or inferred.

Provisional manganese sources: **chicory root; dried/toasted nori; salmon roe**. Each retains composition evidence, preparation/form limitations and a missing-edge task. No speculative food list or new canonical food relationship was authored. CoQ/ubiquinol and glutathione reviews are separately classified scientific identity/conversion reviews, not automatic food-edge repairs.

The PM-scoped JSON/CSV exports retain PM mechanism, Type A, Direct, canonical ID, food mapping status, independent composition/mechanistic evidence and limitations. Unresolved candidates are excluded. All six existing roll-up shards reconstruct the consolidated export exactly. Other BRS shards remain unchanged.

## Presentation and validation

- Both canonical pages pass targeted mechanism and connection checks.
- Scientific Findings consistency: **64 pages checked; zero problems**.
- Dietary-input governance: **64 PMs checked; zero issues**.
- Focused reassessment regression: **9/9 passed**.
- Broader regression set: **150/152 passed**. Two unchanged baseline failures expect `4 Mechanistic Basis` on BRS1 PM1/PM9, whose canonical headings include `+ Scientific Findings`. Those source pages/tests were verified unchanged from HEAD.
- Bibliography additions are append-only. Four missing citation keys already absent at baseline remain: `baker_pea_adhd_1991`, `bergwerff_aaa_adhd_2016`, `kusaga_pea_methylphenidate_2002`, `scassellati_biomarkers_adhd_2012`.
- Actual canonical MDX compiles and parses. The Docusaurus development client compiles successfully using a process-local 4 GiB heap. **No full production build was run.**
- Browser checked: approved missions; PM4 six/PM5 five SF disclosures; PM5 current dietary heading; small red information icon; precise missing-link warning immediately above the first atom; verified food rows without pending-link icons; provisional sources visible with their statuses and composition evidence.
- One isolated SSR harness initially lacked the supplied ScientificFinding component; actual Docusaurus runtime resolved it. No component-registration repair was necessary.
- A narrow validator compatibility fix accepts the already-approved §3.1.1 heading alongside its legacy alias; no scoring, scientific-admission rule or schema was changed.
- `git diff --check` passes. Names, IDs, filenames, URLs, raw Phenome/cofactor/KC records and original references are preserved. No food/substance/registry or neighbouring-PM files changed.

## Remaining questions and review limits

KC2 pool applicability; reduced-CoQ identity/conversion/delivery; conditional glutathione supply/import/protective use; selenium isoform attribution; sulforaphane exposure translation; source-resolved human dietary regulation; tissue-specific Vitamin E dependency; independent replication and human brain/ADHD relevance; preserved inaccurate legacy source/Phenome explanations.

Primary abstracts, available full-text sections and versioned databases were recovered proportionately. Some historical full chapters/methods and exhaustive replication retrieval remain incomplete. This limitation is not represented as evidence of absence or a zero score. Current canonical admissions are not clinical validation of the BRAIN Diet.

## Files and review history

The full changed-file manifest is `changed-files.json`. Core changes are the two canonical PM files; append-only bibliography; heading compatibility validator and focused test; PM Open Issues; BRS4 mapping/roll-up projections and repair queue; and this review package.

The existing local-only, gitignored Framework QC register holds two applied PM-tab correction decisions after validation. `review-corrections-export.json` is an export of those source records for durable review; it is not a second authored decision register. Unanswered scientific questions remain in the canonical PM Open Issues store. No repository-wide governance migration or automatic scientific catch-up was initiated.
