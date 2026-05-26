// polaris-ui/src/primitives/feedback.tsx
// S5 — empty / loading / lifecycle primitives. Calm aesthetic: NO shimmer.
import * as React from 'react';
import { Glyph } from './Glyph';

export interface EmptyHairlineProps { icon?: string; label: string; hint?: string; cta?: string; onCta?: () => void; }
export function EmptyHairline({ icon, label, hint, cta, onCta }: EmptyHairlineProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '28px 16px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      {icon ? <Glyph kind={icon} size={20} color="var(--text-muted)" /> : null}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>{label}</div>
      {hint ? <div style={{ fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 420, lineHeight: 1.5 }}>{hint}</div> : null}
      {cta ? <button onClick={onCta} style={{ marginTop: 4, padding: '6px 12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', background: 'var(--bg-2)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: 12.5, fontFamily: 'var(--font-ui)' }}>{cta}</button> : null}
    </div>
  );
}

export interface RowSkeletonProps { rows?: number; cols?: string[]; }
export function RowSkeleton({ rows = 5, cols = ['80px', '1fr', '120px', '80px'] }: RowSkeletonProps) {
  const tmpl = cols.join(' ');
  return (
    <div role="status" aria-busy="true" aria-label="Loading" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: 'grid', gridTemplateColumns: tmpl, gap: 12, alignItems: 'center', padding: '6px 0' }}>
          {cols.map((_, c) => (<div key={c} style={{ height: 12, borderRadius: 4, background: 'var(--bg-2)', opacity: Math.max(0.3, 1 - r * 0.12) }} />))}
        </div>
      ))}
    </div>
  );
}

export interface ChartSkeletonProps { ratio?: string; bars?: number; }
export function ChartSkeleton({ ratio = '16/9', bars = 24 }: ChartSkeletonProps) {
  return (
    <div role="status" aria-busy="true" aria-label="Loading chart" style={{ aspectRatio: ratio, width: '100%', display: 'flex', alignItems: 'flex-end', gap: 3, padding: 12, background: 'var(--bg-2)', borderRadius: 'var(--r-md)', boxSizing: 'border-box' }}>
      {Array.from({ length: bars }).map((_, i) => (<div key={i} style={{ flex: 1, height: (30 + Math.abs(Math.sin(i * 0.6)) * 55) + '%', background: 'var(--border)', borderRadius: 2 }} />))}
    </div>
  );
}

export type DocStatus = 'draft' | 'sent' | 'downloaded' | 'signed' | 'archived';
const DOC_CFG: Record<DocStatus, { c: string; label: string }> = {
  draft: { c: 'var(--text-muted)', label: 'Draft' },
  sent: { c: 'var(--info)', label: 'Sent' },
  downloaded: { c: 'var(--accent)', label: 'Downloaded' },
  signed: { c: 'var(--success)', label: 'Signed' },
  archived: { c: 'var(--text-muted)', label: 'Archived' },
};
export interface DocStatusPillProps { status: DocStatus | string; }
export function DocStatusPill({ status }: DocStatusPillProps) {
  const cfg = DOC_CFG[(status as DocStatus)] || DOC_CFG.draft;
  return (<span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 'var(--r-pill)', background: 'var(--bg-2)', color: cfg.c }}>{cfg.label}</span>);
}
