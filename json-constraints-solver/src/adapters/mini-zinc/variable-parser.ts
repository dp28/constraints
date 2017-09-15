import {
  VariableDeclaration,
  VariableDeclarations,
  Constant,
  DecisionVariable,
  isConstant,
  Range,
  buildRange
} from 'json-constraints';

export function parseVariables(variables: VariableDeclarations): string {
  return Object
    .keys(variables)
    .map(variableName => parseVariable(variables[variableName]))
    .join(`\n`);
}

function parseVariable(variable: VariableDeclaration): string {
  return isConstant(variable) ? parseConstant(variable) : parseDecisionVariable(variable);
}

function parseConstant({ id, value }: Constant): string {
  const range = parseRange(buildRange(value, value))
    return `var ${range}: ${id} = ${value};`
}

function parseDecisionVariable(variable: DecisionVariable) {
  return `var ${parseRange(variable.range)}: ${variable.id};`;
}

function parseRange(range: Range): string {
  return `${range.min}..${range.max + 1}`;
}
