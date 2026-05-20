// polaris-ui/src/defi/PoolRow.tsx
// Pool listing row with inline APY breakdown bar. Replaces the prior `pool_card`
// from the polaris-ui Python source — design's version is richer (base/inc/fee
// breakdown visible at a glance), so this becomes canonical.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import type { Pool, Sustainability } from './types';

export interface PoolRowProps {
  pool: Pool;
  onTap?: () => void;
}

const SUS_COLORS: Record<Sustainability, string> = {
  'pure-base':       'var(--success)',
  'base-yield':      'var(--accent)',
  'sustainable':     'var(--success)',
  'incentive-heavy': 'var(--warning)',
};

export function PoolRow({ pool, onTap }: PoolRowProps) {
  const susC = SUS_COLORS[pool.sustainability];
  const basePct = (pool.base / pool.apy) * 100;
  const incPct = (pool.inc / pool.apy) * 100;
  const feePct = (pool.fee / pool.apy) * 100;
  return (
    <button
      onClick={onTap}
      style={{
        width: '100%',
        padding: '16px 18px',
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${pool.protocolColor}`,
        borderRadius: 'var(--r-md)',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1.2fr 100px 28px',
        gap: 18,
        alignItems: 'center',
        transition: 'background var(--dur-fast) var(--ease-out)',
        fontFamily: 'var(--font-ui)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-1)';
      }}
    >
      <div>
        <Num size={15} weight={600} mono={false} style={{ color: 'var(--text-primary)' }}>
          {pool.name}
        </Num>
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            marginTop: 3,
          }}
        >
          {pool.protocol} · {pool.chain} · TVL <Num color="var(--text-secondary)">{pool.tvl}</Num>
        </div>
      </div>
      <div>
        <Num size={22} weight={600} color="var(--accent)">{`${pool.apy}%`}</Num>
        <div
          style={{
            fontSize: 10.5,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: 3,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          APY
        </div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            height: 6,
            borderRadius: 3,
            overflow: 'hidden',
            background: 'var(--bg-2)',
          }}
        >
          <div style={{ width: `${basePct}%`, background: '#1d4ed8' }} title={`Base ${pool.base}%`} />
          <div style={{ width: `${incPct}%`, background: 'var(--warning)' }} title={`Incentives ${pool.inc}%`} />
          <div style={{ width: `${feePct}%`, background: 'var(--success)' }} title={`Fees ${pool.fee}%`} />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 6,
            fontSize: 10.5,
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ color: '#3b6bf0' }}>Base {pool.base}</span>
          <span style={{ color: 'var(--warning)' }}>Inc {pool.inc}</span>
          <span style={{ color: 'var(--success)' }}>Fee {pool.fee}</span>
        </div>
      </div>
      <div>
        <span
          style={{
            display: 'inline-flex',
            padding: '3px 8px',
            borderRadius: 'var(--r-pill)',
            background: `color-mix(in srgb, ${susC} 14%, transparent)`,
            color: susC,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {pool.sustainability}
        </span>
      </div>
      <Glyph kind="caret-right" size={16} color="var(--text-muted)" />
    </button>
  );
}

export default PoolRow;
