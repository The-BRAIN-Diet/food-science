import React, {useEffect,useState} from 'react';
import {createPortal} from 'react-dom';
import {previewCuratedReferences,curatedSourcesFor,withPreviewCuratedSources} from './SecCalibrationPreview/curatedSources.mjs';
import {sameCuratedReferences,sameSourcesFor} from './SecCalibrationPreview/sameSources.mjs';

// Reuse the pilot's verified accessions only; no dietary decisions are inferred.
export function pmCuratedSources(pmId:string,atomId?:string) {
  if(pmId==='BRS2-FM1-PM3')return atomId?sameSourcesFor(atomId):sameCuratedReferences;
  if(pmId!=='BRS1-FM4-PM9')return [];
  if(!atomId)return previewCuratedReferences;
  const enriched=withPreviewCuratedSources({pm_id:pmId,dietary_input_traceability:[{atom_id:atomId}]});
  return curatedSourcesFor(enriched.dietary_input_traceability[0].evidence_source?.pathway_resources);
}

export function PmCuratedReferences({pmId}:{pmId:string}) {
  return <><h3>Curated biochemical references</h3><ul>{pmCuratedSources(pmId).map((s:any)=><li id={s.anchor} key={s.anchor}>[{s.label}] {s.database}: {s.title}. {s.accession}. {s.scope} Accessed {s.accessed}. <a href={s.href}>Authoritative record</a> · <a href={pmId==='BRS2-FM1-PM3'?'#pm3-f1':'#pm9-f1'}>Return to biochemical context</a></li>)}</ul></>;
}

export function PmCuratedEvidence({data}:{data:any}) {
  const [slots,setSlots]=useState<Array<{node:HTMLElement;atomId:string}>>([]);
  useEffect(()=>{
    const root=document.querySelector('.theme-doc-markdown');if(!root)return;
    const update=()=>{
      const next:Array<{node:HTMLElement;atomId:string}>=[];
      root.querySelectorAll<HTMLLIElement>('li[data-pm-input-label]').forEach(li=>{
        const p=data.dietary_lever_presentations?.find((p:any)=>p.label===li.dataset.pmInputLabel&&p.presentation_section===li.dataset.pmInputSection);
        if(!p||!pmCuratedSources(data.pm_id,p.atom_id).length)return;
        const evidence=li.querySelector<HTMLElement>(':scope > .brs-dietary-lever-detail .brs-dietary-lever-detail-evidence');if(!evidence)return;
        let slot=evidence.querySelector<HTMLElement>('[data-pm-curated-slot]');
        if(!slot){slot=document.createElement('span');slot.dataset.pmCuratedSlot=p.atom_id;evidence.append(slot);}
        next.push({node:slot,atomId:p.atom_id});
      });
      setSlots(old=>old.length===next.length&&old.every((s,i)=>s.node===next[i].node&&s.atomId===next[i].atomId)?old:next);
    };
    update();const observer=new MutationObserver(update);observer.observe(root,{childList:true,subtree:true});return()=>observer.disconnect();
  },[data]);
  return <>{slots.map(slot=>createPortal(<span> · {pmCuratedSources(data.pm_id,slot.atomId).map((s:any)=><React.Fragment key={s.anchor}><a href={'#'+s.anchor}>[{s.label}] {s.database}</a>{' · '}</React.Fragment>)}</span>,slot.node,slot.atomId))}</>;
}
