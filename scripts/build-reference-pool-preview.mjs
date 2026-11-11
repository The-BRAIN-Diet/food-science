import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import path from 'node:path';

const dir='review/ranked-food-reconciliation/reference-pool';
const wheel=dir+'/explore/food-wheel';
for(const view of ['pm-explorer','food-wheel']){
  fs.mkdirSync(dir+'/explore',{recursive:true});
  fs.cpSync('static/explore/'+view,dir+'/explore/'+view,{recursive:true});
}
for(const script of ['generate-ranked-food-sources','build-pm-explorer-sources','build-food-wheel-unranked']){
  const run=spawnSync(process.execPath,['scripts/'+script+'.mjs','--reference-preview'],{stdio:'inherit'});
  if(run.status!==0)throw Error(script+' failed');
}
const read=file=>JSON.parse(fs.readFileSync(file));
const snapshot=read(dir+'/ranking.json');
const explorer=read(dir+'/explore/pm-explorer/pm-sources.json');
const network=read(wheel+'/display-network.json');
const ledger=read(wheel+'/evidence-ledger.json');
const details=explorer.foods.filter(s=>s.layer!=='Ranked');
const publicTargets=new Set(explorer.relationships.filter(r=>r.dietary_input===true &&
 r.projection_status!=='blocked' && r.network_activation!=='held').map(r=>r.pm+'|'+r.substance_id));
const observations=new Map();
for(const file of fs.readdirSync('src/data').filter(f=>f.endsWith('InputMapping.generated.json'))){
  for(const s of read(path.join('src/data',file)).food_sources){
    for(const o of s.observations)if(o.verified && !o.ranking_hold && !o.publication_hold &&
      !['internal-only','excluded-error','substance-only'].includes(o.public_display)){
      observations.set([s.food_id,s.substance_id,o.record].join('|'),o);
    }
  }
}
const comparisonEvidence=[];
for(const t of snapshot.targets){
 if(!publicTargets.has(t.target_id)||t.hold)continue;
 for(const x of t.excluded){
  const o=observations.get([x.food_id,t.substance_id,x.record].join('|'));
  if(!o||!(/outside maximum|one-tenth threshold|separate .*pool|Active cobalamin identity unverified/.test(x.reason)))continue;
  comparisonEvidence.push({pm:t.pm_id,substance:t.substance_id,food:x.food_id,reason:x.reason,observation:o});
 }
}
ledger.documentedSources=details;
ledger.comparisonEvidence=comparisonEvidence;

fs.writeFileSync(wheel+'/evidence-ledger.json',JSON.stringify(ledger));
const escape=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const rows=[...details.map(r=>[r.food,r.substance,r.pm,r.layer]),...comparisonEvidence.map(r=>[r.food,r.substance,r.pm,r.reason])];
const table='<h2>Documented sources and comparison decisions</h2><p><a href="evidence-ledger.json">Download the evidence and source observations</a></p><table><tr><th>Food</th><th>Substance</th><th>PM</th><th>Evidence status</th></tr>'+rows.map(row=>'<tr>'+row.map(v=>'<td>'+escape(v)+'</td>').join('')+'</tr>').join('')+'</table>';
const ledgerPage=wheel+'/evidence-ledger.html';
fs.writeFileSync(ledgerPage,fs.readFileSync(ledgerPage,'utf8').replace('</html>',table+'</html>'));
const html=fs.readFileSync(wheel+'/index.html','utf8');
const start=html.indexOf('<script>const DATA=')+'<script>const DATA='.length;
const end=html.indexOf(';const $=',start);
fs.writeFileSync(wheel+'/index.html',html.slice(0,start)+JSON.stringify(network).replaceAll('<','\\u003c')+html.slice(end));
fs.writeFileSync(wheel+'/about.html','<meta charset="utf-8"><h1>Reference-pool candidate</h1><p>Up to ten foods per target, at least two comparable foods, provisional 10% minimum Relative Source Power. '+snapshot.counts.connections+' ranked connections. Dried culinary ingredients use their as-sold weight. Formulated concentrates require a matched product pool.</p><a href="evidence-ledger.html">Evidence ledger</a>');
