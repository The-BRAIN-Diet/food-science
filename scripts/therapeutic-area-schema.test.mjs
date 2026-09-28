import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {fileURLToPath} from "node:url";
import {validateTherapeuticAreaData} from "./lib/therapeutic-area-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidence = JSON.parse(fs.readFileSync(path.join(root, "src/data/therapeutic-area-evidence.json"), "utf8"));
const pages = JSON.parse(fs.readFileSync(path.join(root, "src/data/therapeutic-area-pages.json"), "utf8"));

test("TA registry resolves all identifiers and provenance", () => {
  assert.deepEqual(validateTherapeuticAreaData(root), []);
});

test("one canonical study record can serve multiple condition claims", () => {
  const record = evidence.evidenceRecords.find((entry) => entry.citationKey === "wang_dietary_2019");
  assert.ok(record);
  const uses = evidence.claims.filter((claim) => claim.evidenceId === record.id);
  assert.ok(uses.length >= 2, "expected multiple hub interpretations for one bibliography key");
  assert.deepEqual([...new Set(uses.map((claim) => claim.taId))], ["TA001"]);
  assert.equal(evidence.evidenceRecords.filter((entry) => entry.citationKey === "wang_dietary_2019").length, 1);
});

test("all V1 pages use populated BRS sections and expose gaps", () => {
  assert.equal(pages.pages.length, 3);
  for (const page of pages.pages) {
    assert.ok(page.brsSections.every((section) => section.claimIds.length > 0));
    assert.ok(page.majorGaps.length > 0);
    assert.ok(page.researchPriorities.length > 0);
  }
});

test("supplement records are not represented as individual foods", () => {
  const records = new Map(evidence.evidenceRecords.map((record) => [record.id, record]));
  for (const page of pages.pages) {
    for (const intervention of page.interventions) {
      for (const claimId of intervention.claimIds) {
        const claim = evidence.claims.find((entry) => entry.id === claimId);
        if (!claim) continue;
        const record = records.get(claim.evidenceId);
        if (!record) continue;
        if (record.exposure.level === "supplement") assert.notEqual(intervention.level, "individual-food");
      }
    }
  }
});
