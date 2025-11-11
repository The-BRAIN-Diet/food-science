import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ReferenceStyle } from './ReferenceFormatters';
import { BibEntry } from './ReferenceList';
import * as bibtexParse from '@orcid/bibtex-parse-js';

/**
 * Props for the BibTexFilterControls component
 */
interface BibTexFilterControlsProps {
  filePath: string;
  defaultStyle?: ReferenceStyle;
  showCitationKeys?: boolean;
  className?: string;
}

/**
 * Paper type option with display name and entry type
 */
interface PaperTypeOption {
  id: string;
  label: string;
  entryTypes: string[];
}

/**
 * Component that provides citation style dropdown and paper type checkboxes
 * along with filtered BibTeX references
 */
const BibTexFilterControls: React.FC<BibTexFilterControlsProps> = ({
  filePath,
  defaultStyle = 'apa',
  showCitationKeys = false,
  className = '',
}) => {
  // State for citation style
  const [style, setStyle] = useState<ReferenceStyle>(defaultStyle);
  // State for BibTeX entries
  const [entries, setEntries] = useState<BibEntry[]>([]);
  // State for available paper types (will be populated dynamically)
  const [availableTypes, setAvailableTypes] = useState<PaperTypeOption[]>([]);
  // State for selected paper types
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  // State for loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State for error
  const [error, setError] = useState<Error | null>(null);

  // Citation style options
  const styleOptions: { value: ReferenceStyle; label: string }[] = [
    { value: 'apa', label: 'APA Style' },
    { value: 'mla', label: 'MLA Style' },
    { value: 'chicago', label: 'Chicago Style' },
    { value: 'ieee', label: 'IEEE Style' },
    { value: 'harvard', label: 'Harvard Style' },
  ];

  // Predefined paper type mappings
  const paperTypeDefinitions: PaperTypeOption[] = [
    { 
      id: 'article', 
      label: 'Journal Articles', 
      entryTypes: ['article'] 
    },
    { 
      id: 'conference', 
      label: 'Conference Papers', 
      entryTypes: ['inproceedings', 'conference'] 
    },
    { 
      id: 'book', 
      label: 'Books', 
      entryTypes: ['book'] 
    },
    { 
      id: 'bookchapter', 
      label: 'Book Chapters', 
      entryTypes: ['incollection', 'inbook'] 
    },
    { 
      id: 'thesis', 
      label: 'Theses & Dissertations', 
      entryTypes: ['phdthesis', 'mastersthesis', 'thesis'] 
    },
    { 
      id: 'techreport', 
      label: 'Technical Reports', 
      entryTypes: ['techreport', 'report'] 
    },
    { 
      id: 'other', 
      label: 'Other Publications', 
      entryTypes: ['misc', 'unpublished', 'manual', 'electronic'] 
    },
  ];

  // Load BibTeX file on component mount
  useEffect(() => {
    const fetchBibTexFile = async () => {
      try {
        setLoading(true);
        const response = await fetch(filePath);
        
        if (!response.ok) {
          throw new Error(`Failed to load BibTeX file: ${response.statusText}`);
        }
        
        const bibContent = await response.text();
        const parsedEntries = bibtexParse.toJSON(bibContent);
        
        // Store the loaded entries
        setEntries(parsedEntries);
        
        // Determine which paper types are present in the file
        const presentTypes = paperTypeDefinitions.filter(type => 
          parsedEntries.some(entry => 
            type.entryTypes.includes(entry.entryType.toLowerCase())
          )
        );
        
        setAvailableTypes(presentTypes);
        
        // Initially select all available types
        setSelectedTypes(presentTypes.map(type => type.id));
        
        setLoading(false);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        setLoading(false);
      }
    };

    fetchBibTexFile();
  }, [filePath]);

  // Handle style change
  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStyle(e.target.value as ReferenceStyle);
  };

  // Handle paper type checkbox change
  const handleTypeChange = (typeId: string) => {
    setSelectedTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  // Get the filtered entries based on selected paper types
  const getFilteredEntries = () => {
    if (selectedTypes.length === 0) return [];
    
    // Get all entry types from the selected paper type options
    const selectedEntryTypes = availableTypes
      .filter(type => selectedTypes.includes(type.id))
      .flatMap(type => type.entryTypes);
    
    // Filter the entries by the selected entry types
    return entries.filter(entry => 
      selectedEntryTypes.includes(entry.entryType.toLowerCase())
    );
  };

  // Render function for the controls and references
  const FilterControlsContent = () => {
    if (loading) {
      return <div className="bibtex-loading">Loading references...</div>;
    }

    if (error) {
      return <div className="bibtex-error">Error loading references: {error.message}</div>;
    }

    const filteredEntries = getFilteredEntries();

    return (
      <div className={`bibtex-filter-controls ${className}`}>
        {/* Controls section */}
        <div className="bibtex-controls">
          <div className="citation-style-selector">
            <label htmlFor="citation-style">Citation Style:</label>
            <select 
              id="citation-style" 
              value={style} 
              onChange={handleStyleChange}
              className="citation-style-select"
            >
              {styleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="paper-type-filters">
            <div className="paper-type-label">Filter by Type:</div>
            <div className="paper-type-checkboxes">
              {availableTypes.map(type => (
                <div key={type.id} className="paper-type-checkbox-item">
                  <input 
                    type="checkbox"
                    id={`type-${type.id}`}
                    checked={selectedTypes.includes(type.id)}
                    onChange={() => handleTypeChange(type.id)}
                  />
                  <label htmlFor={`type-${type.id}`}>{type.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* References section */}
        <div className="bibtex-filtered-references">
          {filteredEntries.length === 0 ? (
            <div className="no-references">No references match the selected filters.</div>
          ) : (
            <div className="references-container">
              <ol className="references-list">
                {filteredEntries.map((entry, index) => (
                  <li 
                    key={entry.citationKey || `ref-${index}`} 
                    id={entry.citationKey || `ref-${index}`}
                    className={`reference-item reference-type-${entry.entryType.toLowerCase()}`}
                  >
                    {showCitationKeys && entry.citationKey && (
                      <span className="citation-key">[{entry.citationKey}] </span>
                    )}
                    {/* Import and use formatReference here */}
                    <span 
                      className="reference-text"
                      dangerouslySetInnerHTML={{ 
                        __html: formatReference(entry, style) 
                      }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Use BrowserOnly to ensure this component only runs in browser
  return (
    <BrowserOnly>
      {() => <FilterControlsContent />}
    </BrowserOnly>
  );
};

// Import formatReference function to format citations
import { formatReference } from './ReferenceFormatters';

export default BibTexFilterControls;