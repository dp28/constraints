import {Variable, VariableReference, toVariableReference}  from './variable';

export interface IntegerPredicate {
  operator: string;
  variableReferences: Array<VariableReference>;
}

export interface BooleanPredicate {
  operator: string;
  predicates: Array<Predicate>;
}

export type Predicate = BooleanPredicate | IntegerPredicate;

export type Constraint = Predicate;

export function isBooleanPredicate(predicate: Predicate): predicate is BooleanPredicate {
  return Boolean((<BooleanPredicate>predicate).predicates);
}

function buildIntegerPredicate(operator: string): (...vars: Array<Variable>) => Predicate {
  return (...variables) => (
    { operator, variableReferences: variables.map(toVariableReference) }
  );
}

function buildBooleanPredicate(operator: string): (...predicates: Array<Predicate>) => Predicate {
  return (...predicates) => ({ operator, predicates });
}

export const mustBeEqual              = buildIntegerPredicate(`equal`);
export const mustNotBeEqual           = buildIntegerPredicate(`notEqual`);
export const mustBeLessThan           = buildIntegerPredicate(`lessThan`);
export const mustBeLessThanOrEqual    = buildIntegerPredicate(`lessThanOrEqual`);
export const mustBeGreaterThan        = buildIntegerPredicate(`greaterThan`);
export const mustBeGreaterThanOrEqual = buildIntegerPredicate(`greaterThanOrEqual`);

export const and = buildBooleanPredicate(`and`);
export const or  = buildBooleanPredicate(`or`);
export const not = buildBooleanPredicate(`not`);
