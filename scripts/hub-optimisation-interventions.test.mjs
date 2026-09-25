import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { buildCategoryItemsForHub } from "./lib/brs-hub-optimisation-render.mjs";
import { HUB_OPTIMISATION_LEVERS } from "./data/brs-hub-optimisation-levers.mjs";
import {
  getDerivedInterventionsForPm,
  getStructuredKetogenicLever,
  isQualifiedRelationship,
  normalizeRelationships,
} from "./lib/hub-optimisation-interventions.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

test("structured ketogenic approaches has one id and three relationships", () => {
  const lever = getStructuredKetogenicLever();
  assert.ok(lever);
  assert.equal(lever.id, "structured-ketogenic-approaches");
  const rels = normalizeRelationships(lever);
  assert.equal(rels.length, 3);
  assert.equal(rels.filter((r) => !isQualifiedRelationship(r)).length, 2);
  const qualified = rels.find((r) => r.target_pm_id === "BRS1-FM4-PM8");
  assert.ok(qualified?.context);
  assert.equal(qualified.evidence?.level, "preclinical-mechanistic");
  assert.deepEqual(qualified.evidence?.citation_keys, [
    "erecinska_regulation_1996",
    "zhang_decreased_carbon_2015",
  ]);
});

test("BRS4 hub ketogenic Supports excludes BRS1-FM4-PM8", () => {
  const byCategory = buildCategoryItemsForHub("BRS4", ROOT);
  const items = byCategory.dietary_protocols || [];
  const keto = items.find((item) =>
    /structured ketogenic approaches/i.test(item.action),
  );
  assert.ok(keto);
  const supportIds = keto.source_pms.map((pm) => pm.id).sort();
  assert.deepEqual(supportIds, ["BRS4-FM3-PM7", "BRS4-FM3-PM8"]);
  assert.equal(keto.qualified_relationships?.length, 1);
  assert.equal(keto.qualified_relationships[0].target_pm_id, "BRS1-FM4-PM8");
});

test("PM8 derives qualified ketogenic relationship", () => {
  const derived = getDerivedInterventionsForPm("BRS1-FM4-PM8", ROOT);
  assert.equal(derived.length, 1);
  assert.equal(derived[0].intervention_id, "structured-ketogenic-approaches");
  assert.equal(derived[0].author_brs_id, "BRS4");
  assert.equal(derived[0].is_direct_dietary_lever, false);
  assert.match(derived[0].context, /cross-BRS/i);
  assert.match(derived[0].evidence?.limitation || "", /GAD-activity/i);
  assert.equal(derived[0].evidence?.references?.length, 2);
});

test("no duplicate ketogenic intervention under BRS1 authorship", () => {
  const lever = getStructuredKetogenicLever();
  const b1Protocols = [];
  for (const item of HUB_OPTIMISATION_LEVERS.BRS1?.dietary_protocols || []) {
    if (/ketogenic/i.test(item.action)) b1Protocols.push(item);
  }
  assert.equal(b1Protocols.length, 0);
  assert.ok(lever);
});
