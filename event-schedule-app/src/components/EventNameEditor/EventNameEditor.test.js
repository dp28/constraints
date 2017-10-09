import React from "react";

import { EventNameEditor } from "./EventNameEditor";
import { render } from "../../testHelpers/react";

describe("<EventNameEditor />", () => {
  it("renders without crashing", () => {
    render(
      <EventNameEditor event={{ id: "a", name: "bla" }} setEventName={x => x} />
    );
  });
});
