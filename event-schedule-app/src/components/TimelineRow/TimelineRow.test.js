import React from "react";

import { TimelineRow } from "./TimelineRow";
import { render } from "../../testHelpers/react";

describe("<TimelineRow />", () => {
  it("renders without crashing", () => {
    render(<TimelineRow event={{ start: { min: 0 }, end: { max: 10 } }} />);
  });
});
