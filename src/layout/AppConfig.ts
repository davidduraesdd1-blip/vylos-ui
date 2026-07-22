// polaris-ui/src/layout/AppConfig.ts
// Per-app navigation, accent, and data-attribute config.
// Single source of truth for what appears in the sidebar for each VYLOS app.

export type AppKey = 'edge' | 'defi' | 'tokenization' | 'advisor';
export type DataAppAttr =
  | 'polaris-edge'
  | 'polaris-defi'
  | 'polaris-tokenization'
  | 'etf-advisor-platform';

export interface NavItem {
  id: string;
  label: string;
  glyph: string;
  /** Optional route href; if absent, sidebar emits onNav callback only. */
  href?: string;
}

export interface AppConfig {
  name: string;
  subtitle: string;
  accent: string;
  dataAttr: DataAppAttr;
  nav: NavItem[];
}

export const APP_CONFIG: Record<AppKey, AppConfig> = {
  edge: {
    name: 'Edge',
    subtitle: 'Crypto signal intelligence',
    accent: '#22d36f',
    dataAttr: 'polaris-edge',
    nav: [
      { id: 'home',       label: 'Markets',      glyph: 'home' },
      { id: 'signals',    label: 'Signals',      glyph: 'signal' },
      { id: 'regimes',    label: 'Regimes',      glyph: 'chart-line' },
      { id: 'backtester', label: 'Backtester',   glyph: 'cube' },
      { id: 'onchain',    label: 'On-chain',     glyph: 'globe' },
      { id: 'wallet',     label: 'Wallet',       glyph: 'wallet' },
      { id: 'alerts',     label: 'Alerts',       glyph: 'bell' },
      { id: 'ai',         label: 'AI Assistant', glyph: 'sparkle' },
      { id: 'settings',   label: 'Settings',     glyph: 'gear' },
    ],
  },
  defi: {
    name: 'DEFI',
    subtitle: 'Yield · protocol intel.',
    accent: '#1d4ed8',
    dataAttr: 'polaris-defi',
    nav: [
      { id: 'home',       label: 'Dashboard',    glyph: 'home' },
      { id: 'portfolio',  label: 'Portfolio',    glyph: 'wallet' },
      { id: 'opps',       label: 'Opportunities', glyph: 'signal' },
      { id: 'planning',   label: 'Planning',     glyph: 'chart-line' },
      { id: 'market',     label: 'Market intel', glyph: 'globe' },
      { id: 'agent',      label: 'Agent',        glyph: 'sparkle' },
      { id: 'settings',   label: 'Settings',     glyph: 'gear' },
    ],
  },
  tokenization: {
    name: 'Tokenization',
    subtitle: 'Real-world asset intelligence',
    accent: '#d4a54c',
    dataAttr: 'polaris-tokenization',
    nav: [
      { id: 'home',       label: 'Portfolio',     glyph: 'home' },
      { id: 'risk',       label: 'Risk',          glyph: 'chart-line' },
      { id: 'holdings',   label: 'Holdings',      glyph: 'cube' },
      { id: 'simulate',   label: 'Forward sim',   glyph: 'sparkle' },
      { id: 'market',     label: 'RWA market',    glyph: 'globe' },
      { id: 'alerts',     label: 'Alerts',        glyph: 'bell' },
      { id: 'settings',   label: 'Settings',      glyph: 'gear' },
    ],
  },
  advisor: {
    name: 'Advisor',
    subtitle: 'Crypto ETF advisor platform',
    accent: '#0fa68a',
    dataAttr: 'etf-advisor-platform',
    nav: [
      { id: 'home',       label: 'Dashboard',     glyph: 'home' },
      { id: 'portfolio',  label: 'Portfolio',     glyph: 'wallet' },
      { id: 'etfdetail',  label: 'ETF detail',    glyph: 'chart-line' },
      { id: 'methodology', label: 'Methodology',  glyph: 'book' },
      { id: 'settings',   label: 'Settings',      glyph: 'gear' },
    ],
  },
};

export const APP_ORDER: AppKey[] = ['edge', 'defi', 'tokenization', 'advisor'];
