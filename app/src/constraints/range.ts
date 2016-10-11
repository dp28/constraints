export interface Range {
  min: number;
  max: number;
}

export function buildRange(min: number, max: number): Range {
  return { min, max };
}
