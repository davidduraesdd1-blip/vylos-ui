// polaris-ui/src/edge/MarketsHome.tsx
// Top-level "Markets" screen for VYLOS Signal.
// Composes shared primitives + Edge components into the showpiece page.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Explainer } from '../primitives/Explainer';
import { DataSourceStrip } from '../primitives/DataSourceStrip';
import type { DataSource } from '../primitives/DataSourceStrip';
import { CompositeSignalHero } from './CompositeSignalHero';
import { RegimeBanner } from './RegimeBanner';
import { CoinRow } from './CoinRow';
import { MarketContextStrip } from './MarketContextStrip';
import type { Coin, MarketContext } from './types';
import type { Regime, RegimeKey, LayerKey } from '../data/regime';
import type { Layer } from '../data/layers';
import type { ReaderLevelKey } from '../data/glossary';

const LAYER_ORDER: LayerKey[] = ['technical', 'macro', 'sentiment', 'onchain'];

export interface MarketsHomeProps {
  coins: Coin[];
  regime: Regime;
  regimes: Record<RegimeKey, Regime>;
  layers: Record<LayerKey, Layer>;
  ctx: MarketContext;
  sources: DataSource[];
  level?: ReaderLevelKey;
  focused: Coin;
  onCoinTap?: (c: Coin) => void;
}

export function MarketsHome({
  coins,
  regime,
  regimes,
  layers,
  ctx,
  sources,
  level = 'beginner',
  focused,
  onCoinTap,
}: MarketsHomeProps) {
  return (
    <div style={{ padding: '24px 32px 80px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <div>
          <Eyebrow style={{ marginBottom: 8 }}>{`Markets · ${coins.length} pairs tracked`}</Eyebrow>
          <h1
            style={{
              font: '600 32px/1.1 var(--font-ui)',
              letterSpacing: '-0.022em',
              margin: 0,
              color: 'var(--text-primary)',
            }}
          >
            Market home
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              margin: '6px 0 0',
              maxWidth: 640,
            }}
          >
            A quick read on every coin we track — verdict, regime state, and where we are in the cycle.
            The model never guarantees a profit.
          </p>
        </div>
      </div>

      <DataSourceStrip sources={sources} />
      <RegimeBanner regime={regime} level={level} />
      <MarketContextStrip ctx={ctx} />
      <CompositeSignalHero coin={focused} regime={regime} layers={layers} level={level} />

      {/* Markets list */}
      <div style={{ marginTop: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <Eyebrow>All pairs · click any row to drill in</Eyebrow>
          <Num size={11} color="var(--text-muted)">sorted by confidence</Num>
        </div>

        {/* Table header */}
        <div
          style={{
            padding: '10px 18px',
            display: 'grid',
            gridTemplateColumns: '70px minmax(110px, 1.2fr) 90px 90px minmax(80px, 1fr) 90px 24px',
            gap: 14,
            alignItems: 'center',
            color: 'var(--text-muted)',
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 'var(--tracking-eyebrow)',
            textTransform: 'uppercase',
          }}
        >
          <div>Pair</div>
          <div>Price</div>
          <div>24h</div>
          <div>7d</div>
          <div>Regime</div>
          <div>Verdict</div>
          <div />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {coins.map((c) => (
            <CoinRow key={c.symbol} coin={c} regimes={regimes} onTap={() => onCoinTap?.(c)} />
          ))}
        </div>
      </div>

      {/* Composite layer-mix card (intermediate + advanced) */}
      {level !== 'beginner' && (
        <div
          style={{
            marginTop: 16,
            padding: 20,
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-lg)',
          }}
        >
          <Eyebrow style={{ marginBottom: 12 }}>Composite weights · normal regime baseline</Eyebrow>
          <div
            style={{
              display: 'flex',
              height: 10,
              borderRadius: 5,
              overflow: 'hidden',
              background: 'var(--bg-2)',
            }}
          >
            {LAYER_ORDER.map((k) => (
              <div
                key={k}
                style={{
                  width: `${layers[k].weight * 100}%`,
                  background: layers[k].color,
                  opacity: 0.85,
                }}
                title={`${layers[k].label} ${(layers[k].weight * 100).toFixed(0)}%`}
              />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 10,
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
            }}
          >
            {LAYER_ORDER.map((k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: layers[k].color,
                  }}
                />
                {layers[k].label} <Num color="var(--text-primary)">{(layers[k].weight * 100).toFixed(0)}%</Num>
              </span>
            ))}
          </div>
          <Explainer kind="info" lead="Override:" size="sm">
            <span style={{ color: 'var(--text-secondary)' }}>
              The current regime (<b style={{ color: regime.color }}>{regime.name}</b>) overrides the
              baseline. Active weights right now: TA {(regime.weights.technical * 100).toFixed(0)} · Macro{' '}
              {(regime.weights.macro * 100).toFixed(0)} · Sentiment{' '}
              {(regime.weights.sentiment * 100).toFixed(0)} · On-chain{' '}
              {(regime.weights.onchain * 100).toFixed(0)}.
            </span>
          </Explainer>
        </div>
      )}
    </div>
  );
}

export default MarketsHome;
