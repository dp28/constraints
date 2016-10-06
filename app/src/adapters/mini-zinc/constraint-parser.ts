import {Constraint, Predicate, isVariableId, VariableReference, VariableRelation} from '../../constraints/index';

export function parseConstraints(constraints: Array<Constraint>): string {
  return constraints.map(parseConstraint).join(`\n`);
}

function parseConstraint(constraint: Constraint): string {
  const variables = constraint.variableReferences.map(parseVariableReference);
  const body = variables.join(parsePredicate(constraint.predicate));
  return `constraint ${body};`
}

function parsePredicate(predicate: Predicate): string {
  switch (predicate.property) {
    case `equal`:              return ` = `;
    case `notEqual`:           return ` != `;
    case `lessThan`:           return ` < `;
    case `lessThanOrEqual`:    return ` <= `;
    case `greaterThan`:        return ` > `;
    case `greaterThanOrEqual`: return ` >= `;
    default:                   throw Error(`Unknown predicate ${predicate.property}`);
  }
}

function parseVariableReference(variable: VariableReference): string {
  return isVariableId(variable) ? variable : parseVariableRelation(variable);
}

function parseVariableRelation(variableRelation: VariableRelation): string {
  const variables = variableRelation.variableReferences.map(parseVariableReference);
  return `(${variables.join(parseOperatorType(variableRelation.operation))})`
}

function parseOperatorType(operationType: string): string {
  switch (operationType) {
    case `add`:      return ` + `;
    case `subtract`: return ` - `;
    case `multiply`: return ` * `;
    case `divide`:   return ` / `;
    default:         throw Error(`Unknown operator ype ${operationType}`);
  }
}
