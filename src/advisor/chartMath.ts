// vylos-ui/src/advisor/chartMath.ts
// Pure chart math for the Advisor charts (no React, no imports) so it can be
// unit-tested with `node --test` and so every caption the charts print is
// derived from the same numbers the code actually uses.

export type Point = [number, number];

/** Mulberry32: a tiny deterministic PRNG. Same seed -> same sequence. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Illustrative random-walk paths, each starting at 100. Seeded, so the same
 * (count, steps, seed) always yields the same paths (also on the server, so no
 * hydration mismatch). Every path is kept: there is no "retained" subset.
 */
export function generatePaths(count: number, steps: number, seed: number): Point[][] {
  const rand = mulberry32(seed);
  const arr: Point[][] = [];
  for (let i = 0; i < count; i++) {
    const pts: Point[] = [[0, 100]];
    let v = 100;
    for (let j = 1; j <= steps; j++) {
      v = v * (1 + (rand() - 0.4) * 0.18);
      pts.push([j, v]);
    }
    arr.push(pts);
  }
  return arr;
}

/** Step-by-step median across paths (paths must share the same x steps). */
export function medianPath(paths: Point[][]): Point[] {
  if (paths.length === 0) return [];
  const steps = paths[0].length;
  const out: Point[] = [];
  for (let j = 0; j < steps; j++) {
    const vals = paths.map((p) => p[j][1]).sort((a, b) => a - b);
    const mid = Math.floor(vals.length / 2);
    const m = vals.length % 2 ? vals[mid] : (vals[mid - 1] + vals[mid]) / 2;
    out.push([paths[0][j][0], m]);
  }
  return out;
}

/** The caption printed under the projection chart; it must match the inputs. */
export function projectionCaption(count: number, steps: number, seed: number): string {
  return `Illustrative only: ${count} random paths · ${steps} steps · seed ${seed} · not a forecast`;
}

export interface Box {
  x0: number;
  x1: number;
  y0: number; // top pixel
  y1: number; // bottom pixel
}

/**
 * Scale real (x, value) points into an SVG path inside `box`. Returns '' for
 * fewer than 2 points so callers render an empty state, never a fake line.
 */
export function linePath(points: Point[], box: Box): string {
  if (points.length < 2) return '';
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const sx = (x: number) => box.x0 + ((x - xMin) / (xMax - xMin || 1)) * (box.x1 - box.x0);
  const sy = (y: number) => box.y1 - ((y - yMin) / (yMax - yMin || 1)) * (box.y1 - box.y0);
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`)
    .join(' ');
}
