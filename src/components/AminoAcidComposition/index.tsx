import React from 'react';
import Link from '@docusaurus/Link';
import {EAA_IDS, validateAminoAcidProfile} from '../../lib/aggregateFoodComposition.mjs';

export function AggregateSourceTable({sources}:{sources:any[]}) {
  return <><p>Ranked by the sum of nine separately reported amino acids per 100 g of the stated edible form. Water content and portion sizes differ. This is not a digestibility or protein-quality ranking, an effective PM dose, or a requirement to obtain all nine in each meal.</p>
    <table><thead><tr><th>Food / form</th><th>Nine AA (g/100 g)</th><th>Protein (g/100 g)</th><th>Illustrative portion</th><th>Nine AA / protein in portion (g)</th></tr></thead><tbody>
      {[...sources].sort((a,b)=>b.aggregate_composition.eaa_g-a.aggregate_composition.eaa_g).map(s=><tr key={s.id}><td><Link to={s.food_page+'#amino-acid-composition'}>{s.food_title}</Link> — {s.preparation}</td><td>{s.aggregate_composition.eaa_g}</td><td>{s.aggregate_composition.protein_g}</td><td>{s.aggregate_composition.profile.portion.label} ({s.aggregate_composition.portion_grams} g)</td><td>{s.aggregate_composition.portion_eaa_g} / {s.aggregate_composition.portion_protein_g}</td></tr>)}
    </tbody></table></>;
}
export default function AminoAcidComposition({frontMatter}:{frontMatter:any}) {
  const profiles=(frontMatter.nutrition_amino_acid_profiles||[]).filter((p:any)=>!validateAminoAcidProfile(p).length);
  if(!profiles.length)return null;
  return <details id="amino-acid-composition"><summary>Indispensable amino-acid composition — source &amp; portion</summary>
    {profiles.map((p:any)=><div key={p.id}><p>{p.material}. <Link to={p.source.source_url}>USDA FoodData Central {p.source.fdc_id}</Link>; {p.basis}.</p>
      <table><thead><tr><th>Constituent</th><th>g per 100 g</th></tr></thead><tbody>{EAA_IDS.map(id=><tr key={id}><td>{id}</td><td>{p.amino_acids[id].value}</td></tr>)}</tbody></table>
      <p>Protein: {p.protein_g} g per 100 g. Illustrative portion: {p.portion.label}, {Math.round(p.portion.source_grams*p.portion.multiplier*100)/100} g (USDA portion record {p.portion.source_row_id}{p.portion.multiplier!==1?`; scaled by ${p.portion.multiplier}`:''}).</p>
      <p>{p.limitations} <Link to="/docs/substances/nutrients/macronutrients/amino-acids/indispensable-amino-acids">Composition-derived class sources</Link> keep all nine constituents separate. Every meal need not provide the complete set.</p>
      {p.protein_quality?<p>{p.protein_quality.summary} {p.protein_quality.citation_keys.map((key:string)=><Link key={key} to={'/docs/papers/BRAIN-Diet-References#'+key}>[Protein-quality source]</Link>)}</p>:<p>No matching amino-acid-specific ileal digestibility dataset is attached to this profile. The sum is not DIAAS. Existing food-page protein-quality evidence remains separate.</p>}
    </div>)}
  </details>;
}
