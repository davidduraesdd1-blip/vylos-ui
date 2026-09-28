// vylos-ui/src/advisor/HistoryChart.tsx
// Historical returns line chart: gridlines + value Y axis + date X axis.
// Draws ONLY the data passed in via `points` (audit 2026-09-27: it used to draw
// a hardcoded fake line for every ETF). With no data it says so.

import * as React from 'react';
import { Card } from '../primitives/Card';
import { TEAL } from './fixtures';
import { linePath } from './chartMath';

export interface HistoryPoint {
  /** Label for the X axis, e.g. "Apr 2025". */
  label: string;
  /** The value to plot (e.g. cumulative return in %). */
  value: number;
}

export interface HistoryChartProps {
  title?: string;
  /** Real history, oldest first. Fewer than 2 points renders an empty state. */
  points?: HistoryPoint[];
  /** Appended to Y-axis labels, e.g. "%". */
  unit?: string;
}

const BOX = { x0: 50, x1: 770, y0: 40, y1: 220 };
const GRID = [40, 100, 160, 220];
const MAX_X_LABELS = 9;

export function HistoryChart({ title = 'Historical returns', points = [], unit = '' }: HistoryChartProps) {
  const d = linePath(points.map((p, i) => [i, p.value]), BOX);
  const vals = points.map((p) => p.value);
  const vMin = vals.length ? Math.min(...vals) : 0;
  const vMax = vals.length ? Math.max(...vals) : 0;
  const valAt = (y: number) => vMax - ((y - BOX.y0) / (BOX.y1 - BOX.y0)) * (vMax - vMin);
  const every = Math.max(1, Math.ceil(points.length / MAX_X_LABELS));
  const xAt = (i: number) =>
    BOX.x0 + (i / Math.max(points.length - 1, 1)) * (BOX.x1 - BOX.x0);

  return (
    <Card pad={24}>
      <h3 style={{ font: '500 18px/1.2 var(--font-ui)', margin: '0 0 14px', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      {d === '' ? (
        <div style={{ padding: '40px 0', fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          No history data yet.
        </div>
      ) : (
        <svg viewBox="0 0 800 280" width="100%" height="280" style={{ display: 'block' }}>
          {GRID.map((y) => (
            <g key={y}>
              <line x1="50" y1={y} x2="780" y2={y} stroke="var(--border)" strokeWidth="0.5" />
              <text
                x="42"
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fill="var(--text-muted)"
                fontFamily="var(--font-mono)"
              >
                {`${valAt(y).toFixed(1)}${unit}`}
              </text>
            </g>
          ))}
          <path
            d={d}
            stroke={TEAL}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) =>
            i % every === 0 ? (
              <text
                key={`${p.label}-${i}`}
                x={xAt(i)}
                y="270"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-muted)"
                fontFamily="var(--font-mono)"
              >
                {p.label}
              </text>
            ) : null,
          )}
        </svg>
      )}
    </Card>
  );
}

export default HistoryChart;
