import { connect } from "react-redux";

import { NewEvent } from "./NewEvent";

export function mapStateToProps({ config, newEvent }) {
  return {
    pixelsPerUnit: config.pixelsPerUnit,
    minutesPerUnit: config.minutesPerUnit,
    minStart: newEvent.minStart || 0,
    minDuration: newEvent.minDuration || 0,
    maxDuration: newEvent.maxDuration || 0,
    maxEnd: newEvent.maxEnd || 0
  };
}

export const NewEventContainer = connect(mapStateToProps)(NewEvent);
