// polaris-ui/src/advisor/KPITile.tsx
// Generic KPI tile — label / value / sub. Used heavily in advisor screens.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';

export interface KPITileProps {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
  mono?: boolean;
}

export function KPITile({ label, value, sub, subColor, mono = true }: KPITileProps) {
  return (
    <Card pad={20}>
      <Eyebrow style={{ marginBottom: 8 }}>{label}</Eyebrow>
      <Num size={28} weight={600} mono={mono}>{value}</Num>
      {sub && (
        <div
          style={{
            fontSize: 11.5,
            color: subColor || 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      )}
    </Card>
  );
}

export default KPITile;
