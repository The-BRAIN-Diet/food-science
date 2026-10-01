# BRS2-FM1-PM2 Betaine/BHMT Remethylation — Stage 2B Report

## Governed state

BHMT-dependent remethylation of homocysteine to methionine, using betaine as the methyl donor.

`evidence_status` is `stage-2b-dietary-addressability`.

## Decision history and audit diagnosis

This audit used the current canonical `BRS2(KC1)` definition: one coherent
folate- and betaine-linked methyl-donor pool with Folate
(`BRS2-KC1-KIT-1`), Choline (`BRS2-KC1-KIT-2`) and Betaine
(`BRS2-KC1-KIT-3`) as constituents. Vitamin B12 remains excluded because it
is a methionine-synthase cofactor rather than a net donor-pool constituent.

| Decision point | Folate route | Betaine/choline route | BRS2(KC2) | Published mapping |
|---|---|---|---|---|
| Earlier Grok run | Considered with B12 and treated as outside the BHMT reaction | Considered, but canonical constituent identities and the PM-specific constraint chain were not fully recorded | Omitted from the formal adjudication | None |
| Latest rerun before this audit | Evidence-supported non-application | Unresolved because no tissue BHMT-flux assay was available | Screened out narratively, not recorded as an adjudication | None |
| Audited decision | Unresolved indirect interaction; no direct reaction role | Established, constrained-by | Evidence-supported non-application | BRS2(KC1) — Methyl Donor Pool |

The earlier run had incomplete/stale coverage: it bundled vitamin B12 into the
folate discussion, predated the canonical atom identities and duplicated
Betaine in §3.1.1 and §3.1.2. The latest rerun corrected those defects but
misapplied Type D by requiring a preferred end-to-end tissue-flux assay. It
also read the mouse result that hepatic betaine did not fall without using the
human arm of the same study, where plasma betaine fell about 47% and challenged
homocysteine handling worsened in clinically depleted participants. The main
correction therefore required better use of existing evidence, not a new
betaine/choline trial. Targeted research adjudicated the folate interaction
and BRS2(KC2) separately, then added rat pool-rescue and specific-inhibition
edges to narrow the reaction attribution left open by the human endpoint.

## Dietary decisions

| Candidate | Layer tested | Decision | Ceiling |
|---|---|---|---|
| Betaine | Direct capacity requirement and biochemical substrate | Admitted. Direct substrate. PM2-DIT-1. | `biological-dependency`. Addressability `direct`. Olthof shows lower plasma homocysteine, which is not tissue BHMT flux, so the ceiling is not `modulation-demonstrated`. |
| Choline | Derived capacity requirement | Admitted. Oxidation to betaine is evidenced (PM2-F2). PM2-DIT-2. Derived target is betaine. | `dietary-provision`. Addressability `precursor-mediated`. Not shown to increase tissue BHMT flux. |
| Homocysteine | Biochemical co-substrate | Admitted in §3.1.2 only. PM2-DIT-3. Not a dietary input. | `biological-dependency`. |
| Zinc ion (Zn²⁺) | Legacy cofactor name | Retained and matched to PM2-DIT-4. Admitted as a catalytic ion in §3.1.2. Not admitted as a Dietary Requirement. | `biological-dependency`. Dietary zinc control of BHMT is not established. |
| Folate | Possible reaction cofactor from pathway adjacency | Rejected. Not a substrate or cofactor of this reaction (PM2-F1). Not added to `cofactors`. | — |
| Vitamin B12 | Possible reaction cofactor from pathway adjacency | Rejected. Belongs to methionine synthase, not BHMT. | — |
| Food arrows (beetroot, spinach, eggs, soy lecithin, and the copied KC foods) | Legacy §3.1 bullets | Removed. Food composition is not an adjudicated Input→PM relationship. No food-level atoms were created. | — |

§3.1.1 labels are `Betaine` and `Choline`. §3.1.2 labels are
`Homocysteine` and `Zinc ion (Zn²⁺)`. Betaine is not repeated in §3.1.2:
its §3.1.1 atom already states the same substrate role, so a second projection
would be a true duplicate. Choline is not shown in §3.1.2 because it is an
upstream precursor rather than a BHMT substrate or cofactor. Folate and B12 do
not appear.

Rendered check on the local page: collapsed qualifiers are `Betaine — Direct · Substrate` and `Choline — Derived · Precursor → Betaine`. Open disclosures show Input, Input type, Biological role, Evidence source and Limitation. Evidence links resolve to `#pm-ref-1`, `#pm-ref-2`, `#pm-ref-5` for betaine and `#pm-ref-1`, `#pm-ref-3`, `#pm-ref-4` for choline. §3.1.2 shows Substrate or Catalytic ion without a Direct/Derived qualifier. No food arrows are present.

