# BRS1-FM1-PM3–PM5 — Type D KC assessment

Focused Type D pass. Findings and Dietary Requirements were not reopened.
No new Key Constraint was created.

This pass is **not complete**. Every listed candidate now has a disposition.
That is not completion. Completion would require the unresolved capacity-constraint
links and the blocked BRS4/BRS6 pool-identification questions to be closed.

## Mission coverage (candidate set)

Missions used to build the candidate set:

| PM | Governed mission |
| --- | --- |
| PM3 | Dopamine synthesis, storage, release, receptor signalling, reuptake and metabolism |
| PM4 | Noradrenergic alertness and executive control |
| PM5 | Serotonergic signalling for mood stability, inhibition and behavioural regulation |

Existing KCs in the ontology were screened against those missions. The first
candidate set was only `BRS1(KC1)`. The coverage scan added omitted existing
KCs that were already named on the pages as constrained dependencies.

### Existing KCs screened, not admitted as Type D candidates

| Existing KC | Why not a Type D candidate here |
| --- | --- |
| BRS2(KC2) Methionine & Transsulfuration Substrate Pool | Transsulfuration/GSH-adjacent BRS2 biology, not a first-order monoamine-capacity pool. |
| BRS4(KC1) Macronutrient Substrate Sufficiency | PM3 lists “energetic requirements” as a Cross-BRS dependency. Two BRS4 KCs exist. No single named energy pool is identified. **Blocked**, not unassessed. |
| BRS4(KC2) Mitochondrial Cofactor Sufficiency | Same block: energy dependency is not uniquely this cofactor pool. |
| BRS5(KC1) Fermentable Fibre Sufficiency | Gut–fibre biology is not a first-order constraint on these signalling missions. |
| BRS5(KC2) Polyphenol & Plant-Diversity Input Sufficiency | Not a named monoamine-capacity pool. |
| BRS6(KC1) Glucose / Energy Substrate Sufficiency | PM3 lists metabolic/stress/circadian context. Two BRS6 KCs plus non-KC circadian biology. No single named pool. **Blocked**. |
| BRS6(KC2) Stress-Response Micronutrient & Lipid Sufficiency | Name collision with stress phenome is not noradrenergic signalling. Same BRS6 block. |
| BRS-X(ECS-KC1) Phospholipid & NAPE Precursor Sufficiency | Endocannabinoid phospholipid pool is not a first-order monoamine constraint. |

BRS4 and BRS6 remain Cross-BRS dependencies on PM3. They are **not** Type D
candidates until one named iKC is selected and evidenced.

## Decision table — assessed candidates

| PM | KC / arm | Applicability proposition | Demonstrated | Inferred, not used | Disposition | Public §3.1.3 | Evidence limits |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PM3 | BRS1(KC1) amino-acid-quality | IAA-quality inadequacy can constrain dopaminergic capacity. | Tyrosine is the hydroxylase substrate (PM3-F1). DIAAS/Mariotti score protein quality. | Incomplete meal protein quality would therefore constrain dopamine signalling. | **unresolved** | Empty | Quality scores do not connect to dopaminergic capacity. Tyrosine is dispensable when phenylalanine is adequate. |
| PM3 | BRS1(KC1) competitive-lat1 | LAT1 LNAA imbalance can constrain dopaminergic capacity. | Ordinary protein-driven LNAA change has **minimal** Tyr/catecholamine effects (Fernstrom 2013). | BCAA mixtures or activated TH could still constrain dopamine synthesis. | **evidence-supported-non-application** | Empty | Named state is ordinary meal LNAA balance. |
| PM3 | BRS2(KC1) methyl-donor pool | Methyl-donor inadequacy can constrain dopaminergic capacity. | COMT uses SAM in dopamine metabolism (PM3 §5.2; MacDonald 2024). Kennedy 2016 is one-carbon chemistry. | SAM shortage would therefore constrain dopaminergic signalling. | **unresolved** | Empty | Enzyme chemistry ≠ capacity constraint. Ordinary one-carbon variation was not shown to control dopamine clearance. |
| PM3 | BRS3(KC1) antioxidant-substrate pool | GSH-substrate inadequacy can constrain dopaminergic capacity. | Dopamine oxidation is a redox interaction (PM3 §5.2). Sekhar 2011 is GSH synthesis. | GSH shortage would therefore constrain dopamine signalling. | **unresolved** | Empty | GSH-pool evidence is not a dopaminergic-capacity assay. Antioxidant exposure was not shown to modify human dopaminergic signalling. |
| PM4 | BRS1(KC1) amino-acid-quality | IAA-quality inadequacy can constrain noradrenergic capacity. | Tyrosine is the pathway starting material (PM4-F2). DIAAS/Mariotti score protein quality. | Incomplete IAA quality would therefore constrain noradrenergic signalling. | **unresolved** | Empty | Same quality-construct gap as PM3. |
| PM4 | BRS1(KC1) competitive-lat1 | LAT1 LNAA imbalance can constrain noradrenergic capacity. | Ordinary protein-driven LNAA change has minimal catecholamine effects (Fernstrom 2013; PM4-IC1). | Reduced tyrosine entry would constrain alertness. | **evidence-supported-non-application** | Empty | Presentation is not signalling. Ordinary meal ≠ BCAA mixture. |
| PM4 | BRS2(KC1) methyl-donor pool | Methyl-donor inadequacy can constrain noradrenergic capacity. | COMT can inactivate catecholamines using SAM (PM4 §5.2). | SAM shortage would therefore constrain alertness signalling. | **unresolved** | Empty | Ordinary methylation-cycle variation was not shown to control noradrenaline signalling. |
| PM5 | BRS1(KC1) amino-acid-quality | IAA-quality inadequacy can constrain serotonergic capacity. | Tryptophan is indispensable and is the serotonin starting material (PM5-F2). | Incomplete protein quality would therefore constrain serotonin signalling. | **unresolved** | Not published on this arm | Fernstrom’s protein effects operate through the Trp:LNAA ratio (competitive arm). Extreme Trp-poor diets are a different construct. |
| PM5 | BRS1(KC1) competitive-lat1 | LAT1 LNAA imbalance can constrain serotonergic capacity. | Ordinary protein-driven LNAA change produces **large** variation in brain Trp uptake and serotonin synthesis (Fernstrom 2013). | Those synthesis changes would also change mood, sleep or ADHD. | **established / constrained-by** | KC title + formation sentence | Formation capacity only. Transport ≠ signalling (PM5-IC1). No inherited food lists. |
| PM5 | BRS2(KC1) methyl-donor pool | Methyl-donor inadequacy can constrain serotonergic capacity. | Serotonin-to-melatonin conversion can use SAM (PM5-F4; §5.2). | SAM shortage would therefore constrain serotonin signalling, mood or sleep. | **unresolved** | Not published | Melatonin fate is not serotonergic signalling capacity. Ordinary one-carbon variation was not shown to control serotonin signalling. |

