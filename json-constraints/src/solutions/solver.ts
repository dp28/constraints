import { Problem } from '../constraints';

export interface Solution {
  [variableId: string]: number;
}

declare type Solve = (problem: Problem) => Promise<Solution | null>;