## Type D — BRS2(KC1)

KC id `BRS2(KC1)`. The canonical page has one default iKC. Its two donor
routes were assessed separately because they have different relationships to
BHMT. Applicability of the whole iKC is established through the
betaine/choline arm. `key_constraints` and `pm_kc_relationships` now publish
that decision; public §3.1.3 links BRS2(KC1) and explains the bounded
biological relationship.

| Arm | Disposition | Why |
|---|---|---|
| `folate-donor-route` | `unresolved` | Folate is not used in the BHMT reaction, so proximity and compensatory demand cannot establish this arm. However, Liu et al. (2012) found lower hepatic betaine, markedly higher DMG and only partial homocysteine correction despite increased ex-vivo BHMT activity after betaine in folate-deprived rats. That defeats the previous categorical non-application decision, but in-vivo BHMT inhibition and human applicability remain inferred. |
| `betaine-choline-donor-route` | `established` / `constrained-by` | Membership is canonical, but membership was not the deciding evidence. In the human da Costa study, controlled choline depletion lowered plasma choline about 30% and betaine about 47%. The four men who developed hepatic steatosis had a 5.2 µmol/L greater post-load homocysteine response; both the clinical phenotype and challenge response resolved after repletion, while folate remained adequate. Setoue et al. add hepatic-betaine depletion and choline/betaine rescue in rats. Strakova et al. add a specific BHMT perturbation producing the expected homocysteine and SAM direction. PM2-F1 supplies the reaction identity. |

Established links and inferred links are stored separately on each adjudication row.

### Tissue-flux threshold

The missing direct measurement is isotope-resolved or tissue BHMT flux.
Its absence limits attribution and prevents a `modulation-demonstrated` claim;
it does not prevent Type D applicability. The supported chain is:

controlled human choline inadequacy → lower circulating choline and betaine →
reduced challenged homocysteine-remethylation reserve in clinically depleted
participants → reversal after repletion, with adequate folate; supported by
rat choline deprivation → hepatic-betaine loss → choline/betaine rescue, and
specific BHMT inhibition → lower BHMT activity and SAM plus higher
homocysteine → known use of betaine by human BHMT.

Plasma homocysteine by itself remains non-specific (PM2-IC1). The decision
rests on the combined intervention, pool measurement, challenge, reversal,
alternative-route control and reaction identity. It does not infer that
constituent membership, precursor delivery or substrate necessity alone is
enough.

### Other candidate relationships

- **Betaine proposition:** inadequacy of available betaine can constrain the
  methyl-donor step governed by PM2. Established through the human depletion
  chain and the known reaction. Supplemental betaine evidence is supportive,
  not the sole basis.
- **Choline proposition:** inadequate choline can constrain PM2 when the
  oxidation route no longer maintains adequate betaine. Established as a
  precursor-mediated route, with variable susceptibility: only four of eight
  men developed the challenged phenotype.
- **Folate proposition:** inadequacy may indirectly constrain PM2 through
  altered demand and betaine/DMG state. Unresolved; folate is not a BHMT
  reactant, and the material evidence is an animal interaction with inferred
  in-vivo inhibition.
- **Vitamin B12 proposition:** B12 remains outside canonical KC1 constituent
  membership. Impaired methionine-synthase activity can shift demand toward
  BHMT in animal evidence, but a demand shift is not evidence that B12
  inadequacy constrains BHMT capacity. No independent PM2 mapping is
  established through B12.
- **BRS2(KC2) proposition:** inadequacy or imbalance of the
  methionine–cysteine pool constrains PM2 capacity. Evidence-supported
  non-application: BHMT produces methionine and does not use cysteine; in rats,
  methionine restriction increased rather than decreased hepatic BHMT
  expression and activity when methyl donor was available. This is
  compensation, not a KC2 constraint on PM2.

## System optimisation and lifestyle

No SOP or lifestyle atoms were created. Legacy meal-timing, phytate and fat-pairing bullets were removed because they were not evidence for this reaction. Betaine supplementation already has a Direct dietary relationship, so it was not rewritten as an optimisation practice. No separate intervention with a supported route to BHMT flux was left over for an optimisation candidate.

`timing_specific` is `No`. Twice-daily dosing in the Olthof trial is study design, not a shown timing requirement of the enzyme.

## Claim ceilings

- Betaine: biological dependency and KC capacity constraint under demonstrated donor inadequacy. Increasing intake above adequacy has not been shown to improve attention or cognition.
- Choline: dietary provision of the betaine precursor and a constrained-by relationship under controlled depletion. The provision route is limited by conversion, endogenous synthesis and individual susceptibility.
- Zinc and homocysteine: biochemical requirements only. Homocysteine is generated in the methionine cycle. Dietary zinc is not an admitted lever.

