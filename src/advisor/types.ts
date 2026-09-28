// vylos-ui/src/advisor/types.ts

export interface AdvisorClient {
  id: string;
  name: string;
  persona: string;
  aum: string;
  tier: number;
  sharpe: number;
  ytd: string;
  mdd: string;
  flag: 'rebalance' | null;
  ceiling: string;
  advisor: string;
}

export interface AdvisorTier {
  n: number;
  name: string;
  ceiling: string;
  ddCap: number;
  ret1y: string;
  sharpe3y: string;
  cadence: string;
}

export type BasketCategory =
  | 'btc_spot'
  | 'defined_outcome'
  | 'income_covered_call'
  | string;

export interface BasketHolding {
  ticker: string;
  name: string;
  issuer: string;
  category: BasketCategory;
  weight: number;
  usd: string;
  sigma: number;
  corr: number;
  color: string;
}

export interface EtfPerformance {
  ticker: string;
  source: string;
  inception: string;
  y1: number | string;
  y3: number | string;
  y5: number | string;
  inc: number | string;
  mdd: number | string;
}
