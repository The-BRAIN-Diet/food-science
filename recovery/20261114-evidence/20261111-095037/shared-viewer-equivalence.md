# Shared viewer data equivalence

The version 1 shared JSON contains 1,254 records in baseline order. Its SHA-256 is 4becbef2e63b8754c65ea5916b2699b1c165a6425fe89ebec689acf8ac1ff514. The composite (PM, substance, food, record ID) identifies all 1,254. There are 326 distinct bare record IDs and 1,252 distinct food–substance–PM triples. All 995 ranked and 259 other rows match exactly, including nested observations and limitations. Both hydrated datasets deep-match their baselines apart from the new file references and Food Intelligence's updated source-file fingerprint.

| JSON payload, bytes | Before | After |
|---|---:|---:|
| PM Explorer manifest | 10,552,165 | 7,309,427 |
| Food Intelligence manifest | 10,609,061 | 7,366,321 |
| Shared records | embedded twice | 2,509,051 |
| Total | 21,161,226 | 17,184,799 |

The static app modules fetch the two manifests and resolve the same content-addressed record file. The renderers receive their original object shapes. Neither static JSON array is a Webpack module. PM Explorer also loads wheel HTML, evidence ledger and titles as before. Cold JSON body sizes are 9,818,478 bytes (PM Explorer) and 9,875,372 bytes (Food Intelligence). Visiting both can reuse the common asset. Gzip estimates at Node's default compression level are 755,555 and 760,837 bytes cold, previously 784,018 and 789,589. Actual HTTP transfer depends on encoding and caching. Other metadata is still present in both manifests.

34 focused checks passed. Headless Chrome rendered BRS5-FM2-PM4 / inulin with asparagus and the BRS5 Food Intelligence filter at 50% with 20 foods. No full compilation was run. Post-change heap and duration are unmeasured. The preceding local build took 302.59 seconds with a 6 GiB old-space limit.
