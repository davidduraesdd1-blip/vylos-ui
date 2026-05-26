// polaris-ui/src/advisor/fixtures.ts
// Sample advisor fixtures — CLIENTS, TIERS, BASKET, ETF_PERF, ADV_SOURCES.

import type { AdvisorClient, AdvisorTier, BasketHolding, EtfPerformance } from './types';
import type { DataSource } from '../primitives/DataSourceStrip';

export const TEAL = 'var(--accent)'; // A1: theme-driven accent (was #0fa68a)

export const CLIENTS: AdvisorClient[] = [
  { id: 'beatrice', name: 'Beatrice Chen',      persona: 'Retired, risk-averse', aum: '$37,500',  tier: 1, sharpe: 0.02, ytd: '+5.1%',  mdd: '+15.0%',  flag: null,         ceiling: '5%',  advisor: 'D. Duraes' },
  { id: 'acme',     name: 'Acme Family Office', persona: 'Multi-gen wealth',     aum: '$24.8M',   tier: 3, sharpe: 1.62, ytd: '+8.2%',  mdd: '−12.4%',  flag: 'rebalance',  ceiling: '20%', advisor: 'D. Duraes' },
  { id: 'north',    name: 'Northbridge Trust',  persona: 'Endowment',            aum: '$48.1M',   tier: 2, sharpe: 1.42, ytd: '+5.6%',  mdd: '−8.2%',   flag: null,         ceiling: '10%', advisor: 'D. Duraes' },
  { id: 'light',    name: 'Lighthouse Capital', persona: 'Growth-oriented',      aum: '$12.2M',   tier: 4, sharpe: 1.85, ytd: '+14.4%', mdd: '−22.1%',  flag: null,         ceiling: '40%', advisor: 'S. Mendes' },
  { id: 'beacon',   name: 'Beacon Wealth',      persona: 'Balanced',             aum: '$18.5M',   tier: 3, sharpe: 1.68, ytd: '+8.9%',  mdd: '−14.5%',  flag: 'rebalance',  ceiling: '20%', advisor: 'S. Mendes' },
];

export const TIERS: AdvisorTier[] = [
  { n: 1, name: 'Ultra Conservative', ceiling: '5%',  ddCap: 15, ret1y: '+5.1%',  sharpe3y: '0.02', cadence: 'Quarterly' },
  { n: 2, name: 'Conservative',       ceiling: '10%', ddCap: 18, ret1y: '+7.2%',  sharpe3y: '0.48', cadence: 'Quarterly' },
  { n: 3, name: 'Moderate',           ceiling: '20%', ddCap: 22, ret1y: '+11.0%', sharpe3y: '0.92', cadence: 'Bi-monthly' },
  { n: 4, name: 'Aggressive',         ceiling: '40%', ddCap: 30, ret1y: '+16.5%', sharpe3y: '1.18', cadence: 'Monthly' },
  { n: 5, name: 'Ultra Aggressive',   ceiling: '70%', ddCap: 50, ret1y: '+22.5%', sharpe3y: '1.42', cadence: 'Monthly' },
];

