import React, { useState, useCallback, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import * as bibtexParse from '@orcid/bibtex-parse-js';
import { BibEntry } from './ReferenceList';

/**
 * Props for the BibTexDebugger component.
 * 
 * @interface BibTexDebuggerProps
 * @property {string} [filePath] - Optional path to a BibTeX file to load (relative to static directory)
 * @property {string} [initialContent] - Optional initial BibTeX content to populate the editor
 * @property {string} [className] - Additional CSS class for styling
 */
interface BibTexDebuggerProps {
  filePath?: string;
  initialContent?: string;
  className?: string;
}

/**
 * Component for debugging BibTeX files by providing a text editor and parser.
 * Can load BibTeX content from a file or allow manual input for testing.
 * Displays parsed entries and parsing errors for debugging purposes.
 *
 * @component
 * @param {BibTexDebuggerProps} props - Component properties
 * @returns {JSX.Element} - The rendered debugger component (browser-only)
 */
const BibTexDebugger: React.FC<BibTexDebuggerProps> = ({
  filePath,
  initialContent = '',
  className = '',
}) => {
  // Store the current BibTeX content in the editor
  const [bibContent, setBibContent] = useState<string>(initialContent);
  // Store the successfully parsed entries
  const [parsedEntries, setParsedEntries] = useState<BibEntry[]>([]);
  // Store any parsing error message
  const [parseError, setParseError] = useState<string | null>(null);
  // Track loading state when fetching file content
  const [loading, setLoading] = useState<boolean>(!!filePath);

  /**
   * Handle changes to the text in the editor
   * 
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event
   */
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBibContent(e.target.value);
  }, []);

  /**
   * Parse the current content in the editor
   * Updates parsedEntries or parseError state based on outcome
   */
  const parseContent = useCallback(() => {
    try {
      setParseError(null);
      const entries = bibtexParse.toJSON(bibContent);
      setParsedEntries(entries);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown parsing error';
      setParseError(errorMessage);
      setParsedEntries([]);
    }
  }, [bibContent]);

  /**
   * Load content from the specified file path
   * Automatically parses the loaded content if successful
   */
  const loadFile = useCallback(async () => {
    if (!filePath) return;
    
    try {
      setLoading(true);
      // Fetch the BibTeX file from the provided path
      const response = await fetch(filePath);
      
      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`Failed to load BibTeX file: ${response.statusText}`);
      }
      
      // Get the file content as text
      const content = await response.text();
      setBibContent(content);
      
      // Auto-parse the loaded content
      try {
        const entries = bibtexParse.toJSON(content);
        setParsedEntries(entries);
        setParseError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown parsing error';
        setParseError(errorMessage);
        setParsedEntries([]);
      }
      
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown loading error';
      setParseError(errorMessage);
      setLoading(false);
    }
  }, [filePath]);

  // Load file content automatically when component mounts or filePath changes
  useEffect(() => {
    if (filePath) {
      loadFile();
    }
  }, [filePath, loadFile]);

  /**
   * Render a parsed BibTeX entry for debugging display
   * 
   * @param {BibEntry} entry - The parsed entry to display
   * @param {number} index - Index for React key
   * @returns {JSX.Element} - The rendered entry display
   */
  const renderEntryDebug = (entry: BibEntry, index: number) => {
    return (
      <div key={index} className="bibtex-debug-entry">
        <h4>
          {entry.entryType}: {entry.citationKey || `(No citation key)`}
        </h4>
        <div className="bibtex-debug-entry-tags">
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {entry.entryTags && Object.entries(entry.entryTags).map(([key, value]) => (
                <tr key={key}>
                  <td className="bibtex-debug-field">{key}</td>
                  <td className="bibtex-debug-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  /**
   * The main debugger content component
   * Note: This is defined as an inner component to be wrapped with BrowserOnly
   * 
   * @returns {JSX.Element} - The rendered debugger UI
   */
  const DebuggerContent = () => (
    <div className={`bibtex-debugger ${className}`}>
      <h3>BibTeX Debugger</h3>
      
      {/* File loading section (only shown if filePath is provided) */}
      {filePath && (
        <div className="bibtex-debug-file">
          <p>File: {filePath}</p>
          <button 
            onClick={loadFile} 
            disabled={loading}
            className="button button--primary"
          >
            {loading ? 'Loading...' : 'Reload File'}
          </button>
        </div>
      )}
      
      {/* BibTeX content editor */}
      <div className="bibtex-debug-input">
        <h4>BibTeX Content</h4>
        <textarea
          value={bibContent}
          onChange={handleTextChange}
          rows={10}
          style={{ width: '100%', fontFamily: 'monospace' }}
          placeholder="Paste your BibTeX content here..."
        />
        <button 
          onClick={parseContent}
          className="button button--primary"
          style={{ marginTop: '10px' }}
        >
          Parse BibTeX
        </button>
      </div>
      
      {/* Error display section */}
      {parseError && (
        <div className="bibtex-debug-error" style={{ color: 'red', marginTop: '10px' }}>
          <h4>Parsing Error</h4>
          <pre>{parseError}</pre>
        </div>
      )}
      
      {/* Parsed entries display section */}
      {parsedEntries.length > 0 && (
        <div className="bibtex-debug-results">
          <h4>Parsed Entries ({parsedEntries.length})</h4>
          <div className="bibtex-debug-entries">
            {parsedEntries.map(renderEntryDebug)}
          </div>
        </div>
      )}
    </div>
  );

  // Use BrowserOnly to ensure this component only renders in browser environment
  // This is necessary because it uses browser APIs like fetch
  return (
    <BrowserOnly>
      {() => <DebuggerContent />}
    </BrowserOnly>
  );
};

export default BibTexDebugger;