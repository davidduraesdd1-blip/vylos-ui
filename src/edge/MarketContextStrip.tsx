// polaris-ui/src/edge/MarketContextStrip.tsx
// Top-of-page macro summary: VIX, DXY, F&G, BTC dominance, total mcap.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import type { MarketContext } from './types';

export interface MarketContextStripProps {
  ctx: MarketContext;
}

export function MarketContextStrip({ ctx }: MarketContextStripProps) {
  const cells = [
    { label: 'VIX',           value: ctx.vix.toFixed(1),       sub: ctx.vixLabel },
    { label: 'DXY',           value: ctx.dxy.toFixed(1),       sub: ctx.dxyLabel },
    { label: 'Fear & Greed',  value: String(ctx.fgIndex),      sub: ctx.fgLabel + ' · ' + ctx.fgTrend },
    { label: 'BTC dominance', value: ctx.btcDominance + '%',   sub: ctx.btcDomLabel },
    { label: 'Total mcap',    value: ctx.totalMcap,            sub: ctx.totalMcapLabel },
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
        gap: 1,
        background: 'var(--border)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {cells.map((c) => (
        <div key={c.label} style={{ background: 'var(--bg-1)', padding: '12px 16px' }}>
          <Eyebrow style={{ marginBottom: 6 }}>{c.label}</Eyebrow>
          <Num size={18} weight={600}>{c.value}</Num>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginTop: 2,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {c.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarketContextStrip;
