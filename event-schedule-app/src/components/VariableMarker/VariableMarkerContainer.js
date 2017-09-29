import { connect } from "react-redux";

import { VariableMarker } from "./VariableMarker";
import { selectUnitsToPixels } from "../Config/ConfigSelectors";

export const mapStateToProps = (state, { eventId, eventPart, rangePart }) => {
  const toPixels = selectUnitsToPixels(state);
  const event = state.constrainedEvents[eventId];
  const min = event.start.min;
  const valueInUnits = event[eventPart][rangePart] - min;
  return {
    centre: toPixels(valueInUnits)
  };
};

export const VariableMarkerContainer = connect(mapStateToProps)(VariableMarker);
