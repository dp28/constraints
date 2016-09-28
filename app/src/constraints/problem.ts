import {Constraint} from './constraint';
import {DecisionVariable} from './variable';
import {Domain} from './domain';

export interface Problem {
  domains: Array<Domain>;
  decisionVariables: Array<DecisionVariable>;
  constraints: Array<Constraint>;
}
