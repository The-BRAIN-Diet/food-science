import React, {useEffect, useRef, type ReactNode} from 'react';
import {useLocation} from '@docusaurus/router';
import {initBrsFmHubDropdowns} from '../../client/brsFmHubDropdown';

/** Existing canonical disclosure markup and behaviour, with stable record anchors. */
export default function EvidenceDisclosure({id,label,title,status,children}:{id:string;label:string;title:ReactNode;status?:string;children:ReactNode}) {
  const root=useRef<HTMLDivElement>(null),location=useLocation();
  useEffect(()=>{if(root.current)initBrsFmHubDropdowns(root.current);},[location.hash]);
  return <div ref={root}><div id={id.toLowerCase()} className="brs-fm-hub-item brain-sf-disclosure" data-brs-fm-hub>
    <div className="brs-fm-hub-shell">
      <button id={`${id.toLowerCase()}-toggle`} type="button" className="brs-fm-hub-summary" aria-expanded="false" aria-controls={`${id.toLowerCase()}-panel`}>
        <span className="brs-fm-hub-chevron" aria-hidden="true" />
        <span><strong>{label}{status && ` — ${status}`}</strong>{' · '}{title}</span>
      </button>
      <div id={`${id.toLowerCase()}-panel`} className="brs-fm-hub-panel" role="region" aria-labelledby={`${id.toLowerCase()}-toggle`} hidden>{children}</div>
    </div>
  </div></div>;
}
