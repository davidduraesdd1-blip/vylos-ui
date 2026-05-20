// polaris-ui/src/primitives/ReaderLevel.tsx
// Beginner / Intermediate / Advanced — segmented control or radio stack.

import * as React from 'react';
import type { ReaderLevelKey } from '../data/glossary';

export type ReaderSize = 'sm' | 'md' | 'lg';
export type ReaderLayout = 'segmented' | 'radio';

export interface ReaderLevelProps {
  value: ReaderLevelKey;
  onChange: (v: ReaderLevelKey) => void;
  size?: ReaderSize;
  layout?: ReaderLayout;
}

interface Opt {
  id: ReaderLevelKey;
  short: string;
  full: string;
  dot: string;
}

const OPTS: Opt[] = [
  { id: 'beginner',     short: 'B', full: 'Beginner',     dot: 'var(--success)' },
  { id: 'intermediate', short: 'I', full: 'Intermediate', dot: 'var(--warning)' },
  { id: 'advanced',     short: 'A', full: 'Advanced',     dot: 'var(--danger)' },
];

const SIZES: Record<ReaderSize, { pad: string; fs: number }> = {
  sm: { pad: '5px 9px',  fs: 10 },
  md: { pad: '7px 14px', fs: 11 },
  lg: { pad: '9px 18px', fs: 13 },
};

export function ReaderLevel({ value, onChange, size = 'md', layout = 'segmented' }: ReaderLevelProps) {
  if (layout === 'radio') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            font: '600 10px/1 var(--font-ui)',
            letterSpacing: 'var(--tracking-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 4,
          }}
        >
          Experience level
        </div>
        {OPTS.map((o) => (
          <label
            key={o.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              padding: '6px 0',
              fontSize: 13,
              color: value === o.id ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: `1.5px solid ${value === o.id ? 'var(--accent)' : 'var(--border-strong)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: 'var(--bg-0)',
              }}
            >
              {value === o.id && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              )}
            </span>
            <input
              type="radio"
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              // Browser extensions (password managers, form-fillers) sometimes
              // inject data-* attributes onto form inputs, which then trips
              // Next.js's hydration mismatch warning. Suppress on these hidden
              // helper inputs — the user can't see them anyway, and their
              // contents are fully controlled by React state, not the DOM
              // attributes a third-party extension may add.
              suppressHydrationWarning
            />
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.dot, flexShrink: 0 }} />
            <span style={{ fontWeight: value === o.id ? 500 : 400 }}>{o.full}</span>
          </label>
        ))}
      </div>
    );
  }
  // Segmented
  const sizing = SIZES[size];
  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 3,
        background: 'var(--bg-2)',
        borderRadius: 'var(--r-pill)',
        border: '1px solid var(--border)',
      }}
    >
      {OPTS.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          style={{
            padding: sizing.pad,
            borderRadius: 'var(--r-pill)',
            border: 'none',
            background: value === o.id ? 'var(--accent)' : 'transparent',
            color: value === o.id ? 'var(--accent-ink)' : 'var(--text-secondary)',
            fontWeight: value === o.id ? 600 : 500,
            fontSize: sizing.fs,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 140ms var(--ease-out)',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {size === 'sm' ? o.short : o.full}
        </button>
      ))}
    </div>
  );
}

export default ReaderLevel;
