// vylos-ui/src/advisor/ForwardProjection.tsx
// Illustrative forward-projection "spaghetti" chart: seeded random-walk paths
// over a horizon, with a dashed per-step median overlay. The caption is built
// from the same count/steps/seed the code uses (audit 2026-09-27: the old
// caption claimed ten thousand paths, 250 retained and a seed while the code drew 30
// unseeded paths). Pass `paths` to plot a real simulation instead.

'use client';

import * as React from 'react';
import { Card } from '../primitives/Card';
import { TEAL } from './fixtures';
import { generatePaths, medianPath, projectionCaption } from './chartMath';
import type { Point } from './chartMath';

export interface ForwardProjectionProps {
  // When embedded inside another Card (e.g. PerfTable's Forward tab), skip the
  // outer Card wrapper + heading so we don't double-frame.
  embedded?: boolean;
  /** Real simulated paths (each starts at the same x). Omit for the illustrative demo. */
  paths?: Point[][];
  /** Demo settings, used only when `paths` is omitted. */
  count?: number;
  steps?: number;
  seed?: number;
}

// Chart geometry: x step -> px, value -> px. Values are "growth of 100".
const X0 = 60;
const X1 = 780;
const yPx = (v: number) => 300 - (v - 50) * 0.5;
const vAt = (y: number) => 50 + (300 - y) / 0.5;

export function ForwardProjection({
  embedded = false,
  paths,
  count = 30,
  steps = 24,
  seed = 42,
}: ForwardProjectionProps) {
  // Seeded, so server and client render identical paths (no hydration mismatch).
  const demo = !paths;
  const shown = React.useMemo(
    () => paths ?? generatePaths(count, steps, seed),
    [paths, count, steps, seed],
  );
  const median = React.useMemo(() => medianPath(shown), [shown]);
  const nSteps = shown[0] ? shown[0].length - 1 : steps;
  const xPx = (x: number) => X0 + (x * (X1 - X0)) / Math.max(nSteps, 1);
  const toD = (path: Point[]) =>
    path.map(([x, v], idx) => `${idx === 0 ? 'M' : 'L'}${xPx(x)},${yPx(v)}`).join(' ');

  const chart = (
    <>
      <svg viewBox="0 0 800 320" width="100%" height="320" style={{ display: 'block' }}>
        {[60, 120, 180, 240, 300].map((y, i) => (
          <g key={y}>
            <line x1="60" y1={y} x2="780" y2={y} stroke="var(--border)" strokeWidth="0.5" />
            <text
              x="50"
              y={y + 3}
              textAnchor="end"
              fontSize="10"
              fill="var(--text-muted)"
              fontFamily="var(--font-mono)"
            >
              {Math.round(vAt(y))}
            </text>
          </g>
        ))}
        {shown.map((path, i) => (
          <path key={i} d={toD(path)} stroke={TEAL} strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
        ))}
        {/* Median overlay (dashed), computed per step from the paths above */}
        {median.length > 1 && (
          <path
            d={toD(median)}
            stroke="var(--text-primary)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            fill="none"
          />
        )}
        <text
          x="420"
          y="318"
          textAnchor="middle"
          fontSize="11"
          fill="var(--text-muted)"
          fontFamily="var(--font-mono)"
        >
          Steps (growth of 100)
        </text>
      </svg>
      <div
        style={{
          marginTop: 8,
          fontSize: 11,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {demo
          ? projectionCaption(count, steps, seed)
          : `${shown.length} simulated paths · ${nSteps} steps`}
      </div>
    </>
  );

  if (embedded) return chart;

  return (
    <Card pad={24}>
      <h3 style={{ font: '500 18px/1.2 var(--font-ui)', margin: '0 0 14px', color: 'var(--text-primary)' }}>
        Forward projection
      </h3>
      {chart}
    </Card>
  );
}

export default ForwardProjection;
