#!/usr/bin/env node
/**
 * One-time PM8 Finding id + scope correction (PM8-Fn, demote concentration constraint).
 * @see system/scientific-finding-schema.md § Finding identity and PM scope triangulation
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const PM8 = path.join(
  root,
  "docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx",
);

const ID_MAP = {
  "SF-PM8-1": "PM8-F1",
  "SF-PM8-2": "PM8-F2",
  "SF-PM8-4": "PM8-IC1",
  "SF-PM8-5": "PM8-F3",
  "SF-PM8-6": "PM8-F4",
  "SF-PM8-7": "PM8-F5",
  "SF-PM8-8": "PM8-F6",
  "SF-PM8-9": "PM8-F7",
};

function remapId(value) {
  if (typeof value !== "string") return value;
  let out = value;
  for (const [from, to] of Object.entries(ID_MAP)) {
    out = out.split(from).join(to);
  }
  return out;
}

function remapFinding(finding) {
  const oldId = finding.id;
  const id = ID_MAP[oldId];
  if (!id) throw new Error(`Unexpected finding id ${oldId}`);
  const next = { ...finding, id };
  if (oldId === "SF-PM8-4") {
    next.presentation = "interpretive-constraint";
    next.fm_rollup = true;
  }
  if (typeof next.finding_discriminator === "string") {
    next.finding_discriminator = remapId(next.finding_discriminator);
  }
  return next;
}

function remapData(data) {
  const order = ["SF-PM8-1", "SF-PM8-2", "SF-PM8-4", "SF-PM8-5", "SF-PM8-6", "SF-PM8-7", "SF-PM8-8", "SF-PM8-9"];
  const byId = new Map(data.scientific_findings.map((f) => [f.id, f]));
  data.scientific_findings = order.map((oldId) => remapFinding(byId.get(oldId)));

  for (const rel of data.phenome_relationships || []) {
    rel.scientific_findings = (rel.scientific_findings || []).map((id) => ID_MAP[id] || id);
  }

  for (const row of data.dietary_input_traceability || []) {
    if (row.evidence_source?.finding_ids) {
      row.evidence_source.finding_ids = row.evidence_source.finding_ids.map(
        (id) => ID_MAP[id] || id,
      );
    }
  }

  data.scientific_findings_intro =
    "GABA is produced from glutamate by glutamate decarboxylase (GAD), an enzyme that requires pyridoxal-5′-phosphate (PLP), the active coenzyme form of vitamin B6. The evidence therefore identifies glutamate substrate availability and PLP-dependent GAD activity as requirements for GABA synthesis capacity. Vitamin B6 contributes through its conversion to PLP, although PLP supports many biological processes and this requirement does not establish that increasing vitamin B6 intake increases GABA production.";

  return data;
}

function remapBody(content) {
  let out = content;
  for (const [from, to] of Object.entries(ID_MAP)) {
    out = out.split(from).join(to);
    out = out.split(`#${from.toLowerCase()}`).join(`#${to.toLowerCase()}`);
  }
  return out;
}

const { data, content } = matter(fs.readFileSync(PM8, "utf8"));
const newData = remapData(data);
const newBody = remapBody(content);
fs.writeFileSync(PM8, matter.stringify(newBody, newData, { lineWidth: 9999 }), "utf8");
console.log("PM8 finding scope migration applied.");
