// vylos-ui/src/advisor/BasketTable.tsx
// Compact basket holdings table — ticker, issuer, weight, USD, sigma, correlation.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import type { BasketHolding } from './types';

export interface BasketTableProps {
  holdings: BasketHolding[];
  title?: string;
}

export function BasketTable({ holdings, title = 'Basket composition · 9 holdings' }: BasketTableProps) {
  return (
    <Card pad={20}>
      <Eyebrow style={{ marginBottom: 12 }}>{title}</Eyebrow>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 70px 80px 60px 60px',
          gap: 12,
          padding: '6px 0',
          color: 'var(--text-muted)',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: 'var(--tracking-eyebrow)',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>Ticker</div>
        <div>Issuer / Name</div>
        <div style={{ textAlign: 'right' }}>Weight</div>
        <div style={{ textAlign: 'right' }}>USD</div>
        <div style={{ textAlign: 'right' }}>σ</div>
        <div style={{ textAlign: 'right' }}>ρ BTC</div>
      </div>
      {holdings.map((h) => (
        <div
          key={h.ticker}
          style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 70px 80px 60px 60px',
            gap: 12,
            padding: '10px 0',
            alignItems: 'center',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 4, height: 14, background: h.color, borderRadius: 1 }} />
            <Num size={13} weight={600}>{h.ticker}</Num>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12.5, color: 'var(--text-primary)' }}>{h.issuer}</div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                marginTop: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {h.name}
            </div>
          </div>
          <Num size={13} weight={600} style={{ textAlign: 'right' }}>{`${h.weight.toFixed(2)}%`}</Num>
          <Num size={12} color="var(--text-secondary)" style={{ textAlign: 'right' }}>{h.usd}</Num>
          <Num size={12} color="var(--text-muted)" style={{ textAlign: 'right' }}>{`${h.sigma.toFixed(1)}`}</Num>
          <Num size={12} color="var(--text-muted)" style={{ textAlign: 'right' }}>{h.corr.toFixed(2)}</Num>
        </div>
      ))}
    </Card>
  );
}

export default BasketTable;
