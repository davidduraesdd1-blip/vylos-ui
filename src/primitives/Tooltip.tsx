// polaris-ui/src/primitives/Tooltip.tsx
// Wraps a glossary term with hover help text. Source of glossary is injected
// (defaults to the bundled one) so apps can override with their own data.
//
// S6: the popover is portalled to document.body (escapes overflow:hidden cards
// and sticky chrome) and flips above/below the trigger based on available
// headroom. A 6px transparent buffer + shared hover state prevents hover-drop
// when the pointer travels from trigger to popover.

import * as React from 'react';
import { createPortal } from 'react-dom';
import { GLOSSARY as DEFAULT_GLOSSARY } from '../data/glossary';
import type { GlossaryEntry, ReaderLevelKey } from '../data/glossary';

export interface TooltipProps {
  term: string;
  level?: ReaderLevelKey;
  children: React.ReactNode;
  glossary?: Record<string, GlossaryEntry>;
}

const WIDTH = 280;

export function Tooltip({ term, level = 'beginner', children, glossary }: TooltipProps) {
  const [show, setShow] = React.useState(false);
  const [coords, setCoords] = React.useState<{ top: number; left: number; placement: 'top' | 'bottom' }>({ top: 0, left: 0, placement: 'top' });
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const hideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const source = glossary || DEFAULT_GLOSSARY;
  const entry = source[term];
  const text = entry?.[level] || entry?.beginner;

  const open = () => {
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    const el = triggerRef.current;
    if (!el || !text) return;
    const r = el.getBoundingClientRect();
    // Flip below the trigger when there isn't enough headroom above.
    const placement: 'top' | 'bottom' = r.top > 140 ? 'top' : 'bottom';
    let left = r.left + r.width / 2 - WIDTH / 2;
    // clamp into viewport with an 8px gutter
    const maxLeft = (typeof window !== 'undefined' ? window.innerWidth : WIDTH) - WIDTH - 8;
    left = Math.max(8, Math.min(left, maxLeft));
    const top = placement === 'top' ? r.top - 6 : r.bottom + 6;
    setCoords({ top, left, placement });
    setShow(true);
  };
  const scheduleClose = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShow(false), 80);
  };

  React.useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  const popover = show && text && typeof document !== 'undefined'
    ? createPortal(
        <span
          role="tooltip"
          onMouseEnter={open}
          onMouseLeave={scheduleClose}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: coords.placement === 'top' ? 'translateY(-100%)' : 'none',
            background: 'var(--bg-3)',
            border: '1px solid var(--border-strong)',
            padding: '8px 12px',
            borderRadius: 'var(--r-md)',
            fontSize: 12,
            lineHeight: 1.45,
            color: 'var(--text-primary)',
            width: WIDTH,
            zIndex: 1000,
            boxShadow: 'var(--shadow-3)',
            fontWeight: 400,
            letterSpacing: 'normal',
          }}
        >
          {text}
        </span>,
        document.body,
      )
    : null;

  return (
    <span
      ref={triggerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        borderBottom: text ? '1px dotted var(--text-muted)' : 'none',
        cursor: text ? 'help' : 'default',
      }}
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
    >
      {children}
      {popover}
    </span>
  );
}

export default Tooltip;
