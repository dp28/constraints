export interface Domain {
  id: string;
  values: Array<number>;
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
