export default {
    '@global': {
        body: {
            '@media (max-width : 420px)': {
                minWidth: '320px'
            }
        }
    },
    container: {
        width: '50%',
        maxWidth: '70rem',
        minWidth: '40rem',
        margin: '0 auto',
        '@media (max-width : 670px)': {
            maxWidth: 'initial',
            minWidth: 'initial',
            width: '100%'
        }
    },
    loginBrandingContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    features: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 670px)': {
            flexDirection: 'column'
        }
    },
    featureItem: {
        padding: '1rem',
        '@media (max-width: 670px)': {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }
    }
};
