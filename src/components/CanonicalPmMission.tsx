import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

/** One current mission, owned by canonical PM frontmatter. No editorial fallback. */
export default function CanonicalPmMission() {
  const {frontMatter} = useDoc();
  const mission = (frontMatter as {mission?: string}).mission;
  if (!mission) throw new Error('Canonical PM mission is missing');
  return <p>{mission}</p>;
}
