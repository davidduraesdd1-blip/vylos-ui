// polaris-ui/src/hooks/useRelativeTime.ts
// T14: re-renders every 60s and returns a human relative-time string for a Date.
// Returns '' for undefined input so callers can use it unconditionally (hooks rule).

import * as React from 'react';

export function useRelativeTime(date?: Date | null): string {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    if (!date) return;
    const id = setInterval(() => force((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, [date]);
  if (!date) return '';
  const diffMs = Date.now() - date.getTime();
  const sec = Math.max(0, Math.round(diffMs / 1000));
  if (sec < 45) return 'just now';
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  return date.toLocaleDateString();
}

export default useRelativeTime;
