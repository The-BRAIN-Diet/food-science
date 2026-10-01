# BRS1 PM1–PM11 — Type D Key Constraint status

One consolidated record. Dietary Requirements and Findings were not reopened.
No new KC was created.

This pass is **not complete**. Every admitted BRS1(KC1) candidate now has a
disposition. Unresolved capacity-constraint gaps and the BRS4/BRS6 naming
blocker remain open.

## Coverage of PM1–PM11

The previous report covered PM3–PM5 only. This table covers all eleven BRS1 PMs.

Native BRS1 KC: `BRS1(KC1)` quality and competitive arms, assessed separately.
Cross-BRS existing KCs were added only where already named on the page or
obvious from the mission.

| PM | Mission (short) | Candidates assessed | Screened existing KCs |
| --- | --- | --- | --- |
| PM1 | Circulating IAA pool | BRS1 quality; BRS1 competitive | Other BRS KCs are not this pool. |
| PM2 | LAT1 meal-level competition | BRS1 competitive; BRS1 quality | Other BRS KCs are not LAT1 balance. |
| PM3 | Dopamine synthesis through metabolism | BRS1 both arms; BRS2 methyl-donor; BRS3 GSH-substrate | BRS2(KC2), BRS5, BRS-X screened out. BRS4/BRS6 **blocked** (see below). |
| PM4 | Noradrenaline synthesis / signalling | BRS1 both arms; BRS2 methyl-donor | BRS3 not named on this page; not forced. |
| PM5 | Serotonin formation / signalling | BRS1 both arms; BRS2 methyl-donor | BRS3 not named; not forced. |
| PM6 | Acetylcholine synthesis | BRS2 methyl-donor | BRS1(KC1) screened out (choline is not LAT1 LNAA cargo). |
| PM7 | Neuronal-membrane DHA incorporation | BRS2 methyl-donor | BRS1(KC1) screened out (DHA is not an amino-acid pool). |
| PM8 | Excitation–inhibition balance | BRS1 both arms | Other BRS KCs not first-order for E/I capacity. |
| PM9 | GABA synthesis | BRS1 both arms | Same. |
| PM10 | Glutamate clearance | BRS1 both arms | Same. |
| PM11 | Excitotoxic buffering | BRS1 both arms | Same. |

## Established mappings (public)

Public copy uses the Stage 2A audience. Audit terms stay in
`kc_applicability_adjudications`.

| PM | Mapping | Mode | Public explanation |
| --- | --- | --- | --- |
| PM1 | BRS1(KC1) quality | governs | Meals have to supply the indispensable amino acids this mechanism keeps available. That is about the circulating amino-acid pool, not about competition for entry into the brain. |
| PM2 | BRS1(KC1) competitive | governs | Large neutral amino acids share one route into the brain. This mechanism is about how meals change that competition, not about whether the protein supply is complete. |
| PM5 | BRS1(KC1) competitive | constrained-by | Tryptophan competes with other large neutral amino acids for transport into the brain. This balance can affect its availability for serotonin synthesis, without establishing an effect on mood or ADHD symptoms. |
| PM6 | BRS2(KC1) methyl-donor pool | constrained-by | One-carbon compromise can put pressure on the shared choline resource used for acetylcholine synthesis. Animal evidence supports this link, but it does not show that supplements raise human brain acetylcholine. |

## Scoped negative decisions

| PM | Arm | Scope of the negative | Not claimed |
| --- | --- | --- | --- |
| PM1 | competitive | LAT1 competition is brain-entry balance, not circulating-pool availability. | That LAT1 never matters downstream. |
| PM3 | competitive | **Ordinary protein-driven LNAA change** has minimal tyrosine / catecholamine effects (Fernstrom 2013). | Non-application of the **whole** competitive arm. BCAA mixtures remain open. |
| PM4 | competitive | Same ordinary-protein scope as PM3. Proposition is synthesis capacity, not alertness. | Whole-arm non-application. |
| PM8–PM11 | competitive | LAT1 cargo is large neutral amino acids (Fernstrom 2013). Glutamate and GABA are not that set. | That no amino-acid state can ever affect these PMs. |

