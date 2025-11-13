const fs = require('fs');
const path = require('path');
const { toJSON } = require('@orcid/bibtex-parse-js');

/**
 * Docusaurus plugin that processes BibTeX files at build time
 * and makes them available as global data
 */
module.exports = function bibtexLoaderPlugin(context, options) {
    const { siteDir } = context;

    return {
        name: 'bibtex-loader',

        async loadContent() {
            const bibtexFiles = options.files || [];
            const processedFiles = {};

            for (const fileConfig of bibtexFiles) {
                const filePath = path.join(siteDir, 'static', fileConfig.path);

                if (!fs.existsSync(filePath)) {
                    console.warn(`BibTeX file not found: ${filePath}`);
                    continue;
                }

                try {
                    const bibContent = fs.readFileSync(filePath, 'utf8').trim();
                    const entries = toJSON(bibContent);

                    // Transform entries to our format
                    const formattedEntries = entries.map((entry) => {
                        const entryType = entry.type || entry.entryType || '';
                        const citationKey = entry.key || entry.citationKey || entry.id || '';
                        const entryTags = entry.fields || entry.entryTags || entry.tags || entry;

                        // Remove metadata fields
                        const cleanTags = {};
                        Object.keys(entryTags).forEach((key) => {
                            if (
                                key !== 'type' &&
                                key !== 'key' &&
                                key !== 'entryType' &&
                                key !== 'citationKey' &&
                                key !== '@type' &&
                                key !== '@id' &&
                                key !== 'id'
                            ) {
                                cleanTags[key] = String(entryTags[key] || '');
                            }
                        });

                        return {
                            entryType,
                            citationKey,
                            entryTags: cleanTags,
                        };
                    });

                    processedFiles[fileConfig.id || fileConfig.path] = {
                        path: fileConfig.path,
                        entries: formattedEntries,
                    };

                    console.log(`Processed BibTeX file: ${fileConfig.path} (${formattedEntries.length} entries)`);
                } catch (error) {
                    console.error(`Error processing BibTeX file ${filePath}:`, error.message);
                }
            }

            return processedFiles;
        },

        async contentLoaded({ content, actions }) {
            const { setGlobalData } = actions;

            // Make the processed BibTeX data available globally
            setGlobalData(content);
        },
    };
};

