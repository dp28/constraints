import {fromJS} from 'immutable';

import {INITIALISE_STATE, UPDATE_VALUE} from './StateActionCreators';
import constrainedEvents from '../constrained-event/ConstrainedEventReducer';
import selectedEventIds from '../selected-events/SelectedEventReducer';
import constraints from '../constraint/ConstraintReducer';
import selectedType from '../constraint-type/ConstraintTypeReducer';
import expandedIds from '../expandable/ExpandableReducer';

const reduceStateTree = reduceParts({
  constrainedEvents,
  selectedEventIds,
  selectedType,
  constraints,
  expandedIds
 });

export default function reduce(state = fromJS({}), action) {
  switch (action.type) {
    case INITIALISE_STATE: return state.mergeDeep(fromJS(action.state));
    case UPDATE_VALUE:     return updateAndPost(state, action);
    default:               return reduceStateTree(state, action);
  }
}

function reduceParts(reducerMap) {
  return (state, action) => (
    Object
      .keys(reducerMap)
      .reduce(applyReducer(reducerMap, action), state)
  )
}

function applyReducer(reducerMap, action) {
  return (state, reducerKey) => {
    const reduce = reducerMap[reducerKey];
    return state.set(reducerKey, reduce(state.get(reducerKey), action));
  }
}

function updateAndPost(state, action) {
  const newState = update(state, action);
  post(newState.toJS());
  return newState;
}

function update(state, { variablePath, value }) {
  return state.setIn(variablePath, value);
}

function post(state) {
  const body = { events: Object.values(state.constrainedEvents).map(toEvent) }
  console.log('Posting', body);
  fetch('http://localhost:3001/events', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json()).then(console.log)
}


import { buildEvent } from 'json-constraints';

function toEvent({ id, start, duration, end }) {
  const event = buildEvent({ minStart: start.min, maxEnd: end.max });
  event.id = id;
  event.start.range.max = start.max;
  event.end.range.min = end.min;
  event.duration.range.min = duration.min;
  event.duration.range.max = duration.max;
  return event;
}
