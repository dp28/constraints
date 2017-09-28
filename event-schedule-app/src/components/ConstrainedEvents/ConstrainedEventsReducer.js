import generateId from "cuid";

const DefaultEventId = generateId();

export const InitialState = {
  [DefaultEventId]: {
    id: DefaultEventId,
    start: { min: 10, max: 20 },
    duration: { min: 10, max: 20 },
    end: { min: 30, max: 40 }
  }
};

export function reducer(events = InitialState, action) {
  return events;
}
