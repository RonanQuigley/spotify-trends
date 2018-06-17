const Colors = {
    primary: {
        light: '#6d6d6d',
        main: '#424242',
        dark: '#1b1b1b', // spotify branding's dark colour
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
        type: 'dark', // this will change our text to be contrasting - white
        primary: Colors.primary,
        secondary: Colors.secondary,
        background: {
            default: Colors.primary.dark
        }
    },
    typography: {
        fontFamily: "Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 14,
        color: Colors.primary.contrastText,
        fontWeightLight: 200,
        fontWeightMedium: 400,
        fontWeightRegular: 300
    },
    overrides: {
        MuiTypography: {
            headline: {
                fontSize: '2.4rem'
            },
            body2: {
                fontSize: '1.0rem'
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: 'rgba(255,255,255,0.70)'
            }
        }
    }
};

export default Theme;
