const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),matter=require('gray-matter');
const root=path.resolve(__dirname,'..');
const fm=slug=>matter(fs.readFileSync(path.join(root,'docs/foods',slug+'.md'),'utf8')).data;
function compile(rel,extra={}){const source=ts.transpileModule(fs.readFileSync(path.join(root,rel),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,esModuleInterop:true}}).outputText;const module={exports:{}};const req=id=>id==='react'?(extra.react||React):id in extra?extra[id]:require(id);vm.runInNewContext(source,{module,exports:module.exports,require:req,Set,Map,Object,Array,Number,String,Boolean,Math});return module.exports;}
const mapping=compile('src/data/nutritionTableMapping.ts',{'../utils/recipeNutritionCalculate.mjs':{meetsKeyMicronutrientThreshold:p=>p>=15},'../utils/nutrientReference.mjs':{percentOfReference:(key,value)=>key==='calcium_mg'?value/10:null},'@site/src/utils/nutrientReference.mjs':{ADULT_REFERENCE_INTAKE:{calcium_mg:1000},meetsKeyMicronutrientThreshold:p=>p>=15,percentOfReference:(key,value)=>key==='calcium_mg'?value/10:null}});
const table=compile('src/components/NutritionTable.tsx',{'@site/src/components/AdvancedNutrition':()=>null,'@site/src/data/nutritionTableMapping':mapping,'@site/src/utils/nutrientReference.mjs':{ADULT_REFERENCE_INTAKE:{calcium_mg:1000}},'@site/src/data/fcirRegister':{foodPageNote:()=>'',fcirHref:x=>x}}).default;
const render=d=>renderToStaticMarkup(React.createElement(table,{details:d}));
test('Mucuna public panel contains no unsuitable ranges or reference percentages',()=>{const html=render(fm('mucuna-beans'));const publicHtml=html.replace(/<details>[\s\S]*?<\/details>/g,'');assert.match(publicHtml,/Reliable composition data for this preparation are not yet available/);assert.match(publicHtml,/Present in studied seeds/);for(const v of ['42.79','64.88','5.3','11.5','6–95','13–19','76–530','3.54','Crude','Ash','Reference intakes','% RDA'])assert.ok(!publicHtml.includes(v),v);assert.match(html,/Technical provenance/);assert.match(html,/3.54/);});
test('combined analytes never match either constituent; ineligible ranges cannot bypass visibility',()=>{assert.equal(mapping.substanceLabelsOverlap('Zeaxanthin','Zeaxanthin'),true);assert.equal(mapping.substanceLabelsOverlap('Lutein + zeaxanthin','Zeaxanthin'),false);assert.equal(mapping.substanceLabelsOverlap('Lutein + zeaxanthin','Lutein'),false);assert.equal(mapping.isPublicSupplementaryRow({}, {key:'crude_fibre',label:'Fibre',section:'core',amount_display:'9 g',public_display:'table'}),false);assert.equal(mapping.isPublicSupplementaryRow({}, {key:'leucine',label:'Leucine',value:10,unit:'mg',basis:'per g protein',public_display:'table'}),false);});
test('withdrawn identities cannot reach recipe quantitative composition',()=>{for(const slug of ['mucuna-beans','dark-meat-poultry','lemon-balm-tea','fermented-vegetables','fortified-plant-milks','trout-roe']){const d=fm(slug);assert.equal(d.composition_status,'withdrawn',slug);assert.deepEqual(d.nutrition_per_100g,{});assert.equal(d.nutrition_source,undefined);}});
test('shared source limitation is shown once as a labelled bullet, with original details collapsed',()=>{const d={nutrition_supplementary_sources:[{key:'a',label:'A',amount_display:'Present',public_display:'table',source_group:'shared',public_note:'A shared source',source_note:'Original A units'},{key:'b',label:'B',amount_display:'Present',public_display:'table',source_group:'shared',public_note:'A shared source',source_note:'Original B units'}]};const html=render(d);assert.equal((html.match(/A shared source/g)||[]).length,1);assert.match(html,/Original A units/);assert.match(html,/Original B units/);assert.doesNotMatch(html,/Reference intakes/);assert.doesNotMatch(html,/\[1\]/);assert.match(html,/<li[^>]*><strong>A, B:<\/strong>/);});
test('every original explicit relationship survives and recovered individual chard has evidence',async()=>{const {canonicalFoodRelationships}=await import('../src/data/foodSubstanceRelationships.mjs');const baseline=JSON.parse(fs.readFileSync(path.join(root,'scripts/out/suppressed-food-substance-tags.json')));for(const e of baseline.explicit)assert.ok(canonicalFoodRelationships(fm(e.food)).some(x=>x.substance.split('(')[0].trim()===e.substance&&x.relationship===e.relationship),e.food+' '+e.substance);for(const sub of ['Lutein','Zeaxanthin'])assert.ok(canonicalFoodRelationships(fm('swiss-chard')).some(x=>x.substance===sub&&x.source_url&&x.evidence_note));});

