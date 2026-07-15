/**
 * PM §6.2 / §6.3 relationship section titles and intros.
 * @see system/primary-mechanism-schema.md
 */

export const PM_SECTION_6_2_TITLE = "Cross-BRS Mechanism Relationships";

export const PM_SECTION_6_2_INTRO =
  "Primary Mechanisms in other Biological Regulatory Systems that directly interact with, constrain or support this mechanism.";

export const PM_SECTION_6_3_TITLE = "Local BRS Mechanism Relationships";

export const PM_SECTION_6_3_INTRO =
  "Related Primary Mechanisms within the same Biological Regulatory System that collectively support the integrated biological function.";

/** @deprecated */
export const PM_SECTION_6_2_TITLE_LEGACY = "Connected BRS Mechanisms";

/** @deprecated */
export const PM_SECTION_6_3_TITLE_LEGACY = "Connected Primary Mechanisms";

export const PM_SECTION_6_2_HEADING = `### 6.2 ${PM_SECTION_6_2_TITLE}`;

export const PM_SECTION_6_3_HEADING = `### 6.3 ${PM_SECTION_6_3_TITLE}`;

export function pmSection62Block(body = "- None listed") {
  return [PM_SECTION_6_2_HEADING, "", PM_SECTION_6_2_INTRO, "", body].join("\n");
}

export function pmSection63Block(body = "- None listed") {
  return [PM_SECTION_6_3_HEADING, "", PM_SECTION_6_3_INTRO, "", body].join("\n");
}