export const BASKET: BasketHolding[] = [
  { ticker: 'BTC',  name: 'Grayscale Bitcoin Mini Trust',                                issuer: 'Grayscale',          category: 'btc_spot',            weight: 20.00, usd: '$7,500', sigma: 51.8, corr: 1.00, color: '#3b6bf0' },
  { ticker: 'EZBC', name: 'Franklin Bitcoin ETF',                                        issuer: 'Franklin Templeton', category: 'btc_spot',            weight: 20.00, usd: '$7,500', sigma: 51.8, corr: 1.00, color: '#1d4ed8' },
  { ticker: 'BITB', name: 'Bitwise Bitcoin ETF',                                         issuer: 'Bitwise',            category: 'btc_spot',            weight: 20.00, usd: '$7,500', sigma: 51.7, corr: 1.00, color: '#f9a8d4' },
  { ticker: 'CBTJ', name: 'Calamos Bitcoin 90% Structured Alt Protection ETF — January', issuer: 'Calamos',            category: 'defined_outcome',     weight:  8.33, usd: '$3,125', sigma: 26.8, corr: 0.92, color: '#ef4444' },
  { ticker: 'QBJA', name: 'Innovator Equity Defined Protection ETF — Bitcoin April',     issuer: 'Innovator',          category: 'defined_outcome',     weight:  8.33, usd: '$3,125', sigma: 20.0, corr: 0.55, color: '#22c55e' },
  { ticker: 'CBXJ', name: 'Calamos Bitcoin 80% Structured Alt Protection ETF — January', issuer: 'Calamos',            category: 'defined_outcome',     weight:  8.33, usd: '$3,125', sigma: 16.9, corr: 0.87, color: TEAL    },
  { ticker: 'CEPI', name: 'REX Crypto Equity Premium Income ETF',                        issuer: 'REX Shares',         category: 'income_covered_call', weight:  5.00, usd: '$1,875', sigma: 34.1, corr: 0.73, color: '#fb923c' },
  { ticker: 'YBTC', name: 'Roundhill Bitcoin Covered Call Strategy ETF',                 issuer: 'Roundhill',          category: 'income_covered_call', weight:  5.00, usd: '$1,875', sigma: 48.0, corr: 0.92, color: '#a78bfa' },
  { ticker: 'IMST', name: 'Bitwise MSTR Option Income ETF',                              issuer: 'Bitwise',            category: 'income_covered_call', weight:  5.00, usd: '$1,875', sigma: 67.9, corr: 0.86, color: '#f59e0b' },
];

export const ETF_PERF: EtfPerformance[] = [
  { ticker: 'BTC',  source: 'yfinance', inception: '2024-07-31', y1: -23.57, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: 11.16,  mdd: -49.34 },
  { ticker: 'EZBC', source: 'yfinance', inception: '2024-01-11', y1: -23.66, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: 25.11,  mdd: -49.37 },
  { ticker: 'BITB', source: 'yfinance', inception: '2024-01-11', y1: -23.59, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: 24.86,  mdd: -49.38 },
  { ticker: 'CBTJ', source: 'yfinance', inception: '2025-02-04', y1: -21.23, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: -14.47, mdd: -38.29 },
  { ticker: 'QBJA', source: 'unavail',  inception: '—',           y1: 'N/A',  y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: '—',    mdd: '—' },
  { ticker: 'CBXJ', source: 'yfinance', inception: '2025-02-04', y1: -14.28, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: -9.31,  mdd: -27.61 },
  { ticker: 'CEPI', source: 'yfinance', inception: '2024-12-04', y1: 33.04,  y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: 11.25,  mdd: -29.48 },
  { ticker: 'YBTC', source: 'yfinance', inception: '2024-01-18', y1: -19.59, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: 15.38,  mdd: -47.09 },
  { ticker: 'IMST', source: 'yfinance', inception: '2025-04-03', y1: -52.70, y3: 'N/A (<3Y hist)', y5: 'N/A (<5Y hist)', inc: -34.92, mdd: -69.86 },
  { ticker: 'Benchmark 80/40+BTC', source: 'blended', inception: '—', y1: 9.95, y3: 55.61, y5: 'N/A (<5Y hist)', inc: 11.61, mdd: -27.33 },
];

export const ADV_SOURCES: DataSource[] = [
  { id: 'sec',  label: 'SEC EDGAR · N-PORT', status: 'live',   detail: 'composition' },
  { id: 'yf',   label: 'yfinance',           status: 'live',   detail: 'price + hist' },
  { id: 'sig',  label: 'Composite signal',   status: 'live',   detail: 'per-ETF' },
  { id: 'news', label: 'News',               status: 'cached', detail: '15m cache' },
  { id: 'brok', label: 'Broker',             status: 'live',   detail: 'mock · paper' },
];
