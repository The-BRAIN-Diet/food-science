import React from 'react';
import Details from '@theme/Details';

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

export default function Collapse({ title, children }: CollapseProps) {
  return (
    <Details summary={title}>
      {children}
    </Details>
  );
}

