import React from "react";

import { Event } from "./Event";
import { render } from "../../testHelpers/react";

describe("<Event />", () => {
  it("renders without crashing", () => {
    const event = {
      id: "a",
      start: { range: { min: 0 } },
      end: { range: { max: 10 } }
    };
    render(<Event event={event} />, {
      constrainedEvents: { events: { [event.id]: event } }
    });
  });
});
