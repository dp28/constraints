import {Variable}  from './variable';
import {Predicate} from './predicate';

export interface Constraint<T> {
  predicate: Predicate<T>;
  variables: Array<Variable<T>>;
}

export function buildConstraint<T>(predicate: Predicate<T>): (...vars: Array<Variable<T>>) => Constraint<T> {
  return (...variables) => ({ predicate, variables });
}
