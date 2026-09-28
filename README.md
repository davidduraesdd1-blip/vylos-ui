# vylos-ui

Single-source-of-truth design-system package for all 4 VYLOS web apps:

| App | Path | data-app attribute |
|---|---|---|
| VYLOS Signal | `vylos-signal-v2/web` | none (defines its accent in its own globals.css) |
| VYLOS Yield | `vylos-yield` | none (uses the mobile shell only) |
| VYLOS Ground | `vylos-ground/web` | `vylos-ground` (the legacy pre-rebrand value is still accepted as an alias) |
| VYLOS Advisor | `vylos-advisor/web` | `etf-advisor-platform` |

Every app pins this package by git tag in its `package.json`, e.g.
`"vylos-ui": "git+https://github.com/davidduraesdd1-blip/vylos-ui.git#v0.9.0"`.
A change here reaches an app only after a new `vX.Y.Z` tag is cut and the app bumps its pin.

Lives in its own GitHub repo. Apps install it through the git-tag pin above and import
from `vylos-ui` (root barrel) or `vylos-ui/advisor`.

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
    <html lang="en" data-app="vylos-ground" data-theme="dark">
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

## Tests

`npm test` runs `node --test` (Node 23.6+ strips TypeScript natively). `npm run typecheck` runs `tsc --noEmit`.

## Lineage

Ported on 2026-05-18 from the pre-rebrand design-handoff repo (the
Claude-Design hybrid drop). Original lineage from `ui/design_system.py`
(Streamlit baseline) + the design's fresh JSX prototypes.
