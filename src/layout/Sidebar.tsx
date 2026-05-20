// polaris-ui/src/layout/Sidebar.tsx
// Desktop sidebar — used by all 4 Polaris apps. Framework-agnostic: emits
// onNav callback, optional `linkComponent` prop lets the host wire Next.js
// <Link> for cross-app navigation when needed.

import * as React from 'react';
import { AppBrand } from '../primitives/AppBrand';
import { LiveDot } from '../primitives/LiveDot';
import { Glyph } from '../primitives/Glyph';
import { Eyebrow } from '../primitives/Eyebrow';
import { ReaderLevel } from '../primitives/ReaderLevel';
import { APP_CONFIG } from './AppConfig';
import type { AppKey } from './AppConfig';
import type { ReaderLevelKey } from '../data/glossary';

export interface SidebarProps {
  app?: AppKey;
  activeNav?: string;
  onNav?: (id: string) => void;
  level?: ReaderLevelKey;
  onLevel?: (l: ReaderLevelKey) => void;
  /** Live-data status caption (e.g. "Live · 63/66 sources"). */
  liveStatus?: string;
  /** Component to use for cross-app links — defaults to <a>. Pass Next.js Link if available. */
  linkComponent?: React.ComponentType<{ href: string; children: React.ReactNode; style?: React.CSSProperties; className?: string }>;
  /** href builder for cross-app switcher links. */
  crossAppHref?: (key: AppKey) => string;
  /** Click handler for the Glossary button. */
  onGlossary?: () => void;
}

export function Sidebar({
  app = 'edge',
  activeNav = 'home',
  onNav,
  level = 'beginner',
  onLevel,
  liveStatus = 'Live · 63/66 sources',
  linkComponent,
  crossAppHref,
  onGlossary,
}: SidebarProps) {
  const cfg = APP_CONFIG[app];
  const otherApps = (Object.entries(APP_CONFIG) as [AppKey, typeof cfg][]).filter(([k]) => k !== app);
  const Link = linkComponent;
  return (
    <aside
      style={{
        width: 264,
        minWidth: 264,
        height: '100vh',
        background: 'var(--bg-1)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 16px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Brand block */}
      <AppBrand app={cfg.name} accent={cfg.accent} subtitle={cfg.subtitle} size="md" />

      {/* Live status */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <LiveDot color="var(--success)" size={6} />
        <span>{liveStatus}</span>
      </div>

      {/* Main nav */}
      <nav style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cfg.nav.map((n) => {
          const active = activeNav === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNav?.(n.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--r-md)',
                background: active ? 'var(--bg-3)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                font: '500 13.5px/1 var(--font-ui)',
                letterSpacing: '-0.005em',
                transition: 'background var(--dur-fast) var(--ease-out)',
                borderLeft: active ? `2px solid ${cfg.accent}` : '2px solid transparent',
              }}
            >
              <Glyph kind={n.glyph} size={16} color={active ? cfg.accent : 'currentColor'} />
              {n.label}
            </button>
          );
        })}
      </nav>

      {/* Reader level — pushed to bottom */}
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        {onLevel && <ReaderLevel value={level} onChange={onLevel} layout="radio" />}
      </div>

      {/* Cross-app switcher */}
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
        <Eyebrow style={{ marginBottom: 8 }}>Polaris family</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {otherApps.map(([k, c]) => {
            const href = crossAppHref ? crossAppHref(k) : `/${k}`;
            const linkStyle: React.CSSProperties = {
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 8px',
              borderRadius: 'var(--r-sm)',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: 12,
              fontFamily: 'var(--font-ui)',
            };
            const inner = (
              <>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: c.accent,
                    flexShrink: 0,
                  }}
                />
                <span>
                  Polaris <span style={{ color: 'var(--text-secondary)' }}>{c.name}</span>
                </span>
                <Glyph kind="caret-right" size={12} color="var(--text-muted)" />
              </>
            );
            return Link ? (
              <Link key={k} href={href} style={linkStyle}>
                {inner}
              </Link>
            ) : (
              <a key={k} href={href} style={linkStyle}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>

      {/* Glossary trigger */}
      <div style={{ marginTop: 12 }}>
        <button
          onClick={onGlossary}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            padding: '8px 10px',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            cursor: onGlossary ? 'pointer' : 'default',
            font: '500 12px/1 var(--font-ui)',
          }}
        >
          <Glyph kind="book" size={14} />
          Glossary · 30 terms
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
