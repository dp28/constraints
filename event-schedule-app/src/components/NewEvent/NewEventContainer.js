import { connect } from "react-redux";

import { NewEvent } from "./NewEvent";
import { selectUnitConverters } from "../Config/ConfigSelectors";

export function mapStateToProps(state) {
  const { newEvent } = state;
  return {
    pixelsPerUnit: selectUnitConverters(state).pixelsPerUnit,
    minStart: newEvent.minStart || 0,
    minDuration: newEvent.minDuration || 0,
    maxDuration: newEvent.maxDuration || 0,
    maxEnd: newEvent.maxEnd || 0
  };
}

export const NewEventContainer = connect(mapStateToProps)(NewEvent);
