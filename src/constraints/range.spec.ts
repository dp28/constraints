import 'mocha';
import { expect } from 'chai';

import { buildRange } from './range';

describe('buildRange', () => {
  it('should create a range with the specified min', () => {
    expect(buildRange(1, 2).min).to.equal(1);
  });

  it('should create a range with the specified max', () => {
    expect(buildRange(1, 2).max).to.equal(2);
  });
});
