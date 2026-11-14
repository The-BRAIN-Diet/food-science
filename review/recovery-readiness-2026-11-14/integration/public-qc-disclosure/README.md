# Temporary public-QC disclosure

Author approval, 14 November 2026: implement the temporary public-QC disclosure, test and refresh draft PR244; preserve archived issues and QC suspension; no issue closure, merge or production deployment.

## Implementation

Existing shared Review & Corrections panels and the existing register show the exact approved notice: “Public review-history reconciliation is incomplete. Missing review entries do not indicate scientific clearance or resolution of previously recorded issues.” A missing page history is labelled unavailable/incomplete. Empty register results say available review entries/history incomplete, not zero known issues. Available pending/open records remain visible and retain their statuses. No new tab or scientific section.

The explicit temporary presentation flag is independent of generator fallback data and remains until separately validated reconciliation. It does not activate archived inputs, close FW001/FW003 or reactivate QC. Shared presentation and Framework QC contracts record the approval; Stage 2A/2B science, PM templates and admissions do not change.

## Focused verification

- Actual React server-render tests: 5/5 pass (missing history, retained pending record, empty register, retained open register issue, and partial applied history never implying clearance).
- Current hypothesis suite: 10/10 pass.
- Three-viewer ranked equivalence: 984; manifest and ranked snapshot byte-identical to bca0a97f32acb36089833ec0d6c24c2618f22f69. Counts remain 984 connections, 79 foods, 112/158 targets.
- Existing public-QC suite: 9/10, with the original expected-two/actual-zero missing-input failure unchanged. No assertions reset or issues declared closed.
- Archived recovery JSON inputs, package/gate configuration, generator and generated public-QC dataset byte-identical; see protected-files.json.

Preview verification pending at this implementation checkpoint. Normal Netlify deploy-preview build will verify the new runtime; no production action authorised. The disclosure dispositions the publication limitation, not the underlying missing-input reconciliation or scientific clearance.
