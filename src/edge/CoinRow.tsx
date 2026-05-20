// polaris-ui/src/edge/CoinRow.tsx
// Row in the markets list. Click to drill into composite details.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import { SignalBadge } from '../primitives/SignalBadge';
import { REGIMES as DEFAULT_REGIMES } from '../data/regime';
import type { Coin } from './types';
import type { Regime, RegimeKey } from '../data/regime';

export interface CoinRowProps {
  coin: Coin;
  onTap?: () => void;
  regimes?: Record<RegimeKey, Regime>;
}

export function CoinRow({ coin, onTap, regimes }: CoinRowProps) {
  const R = regimes || DEFAULT_REGIMES;
  const coinRegime: Regime = R[coin.regime] || R.NEUTRAL;
  return (
    <button
      onClick={onTap}
      style={{
        width: '100%',
        padding: '14px 18px',
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${coinRegime.color}`,
        borderRadius: 'var(--r-md)',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'grid',
        // Widened the price + change columns; the original `1fr 1fr 1fr` layout
        // collapsed the 24h/7d % columns to ~80px each when the sidebar was
        // visible, causing the values to visually collide. Fixed widths give
        // each cell predictable breathing room.
        gridTemplateColumns: '70px minmax(110px, 1.2fr) 90px 90px minmax(80px, 1fr) 90px 24px',
        gap: 14,
        alignItems: 'center',
        transition: 'background var(--dur-fast) var(--ease-out)',
        fontFamily: 'var(--font-ui)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-1)';
      }}
    >
      <div>
        <Num size={14} weight={600}>{coin.symbol}</Num>
        <div
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: 2,
          }}
        >
          /{coin.pair}
        </div>
      </div>
      <div>
        <Num size={16} weight={600}>
          {'$' + coin.price.toLocaleString(undefined, { maximumFractionDigits: coin.price < 10 ? 4 : 0 })}
        </Num>
      </div>
      <div>
        <Num size={13} color={coin.change24h >= 0 ? 'var(--success)' : 'var(--danger)'}>
          {coin.change24h >= 0 ? '+' : ''}
          {coin.change24h.toFixed(2)}%
        </Num>
        <div
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: 2,
          }}
        >
          24h
        </div>
      </div>
      <div>
        <Num size={13} color={coin.change7d >= 0 ? 'var(--success)' : 'var(--danger)'}>
          {coin.change7d >= 0 ? '+' : ''}
          {coin.change7d.toFixed(1)}%
        </Num>
        <div
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: 2,
          }}
        >
          7d
        </div>
      </div>
      <div
        style={{
          fontSize: 11,
          color: coinRegime.color,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {coinRegime.name}
      </div>
      <SignalBadge verdict={coin.verdict} size="sm" />
      <Glyph kind="caret-right" size={16} color="var(--text-muted)" />
    </button>
  );
}

export default CoinRow;
