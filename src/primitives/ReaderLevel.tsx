// polaris-ui/src/primitives/ReaderLevel.tsx
// Beginner / Intermediate / Advanced — segmented control or radio stack.
// S4 a11y: proper radiogroup semantics, relative-positioned labels so the
// visually-hidden native input keeps DOM tab order, aria-checked on the painted
// dot, and a :focus-visible ring (driven by the global token rule in tokens.css).

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

interface Opt { id: ReaderLevelKey; short: string; full: string; dot: string }

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
      <div role="radiogroup" aria-label="Experience level" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            font: '600 10px/1 var(--font-ui)', letterSpacing: 'var(--tracking-eyebrow)',
            textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4,
          }}
        >
          Experience level
        </div>
        {OPTS.map((o) => {
          const checked = value === o.id;
          return (
            <label
              key={o.id}
              style={{
                position: 'relative', display: 'flex', alignItems: 'center', gap: 10,
                cursor: 'pointer', padding: '6px 0', fontSize: 13,
                color: checked ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              <input
                type="radio"
                name="vylos-reader-level"
                checked={checked}
                onChange={() => onChange(o.id)}
                // Visually hidden but kept in DOM flow (parent is position:relative)
                // so tab order + :focus-visible work. Browser form-fillers may inject
                // data-* attrs onto inputs → suppress hydration mismatch warning.
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                suppressHydrationWarning
              />
              <span
                aria-hidden="true"
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, background: 'var(--bg-0)',
                }}
              >
                {checked && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />}
              </span>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: o.dot, flexShrink: 0 }} />
              <span style={{ fontWeight: checked ? 500 : 400 }}>{o.full}</span>
            </label>
          );
        })}
      </div>
    );
  }
  // Segmented — role=radiogroup with role=radio buttons
  const sizing = SIZES[size];
  return (
    <div
      role="radiogroup"
      aria-label="Experience level"
      style={{
        display: 'inline-flex', padding: 3, background: 'var(--bg-2)',
        borderRadius: 'var(--r-pill)', border: '1px solid var(--border)',
      }}
    >
      {OPTS.map((o) => {
        const checked = value === o.id;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(o.id)}
            style={{
              padding: sizing.pad, borderRadius: 'var(--r-pill)', border: 'none',
              background: checked ? 'var(--accent)' : 'transparent',
              color: checked ? 'var(--accent-ink)' : 'var(--text-secondary)',
              fontWeight: checked ? 600 : 500, fontSize: sizing.fs, letterSpacing: '0.04em',
              cursor: 'pointer', transition: 'all 140ms var(--ease-out)', fontFamily: 'var(--font-ui)',
            }}
          >
            {size === 'sm' ? o.short : o.full}
          </button>
        );
      })}
    </div>
  );
}

export default ReaderLevel;
