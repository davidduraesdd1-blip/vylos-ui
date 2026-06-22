// polaris-ui/src/layout/Sidebar.tsx
// Desktop + responsive sidebar — used by all 4 Polaris apps. Framework-agnostic:
// emits onNav callback, optional `linkComponent` prop lets the host wire Next.js
// <Link> for cross-app navigation when needed.
//
// S2 responsive: three rail modes driven by viewport —
//   expanded   (264px)         > 1080px
//   collapsed  (56px, icons)   ≤ 1080px  (labels clipped but announced)
//   off-canvas (slide-over)    ≤  760px  (hamburger → drawer + backdrop)
// S3 live-status from `sources` prop (falls back to liveStatus string).
// S14 cross-app switcher reads `appUrls` (env-driven, passed by each app shell).
// S16 glossary trigger feature-flagged via glossaryEnabled/onOpenGlossary.

import * as React from 'react';
import { AppBrand } from '../primitives/AppBrand';
import { LiveDot } from '../primitives/LiveDot';
import { Glyph } from '../primitives/Glyph';
import { Eyebrow } from '../primitives/Eyebrow';
import { ReaderLevel } from '../primitives/ReaderLevel';
import { RegimeOrbit } from '../primitives/RegimeOrbit';
import { APP_CONFIG, APP_ORDER } from './AppConfig';
import type { AppKey } from './AppConfig';
import type { ReaderLevelKey } from '../data/glossary';

export type SourceStatus = 'live' | 'cached' | 'down';
export interface SidebarSource { status: SourceStatus; label?: string; id?: string }

export type RailMode = 'expanded' | 'collapsed' | 'offcanvas';

export interface AppUrls {
  edge?: string;
  defi?: string;
  tokenization?: string;
  advisor?: string;
  family?: string;
}

export interface SidebarProps {
  app?: AppKey;
  activeNav?: string;
  onNav?: (id: string) => void;
  level?: ReaderLevelKey;
  onLevel?: (l: ReaderLevelKey) => void;
  /** S3: live-data status from real source state. Computes "Live · N/total". */
  sources?: SidebarSource[];
  /** Fallback caption when `sources` not provided. */
  liveStatus?: string;
  /** Component to use for cross-app links — defaults to <a>. Pass Next.js Link if available. */
  linkComponent?: React.ComponentType<{ href: string; children: React.ReactNode; style?: React.CSSProperties; className?: string }>;
  /** S14: per-app + family URLs (env-driven). Takes precedence over crossAppHref. */
  appUrls?: AppUrls;
  /** href builder for cross-app switcher links (legacy fallback). */
  crossAppHref?: (key: AppKey) => string;
  /** S16: Glossary trigger. Renders only when glossaryEnabled. */
  glossaryEnabled?: boolean;
  glossaryCount?: number;
  onOpenGlossary?: () => void;
  /** @deprecated use onOpenGlossary */
  onGlossary?: () => void;
  /** Force a rail mode (mainly for tests/storybook). */
  forceMode?: RailMode;
}

/** S2: viewport → rail mode. SSR-safe (defaults to expanded until mounted). */
function useRailMode(force?: RailMode): RailMode {
  const [mode, setMode] = React.useState<RailMode>(force ?? 'expanded');
  React.useEffect(() => {
    if (force) { setMode(force); return; }
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const narrow = window.matchMedia('(max-width: 760px)');
    const mid = window.matchMedia('(max-width: 1080px)');
    const compute = () => setMode(narrow.matches ? 'offcanvas' : mid.matches ? 'collapsed' : 'expanded');
    compute();
    narrow.addEventListener('change', compute);
    mid.addEventListener('change', compute);
    return () => { narrow.removeEventListener('change', compute); mid.removeEventListener('change', compute); };
  }, [force]);
  return mode;
}

function statusCaption(sources?: SidebarSource[], fallback?: string): { text: string; status: SourceStatus } {
  if (sources && sources.length) {
    const total = sources.length;
    const live = sources.filter((s) => s.status === 'live').length;
    const down = sources.filter((s) => s.status === 'down').length;
    // 'cached' = partial/mixed (amber). LiveDot renders this as a shape glyph so the
    // health survives a collapsed sidebar where the caption text is hidden (§8).
    const status: SourceStatus = live === total ? 'live' : down === total ? 'down' : 'cached';
    return { text: `Live · ${live}/${total} sources`, status };
  }
  return { text: fallback ?? 'Live · sources', status: 'live' };
}

