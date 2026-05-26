// polaris-ui/src/primitives/SignalChipGroup.tsx
// E2 / A7: BUY / HOLD / SELL as toggleable chips with semantic colors. Replaces
// native <select> verdict filters across Edge Signals + Advisor Universe so the
// control matches SignalBadge instead of drifting to a browser select.

import * as React from 'react';

export type Verdict = 'BUY' | 'HOLD' | 'SELL';

export interface SignalChipGroupProps {
  value: Verdict | 'ALL';
  onChange: (v: Verdict | 'ALL') => void;
  /** Include an "All" chip (default true) for filter use. Omit for single-select verdict. */
  includeAll?: boolean;
  size?: 'sm' | 'md';
}

const COLOR: Record<Verdict, string> = {
  BUY: 'var(--success)',
  HOLD: 'var(--warning)',
  SELL: 'var(--danger)',
};

export function SignalChipGroup({ value, onChange, includeAll = true, size = 'md' }: SignalChipGroupProps) {
  const opts: Array<Verdict | 'ALL'> = includeAll ? ['ALL', 'BUY', 'HOLD', 'SELL'] : ['BUY', 'HOLD', 'SELL'];
  const pad = size === 'sm' ? '4px 10px' : '6px 14px';
  const fs = size === 'sm' ? 11 : 12;
  return (
    <div role="radiogroup" aria-label="Signal verdict" style={{ display: 'inline-flex', gap: 6 }}>
      {opts.map((o) => {
        const active = value === o;
        const c = o === 'ALL' ? 'var(--accent)' : COLOR[o];
        return (
          <button
            key={o}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o)}
            style={{
              padding: pad,
              borderRadius: 'var(--r-pill)',
              border: `1px solid ${active ? c : 'var(--border)'}`,
              background: active ? `color-mix(in srgb, ${c} 16%, transparent)` : 'transparent',
              color: active ? c : 'var(--text-secondary)',
              fontWeight: active ? 600 : 500,
              fontSize: fs,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              transition: 'all 140ms var(--ease-out)',
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default SignalChipGroup;
