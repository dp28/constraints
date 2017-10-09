import React from "react";

import { Tools } from "./Tools";
import { render } from "../../testHelpers/react";

describe("<Tools />", () => {
  it("renders without crashing", () => {
    render(<Tools />);
  });
});
