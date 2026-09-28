// vylos-ui/src/compliance/SECDisclaimer.tsx
// SEC Marketing Rule (Rule 206(4)-1) disclosure for hypothetical / backtest /
// forward-yield displays. REQUIRES a named benchmark, multiple horizons, and a
// methodology link (max drawdown recommended). Missing a required prop renders a
// loud <MissingDisclosure> + console.error so under-disclosed displays fail visibly.
import * as React from 'react';
import { MissingDisclosure } from './MissingDisclosure';

export type SECDisclaimerKind = 'hypothetical' | 'yield' | 'backtest' | 'compact';

export interface SECDisclaimerProps {
  kind: SECDisclaimerKind;
  benchmark: string;
  horizons: string[];
  maxDD?: string;
  methodologyHref: string;
  lead?: React.ReactNode;
}

const HEAD: Record<SECDisclaimerKind, string> = {
  hypothetical: 'Hypothetical performance',
  yield: 'Yield disclosure',
  backtest: 'Backtest disclosure',
  compact: 'Disclosure',
};
const BODY: Record<SECDisclaimerKind, string> = {
  hypothetical: 'Projected / hypothetical results do not reflect actual trading and are not a guarantee of future performance.',
  yield: 'Displayed yields include variable incentive components that can change or decay; they are not guaranteed.',
  backtest: 'Backtested results are hypothetical, computed with hindsight, and do not reflect actual trading or fees beyond those stated.',
  compact: 'Hypothetical — not a guarantee of future results.',
};

export function SECDisclaimer({ kind, benchmark, horizons, maxDD, methodologyHref, lead }: SECDisclaimerProps) {
  const missing: string[] = [];
  if (!benchmark) missing.push('benchmark');
  if (!horizons || horizons.length === 0) missing.push('horizons');
  if (!methodologyHref) missing.push('methodologyHref');
  if (missing.length > 0) {
    if (typeof console !== 'undefined') console.error('[SECDisclaimer] missing required prop(s):', missing.join(', '));
    return <MissingDisclosure missing={missing} />;
  }
  const compact = kind === 'compact';
  return (
    <div
      role="note"
      aria-label="Regulatory disclosure"
      style={{
        padding: compact ? '8px 12px' : '12px 16px',
        background: 'color-mix(in srgb, var(--info) 5%, var(--bg-2))',
        borderLeft: '2px solid var(--info)',
        borderRadius: 'var(--r-sm)',
        fontSize: compact ? 11 : 12,
        lineHeight: 1.55,
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <div style={{ color: 'var(--info)', fontWeight: 600, marginBottom: 4 }}>{lead || HEAD[kind]}</div>
      <div style={{ marginBottom: 6 }}>{BODY[kind]}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 14px', fontFamily: 'var(--font-mono)', fontSize: compact ? 10.5 : 11 }}>
        <span>Benchmark: {benchmark}</span>
        <span>Horizons: {horizons.join(' · ')}</span>
        {maxDD ? <span>Max drawdown: {maxDD}</span> : null}
      </div>
      <a href={methodologyHref} style={{ display: 'inline-block', marginTop: 6, color: 'var(--accent)', textDecoration: 'none', fontSize: compact ? 11 : 12 }}>
        Methodology &rarr;
      </a>
    </div>
  );
}
export default SECDisclaimer;
