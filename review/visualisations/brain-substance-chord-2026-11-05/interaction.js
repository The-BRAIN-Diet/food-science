let selected=null,hovered=null;
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 const focus=hovered||selected,context=$('#mode').value==='contextual',foundation=$('#foundation').checked;
 let visible=0;
 all('.link').forEach(el=>{const d=el.dataset,allow=(context||d.status==='Admitted')&&(foundation||d.foundation!=='true');const match=!focus||(focus.kind==='substance'?d.substance===focus.id:d.system===focus.id);el.style.display=allow?'':'none';el.style.opacity=match?'1':'.025';if(allow&&match)visible++;});
 all('.entity').forEach(el=>{const s=DATA.inventory.find(s=>s.id===el.dataset.substance);el.style.display=foundation||s.category!=='Foundation'?'':'none';const match=!focus||(focus.kind==='substance'?s.id===focus.id:DATA.connections.some(e=>e.substance===s.id&&e.brs===focus.id&&(context||e.status==='Admitted')));el.style.opacity=match?'1':'.2';});
 $('#status').textContent=visible+' relationships highlighted';
 if(!focus){$('#selection').textContent='Explore the network';return;}
 const s=focus.kind==='substance'?DATA.inventory.find(s=>s.id===focus.id):null;
 $('#selection').textContent=s?s.name:focus.id+' · '+DATA.names[DATA.systems.indexOf(focus.id)];
 let es=DATA.connections.filter(e=>(s?e.substance===s.id:e.brs===focus.id)&&(context||e.status==='Admitted'));
 $('#details').innerHTML=(s?`<p><a href="https://thebraindiet.org${safe(s.page)}" target="_blank" rel="noopener">Canonical substance</a></p><p>${s.category} · admitted BRS reach <b>${s.reach}</b> · ${s.pairs} BRS pairs</p><small>Placement: ${s.primary}; not exclusive ownership. SOP association alone is contextual.</small>`:'')+es.map(e=>`<h3>${safe(s?e.brs:DATA.inventory.find(x=>x.id===e.substance)?.name||e.substance)} · ${e.status}</h3>${e.records.map(r=>`<details><summary>${safe(r.id)} · ${r.status}</summary><p>${safe(r.route)} ${safe(r.type)} ${safe(r.classification)}</p><p>${safe(r.source)}</p><p>${safe(JSON.stringify(r.evidence))}</p><p>${safe(r.limitation)}</p></details>`).join('')}`).join('');
}
for(const el of all('.entity,.system')){const focus=()=>({kind:el.dataset.substance?'substance':'system',id:el.dataset.substance||el.dataset.system});el.addEventListener('mouseenter',()=>{hovered=focus();render();});el.addEventListener('mouseleave',()=>{hovered=null;render();});el.addEventListener('click',()=>{selected=focus();hovered=null;render();});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selected=focus();hovered=null;render();}});}
$('#search').onchange=e=>{selected=e.target.value?{kind:'substance',id:e.target.value}:null;render();};
$('#mode').onchange=render;$('#foundation').onchange=render;
$('#reset').onclick=()=>{selected=hovered=null;$('#search').value='';$('#selection').textContent='Explore the network';$('#details').textContent='Select a substance or BRS arc to inspect its canonical relationships. Connectivity is not efficacy.';render();};
$('#export').onclick=()=>{const b=new Blob([new XMLSerializer().serializeToString($('#chart svg'))],{type:'image/svg+xml'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='brain-chord-selection.svg';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};render();
