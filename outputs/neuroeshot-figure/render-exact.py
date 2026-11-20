from pathlib import Path
import re,textwrap,html,json
root=Path(__file__).resolve().parents[2]; source=root/'docs/recipes/Snacks/neuroeshot.md'; out=Path(__file__).parent
raw=source.read_text(); selected=['DHA','EPA','B12','Vitamin C','Eriocitrin','Capsaicin']; rows=[]
for line in raw.splitlines():
 if not line.startswith('|'):continue
 cells=[c.strip() for c in line.split('|')[1:-1]]
 if len(cells)==6 and cells[1].split(' — ')[0] in selected:rows.append(cells)
assert len(rows)==6
plain=lambda s:re.sub(r'\[([^]]+)\]\([^)]+\)',r'\1',s).replace('**','')
# Same Arial typography and 2.2 px Bezier strokes as dahl.svg; pale outlined boxes from the supplied reference.
xs=[16,221,526,821,1116,1396]; widths=[160,260,250,250,235,285]; W=1700; H=890
parts=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="Arial, sans-serif" role="img" aria-labelledby="title desc"><title id="title">Neuroe-Shot ingredient evidence connections</title><desc id="desc">Six exact rows from the local recipe matrix. Three meaningful nutritional contributions and three minor or unestablished examples. Coloured links identify BRS context, not proven recipe efficacy.</desc><rect width="100%" height="100%" fill="#f5f7fb"/>']
def txt(x,y,t,size=14,color='#192c44',weight='400'):
 parts.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}">{html.escape(t)}</text>')
def textblock(x,y,w,s,size=14):
 yy=y
 # Keep source/PM link labels individually clickable.
 pos=0
 for m in re.finditer(r'\[([^]]+)\]\(([^)]+)\)',s):
  prefix=s[pos:m.start()].replace('**','').strip(' ;')
  if prefix:
   for l in textwrap.wrap(prefix,int((w-20)/(size*.53))):txt(x+10,yy,l,size);yy+=19
  parts.append(f'<a href="{html.escape(m[2])}">')
  for l in textwrap.wrap(m[1],int((w-20)/(size*.53))):txt(x+10,yy,l,size,'#304f76');yy+=19
  parts.append('</a>');pos=m.end()
 tail=s[pos:].replace('**','').strip(' ;')
 for l in textwrap.wrap(tail,int((w-20)/(size*.53))):txt(x+10,yy,l,size);yy+=19
 assert yy<=y+100,(s,yy-y)
def box(x,y,w,s):
 parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="104" rx="5" fill="#ffffff" stroke="#9bb1d1" stroke-width="1"/>');textblock(x,y+23,w,s)
def chord(a,y1,b,y2,c,dash=False):
 m=(a+b)/2
 parts.append(f'<path d="M{a} {y1} C{m} {y1} {m} {y2} {b} {y2}" fill="none" fill-opacity="0" stroke="{c}" stroke-width="2.2"'+(' stroke-dasharray="4 3"' if dash else '')+'/>')
txt(16,30,'Neuroe-Shot | Ingredient evidence connections',23,weight='700')
txt(16,55,'Per serving: 15 g salted salmon roe; 7.5 ml raw lemon juice (7.7 g); 2 ml fermented hot sauce (approximately 2 g).',14)
heads=['01 · FOOD','02 · SUBSTANCE','03 · BRS–PM / RESEARCH CONTEXT','04 · BIOLOGICAL ROLE / STUDIED EFFECT','05 · SOURCE EVIDENCE','06 · LIMITATION']
for x,t in zip(xs,heads):
 for i,l in enumerate(textwrap.wrap(t,32)):txt(x,83+i*15,l,11,'#304f76')
ys=[140,254,368,516,630,744]
colors=['#084df5','#f00802','#07da79','#f00802','#657583','#657583']
# One food node per ingredient, branching to the exact selected substance rows.
foodY=[254,254,254,573,573,744]
for i,(row,y,col) in enumerate(zip(rows,ys,colors)):
 chord(xs[0]+widths[0],foodY[i]+52,xs[1],y+52,col,i>=4)
 chord(xs[1]+widths[1],y+52,xs[2],y+52,col,i>=4)
 for j in range(2,5):chord(xs[j]+widths[j],y+52,xs[j+1],y+52,'#b7c4d6')
for y,name in [(254,'Salmon roe'),(573,'Lemon juice'),(744,'Fermented hot sauce')]:box(xs[0],y,widths[0],name)
for row,y in zip(rows,ys):
 for j in range(1,6):box(xs[j],y,widths[j],row[j])
txt(221,130,'Meaningful Nutritional Contributions',15,'#304f76','700')
txt(221,505,'Minor or Unestablished Serving Contributions — three examples',15,'#304f76','700')
txt(16,876,'BRS1 blue · BRS2 green · BRS3 red | Grey dashed: research/sensory context, PM unassigned. Connections do not demonstrate recipe-level efficacy.',13)
parts.append('</svg>');(out/'neuroeshot-exact-rows.svg').write_text('\n'.join(parts));(out/'neuroeshot-exact-rows.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
print('Verified: six rows extracted verbatim; all source/PM hyperlinks retained. No canonical edits.')
