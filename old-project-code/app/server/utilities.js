import queryString from "querystring"; 

export default class Utilities{
  static isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  static stringifyObjects(parentObject) {
    Object.keys(parentObject).forEach(value => {
      parentObject[value] = JSON.stringify(parentObject[value]);
    });
  }
  static generateQueryString(obj){
    return queryString.stringify(obj);
  }
  static validateReqCallback(err, res, body){
    if(err) return err; 
    if(res.statusCode !== 200) return res;
    if(!body) return 'no data in returned body';
    return true;
  }
}
