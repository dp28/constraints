import {DecisionVariable, Problem, Domain} from '../../constraints/index';

export function parseDecisionVariables(problem: Problem): string {
  return Object
    .keys(problem.decisionVariables)
    .map(variableName => parseVariable(variableName, problem))
    .join(`\n`);
}

function parseVariable(variableName: string, problem: Problem): string {
  const variable = problem.decisionVariables[variableName];
  const domain = problem.domains[variable.domainId];
  const value = variable.value ? ` = ${variable.value}` : ``;
  return `var ${parseDomain(domain)}: ${variableName}${value};`;
}

function parseDomain(domain: Domain): string {
  return `${domain.values[0]}..${domain.values[domain.values.length - 1]}`;
}
