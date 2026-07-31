# vylos-ui

Single-source-of-truth design-system package for all 4 VYLOS web apps:

| App | Path | data-app attribute |
|---|---|---|
| VYLOS Signal | `01_Vylos Apps/VYLOS Signal/web` | `polaris-edge` (CSS hook, unchanged) |
| VYLOS Yield | `01_Vylos Apps/VYLOS Yield/web` | `polaris-defi` |
| VYLOS Ground | `01_Vylos Apps/VYLOS Ground/web` | `polaris-tokenization` |
| ETF Advisor | `01_Vylos Apps/etf-advisor-platform/web` | `etf-advisor-platform` |

Lives at `_System/common/vylos-ui/`. Each web/ app imports via TypeScript path alias
`vylos-ui` → `../../../../_System/common/vylos-ui/src`.

## Structure

```
src/
├── index.ts                  ← barrel re-exports
├── styles/
│   └── tokens.css            ← single source of CSS variables (per-app accents, semantics, layout, type, spacing, motion)
├── data/
│   ├── glossary.ts           ← 31 terms × 3 depths
│   └── regime.ts             ← regime taxonomy + layer-weight overrides
├── primitives/               ← framework-agnostic React components
│   ├── Num.tsx               ← every number flows through this
│   ├── RegimeOrbit.tsx       ← signature mark (animated)
│   ├── Card.tsx              ← base surface
│   ├── SignalBadge.tsx       ← BUY/HOLD/SELL
│   ├── Glyph.tsx             ← inline-SVG icon library
│   ├── StatusPill.tsx        ← live/cached/down data-source
│   ├── Explainer.tsx         ← voice-pattern callout
│   ├── ReaderLevel.tsx       ← B/I/A segmented + radio
│   ├── Eyebrow.tsx
│   └── DataSourceStrip.tsx
├── compliance/
│   ├── SECDisclaimer.tsx
│   └── MissingDisclosure.tsx
└── advisor/                  ← ETF Advisor components
```

## Usage

```tsx
// app/layout.tsx
import 'vylos-ui/styles/tokens.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-app="polaris-defi" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
import { Card, SignalBadge, Num, Eyebrow } from 'vylos-ui';

export default function Page() {
  return (
    <main style={{ flex: 1, padding: 24 }}>
      <Card>
        <Eyebrow>Composite signal</Eyebrow>
        <Num size={48}>+0.42</Num>
        <SignalBadge verdict="BUY" />
      </Card>
    </main>
  );
}
```

## Path alias in each web/

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "polaris-ui": ["../../../_System/common/vylos-ui/src"],
      "polaris-ui/*": ["../../../_System/common/vylos-ui/src/*"]
    }
  }
}
```

## Lineage

Ported on 2026-05-18 from `00_Inbox/polaris-design-handoff/polaris-app/` (the
Claude-Design hybrid drop). Original lineage from `ui/design_system.py`
(Streamlit baseline) + the design's fresh JSX prototypes.
