// polaris-ui/src/advisor/HistoryChart.tsx
// Historical returns line chart — gridlines + percentage Y axis + month X axis.
// Ports the design's inline SVG line chart from advisor/app.jsx (ScreenETFDetail).

import * as React from 'react';
import { Card } from '../primitives/Card';
import { TEAL } from './fixtures';

export interface HistoryChartProps {
  title?: string;
}

const MONTHS = [
  'Apr 2024',
  'Jul 2024',
  'Oct 2024',
  'Jan 2025',
  'Apr 2025',
  'Jul 2025',
  'Oct 2025',
  'Jan 2026',
  'Apr 2026',
];

const SERIES =
  'M50,200 L100,180 L150,170 L200,200 L240,150 L280,80 L320,90 L360,110 L400,70 ' +
  'L440,50 L480,40 L520,90 L560,140 L600,200 L640,170 L680,180 L720,150 L770,170';

export function HistoryChart({ title = 'Historical returns' }: HistoryChartProps) {
  return (
    <Card pad={24}>
      <h3 style={{ font: '500 18px/1.2 var(--font-ui)', margin: '0 0 14px', color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <svg viewBox="0 0 800 280" width="100%" height="280" style={{ display: 'block' }}>
        {[40, 100, 160, 220].map((y, i) => (
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
              {70 - i * 10}
            </text>
          </g>
        ))}
        <path
          d={SERIES}
          stroke={TEAL}
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={50 + i * 90}
            y="270"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-muted)"
            fontFamily="var(--font-mono)"
          >
            {m}
          </text>
        ))}
      </svg>
    </Card>
  );
}

export default HistoryChart;
