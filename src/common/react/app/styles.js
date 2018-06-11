import Theme from 'common/react/common/theme';

export default {
    topChartsBackground: {
        backgroundColor: Theme.palette.secondary.light,
        overflow: 'auto'
    },
    headerContainer: {
        width: '50%',
        margin: '1rem auto'
    },
    heading: {
        letterSpacing: '0.4rem',
        textTransform: 'uppercase',
        color: Theme.palette.secondary.contrastText
    },
    topChartsContainer: {
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    },
    paper: {
        width: '40%',
        maxWidth: '46rem',
        minWidth: '35rem'
    },
    artists: {},
    tracks: {},
    divider: {
        width: '100%',
        maxWidth: '40rem',
        minWidth: '14rem',
        margin: '0.7rem auto 0.7rem auto'
    }
};
