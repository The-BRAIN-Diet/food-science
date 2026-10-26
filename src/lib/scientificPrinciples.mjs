/** Explicit, proposition-specific presentation. Absence of a score never selects a Principle. */
export function scientificPrincipleIds(data) {
  const ids=Array.isArray(data?.scientific_principle_ids) ? data.scientific_principle_ids : [];
  return scientificPrincipleErrors(data).length ? [] : ids;
}
export function scientificPrinciples(data) {
  return Array.isArray(data?.scientific_principles) ? data.scientific_principles : [];
}
export function isScientificPrinciple(data, id) {
  return scientificPrincipleIds(data).includes(id);
}
export function scientificPrincipleLabel(finding, data) {
  const principle=scientificPrinciples(data).find(p=>p.original_finding_id===finding.id);
  return `Scientific Principle — ${principle?.title || finding.finding_label || finding.title || finding.id}`;
}
export function findingEvidenceHref(data, id) {
  return `${isScientificPrinciple(data, id) ? '?review=1' : ''}#${id.toLowerCase()}`;
}
export function scientificPrincipleErrors(data) {
  const errors=[], rows=scientificPrinciples(data), findings=data?.scientific_findings || [];
  const ids=new Set();
  for(const row of rows) {
    if(!row.id || ids.has(row.id))errors.push('Principle identity must be present and unique');
    ids.add(row.id);
    if(row.original_finding_id) {
      if(!findings.some(f=>f.id===row.original_finding_id))errors.push('Original Finding must remain preserved');
    } else if(row.provenance_kind!=='curated-biochemical' || !row.sources?.every(s=>['UniProt','Rhea','Reactome','ChEBI'].includes(s.database) && s.accession && s.version && s.accessed)) {
      errors.push('A new Principle requires explicit versioned curated biochemical provenance');
    }
    if(!row.original_finding_id && findings.some(f=>f.id===row.id))errors.push('A new Principle cannot reuse an existing Finding identity');
    for(const field of ['title','proposition','mechanism','scope_limitations','classification_rationale','reviewed_on'])if(!row[field])errors.push(`Principle requires ${field}`);
    if(!row.sources?.length || row.sources.some(s=>!s.label || !s.href))errors.push('Principle requires traceable provenance');
    for(const key of ['score','sec_assessment_ref','assessmentStatus','factors','dietary_input'])if(Object.hasOwn(row,key))errors.push(`Principle cannot contain ${key}`);
  }
  for(const id of (Array.isArray(data?.scientific_principle_ids) ? data.scientific_principle_ids : [])) {
    const row=rows.find(r=>r.original_finding_id===id),original=findings.find(f=>f.id===id);
    if(!row)errors.push('Reclassified Finding requires an explicit Principle and retained history');
    else if(!row.historical_proposition || row.historical_proposition !== original?.finding_statement)errors.push('Reserved historical Finding identity cannot be reused for another proposition');
  }
  return errors;
}
