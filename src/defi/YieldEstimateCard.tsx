// polaris-ui/src/defi/YieldEstimateCard.tsx
// 3-up grid showing estimated yield this week / month / year.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface YieldEstimate {
  label: string;
  value: string;
}

export interface YieldEstimateCardProps {
  title?: string;
  estimates?: YieldEstimate[];
}

const DEFAULTS: YieldEstimate[] = [
  { label: 'This week', value: '$182' },
  { label: 'This month', value: '$762' },
  { label: 'This year', value: '$9.1k' },
];

export function YieldEstimateCard({
  title = 'Estimated yield · top-3 opportunities',
  estimates = DEFAULTS,
}: YieldEstimateCardProps) {
  return (
    <Card pad={20}>
      <Eyebrow style={{ marginBottom: 14 }}>{title}</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${estimates.length}, 1fr)`, gap: 18 }}>
        {estimates.map((c) => (
          <div key={c.label}>
            <Eyebrow style={{ marginBottom: 6 }}>{c.label}</Eyebrow>
            <Num size={28} weight={600} color="var(--accent)">{c.value}</Num>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default YieldEstimateCard;
