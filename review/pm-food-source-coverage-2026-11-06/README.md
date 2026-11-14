# Local PM food-source coverage review

Start with `manuscript_food_network_rollup.md`, `food_wheel_before_after.md` and `validation_report.md`. Full source decisions: `target-research-decisions.csv`; observations: `backfill-observations.json`; selected edges and scores: named CSV files. Gap report covers every eligible target.

Preview: http://127.0.0.1:3162/food-wheel.html (local server required). The preview folder is `review/visualisations/brain-food-wheel-pm-qualified-2026-11-06/`. Research candidates require author review; the baseline label denotes the original canonical source pool, not a fabricated history of individually approved selections.

Reproduction from repository root: `node review/pm-food-source-coverage-2026-11-06/select.mjs`, `python3 review/pm-food-source-coverage-2026-11-06/report.py`, `node review/pm-food-source-coverage-2026-11-06/wheel.mjs`, `node review/visualisations/brain-food-wheel-pm-qualified-2026-11-06/build.mjs`. Do not rerun source-mutating backfill scripts. Validation scripts and command outputs are saved in this folder.

No commit, push or production deployment performed.
