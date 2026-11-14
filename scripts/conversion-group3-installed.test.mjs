import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDietaryPathwayIndex} from '../src/lib/dietaryPathways.mjs';
for (const status of ['draft-only','blocked','internal-only']) test(`assessment ${status} prevents completed projection`,()=>{
 const r={id:'PM::DIT',pm:'PM',scientific_admission:'admitted',substance_id:'source',ontology_connections:{conversion:'supported'},scientific_assessment:{canonical_substance_id:'source',active_target_id:'target',conversion_pathway:[{from:'source',to:'target',process:'conversion'}]}};
 const run=relationship=>buildDietaryPathwayIndex({scopes:[{relationships:[relationship]}]});
 assert.equal(run(r).paths.length,1);
 const held=run({...r,scientific_assessment:{...r.scientific_assessment,projection_status:status}});
 assert.equal(held.paths.length,0);assert.equal(held.edges.length,0);assert.equal(held.blocked[0].reason,status);
});
