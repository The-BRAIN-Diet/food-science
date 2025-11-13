import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData'
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css'


function DocItemImage({ doc }) {
  return (
    <article key={doc.title} className="margin-vert--lg">
      <div className={styles.columns}>
        <div className={styles.left}>
          <img src={doc.frontMatter.list_image} className={styles.articleImage} />
        </div>
        <div className={styles.right}>
          <Link to={doc.permalink}>
            <h3>{doc.title}</h3>
          </Link>
          {doc.description && <p>{doc.description}</p>}
        </div>
      </div>
    </article>
  );
}

export default function TagList(props) {

  function uniqueOnly(value, index, array) {
    return array.map(o => o.permalink).indexOf(value.permalink) == index;
  }

  const allTags = usePluginData('category-listing') || {};
  const oneTag = props.tag
    ? (allTags[props.tag] || [])
    : Object.values(allTags)
      .flatMap(a => Array.isArray(a) ? a : [])
      .filter(uniqueOnly)
  const filter = props.filter ? '/' + props.filter + '/' : ''
  const location = useLocation().pathname;

  if (!Array.isArray(oneTag)) {
    return <div className="bok-tag-list"><em>no documents tagged</em></div>;
  }

  oneTag.sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredDocs = oneTag
    .filter(d => d.permalink.indexOf(filter) > -1)
    .filter(d => d.permalink != location);

  return (
    <div className="bok-tag-list" key={props.tag}>
      {
        filteredDocs.length === 0 ? (
          <em>no documents tagged</em>
        ) : (
          filteredDocs.map(d => <DocItemImage key={d.title} doc={d} />)
        )
      }
    </div>
  );
}