import Theme from 'common/react/common/theme';

export default {
    font: {
        fontFamily: "'Roboto Mono', monospace",
        color: Theme.palette.primary.contrastText
    },
    heading: {
        letterSpacing: '0.7rem',
        textAlign: 'center',
        fontWeight: 100,
        textTransform: 'uppercase',
        '@media (max-width : 670px)': {
            fontSize: '4.60rem',
            margin: 0,
            letterSpacing: '0.45rem'
        },
        '@media (max-width : 420px)': {
            fontSize: '3.40rem',
            letterSpacing: '0.1rem'
        }
    },
    subheading: {
        fontWeight: 100,
        textTransform: 'uppercase',
        '@media (max-width : 670px)': {
            fontSize: '1.25rem',
            textAlign: 'center'
        },
        '@media (max-width : 420px)': {
            fontSize: '1.0rem',
            letterSpacing: '0.05rem',
            margin: '0 0 0.5rem 0'
        }
    },
    divider: {
        width: '27rem',
        margin: '0.2rem 0rem 1rem 4rem',
        '@media (max-width : 670px)': {
            width: '15rem',
            position: 'relative',
            left: '3rem',
            margin: '0 auto 1rem auto'
        },
        '@media (max-width : 420px)': {
            display: 'none'
        }
    }
};
