import {scfaRelatedSources} from './scfaRelatedSources.mjs';
export function butyrateRelatedSources(relationships,foodSources){return scfaRelatedSources(relationships.filter(r=>r.substance_id==='butyrate'),foodSources);}
