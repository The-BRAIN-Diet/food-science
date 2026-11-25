const systems = ['BRS1', 'BRS2', 'BRS3', 'BRS4', 'BRS5', 'BRS6'];
const tau = 2 * Math.PI;
const substanceRadius = 285;
const interventionRadius = 580;
const foodRadius = 432;
const brs6Fm1 = '/docs/biological-targets/brs6/fm1/';
const brs6Patterns = [
  {
    id: 'rye-substitution', brs: 'BRS6', short: 'Wholemeal rye|swap',
    name: 'Wholemeal rye replacing refined wheat',
    context: 'Östman et al. (2019) compared bread meals with 50 g available carbohydrate in a crossover study of nine healthy men. Early tracer-estimated glucose appearance was lower after the tested wholemeal rye bread, while blood glucose profiles were similar. The comparison applies to the tested breads.',
    source: brs6Fm1 + 'brs6-fm1-pm1-glucose-appearance-kinetics/#pm1-sop-1',
    citation: 'Östman et al. (2019) · PM1'
  },
  {
    id: 'vinegar-meal', brs: 'BRS6', short: 'Vinaigrette dip',
    name: 'White-vinegar vinaigrette with bread and cheese',
    context: 'In Liljeberg and Björck (1998), ten healthy volunteers ate a morning test meal after an overnight fast. They dipped 122 g white wheat bread into a vinaigrette made with 20 g white vinegar, 20 g water and 8 g olive oil, and ate it with 23 g cheese. The meals were consumed over about 12–14 minutes. The lower paracetamol response suggested slower gastric delivery. The study used an indirect marker. A separate study in diabetic gastroparesis found further delay.',
    source: brs6Fm1 + 'brs6-fm1-pm1-glucose-appearance-kinetics/#pm1-sop-10',
    citation: 'Liljeberg and Björck (1998) · PM1'
  },
  {
    id: 'whole-grain-pattern', brs: 'BRS6', short: 'Coarse whole|grains',
    name: 'Less-processed whole-grain pattern',
    context: 'Åberg et al. (2020) compared intact oats, brown rice and bread made from coarse whole-grain flour and kibbled wheat with a nutrient-matched finely processed whole-grain package in a two-week crossover per condition. Of 31 adults with type 2 diabetes, 28 completed the study. Daily glucose variability fell on two continuous glucose monitoring measures. The trial tested the package as a whole.',
    source: brs6Fm1 + 'brs6-fm1-pm2-glycaemic-variability-regulation/#pm2-sop-2',
    citation: 'Åberg et al. (2020) · PM2'
  }
];
const substanceLabels = new Map(Object.entries({
  '5-methyltetrahydrofolate': '5-MTHF',
  'caprylic-triglyceride': 'Trioctanoin',
  'coq10': 'CoQ10',
  'dha-docosahexaenoic-acid': 'DHA',
  'ellagitannins': 'Ellagitann.',
  'epa-eicosapentaenoic-acid': 'EPA',
  'flavin-adenine-dinucleotide': 'FAD',
  'flavin-mononucleotide': 'FMN',
  'fructo-galacto-oligosaccharides': 'FOS/GOS',
  'indispensable-amino-acids': 'IAA pool',
  'linoleic-acid': 'LA (n-6)',
  'n-acetylcysteine': 'NAC',
  'nad-plus': 'NAD⁺',
  'nicotinamide-riboside': 'NR',
  'nicotinic-acid': 'Niacin (NA)',
  'oligofructose': 'Fructo-oligo',
  'phenylalanine': 'Phe',
  'phosphatidylcholine': 'Phos*choline (PC)',
  'pyridoxal-5-phosphate': 'PLP',
  'resistant-starch': 'Resist. starch',
  's-adenosylmethionine': 'SAM',
  'scfas': 'SCFAs',
  'vitamin-a': 'Vitamin A',
  'vitamin-b12': 'B12',
  'vitamin-b2': 'Riboflavin',
  'vitamin-b5': 'B5',
  'vitamin-b6': 'B6',
  'vitamin-b9': 'Folate (B9)',
  'vitamin-c': 'Vitamin C',
  'vitamin-e': 'Vitamin E'
}));
const foodPlacement = new Map([
  ['salmon', {brs: 'BRS1', substance: 'indispensable-amino-acids'}],
  ['salmon-roe', {brs: 'BRS3', substance: 'epa-eicosapentaenoic-acid'}]
]);

