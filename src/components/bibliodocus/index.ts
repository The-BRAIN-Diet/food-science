/**
 * `bibliodocus` - BibTeX to Bibliography Components for Docusaurus
 * 
 * This module exports components for loading, parsing, and displaying
 * BibTeX references in a Docusaurus site.
 * 
 * @module bibliodocus
 */

/**
 * Export components for use in Docusaurus
 */
export { default as BibTexLoader } from './BibTexLoader';
export { default as ReferenceList } from './ReferenceList';
export { default as BibTexReferences } from './BibTexReferences';
export { default as BibTexDebugger } from './BibTexDebugger';
export { default as BibTexFilterControls } from './BibTexFilterControls';

/**
 * Export types and formatters
 */
export * from './ReferenceFormatters';
export type { BibEntry } from './ReferenceList';