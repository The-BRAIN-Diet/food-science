export type ReferenceStyle = 'apa' | 'mla' | 'chicago' | 'ieee' | 'harvard';

export interface BibEntry {
    entryType: string;
    citationKey?: string;
    entryTags: Record<string, string>;
}

const LATEX_ACCENTS: Record<string, Record<string, string>> = {
    "'": {
        A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', Y: 'Ý',
        a: 'á', c: 'ć', e: 'é', i: 'í', n: 'ń', o: 'ó', s: 'ś', u: 'ú', y: 'ý', z: 'ź',
    },
    '`': {
        A: 'À', E: 'È', I: 'Ì', O: 'Ò', U: 'Ù',
        a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù',
    },
    '^': {
        A: 'Â', E: 'Ê', I: 'Î', O: 'Ô', U: 'Û',
        a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û',
    },
    '"': {
        A: 'Ä', E: 'Ë', I: 'Ï', O: 'Ö', U: 'Ü',
        a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', y: 'ÿ',
    },
    '~': {
        A: 'Ã', N: 'Ñ', O: 'Õ',
        a: 'ã', n: 'ñ', o: 'õ',
    },
    '=': {a: 'ā', e: 'ē', i: 'ī', o: 'ō', u: 'ū'},
    '.': {c: 'ċ', e: 'ė', z: 'ż', Z: 'Ż'},
    c: {C: 'Ç', c: 'ç', s: 'ş', t: 'ţ'},
    v: {
        C: 'Č', D: 'Ď', E: 'Ě', N: 'Ň', R: 'Ř', S: 'Š', T: 'Ť', Z: 'Ž',
        c: 'č', d: 'ď', e: 'ě', n: 'ň', r: 'ř', s: 'š', t: 'ť', z: 'ž',
    },
    u: {A: 'Ă', a: 'ă', g: 'ğ'},
    H: {O: 'Ő', U: 'Ű', o: 'ő', u: 'ű'},
    k: {a: 'ą', e: 'ę'},
    r: {A: 'Å', a: 'å'},
};

function applyLatexAccent(command: string, letter: string): string {
    return LATEX_ACCENTS[command]?.[letter] ?? letter;
}

/**
 * Turn BibTeX accent commands and protective braces into readable text.
 * `{\v{r}}` becomes ř, and `{\textregistered}` becomes ®.
 */
