// polaris-ui/src/edge/types.ts
// Type definitions for Edge fixtures + props shared across Edge components.

import type { LayerKey, Verdict, RegimeKey } from '../data/regime';

export interface CoinLayers extends Record<LayerKey, number> {}

export interface Coin {
  symbol: string;
  pair: string;
  price: number;
  change24h: number;
  change7d: number;
  change30d?: number;
  verdict: Verdict;
  score: number;
  confidence: number;
  regime: RegimeKey;
  regimeConf?: number;
  regimeBars?: number;
  layers: CoinLayers;
}

export interface MarketContext {
  vix: number;
  vixLabel: string;
  dxy: number;
  dxyLabel: string;
  fgIndex: number;
  fgLabel: string;
  fgTrend: string;
  btcDominance: number;
  btcDomLabel: string;
  totalMcap: string;
  totalMcapLabel: string;
}
