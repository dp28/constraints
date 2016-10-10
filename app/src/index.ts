/// <reference path="../../typings/index.d.ts"/>

import {range, inclusiveRange} from './utils/range';

import {solve} from './adapters/mini-zinc';

import {
  ProblemBuilder,
  sum,
  subtract,
  mustBeEqual
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

// Domains

const dayIndices      = range(0, numDays);
const workDayDuration = problem.defineDomain(`workDayDuration`, range(0, dayDuration));
const startTime       = problem.defineDomain(`startTime`, inclusiveRange(0, maxStartTime));
const endTime         = problem.defineDomain(`endTime`, range(minEndTime, dayDuration));
const lunchDuration   = problem.defineDomain(`lunchDuration`, inclusiveRange(hour / 2, hour));

const possibleWorkDurationPerWeek = problem.defineDomain(
  `possibleWorkDurationPerWeek`,
  inclusiveRange(minWorkDurationPerWeek, maxWorkDurationPerWeek)
);

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

export function run(): PromiseLike<any> {
  return solve(problem.toProblem());
}
