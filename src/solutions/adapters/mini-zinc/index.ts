import { Problem } from '../../../constraints';
import { Solution } from '../../solver';
import { parseConstraints } from './constraint-parser';
import { parseDecisionVariables } from './variable-parser';
import { solveWithTimeout } from 'minizinc-solver';

export function solve(problem: Problem): Promise<Solution | null> {
  return solveMinizincInPromise(parseProblem(problem)).then(JSON.parse);
}

function solveMinizincInPromise(minizincProblem: string): Promise<string> {
  return new Promise((resolve, reject) => {
    solveWithTimeout(minizincProblem, 5000, (error: any, result: string) => (
      error ? reject(error) : resolve(result)
    ));
  });
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
