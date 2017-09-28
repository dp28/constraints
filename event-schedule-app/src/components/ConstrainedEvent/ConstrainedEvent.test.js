import React from "react";

import { ConstrainedEvent } from "./ConstrainedEvent";
import { render } from "../../testHelpers/react";

describe("<ConstrainedEvent />", () => {
  it("renders without crashing", () => {
    render(
      <ConstrainedEvent event={{ start: { min: 0 }, end: { max: 10 } }} />
    );
  });
});
