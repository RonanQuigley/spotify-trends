var expressHandlebars = require("express-handlebars");

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
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: "views/partials"
    }).engine;
    function getEngine(){
        return hbs; 
    }
    return {
        getEngine : getEngine
    }
})();
