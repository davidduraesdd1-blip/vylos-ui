// polaris-ui/src/primitives/DataSourceStrip.tsx
// Transparency strip showing which live data feeds are up.

import * as React from 'react';
import { Eyebrow } from './Eyebrow';
import { StatusPill } from './StatusPill';
import type { PillStatus } from './StatusPill';

export interface DataSource {
  id: string;
  label: string;
  detail?: string;
  status: PillStatus;
}

export interface DataSourceStripProps {
  sources: DataSource[];
}

export function DataSourceStrip({ sources }: DataSourceStripProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Eyebrow style={{ marginRight: 4 }}>Live data</Eyebrow>
      {sources.map((s) => (
        <StatusPill key={s.id} label={s.label} detail={s.detail} status={s.status} />
      ))}
    </div>
  );
}

export default DataSourceStrip;
