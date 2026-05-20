// polaris-ui/src/defi/HealthFactorGauge.tsx
// Semi-circular SVG gauge (Aave-style) showing lending health factor.
// Kept from the richer prior DEFI library — extends the design's coverage
// (the design's CycleGauge handles market cycle, not per-position health).

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface HealthFactorGaugeProps {
  /** Health factor: <1 = liquidation, 1-1.5 = risky, 1.5-2 = warning, >2 = safe. */
  healthFactor: number;
  /** Optional position label (e.g. "ETH/USDC on Aave v3"). */
  label?: string;
  /** Optional collateral ratio in % (e.g. 167). */
  collateralRatio?: number;
  /** Optional liquidation threshold in % (e.g. 80). */
  liquidationThreshold?: number;
}

export function HealthFactorGauge({
  healthFactor,
  label,
  collateralRatio,
  liquidationThreshold,
}: HealthFactorGaugeProps) {
  // Map healthFactor [1, 4] to angle [-90deg, +90deg]; clamp outside.
  const clamped = Math.max(0.5, Math.min(4, healthFactor));
  const t = (clamped - 0.5) / (4 - 0.5); // 0..1
  const angle = -90 + t * 180; // degrees
  const rad = (angle * Math.PI) / 180;
  const cx = 100;
  const cy = 100;
  const r = 78;
  const nx = cx + r * Math.cos(rad);
  const ny = cy + r * Math.sin(rad);

  const color =
    healthFactor < 1
      ? 'var(--danger)'
      : healthFactor < 1.5
      ? 'var(--warning)'
      : healthFactor < 2
      ? 'var(--accent)'
      : 'var(--success)';
  const status =
    healthFactor < 1
      ? 'LIQUIDATION'
      : healthFactor < 1.5
      ? 'AT RISK'
      : healthFactor < 2
      ? 'WATCH'
      : 'HEALTHY';

  return (
    <Card pad={20}>
      <Eyebrow style={{ marginBottom: 8 }}>Health factor{label ? ` · ${label}` : ''}</Eyebrow>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <svg viewBox="0 0 200 120" width={220} height={132}>
          {/* arc background */}
          <path d="M 22 100 A 78 78 0 0 1 178 100" fill="none" stroke="var(--bg-3)" strokeWidth={12} strokeLinecap="round" />
          {/* gradient under arc */}
          <defs>
            <linearGradient id="hf-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--danger)" />
              <stop offset="30%" stopColor="var(--warning)" />
              <stop offset="65%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
          </defs>
          <path d="M 22 100 A 78 78 0 0 1 178 100" fill="none" stroke="url(#hf-grad)" strokeWidth={4} strokeOpacity={0.6} />
          {/* needle */}
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth={3} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={5} fill={color} />
        </svg>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
        <Num size={32} weight={600} color={color}>{healthFactor.toFixed(2)}</Num>
        <span
          style={{
            font: '600 11px/1 var(--font-ui)',
            letterSpacing: '0.06em',
            color,
            background: `color-mix(in srgb, ${color} 14%, transparent)`,
            padding: '4px 8px',
            borderRadius: 'var(--r-pill)',
          }}
        >
          {status}
        </span>
      </div>
      {(collateralRatio !== undefined || liquidationThreshold !== undefined) && (
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
          }}
        >
          {collateralRatio !== undefined && <span>Collateral {collateralRatio}%</span>}
          {liquidationThreshold !== undefined && <span>LT {liquidationThreshold}%</span>}
        </div>
      )}
    </Card>
  );
}

export default HealthFactorGauge;
