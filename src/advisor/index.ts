// polaris-ui/src/advisor/index.ts
// Barrel re-exports for the Advisor sub-package.
// Scope: foundation primitives + fixtures. Screen-level compositions live in the
// etf-advisor-platform/web/ app pages (see Phase C4) rather than this shared package,
// because the advisor's screen flow is more app-specific than reusable.

export { CLIENTS, TIERS, BASKET, ETF_PERF, ADV_SOURCES, TEAL } from './fixtures';
export type {
  AdvisorClient, AdvisorTier, BasketHolding, EtfPerformance, BasketCategory,
} from './types';

export { KPITile } from './KPITile';
export type { KPITileProps } from './KPITile';

export { ClientRow } from './ClientRow';
export type { ClientRowProps } from './ClientRow';

export { TierLadder } from './TierLadder';
export type { TierLadderProps } from './TierLadder';

export { BasketTable } from './BasketTable';
export type { BasketTableProps } from './BasketTable';