export function twoRingModel(data) {
  const pairMap = new Map();
  const mechanismMap = new Map();
  const ranked = data.displaySelections.filter(edge =>
    edge.status === 'admitted' && Number.isFinite(edge.relative_power));
  const documented = (data.documentedUnranked ?? []).filter(edge =>
    edge.status === 'documented-unranked' && ['approved', 'provisional'].includes(edge.network));
  for (const edge of [...ranked, ...documented]) {
    const {food_id: food, substance_id: substance, brs, pm_id: pm, relative_power: power} = edge;
    if (!systems.includes(brs)) continue;
    const scored = edge.status === 'admitted';
    const key = JSON.stringify([food, substance, scored]);
    if (!pairMap.has(key)) pairMap.set(key, {food, substance, systems: new Set(), power: null, destinations: new Map()});
    const pair = pairMap.get(key);
    pair.systems.add(brs);
    if (!pair.destinations.has(brs)) pair.destinations.set(brs, {power: null, layers: new Set()});
    const destination = pair.destinations.get(brs);
    if (scored) {
      pair.power = Math.max(pair.power ?? 0, power);
      destination.power = Math.max(destination.power ?? 0, power);
    } else if (edge.layer) {
      destination.layers.add(edge.layer);
    }
    if (!mechanismMap.has(substance)) mechanismMap.set(substance, new Map());
    const bySystem = mechanismMap.get(substance);
    if (!bySystem.has(brs)) bySystem.set(brs, new Set());
    bySystem.get(brs).add(pm);
  }

  const inventory = new Map(data.network.inventory.map(item => [item.id, item]));
  const substanceIds = new Set([
    ...mechanismMap.keys(),
    ...data.network.inventory
      .filter(item => item.inclusion === 'included' && systems.includes(item.primary))
      .map(item => item.id)
  ]);
  const substances = [...substanceIds].map(id => {
    const item = inventory.get(id);
    const bySystem = mechanismMap.get(id) ?? new Map();
    const primary = [...bySystem.keys()].sort((a, b) =>
      bySystem.get(b).size - bySystem.get(a).size ||
      Number(b === item?.primary) - Number(a === item?.primary) ||
      systems.indexOf(a) - systems.indexOf(b))[0] ?? item.primary;
    // Give the vitamin C cluster more space in its existing BRS3 home.
    const home = id === 'vitamin-c' && bySystem.has('BRS3') ? 'BRS3' : primary;
    return {id, name: item?.name ?? id, primary, home, systems: bySystem, hasChords: bySystem.size > 0};
  });
  const names = new Map(substances.map(item => [item.id, item.name]));
  const pairs = [...pairMap.values()];
  const foods = data.foods.flatMap(food => {
    const links = pairs.filter(pair => pair.food === food.id);
    if (!links.length) return [];
    links.sort((a, b) =>
      (b.power ?? -1) - (a.power ?? -1) || b.systems.size - a.systems.size ||
      names.get(a.substance).localeCompare(names.get(b.substance)) ||
      a.substance.localeCompare(b.substance));
    return [{id: food.id, name: food.title, primary: links[0].substance, links}];
  });
  assignFoodHomes(foods, substances);
  const foodIds = new Set(foods.map(food => food.id));
  return {foods, substances, pairs: pairs.filter(pair => foodIds.has(pair.food))};
}

