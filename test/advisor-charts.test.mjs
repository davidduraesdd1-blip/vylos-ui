// Run: npm test  (node --test; Node 23.6+ strips TS types natively)
// Regression tests for audit 2026-09-27 slice 12: the Advisor charts printed
// a caption ("10,000 paths, retained 250, seed 42") and a history line that
// the code never computed. These fail on the pre-fix code.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  generatePaths, medianPath, projectionCaption, linePath, mulberry32,
} from '../src/advisor/chartMath.ts';

const src = (p) => readFileSync(new URL(`../src/advisor/${p}`, import.meta.url), 'utf8');

test('seeded paths are deterministic and the count matches the caption', () => {
  const a = generatePaths(30, 24, 42);
  const b = generatePaths(30, 24, 42);
  assert.deepEqual(a, b);
  assert.equal(a.length, 30);
  assert.equal(a[0].length, 25);
  assert.notDeepEqual(generatePaths(30, 24, 7), a);
  assert.match(projectionCaption(30, 24, 42), /30 random paths · 24 steps · seed 42/);
});

test('median is computed per step, not a hardcoded line', () => {
  const m = medianPath([[[0, 1], [1, 5]], [[0, 3], [1, 1]], [[0, 2], [1, 9]]]);
  assert.deepEqual(m, [[0, 2], [1, 5]]);
  assert.deepEqual(medianPath([]), []);
});

test('mulberry32 stays in [0,1)', () => {
  const r = mulberry32(1);
  for (let i = 0; i < 1000; i++) { const x = r(); assert.ok(x >= 0 && x < 1); }
});

test('linePath scales real points and refuses to invent a line', () => {
  assert.equal(linePath([], { x0: 0, x1: 10, y0: 0, y1: 10 }), '');
  assert.equal(linePath([[0, 1]], { x0: 0, x1: 10, y0: 0, y1: 10 }), '');
  assert.equal(linePath([[0, 0], [1, 1]], { x0: 0, x1: 10, y0: 0, y1: 10 }), 'M0.0,10.0 L10.0,0.0');
});

test('ForwardProjection caption comes from the real inputs', () => {
  const s = src('ForwardProjection.tsx');
  assert.ok(!s.includes('10,000'), 'hardcoded fake path count is back');
  assert.ok(!s.includes('Math.random'), 'unseeded paths are back');
  assert.ok(s.includes('projectionCaption('), 'caption must be computed');
  assert.ok(s.includes('medianPath('), 'median must be computed');
});

test('HistoryChart renders passed-in data, no hardcoded series', () => {
  const s = src('HistoryChart.tsx');
  assert.ok(!/const SERIES\s*=/.test(s), 'hardcoded fake series is back');
  assert.ok(s.includes('points'), 'HistoryChart must take a points prop');
});
