const expressHandlebars = require("express-handlebars");
const projectDir = __dirname + '/..';

module.exports = (function(){    
    var hbs = expressHandlebars.create({
        helpers: {
            stringify,
            offsetIndexByOne,
            formatDuration,
            formatType,
            formatStringForDiv,
            blockParams
        },
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: projectDir + '/views/layouts',
        partialsDir: projectDir + '/views/partials'
    }).engine;
    
    // helpers
    function stringify(value) {
        return JSON.stringify(value);
    }
    function offsetIndexByOne(index) {
        return parseInt(index, 10) + 1;
    }
    function formatDuration(key){
        switch(key){
            case("fourWeeks") : 
                return "Four Weeks";
            case("sixMonths") : 
                return "Six Months";
            case("allTime") : 
                return "All Time";
            default :
                return "NAME NOT FOUND - CHECK HELPERS IN HANDLEBARS.JS";
        }
    }
    function formatStringForDiv(string){
        return string.toLowerCase().replace(/\s+/g, '-');
    }
    function formatType(key){
        switch(key){
            case("topArtists") : 
                return "Top Artists";
            case("topTracks") : 
                return "Top Tracks";
        }
    }
    // module exports
    function getEngine(){
        return hbs; 
    }
    function blockParams(){
        let args = [],
        options = arguments[arguments.length - 1];
        for (let i = 0; i < arguments.length - 1; i++) {
            args.push(arguments[i]);
        }
        return options.fn(this, {data: options.data, blockParams: args});
    }
    return {
        getEngine
    }
})();
