import { connect } from "react-redux";

import { Timeline } from "./Timeline";
import { selectUnitsToMinutes } from "../Config/ConfigSelectors";

export const mapStateToProps = state => ({
  toMinutes: selectUnitsToMinutes(state)
});

export const TimelineContainer = connect(mapStateToProps)(Timeline);
