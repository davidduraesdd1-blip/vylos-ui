// vylos-ui/src/mobile/MobileShell.tsx
// Composition of the mobile shell — Phase 1 of the Claude Design mobile
// handoff. Wires GlassHeader + scrolling content + TabBar + MoreSheet:
//   * pads content by --header-clearance (or the segmented variant),
//   * flips the header's scrolled hairline from real scroll position,
//   * reserves tab-bar height + safe-area at the bottom,
//   * opens the More sheet when the tab with id `moreTabId` is selected.
// The ≤900px breakpoint decision belongs to the consuming app (it renders
// this shell instead of its desktop shell); the shell itself is untinted —
// accent comes from the app's data-app attribute per tokens.css.

import * as React from 'react';
import { GlassHeader, type GlassHeaderProps } from './GlassHeader';
import { TabBar, type TabItem } from './TabBar';
import { MoreSheet, type MoreEntry } from './MoreSheet';

export interface MobileShellProps {
  header: Omit<GlassHeaderProps, 'scrolled'>;
  tabs: TabItem[];
  activeTabId: string;
  onTabSelect?: (id: string) => void;
  /** The tab id that opens the More sheet instead of navigating. */
  moreTabId?: string;
  moreEntries?: MoreEntry[];
  onMoreSelect?: (id: string) => void;
  largeText?: boolean;
  children: React.ReactNode;
}

export function MobileShell({
  header,
  tabs,
  activeTabId,
  onTabSelect,
  moreTabId = 'more',
  moreEntries = [],
  onMoreSelect,
  largeText = false,
  children,
}: MobileShellProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clearance = header.segmented
    ? 'var(--header-clearance-seg)'
    : 'var(--header-clearance)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }}>
      <GlassHeader {...header} scrolled={scrolled} />
      <main
        style={{
          paddingTop: clearance,
          paddingLeft: 'var(--m-gutter)',
          paddingRight: 'var(--m-gutter)',
          paddingBottom: `calc(${largeText ? 'var(--tab-h-lg)' : 'var(--tab-h)'} + env(safe-area-inset-bottom, 0px) + 24px)`,
        }}
      >
        {children}
      </main>
      <TabBar
        items={tabs}
        activeId={moreOpen ? moreTabId : activeTabId}
        largeText={largeText}
        onSelect={(id) => {
          if (id === moreTabId) {
            setMoreOpen(true);
            return;
          }
          onTabSelect?.(id);
        }}
      />
      <MoreSheet
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        entries={moreEntries}
        onSelect={(id) => {
          setMoreOpen(false);
          onMoreSelect?.(id);
        }}
      />
    </div>
  );
}

export default MobileShell;
