export interface Predicate<T> {
  property: string;
}

export function buildPredicate<T>(property: string): Predicate<T> {
  return { property };
}
