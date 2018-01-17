const expressHandlebars = require("express-handlebars");
const projectDir = __dirname + '/..';

module.exports = (function(){
    var hbs = expressHandlebars.create({
        helpers: {
            stringify: function(value) {
            return JSON.stringify(value);
            },
            offsetIndexByOne: function(index) {
            return parseInt(index, 10) + 1;
            }
        },
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: projectDir + '/views/layouts',
        partialsDir: projectDir + '/views/partials'
    }).engine;
    function getEngine(){
        return hbs; 
    }
    return {
        getEngine : getEngine
    }
})();
