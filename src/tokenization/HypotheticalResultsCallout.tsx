// polaris-ui/src/tokenization/HypotheticalResultsCallout.tsx
// SEC Marketing Rule compliance disclaimer — standalone reusable version of the
// inline Explainer kind="sec" pattern from the design.

import * as React from 'react';
import { Explainer } from '../primitives/Explainer';

export interface HypotheticalResultsCalloutProps {
  /** Optional methodology URL. */
  methodologyHref?: string;
  /** Optional override for benchmark description. */
  benchmark?: string;
}

export function HypotheticalResultsCallout({
  methodologyHref = '#',
  benchmark = '60/40 blended index (60% S&P 500, 40% Bloomberg Agg)',
}: HypotheticalResultsCalloutProps) {
  return (
    <Explainer kind="sec" lead="Hypothetical results.">
      Past performance is not indicative of future results. Benchmark: {benchmark}. Multiple time
      horizons (1Y / 3Y / 5Y / since inception) and max drawdown shown alongside per SEC Marketing Rule.{' '}
      <a
        href={methodologyHref}
        style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
      >
        Methodology →
      </a>
    </Explainer>
  );
}

export default HypotheticalResultsCallout;
