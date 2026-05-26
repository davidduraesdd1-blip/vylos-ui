// polaris-ui/src/layout/KPIRail.tsx
// S13: responsive KPI strip. Each cell shows a label + value with an optional
// accent top-border. Wraps to fewer columns on narrow viewports via auto-fit.

import * as React from 'react';

export interface KPICell {
  label: string;
  value: React.ReactNode;
  accent?: string;
  hint?: React.ReactNode;
}

export interface KPIRailProps {
  cells: KPICell[];
  /** Minimum cell width before wrapping (default 160). */
  minCellWidth?: number;
  style?: React.CSSProperties;
}

export function KPIRail({ cells, minCellWidth = 160, style }: KPIRailProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCellWidth}px, 1fr))`,
        gap: 12,
        ...style,
      }}
    >
      {cells.map((c) => (
        <div
          key={c.label}
          style={{
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderTop: `2px solid ${c.accent || 'var(--border-strong)'}`,
            borderRadius: 'var(--card-radius)',
            padding: 16,
          }}
        >
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: 6 }}>
            {c.label}
          </div>
          <div style={{ font: '600 22px/1 var(--font-ui)', color: c.accent || 'var(--text-primary)' }}>{c.value}</div>
          {c.hint && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{c.hint}</div>}
        </div>
      ))}
    </div>
  );
}

export default KPIRail;
