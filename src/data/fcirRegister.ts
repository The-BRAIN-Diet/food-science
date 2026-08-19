import register from "./fcir-register.json"

export type FcirStatus =
  | "Resolved"
  | "Provisionally resolved"
  | "Under review"
  | "Source withdrawn; research active"
  | "Active rule"
  | "Resolved as rule"
  | "Reference case"
  | "Resolved for named specification"

export type FcirCase = {
  id: string
  anchor: string
  title: string
  status: string
  problem: string
  decision: string
  action: string
  source_public: string
  food_or_scope: string
  interpretation_public: string
  food_slugs: string[]
  public_row?: string
  recipes?: {title: string; href: string}[]
  excludes_unresolved_18_3_from_named_ala: boolean
  excludes_unresolved_18_3_from_identified_omega3: boolean
}

export type FcirRegister = {
  public_path: string
  public_doc: string
  food_page_note_template: string
  editorial: {
    scientific_provenance_lead: string
    review_cycle: string
    last_substantive_review: string
    project_scope: string
  }
  status_meanings: Record<string, string>
  cases: FcirCase[]
}

export const fcirRegister = register as FcirRegister

export const FCIR_PUBLIC_PATH = fcirRegister.public_path
export const FCIR_PUBLIC_DOC = fcirRegister.public_doc

export function fcirAnchor(caseId: string): string {
  return String(caseId || "").trim().toLowerCase()
}

export function fcirHref(caseId: string): string {
  return `${FCIR_PUBLIC_PATH}#${fcirAnchor(caseId)}`
}

export function foodPageNote(caseId: string): string {
  return fcirRegister.food_page_note_template.replace("{id}", caseId)
}

export function caseById(caseId: string): FcirCase | undefined {
  return fcirRegister.cases.find((entry) => entry.id === caseId)
}
