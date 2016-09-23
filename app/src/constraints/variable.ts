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

export function define<T>(id: string, value: T): DecisionVariable<T> {
  return { id, value };
}

export function declare<T>(id: string): DecisionVariable<T> {
  return { id };
}
