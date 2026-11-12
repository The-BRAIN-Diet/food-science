// Presentation-only operations on the existing qualified graph. No ranking or admission decisions.
export const ownedParameters=['foods','food','view','mode','brs','substance','rsp'];
export function systemOf(e){if(e.brs!=='BRS-X')return e.brs;const m=e.pm_id.match(/^BRS-X\(([^-]+)-/);return m?'BRS-X/'+m[1].toLowerCase():e.brs;}
export function normalizeState(input,data){
 const allowed=new Set(data.foods.map(f=>f.id));
 const foods=[...new Set((input.foods||[]).map(id=>id==='lupin-beans'?'lupins':id).filter(id=>allowed.has(id)))];
 const multiple=input.multiple===true||foods.length>1;
 return {foods,multiple,rsp:[10,25,50,80].includes(Number(input.rsp))?Number(input.rsp):10,mode:input.mode==='compare'?'compare':'combined',brs:input.brs==='off'||data.network.systems.includes(input.brs)?input.brs:'',substance:data.network.inventory.some(s=>s.id===input.substance&&s.inclusion==='included')?input.substance:''};
}
export function readState(url,data){const p=new URL(url).searchParams;return normalizeState({foods:(p.get('foods')||p.get('food')||'').split(',').filter(Boolean),multiple:p.get('view')==='multiple',mode:p.get('mode'),rsp:p.get('rsp'),brs:p.get('brs'),substance:p.get('substance')},data);}
export function stateURL(url,state){const u=new URL(url);for(const k of ownedParameters)u.searchParams.delete(k);if(state.rsp&&state.rsp!==10)u.searchParams.set('rsp',state.rsp);if(state.foods.length)u.searchParams.set('foods',state.foods.join(','));if(state.multiple)u.searchParams.set('view','multiple');if(state.mode==='compare')u.searchParams.set('mode','compare');if(state.brs)u.searchParams.set('brs',state.brs);if(state.substance)u.searchParams.set('substance',state.substance);return u.href;}
export function profile(data,state){
 const edges=(data.displaySelections||data.canonicalNetworks.topFive.selections).filter(e=>passesRSP(e,state.rsp)&&((!state.foods.length&&(state.brs!=='off'||state.substance))||state.foods.includes(e.food_id))&&(!state.brs||state.brs==='off'||systemOf(e)===state.brs)&&(!state.substance||e.substance_id===state.substance));
 const substances=new Map(),biological=new Map();
 for(const e of edges){if(!substances.has(e.substance_id))substances.set(e.substance_id,new Set());substances.get(e.substance_id).add(e.food_id);const key=e.substance_id+'|'+systemOf(e);if(state.brs!=='off'){if(!biological.has(key))biological.set(key,new Set());biological.get(key).add(e.food_id);}}
 return {edges,substances,biological,foods:new Set(edges.map(e=>e.food_id)),systems:new Set(state.brs==='off'?[]:edges.map(systemOf)),targets:new Set(edges.map(e=>e.substance_id+'|'+e.pm_id)),pms:new Set(edges.map(e=>e.pm_id)),shared:[...substances].filter(([,f])=>f.size>1)};
}

export function foodSelection(state,id){
 const foods=state.multiple?(state.foods.includes(id)?state.foods.filter(f=>f!==id):[...state.foods,id]):[id];
 return {...state,foods,substance:''};
}

// Compare colours identify food contributors only. Later groups use lighter shades.
export function compareColor(index){const hues=[0,28,55,115,175,200,250,300];return `hsl(${hues[index%8]} 95% ${[65,77,57][Math.floor(index/8)%3]}%)`;}

export function passesRSP(edge,threshold=10){return ['documented-unranked','contextual-related'].includes(edge.status)||(Number.isFinite(edge.relative_power)&&edge.relative_power>=threshold);}
