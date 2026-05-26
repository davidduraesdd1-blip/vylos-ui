// polaris-ui/src/primitives/RegimeOrbit.tsx
// The signature mark. Animates at 2.4s breath when pulse=true.
// active: 'N' | 'E' | 'S' | 'W' | null — which regime tick is lit.
//
// S15: keyframes are hoisted into a SINGLE document <style> injected once on
// first mount (instead of per-instance useId keyframes). Accent is driven by the
// CSS custom property --orbit-accent on the SVG, so the drop-shadow recolors live
// on theme swap rather than being captured at mount.

import * as React from 'react';

export type OrbitTick = 'N' | 'E' | 'S' | 'W';

export interface RegimeOrbitProps {
  size?: number;
  accent?: string;
  active?: OrbitTick | null;
  pulse?: boolean;
  halo?: boolean;
}

const STYLE_ID = 'polaris-orbit-keyframes';
const KEYFRAMES = `
@keyframes polaris-orbit-ring { 0%,100% { stroke-opacity: 0.42; } 50% { stroke-opacity: 0.88; } }
@keyframes polaris-orbit-tick { 0%,100% { filter: drop-shadow(0 0 0 var(--orbit-accent)); } 50% { filter: drop-shadow(0 0 6px var(--orbit-accent)); } }
@keyframes polaris-orbit-halo { 0%,100% { opacity: 0.18; transform: scale(1); } 50% { opacity: 0.32; transform: scale(1.06); } }
`;

function useOrbitKeyframes() {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
  }, []);
}

export function RegimeOrbit({
  size = 32,
  accent = 'var(--accent)',
  active = 'N',
  pulse = true,
  halo = false,
}: RegimeOrbitProps) {
  useOrbitKeyframes();
  const ticks: Record<OrbitTick, { x1: number; y1: number; x2: number; y2: number }> = {
    N: { x1: 32, y1: 7,  x2: 32, y2: 13 },
    E: { x1: 57, y1: 32, x2: 51, y2: 32 },
    S: { x1: 32, y1: 57, x2: 32, y2: 51 },
    W: { x1: 7,  y1: 32, x2: 13, y2: 32 },
  };
  const orbitStyle = { color: 'var(--text-primary)', flexShrink: 0, ['--orbit-accent' as any]: accent } as React.CSSProperties;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      style={orbitStyle}
    >
      {halo && (
        <circle
          cx="32" cy="32" r="30" fill="none" stroke={accent} strokeWidth="0.5"
          style={{
            animation: pulse ? 'polaris-orbit-halo 2400ms cubic-bezier(0.45,0,0.55,1) infinite' : 'none',
            transformOrigin: '32px 32px',
          }}
        />
      )}
      <circle
        cx="32" cy="32" r="22" strokeWidth="1.5" strokeOpacity="0.42"
        style={{ animation: pulse ? 'polaris-orbit-ring 2400ms cubic-bezier(0.45,0,0.55,1) infinite' : 'none' }}
      />
      {(Object.entries(ticks) as [OrbitTick, typeof ticks.N][]).map(([k, l]) => {
        const isA = k === active;
        return (
          <line
            key={k}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={isA ? accent : 'currentColor'}
            strokeOpacity={isA ? 1 : 0.55}
            strokeWidth={isA ? 2.5 : 2}
            strokeLinecap="round"
            style={isA && pulse ? { animation: 'polaris-orbit-tick 2400ms cubic-bezier(0.45,0,0.55,1) infinite' } : undefined}
          />
        );
      })}
      <path
        d="M32 22 L34.6 29.4 L42 32 L34.6 34.6 L32 42 L29.4 34.6 L22 32 L29.4 29.4 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export default RegimeOrbit;
