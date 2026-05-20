// polaris-ui/src/tokenization/YieldAccrualCard.tsx
// 3-up daily/monthly/annual yield accrual card.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface AccrualEntry {
  label: string;
  value: string;
}

export interface YieldAccrualCardProps {
  refreshNote?: string;
  entries?: AccrualEntry[];
}

const DEFAULTS: AccrualEntry[] = [
  { label: 'Daily',   value: '$23.95' },
  { label: 'Monthly', value: '$718'   },
  { label: 'Annual',  value: '$8,741' },
];

export function YieldAccrualCard({
  refreshNote = 'How much your portfolio earns over each horizon · refreshed every 8h',
  entries = DEFAULTS,
}: YieldAccrualCardProps) {
  return (
    <Card pad={24}>
      <Eyebrow style={{ marginBottom: 6 }}>Continuous yield accrual</Eyebrow>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 18 }}>{refreshNote}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${entries.length}, 1fr)`, gap: 18 }}>
        {entries.map((c) => (
          <div key={c.label}>
            <Eyebrow style={{ marginBottom: 6 }}>{c.label} accrual</Eyebrow>
            <Num size={28} weight={600}>{c.value}</Num>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default YieldAccrualCard;
