import React from 'react';
import Link from '@docusaurus/Link';

/**
 * Renders doc footer tags as inline links.
 * Used by @docusaurus/theme-classic DocItem/Footer.
 * tags: array of { label, permalink } from doc metadata
 */
export default function TagsListInline({ tags }) {
  if (!tags || tags.length === 0) {
    return null;
  }
  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag.permalink}
          className="margin-horiz--sm"
          to={tag.permalink}
        >
          {tag.label}
        </Link>
      ))}
    </>
  );
}
