import { connect } from "react-redux";

import { Tools } from "./Tools";
import { selectEvents } from "../Events/EventsSelectors";

export const mapStateToProps = state => ({
  currentEvent: selectEvents(state).find(event => event.isSelected)
});

export const ToolsContainer = connect(mapStateToProps)(Tools);
