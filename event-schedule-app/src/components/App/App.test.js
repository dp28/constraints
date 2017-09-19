import React from "react";

import { App } from "./App";
import { render } from "../../testHelpers/react";

describe("<App />", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
