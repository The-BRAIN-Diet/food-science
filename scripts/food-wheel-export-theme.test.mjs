import test from 'node:test';
import assert from 'node:assert/strict';
import {wheelExportStyle} from '../static/explore/food-wheel/ribbon-presentation.mjs';

test('exported wheel style follows the selected day or night view', () => {
  const day = wheelExportStyle(true);
  const night = wheelExportStyle(false);
  assert.match(day, /\.wheel-ground\{fill:#f5f7fb\}/);
  assert.match(day, /\.wheel-hub\{fill:#eaf0f7\}/);
  assert.match(day, /\.food text,\.entity text\{fill:#080f19/);
  assert.match(night, /\.brs-label\{fill:#edf3ff;stroke:#090d16/);
  assert.match(night, /\.wheel-ground\{fill:#090d16\}/);
  assert.match(night, /\.wheel-hub\{fill:#090d16\}/);
  assert.doesNotMatch(night, /#f5f7fb/);
  assert.doesNotMatch(day, /stroke:#090d16/);
  assert.doesNotMatch(day, /first-child/);
});
