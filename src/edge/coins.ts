// polaris-ui/src/edge/coins.ts
// Sample coin signals — fixture for Edge MarketsHome.
// Maps to crypto_model_core.py output shape.

import type { Coin, MarketContext } from './types';
import type { DataSource } from '../primitives/DataSourceStrip';

export const COINS: Coin[] = [
  { symbol: 'BTC',  pair: 'USDT', price: 73420,   change24h: 2.84,  change7d: 12.4,  change30d: 28.6,
    verdict: 'BUY',  score:  0.42, confidence: 82,
    regime: 'TRENDING', regimeConf: 0.84, regimeBars: 12,
    layers: { technical: 0.42, macro: 0.18, sentiment: 0.05, onchain: 0.56 } },
  { symbol: 'ETH',  pair: 'USDT', price: 3891,    change24h: 1.12,  change7d: 6.8,   change30d: 14.2,
    verdict: 'HOLD', score:  0.12, confidence: 71,
    regime: 'RANGING', regimeConf: 0.72, regimeBars: 5,
    layers: { technical: 0.05, macro: 0.18, sentiment: 0.10, onchain: 0.21 } },
  { symbol: 'SOL',  pair: 'USDT', price: 248.30,  change24h: 5.42,  change7d: 18.6,  change30d: 42.1,
    verdict: 'BUY',  score:  0.51, confidence: 78,
    regime: 'TRENDING', regimeConf: 0.78, regimeBars: 8,
    layers: { technical: 0.58, macro: 0.18, sentiment: 0.30, onchain: 0.51 } },
  { symbol: 'XRP',  pair: 'USDT', price: 1.4220,  change24h: 0.57,  change7d: 2.1,   change30d: 8.4,
    verdict: 'HOLD', score: -0.02, confidence: 62,
    regime: 'RANGING', regimeConf: 0.62, regimeBars: 14,
    layers: { technical: -0.10, macro: 0.18, sentiment: -0.05, onchain: 0.08 } },
  { symbol: 'LINK', pair: 'USDT', price: 24.18,   change24h: -1.31, change7d: -4.8,  change30d: -12.5,
    verdict: 'SELL', score: -0.34, confidence: 69,
    regime: 'CRISIS', regimeConf: 0.69, regimeBars: 6,
    layers: { technical: -0.45, macro: -0.20, sentiment: -0.18, onchain: -0.42 } },
  { symbol: 'AVAX', pair: 'USDT', price: 42.65,   change24h: 3.20,  change7d: 9.8,   change30d: 22.4,
    verdict: 'BUY',  score:  0.38, confidence: 74,
    regime: 'TRENDING', regimeConf: 0.74, regimeBars: 9,
    layers: { technical: 0.48, macro: 0.18, sentiment: 0.22, onchain: 0.42 } },
  { symbol: 'ADA',  pair: 'USDT', price: 1.0480,  change24h: 1.85,  change7d: 5.2,   change30d: 11.8,
    verdict: 'HOLD', score:  0.18, confidence: 65,
    regime: 'NEUTRAL', regimeConf: 0.65, regimeBars: 7,
    layers: { technical: 0.15, macro: 0.18, sentiment: 0.10, onchain: 0.22 } },
  { symbol: 'SUI',  pair: 'USDT', price: 4.82,    change24h: 4.20,  change7d: 14.5,  change30d: 38.2,
    verdict: 'BUY',  score:  0.45, confidence: 71,
    regime: 'TRENDING', regimeConf: 0.71, regimeBars: 6,
    layers: { technical: 0.52, macro: 0.18, sentiment: 0.28, onchain: 0.48 } },
];

export const DATA_SOURCES: DataSource[] = [
  { id: 'kraken',     label: 'Kraken',     status: 'live',   detail: '33 pairs' },
  { id: 'gateio',     label: 'Gate.io',    status: 'live',   detail: 'tier-2 alts' },
  { id: 'coingecko',  label: 'CoinGecko',  status: 'live',   detail: '7m cache' },
  { id: 'fearGreed',  label: 'F&G',        status: 'live',   detail: 'daily' },
  { id: 'glassnode',  label: 'Glassnode',  status: 'cached', detail: '1h cache' },
  { id: 'okx',        label: 'OKX',        status: 'down',   detail: 'geo-blocked' },
  { id: 'fred',       label: 'FRED',       status: 'live',   detail: 'M2/DXY/VIX' },
];

export const MARKET_CONTEXT: MarketContext = {
  vix:           18.4,
  vixLabel:      'Calm',
  dxy:           102.3,
  dxyLabel:      'Neutral',
  fgIndex:       62,
  fgLabel:       'Greed',
  fgTrend:       '+4 vs 30d avg',
  btcDominance:  57.6,
  btcDomLabel:   'Steady',
  totalMcap:     '$2.84T',
  totalMcapLabel:'+3.2% 7d',
};
