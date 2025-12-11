import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import styles from '../TagList/styles.module.css';
import InChIImage from '../InChIImage';

type Document = {
  title: string;
  description?: string;
  permalink: string;
  frontMatter?: {
    inchikey?: string;
    inchi_image?: string;
    list_image?: string;
  };
};

function DocItemImage({ doc }: { doc: Document }) {
  const isSubstance = doc.permalink && doc.permalink.includes("/substances/");
  const inchikey = doc.frontMatter?.inchikey;
  const inchiImage = doc.frontMatter?.inchi_image;
  const listImage = doc.frontMatter?.list_image;

  return (
    <article key={doc.title} className="margin-vert--lg">
      <div className={styles.columns}>
        <div className={styles.left}>
          {isSubstance && inchiImage ? (
            <img src={inchiImage} alt="Chemical structure" className={styles.articleImage} />
          ) : isSubstance && inchikey ? (
            <InChIImage inchikey={inchikey} fallback={listImage} className={styles.articleImage} />
          ) : (
            <img src={listImage || "/img/icons/ingredients.svg"} className={styles.articleImage} />
          )}
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

export default function SubstanceList(): React.ReactElement {
  const allTags = usePluginData('category-listing') || {};
  const location = useLocation().pathname;

  // Get all substance documents
  const allDocs = Object.values(allTags).flat() as Document[];
  const allSubstances = allDocs.filter(
    (d: Document) => d.permalink && d.permalink.includes('/substances/')
  );

  // Remove duplicates
  const uniqueSubstances = Array.from(
    new Map(allSubstances.map((d: Document) => [d.permalink, d])).values()
  );

  // Filter substances that are in the current folder path
  // e.g., if we're at /docs/substances/bioactive-compounds/polyphenols/
  // we want substances whose permalink starts with that path
  const currentPath = location.replace(/\/$/, ''); // Remove trailing slash
  const filteredSubstances = uniqueSubstances.filter((substance: Document) => {
    if (!substance.permalink) return false;
    
    // Get the folder path for this substance (everything up to the filename)
    const substancePath = substance.permalink.substring(0, substance.permalink.lastIndexOf('/'));
    
    // Check if this substance is in the current folder or a subfolder
    return substancePath.startsWith(currentPath) && substancePath !== currentPath;
  });

  // Sort by title
  filteredSubstances.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  return (
    <div className="bok-tag-list">
      {filteredSubstances.length === 0 ? (
        <em>no substances in this category</em>
      ) : (
        filteredSubstances.map((d: Document) => <DocItemImage key={d.permalink} doc={d} />)
      )}
    </div>
  );
}
