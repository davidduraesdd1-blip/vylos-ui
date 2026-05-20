// polaris-ui/src/data/categories.ts
// Asset-category palette + plain-English labels.
// Used in DEFI / Tokenization donut, scatter, bar charts + Edge wallet allocation.

export type CategoryKey =
  | 'treasuries'
  | 'credit'
  | 'realestate'
  | 'commodities'
  | 'infrastructure'
  | 'defi'
  | 'equities'
  | 'tokeq'
  | 'carbon'
  | 'tradefin';

export interface Category {
  color: string;
  label: string;
  short: string;
  examples: string;
}

export const CATEGORIES: Record<CategoryKey, Category> = {
  treasuries:     { color: 'var(--cat-treasuries)',     label: 'Treasuries',         short: 'TBills',  examples: 'OUSG, mTBILL, BUIDL, BENJI' },
  credit:         { color: 'var(--cat-credit)',         label: 'Private Credit',     short: 'Credit',  examples: 'Maple, Centrifuge, Goldfinch, Clearpool' },
  realestate:     { color: 'var(--cat-realestate)',     label: 'Real Estate',        short: 'R/E',     examples: 'RealT, Lofty, Parcl' },
  commodities:    { color: 'var(--cat-commodities)',    label: 'Commodities',        short: 'Comm.',   examples: 'PAXG, XAUT, BACKED_OIL' },
  infrastructure: { color: 'var(--cat-infrastructure)', label: 'Infrastructure',     short: 'Infra',   examples: 'EnergyFi solar, infra debt funds' },
  defi:           { color: 'var(--cat-defi)',           label: 'DeFi Yield',         short: 'DeFi',    examples: 'Pendle, Morpho, Virtuals' },
  equities:       { color: 'var(--cat-equities)',       label: 'Equities',           short: 'Equity',  examples: 'gTrade, Synthetix Kwenta' },
  tokeq:          { color: 'var(--cat-tokeq)',          label: 'Tokenized Equities', short: 'TokEq',   examples: 'Backed bCSPX, NASDAQ pilots' },
  carbon:         { color: 'var(--cat-carbon)',         label: 'Voluntary Carbon',   short: 'Carbon',  examples: 'KlimaDAO, Toucan, Moss' },
  tradefin:       { color: 'var(--cat-tradefin)',       label: 'Trade Finance',      short: 'Trade',   examples: 'Credix, Centrifuge invoices' },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  'treasuries', 'credit', 'realestate', 'commodities', 'infrastructure',
  'defi', 'equities', 'tokeq', 'carbon', 'tradefin',
];
