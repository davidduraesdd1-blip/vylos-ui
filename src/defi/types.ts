// polaris-ui/src/defi/types.ts
// Type definitions for DEFI fixtures + props.

export type Sustainability = 'pure-base' | 'base-yield' | 'sustainable' | 'incentive-heavy';

export interface Pool {
  id: string;
  name: string;
  protocol: string;
  protocolColor: string;
  apy: number;
  tvl: string;
  base: number;
  inc: number;
  fee: number;
  sustainability: Sustainability;
  chain: string;
}

export interface MarketCycle {
  value: number; // 0-100
  label: string; // "Strong Buy" | "Buy" | "Neutral" | "De-risk" | "Strong De-risk"
  rationale: string;
}
