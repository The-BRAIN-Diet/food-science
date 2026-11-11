const esc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const link=x=>`<a href="${esc(x.href)}">${esc(x.title)}</a>`;
/** Existing dietary source styling; no new disclosure, atom, score or technical panel. */
export function renderInterventionLinks(record) {
 if(!record?.identities.length)return '';
 const foods=record.identities.filter(x=>x.kind==='food'),substances=record.identities.filter(x=>x.kind==='substance');
 const lines=[];
 if(foods.length)lines.push(`Food identities: ${foods.map(link).join(' · ')}`);
 if(substances.length)lines.push(`Substance identities: ${substances.map(link).join(' · ')}`);
 if(record.composition.length)lines.push(`Documented composition: ${record.composition.map(e=>`${link(foods.find(x=>x.id===e.food_id))} → ${link(substances.find(x=>x.id===e.substance_id))}`).join(' · ')}`);
 if(record.origin==='substance-led') {
  const sources=[...new Map(record.sources.filter(x=>x.food).map(x=>[x.food_id,x.food])).values()];
  if(sources.length)lines.push(`<details class="pm-input-food-sources"><summary>Food sources — composition only (${sources.length})</summary>${sources.map(x=>`<div>${link(x)}</div>`).join('')}</details>`);
 }
 const roles=record.identities.filter(x=>x.role&&x.role!=='Named intervention identity; see the tested protocol and comparator'&&x.role!=='Linked in this intervention’s six atoms; see its preparation, comparator and endpoint boundaries').map(x=>`${esc(x.title)}: ${esc(x.role)}`);
 return `<div class="brs-dietary-lever-foods" data-intervention-food-links="${esc(record.atom_id)}">${lines.map(x=>`<div>${x}</div>`).join('')}<small>Identity and composition links; the tested preparation, comparator and exposure remain in the six atoms. Constituent presence does not establish mediation or an equivalent food intervention.${roles.length?' '+roles.join(' '):''}</small></div>`;
}
export function attachInterventionLinks(root,records) {
 const inserted=[];
 for(const row of records){
  if(!row.identities.length)continue;
  const existing=[...root.querySelectorAll('[data-intervention-food-links]')].some(x=>x.getAttribute('data-intervention-food-links')===row.atom_id);
  if(existing)continue;
  const key=row.atom_id.toLowerCase();
  const host=[...root.querySelectorAll('[id]')].find(x=>x.id===key||x.id.endsWith('-'+key));
  const trigger=host?.querySelector('.brs-dietary-lever-trigger')||[...root.querySelectorAll('.brs-dietary-lever-trigger')].find(x=>[row.label,row.input].includes(x.textContent?.trim()));
  if(!trigger)continue;
  const box=root.ownerDocument.createElement('div');box.innerHTML=renderInterventionLinks(row);const node=box.firstElementChild;
  if(node){trigger.after(node);inserted.push(node);}
 }
 return ()=>inserted.forEach(x=>x.remove());
}
