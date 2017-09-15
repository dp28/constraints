import 'mocha';
import { expect } from 'chai';
import * as constraints from 'json-constraints';
import {
  buildProblem,
  buildDecisionVariable,
  buildConstant,
  isWithinRange,
  Variable,
  Constraint
} from 'json-constraints';

import { solve } from './solver';

describe('solve', () => {
  it('should return valid values for all the variables in the Problem', () => {
    const range = { min: 1, max: 2 };
    const a = buildDecisionVariable(range);
    const b = buildDecisionVariable(range);
    const problem = buildProblem([a, b], []);
    return solve(problem).then((solution) => {
      expect(isWithinRange(solution[a.id], range)).to.be.true;
      expect(isWithinRange(solution[b.id], range)).to.be.true;
    });
  });

  it('should return the specified value for a variable if given', () => {
    const range = { min: 1, max: 20 };
    const a = buildDecisionVariable(range, 10);
    const problem = buildProblem([a], []);
    return solve(problem).then((solution) => {
      expect(solution[a.id]).to.equal(10);
    });
  });

  it('should return the specified value for a constant', () => {
    const a = buildConstant(10);
    const problem = buildProblem([a], []);
    return solve(problem).then((solution) => {
      expect(solution[a.id]).to.equal(10);
    });
  });

  describe('integer constraints', () => {
    const range = { min: 1, max: 3 };
    const a = buildDecisionVariable(range);
    const b = buildDecisionVariable(range);

    function buildConstrainedProblem(constraint: (...v: Array<Variable>) => Constraint) {
      return buildProblem([a, b], [constraint(a, b)]);
    }

    it('should satisfy mustBeEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeEqual);
      return solve(problem).then((solution) => {
        expect(solution[a.id]).to.equal(solution[b.id]);
      });
    });

    it('should satisfy mustNotBeEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustNotBeEqual);
      return solve(problem).then((solution) => {
        expect(solution[a.id]).not.to.equal(solution[b.id]);
      });
    });

    it('should satisfy mustBeLessThan constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeLessThan);
      return solve(problem).then((solution) => {
        expect(solution[a.id] < solution[b.id]).to.be.true;
      });
    });

    it('should satisfy mustBeLessThanOrEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeLessThanOrEqual);
      return solve(problem).then((solution) => {
        expect(solution[a.id] <= solution[b.id]).to.be.true;
      });
    });

    it('should satisfy mustBeGreaterThan constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeGreaterThan);
      return solve(problem).then((solution) => {
        expect(solution[a.id] > solution[b.id]).to.be.true;
      });
    });

    it('should satisfy mustBeGreaterThanOrEqual constraints', () => {
      const problem = buildConstrainedProblem(constraints.mustBeGreaterThanOrEqual);
      return solve(problem).then((solution) => {
        expect(solution[a.id] >= solution[b.id]).to.be.true;
      });
    });
  });

  describe('integer constraints', () => {
    const range = { min: 1, max: 3 };
    const a = buildDecisionVariable(range);
    const b = buildDecisionVariable(range);
    const lessThanOrEqual = constraints.mustBeLessThanOrEqual(a, b);
    const equal = constraints.mustBeEqual(a, b);

    function buildConstrainedProblem(constraint: (...v: Array<Constraint>) => Constraint) {
      return buildProblem([a, b], [constraint(lessThanOrEqual, equal)]);
    }

    it('should satisfy "and" constraints', () => {
      const problem = buildConstrainedProblem(constraints.and);
      return solve(problem).then((solution) => {
        expect(solution[a.id] <= solution[b.id] && solution[a.id] === solution[b.id]).to.be.true;
      });
    });

    it('should satisfy "or" constraints', () => {
      const problem = buildConstrainedProblem(constraints.or);
      return solve(problem).then((solution) => {
        expect(solution[a.id] <= solution[b.id] || solution[a.id] === solution[b.id]).to.be.true;
      });
    });

    it('should satisfy "not" constraints', () => {
      const problem = buildProblem([a, b], [constraints.not(equal)]);
      return solve(problem).then((solution) => {
        expect(solution[a.id]).not.to.equal(solution[b.id]);
      });
    });
  });

  describe('arithmetic variable combinations', () => {
    const range = { min: 1, max: 4 };
    const a = buildDecisionVariable(range);
    const b = buildDecisionVariable(range);
    const result = buildDecisionVariable(range, 2);

    function buildConstrainedProblem(combine: (...v: Array<Variable>) => Variable) {
      const combined = combine(a, b);
      return buildProblem([a, b, result], [constraints.mustBeEqual(result, combined)]);
    }

    it('should satisfy "add" relations', () => {
      const problem = buildConstrainedProblem(constraints.add);
      return solve(problem).then((solution) => {
        expect(solution[a.id] + solution[b.id]).to.equal(solution[result.id]);
      });
    });

    it('should satisfy "subtract" relations', () => {
      const problem = buildConstrainedProblem(constraints.subtract);
      return solve(problem).then((solution) => {
        expect(solution[a.id] - solution[b.id]).to.equal(solution[result.id]);
      });
    });

    it('should satisfy "multiply" relations', () => {
      const problem = buildConstrainedProblem(constraints.multiply);
      return solve(problem).then((solution) => {
        expect(solution[a.id] * solution[b.id]).to.equal(solution[result.id]);
      });
    });

    it('should satisfy "divide" relations', () => {
      const problem = buildConstrainedProblem(constraints.divide);
      return solve(problem).then((solution) => {
        expect(solution[a.id] / solution[b.id]).to.equal(solution[result.id]);
      });
    });
  });

  it('should return null if the Problem cannot be solved', () => {
    const range = { min: 1, max: 2 };
    const one = buildDecisionVariable(range, 1);
    const two = buildDecisionVariable(range, 2);
    const problem = buildProblem([one, two], [constraints.mustBeEqual(one, two)]);
    return solve(problem).then(solution => (
      expect(solution).to.equal(null)
    ));
  });
});
