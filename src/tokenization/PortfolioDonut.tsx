// polaris-ui/src/tokenization/PortfolioDonut.tsx
// Animated SVG donut — centerpiece of the Tokenization dashboard.

import * as React from 'react';
import type { AllocationEntry } from './types';
import { GOLD } from './fixtures';

export interface PortfolioDonutProps {
  size?: number;
  total?: string;
  yieldLabel?: string;
  allocation: AllocationEntry[];
}

export function PortfolioDonut({
  size = 280,
  total = '$10.0M',
  yieldLabel = '+7.83% yield',
  allocation,
}: PortfolioDonutProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const sw = size * 0.11;
  const C = 2 * Math.PI * r;
  let cum = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={sw} />
      {allocation.map((a) => {
        const len = (a.pct / 100) * C;
        const offset = -cum;
        cum += len;
        return (
          <circle
            key={a.cat}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={`var(--cat-${a.cat})`}
            strokeWidth={sw}
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fontSize={size * 0.045}
        fill="var(--text-muted)"
        fontFamily="var(--font-mono)"
        letterSpacing="0.08em"
      >
        PORTFOLIO
      </text>
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fontSize={size * 0.13}
        fontWeight="600"
        fill="var(--text-primary)"
        fontFamily="var(--font-mono)"
        letterSpacing="-0.02em"
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 38}
        textAnchor="middle"
        fontSize={size * 0.035}
        fill={GOLD}
        fontFamily="var(--font-mono)"
        letterSpacing="0.04em"
      >
        {yieldLabel}
      </text>
    </svg>
  );
}

export default PortfolioDonut;
