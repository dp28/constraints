import {Problem} from '../../constraints/index';
import {parseConstraints} from './constraint-parser';
import {parseDecisionVariables} from './variable-parser';

export function parseProblem(problem: Problem): string {
  return [
    parseDecisionVariables(problem),
    parseConstraints(problem.constraints),
    `solve satisfy;`,
    defineOutput(Object.keys(problem.decisionVariables))
  ].join(`\n\n`);
}

function defineOutput(variableNames: Array<string>): string {
  const variableOutputs = variableNames
    .map(name =>`"  \\"${name}\\": ", show(${name})`)
    .join(`, ",\\n",\n`);
  return `output ["{\\n", ${variableOutputs}, "\\n}"];`
}
