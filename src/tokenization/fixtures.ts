// polaris-ui/src/tokenization/fixtures.ts
// Sample RWA portfolio fixtures matching Polaris Tokenization screens.

import type { AllocationEntry, Holding, Issuer, RiskMetric, RiskTier, RwaMarket } from './types';
import type { DataSource } from '../primitives/DataSourceStrip';

export const ALLOC: AllocationEntry[] = [
  { cat: 'treasuries',     pct: 42, value: '$4.20M', label: 'Treasuries' },
  { cat: 'credit',         pct: 25, value: '$2.50M', label: 'Private Credit' },
  { cat: 'realestate',     pct: 18, value: '$1.80M', label: 'Real Estate' },
  { cat: 'commodities',    pct: 10, value: '$1.00M', label: 'Commodities' },
  { cat: 'equities',       pct:  5, value: '$0.50M', label: 'Equities' },
];

export const HOLDINGS: Holding[] = [
  { name: 'Pendle Boros — Leveraged Fixed-Rate', cat: 'defi',         apy: 28.0, value: '$425k', issuer: 'Pendle' },
  { name: 'Morpho MetaMorpho Curated Vaults',     cat: 'defi',         apy: 18.0, value: '$310k', issuer: 'Morpho' },
  { name: 'Virtuals — AI Agent Tokenization',     cat: 'defi',         apy: 18.0, value: '$220k', issuer: 'Virtuals' },
  { name: 'Apollo ACRED — Tokenized Credit Fund', cat: 'credit',       apy: 17.5, value: '$850k', issuer: 'Apollo' },
  { name: 'Gains gTrade — Tokenized Equities',    cat: 'equities',     apy: 15.0, value: '$180k', issuer: 'Gains' },
  { name: 'Credix Trade Finance Pools',           cat: 'tradefin',     apy: 14.0, value: '$220k', issuer: 'Credix' },
  { name: 'Parcl — Real Estate Index',            cat: 'realestate',   apy: 12.0, value: '$520k', issuer: 'Parcl' },
  { name: 'Synthetix Kwenta — Synthetic Stocks',  cat: 'equities',     apy: 12.0, value: '$140k', issuer: 'Synthetix' },
  { name: 'Ondo Global Markets — Tok. Stocks',    cat: 'tokeq',        apy: 12.0, value: '$180k', issuer: 'Ondo' },
  { name: 'Clearpool Prime — Inst. Credit',       cat: 'credit',       apy: 11.0, value: '$580k', issuer: 'Clearpool' },
  { name: 'Huma Finance PayFi',                   cat: 'tradefin',     apy: 10.5, value: '$220k', issuer: 'Huma' },
  { name: 'Ondo Short-Term US Gov.',              cat: 'treasuries',   apy:  4.5, value: '$1.20M', issuer: 'Ondo' },
  { name: 'Midas mTBILL — Tokenized US T-bills',  cat: 'treasuries',   apy:  4.5, value: '$680k', issuer: 'Midas' },
  { name: 'OpenEden T-Bill Vault',                cat: 'treasuries',   apy:  4.5, value: '$520k', issuer: 'OpenEden' },
  { name: 'PAX Gold (PAXG)',                      cat: 'commodities',  apy:  0.0, value: '$1.00M', issuer: 'Paxos' },
];

export const ISSUERS: Issuer[] = [
  { name: 'Ondo Finance',  cat: 'treasuries', pct: 22, rating: 'concentrated', flag: true  },
  { name: 'Apollo',        cat: 'credit',     pct: 17, rating: 'elevated',     flag: false },
  { name: 'Clearpool',     cat: 'credit',     pct: 12, rating: 'moderate',     flag: false },
  { name: 'Paxos',         cat: 'commodities',pct: 10, rating: 'moderate',     flag: false },
  { name: 'Pendle',        cat: 'defi',       pct:  9, rating: 'moderate',     flag: false },
];

export const RISK_METRICS: RiskMetric[] = [
  { k: 'Sharpe',        v: '1.89',  rating: 'excellent',         tone: 'success' },
  { k: 'Sortino',       v: '2.45',  rating: 'excellent',         tone: 'success' },
  { k: 'Calmar',        v: '0.92',  rating: 'decent',            tone: 'warning' },
  { k: 'VaR 95%',       v: '−2.4%', rating: 'low loss exposure', tone: 'success' },
  { k: 'CVaR 95%',      v: '−3.8%', rating: 'low loss exposure', tone: 'success' },
  { k: 'Max drawdown',  v: '−8.7%', rating: 'moderate exposure', tone: 'warning' },
];

export const RISK_TIERS: RiskTier[] = [
  { n: 1, name: 'Ultra Conservative', ret: '4.8%',  dd: '−1.0%',  desc: '80%+ Treasuries / IG. Quarterly rebalance.' },
  { n: 2, name: 'Conservative',       ret: '7.0%',  dd: '−5.0%',  desc: '60% Treasuries + 20% IG credit + 20% diversified.' },
  { n: 3, name: 'Moderate',           ret: '11.0%', dd: '−15.0%', desc: 'Balanced across categories. Bi-monthly rebalance.', current: true },
  { n: 4, name: 'Aggressive',         ret: '16.5%', dd: '−25.0%', desc: 'Credit-heavy. Meaningful real estate allocation.' },
  { n: 5, name: 'Ultra Aggressive',   ret: '22.5%', dd: '−40.0%', desc: 'Max diversification incl. private credit + emerging mkts.' },
];

export const RWA_MARKET: RwaMarket = {
  onchain: '$29.5B',
  tam: '$360B',
  pct: 8.19,
  projection: '$16T by 2030',
  target: 0.18,
};

export const TOK_SOURCES: DataSource[] = [
  { id: 'rwa',       label: 'RWA.xyz',    status: 'live',   detail: 'sector data' },
  { id: 'defillama', label: 'DeFiLlama',  status: 'live',   detail: 'protocol TVL' },
  { id: 'ondo',      label: 'Ondo',       status: 'live',   detail: 'OUSG/USDY' },
  { id: 'apollo',    label: 'Apollo',     status: 'live',   detail: 'ACRED' },
  { id: 'fred',      label: 'FRED',       status: 'live',   detail: 'yield curve' },
  { id: 'chainlink', label: 'Chainlink',  status: 'cached', detail: '15m cache' },
];

export const GOLD = '#d4a54c';
