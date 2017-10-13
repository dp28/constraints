import React from "react";
import { PrimaryButton } from "../Button/Button";
import Add from "material-ui/svg-icons/content/add";

export const NewEventButton = ({ createEvent }) => (
  <PrimaryButton onClick={() => createEvent(10, 20)}>
    <Add />
  </PrimaryButton>
);
