import 'mocha';
import { expect } from 'chai';

import {
  buildProblem,
  buildDecisionVariable,
  buildConstant,
  isWithinRange,
  Variable,
  Constraint
} from '../src/constraints';

import * as constraints from '../src/constraints/constraint';
import * as relations from '../src/constraints/variable';

import { solve } from '../src/solutions/solver';

describe('solve', () => {
  it('should return valid values for all the variables in the Problem', () => {
    const range = { min: 1, max: 2 };
    const a = buildDecisionVariable('a', range);
    const b = buildDecisionVariable('b', range);
    const problem = buildProblem([a, b], []);
    return solve(problem).then((solution) => {
      expect(isWithinRange(solution.a, range)).to.be.true;
      expect(isWithinRange(solution.b, range)).to.be.true;
    });
  });

  it('should return the specified value for a variable if given', () => {
    const range = { min: 1, max: 20 };
    const a = buildDecisionVariable('a', range, 10);
    const problem = buildProblem([a], []);
    return solve(problem).then((solution) => {
      expect(solution.a).to.equal(10);
    });
  });

  it('should return the specified value for a constant', () => {
    const a = buildConstant('a', 10);
    const problem = buildProblem([a], []);
    return solve(problem).then((solution) => {
      expect(solution.a).to.equal(10);
    });
  });

  describe('integer constraints', () => {
    const range = { min: 1, max: 3 };
    const a = buildDecisionVariable('a', range);
    const b = buildDecisionVariable('b', range);

    function buildConstrainedProblem(constraint: (...v: Array<Variable>) => Constraint) {
      return buildProblem([a, b], [constraint(a, b)]);
    }

    it('should satisfy mustBeEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeEqual);
      return solve(problem).then((solution) => {
        expect(solution.a).to.equal(solution.b);
      });
    });

    it('should satisfy mustNotBeEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustNotBeEqual);
      return solve(problem).then((solution) => {
        expect(solution.a).not.to.equal(solution.b);
      });
    });

    it('should satisfy mustBeLessThan constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeLessThan);
      return solve(problem).then((solution) => {
        expect(solution.a < solution.b).to.be.true;
      });
    });

    it('should satisfy mustBeLessThanOrEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeLessThanOrEqual);
      return solve(problem).then((solution) => {
        expect(solution.a <= solution.b).to.be.true;
      });
    });

    it('should satisfy mustBeGreaterThan constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeGreaterThan);
      return solve(problem).then((solution) => {
        expect(solution.a > solution.b).to.be.true;
      });
    });

    it('should satisfy mustBeGreaterThanOrEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeGreaterThanOrEqual);
      return solve(problem).then((solution) => {
        expect(solution.a >= solution.b).to.be.true;
      });
    });
  });

  describe('integer constraints', () => {
    const range = { min: 1, max: 3 };
    const a = buildDecisionVariable('a', range);
    const b = buildDecisionVariable('b', range);
    const lessThanOrEqual = constraints.mustBeLessThanOrEqual(a, b);
    const equal = constraints.mustBeEqual(a, b);

    function buildConstrainedProblem(constraint: (...v: Array<Constraint>) => Constraint) {
      return buildProblem([a, b], [constraint(lessThanOrEqual, equal)]);
    }

    it('should satisfy "and" constraints', () => {
      const problem = buildConstrainedProblem(constraints.and);
      return solve(problem).then((solution) => {
        expect(solution.a <= solution.b && solution.a === solution.b).to.be.true;
      });
    });

    it('should satisfy "or" constraints', () => {
      const problem = buildConstrainedProblem(constraints.or);
      return solve(problem).then((solution) => {
        expect(solution.a <= solution.b || solution.a === solution.b).to.be.true;
      });
    });

    it('should satisfy "not" constraints', () => {
      const problem = buildProblem([a, b], [constraints.not(equal)]);
      return solve(problem).then((solution) => {
        expect(solution.a).not.to.equal(solution.b);
      });
    });
  });

  describe('arithmetic variable combinations', () => {
    const range = { min: 1, max: 4 };
    const a = buildDecisionVariable('a', range);
    const b = buildDecisionVariable('b', range);
    const result = buildDecisionVariable('result', range, 2);

    function buildConstrainedProblem(combine: (...v: Array<Variable>) => Variable) {
      const combined = combine(a, b);
      return buildProblem([a, b, result], [constraints.mustBeEqual(result, combined)]);
    }

    it('should satisfy "add" relations', () => {
      const problem = buildConstrainedProblem(relations.add);
      return solve(problem).then((solution) => {
        expect(solution.a + solution.b).to.equal(solution.result);
      });
    });

    it('should satisfy "subtract" relations', () => {
      const problem = buildConstrainedProblem(relations.subtract);
      return solve(problem).then((solution) => {
        expect(solution.a - solution.b).to.equal(solution.result);
      });
    });

    it('should satisfy "multiply" relations', () => {
      const problem = buildConstrainedProblem(relations.multiply);
      return solve(problem).then((solution) => {
        expect(solution.a * solution.b).to.equal(solution.result);
      });
    });

    it('should satisfy "divide" relations', () => {
      const problem = buildConstrainedProblem(relations.divide);
      return solve(problem).then((solution) => {
        expect(solution.a / solution.b).to.equal(solution.result);
      });
    });
  });

  it('should return null if the Problem cannot be solved', () => {
    const range = { min: 1, max: 2 };
    const one = buildDecisionVariable('a', range, 1);
    const two = buildDecisionVariable('b', range, 2);
    const problem = buildProblem([one, two], [constraints.mustBeEqual(one, two)]);
    return solve(problem).then(solution => (
      expect(solution).to.equal(null)
    ));
  });
});
