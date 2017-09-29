import React from "react";

import { VariableMarker } from "./VariableMarker";
import { render } from "../../testHelpers/react";

describe("<VariableMarker />", () => {
  it("renders without crashing", () => {
    render(<VariableMarker />);
  });
});
