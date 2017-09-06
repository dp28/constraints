import {Range} from './range';

export type VariableId = string;
export type VariableReference = VariableId | VariableRelation;
export type Variable = DecisionVariable | VariableReference;

export interface DecisionVariable {
  id: VariableId;
  range: Range;
  value?: number;
}

export interface VariableRelation {
  operation: string;
  variableReferences: Array<VariableReference>;
}

export function combine(operation: string): (...variables: Array<Variable>) => VariableRelation {
  return (...variables) => (
    { operation, variableReferences: variables.map(toVariableReference) }
  );
}

export const add      = combine(`add`);
export const subtract = combine(`subtract`);
export const multiply = combine(`multiply`);
export const divide   = combine(`divide`);

export function sum(variables: Array<Variable>): VariableRelation {
  return add(...variables);
}

export function buildDecisionVariable(
  id: string,
  range: Range,
  value?: number
): DecisionVariable {
  return { id, range, value };
}

export function toVariableReference(variable: Variable): VariableReference {
  return isDecisionVariable(variable) ? variable.id : variable;
}

function isDecisionVariable(variable: Variable): variable is DecisionVariable {
  return (<DecisionVariable>variable).id !== undefined;
}

export function isVariableId(variable: Variable): variable is VariableId {
  return typeof variable === `string`;
}
