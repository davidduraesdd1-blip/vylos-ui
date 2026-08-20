// polaris-ui/src/mobile/TabBar.tsx
// Mobile bottom tab bar — Phase 1 of the Claude Design mobile handoff
// (2026-08-19). Five destinations max, the fifth conventionally "More".
// Active state is a 22×2px accent tick above the label PLUS weight — never
// colour alone (WCAG 1.4.1). Glass chrome: background + blur come from the
// --glass-* tokens, which Reduce Transparency collapses to solid page colour.

import * as React from 'react';

export interface TabItem {
  id: string;
  label: string;
  /** Rendered when provided; otherwise the slot is a plain button. */
  href?: string;
}

export interface TabBarProps {
  items: TabItem[]; // max five; extras are not rendered
  activeId: string;
  onSelect?: (id: string) => void;
  /** Larger-text mode: slots grow 52 → 60px (OS dynamic type). */
  largeText?: boolean;
}

export function TabBar({ items, activeId, onSelect, largeText = false }: TabBarProps) {
  const slots = items.slice(0, 5);
  return (
    <nav
      aria-label="Primary"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        boxShadow: 'var(--glass-edge)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        zIndex: 40,
      }}
    >
      {slots.map((item) => {
        const active = item.id === activeId;
        const Tag: 'a' | 'button' = item.href ? 'a' : 'button';
        return (
          <Tag
            key={item.id}
            href={item.href}
            onClick={(e: React.MouseEvent) => {
              if (onSelect) {
                if (!item.href) e.preventDefault();
                onSelect(item.id);
              }
            }}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              minHeight: largeText ? 'var(--tab-h-lg)' : 'var(--tab-h)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              font: `${active ? '600' : '400'} ${largeText ? '12px' : '10.5px'}/1 var(--font-ui)`,
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'color var(--dur-fast) var(--ease-out)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* The active tick: 22×2px accent, above the label. */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                width: 'var(--tab-tick-w)',
                height: 2,
                borderRadius: 2,
                background: active ? 'var(--accent)' : 'transparent',
              }}
            />
            {item.label}
          </Tag>
        );
      })}
    </nav>
  );
}

export default TabBar;
