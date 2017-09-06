import 'mocha';
import { expect } from 'chai';

import {
  buildDecisionVariable,
  toVariableReference,
  combine,
  add,
  subtract,
  multiply,
  divide
} from './variable';

describe('buildDecisionVariable', () => {
  const variable = buildDecisionVariable('id', { min: 1, max: 2 }, 1);

  it('should have the specified id', () => {
    expect(variable.id).to.equal('id');
  });

  it('should have the specified range', () => {
    expect(variable.range).to.deep.equal({ min: 1, max: 2 });
  });

  it('should have the specified value', () => {
    expect(variable.value).to.equal(1);
  });
});

describe('toVariableReference', () => {
  it('should return a variable\'s id if passed a variable', () => {
    const variable = buildDecisionVariable('id', { min: 1, max: 2 }, 1);
    expect(toVariableReference(variable)).to.equal('id');
  });

  it('should return a passed in variable id without changing it', () => {
    expect(toVariableReference('id2')).to.equal('id2');
  });
});

describe('combine', () => {
  it('should return a VariableRelation with the specified operation', () => {
    expect(combine('test')().operation).to.equal('test');
  });

  it('should return a VariableRelation with references to the specified variables', () => {
    const variable = buildDecisionVariable('id', { min: 1, max: 2 }, 1);
    const otherVariable = buildDecisionVariable('id2', { min: 1, max: 2 }, 2);
    const combined = combine('bla')(variable, otherVariable)
    expect(combined.variableReferences).to.deep.equal(['id', 'id2']);
  });
});

const operations: any = { add, subtract, multiply, divide };

Object
  .keys(operations)
  .forEach((name: string) => {
    const operation = operations[name];
    describe(name, () => {
      it(`should return a VariableRelation with the '${name}' operation`, () => {
        expect(operation().operation).to.equal(name);
      });
    });
  });
