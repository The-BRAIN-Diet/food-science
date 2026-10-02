/**
 * Client mirror of scripts/lib/dietary-lever-disclosure.mjs
 *
 * Disclosures attach only to admitted Dietary Requirement / SOP / lifestyle
 * atoms and explicitly presented PM-owned KC relationships.
 * Unresolved assessments never become established mappings; rejected
 * candidates and Stage 2B history are not rendered here.
 */

const REF_LINE_RE = /\[([^\]]+)\]\([^#]+#([^)]+)\)/;

const INPUT_TYPE_LABEL: Record<string, string> = {
  substrate: "Substrate",
  "substrate provision": "Substrate provision",
  "nutrient/substance": "Nutrient / precursor",
  cofactor: "Cofactor",
  "catalytic ion": "Catalytic ion",
  "cofactor precursor": "Cofactor precursor",
  precursor: "Precursor",
  "resource dependency": "Resource dependency",
  "biochemical requirement": "Biochemical requirement",
  "nutrient/compound class": "Nutrient / compound class",
  "dietary pattern": "Dietary pattern",
  "dietary matrix": "Dietary matrix",
};

export type SupportingFindingLink = {
  id: string;
  label: string;
  href: string;
};

export type DietaryLeverDisclosure = {
  title: string;
  titleHref?: string;
  originTag?: { text: string; href: string };
  inputType: string;
  biologicalRole: string;
  evidenceLimitation: string;
  evidenceReferences: EvidenceReference[];
  requirementClassification?: string | null;
  derivedTarget?: string | null;
  compactQualifier?: string;
  presentationSection?: string;
  readerDescription?: string;
  supportingFinding?: SupportingFindingLink | null;
  upstreamIndicators?: UpstreamPmIndicator[];
};

export type UpstreamPmIndicator = {
  text: string;
  href: string;
};

export type EvidenceReference = {
  number: number;
  label: string;
  authorYear: string;
  href?: string;
};

type TraceRow = {
  atom_id?: string;
  input?: string;
  input_type?: string;
  biological_role?: string;
  evidence_source?: { citation_keys?: string[] };
  evidence_limitation?: string;
  upstream_pm_relationships?: Array<{
    relationship_label?: string;
    pm_short_id?: string;
    pm_id?: string;
    href?: string;
  }>;
};

type LeverRow = {
  atom_id?: string;
  dietary_addressability?: string;
  evidence_limitation?: string;
  permitted_wording?: string;
  requirement_classification?: string;
  derived_target?: string;
  relationship_layer?: string;
};

type PresentationRow = {
  atom_id?: string;
  label?: string;
  foods?: string;
  presentation_section?: string;
  reader_description?: string;
  description_finding_id?: string;
};

type NonDietaryLeverRow = TraceRow & {
  presentation_label?: string;
};

function buildPmReferenceKeyIndex(references: string[] = []): Map<string, EvidenceReference> {
  const index = new Map<string, EvidenceReference>();
  for (const line of references) {
    const match = String(line || "").match(REF_LINE_RE);
    const key = match ? String(match[2]).trim() : null;
    if (!key || index.has(key)) continue;
    index.set(key, {
      number: index.size + 1,
      label: String(match?.[1] || "").trim(),
      authorYear: String(match?.[1] || "")
        .split(/\s+[—–-]\s+/)[0]
        .trim()
        .replace(/\s+&\s+/g, " and "),
    });
  }
  return index;
}

function normalizeFoods(foods: string): string {
  return String(foods || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .join(", ");
}

export function dietaryLeverBulletKey(
  label: string,
  foods: string,
  presentationSection = "",
): string {
  const base = `${String(label || "").trim().toLowerCase()}\0${normalizeFoods(foods)}`;
  const section = String(presentationSection || "").trim();
  return section ? `${base}\0${section}` : base;
}

function formatInputTypeLabel(inputType: string): string {
  const key = String(inputType || "").trim();
  return INPUT_TYPE_LABEL[key] || key.replace(/\//g, " / ");
}

const COMPACT_INPUT_TYPE_LABEL: Record<string, string> = {
  ...INPUT_TYPE_LABEL,
  "substrate provision": "Substrate Provision",
  "cofactor precursor": "Cofactor Precursor",
};

export function formatRequirementCompactQualifier(atom: {
  requirement_classification?: string | null;
  input_type?: string | null;
  derived_target?: string | null;
}): string {
  const classification = String(atom?.requirement_classification || "").trim();
  if (classification !== "direct" && classification !== "derived") return "";
  const cls = classification === "derived" ? "Derived" : "Direct";
  const rawType = String(atom?.input_type || "").trim();
  const type = COMPACT_INPUT_TYPE_LABEL[rawType] || rawType.replace(/\//g, " / ");
  if (classification === "derived" && atom?.derived_target) {
    return `${cls} · ${type} → ${atom.derived_target}`;
  }
  return type ? `${cls} · ${type}` : cls;
}

export function formatUpstreamIndicatorText(row: {
  relationship_label?: string;
  pm_short_id?: string;
}): string {
  const label = String(row?.relationship_label || "").trim();
  const shortId = String(row?.pm_short_id || "").trim();
  if (!label || !shortId) return "";
  return `${label}: ${shortId}`;
}

export function formatPresentationCompactQualifier(
  atom: {
    requirement_classification?: string | null;
    input_type?: string | null;
    derived_target?: string | null;
  },
  presentationSection: string,
): string {
  const section = String(presentationSection || "").trim();
  if (section === "3.1.1") return formatRequirementCompactQualifier(atom);
  if (section === "3.1.2") {
    const rawType = String(atom?.input_type || "").trim();
    return COMPACT_INPUT_TYPE_LABEL[rawType] || rawType.replace(/\//g, " / ");
  }
  return "";
}

function supportingFindingLink(
  frontMatter: Record<string, unknown>,
  findingId?: string,
): SupportingFindingLink | null {
  const id = String(findingId || "").trim();
  if (!id) return null;
  const findings = (frontMatter.scientific_findings || []) as Array<{
    id?: string;
    finding_label?: string;
  }>;
  const finding = findings.find((row) => String(row?.id || "") === id);
  const label = String(finding?.finding_label || "").trim();
  if (!label) return null;
  return { id, label, href: `#${id.toLowerCase()}` };
}

function evidenceSourceReferences(
  references: string[],
  citationKeys: string[] = [],
  { directHref = false } = {},
): EvidenceReference[] {
  const index = buildPmReferenceKeyIndex(references);
  const resolved = citationKeys
    .map((k) => index.get(String(k)))
    .filter((ref): ref is EvidenceReference => Boolean(ref));
  const unique = [...new Map(resolved.map((ref) => [ref.number, ref])).values()].sort(
    (a, b) => a.number - b.number,
  );
  if (!directHref) return unique;
  return unique.map((ref) => ({
    ...ref,
    href: String(references[ref.number - 1] || "").match(/\]\(([^)]+)\)/)?.[1],
  }));
}

export function buildDietaryLeverDisclosureMap(
  frontMatter: Record<string, unknown>,
): Map<string, DietaryLeverDisclosure> {
  const map = new Map<string, DietaryLeverDisclosure>();
  const traceRows = (frontMatter.dietary_input_traceability || []) as TraceRow[];
  const leverRows = (frontMatter.dietary_lever_atoms || []) as LeverRow[];
  const presentations = (frontMatter.dietary_lever_presentations || []) as PresentationRow[];
  const references = (frontMatter.references || []) as string[];

  const traceById = new Map(
    traceRows.filter((r) => r.atom_id).map((r) => [String(r.atom_id), r]),
  );

  for (const pres of presentations) {
    const atomId = String(pres.atom_id || "");
    const base = traceById.get(atomId);
    const leverRow = leverRows.find((r) => String(r.atom_id) === atomId);
    if (!base?.input) continue;

    const limitation = base.evidence_limitation || leverRow?.evidence_limitation || "";

    const key = dietaryLeverBulletKey(
      String(pres.label || base.input),
      String(pres.foods || ""),
      String(pres.presentation_section || ""),
    );
    map.set(key, {
      title: String(base.input),
      inputType: formatInputTypeLabel(String(base.input_type || "")),
      biologicalRole: String(base.biological_role || ""),
      evidenceLimitation: String(limitation).trim(),
      evidenceReferences: evidenceSourceReferences(
        references,
        base.evidence_source?.citation_keys || [],
      ),
      requirementClassification: leverRow?.requirement_classification || null,
      derivedTarget: leverRow?.derived_target || null,
      compactQualifier: formatPresentationCompactQualifier(
        {
          requirement_classification: leverRow?.requirement_classification,
          input_type: base.input_type,
          derived_target: leverRow?.derived_target,
        },
        String(pres.presentation_section || ""),
      ),
      presentationSection: String(pres.presentation_section || "").trim(),
      readerDescription: String(pres.reader_description || "").trim(),
      supportingFinding: supportingFindingLink(frontMatter, pres.description_finding_id),
      upstreamIndicators: (base.upstream_pm_relationships || [])
        .map((row) => ({
          text: formatUpstreamIndicatorText(row),
          href: String(row?.href || "").trim(),
        }))
        .filter((row) => row.text && row.href.startsWith("/docs/")),
    });
  }

  for (const [field, section] of [
    ["system_optimisation_practices", "3.2"],
    ["lifestyle_priorities", "3.3"],
  ] as const) {
    const rows = (frontMatter[field] || []) as NonDietaryLeverRow[];
    for (const row of rows) {
      const label = String(row.presentation_label || row.input || "").trim();
      if (!label) continue;
      map.set(dietaryLeverBulletKey(label, "", section), {
        title: String(row.input || ""),
        inputType: formatInputTypeLabel(String(row.input_type || "")),
        biologicalRole: String(row.biological_role || ""),
        evidenceLimitation: String(row.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(
          references,
          row.evidence_source?.citation_keys || [],
        ),
        compactQualifier: "",
        presentationSection: section,
      });
    }
  }

  type PmKcDisclosureRow = {
    kc_id?: string; ikc_id?: string; disposition?: string;
    input?: string; input_type?: string; pm_biological_role?: string;
    evidence_source?: { citation_keys?: string[] };
    evidence_limitation?: string; presentation_label?: string;
    presentation_section?: string; applicability_label?: string; kc_href?: string;
    reader_description?: string; description_finding_id?: string;
  };
  const assessments = (frontMatter.kc_applicability_adjudications || []) as PmKcDisclosureRow[];
  const relationshipRows = (frontMatter.pm_kc_relationships || []) as PmKcDisclosureRow[];
  const establishedRows = relationshipRows.filter((row) => assessments.some((assessment) =>
    assessment.disposition === "established" && assessment.kc_id === row.kc_id &&
    (assessment.ikc_id || assessment.kc_id) === (row.ikc_id || row.kc_id),
  ));
  for (const row of establishedRows) {
    if (!row.presentation_label || !row.input || !row.input_type || !row.pm_biological_role) continue;
    const section = "3.1.3";
    map.set(dietaryLeverBulletKey(row.presentation_label, "", section), {
      title: row.input,
      inputType: formatInputTypeLabel(row.input_type),
      biologicalRole: row.pm_biological_role,
      evidenceLimitation: String(row.evidence_limitation || ""),
      evidenceReferences: evidenceSourceReferences(references, row.evidence_source?.citation_keys || []),
      compactQualifier: row.applicability_label || "Established applicability",
      presentationSection: section,
      readerDescription: String(row.reader_description || ""),
      supportingFinding: supportingFindingLink(frontMatter, row.description_finding_id),
      titleHref: row.kc_href,
    });
  }

  const pmTraceById = new Map(
    traceRows.filter((row) => row.atom_id).map((row) => [String(row.atom_id), row]),
  );
  const pmKcRelationships = (frontMatter.pm_kc_relationships || []) as Array<{
    origin_label?: string;
    kc_href?: string;
    constituent_relationships?: Array<{
      pm_atom_id?: string;
      label?: string;
      reader_description?: string;
      description_finding_id?: string;
    }>;
  }>;
  for (const relationship of pmKcRelationships) {
    if (assessments.length && !assessments.some((assessment) =>
      assessment.disposition === "established" && assessment.kc_id === (relationship as PmKcDisclosureRow).kc_id &&
      (assessment.ikc_id || assessment.kc_id) === ((relationship as PmKcDisclosureRow).ikc_id || (relationship as PmKcDisclosureRow).kc_id),
    )) continue;
    for (const constituent of relationship.constituent_relationships || []) {
      const base = pmTraceById.get(String(constituent.pm_atom_id || ""));
      if (!base?.input) continue;
      const label = String(constituent.label || base.input);
      map.set(dietaryLeverBulletKey(label, "", "3.1.3"), {
        title: String(base.input),
        inputType: formatInputTypeLabel(String(base.input_type || "")),
        biologicalRole: String(base.biological_role || ""),
        evidenceLimitation: String(base.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(
          references,
          base.evidence_source?.citation_keys || [],
        ),
        compactQualifier: "",
        presentationSection: "3.1.3",
        readerDescription: String(constituent.reader_description || ""),
        supportingFinding: supportingFindingLink(frontMatter, constituent.description_finding_id),
        originTag: relationship.origin_label && relationship.kc_href
          ? { text: relationship.origin_label, href: relationship.kc_href }
          : undefined,
      });
    }
  }

  const kcRows = (frontMatter.kc_input_traceability || []) as TraceRow[];
  const kcTraceById = new Map(
    kcRows.filter((row) => row.atom_id).map((row) => [String(row.atom_id), row]),
  );
  const kcPresentations = (frontMatter.kc_constituent_presentations || []) as Array<{
    atom_id?: string;
    label?: string;
    evidence_label?: string;
  }>;
  for (const presentation of kcPresentations) {
    const base = kcTraceById.get(String(presentation.atom_id || ""));
    if (!base?.input) continue;
    const label = String(presentation.label || base.input);
    const disclosure: DietaryLeverDisclosure = {
      title: String(base.input),
      inputType: formatInputTypeLabel(String(base.input_type || "")),
      biologicalRole: String(base.biological_role || ""),
      evidenceLimitation: String(base.evidence_limitation || "").trim(),
      evidenceReferences: evidenceSourceReferences(
        references,
        base.evidence_source?.citation_keys || [],
        { directHref: true },
      ),
      compactQualifier: "",
      presentationSection: "kc-constituent",
    };
    map.set(dietaryLeverBulletKey(label, ""), disclosure);
    const evidenceLabel = String(presentation.evidence_label || "").trim();
    if (evidenceLabel) {
      map.set(dietaryLeverBulletKey(evidenceLabel, ""), disclosure);
    }
  }

  const kcSupportRows = (frontMatter.kc_emerging_support_traceability || []) as TraceRow[];
  const kcSupportById = new Map(
    kcSupportRows.filter((row) => row.atom_id).map((row) => [String(row.atom_id), row]),
  );
  const kcSupportPresentations = (frontMatter.kc_emerging_support_presentations || []) as Array<{
    atom_id?: string;
    support_slug?: string;
    label?: string;
  }>;
  for (const presentation of kcSupportPresentations) {
    const base = kcSupportById.get(String(presentation.atom_id || ""));
    const slug = String(presentation.support_slug || "").trim();
    if (!base?.input || !slug) continue;
    const label = String(presentation.label || base.input);
    map.set(dietaryLeverBulletKey(label, "", `kc-emerging-support:${slug}`), {
      title: String(base.input),
      inputType: formatInputTypeLabel(String(base.input_type || "")),
      biologicalRole: String(base.biological_role || ""),
      evidenceLimitation: String(base.evidence_limitation || "").trim(),
      evidenceReferences: evidenceSourceReferences(
        references,
        base.evidence_source?.citation_keys || [],
        { directHref: true },
      ),
      compactQualifier: "",
      presentationSection: `kc-emerging-support:${slug}`,
    });
  }

  return map;
}

export function parseLeverBullet(text: string): { label: string; foods: string } | null {
  const value = String(text || "").trim();
  if (!value) return null;
  const m = value.match(/^(.+?)\s+←\s+(.+)$/);
  if (m) return { label: m[1].trim(), foods: m[2].trim() };
  return { label: value, foods: "" };
}

export function pmReferenceHref(n: number): string {
  return `#pm-ref-${n}`;
}
