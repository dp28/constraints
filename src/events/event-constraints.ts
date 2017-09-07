import {mustBeLessThan, or, and, Constraint} from '../constraints';

import {Event} from './event';

export function mustNotOverlap(events: Array<Event>): Constraint {
  return and(...buildPairs(events));
}

function buildPairs(events: Array<Event>): Array<Constraint> {
  return events.reduce((constraints: Array<Constraint>, event: Event, eventIndex: number) => (
    constraints.concat(
      events.slice(eventIndex + 1).map(pairMustNotOverlap(event))
    )
  ), []);
}

function pairMustNotOverlap(event: Event): (otherEvent: Event) => Constraint {
  return otherEvent => or(
    mustBeLessThan(event.end, otherEvent.start),
    mustBeLessThan(otherEvent.end, event.start)
  );
}
