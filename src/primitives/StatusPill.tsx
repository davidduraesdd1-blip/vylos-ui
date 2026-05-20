// polaris-ui/src/primitives/StatusPill.tsx
// live / cached / down data-source pill.

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
      <style>{`@keyframes sp-${id} { 0%,100% { box-shadow: 0 0 0 0 ${c}66; } 50% { box-shadow: 0 0 0 5px transparent; opacity: 0.6; } }`}</style>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: c,
          animation:
            status !== 'down'
              ? `sp-${id} ${status === 'cached' ? 3600 : 2400}ms cubic-bezier(0.45,0,0.55,1) infinite`
              : 'none',
        }}
      />
      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{label}</span>
      {detail && <span> · {detail}</span>}
    </span>
  );
}

export default StatusPill;
