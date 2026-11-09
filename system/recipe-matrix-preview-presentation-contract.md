# Unlisted Recipe BRS Matrix preview contract

Author approval: 9 November 2026, “the recipe is great! ... publish it live on the site on a hidden url”; subsequent decision “ok sounds good; do the github PR then” approves a scoped GitHub PR through the existing Netlify workflow. This does not authorise merging this PR or deploying it to production in this work item.

- **Change:** Publish the reviewed standalone vertical recipe connectivity prototype and its matching provenance JSON.
- **Purpose:** Inspect recipe → food → substance → accepted PM → BRS relationships without claiming recipe efficacy.
- **Placement:** `/preview/recipe-brs-matrix/`, a static standalone page.
- **Scope:** One recipe preview, two static files; no canonical recipe pages, template, shared renderer, navigation, sitemap, food pages, PMs, Food Wheel or BRS Matrix edits.
- **Source:** Frozen 7 November 2026 canonical working-tree projection using the existing food/PM mapper. Full source hashes retained; current-main differences reported in review/recipe-matrix-publication-2026-11-09/source-comparison.json. These differences are not scientific changes shipped by this PR.
- **Duplication:** This is an exported reviewed snapshot, not a separately authored scientific mapping dataset. HTML-embedded data and downloadable JSON must be identical.
- **Example:** `static/preview/recipe-brs-matrix/index.html` is the exact representative rendering.
- **Presentation:** Retain existing night theme, canonical BRS colours, responsive vertical layers, keyboard selection and disclosures. Retain recipe weights, limitations, historical admission qualifiers and missing mappings. Eight-substance cap is a connectivity sample, not a nutrition ranking.
- **Indexing:** HTML must contain `noindex,nofollow`. Do not add navigation/sitemap entries. Unlisted is not private or access-controlled.
- **Boundaries:** No new admissions, scores, canonical scientific edits or deployment configuration changes. Do not regenerate the presentation baseline. Netlify preview/build proceeds normally on PR push; production publication requires normal merge approval.
