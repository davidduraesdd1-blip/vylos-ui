// vylos-ui/src/primitives/StatusPill.tsx
// live / cached / down data-source pill.
// a11y (WCAG 1.4.1 / §8): status is conveyed by SHAPE (▲ live / ■ cached / ▼ down)
// AND a text word — never colour or animation alone. The dot used to be the only
// cue; colour-blind users and screen readers got nothing distinguishing.

import * as React from 'react';

export type PillStatus = 'live' | 'cached' | 'down';

export interface StatusPillProps {
  label: string;
  detail?: string;
  status?: PillStatus;
}

const COLORS: Record<PillStatus, string> = {
  live: 'var(--success)',
  cached: 'var(--warning)',
  down: 'var(--danger)',
};

// Shape encoding (§8): survives colour-blindness and greyscale printing.
const GLYPH: Record<PillStatus, string> = {
  live: '▲',
  cached: '■',
  down: '▼',
};

// Plain-English status token (§7 Beginner) — also what a screen reader announces.
const WORD: Record<PillStatus, string> = {
  live: 'live',
  cached: 'cached',
  down: 'down',
};

export function StatusPill({ label, detail, status = 'live' }: StatusPillProps) {
  const c = COLORS[status];
  const id = React.useId().replace(/:/g, '');
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        font: '500 11.5px/1 var(--font-mono)',
        color: 'var(--text-secondary)',
        padding: '5px 10px',
        borderRadius: 'var(--r-pill)',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
      }}
    >
      {status === 'live' && (
        <style>{`
          @keyframes sp-${id} { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
          .sp-${id} { animation: sp-${id} 2400ms cubic-bezier(0.45,0,0.55,1) infinite; }
          @media (prefers-reduced-motion: reduce) { .sp-${id} { animation: none; } }
        `}</style>
      )}
      {/* Shape + colour indicator. Decorative for SR — the WORD below carries the text. */}
      <span
        aria-hidden="true"
        className={status === 'live' ? `sp-${id}` : undefined}
        style={{ color: c, fontSize: 10, lineHeight: 1 }}
      >
        {GLYPH[status]}
      </span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{label}</span>
      <span aria-hidden="true">·</span>
      <span>{WORD[status]}</span>
      {detail && (
        <>
          <span aria-hidden="true">·</span>
          <span>{detail}</span>
        </>
      )}
    </span>
  );
}

export default StatusPill;
