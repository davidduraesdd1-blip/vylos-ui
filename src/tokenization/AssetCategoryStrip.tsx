// polaris-ui/src/tokenization/AssetCategoryStrip.tsx
// Flat horizontal % strip — compact alternative to PortfolioDonut for tight layouts.
// Kept from the richer prior library (the design only ships the donut).

import * as React from 'react';
import { Eyebrow } from '../primitives/Eyebrow';
import { Num } from '../primitives/Num';
import type { AllocationEntry } from './types';

export interface AssetCategoryStripProps {
  allocation: AllocationEntry[];
  title?: string;
}

export function AssetCategoryStrip({
  allocation,
  title = 'Asset categories',
}: AssetCategoryStripProps) {
  const total = allocation.reduce((s, a) => s + a.pct, 0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Eyebrow>{title}</Eyebrow>
      <div
        style={{
          display: 'flex',
          height: 14,
          borderRadius: 'var(--r-pill)',
          overflow: 'hidden',
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
        }}
      >
        {allocation.map((a) => (
          <div
            key={a.cat}
            style={{
              width: `${(a.pct / total) * 100}%`,
              background: `var(--cat-${a.cat})`,
            }}
            title={`${a.label} ${a.pct}%`}
          />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
        }}
      >
        {allocation.map((a) => (
          <span key={a.cat} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: `var(--cat-${a.cat})`,
              }}
            />
            <span>{a.label}</span>
            <Num color="var(--text-secondary)">{`${a.pct}%`}</Num>
          </span>
        ))}
      </div>
    </div>
  );
}

export default AssetCategoryStrip;
