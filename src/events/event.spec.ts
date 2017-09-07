import 'mocha';
import { expect } from 'chai';

import { buildEvent, toProblem, Event } from './event';
import {
  IntegerPredicate,
  add,
  mustBeEqual,
  mustBeGreaterThanOrEqual,
  and,
  DecisionVariable,
  buildRange,
  buildDecisionVariable
} from '../constraints';

describe('events created with #buildEvent', () => {
  it('should have a unique id', () => {
    const config = { minStart: 0, maxEnd: 10 };
    expect(buildEvent(config).id).not.to.equal(buildEvent(config).id);
  });

  describe('the variables created as part of an Event', () => {
    describe('start', () => {
      const start = buildEvent({ minStart: 5, maxEnd: 10 }).start;

      it('should have the full range of Event times', () => {
        expect(start.range).to.deep.equal({ min: 5, max: 10 });
      });

      it('should not have a value', () => {
        expect(start.value).to.be.undefined;
      });
    });

    describe('end', () => {
      const end = buildEvent({ minStart: 5, maxEnd: 10 }).end;

      it('should have the full range of Event times', () => {
        expect(end.range).to.deep.equal({ min: 5, max: 10 });
      });

      it('should not have a value', () => {
        expect(end.value).to.be.undefined;
      });
    });

    describe('duration', () => {
      const duration = buildEvent({ minStart: 5, maxEnd: 10 }).duration;

      it('should have a range from 0 to the difference between the minStart and maxEnd', () => {
        expect(duration.range).to.deep.equal({ min: 0, max: 5 });
      });

      it('should not have a value', () => {
        expect(duration.value).to.be.undefined;
      });
    });
  });

  it('should constrain the end to equal the start plus the duration and the end to be greater ' +
    'than or equal to the start', () => {
    const event = buildEvent({ minStart: 5, maxEnd: 10 });
    const { start, end, duration } = event;
    expect(event.constraint).to.deep.equal(
      and(
        mustBeEqual(add(start, duration), end.id),
        mustBeGreaterThanOrEqual(end, start)
      )
    );
  });
});

describe('toProblem', () => {
  function getVariables(event: Event): Array<DecisionVariable> {
    const { start, end, duration } = event;
    return [start, end, duration];
  }

  it('should include all the variables from all the Events', () => {
    const firstEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const secondEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const problem = toProblem({ events: [firstEvent, secondEvent] });
    [...getVariables(firstEvent), ...getVariables(secondEvent)].forEach((variable) => {
      expect(problem.variables[variable.id]).to.deep.equal(variable);
    });
  });

  it('should be able to include other variables with those from the Events', () => {
    const firstEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const secondEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const variable = buildDecisionVariable(buildRange(1, 2));
    const problem = toProblem({ events: [firstEvent, secondEvent], variables: [variable] });
    [variable, ...getVariables(firstEvent), ...getVariables(secondEvent)].forEach((variable) => {
      expect(problem.variables[variable.id]).to.deep.equal(variable);
    });
  });

  it('should include all the constraints from all the Events', () => {
    const firstEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const secondEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const problem = toProblem({ events: [firstEvent, secondEvent] });
    expect(problem.constraints).to.deep.equal([firstEvent.constraint, secondEvent.constraint]);
  });

  it('should be able to include other constraints with those from the Events', () => {
    const firstEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const secondEvent = buildEvent({ minStart: 0, maxEnd: 2 });
    const constraint = mustBeEqual(firstEvent.start, secondEvent.end);
    const problem = toProblem({ events: [firstEvent, secondEvent], constraints: [constraint] });
    expect(problem.constraints).to.deep.equal(
      [constraint, firstEvent.constraint, secondEvent.constraint]
    );
  });
});
