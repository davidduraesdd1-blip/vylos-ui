// polaris-ui/src/layout/ScreenHeader.tsx
// S13: standard screen header — eyebrow + h1 + optional subtitle + right actions.

import * as React from 'react';
import { Eyebrow } from '../primitives/Eyebrow';

export interface ScreenHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ScreenHeader({ title, eyebrow, subtitle, actions, style }: ScreenHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, ...style }}>
      <div>
        {eyebrow && <Eyebrow style={{ marginBottom: 8 }}>{eyebrow}</Eyebrow>}
        <h1 style={{ font: '600 32px/1.1 var(--font-ui)', letterSpacing: '-0.022em', margin: 0, color: 'var(--text-primary)' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '6px 0 0', maxWidth: 680 }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>{actions}</div>}
    </div>
  );
}

export default ScreenHeader;