test('migration renderability cannot certify evidence or defeat a pending decision',async()=>{const canonical=await import('../src/data/foodSubstanceRelationships.mjs');const fake={substance_relationships:[{substance:'Zeaxanthin',relationship:'contains',recovery_origin:'legacy-tag-migration',description:'This page contains it.'}]};assert.deepEqual(canonical.canonicalContainsRelationships(fake),[]);assert.equal(canonical.pendingFoodRelationship({substance_review_candidates:['Zeaxanthin']},'Zeaxanthin',mapping.substanceLabelsOverlap),true);const report=JSON.parse(fs.readFileSync(path.join(root,'system/food-substance-recovery-evidence.json')));assert.equal(report.rows.length,612);assert.equal(report.rows.filter(row=>row.claimed_in_597).length,597);assert.equal(Object.values(report.counts).reduce((a,b)=>a+b,0),612);for(const row of report.rows.filter(row=>row.classification==='source_supported')){assert.ok(row.evidence.source&&row.evidence.material&&row.evidence.verification,row.food+' '+row.substance);}});

test('pending evidence cannot enter a public nutrition table through an explicit display override',()=>{assert.equal(mapping.isPublicSupplementaryRow({}, {key:'pending',label:'Pending',value:10,public_display:'table',evidence_status:'unresolved'}),false);});

test('production beta-carotene display name matches the canonical analyte',()=>{assert.equal(mapping.substanceLabelsOverlap('Beta-Carotene','β-Carotene'),true);});


test('documented established presence survives citation attachment gaps; tags and rejected evidence do not',async()=>{
 const c=await import('../src/data/foodSubstanceRelationships.mjs');
 const edge={substance:'Lutein',relationship:'contains',recovery_origin:'legacy-tag-migration',presence_status:'established_presence_citation_pending',evidence_basis:{kind:'authoritative-composition-record',record:'Previously accepted food-specific record',rationale:'Individual analyte positively identified in edible material'}};
 const food={substance_review_candidates:['Lutein'],substance_relationships:[edge]};
 assert.equal(c.canonicalContainsRelationships(food).length,1);
 assert.equal(c.pendingFoodRelationship(food,'Lutein',mapping.substanceLabelsOverlap),false);
 assert.equal(c.canonicalContainsRelationships({substance_relationships:[{...edge,evidence_basis:undefined}]}).length,0);
 assert.equal(c.canonicalContainsRelationships({substance_relationships:[{...edge,evidence_status:'rejected'}]}).length,0);
});
test('duck fat is rendered fat NDB 04574, not duck liver',()=>{
 const d=fm('duck-fat');
 assert.equal(d.composition_status,'supported');
 assert.equal(d.nutrition_per_100g.fat_g,99.8);
 assert.equal(d.nutrition_per_100g.selenium_ug,0.2);
 assert.equal(d.nutrition_per_100g.vitamin_d_ug,4.8);
 assert.equal(d.nutrition_per_100g.oleic_g,undefined);
 assert.equal(d.nutrition_per_100g.ala_mg,undefined);
 assert.equal(d.nutrition_per_100g.linoleic_g,undefined);
 assert.equal(d.nutrition_source.fdc_id,undefined);
 assert.match(d.nutrition_source.food_name,/Rendered duck fat/);
 assert.match(d.nutrition_source.database,/04574/);
 assert.equal(d.nutrition_supplementary_sources.find(s=>s.label==='Cholesterol').value,100);
 assert.match(render(d),/Rendered duck fat/);
 assert.doesNotMatch(render(d),/not yet available|191 mcg|174467/);
});
test('chicory root is raw root FDC 169993, not greens, and fibre is not inulin',()=>{
 const d=fm('chicory-root');
 assert.equal(d.composition_status,'supported');
 assert.equal(d.nutrition_per_100g.fibre_g,1.5);
 assert.equal(d.nutrition_per_100g.carbs_g,17.51);
 assert.equal(d.nutrition_per_100g.folate_ug,23);
 assert.equal(d.nutrition_per_100g.oleic_g,undefined);
 assert.equal(d.nutrition_per_100g.ala_mg,undefined);
 assert.equal(d.nutrition_source.fdc_id,169993);
 assert.match(d.nutrition_source.food_name,/roots, raw/);
 assert.match(d.nutrition_source.basis,/does not include inulin/);
 const html=render(d);
 assert.match(html,/does not include inulin/);
 assert.doesNotMatch(html,/not yet available|169992/);
});
test('nutritional yeast uses Marigold Engevita with B12, not yeast extract or the vitamin D formula',()=>{
 const d=fm('nutritional-yeast');
 assert.equal(d.composition_status,'supported');
 assert.equal(d.nutrition_per_100g.vitamin_b12_ug,44);
 assert.equal(d.nutrition_per_100g.zinc_mg,120);
 assert.equal(d.nutrition_per_100g.folate_ug,undefined);
 assert.equal(d.nutrition_source.fdc_id,undefined);
 assert.match(d.nutrition_source.food_name,/with B12/);
 const folic=d.nutrition_supplementary_sources.find(s=>s.label==='Folic acid');
 assert.equal(folic.value,5200);
 assert.match(render(d),/Marigold Engevita Nutritional Yeast Flakes with B12/);
 assert.doesNotMatch(render(d),/not yet available/);
});
test('restored nori composition belongs to dried toasted edible nori, not raw laver',()=>{
 const d=fm('nori');assert.equal(d.composition_status,'supported');assert.match(d.nutrition_source.food_name,/dried, toasted/);
 assert.equal(d.nutrition_per_100g.magnesium_mg,300);assert.equal(d.nutrition_per_100g.fibre_g,36);
 assert.match(render(d),/dried, toasted nori; not a typical serving/);
});
test('individual avocado lutein is study-specific and distinct from the combined database value',()=>{
 const d=fm('avocado'),s=d.nutrition_supplementary_sources.find(s=>s.label==='Lutein');
 assert.equal(s.value,.4);assert.match(s.basis,/fresh edible Hass/);assert.equal(d.nutrition_per_100g.lutein_zeaxanthin_ug,271);
 assert.match(render(d),/Measured lutein in the fresh Hass/);
});

