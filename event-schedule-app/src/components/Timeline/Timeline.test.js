import React from "react";

import { Timeline } from "./Timeline";
import { render } from "../../testHelpers/react";

describe("<Timeline />", () => {
  it("renders without crashing", () => {
    render(
      <Timeline
        minutesPerUnit={10}
        numberOfUnits={10}
        startInUnits={10}
        pixelsPerUnit={10}
        timeClicked={x => y => x}
      />
    );
  });
});
