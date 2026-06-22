/**
 * Remove adjacent duplicate inline citation brackets introduced by Zotero/Mendeley merges.
 * e.g. [Author et al., 2022] [Author et al., 2022] → [Author et al., 2022]
 */

export function dedupeAdjacentCitationBrackets(text) {
  let out = String(text ?? "");
  const re = /(\[[^\]]+\])(?:\s+|;\s*)\1/g;
  let prev;
  do {
    prev = out;
    out = out.replace(re, "$1");
  } while (out !== prev);
  return out;
}
