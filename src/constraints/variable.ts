import {Range} from './range';

export type VariableId = string;
export type VariableDeclaration = Constant | DecisionVariable;
export type VariableReference = VariableId | VariableRelation;
export type Variable = VariableDeclaration | VariableReference;

export interface Constant {
  id: VariableId;
  value: number;
}

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

export function buildConstant(id: string, value: number) {
  return { id, value };
}

export function buildDecisionVariable(
  id: string,
  range: Range,
  value?: number
): DecisionVariable {
  return { id, range, value };
}

export function toVariableReference(variable: Variable): VariableReference {
  return isVariableDeclaration(variable) ? variable.id : variable;
}

function isVariableDeclaration(variable: Variable): variable is VariableDeclaration {
  return (<DecisionVariable>variable).id !== undefined;
}

export function isConstant(variable: VariableDeclaration): variable is Constant {
  return (<Constant>variable).value !== undefined;
}

export function isVariableId(variable: Variable): variable is VariableId {
  return typeof variable === `string`;
}
