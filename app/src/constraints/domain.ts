export type DomainId = string;

export interface Domain {
  id: DomainId;
  values: Array<number>;
}

export type DomainReference = Domain | DomainId;

export function toDomainId(domainReference: DomainReference): DomainId {
  return isDomain(domainReference) ? domainReference.id : domainReference;
}

export function buildDomain(id: string, values: Array<number>): Domain {
  return { id, values };
}

export function buildDomainFromRange(id: string, start: number, end: number): Domain {
  const values: Array<number> = [];
  while (start < end)
    values.push(start++)
  return buildDomain(id, values);
}

function isDomain(domainReference: DomainReference): domainReference is Domain {
  return (<Domain>domainReference).id !== undefined;
}
