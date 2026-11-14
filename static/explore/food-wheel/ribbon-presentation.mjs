// Expand each circular ribbon endpoint around its midpoint; retain radii and routing.
export function widenRibbon(d,factor=1.5){
 const n='(-?[\\d.eE+]+)';const re=new RegExp('^M'+n+','+n+'A'+n+','+n+',0,0,1,'+n+','+n+'Q0,0,'+n+','+n+'A'+n+','+n+',0,0,1,'+n+','+n+'Q0,0,'+n+','+n+'Z$');
 const m=d.match(re);if(!m)return d;const v=m.slice(1).map(Number);
 function pair(x,y,u,w){const a=Math.atan2(y,x),b=Math.atan2(w,u);let delta=b-a;while(delta>Math.PI)delta-=2*Math.PI;while(delta<-Math.PI)delta+=2*Math.PI;const mid=a+delta/2,r=Math.hypot(x,y);return [mid-delta*factor/2,mid+delta*factor/2].map(t=>[r*Math.cos(t),r*Math.sin(t)].join(','));}
 const [a,b]=pair(v[0],v[1],v[4],v[5]),[c,e]=pair(v[6],v[7],v[10],v[11]);return `M${a}A${v[2]},${v[3]},0,0,1,${b}Q0,0,${c}A${v[8]},${v[9]},0,0,1,${e}Q0,0,${a}Z`;
}
export function contrastOpacity(day,systems,base){return day&&systems.some(s=>s==='BRS2'||s==='BRS5')?Math.max(base,.68):base;}
/** Standalone SVG rules. Page selectors such as body.day-mode do not travel with the file. */
export function wheelExportStyle(day){
 return day
  ? '.brs-label{fill:#111827;stroke:#f5f7fb;stroke-width:4px;paint-order:stroke}.wheel-ground{fill:#f5f7fb}.wheel-hub{fill:#eaf0f7}.food-link,.link{filter:none}text{fill:#172338;paint-order:stroke;stroke:#f5f7fb;stroke-width:.5px}.food text,.entity text{fill:#080f19;stroke-width:0}'
  : '.brs-label{fill:#edf3ff;stroke:#090d16;stroke-width:4px;paint-order:stroke}.wheel-ground{fill:#090d16}.wheel-hub{fill:#090d16}';
}
