# Connection-width trial — 9 November 2026

Author requested trying thicker selected connections for recipe, food, substance and BRS, noting system density. Local-only proposal on release/recipe-matrix-preview-2026-11-09 at ac5ffca6. Existing public files and PR #237 unchanged; no commit/push/deployment.

Preview: http://127.0.0.1:3164/wheel.html and http://127.0.0.1:3164/recipe.html. Comparison selector offers original 1×, 1.5×, 2×, and proposed Auto (recipe/food/substance 2×, BRS/BRS-X 1.5×). No focus always preserves original widths. The denser BRS1 example has 45 foods and 220 recorded food–substance–PM relationships, represented by 102 unique visible ribbons; 1.5× is recommended as a gentler system default, not an evidence classification.

Wheel widening expands both ribbon endpoint angular widths about existing centres; radius, colour, path routing and data stay fixed. All selected food→substance and substance→system ribbons widen. Unselected connections keep their original geometry. Recipe SVG strokes double the existing focused 2.6px width to 5.2px (53 active paths for whole recipe); no-focus 1.6px is unchanged. Emphasis communicates selection only.

Validation: embedded wheel and recipe scientific snapshots are identical to source; all 279 wheel ribbons accept 1×/1.5×/2× geometry without invalid coordinates; reset restores original path strings exactly; both standalone runtimes parse. Browser verified salmon roe, magnesium, BRS1 at 2× and 1.5×, whole-recipe selection and reset. Screenshots: roe-2x.png, brs1-2x.png, brs1-1_5x.png, recipe-2x.png. No full production build needed for these review-only copies; public assets remain unchanged.

Reproduce: node review/connection-focus-2026-11-09/build.mjs; node review/connection-focus-2026-11-09/test.mjs. Only this new review directory was written. Shareable selection URLs remain a separate pending enhancement. Canonical/public rollout needs separate approval.

Brightness refinement: author found doubling too subtle. Selected food ribbons now use 85% opacity (previously 42%); selected substance–system ribbons use 80%, preserving their exact base opacity on reset. Full-network opacity and canonical colours unchanged. Browser verified both selected layers with salmon roe; screenshot roe-brighter.png. Data/geometry regression checks still pass. Local only.

Superseding author choice: use 1.5× as the default for all focused selections (recipe, food, substance and BRS/BRS-X). Keep brighter wheel opacity (85% food paths, 80% system paths); unfocused view unchanged. Comparison overrides remain available. Local trial rebuilt; snapshot and geometry tests pass. No public assets, PR or deployment changed.