## Proposed new constraints (not created)

Recorded in `system/mechanism-change-control-queue.md` as
`CC-BRS1-FM1-PM3-05-KC-COVERAGE`. Do not open a KC page.

| Proposed constraint | Why it came up | Why it is not a new KC |
| --- | --- | --- |
| Shared iron for TH/TPH | Iron is a hydroxylase requirement on PM3–PM5. | KC schema excludes mineral cofactors. Keep as PM Dietary Requirements. |
| BH4 sufficiency | Endogenous hydroxylase cofactor. | Biochemical requirement, not a shared dietary pool. |
| Vesicular / VMAT–ATP storage | PM3 mission includes storage and release. | Mechanism stage, not a nutritionally constrained shared pool. |
| DAT / SERT / MAO dietary constraint | PM3/PM5 missions include reuptake and metabolism. | Later-stage diet remains deferred (PM5). Not a KC. |

## Completion status — explicit

**The KC pass is not complete.**

### Completed assessments

- Coverage screen of every existing KC against PM3–PM5 missions.
- `BRS1(KC1)` both arms on PM3, PM4 and PM5.
- Omitted existing `BRS2(KC1)` on PM3, PM4 and PM5.
- Omitted existing `BRS3(KC1)` on PM3 (the only PM that already named antioxidant handling).
- Public mapping decision: only PM5 competitive LAT1 is published.

### Unresolved (assessment done; material gap remains)

- All three `BRS1(KC1)` quality arms: protein-quality literature does not connect to monoamine capacity.
- All three `BRS2(KC1)` methyl-donor arms: SAM/COMT or SAM/melatonin chemistry does not establish a capacity constraint.
- PM3 `BRS3(KC1)`: GSH-substrate evidence does not establish a dopaminergic-capacity constraint.

Unresolved is not a negative finding and is not “unassessed.”

### Blocked (cannot be Type D-assessed until the pool is named)

- PM3 BRS4 energy dependency: `BRS4(KC1)` vs `BRS4(KC2)` not selected.
- PM3 BRS6 metabolic/stress/circadian dependency: `BRS6(KC1)` vs `BRS6(KC2)` vs non-KC circadian biology not selected.

### Not remaining unassessed

No admitted candidate on PM3–PM5 is still `unassessed`.

## Sources

| Key | Use |
| --- | --- |
| `fernstrom_lnna_2013` | Competitive-arm Trp vs Tyr/catecholamine contrast. |
| `fao_diaas_2013`, `mariotti_dietary_2019` | Protein-quality construct, not monoamine capacity. |
| `kennedy_b_2016` | One-carbon / B-vitamin chemistry. |
| `macdonald_dopamine_2024` | COMT as dopamine-metabolism chemistry. |
| `sekhar_glutathione_2011` | Named GSH-substrate pool. |
| PM3-F1, PM4-F2, PM5-F2, PM5-F4, PM4-IC1, PM5-IC1 | Existing Findings / constraints (not rewritten). |

## Tests and QC

Governance tests require published mappings only for `established` rows. They do
not require particular PMs to stay unmapped or unassessed.
