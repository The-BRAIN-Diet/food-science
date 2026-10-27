import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';
import DietaryPathways from '@site/src/components/DietaryPathways';
/** Compatibility entry point: use the same admission-qualified index as PM/food pages. */
export default function DietaryOriginProjection({target,pmId}:{target:string;pmId:string;transformationLabel?:string}) {
 const data=usePluginData('ontology-projection') as any;
 const normalized=String(target||'').toLowerCase();
 const pathway=data?.dietaryPathways?.paths?.find((p:any)=>p.target_id.toLowerCase()===normalized||p.target_title.toLowerCase()===normalized);
 // A missing pathway is not a substitute for a related-substance account. Leave that page's own dietary-origin text in place.
 if(!pathway) return null;
 return <DietaryPathways targetId={pathway.target_id} pmId={pmId}/>;
}
