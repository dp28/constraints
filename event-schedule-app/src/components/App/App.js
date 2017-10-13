import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";

import { TimelineContainer } from "../Timeline/TimelineContainer";
import { ToolsContainer } from "../Tools/ToolsContainer";
import { store } from "../../state/store";
import { Theme } from "../../theme";

const style = {
  height: "100%"
};

export const App = () => (
  <div className="App" style={style}>
    <MuiThemeProvider muiTheme={Theme}>
      <Provider store={store}>
        <div>
          <ToolsContainer />
          <TimelineContainer />
        </div>
      </Provider>
    </MuiThemeProvider>
  </div>
);