export function withCanonicalLinks(base, additions) {
  const foods = new Map([...additions.foods, ...base.foods].map(food => [food.id, food]));
  return {
    ...base,
    foods: [...foods.values()],
    displaySelections: [...base.displaySelections, ...additions.ranked],
    documentedUnranked: [...(base.documentedUnranked ?? []), ...additions.unranked]
  };
}

function assignFoodHomes(foods, substances) {
  const bySubstance = new Map(substances.map(item => [item.id, item]));
  const counts = new Map(systems.map(system => [system, 0]));
  const choices = new Map();
  for (const food of foods) {
    const preferred = bySubstance.get(food.primary).home;
    const alternatives = new Map();
    for (const link of food.links) {
      for (const system of link.systems) {
        if (!alternatives.has(system)) alternatives.set(system, link);
      }
    }
    // Keep the preferred substance cluster together unless another documented home is useful.
    food.home = {brs: alternatives.has(preferred) ? preferred : alternatives.keys().next().value, substance: food.primary};
    if (!food.links[0].systems.has(food.home.brs)) food.home.substance = alternatives.get(food.home.brs).substance;
    // Reserve BRS6 for foods whose displayed links only support that placement.
    if (food.home.brs === 'BRS6') {
      const alternative = [...alternatives].find(([brs]) => brs !== 'BRS6');
      if (alternative) food.home = {brs: alternative[0], substance: alternative[1].substance};
    }
    const placement = foodPlacement.get(food.id);
    if (placement && food.links.some(link => link.substance === placement.substance && link.systems.has(placement.brs))) {
      food.home = {...placement, moved: true};
    }
    counts.set(food.home.brs, counts.get(food.home.brs) + 1);
    choices.set(food.id, alternatives);
  }
  const ordered = [...foods].sort((a,b) => a.name.localeCompare(b.name));
  while (true) {
    let move = null;
    for (const food of ordered) {
      if (food.primary === 'vitamin-c' || food.home.moved) continue;
      for (const [brs,link] of choices.get(food.id)) {
        if (brs === 'BRS6') continue;
        const gain = counts.get(food.home.brs) - counts.get(brs);
        const power = link.power ?? -1;
        if (gain > 2 && (!move || gain > move.gain || (gain === move.gain && power > move.power))) {
          move = {food,brs,link,gain,power};
        }
      }
    }
    if (!move) break;
    const {food,brs,link} = move;
    counts.set(food.home.brs, counts.get(food.home.brs) - 1);
    counts.set(brs, counts.get(brs) + 1);
    food.home = {brs, substance:link.substance, moved:true};
  }
}

const point = (radius, angle) => [radius * Math.cos(angle), radius * Math.sin(angle)];
const coordinates = (radius, angle) => point(radius, angle).map(value => value.toFixed(2)).join(' ');
const arc = (radius, a, b) => `A ${radius} ${radius} 0 ${Math.abs(b-a) > Math.PI ? 1 : 0} ${b > a ? 1 : 0} ${coordinates(radius,b)}`;
const shortest = (a, b) => ((b - a + 3 * Math.PI) % tau) - Math.PI;

function ribbon(outer, inner) {
  const delta = shortest(outer, inner);
  const departure = outer + delta * .22;
  const arrival = outer + delta * .78;
  const middle = (foodRadius + substanceRadius) / 2;
  const outerControl = (foodRadius + middle) / 2;
  const innerControl = substanceRadius + (middle - substanceRadius) * .4;
  return `M ${coordinates(foodRadius,outer)} C ${coordinates(outerControl,outer)} ${coordinates(middle,departure)} ${coordinates(middle,departure)} ${arc(middle,departure,arrival)} C ${coordinates(middle,inner)} ${coordinates(innerControl,inner)} ${coordinates(substanceRadius,inner)}`;
}

