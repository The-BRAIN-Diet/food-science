import React, { useState, useCallback } from 'react';
import BibTexLoader from './BibTexLoader';
import ReferenceList, { BibEntry } from './ReferenceList';
import { ReferenceStyle } from './ReferenceFormatters';

/**
 * Props for the BibTexReferences component.
 * 
 * @interface BibTexReferencesProps
 * @property {string} filePath - Path to the BibTeX file to load (relative to the static directory)
 * @property {string} [title] - Optional title for the references section
 * @property {ReferenceStyle} [style] - Citation style to use for formatting
 * @property {boolean} [showCitationKeys] - Whether to display citation keys
 * @property {function} [filter] - Function to filter entries
 * @property {string} [sortBy] - Field to sort entries by
 * @property {string} [sortDirection] - Direction to sort (ascending or descending)
 * @property {string} [className] - Additional CSS class for styling
 * @property {React.ReactNode} [loadingComponent] - Custom component to display while loading
 * @property {React.ReactNode | function} [errorComponent] - Custom component or function to display errors
 */
interface BibTexReferencesProps {
  filePath: string;
  title?: string;
  style?: ReferenceStyle;
  showCitationKeys?: boolean;
  filter?: (entry: BibEntry) => boolean;
  sortBy?: 'year' | 'author' | 'title' | 'citationKey';
  sortDirection?: 'asc' | 'desc';
  className?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode | ((error: Error) => React.ReactNode);
}

/**
 * Main component for loading and displaying BibTeX references.
 * This component combines the BibTexLoader and ReferenceList components
 * to provide a complete solution for displaying references from a BibTeX file.
 *
 * @component
 * @param {BibTexReferencesProps} props - Component properties
 * @returns {JSX.Element} - The rendered references component
 */
const BibTexReferences: React.FC<BibTexReferencesProps> = ({
  filePath,
  title = 'References',
  style = 'apa',
  showCitationKeys = false,
  filter,
  sortBy = 'year',
  sortDirection = 'desc',
  className = '',
  loadingComponent,
  errorComponent,
}) => {
  // Store the parsed BibTeX entries
  const [entries, setEntries] = useState<BibEntry[]>([]);
  // Track any loading errors
  const [error, setError] = useState<Error | null>(null);
  // Track whether loading has completed (successfully or with error)
  const [loaded, setLoaded] = useState<boolean>(false);

  /**
   * Callback function for when entries are successfully loaded.
   * 
   * @param {BibEntry[]} loadedEntries - The parsed BibTeX entries
   */
  const handleLoad = useCallback((loadedEntries: BibEntry[]) => {
    setEntries(loadedEntries);
    setLoaded(true);
  }, []);

  /**
   * Callback function for when an error occurs during loading.
   * 
   * @param {Error} err - The error that occurred
   */
  const handleError = useCallback((err: Error) => {
    setError(err);
    setLoaded(true);
  }, []);

  return (
    <div className={`bibtex-references ${className}`}>
      {/* Show the loader only when content is not yet loaded */}
      {!loaded && (
        <BibTexLoader
          filePath={filePath}
          onLoad={handleLoad}
          onError={handleError}
          renderLoading={() => 
            // Use custom loading component if provided, otherwise show default
            loadingComponent ? 
              <>{loadingComponent}</> : 
              <div className="bibtex-loading">Loading references...</div>
          }
        />
      )}

      {/* Show error message if loading failed */}
      {loaded && error && (
        <div className="bibtex-error">
          {errorComponent ? 
            // Support both function and component for error display
            (typeof errorComponent === 'function' ? 
              errorComponent(error) : 
              errorComponent) : 
            <p>Error loading references: {error.message}</p>
          }
        </div>
      )}

      {/* Display the references if loading was successful */}
      {loaded && !error && (
        <>
          {/* Optional title for the references section */}
          {title && <h2 className="bibtex-references-title">{title}</h2>}
          {/* Render the reference list with all formatting options */}
          <ReferenceList
            entries={entries}
            style={style}
            showCitationKeys={showCitationKeys}
            filter={filter}
            sortBy={sortBy}
            sortDirection={sortDirection}
          />
        </>
      )}
    </div>
  );
};//

export default BibTexReferences;