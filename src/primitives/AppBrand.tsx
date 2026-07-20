// polaris-ui/src/primitives/AppBrand.tsx
// "VYLOS [App]" wordmark + mini RegimeOrbit + optional subtitle.

import * as React from 'react';
import { RegimeOrbit } from './RegimeOrbit';
import type { OrbitTick } from './RegimeOrbit';

export type BrandSize = 'sm' | 'md' | 'lg';

export interface AppBrandProps {
  app?: string;
  accent?: string;
  subtitle?: string;
  size?: BrandSize;
  orbitActive?: OrbitTick;
}

const SIZES: Record<BrandSize, { glyph: number; name: number; sub: number }> = {
  sm: { glyph: 22, name: 14, sub: 10 },
  md: { glyph: 28, name: 16, sub: 10.5 },
  lg: { glyph: 40, name: 22, sub: 12 },
};

export function AppBrand({
  app = 'Edge',
  accent,
  subtitle,
  size = 'md',
  orbitActive = 'N',
}: AppBrandProps) {
  const sizing = SIZES[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <RegimeOrbit size={sizing.glyph} accent={accent || 'var(--accent)'} active={orbitActive} />
      <div>
        <div
          style={{
            font: `600 ${sizing.name}px/1 var(--font-ui)`,
            letterSpacing: '-0.012em',
            color: 'var(--text-primary)',
          }}
        >
          VYLOS <span style={{ color: accent || 'var(--accent)', fontWeight: 400 }}>{app}</span>
        </div>
        {subtitle && (
          <div
            style={{
              font: `400 ${sizing.sub}px/1.2 var(--font-mono)`,
              color: 'var(--text-muted)',
              marginTop: 3,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBrand;
