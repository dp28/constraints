import 'mocha';
import { expect } from 'chai';

import { buildRange, isWithinRange } from './range';

describe('buildRange', () => {
  it('should create a range with the specified min', () => {
    expect(buildRange(1, 2).min).to.equal(1);
  });

  it('should create a range with the specified max', () => {
    expect(buildRange(1, 2).max).to.equal(2);
  });
});

describe('isWithinRange', () => {
  const range = buildRange(1, 3);

  it('should be false if the value is lower than the min', () => {
    expect(isWithinRange(0, range)).to.equal(false);
  });

  it('should be false if the value is higher than the min', () => {
    expect(isWithinRange(10, range)).to.equal(false);
  });

  it('should be false if the value is null', () => {
    expect(isWithinRange(null, range)).to.equal(false);
  });

  it('should be false if the value is not an integer', () => {
    expect(isWithinRange(1.5, range)).to.equal(false);
  });

  it('should be true if the value is between the min and max', () => {
    expect(isWithinRange(2, range)).to.equal(true);
  });

  it('should be true if the value is the min', () => {
    expect(isWithinRange(1, range)).to.equal(true);
  });

  it('should be true if the value is the max', () => {
    expect(isWithinRange(3, range)).to.equal(true);
  });
});
