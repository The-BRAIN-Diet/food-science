import fs from 'node:fs';
// Historical pilot tests compare against their immutable pre-integration source,
// not against the subsequently approved canonical scientific revisions.
const archives=new Map([
  ['docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx','gaba'],
  ['docs/biological-targets/brs6/fm1/brs6-fm1-pm2-glycaemic-variability-regulation.mdx','glycaemic-variability'],
  ['docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx','same-synthesis'],
]);
export function readPilotBaseline(file) {
  const slug=archives.get(file);
  return fs.readFileSync(slug?'system/sec-assessments/history/'+slug+'-before-v1.mdx':file,'utf8');
}
