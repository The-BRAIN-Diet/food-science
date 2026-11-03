import fs from 'node:fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
const file='docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx';
let text=fs.readFileSync(file,'utf8');const before=matter(text).data;
const id='PM3-SOP-TEA-TIMING-1', key='ahmad_fuzi_tea_timing_2017';
if(before.system_optimisation_practices.some(r=>r.atom_id===id))throw Error('Already implemented');
const record={atom_id:id,dietary_input:true,optimisation_category:'food_prep',input:'Black tea one hour after rather than with an iron-containing porridge meal',input_type:'food preparation/delivery practice',biological_role:'Improved estimated non-haem iron absorption in the tested meal; an upstream supply relationship for iron-dependent tyrosine hydroxylase.',evidence_source:{finding_ids:['PM3-F8'],citation_keys:[key]},evidence_limitation:'Small nonrandomised fixed-order study in iron-replete women. No brain iron or dopamine endpoint; not a green-tea or universal timing claim.',claim_ceiling:'dietary-provision'};
text=text.replace('\nlifestyle_priorities:','\n'+yaml.dump([record],{lineWidth:100}).split('\n').map(l=>l?'  '+l:l).join('\n')+'\nlifestyle_priorities:');
const ref='[Ahmad Fuzi et al. (2017) — Tea timing and non-haem iron absorption](/docs/papers/BRAIN-Diet-References#'+key+')';
text=text.replace('\nkc_applicability_adjudications:',"\n  - '"+ref+"'\nkc_applicability_adjudications:");
const n=before.references.length+1;
const html=`\n<PilotInterventionDisclosure id="pm3-sop-tea-timing-1" title="Black tea one hour after porridge → higher estimated iron absorption"><div className="brs-dietary-lever-detail-inner">
<p><span className="brs-dietary-lever-detail-k">Intervention</span> = <a href="/docs/foods/black-tea">Black tea</a> one hour after, compared with simultaneous consumption of an <a href="/docs/foods/oats">oat</a> porridge meal.</p>
<p><span className="brs-dietary-lever-detail-k">Intervention type</span> = Food preparation/delivery practice.</p>
<p><span className="brs-dietary-lever-detail-k">Biological relationship</span><br /><strong>Mechanism of Action:</strong> Temporal separation may reduce interaction between meal iron and tea inhibitors; mediation was not isolated.<br /><strong>Measured Effect:</strong> Higher fractional iron absorption estimated by erythrocyte isotope incorporation.<br /><strong>PM Relevance:</strong> Upstream iron supply for tyrosine hydroxylase; no demonstrated dopamine effect.</p>
<p><span className="brs-dietary-lever-detail-k">Evidence source</span> = Twelve iron-replete women; labelled porridge and black tea with milk; nonrandomised fixed sequence. <a href="#pm-ref-${n}">[${n}]</a></p>
<div><span className="brs-dietary-lever-detail-k">Limitations</span><ul><li><strong>Design:</strong> Small sample, fixed order and variable absorption.</li><li><strong>Exposure:</strong> Tested black tea and meal only; not green tea or an optimal interval.</li><li><strong>Endpoint:</strong> No brain iron, dopamine or clinical benefit measured.</li></ul></div>
<p><span className="brs-dietary-lever-detail-k">Intervention admitted</span> = Yes — qualified upstream iron delivery.</p>
<p><strong>Intervention SEC:</strong> Not yet assessed</p>
</div></PilotInterventionDisclosure>\n`;
const end=text.indexOf('</PilotInterventionDisclosure>',text.indexOf('id="pm3-sop-2"'))+'</PilotInterventionDisclosure>'.length;
text=text.slice(0,end)+html+text.slice(end);
const lastRef='- <span id="pm-ref-'+before.references.length+'">';
const pos=text.indexOf('\n',text.indexOf(lastRef));
if(pos<0)throw Error('Reference register missing');
text=text.slice(0,pos)+`\n- <span id="pm-ref-${n}">[${n}]</span> ${ref}`+text.slice(pos);
const after=matter(text).data;
for(const k of ['scientific_findings','dietary_input_traceability','evidence_gaps','lifestyle_priorities','intervention_dominance'])if(JSON.stringify(before[k])!==JSON.stringify(after[k]))throw Error('Protected change '+k);
if(after.references.length!==n||after.system_optimisation_practices.length!==before.system_optimisation_practices.length+1)throw Error('Invalid insertion');
fs.writeFileSync(file,text);
fs.appendFileSync('static/bibtex/Brain-diet.bib',`\n@article{${key},\n title={A 1-h time interval between a meal containing iron and consumption of tea attenuates the inhibitory effects on iron absorption: a controlled trial in a cohort of healthy UK women using a stable iron isotope},\n author={Ahmad Fuzi, Salma F and Koller, Dagmar and Bruggraber, Sylvaine and Pereira, Dora IA and Dainty, Jack R and Mushtaq, Sohail},\n journal={The American Journal of Clinical Nutrition},\n year={2017},\n volume={106},\n pages={1413--1421},\n doi={10.3945/ajcn.117.161364}\n}\n`);
console.log('Added '+id+'; reference '+n+'; protected fields unchanged');
