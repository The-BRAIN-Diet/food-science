import evidenceJson from "./therapeutic-area-evidence.json";
import pagesJson from "./therapeutic-area-pages.json";
import {phenomeRegistry} from "./phenomeRelationships";

export type EvidenceRelation =
  | "direct-condition"
  | "extrapolated-population"
  | "mechanistic-inference"
  | "biomarker-association";

export type EvidenceRecord = {
  id: string;
  citationKey: string;
  citationKeys?: string[];
  citationLabel: string;
  population: string;
  lifeStage: string;
  exposure: {level: string; label: string};
  studyDesign: string;
  measuredOutcomes: string[];
  targetEngagement: string;
  functionalClinicalOutcome: string;
  resultDirection: string;
  limitations: string[];
  provenance: string[];
};

export type EvidenceClaim = {
  id: string;
  evidenceId: string;
  taId: string;
  brsId: string;
  fmIds: string[];
  pmIds: string[];
  phenomeIds: string[];
  evidenceRelation: EvidenceRelation;
  demonstration: string;
  currentClaim: string;
  claimCeiling: string;
  confidence: string;
  resultDirection: string;
  sourceOccurrences: string[];
  displayTitle?: string;
  displaySummary?: string;
  limitationNote?: string;
  studyDesignLabel?: string;
  openEvidencePath?: string;
};

export type BrsSection = {
  brsId: string;
  title: string;
  relevance: string;
  claimIds: string[];
  addressability: string;
  limitations: string;
};

export type TherapeuticAreaCascade = {
  title: string;
  steps: string[];
};

export type TherapeuticAreaPage = {
  taId: string;
  status: string;
  overview: string;
  purpose: string;
  featuredPhenomeIds: string[];
  brsSections: BrsSection[];
  cascades: Array<{title: string; steps: string[]}>;
  interventions: Array<{level: string; label: string; claimIds: string[]; boundary: string}>;
  majorGaps: string[];
  researchPriorities: string[];
};

const evidence = evidenceJson as {
  evidenceRecords: EvidenceRecord[];
  claims: EvidenceClaim[];
};
const pages = pagesJson as {pages: TherapeuticAreaPage[]};

export const evidenceRecords = evidence.evidenceRecords;
export const evidenceClaims = evidence.claims;
export const therapeuticAreaPages = pages.pages;

export function getTherapeuticAreaPage(taId: string): TherapeuticAreaPage | undefined {
  return therapeuticAreaPages.find((page) => page.taId === taId.toUpperCase());
}

export function getEvidenceRecord(id: string): EvidenceRecord | undefined {
  return evidenceRecords.find((record) => record.id === id);
}

export function getEvidenceClaim(id: string): EvidenceClaim | undefined {
  return evidenceClaims.find((claim) => claim.id === id);
}

export function getClaimsForPm(pmId: string): EvidenceClaim[] {
  return evidenceClaims.filter((claim) => claim.pmIds.includes(pmId));
}

export function getTaPath(taId: string): string {
  const ta = phenomeRegistry.therapeuticAreas.find((entry) => entry.id === taId);
  return `/docs/therapeutic-areas/${ta?.slug || taId.toLowerCase()}`;
}

export function sourceToDocPath(source: string): string | null {
  const [file, fragment] = source.split("#", 2);
  if (!file.startsWith("docs/")) return null;
  const stem = file.replace(/^docs\//, "").replace(/\.(?:md|mdx)$/, "");
  return `/docs/${stem}${fragment ? `#${fragment}` : ""}`;
}
