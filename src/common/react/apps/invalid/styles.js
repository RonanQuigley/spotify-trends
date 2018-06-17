export default {
    '@global': {
        'html, body': {
            width: '100%',
            height: '100%',
            minHeight: '100%'
        },
        'body > div': {
            alignItems: ' center',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
        }
    },
    container: {
        alignItems: ' center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1rem'
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    message: {
        textAlign: 'center',
        width: '30%',
        '& > *': {
            fontFamily: 'Roboto Mono, monospace'
        }
    },
    icon: {
        width: '40%',
        maxWidth: '15rem',
        minWidth: '8rem',
        '& > svg': {
            height: '100%',
            width: '100%'
        }
    }
};
