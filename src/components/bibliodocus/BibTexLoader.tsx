import React, {useState, useEffect} from "react"
import BrowserOnly from "@docusaurus/BrowserOnly"
import * as bibtexParse from "@orcid/bibtex-parse-js"

/**
 * Props for the BibTexLoader component.
 *
 * @interface BibTexLoaderProps
 * @property {string} filePath - Path to the BibTeX file to load (relative to the static directory)
 * @property {function} onLoad - Callback function that receives the parsed BibTeX entries
 * @property {function} [onError] - Optional callback function that receives any error that occurs during loading or parsing
 * @property {function} [renderLoading] - Optional function that returns a React node to display while loading
 */
interface BibTexLoaderProps {
  filePath: string
  onLoad: (entries: any[]) => void
  onError?: (error: Error) => void
  renderLoading?: () => React.ReactNode
}

/**
 * Component that loads a BibTeX file and parses it using bibtexParse.
 * This component handles loading states and error handling internally.
 *
 * @component
 * @param {BibTexLoaderProps} props - Component props
 * @returns {React.ReactNode | null} - Returns loading indicator or null when complete
 */
const BibTexLoader: React.FC<BibTexLoaderProps> = ({filePath, onLoad, onError, renderLoading = () => <div>Loading references...</div>}) => {
  // Track loading state
  const [loading, setLoading] = useState<boolean>(true)
  // Track any errors that occur
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    /**
     * Asynchronously fetches and parses the BibTeX file.
     * Updates loading state and handles errors.
     */
    const fetchBibTexFile = async () => {
      try {
        setLoading(true)
        // Fetch the BibTeX file from the provided path
        const response = await fetch(filePath)

        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`Failed to load BibTeX file: ${response.statusText}`)
        }

        // Get the text content of the file
        const bibContent = await response.text()

        // Parse BibTeX content using the @orcid/bibtex-parse-js library
        const entries = bibtexParse.toJSON(bibContent)

        // Pass the parsed entries to the parent component via callback
        onLoad(entries)
        setLoading(false)
      } catch (err) {
        // Convert any error to an Error object for consistency
        const error = err instanceof Error ? err : new Error("Unknown error occurred")
        setError(error)
        // Notify parent component of the error via callback
        if (onError) {
          onError(error)
        }
        setLoading(false)
      }
    }

    // Execute the fetch operation when the component mounts or when dependencies change
    fetchBibTexFile()
  }, [filePath, onLoad, onError])

  if (error) {
    return (
      <div className="bibtex-loader-error">
        <p>Error loading BibTeX file: {error.message}</p>
      </div>
    )
  }

  if (loading) {
    return <>{renderLoading()}</>
  }

  // The component itself doesn't render anything when successful
  // as it passes the data to the parent via onLoad callback
  return null
}

/**
 * Wrapper component that uses Docusaurus's BrowserOnly to ensure
 * that the BibTexLoader only runs in the browser environment.
 * This is necessary because the component uses the fetch API,
 * which is not available during server-side rendering.
 *
 * @component
 * @param {BibTexLoaderProps} props - The props to pass to the BibTexLoader
 * @returns {JSX.Element} - The wrapped BibTexLoader component
 */
const BibTexLoaderWrapper: React.FC<BibTexLoaderProps> = (props) => {
  return <BrowserOnly>{() => <BibTexLoader {...props} />}</BrowserOnly>
}

export default BibTexLoaderWrapper
