export type Variable<T> = DecisionVariable<T> | VariableRelation<T>

export interface DecisionVariable<T> {
  value?: T;
  id: string;
}

export interface VariableRelation<T> {
  operation: string;
  variables: Array<Variable<T>>;
}

export function combine<T>(operation: string): (...variables: Array<Variable<T>>) => VariableRelation<T> {
  return (...variables) => ({ operation, variables });
}

let nextId = 1;

export function buildDecisionVariable<T>(value?: T, prefix?: string): DecisionVariable<T> {
  prefix = prefix ? prefix : `v`;
  return { id: `${prefix}_${nextId++}`, value };
}
