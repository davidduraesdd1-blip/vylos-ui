// polaris-ui/src/primitives/Glyph.tsx
// Inline-SVG icon library. Ported verbatim from design handoff — these glyphs
// are part of the Polaris visual identity, not interchangeable with lucide-react.

import * as React from 'react';

export type GlyphKind =
  | 'triangle-up' | 'triangle-down' | 'square' | 'diamond' | 'circle'
  | 'chevron-up' | 'horizontal-wave' | 'shield' | 'minus'
  | 'chart-line' | 'globe' | 'heart-pulse' | 'cube'
  | 'caret-right' | 'caret-left' | 'caret-down' | 'chevron-right'
  | 'refresh' | 'info' | 'search' | 'home' | 'signal' | 'wallet'
  | 'bell' | 'sparkle' | 'gear' | 'arrow-right' | 'book';

export interface GlyphProps {
  kind: GlyphKind | string;
  size?: number;
  color?: string;
}

export function Glyph({ kind, size = 14, color = 'currentColor' }: GlyphProps) {
  const paths: Record<string, React.ReactNode> = {
    'triangle-up':    <path d="M12 4 L20.5 19 L3.5 19 Z" fill={color}/>,
    'triangle-down':  <path d="M12 20 L20.5 5 L3.5 5 Z" fill={color}/>,
    'square':         <rect x="4" y="4" width="16" height="16" rx="2.5" fill={color}/>,
    'diamond':        <path d="M12 3 L21 12 L12 21 L3 12 Z" fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>,
    'circle':         <circle cx="12" cy="12" r="8" fill={color}/>,
    'chevron-up':     <path d="M3 18 L9 12 L13 15 L21 6 M15 6 L21 6 L21 12" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>,
    'horizontal-wave': (
      <g>
        <line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.6" strokeOpacity="0.5"/>
        <line x1="3" y1="18" x2="21" y2="18" stroke={color} strokeWidth="1.6" strokeOpacity="0.5"/>
        <path d="M3 12 Q 7 8, 10 12 T 17 12 T 21 12" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      </g>
    ),
    'shield':         <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>,
    'minus':          <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>,
    'chart-line':     <path d="M3 17 L8 12 L12 15 L17 8 L21 11" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    'globe': (
      <g>
        <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.8"/>
        <path d="M3 12 H21 M12 3 C 15 7, 15 17, 12 21 M12 3 C 9 7, 9 17, 12 21" fill="none" stroke={color} strokeWidth="1.4"/>
      </g>
    ),
    'heart-pulse':    <path d="M5 9 C 5 6, 9 5, 12 7 C 15 5, 19 6, 19 9 C 19 13, 12 19, 12 19 C 12 19, 5 13, 5 9 M2 12 H8 L10 8 L12 16 L14 10 L22 10" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>,
    'cube': (
      <g>
        <path d="M12 3 L21 8 V16 L12 21 L3 16 V8 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 3 V12 M3 8 L12 12 L21 8" fill="none" stroke={color} strokeWidth="1.4"/>
      </g>
    ),
    'caret-right':    <path d="M9 6 L15 12 L9 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    'caret-left':     <path d="M15 6 L9 12 L15 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    'caret-down':     <path d="M6 9 L12 15 L18 9" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    'chevron-right':  <path d="M9 6 L15 12 L9 18" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    'refresh':        <path d="M21 12 A 9 9 0 1 1 17.5 5.5 L21 9 M21 4 V9 H16" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    'info': (
      <g>
        <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="1.6"/>
        <line x1="12" y1="8" x2="12" y2="8.5" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
        <line x1="12" y1="11" x2="12" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    ),
    'search': (
      <g>
        <circle cx="11" cy="11" r="6.5" fill="none" stroke={color} strokeWidth="1.8"/>
        <line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    ),
    'home':           <path d="M3 12 L12 3 L21 12 M5 10 V20 H19 V10" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>,
    'signal':         <path d="M4 16 L9 11 L14 14 L20 8" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
    'wallet': (
      <g>
        <rect x="3" y="7" width="18" height="12" rx="1.5" fill="none" stroke={color} strokeWidth="1.6"/>
        <line x1="3" y1="11" x2="21" y2="11" stroke={color} strokeWidth="1.6"/>
        <circle cx="17" cy="15" r="1" fill={color}/>
      </g>
    ),
    'bell':           <path d="M6 16 V11 A 6 6 0 0 1 18 11 V16 L20 18 H4 Z M10 21 H14" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>,
    'sparkle':        <path d="M12 3 L13.5 9 L19.5 10.5 L13.5 12 L12 18 L10.5 12 L4.5 10.5 L10.5 9 Z M19 4 L19.5 6 L21.5 6.5 L19.5 7 L19 9 L18.5 7 L16.5 6.5 L18.5 6 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>,
    'gear': (
      <g>
        <circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="1.8"/>
        <path d="M12 3 L13 6 L15.5 5 L16 7.5 L18.5 8 L17.5 10.5 L20 12 L17.5 13.5 L18.5 16 L16 16.5 L15.5 19 L13 18 L12 21 L11 18 L8.5 19 L8 16.5 L5.5 16 L6.5 13.5 L4 12 L6.5 10.5 L5.5 8 L8 7.5 L8.5 5 L11 6 Z" fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round"/>
      </g>
    ),
    'arrow-right':    <path d="M5 12 H19 M13 6 L19 12 L13 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    'book':           <path d="M4 4 H10 C11 4 12 5 12 6 V20 C12 19 11 18 10 18 H4 Z M20 4 H14 C13 4 12 5 12 6 V20 C12 19 13 18 14 18 H20 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round"/>,
  };
  const node = paths[kind];
  if (!node) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" style={{ flexShrink: 0 }}>
      {node}
    </svg>
  );
}

export default Glyph;
