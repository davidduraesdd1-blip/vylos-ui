// polaris-ui/src/tokenization/AIBriefing.tsx
// 30-second AI summary card with regime context + recommended action.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Glyph } from '../primitives/Glyph';
import { Eyebrow } from '../primitives/Eyebrow';
import { LiveDot } from '../primitives/LiveDot';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import { useRelativeTime } from '../hooks/useRelativeTime';

export interface AIBriefingProps {
  regime?: string;
  regimeColor?: string;
  yieldPct?: string;
  sharpe?: string;
  concentrationIssuer?: string;
  concentrationPct?: string;
  recommendation?: string;
  updatedAgo?: string;
  /** T14: when provided, renders a live-updating relative time (overrides updatedAgo). */
  updatedAt?: Date;
}

export function AIBriefing({
  regime = 'RISK-ON',
  regimeColor = 'var(--success)',
  yieldPct = '7.83%',
  sharpe = '1.89',
  concentrationIssuer = 'Ondo',
  concentrationPct = '22%',
  recommendation = 'rotate 2% from Ondo Treasuries to Midas mTBILL to reduce concentration.',
  updatedAgo = 'updated 4m ago',
  updatedAt,
}: AIBriefingProps) {
  const rel = useRelativeTime(updatedAt);
  const stamp = updatedAt ? `updated ${rel}` : updatedAgo;
  return (
    <Card
      pad={24}
      accent={GOLD}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${GOLD} 4%, var(--bg-1)) 0%, var(--bg-1) 60%)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <Glyph kind="sparkle" size={16} color={GOLD} />
        <Eyebrow color={GOLD}>AI briefing · 30-sec read</Eyebrow>
        <span
          style={{
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 10.5,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <LiveDot color="var(--success)" size={5} />
          {stamp}
        </span>
      </div>
      <p style={{ font: '400 16px/1.55 var(--font-ui)', margin: 0, color: 'var(--text-secondary)' }}>
        The macro regime is currently <span style={{ color: regimeColor, fontWeight: 600 }}>{regime}</span> with tight credit
        spreads and a soft dollar. Your Tier-3 portfolio yields{' '}
        <Num size={16} weight={600} color={GOLD}>{yieldPct}</Num> with a Sharpe ratio of{' '}
        <Num size={16} weight={600} color="var(--success)">{sharpe}</Num>; the primary risk to watch is{' '}
        <b style={{ color: 'var(--text-primary)' }}>issuer concentration</b> ({concentrationIssuer}{' '}
        {concentrationPct} — above the 20% institutional cap).
      </p>
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: '1px solid var(--border)',
          fontSize: 12,
          color: 'var(--text-muted)',
          display: 'flex',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <span>Recommended action: {recommendation}</span>
      </div>
    </Card>
  );
}

export default AIBriefing;
