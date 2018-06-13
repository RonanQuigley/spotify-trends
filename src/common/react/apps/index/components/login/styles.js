// official branding guidelines:
//https://developer.spotify.com/branding-guidelines/
const spotfiyStyles = {
    green: '#1DB954',
    hoverGreen: '#1ed760',
    white: '#FFFFFF'
};

export default {
    button: {
        width: '14rem',
        margin: '1rem',
        color: spotfiyStyles.white,
        backgroundColor: spotfiyStyles.green,
        borderRadius: '0.5rem',
        alignSelf: 'center',
        '&:hover': {
            backgroundColor: spotfiyStyles.hoverGreen
        },
        '@media (max-width : 670px)': {
            width: '12rem',
            padding: 0
        }
    }
};
