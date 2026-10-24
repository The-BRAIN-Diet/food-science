import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync, spawnSync} from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import {validateSecRegistry, secAssessmentHash} from './lib/sec-assessments.mjs';

const config = fs.readFileSync('netlify.toml', 'utf8');
const command = config.match(/^\s*command = '([^']+)'$/m)?.[1];
const baseline = config.match(/^\s*SEC_BASE_REF = "([a-f0-9]{40})"$/m)?.[1];
const registry = JSON.parse(fs.readFileSync('system/sec-assessments/registry.json', 'utf8'));

test('Netlify pins a reviewed history baseline and retains the validated heap limit', () => {
  assert.equal(baseline, 'ebbc10ed11484192c972952d8c47645bd3c5bf4e');
  assert.match(config, /NODE_OPTIONS = "--max-old-space-size=4096"/);
  const previous = JSON.parse(execFileSync('git', ['show', `${baseline}:system/sec-assessments/registry.json`], {encoding: 'utf8'}));
  assert.equal(previous.assessments.length, 84);
  assert.deepEqual(registry, previous);
  assert.deepEqual(validateSecRegistry(registry, {previous}), []);
  const removed = structuredClone(registry);
  removed.assessments.pop();
  assert.ok(validateSecRegistry(removed, {previous}).some(e => e.code === 'sec_immutable'));
  const overwritten = structuredClone(registry);
  overwritten.assessments[0].record.proposition += ' changed';
  overwritten.assessments[0].sha256 = secAssessmentHash(overwritten.assessments[0].record);
  assert.ok(validateSecRegistry(overwritten, {previous}).some(e => e.code === 'sec_immutable'));
});

test('the unchanged production guard still rejects an absent baseline and accepts the configured one', () => {
  const env = {...process.env};
  delete env.SEC_BASE_REF;
  const absent = spawnSync(process.execPath, ['scripts/check-sec-assessments.mjs'], {env, encoding: 'utf8'});
  assert.notEqual(absent.status, 0);
  assert.match(absent.stderr, /SEC_BASE_REF or an explicit published base ref is required/);
  const configured = spawnSync(process.execPath, ['scripts/check-sec-assessments.mjs'], {env: {...env, SEC_BASE_REF: baseline}, encoding: 'utf8'});
  assert.equal(configured.status, 0, configured.stderr);
  assert.match(configured.stdout, /valid \(84 snapshots\)/);
});

function shallowFixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'netlify-sec-baseline-'));
  const seed = path.join(root, 'seed'), checkout = path.join(root, 'checkout');
  const git = (cwd, args) => execFileSync('git', args, {cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']});
  try {
    fs.mkdirSync(seed);
    git(seed, ['init', '--quiet', '--initial-branch=main']);
    fs.writeFileSync(path.join(seed, 'record'), 'reviewed history\n');
    git(seed, ['add', 'record']);
    const commit = () => git(seed, ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '--quiet', '-m', 'Fixture']);
    commit();
    const previous = git(seed, ['rev-parse', 'HEAD']).trim();
    fs.appendFileSync(path.join(seed, 'record'), 'new checkout\n');
    git(seed, ['add', 'record']); commit();
    git(root, ['clone', '--quiet', '--depth=1', pathToFileURL(seed).href, checkout]);
    const bin = path.join(root, 'bin'), marker = path.join(root, 'build-started');
    fs.mkdirSync(bin);
    fs.writeFileSync(path.join(bin, 'npm'), '#!/bin/sh\nprintf "%s\\n" "$*" > "$BUILD_MARKER"\ngit cat-file -e "$SEC_BASE_REF^{commit}"\n', {mode: 0o755});
    run({checkout, previous, marker, env: {...process.env, PATH: bin + path.delimiter + process.env.PATH, BUILD_MARKER: marker}});
  } finally {fs.rmSync(root, {recursive: true, force: true});}
}

test('the exact configured command fetches an absent shallow-clone baseline before starting the build', () => {
  shallowFixture(({checkout, previous, marker, env}) => {
    assert.notEqual(spawnSync('git', ['cat-file', '-e', `${previous}^{commit}`], {cwd: checkout}).status, 0);
    const result = spawnSync('/bin/sh', ['-c', command], {cwd: checkout, env: {...env, SEC_BASE_REF: previous}, encoding: 'utf8'});
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readFileSync(marker, 'utf8').trim(), 'run build');
  });
});

test('an unavailable baseline stops the configured command before npm can build or publish', () => {
  shallowFixture(({checkout, marker, env}) => {
    const result = spawnSync('/bin/sh', ['-c', command], {cwd: checkout, env: {...env, SEC_BASE_REF: '0'.repeat(40)}, encoding: 'utf8'});
    assert.notEqual(result.status, 0);
    assert.equal(fs.existsSync(marker), false);
  });
});
