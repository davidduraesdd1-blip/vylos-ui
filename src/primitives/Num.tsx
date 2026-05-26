// polaris-ui/src/primitives/Num.tsx
// Every number in Polaris flows through this. Tabular nums + JetBrains Mono.

import * as React from 'react';

export interface NumProps {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  mono?: boolean;
  style?: React.CSSProperties;
}

export function Num({ children, size, weight = 500, color, mono = true, style }: NumProps) {
  return (
    <span
      style={{
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
        fontVariantNumeric: 'tabular-nums',
        fontSize: size,
        fontWeight: weight,
        color: color || 'var(--text-primary)',
        letterSpacing: size && size > 24 ? '-0.02em' : 'normal',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export default Num;
