// polaris-ui/src/layout/ScreenLayout.tsx
// S13: shared outer screen scaffold. Owns padding / gap / maxWidth via CSS custom
// properties so apps stop hand-rolling per-screen <div> padding (which had drifted
// — Edge '24px 32px 80px' vs Advisor '32px 40px 96px'). density tunes the props.

import * as React from 'react';

export type Density = 'comfortable' | 'compact';

export interface ScreenLayoutProps {
  children: React.ReactNode;
  density?: Density;
  maxWidth?: number | string;
  style?: React.CSSProperties;
}

const DENSITY: Record<Density, { py: string; px: string; gap: string }> = {
  comfortable: { py: '32px', px: '40px', gap: '18px' },
  compact:     { py: '24px', px: '28px', gap: '14px' },
};

export function ScreenLayout({ children, density = 'comfortable', maxWidth = 1200, style }: ScreenLayoutProps) {
  const d = DENSITY[density];
  const vars = {
    ['--screen-pad-y' as any]: d.py,
    ['--screen-pad-x' as any]: d.px,
    ['--screen-gap' as any]: d.gap,
  } as React.CSSProperties;
  return (
    <div
      style={{
        ...vars,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--screen-gap)',
        padding: 'var(--screen-pad-y) var(--screen-pad-x) calc(var(--screen-pad-y) * 2.5)',
        maxWidth,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default ScreenLayout;
