// polaris-ui/src/edge/RegimeBanner.tsx
// Full-width banner showing current regime + weight overrides.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import { Eyebrow } from '../primitives/Eyebrow';
import type { Regime } from '../data/regime';
import type { ReaderLevelKey } from '../data/glossary';

export interface RegimeBannerProps {
  regime: Regime;
  level?: ReaderLevelKey;
}

export function RegimeBanner({ regime, level = 'beginner' }: RegimeBannerProps) {
  return (
    <div
      style={{
        padding: '14px 20px',
        background: `linear-gradient(90deg, color-mix(in srgb, ${regime.color} 12%, var(--bg-1)) 0%, var(--bg-1) 100%)`,
        borderLeft: `3px solid ${regime.color}`,
        borderRadius: 'var(--r-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--r-md)',
          background: `color-mix(in srgb, ${regime.color} 18%, var(--bg-2))`,
          color: regime.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Glyph kind={regime.glyph} size={20} color="currentColor" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 2 }}>
          <Eyebrow color={regime.color}>Current regime</Eyebrow>
          <span
            style={{
              font: '600 16px/1 var(--font-ui)',
              color: regime.color,
              letterSpacing: '-0.01em',
            }}
          >
            {regime.name}
          </span>
          <Num size={11} color="var(--text-muted)">{`trigger: ${regime.trigger}`}</Num>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.45 }}>
          {level === 'beginner' ? (
            regime.rationale
          ) : (
            <span>
              Layer weights this regime:{' '}
              <Num size={11}>
                {`TA ${(regime.weights.technical * 100).toFixed(0)} · Macro ${(regime.weights.macro * 100).toFixed(0)} · Sent ${(regime.weights.sentiment * 100).toFixed(0)} · On-chain ${(regime.weights.onchain * 100).toFixed(0)}`}
              </Num>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegimeBanner;
