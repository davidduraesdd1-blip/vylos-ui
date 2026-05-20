// polaris-ui/src/primitives/Eyebrow.tsx
// Small uppercase label used above headings / KPI tiles.

import * as React from 'react';

export interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export function Eyebrow({ children, color, style }: EyebrowProps) {
  return (
    <div
      style={{
        font: '600 10.5px/1 var(--font-ui)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: color || 'var(--text-muted)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Eyebrow;
