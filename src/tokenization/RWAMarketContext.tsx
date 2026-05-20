// polaris-ui/src/tokenization/RWAMarketContext.tsx
// RWA on-chain TVL vs TAM context strip.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import type { RwaMarket } from './types';

export interface RWAMarketContextProps {
  market: RwaMarket;
}

export function RWAMarketContext({ market }: RWAMarketContextProps) {
  return (
    <Card pad={20}>
      <Eyebrow style={{ marginBottom: 12 }}>RWA market context</Eyebrow>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
        <Num size={28} weight={600} color={GOLD}>{market.onchain}</Num>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>on-chain</span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
          }}
        >
          {`vs ${market.tam} TAM`}
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: 'var(--bg-2)',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 8,
        }}
      >
        <div style={{ width: `${market.pct}%`, height: '100%', background: GOLD, borderRadius: 4 }} />
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
        <span>
          <Num color={GOLD}>{`${market.pct}%`}</Num> tokenized today
        </span>
        <span>
          BCG projects {market.projection} — we're at{' '}
          <Num color="var(--text-secondary)">{`${market.target}%`}</Num> of target
        </span>
      </div>
    </Card>
  );
}

export default RWAMarketContext;
