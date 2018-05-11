/*
    for every call to an .hbs extension, we instead use 
    the following code for mocking calls with res.send
    that way we can test our endpoints using superagent 
*/

module.exports = {
    process: (src, filename, config, options) => {
        // const handlebars = require('handlebars');
        // const template = handlebars.compile(src);
        // console.log(handlebars.partials);
        return `module.exports = (options) => {
            return 'fake handlebars template';
        }`;
    }
};
