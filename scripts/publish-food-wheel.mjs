// Prepare local publication assets from the same approved snapshot as PM dropdowns.
// This command does not upload or deploy. Arbitrary preview-file imports are forbidden.
import {spawnSync} from 'node:child_process';
if(process.argv.length>2)throw Error('Use canonical shared generation; external snapshot imports are no longer supported');
for(const script of ['scripts/generate-ranked-food-sources.mjs','scripts/build-food-wheel-top-ten.mjs']){
 const result=spawnSync(process.execPath,[script],{stdio:'inherit'});
 if(result.status!==0)process.exit(result.status??1);
}
