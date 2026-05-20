// polaris-ui/src/data/layers.ts
// 4-layer composite signal definitions.
// Mirrors composite_signal.py default weights + sub-component breakdown.
// These weights are the NORMAL regime baseline; regime overrides come from regime.ts.

import type { LayerKey } from './regime';

export interface LayerComponent {
  key: string;
  label: string;
  subWeight: number;
}

export interface Layer {
  key: LayerKey;
  label: string;
  weight: number;
  color: string;
  glyph: string;
  blurb: string;
  components: LayerComponent[];
}

export const LAYERS: Record<LayerKey, Layer> = {
  technical: {
    key:    'technical',
    label:  'Technical',
    weight: 0.20,
    color:  'var(--layer-technical)',
    glyph:  'chart-line',
    blurb:  'BTC price action — RSI, MA cross, momentum, Pi Cycle, Weekly RSI, VWAP deviation, Ichimoku cloud.',
    components: [
      { key: 'rsi',        label: 'RSI-14',           subWeight: 0.32 },
      { key: 'ma',         label: 'MA cross',         subWeight: 0.18 },
      { key: 'momentum',   label: '20d momentum',     subWeight: 0.10 },
      { key: 'pi_cycle',   label: 'Pi Cycle Top',     subWeight: 0.13 },
      { key: 'weekly_rsi', label: 'Weekly RSI',       subWeight: 0.09 },
      { key: 'vwap',       label: 'VWAP deviation',   subWeight: 0.08 },
      { key: 'ichimoku',   label: 'Ichimoku Cloud',   subWeight: 0.10 },
    ],
  },
  macro: {
    key:    'macro',
    label:  'Macro',
    weight: 0.20,
    color:  'var(--layer-macro)',
    glyph:  'globe',
    blurb:  'Global liquidity + dollar strength — DXY composite, VIX, yield curve, CPI, M2 YoY.',
    components: [
      { key: 'dxy_composite', label: 'DXY composite',   subWeight: 0.20 },
      { key: 'vix',           label: 'VIX',              subWeight: 0.20 },
      { key: 'yield_curve',   label: '2Y10Y spread',     subWeight: 0.20 },
      { key: 'cpi_yoy',       label: 'CPI YoY',          subWeight: 0.20 },
      { key: 'm2_yoy',        label: 'M2 YoY',           subWeight: 0.20 },
    ],
  },
  sentiment: {
    key:    'sentiment',
    label:  'Sentiment',
    weight: 0.25,
    color:  'var(--layer-sentiment)',
    glyph:  'heart-pulse',
    blurb:  'Market mood — Fear & Greed, F&G 30d trend, put/call ratio, funding rate, VC fundraising signal.',
    components: [
      { key: 'fg',         label: 'Fear & Greed',         subWeight: 0.40 },
      { key: 'fg_trend',   label: 'F&G 30d trend',        subWeight: 0.10 },
      { key: 'put_call',   label: 'Put/Call ratio',       subWeight: 0.25 },
      { key: 'funding',    label: 'Funding rate',         subWeight: 0.15 },
      { key: 'vc_funding', label: 'VC fundraising',       subWeight: 0.10 },
    ],
  },
  onchain: {
    key:    'onchain',
    label:  'On-chain',
    weight: 0.35,
    color:  'var(--layer-onchain)',
    glyph:  'cube',
    blurb:  'Blockchain fundamentals — MVRV Z-Score, Hash Ribbons, SOPR, Puell Multiple, Realized Price, NVT Signal, Dune custom.',
    components: [
      { key: 'mvrv',       label: 'MVRV Z-Score',        subWeight: 0.30 },
      { key: 'hash',       label: 'Hash Ribbons',         subWeight: 0.22 },
      { key: 'sopr',       label: 'SOPR',                 subWeight: 0.18 },
      { key: 'puell',      label: 'Puell Multiple',       subWeight: 0.08 },
      { key: 'rp',         label: 'Realized Price',       subWeight: 0.07 },
      { key: 'nvt',        label: 'NVT Signal',           subWeight: 0.05 },
      { key: 'dune',       label: 'Dune custom',          subWeight: 0.10 },
    ],
  },
};

export const LAYER_ORDER: LayerKey[] = ['technical', 'macro', 'sentiment', 'onchain'];

// Total weight sanity check
export const WEIGHT_TOTAL: number = Object.values(LAYERS).reduce((a, l) => a + l.weight, 0); // = 1.00
