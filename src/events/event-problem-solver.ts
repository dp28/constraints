import { solve, Solution } from '../solutions/solver';
import { EventProblem, toProblem, Event } from './event';
import { indexById } from '../utils/object';

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
  return solve(problem).then(solution => buildEventProblemSolution(solution, eventProblem));
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
