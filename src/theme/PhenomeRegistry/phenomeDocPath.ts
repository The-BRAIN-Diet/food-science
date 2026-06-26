/** Canonical docs route for a registry phenome detail page. */
export function phenomeDetailDocPath(phenomeId: string, slug: string): string {
  return `/docs/phenomes/details/${String(phenomeId).toLowerCase()}-${slug}`;
}

/** MDX filename stem (no extension) under docs/phenomes/details/. */
export function phenomeDetailDocStem(phenomeId: string, slug: string): string {
  return `${String(phenomeId).toLowerCase()}-${slug}`;
}
