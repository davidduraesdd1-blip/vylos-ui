// PRUNED 2026-07-22 (David-approved dead-export audit): the public API now
// exports ONLY what the three consumer apps import (9 components + their
// prop types + glossary). ~45 zero-consumer export lines and the entire
// defi/edge/tokenization showcase subpackages were removed (git history has
// them). advisor/ stays: etf-advisor imports type AdvisorClient via subpath.
// vylos-ui/src/index.ts
// Barrel re-exports for the package's public surface. Apps import from the
// root ("import { Card } from 'vylos-ui'"); the "exports" map in
// package.json only exposes ".", "./styles/tokens.css", and "./advisor" —
// there is no general deep-subpath access (e.g. 'vylos-ui/primitives/Card'
// does not resolve).

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


// ── Per-app sub-packages (preferred path: subpath import, e.g. `vylos-ui/edge`) ──
// Root barrel re-exports them for convenience too; collisions resolved by namespace.

// ── Mobile shell (Phase 1, Claude Design handoff 2026-08-19) ───────────
export { TabBar } from './mobile/TabBar';
export type { TabBarProps, TabItem } from './mobile/TabBar';
export { GlassHeader } from './mobile/GlassHeader';
export type { GlassHeaderProps } from './mobile/GlassHeader';
export { MoreSheet } from './mobile/MoreSheet';
export type { MoreSheetProps, MoreEntry } from './mobile/MoreSheet';
export { MobileShell } from './mobile/MobileShell';
export type { MobileShellProps } from './mobile/MobileShell';
export { ProvenancePill } from './mobile/ProvenancePill';
export type { ProvenancePillProps, ProvenanceState } from './mobile/ProvenancePill';
