import { Problem } from 'json-constraints';
import * as minizinc from './adapters/mini-zinc';

export interface Solution {
  [variableId: string]: number;
}

export function solve(problem: Problem, solver = minizinc.solve): Promise<Solution | null> {
  return solver(problem);
}
