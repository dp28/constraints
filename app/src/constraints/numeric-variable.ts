import {DecisionVariable, combine, buildDecisionVariable} from './variable';

export interface NumericDecisionVariable extends DecisionVariable<number> {}

export const add      = combine<number>(`add`);
export const subtract = combine<number>(`subtract`);
export const multiply = combine<number>(`multiply`);
export const divide   = combine<number>(`divide`);
