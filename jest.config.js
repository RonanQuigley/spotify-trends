module.exports = {
    setupFiles: ['./setupFile.js'],
    moduleFileExtensions: [
        "js",
        "json",
        "jsx",
    ],
    moduleNameMapper: {
        "^.*[.](jpg|JPG|gif|GIF|png|PNG|sass|SASS|css|CSS)$": "<rootDir>/test/mocks/generic",
    },
    transform: {
        "\\.js$": "babel-jest",
        "\\.hbs$": "<rootDir>handlebars.js"
    }
}