require("es6-promise").polyfill();

export default class Utilities {
  static isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  static camelCaseToSpaced(string){
    // insert a space before all caps then uppercase the first character  
    return string.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  }
  static camelCaseToDashed(string){
    return string.replace(/(?:^|\.?)([A-Z])/g, 
        (x,y) => {return "-" + y.toLowerCase()}).replace(/^_/, "");
  }
}
