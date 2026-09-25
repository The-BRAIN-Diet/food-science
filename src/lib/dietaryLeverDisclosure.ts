/**
 * Client mirror of scripts/lib/dietary-lever-disclosure.mjs
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
};

export type DietaryLeverDisclosure = {
  title: string;
  inputType: string;
  biologicalRole: string;
  evidenceLimitation: string;
  evidenceReferences: EvidenceReference[];
  requirementClassification?: string | null;
  derivedTarget?: string | null;
  compactQualifier?: string;
  presentationSection?: string;
};

export type EvidenceReference = {
  number: number;
  label: string;
  href?: string;
};

type TraceRow = {
  atom_id?: string;
  input?: string;
  input_type?: string;
  biological_role?: string;
  evidence_source?: { citation_keys?: string[] };
  evidence_limitation?: string;
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

    const limitation = leverRow?.evidence_limitation || "";

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
    });
  }

  const pmTraceById = new Map(
    traceRows.filter((row) => row.atom_id).map((row) => [String(row.atom_id), row]),
  );
  const pmKcRelationships = (frontMatter.pm_kc_relationships || []) as Array<{
    constituent_relationships?: Array<{
      pm_atom_id?: string;
      label?: string;
    }>;
  }>;
  for (const relationship of pmKcRelationships) {
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
  }>;
  for (const presentation of kcPresentations) {
    const base = kcTraceById.get(String(presentation.atom_id || ""));
    if (!base?.input) continue;
    const label = String(presentation.label || base.input);
    map.set(dietaryLeverBulletKey(label, ""), {
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
