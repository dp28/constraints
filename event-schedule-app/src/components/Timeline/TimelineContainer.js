import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  startEvent,
  setEventEnd,
  toggleEditingEvent
} from "../NewEvent/NewEventActions";
import { Timeline } from "./Timeline";
import { selectUnitConverters } from "../Config/ConfigSelectors";

export const mapStateToProps = state => ({
  ...selectUnitConverters(state),
  newEvent: state.newEvent
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { startEvent, setEventEnd, toggleEditingEvent },
    dispatch
  );
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
  const { startEvent, setEventEnd, toggleEditingEvent } = dispatchProps;
  const { newEvent } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    timeClicked: time => {
      const isStarted = newEvent.minStart || newEvent.minStart === 0;
      newEvent.editing || isStarted ? setEventEnd(time) : startEvent(time);
      toggleEditingEvent(time);
    },
    timeHovered: time => {
      if (newEvent.editing) {
        setEventEnd(time);
      }
    }
  };
}

export const TimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Timeline);
