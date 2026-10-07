/** Preview/report gate only. No automatic scientific-page migration or name deduplication.
 * Rows adapt existing report disposition/rationale/evidence/record-ID columns.
 * compared_records supplies explicit arrays for each required section (empty = reviewed, none).
 * biological_job plus compared_biological_jobs reject a distinct disposition for a recorded same job.
 * A different job string may pass. That pass is structural only and does not adjudicate the job.
 * A different pool name, Resource dependency label, or citation set does not change that result.
 * applicability_disposition established plus public_copy "No mapping established." is rejected.
 */
function recordedJob(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

export function validateKcDistinctnessReview({ candidateIds, rows, publicIds }) {
  const issues = [];
  const publicSet = new Set(publicIds);
  const byId = new Map();
  const fail = (id, message) => issues.push({ relationship_id: id, message });
  for (const row of rows) {
    const id = row.relationship_id;
    if (byId.has(id)) fail(id, 'Duplicate review row');
    byId.set(id, row);
    if (!candidateIds.includes(id)) fail(id, 'Review row is not a proposed candidate');
    if (!['distinct', 'consolidated as duplicate', 'unresolved'].includes(row.disposition))
      fail(id, 'Missing or invalid presentation-review disposition');
    for (const section of ['3.1.1', '3.1.2', '3.2'])
      if (!Array.isArray(row.compared_records?.[section])) fail(id, `Missing comparison against ${section}`);
    if (!row.rationale?.trim()) fail(id, 'Missing biological-job/context rationale');
    if (!row.evidence_source?.finding_ids?.length && !row.evidence_source?.citation_keys?.length)
      fail(id, 'Missing supporting evidence references');
    if (row.disposition !== 'distinct' && publicSet.has(id))
      fail(id, 'Duplicate or unresolved additional disclosure remains public');
    if (row.disposition === 'unresolved' && !row.gap?.trim()) fail(id, 'Missing precise distinctness gap');
    const job = recordedJob(row.biological_job);
    const comparedJobs = Array.isArray(row.compared_biological_jobs) ? row.compared_biological_jobs : [];
    if (row.disposition === 'distinct' && job && comparedJobs.some((item) => recordedJob(item) === job))
      fail(id, 'Recorded duplicate remains distinct despite a different pool name, Resource dependency label, or citation set');
    if (row.disposition === 'consolidated as duplicate') {
      if (!row.retained_record_ids?.length) fail(id, 'Missing retained destination IDs');
      if (!row.provenance?.length) fail(id, 'Missing preserved provenance/history references');
      if (!Object.values(row.compared_records || {}).flat().length) fail(id, 'Duplicate decision has no compared record');
      if (row.applicability_disposition === 'established' && /No mapping established/.test(String(row.public_copy || '')))
        fail(id, 'Consolidated presentation erased an established PM↔iKC mapping');
    }
  }
  for (const id of candidateIds) if (!byId.has(id)) fail(id, 'Candidate lacks final distinctness review');
  for (const id of publicSet) if (!byId.has(id)) fail(id, 'Public KC disclosure lacks final review');
  return issues;
}
