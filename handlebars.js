module.exports = {
    process(src) {
        Handlebars.compile(`${src}`);
    },
}