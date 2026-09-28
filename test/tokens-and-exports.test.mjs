// Regression tests for audit 2026-09-27 slice 12 (vylos-ui rename + exports).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('Ground accent answers to the new name AND the legacy alias', () => {
  const css = read('src/styles/tokens.css');
  // Both selectors must share the gold accent block, dark and light.
  assert.match(css, /\[data-app="vylos-ground"\],\s*\[data-app="polaris-tokenization"\] \{\s*--accent:\s+#d4a54c;/);
  assert.match(css, /\[data-app="vylos-ground"\]\[data-theme="light"\],\s*\[data-app="polaris-tokenization"\]\[data-theme="light"\]/);
});

test('no stale pre-rebrand file headers in src', () => {
  const hits = execSync('git grep -n "^// polaris-ui/" -- src || true', { encoding: 'utf8' });
  assert.equal(hits.trim(), '', hits);
});

test('DataSourceStrip is reachable from the package root', () => {
  const idx = read('src/index.ts');
  assert.match(idx, /export \{ DataSourceStrip \} from '\.\/primitives\/DataSourceStrip'/);
  assert.match(idx, /export type \{ DataSourceStripProps, DataSource \}/);
});
