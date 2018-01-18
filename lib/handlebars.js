const expressHandlebars = require("express-handlebars");
const projectDir = __dirname + '/..';

module.exports = (function(){    
    var hbs = expressHandlebars.create({
        helpers: {
            stringify,
            offsetIndexByOne,
            formatKey,
            formatHeader
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
    function formatKey(key){
        switch(key){
            case("fourWeeks") : 
                return "Four Weeks";
            case("sixMonths") : 
                return "Six Months";
            case("allTime") : 
                return "All Time";
            case("topArtists") :
                return "artists";
            case("topTracks") : 
                return "tracks";
            default :
                return "NAME NOT FOUND - CHECK HELPERS IN HANDLEBARS.JS";
        }
    }
    function formatHeader(key){
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
    return {
        getEngine
    }
})();