## Unresolved questions (transparent)

| PM | Gap | Retrieval attempted | What it found | Why the search stopped |
| --- | --- | --- | --- | --- |
| PM2, PM3, PM4, PM5, PM8–PM11 | IAA-quality inadequacy → this PM’s governed capacity | Yes. Repository `fao_diaas_2013`, `mariotti_dietary_2019` (and Moughan on PM1). | DIAAS/IAA scores measure protein quality, not monoamine, E/I, GAD, clearance or buffering capacity. | Further quality-score papers would repeat the same construct. Extreme Trp-poor or depletion diets are a different construct. |
| PM2 | IAA quality → LAT1 transport capacity | Yes. FAO/Mariotti plus Fernstrom 2013. | Fernstrom describes competition among LNAAs that are present. It does not show that a DIAAS shortfall constrains transport capacity. | Construct mismatch. |
| PM3, PM4 | Whole competitive arm after ordinary-protein result | Yes. Fernstrom 2013 already distinguishes ordinary protein meals from BCAA mixtures. | Ordinary protein: minimal Tyr/catecholamine effect. BCAA mixtures: different exposure. | Closing the arm would over-claim. A new BCAA-trial search was not used to invent whole-arm non-application. |
| PM3–PM5 | Methyl-donor inadequacy → COMT / serotonin-to-melatonin **metabolism** | Yes. Page-local Kennedy 2016, MacDonald 2024, PM5-F4. | Enzyme or pathway chemistry only. No ordinary one-carbon variation → clearance or synthesis-capacity assay. | Extra one-carbon reviews repeat chemistry, not the Type D link. |
| PM3 | GSH-substrate inadequacy → dopaminergic capacity | Yes. Sekhar 2011 for the named GSH pool; PM3 §5.2 for redox adjacency. | GSH synthesis in aging is not a dopaminergic-capacity assay. | Stopped at the construct gap. |
| PM7 | Methyl-donor inadequacy → DHA incorporation | Yes. Patrick 2019, Liu 2014 already on the page. | Phospholipid carriage is established. PEMT-to-PC constraint is inferred. | No attached source measures DHA incorporation under one-carbon inadequacy. |

Unresolved is not a negative finding.

## BRS4 / BRS6 blocker — schema-definition, not an evidence gap

PM3 lists Cross-BRS **dependencies** (energy; metabolic, stress and circadian
context). Type D admits a mapping only to a **named** KC pool or state.

BRS4 has two KCs (macronutrient substrate vs mitochondrial cofactors). BRS6 has
two KCs (glucose/energy vs stress-response micronutrient/lipid) plus circadian
biology that is not a KC. The page does not identify which named pool is meant.

That is a **schema-definition / naming** issue: the dependency is BRS-level, not
an iKC identifier. It is not an evidence gap that can be closed by arbitrarily
selecting one of those KCs. No KC was selected to unblock assessment.

## Completion

**Completed:** PM1–PM11 coverage screen; all admitted BRS1(KC1) arms; omitted
BRS2(KC1) on PM3–PM7; omitted BRS3(KC1) on PM3; four public mappings in plain
language; scoped ordinary-protein findings on PM3/PM4; PM5 competitive mapping
preserved. PM6's earlier one-carbon gap is closed by the amended page-level
evidence review (Chan 2008; Crivello 2010; Jadavji 2014).

**Still open:** every unresolved row above; BRS4/BRS6 naming blocker; proposed
non-KC items (iron, BH4, VMAT/ATP, DAT/SERT/MAO) recorded in
`CC-BRS1-FM1-PM3-05-KC-COVERAGE`.

**Not remaining unassessed:** no admitted candidate on PM1–PM11 is still
`unassessed`.
