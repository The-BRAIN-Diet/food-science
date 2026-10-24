// Regenerate owned sections only on the three approved SEC PMs. Authored source
// annexes and Scientific Lessons are explicitly preserved by the shared helpers.
import fs from 'node:fs';
import matter from 'gray-matter';
import {expectedFindingsSection} from './lib/scientific-findings-gate.mjs';
import {renderPmPhenomeSectionBody} from './lib/phenome-relationships.mjs';
import {renderNumberedPmReferencesSection,replacePmReferencesSection} from './lib/pm-reference-index.mjs';
const definitions=JSON.parse(fs.readFileSync('review/sec-integration/reconciliation.json','utf8')).records;
for(const def of definitions) {
  const source=fs.readFileSync(def.canonical,'utf8'),{data,content}=matter(source);
  if(data.pm_id!==def.pmId)throw Error('Unexpected PM identity');
  let body=content,expected=expectedFindingsSection(data,body);
  const start=body.indexOf('### 4.1 Scientific Findings'),end=body.indexOf('## 5.',start);
  if(start<0||end<0)throw Error('Unexpected Findings section');
  body=body.slice(0,start)+expected.block+'\n\n'+body.slice(end);
  const phenome=body.indexOf('## 7. Phenome Connections'),refs=body.indexOf('## 8. References');
  body=body.slice(0,phenome)+renderPmPhenomeSectionBody(data.phenome_relationships||[],{sectionNum:7,findingData:data})+'\n\n'+body.slice(refs);
  body=replacePmReferencesSection(body,renderNumberedPmReferencesSection(data.references));
  const next=matter.stringify(body,data,{lineWidth:9999}).trimEnd()+'\n';
  if(next!==source){fs.writeFileSync(def.canonical,next);console.log('Synced '+def.pmId);}
}
