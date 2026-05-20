// polaris-ui/src/advisor/PerfTable.tsx
// ETF performance table with Historical / Forward-projection tabs.
// Ports the design's PerfTable from advisor/app.jsx — driven by ETF_PERF,
// with a static-blend benchmark footnote and a Monte Carlo forward tab.

'use client';

import * as React from 'react';
import { Card } from '../primitives/Card';
import { Num } from '../primitives/Num';
import { ETF_PERF, TEAL } from './fixtures';
import { ForwardProjection } from './ForwardProjection';
import type { ReaderLevelKey } from '../data/glossary';

export interface PerfTableProps {
  level?: ReaderLevelKey;
}

type Tab = 'hist' | 'fwd';

const GRID = '1fr 90px 110px 90px 90px 90px 110px 90px';

function pct(v: number | string, signed = false): string {
  if (typeof v !== 'number') return v;
  const sign = signed && v > 0 ? '+' : '';
  return `${sign}${v.toFixed(2)}%`;
}

export function PerfTable({ level }: PerfTableProps) {
  const [tab, setTab] = React.useState<Tab>('hist');
  void level; // reserved for future level-gated columns
  return (
    <Card pad={0}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ font: '500 18px/1.2 var(--font-ui)', margin: 0, color: 'var(--text-primary)' }}>
          Performance
        </h3>
        <p
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            margin: '6px 0 0',
            fontFamily: 'var(--font-mono)',
          }}
        >
          1Y/3Y/5Y historical from yfinance (live fallback chain) + 10k-path forward projection.
        </p>
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            gap: 4,
            borderBottom: '1px solid var(--border)',
            marginBottom: -1,
          }}
        >
          {([
            { id: 'hist', label: 'Historical' },
            { id: 'fwd', label: 'Forward projection (Monte Carlo)' },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${tab === t.id ? TEAL : 'transparent'}`,
                color: tab === t.id ? TEAL : 'var(--text-secondary)',
                font: '500 13px/1 var(--font-ui)',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'hist' ? (
        <div>
          <div
            style={{
              padding: '14px 18px',
              display: 'grid',
              gridTemplateColumns: GRID,
              gap: 12,
              fontSize: 10,
              color: 'var(--text-muted)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-eyebrow)',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div>Ticker</div>
            <div>Source</div>
            <div>Inception</div>
            <div style={{ textAlign: 'right' }}>1Y %</div>
            <div style={{ textAlign: 'right' }}>3Y %</div>
            <div style={{ textAlign: 'right' }}>5Y %</div>
            <div style={{ textAlign: 'right' }}>since-incept %</div>
            <div style={{ textAlign: 'right' }}>max DD %</div>
          </div>
          {ETF_PERF.map((p) => {
            const isBench = p.ticker.startsWith('Bench');
            return (
              <div
                key={p.ticker}
                style={{
                  padding: '12px 18px',
                  display: 'grid',
                  gridTemplateColumns: GRID,
                  gap: 12,
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 12.5,
                }}
              >
                <Num
                  size={12}
                  weight={isBench ? 400 : 600}
                  color={isBench ? 'var(--text-secondary)' : 'var(--text-primary)'}
                >
                  {p.ticker}
                </Num>
                <Num size={11} color="var(--text-muted)">{p.source}</Num>
                <Num size={11} color="var(--text-muted)">{p.inception}</Num>
                <Num
                  size={12}
                  color={
                    typeof p.y1 === 'number' && p.y1 < 0
                      ? 'var(--danger)'
                      : typeof p.y1 === 'number'
                        ? 'var(--success)'
                        : 'var(--text-muted)'
                  }
                  style={{ textAlign: 'right' }}
                >
                  {pct(p.y1, true)}
                </Num>
                <Num size={11.5} color="var(--text-muted)" style={{ textAlign: 'right' }}>
                  {pct(p.y3, true)}
                </Num>
                <Num size={11.5} color="var(--text-muted)" style={{ textAlign: 'right' }}>
                  {p.y5}
                </Num>
                <Num
                  size={12}
                  color={
                    typeof p.inc === 'number' && p.inc >= 0 ? 'var(--success)' : 'var(--danger)'
                  }
                  style={{ textAlign: 'right' }}
                >
                  {pct(p.inc, true)}
                </Num>
                <Num size={12} color="var(--danger)" style={{ textAlign: 'right' }}>
                  {pct(p.mdd)}
                </Num>
              </div>
            );
          })}
          <div style={{ padding: '12px 18px', fontSize: 11.5, color: 'var(--text-muted)' }}>
            Benchmark: static-weight blend (no daily rebalancing). Methodology page documents the
            simplification.
          </div>
        </div>
      ) : (
        <div style={{ padding: '18px 24px' }}>
          <ForwardProjection embedded />
        </div>
      )}
    </Card>
  );
}

export default PerfTable;
