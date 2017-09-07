export function entries<Type>(object: { [key: string]: Type }): Array<[string, Type]> {
  return Object.keys(object).reduce(
    (all, key) => [...all, [key, object[key]]],
    []
  );
}

export function indexById<Type extends { id: string }>(objects: Array<Type>): { [id: string]: Type } {
  const result: { [id: string]: Type } = {};
  return objects.reduce((result, object) => {
    result[object.id] = object;
    return result;
  }, result);
}
