import { BibEntry } from './ReferenceList';

/**
 * Supported citation styles for formatting references.
 * 
 * @typedef {'apa' | 'mla' | 'chicago' | 'ieee' | 'harvard'} ReferenceStyle
 * @description
 * - apa: American Psychological Association style (7th edition)
 * - mla: Modern Language Association style (8th edition)
 * - chicago: Chicago Manual of Style (17th edition)
 * - ieee: Institute of Electrical and Electronics Engineers style
 * - harvard: Harvard referencing style
 */
export type ReferenceStyle = 'apa' | 'mla' | 'chicago' | 'ieee' | 'harvard';

/**
 * Formats author names according to the specified citation style.
 * Handles multiple authors with proper separators and formatting.
 * 
 * @function formatAuthors
 * @param {string | undefined} authorString - The author string from BibTeX (typically "Last, First and Last, First")
 * @param {ReferenceStyle} style - The citation style to format for
 * @returns {string} - The formatted author string
 * 
 * @example
 * // Returns "Smith, J. & Jones, A."
 * formatAuthors("Smith, John and Jones, Alice", "apa");
 * 
 * @example
 * // Returns "J. Smith, A. Jones, and B. Brown"
 * formatAuthors("Smith, John and Jones, Alice and Brown, Bob", "ieee");
 */
export const formatAuthors = (authorString: string | undefined, style: ReferenceStyle): string => {
  if (!authorString) return '';

  // Split authors by 'and' (BibTeX standard separator)
  const authors = authorString.split(/\s+and\s+/);
  
  // Format each author based on the style
  const formattedAuthors = authors.map(author => {
    // Check if author has comma (Last, First format)
    if (author.includes(',')) {
      const [lastName, firstName] = author.split(',').map(s => s.trim());
      
      switch (style) {
        case 'apa':
          // APA: Last, F. M.
          const initials = firstName.split(' ')
            .map(part => `${part.charAt(0)}.`)
            .join(' ');
          return `${lastName}, ${initials}`;
          
        case 'mla':
          // MLA: Last, First
          return `${lastName}, ${firstName}`;
          
        case 'chicago':
          // Chicago: Last, First
          return `${lastName}, ${firstName}`;
          
        case 'ieee':
          // IEEE: F. Last
          const ieeeInitials = firstName.split(' ')
            .map(part => `${part.charAt(0)}.`)
            .join(' ');
          return `${ieeeInitials} ${lastName}`;
          
        case 'harvard':
          // Harvard: Last, F.
          const harvardInitials = firstName.split(' ')
            .map(part => `${part.charAt(0)}.`)
            .join(' ');
          return `${lastName}, ${harvardInitials}`;
          
        default:
          return `${lastName}, ${firstName}`;
      }
    } else {
      // Handle cases where author is in "First Last" format
      const nameParts = author.trim().split(' ');
      const lastName = nameParts.pop() || '';
      const firstName = nameParts.join(' ');
      
      // Recursive call with proper format
      return formatAuthors(`${lastName}, ${firstName}`, style);
    }
  });
  
  // Join authors based on style
  if (formattedAuthors.length === 1) {
    return formattedAuthors[0];
  } else if (formattedAuthors.length === 2) {
    return style === 'ieee' 
      ? `${formattedAuthors[0]} and ${formattedAuthors[1]}`
      : `${formattedAuthors[0]} & ${formattedAuthors[1]}`;
  } else {
    const lastAuthor = formattedAuthors.pop();
    
    switch (style) {
      case 'apa':
        return `${formattedAuthors.join(', ')}, & ${lastAuthor}`;
      case 'mla':
        return `${formattedAuthors.join(', ')}, and ${lastAuthor}`;
      case 'chicago':
        return `${formattedAuthors.join(', ')}, and ${lastAuthor}`;
      case 'ieee':
        return `${formattedAuthors.join(', ')}, and ${lastAuthor}`;
      case 'harvard':
        return `${formattedAuthors.join(', ')} and ${lastAuthor}`;
      default:
        return `${formattedAuthors.join(', ')}, and ${lastAuthor}`;
    }
  }
};

/**
 * Formats a journal title according to the specified citation style.
 * Different styles require different formatting (e.g., italics).
 * 
 * @function formatJournal
 * @param {string | undefined} journal - The journal name
 * @param {ReferenceStyle} style - The citation style to format for
 * @returns {string} - The formatted journal title with appropriate HTML markup
 * 
 * @example
 * // Returns "<em>Nature</em>"
 * formatJournal("Nature", "apa");
 */
