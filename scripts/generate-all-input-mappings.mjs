import {spawnSync} from 'node:child_process';
for(const brs of ['BRS1','BRS2','BRS3','BRS4','BRS5','BRS6','BRS-X']) {
 const r=spawnSync(process.execPath,['scripts/generate-input-substance-food.mjs','--brs',brs],{stdio:'inherit'});
 if(r.status!==0)process.exit(r.status||1);
}
const s=spawnSync(process.execPath,['scripts/generate-food-strategy-rollup.mjs'],{stdio:'inherit'});
if(s.status!==0)process.exit(s.status||1);

const targets=spawnSync(process.execPath,["scripts/generate-dietary-food-targets.mjs"],{stdio:"inherit"});
if(targets.status!==0)process.exit(targets.status||1);

const pathways=spawnSync(process.execPath,["scripts/generate-dietary-pathways.mjs"],{stdio:"inherit"});
if(pathways.status!==0)process.exit(pathways.status||1);
