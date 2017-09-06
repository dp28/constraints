import 'mocha';
import { expect } from 'chai';

import { Variable } from './variable';
import { entries } from '../utils/object';
import {
  mustBeEqual,
  mustNotBeEqual,
  mustBeLessThan,
  mustBeLessThanOrEqual,
  mustBeGreaterThan,
  mustBeGreaterThanOrEqual,
  IntegerPredicate,
  BooleanPredicate,
  Predicate,
  and,
  or,
  not
} from './constraint';

const IntegerPredicates: { [operator: string]: [string, (...vs: Array<Variable>) => IntegerPredicate] } = {
  equal:  ['mustBeEqual', mustBeEqual],
  notEqual:  ['mustNotBeEqual', mustNotBeEqual],
  lessThan:  ['mustBeLessThan', mustBeLessThan],
  lessThanOrEqual:  ['mustBeLessThanOrEqual', mustBeLessThanOrEqual],
  greaterThan:  ['mustBeGreaterThan', mustBeGreaterThan],
  greaterThanOrEqual:  ['mustBeGreaterThanOrEqual', mustBeGreaterThanOrEqual],
};

entries(IntegerPredicates).forEach(([operation, [name, predicateBuilder]]) => {
  describe(name, () => {
    it(`should return an IntegerPredicate with the operator '${operation}'`, () => {
      expect(predicateBuilder().operator).to.equal(operation);
    });

    it('should include references to all the passed in variables', () => {
      const variable = { id: 'b', range: { min: 1, max: 2 } };
      expect(predicateBuilder('a', variable).variableReferences).to.deep.equal(['a', 'b'])
    });
  });
});

const BooleanPredicates: { [operator: string]: (...ps: Array<Predicate>) => BooleanPredicate }  = {
  and, or, not
};

entries(BooleanPredicates).forEach(([operation, predicateBuilder]) => {
  describe(operation, () => {
    it(`should return a BooleanPredicate with the operator '${operation}'`, () => {
      expect(predicateBuilder().operator).to.equal(operation);
    });
  });

  it('should include all the passed in predicates', () => {
    const predicate = predicateBuilder(mustBeEqual(), mustNotBeEqual());
    expect(predicate.predicates).to.deep.equal([mustBeEqual(), mustNotBeEqual()])
  });
});
