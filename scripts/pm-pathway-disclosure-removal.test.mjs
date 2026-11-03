import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const renderer=fs.readFileSync('src/lib/pmInputFoodDisclosure.ts','utf8');
const enhancer=fs.readFileSync('src/components/PmDietaryLeverEnhancer.tsx','utf8');
test('PM food renderer cannot inject the withdrawn pathway disclosure',()=>{
 assert.doesNotMatch(renderer,/pm-input-pathway-evidence|Dietary pathway evidence|audit\.append\(disclosure\)/);
 assert.doesNotMatch(enhancer,/pathwayData|usePluginData\("ontology-projection"\)/);
});
test('approved food and six-atom enhancement remain wired',()=>{
 assert.match(enhancer,/enhanceListItem\(li, disclosure, root\)/);
 assert.match(enhancer,/attachInputFoodDisclosure\(li, inputFoodData, String\(frontMatter.pm_id \|\| ""\), parsed.label, section\)/);
 assert.match(enhancer,/renderDietaryConfidence/);
 assert.match(renderer,/createFoodSourceDetails/);
 assert.match(renderer,/renderFoodMappingNotes/);
});
