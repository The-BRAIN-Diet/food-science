import test from "node:test"
import assert from "node:assert/strict"
import { scanNeighbourBorrowedAnnotations } from "./lib/bib-neighbour-borrow.mjs"

test("rendered docs/ and src/pages annotations do not borrow a neighbouring BibTeX abstract", () => {
  const { hits, integrityFailures } = scanNeighbourBorrowedAnnotations({
    root: process.cwd(),
    writeReport: false,
  })
  assert.equal(
    integrityFailures.length,
    0,
    `BibTeX chunks spanning multiple @ entries:\n${integrityFailures
      .map((f) => `  ${f.file} ${f.key} atCount=${f.atCount}`)
      .join("\n")}`,
  )
  assert.equal(
    hits.length,
    0,
    hits
      .map(
        (h) =>
          `${h.file}:${h.line} key=${h.key} borrowed from ${h.neighbour}: ${h.previousIncorrect}`,
      )
      .join("\n") || "unexpected neighbour-borrow hits",
  )
})
