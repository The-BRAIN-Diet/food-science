import {preparation, synergy as synergyNotes} from './dahl-notes.mjs';
import {ingredientSources} from './dahl-sources.mjs';
import {loadViewerData} from '../pm-explorer/load-data.mjs';

const node = (tag, text) => Object.assign(document.createElement(tag), {textContent: text});
async function render() {
  const [data, recipe, observations] = await Promise.all([loadViewerData('data.json','records'), loadViewerData('dahl.json'), loadViewerData('dahl-composition.json')]);
  data.recipeObservations=observations;
  const names = new Map(data.substances.map(s => [s.id, s.name]));
  const mechanisms = new Map(data.pms.map(p => [p.id,p]));
  const edges = [];
  const neutral = '#a7bacd';
  for (const ingredient of recipe.rows) {
    const id = ingredient.food_slug;
    const {groups, compatible} = ingredientSources(data,names,id);
    if (!groups.size) groups.set('',[]);
    const coverage = system => new Set(compatible.filter(r => mechanisms.get(r.pm)?.group === system.id).map(r => r.substance)).size;
    const primary = [...data.systems].sort((a,b) => coverage(b)-coverage(a))[0];
    const foodColour = primary && coverage(primary) ? primary.color : neutral;
    const food = choice(ingredient.display, 'food', foodColour);
    let first = true;
    for (const [sub, sources] of groups) {
      const row = document.createElement('tr');
      if (first) {
        const title = node('th',''); title.append(food); title.scope='row'; title.rowSpan=groups.size; row.append(title);
      }
      const substance = node('td','');
      const firstSystem = data.systems.find(system => sources.some(r => mechanisms.get(r.pm)?.group === system.id));
      const button = choice(names.get(sub)||sub||'—', 'sub', firstSystem?.color || neutral);
      if (sub) {
        substance.append(button);
        edges.push({from:food,to:button,food,sub:button,colour:firstSystem?.color || neutral,dashed:!sources.some(r=>r.layer==='Ranked')});
      } else substance.textContent='—';
      if (sources.length) button.append(node('small',[...new Set(sources.map(r=>[r.layer,r.preparation,r.value != null ? [r.value,r.unit,r.basis].join(' ') : null,r.classification].filter(Boolean).join(' · ')))].join(' / ')));
      else if(sub) button.append(node('small','Named in recipe'));
      row.append(substance);
      const targets = document.createElement('td');
      for (const system of data.systems) {
        const pms = [...new Set(sources.map(r=>r.pm))].map(k=>mechanisms.get(k)).filter(p=>p?.group===system.id);
        if (!pms.length) continue;
        const details=document.createElement('details'); details.style.setProperty('--system',system.color);
        const target = node('summary',system.id+' · '+system.name);
        details.append(target);
        edges.push({from:button,to:target,food,sub:button,colour:system.color,dashed:!sources.some(r=>mechanisms.get(r.pm)?.group===system.id && r.layer==='Ranked')});
        for (const pm of pms) {
          const link=node('a',pm.id+' · '+pm.title);
          link.href='../pm-explorer/?'+new URLSearchParams({brs:system.id,pm:pm.id,sub,food:id});link.title=sources.find(r=>r.pm===pm.id)?.pmLimitation || '';details.append(link);
        }
        targets.append(details);
      }
      if (!targets.childElementCount) targets.textContent=id?'No matching viewer route':'No mapped recipe food';
      row.append(targets);
      if (first) {
        const prep = node('td',preparation[id] || (ingredient.optional ? preparation.finish : ''));prep.rowSpan=groups.size;
        const synergy = node('td',synergyNotes[id] || '');
        synergy.rowSpan=groups.size;row.append(prep,synergy);
      }
      document.querySelector('#rows').append(row);first=false;
    }
  }
  connect(edges);
  document.querySelector('#status').textContent='';
}
render().catch(()=>document.querySelector('#status').textContent='Recipe connections could not be loaded. Reload to try again.');

function choice(label, type, colour) {
  const el = node('button', label);
  el.className = 'node ' + type;
  el.style.setProperty('--colour',colour);
  el.setAttribute('aria-pressed','false');
  return el;
}

function connect(edges) {
  const frame=document.querySelector('.recipe-network');
  const svg=frame.querySelector('svg');
  let selected=null;
  function draw() {
    svg.replaceChildren();
    const bounds=frame.getBoundingClientRect();
    for(const edge of edges) {
      const a=edge.from.getBoundingClientRect(), b=edge.to.getBoundingClientRect();
      const x=a.right-bounds.left, y=a.top+a.height/2-bounds.top;
      const end=b.left-bounds.left, bottom=b.top+b.height/2-bounds.top;
      const mid=(x+end)/2;
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',`M ${x} ${y} C ${mid} ${y}, ${mid} ${bottom}, ${end} ${bottom}`);
      path.setAttribute('fill','none');
      path.setAttribute('stroke',edge.colour);
      if(edge.dashed) path.setAttribute('stroke-dasharray','3 4');
      const active=selected===edge.food || selected===edge.sub;
      path.setAttribute('opacity',selected ? (active?'1':'.09') : '.7');
      path.setAttribute('stroke-width',active?'2.5':'1.5');
      svg.append(path);
    }
  }
  for(const button of frame.querySelectorAll('button.node')) button.onclick=()=>{
    selected=selected===button?null:button;
    for(const el of frame.querySelectorAll('button.node')) {
      el.setAttribute('aria-pressed',String(el===selected));
      el.classList.toggle('active',el===selected);
      el.classList.toggle('dim',Boolean(selected && el!==selected && !edges.some(e=>(e.food===selected||e.sub===selected)&&(e.food===el||e.sub===el))));
    }
    draw();
  };
  frame.addEventListener('toggle',draw,true);
  new ResizeObserver(draw).observe(frame);
  draw();
}
