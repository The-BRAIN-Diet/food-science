// Existing Food Wheel SVG geometry, extracted without visual changes.
import {ribbon,arc} from 'd3';
export function renderFoodWheel(data,base){
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inner=base.split('<g transform="translate(720 720)">')[1].split('</g><text x="56" y="1338"')[0];const positions=new Map();for(const m of inner.matchAll(/<g class="entity" data-substance="([^"]+)"[\s\S]*?<text transform="translate\(([-\d.]+) ([-\d.]+)\)/g)){const s=data.network.inventory.find(s=>s.id===m[1]),x=+m[2],y=+m[3];positions.set(m[1],{angle:Math.atan2(x,-y),radius:Math.hypot(x,y)+(s.category==='Foundation'?10:-9)});}
// Place foods near their connected targets. Each distinct documented target has
// equal weight; proposed-only links do not influence placement. Circular means
// avoid the discontinuity at twelve o'clock. Uniform spacing keeps labels apart.
const tau=2*Math.PI,affinity=f=>{const targets=[...new Set(data.foodPairs.filter(p=>p.food===f.id&&p.existing).map(p=>p.substance))];let x=0,y=0;for(const id of targets){const p=positions.get(id);if(p){x+=Math.sin(p.angle);y+=Math.cos(p.angle);}}return (Math.atan2(x,y)+tau)%tau;};
const foods=[...data.foods].sort((a,b)=>affinity(a)-affinity(b)||a.title.localeCompare(b.title)),foodpos=new Map();
// Fit equally spaced label slots to their desired circular angles by rotation.
let sx=0,sy=0;foods.forEach((f,i)=>{const delta=affinity(f)-(i+.5)*tau/foods.length;sx+=Math.sin(delta);sy+=Math.cos(delta);});const rotation=Math.atan2(sx,sy);
foods.forEach((f,i)=>foodpos.set(f.id,{angle:((i+.5)*tau/foods.length+rotation+tau)%tau,radius:660}));
const svg=[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2200 2200" width="2200" height="2200" role="img" aria-label="BRAIN food substance and system chord wheel"><rect width="2200" height="2200" fill="#090d16"/><style>text{font-family:Arial,sans-serif}.food,.entity,.system{cursor:pointer}.food-link,.link{pointer-events:none}</style><text x="65" y="70" fill="#f2f4fb" font-size="32">BRAIN / Food → Substance → System</text><text x="65" y="107" fill="#a3b1c8" font-size="19">ADHD exemplar · select a food, substance or system · counts are connectivity, not efficacy</text><g transform="translate(1100 1100)">`];
// Reuse canonical system colours already rendered in the preserved network.
const systemColors=new Map([...inner.matchAll(/class="link"[^>]*data-system="([^"]+)"[^>]*fill="(#[0-9a-fA-F]+)"/g)].map(m=>[m[1],m[2]]));
const substanceFills=new Map();svg.push('<defs>');
for(const pair of data.foodPairs){const id=pair.id;const systems=[...new Set(pair.qualified.filter(e=>e.network==='approved').map(e=>e.brs==='BRS-X'?'BRS-X/'+e.pm_id.match(/^BRS-X\(([^-]+)-/)[1].toLowerCase():e.brs))];const colors=systems.map(id=>{if(!systemColors.has(id))throw Error('Missing system colour '+id);return systemColors.get(id);});const gid='food-system-'+substanceFills.size;substanceFills.set(id,colors.length===1?colors[0]:`url(#${gid})`);if(colors.length>1)svg.push(`<linearGradient id="${gid}" x1="0%" y1="0%" x2="100%" y2="100%">${colors.map((c,i)=>`<stop offset="${100*i/colors.length}%" stop-color="${c}"/><stop offset="${100*(i+1)/colors.length}%" stop-color="${c}"/>`).join('')}</linearGradient>`);}
svg.push('</defs>');
for(const p of data.foodPairs){const a=foodpos.get(p.food),b=positions.get(p.substance);if(!b)throw Error('Missing substance position '+p.substance);const d=ribbon()({source:{startAngle:a.angle-.0018,endAngle:a.angle+.0018,radius:a.radius},target:{startAngle:b.angle-.004,endAngle:b.angle+.004,radius:b.radius}});svg.push(`<path class="food-link" data-food="${esc(p.food)}" data-substance="${esc(p.substance)}" data-proposed="${!p.existing}" d="${d}" fill="${substanceFills.get(p.id)}" fill-opacity=".12" ${!p.existing?'style="display:none"':''}/>`);}
// Enlarge system labels only in this food-wheel preview.
const labelledInner=inner.replace(/(<text\b[^>]*font-size=")17("[^>]*>BRS[1-6]<\/text>)/g,'$126$2').replace(/(<text\b[^>]*font-size=")13("[^>]*pointer-events="none"[^>]*>)/g,'$119$2');
svg.push(labelledInner);
for(const f of foods){const p=foodpos.get(f.id),a=p.angle,deg=a*180/Math.PI,flip=deg>180,x=Math.sin(a)*677,y=-Math.cos(a)*677,size=f.targets>=8?22:f.targets>=5?20:f.targets>=3?18:16;svg.push(`<g class="food" data-food="${esc(f.id)}"  role="button" tabindex="0" aria-label="Select food ${esc(f.title)}"><path d="${arc()({innerRadius:657,outerRadius:664,startAngle:a-.005,endAngle:a+.005})}" fill="#b7c9dd"/><text transform="translate(${x} ${y}) rotate(${deg-90+(flip?180:0)})" text-anchor="${flip?'end':'start'}" dominant-baseline="middle" font-size="${size}" fill="#e3eaf4">${esc(f.title)} · ${f.targets}</text></g>`);}
svg.push('</g><text x="65" y="2110" fill="#a3b1c8" font-size="18">Food labels: unique power-qualified substance–PM connections. Provisional threshold 10%; maximum ten foods per target.</text><text x="65" y="2140" fill="#a3b1c8" font-size="18">No direct food–BRS chords. Target coverage is not nutrient density, dose adequacy or clinical benefit.</text></svg>');

return svg.join('');
}
