import React from "react";

import { TimeBounds } from "./TimeBounds";
import { render } from "../../testHelpers/react";

describe("<TimeBounds />", () => {
  it("renders without crashing", () => {
    render(<TimeBounds />);
  });
});
