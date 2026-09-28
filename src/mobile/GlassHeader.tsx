// vylos-ui/src/mobile/GlassHeader.tsx
// Mobile glass top bar — Phase 1 of the Claude Design mobile handoff.
// Absolutely positioned; content scrolls underneath (consumer pads with
// --header-clearance, or --header-clearance-seg when `segmented` is set).
// Scrolled state adds a bottom hairline; unscrolled has none. Under Reduce
// Transparency the --glass-* tokens collapse to solid page colour, and the
// hairline should read as permanent — we keep it tied to `scrolled`, which
// MobileShell sets from real scroll position.

import * as React from 'react';

export interface GlassHeaderProps {
  /** App title row text, e.g. "Yield · Flare". */
  title: string;
  subtitle?: string;
  /** Leading mark slot (18px inline app mark). */
  leading?: React.ReactNode;
  /** Right-aligned slot: provenance pill, headline number, theme toggle. */
  trailing?: React.ReactNode;
  /** Segmented control (or similar) rendered below the title row. */
  segmented?: React.ReactNode;
  /** Adds the bottom hairline (set by MobileShell once content scrolls). */
  scrolled?: boolean;
}

export function GlassHeader({
  title,
  subtitle,
  leading,
  trailing,
  segmented,
  scrolled = false,
}: GlassHeaderProps) {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        boxShadow: 'var(--glass-edge)',
        borderBottom: scrolled ? '1px solid var(--border-strong)' : '1px solid transparent',
        transition: 'border-color var(--dur-fast) var(--ease-out)',
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '6px var(--m-gutter) 12px',
        }}
      >
        {leading}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              font: '600 14px/1.2 var(--font-ui)',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div style={{ font: '400 11px/1.3 var(--font-ui)', color: 'var(--text-muted)' }}>
              {subtitle}
            </div>
          )}
        </div>
        {trailing && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            {trailing}
          </div>
        )}
      </div>
      {segmented && (
        <div style={{ padding: '0 var(--m-gutter) 10px' }}>{segmented}</div>
      )}
    </header>
  );
}

export default GlassHeader;
