// polaris-ui/src/tokenization/RiskMetricsGrid.tsx
// Sharpe / Sortino / Calmar / VaR / CVaR / MaxDD with plain-English ratings.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import type { RiskMetric, RiskTone } from './types';

export interface RiskMetricsGridProps {
  metrics: RiskMetric[];
  title?: string;
}

const TONE_C: Record<RiskTone, string> = {
  success: 'var(--success)',
  warning: 'var(--warning)',
  gold: GOLD,
  danger: 'var(--danger)',
};

export function RiskMetricsGrid({ metrics, title = 'Risk metrics · 30d rolling' }: RiskMetricsGridProps) {
  return (
    <Card pad={24}>
      <Eyebrow style={{ marginBottom: 14 }}>{title}</Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {metrics.map((m) => (
          <div
            key={m.k}
            style={{ padding: '14px 16px', background: 'var(--bg-2)', borderRadius: 'var(--r-md)' }}
          >
            <Eyebrow style={{ marginBottom: 6 }}>{m.k}</Eyebrow>
            <Num size={22} weight={600} color={TONE_C[m.tone]}>{m.v}</Num>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 4,
                textTransform: 'capitalize',
              }}
            >
              {m.rating}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RiskMetricsGrid;
