---
title: Test References
sidebar_label: Test References
description: Test page to verify bibliodocus components are working correctly
---

import { BibTexFilterControls, BibTexDebugger } from '@site/src/components/bibliodocus';
import LimitedBibTexReferences from '@site/src/components/LimitedBibTexReferences';

# Test References Page

This page is used to test and verify that the bibliodocus components are working correctly with the BRAIN-diet.bib file.

## Interactive Filter Controls

Use the controls below to browse all references by type and citation style:

<BibTexFilterControls 
  filePath="/bibtex/BRAIN-diet.bib"
  defaultStyle="apa"
  showCitationKeys={false}
/>

## Sample References

### Example 1: APA Style (2 Most Recent)

<LimitedBibTexReferences 
  filePath="/bibtex/BRAIN-diet.bib" 
  title="Sample References - APA Style" 
  style="apa"
  sortBy="year"
  sortDirection="desc"
  showCitationKeys={false}
  limit={2}
/>

### Example 2: IEEE Style (With Citation Keys)

<LimitedBibTexReferences 
  filePath="/bibtex/BRAIN-diet.bib" 
  title="Sample References - IEEE Style" 
  style="ieee"
  sortBy="citationKey"
  sortDirection="asc"
  showCitationKeys={true}
  limit={2}
/>

## Debugger (Check BibTeX Parsing)

Use the debugger below to inspect individual BibTeX entries and verify parsing:

<BibTexDebugger filePath="/bibtex/BRAIN-diet.bib" />
