import * as generateId from 'cuid';

import {
  DecisionVariable,
  buildDecisionVariable,
  Constraint,
  buildRange,
  Range,
  mustBeEqual,
  mustBeGreaterThanOrEqual,
  add,
  and,
  Problem,
  combineProblems,
  buildProblem
} from '../constraints';

export interface EventConfig {
  minStart: number;
  maxEnd: number;
}

export interface Event {
  id: string,
  config: EventConfig;
  start: DecisionVariable;
  end: DecisionVariable;
  duration: DecisionVariable;
  constraint: Constraint;
}

export interface EventProblem {
  events: Array<Event>,
  constraints?: Array<Constraint>;
  variables?: Array<DecisionVariable>;
}

interface EventVariables {
  start: DecisionVariable;
  end: DecisionVariable;
  duration: DecisionVariable;
}

export function buildEvent(config: EventConfig): Event {
  const id = generateId();
  const variables = buildEventVariables(id, config);
  return {
    id,
    config,
    ...variables,
    constraint: buildEventConstraint(variables)
  };
}

export function toProblem({ events, variables, constraints }: EventProblem): Problem {
  const problems = events.map(event => buildProblem(variablesAsArray(event), [event.constraint]));
  const simpleProblem = buildProblem(variables || [], constraints || []);
  return combineProblems([simpleProblem, ...problems]);
}

function variablesAsArray(event: Event): Array<DecisionVariable> {
  return [event.start, event.end, event.duration];
}

function buildEventVariables(eventId: string, config: EventConfig): EventVariables {
  return {
    start: buildDecisionVariable(buildEventRange(config)),
    end: buildDecisionVariable(buildEventRange(config)),
    duration: buildDecisionVariable(buildDurationRange(config))
  };
}

function buildEventConstraint(variables: EventVariables): Constraint {
  return and(
    mustBeEqual(add(variables.start, variables.duration), variables.end),
    mustBeGreaterThanOrEqual(variables.end, variables.start)
  );
}

function buildEventRange({ minStart, maxEnd }: EventConfig): Range {
  return buildRange(minStart, maxEnd);
}

function buildDurationRange({ minStart, maxEnd }: EventConfig): Range {
  return buildRange(0, maxEnd - minStart);
}
