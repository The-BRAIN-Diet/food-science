export type ReferenceStyle = 'apa' | 'mla' | 'chicago' | 'ieee' | 'harvard';

export interface BibEntry {
    entryType: string;
    citationKey?: string;
    entryTags: Record<string, string>;
}

export function formatReference(entry: BibEntry, style: ReferenceStyle = 'apa'): string {
    switch (style) {
        case 'apa':
            return formatAPA(entry);
        case 'mla':
            return formatMLA(entry);
        case 'chicago':
            return formatChicago(entry);
        case 'ieee':
            return formatIEEE(entry);
        case 'harvard':
            return formatHarvard(entry);
        default:
            return formatAPA(entry);
    }
}

function formatAPA(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = formatAuthors(entryTags.author || '', 'apa');
    const year = entryTags.year || '';
    const title = entryTags.title || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = entryTags.journal || '';
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = entryTags.pages || '';
        const doi = entryTags.doi ? ` https://doi.org/${entryTags.doi}` : '';

        return `${authors} (${year}). ${title}. <em>${journal}</em>${volume ? `, ${volume}` : ''}${number ? `(${number})` : ''}${pages ? `, ${pages}` : ''}.${doi}`;
    }

    if (entryType.toLowerCase() === 'book') {
        const publisher = entryTags.publisher || '';
        const address = entryTags.address || '';
        return `${authors} (${year}). <em>${title}</em>. ${address ? `${address}: ` : ''}${publisher}.`;
    }

    if (['inproceedings', 'conference'].includes(entryType.toLowerCase())) {
        const booktitle = entryTags.booktitle || '';
        const pages = entryTags.pages || '';
        const publisher = entryTags.publisher || '';
        return `${authors} (${year}). ${title}. In <em>${booktitle}</em>${pages ? ` (pp. ${pages})` : ''}. ${publisher}.`;
    }

    return `${authors} (${year}). ${title}.`;
}

function formatMLA(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = formatAuthors(entryTags.author || '', 'mla');
    const title = entryTags.title || '';
    const year = entryTags.year || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = entryTags.journal || '';
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = entryTags.pages || '';
        return `${authors}. "${title}." <em>${journal}</em>, vol. ${volume}${number ? `, no. ${number}` : ''}${year ? `, ${year}` : ''}${pages ? `, pp. ${pages}` : ''}.`;
    }

    if (entryType.toLowerCase() === 'book') {
        const publisher = entryTags.publisher || '';
        return `${authors}. <em>${title}</em>. ${publisher}, ${year}.`;
    }

    return `${authors}. "${title}." ${year ? `${year}.` : ''}`;
}

function formatChicago(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = formatAuthors(entryTags.author || '', 'chicago');
    const title = entryTags.title || '';
    const year = entryTags.year || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = entryTags.journal || '';
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = entryTags.pages || '';
        return `${authors}. "${title}." <em>${journal}</em> ${volume}${number ? `, no. ${number}` : ''} (${year})${pages ? `: ${pages}` : ''}.`;
    }

    if (entryType.toLowerCase() === 'book') {
        const publisher = entryTags.publisher || '';
        const address = entryTags.address || '';
        return `${authors}. <em>${title}</em>. ${address ? `${address}: ` : ''}${publisher}, ${year}.`;
    }

    return `${authors}. "${title}." ${year ? `${year}.` : ''}`;
}

function formatIEEE(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = formatAuthors(entryTags.author || '', 'ieee');
    const title = entryTags.title || '';
    const year = entryTags.year || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = entryTags.journal || '';
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = entryTags.pages || '';
        return `${authors}, "${title}," <em>${journal}</em>, vol. ${volume}${number ? `, no. ${number}` : ''}${pages ? `, pp. ${pages}` : ''}, ${year}.`;
    }

    if (['inproceedings', 'conference'].includes(entryType.toLowerCase())) {
        const booktitle = entryTags.booktitle || '';
        const pages = entryTags.pages || '';
        return `${authors}, "${title}," in <em>${booktitle}</em>${pages ? `, pp. ${pages}` : ''}, ${year}.`;
    }

    return `${authors}, "${title}," ${year}.`;
}

function formatHarvard(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = formatAuthors(entryTags.author || '', 'harvard');
    const year = entryTags.year || '';
    const title = entryTags.title || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = entryTags.journal || '';
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = entryTags.pages || '';
        return `${authors} ${year}, '${title}', <em>${journal}</em>, vol. ${volume}${number ? `, no. ${number}` : ''}${pages ? `, pp. ${pages}` : ''}.`;
    }

    if (entryType.toLowerCase() === 'book') {
        const publisher = entryTags.publisher || '';
        const address = entryTags.address || '';
        return `${authors} ${year}, <em>${title}</em>, ${address ? `${address}, ` : ''}${publisher}.`;
    }

    return `${authors} ${year}, '${title}'.`;
}

function formatAuthors(authorString: string, style: ReferenceStyle): string {
    if (!authorString) return '';

    const authors = authorString.split(' and ').map(a => a.trim());

    if (authors.length === 0) return '';
    if (authors.length === 1) return formatSingleAuthor(authors[0], style);

    if (style === 'apa' || style === 'harvard') {
        if (authors.length === 2) {
            return `${formatSingleAuthor(authors[0], style)} & ${formatSingleAuthor(authors[1], style)}`;
        }
        return `${formatSingleAuthor(authors[0], style)} et al.`;
    }

    if (style === 'mla' || style === 'chicago') {
        if (authors.length <= 3) {
            return authors.map(a => formatSingleAuthor(a, style)).join(', ');
        }
        return `${formatSingleAuthor(authors[0], style)} et al.`;
    }

    if (style === 'ieee') {
        if (authors.length <= 6) {
            return authors.map(a => formatSingleAuthor(a, style)).join(', ');
        }
        return `${formatSingleAuthor(authors[0], style)} et al.`;
    }

    return authors.map(a => formatSingleAuthor(a, style)).join(', ');
}

function formatSingleAuthor(author: string, style: ReferenceStyle): string {
    const parts = author.split(',').map(p => p.trim());
    if (parts.length === 2) {
        const [last, first] = parts;
        if (style === 'ieee') {
            return `${first} ${last}`;
        }
        return `${last}, ${first.charAt(0)}.`;
    }

    // If no comma, assume "First Last" format
    const nameParts = author.split(' ');
    if (nameParts.length >= 2) {
        const last = nameParts[nameParts.length - 1];
        const first = nameParts[0];
        if (style === 'ieee') {
            return `${first} ${last}`;
        }
        return `${last}, ${first.charAt(0)}.`;
    }

    return author;
}

