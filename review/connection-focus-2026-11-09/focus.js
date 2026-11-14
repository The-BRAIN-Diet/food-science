// Widen both endpoint arcs around their existing centres. Preserve radius,
// routing, colour and relationship membership; no added outline or global scale.
function widenRibbon(d,factor){
 if(factor===1)return d;
 const num='(-?[\\d.]+(?:e[+-]?\\d+)?)';
 const re=new RegExp('^M'+num+','+num+'A'+num+','+num+',0,0,1,'+num+','+num+'Q0,0,'+num+','+num+'A'+num+','+num+',0,0,1,'+num+','+num+'Q0,0,'+num+','+num+'Z$','i');
 const m=d.match(re);if(!m)throw Error('Unrecognised ribbon geometry');
 const [x1,y1,r1,ry1,x2,y2,x3,y3,r2,ry2,x4,y4]=m.slice(1).map(Number);
 const expand=(ax,ay,bx,by,r)=>{const a=Math.atan2(ay,ax),b=Math.atan2(by,bx);let span=Math.atan2(Math.sin(b-a),Math.cos(b-a));const mid=a+span/2;return [r*Math.cos(mid-span*factor/2),r*Math.sin(mid-span*factor/2),r*Math.cos(mid+span*factor/2),r*Math.sin(mid+span*factor/2)];};
 const [a,b,c,e]=expand(x1,y1,x2,y2,r1),[f,g,h,i]=expand(x3,y3,x4,y4,r2);
 return `M${a},${b}A${r1},${ry1},0,0,1,${c},${e}Q0,0,${f},${g}A${r2},${ry2},0,0,1,${h},${i}Q0,0,${a},${b}Z`;
}
function applyFocusWidth(filtered){
 const choice=$('#focusWidth').value;
 const multiplier=!focus?1:choice==='auto'?1.5:Number(choice);
 for(const el of all('.food-link,.link')){
  if(!el.dataset.originalD)el.dataset.originalD=el.getAttribute('d');
  const selected=!!focus&&filtered.some(e=>e.substance_id===el.dataset.substance&&(el.classList.contains('food-link')?e.food_id===el.dataset.food:system(e)===el.dataset.system));
  el.setAttribute('d',widenRibbon(el.dataset.originalD,selected?multiplier:1));
  el.dataset.widthMultiplier=String(selected?multiplier:1);
  if(el.classList.contains('link')){
   if(!el.dataset.originalOpacity)el.dataset.originalOpacity=el.getAttribute('fill-opacity')||'1';
   el.setAttribute('fill-opacity',selected?'.80':el.dataset.originalOpacity);
  }
 }
}
