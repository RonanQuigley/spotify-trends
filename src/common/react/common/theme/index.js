const Colors = {
    primary: {
        light: '#6d6d6d',
        main: '#424242',
        dark: '#1b1b1b',
        contrastText: '#ffffff'
    },
    secondary: {
        light: '#eeeeee',
        main: '#bcbcbc',
        dark: '#8c8c8c',
        contrastText: '#000000'
    }
};

const Theme = {
    palette: {
        type: 'light',
        primary: Colors.primary,
        secondary: Colors.secondary
    },
    typography: {
        fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightMedium: 500,
        fontWeightRegular: 400
    },
    overrides: {
        MuiTypography: {
            headline: {
                textTransform: 'uppercase'
            }
        }
    }
};

export default Theme;
