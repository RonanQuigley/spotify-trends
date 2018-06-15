export default {
    card: {
        width: '30rem',
        height: '9rem',
        margin: '1.5% auto',
        display: 'flex',
        boxShadow: '2px 2.6px 3px 0px rgba(0,0,0,0.12)',
        justifyContent: 'space-between',
        '@media (max-width : 670px)': {
            width: '100%',
            maxWidth: '30rem'
        }
    },
    image: {
        width: '52%'
    },
    cardContent: {
        width: '50%',
        paddingBottom: '12px !important'
    },
    cardText: {
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between'
    },
    cardTextLeft: {},
    cardTextRight: {
        alignSelf: 'flex-end'
    }
};
