export function getRedirectURI() {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REDIRECT_URI;
    } else {
        return process.env.REDIRECT_URI_DEV;
    }
}
