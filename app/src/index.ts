/// <reference path="../../typings/index.d.ts"/>

import {range, inclusiveRange} from './utils/range';

import {solve} from './adapters/mini-zinc';

import {
  ProblemBuilder,
  sum,
  subtract,
  buildRange,
  mustBeEqual,
  or,
  mustBeLessThan
} from './constraints';

// Constants
const minutesPerUnit = 15;
const hour = 60 / minutesPerUnit;
const numDays = 5;
const dayDuration = 24 * hour;
const minWorkDurationPerWeek = 39 * hour;
const maxWorkDurationPerWeek = 41 * hour;
const maxStartTime = 9 * hour + hour / 2;
const minEndTime = 16 * hour;
const preferredDayDuration = hour * 8;

const problem = ProblemBuilder();

// Ranges

const dayIndices      = range(0, numDays);
const workDayDuration = buildRange(0, dayDuration - 1);
const startTime       = buildRange(0, maxStartTime);
const endTime         = buildRange(minEndTime, dayDuration - 1);
const lunchDuration   = buildRange(hour / 2, hour);

const possibleWorkDurationPerWeek = buildRange(minWorkDurationPerWeek, maxWorkDurationPerWeek);

// Decision variables

const workDurations  = problem.defineVariables(`workDurations`, workDayDuration, numDays);
const startTimes     = problem.defineVariables(`startTimes`, startTime, numDays);
const endTimes       = problem.defineVariables(`endTimes`, endTime, numDays);
const lunchDurations = problem.defineVariables(`lunchDurations`, lunchDuration, numDays);

const workDurationPerWeek = problem.defineVariable(
  `workDurationPerWeek`,
  possibleWorkDurationPerWeek
);

// Constraints

workDurations.forEach((workPerDay, day) => (
  problem.addConstraint(
    mustBeEqual(
      workPerDay,
      subtract(endTimes[day], lunchDurations[day], startTimes[day])
    )
  )
));

problem.addConstraint(mustBeEqual(sum(workDurations), workDurationPerWeek));

// monday run
const dayRange = buildRange(0, dayDuration);
const runStart = problem.defineVariable(`runStart`, dayRange);
const runEnd = problem.defineVariable(`runEnd`, dayRange);
const runDuration = problem.defineVariable(`runDuration`, buildRange(hour, 3 * hour));

problem.addConstraint(
  mustBeEqual(
    runDuration,
    subtract(runEnd, runStart)
  )
);

problem.addConstraint(
  or(
    mustBeLessThan(runEnd, startTimes[0]),
    mustBeLessThan(endTimes[0], runStart)
  )
);

export function run(): PromiseLike<any> {
  return solve(problem.toProblem());
}
