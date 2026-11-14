import React, {useState} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import rollup from '../data/foodStrategyRollup.generated.json';
import {interventionMappingForId} from '../lib/interventionFoodSubstance.mjs';
import {renderInterventionLinks} from '../lib/interventionFoodSubstanceDisplay.mjs';

/** Author-approved two-PM pilot; uses the dietary-input trigger typography. */
export default function PilotInterventionDisclosure({id, title, mechanism, children}: {
  id: string; title: string; mechanism?: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const {frontMatter} = useDoc();
  const mapping = interventionMappingForId(rollup.intervention_mapping.records.filter(record => record.pm === frontMatter.pm_id), id);
  const links = renderInterventionLinks(mapping);
  return <div id={id} style={{margin: '0.5rem 0 1rem'}}>
    <button type="button" className="brs-dietary-lever-trigger"
      aria-expanded={open} aria-controls={`${id}-atoms`} onClick={() => setOpen(!open)}><span aria-hidden="true" style={{color: "var(--ifm-font-color-base)"}}>{open ? "▾" : "▸"}</span>{" "}{title}</button>
    {links && <div dangerouslySetInnerHTML={{__html: links}} />}
    {mechanism && <div><em>Mechanism: {mechanism}</em></div>}
    <div id={`${id}-atoms`} hidden={!open}>{children}</div>
  </div>;
}
