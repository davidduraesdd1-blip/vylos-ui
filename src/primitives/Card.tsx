// vylos-ui/src/primitives/Card.tsx
// Base surface primitive. Optional accent border-top for emphasis.

import * as React from 'react';

export interface CardProps {
  children: React.ReactNode;
  pad?: string | number;
  radius?: string | number;
  accent?: string;
  emphasis?: 'brand' | 'active';
  style?: React.CSSProperties;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({
  children,
  pad = 'var(--card-pad)',
  radius = 'var(--card-radius)',
  accent,
  emphasis,
  style,
  onClick,
  interactive,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderTop: accent
          ? `2px solid ${accent}`
          : emphasis === 'brand'
          ? '2px solid var(--accent)'
          : '1px solid var(--border)',
        boxShadow: emphasis === 'active' ? 'inset 4px 0 0 var(--accent)' : undefined,
        borderRadius: radius,
        padding: pad,
        cursor: onClick ? 'pointer' : 'default',
        transition: interactive
          ? 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
          : 'none',
        ...style,
      }}
      onMouseEnter={
        interactive
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-2)';
            }
          : undefined
      }
      onMouseLeave={
        interactive
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-1)';
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default Card;
