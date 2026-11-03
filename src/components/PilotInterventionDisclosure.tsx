import React, {useState} from 'react';

/** Author-approved two-PM pilot; uses the dietary-input trigger typography. */
export default function PilotInterventionDisclosure({id, title, mechanism, children}: {
  id: string; title: string; mechanism?: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return <div id={id} style={{margin: '0.5rem 0 1rem'}}>
    <button type="button" className="brs-dietary-lever-trigger"
      aria-expanded={open} aria-controls={`${id}-atoms`} onClick={() => setOpen(!open)}><span aria-hidden="true" style={{color: "var(--ifm-font-color-base)"}}>{open ? "▾" : "▸"}</span>{" "}{title}</button>
    {mechanism && <div><em>Mechanism: {mechanism}</em></div>}
    <div id={`${id}-atoms`} hidden={!open}>{children}</div>
  </div>;
}
