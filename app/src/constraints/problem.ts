import {Constraint} from './constraint';
import {DecisionVariable, buildDecisionVariable} from './variable';
import {Domain, DomainReference, buildDomain, buildDomainFromRange} from './domain';
import {range} from '../utils/range';

export interface DecisionVariableDeclarations {
  [variableId: string]: DecisionVariable;
}

export interface DomainDeclarations {
  [domainId: string]: Domain;
}

export interface Problem {
  domains: DomainDeclarations;
  decisionVariables: DecisionVariableDeclarations;
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

    defineDomain(id: string, values: Array<number>): Domain {
      return addDomain(buildDomain(id, values));
    },

    defineDomainFromRange(id: string, start: number, end: number): Domain {
      return addDomain(buildDomainFromRange(id, start, end));
    },

    defineVariable(id: string, domain: DomainReference): DecisionVariable {
      return addVariable(buildDecisionVariable(id, domain));
    },

    defineVariables(idPrefix: string, domain: DomainReference, number: number): Array<DecisionVariable> {
      return range(0, number).map(i => addVariable(buildDecisionVariable(`${idPrefix}_${i}`, domain)));
    },

    addConstraint(constraint: Constraint): void {
      constraints.push(constraint);
    }
  }
}
