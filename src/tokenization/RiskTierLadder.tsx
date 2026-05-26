// polaris-ui/src/tokenization/RiskTierLadder.tsx
// 5-tier risk ladder with active highlight (current tier).

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import type { RiskTier } from './types';

export interface RiskTierLadderProps {
  tiers: RiskTier[];
  title?: string;
}

export function RiskTierLadder({ tiers, title = 'Risk tier · 5-tier ladder' }: RiskTierLadderProps) {
  return (
    <Card pad={24}>
      <Eyebrow style={{ marginBottom: 14 }}>{title}</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tiers.map((t) => (
          <div
            key={t.n}
            style={{
              display: 'grid',
              gridTemplateColumns: '36px minmax(0, 1fr) auto auto',
              gap: 16,
              alignItems: 'center',
              padding: '12px 14px',
              background: t.current ? `color-mix(in srgb, ${GOLD} 12%, var(--bg-2))` : 'var(--bg-2)',
              border: `1px solid ${t.current ? GOLD : 'transparent'}`,
              boxShadow: t.current ? `inset 4px 0 0 ${GOLD}` : 'none',
              borderRadius: 'var(--r-md)',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: t.current ? GOLD : 'var(--bg-3)',
                color: t.current ? 'var(--bg-0)' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '600 13px/1 var(--font-mono)',
              }}
            >
              {t.n}
            </div>
            <div>
              <div
                style={{
                  font: `${t.current ? 600 : 500} 14px/1.2 var(--font-ui)`,
                  color: t.current ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                Tier {t.n} — {t.name}
                {t.current && (
                  <span
                    style={{
                      marginLeft: 10,
                      padding: '2px 8px',
                      background: GOLD,
                      color: 'var(--bg-0)',
                      borderRadius: 'var(--r-pill)',
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    CURRENT
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{t.desc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Eyebrow style={{ marginBottom: 2 }}>Target</Eyebrow>
              <Num size={14} weight={600} color={GOLD}>{t.ret}</Num>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Eyebrow style={{ marginBottom: 2 }}>Max DD</Eyebrow>
              <Num size={14} weight={600} color="var(--text-secondary)">{t.dd}</Num>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RiskTierLadder;