test('withdrawn preparation shows the brief explanation and cannot expose stale core values',()=>{const html=render({composition_status:'withdrawn',nutrition_per_100g:{kcal:999,iron_mg:95},nutrition_source:{food_name:'Wrong borrowed food'}});assert.match(html,/Reliable composition data for this preparation are not yet available/);assert.doesNotMatch(html,/999|95 mg|Wrong borrowed food/);});

 test('green tea retains supported qualitative bioactives in its public panel',()=>{const html=render(fm('green-tea'));assert.match(html,/Bioactive compounds/);assert.match(html,/nutrition-row-egcg_mg/);assert.match(html,/nutrition-row-l_theanine_mg/);assert.match(html,/30 mg \(estimate\)/);assert.match(html,/6 mg \(estimate\)/);assert.equal(fm('green-tea').nutrition_value_reviews.filter(x=>/amount: citation attachment pending/.test(x.title)).length,2);});

test('supported bioactive panels remain visible after sourcing without inventing quantities',()=>{for(const slug of ["broccoli-sprouts", "butter", "cacao-nibs-raw", "cacao-powder", "cinnamon", "clams", "cockles", "cocoa", "cordyceps-mushroom", "dark-chocolate", "dark-meat-poultry", "early-harvest-olive-oil", "edamame", "egg-yolks", "fortified-plant-milks", "garlic", "grass-fed-butter", "lamb", "lemon", "lions-mane-mushroom", "liver", "lumpfish-roe", "maitake-mushroom", "mankai", "nutritional-yeast", "oyster-mushroom", "parmesan-cheese", "pistachios", "pomegranates", "pork", "reishi-mushroom", "rosemary", "sauerkraut", "scallops", "seaweed", "shiitake-mushroom", "soy-lecithin", "sunflower-lecithin", "thyme", "trout-roe", "turkey-tail-mushroom", "turmeric", "whey-protein"]){const d=fm(slug),html=render(d);assert.match(html,/<h3>Bioactive compounds<\/h3>/,slug);for(const row of d.nutrition_supplementary_sources||[]){if(row.evidence_status==='supported'&&row.public_display==='table')assert.ok(html.includes('nutrition-row-'+row.key),slug+': '+row.label);if(row.evidence_status==='unresolved')assert.ok(!html.includes('nutrition-row-'+row.key),slug+': unresolved '+row.label);}}});

test('substance food cards show one food description without relationship or audit overlays',async()=>{const canonical=await import('../src/data/foodSubstanceRelationships.mjs');const d=fm('avocado');const doc={title:d.title,description:d.description,permalink:'/docs/foods/avocado',frontMatter:d,tags:[],order:0};const C=compile('src/theme/SubstanceFoods/index.tsx',{'@site/src/data/foodSubstanceRelationships.mjs':canonical,'@site/src/data/nutritionTableMapping':mapping,'@docusaurus/useGlobalData':{usePluginData:()=>({Avocado:[doc]})},'@docusaurus/Link':({to,children})=>React.createElement('a',{href:to},children),'../TagList/styles.module.css':{}}).default;const html=renderToStaticMarkup(React.createElement(C,{tag:'Lutein'}));assert.match(html,/Avocado/);assert.ok(html.includes(d.description));assert.equal((html.match(/<p>/g)||[]).length,1);assert.doesNotMatch(html,/legacy|unreviewed|contains →|substance-food-relationship|>Source</i);});

