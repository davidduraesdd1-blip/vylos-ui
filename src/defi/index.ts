// polaris-ui/src/defi/index.ts
// Barrel re-exports for the DEFI sub-package.
//
// Hybrid composition:
//   • CycleGauge, PoolRow, YieldEstimateCard  — design canonical (richer than prior)
//   • HealthFactorGauge, ImpermanentLossCard,
//     LiquidationDistanceBar                  — kept from richer prior (extend design coverage)

export { POOLS, CYCLE, DEFI_SOURCES } from './pools';
export type { Pool, Sustainability, MarketCycle } from './types';

export { CycleGauge } from './CycleGauge';
export type { CycleGaugeProps } from './CycleGauge';

export { PoolRow } from './PoolRow';
export type { PoolRowProps } from './PoolRow';

export { YieldEstimateCard } from './YieldEstimateCard';
export type { YieldEstimateCardProps, YieldEstimate } from './YieldEstimateCard';

export { HealthFactorGauge } from './HealthFactorGauge';
export type { HealthFactorGaugeProps } from './HealthFactorGauge';

export { ImpermanentLossCard } from './ImpermanentLossCard';
export type { ImpermanentLossCardProps } from './ImpermanentLossCard';

export { LiquidationDistanceBar } from './LiquidationDistanceBar';
export type { LiquidationDistanceBarProps } from './LiquidationDistanceBar';
