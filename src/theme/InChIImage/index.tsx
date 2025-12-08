import React, { useState, useEffect, useRef } from "react"

/**
 * Props for InChIImage component
 */
interface InChIImageProps {
  inchikey?: string
  className?: string
  style?: React.CSSProperties
  fallback?: string
}

// Global cache for CID lookups and image format to avoid repeated API calls
// Format: { cid: number, format: 'PNG' | 'SVG' }
const cidCache = new Map<string, { cid: number; format: 'PNG' | 'SVG' }>()

// Request queue to throttle API calls and avoid rate limiting
let requestQueue: Array<() => void> = []
let isProcessingQueue = false
const QUEUE_DELAY = 1000 // 1000ms (1 second) delay between requests to avoid PubChem rate limiting

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) return
  
  isProcessingQueue = true
  
  while (requestQueue.length > 0) {
    const nextRequest = requestQueue.shift()
    if (nextRequest) {
      nextRequest()
      // Wait before processing next request
      await new Promise(resolve => setTimeout(resolve, QUEUE_DELAY))
    }
  }
  
  isProcessingQueue = false
}

/**
 * InChIImage component
 *
 * Displays chemical structure images from PubChem API using InChIKey.
 * First gets the CID from InChIKey (with caching), then tries PNG first,
 * falling back to SVG if PNG fails. Falls back to a default image if both fail.
 */
