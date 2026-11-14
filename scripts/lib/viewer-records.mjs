import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

export function writeViewerRecords(directory, records) {
  const bytes = JSON.stringify(records) + '\n';
  const digest = createHash('sha256').update(bytes).digest('hex');
  const filename = `food-records-v1.${digest}.json`;
  fs.writeFileSync(path.join(directory, filename), bytes);
  return '../pm-explorer/' + filename;
}

export function readViewerData(file, key = 'foods') {
  const filename = file instanceof URL ? fileURLToPath(file) : file;
  const data = JSON.parse(fs.readFileSync(filename));
  if (data.records_file) {
    data[key] = JSON.parse(fs.readFileSync(path.resolve(path.dirname(filename), data.records_file)));
  }
  return data;
}
