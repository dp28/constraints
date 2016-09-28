import {Constraint} from './constraint';
import {DecisionVariable, buildDecisionVariable} from './variable';
import {Domain, buildDomain, buildDomainFromRange} from './domain';

export interface Problem {
  domains: { [domainId: string]: Domain };
  decisionVariables: { [variableId: string]: DecisionVariable };
  constraints: Array<Constraint>;
}

export function ProblemBuilder() {
  const domains: { [domainId: string]: Domain } = {};
  const decisionVariables: { [variableId: string]: DecisionVariable } = {};
  const constraints: Array<Constraint> = [];

  function addDomain(domain: Domain): Domain {
    domains[domain.id] = domain;
    return domain;
  }

  function addVariable(variable: DecisionVariable): DecisionVariable {
    decisionVariables[variable.id] = variable;
    return variable;
  }

  return {
    toProblem(): Problem {
      return { domains, decisionVariables, constraints };
    },

    defineDomain(id: string, ...values: Array<number>): Domain {
      return addDomain(buildDomain(id, values));
    },

    defineDomainFromRange(id: string, start: number, end: number): Domain {
      return addDomain(buildDomainFromRange(id, start, end));
    },

    defineVariable(id: string, domainOrDomainId: Domain | string, value?: number): DecisionVariable {
      return addVariable(buildDecisionVariable(id, domainOrDomainId, value));
    },

    addConstraint(constraint: Constraint): void {
      constraints.push(constraint);
    }
  }
}
