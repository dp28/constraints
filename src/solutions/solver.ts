import { Problem, Solution } from '../constraints';
import * as minizinc from '../adapters/mini-zinc';

export function solve(problem: Problem, solver = minizinc.solve): Promise<Solution> {
  return solver(problem);
}
