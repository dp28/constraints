import {promisify} from 'bluebird';

import {Problem, Solution} from '../../constraints/index';
import {parseConstraints} from './constraint-parser';
import {parseDecisionVariables} from './variable-parser';
import {solve as solveMinizinc} from 'minizinc-solver';

export function solve(problem: Problem): PromiseLike<Solution> {
  return promisify(solveMinizinc)(parseProblem(problem)).then(JSON.parse);
}

export function parseProblem(problem: Problem): string {
  return [
    parseDecisionVariables(problem.decisionVariables),
    parseConstraints(problem.constraints),
    `solve satisfy;`,
    defineOutput(Object.keys(problem.decisionVariables))
  ].join(`\n\n`);
}

function defineOutput(variableNames: Array<string>): string {
  const variableOutputs = variableNames
    .map(name => `"  \\"${name}\\": ", show(${name})`)
    .join(`, ",\\n",\n`);
  return `output ["{\\n", ${variableOutputs}, "\\n}"];`;
}
