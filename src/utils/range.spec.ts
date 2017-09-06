import 'mocha';
import { expect } from 'chai';
import { range, inclusiveRange } from './range';

describe('range', () => {
  it('should return all the integers from the start to the end - 1', () => {
    expect(range(1, 4)).to.deep.equal([1, 2, 3]);
  });

  it('should return an empty array if the end is less than the start', () => {
    expect(range(1, 0)).to.deep.equal([]);
  });

  it('should return an empty array if the end is the start', () => {
    expect(range(1, 1)).to.deep.equal([]);
  });
});

describe('inclusiveRange', () => {
  it('should return all the integers from the start to the end', () => {
    expect(inclusiveRange(1, 4)).to.deep.equal([1, 2, 3, 4]);
  });

  it('should return an empty array if the end is less than the start', () => {
    expect(inclusiveRange(1, 0)).to.deep.equal([]);
  });

  it('should return an array with just the start if the end is the start', () => {
    expect(inclusiveRange(1, 1)).to.deep.equal([1]);
  });
});
