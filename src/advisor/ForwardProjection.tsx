// polaris-ui/src/advisor/ForwardProjection.tsx
// Monte Carlo forward-projection "spaghetti" chart — 30 retained sample
// paths over a horizon, with a dashed median overlay. Ports the design's
// ForwardProjection from advisor/app.jsx. Paths are generated client-side so
// the SVG only renders post-mount (avoids SSR/hydration mismatch on Math.random).

'use client';

import * as React from 'react';
import { Card } from '../primitives/Card';
import { TEAL } from './fixtures';

export interface ForwardProjectionProps {
  // When embedded inside another Card (e.g. PerfTable's Forward tab), skip the
  // outer Card wrapper + heading so we don't double-frame.
  embedded?: boolean;
}

type Point = [number, number];

function generatePaths(count: number, steps: number): Point[][] {
  const arr: Point[][] = [];
  for (let i = 0; i < count; i++) {
    const pts: Point[] = [[0, 100]];
    let v = 100;
    for (let j = 1; j <= steps; j++) {
      v = v * (1 + (Math.random() - 0.4) * 0.18);
      pts.push([j, v]);
    }
    arr.push(pts);
  }
  return arr;
}

export function ForwardProjection({ embedded = false }: ForwardProjectionProps) {
  // Defer path generation to the client so the random spaghetti only paints
  // after mount — server render emits an empty plot, no hydration mismatch.
  const [paths, setPaths] = React.useState<Point[][]>([]);
  React.useEffect(() => {
    setPaths(generatePaths(30, 24));
  }, []);

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
              {`${500 - i * 100}k`}
            </text>
          </g>
        ))}
        {paths.map((path, i) => {
          const d = path
            .map(([x, v], idx) => `${idx === 0 ? 'M' : 'L'}${60 + x * 30},${300 - (v - 50) * 0.5}`)
            .join(' ');
          return (
            <path key={i} d={d} stroke={TEAL} strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
          );
        })}
        {/* Median overlay (dashed) */}
        <line
          x1="60"
          y1="200"
          x2="780"
          y2="195"
          stroke="var(--text-primary)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text
          x="420"
          y="318"
          textAnchor="middle"
          fontSize="11"
          fill="var(--text-muted)"
          fontFamily="var(--font-mono)"
        >
          Trading days
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
        Paths: 10,000 · retained: 250 · seed: 42
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
