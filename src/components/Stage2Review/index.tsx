import React, {type ReactNode} from 'react';

/** Legacy source compatibility only. Dated execution reports are not canonical page content. */
export function Stage2ReviewProvider({children}: {children: ReactNode}) {
  return <>{children}</>;
}

/** Preserve historical MDX source without publishing the obsolete review panel. */
export default function Stage2Review(_props: {children?: ReactNode}) {
  return null;
}

export function Stage2ReviewOutlet() {
  return null;
}
