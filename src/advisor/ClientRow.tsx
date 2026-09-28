// vylos-ui/src/advisor/ClientRow.tsx
// Row in the advisor's client roster.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import { TIERS, TEAL } from './fixtures';
import type { AdvisorClient } from './types';

export interface ClientRowProps {
  client: AdvisorClient;
  onTap?: () => void;
}

export function ClientRow({ client: c, onTap }: ClientRowProps) {
  return (
    <button
      onClick={onTap}
      style={{
        width: '100%',
        padding: '16px 20px',
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-md)',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1.4fr 90px 90px 28px',
        gap: 16,
        alignItems: 'center',
        fontFamily: 'var(--font-ui)',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-1)';
      }}
    >
      <div>
        <div
          style={{
            font: '500 16px/1.25 var(--font-display)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.012em',
          }}
        >
          {c.name}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>{c.persona}</div>
      </div>
      <Num size={15} weight={600}>{c.aum}</Num>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
        Tier {c.tier} — {TIERS[c.tier - 1]?.name}
      </div>
      <Num size={14} color={c.ytd.startsWith('+') ? 'var(--success)' : 'var(--danger)'}>{c.ytd}</Num>
      {c.flag === 'rebalance' ? (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 8px',
            borderRadius: 'var(--r-pill)',
            background: `color-mix(in srgb, ${TEAL} 16%, transparent)`,
            color: TEAL,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          ● rebalance
        </span>
      ) : (
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          on target
        </span>
      )}
      <Glyph kind="caret-right" size={16} color="var(--text-muted)" />
    </button>
  );
}

export default ClientRow;
