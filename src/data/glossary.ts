// polaris-ui/src/data/glossary.ts
// 30 plain-English crypto/DeFi terms × 3 depths.
// Ported verbatim from polaris-edge/glossary.py — single source of truth.

export type ReaderLevelKey = 'beginner' | 'intermediate' | 'advanced';

export interface GlossaryEntry {
  beginner: string;
  intermediate: string;
  advanced: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  "APY": {
    beginner: "APY (Annual Percentage Yield) — the total return you earn in one year, including compounding. 10% APY on $1,000 = $100 earned in a year.",
    intermediate: "APY — annualised yield including compound interest. Higher than APR because it includes reinvested returns.",
    advanced: "APY — effective annual rate accounting for compounding frequency: APY = (1 + r/n)^n − 1. Distinguish from APR (simple) and real yield (fee revenue only)."
  },
  "TVL": {
    beginner: "TVL (Total Value Locked) — the total amount of money deposited in a DeFi protocol. Higher TVL = more people trust and use it.",
    intermediate: "TVL — aggregate USD value of assets deposited in a protocol's smart contracts. Proxy for protocol adoption and liquidity depth.",
    advanced: "TVL — sum of all on-chain assets under a protocol's control. Subject to double-counting across bridges/wrappers. Use DeFiLlama's deduplicated figures."
  },
  "Liquidity Pool": {
    beginner: "A pool of two tokens that people deposit so others can trade between them. You earn a fee every time someone swaps.",
    intermediate: "A smart-contract-held reserve of two assets enabling AMM trading. LPs earn swap fees proportional to their share.",
    advanced: "AMM liquidity pool: reserves X and Y maintain invariant (e.g. x·y = k for Uniswap v2). Fee tier, tick range (v3), and correlation affect LP profitability."
  },
  "Impermanent Loss": {
    beginner: "When you deposit two tokens and one price changes a lot, you end up with less value than if you'd just held them. 'Impermanent' because it reverses if prices return.",
    intermediate: "Divergence loss vs holding: IL = 2·√P / (1 + P) − 1, where P is the price ratio. Always ≤ 0; worst at extremes. Trading fees offset when volume is high enough.",
    advanced: "IL = 2√(P_ratio) / (1 + P_ratio) − 1. Amplified in concentrated liquidity (v3). Delta-hedge via perps or options to reduce. Compare to fee APY to judge net return."
  },
  "Yield Farming": {
    beginner: "Depositing your tokens into DeFi protocols to earn extra rewards — usually in the form of the protocol's own token on top of normal interest.",
    intermediate: "Providing liquidity or staking to earn protocol token emissions in addition to base fees. Total return = base APY + emission APY.",
    advanced: "Incentive-driven LP: emission APY dilutes over time as TVL grows or emissions decay. Model sustainability via real yield ratio (fee revenue / total emissions)."
  },
  "AMM": {
    beginner: "AMM (Automated Market Maker) — a robot that sets prices automatically based on a formula, so you can trade without a human counterpart.",
    intermediate: "AMM — smart contract that prices assets via a mathematical curve (e.g. x·y=k, StableSwap). No order book needed.",
    advanced: "AMM variants: constant-product (Uniswap v2), concentrated liquidity (v3), stableswap (Curve), hybrid (Balancer). Each has different IL profile and capital efficiency."
  },
  "Smart Contract": {
    beginner: "A computer program that lives on the blockchain and runs automatically. Once deployed, no one can change or stop it.",
    intermediate: "Self-executing code stored on-chain. Deterministic, censorship-resistant. Risk: bugs are permanent and exploitable.",
    advanced: "EVM bytecode deployed at an address. Upgradeable via proxy patterns (Transparent, UUPS). Audit coverage, formal verification, and bug bounties reduce risk."
  },
  "DeFi": {
    beginner: "DeFi (Decentralised Finance) — banking and investing tools that run on blockchains instead of banks. Anyone can use them.",
    intermediate: "DeFi — financial protocols (lending, DEX, derivatives) built on smart contracts. Permissionless, composable, non-custodial.",
    advanced: "DeFi stack: base layer (L1/L2), AMM/DEX, lending, yield aggregators, structured products. Key risks: smart contract bugs, oracle manipulation, MEV."
  },
  "Gas Fee": {
    beginner: "A small fee paid to the network to process your transaction. Like a postage stamp.",
    intermediate: "Transaction cost in ETH (gwei) paid to validators. Varies with network congestion. EIP-1559: base fee + priority tip.",
    advanced: "Gas cost = gasUsed × (baseFee + priorityFee). baseFee burns ETH (deflationary). Optimise: batch txs, calldata compression, off-peak timing."
  },
  "Staking": {
    beginner: "Locking up your tokens to help secure the network or earn rewards.",
    intermediate: "Locking tokens to participate in consensus (PoS) or earn protocol rewards. Validator staking, liquid staking (stETH), restaking (EigenLayer).",
    advanced: "Direct validator (32 ETH min), delegated, liquid (LST), restaking. Slashing risk, withdrawal queue delays, and LST depegging are key risks."
  },
  "DEX": {
    beginner: "DEX (Decentralised Exchange) — a place to swap tokens directly from your wallet, no custody handoff.",
    intermediate: "DEX — on-chain exchange using AMM or order-book mechanics. Non-custodial, permissionless.",
    advanced: "DEX types: AMM, CLOB (dYdX), RFQ (0x). MEV exposure via sandwich attacks; mitigate with slippage limits and private RPCs."
  },
  "CEX": {
    beginner: "CEX (Centralised Exchange) — a traditional exchange like Coinbase or Binance where you give custody of your tokens to the company.",
    intermediate: "CEX — custodial exchange with KYC, order books, and higher liquidity. Counterparty risk: exchange can freeze withdrawals or go insolvent.",
    advanced: "CEX risk: rehypothecation, opaque proof-of-reserves. Use PoR audits, cold wallet ratios, withdrawal monitoring as risk indicators."
  },
  "Collateral": {
    beginner: "Assets you deposit as a guarantee when borrowing. If your loan goes bad, the protocol takes your collateral.",
    intermediate: "Assets pledged to secure a loan. Collateralisation ratio determines borrowing capacity.",
    advanced: "LTV and liquidation threshold define collateral health. e-mode (Aave v3) allows higher LTV for correlated assets. Monitor health factor continuously."
  },
  "Liquidation": {
    beginner: "When your loan becomes too risky, the protocol automatically sells your collateral to pay it back. Avoid by keeping a buffer.",
    intermediate: "Forced repayment when health factor drops below 1. Liquidation bots buy collateral at a discount and repay debt.",
    advanced: "Liquidator repays up to 50% of debt and receives collateral + liquidation bonus. Flash loan liquidations are common. Health factor >1.5 recommended."
  },
  "Slippage": {
    beginner: "The difference between the price you expected and the price you actually got.",
    intermediate: "Price impact of a trade on an AMM. Set max slippage tolerance (e.g. 0.5%) to protect against unfavourable fills.",
    advanced: "Slippage = (executionPrice − spotPrice) / spotPrice. Function of trade size vs pool depth. Compare to price impact + MEV sandwich risk."
  },
  "Flash Loan": {
    beginner: "A special loan borrowed and repaid in the same transaction — only possible in DeFi.",
    intermediate: "Uncollateralised loan that must be repaid within the same transaction block. Used for arbitrage, collateral swaps, liquidations.",
    advanced: "Atomicity guarantees repayment: if sub-calls fail, entire tx reverts. Flash loan attacks exploit oracle price manipulation within the atomic window."
  },
  "Governance": {
    beginner: "How token holders vote to change the rules of a protocol — like shareholders voting on company decisions.",
    intermediate: "On-chain voting by token holders to change protocol parameters. Voter participation often low.",
    advanced: "Governance attack vectors: flash loan voting, token accumulation, Sybil attacks. DAO security: quorum, timelocks, multisig safeguards."
  },
  "Bridging": {
    beginner: "Moving tokens from one blockchain to another — like exchanging foreign currency.",
    intermediate: "Cross-chain asset transfer via lock-and-mint or liquidity-pool bridges. Bridge contracts are a major hack target.",
    advanced: "Architectures: lock-and-mint, liquidity pools (Hop, Across), optimistic, ZK-proof. Over $2B lost to bridge hacks."
  },
  "Layer 2": {
    beginner: "A faster, cheaper network built on top of Ethereum that uses Ethereum's security.",
    intermediate: "L2 — off-chain execution that settles to L1. Optimistic Rollups (7d fraud window), ZK Rollups (near-instant finality).",
    advanced: "Risk: sequencer centralisation, delayed withdrawal (Optimistic), validity proof soundness (ZK). DA: on-chain calldata vs off-chain (EigenDA, Celestia)."
  },
  "Tokenized Asset (RWA)": {
    beginner: "A real-world thing (bond, property) represented as a token on the blockchain so it can be traded or used in DeFi.",
    intermediate: "Real World Asset — on-chain representation of off-chain value. Bridges TradFi yield into DeFi.",
    advanced: "RWA protocols: Ondo, Centrifuge, Maple. Key risks: legal enforceability, redemption liquidity, counterparty credit."
  },
  "Market Cap": {
    beginner: "The total value of all tokens in circulation. Larger = bigger project (but not always safer).",
    intermediate: "Market cap = circulating supply × price. FDV uses max supply. Compare circulating/FDV ratio for dilution risk.",
    advanced: "vs realised cap (cost basis of all tokens): realised cap is more stable. MVRV = market cap / realised cap — signal for over/undervaluation."
  },
  "Funding Rate": {
    beginner: "A small recurring fee in futures. Positive = longs pay shorts (bullish crowd); negative = shorts pay longs (bearish crowd).",
    intermediate: "Perpetual futures funding: paid every 8 hours. Extreme positive = crowded long; negative = crowded short.",
    advanced: "Funding arb: long spot + short perp captures positive funding. Risk: spot liquidity, exchange counterparty, correlation breakdown."
  },
  "Open Interest": {
    beginner: "Total number of open futures contracts. High and rising = big moves possible.",
    intermediate: "Total USD value of all open futures positions. Rising OI + rising price = strong trend; falling = deleveraging.",
    advanced: "OI/market cap ratio normalises across assets. High OI + high funding = liquidation cascade risk. Pair with CVD and spot volume."
  },
  "Fear & Greed Index": {
    beginner: "A daily score from 0 to 100 showing how scared (0) or excited (100) the market is. Extreme fear can be a buy signal.",
    intermediate: "Composite sentiment score from volatility, momentum, social, BTC dominance. Contrarian use: buy extreme fear.",
    advanced: "Inputs: volatility 25%, momentum 25%, social 15%, BTC dominance 10%, trends 10%. Use 7d/30d smoothed for timing."
  },
  "RSI": {
    beginner: "RSI (Relative Strength Index) — a 0–100 score measuring if a token is overbought (>70) or oversold (<30).",
    intermediate: "RSI = 100 − 100/(1 + avg_gain/avg_loss) over 14 periods. Divergence with price is a reversal signal.",
    advanced: "Divergence (price new high, RSI not) is a leading reversal. Hidden divergence signals trend continuation. Combine with volume."
  },
  "MACD": {
    beginner: "MACD shows momentum by comparing two moving averages. Fast crossing slow = often a buy signal.",
    intermediate: "MACD = EMA(12) − EMA(26). Signal = EMA(9) of MACD. Histogram = MACD − Signal. Crossover and divergence are key.",
    advanced: "Crossovers lag price. Use histogram slope changes for earlier signals. Divergence on daily/weekly is high-conviction."
  },
  "Sharpe Ratio": {
    beginner: "A score that measures how good a return is compared to how risky it was. Above 1.0 is good; above 2.0 is excellent.",
    intermediate: "Sharpe = (return − risk-free rate) / standard deviation. Higher = better risk-adjusted return.",
    advanced: "Annualised Sharpe = (mean_daily − Rf/252) / std_daily × √252. Assumes normal returns (problematic for crypto). Calmar often more relevant."
  },
  "Kelly Criterion": {
    beginner: "A math formula that tells you what percentage of your money to put into each trade.",
    intermediate: "Kelly fraction = (p × b − q) / b where p = win rate, b = win/loss ratio. Use 25–50% Kelly to reduce volatility.",
    advanced: "Full Kelly maximises geometric growth but causes extreme drawdowns. Half-Kelly halves DD while capturing ~75% of growth."
  },
  "MVRV Z-Score": {
    beginner: "A score that compares Bitcoin's current price to the average price everyone paid. Very high = overvalued; very low = undervalued.",
    intermediate: "MVRV = Market Cap / Realised Cap. Z-score standardises vs historical mean. >7 = historical sell zone; <0 = historical buy zone.",
    advanced: "MVRV Z = (market_cap − realised_cap) / std(market_cap). Realised cap tracks actual cost basis. ETF-era thresholds: 6/3.5 vs legacy 7/4."
  },
  "Support / Resistance": {
    beginner: "Support is a price floor where buying tends to appear; resistance is a ceiling where selling tends to appear.",
    intermediate: "Key levels from historical pivots, high-volume nodes (VPVR), round numbers, Fibonacci. Break of resistance = new support.",
    advanced: "Clusters from VPVR nodes, Fib 0.618/0.786, previous swing high/lows, on-chain cost basis distributions (UTXO realised price)."
  },
};

export function tooltip(term: string, level: ReaderLevelKey = 'beginner'): string {
  const entry = GLOSSARY[term];
  if (!entry) return term;
  return entry[level] || entry.beginner || term;
}
