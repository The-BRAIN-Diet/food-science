// Preserve reciprocal navigation as existing authored islands during section sync.
import fs from 'node:fs';
import matter from 'gray-matter';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
const file='docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx';
const source=fs.readFileSync(file,'utf8'),{data,content}=matter(source);
let body=content;
for(const f of data.scientific_findings) {
  if(!/^PM1-F\d+$/.test(f.id))continue;
  const marker=`{/* scientific-lesson:${f.id}:start */}`;
  if(body.includes(marker))throw Error('Authored island already exists; do not overwrite');
  const match=[...body.matchAll(/<ScientificFinding finding=\{\{[^\n]+\}\} pmId=\{"BRS1-FM1-PM1"\} \/>/g)].find(m=>m[0].includes(`"id":"${f.id}"`));
  if(!match)throw Error('Finding component missing: '+f.id);
  const target='pm1-mechanism-f'+f.id.split('-F')[1];
  const title=f.finding_label.replaceAll('&','&amp;').replaceAll('<','&lt;');
  const island=`\n\n${marker}\n<p><a href="#${target}">Mechanistic explanation: ${title}</a></p>\n{/* scientific-lesson:${f.id}:end */}`;
  const end=match.index+match[0].length;
  body=body.slice(0,end)+island+body.slice(end);
}
const start=body.indexOf('### 4.1 Scientific Findings'),end=body.indexOf('## 5.',start);
body=body.slice(0,start)+expectedFindingsSection(data,body).block+'\n\n'+body.slice(end);
// Leave the scientific front matter byte-identical.
fs.writeFileSync(file,source.slice(0,source.indexOf(content))+body);
