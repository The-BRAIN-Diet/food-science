import {execFileSync} from 'node:child_process';
import fs from 'node:fs';import matter from 'gray-matter';
import {listMechanismMdxFiles} from './lib/mechanism-page-validation.mjs';
import {loadSecRegistry,validateSecRegistry} from './lib/sec-assessments.mjs';
import {reconcileSecCoverage} from '../src/lib/secCompleteness.mjs';
const args=process.argv.slice(2),pm=args.includes('--pm')?args[args.indexOf('--pm')+1]:null;
const pages=listMechanismMdxFiles(process.cwd(),'pm').map(p=>matter(fs.readFileSync(p,'utf8')).data).filter(p=>p.pm_id&&(!pm||p.pm_id===pm));
const base=args.includes('--base')?args[args.indexOf('--base')+1]:null;
const previousPages=[];
if(base){
 // Read previous canonical files from Git without checking out or modifying anything.
 const names=execFileSync('git',['ls-tree','-r','--name-only',base,'docs/biological-targets'],{encoding:'utf8'}).trim().split('\n').filter(p=>/\.mdx?$/.test(p));
 for(const name of names){const d=matter(execFileSync('git',['show',base+':'+name],{encoding:'utf8',maxBuffer:32*1024*1024})).data;if(d.pm_id&&(!pm||d.pm_id===pm))previousPages.push(d);}
}
const registry=loadSecRegistry(),report=reconcileSecCoverage(pages,registry,{previousPages});
if(args.includes('--require-appraised')&&!base){report.errors.push('Scientific-appraisal gate requires --base for scientific Evidence Gap preservation comparison');report.structurallyComplete=false;report.scientificallyAppraised=false;report.pendingScientificAdjudication=true;}

if(!pages.length){report.errors.push('No canonical PMs matched the requested scope');report.structurallyComplete=false;report.scientificallyAppraised=false;report.pendingScientificAdjudication=true;}
const registryErrors=validateSecRegistry(registry);
if(registryErrors.length){report.errors.push(...registryErrors.map(e=>e.message));report.structurallyComplete=false;report.scientificallyAppraised=false;report.pendingScientificAdjudication=true;}console.log(JSON.stringify({pmCount:pages.length,...report},null,2));
if(args.includes('--require-appraised')?!report.scientificallyAppraised:args.includes('--check')&&!report.structurallyComplete)process.exitCode=1;
