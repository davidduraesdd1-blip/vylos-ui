// polaris-ui/src/tokenization/PortfolioDonut.tsx
// Animated SVG donut — centerpiece of the Tokenization dashboard.

import * as React from 'react';
import type { AllocationEntry } from './types';
import { GOLD } from './fixtures';

export type CategoryGranularity = 'fine' | 'coarse';

export interface PortfolioDonutProps {
  size?: number;
  total?: string;
  yieldLabel?: string;
  allocation: AllocationEntry[];
  /** T15: 'coarse' collapses the 10 fine categories into 4 buckets (Beginner). */
  categoryGranularity?: CategoryGranularity;
}

// Fine category key -> coarse bucket key (bucket key must be a real --cat-* token).
const COARSE_MAP: Record<string, string> = {
  treasuries: 'treasuries',
  credit: 'credit',
  realestate: 'realestate', commodities: 'realestate', infrastructure: 'realestate',
  defi: 'defi', equities: 'defi', tokeq: 'defi', carbon: 'defi', tradefin: 'defi',
};

function coarsen(alloc: AllocationEntry[]): AllocationEntry[] {
  const acc: Record<string, number> = {};
  for (const a of alloc) {
    const k = COARSE_MAP[a.cat] || a.cat;
    acc[k] = (acc[k] || 0) + a.pct;
  }
  const order = ['treasuries', 'credit', 'realestate', 'defi'];
  return Object.entries(acc)
    .map(([cat, pct]) => ({ cat, pct } as AllocationEntry))
    .sort((x, y) => order.indexOf(x.cat) - order.indexOf(y.cat));
}

export function PortfolioDonut({
  size = 280,
  total = '$10.0M',
  yieldLabel = '+7.83% yield',
  allocation,
  categoryGranularity = 'fine',
}: PortfolioDonutProps) {
  const slices = categoryGranularity === 'coarse' ? coarsen(allocation) : allocation;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const sw = size * 0.11;
  const C = 2 * Math.PI * r;
  let cum = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-3)" strokeWidth={sw} />
      {slices.map((a) => {
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
