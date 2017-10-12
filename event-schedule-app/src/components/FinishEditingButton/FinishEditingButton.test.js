import React from "react";

import { FinishEditingButton } from "./FinishEditingButton";
import { render } from "../../testHelpers/react";

describe("<FinishEditingButton />", () => {
  it("renders without crashing", () => {
    render(<FinishEditingButton />);
  });
});
