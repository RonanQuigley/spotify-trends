import Theme from 'common/react/common/theme';

export default {
    topChartsBackground: {
        backgroundColor: Theme.palette.secondary.light,
        overflow: 'auto'
    },
    headerContainer: {
        width: '50%',
        margin: '1% auto'
    },
    heading: {
        // textDecoration: 'underline',
        textTransform: 'uppercase',
        color: Theme.palette.secondary.contrastText
    },
    topChartsContainer: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around'
    },
    artists: {
        width: '46rem'
    },
    tracks: {
        width: '46rem'
    }
};