function decodeBibTeX(value: string): string {
    if (!value) return value;
    let out = value;

    const symbols: Array<[string, string]> = [
        ['\\textregistered', '®'],
        ['\\texttrademark', '™'],
        ['\\copyright', '©'],
        ['\\textbackslash', '\\'],
        ['\\beta', 'β'],
        ['\\&', '&'],
        ['\\%', '%'],
        ['\\$', '$'],
        ['\\#', '#'],
        ['\\_', '_'],
        ['\\OE', 'Œ'],
        ['\\oe', 'œ'],
        ['\\AE', 'Æ'],
        ['\\ae', 'æ'],
        ['\\AA', 'Å'],
        ['\\aa', 'å'],
        ['\\O', 'Ø'],
        ['\\o', 'ø'],
        ['\\L', 'Ł'],
        ['\\l', 'ł'],
        ['\\ss', 'ß'],
        ['\\DJ', 'Đ'],
        ['\\dj', 'đ'],
        ['\\DH', 'Ð'],
        ['\\dh', 'ð'],
    ];
    symbols.forEach(([from, to]) => {
        out = out.split(from).join(to);
    });

    out = out.replace(/\\(["'`^=.~cuvHrk])\s*\{\\i\}/g, (_, command: string) => applyLatexAccent(command, 'i'));
    out = out.replace(
        /\\(["'`^=.~cuvHrk])\s*\{([A-Za-z])\}/g,
        (_, command: string, letter: string) => applyLatexAccent(command, letter),
    );
    out = out.replace(
        /\\(["'`^=.~cuvHrk])\s*([A-Za-z])/g,
        (_, command: string, letter: string) => applyLatexAccent(command, letter),
    );
    out = out.replace(/\\(?:textit|textbf|emph|textrm|textsc|textsf|texttt)\s*/g, '');
    out = out.split('\\i').join('i');

    let prev = '';
    while (out !== prev) {
        prev = out;
        out = out.replace(/\{([^{}]*)\}/g, '$1');
    }
    return out.replace(/\s{2,}/g, ' ').trim();
}

function pageRange(pages: string): string {
    return pages.replace(/---/g, '—').replace(/--/g, '–');
}

function displayTag(entryTags: Record<string, string>, key: string): string {
    return decodeBibTeX(entryTags[key] || '');
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
    const authors = getContributors(entryTags, 'apa');
    const year = entryTags.year || '';
    const title = displayTag(entryTags, 'title');

    if (entryType.toLowerCase() === 'article') {
        const journal = displayTag(entryTags, 'journal');
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = pageRange(entryTags.pages || '');
        const doi = entryTags.doi ? ` https://doi.org/${entryTags.doi}` : '';

        return `${authors} (${year}). ${title}. <em>${journal}</em>${volume ? `, ${volume}` : ''}${number ? `(${number})` : ''}${pages ? `, ${pages}` : ''}.${doi}`;
    }

    if (entryType.toLowerCase() === 'book') {
        const publisher = entryTags.publisher || '';
        const address = entryTags.address || '';
        return `${authors} (${year}). <em>${title}</em>. ${address ? `${address}: ` : ''}${publisher}.`;
    }

    if (['inproceedings', 'conference'].includes(entryType.toLowerCase())) {
        const booktitle = displayTag(entryTags, 'booktitle');
        const pages = pageRange(entryTags.pages || '');
        const publisher = entryTags.publisher || '';
        return `${authors} (${year}). ${title}. In <em>${booktitle}</em>${pages ? ` (pp. ${pages})` : ''}. ${publisher}.`;
    }

    return `${authors} (${year}). ${title}.`;
}

function formatMLA(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = getContributors(entryTags, 'mla');
    const title = displayTag(entryTags, 'title');
    const year = entryTags.year || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = displayTag(entryTags, 'journal');
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = pageRange(entryTags.pages || '');
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
    const authors = getContributors(entryTags, 'chicago');
    const title = displayTag(entryTags, 'title');
    const year = entryTags.year || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = displayTag(entryTags, 'journal');
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = pageRange(entryTags.pages || '');
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
    const authors = getContributors(entryTags, 'ieee');
    const title = displayTag(entryTags, 'title');
    const year = entryTags.year || '';

    if (entryType.toLowerCase() === 'article') {
        const journal = displayTag(entryTags, 'journal');
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = pageRange(entryTags.pages || '');
        return `${authors}, "${title}," <em>${journal}</em>, vol. ${volume}${number ? `, no. ${number}` : ''}${pages ? `, pp. ${pages}` : ''}, ${year}.`;
    }

    if (['inproceedings', 'conference'].includes(entryType.toLowerCase())) {
        const booktitle = displayTag(entryTags, 'booktitle');
        const pages = pageRange(entryTags.pages || '');
        return `${authors}, "${title}," in <em>${booktitle}</em>${pages ? `, pp. ${pages}` : ''}, ${year}.`;
    }

    return `${authors}, "${title}," ${year}.`;
}

function formatHarvard(entry: BibEntry): string {
    const { entryTags, entryType } = entry;
    const authors = getContributors(entryTags, 'harvard');
    const year = entryTags.year || '';
    const title = displayTag(entryTags, 'title');

    if (entryType.toLowerCase() === 'article') {
        const journal = displayTag(entryTags, 'journal');
        const volume = entryTags.volume || '';
        const number = entryTags.number || '';
        const pages = pageRange(entryTags.pages || '');

        const parts: string[] = [];
        if (journal) parts.push(`<em>${journal}</em>`);
        if (volume) parts.push(`vol. ${volume}`);
        if (number) parts.push(`no. ${number}`);
        if (pages) parts.push(`pp. ${pages}`);

        const tail = parts.length ? `, ${parts.join(', ')}.` : '.';
        return `${authors} ${year}, '${title}'${tail}`;
    }

    if (entryType.toLowerCase() === 'book') {
        const publisher = entryTags.publisher || '';
        const address = entryTags.address || '';
        return `${authors} ${year}, <em>${title}</em>, ${address ? `${address}, ` : ''}${publisher}.`;
    }

    if (['incollection', 'inbook', 'inproceedings', 'conference'].includes(entryType.toLowerCase())) {
        const booktitle = displayTag(entryTags, 'booktitle');
        const pages = entryTags.pages || '';
        const publisher = entryTags.publisher || '';
        const address = entryTags.address || '';
        const location = address ? `${address}, ` : '';
        const pagePart = pages ? `, pp. ${pageRange(pages)}` : '';
        return `${authors} ${year}, '${title}', in <em>${booktitle}</em>, ${location}${publisher}${pagePart}.`;
    }

    const source = (
        entryTags.howpublished ||
        entryTags.institution ||
        entryTags.publisher ||
        ''
    ).trim();
    const reportNumber = (entryTags.number || '').trim();
    const sourcePart = source
        ? `, ${source}${reportNumber ? `, ${reportNumber}` : ''}`
        : reportNumber
          ? `, ${reportNumber}`
          : '';
    return `${authors} ${year}, '${title}'${sourcePart}.`;
}

function formatAuthors(authorString: string, style: ReferenceStyle): string {
    if (!authorString) return '';

    const authors = decodeBibTeX(authorString).split(' and ').map(a => a.trim());

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

function getContributors(entryTags: Record<string, string>, style: ReferenceStyle): string {
    const authorString = entryTags.author || '';
    if (authorString.trim()) {
        return formatAuthors(authorString, style);
    }
    const editorString = entryTags.editor || '';
    if (!editorString.trim()) {
        return '';
    }
    const formattedEditors = formatAuthors(editorString, style);
    const hasMultipleEditors = editorString.includes(' and ');
    return `${formattedEditors}${hasMultipleEditors ? ' (eds.)' : ' (ed.)'}`;
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

