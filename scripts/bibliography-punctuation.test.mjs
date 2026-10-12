import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';
const code=ts.transpileModule(fs.readFileSync('src/theme/BibTexReferences/ReferenceFormatters.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const context={exports:{}};vm.runInNewContext(code,context);
const format=tags=>context.exports.formatReference({entryType:'article',entryTags:tags},'harvard');
test('incomplete citations have no leading comma or added title quotes',()=>{
 assert.equal(format({title:'Li et al. (2022), L-Theanine: A Unique Functional Amino Acid in Tea'}),'Li et al. (2022), L-Theanine: A Unique Functional Amino Acid in Tea.');
});
test('complete citations retain contributor/year/journal; title apostrophes survive',()=>{
 const result=format({author:'Smith, Ann',year:'2022',title:"'A patient's response'",journal:'Example Journal'});
 assert.equal(result,"Smith, A. 2022, A patient's response, <em>Example Journal</em>.");
});
