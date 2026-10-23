import React from 'react';
import Layout from '@theme/Layout';
import research from '@site/system/food-target-research.json';
import {renderTarget,renderCoverageWarning,informationIcon} from '../lib/foodTargetTraceability.mjs';

/** Isolated presentation specimens. No scientific or food-ontology admissions. */
export default function DietaryInputGovernancePreview() {
 const examples=[
  {name:'Ellagitannins',id:'ellagitannins',href:'/docs/substances/bioactive-compounds/polyphenols/ellagitannins',type:'Precursor',classification:'Derived relative to a downstream urolithin operation; PM relevance unresolved',foods:research.targets.filter(f=>f.substance_id==='ellagitannins').map(f=>({...f,mapping_status:f.status,delivery:'precursor-source'}))},
  {name:'Resistant starch',id:'resistant-starch',href:'/docs/substances/nutrients/macronutrients/carbohydrates/dietary-fibre/resistant-starch',type:'Fermentation substrate',classification:'Direct to supported microbial production; Derived relative to downstream metabolite signalling',foods:research.targets.filter(f=>f.substance_id==='resistant-starch').map(f=>({...f,mapping_status:f.status,delivery:'precursor-source'}))},
  {name:'Essential amino acids — methionine example',id:'methionine',href:'/docs/substances/nutrients/macronutrients/amino-acids/essential/methionine',type:'Substrate',classification:'Relationship-specific; this preview makes no PM admission',foods:[{food_id:'chicken',food_title:'Chicken',food_page:'/docs/foods/chicken',substance_id:'methionine',material:'Chicken, broilers or fryers, meat and skin, raw',preparation:'Raw composition reference',mapping_status:'verified',delivery:'direct-input-source',amount:{value:0.493,unit:'g',basis:'per 100 g edible portion'},evidence:{sources:['https://fdc.nal.usda.gov/food-details/171447/nutrients']},limitations:'Existing structured composition edge; not a recommendation to eat raw chicken or proof of PM efficacy.'}]},
 ];
 return <Layout title="Dietary input governance presentation examples"><main className="container margin-vert--lg">
  <h1>Dietary input governance presentation examples</h1>
  <p>Isolated presentation examples. These are composition and interface demonstrations, not new scientific admissions. The canonical PM8 remains under review and locked.</p>
  <h2>3.1.1 Dietary Inputs &amp; Regulatory Modulators</h2>
  {examples.map(x=>{const warnings=x.foods.filter(f=>f.mapping_status==='research-supported-provisional').map(f=>`${f.food_title} → ${x.name}: food ontology link pending.`);return <section key={x.id} style={{marginBottom:'2rem'}}>
   <h3><a href={x.href}>{x.name}</a>{warnings.length>0&&<span dangerouslySetInnerHTML={{__html:informationIcon(warnings.join(' '))}}/>}</h3>
   <p>{x.classification}</p>
   <details className="brs-dietary-lever-detail-example"><summary>Input evidence — six atoms</summary>
    <div className="brs-dietary-lever-detail-inner">
     <div dangerouslySetInnerHTML={{__html:renderCoverageWarning(warnings)}}/>
     <p><strong>Input</strong> = <a href={x.href}>{x.name}</a></p>
     <p><strong>Input type</strong> = {x.type}</p>
     <p><strong>Biological role</strong> = PM-specific role awaits its own scientific admission; this example does not establish one.</p>
     <p><strong>Evidence source</strong> = Composition sources are shown with foods below; they are not PM mechanism evidence.</p>
     <p><strong>Limitation</strong> = Preparation and conversion are context-dependent; dietary delivery does not establish PM effectiveness.</p>
     <p><strong>Dietary input</strong> = Unset — presentation example, no new admission.</p>
    </div>
   </details>
   <details className="pm-input-food-sources"><summary>Food targets</summary><ul>{x.foods.map((f,i)=><li key={i} dangerouslySetInnerHTML={{__html:renderTarget(f)}}/>)}</ul></details>
  </section>})}
  <section><h3>Unresolved coverage example</h3><p>Food ontology coverage unresolved. No supported food target has been identified; no list is fabricated.</p></section>
 </main></Layout>;
}
