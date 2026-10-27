const fs=require('fs'),matter=require('gray-matter'),yaml=require('js-yaml');
const registry=JSON.parse(fs.readFileSync('registry/substances.json'));
function field(file,key,value){const raw=fs.readFileSync(file,'utf8'),p=matter(raw);const re=new RegExp('^'+key+':[\\s\\S]*?(?=^[A-Za-z_][A-Za-z_0-9-]*:|$(?![\\s\\S]))','m'),v=yaml.dump({[key]:value},{lineWidth:100,noRefs:true});let f=raw.slice(3,raw.indexOf('\n---',4));f=re.test(f)?f.replace(re,v):f.replace(/\s*$/,'\n')+v;fs.writeFileSync(file,'---'+f.replace(/^\n?/,'\n').replace(/\n?$/,'\n')+'---'+raw.slice(raw.indexOf('\n---',4)+4));}
for(const food of ['beef','eggs','tofu']){let f='docs/foods/'+food+'.md',d=matter(fs.readFileSync(f,'utf8')).data;d.substance_relationships=d.substance_relationships.filter(e=>!(e.substance_id==='cysteine'&&e.citation_keys?.includes('lenders_amino_acid_sequencing_2009')));for(const e of d.substance_relationships.filter(e=>e.citation_keys?.includes('lenders_amino_acid_sequencing_2009'))){e.evidence_source='Lenders et al. (2009), Table 1: protein-sequence-based occurrence.';e.material_limitations='Protein-bound residues; no free-amino-acid dose or hydrolysed Glx amount inferred.';e.food_delivery_notes=e.material_limitations;}field(f,'substance_relationships',d.substance_relationships);}
const decisions={
 'n-acetylcysteine':{status:'no-ordinary-food-source',classification:'E',reason:'No verified ordinary-food source of N-acetylcysteine was identified. The admitted exposure is supplemental NAC; protein cysteine or cystine is not NAC.',sources:['https://www.rivm.nl/bibliotheek/rapporten/2024-0086.pdf']},
 oligofructose:{status:'no-ordinary-food-source',classification:'E',reason:'The admitted oligofructose exposure is a defined inulin-hydrolysate preparation. Native food FOS fractions do not establish an equivalent chain-length mixture or supplement exposure.',sources:['https://doi.org/10.1080/10942912.2012.680221','https://doi.org/10.1093/jn/137.11.2493S']},
 uridine:{status:'verified-qualitative',classification:'B',sources:['https://doi.org/10.3168/jds.S0022-0302(84)81361-2']},
 'pyridoxal-5-phosphate':{status:'verified-qualitative',classification:'B',sources:['https://doi.org/10.1016/j.chroma.2017.04.009']},
 'flavin-mononucleotide':{status:'verified-qualitative',classification:'B',sources:['https://doi.org/10.1016/j.chroma.2017.04.009']},
 arabinan:{status:'verified-qualitative',classification:'B',sources:['https://doi.org/10.1046/j.1365-313x.2000.00719.x']},
 glutamine:{status:'verified-qualitative',classification:'B',sources:['https://doi.org/10.1038/ejcn.2009.110']},
 glutamate:{status:'verified-qualitative',classification:'B',sources:['https://doi.org/10.1038/ejcn.2009.110']},
 cysteine:{status:'verified-qualitative',classification:'A',sources:['https://doi.org/10.1002/fsn3.473']},
 glucose:{status:'verified-quantitative',classification:'B',sources:['https://fdc.nal.usda.gov/food-details/173944/nutrients','https://fdc.nal.usda.gov/food-details/174683/nutrients','https://fdc.nal.usda.gov/food-details/169640/nutrients']}
};
for(const [id,record] of Object.entries(decisions))field('docs/substances/'+registry[id].path,'food_delivery_assessment',{review_date:'2026-10-26',...record,admission_changed:false});
fs.writeFileSync('review/foodless-targets-2026-10-26/food-delivery-decisions.json',JSON.stringify(decisions,null,2)+'\n');
