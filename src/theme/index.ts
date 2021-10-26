import { createTheme } from "@material-ui/core";
import {
  blue,
  blueGrey,
  green,
  grey,
  red,
  yellow,
} from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[300],
    },
    secondary: {
      main: blueGrey[50],
    },
    error: {
      main: red[400],
    },
    warning: {
      main: yellow[400],
    },
    success: {
      main: green[400],
    },
    info: {
      main: blue[500],
    },
    text: {
      primary: grey[900],
      secondary: grey[50],
      disabled: grey[800],
    },
  },
});
