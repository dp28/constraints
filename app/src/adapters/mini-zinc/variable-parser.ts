import {DecisionVariable, Problem, Range} from '../../constraints/index';

export function parseDecisionVariables(problem: Problem): string {
  return Object
    .keys(problem.decisionVariables)
    .map(variableName => parseVariable(variableName, problem))
    .join(`\n`);
}

function parseVariable(variableName: string, problem: Problem): string {
  const variable = problem.decisionVariables[variableName];
  const range = problem.ranges[variable.rangeId];
  const value = variable.value ? ` = ${variable.value}` : ``;
  return `var ${parseRange(range)}: ${variableName}${value};`;
}

function parseRange(range: Range): string {
  return `${range.min}..${range.max + 1}`;
}
