import 'mocha';
import { expect } from 'chai';

import { entries } from './object';

describe('entries', () => {
  it('should return an empty array if the object has no keys', () => {
    expect(entries({})).to.deep.equal([]);
  });

  it('should return key-value pairs from an object', () => {
    expect(entries({a: 1, b: null, c: undefined})).to.deep.equal([
      ['a', 1],
      ['b', null],
      ['c', undefined]
    ]);
  });
});
