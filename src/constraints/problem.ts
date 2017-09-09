import {Constraint} from './constraint';
import {VariableDeclaration, buildDecisionVariable} from './variable';
import {Range, buildRange} from './range';
import {range} from '../utils/range';

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

function indexById(variables: Array<VariableDeclaration>): { [id: string]: VariableDeclaration } {
  const result: { [id: string]: VariableDeclaration } = {};
  return variables.reduce((result, variable) => {
    result[variable.id] = variable;
    return result;
  }, result);
}

export function ProblemBuilder() {
  const variables: { [variableId: string]: VariableDeclaration } = {};
  const constraints: Array<Constraint> = [];

  function addVariable(variable: VariableDeclaration): VariableDeclaration {
    variables[variable.id] = variable;
    return variable;
  }

  return {
    toProblem(): Problem {
      return { variables, constraints };
    },

    defineVariable(id: string, range: Range): VariableDeclaration {
      return addVariable(buildDecisionVariable(id, range));
    },

    defineVariables(idPrefix: string, rangeRef: Range, num: number): Array<VariableDeclaration> {
      return range(0, num).map(i => addVariable(buildDecisionVariable(`${idPrefix}_${i}`, rangeRef)));
    },

    addConstraint(constraint: Constraint): void {
      constraints.push(constraint);
    }
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
