import { Constraint } from './constraint';
import { VariableDeclaration, buildDecisionVariable } from './variable';
import { Range, buildRange } from './range';
import { range } from '../utils/range';
import { indexById } from '../utils/object';

export interface VariableDeclarations {
  [variableId: string]: VariableDeclaration;
}

export interface RangeDeclarations {
  [rangeId: string]: Range;
}

export interface Problem {
  variables: VariableDeclarations;
  constraints: Array<Constraint>;
}

export function buildProblem(
  variables: Array<VariableDeclaration>,
  constraints: Array<Constraint>
): Problem {
  return {
    variables: indexById(variables),
    constraints
  };
}

export function combineProblems(problems: Array<Problem>): Problem {
  return {
    variables: assign(problems.map(problem => problem.variables)),
    constraints: concat(problems.map(problem => problem.constraints))
  };
}

function assign(objects: Array<VariableDeclarations>): VariableDeclarations {
  const result: VariableDeclarations = {};
  return objects.reduce((result, object) => {
    Object.keys(object).forEach(key => result[key] = object[key]);
    return result;
  }, result);
}

function concat<T>(arrays: Array<Array<T>>): Array<T> {
  return arrays.reduce(((all, constraints) => all.concat(constraints)));
}
