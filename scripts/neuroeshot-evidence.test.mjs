import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import {calculateRecipeNutrition} from '../src/utils/recipeNutritionCalculate.mjs';
const raw=fs.readFileSync('docs/recipes/Snacks/neuroeshot.md','utf8');
const recipe=matter(raw).data;
const foods=fs.readdirSync('docs/foods').filter(x=>x.endsWith('.md')).map(x=>{const {data}=matter(fs.readFileSync('docs/foods/'+x,'utf8'));return {title:data.title||x.slice(0,-3),permalink:'/docs/foods/'+(data.id||x.slice(0,-3)),frontMatter:data,tags:(data.tags||[]).map(label=>({label}))}});
test('approved food forms and scaled nutrition',()=>{
 assert.deepEqual(recipe.recipe_ingredients.map(x=>[x.quantity,x.unit,x.calculation_weight_g]),[[15,'g',15],[7.5,'ml',7.7],[2,'ml',2]]);
 assert.match(recipe.recipe_ingredients[0].composition_basis,/10140/);assert.match(recipe.recipe_ingredients[1].composition_basis,/167747/);assert.match(recipe.recipe_ingredients[2].composition_basis,/174528/);
 const r=calculateRecipeNutrition(recipe,foods);
 assert.equal(r.perServing.dha_mg,300);assert.equal(r.perServing.epa_mg,240);assert.equal(r.perServing.vitamin_b12_ug,7.05);assert.equal(r.byFood.folate_ug['Salmon Roe'],15);
 assert.equal(r.perServing.folate_ug,16.56);assert.equal(r.perServing.kcal,39.734);
 assert.ok(recipe.nutrition_unresolved.some(x=>x.key==='sodium_mg'));
});
test('ten distinct rows, correct placement, citations and real PM routes',()=>{
 const table=raw.split('## Biological Regulatory Systems — Ingredient Evidence Matrix')[1].split('## Extra Guidance')[0];
 const lines=table.split('\n').filter(x=>x.startsWith('|'));
 assert.equal(lines.length,14);assert.equal(lines[0],'| Food | Substance | BRS–PM / research context | Biological role / studied effect | Source evidence | Limitation |');
 assert.equal(new Set(lines.filter(x=>!x.startsWith('| Food |')&&!x.startsWith('| ---')).map(x=>x.split('|')[2].trim())).size,10);
 assert.match(raw,/RecipeNutrition details=\{frontMatter\} \/>\n\n## Biological/);
 const bib=fs.readFileSync('static/bibtex/BRAIN-diet.bib','utf8')+fs.readFileSync('static/bibtex/BRAIN-diet-sources.bib','utf8');
 for(const [,key] of raw.matchAll(/BRAIN-Diet-References#([\w-]+)/g)) assert.equal([...bib.matchAll(new RegExp('@\\w+\\{'+key+',','g'))].length,1,key);
 for(const [,route] of table.matchAll(/\]\(\/docs\/(biological-targets\/[^)]+)\)/g)) assert.ok(fs.existsSync('docs/'+route+'.mdx'),route);
 for(const line of lines.filter(x=>!x.startsWith('| Food |')&&!x.startsWith('| ---'))) {assert.equal(line.split('|').length,8);assert.match(line,/BRAIN-Diet-References#/);}
});
test('contextual substances remain unassigned and recipe does not imply dose or efficacy',()=>{
 for(const substance of ['Astaxanthin','Eriocitrin','Hesperidin']) assert.match(raw,new RegExp('\\| '+substance+' — present; amount/relevance unestablished \\| Research context; PM unassigned'));
 assert.match(raw,/TRPV1 sensory signalling — PM unassigned/);
 assert.match(raw,/Capsaicin dose and physiological response magnitude from 2 ml of sauce are unquantified/);
 assert.match(raw,/not dopamine or endorphin release/);assert.match(raw,/not a probiotic intervention/);
 assert.match(raw,/<RecipeFoods details=\{frontMatter\} \/>/);
 assert.doesNotMatch(raw,/total choline and phosphatidylcholine/);
});
test('all six linked substance rows retain existing canonical dietary admissions',()=>{
 const checks=[
 ['brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation','PM7-DIT-1','DHA'],
 ['brs3/fm3/brs3-fm3-pm8-eicosanoid-spm-balance','PM8-DIT-1','EPA'],
 ['brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support','PM6-DIT-2','Phosphatidylcholine'],
 ['brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation','PM1-DIT-2','Vitamin B9 (folate)'],
 ['brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation','PM1-DIT-4','Vitamin B12'],
 ['brs3/fm2/brs3-fm2-pm6-antioxidant-network-recycling','PM6-DIT-1','Vitamin C']];
 for(const [p,id,name] of checks){const d=matter(fs.readFileSync('docs/biological-targets/'+p+'.mdx','utf8')).data;const atom=d.dietary_input_traceability.find(a=>a.atom_id===id);assert.equal(atom.dietary_input,true,id);assert.ok(atom.input.startsWith(name),`${id}: ${atom.input}`);assert.ok(atom.evidence_limitation);}
});

test('amounts and experimental observations stay in their own columns',()=>{
 const lines=raw.split('\n').filter(x=>x.startsWith('|') && x.includes('supplied')===false);
 const rows=lines.filter(x=>!x.startsWith('| Food |')&&!x.startsWith('| ---')).map(x=>x.split('|'));
 const dha=rows.find(c=>c[2].includes('DHA'));
 assert.match(dha[2],/300 mg/);assert.doesNotMatch(dha[4],/mg|piglet|labelled/i);assert.match(dha[5],/piglets/);
 const r=calculateRecipeNutrition(recipe,foods);assert.equal(r.byFood.vitamin_c_mg['7.5 ml (1½ tsp) lemon juice'],2.9799);
 for(const c of rows) assert.doesNotMatch(c[4],/\d+\s*(mg|µg)/);
});

test('bounded serving interpretation uses canonical vitamin references and one combined omega-3 benchmark',async()=>{
 const {percentOfReference}=await import('../src/utils/nutrientReference.mjs');
 assert.equal(Math.round(percentOfReference('vitamin_b12_ug',7.05)),294);
 assert.equal(percentOfReference('folate_ug',15),3.75);
 assert.equal(percentOfReference('vitamin_c_mg',2.9799).toFixed(2),'3.31');
 assert.match(raw,/540 mg EPA\+DHA combined/);assert.match(raw,/not separate EPA and DHA requirements/);
 assert.match(raw,/No universal percentage cutoff/);assert.match(raw,/documented sensory action, serving response unquantified/);
 assert.doesNotMatch(raw,/recipe_matrix_validated: true/);
});

test('two disclosures partition all ten substances without promoting unknown exposures',()=>{
 const groups=[...raw.matchAll(/<details>\n<summary>(.*?)<\/summary>([\s\S]*?)<\/details>/g)];
 assert.deepEqual(groups.map(g=>g[1]),['Meaningful Nutritional Contributions','Minor or Unestablished Serving Contributions']);
 const names=g=>g[2].split('\n').filter(l=>l.startsWith('|')&&!l.startsWith('| Food |')&&!l.startsWith('| ---')).map(l=>l.split('|')[2].trim().split(' — ')[0]);
 assert.deepEqual(names(groups[0]),['DHA','EPA','B12']);assert.equal(names(groups[1]).length,7);
 assert.match(raw,/not zero or proven biologically insignificant/);
});
