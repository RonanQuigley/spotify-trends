import expressHandlebars from "express-handlebars";

const projectDir = __dirname + '/..';

// helpers
function stringify(value) {
    return JSON.stringify(value);
}
function parse(value){
    return JSON.parse(value);
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
function camelCaseToID(string){
    return string.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^_/, "");
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

export default class Handlebars {
    getEngine = function(){
        return expressHandlebars.create({
            helpers: {
                stringify,
                parse,
                offsetIndexByOne,
                formatDuration,
                formatType,
                formatStringForDiv,
                blockParams,
                camelCaseToID
            },
            extname: "hbs",
            defaultLayout: "layout",
            layoutsDir: projectDir + '/views/layouts',
            partialsDir: projectDir + '/views/partials'
        }).engine;
    }
}