export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_SOLUTION = "UPDATE_SOLUTION";

export function createEvent(minStart, maxEnd) {
  return { type: CREATE_EVENT, minStart, maxEnd };
}

export function updateSolution(solution) {
  return { type: UPDATE_SOLUTION, solution };
}
