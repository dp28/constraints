export function range(start: number, end: number): Array<number> {
  const numElements = end - start;
  if (numElements > 0)
    return Array.apply(null, Array(numElements)).map((_, i) => i + start);
  else
    return [];
}

export function inclusiveRange(start: number, end: number): Array<number> {
  return range(start, end + 1);
}
