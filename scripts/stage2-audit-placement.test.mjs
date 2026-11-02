import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const source=fs.readFileSync('src/components/Stage2Review/index.tsx','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.React,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
const mod={exports:{}};new Function('require','module','exports',compiled)(require,mod,mod.exports);
const {default:Review,Stage2ReviewProvider:Provider,Stage2ReviewOutlet:Outlet}=mod.exports;
test('legacy review content and outlet never render while canonical children survive',()=>{
 const html=renderToStaticMarkup(React.createElement(Provider,null,
 React.createElement('p',null,'Canonical evidence'),
 React.createElement(Review,null,React.createElement('details',null,'Obsolete dated execution review')),
 React.createElement(Outlet)));
 assert.equal(html,'<p>Canonical evidence</p>');
 assert.doesNotMatch(source,/useEffect|useContext|createContext/);
});
test('audit removes execution outlet and preserves the public corrections register',()=>{
 const audit=fs.readFileSync('src/components/SecCalibrationPreview/EvidenceAudit.tsx','utf8');
 assert.doesNotMatch(audit,/Stage2ReviewOutlet/);
 assert.match(audit,/Public Framework Review &amp; Corrections register/);
});
test('retired preservation generator cannot regenerate panels',()=>{
 const script=fs.readFileSync('scripts/run-stage2ab-preservation.mjs','utf8');
 assert.match(script.split('\n')[1],/^throw new Error\('Retired Stage 2A\/2B/);
});
