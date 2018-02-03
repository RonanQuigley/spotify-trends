export default class Tally {

  static outputFormat = {
    PITCHCLASS: "pitch class based array of objects",
    TIMEPERIOD: "time period based array of objects"
  }

  static tallyObjValue(obj, valuesToTally, outputFormat) {


    let results = {};
    for(let timeRange in obj){
      results[timeRange] = {};
      let currentObj = obj[timeRange];
      let currentTallies = _tallyValues(currentObj, valuesToTally);
      let convertedTallies = _convertTallies(currentTallies);
      for(let key in valuesToTally){
        let value = valuesToTally[key];
        results[timeRange][value] = convertedTallies[value];
      }
    }
    return results;

    // for (let timeRange in obj) {
    //   let currentObj = obj[timeRange];
    //   let currentTallies = _tallyValues(currentObj, valuesToTally);
    //   let convertedTallies = _convertTallies(currentTallies);
    //   switch(outputFormat){
    //     case this.outputFormat.PITCHCLASS : 
    //       _formatPitchClassArray(pitchClass, results, timeRange);
    //       break;
    //     case this.outputFormat.TIMEPERIOD : 
    //       results[timeRange] = _formatTimeRangeArray(pitchClass)
    //       break;
    //   }
    // }
    // return results;
  }

}

var _initResultsObj = function(outputFormat, valuesToTally, obj) {
  let results = {};
  for(let timeRange in obj){
    results[timeRange] = {};
    for(let key in valuesToTally){
      let value = valuesToTally[key];
      results[timeRange][value] = 0;
    }
  }
  return results;
};

const tallyString = "Tally";

var pitchClass = {
  C: "C",
  "C#/Db": "C#/Db",
  D: "D",
  "D#/Eb": "D#/Eb",
  E: "E",
  F: "F",
  "F#/Gb": "F#/Gb",
  G: "G",
  "G#/Ab": "G#/Ab",
  A: "A",
  "A#/Bb": "A#/Bb",
  B: "B"
};

function _numToMode(num){
  num = parseInt(num, 10);
  switch(num){
    case 0 : 
      return "Minor"; 
    case 1 : 
      return "Major";
  }
}

function _numToPitchClass(num, pitchClass) {
  num = parseInt(num, 10);
  switch (num) {
    case 0:
      return pitchClass[num];
    case 1:
      return pitchClass[num];
    case 2:
      return pitchClass[num];
    case 3:
      return pitchClass[num];
    case 4:
      return pitchClass[num];
    case 5:
      return pitchClass[num];
    case 6:
      return pitchClass[num];
    case 7:
      return pitchClass[num];
    case 8:
      return pitchClass[num];
    case 9:
      return pitchClass[num];
    case 10:
      return pitchClass[num];
    case 11:
      return pitchClass[num];
  }
}

function _tallyValues(arr, values) {
  // count the number of key signatures produced by spotify
  // from all of our tracks and return an array of objects
  let result = {};
  for(let value in values){
    let currentProp = values[value];
    result[currentProp] = arr.reduce((obj, nextItem) => {          
      obj[nextItem[currentProp]] = (obj[nextItem[currentProp]] || 0) + 1;
      return obj;
    }, {});
  }
  return result; 
}

function _convertTallies(obj){  
  return {
    key : _tallyToPitchClass(obj.key), 
    mode : _tallyToMode(obj.mode)
  }  
}

function _tallyToPitchClass(tally) {

  let pitchClassObj = Object.assign({}, pitchClass);
  let pitchClassKeys = Object.keys(pitchClass);

  Object.keys(tally).map(k => {
    let pitchClass = _numToPitchClass(k, pitchClassKeys);
    pitchClassObj[pitchClass] = tally[k];
  })
  
  return Object.keys(pitchClassObj).map(k => {
    return {
      pitchClass : k,
      tally : typeof pitchClassObj[k] === "string" ? 0 : pitchClassObj[k]
    }
  })
}  

function _tallyToMode(obj){  
  let result = [
    {mode : "Minor", tally : 0},
    {mode : "Major", tally : 0}
  ]
  for(let i in result){
    if(obj[i]){
      result[i].tally = obj[i];
    }
  }
  return result;
}

// function _formatPitchClassArray(input, output, timeRange) {
//   for (let outputKey in output) {
//     for (let inputKey in input) {
//       if (input[inputKey].pitchClass === output[outputKey].pitchClass) {
//         // initialise the property in current obj of output using the current
//         // time Range and assign the input key's tally to it i.e.
//         // for the pitch class of C allTimeTally = N, fourWeeksTally = N etc.
//         output[outputKey][timeRange + tallyString] = input[inputKey].tally;
//       }
//     }
//   }
// }

// function _formatTimeRangeArray(input){
//   // produce the final output; an array of objects:
//   // each object uses a name:KEYSIG, value:TALLY convention
//   return Object.getOwnPropertyNames(pitchClass).map(k => {
//     let tally = 0;
//     for (let element in input) {
//       if (k === input[element].pitchClass) {
//         tally = input[element].tally;
//         break;
//       }
//     }
//     return { pitchClass: k, tally: tally };
//   });  
// }

// sanity check for debugging
function _countResults(results) {
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i in results) {
    x += results[i].fourWeeksTally;
    y += results[i].sixMonthsTally;
    z += results[i].allTimeTally;
  }
  console.log(x + y + z);
}
