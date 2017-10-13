export const InitialState = {
  minutesPerUnit: 15,
  pixelsPerUnit: 5,
  bounds: { min: 0, max: 24 * (60 / 15) }
};

export function reducer(state = InitialState) {
  return state;
}
