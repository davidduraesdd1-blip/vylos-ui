// polaris-ui/src/primitives/Explainer.tsx
// Voice-pattern callout: lead + body with border-left accent.

import * as React from 'react';

export type ExplainerKind = 'info' | 'danger' | 'warning' | 'success' | 'sec';
export type ExplainerSize = 'sm' | 'md' | 'lg';

export interface ExplainerProps {
  kind?: ExplainerKind;
  lead?: React.ReactNode;
  children: React.ReactNode;
  size?: ExplainerSize;
}

interface Config {
  bg: string;
  border: string;
  leadC: string;
}

const CFG: Record<ExplainerKind, Config> = {
  info:    { bg: 'var(--bg-2)',                                          border: 'var(--accent)',  leadC: 'var(--text-primary)' },
  danger:  { bg: 'color-mix(in srgb, var(--danger) 8%, var(--bg-2))',   border: 'var(--danger)',  leadC: 'var(--danger)' },
  warning: { bg: 'color-mix(in srgb, var(--warning) 8%, var(--bg-2))',  border: 'var(--warning)', leadC: 'var(--warning)' },
  success: { bg: 'color-mix(in srgb, var(--success) 8%, var(--bg-2))',  border: 'var(--success)', leadC: 'var(--success)' },
  sec:     { bg: 'color-mix(in srgb, var(--info) 5%, var(--bg-2))',     border: 'var(--info)',    leadC: 'var(--info)' },
};

const SIZES: Record<ExplainerSize, { pad: string; fs: number }> = {
  sm: { pad: '8px 12px',  fs: 11.5 },
  md: { pad: '10px 14px', fs: 12.5 },
  lg: { pad: '14px 18px', fs: 14 },
};

export function Explainer({ kind = 'info', lead, children, size = 'md' }: ExplainerProps) {
  const cfg = CFG[kind];
  const sizing = SIZES[size];
  return (
    <div
      style={{
        padding: sizing.pad,
        background: cfg.bg,
        borderLeft: `2px solid ${cfg.border}`,
        borderRadius: 'var(--r-sm)',
        fontSize: sizing.fs,
        lineHeight: 1.55,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      {lead && <b style={{ color: cfg.leadC }}>{lead}</b>} {children}
    </div>
  );
}

export default Explainer;
