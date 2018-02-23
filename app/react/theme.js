import { createMuiTheme } from "material-ui/styles";
import * as MuiColors from 'material-ui/colors';
const Colors = {
  primary: {
    light: "#6d6d6d",
    main: "#424242",
    dark: "#1b1b1b",
    contrastText : '#ffffff', 
  },
  secondary: {
    light: "#eeeeee",
    main: "#bcbcbc",
    dark: "#8c8c8c",
    contrastText : '#000000'
  }
};

// const Colors = {
//   primary : {
//     main : MuiColors.yellow[900],
//   },
//   secondary : {
//     main : MuiColors.yellow['A200'],
//   } 
// }



const theme = createMuiTheme({
  palette: {
    type: "light", // Switching the dark mode on is a single property value change.
    primary : Colors.primary,
    secondary : Colors.secondary,
  },
  // typography : {
  //   fontFamily : "Roboto, 'Helvetica Neue', sans-serif",
  // },
  overrides: {
    MuiTypography: {
      headline: {
        // textTransform: "uppercase"
      }
    }
  }
});

export default theme;