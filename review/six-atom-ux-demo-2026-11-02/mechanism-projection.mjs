import {mechanismSummary} from '../../scripts/lib/intervention-moa-contract.mjs';
import {createHash} from 'node:crypto';
export const fingerprint=a=>createHash('sha256').update(JSON.stringify(a)).digest('hex');
export function projectMechanism(record,terms){
 const a=record.atom3,t=terms[a.mechanismRef];
 if(!t?.label||!a.moa||!a.evidenceStatus)throw Error('Incomplete mechanism or MoA');
 if(record.reviewedMoAFingerprint!==fingerprint(a))throw Error('MoA changed: summary alignment review required');
 mechanismSummary({intervention:'demo',interventionType:'demo',biologicalRelationship:{moa:{status:'identified',mechanismRef:a.mechanismRef,description:a.moa,summary:t.label,evidenceQualification:a.evidenceStatus,semanticReview:{status:'reviewed',rationale:'Owner worked examples; full MoA qualification retained; fingerprint guards subsequent edits.'}},measuredEffect:'Separate endpoint in source record',pmRelevance:'Separate PM relevance in source record'},limitations:[{type:'Evidence qualification',text:a.evidenceStatus}]});
 return {mechanismRef:a.mechanismRef,mechanism:t.label,evidenceStatus:a.evidenceStatus};
}
