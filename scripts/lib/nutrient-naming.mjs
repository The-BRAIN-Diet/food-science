/**
 * Preferred vitamin labels for structured PM and KC fields.
 * @see system/nutrient-naming-conventions.md
 */

export const PLP_LABEL = "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)";

const PREFERRED_BY_ALIAS = new Map([
  ["b9 - folate (b9)", "Vitamin B9 (folate)"],
  ["b2 - riboflavin (b2)", "Vitamin B2 (riboflavin)"],
  ["b3 - nicotinamide (b3)", "Nicotinamide (a form of vitamin B3)"],
  ["b3 - nicotinic acid (b3)", "Nicotinic acid (a form of vitamin B3)"],
  ["nicotinamide", "Nicotinamide (a form of vitamin B3)"],
  ["nicotinic acid", "Nicotinic acid (a form of vitamin B3)"],
  ["niacin", "Vitamin B3 (niacin)"],
  ["riboflavin", "Vitamin B2 (riboflavin)"],
  ["riboflavin (b2)", "Vitamin B2 (riboflavin)"],
  ["thiamine", "Vitamin B1 (thiamine)"],
  ["pantothenic acid", "Vitamin B5 (pantothenic acid)"],
  ["biotin", "Vitamin B7 (biotin)"],
  ["folate", "Vitamin B9 (folate)"],
  ["folic acid", "Folic acid (a form of vitamin B9)"],
  ["5-methyltetrahydrofolate", "5-Methyltetrahydrofolate (a form of vitamin B9)"],
  ["5-mthf", "5-Methyltetrahydrofolate (a form of vitamin B9)"],
  ["cobalamin", "Vitamin B12 (cobalamin)"],
  ["vitamin b12", "Vitamin B12 (cobalamin)"],
  ["b1", "Vitamin B1 (thiamine)"],
  ["b2", "Vitamin B2 (riboflavin)"],
  ["b3", "Vitamin B3 (niacin)"],
  ["b5", "Vitamin B5 (pantothenic acid)"],
  ["b6", "Vitamin B6"],
  ["b7", "Vitamin B7 (biotin)"],
  ["b9", "Vitamin B9 (folate)"],
  ["b12", "Vitamin B12 (cobalamin)"],
  ["pyridoxal-5′-phosphate (plp)", PLP_LABEL],
  ["pyridoxal-5'-phosphate (plp)", PLP_LABEL],
  ["pyridoxal-5-phosphate (plp)", PLP_LABEL],
  ["pyridoxal 5'-phosphate", PLP_LABEL],
  ["pyridoxal 5′-phosphate", PLP_LABEL],
  ["pyridoxal-5′-phosphate", PLP_LABEL],
  ["pyridoxal-5'-phosphate", PLP_LABEL],
  ["pyridoxal-5-phosphate", PLP_LABEL],
]);

const SUPERSEDED_B_NUMBER = /^B\d+\s+-\s+.+\(B\d+\)$/;

function aliasKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** Preferred replacement when the whole label is a known non-preferred alias. */
export function preferredVitaminLabelFor(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  const preferred = PREFERRED_BY_ALIAS.get(aliasKey(text));
  if (preferred && preferred !== text) return preferred;
  if (SUPERSEDED_B_NUMBER.test(text)) return preferred || "";
  return null;
}

function namingIssue(value, where, entityLabel) {
  const preferred = preferredVitaminLabelFor(value);
  if (preferred == null) return null;
  const text = String(value).trim();
  const hint = preferred
    ? `use "${preferred}"`
    : "use the preferred label in system/nutrient-naming-conventions.md";
  return {
    code: "nutrient_naming_nonpreferred_label",
    message: `${entityLabel}: ${where} "${text}" — ${hint}`,
  };
}

function check(issues, value, where, entityLabel) {
  const issue = namingIssue(value, where, entityLabel);
  if (issue) issues.push(issue);
}

/**
 * Structured input, presentation, derived-target and cofactor labels, plus
 * public bullets that are only that label. Protocol names and prose stay out.
 */
export function validateStructuredVitaminLabels(data, issues, { entityLabel, content = "" } = {}) {
  for (const [i, row] of (data?.dietary_input_traceability || []).entries()) {
    check(issues, row?.input, `dietary_input_traceability[${i}].input`, entityLabel);
  }
  for (const [i, row] of (data?.dietary_lever_presentations || []).entries()) {
    check(issues, row?.label, `dietary_lever_presentations[${i}].label`, entityLabel);
  }
  for (const [i, row] of (data?.dietary_lever_atoms || []).entries()) {
    check(issues, row?.derived_target, `dietary_lever_atoms[${i}].derived_target`, entityLabel);
  }
  for (const [i, name] of (data?.cofactors || []).entries()) {
    check(issues, name?.name || name, `cofactors[${i}]`, entityLabel);
  }
  for (const [i, row] of (data?.kc_input_traceability || []).entries()) {
    check(issues, row?.input, `kc_input_traceability[${i}].input`, entityLabel);
  }
  for (const [i, row] of (data?.kc_constituent_presentations || []).entries()) {
    check(issues, row?.label, `kc_constituent_presentations[${i}].label`, entityLabel);
  }
  for (const [i, row] of (data?.kc_emerging_support_traceability || []).entries()) {
    check(issues, row?.input, `kc_emerging_support_traceability[${i}].input`, entityLabel);
  }

  const lines = String(content || "").split("\n");
  for (const line of lines) {
    const bullet = line.match(/^\s*-\s+(.+?)\s*$/);
    if (!bullet) continue;
    check(issues, bullet[1], "public bullet", entityLabel);
  }
}
