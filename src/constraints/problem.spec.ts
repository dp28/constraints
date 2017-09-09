import 'mocha';
import { expect } from 'chai';

import { buildProblem, combineProblems, ProblemBuilder } from './problem';
import { Constraint } from './constraint';
import { Variable, buildConstant } from './variable';

describe('buildProblem', () => {
  it('should return a Problem with the passed-in constraints', () => {
    const constraint: Constraint = {
      operator: 'a',
      variableReferences: []
    };
    expect(buildProblem([], [constraint]).constraints).to.deep.equal([constraint]);
  });

  it('should return a Problem with the passed-in constants', () => {
    const constant = buildConstant('a', 10);
    expect(buildProblem([constant], []).variables).to.deep.equal({ a: constant });
  });

  it('should return a Problem with the passed-in variables mapped by id', () => {
    const variable: Variable = {
      id: 'x', range: { min: 1, max: 2 }
    };
    const otherVariable: Variable = {
      id: 'y', range: { min: 1, max: 2 }
    };
    const problem = buildProblem([variable, otherVariable], []);
    expect(problem.variables).to.deep.equal({
      x: variable,
      y: otherVariable
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
    const variable: Variable = {
      id: 'x', range: { min: 1, max: 2 }
    };
    const constant = buildConstant('y', 2);
    const sharedVariable: Variable = {
      id: 'z', range: { min: 1, max: 2 }
    };
    const combinedProblem = combineProblems([
      buildProblem([sharedVariable, variable], []),
      buildProblem([sharedVariable, constant], []),
    ]);
    expect(combinedProblem.variables).to.deep.equal({
      x: variable,
      y: constant,
      z: sharedVariable
    });
  });
});
