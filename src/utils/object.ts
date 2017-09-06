export function entries<Type>(object: { [key: string]: Type }): Array<[string, Type]> {
  return Object.keys(object).reduce(
    (all, key) => [...all, [key, object[key]]],
    []
  );
}
