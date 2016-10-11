import {Constraint} from './constraint';
import {DecisionVariable, buildDecisionVariable} from './variable';
import {Range, buildRange} from './range';
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
  decisionVariables: DecisionVariableDeclarations;
  constraints: Array<Constraint>;
}

export function ProblemBuilder() {
  const decisionVariables: { [variableId: string]: DecisionVariable } = {};
  const constraints: Array<Constraint> = [];

  function addVariable(variable: DecisionVariable): DecisionVariable {
    decisionVariables[variable.id] = variable;
    return variable;
  }

  return {
    toProblem(): Problem {
      return { decisionVariables, constraints };
    },

    defineVariable(id: string, range: Range): DecisionVariable {
      return addVariable(buildDecisionVariable(id, range));
    },

    defineVariables(idPrefix: string, rangeRef: Range, num: number): Array<DecisionVariable> {
      return range(0, num).map(i => addVariable(buildDecisionVariable(`${idPrefix}_${i}`, rangeRef)));
    },

    addConstraint(constraint: Constraint): void {
      constraints.push(constraint);
    }
  };
}
