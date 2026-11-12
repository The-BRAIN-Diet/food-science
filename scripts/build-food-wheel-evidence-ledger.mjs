import fs from 'node:fs';
import matter from 'gray-matter';
import {buildInputSubstanceFood} from './lib/input-substance-food.mjs';
import {documentedSourcesForRelationships} from '../src/data/documentedFoodSources.mjs';
const out='static/explore/food-wheel/';
const registry=JSON.parse(fs.readFileSync('registry/substances.json'));
const policy=JSON.parse(fs.readFileSync('system/food-wheel-evidence-publication.json'));
const fresh=buildInputSubstanceFood(process.cwd(),{brs:'BRS5'});
const snapshot=JSON.parse(fs.readFileSync('src/data/rankedFoodSources.generated.json'));
const parents=[];
for(const pm of [...new Set(fresh.relationships.map(r=>r.pm))]){
 const relationships=fresh.relationships.filter(r=>['pectin','resistant-starch'].includes(r.substance_id));
 for(const s of documentedSourcesForRelationships(fresh,pm,relationships,[],snapshot)) parents.push({pm,food:s.food_id,substance:s.substance_id,classification:'documented-unranked',source:s,relationships:s.relationship_ids.map(id=>fresh.relationships.find(r=>r.id===id))});
}
const children=policy.relationships.map(p=>{
 const r=fresh.relationships.find(r=>r.id===p.relationship_id&&r.substance_id===p.substance_id);
 if(!r||r.identity_status!=='resolved')throw Error('Unresolved approved identity '+p.relationship_id);
 const file=r.source_record.split('#')[0],doc=matter(fs.readFileSync(file,'utf8'));
 return {...p,identity:registry[p.substance_id],relationship:r,canonical_atoms:{dietary_input:doc.data.dietary_input_traceability.find(a=>r.id.endsWith('::'+a.atom_id)),six_atoms:(doc.data.dietary_lever_atoms||[]).filter(a=>r.id.endsWith('::'+a.atom_id))},publication:'qualified PM-network evidence only',food_projection:'blocked; no parent food inheritance'};
});
const growth=[];
for(const file of fs.readdirSync('docs/foods').filter(f=>f.endsWith('.md'))){const text=fs.readFileSync('docs/foods/'+file,'utf8');for(const [i,line]of text.split('\n').entries())if(/bifidobacterium/i.test(line)&&/support|growth|prebiotic/i.test(line))growth.push({food:file.slice(0,-3),record:'docs/foods/'+file,line:i+1,statement:line,classification:'existing dietary-growth-support statement; not food occurrence',qualification:'Not a ranked food source, strain assignment or independently verified intervention claim.'});}
const ledger={authority:policy.authority,parents,children,growth_support:growth,restrictions:['No new food ribbons or recipe edges','Parent evidence never inherits child effects or quantities','Citrus-pectin and protocol-specific restrictions retained','Ranking remains top ten, provisional >=10%, minimum two comparable foods']};
fs.writeFileSync(out+'evidence-ledger.json',JSON.stringify(ledger,null,2)+'\n');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceSummary=p=>p.source.observations?.length?p.source.observations.map(o=>'<p>'+esc((o.range?o.range.join('–'):o.value)+' '+o.unit+'; '+o.basis+'; '+(o.preparation||p.source.preparation||'Preparation unresolved'))+'</p><p>'+esc(o.unranked_reason)+'</p>').join(''):'<p>Quantity not established — not ranked. Cultivar and extraction limitations retained below.</p>';
const detail=x=>'<pre>'+esc(JSON.stringify(x,null,2))+'</pre>';
const body='<h1>Food Wheel evidence ledger</h1><p>Canonical relationships, separate from ranked ribbons. Food occurrence, microbial growth support and experimental PM evidence are different claims.</p><h2>Documented, unranked parent food sources</h2>'+parents.map(p=>'<details><summary>'+esc(p.food+' → '+p.substance+' → '+p.pm)+'</summary>'+sourceSummary(p)+detail(p)+'</details>').join('')+'<h2>Qualified experimental child–PM relationships</h2>'+children.map(c=>'<article id="'+esc(c.substance_id)+'"><h3>'+esc(c.identity.title)+' → '+esc(c.relationship.pm)+'</h3><p>'+esc(c.observed_endpoints)+'</p><p>'+esc(c.limitations_and_nulls)+'</p><a href="'+esc(c.relationship.substance_page)+'">Canonical identity and documentation</a><details><summary>Canonical evidence, admission and food-projection restrictions</summary>'+detail(c)+'</details></article>').join('')+'<h2>Bifidobacterium growth support — not food occurrence</h2><p>These are existing food-page statements, not evidence that the foods contain Bifidobacterium. They do not establish NCC2705 identity or efficacy.</p>'+growth.map(g=>'<details><summary>'+esc(g.food)+'</summary>'+detail(g)+'</details>').join('');
fs.writeFileSync(out+'evidence-ledger.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Food Wheel evidence ledger</title><style>body{background:#090d16;color:#e8edf7;font:16px/1.6 system-ui;max-width:1000px;margin:auto;padding:24px}a{color:#90bdff}details,article{border:1px solid #445;padding:16px;margin:16px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px}summary{cursor:pointer}</style><a href="./">Back to Food Wheel</a>'+body+'</html>');
// Correct only stale scope labels; do not alter selection arrays, ribbons or scientific admissions.
let html=fs.readFileSync(out+'index.html','utf8');const parts=html.split('<script>const DATA='),end=parts[1].indexOf(';const $='),data=JSON.parse(parts[1].slice(0,end));
for(const c of data.network.connections)for(const r of c.records||[]){const canonical=fresh.relationships.find(x=>x.id===r.id);if(canonical&&/KC|UPSTREAM/.test(r.id)&&['pectin','resistant-starch'].includes(r.substance)){r.route='KC/resource supply';r.status='Contextual';r.relationship_scope=canonical.relationship_type;r.scientific_admission=canonical.scientific_admission;}}
data.evidence_ledger={url:'evidence-ledger.html',data:'evidence-ledger.json',experimental_relationships:children.map(c=>({id:c.relationship_id,substance:c.substance_id,pm:c.relationship.pm,status:c.publication}))};
let shell=parts[0];if(!shell.includes('href="evidence-ledger.html"'))shell=shell.replace('</style>','</style><nav><a style="color:#90bdff" href="evidence-ledger.html">Food and experimental evidence ledger</a></nav>');
if(!shell.includes('href="evidence-ledger.html"'))throw Error('Ledger navigation insertion failed');
fs.writeFileSync(out+'index.html',shell+'<script>const DATA='+JSON.stringify(data).replaceAll('<','\\u003c')+parts[1].slice(end));
console.log(JSON.stringify({parent_connections:parents.length,children:children.length,growth_support_statements:growth.length}));
