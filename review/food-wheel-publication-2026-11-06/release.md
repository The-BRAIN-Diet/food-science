# Food wheel publication — 6 November 2026

Author explicitly approved publication of the reviewed food wheel in the current conversation. Dedicated release branch based on GitHub main a00d6b0d; unrelated scientific checkout preserved.

Included: standalone `/explore/food-wheel/` HTML, SVG, three source/coverage/gap tables, scope page, publication contract and exact-hash approval records, focused tests. No navigation injection, new ring, PM changes, admissions or scientific scoring changes.

Source: reviewed local food-wheel snapshot, 90 foods / 68 displayed substances / 121 substance–system relationships. 1,750 documented food pairs plus 18 optional proposed-only pairs. Twenty-one research proposal records retain their status. Published scope expressly distinguishes local research relationships from live canonical PM admissions. Local paths and localhost links removed; source preparation, quantities and limitations preserved.

Validation: four focused publication tests pass. Presentation gate passes (691 protected files). Production build uses NODE_OPTIONS=--max-old-space-size=4096, TERSER_PARALLEL=1, DOCUSAURUS_NO_PERSISTENT_CACHE=1 and existing SEC base. Build status and deployment verification recorded in the handoff.

Excluded: all dirty canonical PM/food/substance records, intervention integrations, source checkout untracked reviews/training/build output and concurrent BRS-X branch work. No changes to those files are part of this release.

Local full build stopped during client compilation after approximately seven minutes because available disk fell from 7.9 GiB to 2.8 GiB. Server compilation succeeded; no compiler error observed. This is an incomplete local build, not a production-build pass. Require successful Netlify preview before merge. Browser publication copy verified: Beef 28 ribbons, Reset 1,750, food links target the public site.
