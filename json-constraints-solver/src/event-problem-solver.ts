import { EventProblem, toProblem, Event, Solution } from 'json-constraints';
import { solve } from './solver';

export interface EventSolution {
  id: string;
  start: number;
  end: number;
  duration: number;
}

export interface EventProblemSolution {
  events: { [id: string]: EventSolution };
  variables: Solution;
}


export function solveEventProblem(eventProblem: EventProblem): Promise<EventProblemSolution> {
  const problem = toProblem(eventProblem);
  return solve(problem).then(solution => (
    solution ? buildEventProblemSolution(solution, eventProblem) : null
  ));
}

function buildEventProblemSolution(solution: Solution, eventProblem: EventProblem): EventProblemSolution {
  const events = eventProblem.events.map(event => buildEventSolution(solution, event));
  return {
    events: indexById(events),
    variables: solution
  };
}

function buildEventSolution(solution: Solution, event: Event): EventSolution {
  return {
    id: event.id,
    start: solution[event.start.id],
    end: solution[event.end.id],
    duration: solution[event.duration.id]
  }
}

function indexById<Type extends { id: string }>(objects: Array<Type>): { [id: string]: Type } {
  const result: { [id: string]: Type } = {};
  return objects.reduce((result, object) => {
    result[object.id] = object;
    return result;
  }, result);
}
