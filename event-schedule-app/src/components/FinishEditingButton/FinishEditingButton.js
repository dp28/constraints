import React from "react";
import { PrimaryButton } from "../Button/Button";
import Done from "material-ui/svg-icons/action/done";

export const FinishEditingButton = ({ deselectEvent }) => (
  <PrimaryButton onClick={deselectEvent}>
    <Done />
  </PrimaryButton>
);
