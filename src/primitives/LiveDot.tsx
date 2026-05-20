// polaris-ui/src/primitives/LiveDot.tsx
// Small pulsing dot for chrome (sidebar live counter, header pulse).

import * as React from 'react';

export interface LiveDotProps {
  color?: string;
  size?: number;
}

export function LiveDot({ color = 'var(--success)', size = 6 }: LiveDotProps) {
  const id = React.useId().replace(/:/g, '');
  return (
    <span style={{ display: 'inline-flex', position: 'relative' }}>
      <style>{`@keyframes ld-${id} { 0%,100% { box-shadow: 0 0 0 0 ${color}66; } 50% { box-shadow: 0 0 0 ${size}px transparent; opacity: 0.55; } }`}</style>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          animation: `ld-${id} 2400ms cubic-bezier(0.45,0,0.55,1) infinite`,
        }}
      />
    </span>
  );
}

export default LiveDot;
