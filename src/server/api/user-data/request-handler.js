import rp from 'request-promise';

export function _generateOptions(token, url) {
    return {
        url: url,
        headers: { Authorization: 'Bearer ' + token },
        json: true
    };
}

export async function requestData(token, url) {
    const options = _generateOptions(token, url);
    return await rp.get(options);
}

// https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795

// function delay() {
//     return new Promise(resolve => setTimeout(resolve, 300));
//    }
//   async function delayedLog(item) {
//     // notice that we can await a function that returns promise
//     await delay();
//     // log item only after a delay
//     console.log(item);
//   }
//   async function processArray(array) {
//     for (const item in array) {
//       await delayedLog(array[item])
//     }
//   }
//   processArray([1, 2, 3]);
