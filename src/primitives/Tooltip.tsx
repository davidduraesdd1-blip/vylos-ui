// polaris-ui/src/primitives/Tooltip.tsx
// Wraps a glossary term with hover help text. Source of glossary is injected
// (defaults to the bundled one) so apps can override with their own data.

import * as React from 'react';
import { GLOSSARY as DEFAULT_GLOSSARY } from '../data/glossary';
import type { GlossaryEntry, ReaderLevelKey } from '../data/glossary';

export interface TooltipProps {
  term: string;
  level?: ReaderLevelKey;
  children: React.ReactNode;
  glossary?: Record<string, GlossaryEntry>;
}

export function Tooltip({ term, level = 'beginner', children, glossary }: TooltipProps) {
  const [show, setShow] = React.useState(false);
  const source = glossary || DEFAULT_GLOSSARY;
  const entry = source[term];
  const text = entry?.[level] || entry?.beginner;
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        borderBottom: text ? '1px dotted var(--text-muted)' : 'none',
        cursor: text ? 'help' : 'default',
      }}
      onMouseEnter={() => text && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && text && (
        <span
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-6px)',
            background: 'var(--bg-3)',
            border: '1px solid var(--border-strong)',
            padding: '8px 12px',
            borderRadius: 'var(--r-md)',
            fontSize: 12,
            lineHeight: 1.45,
            color: 'var(--text-primary)',
            width: 280,
            zIndex: 100,
            boxShadow: 'var(--shadow-3)',
            fontWeight: 400,
            letterSpacing: 'normal',
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
