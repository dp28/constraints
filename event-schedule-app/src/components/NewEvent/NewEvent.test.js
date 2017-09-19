import React from "react";

import { NewEvent } from "./NewEvent";
import { render } from "../../testHelpers/react";

describe("<NewEvent />", () => {
  it("renders without crashing", () => {
    render(<NewEvent />);
  });
});
