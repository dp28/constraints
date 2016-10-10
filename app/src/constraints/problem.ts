import {Constraint} from './constraint';
import {DecisionVariable, buildDecisionVariable} from './variable';
import {Range, RangeReference, buildRange} from './range';
import {range} from '../utils/range';

export interface DecisionVariableDeclarations {
  [variableId: string]: DecisionVariable;
}

export interface RangeDeclarations {
  [rangeId: string]: Range;
}

export interface Solution {
  [variableId: string]: number;
}

export interface Problem {
  ranges: RangeDeclarations;
  decisionVariables: DecisionVariableDeclarations;
  constraints: Array<Constraint>;
}

export function ProblemBuilder() {
  const ranges: { [rangeId: string]: Range } = {};
  const decisionVariables: { [variableId: string]: DecisionVariable } = {};
  const constraints: Array<Constraint> = [];

  function addRange(range: Range): Range {
    ranges[range.id] = range;
    return range;
  }

  function addVariable(variable: DecisionVariable): DecisionVariable {
    decisionVariables[variable.id] = variable;
    return variable;
  }

  return {
    toProblem(): Problem {
      return { ranges, decisionVariables, constraints };
    },

    defineRange(id: string, first: number, last: number): Range {
      return addRange(buildRange(id, first, last));
    },

    defineVariable(id: string, range: RangeReference): DecisionVariable {
      return addVariable(buildDecisionVariable(id, range));
    },

    defineVariables(idPrefix: string, rangeRef: RangeReference, num: number): Array<DecisionVariable> {
      return range(0, num).map(i => addVariable(buildDecisionVariable(`${idPrefix}_${i}`, rangeRef)));
    },

    addConstraint(constraint: Constraint): void {
      constraints.push(constraint);
    }
  };
}
