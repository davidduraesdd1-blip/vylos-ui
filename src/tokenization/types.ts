// polaris-ui/src/tokenization/types.ts

import type { CategoryKey } from '../data/categories';

export interface AllocationEntry {
  cat: CategoryKey;
  pct: number;
  value: string;
  label: string;
}

export interface Holding {
  name: string;
  cat: CategoryKey;
  apy: number;
  value: string;
  issuer: string;
}

export type IssuerRating = 'moderate' | 'elevated' | 'concentrated';

export interface Issuer {
  name: string;
  cat: CategoryKey;
  pct: number;
  rating: IssuerRating | string;
  flag?: boolean;
}

export type RiskTone = 'success' | 'gold' | 'danger';

export interface RiskMetric {
  k: string;
  v: string;
  rating: string;
  tone: RiskTone;
}

export interface RiskTier {
  n: number;
  name: string;
  ret: string;
  dd: string;
  desc: string;
  current?: boolean;
}

export interface RwaMarket {
  onchain: string;
  tam: string;
  pct: number;
  projection: string;
  target: number;
}

export interface HealthComponent {
  k: string;
  v: number;
  max: number;
}
