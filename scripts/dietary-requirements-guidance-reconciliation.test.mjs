import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const primary = fs.readFileSync("system/primary-mechanism-schema.md", "utf8");
const contract = fs.readFileSync("system/dietary-input-traceability-contract.md", "utf8");
const findings = fs.readFileSync("system/scientific-finding-schema.md", "utf8");
const hub = fs.readFileSync("system/brs-hub-levers-schema.md", "utf8");

test("guidance preserves the canonical six-atom dietary structure", () => {
  for (const text of [primary, contract, findings, hub]) {
    assert.match(text, /Input \| Input (?:T|t)ype \| Biological (?:R|r)ole \| Evidence (?:S|s)ource \| Limitation \| Dietary input|Input \/ Type \/ Role \/ Evidence Source \/ Limitation \/ Dietary input/);
  }
  assert.match(contract, /dietary_input: true`, `false`, or `null`/);
  assert.match(primary, /Direct\/Derived classification does not replace Input Type/);
});

test("B and D are adjudication propositions, not extra atoms", () => {
  assert.match(contract, /Capacity Dietary Requirement = B AND D/);
  assert.match(contract, /B and D are\s+adjudication propositions supported by the existing evidence records, not\s+additional evidence atoms/);
  assert.match(primary, /B and D are adjudication propositions supported by the existing evidence records,\s+not additional disclosure atoms or a parallel schema/);
  assert.match(findings, /they are not new Scientific Finding\s+fields, disclosure atoms or a parallel schema/);
});

test("capacity admission separates biochemical dependency from dietary supply", () => {
  assert.match(contract, /A substance's participation in a reaction cannot, by itself, establish a\s+Dietary Requirement/);
  assert.match(contract, /The presence of a substance in food cannot, by itself, establish a\s+PM-specific Dietary Requirement/);
  assert.match(contract, /does not require evidence that increasing intake beyond\s+adequacy improves biochemical function or clinical outcomes/);
  assert.match(contract, /absence of evidence for dietary supply/);
});

test("single-primary-entry presentation rule replaces same-input reprint logic", () => {
  assert.match(contract, /Allocate one primary explanatory entry per\s+substance or supply relationship/);
  assert.match(contract, /Do not create a second primary entry merely\s+because a dietary substance also participates in a biochemical reaction/);
  assert.match(contract, /A\s+changed biological-role sentence does not by itself prove a distinct reader-facing\s+relationship/);
  assert.match(primary, /It is not a second reader-facing inventory of every participant already\s+described under Dietary Requirements/);
});

test("worked examples cover the four approved demonstrations", () => {
  assert.match(contract, /SAMe synthesis: methionine \/ ATP \/ catalytic ions/);
  assert.match(contract, /Do not add another methionine entry in §3\.1\.2/);
  assert.match(contract, /GABA synthesis: vitamin B6 → PLP, and glutamate/);
  assert.match(contract, /Do not create a second\s+primary PLP explanation/);
  assert.match(contract, /Dopaminergic signalling/);
  assert.match(contract, /Do not duplicate tyrosine, iron or PLP explanations/);
  assert.match(contract, /NAD⁺ metabolism/);
  assert.match(contract, /Do not reprint the dietary precursor entries/);
});

test("SOP dietary involvement stays separate from Dietary Requirements", () => {
  assert.match(primary, /SOP evidence uses the same\s+six-atom contract/);
  assert.match(contract, /No lifestyle\/SOP\s+record may be migrated into §3\.1\.1 or §3\.1\.2 merely because its Dietary input\s+value is Yes/);
  assert.match(hub, /does not move SOPs into Dietary Requirements/);
  assert.match(hub, /does not create nutritional\s+necessity or therapeutic efficacy claims/);
});

test("roll-up guidance distinguishes eligibility from recommendation or necessity", () => {
  assert.match(contract, /A Yes value establishes dietary\s+eligibility only/);
  assert.match(contract, /it does not establish nutritional necessity, therapeutic\s+efficacy, quantitative contribution or a food recommendation/);
  assert.match(contract, /Unset records are review flags, not silent Yes or No/);
});

test("KC, SOP, regulatory-state and canonical provenance boundaries are preserved", () => {
  assert.match(contract, /Regulatory-state relationships remain a separate, evidence-governed admission\s+pathway/);
  assert.match(contract, /SOPs remain separate from nutritional capacity/);
  assert.match(contract, /underlying evidence records remain intact/);
  assert.match(primary, /presentation allocation rule, not deletion of underlying biochemical evidence,\s+provenance or canonical identities/);
});