export default function InChIImage({
  inchikey,
  className = "",
  style,
  fallback,
}: InChIImageProps): React.ReactElement {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageError, setImageError] = useState<boolean>(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    
    if (!inchikey) {
      setImageError(true)
      return
    }

    // Reset states
    setImageError(false)
    setImageUrl(null)

    // Check cache first
    const cached = cidCache.get(inchikey)
    if (cached) {
      const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cached.cid}/${cached.format}`
      if (mountedRef.current) {
        setImageUrl(imageUrl)
      }
      return
    }

    // Queue the request to avoid rate limiting
    const fetchCid = async (retryCount = 0) => {
      const MAX_RETRIES = 2
      
      try {
        // First, get the CID (Compound ID) from the InChIKey
        const cidUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/inchikey/${encodeURIComponent(inchikey)}/cids/JSON`

        // Add timeout to prevent hanging requests
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

        const response = await fetch(cidUrl, { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          // Retry on 429 (rate limit), 503 (service unavailable), or 500+ errors
          if ((response.status === 429 || response.status === 503 || response.status >= 500) && retryCount < MAX_RETRIES) {
            // Exponential backoff: wait longer before retry (2s, 4s, 8s)
            const backoffDelay = 2000 * Math.pow(2, retryCount)
            console.warn(`PubChem rate limited (${response.status}) for ${inchikey}, retrying in ${backoffDelay}ms...`)
            await new Promise(resolve => setTimeout(resolve, backoffDelay))
            return fetchCid(retryCount + 1)
          }
          if (response.status === 404) {
            throw new Error("Compound not found in PubChem")
          }
          throw new Error(`HTTP ${response.status}: Failed to get CID`)
        }

        const data = await response.json()

        // Extract CID from response
        if (data.IdentifierList && data.IdentifierList.CID && data.IdentifierList.CID.length > 0) {
          const cid = data.IdentifierList.CID[0]
          
          // Try PNG first, then fall back to SVG if PNG fails
          const tryImageFormat = async (format: 'PNG' | 'SVG'): Promise<boolean> => {
            const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/${format}`
            
            try {
              const imageController = new AbortController()
              const imageTimeoutId = setTimeout(() => imageController.abort(), 10000)
              
              const imageResponse = await fetch(imageUrl, { 
                signal: imageController.signal,
                method: 'GET'
              })
              
              clearTimeout(imageTimeoutId)
              
              // ① Check HTTP status (must be 200)
              if (imageResponse.status !== 200) {
                // If 503, it's a rate limit issue - don't mark as permanently invalid
                if (imageResponse.status === 503) {
                  throw new Error(`Image HTTP status 503 (rate limited), will retry later`)
                }
                throw new Error(`Image HTTP status ${imageResponse.status}, expected 200`)
              }
              
              // Fetch as blob to validate size and type
              const blob = await imageResponse.blob()
              
              // ② Check MIME type
              let isValidMime = false
              if (format === 'PNG') {
                isValidMime = blob.type.includes('image/png')
              } else {
                // SVG can come as image/svg+xml, text/plain, or application/xml
                isValidMime = blob.type.includes('image/svg') || blob.type.includes('text/plain') || blob.type.includes('application/xml')
              }
              
              if (!isValidMime) {
                throw new Error(`Invalid MIME type: ${blob.type}, expected ${format === 'PNG' ? 'image/png' : 'image/svg+xml'}`)
              }
              
              // ③ Check file size (> 200 bytes)
              if (blob.size <= 200) {
                throw new Error(`Image too small: ${blob.size} bytes, expected > 200 bytes`)
              }
              
              // All validations passed - cache and set the image URL
              cidCache.set(inchikey, { cid, format })
              if (mountedRef.current) {
                setImageUrl(imageUrl)
              }
              return true
            } catch (imageError: any) {
              if (imageError.name === 'AbortError') {
                console.warn(`PubChem ${format} image validation timeout for ${inchikey} (CID ${cid})`)
              } else if (imageError.message?.includes('503')) {
                // 503 is rate limiting - don't delete from cache, just log
                console.warn(`PubChem rate limited for ${inchikey} (CID ${cid}) ${format}, will retry on next page load`)
                // Don't cache on 503, let it retry
                return false
              } else {
                console.warn(`PubChem ${format} image validation failed for ${inchikey} (CID ${cid}):`, imageError.message)
              }
              return false
            }
          }
          
          // Try PNG first
          const pngSuccess = await tryImageFormat('PNG')
          
          // If PNG failed, try SVG
          if (!pngSuccess) {
            const svgSuccess = await tryImageFormat('SVG')
            
            // If both failed, set error state
            if (!svgSuccess && mountedRef.current) {
              setImageError(true)
            }
          }
        } else if (data.Fault) {
          throw new Error(data.Fault.Message || "PubChem API error")
        } else {
          throw new Error("No CID found in response")
        }
      } catch (error: any) {
        // Retry on network errors or timeouts
        if ((error.name === 'AbortError' || error.message?.includes('fetch')) && retryCount < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
          return fetchCid(retryCount + 1)
        }
        
        if (error.name === 'AbortError') {
          console.warn(`InChI image fetch timeout for ${inchikey}`)
        } else {
          console.warn(`InChI image fetch error for ${inchikey}:`, error.message)
        }
        if (mountedRef.current) {
          setImageError(true)
        }
      }
    }

    // Add to queue
    requestQueue.push(fetchCid)
    processQueue()

    return () => {
      mountedRef.current = false
    }
  }, [inchikey])

  // No InChIKey provided or error occurred, use fallback
  if (!inchikey || imageError) {
    if (fallback) {
      return (
        <img
          src={fallback}
          alt=""
          className={className}
          style={{
            width: "5rem",
            height: "5rem",
            objectFit: "contain",
            ...style,
          }}
        />
      )
    }
    return (
      <div
        className={className}
        style={{
          width: "5rem",
          height: "5rem",
          backgroundColor: "#f0f0f0",
          ...style,
        }}
      />
    )
  }

  // If we have an image URL, display it
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="Chemical structure"
        className={className}
        style={{
          width: "5rem",
          height: "5rem",
          objectFit: "contain",
          backgroundColor: "white",
          ...style,
        }}
        onError={(e) => {
          console.warn(`Failed to load PubChem image for ${inchikey} from ${imageUrl}`)
          const cached = cidCache.get(inchikey)
          
          // If we were using PNG and it failed, try SVG as fallback
          if (cached && cached.format === 'PNG') {
            // Try SVG instead
            const svgUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cached.cid}/SVG`
            // Update cache to SVG and try loading it
            cidCache.set(inchikey, { cid: cached.cid, format: 'SVG' })
            setImageUrl(svgUrl)
          } else {
            // Both formats failed or already tried SVG, remove from cache
            cidCache.delete(inchikey)
            setImageError(true)
            setImageUrl(null)
          }
        }}
        onLoad={(e) => {
          // Image loaded successfully - validate it's actually an image
          const img = e.currentTarget
          // Check if image has valid dimensions (invalid images often have 0x0)
          if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            console.warn(`PubChem image has invalid dimensions for ${inchikey}`)
            cidCache.delete(inchikey)
            setImageError(true)
            setImageUrl(null)
            return
          }
          // Image loaded successfully
          setImageError(false)
        }}
      />
    )
  }

  // Loading state - show fallback while loading to avoid blank space
  if (fallback && !imageError) {
    return (
      <img
        src={fallback}
        alt=""
        className={className}
        style={{
          width: "5rem",
          height: "5rem",
          objectFit: "contain",
          opacity: 0.5,
          ...style,
        }}
      />
    )
  }

  // Loading state
  return (
    <div
      className={className}
      style={{
        width: "5rem",
        height: "5rem",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <span style={{ fontSize: "0.7rem", color: "#999" }}>Loading...</span>
    </div>
  )
}

