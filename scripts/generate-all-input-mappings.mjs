import {spawnSync} from 'node:child_process';
for(let n=1;n<=6;n++) {
 const r=spawnSync(process.execPath,['scripts/generate-input-substance-food.mjs','--brs',`BRS${n}`],{stdio:'inherit'});
 if(r.status!==0)process.exit(r.status||1);
}
const s=spawnSync(process.execPath,['scripts/generate-food-strategy-rollup.mjs'],{stdio:'inherit'});
if(s.status!==0)process.exit(s.status||1);
