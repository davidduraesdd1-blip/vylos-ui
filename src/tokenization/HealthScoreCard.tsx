// polaris-ui/src/tokenization/HealthScoreCard.tsx
// Letter-grade health score with sub-component breakdown.

import * as React from 'react';
import { Num } from '../primitives/Num';
import { Eyebrow } from '../primitives/Eyebrow';
import { Card } from '../primitives/Card';
import { GOLD } from './fixtures';
import type { HealthComponent } from './types';

export interface HealthScoreCardProps {
  score: number;
  grade: string;
  components: HealthComponent[];
}

export function HealthScoreCard({ score, grade, components }: HealthScoreCardProps) {
  const gradeColor =
    score >= 80 ? 'var(--success)' :
    score >= 60 ? 'var(--accent)' :
    score >= 40 ? 'var(--warning)' : 'var(--danger)';
  return (
    <Card pad={24}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 'var(--r-md)',
            background: `linear-gradient(135deg, ${gradeColor}, color-mix(in srgb, ${gradeColor} 60%, var(--bg-3)))`,
            color: 'var(--bg-0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 36px/1 var(--font-ui)',
            letterSpacing: '-0.02em',
            flexShrink: 0,
          }}
        >
          {grade}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Eyebrow style={{ marginBottom: 4 }}>Portfolio health score</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <Num size={32} weight={600}>{score}</Num>
            <Num size={16} color="var(--text-muted)">/ 100</Num>
          </div>
          <div
            style={{
              height: 4,
              background: 'var(--bg-3)',
              borderRadius: 2,
              marginTop: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${score}%`,
                height: '100%',
                background: gradeColor,
                transition: 'width 800ms var(--ease-data)',
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: `repeat(${components.length}, 1fr)`, gap: 12 }}>
        {components.map((c) => (
          <div key={c.k}>
            <Eyebrow style={{ marginBottom: 4 }}>{c.k}</Eyebrow>
            <Num size={14} weight={600}>
              {c.v.toFixed(1)}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/{c.max}</span>
            </Num>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default HealthScoreCard;
