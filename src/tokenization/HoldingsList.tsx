// polaris-ui/src/tokenization/HoldingsList.tsx
// Top holdings by yield — color-coded by asset category.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import type { Holding } from './types';

export interface HoldingsListProps {
  holdings: Holding[];
  limit?: number;
  title?: string;
}

export function HoldingsList({ holdings, limit = 12, title = 'Top holdings by yield' }: HoldingsListProps) {
  const rows = holdings.slice(0, limit);
  const maxApy = Math.max(28, ...rows.map((h) => h.apy));
  return (
    <Card pad={24}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Eyebrow>{title}</Eyebrow>
        <Num size={11} color="var(--text-muted)">{`${holdings.length} positions`}</Num>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {rows.map((h) => {
          const c = `var(--cat-${h.cat})`;
          const pct = (h.apy / maxApy) * 100;
          return (
            <div
              key={h.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '260px 1fr 70px 80px',
                gap: 14,
                alignItems: 'center',
                padding: '8px 14px',
                borderRadius: 'var(--r-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span style={{ width: 4, height: 14, background: c, borderRadius: 1, flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: 12.5,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {h.name}
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: c, borderRadius: 3 }} />
              </div>
              <Num size={12.5} color={GOLD} weight={600} style={{ textAlign: 'right' }}>{`${h.apy.toFixed(1)}%`}</Num>
              <Num size={11.5} color="var(--text-muted)" style={{ textAlign: 'right' }}>{h.value}</Num>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default HoldingsList;