function draw(data, shortlist, svg, readout, clear, selectAll, minimumPower, powerValue, showDocumented) {
  const {foods, substances, pairs} = twoRingModel(data);
  const interventions = [...brs6Patterns, ...shortlist];
  const colors = new Map(systems.map(id => [id, data.network.colors[data.network.systems.indexOf(id)]]));
  const systemNames = new Map(systems.map(id => [id, data.network.names[data.network.systems.indexOf(id)]]));
  const shortNames = ['Neurochemicals', 'Methylation', 'Inflammation', 'Mitochondria', 'Gut–brain axis', 'Metabolic reg.'];
  const substanceNames = new Map(substances.map(item => [item.id,item.name]));
  const substanceByName = id => substanceNames.get(id);
  const groups = systems.map(id => {
    const items = substances.filter(item => item.home === id).sort((a,b) => a.name.localeCompare(b.name));
    const foodItems = foods.filter(food => food.home.brs === id).sort((a,b) =>
      substanceByName(a.home.substance).localeCompare(substanceByName(b.home.substance)) || a.name.localeCompare(b.name));
    return {id, items, foods: foodItems, weight: Math.max(5, items.length * 2, foodItems.length)};
  });
  const total = groups.reduce((sum,g) => sum + g.weight, 0);
  const north = -Math.PI / 2;
  const brs6 = groups.find(group => group.id === 'BRS6');
  // BRS6 is the final sector, so move its midpoint to twelve o'clock.
  const substanceOffset = Math.PI * brs6.weight / total;
  let start = north;
  for (const group of groups) {
    group.start = start;
    group.end = start + tau * group.weight / total;
    for (const [items, offset] of [[group.items, substanceOffset], [group.foods, 0]]) {
      items.forEach((item,i) => {
        item.angle = start + offset + (group.end-start) * (i+.5) / items.length;
      });
    }
    start = group.end;
  }

  function add(parent, tag, attributes, content) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key,value] of Object.entries(attributes)) el.setAttribute(key,value);
    if (content) el.textContent=content;
    parent.append(el);
    return el;
  }
  const groupLayer = add(svg,'g',{'aria-hidden':'true'});
  for (const group of groups) {
    for (const [radius, offset] of [[substanceRadius, substanceOffset], [foodRadius, 0]]) {
      const start = group.start + offset + .012;
      const end = group.end + offset - .012;
      add(groupLayer,'path',{
        d:`M ${coordinates(radius,start)} ${arc(radius,start,end)}`,
        fill:'none',stroke:colors.get(group.id),'stroke-width':4,'stroke-opacity':.59
      });
    }
  }
  const pathLayer = add(svg,'g',{'aria-hidden':'true'});
  const foodById = new Map(foods.map(item => [item.id,item]));
  const substanceById = new Map(substances.map(item => [item.id,item]));
  const paths = pairs.map(pair => {
    const substance = substanceById.get(pair.substance);
    const food = foodById.get(pair.food);
    const node = add(pathLayer, 'path', {
      class: 'chord', d: ribbon(food.angle, substance.angle), stroke: colors.get(food.home.brs),
      'data-food': food.id, 'data-substance': substance.id, 'data-brs': food.home.brs
    });
    return {...pair, node};
  });

  const midpointRadius = (foodRadius + substanceRadius) / 2;
  const interventionLayer = add(svg, 'g', {'aria-hidden': 'true'});
  const midpointLayer = add(interventionLayer, 'g', {class: 'intervention-midpoint'});
  const interventionChords = [];
  const anchorLayer = add(svg, 'g', {'aria-hidden': 'true'});

  const nodeLayer = add(svg,'g',{});
  const nodes = [];
  function addNode(kind,item,attrs) {
    const label = kind === 'system' ? `${item.id} · ${systemNames.get(item.id)}` : item.name;
    const node = add(nodeLayer,'g',{class:`node ${kind}`,role:'button',tabindex:0,'aria-label':label,'aria-pressed':'false',...attrs});
    nodes.push({kind,item,node,label});
    add(node,'title',{},label);
    return node;
  }
  function radialLabel(kind,item) {
    const isFood = kind === 'food';
    const radius = isFood ? foodRadius : substanceRadius;
    const degrees = item.angle * 180 / Math.PI;
    const flip = Math.cos(item.angle) < 0;
    const sign = (isFood ? 1 : -1) * (flip ? -1 : 1);
    const node = addNode(kind,item,{transform:`translate(${coordinates(radius,item.angle)}) rotate(${degrees+(flip?180:0)})`});
    const system = isFood ? item.home.brs : item.home;
    const noChords = !isFood && !item.hasChords;
    add(node,'circle',{r:3.2,fill:noChords?'var(--white)':colors.get(system),stroke:colors.get(system)});
    const label = isFood
      ? (item.name.length > 31 ? item.name.slice(0, 30) + '…' : item.name)
      : (substanceLabels.get(item.id) ?? item.name);
    add(node,'text',{x:sign*8,dy:'.34em','text-anchor':sign>0?'start':'end'},label);
  }
  foods.forEach(item => radialLabel('food',item));
  substances.forEach(item => radialLabel('substance',item));
  const centreInner = 67;
  const centreOuter = 176;
  const centreHalfGap = 2.5;
  const innerGapAngle = Math.asin(centreHalfGap / centreInner);
  const outerGapAngle = Math.asin(centreHalfGap / centreOuter);
  const sectorAngle = tau / systems.length;
  const systemAngle = index => north + (index + 1) * sectorAngle;
  groups.forEach((group, i) => {
    const angle = systemAngle(i);
    const start = angle - sectorAngle / 2;
    const end = angle + sectorAngle / 2;
    const node = addNode('system', group, {});
    add(node, 'path', {
      d: `M ${coordinates(centreOuter, start + outerGapAngle)} ${arc(centreOuter, start + outerGapAngle, end - outerGapAngle)} L ${coordinates(centreInner, end - innerGapAngle)} ${arc(centreInner, end - innerGapAngle, start + innerGapAngle)} Z`,
      fill: colors.get(group.id), 'fill-opacity': .22, stroke: colors.get(group.id), 'stroke-width': 1.4
    });
    const [labelX, labelY] = point((centreInner + centreOuter) / 2, angle);
    const horizontalOffset = group.id === 'BRS1' ? 5 : 0;
    const label = add(node, 'g', {transform: `translate(${(labelX + horizontalOffset).toFixed(2)} ${labelY.toFixed(2)})`});
    add(label, 'text', {'text-anchor': 'middle', y: -2}, group.id);
    add(label, 'text', {class: 'system-name', 'text-anchor': 'middle', y: 15}, shortNames[i]);
  });

  const title = add(svg, 'g', {class: 'wheel-legend'});
  add(title, 'text', {y: -4}, 'BRAIN');
  add(title, 'text', {y: 17}, 'Food Wheel');

  for (const group of groups) {
    const entries = interventions.filter(item => item.brs === group.id);
    const middle = systemAngle(systems.indexOf(group.id));
    const halfSpan = (sectorAngle - .11) / 2;
    const start = middle - halfSpan;
    const end = middle + halfSpan;
    const color = colors.get(group.id);
    const platform = add(nodeLayer, 'g', {class: 'intervention-platform', 'data-brs': group.id, 'aria-hidden': 'true'});
    add(platform, 'path', {
      d: `M ${coordinates(interventionRadius, start)} ${arc(interventionRadius, start, end)}`,
      fill: 'none', stroke: color, 'stroke-width': 3, 'stroke-opacity': entries.length ? .88 : .48
    });
    const anchor = coordinates(midpointRadius, middle);
    const marker = add(anchorLayer, 'g', {
      class: 'intervention-anchor', 'data-brs': group.id,
      transform: `translate(${anchor})`
    });
    add(marker, 'circle', {r: 7, fill: color, stroke: '#111', 'stroke-width': 1.8});
    add(midpointLayer, 'path', {
      'data-brs': group.id, stroke: color,
      d: `M ${coordinates(midpointRadius, start)} ${arc(midpointRadius, start, end)}`
    });
    const lowerHalf = Math.sin(middle) > .0001;
    const textRadius = midpointRadius - (lowerHalf ? 17 : 20);
    const [textStart, textEnd] = lowerHalf ? [end, start] : [start, end];
    const textPathId = `midpoint-label-${group.id.toLowerCase()}`;
    add(anchorLayer, 'path', {
      id: textPathId, fill: 'none', stroke: 'none',
      d: `M ${coordinates(textRadius, textStart)} ${arc(textRadius, textStart, textEnd)}`
    });
    const anchorLabel = add(anchorLayer, 'text', {class: 'midpoint-tags', 'text-anchor': 'middle'});
    add(anchorLabel, 'textPath', {href: `#${textPathId}`, startOffset: '50%'}, '• Patterns • Interventions • Preparation');
    const [numberX, numberY] = point(27, middle);
    add(marker, 'text', {
      class: 'anchor-number', x: numberX.toFixed(2), y: numberY.toFixed(2), dy: '.34em',
      fill: '#111', 'text-anchor': 'middle'
    }, group.id);
    entries.forEach((item, index) => {
      const angle = start + (end - start) * (index + .5) / entries.length;
      const offsetLabel = entries.length > 4 && index % 2 === 1;
      const controlRadius = (interventionRadius + midpointRadius) / 2;
      const chord = add(interventionLayer, 'path', {
        class: offsetLabel ? 'intervention-chord has-leader' : 'intervention-chord', stroke: color,
        d: `M ${coordinates(interventionRadius, angle)} C ${coordinates(controlRadius, angle)} ${coordinates(controlRadius, middle)} ${anchor}`,
        'data-brs': item.brs, 'data-intervention': item.id
      });
      interventionChords.push({item, chord});
      const degrees = group.id === 'BRS6' ? 0 : angle * 180 / Math.PI + 90;
      const flip = Math.sin(angle) > 0;
      const node = addNode('intervention', item, {
        transform: `translate(${coordinates(interventionRadius, angle)}) rotate(${degrees + (flip ? 180 : 0)})`
      });
      const labelDistance = item.id === 'vinegar-meal' ? 76 : offsetLabel ? 62 : 12;
      if (offsetLabel) {
        const leaderEnd = flip ? labelDistance - 5 : -labelDistance + 8;
        add(node, 'line', {class: 'intervention-leader', x2: 0, y2: leaderEnd, stroke: color});
        add(node, 'circle', {cy: leaderEnd, r: 2.7, fill: color});
      }
      add(node, 'circle', {r: 9, fill: 'transparent'});
      add(node, 'circle', {r: 4, fill: color});
      const labelY = flip ? labelDistance + 7 : -labelDistance;
      const label = add(node, 'text', {y: labelY, 'text-anchor': 'middle'});
      const lines = item.short.split('|');
      lines.forEach((line, index) => {
        add(label, 'tspan', {x: 0, dy: index ? '1em' : lines.length > 1 && !flip ? '-1em' : 0}, line);
      });
    });
  }

  let selected = null;
  function update(active) {
    const cutoff = Number(minimumPower.value);
    const visible = [];
    for (const path of paths) {
      const qualifying = [...path.destinations].filter(([, destination]) =>
        destination.power === null ? showDocumented.checked : destination.power >= cutoff);
      const matching = qualifying.filter(([brs]) => !active || (active.kind === 'food' ? path.food === active.item.id :
        active.kind === 'substance' ? path.substance === active.item.id : brs === active.item.id));
      path.node.classList.toggle('is-filtered', !qualifying.length);
      path.node.classList.toggle('is-muted', Boolean(active) && !matching.length);
      path.node.classList.toggle('is-active', Boolean(active) && Boolean(matching.length));
      if (matching.length) visible.push({...path, matching});
    }
    const rankedCount = visible.filter(path => path.power !== null).length;
    const documentedCount = visible.length - rankedCount;
    powerValue.value = `${cutoff}%`;
    minimumPower.setAttribute('aria-valuetext', `${cutoff}% minimum source power`);
    const visibleNodes = new Set(visible.flatMap(path => [path.food, path.substance, ...path.matching.map(([brs]) => brs)]));
    if (active?.kind === 'system') {
      for (const item of interventions.filter(item => item.brs === active.item.id)) visibleNodes.add(item.id);
    }
    if (active?.kind === 'intervention') visibleNodes.add(active.item.brs);
    for (const node of nodes) {
      if (node.kind === 'intervention' && !active) visibleNodes.add(node.item.id);
      node.node.classList.toggle('is-muted',(Boolean(active) || cutoff > 0 || !showDocumented.checked) && !visibleNodes.has(node.item.id) && node.item !== active?.item);
      node.node.classList.toggle('is-active', node.item === active?.item);
      node.node.setAttribute('aria-pressed', String(node.item === selected?.item));
    }
    for (const {item, chord} of interventionChords) {
      const matches = active?.kind === 'intervention' ? active.item === item :
        active?.kind === 'system' && active.item.id === item.brs;
      chord.classList.toggle('is-active', matches);
      chord.classList.toggle('is-muted', Boolean(active) && !matches);
    }
    clear.disabled = !selected;
    if (!active) {
      readout.textContent = `${foods.length} foods · ${substances.length} substances · ${rankedCount} ranked chords · ${documentedCount} documented unranked chords · ${substances.filter(item=>!item.hasChords).length} substances without a food link`;
      return;
    }
    if (active.kind === 'intervention') {
      const item = active.item;
      const source = document.createElement('a');
      source.href = item.source;
      source.textContent = item.citation;
      readout.replaceChildren(`${item.name} · ${item.brs} · Unscored. ${item.context} `, source);
      return;
    }
    const brs = systems.filter(id => visible.some(path => path.matching.some(([brs]) => brs === id)));
    const placement = active.kind === 'food' ? ` · Placed with ${substanceById.get(active.item.home.substance).name} in ${active.item.home.brs}` :
      active.kind === 'substance' ? ` · Placed in ${active.item.home}` : '';
    const evidence = [...new Set(visible.flatMap(path => path.matching.flatMap(([, destination]) => [...destination.layers])))];
    const summary = visible.length ? `${rankedCount} ranked · ${documentedCount} unranked · ${brs.join(' · ')}` :
      active.kind === 'substance' && !active.item.hasChords ? 'No food link in this snapshot' : 'No connections with these filters';
    readout.textContent = `${active.label}${placement} · ${summary}${evidence.length ? ` · ${evidence.join('; ')}` : ''}`;
  }
  function select(node) {
    selected = selected?.item === node.item ? null : node;
    update(selected);
  }
  for (const node of nodes) {
    node.node.addEventListener('click', () => select(node));
    node.node.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      select(node);
    });
  }
  minimumPower.addEventListener('input', () => update(selected));
  showDocumented.addEventListener('change', () => update(selected));
  clear.addEventListener('click', () => {selected = null; update(null);});
  selectAll.addEventListener('click', () => {
    selected = null;
    minimumPower.value = minimumPower.min;
    showDocumented.checked = true;
    update(null);
  });
  svg.addEventListener('keydown', event => {if (event.key === 'Escape') {selected = null; update(null);}});
  update(null);
}

if (typeof document !== 'undefined') {
  const readout = document.querySelector('#readout');
  try {
    const responses = await Promise.all([fetch('../display-network.json'), fetch('./canonical-links.json'), fetch('./intervention-shortlist.json')]);
    for (const response of responses) {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    }
    const [base, additions, shortlist] = await Promise.all(responses.map(response => response.json()));
    draw(withCanonicalLinks(base, additions), shortlist, document.querySelector('#wheel'), readout, document.querySelector('#clear'), document.querySelector('#select-all'),
      document.querySelector('#minimum-power'), document.querySelector('#power-value'), document.querySelector('#show-documented'));
  } catch (error) {
    readout.textContent = 'Food Wheel data could not be loaded.';
    console.error(error);
  }
}
