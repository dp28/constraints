import React from "react";

import { Events } from "./Events";
import { render } from "../../testHelpers/react";

describe("<Events />", () => {
  it("renders without crashing", () => {
    render(<Events events={[]} />);
  });
});
