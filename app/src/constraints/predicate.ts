export interface Predicate {
  property: string;
}

export function buildPredicate(property: string): Predicate {
  return { property };
}
