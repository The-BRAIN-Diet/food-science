import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import matter from 'gray-matter';
import {listMechanismMdxFiles} from './lib/mechanism-page-validation.mjs';
import {createRequire} from 'node:module';
import {readPilotBaseline} from './lib/sec-pilot-baseline.mjs';
const require = createRequire(import.meta.url);
const config = fs.readFileSync('docusaurus.config.ts', 'utf8');
const canonical = matter(readPilotBaseline('docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx'));
const preview = matter(fs.readFileSync('docs/system/sec-calibration/gaba.mdx', 'utf8'));
const code = config.slice(config.indexOf('const includeInternalDocs'), config.indexOf('const wipSitemapIgnore'));
const excludes = env => vm.runInNewContext(`${code}\ndocsExclude`, {process: {env}});

test('strict opt-in excludes docs in default dev, production and internal builds', () => {
 for (const env of [{}, {NODE_ENV:'production'}, {INCLUDE_INTERNAL_DOCS:'true'}, {SEC_CALIBRATION_PREVIEW:'false'}, {SEC_CALIBRATION_PREVIEW:'1'}]) {
  assert.ok(excludes(env).includes('**/system/sec-calibration/**'));
 }
 assert.ok(!excludes({SEC_CALIBRATION_PREVIEW:'true'}).includes('**/system/sec-calibration/**'));
 assert.match(config, /exclude: docsExclude/);
});
test('preview front matter has no scientific identity, evidence or relationship registration', () => {
 assert.deepEqual(Object.keys(preview.data).sort(), ['hide_title','id','list_image','slug','title']);
 assert.equal(preview.data.id, 'sec-calibration-gaba-preview');
 assert.equal(preview.data.slug, '/system/sec-calibration/gaba');
 assert.equal(preview.data.pm_id, undefined);
 assert.equal(preview.data.scientific_findings, undefined);
});
test('entire canonical body, Findings, lessons, references and numbered sections survive', () => {
 assert.ok(preview.content.replace('\n<CuratedReferenceList />\n', '').includes(canonical.content.replaceAll('<ScientificFinding finding=', '<CalibrationFinding finding=')));
 const originals = [...canonical.content.matchAll(/<ScientificFinding finding=/g)].length;
 assert.equal([...preview.content.matchAll(/<CalibrationFinding finding=/g)].length, originals);
 assert.ok(originals > 5);
 assert.match(preview.content, /brs1-4-9-f1-l1/);
});
test('preview is outside canonical PM and evidence inventories', () => {
 assert.ok(!listMechanismMdxFiles(process.cwd(), 'pm').some(p => p.includes('/docs/system/sec-calibration/')));
 for (const file of ['scripts/lib/input-substance-food.mjs','scripts/generate-food-strategy-rollup.mjs','scripts/lib/phenome-relationship-index.mjs']) {
  const source = fs.readFileSync(file,'utf8');
  assert.match(source, /biological-targets|listMechanismMdxFiles/);
  assert.doesNotMatch(source, /docs\/system/);
 }
});
test('ontology sees only loaded documents and no preview scientific metadata', async () => {
 const plugin = await require('../src/plugin/ontology-projection')();
 let output;
 const run = async docs => plugin.allContentLoaded({actions:{setGlobalData: data => output=data}, allContent:{'docusaurus-plugin-content-docs':{default:{loadedVersions:[{docs}]}}}});
 await run([]); assert.equal(output.docs.length,0);
 await run([{title:preview.data.title,permalink:'/docs/system/sec-calibration/gaba',frontMatter:preview.data,tags:[]}]);
 assert.equal(output.docs[0].frontMatter.pm_id,undefined);
 assert.equal(output.docs[0].frontMatter.scientific_findings,undefined);
});
test('actual lever claims stay unscored; multiple Finding support is explicit', () => {
 const component=fs.readFileSync('src/components/SecCalibrationPreview/index.tsx','utf8');
 assert.match(component, /<strong>Not scored<\/strong>/);
 assert.match(component, /href="#pm9-f1">F1<\/a> \+ <a href="#pm9-f2">F2/);
 assert.match(component, /No explicit canonical Finding linkage/);
 assert.match(component, /Evidence &amp; Audit assessment/);
 assert.match(component, /Calculated raw SEC 0\/8/);
 assert.match(component, /Not assessed/);
 assert.doesNotMatch(component, /Math\.(max|min)|\.reduce\(/);
});

// Requirement A only: preview display provenance; no SF-free admission exception.
const {curatedSourcesFor, withPreviewCuratedSources} = await import('../src/components/SecCalibrationPreview/curatedSources.mjs');
const previewSource = fs.readFileSync('src/components/SecCalibrationPreview/index.tsx', 'utf8');

test('evidence governance distinguishes literature limits from incomplete assessment', () => {
 const stage2a=fs.readFileSync('system/scientific-finding-schema.md','utf8');
 const stage2b=fs.readFileSync('system/dietary-input-traceability-contract.md','utf8');
 const principle="Evidence-confidence conclusions must distinguish limitations of the underlying scientific evidence from limitations of the framework's evidence retrieval and assessment. Absence of verified evidence within an assessment must not be represented as evidence of absence.";
 assert.ok(stage2a.includes(principle));
 for(const statement of ['“There is insufficient evidence.”','“Insufficient evidence was identified in this assessment.”','“Independent replication was not established in this assessment.”']) assert.ok(stage2a.includes(statement));
 assert.match(stage2b,/scientific-finding-schema\.md#evidence-limitations-versus-retrieval-and-assessment-limitations/);
 assert.match(stage2a,/Inaccessible methods or uncertainty estimates do not establish B0 or P0/);
 assert.match(stage2b,/must not automatically become B0, P0 or R0/);
 const conclusion='GAD65 and GAD67 differ in their typical PLP-bound states, providing experimental evidence for distinct modes of regulating GABA synthesis. The larger apoenzyme fraction associated with GAD65 suggests potentially recruitable catalytic capacity. However, independent replication of the specific occupancy finding has not yet been established in this assessment, and the physiological importance of this proposed reserve mechanism in the human brain remains uncertain.';
 assert.ok(fs.readFileSync('src/components/SecCalibrationPreview/assessmentAudit.mjs','utf8').includes(conclusion));
 assert.match(previewSource,/finding_summary: sf1Conclusion/);
 assert.match(fs.readFileSync('src/components/SecCalibrationPreview/EvidenceAudit.tsx','utf8'),/Formal SEC remains Not scored until all four judgements are defensible/);
 assert.equal(canonical.data.scientific_findings.find(f=>f.id==='PM9-F1').synthesised_evidence_confidence,'not-yet-scored');
});

test('curated local references are unique, disjoint from papers and reusable across atoms', async () => {
 const {previewCuratedReferences}=await import('../src/components/SecCalibrationPreview/curatedSources.mjs');
 assert.equal(previewCuratedReferences.length,8);
 assert.equal(new Set(previewCuratedReferences.map(r=>r.anchor)).size,8);
 assert.equal(new Set(previewCuratedReferences.map(r=>r.accession)).size,8);
 for(const reference of previewCuratedReferences) {
  assert.match(reference.anchor,/^pm-curated-/);
  assert.ok(reference.title && reference.accessed);
  assert.equal(new URL(reference.href).protocol,'https:');
 }
 const data=withPreviewCuratedSources(canonical.data);
 const glutamate=curatedSourcesFor(data.dietary_input_traceability[0].evidence_source.pathway_resources);
 const plp=curatedSourcesFor(data.dietary_input_traceability[1].evidence_source.pathway_resources);
 assert.equal(glutamate.find(r=>r.accession==='Q99259'),plp.find(r=>r.accession==='Q99259'));
 assert.match(previewSource,/Return to Evidence source/);
 assert.match(previewSource,/Return to PM9-F1/);
 assert.match(previewSource,/Rhea explicitly includes the proton/);
 assert.match(previewSource,/isoform regulation and physiological interpretation retain/);
 assert.match(preview.content,/<CuratedReferenceList \/>/);
});

test('curated enrichment changes only pathway_resources on three existing preview atoms', () => {
 const before=JSON.stringify(canonical.data);
 const enriched=withPreviewCuratedSources(canonical.data);
 const restored=structuredClone(enriched);
 for(const atom of restored.dietary_input_traceability) delete atom.evidence_source.pathway_resources;
 assert.deepEqual(restored,canonical.data);
 assert.equal(JSON.stringify(canonical.data),before,'input data not mutated');
 assert.deepEqual(enriched.dietary_input_traceability.map(a=>a.dietary_input),[false,null,true]);
 assert.equal(new Set(enriched.dietary_input_traceability.map(a=>a.atom_id)).size,3);
 assert.deepEqual(withPreviewCuratedSources(enriched),enriched,'idempotent, no duplicate records');
 assert.equal(withPreviewCuratedSources({pm_id:'another-PM'}).pm_id,'another-PM');
});
test('glutamate gets exact human GAD reaction records, not B6 activation records', () => {
 const atom=withPreviewCuratedSources(canonical.data).dietary_input_traceability[0];
 const sources=curatedSourcesFor(atom.evidence_source.pathway_resources);
 assert.deepEqual(sources.map(s=>s.accession),['RHEA:17785','R-HSA-888572.3','R-HSA-888577.3','Q99259','Q05329']);
 assert.equal(sources[0].href,'https://www.rhea-db.org/rhea/17785');
 assert.equal(sources[1].href,'https://reactome.org/content/detail/R-HSA-888572');
 assert.ok(!sources.some(s=>s.accession==='O00764'));
});
test('PLP cofactor and B6 precursor records stay distinct', () => {
 const atoms=withPreviewCuratedSources(canonical.data).dietary_input_traceability;
 assert.deepEqual(curatedSourcesFor(atoms[1].evidence_source.pathway_resources).map(s=>s.accession),['Q99259','Q05329']);
 const b6=curatedSourcesFor(atoms[2].evidence_source.pathway_resources);
 assert.deepEqual(b6.map(s=>s.accession),['R-HSA-964975.4','O00764','Q9NVS9']);
 assert.equal(b6[0].href,'https://reactome.org/content/detail/R-HSA-964975');
 assert.equal(b6[1].href,'https://www.uniprot.org/uniprotkb/O00764/entry');
 assert.equal(b6[2].href,'https://www.uniprot.org/uniprotkb/Q9NVS9/entry');
 assert.match(b6[2].scope,/PNP\/PMP → PLP/);
 assert.match(b6[1].scope,/PN → PNP, PM → PMP/);
});
test('curated links reject arbitrary URLs, unverified accessions and injected objects', () => {
 for(const input of [undefined,null,{},'Reactome:R-HSA-964975.4', ['javascript:alert(1)'],['https://reactome.org/content/detail/R-HSA-964975'],['UniProtKB:P48318'],['Reactome:R-HSA-964975.4"><script>'],[{href:'javascript:alert(1)',accession:'O00764'}],['__proto__'],['constructor']]) {
  assert.deepEqual(curatedSourcesFor(input),[]);
 }
 const links=curatedSourcesFor(['UniProtKB:O00764','UniProtKB:O00764']);
 assert.equal(links.length,1);
 assert.ok(links.every(s=>new URL(s.href).protocol==='https:'));
});
test('curated metadata never becomes a paper citation, Finding, admission or SEC score', () => {
 const enriched=withPreviewCuratedSources(canonical.data);
 assert.deepEqual(enriched.references,canonical.data.references);
 assert.deepEqual(enriched.scientific_findings,canonical.data.scientific_findings);
 assert.deepEqual(enriched.dietary_lever_atoms,canonical.data.dietary_lever_atoms);
 assert.deepEqual(enriched.dietary_lever_presentations,canonical.data.dietary_lever_presentations);
 for(const atom of enriched.dietary_input_traceability) {
  const original=canonical.data.dietary_input_traceability.find(a=>a.atom_id===atom.atom_id);
  assert.deepEqual(atom.evidence_source.finding_ids,original.evidence_source.finding_ids);
  assert.deepEqual(atom.evidence_source.citation_keys,original.evidence_source.citation_keys);
  assert.equal(atom.evidence_limitation,original.evidence_limitation);
  for(const link of curatedSourcesFor(atom.evidence_source.pathway_resources)) {
   assert.doesNotMatch(link.href,/BRAIN-Diet-References|papers/);
   assert.equal(link.score,undefined);
  }
 }
});
test('curated provenance stays inside Evidence source without a recursive target record', () => {
 const adapter=fs.readFileSync('src/components/SecCalibrationPreview/curatedSources.mjs','utf8');
 assert.match(previewSource,/data-curated-atom=\{atom.atom_id\}/);
 assert.match(previewSource,/href=\{`#\$\{source.anchor\}`\}/);
 assert.match(previewSource,/rel="noopener noreferrer"/);
 assert.match(previewSource, /preparePreviewDisclosure\(li, detail, atom\)/);
 assert.match(adapter, /:scope > \.brs-dietary-lever-detail-evidence/);
 assert.match(adapter, /evidence\.append\(slot\)/);
 assert.match(adapter, /createElement\('span'\)/);
 assert.match(previewSource, /atom\.evidence_source\?\.finding_ids/);
 assert.doesNotMatch(previewSource,/Curated biochemical sources:|CuratedProvenance|data-curated-target|targetAtoms|derived_target_atom_id|dangerouslySetInnerHTML/);
});
test('preview-only B6 display names both activation enzymes and preserves evidence decisions', () => {
 const adapter=fs.readFileSync('src/components/SecCalibrationPreview/curatedSources.mjs','utf8');
 assert.match(adapter,/Supplies precursors for PLP formation through PDXK and PNPO/);
 assert.match(adapter,/Yes — Derived/);
 assert.match(previewSource,/\(PDXK\)/);
 assert.match(previewSource,/\(PNPO\)/);
 assert.doesNotMatch(adapter,/atom\.(biological_role|dietary_input|evidence_limitation)\s*=/);
});
test('preview empty food categories become status messages without touching populated lists', () => {
 const adapter=fs.readFileSync('src/components/SecCalibrationPreview/curatedSources.mjs','utf8');
 assert.match(adapter,/:scope > details\.pm-input-food-sources/);
 assert.match(adapter,/if \(!empty \|\| box\.querySelector\('a'\)\) return/);
 assert.match(adapter,/createElement\('p'\)/);
 assert.match(adapter,/box\.replaceWith\(message\)/);
 assert.doesNotMatch(adapter,/\.sort\(|\.value\s*=|innerHTML\s*=/);
});
test('curated enrichment retains current validator requirements and paper-only script projection', async () => {
 const {validateDietaryInputTraceability}=await import('./lib/dietary-input-traceability.mjs');
 const {buildDietaryLeverDisclosureMap}=await import('./lib/dietary-lever-disclosure.mjs');
 const enriched=withPreviewCuratedSources(canonical.data);
 const issues=[];
 validateDietaryInputTraceability(enriched,issues,{entityLabel:'preview-test'});
 assert.deepEqual(issues,[]);
 assert.deepEqual([...buildDietaryLeverDisclosureMap(enriched)],[...buildDietaryLeverDisclosureMap(canonical.data)]);
 const missingFinding=structuredClone(enriched);
 missingFinding.dietary_input_traceability[0].evidence_source.finding_ids=[];
 const errors=[];
 validateDietaryInputTraceability(missingFinding,errors,{entityLabel:'preview-test'});
 assert.ok(errors.some(e=>e.code==='dit_missing_finding_source'),'curated display does not open an SF-free route');
});
