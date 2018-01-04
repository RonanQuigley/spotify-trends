module.exports = {
  isObjectEmpty: function(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },
  stringifyObjects: function(parentObject) {
    Object.keys(parentObject).forEach(value => {
      parentObject[value] = JSON.stringify(parentObject[value]);
    });
  }
};
