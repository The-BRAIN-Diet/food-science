import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";

const ROOT = process.cwd();
const BRS_ROOT = path.join(ROOT, "docs/biological-targets");
const DOPAMINE_PATH = path.join(
  BRS_ROOT,
  "brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx",
);

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, files);
    else files.push(absolute);
  }
  return files;
}

function corePmFiles() {
  return walk(BRS_ROOT).filter((file) => {
    const relative = path.relative(BRS_ROOT, file);
    return /^brs[1-6]\/fm\d+\/brs[1-6]-fm\d+-pm\d+-.*\.mdx$/.test(relative);
  });
}

test("core framework and BRS1 PM totals reflect the dopamine insertion", () => {
  const files = corePmFiles();
  assert.equal(files.length, 52, "core BRS1–BRS6 total must be 52 PMs");
  assert.equal(
    files.filter((file) => path.relative(BRS_ROOT, file).startsWith("brs1/")).length,
    11,
    "BRS1 must contain 11 PMs",
  );
});

test("BRS1 PM filenames and qualified identifiers remain aligned", () => {
  for (const file of corePmFiles().filter((candidate) =>
    path.relative(BRS_ROOT, candidate).startsWith("brs1/"),
  )) {
    const filename = path.basename(file);
    const match = filename.match(/^brs1-fm(\d+)-pm(\d+)-/);
    assert.ok(match, `unrecognised BRS1 PM filename: ${filename}`);
    const { data } = matter(fs.readFileSync(file, "utf8"));
    assert.equal(data.pm_id, `BRS1-FM${match[1]}-PM${match[2]}`, filename);
  }
});

test("FM1 publishes five PMs in canonical order", () => {
  const fmPath = path.join(BRS_ROOT, "brs1/fm1/brs1-fm1-monoaminergic-function.mdx");
  const { data } = matter(fs.readFileSync(fmPath, "utf8"));
  assert.deepEqual(
    data.mechanisms_covered.map((item) => item.id),
    [
      "BRS1-FM1-PM1",
      "BRS1-FM1-PM2",
      "BRS1-FM1-PM3",
      "BRS1-FM1-PM4",
      "BRS1-FM1-PM5",
    ],
  );
});

test("there is one canonical Stage 2A dopamine PM with bounded evidence", () => {
  const dopamineFiles = corePmFiles().filter((file) => {
    const { data } = matter(fs.readFileSync(file, "utf8"));
    return data.pm_id === "BRS1-FM1-PM3" || /Dopaminergic Signalling Regulation/.test(data.title);
  });
  assert.deepEqual(dopamineFiles, [DOPAMINE_PATH]);

  const { data, content } = matter(fs.readFileSync(DOPAMINE_PATH, "utf8"));
  assert.equal(data.evidence_status, "stage-2a-scientific-evidence");
  assert.equal(data.mechanistic_authoring_required, false);
  assert.equal(data.dietary_addressability, "not-established");
  assert.equal(data.claim_ceiling, "biological-dependency");
  assert.equal(data.scientific_findings.length, 7);
  assert.deepEqual(
    data.scientific_findings.map((finding) => finding.id),
    ["PM3-F1", "PM3-F2", "PM3-F3", "PM3-F4", "PM3-F5", "PM3-F6", "PM3-F7"],
  );
  assert.ok(data.phenome_relationships.length >= 3);
  assert.ok(data.references.length >= 11);
  assert.deepEqual(
    data.dietary_input_traceability.map((atom) => atom.atom_id),
    ["PM3-DIT-1", "PM3-DIT-2", "PM3-DIT-3"],
  );
  assert.ok(
    data.dietary_lever_atoms.every((atom) =>
      /Candidate for Dietary Levers review/.test(atom.permitted_wording),
    ),
  );
  assert.deepEqual(
    data.scientific_findings
      .filter((finding) => finding.therapeutic_area_ids?.includes("TA001"))
      .map((finding) => finding.id),
    ["PM3-F6", "PM3-F7"],
  );
  assert.ok(data.candidate_cross_brs_relationships.length === 4);
  assert.ok(
    data.candidate_cross_brs_relationships.every(
      (relationship) => relationship.status === "constrained-dependency",
    ),
  );
  assert.match(content, /### 4\.1 Scientific Findings/);
  assert.match(content, /No scoreable inputs are activated in Stage 2A/);
  assert.match(content, /ADHD does not show one uniform dopamine abnormality/);
  assert.doesNotMatch(content, /uniform dopamine-deficiency disorder/i);
});

test("renumbered public routes retain aliases from their former canonical routes", () => {
  const config = fs.readFileSync(path.join(ROOT, "docusaurus.config.ts"), "utf8");
  const redirects = [
    [
      "brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation",
      "brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation",
    ],
    [
      "brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation",
      "brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation",
    ],
    [
      "brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support",
      "brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support",
    ],
    [
      "brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation",
      "brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation",
    ],
    [
      "brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance",
      "brs1/fm4/brs1-fm4-pm8-gaba-glutamate-neurotransmission-balance",
    ],
    [
      "brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity",
      "brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity",
    ],
    [
      "brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling",
      "brs1/fm4/brs1-fm4-pm10-glutamate-clearance-and-recycling",
    ],
    [
      "brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation",
      "brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation",
    ],
  ];

  for (const [from, to] of redirects) {
    const pair = `{ to: '/docs/biological-targets/${to}', from: '/docs/biological-targets/${from}' }`;
    assert.ok(config.includes(pair), `missing redirect: ${from} → ${to}`);
  }
});
