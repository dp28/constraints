import React from "react";

import { ConstrainedEvent } from "./ConstrainedEvent";
import { render } from "../../testHelpers/react";

describe("<ConstrainedEvent />", () => {
  it("renders without crashing", () => {
    const event = {
      id: "a",
      start: { range: { min: 0 } },
      end: { range: { max: 10 } }
    };
    render(<ConstrainedEvent event={event} />, {
      constrainedEvents: { [event.id]: event }
    });
  });
});
