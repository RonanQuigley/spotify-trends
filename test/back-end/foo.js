// OPTION 1 - NO REWIRE

// function foo() {
//     return 'hello';
// }

// function bar() {
//     return fns.foo();
// }

// const fns = {
//     foo, bar
// }

// export default fns;

// OPTION 2 - REWIRE 

export function bar() {
    return 'Hello world';
}

export function foo() {
    return bar();
}