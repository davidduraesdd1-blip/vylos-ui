// polaris-ui/src/mobile/ProvenancePill.tsx
// The trust layer's four states — Phase 1 of the Claude Design mobile handoff.
// Every data-bearing surface carries one: current / delayed / cached / error,
// with a timestamp and the source name. Extends StatusPill's vocabulary
// (live/cached/down) to the handoff's four-state model without replacing it.
// a11y: state is shape (breathing vs static dot is decorative) AND word;
// the word is what a screen reader announces. Only `current` and `delayed`
// breathe — "only the breath loops."

import * as React from 'react';

export type ProvenanceState = 'current' | 'delayed' | 'cached' | 'error';

export interface ProvenancePillProps {
  state: ProvenanceState;
  /** Source name, e.g. "Aave v3". */
  source?: string;
  /** Mono age/timestamp, e.g. "now", "4m ago", "resyncing". */
  age?: string;
}

const DOT: Record<ProvenanceState, string> = {
  current: 'var(--prov-current)',
  delayed: 'var(--prov-delayed)',
  cached: 'var(--prov-cached)',
  error: 'var(--prov-error)',
};

const INK: Record<ProvenanceState, string> = {
  current: 'var(--prov-current-ink)',
  delayed: 'var(--prov-delayed)',
  cached: 'var(--text-muted)',
  error: 'var(--prov-error)',
};

const WORD: Record<ProvenanceState, string> = {
  current: 'current',
  delayed: 'reconnecting',
  cached: 'cached',
  error: 'error',
};

const BREATHES: Record<ProvenanceState, boolean> = {
  current: true,
  delayed: true,
  cached: false,
  error: false,
};

export function ProvenancePill({ state, source, age }: ProvenancePillProps) {
  const id = React.useId().replace(/:/g, '');
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        font: '500 11px/1 var(--font-mono)',
        color: INK[state],
        padding: '4px 9px',
        borderRadius: 'var(--r-pill, 999px)',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        whiteSpace: 'nowrap',
      }}
    >
      {BREATHES[state] && (
        <style>{`
          @keyframes pv-${id} { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
          .pv-${id} { animation: pv-${id} var(--dur-breath) var(--ease-breath) infinite; }
          @media (prefers-reduced-motion: reduce) { .pv-${id} { animation: none; } }
        `}</style>
      )}
      <span
        aria-hidden="true"
        className={BREATHES[state] ? `pv-${id}` : undefined}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: DOT[state],
          flex: 'none',
        }}
      />
      {source && (
        <>
          <span style={{ color: 'var(--text-secondary)' }}>{source}</span>
          <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
            ·
          </span>
        </>
      )}
      <span>{WORD[state]}</span>
      {age && (
        <span style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{age}</span>
      )}
    </span>
  );
}

export default ProvenancePill;
