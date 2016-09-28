import {Variable, VariableReference, toVariableReference}  from './variable';
import {Predicate} from './predicate';

export interface Constraint {
  predicate: Predicate;
  variableReferences: Array<VariableReference>;
}

export function buildConstraint(predicate: Predicate): (...vars: Array<Variable>) => Constraint {
  return (...variables) => (
    { predicate, variableReferences: variables.map(toVariableReference) }
  );
}
