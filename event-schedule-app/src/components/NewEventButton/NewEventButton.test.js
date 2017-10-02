import React from "react";

import { NewEventButton } from "./NewEventButton";
import { render } from "../../testHelpers/react";

describe("<NewEventButton />", () => {
  it("renders without crashing", () => {
    render(
      <NewEventButton
        toMinutes={x => x * 10}
        numberOfUnits={10}
        startInUnits={10}
        pixelsPerUnit={10}
        timeClicked={x => y => x}
      />
    );
  });
});
