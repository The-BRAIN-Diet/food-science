function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

function evidenceLinks(evidenceSource) {
  const citationKeys = Array.isArray(evidenceSource?.citation_keys)
    ? evidenceSource.citation_keys.map(String).filter(Boolean)
    : []
  const findingIds = Array.isArray(evidenceSource?.finding_ids)
    ? evidenceSource.finding_ids.map(String).filter(Boolean)
    : []
  return {citationKeys, findingIds}
}

/** Compatibility view of the shared admission-qualified pathway index; no label/tag inference. */
export function buildDietaryOriginProjection(docs, {target, pmId, pathwayIndex} = {}) {
  const pm = (docs || []).find(d => d.frontMatter?.pm_id === pmId);
  if (!pm) return null;
  // A KC constituent or matching food label is not a PM admission/conversion chain.
  const paths = (pathwayIndex?.paths || []).filter(p => p.pm === pmId &&
    [p.target_id, p.target_title].some(id => normalize(id) === normalize(target)));
  return {target, pm:{id:pmId,title:pm.title,permalink:pm.permalink},bridge:null,
    reason: pathwayIndex ? null : 'admission-qualified-pathway-index-required',
    pathways: paths.map(p => ({
      atom:(pm.frontMatter?.dietary_input_traceability || []).find(a=>a.atom_id===p.atom_id),
      substrateHref:p.substance_page,
      relationshipMetadata:{bridgeClassification:p.classification,derivedTarget:p.target_title,pmSpecificStatus:p.pm_specific_status},
      evidence:evidenceLinks(p.pm_evidence),
      foods:p.food_targets.map(f=>({title:f.food_title,permalink:f.food_page,edge:{relationship:'provides dietary substrate',inputLabel:p.input,sourceNote:f.material,status:f.mapping_status,key:f.id},preparation:f.preparation})),
    }))};
}

/** Project only independently admitted canonical §3.1.3 constituent edges. */
export function buildUpstreamResourceProjection(docs, substanceId, registry) {
  const entry = registry?.[substanceId];
  if (!entry?.path) return [];
  const href = `/docs/substances/${entry.path.replace(/\.mdx?$/, '')}`;
  if (!docs.some(d => d.permalink === href && d.frontMatter?.id === substanceId)) return [];
  const rows = [];
  for (const pm of docs) {
    const data = pm.frontMatter || {};
    if (!data.pm_id || !pm.permalink?.startsWith('/docs/biological-targets/') || data.draft_review_status) continue;
    for (const relationship of data.pm_kc_relationships || []) {
      if (!(data.kc_applicability_adjudications || []).some(a => a.disposition === 'established' && a.kc_id === relationship.kc_id && (a.ikc_id || a.kc_id) === (relationship.ikc_id || relationship.kc_id))) continue;
      const kc = docs.find(d => d.frontMatter?.kc_id === relationship.kc_id && d.permalink?.startsWith('/docs/biological-targets/'));
      for (const constituent of relationship.constituent_relationships || []) {
        if (constituent.disposition !== 'established' || !['supported-upstream-supply','conditional-constraint'].includes(constituent.relationship_type) || constituent.substance_id !== substanceId || constituent.canonical_identity?.status !== 'resolved') continue;
        const membership = (kc?.frontMatter?.individual_key_constraints || []).find(i => i.ikc_id === constituent.ikc_id && i.substance_id === substanceId && i.registration_status === 'registered' && i.identity_status === 'resolved' && i.substance_href === href);
        const kcAtom = (kc?.frontMatter?.kc_input_traceability || []).find(a => a.atom_id === constituent.kc_atom_id && a.ikc_id === membership?.ikc_id && a.ikc_membership === 'admitted');
        const atom = (data.dietary_input_traceability || []).find(a => a.atom_id === constituent.pm_atom_id && a.substance_id === substanceId && a.canonical_identity?.status === 'resolved' && a.canonical_identity?.substance_href === href);
        if (!membership || !kcAtom || atom?.relationship_type !== constituent.relationship_type || !atom?.evidence_limitation || !atom.evidence_source?.citation_keys?.length) continue;
        rows.push({pmId:data.pm_id,parentBrs:data.parent_brs,parentFm:data.parent_fm,pmHref:pm.permalink,kcId:relationship.kc_id,kcHref:kc.permalink,ikcId:membership.ikc_id,substanceId,substanceHref:href,relationshipType:constituent.relationship_type,references:data.references || [],atom});
      }
    }
  }
  return rows;
}
