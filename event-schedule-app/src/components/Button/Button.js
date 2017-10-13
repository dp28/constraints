import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import FloatingActionButton from "material-ui/FloatingActionButton";

export const Button = RaisedButton;
export const PrimaryButton = props => {
  const propsWithStyle = {
    ...props,
    style: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 100,
      ...props.style
    },
    secondary: true
  };
  return <FloatingActionButton {...propsWithStyle} />;
};
