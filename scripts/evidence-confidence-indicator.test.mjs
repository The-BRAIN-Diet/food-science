import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import {fileURLToPath} from "node:url"
import {
  evidenceConfidenceAccessibleLabel,
  resolveEvidenceConfidence,
  SEC_DISPLAY_LEVELS,
} from "../src/components/EvidenceConfidenceIndicator/secDisplay.mjs"
import {SEC_NOT_YET_SCORED, SEC_VALUES} from "./lib/scientific-findings.mjs"

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

const EXPECTED = [
  [1, "Extremely Low", "red"],
  [2, "Very Low", "red"],
  [3, "Low", "yellow"],
  [4, "Low–Moderate", "yellow"],
  [5, "Moderate", "orange"],
  [6, "Moderate–High", "orange"],
  [7, "High", "green"],
  [8, "Very High", "green"],
]

test("scores 1–8 map to the eight labels and four colour families", () => {
  assert.deepEqual(
    SEC_DISPLAY_LEVELS.map((level) => [level.score, level.label, level.family]),
    EXPECTED,
  )
  for (const [score, label, family] of EXPECTED) {
    const state = resolveEvidenceConfidence({score})
    assert.equal(state.mode, "sec")
    assert.equal(state.activeSegments, score)
    assert.equal(state.totalSegments, 8)
    assert.equal(state.grouped, true)
    assert.equal(state.label, label)
    assert.equal(state.readout, `${score}/8 · ${label}`)
    assert.equal(state.family, family)
    assert.equal(
      evidenceConfidenceAccessibleLabel(state),
      `Evidence confidence: ${score} of 8, ${label}`,
    )
  }
})

test("a raw zero is not displayed as 1", () => {
  const state = resolveEvidenceConfidence({score: 0})
  assert.equal(state.mode, "unscored")
  assert.equal(state.score, null)
  assert.equal(state.activeSegments, 0)
  assert.equal(state.readout, "Not scored")
  assert.equal(evidenceConfidenceAccessibleLabel(state), "Evidence confidence: Not scored")
})

test("missing and invalid scores render Not scored", () => {
  for (const score of [undefined, null, "", 1.5, 9, -1, Number.NaN]) {
    const state = resolveEvidenceConfidence({score})
    assert.equal(state.mode, "unscored", `score ${String(score)}`)
    assert.equal(state.readout, "Not scored")
    assert.notEqual(state.activeSegments, 1)
  }
  const omitted = resolveEvidenceConfidence({})
  assert.equal(omitted.mode, "unscored")
  assert.equal(omitted.readout, "Not scored")
})

test("an adjudicated cap replaces the raw total", () => {
  const capped = resolveEvidenceConfidence({score: 8, adjustedScore: 4})
  assert.equal(capped.score, 4)
  assert.equal(capped.label, "Low–Moderate")
  assert.equal(capped.source, "adjusted")
  const withdrawn = resolveEvidenceConfidence({score: 6, adjustedScore: 0})
  assert.equal(withdrawn.mode, "unscored")
  assert.equal(withdrawn.readout, "Not scored")
})

test("legacy four-level values are not assigned SEC numbers", () => {
  const moderate = resolveEvidenceConfidence({level: "moderate"})
  assert.equal(moderate.mode, "legacy")
  assert.equal(moderate.score, null)
  assert.equal(moderate.activeSegments, 3)
  assert.equal(moderate.totalSegments, 4)
  assert.equal(moderate.grouped, false)
  assert.equal(moderate.readout, "Moderate")
  assert.equal(
    evidenceConfidenceAccessibleLabel(moderate),
    "Evidence confidence: Moderate, level 3 of 4",
  )
  const high = resolveEvidenceConfidence({level: "high"})
  assert.equal(high.score, null)
  assert.notEqual(high.readout, "8/8 · Very High")
})

test("stored findings stay not-yet-scored", () => {
  assert.deepEqual([...SEC_VALUES], [SEC_NOT_YET_SCORED])
  const schema = fs.readFileSync(path.join(root, "system/scientific-finding-schema.md"), "utf8")
  assert.match(schema, /synthesised_evidence_confidence` is `not-yet-scored`/)
  const findings = fs.readFileSync(
    path.join(root, "src/components/ScientificFinding.tsx"),
    "utf8",
  )
  assert.match(findings, /not-yet-scored/)
  assert.doesNotMatch(findings, /Extremely Low|Very High|Low–Moderate/)
})
