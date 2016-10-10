import {Constraint, Predicate, isVariableId, VariableReference, VariableRelation} from '../../constraints/index';

export function parseConstraints(constraints: Array<Constraint>): string {
  return constraints.map(parseConstraint).join(`\n`);
}

const parsePredicate = fetch<string>({
  equal:              `=`,
  notEqual:           `!=`,
  lessThan:           `<`,
  lessThanOrEqual:    `<=`,
  greaterThan:        `>`,
  greaterThanOrEqual: `>=`
}, `Unknown predicate type`);

const parseOperatorType = fetch<string>({
  add:      `+`,
  subtract: `-`,
  multiply: `*`,
  divide:   `/`
}, `Unknown operator type`);

function parseConstraint(constraint: Constraint): string {
  const variables = constraint.variableReferences.map(parseVariableReference);
  const body = variables.join(parsePredicate(constraint.predicate.property));
  return `constraint ${body};`;
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
