# Review 01 — approved local implementation

Author approved six ready and six qualified observations and four existing B6→PLP assessment reconciliations. Soy glycine explicitly not approved. Implemented on `audit/dietary-connectivity-2026-11-09`, uncommitted; current PR untouched. No builds/deployment.

## Scope

Twelve canonical food records now carry source-specific supplementary observations. Original panels and previous observations remain unchanged. Raw-beet USDA 130 mg is selected independently of the preserved, unranked 129 mg corrected-Zeisel record. Frozen spinach and toasted wheat germ retain separate preparation/material attribution. Beef AR regression derivation, chicken missing derivation code, source sample/data-point counts and all qualifications remain in the records and generated selected observations.

Existing beef creatine/CoQ10 and salmon astaxanthin review holds now have explicit substance IDs; their status and wording are unchanged. This prevents named unrelated holds from blocking approved glycine while retaining their intended exclusions. Soy remains byte-for-byte unchanged and absent from glycine rankings. Target restrictions, source-power threshold and cap are unchanged.

Four approved assessments installed only on BRS1 PM3/PM4/PM5 and BRS2 PM5. Original atoms, overlays, missions, Findings and SEC remain unchanged. Alternative PDXK/PNPO routes and original limitations are preserved, including Lamers null flux outcomes. All four now resolve as existing admitted Derived pathways; the original 18-record conversion queue has 14 remaining.

## Recomputed shared coverage

|Metric|Approved amino-acid baseline|Review 01 local snapshot|Gain|
|---|---:|---:|---:|
|Selected foods|65|70|5|
|Food–substance–PM connections|890|960|70|
|Ranked input identities|26|28|2|
|Covered PM–substance targets|100/151|112/151|12|

Glycine: seven foods across five existing targets; betaine: five foods across seven. Newly selected identities: beef, beetroot, quinoa, spinach and wheat germ. Uncovered ranked targets: 39/151. Four conversion reconciliations are separate from these twelve ranked-target gains.

Shared ranked outputs regenerated locally; static wheel assets are deliberately unchanged. No public preview or deployment claim is made. Source publication allowlist records the exact approved food-file hashes and author scope; no other backfill imported. Approved individual-amino-acid extraction from the separate PR is reused on this audit branch so comparisons use the 65/890/100 baseline.

## Validation

- 17/17 focused implementation/composition tests pass, including all-target PM/shared-snapshot equality and original-record preservation.
- 16 changed food/PM documents pass focused MDX compilation.
- Dietary governance: 67 PMs, no issues.
- Scientific Findings consistency: 67 PMs, no problems.
- SEC registry/history: 140 snapshots valid.
- Presentation: 691 protected files, no unapproved structural changes.
- Broad food-page validator retains the three pre-existing qualitative-row failures for broccoli/sulforaphane, shrimp/betaine and spinach/betaine. Approved frozen-spinach quantitative observation passes; the legacy qualitative row remains untouched. No new failure.
- Diff whitespace check passes. No scientific admission, SEC, source-power policy or public asset changes.

See implemented-results.json for exact selected food quantities, ranks, powers, source qualifications and four resolved conversion records. Earlier proposals and source-verification decisions remain as historical review records; this document records their subsequent author approval and implementation.
