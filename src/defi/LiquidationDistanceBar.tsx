// polaris-ui/src/defi/LiquidationDistanceBar.tsx
// Visual price-to-liquidation bar with entry + current markers.
// Extends design coverage (HealthFactorGauge shows scalar; this shows the price axis).

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface LiquidationDistanceBarProps {
  asset: string;
  entryPrice: number;
  currentPrice: number;
  liquidationPrice: number;
}

export function LiquidationDistanceBar({
  asset,
  entryPrice,
  currentPrice,
  liquidationPrice,
}: LiquidationDistanceBarProps) {
  // Establish axis from liquidation to "comfortable safe" zone (2x liquidation).
  const lo = Math.min(liquidationPrice, currentPrice) * 0.95;
  const hi = Math.max(entryPrice, currentPrice) * 1.15;
  const span = hi - lo;
  const pct = (v: number) => Math.max(0, Math.min(100, ((v - lo) / span) * 100));

  const distancePct = ((currentPrice - liquidationPrice) / currentPrice) * 100;
  const distanceColor =
    distancePct < 5 ? 'var(--danger)' : distancePct < 15 ? 'var(--warning)' : 'var(--success)';

  return (
    <Card pad={20}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <Eyebrow>{`${asset} · distance to liquidation`}</Eyebrow>
        <Num size={14} weight={600} color={distanceColor}>{`${distancePct.toFixed(1)}% above liq`}</Num>
      </div>
      <div style={{ position: 'relative', height: 28, marginBottom: 28 }}>
        <div
          style={{
            position: 'absolute',
            inset: '12px 0',
            borderRadius: 'var(--r-pill)',
            background:
              'linear-gradient(90deg, var(--danger) 0%, var(--warning) 25%, var(--success) 60%, var(--success) 100%)',
            opacity: 0.55,
          }}
        />
        {/* Liquidation marker */}
        <div
          style={{
            position: 'absolute',
            left: `${pct(liquidationPrice)}%`,
            top: 0,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--danger)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>LIQ</span>
          <span style={{ width: 2, height: 18, background: 'var(--danger)' }} />
        </div>
        {/* Entry */}
        <div
          style={{
            position: 'absolute',
            left: `${pct(entryPrice)}%`,
            top: 0,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>entry</span>
          <span style={{ width: 2, height: 18, background: 'var(--text-muted)' }} />
        </div>
        {/* Current */}
        <div
          style={{
            position: 'absolute',
            left: `${pct(currentPrice)}%`,
            top: 0,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 9,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            NOW
          </span>
          <span style={{ width: 3, height: 22, background: 'var(--text-primary)' }} />
        </div>
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
        <span>Liq ${liquidationPrice.toLocaleString()}</span>
        <span>Entry ${entryPrice.toLocaleString()}</span>
        <span>Now ${currentPrice.toLocaleString()}</span>
      </div>
    </Card>
  );
}

export default LiquidationDistanceBar;
