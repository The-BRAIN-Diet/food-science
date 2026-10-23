import fs from 'node:fs';
import matter from 'gray-matter';
import {validateInputGovernance} from './lib/dietary-input-governance.mjs';
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):/\.mdx?$/.test(e.name)?[d+'/'+e.name]:[]);
let checked=0;const issues=[];
for(const file of walk('docs/biological-targets')){const pm=matter(fs.readFileSync(file,'utf8'));if(!pm.data.pm_id)continue;checked++;validateInputGovernance(pm.data,issues,{entityLabel:pm.data.pm_id,content:pm.content});}
console.log(JSON.stringify({checked,issues},null,2));if(issues.length)process.exitCode=1;
