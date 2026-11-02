import fs from 'node:fs';
import {collectPresentation,validatePresentation} from './presentation-contract.mjs';
const base=JSON.parse(fs.readFileSync('system/presentation-contract-baseline.json'));
const approvals=JSON.parse(fs.readFileSync('system/presentation-change-approvals.json'));
const errors=validatePresentation(collectPresentation(process.cwd()),base.files,approvals);
for(const a of approvals)for(const field of ['proposal','contract','example'])if(!fs.existsSync(a[field]))errors.push(`Missing approval artifact: ${a[field]}`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Presentation contract: ${Object.keys(base.files).length} protected files; no unapproved structural changes.`);
