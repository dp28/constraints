export interface Range {
  min: number;
  max: number;
}

export function buildRange(min: number, max: number): Range {
  return { min, max };
}

export function isWithinRange(value: number, { min, max }: Range): boolean {
  return value >= min && value <= max && Number.isInteger(value); 
}
