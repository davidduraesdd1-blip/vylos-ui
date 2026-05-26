// polaris-ui/src/index.ts
// Barrel re-exports for the entire package. Apps can import either
// from the root ("import { Card } from 'polaris-ui'") or from specific
// sub-paths ("import { Card } from 'polaris-ui/primitives/Card'").

// ── Primitives ─────────────────────────────────────────────────────────
export { Num } from './primitives/Num';
export type { NumProps } from './primitives/Num';

export { Eyebrow } from './primitives/Eyebrow';
export type { EyebrowProps } from './primitives/Eyebrow';

export { LiveDot } from './primitives/LiveDot';
export type { LiveDotProps } from './primitives/LiveDot';

export { Card } from './primitives/Card';
export type { CardProps } from './primitives/Card';

export { Glyph } from './primitives/Glyph';
export type { GlyphProps, GlyphKind } from './primitives/Glyph';

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

export { Tooltip } from './primitives/Tooltip';
export type { TooltipProps } from './primitives/Tooltip';

export { AppBrand } from './primitives/AppBrand';
export type { AppBrandProps, BrandSize } from './primitives/AppBrand';

export { DataSourceStrip } from './primitives/DataSourceStrip';
export type { DataSourceStripProps, DataSource } from './primitives/DataSourceStrip';

// ── Layout ─────────────────────────────────────────────────────────────
export { Sidebar } from './layout/Sidebar';
export type { SidebarProps } from './layout/Sidebar';

export { APP_CONFIG, APP_ORDER } from './layout/AppConfig';
export type { AppKey, AppConfig, NavItem, DataAppAttr } from './layout/AppConfig';

// ── Compliance ──────────────────────────────────────
export { SECDisclaimer } from './compliance/SECDisclaimer';
export type { SECDisclaimerProps, SECDisclaimerKind } from './compliance/SECDisclaimer';
export { MissingDisclosure } from './compliance/MissingDisclosure';

// ── Data ───────────────────────────────────────────────────────────────
export { CATEGORIES, CATEGORY_ORDER } from './data/categories';
export type { CategoryKey, Category } from './data/categories';

export { GLOSSARY, tooltip as glossaryTooltip } from './data/glossary';
export type { GlossaryEntry, ReaderLevelKey } from './data/glossary';

export { LAYERS, LAYER_ORDER, WEIGHT_TOTAL } from './data/layers';
export type { Layer, LayerComponent } from './data/layers';

export {
  REGIMES,
  REGIME_PRIORITY,
  detectRegime,
  verdictFromScore,
  beginnerLabel,
} from './data/regime';
export type { Regime, RegimeCode, RegimeKey, LayerKey, Verdict } from './data/regime';

// ── Per-app sub-packages (preferred path: subpath import, e.g. `polaris-ui/edge`) ──
// Root barrel re-exports them for convenience too; collisions resolved by namespace.
export * as edge from './edge';
export * as defi from './defi';
export * as tokenization from './tokenization';
export * as advisor from './advisor';
