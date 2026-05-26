// polaris-ui/src/tokenization/index.ts
// Barrel re-exports for the Tokenization sub-package.
//
// Hybrid composition:
//   • PortfolioDonut, AIBriefing, HealthScoreCard, YieldAccrualCard,
//     RiskMetricsGrid, RiskTierLadder, IssuerConcentration,
//     MonteCarloFanChart, RWAMarketContext, HoldingsList — design canonical
//   • AssetCategoryStrip, HypotheticalResultsCallout — kept from richer prior (extend coverage)

export { ALLOC, HOLDINGS, ISSUERS, RISK_METRICS, RISK_TIERS, RWA_MARKET, TOK_SOURCES, GOLD } from './fixtures';
export type {
  AllocationEntry, Holding, Issuer, IssuerRating, RiskMetric, RiskTone,
  RiskTier, RwaMarket, HealthComponent,
} from './types';

export { PortfolioDonut } from './PortfolioDonut';
export type { PortfolioDonutProps, CategoryGranularity } from './PortfolioDonut';

export { AIBriefing } from './AIBriefing';
export type { AIBriefingProps } from './AIBriefing';

export { HealthScoreCard } from './HealthScoreCard';
export type { HealthScoreCardProps } from './HealthScoreCard';

export { YieldAccrualCard } from './YieldAccrualCard';
export type { YieldAccrualCardProps, AccrualEntry } from './YieldAccrualCard';

export { RiskMetricsGrid } from './RiskMetricsGrid';
export type { RiskMetricsGridProps } from './RiskMetricsGrid';

export { RiskTierLadder } from './RiskTierLadder';
export type { RiskTierLadderProps } from './RiskTierLadder';

export { IssuerConcentration } from './IssuerConcentration';
export type { IssuerConcentrationProps } from './IssuerConcentration';

export { MonteCarloFanChart } from './MonteCarloFanChart';
export type { MonteCarloFanChartProps } from './MonteCarloFanChart';

export { RWAMarketContext } from './RWAMarketContext';
export type { RWAMarketContextProps } from './RWAMarketContext';

export { HoldingsList } from './HoldingsList';
export type { HoldingsListProps } from './HoldingsList';

export { AssetCategoryStrip } from './AssetCategoryStrip';
export type { AssetCategoryStripProps } from './AssetCategoryStrip';

export { HypotheticalResultsCallout } from './HypotheticalResultsCallout';
export type { HypotheticalResultsCalloutProps } from './HypotheticalResultsCallout';
