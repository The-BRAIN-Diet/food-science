# CoQ10 integration — local author review

Branch review/brs5-pm4-sec-assessment, HEAD 521036b1. Author approval 5 November 2026. Prior olive-oil/EVOO changes and PM10 Principle correction preserved. No commit/push/deployment.

## Integration

One existing CoQ10 substance page retains its ubiquinone-10 InChIKey and explicit ubiquinol distinction. Added source-specific olive-oil and pistachio quantities in existing Foods prose, with citations and no generic composition substitution. Existing SubstanceFoods provides direct canonical food links; no hardcoded parallel food list. Existing Biological Mechanisms prose now links PM1, PM5 and PM10 with biological-versus-dietary boundaries.

PM1: repaired overview ubiquinone navigation to the canonical CoQ10 page. PM10: existing Overview now links the substance's food occurrence and original composition evidence. No Finding, Principle, dietary admission or SEC field changed. PM5 untouched; its PM5-BIO-Q relationship retained as provenance.

## PM food-list constraint

`system/substance-page-schema.md`, Sixth atomic field: “Generate PM-input substance–food lists only for dietary_input === true. Keep No and unset entries visible as biological context; suppress their food lists without removing canonical food composition records.” PM10-DIT-5 and PM1-DIT-4 remain false. Therefore a contextual PM food dropdown is not permitted. Implemented smallest compliant solution: existing PM Overview → CoQ10 → existing Foods component and References. No gate bypass or new presentation structure.

## Food audit

All nine occurrence links preserved. New changes: heart received missing page-local original Mattila 2000 citation; early-harvest olive oil now links original Žmitek 2014 alongside preserved historical review; pistachios preserve the measured six-sample range in source-qualified existing nutrition notes. Regular olive oil and EVOO retain the preceding validated repairs. Beef, liver, mackerel and sardine records unchanged.

Measured source groups: EVOO blends 56 ± 4 mg/L (7), monocultivar fresh/fresh-frozen EVOO 52 ± 17 mg/L (79), refined oil 54 ± 10 mg/L (2); pistachio named samples 10.21–42.16 µg/g. No oil-density conversion, native ubiquinol inference, universal early-harvest amount or roasted-pistachio equivalence. Beef 2.5 mg/100 g remains an estimate with pending quantitative citation. Heart, liver, fish and early-harvest generic amounts remain unestablished.

Original sources retained: Žmitek DOI 10.1021/jf5002167; Aydoğan DOI 10.3390/molecules28031423; Mattila DOI 10.1021/jf990581f (abstract verification). Liver and fish still rely on existing secondary source tables: original preparation-specific numeric values not verified, no fabricated quantities. Beef's estimate is not attributed to a verified 2000 measurement. The 2001 Mattila food-content paper remains a relevant original source requiring table access (10.1006/jfca.2000.0983). See preceding food-provision report for retrieval limits.

## Machine-readable handoff

`network-ready.json` contains 11 nodes (9 foods, one CoQ10, one BRS4), 9 composition edges and one contextual CoQ10–BRS4 edge with three PM-specific provenance records. No direct dietary admission is implied. The chord files are unchanged. Exercise remains deferred; no new intervention assessment.

## Remaining limitations

Primary quantitative reconciliation of liver/mackerel/sardine and preparation-specific beef/heart is incomplete. Review evidence remains labelled as such. Ubiquinol is described as a distinct redox form, not duplicated as another food amount or same-InChI synonym. No new registry identity was required.

## Validation results and preview limitation

All nine food validators and their page-local source anchors pass. CoQ10 substance and both changed PMs compile with the installed MDX compiler. Dietary governance: 65 PMs, zero issues. Findings: 65 PMs, zero problems. SEC registry/history:139 snapshots pass against published baseline a00d6b0d6c879e75c058ccb2a5c63ae6562afd2c. All1035 cited bibliography keys resolve. Existing substance calibration/inverse-link validator passes (it does not certify CoQ10 as a fully migrated substance template). Presentation contract passes without baseline regeneration. Focused provenance/composition/citation suite:19/19 after replacing the obsolete whole-body equality with an exact single authorised navigation-paragraph allowance; all other science/body and SEC assertions retained. Saved SEC and chord files remain byte-identical.

Browser check at localhost3145 confirms an older served snapshot: it still shows8 foods and lacks the new quantitative prose. Therefore latest browser rendering is NOT yet verified. The running preview was preserved; no directory it serves was regenerated and no deployment was performed. A separate build/preview refresh is needed before visually accepting the current integration. Existing local links resolve, but currently show that older snapshot.
