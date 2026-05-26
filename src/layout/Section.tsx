// polaris-ui/src/layout/Section.tsx
// S13: a titled content section with optional description + right-aligned aside.

import * as React from 'react';
import { Eyebrow } from '../primitives/Eyebrow';

export interface SectionProps {
  title?: string;
  description?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Section({ title, description, aside, children, style }: SectionProps) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12, ...style }}>
      {(title || aside) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <div>
            {title && <Eyebrow>{title}</Eyebrow>}
            {description && (
              <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)', marginTop: 6 }}>{description}</div>
            )}
          </div>
          {aside && <div style={{ flexShrink: 0 }}>{aside}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export default Section;
