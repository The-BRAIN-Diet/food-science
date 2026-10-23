// Presentation-only projection; scientific propositions and SEC pins stay intact.
import fs from 'node:fs';
import matter from 'gray-matter';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
const file='docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx';
const {data,content}=matter(fs.readFileSync(file,'utf8'));
for(const [id,label] of Object.entries({'PM1-F1':'Dietary protein and amino-acid availability','PM1-F5':'Food texture and amino-acid appearance'}))data.scientific_findings.find(f=>f.id===id).finding_label=label;
const start=content.indexOf('### 4.1 Scientific Findings'),end=content.indexOf('## 5.',start);
if(start<0||end<0)throw Error('Unexpected canonical Findings section');
const body=content.slice(0,start)+expectedFindingsSection(data,content).block+'\n\n'+content.slice(end);
fs.writeFileSync(file,matter.stringify(body,data,{lineWidth:9999}).trimEnd()+'\n');
