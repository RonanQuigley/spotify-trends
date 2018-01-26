const queryString = require("querystring"); 

const Utilities = function(){
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  function stringifyObjects(parentObject) {
    Object.keys(parentObject).forEach(value => {
      parentObject[value] = JSON.stringify(parentObject[value]);
    });
  }
  function generateQueryString(obj){
    return queryString.stringify(obj);
  }
  function validateReqCallback(err, res, body){
    if(err) return err; 
    if(res.statusCode !== 200) return res.statusCode + ':' + res.statusMessage;
    if(!body) return 'no data in returned body';
    return true;
  }
  return {
    validateReqCallback, 
    stringifyObjects, 
    generateQueryString, 
    isObjectEmpty
  }
}

module.exports = new Utilities();