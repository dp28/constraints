export type RangeId = string;

export interface Range {
  id: RangeId;
  min: number;
  max: number;
}

export type RangeReference = Range | RangeId;

export function toRangeId(rangeReference: RangeReference): RangeId {
  return isRange(rangeReference) ? rangeReference.id : rangeReference;
}

export function buildRange(id: string, min: number, max: number): Range {
  return { id, min, max };
}

function isRange(rangeReference: RangeReference): rangeReference is Range {
  return (<Range>rangeReference).id !== undefined;
}
