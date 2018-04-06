function getHostName() {
    return process.env.DOMAIN === 'localhost'
        ? process.env.DOMAIN + ':'
        : process.env.DOMAIN;
}

export { getHostName };