export const formatJournal = (journal: string | undefined, style: ReferenceStyle): string => {
  if (!journal) return '';
  
  switch (style) {
    case 'apa':
    case 'chicago':
    case 'harvard':
      // Italicize for APA, Chicago, Harvard
      return `<em>${journal}</em>`;
    case 'mla':
    case 'ieee':
      // Italicize for MLA, IEEE
      return `<em>${journal}</em>`;
    default:
      return journal;
  }
};

/**
 * Format a book title based on the citation style
 * @param title The book title
 * @param style The citation style
 */
export const formatBookTitle = (title: string | undefined, style: ReferenceStyle): string => {
  if (!title) return '';
  
  switch (style) {
    case 'apa':
    case 'chicago':
    case 'harvard':
    case 'ieee':
      // Italicize for APA, Chicago, Harvard, IEEE
      return `<em>${title}</em>`;
    case 'mla':
      // MLA uses quotation marks
      return `<em>${title}</em>`;
    default:
      return title;
  }
};

/**
 * Format an article title based on the citation style
 * @param title The article title
 * @param style The citation style
 */
export const formatArticleTitle = (title: string | undefined, style: ReferenceStyle): string => {
  if (!title) return '';
  
  switch (style) {
    case 'apa':
      // APA: Plain text with sentence case
      return title.charAt(0).toUpperCase() + title.slice(1);
    case 'mla':
      // MLA: Quote marks with title case
      return `"${title}"`;
    case 'chicago':
      // Chicago: Quote marks
      return `"${title}"`;
    case 'ieee':
      // IEEE: Quote marks
      return `"${title}"`;
    case 'harvard':
      // Harvard: Plain text
      return title;
    default:
      return title;
  }
};

/**
 * Format a DOI link
 * @param doi The DOI identifier
 */
export const formatDOI = (doi: string | undefined): string => {
  if (!doi) return '';
  
  // Clean up the DOI by removing prefixes if present
  const cleanDoi = doi.replace(/^(https?:\/\/(dx\.)?doi\.org\/|doi:)/i, '');
  
  return `<a href="https://doi.org/${cleanDoi}" target="_blank" rel="noopener noreferrer">https://doi.org/${cleanDoi}</a>`;
};

/**
 * Format a URL link
 * @param url The URL
 */
export const formatURL = (url: string | undefined): string => {
  if (!url) return '';
  
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
};

/**
 * Format page numbers based on the citation style
 * @param pages The page range
 * @param style The citation style
 */
export const formatPages = (pages: string | undefined, style: ReferenceStyle): string => {
  if (!pages) return '';
  
  // Clean up the page range
  const cleanPages = pages.replace(/--/g, '–').replace(/-/g, '–');
  
  switch (style) {
    case 'apa':
      return cleanPages;
    case 'mla':
      return `pp. ${cleanPages}`;
    case 'chicago':
      return cleanPages;
    case 'ieee':
      return `pp. ${cleanPages}`;
    case 'harvard':
      return `pp.${cleanPages}`;
    default:
      return cleanPages;
  }
};

/**
 * Formats a complete reference citation based on the entry type and citation style.
 * This is the main formatting function that delegates to specific formatters
 * based on the entry type (article, book, conference, etc.).
 * 
 * @function formatReference
 * @param {BibEntry} entry - The BibTeX entry to format
 * @param {ReferenceStyle} style - The citation style to format for
 * @returns {string} - The formatted reference with HTML markup
 * 
 * @example
 * // For an article entry, might return:
 * // "Smith, J. (2020). Article title. <em>Journal Name</em>, 10(2), 123-145."
 */
