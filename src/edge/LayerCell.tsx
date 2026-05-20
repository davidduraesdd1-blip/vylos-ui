// polaris-ui/src/edge/LayerCell.tsx
// Single layer cell in the composite signal breakdown. The Edge differentiator.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import { Eyebrow } from '../primitives/Eyebrow';
import type { Layer } from '../data/layers';
import type { ReaderLevelKey } from '../data/glossary';

export interface LayerCellProps {
  layer: Layer;
  /** Raw layer score in [-1, +1]. */
  score01: number;
  /** Baseline (NORMAL regime) weight in [0, 1]. */
  weight: number;
  /** Active regime weight in [0, 1] (may differ from baseline). */
  regimeWeight?: number;
  level?: ReaderLevelKey;
}

export function LayerCell({ layer, score01, weight, regimeWeight, level = 'beginner' }: LayerCellProps) {
  const display = (score01 * 5 + 5).toFixed(1);
  const pct = Math.max(0, Math.min(100, (score01 + 1) * 50));
  const barC = score01 > 0.15 ? 'var(--success)' : score01 < -0.15 ? 'var(--danger)' : 'var(--warning)';
  const isRegimeAdjusted = regimeWeight !== undefined && regimeWeight !== weight;
  return (
    <div
      style={{
        padding: '14px 16px',
        background: 'var(--bg-2)',
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <Glyph kind={layer.glyph} size={14} color={layer.color} />
          <Eyebrow color="var(--text-secondary)" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {layer.label}
          </Eyebrow>
        </div>
        {/* When regime override is active, show ONLY the regime weight (it's the active one).
            When not adjusted, show the baseline weight. This avoids two pills competing for space
            in narrow columns. */}
        {isRegimeAdjusted && regimeWeight !== undefined ? (
          <span
            style={{
              font: '600 9px/1 var(--font-mono)',
              padding: '3px 6px',
              borderRadius: 'var(--r-pill)',
              background: 'color-mix(in srgb, var(--regime-trending) 14%, transparent)',
              color: 'var(--regime-trending)',
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}
          >
            {(regimeWeight * 100).toFixed(0)}%
          </span>
        ) : (
          <Num size={11} color="var(--text-muted)" style={{ flexShrink: 0 }}>{`${(weight * 100).toFixed(0)}%`}</Num>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <Num size={26} weight={600}>{display}</Num>
        <Num size={11} color="var(--text-muted)">/10</Num>
      </div>
      <div style={{ height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: barC,
            transition: 'width 600ms var(--ease-data)',
          }}
        />
      </div>
      {level === 'beginner' && (
        <div style={{ fontSize: 11, lineHeight: 1.45, color: 'var(--text-muted)', marginTop: 2 }}>
          {layer.blurb}
        </div>
      )}
      {level === 'advanced' && layer.components && (
        <div
          style={{
            fontSize: 10,
            lineHeight: 1.5,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: 4,
          }}
        >
          {layer.components.map((c) => `${c.label} ${(c.subWeight * 100).toFixed(0)}%`).join(' · ')}
        </div>
      )}
    </div>
  );
}

export default LayerCell;
