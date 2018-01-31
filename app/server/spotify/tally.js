var keySigs = {
    C: "C",
    CSHARP: "C#/Db",
    D: "D",
    DSHARP: "D#/Eb",
    E: "E",
    F: "F",
    FSHARP: "F#/Gb",
    G: "G",
    GSHARP: "G#/Ab",
    A: "A",
    ASHARP: "A#/Bb",
    B: "B"
  };
  

export default class Tally {
    static tallyObjValue(obj, value) {
      let results = {};
      for (let key in obj) {
        let tally = _tallyValues(obj[key], value);
        let namedKeySigs = _nameKeySigs(tally);
        results[key] = _formatResults(namedKeySigs);
      }
      return results;
    }
  }
  

function numToPitchClass(num, keySigs) {
  num = parseInt(num, 10);
  switch (num) {
    case 0:
      return keySigs[num];
    case 1:
      return keySigs[num];
    case 2:
      return keySigs[num];
    case 3:
      return keySigs[num];
    case 4:
      return keySigs[num];
    case 5:
      return keySigs[num];
    case 6:
      return keySigs[num];
    case 7:
      return keySigs[num];
    case 8:
      return keySigs[num];
    case 9:
      return keySigs[num];
    case 10:
      return keySigs[num];
    case 11:
      return keySigs[num];
  }
}

function _tallyValues(arr, value) {
  // count the number of key signatures produced by spotify
  // from all of our tracks and return an array of objects
  return arr.reduce((obj, nextItem) => {
    obj[nextItem[value]] = (obj[nextItem[value]] || 0) + 1;
    return obj;
  }, {});
}

function _nameKeySigs(arr) {
  // convert the keys of tallied key sigs into a pitch class name
  return Object.getOwnPropertyNames(arr).map(k => {
    let pitchClass = numToPitchClass(k, Object.keys(keySigs));
    return { name: pitchClass, value: arr[k] };
  });
}

function _formatResults(obj) {
  // produce the final output; an array of objects:
  // each object uses a name:KEYSIG, value:TALLY convention
  return Object.getOwnPropertyNames(keySigs).map(k => {
    let value = 0;
    for (let element in obj) {
      if (k === obj[element].name) {
        value = obj[element].value;
        break;
      }
    }
    return { name: k, value: value };
  });
}

