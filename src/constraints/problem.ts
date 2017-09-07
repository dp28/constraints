import {Constraint} from './constraint';
import {DecisionVariable, buildDecisionVariable} from './variable';
import {Range, buildRange} from './range';
import {range} from '../utils/range';

export interface DecisionVariableDeclarations {
  [variableId: string]: DecisionVariable;
}

export interface RangeDeclarations {
  [rangeId: string]: Range;
}

export interface Problem {
  decisionVariables: DecisionVariableDeclarations;
  constraints: Array<Constraint>;
}

export function buildProblem(
  variables: Array<DecisionVariable>,
  constraints: Array<Constraint>): Problem {
  return {
    decisionVariables: indexById(variables),
    constraints
  }
}

function indexById(variables: Array<DecisionVariable>): { [id: string]: DecisionVariable } {
  const result: { [id: string]: DecisionVariable } = {};
  return variables.reduce((result, variable) => {
    result[variable.id] = variable;
    return result;
  }, result);
}

export function ProblemBuilder() {
  const decisionVariables: { [variableId: string]: DecisionVariable } = {};
  const constraints: Array<Constraint> = [];

  function addVariable(variable: DecisionVariable): DecisionVariable {
    decisionVariables[variable.id] = variable;
    return variable;
  }

  return {
    toProblem(): Problem {
      return { decisionVariables, constraints };
    },

    defineVariable(id: string, range: Range): DecisionVariable {
      return addVariable(buildDecisionVariable(id, range));
    },

    defineVariables(idPrefix: string, rangeRef: Range, num: number): Array<DecisionVariable> {
      return range(0, num).map(i => addVariable(buildDecisionVariable(`${idPrefix}_${i}`, rangeRef)));
    },

    addConstraint(constraint: Constraint): void {
      constraints.push(constraint);
    }
  };
}

export function combineProblems(problems: Array<Problem>): Problem {
  return {
    decisionVariables: assign(problems.map(problem => problem.decisionVariables)),
    constraints: concat(problems.map(problem => problem.constraints))
  };
}

function assign(objects: Array<DecisionVariableDeclarations>): DecisionVariableDeclarations {
  const result: DecisionVariableDeclarations = {};
  return objects.reduce((result, object) => {
    Object.keys(object).forEach(key => result[key] = object[key]);
    return result;
  }, result);
}

function concat<T>(arrays: Array<Array<T>>): Array<T> {
  return arrays.reduce(((all, constraints) => all.concat(constraints)));
}
