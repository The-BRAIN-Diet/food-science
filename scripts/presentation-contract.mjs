import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const walk=d=>fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]):[];
export function collectPresentation(root){
 const out={};
 // Conservative: renderer implementation changes require review, including additions.
 for(const dir of ['src/components','src/theme','src/plugin','src/css','system/templates'])for(const f of walk(path.join(root,dir)))if(/\.(tsx?|jsx?|mjs|cjs|css|scss|mdx?)$/.test(f))out[path.relative(root,f)]=hash(fs.readFileSync(f,'utf8'));
 for(const f of walk(path.join(root,'docs')).filter(f=>/\.mdx?$/.test(f))){const s=fs.readFileSync(f,'utf8').replace(/^---[\s\S]*?---\s*/,'');
 // Headings, HTML/MDX elements, tables and exposed internal identifiers.
 const structure=[...s.matchAll(/^#{1,6}\s+.*$|<\/?[A-Za-z][^>]*>|^\s*\|.*$|\bPM\d+-(?:DIT|EG|OI|SOP)-[A-Z0-9-]+/gm)].map(m=>m[0]);
 out[path.relative(root,f)]=hash(JSON.stringify(structure));}
 return out;
}
export function validatePresentation(current,baseline,approvals){
 return [...new Set([...Object.keys(current),...Object.keys(baseline)])].filter(file=>current[file]!==baseline[file]).filter(file=>!approvals.some(a=>a.file===file&&a.sha256===(current[file]||'deleted')&&a.author_approval?.trim()&&a.approval_source?.trim()&&a.proposal?.trim()&&a.contract?.trim()&&a.example?.trim()&&a.scope?.trim())).map(file=>`Unapproved presentation change: ${file}`);
}
