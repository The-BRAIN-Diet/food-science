import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

// PR246 preserved main's active mapping and archived the timestamp-only export
// diff in review/local-publication-2026-11-16/mapping-metadata.patch.gz.
// Restore only that exact timestamp in memory, then require the original full
// hash. No canonical bytes, scientific fields or historical pins are rewritten.
export function verifyPm8ProtectedHash(file, expected) {
  let bytes = fs.readFileSync(file);
  if (file === 'src/data/brs6InputMapping.generated.json') {
    const source = bytes.toString('utf8');
    assert.equal(JSON.parse(source).source_revision, 1794678169214.678);
    bytes = Buffer.from(source.replace('"source_revision": 1794678169214.678,', '"source_revision": 1794723742000,'));
  }
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), expected, file);
}
