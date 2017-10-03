import 'mocha';
import { expect } from 'chai';

import { buildProblem, combineProblems } from './problem';
import { Constraint } from './constraint';
import { buildRange } from './range';
import { buildDecisionVariable, buildConstant } from './variable';

describe('buildProblem', () => {
  it('should return a Problem with the passed-in constraints', () => {
    const constraint: Constraint = {
      operator: 'a',
      variableReferences: []
    };
    expect(buildProblem([], [constraint]).constraints).to.deep.equal([constraint]);
  });

  it('should return a Problem with the passed-in constants', () => {
    const constant = buildConstant( 10);
    expect(buildProblem([constant], []).variables).to.deep.equal({ [constant.id]: constant });
  });

  it('should return a Problem with the passed-in variables mapped by id', () => {
    const variable = buildDecisionVariable({ min: 1, max: 2 });
    const otherVariable = buildDecisionVariable({ min: 1, max: 2 });
    const problem = buildProblem([variable, otherVariable], []);
    expect(problem.variables).to.deep.equal({
      [variable.id]: variable,
      [otherVariable.id]: otherVariable
    });
  });
});

describe('combineProblems', () => {
  it(`should return a problem with a combination of all the problems' constraints`, () => {
    const firstConstraint: Constraint = {
      operator: 'a',
      variableReferences: []
    };

    const secondConstraint: Constraint = {
      operator: 'b',
      variableReferences: []
    };
    const combinedProblem = combineProblems([
      buildProblem([], [firstConstraint]),
      buildProblem([], [secondConstraint]),
    ]);
    expect(combinedProblem.constraints).to.deep.equal([firstConstraint, secondConstraint]);
  });

  it(`should return a problem with a combined map of all the problems' variables`, () => {
    const range = buildRange(1, 2);

    const variable = buildDecisionVariable(range);
    const constant = buildConstant(2);
    const sharedVariable = buildDecisionVariable(range);
    const combinedProblem = combineProblems([
      buildProblem([sharedVariable, variable], []),
      buildProblem([sharedVariable, constant], []),
    ]);
    expect(combinedProblem.variables).to.deep.equal({
      [variable.id]: variable,
      [constant.id]: constant,
      [sharedVariable.id]: sharedVariable
    });
  });
});
