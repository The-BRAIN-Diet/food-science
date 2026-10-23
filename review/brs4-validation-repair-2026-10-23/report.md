# Four BRS4 validation blockers resolved

BRS4-FM3-PM6, PM7, PM8 and BRS4-FM4-PM9 now have no mechanism-validation issues. Full validation reports exactly **23 fewer issues and no new issues**: 14 rendered-input issues and nine missing connection explanations resolved. Repository-wide validation still fails on unrelated existing issues.

The 14 unstructured legacy dietary statements are preserved verbatim in labelled historical review panels linked from §3.1.1, with original placement recorded. No scientific admission decision had been recorded for these bullets; none was assigned by this repair. None was deleted, rejected, newly admitted or automatically moved into SOPs. They remain available for scientific reconciliation rather than appearing as newly assessed structured admissions.

Nine existing links gained scope explanations distinguishing fuel transport, utilisation, switching, mitochondrial formation and related operations. PM9's glucose-appearance connection explicitly requires separate causal evidence; its original title-only wording is also retained. Existing links do not establish dietary efficacy.

All four pages' structured frontmatter is identical to the pre-repair snapshot, including missions, admissions, Findings, evidence, limitations, KCs, Phenome and SEC/CC decisions. Food ontology, registry, generated dietary outputs, bibliography, governance and validators were not changed.

## Scientific review required

`scientific-review-items.json` identifies every original dietary statement. Substance identity, food delivery, pattern placement and PM-specific evidence require review before any structured admission or reassignment. The PM9 glucose-appearance causal relationship also remains unresolved. Existing carnitine/ketone identity and other coverage tasks remain in the earlier repair queue; this repair does not resolve their science.

## Checks

- **174/174** focused regression, governance, extraction and preservation tests passed, including six new tests.
- **4/4** pages compile using the Docusaurus MDX processor and existing PM layout plugin.
- Scientific Findings: **62 pages, zero problems**.
- SEC: **69 valid snapshots**.
- Full mechanism validation: **23 issues removed, zero added; no remaining issues on these four pages**.
- Dependent food outputs unchanged; original checkout's **2,589 fingerprints and working-tree status unchanged**.
- No unrelated implementation file changed during this repair.

No full production build, commit, push or merge was performed. Work remains isolated on `codex/deferred-stage2ab-enrichment`. The technical blockers are resolved, with scientific review items retained explicitly.
