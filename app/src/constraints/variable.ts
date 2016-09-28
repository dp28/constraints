import {Domain} from "./domain";

export type Variable = DecisionVariable | VariableRelation

export interface DecisionVariable {
  id: string;
  domain: Domain;
  value?: number;
}

export interface VariableRelation {
  operation: string;
  variables: Array<Variable>;
}

export function combine(operation: string): (...variables: Array<Variable>) => VariableRelation {
  return (...variables) => ({ operation, variables });
}

export const add      = combine(`add`);
export const subtract = combine(`subtract`);
export const multiply = combine(`multiply`);
export const divide   = combine(`divide`);

export function define(id: string, domain: Domain, value?: number): DecisionVariable {
  return { id, domain, value };
}

export function declare<T>(id: string, domain: Domain): DecisionVariable {
  return { id, domain };
}
