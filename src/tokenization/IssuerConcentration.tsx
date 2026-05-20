// polaris-ui/src/tokenization/IssuerConcentration.tsx
// Heatmap-style issuer concentration with flagging + recommended action callout.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Explainer } from '../primitives/Explainer';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import type { Issuer } from './types';

export interface IssuerConcentrationProps {
  issuers: Issuer[];
  cap?: number;
  /** Optional action note shown in the bottom Explainer (red). */
  actionNote?: string;
}

export function IssuerConcentration({
  issuers,
  cap = 20,
  actionNote = 'Ondo Finance is at 22%, above the 20% institutional cap. A single issuer event could move 22% of portfolio value. Suggested rebalance: rotate $200k Ondo Treasuries → Midas mTBILL or OpenEden T-Bill Vault.',
}: IssuerConcentrationProps) {
  const flagged = issuers.some((i) => i.flag);
  return (
    <Card pad={24}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Eyebrow>{`Issuer concentration · cap ${cap}%`}</Eyebrow>
        <Num size={11} color="var(--text-muted)">{`${issuers.length} issuers`}</Num>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {issuers.map((i) => {
          const c = `var(--cat-${i.cat})`;
          const rC =
            i.flag ? 'var(--danger)' : i.rating === 'elevated' ? 'var(--warning)' : GOLD;
          return (
            <div
              key={i.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 60px 110px',
                gap: 14,
                alignItems: 'center',
                padding: '10px 14px',
                background: 'var(--bg-2)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 4, height: 18, background: c, borderRadius: 1 }} />
                <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{i.name}</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min(100, i.pct * 4)}%`,
                    height: '100%',
                    background: rC,
                    borderRadius: 3,
                  }}
                />
              </div>
              <Num size={14} weight={600} style={{ textAlign: 'right' }}>{`${i.pct}%`}</Num>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: rC,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                }}
              >
                {i.flag && '⚠ '}
                {i.rating}
              </span>
            </div>
          );
        })}
      </div>
      {flagged && (
        <Explainer kind="danger" lead="⚠ Action required:" size="sm">
          <span style={{ color: 'var(--text-secondary)' }}>{actionNote}</span>
        </Explainer>
      )}
    </Card>
  );
}

export default IssuerConcentration;
