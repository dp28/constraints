import {buildConstraint} from './constraint';
import {buildPredicate}  from './predicate';

const equal              = buildPredicate(`equal`);
const notEqual           = buildPredicate(`notEqual`);
const lessThan           = buildPredicate(`lessThan`);
const lessThanOrEqual    = buildPredicate(`lessThanOrEqual`);
const greaterThan        = buildPredicate(`greaterThan`);
const greaterThanOrEqual = buildPredicate(`greaterThanOrEqual`);

export const mustBeEqual              = buildConstraint(equal);
export const mustNotBeEqual           = buildConstraint(notEqual);
export const mustBeLessThan           = buildConstraint(lessThan);
export const mustBeLessThanOrEqual    = buildConstraint(lessThanOrEqual);
export const mustBeGreaterThan        = buildConstraint(greaterThan);
export const mustBeGreaterThanOrEqual = buildConstraint(greaterThanOrEqual);
