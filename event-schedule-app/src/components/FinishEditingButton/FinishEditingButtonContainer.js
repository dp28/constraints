import { connect } from "react-redux";

import { FinishEditingButton } from "./FinishEditingButton";
import { deselectEvent } from "../Event/EventActions";

export const mapDispatchToProps = (dispatch, { event }) => ({
  deselectEvent: () => dispatch(deselectEvent(event.id))
});

export const FinishEditingButtonContainer = connect(null, mapDispatchToProps)(
  FinishEditingButton
);
