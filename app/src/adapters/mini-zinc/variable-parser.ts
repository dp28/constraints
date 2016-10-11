import {DecisionVariable, DecisionVariableDeclarations, Range} from '../../constraints/index';

export function parseDecisionVariables(decisionVariables: DecisionVariableDeclarations): string {
  return Object
    .keys(decisionVariables)
    .map(variableName => parseVariable(decisionVariables[variableName]))
    .join(`\n`);
}

function parseVariable(variable: DecisionVariable): string {
  const value = variable.value ? ` = ${variable.value}` : ``;
  return `var ${parseRange(variable.range)}: ${variable.id}${value};`;
}

function parseRange(range: Range): string {
  return `${range.min}..${range.max + 1}`;
}
