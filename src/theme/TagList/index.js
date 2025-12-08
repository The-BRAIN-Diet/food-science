import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData'
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css'
import InChIImage from '../InChIImage';

function DocItemImage({ doc }) {
  const isSubstance = doc.permalink && doc.permalink.includes("/substances/");
  const inchikey = doc.frontMatter?.inchikey;
  const listImage = doc.frontMatter?.list_image;

  return (
    <article key={doc.title} className="margin-vert--lg">
      <div className={styles.columns}>
        <div className={styles.left}>
          {isSubstance && inchikey ? (
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

export default function TagList(props) {

  function uniqueOnly(value, index, array) {
    return array.map(o => o.permalink).indexOf(value.permalink) == index;
  }

  const allTags = usePluginData('category-listing') || {};
  const filter = props.filter ? '/' + props.filter + '/' : ''
  const location = useLocation().pathname;

  let oneTag = [];
  
  if (props.tag) {
    // If filtering for substances, ONLY get substances (don't include foods)
    if (filter === '/substances/') {
      const allDocs = Object.values(allTags).flat();
      const allSubstances = allDocs.filter(d => d.permalink && d.permalink.includes('/substances/'));
      
      // Remove duplicates
      const uniqueSubstances = Array.from(
        new Map(allSubstances.map(d => [d.permalink, d])).values()
      );
      
      // Normalize tag name for matching
      const getTagName = (title) => {
        return title.split('(')[0].trim();
      };
      
      const tagName = getTagName(props.tag);
      
      // Find substances that have the tag
      const taggedSubstances = uniqueSubstances.filter(substance => {
        if (!substance.tags || !Array.isArray(substance.tags)) return false;
        const substanceTagLabels = substance.tags.map(t => typeof t === 'string' ? t : t.label);
        return substanceTagLabels.some(substanceTag => {
          const normalizedSubstanceTag = getTagName(substanceTag);
          return substanceTag === props.tag || substanceTag === tagName || normalizedSubstanceTag === tagName;
        });
      });
      
      oneTag = taggedSubstances;
    } else {
      // First try to get from allTags[tag]
      oneTag = allTags[props.tag] || [];
      
      // If filtering for foods and we have a tag, also search all foods directly
      // This ensures we find foods even if tag mapping isn't perfect
      if (filter === '/foods/' && props.tag) {
        const allDocs = Object.values(allTags).flat();
        const allFoods = allDocs.filter(d => d.permalink && d.permalink.includes('/foods/'));
        
        // Remove duplicates
        const uniqueFoods = Array.from(
          new Map(allFoods.map(d => [d.permalink, d])).values()
        );
        
        // Normalize tag name for matching
        const getTagName = (title) => {
          return title.split('(')[0].trim();
        };
        
        const tagName = getTagName(props.tag);
        
        // Find foods that have the tag
        const taggedFoods = uniqueFoods.filter(food => {
          if (!food.tags || !Array.isArray(food.tags)) return false;
          const foodTagLabels = food.tags.map(t => typeof t === 'string' ? t : t.label);
          return foodTagLabels.some(foodTag => {
            const normalizedFoodTag = getTagName(foodTag);
            return foodTag === props.tag || foodTag === tagName || normalizedFoodTag === tagName;
          });
        });
        
        // Merge with existing results and deduplicate
        const allResults = [...oneTag, ...taggedFoods];
        oneTag = Array.from(new Map(allResults.map(d => [d.permalink, d])).values());
      }
    }
  } else {
    // No tag specified, get all documents
    oneTag = Object.values(allTags)
      .flatMap(a => Array.isArray(a) ? a : [])
      .filter(uniqueOnly);
  }

  if (!Array.isArray(oneTag)) {
    return <div className="bok-tag-list"><em>no documents tagged</em></div>;
  }

  oneTag.sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredDocs = oneTag
    .filter(d => d.permalink && d.permalink.indexOf(filter) > -1)
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