// polaris-ui/src/defi/ImpermanentLossCard.tsx
// LP-vs-HODL comparison with net outcome. Extends the design's coverage
// (the design's PoolRow shows APY breakdown, not realized IL on an existing position).

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface ImpermanentLossCardProps {
  poolName: string;
  /** LP position value today (USD). */
  lpValue: number;
  /** Value if you had just held the two tokens (USD). */
  hodlValue: number;
  /** Trading fees earned over the period (USD). */
  feesEarned: number;
  /** Period in days. */
  days?: number;
}

export function ImpermanentLossCard({
  poolName,
  lpValue,
  hodlValue,
  feesEarned,
  days,
}: ImpermanentLossCardProps) {
  const ilDollars = lpValue - hodlValue;
  const ilPct = (ilDollars / hodlValue) * 100;
  const net = ilDollars + feesEarned;
  const netColor = net >= 0 ? 'var(--success)' : 'var(--danger)';

  return (
    <Card pad={20}>
      <Eyebrow style={{ marginBottom: 12 }}>
        LP vs HODL · {poolName}
        {days ? ` · ${days}d` : ''}
      </Eyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 14 }}>
        <div>
          <Eyebrow style={{ marginBottom: 4 }}>LP value</Eyebrow>
          <Num size={22} weight={600}>{`$${lpValue.toLocaleString()}`}</Num>
        </div>
        <div>
          <Eyebrow style={{ marginBottom: 4 }}>If HODL'd</Eyebrow>
          <Num size={22} weight={600} color="var(--text-secondary)">{`$${hodlValue.toLocaleString()}`}</Num>
        </div>
        <div>
          <Eyebrow style={{ marginBottom: 4 }}>Impermanent loss</Eyebrow>
          <Num size={22} weight={600} color={ilDollars < 0 ? 'var(--danger)' : 'var(--success)'}>
            {`${ilPct >= 0 ? '+' : ''}${ilPct.toFixed(2)}%`}
          </Num>
        </div>
      </div>
      <div
        style={{
          padding: '12px 14px',
          background: 'var(--bg-2)',
          borderRadius: 'var(--r-md)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          Net of fees ({`$${feesEarned.toLocaleString()} earned`}):
        </span>
        <Num size={20} weight={600} color={netColor}>{`${net >= 0 ? '+' : ''}$${Math.abs(net).toLocaleString()}`}</Num>
      </div>
    </Card>
  );
}

export default ImpermanentLossCard;