export const formatReference = (entry: BibEntry, style: ReferenceStyle): string => {
  const { entryType, entryTags } = entry;
  const {
    author, 
    title, 
    journal, 
    year, 
    volume, 
    number, 
    pages, 
    publisher, 
    booktitle, 
    editor,
    address,
    url,
    doi
  } = entryTags;
  
  // Format different entry types
  switch (entryType.toLowerCase()) {
    case 'article':
      return formatArticleReference(author, title, journal, year, volume, number, pages, doi, url, style);
    
    case 'book':
      return formatBookReference(author, title, publisher, year, address, doi, url, style);
    
    case 'inproceedings':
    case 'incollection':
    case 'conference':
      return formatConferenceReference(author, title, booktitle, editor, year, publisher, address, pages, doi, url, style);
    
    default:
      // Generic formatter for other types
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${title ? `${title}. ` : ''}${doi ? formatDOI(doi) : ''}`;
  }
};

/**
 * Format an article reference based on style
 */
const formatArticleReference = (
  author: string | undefined, 
  title: string | undefined, 
  journal: string | undefined, 
  year: string | undefined, 
  volume: string | undefined, 
  number: string | undefined, 
  pages: string | undefined, 
  doi: string | undefined, 
  url: string | undefined, 
  style: ReferenceStyle
): string => {
  switch (style) {
    case 'apa':
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${formatArticleTitle(title, style)}. ${formatJournal(journal, style)}, ${volume ? `${volume}` : ''}${number ? `(${number})` : ''}, ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'mla':
      return `${formatAuthors(author, style)}. ${formatArticleTitle(title, style)}. ${formatJournal(journal, style)}, vol. ${volume || ''}, no. ${number || ''}, ${year || ''}, ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'chicago':
      return `${formatAuthors(author, style)}. ${formatArticleTitle(title, style)} ${formatJournal(journal, style)} ${volume || ''}, no. ${number || ''} (${year || ''}): ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'ieee':
      return `${formatAuthors(author, style)}, ${formatArticleTitle(title, style)}, ${formatJournal(journal, style)}, vol. ${volume || ''}, no. ${number || ''}, ${formatPages(pages, style)}, ${year || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'harvard':
      return `${formatAuthors(author, style)} ${year ? `(${year})` : ''} ${formatArticleTitle(title, style)}, ${formatJournal(journal, style)}, ${volume ? `${volume}` : ''}${number ? `(${number})` : ''}, ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    default:
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${title || ''}. ${journal || ''}, ${volume || ''}${number ? `(${number})` : ''}, ${pages || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
  }
};

/**
 * Format a book reference based on style
 */
const formatBookReference = (
  author: string | undefined, 
  title: string | undefined, 
  publisher: string | undefined, 
  year: string | undefined, 
  address: string | undefined, 
  doi: string | undefined, 
  url: string | undefined, 
  style: ReferenceStyle
): string => {
  switch (style) {
    case 'apa':
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${formatBookTitle(title, style)}. ${address ? `${address}: ` : ''}${publisher || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'mla':
      return `${formatAuthors(author, style)}. ${formatBookTitle(title, style)}. ${publisher || ''}, ${year || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'chicago':
      return `${formatAuthors(author, style)}. ${formatBookTitle(title, style)}. ${address ? `${address}: ` : ''}${publisher || ''}, ${year || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'ieee':
      return `${formatAuthors(author, style)}, ${formatBookTitle(title, style)}. ${address ? `${address}: ` : ''}${publisher || ''}, ${year || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'harvard':
      return `${formatAuthors(author, style)} ${year ? `(${year})` : ''} ${formatBookTitle(title, style)}, ${address ? `${address}: ` : ''}${publisher || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    default:
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${title || ''}. ${address ? `${address}: ` : ''}${publisher || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
  }
};

/**
 * Format a conference proceeding reference based on style
 */
const formatConferenceReference = (
  author: string | undefined, 
  title: string | undefined, 
  booktitle: string | undefined, 
  editor: string | undefined, 
  year: string | undefined, 
  publisher: string | undefined, 
  address: string | undefined, 
  pages: string | undefined, 
  doi: string | undefined, 
  url: string | undefined, 
  style: ReferenceStyle
): string => {
  switch (style) {
    case 'apa':
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${formatArticleTitle(title, style)}. In ${editor ? `${formatAuthors(editor, style)} (Ed.), ` : ''}${formatBookTitle(booktitle, style)} (pp. ${pages || ''}). ${address ? `${address}: ` : ''}${publisher || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'mla':
      return `${formatAuthors(author, style)}. ${formatArticleTitle(title, style)} ${formatBookTitle(booktitle, style)}, ${editor ? `edited by ${formatAuthors(editor, style)}, ` : ''}${publisher || ''}, ${year || ''}, ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'chicago':
      return `${formatAuthors(author, style)}. ${formatArticleTitle(title, style)} In ${formatBookTitle(booktitle, style)}, ${editor ? `edited by ${formatAuthors(editor, style)}, ` : ''}${formatPages(pages, style)}. ${address ? `${address}: ` : ''}${publisher || ''}, ${year || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'ieee':
      return `${formatAuthors(author, style)}, ${formatArticleTitle(title, style)}, in ${formatBookTitle(booktitle, style)}, ${address ? `${address}: ` : ''}${publisher || ''}, ${year || ''}, ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    case 'harvard':
      return `${formatAuthors(author, style)} ${year ? `(${year})` : ''} ${formatArticleTitle(title, style)}, in ${editor ? `${formatAuthors(editor, style)} (eds.), ` : ''}${formatBookTitle(booktitle, style)}, ${address ? `${address}: ` : ''}${publisher || ''}, ${formatPages(pages, style)}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
    
    default:
      return `${formatAuthors(author, style)}. ${year ? `(${year}). ` : ''}${title || ''}. In ${booktitle || ''} (pp. ${pages || ''}). ${address ? `${address}: ` : ''}${publisher || ''}. ${doi ? formatDOI(doi) : url ? formatURL(url) : ''}`;
  }
};