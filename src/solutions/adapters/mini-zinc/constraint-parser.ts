import {
  Constraint,
  BooleanPredicate,
  isBooleanPredicate,
  IntegerPredicate,
  isVariableId,
  VariableReference,
  VariableRelation
} from '../../../constraints';

export function parseConstraints(constraints: Array<Constraint>): string {
  return constraints.map(parseFullConstraint).join(`\n`);
}

const parseIntComparisonOperator = fetch<string>({
  equal:              `=`,
  notEqual:           `!=`,
  lessThan:           `<`,
  lessThanOrEqual:    `<=`,
  greaterThan:        `>`,
  greaterThanOrEqual: `>=`
}, `Unknown integer comparison type`);

const parseBoolComparisonOperator = fetch<string>({
  and: `/\\`,
  or:  `\\/`,
  not: `not`,
}, `Unknown boolean comparison type`);

const parseOperatorType = fetch<string>({
  add:      `+`,
  subtract: `-`,
  multiply: `*`,
  divide:   `/`
}, `Unknown operator type`);

function parseFullConstraint(constraint: Constraint): string {
  const body = parseConstraintClause(constraint);
  return `constraint ${body};`;
}

function parseConstraintClause(constraint: Constraint): string {
  if (isBooleanPredicate(constraint))
    return parseBoolPredicate(constraint);
  else
    return parseIntPredicate(constraint);
}

function parseBoolPredicate(predicate: BooleanPredicate): string {
  const operator = parseBoolComparisonOperator(predicate.operator);
  const join = isUnary(operator) ? joinUnaryOperator(operator) : joinNonUnaryOperator(operator);

  const clauses = predicate
    .predicates
    .map(parseConstraintClause)
    .map(surround(`(`, `)`));
  return join(clauses);
}

function isUnary(operator: string): boolean {
  return operator === `not`;
}

function joinUnaryOperator(operator: string): (clauses: Array<string>) => string {
  return clauses => `${operator} ${clauses[0]}`;
}

function joinNonUnaryOperator(operator: string): (clauses: Array<string>) => string {
  return clauses => clauses.join(operator);
}

function parseIntPredicate(predicate: IntegerPredicate): string {
  return predicate
    .variableReferences
    .map(parseVariableReference)
    .join(parseIntComparisonOperator(predicate.operator));
}

function parseVariableReference(variable: VariableReference): string {
  return isVariableId(variable) ? variable : parseVariableRelation(variable);
}

function parseVariableRelation(variableRelation: VariableRelation): string {
  const variables = variableRelation.variableReferences.map(parseVariableReference);
  return `(${variables.join(parseOperatorType(variableRelation.operation))})`;
}

function fetch<T>(map: { [key: string]: T }, errorMessage: string): (key: string) => T {
  return key => {
    const value = map[key];
    if (value)
      return value;
    else
      throw Error(`${errorMessage}: ${key}`);
  };

}

function surround(prefix: string, suffix: string): (value: string) => string {
  return value => prefix + value + suffix;
}
