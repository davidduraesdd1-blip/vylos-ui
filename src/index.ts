// PRUNED 2026-07-22 (David-approved dead-export audit): the public API now
// exports ONLY what the three consumer apps import (10 components + their
// prop types + glossary). ~45 zero-consumer export lines and the entire
// defi/edge/tokenization showcase subpackages were removed (git history has
// them). advisor/ stays: etf-advisor imports type AdvisorClient via subpath.
// polaris-ui/src/index.ts
// Barrel re-exports for the entire package. Apps can import either
// from the root ("import { Card } from 'polaris-ui'") or from specific
// sub-paths ("import { Card } from 'polaris-ui/primitives/Card'").

// ── Primitives ─────────────────────────────────────────────────────────
export { Num } from './primitives/Num';
export type { NumProps } from './primitives/Num';

export { Eyebrow } from './primitives/Eyebrow';
export type { EyebrowProps } from './primitives/Eyebrow';


export { Card } from './primitives/Card';
export type { CardProps } from './primitives/Card';


export { RegimeOrbit } from './primitives/RegimeOrbit';
export type { RegimeOrbitProps, OrbitTick } from './primitives/RegimeOrbit';

export { SignalBadge } from './primitives/SignalBadge';
export type { SignalBadgeProps, BadgeSize } from './primitives/SignalBadge';

export { StatusPill } from './primitives/StatusPill';
export type { StatusPillProps, PillStatus } from './primitives/StatusPill';

export { Explainer } from './primitives/Explainer';
export type { ExplainerProps, ExplainerKind, ExplainerSize } from './primitives/Explainer';

export { ReaderLevel } from './primitives/ReaderLevel';
export type { ReaderLevelProps, ReaderSize, ReaderLayout } from './primitives/ReaderLevel';




// ── Layout ─────────────────────────────────────────────────────────────


// S13 — shared screen scaffold

// ── Compliance ──────────────────────────────────────
export { SECDisclaimer } from './compliance/SECDisclaimer';
export type { SECDisclaimerProps, SECDisclaimerKind } from './compliance/SECDisclaimer';

// ── Feedback / empty / loading (S5) ───────────────────

// SignalChipGroup (E2/A7) — note: its local Verdict type is NOT re-exported to
// avoid colliding with the Verdict exported from ./data/regime below.

// Hooks

// ── Data ───────────────────────────────────────────────────────────────

export { GLOSSARY, tooltip as glossaryTooltip } from './data/glossary';
export type { GlossaryEntry, ReaderLevelKey } from './data/glossary';


// ── Per-app sub-packages (preferred path: subpath import, e.g. `polaris-ui/edge`) ──
// Root barrel re-exports them for convenience too; collisions resolved by namespace.
