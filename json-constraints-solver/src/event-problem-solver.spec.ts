import 'mocha';
import { expect } from 'chai';
import {
  buildProblem,
  buildDecisionVariable,
  mustBeLessThan,
  buildEvent,
  toProblem,
  mustNotOverlap
} from 'json-constraints';

import { solveEventProblem } from './event-problem-solver';

describe('solve', () => {
  describe('for a single event', () => {
    it('should return valid values for all the variables in the Problem', () => {
      const event = buildEvent({ minStart: 0, maxEnd: 3 });
      return solveEventProblem({ events: [event] }).then((solution) => {
        const { start, end, duration } = solution.events[event.id];
        expect(start <= end).to.be.true;
        expect(start + duration).to.equal(end);
      });
    });

    describe('with additional variables and constraints', () => {
      it('should include valid values for extra variables', () => {
        const event = buildEvent({ minStart: 0, maxEnd: 3 });
        const variable = buildDecisionVariable({ min: 1, max: 3 });
        const constraint = mustBeLessThan(variable, event.start);
        const problem = {
          events: [event],
          variables: [variable],
          constraints: [constraint]
        };

        return solveEventProblem(problem).then((solution) => {
          const { start } = solution.events[event.id];
          expect(solution.variables[variable.id] <= start).to.be.true;
        });
      });
    });
  });

  describe('with multiple events', () => {
    const firstEvent = buildEvent({ minStart: 0, maxEnd: 10 });
    const secondEvent = buildEvent({ minStart: 0, maxEnd: 10 });

    it('should be possible to stop events overlapping', () => {
      const constraint = mustNotOverlap([firstEvent, secondEvent]);
      const problem = {
        events: [firstEvent, secondEvent],
        constraints: [mustNotOverlap([firstEvent, secondEvent])]
      };
      return solveEventProblem(problem).then((solution) => {
        const firstSolution = solution.events[firstEvent.id];
        const secondSolution = solution.events[secondEvent.id];
        expect(
          (firstSolution.start >= secondSolution.end) ||
          (firstSolution.end <= secondSolution.start)
        ).to.be.true;
      });
    });
  });
});
