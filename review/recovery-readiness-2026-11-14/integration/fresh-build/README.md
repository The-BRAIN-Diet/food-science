# Fresh production and deploy-preview verification

**Tested runtime:** `7c5743f817943ada3e7e749ef103d6d2f4061488` on `recovery/20261114-release-actions`, draft PR244.
**Netlify deploy:** `6af8b9463f27637b149b3eb9`, state `ready`, exact commit verified through deploy metadata and GitHub success status. Netlify build/deploy time394seconds.
**Immutable preview:** https://6af8b9463f27637b149b3eb9--food-science.netlify.app/explore/food-wheel/
**PR alias:** https://deploy-preview-244--food-science.netlify.app/explore/food-wheel/
**Local built preview:** http://127.0.0.1:3199/explore/food-wheel/

## Full pipeline

`npm run build -- --out-dir /tmp/brain-verified-runtime-20261114` passed with the normal npm prebuild chain. Environment matches Netlify preview: `CONTEXT=deploy-preview`, `NODE_OPTIONS=--max-old-space-size=6144`, `SEC_BASE_REF=ebbc10ed11484192c972952d8c47645bd3c5bf4e`, `TERSER_PARALLEL=1`, `DOCUSAURUS_NO_PERSISTENT_CACHE=1`. Client3.93minutes, then server39.29seconds; static output succeeded. Normal production optimisations and scientific prechecks remain enabled. Existing tag, Browserslist and broken-anchor warnings remain in the complete log; no warning suppression introduced.

Two setup attempts are explicitly retained: the initial invocation correctly failed the SEC check because the environment omitted SEC_BASE_REF; a subsequent invocation without CONTEXT was stopped after detecting concurrent compilation. Neither changed code/checks or is counted as the passing build. The final complete run uses all configured settings.

## Checks and dispositions

| Check | Current result |
|---|---|
| Current candidate/provenance/isolation/ranked-viewer suites |64/64 pass, including repaired Findings tests|
| Global canonical Findings checker |67 PMs, zero issues|
| Four earlier baseline-reproduced Findings failures |Reconciled against approved records; now pass, not silently carried as failures|
| Historical pilot reproduction |0/1 against current candidate; original historical pins/assertion preserved separately|
| Public QC suite |9/10; expected2/actual0 unresolved because active inputs remain absent|
| Three-viewer ranked consistency |All984 selected observations/ranks/RSP agree exactly|
| Manifest, ranked snapshot, package/gate config, public QC dataset |Byte-identical to tested runtime; no generated metadata differences|
| Counts |984ranked connections;79ranked foods;112/158covered targets|

Recovered QC register/state remain archived evidence, not active inputs. Missing inputs are not issue closure or scientific clearance. Cross-framework QC remains suspended; this report is not a global QC PASS or scientific freeze.

## Deployed verification

All three viewer dataset files and PM Explorer navigation JS match both candidate and local production output byte-for-byte. All nine hypothesis pages return200; browser checks expanded each disclosure and verified Unestablished status and explicit scientific-admission boundary. Existing isolation tests confirm no accepted ranked relationships are created by hypotheses.

Five affected PM articles (BRS1 PM1, GABA PM9, PM12; BRS2 PM7; ECS PM3) have identical normalized article text locally and on the immutable deployed preview. ECS PM3 retains the canonical genistein link with unchanged rationale/ratings; Netlify/Docusaurus trailing-slash URL normalization is expected, not a scientific difference.

Desktop/mobile controls passed for Food Wheel single/multiple/Compare, BRS off, RSP filtering, PM Explorer selection and Food Intelligence filtering. Explorer→canonical PM navigation remains on the preview origin. Mobile viewport390×844; reset afterward. Food Intelligence retains intentional horizontal scrolling; no redesign performed. Initial browser observations waited for data loading/hydration before making assertions. Screenshots and per-page/data evidence are alongside this report.

## Merge readiness and production boundary

**Technical build and smoke verification passes. Merge readiness is conditional, not an unconditional release recommendation:** the author must knowingly disposition the remaining public-QC missing-input limitation under the existing suspension. Historical reproduction incompatibility is separate from current candidate correctness. No current functional build blocker was observed; no scientific clearance inferred.

The existing Git/Netlify workflow uses `main` for production (live published deploy `6af5e82e2ee5b7f0e5fd9bb9`, branchmain, commit`f0845f3a29e078bc63f613e8baec6b889e716285`; production build context is configured in netlify.toml). Merging PR244 to main is expected to trigger automatic production build/deployment and must be treated as a publication action. Private administrative pause/lock settings are not exposed by the unauthenticated metadata and were not changed. No merge or production deployment was performed.

A subsequent documentation-only commit records this evidence; it is not the tested runtime SHA above. Use the immutable deploy URL for this exact verified revision.
