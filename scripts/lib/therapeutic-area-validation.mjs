import fs from "node:fs";
import path from "node:path";

const RELATIONS = new Set(["direct-condition", "extrapolated-population", "mechanistic-inference", "biomarker-association"]);
const DIRECTIONS = new Set(["supportive", "null", "contradictory", "mixed", "not-applicable"]);
const CONFIDENCE = new Set(["low", "low-medium", "medium", "medium-high", "high"]);
const CEILINGS = new Set(["mechanistic-plausibility", "biomarker-association", "target-engagement", "functional-association", "symptom-improvement", "adjunctive-intervention", "established-treatment"]);
const EXPOSURES = new Set(["dietary-pattern", "food-group", "food-matrix", "individual-food", "nutrient-bioactive", "supplement", "meal-timing-circadian", "physical-activity", "sleep", "stress-regulation", "non-intervention"]);

function duplicates(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function collectTextFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectTextFiles(target);
    return /\.(?:md|mdx)$/.test(entry.name) ? [target] : [];
  });
}

export function validateTherapeuticAreaData(root) {
  const errors = [];
  const evidence = JSON.parse(fs.readFileSync(path.join(root, "src/data/therapeutic-area-evidence.json"), "utf8"));
  const pages = JSON.parse(fs.readFileSync(path.join(root, "src/data/therapeutic-area-pages.json"), "utf8"));
  const registry = JSON.parse(fs.readFileSync(path.join(root, "src/data/phenome-registry.json"), "utf8"));
  const bib = fs.readFileSync(path.join(root, "static/bibtex/BRAIN-diet.bib"), "utf8");
  const docFiles = collectTextFiles(path.join(root, "docs"));
  const docsText = docFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

  function docPathExists(routePath) {
    if (!routePath?.startsWith("/docs/")) return false;
    const withoutHash = routePath.split("#")[0];
    const relative = withoutHash.replace(/^\/docs\//, "docs/").replace(/\/$/, "");
    const candidates = [`${relative}.md`, `${relative}.mdx`, path.join(relative, "index.md"), path.join(relative, "index.mdx")];
    return candidates.some((candidate) => fs.existsSync(path.join(root, candidate)));
  }

  const recordIds = evidence.evidenceRecords.map((record) => record.id);
  const claimIds = evidence.claims.map((claim) => claim.id);
  for (const id of duplicates(recordIds)) errors.push(`Duplicate evidence record ID: ${id}`);
  for (const id of duplicates(claimIds)) errors.push(`Duplicate evidence claim ID: ${id}`);
  for (const key of duplicates(evidence.evidenceRecords.map((record) => record.citationKey))) {
    errors.push(`Citation key has more than one canonical record: ${key}`);
  }

  const records = new Map(evidence.evidenceRecords.map((record) => [record.id, record]));
  const claims = new Map(evidence.claims.map((claim) => [claim.id, claim]));
  const taIds = new Set(registry.therapeuticAreas.map((ta) => ta.id));
  const phenomeIds = new Set(registry.phenomes.map((phenome) => phenome.id));

  for (const record of evidence.evidenceRecords) {
    if (!/^ER\d{6}$/.test(record.id)) errors.push(`Invalid evidence ID: ${record.id}`);
    if (!bib.includes(`{${record.citationKey},`)) errors.push(`Missing BibTeX key: ${record.citationKey}`);
    for (const extraKey of record.citationKeys || []) {
      if (extraKey !== record.citationKey && !bib.includes(`{${extraKey},`)) {
        errors.push(`Missing BibTeX key on ${record.id}: ${extraKey}`);
      }
    }
    if (!EXPOSURES.has(record.exposure?.level)) errors.push(`Invalid exposure level on ${record.id}`);
    if (!DIRECTIONS.has(record.resultDirection)) errors.push(`Invalid direction on ${record.id}`);
    for (const source of record.provenance || []) {
      const relative = source.split("#")[0];
      if (!fs.existsSync(path.join(root, relative))) errors.push(`Missing provenance source on ${record.id}: ${relative}`);
    }
  }

  for (const claim of evidence.claims) {
    if (!/^EC\d{6}$/.test(claim.id)) errors.push(`Invalid claim ID: ${claim.id}`);
    if (!records.has(claim.evidenceId)) errors.push(`Unknown evidence record on ${claim.id}`);
    if (!taIds.has(claim.taId)) errors.push(`Unknown TA on ${claim.id}: ${claim.taId}`);
    if (!/^BRS[1-6]$/.test(claim.brsId)) errors.push(`Invalid BRS on ${claim.id}: ${claim.brsId}`);
    if (!RELATIONS.has(claim.evidenceRelation)) errors.push(`Invalid evidence relation on ${claim.id}`);
    if (!DIRECTIONS.has(claim.resultDirection)) errors.push(`Invalid direction on ${claim.id}`);
    if (!CONFIDENCE.has(claim.confidence)) errors.push(`Invalid confidence on ${claim.id}`);
    if (!CEILINGS.has(claim.claimCeiling)) errors.push(`Invalid claim ceiling on ${claim.id}`);
    for (const pmId of claim.pmIds) {
      if (!docsText.includes(`pm_id: ${pmId}`)) errors.push(`Unresolved PM on ${claim.id}: ${pmId}`);
    }
    for (const phenomeId of claim.phenomeIds) {
      if (!phenomeIds.has(phenomeId)) errors.push(`Unresolved Phenome on ${claim.id}: ${phenomeId}`);
    }
    for (const source of claim.sourceOccurrences || []) {
      const relative = source.split("#")[0];
      if (!fs.existsSync(path.join(root, relative))) errors.push(`Missing claim source on ${claim.id}: ${relative}`);
    }
    if (claim.openEvidencePath && !docPathExists(claim.openEvidencePath)) {
      errors.push(`Unresolved open evidence path on ${claim.id}: ${claim.openEvidencePath}`);
    }
  }

  for (const page of pages.pages) {
    if (!taIds.has(page.taId)) errors.push(`Unknown page TA: ${page.taId}`);
    if (!page.brsSections.length) errors.push(`Page has no populated BRS sections: ${page.taId}`);
    for (const section of page.brsSections) {
      if (!section.claimIds.length) errors.push(`Empty BRS section: ${page.taId}/${section.brsId}`);
      for (const claimId of section.claimIds) {
        const claim = claims.get(claimId);
        if (!claim) errors.push(`Unknown page claim: ${page.taId}/${claimId}`);
        else if (claim.taId !== page.taId || claim.brsId !== section.brsId) {
          errors.push(`Claim routed to wrong TA/BRS: ${page.taId}/${section.brsId}/${claimId}`);
        }
      }
    }
    for (const phenomeId of page.featuredPhenomeIds) {
      const phenome = registry.phenomes.find((entry) => entry.id === phenomeId);
      if (!phenome) errors.push(`Unknown featured Phenome: ${page.taId}/${phenomeId}`);
      else if (!phenome.therapeuticAreaIds.includes(page.taId)) errors.push(`Phenome lacks TA mapping: ${page.taId}/${phenomeId}`);
    }
    for (const intervention of page.interventions) {
      if (!EXPOSURES.has(intervention.level)) errors.push(`Invalid page exposure: ${page.taId}/${intervention.level}`);
      if (!intervention.claimIds.length) errors.push(`Intervention has no evidence: ${page.taId}/${intervention.label}`);
    }
    const ta = registry.therapeuticAreas.find((entry) => entry.id === page.taId);
    const shell = path.join(root, `docs/therapeutic-areas/${ta.slug}.mdx`);
    if (!fs.existsSync(shell)) errors.push(`Missing generated page shell: ${ta.slug}`);
  }
  return errors;
}
