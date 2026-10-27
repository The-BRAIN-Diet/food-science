import React from 'react';
import Link from '@docusaurus/Link';
import scopes from '../../data/inputMappingScopes.mjs';
import {foodDietaryRelationships} from '../../lib/foodDietaryProjection.mjs';
export default function FoodDietaryRelationships({foodId}:{foodId:string}) {
  const rows=foodDietaryRelationships(scopes,foodId);
  if(!rows.length)return null;
  return <details id="food-dietary-relationships"><summary>Food composition → admitted dietary relationships</summary>
    <p>These links join food composition to existing PM admissions. They do not establish that a portion reproduces an intervention, delivers an intact cofactor to tissue, or improves a clinical outcome. Derived supply retains its conversion and delivery limits.</p>
    <ul>{rows.map((r:any)=><li key={r.id}><Link to={r.substance_page}>{r.input}</Link> → <Link to={r.pm_page}>{r.pm}</Link> · {r.type?`Type ${r.type} / `:''}{r.classification||'classification not recorded'}<details><summary>Food form &amp; relationship limits</summary><p>{r.limitation}</p>{r.foods.map((f:any)=><p key={f.id}>{f.material}; {f.preparation||'form not known'}. {f.projection_kind==='constituent-composition'?'Sum of nine constituent measurements, not a synthetic contains edge. ':''}{f.food_delivery_notes||f.limitations||''}</p>)}</details></li>)}</ul>
  </details>;
}
