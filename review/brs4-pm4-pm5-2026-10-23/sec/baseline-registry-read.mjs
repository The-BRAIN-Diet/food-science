// Read-only reproduction of the pre-SEC registry for the two existing legacy tests.
import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';
const read=fs.readFileSync.bind(fs),before=new URL('./registry-before.json',import.meta.url);
fs.readFileSync=(path,...args)=>String(path).endsWith('system/sec-assessments/registry.json')?read(before,...args):read(path,...args);syncBuiltinESMExports();
