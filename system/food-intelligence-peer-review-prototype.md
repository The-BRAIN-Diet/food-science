# Food Intelligence peer-review prototype — 10 November 2026

Author-approved scope: isolated four-column Foods → Substance Power → PMs → Substances view implementing the user's BRAIN Food Intelligence Rubric Final V1. This does not replace the main wheel or change scientific admissions or canonical composition.

Implementation: `scripts/build-food-intelligence.mjs` derives `static/explore/food-intelligence/data.json` from the current shared PM projection, registry and canonical food metadata. The prototype model filters existing ranked observations at 10%, 25% or 50%; 25% is the exploratory default. Shared top-ten selection and its underlying RSP denominator remain unchanged.

Supporting associations are existing eligible non-ranked PM relationships for otherwise unrepresented substances; two foods per substance by default, expandable. Documentation priority: measured, preparation-qualified, qualitative, then related routes, with canonical-ID tie breaks. This ordering is not a new evidence confidence appraisal. Below-threshold ranked records are not reclassified as stars. No parent-to-child food inheritance.

Whole eggs replace egg yolks only in this shortlist, by explicit author instruction. Yolk values are never transferred. Other overlapping food forms are disclosed, not merged. EAA aggregates are not added to their individual essential amino acids in target counts. Constituent and related targets are separately labelled.

Canonical mission, relationship provenance, limitations and all observation records remain available in the evidence drawer and JSON export. Typical serving and frequency data are not available in this shared schema; optional entered grams are calculation scenarios, not recommendations. Unsupported denominators cannot yield portion calculations.

Colours derive from canonical wheel systems; food paths begin at the dominant connected system, transition to receiving PM colour and retain it thereafter. Four-column layout scrolls horizontally on narrow displays. Keyboard buttons provide evidence inspection. Local example: /explore/food-intelligence/.

Validation: `node --test scripts/food-intelligence.test.mjs`; local browser threshold, BRS and keyboard food-selection checks. This is a prototype review gate, not production approval.

## Approved compact refinement — 10 November 2026

Food/score rows use a 42px minimum with 6px gaps, compact wrapping scores, and retained evidence qualifiers. PMs are naturally stacked under canonical BRS headings instead of distributed over the full food-column height. Full PM titles remain in accessible labels, tooltips and the evidence drawer. Substances use smaller naturally stacked BRS-grouped labels. No records, selection rules, defaults or starred exceptions change.

Food Wheel follow-up: author requested exploratory minimum RSP controls 10/25/50/80% and Day/Night theme. Wheel default remains 10%; URL parameter `rsp` restores filter/history. Existing eligible unranked/related edges remain explicitly unranked and are never assigned a score. Theme is stored locally; BRS and Compare contributor colours are preserved. No ranking or admission changes.

Local contrast refinement: BRS2/BRS5 Day-mode ribbon opacity is at least 0.68 (canonical fills unchanged; saturation filter removed). All existing circular ribbon endpoints widen 1.5× around their original angular midpoint, preserving radii and routing. Unranked dashed outlines increase 1→1.5px. Night opacity and Compare contributor colours remain unchanged. Verified all 426 source paths match the widening routine without invalid geometry; syntax and contrast checks pass. Local BRS5 Day view inspected, screenshot wheel-contrast.png. No data or scientific edits.

Label refinement: central substance labels scale 1.5× from source SVG font sizes (13→19.5); outer food labels scale 1.3×, preserving relative coverage-based size differences. Applied once after SVG loading, so refresh does not compound scaling. No geometry or data changes. JS syntax passes; browser reconnection unavailable during this follow-up, so overlap inspection remains for local review.

Local label follow-up: Day food/substance labels use #080f19, and inactive label groups retain 0.45 opacity instead of 0.15. BRS1–6 labels are centred on the corresponding interactive coloured segment at its angular midpoint, with contrast-safe text. Segment colours and scientific connections unchanged. Syntax check passed; no push.

Visual review correction: BRS1–6 labels now sit immediately outside their actual boxes (radius 495), with light Night text/dark Day text and a background-coloured halo. Long substance names exceeding 155 SVG units use ellipses with full identity retained in title, accessible label and selection details; enlarged font sizes remain unchanged. Day-mode central background corrected. Day and Night browser screenshots inspected and saved as labels-day.png / labels-night.png. Existing 92-food / 1,092-record all-network counts unchanged. Dense all-relations crossings remain intentional; selection and zoom remain available. No push.

Substance selection fix: choosing a substance via dropdown or ring clears food selection so the substance's full eligible food network appears, retaining RSP/BRS filters. Explicit existing URLs containing both food and substance continue to represent their intersection until a new selection. Copper check at 10%/all systems: 11 foods, 33 PM records. JS syntax passed; browser reconnection unavailable for this follow-up. Local only.
