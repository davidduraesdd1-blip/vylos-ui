// polaris-ui/src/advisor/TierLadder.tsx
// 5-button risk tier picker with active highlight.

import * as React from 'react';
import { TIERS, TEAL } from './fixtures';

export interface TierLadderProps {
  active: number;
  onChange: (n: number) => void;
}

export function TierLadder({ active, onChange }: TierLadderProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 10 }}>
      {TIERS.map((t) => {
        const isA = t.n === active;
        return (
          <button
            key={t.n}
            onClick={() => onChange(t.n)}
            style={{
              padding: '18px 14px',
              background: isA ? TEAL : 'var(--bg-1)',
              color: isA ? 'var(--bg-0)' : 'var(--text-primary)',
              border: isA ? `1px solid ${TEAL}` : '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
              font: '500 14px/1.2 var(--font-ui)',
              letterSpacing: '-0.01em',
              textAlign: 'center',
              transition: 'all 140ms var(--ease-out)',
            }}
          >
            <div>
              {t.n} {t.name}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default TierLadder;
