/**
 * Extract constraint stressors from KC page content (legacy §6).
 */

export function extractKcStressors(content) {
  const match = content.match(
    /### 6\. Constraint Stressors \/ Burdens\s*\n+([\s\S]*?)(?=\n### 7\. References|\n### 6\. References|$)/,
  );
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

export function stripKcStressorSection(content) {
  let body = content.replace(
    /\n### 6\. Constraint Stressors \/ Burdens\s*\n[\s\S]*?(?=\n### 7\. References)/,
    "",
  );
  body = body.replace(/\n### 7\. References/g, "\n### 6. References");
  return body;
}
