import fs from 'node:fs';
import {createDietaryPathwayIndex} from './lib/dietary-pathway-index.mjs';
const result=createDietaryPathwayIndex(process.cwd());
if(result.errors.length)throw new Error(JSON.stringify(result.errors));
const dir='system/generated/dietary-pathways';fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(dir+'/pathways.generated.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({pms:result.inventory.length,edges:result.edges.length,paths:result.paths.length,errors:result.errors.length}));
