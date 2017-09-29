import React from "react";

import { TimelineItem } from "./TimelineItem";
import { render } from "../../testHelpers/react";

describe("<TimelineItem />", () => {
  it("renders without crashing", () => {
    render(<TimelineItem />);
  });
});
