import 'mocha';
import { expect } from 'chai';
import { range } from './range';

describe('range', () => {
  it('should return all the integers from the first to the last - 1', () => {
    expect(range(1, 4)).to.deep.equal([1, 2, 3]);
  });
});