## Focused research and stopping rationale

| Question | Sources examined | Measured endpoints | Demonstrated link | Remaining inference |
|---|---|---|---|---|
| Does choline/betaine inadequacy constrain PM2 without a direct tissue-flux assay? | da Costa et al. (2005); Evans et al. (2002); inherited Olthof et al. (2003); Setoue et al. (2008); Strakova et al. (2011) | Controlled human choline intake, plasma choline/betaine/folate, hepatic steatosis, methionine-load homocysteine and repletion; rat hepatic betaine and rescue; specifically inhibited rat BHMT activity, plasma homocysteine and hepatic SAM; human BHMT structure | Human depletion lowered the named pool and reduced challenged reserve; repletion reversed it. Rat pool rescue connected choline/betaine availability to the phenotype, while specific BHMT inhibition confirmed the pathway direction. BHMT uses betaine. | Exact fraction of the human circulating response attributable to BHMT; ordinary-intake effect size |
| Can folate inadequacy indirectly constrain BHMT? | Liu et al. (2012); Obeid (2013) | Rat hepatic betaine, DMG, SAM/SAH, MS/BHMT activity and plasma homocysteine | Folate deprivation changed the betaine/DMG state and limited correction by betaine | In-vivo BHMT inhibition and human generalisation |
| Does BRS2(KC2) constrain PM2? | Park and Garrow (1999); PM2-F1 | Rat hepatic BHMT mRNA, protein and activity under methionine restriction and methyl-donor variation; reaction identity | Methionine restriction with donor availability induced BHMT capacity; methionine is product and cysteine is absent | Human regulatory magnitude |

Search stopped when each material candidate had enough evidence to classify:
the betaine/choline chain met Type D and gained pool-rescue plus
specific-inhibition support, folate retained a defined unresolved link, and
KC2 had direct evidence against the proposed capacity constraint. More general
supplement trials, food lists or cognitive studies would not change these
PM↔KC decisions.

## Change-control notes

- `key_constraints` and `pm_kc_relationships` now record BRS2(KC1), and public
  §3.1.3 publishes the linked title plus a concise biological explanation.
- The KC1 page already listed PM2 in its evidence-supported proposed scope, so
  no KC-page edit was required. The FM1 rollup already listed PM2 as relying on
  KC1 and is now consistent with the PM-owned adjudication; its front-matter
  KC1 name was corrected from the stale “One-Carbon Donor Pool” to the canonical
  “Methyl Donor Pool.” The stale KC2 front-matter projection, supporting-pool
  card and §4.3 link were removed because no child PM currently publishes a
  KC2 mapping. FM1 evidence highlights were checked against current child
  Findings. No BRS rollup text required repair.
- BRS2(KC2) is now formally recorded as evidence-supported non-application
  rather than being omitted after narrative screening.
- A public Review & Corrections record documents the threshold correction.
- No `kc_change_control_flags` entry was needed; the canonical KC definition
  and constituent decisions remain coherent.
- Legacy phenome ratings were not rescored. See the Stage 2A report.
- The focused PM2-F5 Finding was added and §4.1 was regenerated. Existing
  phenome decisions and dietary atoms were preserved.
- The canonical B12 correction, KC atom identities and duplicate-Betaine
  removal were preserved.

## Unresolved

- Human tissue or isotope-resolved BHMT flux response to betaine or choline intake.
- Human evidence for the indirect folate → betaine/DMG → BHMT interaction.
- Dietary zinc as a lever for this reaction.
- Direct attention or cognitive-clarity evidence.

## Validation

- KC evidence governance: 19/19 passed.
- Dietary traceability: 20/20 passed.
- Scientific Findings: 30/30 passed; §4.1 is fresh and PM2-F5 renders.
- Bibliography: all 557 cited keys resolved in the durable bibliography.
- Framework QC tests: 8/8 passed; FW036 is present in the generated public
  Review & Corrections dataset.
- FM KC projection tests: 6/6 passed.
- IDE lint: no errors in edited files.
- Local rendered page: linked BRS2(KC1) title and bounded public explanation
  render; Betaine, Choline, Homocysteine and Zinc still expose their five-field
  disclosures; the duplicate Betaine row remains absent; PM2-F5 and both new
  targeted references render.
- Repository-wide mechanism validation still fails on unrelated pre-existing
  FM, PM and SM records. PM2 and BRS2(FM1) have no reported validation error.
  The phenome index is also stale, but this audit did not alter phenome
  relationships, so it was not regenerated.
