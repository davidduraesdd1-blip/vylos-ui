// polaris-ui/src/layout/CardSurface.tsx
// S13: layout-oriented surface. Thin wrapper over the Card primitive so screens
// have one import for sectioned surfaces; forwards emphasis + pad + accent.

import * as React from 'react';
import { Card } from '../primitives/Card';
import type { CardProps } from '../primitives/Card';

export interface CardSurfaceProps extends CardProps {
  /** Optional header rendered inside the surface above children. */
  header?: React.ReactNode;
}

export function CardSurface({ header, children, ...card }: CardSurfaceProps) {
  return (
    <Card {...card}>
      {header && <div style={{ marginBottom: 12 }}>{header}</div>}
      {children}
    </Card>
  );
}

export default CardSurface;
