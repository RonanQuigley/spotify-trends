import Theme from 'common/react/common/theme';

export default {
    '@global': {
        body: {
            backgroundColor: Theme.palette.primary.dark
        }
    },
    container: {
        width: '25%',
        margin: '0 auto',
        minWidth: '11rem',
        maxWidth: '40rem',
        height: '50%'
    },

    features: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    divider: {
        backgroundColor: 'rgba(255,255,255,0.70)'
    }
};
