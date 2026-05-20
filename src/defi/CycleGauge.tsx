// polaris-ui/src/defi/CycleGauge.tsx
// Market cycle position — Fear & Greed-style gradient bar with rationale.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface CycleGaugeProps {
  value: number; // 0-100
  label: string;
  rationale: string;
}

export function CycleGauge({ value, label, rationale }: CycleGaugeProps) {
  return (
    <Card pad={20} accent="var(--accent)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <Glyph kind="chart-line" size={14} color="var(--accent)" />
        <Eyebrow>Market cycle position</Eyebrow>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
        <Glyph kind="square" size={18} color="var(--warning)" />
        <span
          style={{
            font: '600 28px/1 var(--font-ui)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {label}
        </span>
        <Num size={28} weight={600} color="var(--warning)">{`· ${value}/100`}</Num>
      </div>
      <div
        style={{
          position: 'relative',
          height: 14,
          borderRadius: 7,
          overflow: 'visible',
          background: 'var(--bg-2)',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 7,
            background:
              'linear-gradient(90deg, var(--success) 0%, #b0d86b 25%, #c9bfb0 50%, var(--warning) 75%, var(--danger) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${value}%`,
            top: -4,
            width: 3,
            height: 22,
            background: 'var(--text-primary)',
            borderRadius: 2,
            transform: 'translateX(-1.5px)',
            boxShadow: '0 0 0 2px var(--bg-1)',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}
      >
        <span>1 — Strong Buy</span>
        <span>50 — Neutral</span>
        <span>100 — De-risk</span>
      </div>
      <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
        {rationale}
      </div>
    </Card>
  );
}

export default CycleGauge;
