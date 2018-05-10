export function getLocationHref() {
    // this function looks trivial,
    // but I need to wrap the property in
    // a function for unit testing purposes
    // otherwise, you can't stub href.
    return window.location.href;
}

export function getQueryStringElement(name) {
    // this keyword is require for sinon stubs in our unit tests
    const url = getLocationHref();
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(url);
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
