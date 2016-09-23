import {Variable}  from './variable';
import {Predicate} from './predicate';

export interface Constraint {
  predicate: Predicate;
  variables: Array<Variable>;
}

export function buildConstraint(predicate: Predicate): (...vars: Array<Variable>) => Constraint {
  return (...variables) => ({ predicate, variables });
}
