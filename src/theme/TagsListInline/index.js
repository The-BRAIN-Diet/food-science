import React from 'react';
import TagsListInline from '@theme-original/TagsListInline';

function normalizeTagPermalink(permalink) {
  if (!permalink) {
    return permalink;
  }

  // Collapse duplicated `/docs/tags/` segments such as
  // `/docs/tags/docs/tags/substance` → `/docs/tags/substance`
  return permalink.replace('/docs/tags/docs/tags/', '/docs/tags/');
}

export default function TagsListInlineWrapper(props) {
  const { tags } = props;

  const normalizedTags = Array.isArray(tags)
    ? tags.map((tag) =>
        tag && typeof tag === 'object'
          ? { ...tag, permalink: normalizeTagPermalink(tag.permalink) }
          : tag,
      )
    : tags;

  return <TagsListInline {...props} tags={normalizedTags} />;
}

