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
    <article key={doc.permalink} className="margin-vert--lg">
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

interface FolderListProps {
  folder: string;
}

export default function FolderList({ folder }: FolderListProps): React.ReactElement {
  const allTags = usePluginData('category-listing') || {};

  // Normalize folder path (remove leading/trailing slashes)
  let normalizedFolder = folder.trim().replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
  
  // Ensure it doesn't start with docs/ (we'll add that for comparison)
  normalizedFolder = normalizedFolder.replace(/^docs\//, '');

  // Get all substance documents
  const allDocs = Object.values(allTags).flat() as Document[];
  const allSubstances = allDocs.filter(
    (d: Document) => d.permalink && d.permalink.includes('/substances/')
  );

  // Remove duplicates by permalink
  const uniqueSubstances = Array.from(
    new Map(allSubstances.map((d: Document) => [d.permalink, d])).values()
  );

  // Find immediate substance files (not nested, not README/index)
  const immediateSubstances = uniqueSubstances.filter((substance: Document) => {
    if (!substance.permalink) return false;
    
    // Get the folder path for this substance (everything up to the filename)
    const substancePath = substance.permalink.substring(0, substance.permalink.lastIndexOf('/'));
    
    // Remove /docs prefix for comparison
    const substanceFolder = substancePath.replace(/^\/docs\//, '');
    
    // Check if this substance is in the exact folder (immediate child only)
    if (substanceFolder !== normalizedFolder) {
      return false;
    }
    
    // Exclude README.md and index.md files
    const filename = substance.permalink.substring(substance.permalink.lastIndexOf('/') + 1);
    if (filename === 'README' || filename === 'index' || filename === 'README.md' || filename === 'index.md') {
      return false;
    }
    
    return true;
  });

  // Find immediate subfolders: any folder one level below this one that contains docs (at any depth)
  const subfolderPaths = new Set<string>();
  uniqueSubstances.forEach((substance: Document) => {
    if (!substance.permalink) return;
    
    const substancePath = substance.permalink.substring(0, substance.permalink.lastIndexOf('/'));
    const substanceFolder = substancePath.replace(/^\/docs\//, '');
    
    // Any doc under this folder (one or more levels deeper) counts; take first segment as subfolder
    if (substanceFolder.startsWith(normalizedFolder + '/') && substanceFolder !== normalizedFolder) {
      const relativePath = substanceFolder.substring(normalizedFolder.length + 1);
      const firstSegment = relativePath.split('/')[0];
      if (firstSegment) {
        subfolderPaths.add(`${normalizedFolder}/${firstSegment}`);
      }
    }
  });

  // Helper: format folder segment as display name (e.g. "essential" -> "Essential", "conditionals" -> "Conditionals")
  const formatFolderName = (path: string): string => {
    const folderName = path.split('/').pop() || path;
    return folderName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get README.md or index for subfolder title/link; fall back to folder name + first doc for link
  const subfolders: Array<{ path: string; title: string; permalink: string }> = [];
  subfolderPaths.forEach((subfolderPath) => {
    const readmeDoc = allDocs.find((doc: Document) => {
      if (!doc.permalink) return false;
      const docPath = doc.permalink.replace(/^\/docs\//, '').replace(/\/$/, '');
      return docPath === `${subfolderPath}/README` || docPath === subfolderPath;
    });

    const title = readmeDoc ? readmeDoc.title : formatFolderName(subfolderPath);
    // Prefer index permalink when we have it; otherwise link to the category path (index is served by Docusaurus)
    const permalink = readmeDoc
      ? readmeDoc.permalink.replace(/\/$/, '')
      : `/docs/${subfolderPath}/`;

    subfolders.push({ path: subfolderPath, title, permalink });
  });

  // Sort subfolders by title
  subfolders.sort((a, b) => a.title.localeCompare(b.title));

  // Sort substances by title
  immediateSubstances.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  return (
    <div className="bok-tag-list">
      {/* Render subfolders first */}
      {subfolders.map((subfolder) => (
        <article key={subfolder.permalink} className="margin-vert--lg">
          <div className={styles.columns}>
            <div className={styles.left}>
              <img src="/img/icons/ingredients.svg" className={styles.articleImage} alt="Folder" />
            </div>
            <div className={styles.right}>
              <Link to={subfolder.permalink}>
                <h3>{subfolder.title}</h3>
              </Link>
              <p style={{ fontStyle: 'italic', color: 'var(--ifm-color-content-secondary)' }}>
                Category
              </p>
            </div>
          </div>
        </article>
      ))}
      
      {/* Then render immediate substance files */}
      {immediateSubstances.length === 0 && subfolders.length === 0 ? (
        <em>no items in this category</em>
      ) : (
        immediateSubstances.map((d: Document) => <DocItemImage key={d.permalink} doc={d} />)
      )}
    </div>
  );
}
