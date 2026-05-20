// polaris-ui/src/tokenization/MonteCarloFanChart.tsx
// 5-year forward Monte Carlo fan chart with P10 / median / P90.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';

export interface MonteCarloFanChartProps {
  title?: string;
  pathsRun?: number;
  p10?: string;
  median?: string;
  p90?: string;
}

export function MonteCarloFanChart({
  title = '5-year forward sim · Monte Carlo (10,000 paths)',
  pathsRun,
  p10 = '$11.4M',
  median = '$13.9M',
  p90 = '$16.3M',
}: MonteCarloFanChartProps) {
  const _ = pathsRun;
  return (
    <Card pad={24}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Eyebrow>{title}</Eyebrow>
        <div
          style={{
            display: 'flex',
            gap: 14,
            fontSize: 11,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 14, height: 6, background: `color-mix(in srgb, ${GOLD} 22%, transparent)` }} />
            P10–P90 band
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 14, height: 2, background: GOLD }} />
            median
          </span>
        </div>
      </div>
      <svg viewBox="0 0 640 240" width="100%" height="240" style={{ display: 'block' }}>
        {[20, 60, 100, 140, 180, 212].map((y) => (
          <line key={y} x1="50" y1={y} x2="620" y2={y} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 3" />
        ))}
        <text x="42" y="216" textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">$9.0M</text>
        <text x="42" y="186" textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">$11.4M</text>
        <text x="42" y="142" textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">$13.9M</text>
        <text x="42" y="100" textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">$16.3M</text>
        <text x="42" y="58" textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">$18.7M</text>
        <text x="42" y="22" textAnchor="end" fontSize="10" fill="var(--text-muted)" fontFamily="var(--font-mono)">$21.1M</text>
        <path
          d="M50,192 L164,170 L278,148 L392,118 L506,82 L620,42 L620,180 L506,188 L392,196 L278,200 L164,196 L50,192 Z"
          fill={`color-mix(in srgb, ${GOLD} 18%, transparent)`}
        />
        <path
          d="M50,192 L164,180 L278,168 L392,148 L506,128 L620,108"
          fill="none"
          stroke={GOLD}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {['Y0', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'].map((t, i) => (
          <text
            key={t}
            x={50 + i * 114}
            y="232"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
            fontFamily="var(--font-mono)"
          >
            {t}
          </text>
        ))}
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
        {[
          { l: 'P10 downside', v: p10, c: 'var(--danger)' },
          { l: 'Median outcome', v: median, c: GOLD },
          { l: 'P90 upside', v: p90, c: 'var(--success)' },
        ].map((p) => (
          <div key={p.l} style={{ padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 'var(--r-md)' }}>
            <Eyebrow style={{ marginBottom: 6 }}>{p.l}</Eyebrow>
            <Num size={20} weight={600} color={p.c}>{p.v}</Num>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MonteCarloFanChart;
