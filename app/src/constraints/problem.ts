import {Constraint} from './constraint';
import {DecisionVariable} from './variable';

export interface Problem {
  decisionVariables: Array<DecisionVariable>;
  constraints: Array<Constraint>;
}
