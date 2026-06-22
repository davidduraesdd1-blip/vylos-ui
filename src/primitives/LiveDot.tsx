// polaris-ui/src/primitives/LiveDot.tsx
// Small status indicator for chrome (sidebar live counter, header pulse).
// a11y (WCAG 1.4.1 / §8): when `status` is set it renders a colour-blind-safe
// SHAPE glyph (▲ live / ■ cached / ▼ down) so the state survives greyscale and
// the collapsed sidebar (where the caption text is hidden). A bare dot (no
// status) stays decorative — meaning must come from an adjacent label.
// All motion respects prefers-reduced-motion.

import * as React from 'react';

export type DotStatus = 'live' | 'cached' | 'down';

export interface LiveDotProps {
  color?: string;
  size?: number;
  /** When set, renders a colour-blind-safe shape glyph instead of a bare dot. */
  status?: DotStatus;
  /** Optional text for screen readers when no adjacent element already labels it. */
  label?: string;
}

const STATUS_COLOR: Record<DotStatus, string> = {
  live: 'var(--success)',
  cached: 'var(--warning)',
  down: 'var(--danger)',
};

const STATUS_GLYPH: Record<DotStatus, string> = {
  live: '▲',
  cached: '■',
  down: '▼',
};

const SR_ONLY: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export function LiveDot({ color, size = 6, status, label }: LiveDotProps) {
  const id = React.useId().replace(/:/g, '');
  const c = color ?? (status ? STATUS_COLOR[status] : 'var(--success)');
  // Bare dot keeps the gentle "live" pulse; the shape glyph pulses only when live.
  const animate = status ? status === 'live' : true;

  const indicator = status ? (
    <span
      aria-hidden="true"
      style={{ color: c, fontSize: size + 4, lineHeight: 1, display: 'inline-flex' }}
    >
      {STATUS_GLYPH[status]}
    </span>
  ) : (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: '50%', background: c, display: 'inline-block' }}
    />
  );

  return (
    <span style={{ display: 'inline-flex', position: 'relative', alignItems: 'center' }}>
      {animate && (
        <style>{`
          @keyframes ld-${id} { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
          .ld-${id} { animation: ld-${id} 2400ms cubic-bezier(0.45,0,0.55,1) infinite; }
          @media (prefers-reduced-motion: reduce) { .ld-${id} { animation: none; } }
        `}</style>
      )}
      <span className={animate ? `ld-${id}` : undefined} style={{ display: 'inline-flex', alignItems: 'center' }}>
        {indicator}
      </span>
      {label && <span style={SR_ONLY}>{label}</span>}
    </span>
  );
}

export default LiveDot;
