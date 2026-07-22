// polaris-ui/src/defi/pools.ts
// Sample pool fixtures + market cycle for VYLOS Yield Dashboard.

import type { Pool, MarketCycle } from './types';
import type { DataSource } from '../primitives/DataSourceStrip';

export const POOLS: Pool[] = [
  { id: 'flr-usdc-spark', name: 'FLR-USDC LP',   protocol: 'SparkDEX',  protocolColor: '#1d4ed8', apy: 14.5, tvl: '$4.2M',  base: 8.0, inc: 4.5, fee: 2.0, sustainability: 'base-yield',  chain: 'Flare' },
  { id: 'eth-usdc-uni',   name: 'ETH-USDC LP',   protocol: 'Uniswap',   protocolColor: '#ff007a', apy: 9.5,  tvl: '$12.5M', base: 5.0, inc: 3.0, fee: 1.5, sustainability: 'sustainable', chain: 'Ethereum' },
  { id: 'wbtc-usdc-curve',name: 'WBTC-USDC LP',  protocol: 'Curve',     protocolColor: '#3b82f6', apy: 7.7,  tvl: '$8.3M',  base: 4.0, inc: 2.5, fee: 1.2, sustainability: 'base-yield',  chain: 'Ethereum' },
  { id: 'wsteth-eth-lido',name: 'wstETH-ETH LP', protocol: 'Lido',      protocolColor: '#00a3ff', apy: 4.8,  tvl: '$24.1M', base: 4.5, inc: 0.0, fee: 0.3, sustainability: 'pure-base',   chain: 'Ethereum' },
  { id: 'sol-usdc-orca',  name: 'SOL-USDC LP',   protocol: 'Orca',      protocolColor: '#9945ff', apy: 11.2, tvl: '$5.8M',  base: 6.5, inc: 3.0, fee: 1.7, sustainability: 'sustainable', chain: 'Solana' },
  { id: 'usdc-aave',      name: 'USDC supply',   protocol: 'Aave v3',   protocolColor: '#b6509e', apy: 4.2,  tvl: '$642M',  base: 4.2, inc: 0.0, fee: 0.0, sustainability: 'pure-base',   chain: 'Ethereum' },
];

export const CYCLE: MarketCycle = {
  value: 50,
  label: 'Neutral',
  rationale: 'Balanced conditions — hold existing positions, favor base-yield strategies.',
};

export const DEFI_SOURCES: DataSource[] = [
  { id: 'defillama', label: 'DeFiLlama',  status: 'live', detail: 'TVL feed' },
  { id: 'aave',      label: 'Aave',       status: 'live', detail: 'lending rates' },
  { id: 'uniswap',   label: 'Uniswap',    status: 'live', detail: 'pool data' },
  { id: 'spark',     label: 'SparkDEX',   status: 'live', detail: 'Flare pools' },
  { id: 'pyth',      label: 'Pyth',       status: 'live', detail: 'oracle px' },
  { id: 'glassnode', label: 'Glassnode',  status: 'cached', detail: '1h cache' },
];
