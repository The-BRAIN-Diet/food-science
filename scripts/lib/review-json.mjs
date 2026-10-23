/** Read an immutable review fixture, including its losslessly compressed repository copy. */
import fs from 'node:fs';import {gunzipSync} from 'node:zlib';
export function readReviewJson(file){return JSON.parse(fs.existsSync(file+'.gz')?gunzipSync(fs.readFileSync(file+'.gz')).toString('utf8'):fs.readFileSync(file,'utf8'));}
