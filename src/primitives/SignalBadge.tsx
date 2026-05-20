// polaris-ui/src/primitives/SignalBadge.tsx
// BUY / HOLD / SELL pill with Polaris custom glyphs.

import * as React from 'react';
import { Glyph } from './Glyph';
import type { Verdict } from '../data/regime';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface SignalBadgeProps {
  verdict: Verdict | string;
  size?: BadgeSize;
}

interface Config {
  color: string;
  glyph: string;
}

interface Sizing {
  pad: string;
  fs: number;
  ig: number;
}

const CONFIG: Record<string, Config> = {
  BUY:  { color: 'var(--success)', glyph: 'triangle-up' },
  HOLD: { color: 'var(--warning)', glyph: 'square' },
  SELL: { color: 'var(--danger)',  glyph: 'triangle-down' },
};
const FALLBACK: Config = { color: 'var(--info)', glyph: 'circle' };

const SIZES: Record<BadgeSize, Sizing> = {
  sm: { pad: '3px 8px',   fs: 11, ig: 10 },
  md: { pad: '6px 12px',  fs: 13, ig: 13 },
  lg: { pad: '10px 18px', fs: 16, ig: 16 },
};

export function SignalBadge({ verdict, size = 'md' }: SignalBadgeProps) {
  const cfg = CONFIG[verdict] || FALLBACK;
  const sizing = SIZES[size];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: sizing.pad,
        borderRadius: 'var(--r-pill)',
        background: `color-mix(in srgb, ${cfg.color} 16%, transparent)`,
        color: cfg.color,
        fontWeight: 600,
        fontSize: sizing.fs,
        letterSpacing: '0.05em',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <Glyph kind={cfg.glyph} size={sizing.ig} color={cfg.color} />
      {verdict}
    </span>
  );
}

export default SignalBadge;
