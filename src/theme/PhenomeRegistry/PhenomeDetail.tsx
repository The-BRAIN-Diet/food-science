import React from 'react';
import PhenomeDetailView from './PhenomeDetailView';

type Props = {
  phenomeId: string;
};

export default function PhenomeDetail({ phenomeId }: Props): React.ReactElement {
  return <PhenomeDetailView phenomeId={phenomeId} />;
}
