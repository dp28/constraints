import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setTimeBoundsParam,
  selectTimeBoundsParam
} from "../TimeBounds/TimeBoundsActions";
import { Timeline } from "./Timeline";
import { selectUnitsToMinutes } from "../Config/ConfigSelectors";

export const mapStateToProps = state => ({
  toMinutes: selectUnitsToMinutes(state),
  timeBounds: state.timeBounds
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setTimeBoundsParam, selectTimeBoundsParam },
    dispatch
  );
}

export function mergeProps(stateProps, dispatchProps, ownProps) {
  const { setTimeBoundsParam, selectTimeBoundsParam } = dispatchProps;
  const { timeBounds } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    timeClicked: time => {
      const isStarted = timeBounds && (timeBounds.min || timeBounds.min === 0);
      selectTimeBoundsParam(isStarted ? "max" : "min");
      setTimeBoundsParam(time);
    },
    timeHovered: time => {
      if (timeBounds) {
        setTimeBoundsParam(time);
      }
    }
  };
}

export const TimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Timeline);
