// polaris-ui/src/edge/CompositeSignalHero.tsx
// THE hero element of Polaris Edge. Every other Edge screen is built around this.
// The 4-layer composite breakdown made visible.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { SignalBadge } from '../primitives/SignalBadge';
import { Explainer } from '../primitives/Explainer';
import { LayerCell } from './LayerCell';
import type { Coin } from './types';
import type { Regime, LayerKey } from '../data/regime';
import type { Layer } from '../data/layers';
import type { ReaderLevelKey } from '../data/glossary';

export interface CompositeSignalHeroProps {
  coin: Coin;
  regime: Regime;
  layers: Record<LayerKey, Layer>;
  level?: ReaderLevelKey;
}

const LAYER_ORDER: LayerKey[] = ['technical', 'macro', 'sentiment', 'onchain'];

export function CompositeSignalHero({
  coin,
  regime,
  layers,
  level = 'beginner',
}: CompositeSignalHeroProps) {
  return (
    <div
      style={{
        padding: 28,
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* Top row: identity + verdict + regime */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Eyebrow>{`Composite signal · ${coin.symbol}/${coin.pair} · 4H`}</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 8 }}>
            <Num size={64} weight={600}>{'$' + coin.price.toLocaleString()}</Num>
            <Num size={20} color={coin.change24h >= 0 ? 'var(--success)' : 'var(--danger)'}>
              {coin.change24h >= 0 ? '+' : ''}
              {coin.change24h.toFixed(2)}%
            </Num>
          </div>
          <div
            style={{
              marginTop: 4,
              fontSize: 13,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            7d{' '}
            <Num color="var(--text-secondary)">
              {coin.change7d >= 0 ? '+' : ''}
              {coin.change7d}%
            </Num>
            {coin.change30d !== undefined && (
              <>
                <span> · </span>
                30d{' '}
                <Num color="var(--text-secondary)">
                  {coin.change30d >= 0 ? '+' : ''}
                  {coin.change30d}%
                </Num>
              </>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          <SignalBadge verdict={coin.verdict} size="lg" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: regime.color,
                }}
              />
              <span style={{ color: regime.color, fontWeight: 600 }}>{regime.name}</span>
            </span>
            <span style={{ color: 'var(--text-muted)' }}>· confidence {coin.confidence}</span>
          </div>
        </div>
      </div>

      {/* The 4-layer breakdown */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <Eyebrow>How the model decided — 4 weighted layers</Eyebrow>
          {regime.code !== 'NORMAL' && <Eyebrow color={regime.color}>regime weights applied</Eyebrow>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {LAYER_ORDER.map((k) => (
            <LayerCell
              key={k}
              layer={layers[k]}
              score01={coin.layers[k]}
              weight={layers[k].weight}
              regimeWeight={regime.weights[k]}
              level={level}
            />
          ))}
        </div>
      </div>

      {/* Why-this-verdict explainer — beginner only */}
      {level === 'beginner' && (
        <Explainer kind="info" lead={`Why ${coin.verdict}:`}>
          On-chain (35% weight) reads strongest at {(coin.layers.onchain * 5 + 5).toFixed(1)} —
          exchange outflows + active address growth confirm accumulation. Technical at{' '}
          {(coin.layers.technical * 5 + 5).toFixed(1)} is aligned. Sentiment is the weakest at{' '}
          {(coin.layers.sentiment * 5 + 5).toFixed(1)} — funding has been positive, so size accordingly.
        </Explainer>
      )}
      {level === 'advanced' && (
        <div
          style={{
            padding: '14px 16px',
            background: 'var(--bg-2)',
            borderRadius: 'var(--r-md)',
            border: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
          }}
        >
          <div>
            <Eyebrow style={{ marginBottom: 4 }}>Raw composite</Eyebrow>
            <Num size={14} weight={600}>{coin.score.toFixed(3)}</Num>
          </div>
          <div>
            <Eyebrow style={{ marginBottom: 4 }}>Verdict threshold</Eyebrow>
            <Num size={14}>±0.30</Num>
          </div>
          <div>
            <Eyebrow style={{ marginBottom: 4 }}>Regime override</Eyebrow>
            <Num size={14} color={regime.color}>{regime.code}</Num>
          </div>
          <div>
            <Eyebrow style={{ marginBottom: 4 }}>In-state bars</Eyebrow>
            <Num size={14}>{coin.regimeBars ?? '—'}</Num>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompositeSignalHero;
