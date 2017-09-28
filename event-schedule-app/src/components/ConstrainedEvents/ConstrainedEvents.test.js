import React from "react";

import { ConstrainedEvents } from "./ConstrainedEvents";
import { render } from "../../testHelpers/react";

describe("<ConstrainedEvents />", () => {
  it("renders without crashing", () => {
    render(<ConstrainedEvents events={[]} />);
  });
});
