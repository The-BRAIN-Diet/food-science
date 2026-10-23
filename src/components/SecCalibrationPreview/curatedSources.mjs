/** Preview-only, verified biochemical provenance. No bibliography or admission logic. */
const VERIFIED = Object.freeze({
  'Rhea:RHEA:17785': {database: 'Rhea', accession: 'RHEA:17785', href: 'https://www.rhea-db.org/rhea/17785', scope: 'GAD reaction: L-glutamate + proton → GABA + carbon dioxide; organism-independent reaction identity.'},
  'Reactome:R-HSA-888572.3': {database: 'Reactome', accession: 'R-HSA-888572.3', href: 'https://reactome.org/content/detail/R-HSA-888572', scope: 'Human GAD1/GAD67 reaction; externally reviewed event, version 3.'},
  'Reactome:R-HSA-888577.3': {database: 'Reactome', accession: 'R-HSA-888577.3', href: 'https://reactome.org/content/detail/R-HSA-888577', scope: 'Human GAD2/GAD65 reaction; externally reviewed event, version 3.'},
  'UniProtKB:Q99259': {database: 'UniProt', accession: 'Q99259', href: 'https://www.uniprot.org/uniprotkb/Q99259/entry', scope: 'Reviewed human GAD1/GAD67: glutamate decarboxylase reaction and PLP cofactor annotation; UniProt 2026_03, entry version 223.'},
  'UniProtKB:Q05329': {database: 'UniProt', accession: 'Q05329', href: 'https://www.uniprot.org/uniprotkb/Q05329/entry', scope: 'Reviewed human GAD2/GAD65: glutamate decarboxylase reaction and PLP cofactor annotation; UniProt 2026_03, entry version 202.'},
  'Reactome:R-HSA-964975.4': {database: 'Reactome', accession: 'R-HSA-964975.4', href: 'https://reactome.org/content/detail/R-HSA-964975', scope: 'Human vitamin B6 activation: PDXK phosphorylation, with PNPO completing pyridoxine/pyridoxamine activation; externally reviewed pathway, version 4.'},
  'UniProtKB:O00764': {database: 'UniProt', accession: 'O00764', href: 'https://www.uniprot.org/uniprotkb/O00764/entry', scope: 'Reviewed human PDXK: PL → PLP, PN → PNP, PM → PMP; UniProt 2026_03, entry version 219.'},
  'UniProtKB:Q9NVS9': {database: 'UniProt', accession: 'Q9NVS9', href: 'https://www.uniprot.org/uniprotkb/Q9NVS9/entry', scope: 'Reviewed human PNPO: PNP/PMP → PLP; UniProt 2026_03, entry version 211.'},
});

const BY_ATOM = Object.freeze({
  'PM9-DIT-1': ['Rhea:RHEA:17785', 'Reactome:R-HSA-888572.3', 'Reactome:R-HSA-888577.3', 'UniProtKB:Q99259', 'UniProtKB:Q05329'],
  'PM9-DIT-2': ['UniProtKB:Q99259', 'UniProtKB:Q05329'],
  'PM9-DIT-3': ['Reactome:R-HSA-964975.4', 'UniProtKB:O00764', 'UniProtKB:Q9NVS9'],
});

const TITLES = [
  'L-glutamate + H(+) = 4-aminobutanoate + CO2',
  'PXLP-K405-GAD1 decarboxylates L-Glu to form GABA',
  'Synthesis of GABA by GAD2',
  'Glutamate decarboxylase 1 (human GAD1/GAD67)',
  'Glutamate decarboxylase 2 (human GAD2/GAD65)',
  'Vitamin B6 activation to pyridoxal phosphate',
  'Pyridoxal kinase (human PDXK)',
  'Pyridoxine-5′-phosphate oxidase (human PNPO)',
];

export const previewCuratedReferences = Object.values(VERIFIED).map((source, index) => ({
  ...source, title: TITLES[index], label: `C${index + 1}`,
  anchor: `pm-curated-${index + 1}`, accessed: '2026-10-16',
}));

/** Only exact previously verified identifiers produce links. Never accept a supplied URL. */
export function curatedSourcesFor(resources) {
  const seen = new Set();
  return (Array.isArray(resources) ? resources : []).flatMap(key => {
    if (typeof key !== 'string' || !Object.hasOwn(VERIFIED, key)) return [];
    const source = VERIFIED[key];
    const identity = `${source.database}:${source.accession}`;
    if (seen.has(identity)) return [];
    seen.add(identity);
    return [previewCuratedReferences.find(reference => reference.accession === source.accession)];
  });
}

/** Reuse the existing pathway_resources string-array field in page-body data only. */
export function withPreviewCuratedSources(data) {
  if (data?.pm_id !== 'BRS1-FM4-PM9') return data;
  return {
    ...data,
    dietary_input_traceability: (data.dietary_input_traceability || []).map(atom => {
      const resources = BY_ATOM[atom.atom_id];
      if (!resources) return atom;
      return {...atom, evidence_source: {...atom.evidence_source,
        pathway_resources: [...new Set([...(atom.evidence_source?.pathway_resources || []), ...resources])],
      }};
    }),
  };
}

/** Preview-only DOM adapter: preserve the six atoms and existing paper/source links. */
export function preparePreviewDisclosure(li, detail, atom) {
  // An empty category is a status message, not an expandable list or an empty bullet.
  li.querySelectorAll(':scope > details.pm-input-food-sources').forEach(box => {
    const empty = box.querySelector('.pm-input-food-source-empty');
    if (!empty || box.querySelector('a')) return;
    const message = box.ownerDocument.createElement('p');
    message.className = 'pm-input-food-empty-status';
    message.textContent = box.querySelector('summary')?.textContent.replace(/^[▶▼]\s*/, '') || empty.textContent;
    box.replaceWith(message);
  });
  if (atom.atom_id === 'PM9-DIT-3') {
    const role = Array.from(detail.children).find(p => p.querySelector('.brs-dietary-lever-detail-k')?.textContent === 'Biological role');
    const wording = ' = Supplies precursors for PLP formation through PDXK and PNPO, supporting the cofactor requirement for GAD-dependent GABA synthesis.';
    if (role && role.childNodes[1]?.textContent !== wording) role.childNodes[1].textContent = wording;
    const dietary = Array.from(detail.children).find(p => p.querySelector('.brs-dietary-lever-detail-k')?.textContent === 'Dietary input');
    if (dietary?.childNodes[1]?.textContent === ' = Yes') dietary.childNodes[1].textContent = ' = Yes — Derived';
  }
  const evidence = detail.querySelector(':scope > .brs-dietary-lever-detail-evidence');
  if (!evidence) return null;
  let slot = evidence.querySelector(':scope > [data-curated-slot]');
  if (!slot) {
    slot = evidence.ownerDocument.createElement('span');
    slot.dataset.curatedSlot = atom.atom_id;
    evidence.append(slot);
  }
  return slot;
}