export function Sidebar(props: SidebarProps) {
  const {
    app = 'edge', activeNav = 'home', onNav, level = 'beginner', onLevel,
    sources, liveStatus, linkComponent, appUrls, crossAppHref,
    glossaryEnabled = false, glossaryCount = 30, onOpenGlossary, onGlossary, forceMode,
  } = props;
  const mode = useRailMode(forceMode);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const cfg = APP_CONFIG[app];
  const Link = linkComponent;
  const openGlossary = onOpenGlossary || onGlossary;
  const { text: liveText, status: liveDotStatus } = statusCaption(sources, liveStatus);

  // close the drawer whenever we leave off-canvas mode
  React.useEffect(() => { if (mode !== 'offcanvas') setDrawerOpen(false); }, [mode]);

  const collapsed = mode === 'collapsed';

  const appHref = (k: AppKey): string => {
    if (appUrls && appUrls[k]) return appUrls[k] as string;
    if (crossAppHref) return crossAppHref(k);
    return `/${k}`;
  };
  const familyHref = appUrls?.family;

  const navButtons = (
    <nav style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {cfg.nav.map((n) => {
        const active = activeNav === n.id;
        return (
          <button
            key={n.id}
            onClick={() => { onNav?.(n.id); setDrawerOpen(false); }}
            aria-label={collapsed ? n.label : undefined}
            aria-current={active ? 'page' : undefined}
            title={collapsed ? n.label : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: collapsed ? '9px 0' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 'var(--r-md)',
              background: active ? 'var(--bg-3)' : 'transparent',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              font: '500 13.5px/1 var(--font-ui)', letterSpacing: '-0.005em',
              transition: 'background var(--dur-fast) var(--ease-out)',
              borderLeft: active ? `2px solid ${cfg.accent}` : '2px solid transparent',
            }}
          >
            <Glyph kind={n.glyph} size={16} color={active ? cfg.accent : 'currentColor'} />
            {/* Label clipped (not display:none) in collapsed mode so screen readers still announce it */}
            <span style={collapsed
              ? { clipPath: 'inset(0 0 0 100%)', width: 0, overflow: 'hidden', whiteSpace: 'nowrap' }
              : undefined}>
              {n.label}
            </span>
          </button>
        );
      })}
    </nav>
  );

  const inner = (
    <>
      <AppBrand app={cfg.name} accent={cfg.accent} subtitle={collapsed ? undefined : cfg.subtitle} size={collapsed ? 'sm' : 'md'} />

      {/* Live status */}
      <div
        style={{
          marginTop: 20, display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: 8, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
        }}
        title={collapsed ? liveText : undefined}
        aria-label={liveText}
      >
        <LiveDot status={liveDotStatus} size={6} />
        {!collapsed && <span>{liveText}</span>}
      </div>

      {navButtons}

      {!collapsed && (
        <>
          {/* Reader level — pushed to bottom */}
          <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            {onLevel && <ReaderLevel value={level} onChange={onLevel} layout="radio" />}
          </div>

          {/* Cross-app switcher */}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <Eyebrow style={{ marginBottom: 8 }}>Polaris family</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Family rollup link — only when a family URL is configured */}
              {familyHref && (() => {
                const linkStyle: React.CSSProperties = {
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
                  borderRadius: 'var(--r-sm)', color: 'var(--text-secondary)',
                  textDecoration: 'none', fontSize: 12, fontFamily: 'var(--font-ui)',
                  background: 'var(--bg-2)', border: '1px solid var(--border)', marginBottom: 4,
                };
                const fInner = (
                  <>
                    <RegimeOrbit size={14} pulse={false} />
                    <span>All Polaris <span style={{ color: 'var(--text-primary)' }}>· family rollup</span></span>
                    <Glyph kind="caret-right" size={12} color="var(--text-muted)" />
                  </>
                );
                return Link
                  ? <Link href={familyHref} style={linkStyle}>{fInner}</Link>
                  : <a href={familyHref} style={linkStyle}>{fInner}</a>;
              })()}
              {APP_ORDER.filter((k) => k !== app).map((k) => {
                const c = APP_CONFIG[k];
                const href = appHref(k);
                const linkStyle: React.CSSProperties = {
                  display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px',
                  borderRadius: 'var(--r-sm)', color: 'var(--text-muted)',
                  textDecoration: 'none', fontSize: 12, fontFamily: 'var(--font-ui)',
                };
                const lInner = (
                  <>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, flexShrink: 0 }} />
                    <span>Polaris <span style={{ color: 'var(--text-secondary)' }}>{c.name}</span></span>
                    <Glyph kind="caret-right" size={12} color="var(--text-muted)" />
                  </>
                );
                return Link
                  ? <Link key={k} href={href} style={linkStyle}>{lInner}</Link>
                  : <a key={k} href={href} style={linkStyle}>{lInner}</a>;
              })}
            </div>
          </div>

          {/* S16: Glossary trigger — feature-flagged */}
          {glossaryEnabled && openGlossary && (
            <div style={{ marginTop: 12 }}>
              <button
                onClick={openGlossary}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                  padding: '8px 10px', borderRadius: 'var(--r-md)', background: 'var(--bg-2)',
                  border: '1px solid var(--border)', color: 'var(--text-secondary)',
                  cursor: 'pointer', font: '500 12px/1 var(--font-ui)',
                }}
              >
                <Glyph kind="book" size={14} title="Glossary" />
                Glossary · {glossaryCount} terms
              </button>
            </div>
          )}
        </>
      )}
    </>
  );

  const railBase: React.CSSProperties = {
    height: '100vh', background: 'var(--bg-1)', borderRight: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', padding: collapsed ? '20px 8px' : '20px 16px',
    boxSizing: 'border-box', position: 'sticky', top: 0,
  };

  // Off-canvas: hamburger + slide-over drawer
  if (mode === 'offcanvas') {
    return (
      <>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          style={{
            position: 'fixed', top: 12, left: 12, zIndex: 60, width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--r-md)', background: 'var(--bg-2)', border: '1px solid var(--border)',
            color: 'var(--text-primary)', cursor: 'pointer',
          }}
        >
          <Glyph kind="menu" size={18} title="Menu" />
        </button>
        {drawerOpen && (
          <>
            <div
              onClick={() => setDrawerOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 70 }}
            />
            <aside
              role="dialog"
              aria-label="Navigation"
              style={{ ...railBase, position: 'fixed', top: 0, left: 0, width: 264, minWidth: 264, zIndex: 80, padding: '20px 16px' }}
            >
              {inner}
            </aside>
          </>
        )}
      </>
    );
  }

  const w = collapsed ? 56 : 264;
  return (
    <aside style={{ ...railBase, width: w, minWidth: w }}>
      {inner}
    </aside>
  );
}

export default Sidebar;
