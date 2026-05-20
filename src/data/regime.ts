// polaris-ui/src/data/regime.ts
// Regime taxonomy + layer-weight overrides per regime.
// Mirrors composite_signal.py _REGIME_WEIGHTS_BASE + _detect_regime priority.
// Source of truth: polaris-edge/composite_signal.py (locked 2026-05).

export type RegimeCode = 'CRISIS' | 'TRENDING' | 'RANGING' | 'NORMAL';
export type RegimeKey = 'CRISIS' | 'TRENDING' | 'RANGING' | 'NEUTRAL';
export type LayerKey = 'technical' | 'macro' | 'sentiment' | 'onchain';

export interface Regime {
  name: string;
  code: RegimeCode;
  color: string;
  trigger: string;
  rationale: string;
  weights: Record<LayerKey, number>;
  glyph: string;
}

export const REGIMES: Record<RegimeKey, Regime> = {
  CRISIS: {
    name:       'Crisis',
    code:       'CRISIS',
    color:      'var(--regime-crisis)',
    trigger:    'VIX ≥ 35',
    rationale:  'Macro noise explodes; on-chain marks bottoms reliably. TA whipsaws violently during panic.',
    weights:    { technical: 0.10, macro: 0.15, sentiment: 0.25, onchain: 0.50 },
    glyph:      'shield',
  },
  TRENDING: {
    name:       'Trending',
    code:       'TRENDING',
    color:      'var(--regime-trending)',
    trigger:    'ADX ≥ 25',
    rationale:  'Trend is confirmed — TA momentum signals are reliable. MA cross, RSI extremes, price momentum all outperform.',
    weights:    { technical: 0.30, macro: 0.20, sentiment: 0.20, onchain: 0.30 },
    glyph:      'chevron-up',
  },
  RANGING: {
    name:       'Ranging',
    code:       'RANGING',
    color:      'var(--regime-ranging)',
    trigger:    'ADX < 20',
    rationale:  'No trend; TA noise-heavy. Sentiment & on-chain lead. Mean reversion dominates.',
    weights:    { technical: 0.10, macro: 0.20, sentiment: 0.30, onchain: 0.40 },
    glyph:      'horizontal-wave',
  },
  NEUTRAL: {
    name:       'Neutral',
    code:       'NORMAL',
    color:      'var(--regime-neutral)',
    trigger:    'no extreme condition',
    rationale:  'Default state — base weights. Composite signal uses Optuna-tuned weights when available.',
    weights:    { technical: 0.20, macro: 0.20, sentiment: 0.25, onchain: 0.35 },
    glyph:      'minus',
  },
};

export const REGIME_PRIORITY: RegimeKey[] = ['CRISIS', 'TRENDING', 'RANGING', 'NEUTRAL'];

export type Verdict = 'BUY' | 'HOLD' | 'SELL';

export function detectRegime(vix: number | null | undefined, adx: number | null | undefined): Regime {
  if (vix !== null && vix !== undefined && vix >= 35) return REGIMES.CRISIS;
  if (adx !== null && adx !== undefined && adx >= 25) return REGIMES.TRENDING;
  if (adx !== null && adx !== undefined && adx < 20)  return REGIMES.RANGING;
  return REGIMES.NEUTRAL;
}

// Verdict mapping from composite score [-1, +1]
export function verdictFromScore(score: number): Verdict {
  if (score >= 0.30) return 'BUY';
  if (score <= -0.30) return 'SELL';
  return 'HOLD';
}

// Plain-English beginner label for the score
export function beginnerLabel(score: number): string {
  if (score >= 0.30) return 'Market conditions look good for trading — macro and on-chain are aligned';
  if (score >= 0.10) return 'Conditions are slightly favorable for new positions';
  if (score >= -0.10) return 'Mixed signals — hold existing positions, wait for clarity';
  if (score >= -0.30) return 'Conditions are slightly unfavorable — reduce new exposure';
  return 'Market is under stress — wait for better conditions before opening new trades';
}
