import Theme from 'common/react/common/theme';

export default {
    '@global': {
        body: {
            '@media (max-width : 670px)': {
                minWidth: '320px'
            }
        }
    },
    background: {
        padding: '2rem',
        '@media (max-width : 670px)': {
            padding: '1rem 2% 1rem 2%'
        }
    },
    padChildren: {
        '& > div': {
            padding: '10rem'
        }
    },
    topChartsBackground: {
        backgroundColor: Theme.palette.secondary.light,
        overflow: 'auto'
    },
    pitchModeBackground: {
        backgroundColor: Theme.palette.secondary.light,
        overflow: 'auto'
    },
    averagesBackground: {
        backgroundColor: Theme.palette.secondary.light,
        overflow: 'auto'
    },
    headerContainer: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        '@media (max-width : 670px)': {
            width: '100%',
            maxWidth: '15rem'
        }
    },
    headerCharts: {},
    headerPitchMode: {},
    heading: {
        letterSpacing: '0.4rem',
        textTransform: 'uppercase',
        color: Theme.palette.secondary.contrastText
    },
    flexbox: {
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    },
    paperClamp: {
        maxWidth: '46rem',
        minWidth: '37rem'
    },
    paper: {
        width: '40%',
        margin: '0 auto'
    },
    artists: {},
    tracks: {},
    divider: {
        width: '100%',
        maxWidth: '30rem',
        minWidth: '14rem',
        margin: '0.7rem auto 0.7rem auto'
    },
    pageTitle: {
        fontFamily: "'Roboto Mono', monospace",
        color: Theme.palette.primary.contrastText,
        textTransform: 'uppercase',
        fontWeight: 300,
        letterSpacing: '0.7rem'
    },
    pageTitleBar: {
        backgroundColor: Theme.palette.primary.dark
    }
};
