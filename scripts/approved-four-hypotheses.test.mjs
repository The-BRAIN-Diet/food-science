import fs from 'node:fs';import path from 'node:path';import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import matter from 'gray-matter';import {renderScientificHypotheses,validateScientificHypotheses} from './lib/scientific-hypotheses.mjs';import {createProcessorUncached} from '@docusaurus/mdx-loader/lib/processor.js';import layout from '../src/plugin/pm-lever-layout/index.cjs';
// Approved hypothesis baselines; PM4 additionally preserves PR244’s explicit citrus/whole-fruit preparation boundary.
const baselines=[
  {
    "file": "docs/biological-targets/brs5/fm2/brs5-fm2-pm4-microbial-ecological-turnover-and-competitive-selection.mdx",
    "pm": "BRS5-FM2-PM4",
    "id": "PM4-H1",
    "science": "fe40acc6187bbd06bf5e3f2c8ddcb3fb5e724eff00357fcc55b003901f8fef72",
    "body": "a4fc27b37d067449492f912ce0a26b9591e875ab653a7762be383dbbcbe7d8ad"
  },
  {
    "file": "docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer.mdx",
    "pm": "BRS4-FM1-PM3",
    "id": "PM3-H1",
    "science": "b1ee32d443b80e8c4b242d1cc24bd63a0651620682d4679336912811998da320",
    "body": "bf3673b1f52aa5ad91726714427d9f6bdc45b75e7f276496a98634d909b32c2c"
  },
  {
    "file": "docs/biological-targets/brs-x/ecs/fm1/brs-x-ecs-pm1-nape-nae-biosynthesis-capacity.mdx",
    "pm": "BRS-X(ECS-PM1)",
    "id": "PM1-H1",
    "science": "254b19debef99b18cda5dde756a4788e0cee58846df0af3c8377aee1deecb7d8",
    "body": "7a382c2d9bc4d28e07f0514edb9b87f1d79215b1ea7dddbf654a836ed52c680b"
  },
  {
    "file": "docs/biological-targets/brs-x/hormones/fm1/brs-x-hormones-pm6-androgen-microbiome-regulation.mdx",
    "pm": "BRS-X(Hormones-PM6)",
    "id": "PM6-H1",
    "science": "8bf67e5f1017fe3bc60931cb93575f284d654293902aba861e49720ef4dbb431",
    "body": "55fdc1d589e6cadbf62b4f48ab5d4b29e4fb96406dde060b750ef38e1ab54375"
  }
];
const hash=s=>createHash('sha256').update(s).digest('hex');
for(const b of baselines){test(b.pm+' approved hypothesis, unchanged science and original body',()=>{const p=matter(fs.readFileSync(b.file,'utf8')),h=p.data.scientific_hypotheses;assert.equal(h.length,1);assert.equal(h[0].id,b.id);assert.equal(h[0].status,'Unestablished');assert.deepEqual(validateScientificHypotheses(p.data,[],{content:p.content}),[]);const d={...p.data};delete d.scientific_hypotheses;assert.equal(hash(JSON.stringify(d)),b.science,'All admissions, gates, SEC, Findings and other frontmatter unchanged');assert.equal(hash(p.content.replace(renderScientificHypotheses(p.data)+'\n\n','')),b.body,'Original body including accepted graph sections unchanged');assert.ok(!h[0].source_pm&&!h[0].target_pm,'No invented accepted source/destination edge');});}
test('all four PM pages compile using the existing layout',async()=>{const options={siteDir:process.cwd(),staticDirs:[path.resolve('static')],markdownConfig:{anchors:{maintainCase:false},format:'mdx',mermaid:false,mdx1Compat:{comments:true,admonitions:true,headingIds:true}},beforeDefaultRemarkPlugins:[layout],remarkPlugins:[],rehypePlugins:[],admonitions:true};const compiler=await createProcessorUncached({options,format:'mdx'});for(const b of baselines){const p=matter(fs.readFileSync(b.file,'utf8'));const r=await compiler.process({content:p.content,filePath:path.resolve(b.file),frontMatter:p.data,compilerName:'server'});assert.ok(String(r.content).includes('ScientificHypothesis'));}});
test('approved PE and androgen boundaries remain explicit',()=>{const load=i=>matter(fs.readFileSync(baselines[i].file,'utf8')).data.scientific_hypotheses[0];const pe=load(2),ar=load(3);assert.doesNotMatch(pe.proposition,/rodent|16:0|18:1/);assert.match(pe.proposition,/quantitatively meaningful/);assert.match(ar.limitations.join(' '),/full gut → androgen → stress → allostasis chain remains explicitly Unestablished/);assert.match(ar.required_evidence.join(' '),/Linked downstream question:/);assert.match(ar.rationale,/do not establish/);});