test('repaired food source notes use labelled bullets and page-local references',()=>{const route=JSON.parse(fs.readFileSync(path.join(root,'system/food-source-reference-routing.json')));for(const page of route.changed){const d=fm(page.food),body=fs.readFileSync(path.join(root,'docs/foods',page.food+'.md'),'utf8'),html=render(d);for(const row of d.nutrition_supplementary_sources||[]){if(!row.source_url)continue;assert.match(row.source_reference,/^#food-source-/);assert.ok(body.includes('id="'+row.source_reference.slice(1)+'"'),page.food);assert.ok(!html.includes('href="'+row.source_url+'"'),page.food);}assert.equal(body.includes('BRAIN-Diet-References#food_composition_'),false,page.food);}const html=render(fm('avocado'));assert.match(html,/<li[^>]*><strong>Lutein:<\/strong>/);assert.doesNotMatch(html,/<span>\[1\] <\/span>/);assert.doesNotMatch(html,/this is distinct from the combined/);});

test('food headline threshold uses unrounded values and keeps lower rows in the Advanced tab',async()=>{const refs=await import('../src/utils/nutrientReference.mjs');const m=compile('src/data/nutritionTableMapping.ts',{'../utils/nutrientReference.mjs':refs});const C=compile('src/components/NutritionTable.tsx',{'@site/src/components/AdvancedNutrition':()=>null,'@site/src/data/nutritionTableMapping':m,'@site/src/utils/nutrientReference.mjs':refs,'@site/src/data/fcirRegister':{foodPageNote:()=>'',fcirHref:x=>x}}).default;const show=(d,view)=>renderToStaticMarkup(React.createElement(C,{details:d,view}));for(const [amount,expected] of [[99.999,false],[100,true]])assert.equal(m.isKeyFoodMicronutrient({nutrition_per_100g:{calcium_mg:amount}},'calcium_mg'),expected);for(const slug of ['green-tea','broccoli']){const d=fm(slug),h=show(d,'highlights'),a=show(d,'advanced');for(const key of m.MICRONUTRIENT_KEYS.filter(k=>m.isPublicTableKey(d,k)&&Object.hasOwn(d.nutrition_per_100g,k))){const id='nutrition-row-'+key;assert.equal(h.includes(id),m.isKeyFoodMicronutrient(d,key),slug+' Highlights '+key);assert.equal(a.includes(id),!m.isKeyFoodMicronutrient(d,key),slug+' Advanced '+key);}assert.doesNotMatch(h,/<details id="advanced-nutrition"/);}assert.match(show(fm('broccoli'),'highlights'),/nutrition-row-vitamin_b6_mg/);assert.match(show(fm('green-tea'),'advanced'),/nutrition-row-manganese_mg/);assert.match(show(fm('green-tea'),'highlights'),/30 mg \(estimate\)|6 mg \(estimate\)/);});

test('food Advanced content registers in the page tab without inline duplication',()=>{let registered=null,cleanup;const slot={panels:{advanced:null,therapeutic:null},setPanel:(name,node)=>{assert.equal(name,'advanced');registered=node;},useTabPanel:true};const mock={...React,createContext:()=>({}),useContext:()=>slot,useLayoutEffect:fn=>{cleanup=fn();}};const A=compile('src/components/AdvancedNutrition/index.tsx',{react:mock}).default;const content=React.createElement('div',null,'Lower-contribution rows');const node=A({children:content,tabOnly:true});assert.equal(node.type(node.props),null);assert.equal(registered,content);cleanup();assert.equal(registered,null);});

test('Beef public and technical source notes link to numbered page references',()=>{const d=fm('beef'),html=render(d);for(const n of [4,5]){assert.equal((html.match(new RegExp('href="#food-source-'+n+'">\\['+n+'\\]</a>','g'))||[]).length,2);}assert.doesNotMatch(html,/>Reference<\/a>/);assert.equal(d.nutrition_supplementary_sources.find(r=>r.key==='creatine_mg').value,400);assert.equal(d.nutrition_supplementary_sources.find(r=>r.key==='coq10_qual').value,2.5);const body=fs.readFileSync(path.join(root,'docs/foods/beef.md'),'utf8');for(const n of [4,5,6])assert.match(body,new RegExp('\\['+n+'\\] [^\\n]+ \\(\\d{4}\\)\\. \\['));});
