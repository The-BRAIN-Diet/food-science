import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const {getMinimizers} = require('@docusaurus/bundler/lib/minification.js');
const webpack = require('webpack');

test('Netlify limits the installed JavaScript minifier and still minifies multiple assets', async () => {
  const config = fs.readFileSync('netlify.toml', 'utf8');
  const parallel = config.match(/^\s*TERSER_PARALLEL = "([^"]+)"/m)?.[1];
  assert.equal(parallel, '1');
  const previous = process.env.TERSER_PARALLEL;
  process.env.TERSER_PARALLEL = parallel;
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'netlify-minifier-'));
  try {
    const [minimizer] = await getMinimizers({currentBundler: {name: 'webpack'}, faster: {}});
    assert.equal(minimizer.options.parallel, 1);
    assert.ok(minimizer.constructor.getAvailableNumberOfCores(1) <= 1);
    assert.equal(minimizer.options.minimizer.implementation.name, 'terserMinify');
    const source = '/* removable comment */ function longFunctionName(longArgumentName) { return longArgumentName + 123; } console.log(longFunctionName(5));';
    for (const name of ['first', 'second']) fs.writeFileSync(path.join(directory, `${name}.js`), source);
    const compiler = webpack({mode: 'production', context: directory,
      entry: {first: './first.js', second: './second.js'},
      output: {path: path.join(directory, 'output'), filename: '[name].js'},
      optimization: {minimize: true, minimizer: [minimizer]}});
    try {
      const stats = await new Promise((resolve, reject) => compiler.run((error, result) => error ? reject(error) : resolve(result)));
      assert.equal(stats.hasErrors(), false, stats.toString({all: false, errors: true}));
      for (const name of ['first', 'second']) {
        const output = fs.readFileSync(path.join(directory, 'output', `${name}.js`), 'utf8');
        assert.ok(output.length < source.length);
        assert.ok(!output.includes('removable comment'));
      }
    } finally {await new Promise((resolve, reject) => compiler.close(error => error ? reject(error) : resolve()));}
  } finally {
    fs.rmSync(directory, {recursive: true, force: true});
    if (previous === undefined) delete process.env.TERSER_PARALLEL;
    else process.env.TERSER_PARALLEL = previous;
  }
});
