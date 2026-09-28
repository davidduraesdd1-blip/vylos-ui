// vylos-ui/src/compliance/MissingDisclosure.tsx
// Dev-visible guard rendered when a SECDisclaimer is missing a required prop, so an
// under-disclosed hypothetical-performance display fails loudly instead of silently.
import * as React from 'react';

export interface MissingDisclosureProps { missing: string[]; }

export function MissingDisclosure({ missing }: MissingDisclosureProps) {
  return (
    <div
      role="alert"
      style={{
        padding: '12px 16px',
        background: 'color-mix(in srgb, var(--danger) 10%, var(--bg-2))',
        border: '1px dashed var(--danger)',
        borderRadius: 'var(--r-sm)',
        fontSize: 12,
        lineHeight: 1.5,
        color: 'var(--danger)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      &#9888; Disclosure incomplete &mdash; missing required {missing.join(', ')}. SEC Marketing Rule requires a named benchmark, multiple horizons, and a methodology link on hypothetical-performance displays.
    </div>
  );
}
export default MissingDisclosure;
