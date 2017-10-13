import getMuiTheme from "material-ui/styles/getMuiTheme";

export const Colours = {
  primary: {
    light: "#52c7b8",
    base: "#009688",
    dark: "#00675b",
    text: "#000000"
  },
  accent: {
    light: "#b47cff",
    base: "#7c4dff",
    dark: "#3f1dcb",
    text: "#ffffff"
  },
  grey: {
    light: "#f5f5f5",
    base: "#e0e0e0",
    dark: "#757575",
    text: "#000000"
  }
};

export const Theme = getMuiTheme({
  palette: {
    primary1Color: Colours.primary.base,
    primary2Color: Colours.primary.light,
    primary3Color: Colours.primary.dark,
    accent1Color: Colours.accent.base,
    accent2Color: Colours.accent.light,
    accent3Color: Colours.accent.dark
  }
});
